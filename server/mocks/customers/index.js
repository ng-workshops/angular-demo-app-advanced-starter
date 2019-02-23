const bodyParser = require('body-parser');
const responses = require('./responses');

module.exports = {
  initRoutes: apiRouter => {
    apiRouter.get('/customers', (req, res) => {
      res.json(responses.getAll(req.query.search));
    });

    apiRouter.get('/customers/:id', (req, res) => {
      res.json(responses.getById(req.params.id));
    });

    apiRouter.post('/customers', bodyParser.json(), (req, res) => {
      res.json(responses.create(req.body));
    });

    apiRouter.put('/customers', bodyParser.json(), (req, res) => {
      res.json(responses.update(req.body));
    });

    apiRouter.delete('/customers/:id', (req, res) => {
      res.json(responses.delete(req.params.id));
    });
  }
};
