var express = require('express');
var router = express.Router();
var path = require('path');
var rootController = path.join(process.env.ROOT_PATH, '/controllers/API');

/**
 * Load API controllers
 */
var nfHandler = require(path.join(rootController, '/nf'));
var userCRUD = require(path.join(rootController, 'users'));
var notificationCRUD = require(path.join(rootController, 'notifications'));

router.get('/users', userCRUD.all);
router.get('/users/:id', userCRUD.view);
router.post('/users', userCRUD.store);
router.put('/users/:id', userCRUD.update);
router.patch('/users/:id', userCRUD.update);
router.delete('/users/:id', userCRUD.destroy);

router.get('/notifications', notificationCRUD.all);
router.get('/notifications/:id', notificationCRUD.view);
router.post('/notifications', notificationCRUD.store);
router.put('/notifications/:id', notificationCRUD.update);
router.patch('/notifications/:id', notificationCRUD.update);
router.delete('/notifications/:id', notificationCRUD.destroy);

// catch 404 and respond json
router.all('/*', nfHandler);

module.exports = router;
