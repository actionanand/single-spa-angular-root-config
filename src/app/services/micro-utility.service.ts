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
  constructor() {}

  async importUtility(appName: string): Promise<ParcelConfig> {
    return window.System.import(appName).then((app: ParcelConfig) => {
      return app;
    });
  }
}
