import { Routes } from '@angular/router';

import { MicroappComponent } from './microapp/microapp.component';

export const routes: Routes = [
  {
    path: 'footer',
    children: [
      {
        path: '**',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-footer',
        },
      },
    ],
  },
  {
    path: 'angular',
    children: [
      {
        path: '**',
        component: MicroappComponent,
        data: {
          componentName: 'single-spa-angular',
        },
      },
    ],
  },
  {
    path: 'parcel',
    children: [
      {
        path: '**',
        component: MicroappComponent,
        data: {
          componentName: 'parcel',
        },
      },
    ],
  },
];
