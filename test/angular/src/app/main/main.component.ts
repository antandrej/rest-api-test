import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  users: any[] = [];
  user: any;

  constructor(private service: UserServiceService, private http : HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
      this.http.get('/api/users').subscribe(data => {
      this.users = data as any[];
    }, (error: any) => {
      console.log(error);
    });
  }
/*
  getUser(id: any) {
    this.service.getUser().subscribe(data => {
      console.log(data);
      this.user = data;
    },
      error => {
        console.log(error);
      }
    )
  }

  deleteUser(id: number) {
    this.service.deleteUser().subscribe(data => {
      this.service.deleteId = id;
      console.log(id);
    },
      error => {
        console.log(error);
      }
    )} 
    */

    deleteUser(id: any){
      this.http.delete('/api/users/' + id, {responseType: 'text'}).subscribe((data) => {
        this.ngOnInit();
      },error => {
        console.log(error);
      }
      );
    }
}