# DFCI Starter Content

This module creates starter content on new subsites. It provides DevelGenerate
plugins to generate a collection of files, media, blocks, content and content
placed in layouts.

## Installation

To initialize a Drupal site with an empty database, run:
`drush site:install`

To install starter content:
1. Enable the module: `drush en dfci_starter_content`
2. Install minimal starter and a few pages, run
`dfci-starter:dfci-starter:create-minimal-starter-content`
3. To install a full collection of starter content and pages, run
`dfci-starter:create-starter-content`

## Usage

To generate starter content, use the following Drush command:
`drush [command]`

Currently, commands for starter content are below. Order matters and terms or
blocks are needed before pages that depend on them.

```bash
drush dfci-starter:create-media
drush dfci-starter:create-blocks
drush dfci-starter:create-terms
drush dfci-starter:create-basic-blocks
drush dfci-starter:create-accordions
drush dfci-starter:create-news
drush dfci-starter:create-events
drush dfci-starter:create-home-page
drush dfci-starter:create-research-page
drush dfci-starter:create-support-page
drush dfci-starter:create-publications-page
drush dfci-starter:create-team-page
drush dfci-starter:create-contact-us-page
```
