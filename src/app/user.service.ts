import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private user: User | null = null;
	
	constructor(private http: HttpClient) { }
	
	login(user: User) {
		this.user = user;
	}
	
	logout() {
		this.user = null;
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
						this.login(result as User);
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
			})
		});
	}
}
