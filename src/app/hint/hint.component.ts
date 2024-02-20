import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-hint',
	templateUrl: './hint.component.html',
	styleUrl: './hint.component.less'
})
export class HintComponent {
	@Input() array: any = {};
}
