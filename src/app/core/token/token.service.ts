import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken'

@Injectable({providedIn: 'root'})
export class TokenService {

    hasToken(){
        return !!this.getToken();
    }

    setToken(token){
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    getToken(){
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    removeToken() {
        window.sessionStorage.removeItem(TOKEN_KEY);
    }
}