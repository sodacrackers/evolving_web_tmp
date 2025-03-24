/**
 * @file registers the grid toolbar button and binds functionality to it.
 */
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/two-columns-left.svg';

export default class TwoColLeftGridUi extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the grid toolbar button.
    editor.ui.componentFactory.add('twoColLeftGrid', (locale) => {
      const command = editor.commands.get('insertTwoColLeftGrid');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Grid (2-col Left)'),
        icon,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertTwoColLeftGrid'),
      );

      return buttonView;
    });
  }
}
