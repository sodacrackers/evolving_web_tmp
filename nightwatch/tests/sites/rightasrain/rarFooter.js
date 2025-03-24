module.exports = {

  "disabled": false,
  "@tags": [
    "rar",
    "basic",
    "footer"
  ],

  before: function (browser) {
    this.launch_url = browser.globals.sites.rar.launch_url;
  },

  after: function (browser) {
  },

  beforeEach: function (browser) {
  },

  afterEach: function (browser) {
  },

  'Verifying RAR footer has a Facebook.com link': function (browser) {

    browser.url(this.launch_url);

    browser.expect.element('.footer a[href*="facebook.com"]').to.be.present;

  },

  'Verifying RAR footer has a copyright-disclaimer link': function (browser) {

    browser.assert.containsText('.region-footer-second .menu', 'COPYRIGHT AND DISCLAIMER');

  }


};
