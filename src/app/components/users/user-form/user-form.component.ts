import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  showMore: boolean = false;
  showToast: boolean = false;
  isDeleted: boolean = false;

  @Input() user: IUser = {} as IUser;

  constructor(private userService: UserService, 
    private toasterService: ToasterService) { }

  ngOnInit(): void {
  }

  showToggle(){
    this.showMore = !this.showMore;
  }

  cancel(){
    this.showMore = false;
    this.user = {} as IUser ;
  }

  onCreate(){
    this.userService.create(this.user)
    .subscribe(
      (
      response: IUser)=>{
        this.showMore = false;
        this.user = {} as IUser;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil input data ${response.firstName}`;
      }
    );
  }

  onUpdate(){
    this.userService.update(this.user)
    .subscribe(
      (
      response: IUser) => {
        this.showMore = false;
        this.user = {} as IUser;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil Edit data ${response.firstName}`;
      }
    );
  }

  onDelete(){
    this.userService.delete(this.user)
    .subscribe(
      (
      response: IUser) => {
        this.showMore = false;
        this.user = {} as IUser;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil Hapus data ${response.firstName}`;
        this.isDeleted = false; 
      }
    );
  }

}
