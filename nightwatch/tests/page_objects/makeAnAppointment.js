// page_objects.makeAnAppointment.js
module.exports = {

	commands:[
		{
			verifyBreadcrumbLinks: function (launch_url, urlValidator) {

                url = launch_url + '/patient-resources/make-an-appointment';

                const breadcrumbLinks = [
                    '@homeLink',
                    '@patientResourcesLink',
                ];
                const breadcrumbPages = [
                    this.elements.homePage,
                    this.elements.patientResourcesPage,
                ];

                for (let i=0; i<breadcrumbLinks.length; i++) {
                    this.verifyLinkClick(breadcrumbLinks[i], breadcrumbPages[i], url,
                        urlValidator, 'Breadcrumbs');
                };

				return this;
            },
            verifyGridcardLinks: function (launch_url, urlValidator) {
                const gridcardLinks = [
                    '@bookInEcareLink',
                    '@bookLink',
                    '@cancelByFormLink',
                    '@cancelLink',
                    '@emergencyLink',
                    '@homeLink',
                    '@patientResourcesLink',
                    '@radiologyLink',
                    '@sccaLink',
                    '@signInLink',
                    '@urgentLink',
                    '@uwMedLink',
                    '@valleyLink',
                ];
                const gridcardPages = [
                    this.elements.bookInEcarePage,
                    this.elements.bookPage,
                    this.elements.cancelByFormPage,
                    this.elements.cancelPage,
                    this.elements.emergencyPage,
                    this.elements.homePage,
                    this.elements.patientResourcesPage,
                    this.elements.radiologyPage,
                    this.elements.sccaPage,
                    this.elements.signInPage,
                    this.elements.urgentPage,
                    this.elements.uwMedPage,
                    this.elements.valleyPage,
                ];

                for (let i = 0; i < gridcardLinks.length; i++) {
                    this.verifyLinkClick(gridcardLinks[i], gridcardPages[i], launch_url,
                        urlValidator, 'Grid Cards');
                };

                return this;
            },
            verifySectionCollapse: function () {
                this
                    .assert.visible('@viewMoreLink', 'View More link appears.')
                    .moveToElement('@viewMoreLink', 0, 0)
                    .assert.attributeContains('@viewMoreLink', 'aria-expanded',
                        'false', 'View More is collapsed.')
                    .click('@viewMoreLink');
                this.pause(3000);
                this.assert.visible('@viewLessLink', 'View Less link appears.')
                    .moveToElement('@viewLessLink', 1000, 1000)
                    .click('@viewLessLink');
                this.pause(3000);
                this.assert.attributeContains('@viewMoreLink', 'aria-expanded',
                    'false', 'Clicking View More collapses the text.');

                return this;
            },
            verifyLooseLinks: function () {
                const looseLinks = [
                    '@callLink',
                    '@telLink',
                    '@amharicLink',
                    '@arabicLink',
                    '@cambodianLink',
                    '@cantoneseLink',
                    '@mandarinLink',
                    '@farsiLink',
                    '@koreanLink',
                    '@russianLink',
                    '@somaliLink',
                    '@spanishLink',
                    '@tigrinyaLink',
                    '@vietnameseLink',
                    '@TTYLink',
                ];

                for (let i=0; i<looseLinks.length; i++) {
                    this.verifyLink(looseLinks[i], 'Link ' + i + '.');
                }

                return this;
            }
		}
	],
	elements: {
        amharicLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-gr' +
            'id__item:nth-child(1) div.paragraph div.field div:nth-child(1) a',
        arabicLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-gri' +
            'd__item:nth-child(1) div.paragraph div.field div:nth-child(2) a',
        bookInEcareLink: '.cta-to-prod01-scheduling',
        bookInEcarePage: 'body.loginPage',
        bookLink: '.cta-to-prod01-openscheduling .btn__text',
        bookPage: 'body.md_openscheduling_index',
        callLink: '.mb-0 a',
        cambodianLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-' +
            'grid__item:nth-child(1) div.paragraph div.field div:nth-child(3) a',
        cancelByFormLink: '.cta-to-pages-responsepageaspx',
        cancelByFormPage: 'div#form-container',
        cancelLink: '.btn-cta-fluid:nth-child(4) .btn__text',
        cancelPage: 'body',
        cantoneseLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-' +
            'grid__item:nth-child(1) div.paragraph div.field div:nth-child(4) a',
        emergencyLink: '#ppg-53061 .btn__text',
        emergencyPage: 'body.path-node-20736',
        farsiLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-grid' +
            '__item:nth-child(2) div.paragraph div.field div:nth-child(1) a',
        homeLink: '.breadcrumb__item:nth-child(1) .breadcrumb__text--link',
        homePage: 'body.is-page-node-type-uwm-homepage',
        koreanLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-grid' +
            '__item:nth-child(2) div.paragraph div.field div:nth-child(2) a',
        mandarinLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-g' +
            'rid__item:nth-child(1) div.paragraph div.field div:nth-child(5) a',
        patientResourcesLink: '.breadcrumb__item:nth-child(2) .breadcrumb__text--link',
        patientResourcesPage: 'body.path-node-20866',
        radiologyLink: '.mb-5 a:nth-child(1)',
        radiologyPage: 'body.path-node-20661',
        russianLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-gr' +
            'id__item:nth-child(2) div.paragraph div.field div:nth-child(3) a',
        sccaLink: '.mb-5 a:nth-child(3)',
        sccaPage: 'body.contact-patient-appointment',
        signInLink: '.cta-to-prod01-visits-visitslist:nth-child(2) .btn__text',
        signInPage: 'body.md_login_login',
        somaliLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-gr' +
            'id__item:nth-child(2) div.paragraph div.field div:nth-child(4) a',
        spanishLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-gr' +
            'id__item:nth-child(3) div.paragraph div.field div:nth-child(1) a',
        telLink: '.cta-to-12065205000 .btn__text',
        tigrinyaLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-' +
            'grid__item:nth-child(3) div.paragraph div.field div:nth-child(2) a',
        TTYLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uwm-grid_' +
            '_item:nth-child(3) div.paragraph div.field div:nth-child(4) a',
        urgentLink: '#ppg-53051 .btn__text',
        urgentPage: 'body.path-node-21946',
        uwMedLink: '#ppg-53056 .btn__text',
        uwMedPage: 'body.path-node-49201',
        valleyLink: '.mb-5 a:nth-child(2)',
        valleyPage: 'a#site-branding',
        vietnameseLink: 'div.paragraph--id--53491 div.uwm-grid__items div.uw' +
            'm-grid__item:nth-child(3) div.paragraph div.field div:nth-child(3) a',
        viewLessLink: '.view-more-link',
        viewMoreLink: '.view-more-link'
	}
};





