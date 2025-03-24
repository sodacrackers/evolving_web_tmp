# Lagoon Facts Graph Module

This module provides a way to view large JSON data collections in the Drupal UI or to download the JSON. The data is fetched from our host GraphQL endpoints. Because working with JSON is very memory intensive, we rely on `jq` and server-side processing.

## Features

- View large JSON data collections in the Drupal UI.
- Download JSON data in CSV or JSON format.
- Fetch data from GraphQL endpoints.

## Routes

- `/admin/content/graph/projects`: View project data.
- `/admin/content/graph/facts`: View facts data.
- `/admin/content/graph/tokens`: Refresh and view tokens.

## Download Options

- Append `?format=csv` to download data as CSV.
- Append `?format=json` to download data as JSON.
- Append `?token=xxxxxxxx` to use a custom bearer token.

## Dependencies

- `jq` for JSON processing.
- Server-side processing to handle large data sets.

## Usage

1. Navigate to the provided routes to view data.
2. Use the download options to export data as needed.
