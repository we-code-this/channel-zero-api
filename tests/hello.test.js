require('dotenv').config();
const { handler } = require('../functions/hello');

const callback = jest.fn();

describe('/hello', function () {
  test('should say hello', async function () {
    await handler({ headers: { host: process.env.DEV_HOST } }, null, callback);

    expect(callback).toHaveBeenCalled();

    const res = callback.mock.calls[0][1];

    expect(res).toHaveProperty('statusCode');
    expect(res.statusCode).toEqual(200);
  });

  test('should not say hello with bad host', async function () {
    await handler({ headers: { host: 'badhost' } }, null, callback);

    expect(callback).toHaveBeenCalled();

    const res = callback.mock.calls[0][1];

    expect(res).toHaveProperty('statusCode');
    expect(res.statusCode).toEqual(404);
  });
});
