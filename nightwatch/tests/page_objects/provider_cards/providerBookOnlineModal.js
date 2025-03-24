/**
 * @file
 * Custom commands to test provider book online dialogs.
 */

module.exports = {

    commands: [
        {
            openBookOnlineModal: function (browser) {

                this
                    .waitForElementVisible(this.elements.openModalCta, 'Provider Book Online CTA is visible.')
                    .click(this.elements.openModalCta)
                    .waitForElementVisible(this.elements.modalContainer, 'The modal is now visible.')

            },

            closeBookOnlineModal: function () {

                this
                    .element('css selector', this.elements.openModalCta, result => {

                        if (result.status > -1) {
                            this.click('@modalContainer')
                            this.assert(true, 'Clicking to close the Book Online modal.')
                        }
                        else {
                            this.assert(true, 'The modal is already closed.')
                        }
                    });

            },

            clickBookOnlineModalBackButton: function (browser, assertion) {

                browser
                    .waitForElementVisible(this.elements.modalBackLink, 'The "Back" button is visible.')
                    .click(this.elements.modalBackLink, (r) => {
                        browser.assert.ok(true, assertion)
                    })

            },

            testModalDimensionsAndColor: function () {

                this
                    .waitForElementVisible(this.elements.modalBody, 'The modal body is visible.')

                    .getText(this.elements.modalBody, result => {
                        console.log('The body text is: ', result.value);
                    })
                    .getElementSize('css selector', this.elements.modalBody, result => {
                        this.assert.ok((result.value.width > 400), 'The modal body is at least 400px wide.')
                        this.assert.ok((result.value.height > 100), 'The modal body is at least 100px tall.')
                    })

                    .expect.element(this.elements.modalHeader).to.have.css('background-color').which.equals('rgba(44, 106, 206, 1)')

            },

            testModaleCareIframe: function (browser) {

                /**
                 * Test results of iframe.
                 *
                 * The modal iframe in Book Online has a dynamic
                 * URLs to ecare.uwmedicine.org pages. Pause here
                 * because we don't know when the frame src has finished
                 * changing.
                 *
                 * @TODO: Add trigger event in the Book Online javascript we can subscribe to?
                 */
                browser
                    .pause(5000)
                    .getAttribute(this.elements.modalIframe, 'src', result => { console.log('The iframe src is ', result.value) })
                    .frame(0)
                    .execute(function () {
                        console.log('The iframe title is:', document.title)
                    })
                    // .getTitle((title) => console.log(`The iframe title is "${title}.`))
                    .waitForElementVisible('body', 'The iframe body is visible.', 5000)
                    .getText('body', result => {

                        let appointmentsResult = result.value.match(/Showing|Person|Location|Day/g)
                        let noAppointmentsResult = result.value.indexOf('Sorry, we couldn\'t find any open appointments.')

                        if (appointmentsResult && appointmentsResult.length == 4) {
                            browser.assert.ok(true, 'The iframe contains "Showing|Person|Location|Day".')
                        }
                        else if (noAppointmentsResult > -1) {
                            browser.assert.ok(true, 'The iframe contains "Sorry, we couldn\'t find any open appointments.".')
                        }
                        else {
                            console.log('The iframe contains:', [appointmentsResult, noAppointmentsResult, result.value])
                            browser.assert.fail('The iframe does not contain "times" or a "sorry" message.')
                        }

                        // browser.expect.element('body').text.to.contain('Person', 'The iframe contains "Person".')
                        // browser.expect.element('body').text.to.contain('Day / Time', 'The iframe contains "Day / Time".')
                    })

                browser.frame(null)
                // browser.frameParent().frameParent()
            },

            generateBookOnlineButtonMatrix: () => {

                let $ = jQuery
                let buttonHeirarchy = {}

                const getLinks = () => {
                    return $('a:visible:not(:contains("Back"))'
                        , '#modal-appointment-provider .modal-body');
                }

                const getBackButton = () => {
                    return $('a:visible:contains("Back"))'
                        , '#modal-appointment-provider .modal-body');
                }

                const iterateButtons = () => new Promise((resolve, reject) => {

                    let $links = getLinks()

                    for (let [key, value] of Object.entries($links)) {

                        let $button = $(value)
                        let text = $button.text();
                        buttonHeirarchy[text] = $button;

                        $button.click(function () {
                            resolve(iterateButtons());
                        })

                    }

                    getBackButton().click()
                    resolve(i);


                });

                iterateButtons().then(() => console.log('i ended up at', buttonHeirarchy));

            }
        }

    ],
    elements: {

        openModalCta: 'article button.provider-page__book-online',
        modalContainer: '#modal-appointment-provider',
        modalHeader: '#modal-appointment-provider .modal-header',
        modalHeaderColor: 'rgba(44, 106, 206, 1)',
        modalBody: '#modal-appointment-provider .modal-body',
        modalButton: '#modal-appointment-provider a.btn-cta-solid',
        modalActiveOptions: '#modal-appointment-provider .appointment-flow__step.active',
        modalBackLink: '#modal-appointment-provider .appointment-flow__step.active .appointment-flow__step-back a',
        modalIframe: 'iframe#openSchedulingFrame',
        buttonYes: {
            selector: '//div[@id="modal-appointment-provider"]//div[contains(@class, "active")]//a[text()="Yes"]',
            locateStrategy: 'xpath'
        },
        buttonNo: {
            selector: '//div[@id="modal-appointment-provider"]//div[contains(@class, "active")]//a[text()="No"]',
            locateStrategy: 'xpath'
        },
        buttonOfficeVisit: {
            selector: '//div[@id="modal-appointment-provider"]//div[contains(@class, "active")]//a[contains(., "Office Visit")]',
            locateStrategy: 'xpath'
        },
        buttonWellnessVisit: {
            selector: '//div[@id="modal-appointment-provider"]//div[contains(@class, "active")]//a[contains(., "Wellness Visit")]',
            locateStrategy: 'xpath'
        }

    }

};
