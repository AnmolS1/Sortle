import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../user.service";

@Component({
	selector: 'delete-account-dialog',
	templateUrl: './delacc-dialog.component.html',
	styleUrl: './delacc-dialog.component.less'
})
export class DelAccDialog {
	public username: string = '';
	
	constructor(public dialogRef: MatDialogRef<DelAccDialog>, public userService: UserService) {
		this.username = userService.getUsername();
	}
	
	deleteProfile() {
		this.userService.deleteUser().subscribe({
			next: _ => {
				alert('profile successfully deleted!');
			}, error: (error) => {
				alert('internal service error\nplease try again later broski');
			}, complete: () => {
				this.dialogRef.close();
			}
		});
	}
	
	cancel(): void {
		this.dialogRef.close();
	}
}