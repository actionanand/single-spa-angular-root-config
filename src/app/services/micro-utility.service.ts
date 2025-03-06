import { Injectable } from '@angular/core';

import { ParcelConfig } from 'single-spa';

declare global {
  interface Window {
    System: {
      import: (app: string) => Promise<ParcelConfig>;
      delete: (app: string) => boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve: (app: string) => any;
    };
  }
}

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
