import * as vscode from 'vscode';
import * as path from 'path';
import { rendererType, renderCallback } from '../common/constants';

export class SampleRenderer implements vscode.NotebookOutputRenderer {
  private hasOpenedDevTools = new WeakSet<vscode.NotebookDocument>();
  private outputCounter = 0;

  public readonly preloads: vscode.Uri[] = [];

  constructor(private readonly context: vscode.ExtensionContext) {
    // Set preloads to a list of scripts you want VS Code to load before your
    // renderer is ready. Here, we load the compiled Webpack bundle in 'release'
    // mode and load from the webpack-dev-server in development, which provides
    // hot reloading for easy development.
    const webpackDevServerPort = process.env.RENDERER_USE_WDS_PORT;
    if (webpackDevServerPort && context.extensionMode !== vscode.ExtensionMode.Release) {
      this.preloads.push(vscode.Uri.parse(`http://localhost:${webpackDevServerPort}/index.js`));
    } else {
      this.preloads.push(vscode.Uri.file(path.join(context.extensionPath, 'out/client/index.js')));
    }
  }

  /**
   * Called to render a cell.
   */
  public render(
    document: vscode.NotebookDocument,
    output: vscode.CellDisplayOutput,
    mimeType: string,
  ): string {
    const renderData = output.data[mimeType];
    this.ensureDevTools(document);

    // Here we output a script tag that calls a function we exposed in the
    // renderer client in its `online`. Its contents are are output data as JSON.
    // You could also preprocess your data before passing it to the client.
    return `
      <script data-renderer="${rendererType}" data-mime-type="${mimeType}" type="application/json">
        ${JSON.stringify(renderData)}
      </script>
    `;
  }

  /**
   * Little utility to open the webview dev tools on first render.
   * Todo: unnecessary once https://github.com/microsoft/vscode/issues/96626
   */
  private async ensureDevTools(document: vscode.NotebookDocument) {
    if (
      this.context.extensionMode === vscode.ExtensionMode.Development &&
      !this.hasOpenedDevTools.has(document)
    ) {
      await vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools');
      this.hasOpenedDevTools.add(document);
    }
  }
}
