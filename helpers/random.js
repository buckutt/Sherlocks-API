'use strict';

var crypto = require('crypto');
var models = require('../models').sequelize.models;

/**
 * Randomness-related functions.
 */
var random = {

    /**
     * Generate an random string.
     *
     * @param  {Integer} length
     * @return {String}  Generated random string.
     */
    hex: function(length) {
        // TODO: Improve security.
        return crypto.randomBytes(length).toString('hex');
    },
    /**
     * Ensure the generated value is unique, before calling
     * the callback to insert it.
     *
     * @param  {Object}   model
     * @param  {String}   field
     * @param  {Integer}  length
     * @return {Function} Callback with unique random data passed via the first param.
     */
    generateUnique: function(model, field, length) {
        return function(callback) {
            var data = random.hex(length);
            var options = { where: {} };
            options.where[field] = data;

            model.count(options).then(function(count) {
                if (count > 0) {
                    random.transaction[field](model, field, length);
                } else {
                    callback(data);
                }
            });
        }
    }

}

module.exports = random;
