'use strict';

var models  = require('../models').sequelize.models;
var Service = models.Service;

/**
 * Service identification middleware.
 *
 * Used to identify the right service using the referer
 * of the request to the current route and the provided
 * service name (via req.body.service).
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
module.exports = function(req, res, next) {

    var referer = req.header('Referer');

    // For logging purposes only.
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // The user should not be here without any referer or
    // with a string which is not an correct URI.
    if ( ! referer || referer.indexOf('http://') === -1) {
        req.app.locals.logger.warn('User with invalid referer (' + referer + '): ' + ip);
        res.status(400);
        return next(new Error('Referer invalide.'));
    }

    // Find the right service.
    Service.find({ where: { name: req.body.service } })
    .then(function(service) {
        // If the service is not found of if the referer isn't the one
        // referenced for the requested service, redirect the user to
        // an error page.
        if ( ! service) {
            req.app.locals.logger.warn('');
            res.status(404);
            return next(new Error('Service introuvable.'));
        } else if (referer.indexOf('http://' + service.host) === -1) {
            req.app.locals.logger.warn('User\'s referer not matching with the requested service: ' + referer + ' via ' + service.name + '; sould be ' + service.host);
            res.status(400);
            return next(new Error('Referer incorrect pour ce service.'));
        }

        // Make it available in any route.
        res.locals.service = service;

        return next();
    });
    
}
