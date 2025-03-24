// page_objects.providers.js
module.exports = {

//    url: browser.globals.sites.stevie.launch_url + '/search/providers',

	commands:[
		{
            verifyProvidersLinks: function (browser) {
                // Verify that all of the links and form elements appear
                browser.assert.ok(true, 'Verifying Provider Links');
                let links = [
                    '@formTextbox',
                    '@formMedSpecialtiesDD',
                    '@formLanguageDD',
                    '@formGenderDD',
                    '@formSearchButton'
                ];
                let msg = [
                    'Text Box',
                    'Specialties Drop Down',
                    'Language Drop Down',
                    'Gender Drop Down',
                    'Search Button'
                ];
                for (let i=0; i<links.length; i++) {
                    this.verifyLink(links[i], msg[i]);
                };
                this.assert.elementPresent('@formNewPatientsCheckbox');

                // COVID: commenting out until Online Scheduling is back.
                //this.assert.elementPresent('@formOnlineSchedulingCheckbox');
                this.assert.elementPresent('@pager', 'Page is paginated.');

                return this;
            },
            verifySearchByName: function (launch_url, urlValidator, browser, browserFamily) {
                // Enter a name into serach box. Verify it finds the correct provider,
                // return to this page.
                browser.assert.ok(true, 'Verifying Search By Name.');
                this
                    .waitForElementVisible('@formTextbox')
                    .clearValue('@formTextbox')
                    .setValue('@formTextbox', 'Larry S Dean');

                if (browserFamily === 'Chrome'){
                    this.submitForm('@formTextbox');
                } else {
                    this
                        .click('@pageTitleText')
                        .waitForElementPresent('@formSearchButton');
                    browser.moveTo('@formSearchButton');
                    this.pause(3000)
                    this
                        .waitForElementVisible('@formSearchButton')
                        .click('@formSearchButton')
                        .pause(3000);
                };

                this
                    .waitForElementPresent('@formResetButton')
                    .expect.element('@card1ProviderName').text.to.contain('Larry S. Dean');

                this
                    .navigate(launch_url)
                    .pause(3000)
                    .waitForElementVisible(urlValidator, 'Returned to Provider Search Page');

                return this;
            },
            verifySearchBySpecialty: function (launch_url, urlValidator, browser, browserFamily) {
                // Search for a specialty ('Pediatric cardiology'), verify results all contain
                // providers who have 'cardiology' as a specialty, return to page
                browser.assert.ok(true, 'Verifying Search by Specialty');
                this
                    .waitForElementVisible('@formTextbox')
                    .clearValue('@formTextbox')
                    .setValue('@formTextbox', 'pediatric cardiology');

                if (browserFamily === 'Chrome') {
                    console.log('Attempting to submit form.')
                    this
                        .submitForm('@formTextbox')
                        .pause(3000);
                } else {
                    this
                        .click('@pageTitleText')
                        .waitForElementPresent('@formSearchButton');
                    browser.moveTo('@formSearchButton');
                    this
                        .click('@formSearchButton')
                        .pause(3000);
                };

                this
                    .waitForElementPresent('@formResetButton');

                const cardCss = 'article.view-mode-provider_card';
                browser.elements('css selector', cardCss, function (result) {
                    for (let i=1; i<result.value.length+1; i++) {
                        const specialtyText = cardCss + ':nth-child(' + i
                            + ') .provider-card__specialties div';
                        browser.assert.containsText(specialtyText, 'ardiology',
                            'Provider ' + i + ' has Cardiology specialty.');
                    }
                });
                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Returned to Provider search page.');

                return this;
            },
            verifySearchByKeyword: function (launch_url, urlValidator, browser, browserFamily) {
                // Search for the keyword 'Primary care', validate results, come back to
                // this page
                browser.assert.ok(true, 'Verifying Searh by Keyword');
                this
                    .waitForElementVisible('@formTextbox')
                    .clearValue('@formTextbox')
                    .setValue('@formTextbox', 'primary care')

                if (browserFamily === 'Chrome') {
                    this.submitForm('@formTextbox');
                } else {
                    this
                        .click('@pageTitleText')
                        .waitForElementPresent('@formSearchButton');
                    browser.moveTo('@formSearchButton');
                    this
                        .click('@formSearchButton')
                        .pause(3000);
                };

                this
                    .waitForElementPresent('@formResetButton');

                const cardCss = 'article.view-mode-provider_card';
                browser.elements('css selector', cardCss, function (result) {
                    //
                    for (let i = 1; i < result.value.length + 1; i++) {
                        const specialtyText = cardCss + ':nth-child(' + i
                            + ') .provider-card__specialties div';
                        browser.assert.containsText(specialtyText, 'Primary care',
                            'Provider ' + i + ' has keyword "Primary".');
                    }

                    return this;
                });
                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Returned to Provider search page.');

                return this;
            },
            verifySearchBySpecialtyDD: function (launch_url, urlValidator, browser, browserFamily) {
                // Select the 4th item down on the Specialties drop down ('Advanced
                // Heart Failure & Transplant). Search for that. Validate that
                // the ocrrect results were found. Return to this page.
                let advHeartFailTransText = 'Advanced Heart Failure & Transplant';
                let advHeartFailTransDDItem = 'ul.dropdown-menu li:nth-child(4)';

                browser.assert.ok(true, 'Verifying Search by Specialty Dropdown');

                this
                    .waitForElementVisible('@formMedSpecialtiesDD');

                if (browserFamily === 'Chrome') {
                    this
                        .click('@formMedSpecialtiesDD')
                        .click(advHeartFailTransDDItem)
                        .submitForm('@formTextbox');
                } else {
                    browser.moveTo('@formMedSpecialtiesDD');
                    this.click('@formMedSpecialtiesDD');
                    this.waitForElementPresent(advHeartFailTransDDItem);
                    browser.moveTo(advHeartFailTransDDItem);
                    this
                        .click(advHeartFailTransDDItem)
                        .waitForElementPresent('@formSearchButton');
                    browser.moveTo('@formSearchButton');
                    this
                        .click('@formSearchButton')
                };

                this
                    .waitForElementPresent('@formResetButton')
                    .waitForElementVisible('@resultsTitle')
                    .assert.containsText('@resultsTitle', advHeartFailTransText,
                        'Search Results are for ' + advHeartFailTransText);

                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Return to Provider search page.')

                return this;
            },
            verifySearchByLanguageDD: function (launch_url, urlValidator, browser, browserFamily) {
                // Click language drop down, and select Arabic. The validate results
                // by making sure the first result it 'Nazem Akoum'. Return
                // to this page.
                browser.assert.ok(true, 'Verifying Search by Language Drop Down');
                let name = 'Nazem Akoum';

                this
                    .waitForElementVisible('@formLanguageDD')
                if (browserFamily === 'Chrome') {
                    this
                        .click('@formLanguageDD')
                        .click('@arabicDDItem')
                        .submitForm('@formTextbox');
                } else {
                    browser.moveTo('@formLanguageDD');
                    this.click('@formLanguageDD');
                    this.waitForElementPresent('@arabicDDItem');
                    browser.moveTo('@arabicDDItem');
                    this.click('@arabicDDItem');
                    this.waitForElementPresent('@formSearchButton');
                    browser.moveTo('@formSearchButton');
                    this.click('@formSearchButton');
                };

                this
                    .waitForElementPresent('@formResetButton')
                    .waitForElementPresent('@resultsTitle');

                this
                    .expect.element('@card1ProviderName').text.to.contain(name);

                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Return to Provider search page.')

                return this;
            },
            verifySearchByGenderDD: function (launch_url, urlValidator, browser, browserFamily) {
                // Click Gender drop down. Select Female. Click Search.
                // Validate that the first result is Sheida P. Aalami
                let name = 'Sheida P. Aalami';
                browser.assert.ok(true, 'Verifying Search by Gender Dropdown.');

                this
                    .waitForElementVisible('@formGenderDD')
                if (browserFamily === 'Chrome') {
                    this
                        .click('@formGenderDD')
                        .click('@femaleDDItem')
                        .submitForm('@formTextbox');
                } else {
                    browser.moveTo('@formGenderDD');
                    this.click('@formGenderDD');
                    this.waitForElementPresent('@femaleDDItem');
                    browser.moveTo('@femaleDDItem');
                    this.click('@femaleDDItem');
                    this.waitForElementPresent('@formSearchButton');
                    browser.moveTo('@formSearchButton');
                    this.click('@formSearchButton');
                };

                this
                    .waitForElementPresent('@formResetButton')
                    .waitForElementVisible('@resultsTitle');

                this
                    .expect.element('@card1ProviderName').text.to.contain(name);

                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Return to Provider search page.')

                return this;
            },
            verifyOnlyAcceptingNew: function (launch_url, urlValidator, browser, browserFamily) {
                // Select the 'Only show providers accepting new patients'
                // checkbox. Search. Verify all the cards in the first page of
                // results have the 'Accepting new and returning patients'
                // text. Return to this page.
                browser.assert.ok(true, 'Verifying Accepting New Patients Checkbox.');
                this
                    .waitForElementVisible('@formNewPatientsCheckbox')
                if (browserFamily === 'Chrome') {
                    this
                        .click('@formNewPatientsCheckbox')
                        .submitForm('@formTextbox');
                } else {
                    browser.moveTo('@formNewPatientsCheckbox');
                    this.click('@formNewPatientsCheckbox');
                    browser.assert.ok(true, 'Clicked New Patients Checkbox.');
                    this.waitForElementPresent('@formSearchButton');
                    browser.moveTo('@formSearchButton');
                    this.click('@formSearchButton')
                };

                this
                    .waitForElementPresent('@formResetButton');

                const cardCss = 'article.view-mode-provider_card';
                browser.elements('css selector', cardCss, function (result) {
                    for (let i = 1; i < result.value.length + 1; i++) {
                        const acceptNew = cardCss + ':nth-child(' + i +
                            ') .provider-card__accepting-patients';
                        browser.assert.elementPresent(acceptNew, 'Result ' + i +
                            ' is accepting new patients.');
                    }
                });

                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Return to Provider search page.')

                return this;
            },
            verifyOnlyOnlineScheduling: function (launch_url, urlValidator, browser, browserFamily) {
                // Select the 'Only show providers with online scheduling'
                // checkbox. Search. Verify all the cards in the first page of
                // results have the 'Book Online' button present. Return to this page.
                this.expect.element('@formOnlineSchedulingCheckbox').to.not.be.selected;

                this
                    .click('@formOnlineSchedulingCheckbox')
                    .expect.element('@formOnlineSchedulingCheckbox').to.be.selected;

                this
                    .click('@formSearchButton')
                    .waitForElementVisible('@formResetButton');

                const cardCss = 'article.view-mode-provider_card';
                browser.elements('css selector', cardCss, function (result) {
                    for (let i = 1; i < result.value.length + 1; i++) {
                        const bookOnline = cardCss + ':nth-child(' + i +
                            ') .provider-card__book-online';
                        browser.assert.elementPresent(bookOnline, 'Result ' + i +
                            ' has Book Online option.');
                    }
                });

                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Return to Provider search page.')

                return this;
            },
            verifySpecificProvider: function (launch_url, urlValidator, browser, browserFamily) {
                // Searches for a specific provider (Larry S Dean), and then validates
                // that all elements are on the result provider card. (Larry S Dean
                // happens to have all of the optional elements). Then return to this page.
                browser.assert.ok(true, 'Verifying Specific Provider.');
                this
                    .waitForElementVisible('@formTextbox')
                    .clearValue('@formTextbox')
                    .setValue('@formTextbox', 'Larry S Dean')

                if (browserFamily === 'Chrome') {
                    this.submitForm('@formTextbox');
                } else {
                    this
                        .click('@formSearchButton')
                        .pause(3000)
                };

                this
                    .waitForElementPresent('@formResetButton');

                this.expect.element('@card1ProviderName').text.to.contain('Larry S. Dean');
                this
                    .assert.visible('@cardTitle',
                        'Card Title for Larry S Dean verified')
                    .assert.visible('@accepting',
                        'Accepting New Patients verified')
                    .assert.visible('@specialtiesLabel',
                        'Medical Specialties label verified')
                    .assert.visible('@specialtiesItems',
                        'Medical Specialties are listed verified')
                    .assert.visible('@appointmentsLabel',
                        'Appointments label text verified')
                    .assert.visible('@calendarIcon',
                        'Appointments calendar icon verified')
                    .assert.visible('@locationsLabel',
                        'Locations label text verified')
                    .assert.visible('@locationsPinIcon',
                        'Locations Pin icon verified')
                    // Larry S Dean should have 2 location links
                    .assert.elementCount('@locationsItems', 2,
                        'Correct number of Location links found')
                    .assert.visible('@locationsItemOne',
                        'First location link verified')
                    .assert.visible('@locationItemsTwo',
                        'Second location link verified')
                    .assert.visible('@appointmentsViewContactDetailButton',
                        'View Contact Details button verified')
                    .assert.visible('@seeMoreButton',
                        'See More button is present')

                this
                    .navigate(launch_url)
                    .pause(3000)
                    .waitForElementVisible(urlValidator, 'Returned to Provider Search Page');

                return this;
            },
		}
    ],

    elements: {
        formTextbox: 'input.form-text',
        formMedSpecialtiesDD: '.dm-facet-id-provider_facet_expertise ' +
            '.filter-option-inner-inner',
        formLanguageDD: '.dm-facet-id-provider_facet_languages ' +
            '.filter-option-inner-inner',
        formGenderDD: '.dm-facet-id-provider_facet_gender .filter-option-inner-inner',
        formNewPatientsCheckbox: '.dm-facets-widget-checkbox',
        formOnlineSchedulingCheckbox: '#provider_facet_open_scheduling',
        formSearchButton: '.btn-cta-link.submit',
        formResetButton: '.btn-cta-link.reset',
        resultsTitle: 'div#block-uwmbase-page-title h1.page-title',
        cards: 'article.view-mode-provider_card',
        card1ProviderName: 'article.view-mode-provider_card:nth-child(1) ' +
            '.field--name-title',
        card1NewPatientsText: 'article.view-mode-provider_card:nth-child(1) ' +
            '.provider-card__accepting-patients',
        card1SpecialtyText: 'article.view-mode-provider_card:nth-child(1) ' +
            '.provider-card__specialties div',
        card1BookOnlineButton: 'article.view-mode-provider_card:nth-child(1)' +
            ' .provider-card__book-online',
        arabicDDItem: 'ul.dropdown-menu li:nth-child(4)',
        pageTitleText: 'h1.page-title',
        pager: '.pager',
        pagerFirst: 'ul.pager__items li.pager__item:nth-of-type(1)',
        pagerNext: 'ul.pager__items li.pager__item--next',
        pagerMax: 'ul.pager__items li.pager__item--last',
        femaleDDItem: 'ul.dropdown-menu li:nth-child(1)',
        cardTitle: '.field--name-title',
        accepting: '.provider-card__accepting-patients',
        specialtiesLabel: '.provider-card__specialties h3',
        specialtiesItems: '.provider-card__specialties .items',
        cardioSuggestion: 'ul#ui-id-1 li.ui-menu-item a',
        appointmentsLabel: '.provider-card__appointments h3',
        calendarIcon: 'span.uwm-icon--calendar',
        locationsLabel: '.provider-card__locations h3',
        locationsPinIcon: '.uwm-icon--locations-pin',
        locationsItems: '.provider-card__locations .items a',
        locationsItemOne: '.provider-card__locations .items a:nth-child(1)',
        locationItemsTwo: '.provider-card__locations .items a:nth-child(2)',
        appointmentsViewContactDetailButton: '.provider-card__contact-information',
        seeMoreButton: '.cta-parent-res-provider.btn-cta-link',
    }
};
