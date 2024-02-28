import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'game-over-dialog',
	templateUrl: './gameoverdialog.component.html',
	styleUrl: './gameoverdialog.component.less'
})
export class GameOverDialog implements OnInit {
	final: boolean[] = [];
	
	constructor(
		public dialogRef: MatDialogRef<GameOverDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }
	
	ngOnInit() {
		this.final = this.data.guesses.slice(0, this.data.total_guesses)
			.map((guess: string) => guess === this.data.solution);
	}
		
	onShare(): void {
		var toCopy = 'Sortle ' + this.data.total_guesses + '/' + 5 + '\n';
		toCopy += this.final.map(guess => guess ? '🟩' : '🟥').join(' ');
		
		navigator.clipboard.writeText(toCopy).then(() => {
			console.log('Text copied to clipboard:', toCopy);
		}).catch((error) => {
			console.error('Unable to copy text to clipboard:', error);
		});
	}
	
	onClose(): void {
		this.dialogRef.close();
	}
}
