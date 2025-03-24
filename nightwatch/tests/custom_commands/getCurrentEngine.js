/**
 * @file
 * Custom command that returns the browser engine of the browser that the test
 * is currently running:
 *      Blink: Chrome, Android, Edge, Opera
 *      Trident: Internet Explorer
 *      Gecko: Firefox
 *      Webkit: Safari
 */

module.exports = {

    command: async function (browser) {
        let browserName = this.options.desiredCapabilities.browserName;
        switch (browserName) {
            case 'Chrome':
                return 'Blink';
                break;
            case 'Android':
                return 'Blink';
                break;
            case 'Edge': // needs verification of string returned from desiredCapabilites
                return 'Blink';
                break;
            case 'Opera': // needs verification of string returned from desiredCapabilites
                return 'Blink';
                break;
            case 'IE':
                return 'Trident';
                break;
            case 'Firefox': // needs verification of string returned from desiredCapabilites
                return 'Gecko';
                break;
            case 'Safari': // needs verification of string returned from desiredCapabilites
                return 'Webkit';
                break;
        }
        return 'Unknown';
    }
};