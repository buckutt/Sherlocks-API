'use strict';

var config    = require('config');
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
    config.get('database').database,
    config.get('database').username,
    config.get('database').password,
    {
        dialect: 'mariadb',
        host: config.get('database').host,
        port: config.get('database').port,
        logging: (config.get('database').debug) ? console.log : false
    }
);

module.exports = {
    /**
     * Initialize everything related to the database. Ensure that everything
     * is done before going on to routes loading.
     */
    init: function() {
        // TODO: Automatic model import.
        var Service     = sequelize.import(__dirname + '/Service');
        var Transaction = sequelize.import(__dirname + '/Transaction');

        // Define associations between models.
        Transaction.belongsTo(Service);

        return sequelize.sync({ force: config.get('database').override })
        .then(function() {
            if (config.get('database').override) {
                require('./seeds/Services')(Service);
                require('./seeds/Transactions')(Transaction);
            }
        });
    },
    sequelize: sequelize
}
