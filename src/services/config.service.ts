import { Injectable } from '@angular/core';

import * as config from '../../config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: object;

  public get(key: string) {
    return this.config[key];
  }

  constructor() {
    this.config = config['default'];
  }
}
