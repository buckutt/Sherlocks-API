'use strict';

var formatting = require('../helpers/formatting');
var random     = require('../helpers/random');

/**
 * Transaction model.
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 */
module.exports = function(sequelize, DataTypes) {

    var Transaction = sequelize.define('Transaction', {
        // Unique identifier of the transaction
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        // Token (shared secret known by the services)
        token: {
            type: DataTypes.STRING,
            unique: true
        },
        // Data to be sent via POST with every request to service's URLs
        // It could be seen like state in OAuth2 specs.
        data: {
            type: DataTypes.TEXT
        },
        // Transaction amount. Restricted by the *minAmount* and *maxAmount*
        // columns on the *Service* table.
        amount: {
            type: DataTypes.INTEGER
        },
        // Form returned by the Sherlock's binary.
        // Used to manual replay of the transactions.
        form: {
            type: DataTypes.TEXT
        },
        // Confirmed transaction?
        confirmed: {
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        // Automatically convert any amount value to the right format (stored in cents).
        getterMethods: {
            /**
             * Convert to our monetary display format.
             */
            amount: function() {
                return formatting.toMonetary(this.getDataValue('amount'));
            }
        },
        setterMethods: {
            /**
             * Convert to our monetary storage format.
             *
             * @param {Integer} amount
             */
            amount: function(amount) {
                this.setDataValue('amount', formatting.fromMonetary(amount));
            }
        }
    });

    return Transaction;

}
