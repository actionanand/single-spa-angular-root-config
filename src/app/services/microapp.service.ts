import { Injectable } from '@angular/core';

import { CustomProps, mountRootParcel, Parcel, ParcelConfig } from 'single-spa';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import { mapTo } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { SharedDataService } from './shared-data.service';

declare global {
  interface Window {
    System: {
      import: (app: string) => Promise<ParcelConfig>;
      delete: (app: string) => boolean;
      resolve: (app: string) => ParcelConfig;
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class MicroappService {
  private appParcelConfiMap: {
    [appName: string]: ParcelConfig;
  } = {};

  private appParcelMap: {
    [appName: string]: Parcel;
  } = {};

  constructor(private SharedDataServ: SharedDataService) {
    // Set data for each application
    this.SharedDataServ.setData('single-spa-angular', {
      angTitle: 'Todo',
      customProp1: "coming from 'root-config Angular'",
    });

    this.SharedDataServ.setData('@actionanand/single-spa-react', {
      reactTitle: 'Notes',
      customProp1: "coming from 'root-config Angular'",
    });

    this.SharedDataServ.setData('@actionanand/single-spa-vue', {
      vueTitle: 'Infinity',
      customProp1: "coming from 'root-config Angular'",
    });
  }

  mountApp(
    appName: string,
    domElement: HTMLElement,
    callback: (showLoader: boolean, showError: boolean) => void,
  ): void {
    try {
      const customData = this.SharedDataServ.getData(appName);

      if (this.appParcelConfiMap[appName]) {
        mountRootParcel(this.appParcelConfiMap[appName], { domElement, ...customData });
        callback(false, false);
      } else {
        window.System.import(environment['sspa-apps-map'][appName]).then(
          (app: ParcelConfig<CustomProps>) => {
            this.appParcelConfiMap[appName] = app;
            this.appParcelMap[appName] = mountRootParcel(app, { domElement, ...customData });
            callback(false, false);
          },
          (error: string) => {
            console.error('error while downloading parcel ' + error);
            callback(false, true);
          },
        );
      }
    } catch (error) {
      console.error('Error while mounting app ' + appName);
      console.error(error);
      callback(false, true);
    }
  }

  unmountApp(appName: string): Observable<void> {
    try {
      if (appName && this.appParcelMap[appName]) {
        return from(this.appParcelMap[appName].unmount()).pipe(
          tap(() => {
            if (this.appParcelMap[appName]) {
              delete this.appParcelMap[appName];
            }
          }),
          // mapTo(null), // mapTo is deprecated, use map() instead
          map(() => undefined),
        );
      } else {
        delete this.appParcelMap[appName];
        return new Observable();
      }
    } catch (error) {
      console.log('Error while unmounting app ' + appName);
      console.error(error);
      return new Observable<void>();
    }
  }

  mountAppWithoutLoader(appName: string, domElement: HTMLElement): void {
    const customData = this.SharedDataServ.getData(appName);

    if (this.appParcelConfiMap[appName]) {
      mountRootParcel(this.appParcelConfiMap[appName], { domElement, ...customData });
    } else {
      window.System.import(environment['sspa-apps-map'][appName]).then((app: ParcelConfig<CustomProps>) => {
        this.appParcelConfiMap[appName] = app;
        this.appParcelMap[appName] = mountRootParcel(app, { domElement, ...customData });
      });
    }
  }
}
