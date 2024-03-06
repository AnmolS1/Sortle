import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private User: any;
	
	constructor(private http: HttpClient) { }
	
	login(user: any) {
		this.User = user;
	}
	
	logout() {
		this.User = null;
	}
	
	isLoggedIn() {
		return !!this.User;
	}
	
	getUser() {
		return this.User;
	}
	
	createUser(user: any): Observable<any> {
		let params = new HttpParams().set('user', JSON.stringify(user));
		
		return new Observable<any>((observer) => {
			this.http.get('/api/create-user', { params }).subscribe({
				next: (result) => {
					this.login(user);
					observer.next(result);
					observer.complete();
				},
				error: (error) => {
					observer.error(error);
				},
			});
		});
	}
	
	retrieveUser(user: any, password: string): Observable<any> {
		let params = new HttpParams().set('user', JSON.stringify(user));
		
		return new Observable<any>((observer) => {
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
				},
				error: (error) => {
					observer.error(error);
				}
			});
		});
	}
}
