/**
 * @file
 * Generic tests for bioprovider book-online functionality.
 */

module.exports = {

  "disabled": false,
  "@tags": [
    "stevie",
    "bios",
    "provider-book-online",
    'grid2'
  ],

  before: function (browser) {
    this.modal = browser.page.providerBookOnlineModal()
  },

  after: function (browser) {
  },

  beforeEach: function (browser) {
  },

  afterEach: function (browser) {
  },


  'Verifying the Book Online modal opens and closes': function (browser) {

    let url = browser.globals.sites.stevie.launch_url + '/bios/barbara-moravec'
    browser.url(url).acceptCookiesDialog(browser)
    this.modal.openBookOnlineModal(browser)

  },

  'Verifying the Book Online modal has minimum dimensions and a blue title bar': function (browser) {

    this.modal.testModalDimensionsAndColor()

  },

  'Verifying Book Online for - Provider Card Visit Type - Single Visit Type with Open & Direct': function (browser) {

    let url = browser.globals.sites.stevie.launch_url + '/bios/barbara-moravec'
    console.log(url)
    browser.url(url)

    this.modal.openBookOnlineModal(browser)

    /***
    * Modal level 1.
    */
    let step = 'Have you visited this provider within the last three years?'
    browser.expect.element(this.modal.elements.modalBody).text.to.contain(step, `The modal shows "${step}".`)
    browser.assert.visible(this.modal.elements.buttonYes, `The modal shows "Yes" button in "${step}".`)
    browser.assert.visible(this.modal.elements.buttonNo, `The modal shows "No" button in "${step}".`)

    /***
    * Modal level 1.
    *
    * Check Yes CTA.
    */
    browser.click(this.modal.elements.buttonYes, (result) => {

      browser.assert.ok(true, `I can click "Yes" in "${step}".`)
      // browser.getText(this.modal.elements.modalBody, result => console.log(`The result body is:`, result.value))

      /***
      * Modal level 2.
      */
      step = 'Do you have an eCare (patient) account?';
      browser.expect.element(this.modal.elements.modalBody).text.to.contain(step, `The modal shows "${step}".`)
      browser.assert.visible(this.modal.elements.buttonYes, `The modal shows "Yes" button in "${step}".`)
      browser.assert.visible(this.modal.elements.buttonNo, `The modal shows "No" button in "${step}".`)

      /***
      * Modal level 2.
      *
      * Check Yes >> Yes CTA.
      */
      browser.click(this.modal.elements.buttonYes, (result) => {

        browser.assert.ok(true, `I can click "Yes" in "${step}".`)
        browser.closeNewWindow(browser)

        // @TODO: Confirm new window to ecare opening.
      })
        .getAttribute(this.modal.elements.buttonYes, 'href', result => {
          let t = result.value.indexOf('ecare.uwmedicine.org') > 0
          browser.assert.ok(t, `The "Yes" button has a link to ecare.uwmedicine.org in "${step}".`)
          console.log('The button href is ', result.value);
        })

      /***
      * Modal level 2.
      *
      * Check Yes >> No CTA.
      */
      browser.click(this.modal.elements.buttonNo, (result) => {

        browser.assert.ok(true, `I can click "No" in "${step}".`)
        this.modal.testModaleCareIframe(browser)

      })

    })
    this.modal.clickBookOnlineModalBackButton(browser, `I can click "Back" in "${step}".`)
    browser.getText(this.modal.elements.modalBody, result => console.log(`The "Back" result body is:`, result.value))

    /***
    * Modal level 1.
    *
    * Check No CTA.
    */
    browser.click(this.modal.elements.buttonNo, (result) => {

      browser.assert.ok(true, `I can click "No" in "${step}".`)
      this.modal.testModaleCareIframe(browser)
    })

  },

  'Verifying Book Online for - Provider Card Visit Type - Multiple with Open & Direct': function (browser) {

    let url = browser.globals.sites.stevie.launch_url + '/bios/rebecca-abay'
    console.log(url)
    browser.url(url)

    this.modal.openBookOnlineModal(browser)
    browser.getText(this.modal.elements.modalBody, result => console.log(`The result body is:`, result.value))

    /***
    * Modal level 1.
    */
    let step = 'Have you visited this provider within the last three years?'
    browser.expect.element(this.modal.elements.modalBody).text.to.contain(step, `The modal shows "${step}".`)
    browser.assert.visible(this.modal.elements.buttonYes, `The modal shows "Yes" button in "${step}".`)
    browser.assert.visible(this.modal.elements.buttonNo, `The modal shows "No" button in "${step}".`)

    /***
    * Modal level 1.
    *
    * Check Yes CTA.
    */
    browser.click(this.modal.elements.buttonYes, (result) => {

      browser.assert.ok(true, `I can click "Yes" in "${step}".`)
      browser.getText(this.modal.elements.modalBody, result => console.log(`The result body is:`, result.value))

      /***
      * Modal level 2.
      */
      step = 'Do you have an eCare (patient) account?';
      browser.expect.element(this.modal.elements.modalBody).text.to.contain(step, `The modal shows "${step}".`)
      browser.assert.visible(this.modal.elements.buttonYes, `The modal shows "Yes" button in "${step}".`)
      browser.assert.visible(this.modal.elements.buttonNo, `The modal shows "No" button in "${step}".`)

      /***
      * Modal level 2.
      *
      * Check Yes >> Yes CTA.
      */
      browser.click(this.modal.elements.buttonYes, (result) => {

        browser.assert.ok(true, `I can click "Yes" in "${step}".`)
        browser.closeNewWindow(browser)
        browser.getText(this.modal.elements.modalBody, result => console.log(`The result body is:`, result.value))
        // @TODO: Confirm new window to ecare opening.
      });

      /***
      * Modal level 2.
      *
      * Check Yes >> No CTA.
      */
      browser.click(this.modal.elements.buttonNo, (result) => {

        browser.assert.ok(true, `I can click "No" in "${step}".`)
        browser.getText(this.modal.elements.modalBody, result => console.log(`The result body is:`, result.value))

        /***
        * Modal level 3.
        */
        step = 'Choose your appointment type';
        browser.expect.element(this.modal.elements.modalBody).text.to.contain(step, `The modal shows "${step}".`)
        browser.assert.visible(this.modal.elements.buttonOfficeVisit, `The modal shows "Office Visit" button in "${step}".`)
        browser.assert.visible(this.modal.elements.buttonWellnessVisit, `The modal shows "Wellness Visit" button in "${step}".`)

        /***
        * Modal level 3.
        *
        * Check Yes >> No >> Office Visit CTA.
        */
        browser
          .waitForElementVisible(this.modal.elements.buttonOfficeVisit)
          .click(this.modal.elements.buttonOfficeVisit, (result) => {

            browser.assert.ok(true, `I can click "Office Visit" in "${step}".`)
            browser.closeNewWindow(browser)
            browser.getText(this.modal.elements.modalBody, result => console.log(`The result body is:`, result.value))
            this.modal.testModaleCareIframe(browser)
            this.modal.clickBookOnlineModalBackButton(browser, `I can click "Back" in "${step}".`)

          })

        /***
        * Modal level 3.
        *
        * Check Yes >> No >> Wellness Visit CTA.
        */
        browser
          .waitForElementVisible(this.modal.elements.buttonWellnessVisit)
          .click(this.modal.elements.buttonWellnessVisit, (result) => {

            browser.assert.ok(true, `I can click "Wellness Visit" in "${step}".`)
            browser.closeNewWindow(browser)
            browser.getText(this.modal.elements.modalBody, result => console.log(`The result body is:`, result.value))
            this.modal.testModaleCareIframe(browser)
            this.modal.clickBookOnlineModalBackButton(browser, `I can click "Back" in "${step}".`)

          })

      })

      this.modal.clickBookOnlineModalBackButton(browser, `I can click "Back" in "${step}".`)
      browser.getText(this.modal.elements.modalBody, result => console.log(`END The result body is:`, result.value))

    })

    /***
    * Modal level 1.
    *
    * Check No CTA.
    */
    browser.click(this.modal.elements.buttonNo, (result) => {

      browser.assert.ok(true, `I can click "No" in "${step}".`)

      step = 'Choose your appointment type';
      browser.expect.element(this.modal.elements.modalBody).text.to.contain(step, `The modal shows "${step}".`)
      browser.assert.visible(this.modal.elements.buttonOfficeVisit, `The modal shows "Office Visit" button in "${step}".`)
      browser.assert.visible(this.modal.elements.buttonWellnessVisit, `The modal shows "Wellness Visit" button in "${step}".`)

    })

  }

};

