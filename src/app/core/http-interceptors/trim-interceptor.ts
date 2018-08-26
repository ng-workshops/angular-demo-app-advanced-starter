import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrimInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const body = req.body;
    if (!body || Object.keys(body).length < 1) {
      return next.handle(req);
    }

    const newBody: { [key: string]: any } = {};

    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'string') {
        newBody[key] = value.trim();
      } else {
        newBody[key] = value;
      }
    });

    // clone request and set its body
    const newReq = req.clone({ body: newBody });

    // send the cloned request to the next handler.
    return next.handle(newReq);
  }
}
