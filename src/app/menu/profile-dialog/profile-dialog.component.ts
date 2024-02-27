import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'profile-dialog',
	templateUrl: './profile-dialog.component.html',
	styleUrl: './profile-dialog.component.less'
})
export class ProfileDialog {
	option = new FormControl(0);
	username: string = '';
	
	constructor(public dialogRef: MatDialogRef<ProfileDialog>) { }
	
	signup() {
		
	}
	
	login() {
		
	}
	
	runAction(): void {
		console.log(this.option.value);
		
		if (this.option.value == 0) {
			this.signup();
		} else {
			this.login();
		}
	}
	
	close(): void {
		this.dialogRef.close();
	}
}