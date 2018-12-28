import { Injectable } from '@angular/core';
import { 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpSentEvent, 
    HttpHeaderResponse, 
    HttpProgressEvent, 
    HttpResponse, 
    HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private _tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if(this._tokenService.hasToken()) {
            const token = this._tokenService.getToken();
            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            })
        }
        return next.handle(req);
    }
}