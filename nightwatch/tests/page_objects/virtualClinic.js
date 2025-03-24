// page_objects.virtualClinic.js
module.exports = {

	commands:[
		{
            verifyCTALinks: function (launch_url, browserFamily) {
                // Verifies the three blue CTA links"
                // Start Visit Button: appears, clicking it's link loads correct
                // page, returns to this page
                // Get the Virtual App link scrolls the page to the correct
                // anchor, near the download buttons
                // The telephone number link appears (cannot really validate
                // that it opens a phone app)
                let pageCss = '';
                if (browserFamily === 'Android') {
                    pageCss = this.elements.startVisitPageAndroid;
                } else {
                    // TODO: When iPhone is added, this will need to be split
                    // out here, it likely has a unique body.class for mobile
                    // iphone. Right now, I'm just assuming !ANDROID = Desktop.
                    pageCss = this.elements.startVisitPageDesktop;
                };

                this
                    .verifyLinkClick('@startVisitLink', pageCss,
                        launch_url, this.elements.myValidator, 'Start Visit CTA link')
                    .waitForElementVisible('@getVirtualAppCtaLink')
                    .click('@getVirtualAppCtaLink')
                    .pause(3000)
                    .assert.urlContains('#appDL---',
                        'Clicking link moved to anchor.')
                    .verifyLink('@telLink', 'Telephone CTA link');

                return this;
            },
            verifyDownloadLinks: function (launch_url, urlValidator) {
                // Download link for Apple Store exisits, clicking it loads the
                // correct page url should also contain
                // 'apps.apple.com/us/app/uw-medicine-virtual-clinic'
                const appleAppUrl = 'https://apps.apple.com/us/app/uw-' +
                    'medicine-virtual-clinic';

                this
                    .waitForElementVisible('@downloadAppleLink',
                        'Apple Download link appears.')
                    .click('@downloadAppleLink')
                    .pause(3000)
                    .assert.urlContains(appleAppUrl, 'Apple URL is correct.')
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator);

                // Download link for the Google Play store exists, clicking it loads the correct page
                // url should also contain ''
                const googleAppUrl = 'https://play.google.com/store/apps/' +
                    'details?id=org.uwmedicine.android';

                this
                    .waitForElementVisible('@downloadGoogleLink',
                        'Google Download link appears.')
                    .pause(3000)
                    .click('@downloadGoogleLink')
                    .pause(3000)
                    .waitForElementVisible('@downloadGooglePage',
                        'Google Download page loaded.')
                    .assert.urlContains(googleAppUrl, "Google URL is correct.")
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator);

                return this;
            },
            verifyLooseLinks: function (launch_url, urlValidator, browserFamily) {
                // Verify all the links on the 3 cards just before the footer
                // are valid and click through to the correct pages.
                let pageCss = '';
                if (browserFamily === 'Android') {
                    pageCss = this.elements.startVisitPageAndroid;
                } else {
                    // TODO: When iPhone is added, this will need to be split
                    // out here, it likely has a unique body.class for mobile
                    // iphone. Right now, I'm just assuming !ANDROID = Desktop.
                    pageCss = this.elements.startVisitPageDesktop;
                };

                let cardLinks = [
                    '@cardFaqLink',
                    '@cardStartLink',
                    '@cardLogInLink',
                    '@cardFindProviderLink',
                    '@cardBookApptLink'
                ];

                let cardPages = [
                    this.elements.cardFaqPage,
                    pageCss,
                    this.elements.cardLogInPage,
                    this.elements.cardFindProviderPage,
                    this.elements.cardBookApptPage
                ];

                for (let i = 0; i < cardLinks.length; i++) {
                    this.verifyLinkClick(cardLinks[i], cardPages[i], launch_url,
                        urlValidator, 'Bottom Card Links - ' + cardLinks[i] + ',');
                }

                return this;
            },
		}
    ],
    elements: {
        myValidator: 'body.path-node-49201',
        startVisitLink: '.cta-to-uwmedicinevirtualclinicorg.btn-cta-link ' +
            '.btn__text',
        startVisitPageDesktop: 'body#landingBody',
        startVisitPageAndroid: 'body.ctMobile.android',
        getVirtualAppCtaLink: '.cta-to-services-virtual-clinic .btn__text',
        getVirtualAppCtaPage: 'body',
        telLink: '.cta-to-1-855-520-5250 .btn__text',
        downloadContainer: '.uwm-featured-story__content',
        downloadAppleLink: 'a.cta-to-itunesapplecom',
        downloadApplePage: 'body.ember-application',
        downloadGoogleLink: 'a.cta-to-playgooglecom',
        downloadGooglePage: 'body#yDmH0d',
        cardFaqLink: '#ppg-59441 .btn__text',
        cardFaqPage: 'body.path-node-21446',
        cardStartLink: '#ppg-59446 .btn__text',
        cardStartPage: 'body#landingBody',
        cardLogInLink: '.cta-parent-field-uwm-columns .btn__text',
        cardLogInPage: 'body.path-node-20841',
        cardFindProviderLink: '#ppg-59451 .btn__text',
        cardFindProviderPage: 'body.path-search-providers',
        cardBookApptLink: '#ppg-59456 .btn__text',
        cardBookApptPage: 'body.path-node-20836',
    }
};


