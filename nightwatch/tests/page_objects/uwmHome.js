// page_objects.uwmHome.js
module.exports = {

	commands:[
		{
			verifyHomePageVideo: function (browser, testUrlValidation) {
				// Video Player link should load.
				// Clicking on it should launch the HTML5 video player
				// That player's source should be not-null.
				let videoPlayButton = '@videoPlayButton';
				const videoIframeElement = '@iFrame';
				const videoCloseButton = '@videoCloseButton';
				const os = browser.options.desiredCapabilities.os;

				if (os === 'OS X') {
					videoPlayButton = '@videoPlayButton_Mac';
				};
				this
					.waitForElementVisible(videoPlayButton,
						'Video Player button displayed.')
					.click(videoPlayButton)
					.pause(5000);

				this
					.waitForElementPresent(videoIframeElement,
						'HTML5 Player loaded.');

				browser.getAttribute('div.modal-body div.video-embed-field' +
					'-provider-youtube iframe', 'src', function (result) {
					return this.assert.ok(result.value !== '',
						'Video source is not null.');
				});

				this
					.waitForElementVisible(videoCloseButton,
						'Video Player close button displayed.')
					.click(videoCloseButton)
					.waitForElementPresent(testUrlValidation,
						"HTML5 player closed.");

				return this;
			},
			verifyHeroCtaLinks: function (pageUrl, testUrlValidation) {
				let pageLinks = [
					'@heroCtaBtn1Lnk',
					'@heroCtaBtn2Lnk',
					'@heroCtaBtn3Lnk',
					'@heroCtaBtn4Lnk',
				];

				let pageVals = [
					this.elements.heroCtaBtn1Val,
					this.elements.heroCtaBtn2Val,
					this.elements.heroCtaBtn3Val,
					this.elements.heroCtaBtn4Val,
				];

				let msg = [
					'Make an Appointment CTA Hero Link',
					'Find Urgent Care CTA Hero link',
					'Find a Provider CTA Hero link',
					'Find a Location CTA Hero link',
				];

				for (let i = 0; i < pageLinks.length; i++) {
					this.verifyLinkClick(pageLinks[i], pageVals[i], pageUrl,
						testUrlValidation, msg[i]);
				};

				return this;
			},
			verifySectionLinks: function (pageUrl, testUrlValidation) {
				let pageLinks = [
					'@homeSection1Btn1Lnk',
					'@homeSection1Btn2Lnk',
					'@homeSection1Btn3Lnk',
					'@homeSection1Btn4Lnk',
					'@homeSection1Btn5Lnk',
					'@homeSection2Btn1Lnk',
					'@homeSection2Btn2Lnk',
					'@homeSection2Btn3Lnk',
					'@homeSection2Btn4Lnk',
					'@homeSection2Btn5Lnk',
					'@homeSection2Btn6Lnk',
					'@homeSection3Btn1Lnk',
					'@homeSection3Btn2Lnk',
					'@homeSection3Btn3Lnk',
					'@homeSection3Btn4Lnk',
					'@homeSection3Btn5Lnk',
					'@homeSection3Btn6Lnk',
				];

				let pageVals = [
					this.elements.homeSection1Btn1Val,
					this.elements.homeSection1Btn2Val,
					this.elements.homeSection1Btn3Val,
					this.elements.homeSection1Btn4Val,
					this.elements.homeSection1Btn5Val,
					this.elements.homeSection2Btn1Val,
					this.elements.homeSection2Btn2Val,
					this.elements.homeSection2Btn3Val,
					this.elements.homeSection2Btn4Val,
					this.elements.homeSection2Btn5Val,
					this.elements.homeSection2Btn6Val,
					this.elements.homeSection3Btn1Val,
					this.elements.homeSection3Btn2Val,
					this.elements.homeSection3Btn3Val,
					this.elements.homeSection3Btn4Val,
					this.elements.homeSection3Btn5Val,
					this.elements.homeSection3Btn6Val,
				];

				for (let i = 0; i < pageLinks.length; i++) {
					this.verifyLinkClick(pageLinks[i], pageVals[i], pageUrl,
						testUrlValidation, 'Page Link ' + i);
				};

				return this;
			},
			verifySpotlightLinks: function (pageUrl, testUrlValidation) {
				let pageLinks = [
					'@spotlightBtn1Lnk',
					'@spotlightBtn2Lnk',
					'@spotlightBtn3Lnk',
					'@spotlightBtn4Lnk',
				];

				let pageVals = [
					this.elements.spotlightBtn1Val,
					this.elements.spotlightBtn2Val,
					this.elements.spotlightBtn3Val,
					this.elements.spotlightBtn4Val,
				];

				for (let i = 0; i < pageLinks.length; i++) {
					this.verifyLinkClick(pageLinks[i], pageVals[i], pageUrl,
						testUrlValidation, 'Spotlight Link ' + i);
				};

				return this;
			}
		}
	],
	elements: {
		heroBackgroundImg: 'section.hero--background-image',
		heroCtaBtn1Lnk: 'div.hero__ctas a:nth-child(1)',
		heroCtaBtn1Val: 'body.path-node-20836',
		heroCtaBtn2Lnk: 'div.hero__ctas a:nth-child(2)',
		heroCtaBtn2Val: 'body.path-node-21946',
		heroCtaBtn3Lnk: 'div.hero__ctas a:nth-child(3)',
		heroCtaBtn3Val: 'body.path-search-providers',
		heroCtaBtn4Lnk: 'div.hero__ctas a:nth-child(4)',
		heroCtaBtn4Val: 'body.path-search-locations',
		heroHeading: 'div.hero__content h1',
		homeSection1Btn1Lnk: '.uwm-accent-color__teal .links-with-icon__item' +
			':nth-child(1) span',
		homeSection1Btn1Val: 'body.path-node-50051',
		homeSection1Btn2Lnk: '.uwm-accent-color__teal .links-with-icon__item' +
			':nth-child(2) span',
		homeSection1Btn2Val: 'body.path-node-20841',
		homeSection1Btn3Lnk: '.uwm-accent-color__teal .links-with-icon__item' +
			':nth-child(3) span',
		homeSection1Btn3Val: 'body.path-node-20866',
		homeSection1Btn4Lnk: '.uwm-accent-color__teal .links-with-icon__item' +
			':nth-child(4) span',
		homeSection1Btn4Val: 'body.path-node-21746',
		homeSection1Btn5Lnk: 'a.homepage-section__link.btn.btn-cta:nth-child(4)',
		homeSection1Btn5Val: 'body.path-node-20866',
		homeSection2Btn1Lnk: '.uwm-accent-color__orange .links-with-icon__item' +
			':nth-child(1) .btn',
		homeSection2Btn1Val: 'header.headroom--top',
		homeSection2Btn2Lnk: '.uwm-accent-color__orange .links-with-icon__item' +
			':nth-child(2) .btn',
		homeSection2Btn2Val: 'body.path-node-21651',
		homeSection2Btn3Lnk: '.uwm-accent-color__orange .links-with-icon__item' +
			':nth-child(3) .btn',
		homeSection2Btn3Val: 'body',
		homeSection2Btn4Lnk: '.uwm-accent-color__orange .links-with-icon__item' +
			':nth-child(4) .btn',
		homeSection2Btn4Val: 'body.path-node-21506',
		homeSection2Btn5Lnk: '.uwm-accent-color__orange .col-lg:nth-child(1)' +
			' .btn-cta',
		homeSection2Btn5Val: 'body.path-node-21421',
		homeSection2Btn6Lnk: '.uwm-accent-color__orange .col-lg:nth-child(2)' +
			' .btn-cta',
		homeSection2Btn6Val: 'body.page-id-33',
		homeSection3Btn1Lnk: '.uwm-accent-color__blue .links-with-icon__item' +
			':nth-child(1) .btn',
		homeSection3Btn1Val: 'body.path-node-20881',
		homeSection3Btn2Lnk: '.uwm-accent-color__blue .links-with-icon__item' +
			':nth-child(2) .btn',
		homeSection3Btn2Val: 'body.path-node-20916',
		homeSection3Btn3Lnk: '.uwm-accent-color__blue .links-with-icon__item' +
			':nth-child(3) .btn',
		homeSection3Btn3Val: 'body.path-node-21501',
		homeSection3Btn4Lnk: '.uwm-accent-color__blue .links-with-icon__item' +
			':nth-child(4) .btn',
		homeSection3Btn4Val: 'body.path-node-21671',
		homeSection3Btn5Lnk: '.uwm-accent-color__blue .col-lg:nth-child(1)' +
			' .btn-cta',
		homeSection3Btn5Val: 'body.path-node-20876',
		homeSection3Btn6Lnk: '.uwm-accent-color__blue .col-lg:nth-child(2)' +
			' .btn-cta',
		homeSection3Btn6Val: 'body.page-id-33',
		iFrame: 'div.modal-body div.video-embed-field-provider-youtube iframe',
		spotlightBtn1Lnk: '.content-spotlight__item:nth-child(1) .btn-cta',
		spotlightBtn1Val: 'body.page-node-type-article',
		spotlightBtn2Lnk: '.content-spotlight__item:nth-child(2) .btn-cta',
		spotlightBtn2Val: 'body.page-node-type-article',
		spotlightBtn3Lnk: '.content-spotlight__item:nth-child(3) .btn-cta',
		spotlightBtn3Val: 'body.page-node-5240',
		spotlightBtn4Lnk: '.content-spotlight__item:nth-child(4) .btn-cta',
		spotlightBtn4Val: 'header.headroom--top',
		videoPlayButton_Mac: '.story-play-button__text',
		videoPlayButton: 'svg.svg-inline--fa.fa-play',
		videoCloseButton: 'div.modal-header button'
	}
};
