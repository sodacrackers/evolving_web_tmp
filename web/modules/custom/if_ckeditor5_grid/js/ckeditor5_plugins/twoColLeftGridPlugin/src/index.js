/**
 * @file The build process always expects an index.js file.  ANything exported
 * here will be recognized by CKEditor 5 as an available plugin.  Multiple
 * plugins can be exported in this one file.
 */

import TwoColLeftGrid from './twocolleftgrid';

export default {
  TwoColLeftGrid,
};
