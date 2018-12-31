import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;

    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private _formBuilder: FormBuilder,
        private _auth: AuthService,
        private _router: Router,
        private _platformDetector: PlatformDetectorService,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._activatedRoute
            .queryParams.subscribe(params => this.fromUrl = params['fromUrl']);
        this.loginForm = this._formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        // tslint:disable-next-line:no-unused-expression
        this._platformDetector.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this._auth.authenticate(userName, password)
            .subscribe(
                () => {
                    if (this.fromUrl) {
                        this._router.navigateByUrl(this.fromUrl);
                    } else {
                        this._router.navigate(['user', userName]);
                    }
                },
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    // tslint:disable-next-line:no-unused-expression
                    this._platformDetector.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
                    alert('Invalid Username or Password.');
                }
            );
    }

}
