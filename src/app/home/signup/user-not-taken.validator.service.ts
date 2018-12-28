import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignupService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(
        private _signUpService: SignupService
    ) {}

    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName =>
                    this._signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? {userNameTaken: true} : null))
                .pipe(first());
        }
    }
}