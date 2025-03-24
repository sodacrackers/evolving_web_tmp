/**
 * @file
 * Default configurations for NightwatchJs.
 */

require('dotenv').config();
const args = require('minimist')(process.argv);

module.exports = {

    ...require('./nightwatch.browserstack.conf.js'),

    custom_assertions_path: 'tests/custom_assertions',
    custom_commands_path: [
        'tests/custom_commands',
        // 'tests/custom_commands/footer',.
        // 'tests/custom_commands/header',.
    ],

    globals_path: 'tests/globals.js',

    page_objects_path: [
        'tests/page_objects',
        'tests/page_objects/header',
        'tests/page_objects/footer',
        'tests/page_objects/provider_cards',
    ],

    src_folders: ['tests/sites'],


    // 'webdriver': {},
    get webdriver() {
        if (args.browserstack == true) {
            return {
                'start_process': false,
                'host': 'hub-cloud.browserstack.com',
                'port': 443
            }
        }
        else {
            return {
                'start_process': true,
                'server_path': require('chromedriver').path,
                'port': 9515,
                'request_timeout_options': {
                    'timeout': 90000,
                    'retry_attempts': 10
                },
                'keep_alive': {
                    'enabled': true,
                    'keepAliveMsecs': 2000
                }
            }
        }
    },

};
