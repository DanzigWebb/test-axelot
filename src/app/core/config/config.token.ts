import { InjectionToken } from '@angular/core';
import { IConfig } from '@models/models.interface';


export const CONFIG_TOKEN = new InjectionToken<IConfig>(
  'Config properties'
)
