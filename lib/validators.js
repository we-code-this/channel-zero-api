import imageSize from 'image-size';

export const validExtension = (extension, accepted = []) => {
  let valid = false;

  accepted.map((extension) => {
    if (extension === extension) {
      valid = true;
    }
  });

  return valid;
};

export const validImageDimensions = (imageBuffer, width, height) => {
  let valid = false;

  const dimensions = imageSize(imageBuffer);

  valid = dimensions.width === width && dimensions.height === height;

  return valid;
};
