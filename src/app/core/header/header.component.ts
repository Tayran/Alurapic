import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    user$: Observable<User>;
    
    constructor(
        private _userService: UserService,
        private _router: Router
    ) {}
    
    ngOnInit(): void {
        this.user$ = this._userService.getUser();
    }

    logout() {
        this._userService.logout();
        this._router.navigate(['']);
    }
  
}