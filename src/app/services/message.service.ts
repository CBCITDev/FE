import { Injectable } from '@angular/core';
import { Message } from '../message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  name: string | undefined;

  // backendUrl = 'http://localhost:8080'
  backendUrl = 'http://127.0.0.1:8080'

  constructor(private http: HttpClient) { }

  getHelloByName(name:string) {
    if(name !== '') {
      return this.http.get<Message>(this.backendUrl+'/hello/greeting/'+name)
        .pipe(catchError(this.handleError));
    } else {
      return this.http.get<Message>(this.backendUrl+'/hello')
        .pipe(catchError(this.handleError));
    }
  }

  handleError(error : any) {
    let errorMessage = 'An error has occured. Please try again.';
    const message: Message = {message: errorMessage};
    return of(message);
  }
}
