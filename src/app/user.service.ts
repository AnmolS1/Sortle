import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private user: User | null = null;
	
	constructor(private http: HttpClient, private cookieService: CookieService) {
		this.user = this.checkCookie('user') ? this.getCookie('user') : null;
	}
	
	login(user: User) {
		this.user = user;
		this.setCookie('user', this.user, 7);
	}
	
	logout() {
		this.user = null;
		this.deleteCookie('user');
	}
	
	isLoggedIn() {
		return !!this.user;
	}
	
	getUser()		{ return this.user; }
	getUsername()	{ return this.user ? this.user.username.S : ''; }
	getPassword()	{ return this.user ? this.user.password.S : ''; }
	getEmail()		{ return this.user ? this.user.email.S : ''; }
	getWins()		{ return this.user ? Number(this.user.wins.N) : -1; }
	getLosses()		{ return this.user ? Number(this.user.losses.N) : -1; }
	
	createUser(user: User): Observable<any> {
		let params = new HttpParams().set('user', JSON.stringify(user));
		
		return new Observable<any>((observer) => {
			this.http.get('/api/create-user', { params }).subscribe({
				next: (result: any) => {
					if (result.userAlreadyExists) {
						observer.error(new Error(`user already exists`));
					} else {
						this.login(user);
						observer.next(result);
						observer.complete();
					}
				}, error: (error) => {
					observer.error(error);
				},
			});
		});
	}
	
	retrieveUser(username: { username: { S: string } }, password: string): Observable<User> {
		let params = new HttpParams().set('username', JSON.stringify(username));
		
		return new Observable<User>((observer) => {
			this.http.get('/api/get-user', { params }).subscribe({
				next: (result: any) => {
					if (result.notFound) {
						observer.error(new Error(`user not found`));
					} else if (result.password.S != password) {
						observer.error(new Error(`password is incorrect`));
					} else {
						this.login(result);
						observer.next(result);
						observer.complete();
					}
				}, error: (error) => {
					observer.error(error);
				}
			});
		});
	}
	
	deleteUser(): Observable<any> {
		let params = new HttpParams().set('username', JSON.stringify({ username: { S: this.getUsername() } }));
		
		return new Observable<any>((observer) => {
			this.http.get('/api/delete-user', { params }).subscribe({
				next: (result: any) => {
					observer.next(result);
					observer.complete();
				}, error: (error) => {
					observer.error(error);
				}
			});
		});
	}
	
	updateUser(column: string, value: string | number): Observable<any> {
		let params = new HttpParams().set('username', JSON.stringify({ username: { S: this.getUsername() } }))
			.set('column', column).set('value', value);
		
		return new Observable<any>((observer) => {
			this.http.get('/api/update-user', { params }).subscribe({
				next: (result: any) => {
					this.login(result.Attributes);
					observer.complete();
				}, error: (error) => {
					observer.error(error);
				}
			});
		});
	}
	
	getCookie(name: string): User {
		return JSON.parse(this.cookieService.get(name));
	}
	
	setCookie(name: string, value: User, days: number): void {
		const expires = days * 24 * 60 * 60 * 1000;
		const expirationDate = new Date(Date.now() + expires);
		
		this.cookieService.set(name, JSON.stringify(value), expirationDate, '/');
	}
	
	deleteCookie(name: string) {
		this.cookieService.delete(name);
	}
	
	checkCookie(name: string) {
		return this.cookieService.check(name);
	}
}
