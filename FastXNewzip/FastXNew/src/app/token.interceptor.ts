import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './auth/services/storage/storage.service';


 @Injectable()
 export class TokenInterceptor implements HttpInterceptor {
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const token = StorageService.getToken(); 
 
     
     if (token) {
       const modifiedRequest = request.clone({
         setHeaders: {
           'Authorization': `Bearer ${token}`
         }
       });
 
       return next.handle(modifiedRequest);
     }
 
    
     return next.handle(request);
   }
 }