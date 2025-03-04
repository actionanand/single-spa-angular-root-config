import { bootstrapApplication } from '@angular/platform-browser';

import { start } from 'single-spa';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

// Starting single spa framework
start();
