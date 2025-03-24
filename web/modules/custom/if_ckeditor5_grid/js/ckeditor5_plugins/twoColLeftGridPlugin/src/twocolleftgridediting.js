import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTwoColLeftGridCommand from "./inserttwocolleftgridcommand";

/**
 * CKEditor 5 plugins do not work directly with the DOM.  They are defined as
 * plugin-specific data models that are then converted to markup that is
 * inserted in the DOM.
 *
 * CKEditor 5 internally interacts with grid as this model:
 * <twoColLeftGrid>
 *   <twoColLeftGridLeft></twoColLeftGridLeft>
 *   <twoColLeftGridRight></twoColLeftGridRight>
 * </twoColLeftGrid>
 *
 * Which s converted for the browser/user as this markup:
 * <div class="flexgrid-nm two-col-left">
 *   <div class="col-xxl-3 col-sidebar"></div>
 *   <div class="col-xxl-9 col-main"></div>
 * </div>
 *
 * This file as the logic for defining the grid model, and for how it is
 * converted to standard DOM markup.
 */
export default class TwoColLeftGridEditing extends Plugin {
  static get requres() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTwoColLeftGrid',
      new InsertTwoColLeftGridCommand(this.editor),
    );
  }

  /**
   * This registers structure that will be seen by CKEditor 5 as
   * <grid>
   *   <twoColLeftGridLeft></twoColLeftGridLeft>
   *   <twoColLeftGridRight></twoColLeftGridRight>
   * </grid>
   *
   * The logic n _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('twoColLeftGrid', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the
      // root).
      allowWhere: '$block',
    });

    schema.register('twoColLeftGridLeft', {
      // This creates a boundary for external actions such as clicking and
      // keypress.  For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      lisLimit: true,
      // This is only to be used within grid.
      allowIn: 'twoColLeftGrid',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      // allowContentOf: '$block',
      allowContentOf: '$root',
    });

    schema.register('twoColLeftGridRight', {
      lisLimit: true,
      allowIn: 'twoColLeftGrid',
      allowContentOf: '$root',
    });

    // Disallow grid inside of twoColLeftGridRight.
    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('twoColLeftGridRight') &&
        childDefinition.name === 'twoColLeftGrid'
      ) {
        return false;
      }
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('twoColLeftGridLeft') &&
        childDefinition.name === 'twoColLeftGrid'
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
    // If <div class="flexgrid-nm two-col-left"> is present in the existing
    // markup processed by CKEditor, then CKEditor recognizes and loads it as a
    // <twoColLeftGrid> model.
    conversion.for('upcast').elementToElement({
      model: 'twoColLeftGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm two-col-left',
      },
    });

    // If <div class="col-xxl-3 col-sidebar"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <twoColLeftGridLeft> model, provided it is a child element of
    // <twoColLeftGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'twoColLeftGridLeft',
      view: {
        name: 'div',
        classes: 'col-xxl-3 col-sidebar'
      }
    });

    // If <div class="col-xxl-9 col-main"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <twoColLeftGridRight> model, provided it is a child element of
    // <twoColLeftGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'twoColLeftGridRight',
      view: {
        name: 'div',
        classes: 'col-xxl-9 col-main'
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    // Instances of <twoColLeftGrid> are saved as
    // <div class="flexgrid-nm two-col-left">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'twoColLeftGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm two-col-left',
      }
    });

    // Instances of <twoColLeftGridLeft> are saved as
    // <div class="col-xxl-3 col-sidebar">.
    conversion.for('dataDowncast').elementToElement({
      model: 'twoColLeftGridLeft',
      view: {
        name: 'div',
        classes: 'col-xxl-3 col-sidebar',
      }
    });

    // Instances of <twoColLeftGridRight> are saved as
    // <div class="col-xxl-9 col-main">.
    conversion.for('dataDowncast').elementToElement({
      model: 'twoColLeftGridRight',
      view: {
        name: 'div',
        classes: 'col-xxl-9 col-main',
      }
    });

    // Editing Downcast Converters: These render the content to the user for
    // editing.  i.e. this determines what gets seen in the editor.  These
    // trigger after the Data Upcast Converters, and are re-triggered any time
    // there are change to any of the models' properties.
    // Convert the <twoColLeftGrid> model into a container widget in the editor
    // UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColLeftGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'flexgrid-nm two-col-left',
        });

        return toWidget(div, viewWriter, { label: 'two column left grid widget' });
      },
    });

    // Convert the <twoColLeftGridLeft> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColLeftGridLeft',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-3 col-sidebar',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    // Convert the <twoColLeftGridRight> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColLeftGridRight',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-9 col-main',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });
  }
}
