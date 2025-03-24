/**
 * @file defines InsertGridCommand, which is executed when the grid toolbar
 * button is pressed.
 */

import { Command } from 'ckeditor5/src/core';

export default class InsertTwoColRightGridCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <twoColRightGrid>*</twoColRightGrid> at the current selection
      // position in a way that will result in creating a valid model structure.
      model.insertContent(createGrid(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a grid
    // is permitted.  This is based on the schema of the model(s) currently
    // containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'twoColRightGrid',
    );

    // If the cursor is not in a location where a grid can be added, return null
    // so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createGrid(writer) {
  // Create instances of the elements registered with the editor in
  // twocolrightgridediting.js.
  const grid = writer.createElement('twoColRightGrid');
  const leftGrid = writer.createElement('twoColRightGridLeft');
  const rightGrid = writer.createElement('twoColRightGridRight');

  // Append the inner grid items to the grid, which match the parent/child
  // relationships as defined in their schemas.
  writer.append(leftGrid, grid);
  writer.append(rightGrid, grid);

  // The grid text content will automatically be wrapped in a <p>.
  writer.appendElement('paragraph', leftGrid);
  writer.appendElement('paragraph', rightGrid);

  return grid;
}
