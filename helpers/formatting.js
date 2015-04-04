'use strict';

/**
 * Formatting functions.
 */
module.exports = {

    /**
     * Convert to display format.
     *
     * @param  {Integer} amount
     * @return {Integer} Converted value.
     */
    toMonetary: function(amount) {
        return (amount / 100).toFixed(2);
    },

    /**
     * Convert to storage format.
     *
     * @param  {Integer} amount
     * @return {Integer} Converted value.
     */
    fromMonetary: function(amount) {
        return amount * 100;
    }

}
