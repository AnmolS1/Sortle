import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'delete-account-dialog',
	templateUrl: './delacc-dialog.component.html',
	styleUrl: './delacc-dialog.component.less'
})
export class DelAccDialog {
	constructor(
		public dialogRef: MatDialogRef<DelAccDialog>
	) { }
	
	close(): void {
		this.dialogRef.close();
	}
}