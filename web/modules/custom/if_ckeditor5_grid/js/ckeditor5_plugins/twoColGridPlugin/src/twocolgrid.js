/**
 * @file This is what CKEditor refers to as a master (glue) plugin.  Its role is
 * just to load the "editing" and "UI" components of this plugin.  Those
 * components could be included in this file.
 */

// The contents of GridUI and Grid editing could be included in this file, but
// it is recommended to separate these concerns in different files.
import TwoColGridEditing from './twocolgridediting';
import TwoColGridUi from './twocolgridui';
import { Plugin } from 'ckeditor5/src/core';

export default class TwoColGrid extends Plugin {
  // Note that the GridEditing and GridUI also extend 'Plugin', but these are
  // not seen as individual plugins by CKEditor 5.  CKEditor 5 will only
  // discover the plugins explicitly exported by index.js.
  static get requires() {
    return [TwoColGridEditing, TwoColGridUi];
  }
}
