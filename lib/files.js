import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import s3 from './s3';

export const assetDirectories = {
  a: 'a',
  articles: 'articles',
  artists: 'artists',
  promos: 'promos',
  releases: 'releases',
};

export const sizes = {
  small: 400,
  medium: 800,
  large: 1200,
};

const writeFile = (dir, filename, fileData) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(path.join(dir, filename), fileData);
};

const unlinkFile = (dir, filename) => {
  fs.unlinkSync(path.join(dir, filename));
};

const s3Upload = async (dir, filename, fileData) => {
  const params = {
    Bucket: process.env.S3_BUCKETNAME,
    Key: path.join(dir, filename).substr(1),
    Body: fileData,
  };

  await s3.upload(params).promise();
};

const s3Delete = async (dir, filename) => {
  const params = {
    Bucket: process.env.S3_BUCKETNAME,
    Key: path.join(dir, filename).substr(1),
  };

  s3.headObject(params, async (err) => {
    if (!err) {
      await s3.deleteObject(params).promise();
    }
  });
};

const resize = async (data, size) => {
  return await sharp(data).resize(size).toBuffer();
};

export const fileRoot = (s3 = false) => {
  let directoryName = 'files';

  if (process.env.NODE_ENV === 'test') {
    directoryName = 'test-files';
  }

  if (s3) {
    return `/${directoryName}`;
  } else {
    return path.join(__dirname, '/../../', directoryName);
  }
};

export const saveFile = async (type, filename, fileData) => {
  try {
    const typeDir = path.join(fileRoot(), assetDirectories[type]);
    const smallDir = path.join(typeDir, 'small');
    const mediumDir = path.join(typeDir, 'medium');
    const largeDir = path.join(typeDir, 'large');

    const smallData = await resize(fileData, sizes.small);
    const mediumData = await resize(fileData, sizes.medium);
    const largeData = await resize(fileData, sizes.large);

    if (process.env.NODE_ENV === 'test') {
      writeFile(typeDir, filename, fileData);
      writeFile(smallDir, filename, smallData);
      writeFile(mediumDir, filename, mediumData);
      writeFile(largeDir, filename, largeData);
    } else {
      const s3TypeDir = path.join(
        fileRoot(true),
        assetDirectories[type],
      );
      const s3SmallDir = path.join(s3TypeDir, 'small');
      const s3MediumDir = path.join(s3TypeDir, 'medium');
      const s3LargeDir = path.join(s3TypeDir, 'large');

      await s3Upload(s3TypeDir, filename, fileData);
      await s3Upload(s3SmallDir, filename, smallData);
      await s3Upload(s3MediumDir, filename, mediumData);
      await s3Upload(s3LargeDir, filename, largeData);
    }

    return true;
  } catch (e) {
    console.error(e.stack);
    return false;
  }
};

export const deleteFile = async (type, filename) => {
  try {
    const typeDir = path.join(fileRoot(), assetDirectories[type]);
    const smallDir = path.join(typeDir, 'small');
    const mediumDir = path.join(typeDir, 'medium');
    const largeDir = path.join(typeDir, 'large');

    if (process.env.NODE_ENV === 'test') {
      unlinkFile(typeDir, filename);
      unlinkFile(smallDir, filename);
      unlinkFile(mediumDir, filename);
      unlinkFile(largeDir, filename);
    } else {
      const s3TypeDir = path.join(
        fileRoot(true),
        assetDirectories[type],
      );
      const s3SmallDir = path.join(s3TypeDir, 'small');
      const s3MediumDir = path.join(s3TypeDir, 'medium');
      const s3LargeDir = path.join(s3TypeDir, 'large');

      s3Delete(s3TypeDir, filename);
      s3Delete(s3SmallDir, filename);
      s3Delete(s3MediumDir, filename);
      s3Delete(s3LargeDir, filename);
    }

    return true;
  } catch (e) {
    console.error(e.stack);
    return false;
  }
};

export const publicUrl = (path = '') => fileRoot() + `/${path}`;

export const urls = (assetType, filename) => {
  const urls = {
    original: publicUrl(`${assetDirectories[assetType]}/${filename}`),
  };

  for (let [key, value] of Object.entries(sizes)) {
    urls[key] = publicUrl(
      `${assetDirectories[assetType]}/${key}/${filename}`,
    );
  }

  return urls;
};
