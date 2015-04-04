'use strict';

var originFilter      = require('../middlewares/OriginFilter');
var serviceIdentifier = require('../middlewares/ServiceIdentifier');

var callbacks   = require('./callbacks');
var receipt     = require('./receipt');
var transaction = require('./transaction');

/**
 * @param {Object} router
 */
module.exports = function(router) {

    // Transaction routes.
    router.post('/pay/:amount(\\d+)', serviceIdentifier, transaction.new);
    router.get( '/initiate/:id'     ,                    transaction.initiate);
    router.get( '/status/:token'    ,                    transaction.status);

    // Sherlock's callbacks.
    router.get('/success',               callbacks.success);
    router.get('/cancel' ,               callbacks.cancel);
    router.get('/confirm', originFilter, callbacks.confirm);

    // Receipt handling.
    router.get('/receipt/:token', receipt.show);

    /**
     * Default route.
     *
     * @param {Object}   req
     * @param {Object}   res
     * @param {Function} next
     */
    router.use(function(req, res, next) {
        res.status(404);
        return next(new Error('Impossible de trouver la page demandée.'));
    });
};
