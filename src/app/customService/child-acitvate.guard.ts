import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";


export const canActivateTeam: CanActivateChildFn = (

    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): boolean | Observable<boolean> | Promise<boolean> | UrlTree => {
    // Your implementation here

    const token = localStorage.getItem('token')
    const router = inject(Router)
    // Token Exp. Control


    if (token) {

        return true

    } else {


        router.navigate(['/login'])
        return false
    }

};