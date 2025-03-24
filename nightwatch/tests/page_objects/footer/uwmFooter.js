// page_objects.uwmFooter.js
module.exports = {

  commands: [
    {
      verifySocialLinks: function (pageUrl, testUrlValidation) {
        // Verify the Social Media link icons.
        // Note: It seems that if you hit any of these social pages enough with automation
        // they start displayingh CAPTCHA pages, but not reliably. Since this is on their
        // end, I'm just verifying the page link appears, not that the page loads when
        // clicked.
        this
          .assert.visible('@iconFacebookLink', 'Facebook icon link appears.');
        this
          .assert.visible('@iconLinkedInLink', 'LinkedIn icon link appears.');
        this
          .assert.visible('@iconTwitterLink', 'Twitter icon link appears.');
        this
          .assert.visible('@iconInstagramLink', 'Instagram icon link appears.');
        this
          .assert.visible('@iconYoutubeLink', 'YouTube icon link appears.');

        return this;
      },
      verifyFooterLinks: function (browser, pageUrl, testUrlValidation) {
        this
          .assert.visible('@aboutLink', 'About UW Medicine link appears.')
          .click('@aboutLink')
          .waitForElementVisible('@aboutPage', 'Abount link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@providerLink', 'Provider Resource link appears.')
          .click('@providerLink')
          .waitForElementVisible('@providerPage', 'Provider Resource link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@mediaInqLink', 'Media Inquiries link appears.')
          .click('@mediaInqLink')
          .waitForElementVisible('@mediaInqPage', 'Media Inquiries link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          // Fact Book loads a PDF page. At this point. I'm not sure how to validate it since
          // it doesn't seemt to have an HTML-like DOM.
          .assert.visible('@factBookLink', 'Fact Book link appears.');
        this
          .assert.visible('@contactLink', 'Contact Us link appears.')
          .click('@contactLink')
          .waitForElementVisible('@contactPage', 'Contact Us link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@careersLink', 'Careers link appears.')
          .click('@careersLink')
          .waitForElementVisible('@careersPage', 'Careers link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@volunteerLink', 'Volunteer link appears.')
          .click('@volunteerLink')
          .waitForElementVisible('@volunteerPage', 'Volunteer link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@donateLink', 'Donate link appears.')
          .click('@donateLink')
          .waitForElementVisible('@donatePage', 'Donate link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@uweduLink', 'UW.edu link appears.')
          .click('@uweduLink')
          .waitForElementVisible('@uweduPage', 'UW.edu link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@feedbackLink', 'Feedback link appears.')
          .click('@feedbackLink')
          .waitForElementVisible('@feedbackPage', 'Feedback link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');

        // These links only appear on Desktop, not Mobile
        if (browser.options.desiredCapabilities.device === 'undefined') {
            this
              .assert.visible('@harborviewLink', 'Harborview Medical Center link appears.')
              .click('@harborviewLink')
              .waitForElementVisible('@harborviewPage', 'Harborview link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@valleyMedLink', 'Valley Medical Center link appears.')
              .click('@valleyMedLink')
              .waitForElementVisible('@valleyMedPage', 'Valley Medical Center link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@uwNeighborhoodLink', 'UW Neighborhood Clinics link appears.')
              .click('@uwNeighborhoodLink')
              .waitForElementVisible('@uwNeighborhoodPage', 'UW Neighborhood Clinics link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@uwSchoolLink', 'UW School of Medicine link appears.')
              .click('@uwSchoolLink')
              .waitForElementVisible('@uwSchoolPage', 'UW School of Medicine link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@rightAsRainLink', 'Right as Rain link appears.')
              .click('@rightAsRainLink')
              .waitForElementVisible('@rightAsRainPage', 'Right as Rain link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@uwMedCenterNWLink', 'UW Med Center NW link appears.')
              .click('@uwMedCenterNWLink')
              .waitForElementVisible('@uwMedCenterNWPage', 'UW Med Center NW link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@uwMedCenterMontlakeLink', 'UW Med Center Montlake link appears.')
              .click('@uwMedCenterMontlakeLink')
              .waitForElementVisible('@uwMedCenterMontlakePage', 'UW Med Center Montlake link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@uwPhysiciansLink', 'UW Physicians link appears.')
              .click('@uwPhysiciansLink')
              .waitForElementVisible('@uwPhysiciansPage', 'UW Physicians link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@airliftLink', 'Airlift Northwest link appears.')
              .click('@airliftLink')
              .waitForElementVisible('@airliftPage', 'Airlift NW link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
            this
              .assert.visible('@uwMedNewsroomLink', 'UW Med Newsroom link appears.')
              .click('@uwMedNewsroomLink')
              .waitForElementVisible('@uwMedNewsroomPage', 'UW Med Newsroom link loads correct page.')
              .navigate(pageUrl)
              .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        };

        return this;
      },
      verifyT2FooterLinks: function (pageUrl, testUrlValidation) {
        this
          .assert.visible('@onlinePrivacyLink', 'Online Privacy Statement link appears.')
          .click('@onlinePrivacyLink')
          .waitForElementVisible('@onlinePrivacyPage', 'Online Privacy link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@policiesLink', 'Policies And Notices link appears.')
          .click('@policiesLink')
          .waitForElementVisible('@policiesPage', 'Policies link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@copyrightLink', 'Copyright link appears.')
          .click('@copyrightLink')
          .waitForElementVisible('@copyrightPage', 'Copyright link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');
        this
          .assert.visible('@websiteTermsLink', 'Website Terms and Conditions link appears.')
          .click('@websiteTermsLink')
          .waitForElementVisible('@websiteTermsPage', 'Website Terms and Conditions link loads correct page.')
          .navigate(pageUrl)
          .waitForElementVisible(testUrlValidation, 'Returned to ' + pageUrl + '.');

        return this;
      }
    }
  ],
  elements: {
		aboutLink: '.foot-first li:nth-child(1) a',
    aboutPage: 'body.path-node-20851',
    airliftLink: '.foot-second li:nth-child(8) a',
    airliftPage: 'body.path-node-21546',
    careersLink: '.foot-first li:nth-child(6) a',
    careersPage: 'body.path-node-21461',
    contactLink: '.foot-first li:nth-child(5) a',
    contactPage: 'body.path-node-21466',
    copyrightLink: 'ul.list-inline li:nth-child(3)',
    copyrightPage: 'body.path-node-22091',
    donateLink: '.foot-first li:nth-child(8) a',
    donatePage: 'body.page-template-make-a-gift-php',
    factBookLink: '.foot-first li:nth-child(4) a',
    factBookPage: 'Validate the link should be PDF',
    feedbackLink: '.foot-first li:nth-child(10) a',
    feedbackPage: 'body.path-webform-website_feedback',
    harborviewLink: '.foot-second li:nth-child(1) a',
    harborviewPage: 'body.path-node-23246',
    iconFacebookLink: '.uwmed-icon__facebook',
    iconFacebookPage: 'div.lfloat i.fb_logo',
    iconInstagramLink: 'div.service-icons a:nth-child(3)',
    iconInstagramPage: 'main.SCxLW',
    iconLinkedInLink: '.uwmed-icon__linkedin',
    iconLinkedInPage: 'body#pagekey-auth_wall_desktop_company',
    iconTwitterLink: '.uwmed-icon__twitter',
    iconTwitterPage: 'div#react-root',
    iconYoutubeLink: '.uwmed-icon__youtube',
    iconYoutubePage: 'div#channel-header-container img.yt-img-shadow',
    mediaInqLink: '.foot-first li:nth-child(3) a',
    mediaInqPage: 'header.headroom--top',
    onlinePrivacyLink: 'ul.list-inline li:nth-child(1)',
    onlinePrivacyPage: 'body.site-online',
    policiesLink: 'ul.list-inline li:nth-child(2)',
    policiesPage: 'body.path-node-21821',
    providerLink: '.foot-first li:nth-child(2) a',
    providerPage: '.specialties',
    rightAsRainLink: '.foot-second li:nth-child(9) a',
    rightAsRainPage: 'div.dialog-off-canvas-main-canvas',
    uweduLink: '.foot-first li:nth-child(9) a',
    uweduPage: 'body.home.blog.site-home',
    uwMedCenterMontlakeLink: '.foot-second li:nth-child(4) a',
    uwMedCenterMontlakePage: 'body.path-node-22556',
    uwMedCenterNWLink: '.foot-second li:nth-child(2) a',
    uwMedCenterNWPage: 'body.path-node-22956',
    uwMedNewsroomLink: '.foot-second li:nth-child(10) a',
    uwMedNewsroomPage: 'div#block-views-whats-new-block',
    uwNeighborhoodLink: '.foot-second li:nth-child(5) a',
    uwNeighborhoodPage: 'body.path-search-locations',
    uwPhysiciansLink: '.foot-second li:nth-child(6) a',
    uwPhysiciansPage: 'body.path-node-21861',
    uwSchoolLink: '.foot-second li:nth-child(7) a',
    uwSchoolPage: 'body.path-node-20916',
    valleyMedLink: '.foot-second li:nth-child(3) a',
    valleyMedPage: 'body.path-node-22496',
    volunteerLink: '.foot-first li:nth-child(7) a',
    volunteerPage: 'body.path-node-22171',
    websiteTermsLink: 'ul.list-inline li:nth-child(4)',
    websiteTermsPage: 'body.site-online.page-id-5'
	}
};

