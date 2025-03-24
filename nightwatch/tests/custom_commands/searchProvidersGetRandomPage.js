module.exports = {
	command: async function() {
		// searchProvidersGetRandomPageArray()
		// When called from a Providers search results page, it checks the "last" page found
		// then returns an aray of randomly generated page urls for search results.
		let ranPage, searchUrl;

		this.waitForElementVisible(".pager__item--last a span:nth-child(2)")
		this.getText(".pager__item--last a span:nth-child(2)", function(result) {
			// Due to the way the cxommand queue is built, you cannot use pageObject "aliass" here.
			// You need to use the underlying css selector.
			ranPage = Math.floor(Math.random() * (result.value)) + 1;
			if (ranPage < 1) {
				console.log("Random page was less than 0.");
				ranPage = 1;
			}

			searchUrl = browser.globals.sites.stevie.launch_url + "/search/providers?s=&page=" + (ranPage);
			console.log("Debug: random page set to " + ranPage);
			this.url(searchUrl);
			return this;
		})
	}
};
