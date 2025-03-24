// tests.sites.uwmedicine.home.homepage.js
module.exports = {

    'disabled': false,

    '@tags': [
        'home',
        'header',
        'footer',
        'general',
        'stevie',
        'grid14'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url;
        console.log(this.launch_url);
    },

    'tests.sites.uwmedicine.home.homepage.js': function (browser) {
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
        const footer = browser.page.uwmFooter();
        const body = browser.page.uwmHome();
        const testUrl = this.launch_url;
        const testUrlValidation = 'body.is-path-frontpage';
        const searchText = 'location';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Homepage loaded.');

        header
            .verifyHeaderLinks(testUrl, testUrlValidation)
            .verifyHeaderSearch(searchText, testUrl, testUrlValidation)

        body
            .verifyHeroCtaLinks(testUrl, testUrlValidation)
            .verifySectionLinks(testUrl, testUrlValidation)
            .verifySpotlightLinks(testUrl, testUrlValidation)
            .verifyHomePageVideo(browser, testUrlValidation);

        footer
            .verifySocialLinks(testUrl, testUrlValidation)
            .verifyFooterLinks(browser, testUrl, testUrlValidation)

        browser.end();
    },
};
