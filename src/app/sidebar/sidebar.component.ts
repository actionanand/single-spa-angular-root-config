import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, ViewChild } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { MicroappService } from '../services/microapp.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('microAppSidebar')
  private microApplicationSidebar!: ElementRef;

  @Input() applicationName = 'single-spa-sidebar';

  private microAppService = inject(MicroappService);

  ngAfterViewInit() {
    this.microAppService.mountAppWithoutLoader(this.applicationName, this.microApplicationSidebar.nativeElement);
  }

  async ngOnDestroy() {
    // await this.microAppService.unmountApp(this.applicationName).toPromise();
    // toPromise() is deprecated, use lastValueFrom()/firstValueFrom() instead
    await lastValueFrom(this.microAppService.unmountApp(this.applicationName));
  }
}
