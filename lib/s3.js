import AWS from 'aws-sdk';

const ep = new AWS.Endpoint('s3.wasabisys.com');
AWS.config.setPromisesDependency(Promise);
export default new AWS.S3({
  endpoint: ep,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});
