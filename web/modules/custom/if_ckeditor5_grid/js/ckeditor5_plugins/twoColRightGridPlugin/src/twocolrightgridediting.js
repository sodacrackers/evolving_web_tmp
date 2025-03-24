import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTwoColRightGridCommand from "./inserttwocolrightgridcommand";

/**
 * CKEditor 5 plugins do not work directly with the DOM.  They are defined as
 * plugin-specific data models that are then converted to markup that is
 * inserted in the DOM.
 *
 * CKEditor 5 internally interacts with grid as this model:
 * <twoColRightGrid>
 *   <twoColRightGridLeft></twoColRightGridLeft>
 *   <twoColRightGridRight></twoColRightGridRight>
 * </twoColRightGrid>
 *
 * Which s converted for the browser/user as this markup:
 * <div class="flexgrid-nm two-col-right">
 *   <div class="col-xxl-9 col-main"></div>
 *   <div class="col-xxl-3 col-sidebar"></div>
 * </div>
 *
 * This file as the logic for defining the grid model, and for how it is
 * converted to standard DOM markup.
 */
export default class TwoColRightGridEditing extends Plugin {
  static get requres() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTwoColRightGrid',
      new InsertTwoColRightGridCommand(this.editor),
    );
  }

  /**
   * This registers structure that will be seen by CKEditor 5 as
   * <grid>
   *   <twoColRightGridLeft></twoColRightGridLeft>
   *   <twoColRightGridRight></twoColRightGridRight>
   * </grid>
   *
   * The logic n _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('twoColRightGrid', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the
      // root).
      allowWhere: '$block',
    });

    schema.register('twoColRightGridLeft', {
      // This creates a boundary for external actions such as clicking and
      // keypress.  For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      lisLimit: true,
      // This is only to be used within grid.
      allowIn: 'twoColRightGrid',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      // allowContentOf: '$block',
      allowContentOf: '$root',
    });

    schema.register('twoColRightGridRight', {
      lisLimit: true,
      allowIn: 'twoColRightGrid',
      allowContentOf: '$root',
    });

    // Disallow grid inside of twoColRightGridRight.
    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('twoColRightGridRight') &&
        childDefinition.name === 'twoColRightGrid'
      ) {
        return false;
      }
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('twoColRightGridLeft') &&
        childDefinition.name === 'twoColRightGrid'
      ) {
        return false;
      }
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion } = this.editor;

    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor.  These trigger when an editor instance loads.
    // If <div class="flexgrid-nm two-col-right"> is present in the existing
    // markup processed by CKEditor, then CKEditor recognizes and loads it as a
    // <twoColRightGrid> model.
    conversion.for('upcast').elementToElement({
      model: 'twoColRightGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm two-col-right',
      },
    });

    // If <div class="col-xxl-3 col-sidebar"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <twoColRightGridLeft> model, provided it is a child element of
    // <twoColRightGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'twoColRightGridLeft',
      view: {
        name: 'div',
        classes: 'col-xxl-9 col-main'
      }
    });

    // If <div class="col-xxl-9 col-main"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <twoColRightGridRight> model, provided it is a child element of
    // <twoColRightGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'twoColRightGridRight',
      view: {
        name: 'div',
        classes: 'col-xxl-3 col-sidebar'
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    // Instances of <twoColRightGrid> are saved as
    // <div class="flexgrid-nm two-col-right">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'twoColRightGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm two-col-right',
      }
    });

    // Instances of <twoColRightGridLeft> are saved as
    // <div class="col-xxl-3 col-sidebar">.
    conversion.for('dataDowncast').elementToElement({
      model: 'twoColRightGridLeft',
      view: {
        name: 'div',
        classes: 'col-xxl-9 col-main',
      }
    });

    // Instances of <twoColRightGridRight> are saved as
    // <div class="col-xxl-9 col-main">.
    conversion.for('dataDowncast').elementToElement({
      model: 'twoColRightGridRight',
      view: {
        name: 'div',
        classes: 'col-xxl-3 col-sidebar',
      }
    });

    // Editing Downcast Converters: These render the content to the user for
    // editing.  i.e. this determines what gets seen in the editor.  These
    // trigger after the Data Upcast Converters, and are re-triggered any time
    // there are change to any of the models' properties.
    // Convert the <twoColRightGrid> model into a container widget in the editor
    // UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColRightGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'flexgrid-nm two-col-right',
        });

        return toWidget(div, viewWriter, { label: 'two column right grid widget' });
      },
    });

    // Convert the <twoColRightGridLeft> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColRightGridLeft',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-9 col-main',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    // Convert the <twoColRightGridRight> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColRightGridRight',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-3 col-sidebar',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });
  }
}
