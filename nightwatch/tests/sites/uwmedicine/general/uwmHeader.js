// tests.sites.uwmedicine.general.uwmHeader.js
module.exports = {

    'disabled': false,

    '@tags': [
        'header',
        'general',
        'stevie',
        'grid5'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url;
        console.log(this.launch_url);
    },

    'Verify T1 Header - elements and search bar for Home page': function (browser) {
        let testUrl = this.launch_url;
        let testUrlValidation = 'body.path-node-48106';
        let searchText = 'location';
        let header;

        const device = browser.options.desiredCapabilities.device;
        //console.log(device);

        switch (device) {
            case 'Samsung Galaxy S9 Plus':
            case 'Google Pixel 4 XL':
            case 'Samsung Galaxy Tab S6':
                header = browser.page.uwmHeaderMobile();
                break;
            default:
                header = browser.page.uwmHeaderDesktop();
        }

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Home page loaded.');

        header
            .verifyHeaderLinks(testUrl, testUrlValidation)
            .verifyHeaderSearch(searchText, testUrl, testUrlValidation);
        browser.end();
    },
};
