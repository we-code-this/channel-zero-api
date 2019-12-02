import fs from 'fs';
import AWS from 'aws-sdk';

let accessKey, secretKey;
if (process.env.S3_ACCESS_KEY_FILE) {
  accessKey = fs
    .readFileSync(process.env.S3_ACCESS_KEY_FILE, 'utf8')
    .trim();
} else {
  accessKey = process.env.S3_ACCESS_KEY;
}

if (process.env.S3_SECRET_KEY_FILE) {
  secretKey = fs
    .readFileSync(process.env.S3_SECRET_KEY_FILE, 'utf8')
    .trim();
} else {
  secretKey = process.env.S3_SECRET_KEY;
}

const ep = new AWS.Endpoint('s3.wasabisys.com');

AWS.config.setPromisesDependency(Promise);
export default new AWS.S3({
  endpoint: ep,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});
