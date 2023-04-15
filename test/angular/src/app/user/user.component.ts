import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: any;
  subscription!: Subscription;

  constructor(private dataService: UserServiceService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentUser.subscribe(data => this.user = data);
    console.log(this.user);
  }

}
