'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
function activate(context) {
    let alreadyOpenedFirstHtml = false;
    const html_preview_command_id = "html.showPreview";
    const close_other_editor_command_id = "workbench.action.closeEditorsInOtherGroups";
    function previewFirstHtml() {
        if (alreadyOpenedFirstHtml) {
            return;
        }
        let editor = vscode_1.window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            if (doc && doc.languageId === "html") {
                openHtmlPreview();
                alreadyOpenedFirstHtml = true;
            }
        }
    }
    function openHtmlPreview() {
        var temp = vscode_1.commands.getCommands();
        temp.then(console.log);
        vscode_1.commands.executeCommand(close_other_editor_command_id)
            .then(() => vscode_1.commands.executeCommand(html_preview_command_id))
            .then(() => { }, (e) => console.error(e));
    }
    if (vscode_1.window.activeTextEditor) {
        previewFirstHtml();
    }
    else {
        vscode.window.onDidChangeActiveTextEditor(() => {
            previewFirstHtml();
        });
    }
    vscode.workspace.onDidOpenTextDocument((doc) => {
        if (doc && doc.languageId === "html") {
            openHtmlPreview();
        }
    });
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map