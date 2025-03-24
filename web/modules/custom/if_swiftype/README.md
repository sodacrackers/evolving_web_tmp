# IF Swiftype

## Setup

1. Ensure no routes or nodes are using `/search`
1. Enable this module: `lando drush en -y if_swiftype`
1. Add the `SWIFTYPE_ENGINE_KEY` environment variable:
   1. On Lagoon environments: `lagoon add variable -p <project-code> -S runtime
   -N SWIFTYPE_ENGINE_KEY -V <swiftype engine key>`
   1. For local dev: add `SWIFTYPE_ENGINE_KEY=<swiftype engine key>` to the
   project's `/app/.lando.local.env` file
1. Then, refresh the Swiftype app: `lando swiftype run build`
1. View your results at /search

## Useful links

- https://swiftype.com/documentation
- https://docs.elastic.co/search-ui/overview
- https://github.com/elastic/search-ui/

## Description

**Read through the description before beginning development**

### Overview

This module adds Swiftype Elastic search functionality via HTML tags added to
each page. Depending on the this module's customization (and Simple Sitemap
module settings), meta tags are added to each page for Swiftype crawling.

See [SwiftypeTags.php](src/EventSubscriber/Preprocess/SwiftypeTags.php) and
[Swiftype.com](https://swiftype.com/) for more information.

There are 2 main Swiftype components:

- The search page
- The header autocomplete form

### Backend

Tag configuration happens in
[SwiftypeTags.php](src/EventSubscriber/Preprocess/SwiftypeTags.php). Set the
content types and what their tags for Swiftype crawling there. This piece of
the functionality exists as a Drupal Event Subscriber which preprocess a page
and adds the appropriate tags.

Content that is not to be crawled gets the "exclude_tag" tag.

The main search app is located at `/search`. The container for this exists as
the [SwiftypeController.php](src/Controller/IfSwifTypeController.php) Controller
and is empty.

The [SwiftypeContainer.php](src/Plugin/Block/SwiftypeContainer.php) is then
placed in the content of that page to allow rendering the search-app React
application.

The search input with autocomplete is located typically in the top of the menu
bar on the site. The [SwiftypeAutocomplete.php](src/Plugin/Block/SwiftypeAutocomplete.php)
is placed appropriately in the header region to allow rendering the
search-autocomplete React application.

### Frontend

The 2 applications are built using React with the `@elastic/react-search-ui`
library.

Both applications make use of a series of React components within that library
to render search results.

The main components in both applicatons are the `<SearchProvider>` and
`<WithSearch>` components, which handle most of the legwork of searching for us.

You will also find a handful of custom components within the `search_components`
directory of each application.

## Development

For each of the React components the following must be ran before development
beings:

_Note: This happens automatically upon first start or lando rebuild_

1. Change directory to the root of the application
   1. Ex: `cd web/modules/custom/if_swiftype/search-app`
2. Install dependencies
   1. `lando npm install --legacy-peer-deps
   --prefix /app/web/modules/custom/if_swiftype/search-app`
3. Build the application
   1. `lando npm run build
   --prefix /app/web/modules/custom/if_swiftype/search-app`

Anytime changes are made to the components you must re-run `lando npm run build
 --prefix /app/web/modules/custom/if_swiftype/search-app`
and subsequently clear Drupal cache `lando drush cr`.

For updates to indexing, see the **Backend** section above.

## Appendix

- [Example implementation](https://github.com/elastic/search-ui/tree/1.8/packages/search-ui-site-search-connector)
- [Documentation](https://codesandbox.io/s/search-ui-examples-znx8pe?file=/src/pages/site-search/index.js)
