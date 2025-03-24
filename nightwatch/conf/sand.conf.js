nightwatch_config = {
  src_folders : [ "/Users/gray/git/uwmcms/_tests/gray/tests/sand" ],
  page_objects_path : [ "/Users/gray/git/uwmcms/_tests/gray/page_objects"],
  custom_assertions_path : "/Users/gray/git/uwmcms/_tests/gray/custom_assertions",
  custom_commands_path: "/Users/gray/git/uwmcms/_tests/gray/custom_commands",
  globals_path: "/Users/gray/git/uwmcms/_tests/gray/globals.js",

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 443
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        "build": "Gray Working - Feb 7",
        "project": "Grays Test Project",
        "browserstack.user": "uwmedicine2",
        "browserstack.key": "YswTgFnmBJdaRcJ86Bxy",
        "browserstack.debug": true,
        "browserstack.console": "errors",
        "browserstack.networkLogs": "true",

        "os": "Windows",
        "os_version": "10",
        "browser": "IE",
        "browser_version": "11.0",
        "resolution": "2048x1536"
      },
      "launch_url": "https://www.uwmedicine.org/"
    }
  }
};

// Code to copy seleniumhost/port into test settings
for(var i in nightwatch_config.test_settings){
  var config = nightwatch_config.test_settings[i];
  config["selenium_host"] = nightwatch_config.selenium.host;
  config["selenium_port"] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
