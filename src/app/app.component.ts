import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.less',
	standalone: true,
	imports: [
		HeaderComponent,
		GameComponent
	]
})
export class AppComponent {
	title = 'sortle';
}
