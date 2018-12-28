import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { PhotoModule } from '../photo/photo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { ShowIfLoggedModule } from '../../shared/directives/show-if-logged/show-if-logged.modules';

@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent,
        PhotoOwnerOnlyDirective
    ],
    imports: [
        CommonModule,
        PhotoModule,
        ReactiveFormsModule,
        VMessageModule,
        ShowIfLoggedModule,
        RouterModule
    ],
    exports: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ]
})
export class PhotoDetailsModule {}
