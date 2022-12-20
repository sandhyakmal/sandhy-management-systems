import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin, ILoginToken } from 'src/app/interfaces/i-login';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  defaultUrl: string = "dashboard";
  lastUrl: string | null = "";

  loginUser: ILogin = {
    username: "",
    password: ""
  };

  constructor(private loginService: LoginService, 
    private storageService: StorageService,
    private router: Router,
    private activateRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe(
      params => {
        this.lastUrl = params.get('lastUrl');
      }
    )
  }

  onLogin(){
    this.loginService.login(this.loginUser)
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
      }
    )
  }

}
