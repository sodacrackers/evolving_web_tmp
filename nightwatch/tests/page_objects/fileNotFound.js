// page_objects.fileNotFound.js
module.exports = {
	commands:[
		{
            verify404Links: function (launch_url, urlValidator) {

                launch_url = launch_url + '/specialties';

                const allLinks = [
	                '@searchEverythingLink',
                    '@searchProvidersLink',
                    '@searchLocationsLink',
                    '@appointmentsLink',
                    '@urgentCareLink',
                    '@virtualCareLink',
                    '@primaryCareLink',
                    '@specialtyCareLink',
                    '@conditionLibraryLink',
                    '@ecarePatientPortalLink',
                    '@billingLink',
                    '@patientsLink',
                    '@providersLink',
                    '@researchersLink',
                    '@schoolOfMedicineLink',
                    '@submitFeedbackLink',
                ];

                const allPages =[
                    this.elements.searchEverythingPage,
                    this.elements.searchProvidersPage,
                    this.elements.searchLocationsPage,
                    this.elements.appointmentsPage,
                    this.elements.urgentCarePage,
                    this.elements.virtualCarePage,
                    this.elements.primaryCarePage,
                    this.elements.specialtyCarePage,
                    this.elements.conditionLibraryPage,
                    this.elements.ecarePatientPortalPage,
                    this.elements.billingPage,
                    this.elements.patientsPage,
                    this.elements.providersPage,
                    this.elements.researchersPage,
                    this.elements.schoolOfMedicinePage,
                    this.elements.submitFeedbackPage,
                ];

                const allDescriptors =[
                    'Search Everything',
                	'Search Providers',
                	'Search Locations',
                	'Appointments',
                	'Urgent Care',
                	'Virtual Care',
                	'Primary Care',
                	'Specialty Care',
                	'Condition Library',
                	'eCare Patient Portal',
                	'Billing',
                	'Patients',
                	'Providers',
                	'Researchers',
                	'School Of Medicine',
                	'Submit Feedback'
                ];

                for (let i=0; i<allLinks.length; i++) {
                    this.verifyLinkClick(allLinks[i], allPages[i], launch_url,
                        urlValidator, allDescriptors[i])
                }

                return this;
            },
		}
    ],
    elements: {
        searchEverythingLink: '.cta-to-search',
        searchProvidersLink: '.cta-to-search-providers',
        searchLocationsLink: '.cta-to-search-locations',
        appointmentsLink: '.cta-to-patient-resources-make-an-appointment',
        urgentCareLink: '.cta-to-services-urgent-care',
        virtualCareLink: '.cta-to-services-virtual-clinic',
        primaryCareLink: '.cta-to-services-primary-care',
        specialtyCareLink: '.cta-to-services',
        conditionLibraryLink: '.cta-to-healthlibraryuwmedicineorg',
        ecarePatientPortalLink: '.paragraph--id--32086 .cta-to-patient-resources-ecare',
        billingLink: '.cta-to-patient-resources-billing-and-insurance',
        patientsLink: '.paragraph--id--32111 .cta-to-patient-resources-ecare',
        providersLink: '.cta-to-provider-resource',
        researchersLink: '.cta-to-research',
        schoolOfMedicineLink: '.cta-to-school-of-medicine',
        submitFeedbackLink: '.cta-to-node-feedback',
        searchEverythingPage: 'body.path-search',
        searchProvidersPage: 'body.path-search-providers',
        searchLocationsPage: 'body.path-search-locations',
        appointmentsPage: 'body.path-node-20836',
        urgentCarePage: 'body.path-node-21946',
        virtualCarePage: 'body.path-node-49201',
        primaryCarePage: 'body.path-node-20701',
        specialtyCarePage: 'body.path-node-21746',
        conditionLibraryPage: 'body#ICP',
        ecarePatientPortalPage: 'body.path-node-20841',
        billingPage: 'body.path-node-50051',
        patientsPage: 'body.path-node-20841',
        providersPage: 'main#bcm-skip-to-main',
        researchersPage: 'body.path-node-21421',
        schoolOfMedicinePage: 'body.path-node-20876',
        submitFeedbackPage: 'body.path-webform-website_feedback',
    }
};






