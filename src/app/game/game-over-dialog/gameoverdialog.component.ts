import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service';
import { ProfileWorkDialog } from '../../menu/profile-work-dialog/profile-work-dialog.component';

@Component({
	selector: 'game-over-dialog',
	templateUrl: './gameoverdialog.component.html',
	styleUrl: './gameoverdialog.component.less'
})
export class GameOverDialog implements OnInit {
	final: boolean[] = [];
	canLogin: boolean = false;
	
	constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<GameOverDialog>, @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) {
		if (userService.isLoggedIn()) {
			this.updateProfile();
		} else {
			this.canLogin = true;
		}
	}
	
	ngOnInit() {
		this.final = this.data.guesses.slice(0, this.data.total_guesses)
			.map((guess: string) => guess === this.data.solution);
	}
	
	updateProfile() {
		this.userService.updateUser(this.data.win ? 'wins' : 'losses', (this.data.win ? this.userService.getWins() : this.userService.getLosses()) + 1).subscribe({
			error: (error) => {
				alert("internal server error\nplease try again later broski");
			},
		});
	}
	
	onLogin() {
		this.dialog.open(ProfileWorkDialog).afterClosed().subscribe({
			next: _ => {
				if (this.userService.isLoggedIn()) {
					this.updateProfile();
				}
			}
		});
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
