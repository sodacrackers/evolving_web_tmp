module.exports = {
    command: async function (pageUrl, browser) {
        // loads a page, then sets a cookie to prevent the EU Cookies
        // compliance alert from popping up. Finally, reloads the page
        // so that the cookie will be loaded correctly.
        // This is a helper function for loading most pages. It requires two arguments:
        // pageUrl -- URL of the page to load
        // browser -- a copy of the browser object
        const euCookie = { name: "cookie-agreed", value: "2" };

        browser
            .url(pageUrl)
            .setCookie(euCookie)
            .url(pageUrl);

        return this;
    }
};
