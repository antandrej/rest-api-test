import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get('/api/users');
  }

  getHelloWorld(){
    return this.http.get('/api');
  }
}
