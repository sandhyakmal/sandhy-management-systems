import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, ILoginToken } from '../interfaces/i-login';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseURL: string = 'https://dummyjson.com';

  constructor() { }

}
