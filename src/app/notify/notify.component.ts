import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-notify',
	templateUrl: './notify.component.html',
	styleUrl: './notify.component.less'
})
export class NotifyComponent {
	constructor(
		public dialogRef: MatDialogRef<NotifyComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }
	
	onClose(): void {
		this.dialogRef.close();
	}
}
