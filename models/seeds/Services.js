'use strict';

/**
 * Service seeding.
 *
 * @param {Object} Service
 */
module.exports = function(Service) {

    Service.create({
        name: 'pay-reload',
        host: 'buck.utt.fr',
        confirmUrl: '',
        successUrl: '/successReload/',
        cancelUrl: '/#/reloadFail'
    });

    Service.create({
        name: 'pay-ticket',
        host: 'buck.utt.fr',
        confirmUrl: '',
        successUrl: '/successTransaction/',
        cancelUrl: '/#/ticketBuyingFail'
    });

};
