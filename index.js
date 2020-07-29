const Router = require('./router');
const routes = require('./routes');

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const r = new Router();
    routes(r);
    const resp = await r.route(request);
    return resp
}
