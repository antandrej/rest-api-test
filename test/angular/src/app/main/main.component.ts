import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private service: UserServiceService, private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  users: any[] = [];

  user: any;
  //newUser : any;
  subscription!: Subscription;

  toUpdate: boolean = false;

  myForm!: FormGroup;


  ngOnInit(): void {
    this.getUsers();
    this.myForm = this.fb.group({
      id: '',
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      location: ['', Validators.required]
    });
    //this.subscription = this.service.currentUser.subscribe(data => this.user = data)
  }

  getUsers() {
    this.service.getUsers().subscribe(data => {
      this.users = data as any[];
    }, 
    (error: any) => {
      console.log(error);
    });
  }

  getUser(id: any) {
    this.router.navigate(['user/', id]);
    /*
    this.service.getUser(id).subscribe(data => {
      //this.user = data;
      //this.service.showUser(this.user);
      //this.router.navigate(['user/', id]);
    },
      error => {
        console.log(error);
      }
    )*/
  }

  deleteUser(id: any) {
    this.service.deleteUser(id).subscribe((data) => {
      this.ngOnInit();
    }, error => {
      console.log(error);
    }
    );
  }
/*
  updateUser(form: FormGroup) {
    let id = form.value.id;
    const updatedUser = {
      id: id,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      location: form.value.location
    };
    this.http.put('/api/users/' + id, updatedUser, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.clearFields(this.myForm);
      this.ngOnInit();
    }, error => {
      console.log(error);
    }
    );
  }
*/
  addUser(form: FormGroup) {
    const newUser = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      location: form.value.location
    };
    this.service.addUser(newUser).subscribe((data) => {
      console.log(data);
      this.clearFields(this.myForm);
      this.ngOnInit();
    }, error => {
      console.log(error);
    }
    );
  }

  openForm() {
    document.getElementById("details-form")!.style.display = "flex";
      this.clearFields(this.myForm);
  }

  closeForm() {
    document.getElementById("details-form")!.style.display = "none";
    this.clearFields(this.myForm);
  }

  clearFields(form: FormGroup) {
    form.value.id = "";
    form.value.firstname = "";
    form.value.lastname = "";
    form.value.location = "";
  }
}