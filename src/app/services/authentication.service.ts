import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from '../entities/user';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserLogin>;
  public currentUser: Observable<UserLogin>;

  private readonly api = environment.apiUri;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserLogin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserLogin {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log('Username and password, ', username, password);
    return this.http.post<any>(`${this.api}/auth/login`, { username, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
