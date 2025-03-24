module.exports = {
	command: async function() {
		// verifyProvTitleOnRandom()
        // When called from a Providers search results page, it verifies that a randomly
        // selected provider card has a valid provider name
        this.elements("css selector", "article", function (result) {
            let ranCard = Math.floor(Math.random() * (result.value.length - 1));
            let titleCss = "article:nth-child(" + ranCard + ") .provider-card__title";
            this.waitForElementVisible(titleCss, "Card title found.");
            this.getText(titleCss, function (result) {
                this.assert.not.valueContains(titleCss, "");
                console.log("Debug: " + result.value);
            })
        });
        return this;
    }
};
