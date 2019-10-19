import fs from 'fs-extra';
import path from 'path';
import s3 from './s3';

export const assetDirectories = {
  articles: 'articles',
  artists: 'artists',
  promos: 'promos',
  releases: 'releases'
};

export const fileRoot = () => {
  let directoryName = 'files';

  if (process.env.NODE_ENV === 'test') {
    directoryName = 'test-files';
  }

  return path.join(__dirname, '/../../', directoryName);
};

export const saveFile = async (type, filename, fileData) => {
  try {
    const typeDir = path.join(fileRoot(), assetDirectories[type]);

    const params = {
      Bucket: process.env.S3_BUCKETNAME,
      Key: path.join(typeDir, filename).substr(1),
      Body: fileData
    };

    await s3.upload(params).promise();

    return true;
  } catch (e) {
    console.error(e.stack);
    return false;
  }
};

export const deleteFile = async (type, filename) => {
  try {
    const typeDir = path.join(fileRoot(), assetDirectories[type]);

    if (fs.existsSync(typeDir)) {
      await fs.unlink(path.join(typeDir, filename));
    }

    return true;
  } catch (e) {
    console.error(e.stack);
    return false;
  }
};

export const publicUrl = (path = '') => `/files${path}`;
