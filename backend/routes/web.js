var express = require('express');
var router = express.Router();
var path = require('path');
var rootController = path.join(process.env.ROOT_PATH, '/controllers/web');

/**
 * Load web controllers
 */
// var nfHandler = require(path.join(rootController, '/nf'));
var spaHandler = require(path.join(rootController, '/spa'));

// catch 404 and forward to error handler
router.all('/*', spaHandler);

module.exports = router;
