import { TokenService } from '../token/token.service';
import { User } from './user';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class UserService {

    private _userSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(
        private _tokenService: TokenService
    ) {
        this._tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token) {
        this._tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this._userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this._tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this._userSubject.next(user);
    }

    logout() {
        this._tokenService.removeToken();
        this._userSubject.next(null);
    }

    isLogged() {
        return this._tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}
