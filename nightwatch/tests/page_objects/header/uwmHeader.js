// page_objects/footer/uwmHeader.js
module.exports = {
    commands: [
        {
            headerSearchFor: function (searchText) {
                // Verifies that the search bar is being shown, clears it, searches for the text
                // provided, then waits for the results. This is a helper function for when other
                // tests would like to search for a given string.
                return this
                    .assert.visible('@t1headerSearchBar', 'Search bar is present.')
                    .clearValue('@t1headerSearchBar')
                    .setValue('@t1headerSearchBar', searchText)
                    .assert.visible('@t1headerSubmitBtn', 'Search submit button is present.')
                    .click('css selector', 'form.header-search-form svg.fa-search:nth-child(2)');
            },
            loadPageAndAcceptCookies: function (pageUrl, testUrlValidation) {
                // loads a page then attempts to handle the Cookies Alert popup.
                // This is a helper function for loading most pages. It requires two arguments:
                // pageUrl -- URL of the page to load
                // testUrlValidation -- a css selector string use to check that the correct page
                //                      has loaded. It should be unique to that page.
                this
                    .navigate(pageUrl)
                    .waitForElementVisible('@t1cookiesAlertButton', 'Cookies alert button found.')
                    .click('@t1cookiesAlertButton');
                this.pause(5000);
                this
                    .waitForElementVisible(testUrlValidation, 'Requested page loaded.');

                return this;
            },
            verifyT1HeaderLinks: function (pageUrl, testUrlValidation) {
                // Abstracts out the tests for the T1 Header links.
                // This is a helper function for testing the T1 Header links for other pages under test.
                // It requires two arguments:
                // pageUrl -- URL of the page to load
                // testUrlValidation -- a css selector string use to check that the correct page
                //                      has loaded. It should be unique to that page.
                // See site.www.general.uwmHeader.js for an example of how to use this within other
                // test pages
                var UWLogoImageSrc = browser.globals.sites.stevie.launch_url + '/themes/custom/uwmbase/dist/images/uw-medicine-logo.svg';

                this
                    .assert.visible('@t1headerImage', 'UW Medicine Image link appears.')
                    .getAttribute('@t1headerImage', 'src', function (result) {
                        this.assert.equal(result.value, UWLogoImageSrc, 'UW Medicine Image has correct source.');
                    });
                this
                    .assert.visible('@t1eCareLink', 'eCare Patient Portal link appears.')
                    .click('@t1eCareLink')
                    .waitForElementVisible('@t1eCarePage', 'eCare Patient Portal link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to requested page.');
                this
                    .assert.visible('@t1providersLink', 'For Providers link appears.')
                    .click('@t1providersLink')
                    .waitForElementVisible('@t1providersPage', 'For Providers link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to requested page.');
                this
                    .assert.visible('@t1researchLink', 'Research link appears.')
                    .click('@t1researchLink')
                    .waitForElementVisible('@t1researchPage', 'Research link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to requested page.');
                this
                    .assert.visible('@t1schoolLink', 'School of Medicine link appears.')
                    .click('@t1schoolLink')
                    .waitForElementVisible('@t1schoolPage', 'School of Medicine link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to requested page.');
                this
                    .assert.visible('@t1contactLink', 'Contact Us link appears.')
                    .click('@t1contactLink')
                    .waitForElementVisible('@t1contactPage', 'Contact Us link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '');

                    return this;
            },
            verifyT2HeaderLinks: function (pageUrl, testUrlValidation) {
                // Abstracts out the tests for the T2 Dropdowns and Header links.
                // This is a helper function for testing the T2 Header links for other pages under test.
                // It requires two arguments:
                // pageUrl -- URL of the page to load
                // testUrlValidation -- a css selector string use to check that the correct page
                //                      has loaded. It should be unique to that page.
                // See site.www.general.uwmHeader.js for an example of how to use this within other
                // test pages
                this
                    .assert.visible('@t2findCareDD', 'Find care drop-down appears.')
                    .click('@t2findCareDD')
                    .waitForElementVisible('@t2urgentCareLink', 'Urgent Care link appears.')
                    .click('@t2urgentCareLink')
                    .waitForElementVisible('@t2urgentCarePage', 'Urgent Care link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findCareDD')
                    .waitForElementVisible('@t2primaryCareLink', 'Primary Care link appears.')
                    .click('@t2primaryCareLink')
                    .waitForElementVisible('@t2primaryCarePage', 'Primary Care link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findCareDD')
                    .waitForElementVisible('@t2virtualClinicLink', 'Virtual Clinic link appears.')
                    .click('@t2virtualClinicLink')
                    .waitForElementVisible('@t2virtualClinicPage', 'Virtual Clinic link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findCareDD')
                    .waitForElementVisible('@t2emergencyLink', 'Emergency Rooms link appears.')
                    .click('@t2emergencyLink')
                    .waitForElementVisible('@t2emergencyPage', 'Emergency Rooms link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findCareDD')
                    .waitForElementVisible('@t2medSpecialtiesLink', 'Medical Specialties link appears.')
                    .click('@t2medSpecialtiesLink')
                    .waitForElementVisible('@t2medSpecialtiesPage', 'Medical Specialties link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findCareDD')
                    .waitForElementVisible('@t2findProvider1Link', 'Find a Provider (under Find Care dropdown) link appears.')
                    .click('@t2findProvider1Link')
                    .waitForElementVisible('@t2findProviderPage', 'Find a Provider (under Find Care dropdown) link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findCareDD')
                    .waitForElementVisible('@t2findLocation1Link', 'Find Location (under Find Care dropdown) link appears.')
                    .click('@t2findLocation1Link')
                    .waitForElementVisible('@t2findLocationPage', 'Find Location (under Find Care dropdown) link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .waitForElementVisible('@t2makeAppt1Link', 'Make an appointment link appears.')
                    .click('@t2makeAppt1Link')
                    .waitForElementVisible('@t2makeApptPage', 'Make an appointment link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
                this
                    .assert.visible('@t2findHealthDD', 'Find Health... drop-down appears.')
                    .click('@t2findHealthDD')
                    .waitForElementVisible('@t2conditionsLink', 'Conditions and symptoms link appears.')
                    .click('@t2conditionsLink')
                    .waitForElementVisible('@t2conditionsPage', 'Conditions and symptoms link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findHealthDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findHealthDD')
                    .waitForElementVisible('@t2preventionLink', 'Prevention and wellness link appears.')
                    .click('@t2preventionLink')
                    .waitForElementVisible('@t2preventionPage', 'Prevention and wellness link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findHealthDD')
                    .waitForElementVisible('@t2patientResourcesLink', 'Patient resources link appears.')
                    .click('@t2patientResourcesLink')
                    .waitForElementVisible('@t2patientResourcesPage', 'Patient resources link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2findCareDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2findHealthDD')
                    .waitForElementVisible('@t2patientEducationLink', 'Patient education link appears.')
                    .click('@t2patientEducationLink')
                    .waitForElementVisible('@t2patientEducationPage', 'Patient education link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
                this
                    .assert.visible('@t2iWantToDD', 'I want to... drop-down appears.')
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2makeAppt2Link', 'Make an appointment link appears.')
                    .click('@t2makeAppt2Link')
                    .waitForElementVisible('@t2makeApptPage', 'Make and appointment link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2iWantToDD', 'Returned to ' + pageUrl + '.');

                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2signUpLink', 'Sign up or Sign in... link appears.')
                    .click('@t2signUpLink')
                    .waitForElementVisible('@t2signUpPage', 'Sign up or Sign in... link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2payBillLink', 'Pay my bill link appears.')
                    .click('@t2payBillLink')
                    .waitForElementVisible('@t2payBillPage', 'Pay my bill link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2iWantToDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2accessLink', 'Access medical... link appears.')
                    .click('@t2accessLink')
                    .waitForElementVisible('@t2accessPage', 'Access medical... link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2iWantToDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2findInterpreterLink', 'Find an interpreter link appears.')
                    .click('@t2findInterpreterLink')
                    .waitForElementVisible('@t2findInterpreterPage', 'Find an interpreter link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2iWantToDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2findLocation2Link', 'Find a location link appears.')
                    .click('@t2findLocation2Link')
                    .waitForElementVisible('@t2findLocationPage', 'Find a location link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2iWantToDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2iWantToDD', 'Find a pharmacy link appears.')
                    .click('@t2findPharmaLink')
                    .waitForElementVisible('@t2findPharmaPage', 'Find a pharmacy link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2iWantToDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2viewPatientLink', 'View all patient... link appears.')
                    .click('@t2viewPatientLink')
                    .waitForElementVisible('@t2viewPatientPage', 'View all patient... link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible('@t2iWantToDD', 'Returned to ' + pageUrl + '.');
                this
                    .click('@t2iWantToDD')
                    .waitForElementVisible('@t2referPatientLink', 'Refer a patient link appears.')
                    .click('@t2referPatientLink')
                    .waitForElementVisible('@t2referPatientPage', 'Refer a patient link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
                this
                    .waitForElementVisible('@t2makeGiftLink', 'Make a Gift link appears.')
                    .click('@t2makeGiftLink')
                    .waitForElementVisible('@t2makeGiftPage', 'Make a Gift link loads correct page.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');

                return this;
            },
            verifyHeaderSearch: function (searchText='location', pageUrl, testUrlValidation) {
                // Abstracts out testing the search bar functionality for the T1 Header.
                // Verifies the search bar is present, clears it, adds supplied test (or 'location' if not
                // provided), clicks the search button, and verifies the search resuilt page is loaded and
                // that there are results found, then returns to the base page under test.
                // See site.www.general.uwmHeader.js for an example of how to use this within other
                // test pages
                this
                    .assert.visible('@t1headerSearchBar', 'Search bar is present.')
                    .clearValue('@t1headerSearchBar')
                    .setValue('@t1headerSearchBar', searchText)
                    .assert.visible('@t1headerSubmitBtn', 'Search submit button is present.')
                    .click('css selector', 'form.header-search-form svg.fa-search:nth-child(2)')
                    .waitForElementVisible('@resetButton', 'Results page loaded.')
                    .waitForElementVisible('@results', 'Found search results.')
                    .navigate(pageUrl)
                    .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');

                return this;
            }
        }
    ],
    elements: {
        resetButton: {
            selector: '//a[@class="btn btn-cta btn-cta-link reset"]',
            locateStrategy: 'xpath'
        },
        results: 'article.search-result-card',
        t1contactLink: '#quickLinksNavigation li:nth-child(9) a',
        t1contactPage: 'body.path-node-21466',
        t1cookiesAlertButton: '.eu-cookie-compliance-default-button',
        t1eCareLink: '#quickLinksNavigation li:nth-child(1) a',
        t1eCarePage: 'body.path-node-20841',
        t1headerImage: '.uwm-header a.navbar-brand img',
        t1headerSearchBar: 'input[type=text]:nth-child(1)',
        t1headerSubmitBtn: 'form.header-search-form svg.fa-search:nth-child(2)',
        t1homePage: 'body.is-path-frontpage',
        t1providersLink: '#quickLinksNavigation li:nth-child(3) a',
        t1providersPage: '.homepage-header-inset li:nth-child(1)',
        t1researchLink: '#quickLinksNavigation li:nth-child(5) a',
        t1researchPage: 'body.path-node-21421',
        t1schoolLink: '#quickLinksNavigation li:nth-child(7) a',
        t1schoolPage: 'body.path-node-20876',
        t2accessLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[4]',
            locateStrategy: 'xpath'
        },
        t2accessPage: 'body.path-node-21516',
        t2conditionsLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[3]/div[1]/a[1]',
            locateStrategy: 'xpath'
        },
        t2conditionsPage: 'body#ICP .bx-viewport',
        t2emergencyLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/div[1]/a[4]',
            locateStrategy: 'xpath'
        },
        t2emergencyPage: 'body.path-node-20736',
        t2findCareDD: {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/a[1]',
            locateStrategy: 'xpath'
        },
        t2findHealthDD: {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[3]/a[1]',
            locateStrategy: 'xpath'
        },
        t2findInterpreterLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[5]',
            locateStrategy: 'xpath'
        },
        t2findInterpreterPage: 'body.path-node-21371',
        t2findLocation1Link:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/div[1]/a[7]',
            locateStrategy: 'xpath'
        },
        t2findLocation2Link:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[6]',
            locateStrategy: 'xpath'
        },
        t2findLocationPage: 'body.path-search-locations',
        t2findPharmaLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[7]',
            locateStrategy: 'xpath'
        },
        t2findPharmaPage: 'body.path-node-21376',
        t2findProvider1Link:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/div[1]/a[6]',
            locateStrategy: 'xpath'
        },
        t2findProviderPage: 'body.path-search-providers',
        t2iWantToDD: {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/a[1]',
            locateStrategy: 'xpath'
        },
        t2makeAppt1Link:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[2]/a[1]',
            locateStrategy: 'xpath'
        },
        t2makeApptPage: 'body.path-node-20836',
        t2makeAppt2Link:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[1]',
            locateStrategy: 'xpath'
        },
        t2makeGiftLink:  'div#makeAGift a',
        t2makeGiftPage: 'body.page-id-1096',
        t2medSpecialtiesLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/div[1]/a[5]',
            locateStrategy: 'xpath'
        },
        t2medSpecialtiesPage: 'body.path-node-21746',
        t2patientEducationLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[3]/div[1]/a[4]',
            locateStrategy: 'xpath'
        },
        t2patientEducationPage: 'body.path-node-21386',
        t2patientResourcesLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[3]/div[1]/a[3]',
            locateStrategy: 'xpath'
        },
        t2patientResourcesPage: 'body.path-node-20866',
        t2payBillLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[3]',
            locateStrategy: 'xpath'
        },
        t2payBillPage: 'body.path-node-50051',
        t2preventionLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[3]/div[1]/a[2]',
            locateStrategy: 'xpath'
        },
        t2preventionPage: 'body#ICP .BreadCrumbs ',
        t2primaryCareLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/div[1]/a[2]',
            locateStrategy: 'xpath'
        },
        t2primaryCarePage: 'body.path-node-20701',
        t2referPatientLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[9]',
            locateStrategy: 'xpath'
        },
        t2referPatientPage: 'body.path-node-21401',
        t2signUpLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[2]',
            locateStrategy: 'xpath'
        },
        t2signUpPage: 'body.path-node-20841',
        t2urgentCareLink: {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/div[1]/a[1]',
            locateStrategy: 'xpath'
        },
        t2urgentCarePage: 'body.path-node-21946',
        t2viewPatientLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[4]/div[1]/a[8]',
            locateStrategy: 'xpath'
        },
        t2viewPatientPage: 'body.path-node-20866',
        t2virtualClinicLink:  {
            selector: '/html[1]/body[1]/header[1]/nav[1]/div[3]/div[1]/ul[1]/li[1]/div[1]/a[3]',
            locateStrategy: 'xpath'
        },
        t2virtualClinicPage: 'body.path-node-49201'
    }
};
