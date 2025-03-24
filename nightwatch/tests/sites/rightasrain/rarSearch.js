module.exports = {

  "disabled": false,
  "@tags": [
    "rar",
    "search",
    "rar-search"
  ],

  before: function (browser) {
    this.launch_url = browser.globals.sites.rar.launch_url;
  },

  after: function (browser) {
  },

  beforeEach: function (browser) {
  },

  afterEach: function (browser) {
    browser.url(function (result) {
      console.log('URL after this step: ', result);
    });
  },

  'Verifying we can search for "Sleep" results': function (browser) {

    browser
      .url(this.launch_url)

      // #subscribeModal a.dismiss
    browser.element('css selector', '#subscribeModal a.dismiss', function (result) {
      if (result.status != -1) {
        console.log('Element exists, do something', result)
        browser.pause(3000).waitForElementVisible('#subscribeModal a.dismiss')
        .click('#subscribeModal a.dismiss')
          .pause(1000)
      } else {
        console.log('Element does not exist, do something else')
      }
    })

    browser
      .assert.visible('.region-header input[name=search]')
      .setValue('.region-header input[name=search]', 'Sleep')
      .assert.visible('.region-header button[type=submit]');

    browser.click('.region-header button[type=submit]', function (result) {
      console.log('Click result', result);
    });

  },

  'Verifying a search result is clickable': function (browser) {

    let linkSelector = '.view-content .views-row:last-of-type a';

    browser
      .waitForElementVisible('.region-content .view-content  .views-row')
      .assert.containsText('.region-content .view-content', 'Sleep');

    // browser
    //   .waitForElementVisible(linkSelector)
    //   .click("css selector", linkSelector)
    //   .assert.urlContains("sleep-paralysis");

    browser.assert.visible(linkSelector);

    browser.getAttribute('css selector', linkSelector, 'href', function(result) {

      articleUrl = result.value;
      console.log('linkSelector href', result);
      console.log('articleUrl', articleUrl);

      browser.url(articleUrl);

    });

  },

  'Verifying we have article content and an author': function (browser) {

    browser.waitForElementVisible('.main-container')
      .getText('.field--name-field-author', function (result) {
        browser.assert.ok(result.value.length > 10);
      })
      .getText('.field--name-field-sections .field--name-field-body', function (result) {
        browser.assert.ok(result.value.length > 400);
      });

  }

};
