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
var categoryCRUD = require(path.join(rootController, 'categories'));
var transactionCRUD = require(path.join(rootController, 'transactions'));
var productCRUD = require(path.join(rootController, 'products'));

var auth = require(path.join(rootController, 'auth'));

router.post('/login', auth.login);
router.post('/register', auth.register);

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

router.get('/categories', categoryCRUD.all);
router.get('/categories/:id', categoryCRUD.view);
router.post('/categories', categoryCRUD.store);
router.put('/categories/:id', categoryCRUD.update);
router.patch('/categories/:id', categoryCRUD.update);
router.delete('/categories/:id', categoryCRUD.destroy);

router.get('/transactions', transactionCRUD.all);
router.get('/transactions/:id', transactionCRUD.view);
router.post('/transactions', transactionCRUD.store);
router.put('/transactions/:id', transactionCRUD.update);
router.patch('/transactions/:id', transactionCRUD.update);
router.delete('/transactions/:id', transactionCRUD.destroy);

router.get('/products', productCRUD.all);
router.get('/products/:id', productCRUD.view);
router.post('/products', productCRUD.store);
router.put('/products/:id', productCRUD.update);
router.patch('/products/:id', productCRUD.update);
router.delete('/products/:id', productCRUD.destroy);

// catch 404 and respond json
router.all('/*', nfHandler);

module.exports = router;
