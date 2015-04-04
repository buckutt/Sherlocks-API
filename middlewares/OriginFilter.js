'use strict';

var rangeCheck = require('range_check');

/**
 * Origin validation.
 *
 * We have to check that the async transaction validation comes
 * from one the of bank's ranges.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
module.exports = function(req, res, next) {

    // Taken from the official documentation of the Sherlocks service.
    var ranges = ['193.201.76.0/23' ,'193.56.46.0/24' ,'192.136.30.0/24' ,'160.92.0.0/16' ,'89.106.184.0/21'];

    ranges.forEach(function(v) {
        // We only have to check against IPv4 ranges.
        if (req.ip.indexOf(':') === -1 && rangeCheck.inRange(req.ip, v)) {
            next();
        }
    });
    // :-)
    res.status(403).end();
    
}
