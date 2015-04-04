'use strict';

var errors      = require('../lang/fr/errors');
var jwt         = require('jsonwebtoken');
var models      = require('../models').sequelize.models;
var Transaction = models.Transaction;

/**
 * The user is redirected here when he finishes its transaction.
 *
 * The id of the transaction is contained in the data attribute of the decoded
 * request body.
 *
 * @param {Object} req
 * @param {Object} res
 *
 * TODO: Implement it \o
 *
 */
exports.success = function(req, res) {
    // Decode the POST'ed data via the "response" binary.
    // render the loading.html page
}

/**
 * The user is redirected here when he cancels its transaction.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.cancel = function(req, res) {
    return res.render('error', errors['cancel']).end();
}

/**
 * Called by the bank after the transaction have been validated.
 *
 * The origin of this request is checked via the OriginFilter middleware.
 * The id of the confirmed transaction is contained in the data attribute of the
 * decoded request body.
 *
 * @param {Object} req
 * @param {Object} res
 *
 * TODO: Implement it \o
 */
exports.confirm = function(req, res) {
    // Decode via the response binary.
    // Find the right Transaction.
    // transaction.confirmed = true;
}
