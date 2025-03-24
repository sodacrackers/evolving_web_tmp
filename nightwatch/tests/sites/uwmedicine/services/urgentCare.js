// tests.sites.uwmedicine.services.urgentCare.js
module.exports = {

    'disabled': false,

    '@tags': [
        'services',
        'urgent-care',
        'stevie',
        'grid9'
    ],

    'tests.sites.uwmedicine.services.urgentCare.js': function (browser) {
        const testUrl = browser.globals.sites.stevie.launch_url + '/services/urgent-care';
        const testUrlValidation = 'body.path-node-21946';
        const body = browser.page.urgentCare();

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Urgent Care Page loaded.');

        body
            .verifyLocationSiteLinks(testUrl, testUrlValidation)
/*            .verifyLocationAddressLinks(testUrlValidation)
            .verifySeeAllSpecialties(testUrlValidation)
            .verifySeeFullHoursLinks(testUrlValidation)
            .verifyTelephoneLinks(testUrlValidation)
            .verifyBookOnlineLinks(testUrlValidation)
            .verifyGetInLineLinks(testUrlValidation)
            .verifySeeDetailsLinks(testUrlValidation)
            .verifyGetCareNowLinks(testUrlValidation);
*/
        browser.end();
    },
};
