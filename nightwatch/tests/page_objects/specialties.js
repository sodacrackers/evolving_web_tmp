// page_objects.specialties.js
module.exports = {

	commands:[
		{
            verifyCommonSpecialtiesLinks: function (launch_url, urlValidator) {

                launch_url = launch_url + '/specialties'

                // Verify all links for Common Specialties click thru, render correct
                // page, then nav back to this page
                let commonLinks = [
                    '@commonNeuroLink',
                    '@commonRadioLink',
                    '@commonWomenLink',
                    '@commonHeartLink',
                ];

                let commonPages = [
                    this.elements.commonNeuroPage,
                    this.elements.commonRadioPage,
                    this.elements.commonWomenPage,
                    this.elements.commonHeartPage,
                ];

                for (let i = 0; i < commonLinks.length; i++) {
                    this.verifyLinkClick(commonLinks[i], commonPages[i], launch_url,
                        urlValidator, 'Common Specialties Links - ' + commonLinks[i] + '.');
                }

                return this;
            },
            verifyCareYouNeedLinks: function (launch_url, urlValidator) {
                // Verifiy all The Care You Need links click thru, render correct
                // page, then nav back to this page.
                let careLinks = [
                    '@carePrimaryLink',
                    '@careProviderLink',
                ];
                let carePages = [
                    this.elements.carePrimaryPage,
                    this.elements.careProviderPage,
                ];

                for (let i = 0; i < careLinks.length; i++) {
                    this.verifyLinkClick(careLinks[i], carePages[i], launch_url,
                        urlValidator, 'The Care You Need Links - ' + careLinks[i] + '.');
                }

                return this;
            },
            verifyAllMedSpecialtiesLinks: function (launch_url, urlValidator) {
                // Verifiy all of the links under All Specialties  links click thru,
                // render correct page, then nav back to this page.
                let allSpecialtiesLinks = [
                    '@allAllergyLink',
                    '@allAnesthLink',
                    '@allBreastLink',
                    '@allCancerLink',
                    '@allCenterWomenChildrenLink',
                    '@allChildrenCareLink',
                    '@allDermaLink',
                    '@allDiabetesLink',
                    '@allDigestiveLink',
                    '@allEarNoseThroatLink',
                    '@allEmergencyLink',
                    '@allEyeLink',
                    '@allFertilityLink',
                    '@allGyneLink',
                    '@allHeartLink',
                    '@allHemaLink',
                    '@allInfectLink',
                    '@allKidneyLink',
                    '@allLabLink',
                    '@allLungLink',
                    '@allMaternityLink',
                    '@allGeneticsLink',
                    '@allMensLink',
                    '@allMentalLink',
                    '@allNeuroLink',
                    '@allPalliativeLink',
                    '@allPelvicLink',
                    '@allPrimaryLink',
                    '@allRadioLink',
                    '@allRehabLink',
                    '@allRheumLink',
                    '@allSleepLink',
                    '@allSpineLink',
                    '@allSportsLink',
                    '@allSurgeryLink',
                    '@allTransplantLink',
                    '@allVascularLink',
                ];
                let allSpecialtiesPages = [
                    this.elements.allAllergyPage,
                    this.elements.allAnesthPage,
                    this.elements.allBreastPage,
                    this.elements.allCancerPage,
                    this.elements.allCenterWomenChildrenPage,
                    this.elements.allChildrenCarePage,
                    this.elements.allDermaPage,
                    this.elements.allDiabetesPage,
                    this.elements.allDigestivePage,
                    this.elements.allEarNoseThroatPage,
                    this.elements.allEmergencyPage,
                    this.elements.allEyePage,
                    this.elements.allFertilityPage,
                    this.elements.allGynePage,
                    this.elements.allHeartPage,
                    this.elements.allHemaPage,
                    this.elements.allInfectPage,
                    this.elements.allKidneyPage,
                    this.elements.allLabPage,
                    this.elements.allLungPage,
                    this.elements.allMaternityPage,
                    this.elements.allGeneticsPage,
                    this.elements.allMensPage,
                    this.elements.allMentalPage,
                    this.elements.allNeuroPage,
                    this.elements.allPalliativePage,
                    this.elements.allPelvicPage,
                    this.elements.allPrimaryPage,
                    this.elements.allRadioPage,
                    this.elements.allRehabPage,
                    this.elements.allRheumPage,
                    this.elements.allSleepPage,
                    this.elements.allSpinePage,
                    this.elements.allSportsPage,
                    this.elements.allSurgeryPage,
                    this.elements.allTransplantPage,
                    this.elements.allVascularPage,
                ];
                let specDescriptors = [
                    'Allergy & Immunology',
                    'Anesthesiology',
                    'Breast Care',
                    'Cancer Care',
                    'Center for Women & Children',
                    'Childrens Care',
                    'Dermatology',
                    'Diabetes & Endocrinology',
                    'Digestive Health',
                    'Ear, Nose, & Throat Care',
                    'Emergency Medicine, Trauma, & Burn Care',
                    'Eye Institute',
                    'Fertility Care',
                    'Gynecology Care',
                    'Heart Institute',
                    'Hematology',
                    'Infectious Diseases',
                    'Kidney Care',
                    'Laboratory Medicine & Pathology',
                    'Lung Care',
                    'Maternity Care',
                    'Medical Genetics',
                    'Mens Health',
                    'Mental Health Care',
                    'Neurosciences',
                    'Palliative Care',
                    'Pelvic Care',
                    'Primary Care',
                    'Radiology',
                    'Rehabilitation Medicine',
                    'Rheumatology',
                    'Sleep Medicine',
                    'Spine Care',
                    'Sports Medicine & Orthopedic Surgery',
                    'Surgery',
                    'Transplant',
                    'Vascular Care',
                ];

                for (let i = 0; i < allSpecialtiesLinks.length; i++) {
                    this.verifyLinkClick(allSpecialtiesLinks[i], allSpecialtiesPages[i], launch_url,
                        urlValidator, 'All Specialties Links ( ' + specDescriptors[i] + ') - '
                        + allSpecialtiesLinks[i] + '.');
                }

                return this;
            },
		}
    ],
    elements: {
        commonNeuroLink: '.cta-to-specialties-neurosciences.cta-parent-field-uwm-columns',
        commonRadioLink: '.cta-to-specialties-radiology.cta-parent-field-uwm-columns',
        commonWomenLink: '.cta-to-specialties-center-for-women-and-children.cta-parent-field-uwm-columns',
        commonHeartLink: '.cta-to-specialties-heart-institute.cta-parent-field-uwm-columns',
        carePrimaryLink: '.col-lg-3 .cta-to-specialties-primary-care',
        careProviderLink: '.cta-to-search-providers',
        allAllergyLink: '.cta-to-specialties-allergy-immunology',
        allAnesthLink: '.cta-to-specialties-anesthesiology-and-pain-medicine',
        allBreastLink: '.cta-to-specialties-center-for-women-and-children-breast-care',
        allCancerLink: '.cta-to-specialties-cancer-care',
        allCenterWomenChildrenLink: '.cta-to-specialties-center-for-women-and-children.cta-parent-field-uwm-component',
        allChildrenCareLink: '.cta-to-specialties-center-for-women-and-children-childrens-care',
        allDermaLink: '.cta-to-specialties-dermatology',
        allDiabetesLink: '.cta-to-specialties-diabetes-endocrinology',
        allDigestiveLink: '.cta-to-specialties-digestive-health',
        allEarNoseThroatLink: '.cta-to-specialties-ear-nose-and-throat-care',
        allEmergencyLink: '.cta-to-specialties-emergency-medicine',
        allEyeLink: '.cta-to-specialties-eye-institute',
        allFertilityLink: '.cta-to-specialties-center-for-women-and-children-fertility-care',
        allGyneLink: '.cta-to-specialties-center-for-women-and-children-gynecology-care',
        allHeartLink: '.cta-to-specialties-heart-institute.cta-parent-field-uwm-component',
        allHemaLink: '.cta-to-specialties-hematology',
        allInfectLink: '.cta-to-specialties-infectious-diseases',
        allKidneyLink: '.cta-to-specialties-kidney-care',
        allLabLink: '.cta-to-specialties-laboratory-medicine-and-pathology',
        allLungLink: '.cta-to-specialties-lung-care',
        allMaternityLink: '.cta-to-specialties-center-for-women-and-children-maternity-care',
        allGeneticsLink: '.cta-to-specialties-medical-genetics',
        allMensLink: '.cta-to-specialties-mens-health',
        allMentalLink: '.cta-to-specialties-mental-health-care',
        allNeuroLink: '.cta-to-specialties-neurosciences.cta-parent-field-uwm-component',
        allPalliativeLink: '.cta-to-specialties-palliative-care',
        allPelvicLink: '.cta-to-specialties-center-for-women-and-children-pelvic-care',
        allPrimaryLink: '.col-lg-4 .cta-to-specialties-primary-care',
        allRadioLink: '.cta-to-specialties-radiology.cta-parent-field-uwm-component',
        allRehabLink: '.cta-to-specialties-rehabilitation-medicine',
        allRheumLink: '.cta-to-specialties-rheumatology',
        allSleepLink: '.cta-to-specialties-sleep-medicine',
        allSpineLink: '.cta-to-specialties-spine-care',
        allSportsLink: '.cta-to-specialties-sports-medicine-orthopedic-surgery',
        allSurgeryLink: '.cta-to-specialties-surgery',
        allTransplantLink: '.cta-to-specialties-transplant',
        allVascularLink: '.cta-to-specialties-vascular-care',

        commonNeuroPage: 'body.path-node-20686',
        commonRadioPage: 'body.path-node-20661',
        commonWomenPage: 'body.path-node-20641',
        commonHeartPage: 'body.path-node-20631',
        carePrimaryPage: 'body.path-node-20701',
        careProviderPage: 'body.path-search-providers',
        allAllergyPage: 'body.path-node-20711',
        allAnesthPage: 'body.path-node-20696',
        allBreastPage: 'body.path-node-20791',
        allCancerPage: 'body.path-node-20611',
        allCenterWomenChildrenPage: 'body.path-node-20641',
        allChildrenCarePage: 'body.path-node-20816',
        allDermaPage: 'body.path-node-20651',
        allDiabetesPage: 'body.path-node-20591',
        allDigestivePage: 'body.path-node-20676',
        allEarNoseThroatPage: 'body.path-node-20681',
        allEmergencyPage: 'body.path-node-20736',
        allEyePage: 'body.path-node-20716',
        allFertilityPage: 'body.path-node-20801',
        allGynePage: 'body.path-node-20821',
        allHeartPage: 'body.path-node-20631',
        allHemaPage: 'body.path-node-20656',
        allInfectPage: 'body.path-node-20586',
        allKidneyPage: 'body.path-node-20601',
        allLabPage: 'body.path-node-20726',
        allLungPage: 'body.path-node-20621',
        allMaternityPage: 'body.path-node-20826',
        allGeneticsPage: 'body.path-node-20636',
        allMensPage: 'body.path-node-20691',
        allMentalPage: 'body.path-node-20671',
        allNeuroPage: 'body.path-node-20686',
        allPalliativePage: 'body.path-node-20831',
        allPelvicPage: 'body.path-node-20786',
        allPrimaryPage: 'body.path-node-20701',
        allRadioPage: 'body.path-node-20661',
        allRehabPage: 'body.path-node-20646',
        allRheumPage: 'body.path-node-20666',
        allSleepPage: 'body.path-node-20721',
        allSpinePage: 'body.path-node-20606',
        allSportsPage: 'body.path-node-20616',
        allSurgeryPage: 'body.path-node-20581',
        allTransplantPage: 'body.path-node-20626',
        allVascularPage: 'body.path-node-20706',
    }
};


