/**
 * @file
 * Default configurations for BrowserStack.com.
 *
 * Find these specified and used in
 * @see blt/custom-scripts/travis/run_webtests.
 */

require('dotenv').config();
const args = require('minimist')(process.argv);

browserstack_project = () => {
    let e = args.environment || 'stage'
    return `UWMWeb ${e.toUpperCase()}`
}

browserstack_build = () => {
    let e = args.environment || 'stage'
    return `UWMWeb____${e.toUpperCase()}`
}

module.exports = {

    get test_settings() {

        // Setting for LOCAL test runs.
        if (args.browserstack != true) {
            return {
                'default': {
                    'screenshots': {
                        'enabled': true,
                        'on_failure': true,
                        'on_error': true,
                        'path': 'tests_output/screenshots'
                    },
                    'desiredCapabilities': {
                        'browserName': 'chrome',
                        'chromeOptions': {
                            'args': [
                                'headless',
                                'window-size=1120,800'
                            ]
                        },
                    }
                },
            }
        }

        // Setting for BrowserStack.com test runs.
        return {
            'default': {
                'screenshots': {
                    'enabled': true,
                    'on_failure': true,
                    'on_error': true,
                    'path': 'tests_output/screenshots'
                },
                'desiredCapabilities': {
                    'browserstack.console': 'info',
                    'browserstack.user': process.env.BROWSERSTACK_USER,
                    'browserstack.key': process.env.BROWSERSTACK_KEY,
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    ['browserstack.local']: false,
                    'browserName': 'IE',
                    'browser_version': '11.0',
                    'os': 'Windows',
                    'os_version': '8.1',
                    'resolution': '1280x800'
                }
            },
            'browserstack': {
                'extends': 'default',
                'desiredCapabilities': {
                    'browserstack.user': process.env.BROWSERSTACK_USER,
                    'browserstack.key': process.env.BROWSERSTACK_KEY,
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    ['browserstack.local']: false
                },
            },
            'browserstack.win10ie': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os': 'Windows',
                    'os_version': '10',
                    'browserName': 'IE',
                    'browser_version': '11.0',
                    'resolution': '2048x1536',
                    'name': 'Win10-IE11-2048',
                    ['browserstack.local']: false,
                }
            },
            'browserstack.win10chrome': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os': 'Windows',
                    'os_version': '10',
                    'browserName': 'Chrome',
                    'browser_version': '80.0',
                    'resolution': '2048x1536',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'Win10-Chrome80-2048',
                    ['browserstack.local']: false,
                }
            },
            // FF seems to be having issues with waitForElementPresent(),
            // which is a HUGE percentage of the test cases. Since it is such
            // a small user share, putting this one on the back burner. If
            // and when I have time to work on it, I will need access to a
            // Win and Mac with FF installed and need to do it locally, too
            // hard to track down esoteric bugs like this withouth the ability
            // to breakpoint the code.
            /*'browserstack.win10ff': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os': 'Windows',
                    'os_version': '10',
                    'browserName': 'Firefox',
                    'browser_version': '73.0',
                    'resolution': '2048x1536',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'Win10-FF73-2048',
                    ['browserstack.local']: false,
                    }
                },
            */
            'browserstack.macsafari': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os': 'OS X',
                    'os_version': 'Mojave',
                    'browserName': 'Safari',
                    'browser_version': '12.0',
                    'resolution': '1920x1080',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'MAC-Catalina-Safari13-1920',
                    ['browserstack.local']: false,
                }
            },
            'browserstack.macchrome': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os': 'OS X',
                    'os_version': 'Catalina',
                    'browserName': 'Chrome',
                    'browser_version': '80.0',
                    'resolution': '1920x1080',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'MAC-Catalina-Chrome80-1920',
                    ['browserstack.local']: false,
                }
            },
            // FF seems to be having issues with waitForElementPresent(),
            // which is a HUGE percentage of the test cases. Since it is such
            // a small user share, putting this one on the back burner. If
            // and when I have time to work on it, I will need access to a
            // Win and Mac with FF installed and need to do it locally, too
            // hard to track down esoteric bugs like this withouth the ability
            // to breakpoint the code.
            /*'browserstack.macff': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os': 'OS X',
                    'os_version': 'Catalina',
                    'browserName': 'Firefox',
                    'browser_version': '73.0',
                    'resolution': '1920x1080',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'MAC-Catalina-FF73-1920',
                    ['browserstack.local']: false,
                }
            },
            */
            // Apple has made a change to safaridriver, which is breaking
            // isVisible() in Appium, which is used by pretty much anything
            // of use in all of Nightwatch. This means Safari-related browsers
            // will not work until they take care of it.
            // See: https://github.com/nightwatchjs/nightwatch/issues/2308
            //      https://github.com/nightwatchjs/nightwatch/pull/2328
            'browserstack.iphone-xs-13': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os_version': '13',
                    'device': 'iPhone XS',
                    'browserName': 'iPhone',
                    'real_mobile': 'true',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'iPhoneXS-13',
                    ['browserstack.local']: false,
                }
            },
            // Apple has made a change to safaridriver, which is breaking
            // isVisible() in Appium, which is used by pretty much anything
            // of use in all of Nightwatch. This means Safari-related browsers
            // will not work until they take care of it.
            // See: https://github.com/nightwatchjs/nightwatch/issues/2308
            //      https://github.com/nightwatchjs/nightwatch/pull/2328
            /*
            'browserstack.iphone11-pro-max-13': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os_version':'13',
                    'device':'iPhone 11 Pro Max',
                    'browserName':'iPhone',
                    'real_mobile':'true',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name':'iPhone11ProMax-13',
                    ['browserstack.local']: false,
                },
            },
            */
            // Apple has made a change to safaridriver, which is breaking
            // isVisible() in Appium, which is used by pretty much anything
            // of use in all of Nightwatch. This means Safari-related browsers
            // will not work until they take care of it.
            // See: https://github.com/nightwatchjs/nightwatch/issues/2308
            //      https://github.com/nightwatchjs/nightwatch/pull/2328
            /*
            'browserstack.iphone-xr-12': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os_version':'12',
                    'device':'iPhone XR',
                    'browserName':'iPhone',
                    'real_mobile':'true',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name':'iPhoneXR-12',
                    ['browserstack.local']: false,
                },
            },
            */
            // Apple has made a change to safaridriver, which is breaking
            // isVisible() in Appium, which is used by pretty much anything
            // of use in all of Nightwatch. This means Safari-related browsers
            // will not work until they take care of it.
            // See: https://github.com/nightwatchjs/nightwatch/issues/2308
            //      https://github.com/nightwatchjs/nightwatch/pull/2328
            'browserstack.ipadpro-13': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os_version': '13',
                    'device': 'iPad Pro 12.9 2018',
                    'browserName': 'iPad',
                    'real_mobile': 'true',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'iPadPro2018-13',
                    ['browserstack.local']: false,
                },
            },
            'browserstack.android-samsung-s9-9': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os_version': '9.0',
                    'device': 'Samsung Galaxy S9 Plus',
                    'browserName': 'Android',
                    'real_mobile': 'true',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'AndroidSamsungS9Plus-9.0',
                    ['browserstack.local']: false,
                },
            },
            'browserstack.android-google-pixel4-10': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os_version': '10.0',
                    'device': 'Google Pixel 4 XL',
                    'browserName': 'Android',
                    'real_mobile': 'true',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'AndroidGooglePixel4XL-10',
                    ['browserstack.local']: false,
                },
            },
            'browserstack.android-galaxy-tab-9': {
                'extends': 'browserstack',
                'desiredCapabilities': {
                    'os_version': '9.0',
                    'device': 'Samsung Galaxy Tab S6',
                    'browserName': 'Android',
                    'real_mobile': 'true',
                    'project': browserstack_project(),
                    'build': browserstack_build(),
                    'name': 'AndroidTabletS6-9',
                    ['browserstack.local']: false,
                },
            },
        }
    }


};
