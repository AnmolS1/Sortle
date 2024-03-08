import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileWorkDialog } from './profile-work-dialog/profile-work-dialog.component';
import { ProfileViewDialog } from './profile-view-dialog/profile-view-dialog.component';
import { DelAccDialog } from './delacc-dialog/delacc-dialog.component';
import { UserService } from '../user.service';

@Component({
	selector: 'menu',
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.less'
})
export class MenuComponent {
	isLoggedIn: boolean = false;
	username: string = '';
	
	constructor(public dialog: MatDialog, public userService: UserService) {
		this.isLoggedIn = this.userService.isLoggedIn();
		this.username = this.userService.getUsername();
	}
	
	updateInfo() {
		this.isLoggedIn = this.userService.isLoggedIn();
		this.username = this.userService.getUsername();
	}
	
	openEditDialog(): void {
		
	}
	
	openDeleteDialog(): void {
		this.dialog.open(DelAccDialog).afterClosed().subscribe({
			next: _ => { this.updateInfo(); }
		});
	}
	
	openProfileViewDialog() {
		this.dialog.open(ProfileViewDialog).afterClosed().subscribe({
			next: _ => { this.updateInfo(); }
		});
	}
	
	openProfileWorkDialog() {
		this.dialog.open(ProfileWorkDialog).afterClosed().subscribe({
			next: _ => {
				this.updateInfo();
				if (this.isLoggedIn) {
					this.openProfileViewDialog();
				}
			}
		});
	}
}