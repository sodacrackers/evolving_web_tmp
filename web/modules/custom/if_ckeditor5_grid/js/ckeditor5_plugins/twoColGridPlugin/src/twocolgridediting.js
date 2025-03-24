import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTwoColGridCommand from "./inserttwocolgridcommand";

/**
 * CKEditor 5 plugins do not work directly with the DOM.  They are defined as
 * plugin-specific data models that are then converted to markup that is
 * inserted in the DOM.
 *
 * CKEditor 5 internally interacts with grid as this model:
 * <twoColGrid>
 *   <leftTwoColGrid></leftTwoColGrid>
 *   <rightTwoColGrid></rightTwoColGrid>
 * </twoColGrid>
 *
 * Which s converted for the browser/user as this markup:
 * <div class="flexgrid-nm two-col">
 *   <div class="col-xxl-6 col-first"></div>
 *   <div class="col-xxl-9 col-main"></div>
 * </div>
 *
 * This file as the logic for defining the grid model, and for how it is
 * converted to standard DOM markup.
 */
export default class TwoColLeftGridEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTwoColGrid',
      new InsertTwoColGridCommand(this.editor),
    );
  }

  /**
   * This registers structure that will be seen by CKEditor 5 as
   * <grid>
   *   <leftTwoColGrid></leftTwoColGrid>
   *   <rightTwoColGrid></rightTwoColGrid>
   * </grid>
   *
   * The logic n _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('twoColGrid', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the
      // root).
      allowWhere: '$block',
    });

    schema.register('leftTwoColGrid', {
      // This creates a boundary for external actions such as clicking and
      // keypress.  For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      lisLimit: true,
      // This is only to be used within grid.
      allowIn: 'twoColGrid',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      // allowContentOf: '$block',
      allowContentOf: '$root',
    });

    schema.register('rightTwoColGrid', {
      lisLimit: true,
      allowIn: 'twoColGrid',
      allowContentOf: '$root',
    });

    // Disallow grid inside of rightTwoColGrid.
    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('rightTwoColGrid') &&
        childDefinition.name === 'twoColGrid'
      ) {
        return false;
      }
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('leftTwoColGrid') &&
        childDefinition.name === 'twoColGrid'
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
    // If <div class="flexgrid-nm two-col"> is present in the existing
    // markup processed by CKEditor, then CKEditor recognizes and loads it as a
    // <twoColGrid> model.
    conversion.for('upcast').elementToElement({
      model: 'twoColGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm two-col',
      },
    });

    // If <div class="col-xxl-6 col-first"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <leftTwoColGrid> model, provided it is a child element of
    // <twoColGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'leftTwoColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-6 col-first'
      }
    });

    // If <div class="col-xxl-9 col-main"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <rightTwoColGrid> model, provided it is a child element of
    // <twoColGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'rightTwoColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-6 col-second',
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    // Instances of <twoColGrid> are saved as
    // <div class="flexgrid-nm two-col">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'twoColGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm two-col',
      }
    });

    // Instances of <leftTwoColGrid> are saved as
    // <div class="col-xxl-6 col-first">.
    conversion.for('dataDowncast').elementToElement({
      model: 'leftTwoColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-6 col-first',
      }
    });

    // Instances of <rightTwoColGrid> are saved as
    // <div class="col-xxl-9 col-main">.
    conversion.for('dataDowncast').elementToElement({
      model: 'rightTwoColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-6 col-second',
      }
    });

    // Editing Downcast Converters: These render the content to the user for
    // editing.  i.e. this determines what gets seen in the editor.  These
    // trigger after the Data Upcast Converters, and are re-triggered any time
    // there are change to any of the models' properties.
    // Convert the <twoColGrid> model into a container widget in the editor
    // UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'twoColGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'flexgrid-nm two-col',
        });

        return toWidget(div, viewWriter, { label: 'two column left grid widget' });
      },
    });

    // Convert the <leftTwoColGrid> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'leftTwoColGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-6 col-first',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    // Convert the <rightTwoColGrid> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'rightTwoColGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-6 col-second',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });
  }
}
