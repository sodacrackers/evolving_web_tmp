// tests.sites.uwmedicine.search.providers.js
module.exports = {

    'disabled': false,

    '@tags': [
        'search',
        'providers',
        'stevie', ,
        'grid7'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url + '/search/providers';
    },

    'tests.sites.uwmedicine.search.providers.js (Search Providers)': function (browser) {
        const body = browser.page.providers();
        const testUrlValidation = 'body.path-search-providers.search-without-term';
        const browserFamily = browser.options.desiredCapabilities.browserName;

        browser
            .loadPageAndHandleCookiesAlert(this.launch_url, browser)
            .waitForElementVisible(testUrlValidation, 'Provider Search Page loaded.')
            .resizeWindow(1280, 800);

        body
            .verifyProvidersLinks(browser)
            .verifySearchByName(this.launch_url, testUrlValidation, browser, browserFamily)
            .verifySearchBySpecialty(this.launch_url, testUrlValidation, browser, browserFamily)
            .verifySearchByKeyword(this.launch_url, testUrlValidation, browser, browserFamily)
            .verifySearchBySpecialtyDD(this.launch_url, testUrlValidation, browser, browserFamily)
            .verifySearchByLanguageDD(this.launch_url, testUrlValidation, browser, browserFamily)
            .verifySearchByGenderDD(this.launch_url, testUrlValidation, browser, browserFamily)
            .verifyOnlyAcceptingNew(this.launch_url, testUrlValidation, browser, browserFamily)

            // Due to CORVID, online scheduling is temporarily unavailable.
            // this will need to be uncommented when it is back up.
            //.verifyOnlyOnlineScheduling(testUrlValidation, browser)

            .verifySpecificProvider(this.launch_url, testUrlValidation, browser, browserFamily);

        browser.end();
    },
};
