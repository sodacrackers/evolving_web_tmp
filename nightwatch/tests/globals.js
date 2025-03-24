/**
 * @file
 * Global variables for UWM-CMS tests.
 */

const args = require('minimist')(process.argv);

module.exports = {

  "browserstackUser": process.env.BROWSERSTACK_USER,
  "browserstackKey": process.env.BROWSERSTACK_KEY,

  "sites": {

    "rar": {
      "local": "http://chew.uwmed.local",
      "develop": "https://chew.cmsdev.uwmedicine.org",
      "stage": "https://chew.cmsstage.uwmedicine.org",
      "sandbox": "https://rightasrain.uwmedicinetest.org",
      "prod": "https://rightasrain.uwmedicine.org",

      get launch_url() {
        let e = args.environment || "stage";
        return this[e];
      },

    },

    "huddle": {
      "local": "http://huddle.uwmed.local",
      "develop": "https://huddle.cmsdev.uwmedicine.org",
      "stage": "https://huddle.cmsstage.uwmedicine.org",
      "sandbox": "https://huddle.uwmedicinetest.org",
      "prod": "https://huddle.uwmedicine.org",

      get launch_url() {
        let e = args.environment || "stage";
        return this[e];
      },

    },

    "stevie": {
      "local": "http://stevie.uwmed.local",
      "develop": "https://stevie.cmsdev.uwmedicine.org",
      "stage": "https://stevie.cmsstage.uwmedicine.org",
      "sandbox": "https://stevie.uwmedicinetest.org",
      "prod": "https://www.uwmedicine.org",

      get launch_url() {
        let e = args.environment || "stage";
        return this[e];
      },
    }

  }

};
