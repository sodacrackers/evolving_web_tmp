/**
 * @file
 * Generic tests for UWM provider pages.
 */

module.exports = {

  "disabled": false,
  "@tags": [
    'grid1',
    "stevie",
    "bios"
  ],

  before: function (browser) {
    this.launch_url = browser.globals.sites.stevie.launch_url + '/bios/rebecca-abay';
    console.log(this.launch_url);
  },

  after: function (browser) {
  },

  beforeEach: function (browser) {
  },

  afterEach: function (browser) {
  },

  'Provder name will appear in content and page title': function (browser) {
    const pageHeading = 'div.provider-page__section1-area1 h1.provider-page__section1-name.page-title span.field.field--name-title';

    browser
      .url(this.launch_url)
      .acceptCookiesDialog(browser)
      .assert.titleContains('UW Medicine');

    browser
      .waitForElementPresent('article', 'Found Proivider Card.')
      .pause(1000)
      .waitForElementPresent(pageHeading, 'Found Provider Card title.')
      .getAttribute(pageHeading, 'innerHTML', function (result) {
        browser.assert.ok(result.value.length > 20,
          'Provider <h1> title is longer than 20 characters.');
        browser.assert.titleContains(result.value.trim(),
          'The <head> title includes the provider\'s <h1> title.');

      })
  }
};
