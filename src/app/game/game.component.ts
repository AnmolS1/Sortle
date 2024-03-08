import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameOverDialog } from './game-over-dialog/gameoverdialog.component';
import { GuessComponent } from '../guess/guess.component';
import { sorts } from '../algorithms';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrl: './game.component.less'
})
export class GameComponent implements OnInit {
	@ViewChildren(GuessComponent) guessComponents!: QueryList<GuessComponent>;
	
	solution: any;
	starting_array: number[] = []
	arrays: any[] = [];
	options: string[] = [];
	num_guesses: number = 5;
	guesses: string[] = [];
	guess_index: number = 0;
	gameOver: boolean = false;
	
	constructor(public dialog: MatDialog) {}
	
	ngOnInit(): void {
		this.gameOver = false;
		const i = Math.floor(Math.random() * sorts.length);
		this.solution = sorts[i];
		this.starting_array = this.generateRandomArray();
		this.arrays = this.solution['run'](this.starting_array.slice(), this.num_guesses);
		this.options = sorts.map((sort) => sort['name']);
		this.guesses = Array(this.num_guesses).fill('');
		this.guess_index = 0;
	}
	
	restart() {
		location.reload();
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
	
	openGameOverDialog(win: boolean) {
		return this.dialog.open(GameOverDialog, {
			data: {
				win: win,
				solution: this.solution['name'],
				guesses: this.guesses,
				total_guesses: this.guess_index + 1
			}
		});
	}
	
	submitGuess(guess: string) {
		this.guesses[this.guess_index] = guess;
		
		let win: boolean = guess === this.solution['name'];
		if (win || this.guess_index == this.num_guesses - 1) {
			this.gameOver = true;
			this.openGameOverDialog(win);
		} else {
			this.guess_index++;
			this.options = this.options.filter(n => n != guess);
		}
	}
	
	submitCurrentGuess() {
		if (this.guessComponents.length > 0) {
			this.guessComponents.last.submitGuess();
		}
	}
}
