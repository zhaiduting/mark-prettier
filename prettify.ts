import * as prettier from 'prettier';
import * as markdown from 'prettier/plugins/markdown';
import * as html from 'prettier/plugins/html';
import * as postcss from 'prettier/plugins/postcss';
import * as estree from 'prettier/plugins/estree';
import * as babel from 'prettier/plugins/babel';
import {FileStateManager} from './FileStateManager';
import {EditorStateManager} from './EditorStateManager';
import toml from 'prettier-plugin-toml';
// @ts-ignore
import java from 'prettier-plugin-java'

export async function prettify(fileStateManager: FileStateManager, editorStateManager: EditorStateManager): Promise<void> {
	const state = fileStateManager.get();
	const prettied = await prettier.formatWithCursor(state.content, {
		parser: 'markdown',
		plugins: [
			markdown,
			html,
			postcss,
			estree, babel,
			toml,
			java
		],
		cursorOffset: editorStateManager.get().cursorOffset,
	} as prettier.CursorOptions);
	fileStateManager.set({
		formatted: prettied.formatted,
	});
	editorStateManager.set({cursorOffset: prettied.cursorOffset});
}
