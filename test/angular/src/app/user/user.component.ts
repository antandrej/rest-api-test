import { Component, OnInit } from '@angular/core';
//import { Subscription } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: any;
  id: any;
  //subscription!: Subscription;

  constructor(private dataService: UserServiceService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    //this.subscription = this.dataService.currentUser.subscribe(data => this.user = data);
    //console.log(this.user);
    
    this.getUser();
  }

  getUser(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getUser(this.id).subscribe(data => this.user = data, (error: any) => {
      console.log(error);
    });
  }

}
