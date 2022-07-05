// express.js register middleware

var express = require('express');
var logger = require('morgan');
var path = require('path');
var authorization = require(path.join(process.env.ROOT_PATH, '/middlewares/authorization'));
var uploader = require(path.join(process.env.ROOT_PATH, '/middlewares/uploader'));

/**
 *
 * @param {import('express').Express} app
 */
module.exports = function (app) {
  app.use(logger('[:date[web]] :method :url :status :response-time ms - :req[content-length] - :res[content-length]'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(process.env.ROOT_PATH, 'public')));

  app.use(authorization);
  app.use(uploader);
}
