module.exports = {
	command: async function() {
		// verifyProviderMandatoryFields()
        // When called from a Providers search results page, it verifies that a randomly
        // selected provider card has all mandatory fields
        this.elements("css selector", "article", async function (result) {
            let ranCard = Math.floor(Math.random() * (result.value.length)) + 1;
            if (ranCard < 1) {
                ranCard = 1;
            };
            if (ranCard > 12) {
                ranCard = 12;
            }
            let cardCss = "article:nth-child(" + ranCard + ")";
            let titleCss = cardCss + " .provider-card__title";
            let specLabelCss = cardCss + " .provider-card__specialties h3";
            let specItemsCss = cardCss + " .provider-card__specialties .items";
            let calIconCss = cardCss + " .uwm-icon--calendar";
            let aptLabelCss = cardCss + " .btn-group h3";
            let seeFullCss = cardCss + " .provider-card__see-more a.btn";

            this.waitForElementVisible(titleCss, "Card title found.");
            this.getText(titleCss, function (result) {
                console.log("Debug: " + result.value);
                this.assert.notStrictEqual(result.value, "", "Was null");
            });

            this.waitForElementVisible(specLabelCss, "Specilaty Label found.");
            this.getText(specLabelCss, function (result) {
                this.assert.notStrictEqual(result.value, "", );
            });

            this.waitForElementVisible(specItemsCss, "Specialty items found.");
            this.getText(specItemsCss, function (result) {
                this.assert.notStrictEqual(result.value, "");
            });

            this.waitForElementVisible(calIconCss, "Calendar Icon found.");

            this.waitForElementVisible(aptLabelCss, "Appointment Label found.");
            this.getText(aptLabelCss, function (result) {
                this.assert.notStrictEqual(result.value, "");
            });

            this.waitForElementVisible(seeFullCss, "See Full Bio button found.");
            this.getText(seeFullCss, function (result) {
                this.assert.notStrictEqual(result.value, "");
            });
        });
        return this;
    }
};
