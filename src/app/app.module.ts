import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StartComponent } from './start/start.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		GameComponent,
		StartComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatCardModule,
		MatListModule,
		MatDividerModule,
		MatToolbarModule,
		FlexLayoutModule
	],
	providers: [
		provideAnimationsAsync()
	],
	bootstrap: [AppComponent]
})
export class AppModule { }