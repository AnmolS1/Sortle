import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'profile-dialog',
	templateUrl: './profile-dialog.component.html',
	styleUrl: './profile-dialog.component.less'
})
export class ProfileDialog {
	option = new FormControl(0);
	hide_s: boolean = true;
	hide_l: boolean = true;
	signup: FormGroup = new FormGroup({
		username: 	new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]*')]),
		password: 	new FormControl('', [Validators.required, Validators.minLength(8)]),
		email:	 	new FormControl('', [Validators.required, Validators.email]),
	});
	login: FormGroup = new FormGroup({
		username: 	new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]*')]),
		password: 	new FormControl('', [Validators.required, Validators.minLength(8)]),
	});
	
	constructor(public dialogRef: MatDialogRef<ProfileDialog>) { }
	
	runSignUp() {
		console.log(this.signup);
	}
	
	runLogIn() {
		console.log(this.login);
	}
	
	runAction(): void {
		if (this.option.value == 0) {
			this.runSignUp();
		} else {
			this.runLogIn();
		}
	}
	
	close(): void {
		this.dialogRef.close();
	}
}