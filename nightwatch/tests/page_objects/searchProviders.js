module.exports = {

	commands: [
		{
			loadPage: function () {
			// loads this page. Attempts to handle the Cookies Alert popup. Resizes the window
			// and verifies it's on the expected page
				return this
					.navigate()
					.waitForElementVisible('@cookiesAlertButton')
        			.click('@cookiesAlertButton')
        			.waitForElementVisible('body')
        			.assert.title('Find a provider | UW Medicine',
        			              'verify /search/providers page title');
			},
		}
	],
	elements: {
		cookiesAlertButton: '.eu-cookie-compliance-default-button',
		pageTitle: '.page-title',
		providerCards: 'article',
		providerSearchBar: '#edit-s',
		resetButton: {
			selector:  '//a[@class="btn btn-cta btn-cta-link reset"]',
			locateStrategy: 'xpath'
		},
		searchButton: '.submit',
	},
	sections: {
		providerCard: {
			selector: 'article',
			elements: {
				accepting: {
					selector: '.provider-card__accepting-patients'
				},
				appointmentsLabel: {
					selector: '.btn-group h3'
				},
				appointmentsBookOnlineButton: {
					selector: '.provider-card__book-online'
				},
				appointmentsPhoneNumberButton: {
					selector: '.provider-card__phone-number'
				},
				appointmentsViewContactDetailButton: {
					selector: '.provider-card__contact-information'
				},
				calendarIcon: {
					selector: '.uwm-icon--calendar'
				},
				cardTitle: {
					selector: '.provider-card__title'
				},
				locationsLabel: {
					selector: '.provider-card__locations h3'
				},
				locationsPinIcon: {
					selector: '.uwm-icon--locations-pin'
				},
				locationsItems: {
					selector: '.items a'
				},
				locationsItemOne: {
					selector: '.items a:nth-child(1)'
				},
				locationItemsTwo: {
					selector: '.items a:nth-child(2)'
				},
				providerImage: {
					selector: '.img-fluid',
					suppressNotFoundErrors: true
				},
				providerImageDefault: {
					selector: 'article img',
					suppressNotFoundErrors: true
				},
				seeMoreButton: {
					selector: '.provider-card__see-more a.btn'
				},
				specialtiesLabel: {
					selector: '.provider-card__specialties h3',
				},
				specialtiesItems: {
					selector: '.provider-card__specialties .items'
				}
			}
		},
		pager: {
			selector: '.js-pager__items',
			elements: {
				last: {
					selector: '.pager__item--last a span:nth-child(2)'
				}
			}
		}
	}
};
