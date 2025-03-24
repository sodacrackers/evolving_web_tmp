# Decorative Images

The **Decorative Images** module aims to enhance accessibility by allowing
content editors to designate whether an image is purely decorative or conveys
meaningful content. When an image is marked as decorative, it's attributes are
updated for theming and ARIA rules. Site builders may additionally set
Decorative _OR_ Alternative text to required.

## Features
- Adds a `Decorative` option to image fields.
- Configured under `Edit field` on the front end.
- Stores config in third-party settings and key-value storage.

## Installation & Usage

### Installation
```sh
composer require drupal/decorative_image
drush en decorative_image
```

### Configuration

1.  Navigate to **Edit field** on a Node or Media image field.

2.  Enable the **"Decorative image"** option near the bottom of the form.

### Usage

*   When adding or editing an image, check **\[X\] Decorative** to apply the
    decorative role.

Technical Notes
---------------

*   To customize how images are processed, refer to these additional functions:
  * template_preprocess_image()
  * template_preprocess_image_formatter()
  * template_preprocess_responsive_image_formatter()

Accessibility Benefits
----------------------

Marking non-informative images as decorative prevents screen readers from
announcing them, reducing audible clutter. For best practices, refer to the
[W3C decorative images guide](https://www.w3.org/WAI/tutorials/images/decorative/).
