import { Inject, Injectable } from '@angular/core';
import { CONFIG_TOKEN } from '@core/config';
import { IConfig } from '@models/models.interface';
import { IUserLoginData, IUserLoginResponse } from '@models/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get url() {
    return this.config.host;
  }

  constructor(
    @Inject(CONFIG_TOKEN) private config: IConfig,
    private http: HttpClient
  ) {
  }

  login(data: IUserLoginData): Observable<IUserLoginResponse> {
    return this.http.post<IUserLoginResponse>(`${this.url}/login`, data);
  }
}
