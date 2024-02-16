import { Component, OnInit } from '@angular/core';

import { sorts } from '../algorithms';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrl: './game.component.less'
})
export class GameComponent implements OnInit {
	solution: any;
	arrays: number[][] = [];
	
	ngOnInit(): void {
		const i = Math.floor(Math.random() * sorts.length);
		this.solution = sorts[i];
		
		this.arrays.push(this.generateRandomArray());
	}
	
	generateRandomArray(): number[] {
		const initialArray: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
		
		// Fisher-Yates shuffle algorithm
		for (let i = initialArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[initialArray[i], initialArray[j]] = [initialArray[j], initialArray[i]];
		}
		
		return initialArray;
	}
}
