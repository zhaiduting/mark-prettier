import {Editor, TFile} from 'obsidian';

declare global {
	interface EditorState {
		editor: Editor | null;
		cursorOffset: number;
		scrollRatio: number;
		selectionStart: number;
		selectionEnd: number;
	}

	interface FileState {
		file: TFile;
		content: string;
		formatted: string;
	}
}
