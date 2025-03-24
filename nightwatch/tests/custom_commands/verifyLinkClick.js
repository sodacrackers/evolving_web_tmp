module.exports = {
    command: async function (linkSelector, pageValidator, returnUrl, returnValidator, msg) {
        // verifyLinkClick()
        // Verifies that a given link on a page exists, and that clicking it goes to the
        // expected page
        // As cleanup, it returns to the page under test, and verifies it loaded correctly.
        // Arguments:
        //      linkSelector: css selector or page-object alias for link to test
        //      pageValidator: css selector or page-object alias to check correct page loaded
        //          Note: for reasons I don't understand, you CAN use the page-object alias for linkSelector
        //          but you CANNOT use it for pageValidator. Examples:
        //          Invalid: verifyLinkClick('@catsLink','@catsPage', this.url, urlValidator, 'Kitties');
        //          Valid:   verifyLinkClick('@catsLink', this.elements.catsPage, this.url, urlValidator, 'Kitties');
        //      returnUrl: The URL to return to, ie the page under test
        //      returnValidator: css selector or page-object alias to check correct return page loaded
        //      msg: Short-form message expanded to output action taken
        this
            // DEBUG: to help debugging, swap the comment below, to see the full selector text in output
            .assert.visible(linkSelector)
            //.assert.visible(linkSelector, msg + ' appears.')
            .moveToElement(linkSelector, 1, 1)
            .click(linkSelector)
            .waitForElementVisible(pageValidator)
            .url(returnUrl)
            .waitForElementVisible(returnValidator);
            //.waitForElementVisible(returnValidator, 'Returned to ' + returnUrl + '.');
        return this;
    }
};

