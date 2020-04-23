import * as vscode from 'vscode';

/**
 * An ultra-minimal sample provider that lets the user type in JSON, and then
 * outputs JSON cells. Doesn't read files or save anything.
 */
export class SampleProvider implements vscode.NotebookProvider {
  /**
   * @inheritdoc
   */
  public async resolveNotebook(editor: vscode.NotebookEditor): Promise<void> {
    editor.document.languages = ['json'];

    // Insert the package.json contents as some sample JSON:
    await editor.edit((edit) => {
      edit.insert(
        0,
        JSON.stringify(require('../../package.json')),
        'json',
        vscode.CellKind.Code,
        [],
        {
          editable: true,
          runnable: true,
        },
      );
    });
  }

  /**
   * @inheritdoc
   */
  public async executeCell(
    _document: vscode.NotebookDocument,
    cell: vscode.NotebookCell | undefined,
  ): Promise<void> {
    if (cell?.language !== 'json') {
      return;
    }

    try {
      cell.outputs = [
        {
          outputKind: vscode.CellOutputKind.Rich,
          data: { 'application/json': JSON.parse(cell.source) },
        },
      ];
    } catch (e) {
      cell.outputs = [
        {
          outputKind: vscode.CellOutputKind.Error,
          ename: e.constructor.name,
          evalue: e.message,
          traceback: e.stack,
        },
      ];
    }
  }

  /**
   * @inheritdoc
   */
  public async save(_document: vscode.NotebookDocument): Promise<boolean> {
    return Promise.resolve(true);
  }
}
