module.exports = {
    "disabled": false,

    // site.www.search.providers.verifyProvImgOnRandom()
    // Cycles thru randomly selected provider cards: pass if it finds a provider image,
    // fails if it goes thru the max cards and finds no provider image.
    "Provider Cards - Provider Image in random set": function (browser) {
        var searchProviderPage = browser.page.searchProviders();

        searchProviderPage
            .loadPage()
            .searchProvidersGetRandomPage()
            .verifyProvImgOnRandom()
            .end();
    }
};