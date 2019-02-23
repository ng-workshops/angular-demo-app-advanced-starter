const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

// const mockErrors = require('../mocks/errors');
const mockSettings = require('./mocks/settings');
const mockProducts = require('./mocks/products');
const mockCustomers = require('./mocks/customers');

const apiRouter = new express.Router();
const latency = process.env.latency || 0;
// const simulateErrors = !!(process.env.simulateErrors || false);

module.exports = PORT => {
  const app = express();

  // docker switch
  if (process.env.DIST) {
    console.log('PORT', PORT);

    app.use(compression());
    app.use(express.static(path.join(__dirname, '..', 'dist')));
  } else {
    PORT += 1;
  }

  app.use('/api', apiRouter);
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  if (process.env.DIST) {
    app.use('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
    });
  }

  // init routes for mocks
  mockSettings.initRoutes(apiRouter, latency);
  mockProducts.initRoutes(apiRouter);
  mockCustomers.initRoutes(apiRouter);

  app.listen(PORT, () => {
    console.log(`API server listening to port ${PORT}`);
  });
};
