// page_objects..js
module.exports = {
	url: 'https://www.uwmedicine.org/',
	commands:[
		{
			verifyLinks: function (pageUrl, testUrlValidation) {
				this
					.assert.visible('@Link', ' link appears.')
					.click('@Link')
					.waitForElementVisible('@Page', ' link loads correct page.')
					.navigate(pageUrl)
					.waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');

				return this;
			}
		}
	],
	elements: {
		someLinkLink: '',
		someLinkPage: ''
	}
};
