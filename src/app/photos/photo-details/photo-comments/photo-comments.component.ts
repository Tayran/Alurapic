import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo.comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    commentForm: FormGroup;

    comments$: Observable<PhotoComment[]>;

    constructor(
        private _photoService: PhotoService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.commentForm = this._formBuilder.group({
            comment: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(300)
            ])]
        });
        this.comments$ = this._photoService.getComments(this.photoId);
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ =  this._photoService.addComment(this.photoId, comment)
        .pipe(switchMap(() => this._photoService.getComments(this.photoId)))
        .pipe(tap(() => {
            this.commentForm.reset();
            alert('Comentário adicionado com sucesso');
        }));
    }
}
