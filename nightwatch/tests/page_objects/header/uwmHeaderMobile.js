// page_objects/footer/uwmHeader.js
module.exports = {
    commands: [
        {
            verifyHeaderLinks: function (pageUrl, testUrlValidation) {
                // Abstracts out the tests for the Mobile Header links.
                // This is a helper function for testing the Mobile Header links
                // for all pages. It uses the Home Page as a base, but that
                // can be easily changed.
                // It requires two arguments:
                // pageUrl -- URL of the page to load (in this case the homepage)
                // testUrlValidation -- a css selector string use to check that
                // the correct page (in this case, the homepage) has loaded. It
                // should be unique to that page.
                // See site.www.general.uwmHeader.js for an example of how to
                // use this within other pages
                var UWLogoImageSrc = pageUrl +
                    '/themes/custom/uwmbase/dist/images/uw-medicine-logo.svg'

                this
                    .assert.visible('@headerImage',
                        'UW Medicine Image link appears.')
                    .getAttribute('@headerImage', 'src', function (result) {
                        this.assert.equal(result.value, UWLogoImageSrc,
                            'UW Medicine Image has correct source.');
                    });
                let navToggle = '@navbarToggleOn';
                let findCareToggle = '@findCareToggleOpen';
                let iWantToggle = '@iWantToToggle';
                let findHealthToggle = '@findHealthToggleOn';

                // Find Care Section
                let careLinks = [
                    '@urgentCareLink',
                    '@primaryCareLink',
                    '@virtualClinicLink',
                    '@emergencyLink',
                    '@medicalSpecialtiesLink',
                    '@findProviderLink',
                    '@findLocationLink1',
                ];
                let pageVals =[
                    this.elements.urgentCarePage,
                    this.elements.primaryCarePage,
                    this.elements.virtualClinicPage,
                    this.elements.emergencyPage,
                    this.elements.medicalSpecialtiesPage,
                    this.elements.findProviderPage,
                    this.elements.findLocationPage1,
                ];

                for (let i=0; i<careLinks.length; i++) {
                    this
                        .waitForElementVisible(navToggle)
                        .moveToElement(navToggle, 1, 1)
                        .click(navToggle)
                        .waitForElementVisible(findCareToggle)
                        .click(findCareToggle)
                        .verifyLinkClick(careLinks[i], pageVals[i], pageUrl,
                            testUrlValidation, 'Mobile Header - Find Care Link' +
                            i + ' verified.')
                };

                // Make Appointment Link
                this
                    .waitForElementVisible(navToggle)
                    .moveToElement(navToggle, 1, 1)
                    .click(navToggle)
                    .verifyLinkClick('@makeAppointmentLink',
                        this.elements.makeAppointmentPage, pageUrl,
                        testUrlValidation, 'Mobile Header - Make Appointment' +
                        ' Link verified.');

                // Find Health & Patient Resources section
                let healthLinks = [
                    '@conditionsLink',
                    '@preventionLink',
                    '@patientResourcesLink',
                    '@patientEducationLink',
                ];
                let healthVals = [
                    this.elements.conditionsPage,
                    this.elements.preventionPage,
                    this.elements.patientResourcesPage,
                    this.elements.patientEducationPage,
                ];
                for (let i = 0; i < healthLinks.length; i++) {
                    this
                        .waitForElementVisible(navToggle)
                        .moveToElement(navToggle, 1, 1)
                        .click(navToggle)
                        .waitForElementVisible(findHealthToggle)
                        .click(findHealthToggle)
                        .verifyLinkClick(healthLinks[i], healthVals[i], pageUrl,
                            testUrlValidation, 'Mobile Header - Find Health &' +
                            ' Patient Resources Link' + i + ' verified.');
                };

                // I Want To section
                let wantLinks = [
                    '@makeApptLink',
                    '@signUpLink',
                    '@payBillLink',
                    '@accessMedicalLink',
                    '@findInterpreterLink',
                    '@findLocationLink2',
                    '@findPharmaLink',
                    '@viewResourcesLink',
                    '@referPatientLink',
                ];
                let wantVals = [
                    this.elements.makeApptPage,
                    this.elements.signUpPage,
                    this.elements.payBillPage,
                    this.elements.accessMedicalPage,
                    this.elements.findInterpreterPage,
                    this.elements.findLocationPage2,
                    this.elements.findPharmaPagePage,
                    this.elements.viewResourcesPage,
                    this.elements.referPatientPage,
                ];
                for (let i = 0; i < wantLinks.length; i++) {
                    this
                        .waitForElementVisible(navToggle)
                        .moveToElement(navToggle, 1, 1)
                        .click(navToggle)
                        .waitForElementVisible(iWantToggle)
                        .click(iWantToggle)
                        .verifyLinkClick(wantLinks[i], wantVals[i], pageUrl,
                            testUrlValidation, 'Mobile Header - I Want To ' +
                            'link ' + i + ' verified.');
                };

              // Make A Gift Link
                this
                    .waitForElementVisible(navToggle)
                    .moveToElement(navToggle, 1, 1)
                    .click(navToggle)
                    .pause(1000)
                    .verifyLinkClick('@makeGiftLink',
                        this.elements.makeGiftPage, pageUrl,
                        testUrlValidation, 'Mobile Header - Make Gift Link ' +
                        'verified.');

              // Bottom Links section
                let bottomLinks = [
                    '@eCarePortalLink',
                    '@forProvidersLink',
                    '@researchLink',
                    '@schoolLink',
                    '@contactLink',
                ];
                let bottomVals = [
                    this.elements.eCarePortalPage,
                    this.elements.forProvidersPage,
                    this.elements.researchPage,
                    this.elements.schoolPage,
                    this.elements.contactPage,
                ];
                for (let i = 0; i < bottomLinks.length; i++) {
                    this
                        .waitForElementVisible(navToggle)
                        .moveToElement(navToggle, 1, 1)
                        .click(navToggle)
                        .verifyLinkClick(bottomLinks[i], bottomVals[i], pageUrl,
                            testUrlValidation, 'Mobile Header - Bottom Links ' +
                            'link ' + i + ' verified.');
                };

                return this;
            },
            verifyHeaderSearch: function (searchText='location', pageUrl,
                testUrlValidation) {
                // Abstracts out testing the search bar functionality for the T1 Header.
                // Verifies the search bar is present, clears it, adds supplied test (or 'location' if not
                // provided), clicks the search button, and verifies the search resuilt page is loaded and
                // that there are results found, then returns to the base page under test.
                // See site.www.general.uwmHeader.js for an example of how to use this within other
                // test pages
                this
                    .assert.visible('@headerSearchIcon',
                        'Search bar is present.')
                    .click('@headerSearchIcon')
                    .waitForElementVisible('@searchTextbox')
                    .clearValue('@searchTextbox')
                    .setValue('@searchTextbox', searchText)
                    .submitForm('@searchTextbox')
                    .waitForElementVisible('@searchReset',
                        'Results page loaded.')
                    .waitForElementVisible('@results', 'Found search results.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' +
                        pageUrl + '.');

                return this;
            }
        }
    ],
    elements: {
        headerImage: '.uwm-header a.navbar-brand img',
        headerSearchIcon: 'body > header > nav > div.purple.container-fluid ' +
        '> button.navbar-toggler.ml-auto.text-white > svg',
        searchForm: 'body > header > nav > div.search-colxpse.collapse.show > form',
        searchTextbox: 'body > header > nav > div.search-collapse.collapse' +
            '.show > form > div > input',
        searchReset: '#main-container > section.content-topper > div > div:'
            + 'nth-child(2) > div.filters-wrap > div.submit-wrapper > span.' +
            'uwm-accent-color__blue > a',
        results: 'article.search-result-card',
        // toggles
        navbarToggleOn: 'body > header > nav > div.purple.container-fluid > button:nth-child(3)',
        navbarToggleOff: 'button.navbar-toggler',
        findCareToggleOpen: 'div#mainNavigationMobile > ul.navbar-nav > li.nav-item.dropdown > a',
        findCareToggleClose: 'div#mainNavigationMobile > ul.navbar-nav > li.nav-item.dropdown.show > a',
        findHealthToggleOn: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(3) > a',
        iWantToToggle: '#mainNavigationMobile > ul > ' +
            'li:nth-child(4) > a',
        // Find Care Section
        urgentCareLink: 'div#mainNavigationMobile > ul.navbar-nav > ' +
            'li.nav-item.dropdown > div > a:nth-child(1)',
        urgentCarePage: 'body.path-node-21946',
        primaryCareLink: 'div#mainNavigationMobile > ul.navbar-nav > ' +
            'li.nav-item.dropdown > div > a:nth-child(2)',
        primaryCarePage: 'body.path-node-20701',
        virtualClinicLink: 'div#mainNavigationMobile > ul.navbar-nav > ' +
            'li.nav-item.dropdown > div > a:nth-child(3)',
        virtualClinicPage: 'body.path-node-49201',
        emergencyLink: 'div#mainNavigationMobile > ul.navbar-nav > ' +
            'li.nav-item.dropdown > div > a:nth-child(4)',
        emergencyPage: 'body.path-node-20736',
        medicalSpecialtiesLink: 'div#mainNavigationMobile > ul.navbar-nav > ' +
            'li.nav-item.dropdown > div > a:nth-child(5)',
        medicalSpecialtiesPage: 'body.path-node-21746',
        findProviderLink: 'div#mainNavigationMobile > ul.navbar-nav > ' +
            'li.nav-item.dropdown > div > a:nth-child(6)',
        findProviderPage: 'body.path-search-providers',
        findLocationLink1: 'div#mainNavigationMobile > ul.navbar-nav > ' +
            'li.nav-item.dropdown > div > a:nth-child(7)',
        findLocationPage1: 'body.path-search-locations',
        // Make an Appointment Section
        makeAppointmentLink: '#mainNavigationMobile > ul > li:nth-child(2)',
        makeAppointmentPage: 'body.path-node-20836',
        // Find health & patient resources section
        conditionsLink: '#mainNavigationMobile > ul > li.nav-item.dropdown' +
            '.show > div > a:nth-child(1)',
        conditionsPage: 'body#ICP .bx-viewport',
        preventionLink: '#mainNavigationMobile > ul > li.nav-item.dropdown' +
            '.show > div > a:nth-child(2)',
        preventionPage: 'body#ICP .BreadCrumbs',
        patientResourcesLink: '#mainNavigationMobile > ul > li.nav-item.dropdown' +
            '.show > div > a:nth-child(3)',
        patientResourcesPage: 'body.path-node-20866',
        patientEducationLink: '#mainNavigationMobile > ul > li.nav-item.dropdown' +
            '.show > div > a:nth-child(4)',
        patientEducationPage: 'body.path-node-21386',
        // I Want To section
        makeApptLink: '#mainNavigationMobile > ul > li.nav-item.dropdown.show' +
            ' > div > a:nth-child(1)',
        makeApptPage: 'body.path-node-20836',
        signUpLink: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(4) > div > a:nth-child(2)',
        signUpPage: 'body.path-node-20841',
        payBillLink: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(4) > div > a:nth-child(3)',
        payBillPage: 'body.path-node-50051',
        accessMedicalLink: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(4) > div > a:nth-child(4)',
        accessMedicalPage: 'body.path-node-21516',
        findInterpreterLink: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(4) > div > a:nth-child(5)',
        findInterpreterPage: 'body.path-node-21371',
        findLocationLink2: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(4) > div > a:nth-child(6)',
        findLocationPage2: 'body.path-search-locations',
        findPharmaLink: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(4) > div > a:nth-child(7)',
        findPharmaPagePage: 'body.path-node-21376',
        viewResourcesLink: '#mainNavigationMobile > ul > li.nav-item.drop' +
            'down.show > div > a:nth-child(8)',
        viewResourcesPage: 'body.path-node-20866',
        referPatientLink: '#mainNavigationMobile > ul.navbar-nav > ' +
            'li:nth-child(4) > div > a:nth-child(9)',
        referPatientPage: 'body.path-node-21401',
        // Make a Gift section
        makeGiftLink: '#mainNavigationMobile > div.make-a-gift-navigation > ' +
            'div > div > a',
        makeGiftPage: '#secureContainer',
        // Bottom Links Section
        eCarePortalLink: '#mainNavigationMobile > div.uwm-quick-links > ul >' +
            ' li:nth-child(1) > a',
        eCarePortalPage: 'body.path-node-20841',
        forProvidersLink: '#mainNavigationMobile > div.uwm-quick-links > ul ' +
            '> li:nth-child(3) > a',
        forProvidersPage: 'main#bcm-skip-to-main',
        researchLink: '#mainNavigationMobile > div.uwm-quick-links > ul >' +
            ' li:nth-child(5) > a',
        researchPage: 'body.path-node-21421',
        schoolLink: '#mainNavigationMobile > div.uwm-quick-links > ul > ' +
            'li:nth-child(7) > a',
        schoolPage: 'body.path-node-20876',
        contactLink: '#mainNavigationMobile > div.uwm-quick-links > ul > ' +
            'li:nth-child(9) > a',
        contactPage: 'body.path-node-21466',
    }
};
