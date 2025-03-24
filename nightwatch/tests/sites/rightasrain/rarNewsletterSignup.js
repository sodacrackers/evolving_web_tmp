module.exports = {

  "disabled": false,
  "@tags": [
    "rar",
    "basic",
    "form"
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

  'Verifying we see RAR\'s subscribe widget': function (browser) {

    let blockRegion = '.region-sidebar-second';

    browser
      .url(this.launch_url)
      .assert.titleContains('Rain')
      .waitForElementVisible(blockRegion)
      .assert.containsText(blockRegion, 'Subscribe to our newsletter');


  },

  'Verifying we can submit our email address to sign up': function (browser) {

    let emailInput = '.region-sidebar-second input[name="Email Address"]';
    let submitSelector = '.region-sidebar-second button.btn-primary';
    let emailValue = 'uwmweb@uw.edu';

    browser
      .assert.visible(emailInput)
      .setValue(emailInput, emailValue)
      .click(submitSelector);


  },

  'Verifying submit takes us to thank you page': function (browser) {

    browser
      .assert.titleContains('Thank you for subscribing')
      .assert.containsText('.page-header', 'Thank you');

  }

};
