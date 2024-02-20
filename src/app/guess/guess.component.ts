import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
	selector: 'app-guess',
	templateUrl: './guess.component.html',
	styleUrl: './guess.component.less'
})
export class GuessComponent implements OnInit {
	@Input() options: string[] = [];
	@Input() solution: any = {};
	@Output() guessSubmitted = new EventEmitter<string>();
	
	formControl: FormControl = new FormControl('', [Validators.required]);
	filteredOptions!: Observable<string[]>;
	
	constructor(private renderer: Renderer2) {}
	
	ngOnInit(): void {
		this.filteredOptions = this.formControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value || '')),
		);
	}
	
	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.options.filter(option => option.toLowerCase().includes(filterValue));
	}
	
	getErrorMessage(): string {
		return this.formControl.hasError('required') ? 'Choose from the available options' : '';
	}
	
	submitGuess(): void {
		if (this.options.indexOf(this.formControl.value) == -1) { // invalid guess
			return;
		}
		
		const win = this.formControl.value === this.solution['name'];
		let allfields = document.getElementsByClassName('field');
		let field = allfields[allfields.length - 1];
		if (field) {
			this.renderer.addClass(field, win ? 'correct' : 'incorrect');
		}
		
		this.formControl.disable();
		this.guessSubmitted.emit(this.formControl.value);
	}
}
