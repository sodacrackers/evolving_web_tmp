// page_objects.specialtiesAllergy.js
module.exports = {

	commands:[
		{
            verifyBlueCTAs: function (launch_url, urlValidator, browser) {
                // Make an appointment link appears, clicks to correct page,
                // returns to this page.
                // linkSelector, pageValidator, returnUrl, returnValidator, msg
                this.verifyLinkClick('@ctaMakeLink',
                    this.elements.ctaMakePage,
                    launch_url,
                    urlValidator,
                    'Make an Appointment Blue CTA');

                // Find a Provider
                // Clicks to correct search page
                // Shows providers specific to Allergy & Immunity (all provider
                // cards on the result page have 'Allergy and immunology' as
                // one of their Medical Specialties.)
                this
                    .waitForElementVisible('@ctaFindProviderLink', 'Blue CTA - Find Provider')
                    .click('@ctaFindProviderLink')
                    .pause(3000)
                    .waitForElementVisible('@ctaFindProviderPage');

                const card = '.col-xxl-3';
                browser.elements('css selector', card, function (cards) {
                    let numCards = cards.value.length + 1;

                    for (let i=1; i<numCards; i++) {
                        let specialtyTextCSS = '.col-xxl-3:nth-child(' + i + ') div.items';
                        const text = 'Allergy and immunology';
                        let msg = 'Card #' + i + ' contains "' + text + '".';
                        this.assert.containsText(specialtyTextCSS, text, msg);
                    };

                    return this;
                });

                this
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator);

                // Find a Location
                // Scrolls to correct anchor on page and there are 3 location cards
                this
                    .waitForElementVisible('@ctaFindLocationLink', 'Find a Location button appears.')
                    .click('@ctaFindLocationLink')
                    .pause(3000)
                    .assert.urlContains('#featured-clinics---', 'Scrolled to correct anchor.');

                return this;
            },
            verifyAccordion: function (launch_url, urlValidator) {
                // Clicking on the + by one of the Common Services ('Allergic rhinitis)
                // opens the accordion.
                // Clicking on the - when present, collapses the accordion
                this
                    .waitForElementVisible('@accordionIsCollapsed',
                        '+ next to Allergic rhinitis is displayed.')
                    .assert.not.visible('@accordionText', 'Cannot see accordion text.')
                    .click('@accordionIsCollapsed')
                    .waitForElementVisible('@accordionIsOpen',
                        '- next to Allergic rhinitis is displayed.')
                    .assert.visible('@accordionText', "Can see accordion text.")
                    .click('@accordionIsOpen')
                    .waitForElementVisible(urlValidator)

                return this;
            },
            verifyLocationCards: function (launch_url, urlValidator) {
                // Verify the 3 location cards are displayed
                this
                    .waitForElementVisible('@card1Link', "First Location card is present.")
                    .waitForElementVisible('@card2Link', "Second Location card is present.")
                    .waitForElementVisible('@card2Link', "Third Location card is present.")

                return this;
            },
            verifyWhereToGo: function (launch_url, urlValidator) {
                // Verify links for Where To Go
                this.verifyLinkClick('@whereToGoERLink', this.elements.whereToGoERPage,
                    launch_url, urlValidator, 'Where To Go (ER)');
                this.verifyLinkClick('@whereToGoUrgentLink', this.elements.whereToGoUrgentPage,
                    launch_url, urlValidator, 'Where To Go (Urgent Care)');

                return this;
            },
		}
    ],
    elements: {
        ctaMakeLink: '.cta-to-patient-resources-make-an-appointment',
        ctaFindProviderLink: '.cta-to-search-providers',
        ctaFindLocationLink: '.field__item:nth-child(3) .btn-cta-fluid',
        ctaMakePage: 'body.path-node-20836',
        ctaFindProviderPage: 'body.path-search-providers',
        accordionIsOpen: 'button#button-accordion-6786-1',
        accordionIsCollapsed: 'button#button-accordion-6786-1.collapsed',
        accordionText: '#collapse-accordion-6786-1 p',
        card1Link: '.col-xxl-3:nth-child(1)',
        card2Link: '.col-xxl-3:nth-child(2)',
        card3Link: '.col-xxl-3:nth-child(3)',
        whereToGoERLink: '.cta-to-services-emergency-medicine',
        whereToGoUrgentLink: '.cta-to-services-urgent-care',
        whereToGoERPage: 'body.path-node-20736',
        whereToGoUrgentPage: 'body.path-node-21946'
    }
};


