module.exports = {
	"disabled": true,

	"www.search.providers.providerCard-allFields.js": function (browser) {
	// This test ustilizes 3 providers, listed below, which between them should display all of the
	// mandatory & optional search provider card fields.
	// Larry S Dean:
	//		Name, Provider Image, Provider Name, Med Specialty Label, Multiple Med Specialties
	//		Appointments (calander icon, label, View Contact Details, See Full Bio button,
	//		Accepting new patients, Location (pin icon, label, multiple location links
	// Elizabeth J. Abernathey
	//		Provider image (default graphic), Appointments (Button - phone number), Location - single link
	// Rebecca J.Y. Abay
	//		Appointments - Book Online button
	const name = [  "Larry S. Dean",
					"Elizabeth J. Abernathey",
					"Rebecca J.Y. Abay"
	];

	var searchProviderPage = browser.page.searchProviders();
	searchProviderPage
		.loadPage()
		.searchFor(name[0])
		// Should find exactly one result for "Larry S. Dean"
		.assert.elementCount("article", 1, "Correct number of search rsults verified");

	var card = searchProviderPage.section.providerCard;
	card
		.assert.visible("@providerImage", "Non-default Provider image verified")
		.assert.visible("@cardTitle", "Card Title verified")
		.assert.visible("@accepting", "Accepting New Patients verified")
		.assert.visible("@specialtiesLabel", "Medical Specialties label verified")
		.assert.visible("@specialtiesItems", "Medical Specialties verified")
		.assert.visible("@appointmentsLabel", "Appointments label text verified")
		.assert.visible("@calendarIcon", "Appointments calendar icon verified")
		.assert.visible("@appointmentsViewContactDetailButton",
		                "Appointments - View Contact Details button verified")
		.assert.visible("@locationsLabel", "Locations label text verified")
		.assert.visible("@locationsPinIcon", "Locations Pin icon verified")
		.assert.elementCount("@locationsItems", 2, "Multiple Location links verified")
		.assert.visible("@locationsItemOne", "First location link verified")
		.assert.visible("@locationItemsTwo", "Second location link verified")
		.assert.visible("@seeMoreButton", "See More button verified");
	//browser.assert.equal(true, true, "Lets label a section.");
	// displays:   ✔ Passed [equal]: Lets label a section.
	searchProviderPage
		.searchFor(name[1])
		// Should find exactly one result for Elizabeth J. Abernathey
		.assert.elementCount("article", 1, "Correct number of cards found");
	card
		.assert.visible("@providerImageDefault", "Default Provider image verified")
		.assert.visible("@appointmentsPhoneNumberButton",
		                "Appointments - Phone Number Button verified")
		.assert.elementCount("@locationsItems", 1, "Single Location link verified")
		.assert.visible("@locationsItemOne", "First location link verified");


	searchProviderPage
		.searchFor(name[2])
		// Should find exactly one result for Rebecca J.Y. Abay
		.assert.elementCount("article", 1, "Correct number of cards found");
	card
		.assert.visible("@appointmentsBookOnlineButton", "Book Online Button verified")
		.assert.visible("@specialtiesItems", "Medical Specialties are listed");

	browser.end();
	},
};
