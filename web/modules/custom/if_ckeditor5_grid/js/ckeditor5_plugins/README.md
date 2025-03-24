Within /src are the multiple files that will be used by the build process to
become a CKEditor 5 plugin in /build. Technically, everything in these files
could be in a single index.js - the only file the MUST be present is
/src/index.js. However, splitting the plugin into concern-specific files has
maintainability benefits.
