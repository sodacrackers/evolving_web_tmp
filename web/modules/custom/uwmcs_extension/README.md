# UWMCS Extension

This module provides custom Twig functions and filters for use in Drupal themes.

It's provided to ease theming and using trusted API data directly in templates.

## Available Functions

- `uwm_get_path_nid()`: Retrieves the node ID based on a given path alias.
- `uwm_plugin_block()`: Renders a block plugin by its ID.
- `uwm_get_api_nid()`: Retrieves a node ID from an API URI.
- `uwm_extract_parts()`: Extracts values from an array based on a given key.
- `uwm_sort_by_list()`: Sorts a nested array based on a field.
- `uwm_get_sharepoint_location_image()`: Gets a clinic image URL from SharePoint or returns a placeholder.
- `uwm_cta_link()`: Generates a Drupal "link" render element for theming.

## Available Filters

- `uwm_replace_markup`: Converts inline styles to HTML tags.
- `uwm_join_parts`: Joins array elements into a string.
- `uwm_sort_parts`: Sorts an array by values.
- `uwm_format_phone`: Formats a phone number.
- `uwm_url_decode`: Decodes a URL.
- `uwm_arraycount_styles`: Generates CSS classes based on the number of items.
- `uwm_format_accent_class`: Converts a string into specific CSS classes.
- `uwm_filter_non_numeric_keys`: Filters out non-numeric keys from an array.
- `uwm_replace_links_with_text`: Replaces link render arrays with their title text.
