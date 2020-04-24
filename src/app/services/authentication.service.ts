import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin } from '../entities/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SquadService } from './squad.service';
import { PollService } from './poll.service';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserLogin>;
  private joinUserSubject: BehaviorSubject<any>;
  private loggedIn: BehaviorSubject<boolean>;
  public currentUser$: Observable<UserLogin>;
  public joinUser$: Observable<any>;
  public isLoggedIn$: Observable<boolean>;
  private readonly api = environment.apiUri;

  constructor(
    private http: HttpClient,
    private router: Router,
    private squadService: SquadService,
    private pollService: PollService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserLogin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.joinUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('joinUser')));
    this.joinUser$ = this.joinUserSubject.asObservable();
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this.loggedIn.asObservable();

    if (this.currentUserValue) {
      this.loggedIn.next(true);
    }
  }

  public get currentUserValue(): UserLogin {
    return this.currentUserSubject.value;
  }

  public get joinUserValue(): any {
    return this.joinUserSubject.value;
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

  join(value: any) {
    const { name, role, code } = value;
    this.squadService.getByKey(code).subscribe(
      squad => {
        sessionStorage.setItem('joinUser', JSON.stringify(squad));
        this.joinUserSubject.next(squad);
        this.pollService.joinRoom(code, name, role);
        this.router.navigate(['/vote']);
        return squad;
      });

  }

  logout() {
    // remove user from local storage to log user out
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
