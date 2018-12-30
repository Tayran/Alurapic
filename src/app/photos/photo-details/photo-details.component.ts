import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/photo.comment';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private _route: ActivatedRoute,
        private _photoService: PhotoService,
        private _router: Router,
        private _alertService: AlertService,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this.photoId = this._route.snapshot.params.photoId;
        this.photo$ = this._photoService.findById(this.photoId);
        this.photo$.subscribe(() => {}, err => {
            console.log(err);
            this._router.navigate(['not-found']);
        });
    }

    remove() {
        this._photoService.removePhoto(this.photoId)
        .subscribe(
            () => {
                this._alertService.success('Photo removed', true);
                this._router.navigate(['/user', this._userService.getUserName()], { replaceUrl: true });
            },
            err => {
                console.log(err);
                this._alertService.danger('Could not delete the photo!');
            }
        );
    }

    like(photo: Photo) {
        this._photoService.like(photo.id)
        .subscribe(liked => {
            if (liked) {
                this.photo$ = this._photoService.findById(photo.id);
            }
        },
        err => alert(err)
        );
    }
}
