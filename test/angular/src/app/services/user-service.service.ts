import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }


  //user: any;

  //private userSource = new BehaviorSubject({});
  //currentUser = this.userSource;

  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  getUser(id: any): Observable<any> {
    return this.http.get('/api/users/' + id, { responseType: 'json' });
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete('/api/users/' + id, { responseType: 'text' });
  }

  //showUser(user: any){
  //this.currentUser.next(user);
  //}
}
