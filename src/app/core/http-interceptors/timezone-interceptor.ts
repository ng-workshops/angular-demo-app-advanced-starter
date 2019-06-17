import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimezoneInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and replace the original headers with
    // cloned headers, updated with the timezone offset.
    const timezoneReq = req.clone({
      headers: req.headers.set(
        'X-DS-TZ-Offset',
        (-new Date().getTimezoneOffset() / 60).toString()
      )
    });

    // send cloned request with header to the next handler.
    return next.handle(timezoneReq);
  }
}
