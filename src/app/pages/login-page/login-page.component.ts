import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin, ILoginToken } from 'src/app/interfaces/i-login';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  defaultUrl: string = "dashboard";
  lastUrl: string | null = "";
  requiredForm: FormGroup;
  messageError: string = "";

  loginUser: ILogin = {
    username: "",
    password: ""
  };

  constructor(private loginService: LoginService, 
    private storageService: StorageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toasterService: ToasterService ) {
      this.requiredForm = new FormGroup({
        username: new FormControl(this.loginUser.username,[
          Validators.required,
          Validators.minLength(5),
        ]),
        password: new FormControl(this.loginUser.password,[
          Validators.required,
          Validators.minLength(5),
        ])
      })
     }

  private handleError(error: HttpErrorResponse){
      // console.log(error.message);
      this.messageError = error.message;
      this.toasterService.message = 'Username atau Password Anda Salah';
      this.toasterService.showToast = true;     
      return throwError(() => Error("Something bad Happend, please try again later."));   
  }

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe(
      params => {
        this.lastUrl = params.get('lastUrl');
      }
    )
  }

  onLogin(){
    this.loginService.login(this.loginUser)
    .pipe(
      catchError(this.handleError)
      )
    .subscribe(
      (response: ILoginToken) =>{
        this.storageService.save("TOKEN", response.token);
        this.storageService.save("USERNAME", response.username);
        this.storageService.save("PHOTO_PROFILE", response.image);
        if(this.lastUrl){
          this.router.navigate([this.lastUrl]);
        } else {
          this.router.navigate([this.defaultUrl]);
        }
      },
      (error: any) => {
        this.messageError = error.message;
        this.toasterService.message = 'Username atau Password Anda Salah';
        this.toasterService.showToast = true;     
      }
    )
  }

}
