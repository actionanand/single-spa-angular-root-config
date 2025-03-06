import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { MicroappService } from '../services/microapp.service';
import { SorryComponent } from '../shared-components/sorry/sorry.component';
import { LoaderComponent } from '../shared-components/loader/loader.component';

@Component({
  selector: 'app-microapp',
  standalone: true,
  imports: [SorryComponent, LoaderComponent],
  templateUrl: './microapp.component.html',
  styleUrl: './microapp.component.scss',
})
export class MicroappComponent implements OnDestroy, OnInit {
  @ViewChild('microAppContainer', { static: true })
  private microApplicationContainer!: ElementRef;

  private applicationName!: string;
  // private customProperty!: object;

  showLoader = true;
  showError = false;

  constructor(
    private route: ActivatedRoute,
    private microAppService: MicroappService,
  ) {
    this.applicationName = this.route.snapshot.data['componentName'];
  }

  ngOnInit(): void {
    this.toggleLoader(true);
    this.microAppService.mountApp(
      this.applicationName,
      this.microApplicationContainer.nativeElement,
      this.toggleLoader.bind(this),
    );
  }

  async ngOnDestroy() {
    // await this.microAppService.unmountApp(this.applicationName).toPromise();
    // toPromise() is deprecated, use lastValueFrom()/firstValueFrom() instead
    await lastValueFrom(this.microAppService.unmountApp(this.applicationName));
  }

  toggleLoader(showLoader: boolean, showError: boolean = false): void {
    this.showLoader = showLoader;
    this.showError = showError;
  }
}
