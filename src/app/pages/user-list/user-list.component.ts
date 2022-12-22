import { Component, OnInit } from '@angular/core';
import { IProductWrapper } from 'src/app/interfaces/i-product';
import { IUser, IUserWrapper } from 'src/app/interfaces/i-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  users: Array<IUser> = [];
  user: IUser = {} as IUser;
  showMore: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.onAll();
  }

  onAll():void {
    this.userService.getAll().subscribe
    ((response: IUserWrapper) => {
      this.users = response.users;
    });
  }

  showToggle():void{
    this.showMore = !this.showMore;
  }

  showDetail(u: IUser): void {
    this.user = u;
  }


}
