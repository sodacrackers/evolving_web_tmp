// tests.sites.uwmedicine.patient-resources.make-an-appointment.appointmentpat  .js
module.exports = {
    'disabled': false,
    '@tags': [
        'header',
        'footer',
        'patient-resources',
        'appointments'
    ],

    'Home Page Verify T1 Header - elements and search bar': function (browser) {
        const header = browser.page.uwmHeader();
        const footer = browser.page.uwmFooter();
        const body = browser.page.makeAnAppointment();
        const testUrl = browser.globals.sites.stevie.launch_url;
        const testUrlValidation = 'body.is-path-frontpage';
        const searchText = 'location';

        header
            .loadPageAndAcceptCookies(testUrl, testUrlValidation)
            .verifyT1HeaderLinks(testUrl, testUrlValidation)
            .verifyHeaderSearch(searchText, testUrl, testUrlValidation)
            .verifyT2HeaderLinks(testUrl, testUrlValidation);

        body
            .verifyHeroCtaLinks(testUrl, testUrlValidation)
            .verifySectionLinks(testUrl, testUrlValidation)
            .verifySpotlightLinks(testUrl, testUrlValidation);

        footer
            .verifySocialLinks(testUrl, testUrlValidation)
            .verifyT1FooterLinks(testUrl, testUrlValidation)
            .verifyT2FooterLinks(testUrl, testUrlValidation);
        browser.end();
    },
};
