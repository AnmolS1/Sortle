import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
	selector: 'app-start',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatListModule,
		MatDividerModule,
		FlexLayoutModule
	],
	templateUrl: './start.component.html',
	styleUrl: './start.component.less'
})
export class StartComponent {
	@Input() solution: any;
	@Input() initial: number[] = [];
}
