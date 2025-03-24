// tests.sites.uwmedicine.specialties.js
module.exports = {

    'disabled': false,

    '@tags': [
        'specialties',
        'stevie', ,
        'grid12'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url;
        console.log(this.launch_url);
    },

    'tests.sites.uwmedicine.specialties.js (Specialties parent page)': function (browser) {
        const body = browser.page.specialties();
        const testUrl = this.launch_url + '/specialties';
        const testUrlValidation = 'body.path-node-21746';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Specialties Page loaded.');

        body
            .verifyCommonSpecialtiesLinks(testUrl, testUrlValidation)
            .verifyCareYouNeedLinks(testUrl, testUrlValidation)
            .verifyAllMedSpecialtiesLinks(testUrl, testUrlValidation)

        browser.end();
    },
};
