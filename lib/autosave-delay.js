'use babel';

/**
* TRIGGER FORMATTING ON ENTER KEY
* On action newline below
 * CHECK LINE CONTEXT TextEditor ::scopeDescriptorForBufferPosition(bufferPosition)
 * FORMAT ON ENTER Mutating Text ::insert new line (TextEditor) // Trigger any shortcuts on
 * ADD EW FILE BUTTON
 *
 *
 * For this 15 mins session, I want to
 * - emit a fake event
 * - check that it launched
 * - check that =y plugin's function was called
 * || check my pugin subscribttions
 */

import { CompositeDisposable } from 'atom'; // Atom event handle
import { Package } from './package'; // Our package class
import debounce from 'lodash.debounce';
import packageConfig from './config-schema.json';


const package = new Package();

export default {
    config: packageConfig,

    activate(state) {

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        atom.workspace.observeTextEditors((editor) => {


            let activeWorkspace = atom.views.getView(editor);

            // editor.onDidStopChanging( debounce(() =>
            //     package.onDidStopChanging(editor, activeWorkspace), 500));

            activeWorkspace.addEventListener('autocomplete-plus:cancel', (e) =>
                package.onAutoCompleteClose(editor) );


            editor.onDidChangeCursorPosition(
                debounce((ev) =>
                    package.onDidChangeCursorPosition(editor, activeWorkspace), 500));
        });
    },

    deactivate() {
        // Remove all package event subscriptions
        this.subscriptions.dispose();
    },

    // Is called every time package executes a command
    serialize() {
        return;
    }
};
