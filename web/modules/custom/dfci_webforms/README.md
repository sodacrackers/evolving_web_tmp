# DFCI Webforms Module

Custom module to provide Webform validation. Specifically, it restricts allowed
email domains to ensure only `@harvard.edu` and `@dfci.harvard.edu` domains are
allowed.

## Usage

1. Install and enable the `dfci_webforms` module.
2. Configure your webform to use the `DFCI Email Validation` handler.
3. The module will automatically validate the email addresses submitted through
the webform and ensure they belong to the allowed domains.

## Configuration

No additional configuration is required. The allowed domains are hardcoded in
the module.

## Customization

To customize the allowed email domains, modify the `ALLOWED_RECIPIENT_DOMAINS`
constant in the `DfciWebformEmailValidation` class.

```php
const ALLOWED_RECIPIENT_DOMAINS = ['@harvard.edu', '@dfci.harvard.edu'];
```

