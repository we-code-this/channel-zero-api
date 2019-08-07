import fs from 'fs-extra';
import path from 'path';

export const assetDirectories = {
  articles: 'articles',
  artists: 'artists',
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

    if (!fs.existsSync(typeDir)) {
      await fs.mkdir(typeDir);
    }

    await fs.writeFile(path.join(typeDir, filename), fileData);

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
