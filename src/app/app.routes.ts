import { Routes } from '@angular/router';

import { MicroappComponent } from './microapp/microapp.component';
import { MyViewComponent } from './shared-components/my-view/my-view.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyViewComponent,
        outlet: 'sidebar',
      },
      {
        path: '',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-vanilla-js',
        },
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'angular',
    children: [
      {
        path: '',
        component: MyViewComponent,
        outlet: 'sidebar',
      },
      {
        path: '',
        component: MicroappComponent,
        data: {
          componentName: 'single-spa-angular',
        },
      },
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
    path: 'react',
    children: [
      {
        path: '',
        component: MyViewComponent,
        outlet: 'sidebar',
      },
      {
        path: '',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-react',
        },
      },
      {
        path: '**',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-react',
        },
      },
    ],
  },
  {
    path: 'vue',
    children: [
      {
        path: '',
        component: MyViewComponent,
        outlet: 'sidebar',
      },
      {
        path: '',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-vue',
        },
      },
      {
        path: '**',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-vue',
        },
      },
    ],
  },
  {
    path: 'svelte',
    children: [
      {
        path: '',
        component: MyViewComponent,
        outlet: 'sidebar',
      },
      {
        path: '',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-svelte',
        },
      },
      {
        path: '**',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-svelte',
        },
      },
    ],
  },
  {
    path: 'vanilla',
    redirectTo: '',
  },
  {
    path: '**',
    children: [
      {
        path: '',
        component: MyViewComponent,
        outlet: 'sidebar',
      },
      {
        path: '',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-404',
        },
      },
      {
        path: '**',
        component: MicroappComponent,
        data: {
          componentName: '@actionanand/single-spa-404',
        },
      },
    ],
  },
];
