import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }
/*
  deleteId: number | undefined;

  getUsers() : Observable<any>{
    return this.http.get('/api/users');
  }

  getUser() : Observable<any>{
    return this.http.get('/api/users/:id');
  }


  deleteUser() : Observable<any>{
    return this.http.delete('/api/users/' + this.deleteId);
  }
*/
}
