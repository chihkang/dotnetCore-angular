import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(protected auth: AuthService) { }

    canActivate(){
        if(this.auth.isAuthenticated())
            return true;
        
        window.location.href = 'https://chihkang.auth0.com/login?client=R04JP4E23gR8ixIu8o6lk4pwcXXvypag';
        return false;
    }
}