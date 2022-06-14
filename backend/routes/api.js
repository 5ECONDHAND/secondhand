var express = require('express');
var router = express.Router();
var path = require('path');
var rootController = path.join(process.env.ROOT_PATH, '/controllers/API');

/**
 * Load API controllers
 */
var nfHandler = require(path.join(rootController, '/nf'));

// catch 404 and respond json
router.all('/*', nfHandler);

module.exports = router;
