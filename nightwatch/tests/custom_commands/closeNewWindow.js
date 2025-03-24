/**
 * @file
 * Custom command to close the Accept Cookies modal, so later visibility tests work.
 */

module.exports = {

    command: async function (browser) {

        browser.windowHandles(function (result) {

            if (result && result.value.length > 1) {

                browser.assert.ok(true, `Closing browser windw "${result.value[1]}"`)
                browser.switchWindow(result.value[1])
                browser.closeWindow()

                browser.assert.ok(true, `Switching to browser windw "${result.value[0]}"`)
                browser.switchWindow(result.value[0])

            }

        });

    }

};
