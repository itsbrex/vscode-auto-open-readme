'use strict';
import * as vscode from 'vscode';
import {workspace, window, commands, ExtensionContext} from 'vscode';

export function activate(context: ExtensionContext) {
    let alreadyOpenedFirstHtml = false;
    const html_preview_command_id = "html.showPreview";
    const close_other_editor_command_id = "workbench.action.closeEditorsInOtherGroups";
    
    function previewFirstHtml() {
        if (alreadyOpenedFirstHtml) {
	    return;
	}
        let editor = window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            if (doc && doc.languageId === "html") {
                openHtmlPreview();
                alreadyOpenedFirstHtml = true;
            }
                    }
    }
    function openHtmlPreview() {
        var temp = commands.getCommands()
        temp.then(console.log)

        commands.executeCommand(close_other_editor_command_id)
        .then(() => commands.executeCommand(html_preview_command_id))
        .then(() => {}, (e) => console.error(e));
    }
    
    if (window.activeTextEditor) {
        previewFirstHtml();
    } else {
        vscode.window.onDidChangeActiveTextEditor(()=>{
            previewFirstHtml();
        });
    }

    vscode.workspace.onDidOpenTextDocument((doc)=>{
        if (doc && doc.languageId === "html") {
            openHtmlPreview();
        }
            });
}

export function deactivate() {
}
