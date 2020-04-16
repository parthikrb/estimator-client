import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from '../entities/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserLogin>;
  private loggedIn: BehaviorSubject<boolean>;
  public currentUser$: Observable<UserLogin>;
  public isLoggedIn$: Observable<boolean>;
  private readonly api = environment.apiUri;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserLogin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this.loggedIn.asObservable();
  }

  public get currentUserValue(): UserLogin {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log('Username and password, ', username, password);
    return this.http.post<any>(`${this.api}/auth/login`, { username, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.loggedIn.next(true);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
