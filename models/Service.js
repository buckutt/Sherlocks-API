'use strict';

/**
 * Service.
 *
 * A service refers to an application allowed to instanciate new transactions.
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 */
module.exports = function(sequelize, DataTypes) {

    var Service = sequelize.define('Service', {

        // Service name (as you could expect)
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        // Base URL of the service.
        host: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The user will not be redirected to this URL, but a request will be
        // made from this server.
        confirmUrl: {
            field: 'confirm_url',
            type: DataTypes.STRING
        },
        // URL where the user will be redirected unpon a successfull transaction.
        successUrl: {
            field: 'sucess_url',
            type: DataTypes.STRING
        },
        // URL where the user will be redirected upon a transaction cancelation.
        cancelUrl: {
            field: 'cancel_url',
            type: DataTypes.STRING
        },
        // Minimum amount of a transaction.
        minAmount: {
            field: 'min_amount',
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        // Maximum amount of a transaction.
        maxAmount: {
            field: 'max_amount',
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10000
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    });

    return Service;

}
