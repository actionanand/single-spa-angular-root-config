import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { MicroappService } from '../../services/microapp.service';

@Component({
  selector: 'app-my-view',
  standalone: true,
  imports: [],
  templateUrl: './my-view.component.html',
  styleUrl: './my-view.component.scss',
})
export class MyViewComponent implements OnInit, OnDestroy {
  @ViewChild('microAppMyView', { static: true })
  private microApplicationMyView!: ElementRef;

  @Input() applicationName = 'single-spa-sidebar';

  private microAppService = inject(MicroappService);

  ngOnInit() {
    this.microAppService.mountAppWithoutLoader(this.applicationName, this.microApplicationMyView.nativeElement);
  }

  async ngOnDestroy() {
    // await this.microAppService.unmountApp(this.applicationName).toPromise();
    // toPromise() is deprecated, use lastValueFrom()/firstValueFrom() instead
    await lastValueFrom(this.microAppService.unmountApp(this.applicationName));
  }
}
