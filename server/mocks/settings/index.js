const responses = require('./responses');
const bodyParser = require('body-parser');

module.exports = {
  initRoutes: (apiRouter, latency) => {
    apiRouter.get('/settings', (req, res) => {
      setTimeout(() => {
        res.json(responses.get());
      }, latency);
    });

    apiRouter.post('/settings', bodyParser.json(), (req, res) => {
      setTimeout(() => {
        res.json(responses.set(req.body));
      }, latency);
    });
  }
};
