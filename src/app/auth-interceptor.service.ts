import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmM2YWIwM2YxYmIxNTc3ZjU0NzgyZjkwNzk4ZjNlMCIsInN1YiI6IjY0YzhiZjJjODlmNzQ5MDEwN2MwYmQ3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Nvly8B-YGbk5qE9HSYBFtQGaNZYmkzNbsSnya1qyQE8';

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    return next.handle(authReq);
  }
}