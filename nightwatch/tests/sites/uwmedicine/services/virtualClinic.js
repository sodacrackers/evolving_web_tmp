// tests.sites.uwmedicine.services.virtualClinic.js
module.exports = {
    'disabled': false,
    '@tags': [
        'virtualclinic',
        'stevie',
        'grid10'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url + '/bios/rebecca-abay';
        console.log(this.launch_url);
    },

    'tests.sites.uwmedicine.services.virtualClinic.js': function (browser) {
        const body = browser.page.virtualClinic();
        const testUrl = browser.globals.sites.stevie.launch_url + '/services/virtual-clinic';
        const testUrlValidation = 'body.path-node-49201';
        const browserFamily = browser.options.desiredCapabilities.browserName;

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation,
                'Virtual Clinic Page loaded.');

        body
            .verifyCTALinks(this.launch_url, browserFamily)
            .verifyDownloadLinks(this.launch_url, testUrlValidation)
            .verifyLooseLinks(this.launch_url, testUrlValidation, browserFamily);

        browser.end();
    },
};
