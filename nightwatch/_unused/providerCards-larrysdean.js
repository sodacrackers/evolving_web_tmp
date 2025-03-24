module.exports = {
	"disabled": true,

	"Verifying a provider card for 'Larry S. Dean'.": function (browser) {
	const name = "Larry S. Dean";

	var searchProviderPage = browser.page.searchProviders();
	searchProviderPage
		.loadPage()
		.searchFor(name)
		// There should be one and only one result
		.assert.elementCount("article", 1, "Correct number of cards found");

	var card = searchProviderPage.section.providerCard;
	card
		.assert.visible("@cardTitle", "Card Title verified")
		.assert.visible("@accepting", "Accepting New Patients verified")
		.assert.visible("@specialtiesLabel", "Medical Specialties label verified")
		.assert.visible("@specialtiesItems", "Medical Specialties are listed verified")
		.assert.visible("@appointmentsLabel", "Appointments label text verified")
		.assert.visible("@calendarIcon", "Appointments calendar icon verified")
		.assert.visible("@locationsLabel", "Locations label text verified")
		.assert.visible("@locationsPinIcon", "Locations Pin icon verified")
		// Larry S Dean should have 2 location links
		.assert.elementCount("@locationsItems", 2, "Correct number of Location links found")
		.assert.visible("@locationsItemOne", "First location link verified")
		.assert.visible("@locationItemsTwo", "Second location link verified")
		.assert.visible("@appointmentsViewContactDetailButton",
		                "View Contact Details button verified")
		.assert.visible("@seeMoreButton", "See More button is present")
	browser.end();
	},
};



