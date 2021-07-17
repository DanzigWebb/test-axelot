import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConfig, IForm, IFormData } from '@models/models.interface';
import { Form } from '@models/form.model';
import { CONFIG_TOKEN } from '@core/config';


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

  public getForm(): Observable<Form> {
    return this.http.get<IForm>(`${this.url}/getForm`).pipe(
      map(form => new Form(form))
    );
  }

  public getData(): Observable<IFormData> {
    return this.http.get<IFormData>(`${this.url}/getData`);
  }
}
