import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ParcelConfig } from 'single-spa';

import { MicroUtilityService } from './services/micro-utility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private appParcelConfiMap: {
    [appName: string]: ParcelConfig;
  } = {};

  isSidebarCollapsed = false;

  // constructor(private utilityServ: MicroUtilityService) {}

  private destroyRef = inject(DestroyRef);
  private utilityServ = inject(MicroUtilityService);

  ngOnInit() {
    this.utilityServ.importUtility('@actionanand/utility').then(app => {
      this.appParcelConfiMap['@actionanand/utility'] = app;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (app as any).getData('/test-url').then((data: any) => {
        console.log('angular-root-config App: ', data);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sideBarSub = (app as any).isSidebarCollapsed$.subscribe((value: boolean) => {
        console.log('Is Sidebar Collapsed: ', value);

        this.isSidebarCollapsed = value;
      });

      this.destroyRef.onDestroy(() => sideBarSub.unsubscribe());
    });
  }
}
