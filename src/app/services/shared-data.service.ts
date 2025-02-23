import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor() {}

  private customDataMap: {
    [appName: string]: object;
  } = {};

  setData(appName: string, data: object) {
    this.customDataMap[appName] = data;
  }
  getData(appName: string) {
    return this.customDataMap[appName];
  }
}
