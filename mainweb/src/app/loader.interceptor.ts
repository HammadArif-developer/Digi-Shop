import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SpinnerService } from './services/spinner.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private spinnerSevice: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(request);
    // this.spinnerSevice.requestStarted();
    // return next.handle(request).pipe(finalize(()=> this.spinnerSevice.requestEnded()));
    return next.handle(request)
  }
}
