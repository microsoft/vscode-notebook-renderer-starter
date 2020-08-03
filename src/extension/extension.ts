// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { rendererType } from '../common/constants';
import { SampleProvider } from './sampleProvider';

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		// todo: either flesh this out or remove from final version:
		vscode.notebook.registerNotebookContentProvider(
			rendererType, new SampleProvider()
		)
	);
}

// This method is called when your extension is deactivated
export function deactivate() { }
