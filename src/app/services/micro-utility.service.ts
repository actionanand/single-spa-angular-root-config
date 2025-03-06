import { Injectable } from '@angular/core';

import { ParcelConfig } from 'single-spa';

@Injectable({
  providedIn: 'root',
})
export class MicroUtilityService {
  private appParcelConfiMap: {
    [appName: string]: ParcelConfig;
  } = {};

  async importUtility(appName: string): Promise<ParcelConfig> {
    if (this.appParcelConfiMap[appName]) {
      return this.appParcelConfiMap[appName];
    } else {
      return window.System.import(appName).then((app: ParcelConfig) => {
        this.appParcelConfiMap[appName] = app;
        return app;
      });
    }
  }
}
