import {Editor, MarkdownView, Plugin, TFile} from 'obsidian';
import {prettify} from './prettify';
import {FileStateManager} from './FileStateManager';
import {EditorStateManager} from './EditorStateManager';

export default class MyPlugin extends Plugin {

	async onload() {
		this.addCommand({
			id: 'Prettify-my-file',
			name: 'Prettify my file',
			hotkeys: [{key: 'r', modifiers: ['Mod']}],
			editorCallback: (editor: Editor, {file}) => this.handleFileUpdate(file, editor)
		});
		// 右键菜单：对文件树里的任意文件运行
		this.registerEvent(
			this.app.workspace.on('file-menu', (menu, file: TFile) => {
				menu.addItem((item) => {
					item.setTitle('Prettify this file')
						.setIcon('wand') // 可以换别的图标，比如 "dice" "code"
						.onClick(async () => {
							const editor = this.app.workspace.getActiveViewOfType(MarkdownView)?.editor || null;
							await this.handleFileUpdate(file, editor);
						});
				});
			})
		);
	}

	async handleFileUpdate(file: TFile | null, editor: Editor | null) {
		if (!(file instanceof TFile)) return;
		const content = editor ? editor.getValue() : await this.app.vault.read(file);
		const fileStateManager = new FileStateManager({file, content});
		const editorStateManager = new EditorStateManager({editor});
		await prettify(fileStateManager, editorStateManager);
		await this.app.vault.modify(file, fileStateManager.get().formatted);
		editorStateManager.restore();
	}
}
