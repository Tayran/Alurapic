import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
     Observable<HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>> {

        return next.handle(req)
        .pipe(tap(event => {
            if (event instanceof HttpResponse) {
                this.loadingService.stop();
            } else {
                this.loadingService.start();
            }
        }));
    }
    constructor(
        private loadingService: LoadingService
    ) {}
}
