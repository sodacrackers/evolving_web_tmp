module.exports = {
    command: async function () {
        // verifyProvImageOnRandom()
        // When called from a Providers search results page, it verifies that a randomly
        // selected provider card has a valid provider Image or Default image
        self = this;
        this.elements("css selector", "article", function (result) {
            let ranCard = Math.floor(Math.random() * (result.value.length - 1));
            ranCard = 10;
            let imageCss = "article:nth-child(" + ranCard + ") .img-fluid";
            let defaultCss = "article:nth-child(" + ranCard + ") img";

            console.log(imageCss);
            this.waitForElementVisible("article", "Provider card visible.");
            self.element("css selector", imageCss, function (imgResult) {
                debugger;
                console.log(imgResult);
                if (imgResult.status != -1) {
                    // we found it.
                    self.moveTo(imageCss);
                    self.waitForElementVisible(imageCss, "Provider card Image found");
                } else {
                    // we didn't find it.
                    self.element("css selector", defaultCss, function (imgResult) {
                        debugger;
                        if (imgResult != -1) {
                            self.moveTo(defaultCss);
                            self.waitForElementVisible(defaultCss, "Provider card Image Default icon found.");
                        } else {
                            // Neither found, report an error
                            self.waitForElementVisible(defaultCss, "Found neither default or image.");
                        }
                    })
                }
                return this;
            });
        });
        return this;
    }
};
