import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../user.service";

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
	
	constructor(public dialogRef: MatDialogRef<ProfileDialog>, public userService: UserService) { }
	
	runSignUp() {
		if (this.signup.invalid) {
			return;
		}
		
		const userToCreate = {
			username: 	{ S: this.signup.get('username')!.value },
			password: 	{ S: this.signup.get('password')!.value },
			email: 		{ S: this.signup.get('email')!.value },
			wins: 		{ N: '0' },
			losses: 	{ N: '0' }
		};
		
		this.userService.createUser(userToCreate).subscribe({
			next: (result) => {
				this.dialogRef.close();
			},
			error: (error) => {
				// let user know username already exists as mat-error
			},
		});
	}
	
	runLogIn() {
		if (this.login.invalid) {
			return;
		}
		
		const password = this.login.get('password')!.value;
		const userToGet = { username: { S: this.login.get('username')!.value } };
		
		this.userService.retrieveUser(userToGet, password).subscribe({
			next: (result) => {
				this.dialogRef.close();
			},
			error: (error) => {
				// mark form as invalid based on error message
			}
		});
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