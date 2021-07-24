import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade } from '@store/user/user.facade';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private user: UserFacade,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.user.state$.pipe(
      take(1),
      map((state) => {
        console.log(state);
        if (state.isLogin) {
          this.router.navigate(['']);
        }
        return !state.isLogin;
      })
    );
  }
}
