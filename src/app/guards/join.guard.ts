import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { SquadService } from '../services/squad.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class JoinGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const joinUser = this.authService.joinUserValue;
    if (joinUser) return true;

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
