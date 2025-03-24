module.exports = {
    command: async function (linkSelector, msg) {
        // verifyLink()
        // Verifies that a given link loads correctly. The link is not clicked,
        // this just verifies it appears on the page. See also the verifyLinkClick()
        // custom command.
        // Arguments:
        //      linkSelector: css selector or page object alias for link to verify
        //      msg: short-form messgae which is used to output result of test.
        //this.waitForElementPresent(linkSelector, msg + ' link appears.');
        this.waitForElementPresent(linkSelector);

        return this;
    }
};
