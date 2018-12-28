import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignupService } from './signup/signup.service';

@NgModule({
    declarations: [ 
        SigninComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule ,
        VMessageModule,
        RouterModule,
        FormsModule,
        HomeRoutingModule
    ],
    providers: [
        SignupService
    ]
})
export class HomeModule {}