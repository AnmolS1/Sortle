import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialog } from './profile-dialog/profile-dialog.component';
import { DelAccDialog } from './delacc-dialog/delacc-dialog.component';

@Component({
	selector: 'menu',
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.less'
})
export class MenuComponent {
	constructor(public dialog: MatDialog) { }
	
	openEditDialog(): void {
		
	}
	
	openDeleteDialog(): void {
		const dialogRef = this.dialog.open(DelAccDialog);
	}
	
	openProfileDialog(): void {
		const dialogRef = this.dialog.open(ProfileDialog);
	}
}