import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(
        private _authService: AuthService,
        private _router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this._authService.decode();
        console.log(user.role);
        if (user.role === route.data.role) { //user.role -- localStorage role for user | route.data.role -- admin-routing.module.ts
            return true;
        }

        this._router.navigate(['/projects']);
        return false;
    }
}
