const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const chai = require('chai');
const Cloudworker = require('@dollarshaveclub/cloudworker');

const expect = chai.expect;

const workerScript = fs.readFileSync(path.resolve(__dirname, '../dist/worker.js'), 'utf8');

describe('ads', () => {
  let serverAddress;
  let server;

  before(function () {
    const worker = new Cloudworker(workerScript);
    server = worker.listen();
    serverAddress = `http://localhost:${server.address().port}`
  });

  after(function () {
    server.close();
  });

  it('uses axios', async () => {
    const response = await axios.get(serverAddress);
    expect(response.status).to.eql(200);
    expect(response.data).to.eql('Hello, world!');
  });
});
