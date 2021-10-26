const apiRouterServer = require('express').Router();

const {
  getToken,
  getData
} = require('../controllers/serverController');

apiRouterServer.route('/')
  .post(getToken)

  apiRouterServer.route('/0/ServiceModel/EntityDataService.svc/:entityName')
  .get(getData)

module.exports = apiRouterServer
