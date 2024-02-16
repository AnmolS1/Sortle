import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-start',
	templateUrl: './start.component.html',
	styleUrl: './start.component.less'
})
export class StartComponent {
	@Input() solution: any;
	@Input() initial: number[] = [];
}
