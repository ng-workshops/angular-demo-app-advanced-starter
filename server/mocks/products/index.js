const bodyParser = require('body-parser');
const responses = require('./responses');

module.exports = {
  initRoutes: apiRouter => {
    apiRouter.get('/products', (req, res) => {
      res.json(responses.getAll(req.query.search));
    });

    apiRouter.get('/products/:id', (req, res) => {
      res.json(responses.getById(req.params.id));
    });

    apiRouter.post('/products', bodyParser.json(), (req, res) => {
      res.json(responses.create(req.body));
    });

    apiRouter.put('/products', bodyParser.json(), (req, res) => {
      res.json(responses.update(req.body));
    });
  }
};
