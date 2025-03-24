// tests.sites.uwmedicine.patient-resources.make-an-appointment.appointment.js
module.exports = {

    'disabled': false,

    '@tags': [
        'patient-resources',
        'appointments',
        'stevie',
        'grid6'
    ],

    before: function (browser) {
        this.launch_url = browser.globals.sites.stevie.launch_url;
        console.log(this.launch_url);
    },

    'Home Page Verify T1 Header - elements and search bar': function (browser) {
        const body = browser.page.makeAnAppointment();
        const testUrl = this.launch_url + '/patient-resources/make-an-appointment';
        const testUrlValidation = 'body.path-node-20836';

        browser
            .loadPageAndHandleCookiesAlert(testUrl, browser)
            .waitForElementVisible(testUrlValidation, 'Make an Appointment Page loaded.');

        body
            .verifyBreadcrumbLinks(this.launch_url, testUrlValidation)
            .verifyLooseLinks(testUrlValidation)
            .verifyGridcardLinks(testUrlValidation)
            .verifySectionCollapse();

        browser.end();
    },
};
