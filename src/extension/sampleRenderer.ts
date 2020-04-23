import * as vscode from 'vscode';
import { viewType, renderCallback } from '../common/constants';

const onLoad = `window['${renderCallback}'] && window['${renderCallback}'](document.currentScript)`;

export class SampleRenderer implements vscode.NotebookOutputRenderer {
  public readonly preloads: vscode.Uri[] = [];

  constructor(context: vscode.ExtensionContext) {
    // Set preloads to a list of scripts you want VS Code to load before your
    // renderer is ready. Here, we load the compiled Webpack bundle in 'release'
    // mode and load from the webpack-dev-server in development.

    // todo(connor4312): https://github.com/microsoft/vscode/issues/95988
    // if (process.env.RENDERER_USE_WEBPACK_SERVER && context.inDevelopment) {
    //   this.preloads.push(vscode.Uri.parse('http://localhost:8111/index.js'));
    // } else {
    //   this.preloads.push(vscode.Uri.file(path.join(context.extensionPath, 'out/client/index.js')));
    // }
  }

  /**
   * Called to render a cell.
   */
  public render(document: vscode.NotebookDocument, output: vscode.CellDisplayOutput, mimeType: string): string {
    // Here we output a script tag that calls a function we exposed in the
    // renderer client after it loads. Its contents are are output data as JSON.
    // You could also preprocess your data before passing it to the client.
    return `
      <script src="http://localhost:8111/index.js"></script>
      <script type="renderer/${viewType}" data-mime-type="${mimeType}" onload="${onLoad}">
        ${JSON.stringify(output.data[mimeType])}
      </script>
    `;
  }
}
