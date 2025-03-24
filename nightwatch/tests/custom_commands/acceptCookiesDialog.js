/**
 * @file
 * Custom command to close the Accept Cookies modal, so later visibility tests work.
 */

module.exports = {

    command: async function (browser) {

        let selector = '.eu-cookie-compliance-default-button';
        browser
            .pause(800)
            .element('css selector', '.eu-cookie-compliance-default-button', function (result) {
                if (result.status != -1) {
                    browser.assert.ok(true, "The accept cookies dialog is visible; clicking accept.")
                    browser.click('.eu-cookie-compliance-default-button')
                }
                else {
                    // Element does not exist.
                    browser.assert.ok(true, "The accept cookies dialog is not visible; no need to accept.")
                }
            });

    }

};
