// tests.sites.uwmedicine.specialties.primaryCare.js
module.exports = {
    'disabled': false,
    '@tags': [
        'primarycare',
        'stevie', ,
        'grid11'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url;
        console.log(this.launch_url);
    },

    'tests.sites.uwmedicine.specialties.primaryCare.js': function (browser) {
        const body = browser.page.primaryCare();
        const testUrl = this.launch_url + '/specialties/primary-care';
        const testUrlValidation = 'body.path-node-20701';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Primary Care Page loaded.');

        body
            .verifyCTALinks(testUrl, testUrlValidation)
            .verifyLearnMoreLinks(testUrl, testUrlValidation)
            .verifyViewFullBioLink(testUrl, testUrlValidation)
            .verifyWatchVideo(testUrl, testUrlValidation)
            .verifyLocationsCards(testUrl, testUrlValidation);

        browser.end();
    },
};
