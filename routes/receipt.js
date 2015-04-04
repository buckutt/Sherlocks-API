'use strict';

var errors      = require('../lang/fr/errors');
var formatting  = require('../helpers/formatting');
var models      = require('../models').sequelize.models;
var moment      = require('moment');
var Transaction = models.Transaction;
var Service     = models.Service;

/**
 * Receipt display.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.show = function(req, res, next) {
    Transaction.find({
        where:   { token: req.params.token },
        include: [ { model: Service, as: 'Service' } ]
    }).then(function(transaction) {
        if (transaction) {
            return res.render('receipt', { transaction: transaction, formatting: formatting, moment: moment });
        }
        res.status(404);
        return next(new Error('Impossible de trouver le reçu.'));
    });
}
