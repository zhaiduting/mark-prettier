import {Editor} from 'obsidian';

export class EditorStateManager {
	private readonly state: EditorState;

	constructor(initial: Partial<FileState> & { editor: Editor | null }) {
		this.state = {
			cursorOffset: 0,
			scrollRatio: 0,
			selectionStart: 0,
			selectionEnd: 0,
			...initial,
		};
		const editor = this.state.editor;
		if (editor) {
			const cursorPos = editor.getCursor();
			this.state.cursorOffset = editor.posToOffset(cursorPos);
		}
	}

	get(): Readonly<EditorState> {
		return this.state;
	}

	set(partial: Partial<EditorState>): void {
		Object.assign(this.state, partial);
	}

	restore(): void {
		const cursorPos = this.state.editor?.offsetToPos(this.state.cursorOffset);
		this.state.editor?.setCursor(cursorPos || 1);
	}
}
