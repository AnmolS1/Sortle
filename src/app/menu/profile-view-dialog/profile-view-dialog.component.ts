import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../user.service";

@Component({
	selector: 'profile-view-dialog',
	templateUrl: './profile-view-dialog.component.html',
	styleUrl: './profile-view-dialog.component.less'
})
export class ProfileViewDialog {
	
	public username: string = '';
	public email: string = '';
	public wins: number = -1;
	public losses: number = -1;
	
	constructor(public dialogRef: MatDialogRef<ProfileViewDialog>, public userService: UserService) {
		this.username = userService.getUsername();
		this.email = userService.getEmail();
		this.wins = userService.getWins();
		this.losses = userService.getLosses();
	}
	
	close() {
		this.dialogRef.close();
	}
	
	logout() {
		this.userService.logout();
		this.dialogRef.close();
	}
}