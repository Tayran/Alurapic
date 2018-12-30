import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './newUser';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;

    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private _formBuilder: FormBuilder,
        private _userNotTakenValidatorService: UserNotTakenValidatorService,
        private _signupService: SignupService,
        private _router: Router,
        private _platformDetector: PlatformDetectorService
    ) {}

    ngOnInit(): void {
        this.signupForm = this._formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this._userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        });
        // tslint:disable-next-line:no-unused-expression
        this._platformDetector.isPlatformBrowser() && this.emailInput.nativeElement.focus();
    }

    signup() {
        if (this.signupForm.valid && !this.signupForm.pending) {
            const newUser = this.signupForm.getRawValue() as NewUser;

            this._signupService.signup(newUser)
                .subscribe(() => this._router.navigate(['']));
        }
    }


}
