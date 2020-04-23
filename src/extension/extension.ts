// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { viewType } from '../common/constants';
import { SampleRenderer } from './sampleRenderer';
import { SampleProvider } from './sampleProvider';

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.notebook.registerNotebookOutputRenderer(
			viewType,
			{
				type: 'display_data',
        // The list of mime types this renderer knows how to render. Should
        // match those registered in your package.json:
				subTypes: ['application/json'],
			},
			new SampleRenderer(context),
		),

		// todo: either flesh this out or remove from final version:
		vscode.notebook.registerNotebookProvider(
			viewType, new SampleProvider()
		)
	);
}

// This method is called when your extension is deactivated
export function deactivate() { }
