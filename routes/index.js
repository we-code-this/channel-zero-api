module.exports = (r) => {
  r.get('/', () => new Response('Hello, world!'));
};
