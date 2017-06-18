// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    profile: any;
    private roles: string[] = []; 

    auth0 = new auth0.WebAuth({
        clientID: 'R04JP4E23gR8ixIu8o6lk4pwcXXvypag',
        domain: 'chihkang.auth0.com',
        responseType: 'token id_token',
        audience: 'https://chihkang.auth0.com/userinfo',
        redirectUri: 'http://localhost:5000',
        // redirectUri: 'http://localhost:4200/callback',
        scope: 'openid',
    });

    constructor(public router: Router) {
        this.readUserFromLocalStorage();
     }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            console.log(authResult);
            
            if (authResult && authResult.accessToken ) {
                window.location.hash = '';
                this.setSession(authResult);                
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
            }
        });
    }
    private readUserFromLocalStorage(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
  
        var token = localStorage.getItem('token');
        if (token) {
            var jwtHelper = new JwtHelper();
            var decodedToken = jwtHelper.decodeToken(token);
            this.roles = decodedToken['https://vega.com/roles'];
        }
    }
    private setSession(authResult): void {
        // Set the time that the access token will expire at
        
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('expires_at', expiresAt);
        this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
            if (error)
                throw error;

            localStorage.setItem('profile', JSON.stringify(profile));
            this.readUserFromLocalStorage();
        });
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('profile');
        this.profile = null;
        this.roles = [];
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));        
        
        return new Date().getTime() < expiresAt;
    }
    public isInRole(roleName) {
        return this.roles.indexOf(roleName) > -1;
    }
}