import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { User } from "../../user";

@Component({
	selector: 'profile-work-dialog',
	templateUrl: './profile-work-dialog.component.html',
	styleUrl: './profile-work-dialog.component.less'
})
export class ProfileWorkDialog {
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
	
	constructor(public dialogRef: MatDialogRef<ProfileWorkDialog>, public userService: UserService) { }
	
	getSignUpUsernameError() {
		if (this.signup.get('username')!.errors!['userExists']) {
			return 'profile with this username already exists';
		} else {
			return 'must contain letters, digits, and underscores';
		}
	}
	
	runSignUp() {
		if (this.signup.invalid) {
			return;
		}
		
		const userToCreate: User = {
			username: 	{ S: this.signup.get('username')!.value },
			password: 	{ S: this.signup.get('password')!.value },
			email: 		{ S: this.signup.get('email')!.value },
			wins: 		{ N: 0 },
			losses: 	{ N: 0 }
		};
		
		this.userService.createUser(userToCreate).subscribe({
			next: (result) => {
				this.dialogRef.close();
			},
			error: (error) => {
				if (error.message == 'user already exists') {
					this.signup.get('username')!.setErrors({ userExists: true });
				} else {
					alert("internal server error\nplease try again later broski");
				}
			},
		});
	}
	
	getLoginUsernameError() {
		if (this.login.get('username')!.errors!['userNotFound']) {
			return 'profile with this username does not exist';
		} else {
			return 'must contain letters, digits, and underscores';
		}
	}
	
	getLoginPasswordError() {
		if (this.login.get('password')!.errors!['incorrect']) {
			return 'incorrect password';
		} else {
			return 'must be at least 8 characters';
		}
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
				if (error.message == 'user not found') {
					this.login.get('username')!.setErrors({ userNotFound: true });
				} else if (error.message == 'password is incorrect') {
					this.login.get('password')!.setErrors({ incorrect: true });
				} else {
					alert("internal server error\nplease try again later broski");
				}
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