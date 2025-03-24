// tests.sites.uwmedicine.specialties.js
module.exports = {
    'disabled': false,
    '@tags': [
        'specialties',
        'allergy',
        'stevie', ,
        'grid13'
    ],

    'tests.sites.uwmedicine.specialtiesAllergy.js (Specialties child page [Allergies & Immunology])': function (browser) {
        const body = browser.page.specialtiesAllergy();
        const testUrl = browser.globals.sites.stevie.launch_url + '/specialties/allergy-immunology';
        const testUrlValidation = 'body.path-node-20711';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation,
                'Specialties - Allergy-Immunology Page loaded.');

        body
            .verifyBlueCTAs(testUrl, testUrlValidation, browser)
            .verifyAccordion(testUrl, testUrlValidation)
            .verifyLocationCards(testUrl, testUrlValidation)
            .verifyWhereToGo(testUrl, testUrlValidation);

        browser.end();
    },
};
