import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertThreeColGridCommand from "./insertthreecolgridcommand";

/**
 * CKEditor 5 plugins do not work directly with the DOM.  They are defined as
 * plugin-specific data models that are then converted to markup that is
 * inserted in the DOM.
 *
 * CKEditor 5 internally interacts with grid as this model:
 * <threeColGrid>
 *   <leftThreeColGrid></leftThreeColGrid>
 *   <rightThreeColGrid></rightThreeColGrid>
 * </threeColGrid>
 *
 * Which s converted for the browser/user as this markup:
 * <div class="flexgrid-nm three-col">
 *   <div class="col-xxl-4 col-second"></div>
 *   <div class="col-xxl-9 col-main"></div>
 * </div>
 *
 * This file as the logic for defining the grid model, and for how it is
 * converted to standard DOM markup.
 */
export default class ThreeColLeftGridEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertThreeColGrid',
      new InsertThreeColGridCommand(this.editor),
    );
  }

  /**
   * This registers structure that will be seen by CKEditor 5 as
   * <grid>
   *   <leftThreeColGrid></leftThreeColGrid>
   *   <rightThreeColGrid></rightThreeColGrid>
   * </grid>
   *
   * The logic n _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('threeColGrid', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the
      // root).
      allowWhere: '$block',
    });

    schema.register('leftThreeColGrid', {
      // This creates a boundary for external actions such as clicking and
      // keypress.  For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      lisLimit: true,
      // This is only to be used within grid.
      allowIn: 'threeColGrid',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      // allowContentOf: '$block',
      allowContentOf: '$root',
    });

    schema.register('centerThreeColGrid', {
      lisLimit: true,
      allowIn: 'threeColGrid',
      allowContentOf: '$root',
    });

    schema.register('rightThreeColGrid', {
      lisLimit: true,
      allowIn: 'threeColGrid',
      allowContentOf: '$root',
    });

    // Disallow grid inside of rightThreeColGrid.
    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('rightThreeColGrid') &&
        childDefinition.name === 'threeColGrid'
      ) {
        return false;
      }
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('centerThreeColGrid') &&
        childDefinition.name === 'threeColGrid'
      ) {
        return false;
      }
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('leftThreeColGrid') &&
        childDefinition.name === 'threeColGrid'
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
    // If <div class="flexgrid-nm three-col"> is present in the existing
    // markup processed by CKEditor, then CKEditor recognizes and loads it as a
    // <threeColGrid> model.
    conversion.for('upcast').elementToElement({
      model: 'threeColGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm three-col',
      },
    });

    // If <div class="col-xxl-4 col-second"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <leftThreeColGrid> model, provided it is a child element of
    // <threeColGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'leftThreeColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-4 col-first'
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'centerThreeColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-4 col-second'
      }
    });

    // If <div class="col-xxl-9 col-main"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <rightThreeColGrid> model, provided it is a child element of
    // <threeColGrid>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'rightThreeColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-4 col-third',
      }
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    // Instances of <threeColGrid> are saved as
    // <div class="flexgrid-nm three-col">{{inner content}}</div>.
    conversion.for('dataDowncast').elementToElement({
      model: 'threeColGrid',
      view: {
        name: 'div',
        classes: 'flexgrid-nm three-col',
      }
    });

    // Instances of <leftThreeColGrid> are saved as
    // <div class="col-xxl-4 col-second">.
    conversion.for('dataDowncast').elementToElement({
      model: 'leftThreeColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-4 col-first',
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'centerThreeColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-4 col-second',
      }
    });

    // Instances of <rightThreeColGrid> are saved as
    // <div class="col-xxl-9 col-main">.
    conversion.for('dataDowncast').elementToElement({
      model: 'rightThreeColGrid',
      view: {
        name: 'div',
        classes: 'col-xxl-4 col-third',
      }
    });

    // Editing Downcast Converters: These render the content to the user for
    // editing.  i.e. this determines what gets seen in the editor.  These
    // trigger after the Data Upcast Converters, and are re-triggered any time
    // there are change to any of the models' properties.
    // Convert the <threeColGrid> model into a container widget in the editor
    // UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'threeColGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'flexgrid-nm three-col',
        });

        return toWidget(div, viewWriter, { label: 'three column left grid widget' });
      },
    });

    // Convert the <leftThreeColGrid> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'leftThreeColGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-4 col-first',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'centerThreeColGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-4 col-second',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    // Convert the <rightThreeColGrid> model into a container widget in the
    // editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'rightThreeColGrid',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'col-xxl-4 col-third',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });
  }
}
