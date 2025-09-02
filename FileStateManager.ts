import {TFile} from 'obsidian';

export class FileStateManager {
	private readonly state: FileState;

	constructor(initial: Partial<FileState> & { file: TFile }) {
		this.state = {
			content: '',
			formatted: '',
			...initial,
		};
	}

	get(): Readonly<FileState> {
		return this.state;
	}

	set(partial: Partial<Omit<FileState, 'file'>>): void {
		Object.assign(this.state, partial);
	}
}
