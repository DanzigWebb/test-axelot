import { Inject, Injectable } from '@angular/core';
import { CONFIG_TOKEN } from '@shared/config';
import { IConfig, IForm, IFormData } from '@models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  get url() {
    return this.config.host;
  }

  constructor(
    @Inject(CONFIG_TOKEN) private config: IConfig,
    private http: HttpClient
  ) {
  }

  public getForm(): Observable<IForm> {
    return this.http.get<IForm>(`${this.url}/getForm`);
  }

  public getData(): Observable<IFormData> {
    return this.http.get<IFormData>(`${this.url}/getData`);
  }
}
