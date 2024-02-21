import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../notify/notify.component';

import { sorts } from '../algorithms';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrl: './game.component.less'
})
export class GameComponent implements OnInit {
	solution: any;
	starting_array: number[] = []
	arrays: any[] = [];
	options: string[] = [];
	num_guesses: number = 5;
	
	guess_index: number = 0;
	guesses: string[] = [];
	
	constructor(public dialog: MatDialog) {}
	
	ngOnInit(): void {
		const i = Math.floor(Math.random() * sorts.length);
		this.solution = sorts[i];
		
		this.starting_array = this.generateRandomArray();
		
		this.arrays = this.solution['run'](this.starting_array.slice(), this.num_guesses);
		
		this.options = sorts.map((sort) => sort['name']);
		
		this.guesses = Array(this.num_guesses).fill('');
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
	
	submitGuess(guess: string) {
		let win: boolean = guess === this.solution['name'];
		
		if (win) { // correct guess
			this.guesses[this.guess_index] = guess;
			this.dialog.open(NotifyComponent, {
				data: {
					win: true,
					solution: this.solution['name']
				}
			});
		} else { // incorrect guess
			this.guesses[this.guess_index++] = guess;
			this.options = this.options.filter(n => n != guess);
			
			if (this.guess_index == this.num_guesses) {
				this.dialog.open(NotifyComponent, {
					data: {
						win: false,
						solution: this.solution['name']
					}
				});
			}
		}
	}
}
