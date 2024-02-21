import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { HintComponent } from './hint/hint.component';
import { GuessComponent } from './guess/guess.component';
import { NotifyComponent } from './notify/notify.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		GameComponent,
		StartComponent,
		HintComponent,
		GuessComponent,
		NotifyComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,

		FlexLayoutModule,
		MatCardModule,
		MatListModule,
		MatDividerModule,
		MatToolbarModule,
		MatAutocompleteModule,
		MatInputModule,
		MatFormFieldModule,
		MatDialogModule,
		MatDialogTitle,
		MatDialogContent,
	],
	providers: [
		provideAnimationsAsync()
	],
	bootstrap: [AppComponent]
})
export class AppModule { }