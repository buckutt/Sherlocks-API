'use strict';

var errors = require('../lang/fr/errors');

/**
 * Handle errors.
 *
 * Display error pages to the user, with the correct
 * messages, based on the HTTP error code.
 *
 * @param {Object}   err
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
module.exports = function(err, req, res, next) {

    // If the status code wasn't changed before calling next(err), assign 500
    // as default HTTP status code.
    if (res.statusCode === 200) res.statusCode = 500;

    if (req.xhr) {
        return res.status(res.statusCode).json({ status: 'error', message: 'err'}).end();
    } else {
        err = err.toString().replace('Error: ', '');
        return res.status(res.statusCode).render('error', { title: errors[res.statusCode].title, subtitle: err});
    }

}
