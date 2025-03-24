/**
 * @file registers the grid toolbar button and binds functionality to it.
 */
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/three-columns.svg';

export default class ThreeColGridUi extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the grid toolbar button.
    editor.ui.componentFactory.add('threeColGrid', (locale) => {
      const command = editor.commands.get('insertThreeColGrid');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Grid (3-col)'),
        icon,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertThreeColGrid'),
      );

      return buttonView;
    });
  }
}
