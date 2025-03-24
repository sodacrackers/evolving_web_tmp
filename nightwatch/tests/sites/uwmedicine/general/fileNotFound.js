// tests.sites.uwmedicine.general.fileNotFound.js
module.exports = {
    'disabled': false,
    '@tags': [
        'general',
        '404',
        'stevie', ,
        'grid4'
    ],

    before: function (browser) {

        this.launch_url = browser.globals.sites.stevie.launch_url;
        console.log(this.launch_url);

    },

    'tests.sites.uwmedicine.general.fileNotFound.js (Custom 404 Page)': function (browser) {

        const body = browser.page.fileNotFound();
        const testUrl = this.launch_url + '/specialzzzzzzzzz';
        const testUrlValidation = 'body.is-path-specialzzzzzzzzz';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, testUrl + ' loaded.');

        // body
        //     .verify404Links(this.launch_url, testUrlValidation, browser)

        browser.end();
    },
};
