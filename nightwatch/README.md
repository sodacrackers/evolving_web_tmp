# UWMCMS -- Digital Marketing
#### [uwmedicine.org](https://uwmedicine.org)

***
Automated end-to-end testing powered by [Nightwatch](https://nightwatchjs.org) , [Node.js](http://nodejs.org) and [W3C Webdriver](https://www.w3.org/TR/webdriver) (formerly [Selenium](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)).

***
## Up &amp; Running in 2 Minutes.

#### 1. Install Nightwatch and the NPM packages

```
echo "Check node requirements at https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"

cd tests/nightwatch
npm install
```


#### 2. Run the desired test configurations.
To run the suite of tests tagged RaR, execute

```
npm run tests -- --tag RaR
```

To run those tests on STAGE or PROD, execute

```
npm run tests -- --tag RaR --environment stage
# or
npm run tests -- --tag RaR --environment prod
```

To run those tests on BrowserStack, execute

```
npm run tests -- --tag RaR --browserstack
# or
npm run tests -- --tag RaR --browserstack --environment prod
```

To run those tests on BrowserStack using our Mac Safari
nightwatch.browserstack.conf.js configuration, execute

```
npm run tests -- --tag RaR --browserstack --env browserstack.macsafari
```

Or to run *all* tests against DEV, using BrowserStack.com's platform and
our Samsung tablet definition, execute

```
npm run tests --  --environment develop --browserstack --env browserstack.android-galaxy-tab-9
```

More Details in the Readme PDF
 ```
 @see ./tests/nightwatch/README.pdf
 ```
 https://github.com/uwmweb/uwmcms/master/tests/nightwatch/README.pdf
