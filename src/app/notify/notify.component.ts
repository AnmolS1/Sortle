import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-notify',
	templateUrl: './notify.component.html',
	styleUrl: './notify.component.less'
})
export class NotifyComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
