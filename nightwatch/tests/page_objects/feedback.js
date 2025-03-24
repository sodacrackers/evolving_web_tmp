// page_objects.feedback.js
module.exports = {
   // url: browser.globals.sites.stevie.launch_url + '/forms/website-feedback',
	commands:[
		{
            verifyfeedbackFormElements: function () {
                this
                    .verifyLink('@formSubjectTextbox', 'Subject Field')
                    .verifyLink('@formMessageTextbox', 'Message Field')
                    .verifyLink('@formFirstTextbox', 'First Name Field')
                    .verifyLink('@formLastTextbox', 'Last Name Field')
                    .verifyLink('@formEmailTextbox', 'Email Field')
                    .verifyLink('@formPrivacyCheckbox', 'Privacy Checkbox')
                    .verifyLink('@formSubmitButton', 'Submit Button')
                    .verifyLink('@onlinePrivacyLink1', 'First Online Privacy')
                    .verifyLink('@onlinePrivacyLink2', 'Second Online Privacy')
                    .verifyLink('@mailtoLink', 'Mailto')
                    .waitForElementVisible('@formPrivacyCheckbox', "Privacy checkbox appears.");

                return this;
            },
            verifyGoldenPath: function (launch_url, browser) {

                launch_url = launch_url + '/forms/website-feedback';
                // Fill out form with valid values for each field, click submit,
                // check that correct success page loads when complete.
                this
                    .clearValue('@formSubjectTextbox')
                    .setValue('@formSubjectTextbox', 'THIS IS AN AUTOMATED TEST')
                    .clearValue('@formMessageTextbox')
                    .setValue('@formMessageTextbox', "THIS IS AN AUTOMATED TEST, PLEAE IGNORE.")
                    .clearValue('@formFirstTextbox')
                    .setValue('@formFirstTextbox', 'Testy')
                    .clearValue('@formLastTextbox')
                    .setValue('@formLastTextbox', 'McTesterson')
                    .clearValue('@formEmailTextbox')
                    .setValue('@formEmailTextbox', 'testy@mctesterson.com')
                    // formPrivacyCheckbox
                    .expect.element('@formPrivacyCheckbox').to.not.be.selected;

                this
                    .assert.ok(true, 'Clicking Privacy Checkbox...')
                    .click('@formPrivacyCheckbox')
                    .expect.element('@formPrivacyCheckbox').to.be.selected;

                this
                    .assert.ok(true, 'Clicking submit button...')
                    .waitForElementVisible('@formSubmitButton')
                    .click('@formSubmitButton')
                    .pause(1000)
                    .waitForElementVisible('@successPageBody')
                    .waitForElementVisible('@successPageTitle')
                    .expect.element('@successPageTitle').text.to.equal('Thank you for contacting UW Medicine.');

                this
                    .navigate(launch_url)
                    .pause(1000)
                    .waitForElementVisible('@feedbackPageBody')
                    .waitForElementVisible('@feedbackPageTitle')
                    .expect.element('@feedbackPageTitle').text.to.equal('Website Feedback');

                return this;
            },
		}
    ],
    elements: {
        formSubjectTextbox: '#edit-subject',
        formMessageTextbox: '#edit-message',
        formFirstTextbox: '#edit-your-name-first',
        formLastTextbox: '#edit-your-name-last',
        formEmailTextbox: '#edit-your-email',
        formPrivacyCheckbox: '#edit-privacy-confirmation',
        formSubmitButton: '#edit-actions-submit',
        onlinePrivacyLink1: '#edit-your-feedback a',
        onlinePrivacyLink2: 'a:nth-child(1)',
        mailtoLink: '#edit-footer--2 a:nth-child(2)',
        onlinePrivacyPage: 'body.page-id-14',
        successPageTitle: 'h2.page-title',
        feedbackPageTitle: 'h1.page-title',
        successPageBody: 'body.path-webform-website_feedback-confirmation',
        feedbackPageBody: 'body.path-webform-website_feedback'
    }
};
