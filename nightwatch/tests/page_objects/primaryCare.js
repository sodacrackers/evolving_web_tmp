// page_objects.primaryCare.js
module.exports = {

	commands:[
		{
            verifyCTALinks: function (launch_url, urlValidator) {

                launch_url = launch_url + '/specialties/primary-care'

                // verify Blue CTA buttons on page
                //const seeAllUrl = launch_url + '/search/locations?s=&f%5B0%5D=expertise%3APrimary%20care&f%5B1%5D=expertise%3APrimary%20care';
                let ctaLinks = [
                    '@ctaMakeApptLink',
                    '@ctaFindProviderLink',
                    '@ctaFindLocationLink',
                    '@ctaSeeAllLoactionsLink'
                ];

                let ctaPages = [
                    this.elements.ctaMakeApptPage,
                    this.elements.ctaFindProviderPage,
                    this.elements.ctaFindLocationPage,
                    this.elements.ctaSeeAllLoactionsPage
                ];

                for (let i = 0; i < ctaLinks.length; i++) {
                    this.verifyLinkClick(ctaLinks[i], ctaPages[i], launch_url,
                        urlValidator, 'Blue CTA Links - ' + ctaLinks[i] + '.');
                }

                return this;
            },
            verifyLearnMoreLinks: function (launch_url, urlValidator) {
                // Verify Learn More Buttons on the page
                let learnMoreLinks = [
                    '@learnMorePrimaryLink',
                    '@learnMoreUrgentLink',
                    '@learnMoreVirtualLink'
                ];

                let learnMorePages = [
                    this.elements.learnMorePrimaryPage,
                    this.elements.learnMoreUrgentPage,
                    this.elements.learnMoreVirtualPage,
                ];

                for (let i = 0; i < learnMoreLinks.length; i++) {
                    this.verifyLinkClick(learnMoreLinks[i], learnMorePages[i], launch_url,
                        urlValidator, 'Learn More Links - ' + learnMoreLinks[i] + '.');
                }

                return this;
            },
            verifyViewFullBioLink: function (launch_url, urlValidator) {
                // Verify the See Full Bio link. Verify it loads the expected URL.

                const fullBioUrl = launch_url + '/bios/lucy-hwang';
                const bioLink = '@fullBioLink';
                const bioPage = this.elements.fullBioPage;

                this
                    .waitForElementVisible(bioLink, "View Full Bio link appears.")
                    .click(bioLink)
                    .waitForElementVisible(bioPage, "Full Bio Page loads.")
                    .pause(3000)
                    .assert.urlContains(fullBioUrl, "Correct Full Bio page URL.")
                    .navigate(launch_url)
                    .waitForElementVisible(urlValidator, 'Returned to Primary Care Page.');

                return this;
            },
            verifyWatchVideo: function (urlValidator) {
                // verify the video link exisits, clicking it launches the HTML5 player,
                // that the play src has both youTube and UWMed in the src string
                const videoLink = '@videoLink';
                const videoClose = '@videoClose';
                const videoPage = '@videoPage';
                const expectedSrc1 = 'www.youtube.com';
                const expectedSrc2 = 'www.uwmedicine.org';

                this
                    .waitForElementVisible(videoLink, "Watch Video link is displayed.")
                    .click(videoLink)
                    .pause(3000)
                    .waitForElementVisible(videoPage)
                    .assert.attributeContains(videoPage, 'src', expectedSrc1,
                        'Player Source is YouTube')
                    .assert.attributeContains(videoPage, 'src', expectedSrc2,
                        'PLayer Source Origin contains UWMedicine.')
                    .waitForElementVisible(videoClose)
                    .click(videoClose)
                    .pause(3000)
                    .waitForElementVisible(urlValidator);

                return this;
            },
            verifyLocationsCards: function (launch_url, urlValidator) {
                // Verify the 3 Location Cards on the page.
                const locBallard = '@locationCardBallard';
                const locSLU = '@locationCardSLU';
                const locIssaquah = '@locationCardIssaquah';
                let seeLocLinks = [
                    '@seeLocationBallardLink',
                    '@seeLocationSLULink',
                    '@seeLocationIssaquahLink'
                ];

                let seeLocPages = [
                    this.elements.seeLocationBallardPage,
                    this.elements.seeLocationSLUPage,
                    this.elements.seeLocationIssaquahPage
                ];

                for (let i = 0; i < seeLocLinks.length; i++) {
                    this.verifyLinkClick(seeLocLinks[i], seeLocPages[i], launch_url,
                        urlValidator, 'See Location Links - ' + seeLocLinks[i] + '.');
                }

                return this;
            },
		}
    ],
    elements: {
        ctaMakeApptLink: '.cta-to-patient-resources-make-an-appointment .btn__text',
        ctaMakeApptPage: 'body.path-node-20836',
        ctaFindProviderLink: '.cta-to-search-providers.btn-cta-link .btn__text',
        ctaFindProviderPage: 'body.path-search-providers',
        ctaFindLocationLink: '.field__item:nth-child(3) .btn__text',
        ctaFindLocationPage: 'body.path-node-20701',
        ctaSeeAllLoactionsLink: '.field--type-link a',
        ctaSeeAllLoactionsPage: 'body.search-with-results',
        learnMorePrimaryLink: '.cta-to-search-providers.btn-cta-fluid .btn__text',
        learnMorePrimaryPage: 'body.path-search-providers',
        learnMoreUrgentLink: '.cta-to-services-urgent-care',
        learnMoreUrgentPage: 'body.path-node-21946',
        learnMoreVirtualLink: '.cta-to-services-virtual-clinic',
        learnMoreVirtualPage: 'body.path-node-49201',
        fullBioLink: '.field--type-text-long a',
        fullBioPage: 'body.path-node-31206',
        videoClose: 'div.modal-header button',
        videoLink: '.cta-parent-field-uwm-sections.btn-cta-fluid .btn__text',
        videoPage: 'div.modal-body div.field--name-field-uwm-media div.video-embed-field-provider-youtube iframe',
        // Can get 'src', 'width', 'height', 'id' of watchVideoPage
        locationCardBallard: '.col-xxl-3:nth-child(3)',
        locationCardSLU: '.col-xxl-3:nth-child(3)',
        locationCardIssaquah: '.col-xxl-3:nth-child(3)',
        seeLocationBallardLink: '.cta-to-locations-primary-care-ballard.clinic-card',
        seeLocationBallardPage: 'body.path-node-22271',
        seeLocationSLULink: '.cta-to-locations-primary-care-south-lake-union.clinic-card',
        seeLocationSLUPage: 'body.path-node-48636',
        seeLocationIssaquahLink: '.cta-to-locations-primary-care-issaquah.clinic-card',
        seeLocationIssaquahPage: 'body.path-node-22251',

    }
};


