import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('vendah-vscode-extension.convertToTemplateString', convertToTemplateString);

	context.subscriptions.push(disposable);
}

export function deactivate() {
	// no op
}

function convertToTemplateString(): void {
	const editor = vscode.window.activeTextEditor;
	editor?.selections.forEach(selection => {
		// TODO: make sure the selection is a JS expression
		const expressionText = editor.document.getText(selection);
		const templateString = '`${' + expressionText + '}`';
		
		editor.edit(editBuilder => {
			editBuilder.replace(selection, templateString);
		});
	});
	vscode.window.showInformationMessage('Hello World from vendah-vscode-extension!');
}
