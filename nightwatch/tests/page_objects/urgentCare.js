// page_objects.makeAnAppointment.js
module.exports = {

    commands:[
		{
            verifyLocationSiteLinks: function(launch_url, urlValidator) {
                locationSiteLink = [
                    'a.cta-to-locations-primary-care-ballard span',
                    'a.cta-to-locations-primary-care-federal-way span',
                    'a.cta-to-locations-primary-care-issaquah span',
                    'a.cta-to-locations-primary-care-ravenna span',
                    'a.cta-to-locations-primary-care-shoreline span',
                ];
                locationSitePage = [
                    'body.path-node-22271',
                    'body.path-node-22241',
                    'body.path-node-22251',
                    'body.path-node-22266',
                    'body.path-node-22221',
                ];

                for (let i=0; i<locationSiteLink.length; i++){
                    this.pause(3000);
                    this.verifyLinkClick(locationSiteLink[i], locationSitePage[i], launch_url, urlValidator,
                        'Location Site');
                }

                return this;
            },
            verifyLocationAddressLinks: function (urlValidator) {
                locationAddressLink = [
                    '.cta-parent-res-clinic:nth-child(1) .clinic-card__street-address',
                    '.cta-parent-res-clinic:nth-child(2) .clinic-card__street-address',
                    '.cta-parent-res-clinic:nth-child(3) .clinic-card__street-address',
                    '.cta-parent-res-clinic:nth-child(4) .clinic-card__street-address',
                    '.cta-parent-res-clinic:nth-child(5) .clinic-card__street-address',
                ];
                locationAddressPage = [
                    'body.path-node-22271',
                    'body.path-node-22241',
                    'body.path-node-22251',
                    'body.path-node-22266',
                    'body.path-node-22221',
                ];

                for (let i = 0; i < locationAddressLink.length; i++) {
                    this.verifyLinkClick(locationAddressLink[i], locationAddressPage[i], this.url,
                        urlValidator, 'Location Address');
                }

                return this;
            },
            verifySeeAllSpecialties: function (urlValidator) {
                seeSpecialtiesLink = [
                    '.cta-parent-res-clinic:nth-child(2) .field--label-hidden .see-more a',
                    '.cta-parent-res-clinic:nth-child(3) .field--label-hidden .see-more a',
                    '.cta-parent-res-clinic:nth-child(4) .field--label-hidden .see-more a',
                    '.cta-parent-res-clinic:nth-child(5) .field--label-hidden .see-more a',
                ];
                seeSpecialtiesPage = [
                    'body.path-node-22241',
                    'body.path-node-22251',
                    'body.path-node-22266',
                    'body.path-node-22221',
                ];

                for (let i = 0; i < locationAddressLink.length; i++) {
                    this.verifyLinkClick(locationAddressLink[i], locationAddressPage[i], this.url,
                        urlValidator, 'See All Specialties');
                }

                return this;
            },
            verifySeeFullHoursLinks: function (urlValidator) {
                hoursSeeFullLink = [
                    '.cta-parent-res-clinic:nth-child(1) .see-more a',
                    '.cta-parent-res-clinic:nth-child(2) .see-more a',
                    '.cta-parent-res-clinic:nth-child(3) .see-more a',
                    '.cta-parent-res-clinic:nth-child(4) .see-more a',
                    '.cta-parent-res-clinic:nth-child(5) .see-more a',
                ];
                hoursSeeFullPage = [
                    'body.path-node-22271',
                    'body.path-node-22241',
                    'body.path-node-22251',
                    'body.path-node-22266',
                    'body.path-node-22221',
                ];

                for (let i = 0; i < hoursSeeFullLink.length; i++) {
                    this.verifyLinkClick(hoursSeeFullLink[i], hoursSeeFullPage[i], this.url,
                        urlValidator, 'See Full Location Hours');
                }

                return this;
            },
            verifyTelephoneLinks: function (urlValidator) {
                telLink = [
                    '.cta-to-206-789-7777',
                    '.cta-to-253-839-3030',
                    '.cta-to-425-391-3900',
                    '.cta-to-206-525-7777',
                    '.cta-to-206-542-5656',
                ];

                for (let i = 0; i < telLink.length; i++) {
                    this.verifyLink(telLink[i], 'Telephone Link Button');
                }

                return this;
            },
            verifyBookOnlineLinks: function (urlValidator) {
                const ctaSfuffix = '.cta-to-prod01-openscheduling-signupandschedule-embeddedschedule';
                bookOnlineLink = [
                    '.cta-parent-res-clinic:nth-child(1) ' + ctaSfuffix,
                    '.cta-parent-res-clinic:nth-child(2) ' + ctaSfuffix,
                    '.cta-parent-res-clinic:nth-child(3) ' + ctaSfuffix,
                    '.cta-parent-res-clinic:nth-child(4) ' + ctaSfuffix,
                    '.cta-parent-res-clinic:nth-child(5) ' + ctaSfuffix,
                ];
                bookOnlinePage = [
                    'body.embedded',
                    'body.embedded',
                    'body.embedded',
                    'body.embedded',
                    'body.embedded',
                ];

                for (let i = 0; i < bookOnlineLink.length; i++) {
                    this.verifyLinkClick(bookOnlineLink[i], bookOnlinePage[i], this.url,
                        urlValidator, 'Book Online Button');
                }

                return this;
            },
            verifyGetInLineLinks: function (urlValidator) {
                getInLineLink = [
                    '.cta-parent-res-clinic:nth-child(1) .btn-outline-primary',
                    '.cta-parent-res-clinic:nth-child(2) .btn-outline-primary',
                    '.cta-parent-res-clinic:nth-child(3) .btn-outline-primary',
                    '.cta-parent-res-clinic:nth-child(4) .btn-outline-primary',
                    '.cta-parent-res-clinic:nth-child(5) .btn-outline-primary',
                ];
                getInLinePage = [
                    'body.appointments.new',
                    'body.appointments.new',
                    'body.appointments.new',
                    'body.appointments.new',
                    'body.appointments.new',
                ];

                for (let i = 0; i < getInLineLink.length; i++) {
                    this.verifyLinkClick(getInLineLink[i], getInLinePage[i], this.url,
                        urlValidator, 'Get In Line');
                }

                return this;
            },
            verifySeeDetailsLinks: function (urlValidator) {
                seeDetailsLink = [
                    '.cta-to-locations-primary-care-ballard.clinic-card',
                    '.cta-to-locations-primary-care-federal-way.clinic-card',
                    '.cta-to-locations-primary-care-issaquah.clinic-card',
                    '.cta-to-locations-primary-care-ravenna.clinic-card',
                    '.cta-to-locations-primary-care-shoreline.clinic-card',
                ];
                seeDetailsPage = [
                    'body.path-node-22271',
                    'body.path-node-22241',
                    'body.path-node-22251',
                    'body.path-node-22266',
                    'body.path-node-22221',
                ];

                for (let i = 0; i < seeDetailsLink.length; i++) {
                    this.verifyLinkClick(seeDetailsLink[i], seeDetailsPage[i], this.url,
                        urlValidator, 'See Details');
                }

                return this;
            },
            verifyGetCareNowLinks: function (urlValidator) {
                return this.verifyLinkClick('@virtualClinicGetCareLink',
                    this.elements.virtualClinicGetCarePage, this.url, urlValidator, 'Get Care Now');
            },
		}
	],
	elements: {
        virtualClinicGetCareLink: '.btn-cta-fluid',
        virtualClinicGetCarePage: 'body.path-node-49201'
	}
};
