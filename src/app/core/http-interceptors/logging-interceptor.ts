import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggingInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        // Operation failed; error is an HttpErrorResponse
        error => ok = 'failed'
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} ${ok} in ${elapsed} ms: "${req.urlWithParams}"`;

        console.log('%cINFO%c XHR', 'color:white; background-color: #8E388E; padding: 0 .5em;', '', msg);

        if (req.method === 'PUT' || req.method === 'POST') {
          console.log('%cINFO%c BODY', 'color:white; background-color: #8E388E; padding: 0 .5em;', '', req.body);
        }
      })
      );
  }
}
