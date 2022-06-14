// express.js register middleware

var express = require('express');
var logger = require('morgan');
var path = require('path');

/**
 *
 * @param {import('express').Express} app
 */
module.exports = function (app) {
  app.use(logger('[:date[web]] :method :url :status :response-time ms - :req[content-length] - :res[content-length]'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(process.env.ROOT_PATH, 'public')));
}
