// tests.sites.uwmedicine.search.searchLocations.js
module.exports = {

    'disabled': false,

    '@tags': [
        'locations',
        'search',
        'stevie',
        'grid8'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url + '/search/locations';
    },


    'tests.sites.uwmedicine.search.searchLocations.js': function (browser) {
        const body = browser.page.searchLocations();
        const testUrl = browser.globals.sites.stevie.launch_url + '/search/locations';
        const testUrlValidation = 'body.path-search-locations';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Locations Search Page loaded.');

        body
            .verifyTelLinks()
            .verifyCardLinks(this.launch_url, testUrlValidation)
            .verifyLocationSearchByCityZip()
            .verifyLocationSearchByMedSpecialtiy(browser)
            .verifyLocationSearchByName();

        browser.end();
    },
};
