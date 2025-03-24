// tests.sites.uwmedicine.general.feedback.js
module.exports = {
    'disabled': false,
    '@tags': [
        'general',
        'feedback',
        'stevie', ,
        'grid3'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url;
    },

    'tests.sites.uwmedicine.general.feedback.js (Website Feeedback Form)': function (browser) {

        const body = browser.page.feedback();
        const testUrl = this.launch_url + '/forms/website-feedback';
        const testUrlValidation = 'body.path-webform-website_feedback';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Feedback page loaded.');

        body
            .verifyfeedbackFormElements(this.launch_url)
            .verifyGoldenPath(this.launch_url, browser)

        browser.end();
    },
};
