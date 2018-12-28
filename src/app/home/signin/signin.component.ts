import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;

    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private _formBuilder: FormBuilder,
        private _auth: AuthService,
        private _router: Router,
        private _platformDetector: PlatformDetectorService
    ) {}
    
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this._platformDetector.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
    }

    login() {
        let userName = this.loginForm.get('userName').value;
        let password = this.loginForm.get('password').value;

        this._auth.authenticate(userName, password)
            .subscribe(
                () => this._router.navigate(['user', userName]),
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this._platformDetector.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
                    alert('Invalid Username or Password.');
                }
            );
    }
    
}