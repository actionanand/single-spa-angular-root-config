import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { ParcelConfig } from 'single-spa';
import { Subject, Subscription } from 'rxjs';

import { MicroUtilityService } from './services/micro-utility.service';
import { MyViewComponent } from './shared-components/my-view/my-view.component';

interface ExtendedParcelConfig {
  state$: Subject<{ data: unknown }>;
  isSidebarCollapsed$: Subject<boolean>;
  getData(url: string): Promise<unknown>;
}

@Component({
  selector: 'app-spa-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, MyViewComponent],
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

      (app as unknown as ExtendedParcelConfig).getData('/test-url').then((data: unknown) => {
        console.log('angular-root-config App: ', data);
      });

      const sideBarSub: Subscription = (app as unknown as ExtendedParcelConfig).isSidebarCollapsed$.subscribe(
        (value: boolean) => {
          console.log('Is Sidebar Collapsed: ', value);

          this.isSidebarCollapsed = value;
        },
      );

      this.utiltyState$ = (app as unknown as ExtendedParcelConfig).state$;

      this.destroyRef.onDestroy(() => sideBarSub.unsubscribe());
      this.destroyRef.onDestroy(() => this.utiltyState$.unsubscribe());
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
