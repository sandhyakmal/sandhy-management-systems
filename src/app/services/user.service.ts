import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserWrapper } from '../interfaces/i-user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = "/users";

  constructor(private baseService: BaseService,
    private httpClient: HttpClient) { }

  getAll(): Observable<IUserWrapper>{
    return this.httpClient.get<IUserWrapper>(
      `${this.baseService.baseURL}${this.endpoint}`
    )
  }

  endpointCreate: string = "/users/add";

  create(user: IUser): Observable<IUser>{
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(user);
    return this.httpClient.post<IUser>(
      `${this.baseService.baseURL}${this.endpointCreate}`,
      body,
      {headers}
    );
  }

  update(user: IUser): Observable<IUser>{
    const headers = {
      "Content-Type": "application/json"
    };

    const {id, ...userClean} = user;
    const body = JSON.stringify(userClean);

    return this.httpClient.put<IUser>(
      `${this.baseService.baseURL}${this.endpoint}/${user.id}`,
      body,
      {headers}
    );
  }

  delete(user: IUser): Observable<IUser>{
    const headers = {
      "Content-Type": "application/json"
    };

    return this.httpClient.delete<IUser>(
      `${this.baseService.baseURL}${this.endpoint}/${user.id}`
    );
  }
}
