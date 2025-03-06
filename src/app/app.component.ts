import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { ParcelConfig } from 'single-spa';
import { Subject, Subscription } from 'rxjs';

import { MicroUtilityService } from './services/micro-utility.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-spa-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private appParcelConfiMap: {
    [appName: string]: ParcelConfig;
  } = {};

  isSidebarCollapsed = false;

  private destroyRef = inject(DestroyRef);
  private utilityServ = inject(MicroUtilityService);
  private route = inject(Router);

  utiltyState$ = new Subject<{ data: unknown }>();

  ngOnInit() {
    this.utilityServ.importUtility('@actionanand/utility').then((app: ParcelConfig) => {
      this.appParcelConfiMap['@actionanand/utility'] = app;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (app as any).getData('/test-url').then((data: any) => {
        console.log('angular-root-config App: ', data);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sideBarSub: Subscription = (app as any).isSidebarCollapsed$.subscribe((value: boolean) => {
        console.log('Is Sidebar Collapsed: ', value);

        this.isSidebarCollapsed = value;
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const utilitySub: Subscription = (this.utiltyState$ = (app as any).state$);

      this.destroyRef.onDestroy(() => sideBarSub.unsubscribe());
      this.destroyRef.onDestroy(() => utilitySub.unsubscribe());
    });

    window.addEventListener('vanilla', (evnt: Event) => {
      // const fields = ['detail'];
      // const data = evnt[fields[0]];
      const customEvent = evnt as CustomEvent;
      const data = customEvent.detail;
      // console.log(data);
      console.log(evnt);
      this.utiltyState$.next({ data });
      this.route.navigateByUrl('svelte');
    });

    window.addEventListener('svelte', (evnt: Event) => {
      const customEvent = evnt as CustomEvent;
      const data = customEvent.detail;
      // console.log(data);
      console.log(evnt);
      this.utiltyState$.next({ data });
      this.route.navigateByUrl('vanilla');
    });

    window.addEventListener('react', (evnt: Event) => {
      const customEvent = evnt as CustomEvent;
      const data = customEvent.detail;
      // console.log(data);
      console.log(evnt);
      this.utiltyState$.next({ data });
      this.route.navigateByUrl('angular/all');
    });
  }
}
