import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  
  constructor(private service: UserServiceService, private http: HttpClient) { }

  users: any[] = [];
  user: any;

  toUpdate: boolean = false;

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

  getUser(id: any) {
    this.http.get('/api/users/' + id, { responseType: 'json' }).subscribe(data => {
      this.user = data as any;
      this.openForm(true);

      if (this.user) {
        (document.getElementById('id') as HTMLInputElement).value = this.user[0].id;
        (document.getElementById('fname') as HTMLInputElement).value = this.user[0].firstname;
        (document.getElementById('lname') as HTMLInputElement).value = this.user[0].lastname;
        (document.getElementById('loc') as HTMLInputElement).value = this.user[0].location;
      }
    },
      error => {
        console.log(error);
      }
    )
  }

  deleteUser(id: any) {
    this.http.delete('/api/users/' + id, { responseType: 'text' }).subscribe((data) => {
      this.ngOnInit();
    }, error => {
      console.log(error);
    }
    );
  }

  updateUser() {
    let id = (<HTMLInputElement>document.getElementById('id')).value;
    const updatedUser = {
      id: id,
      firstname: (<HTMLInputElement>document.getElementById('fname')).value,
      lastname: (<HTMLInputElement>document.getElementById('lname')).value,
      location: (<HTMLInputElement>document.getElementById('loc')).value
    };
    this.http.put('/api/users/' + id, updatedUser, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.clearFields();
      this.ngOnInit();
    }, error => {
      console.log(error);
    }
    );
  }

  addUser(){
    const newUser = {
      firstname: (<HTMLInputElement>document.getElementById('fname')).value,
      lastname: (<HTMLInputElement>document.getElementById('lname')).value,
      location: (<HTMLInputElement>document.getElementById('loc')).value
    };
    this.http.post('/api/users/', newUser, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.clearFields();
      this.ngOnInit();
    }, error => {
      console.log(error);
    }
    );
  }

  openForm(updating: boolean) {
    document.getElementById("details-form")!.style.display = "flex";
    console.log(updating);
    if (updating){
      this.toUpdate = true;
    }
    else if(!updating){
      this.toUpdate = false;
      this.clearFields();
    }
  }

  closeBox(){
    document.getElementById("details-form")!.style.display =  "none";
    this.clearFields();
  }

  clearFields(){    
    (document.getElementById('id') as HTMLInputElement).value = "";
    (document.getElementById('fname') as HTMLInputElement).value = "";
    (document.getElementById('lname') as HTMLInputElement).value = "";
    (document.getElementById('loc') as HTMLInputElement).value = "";
    
  }

}