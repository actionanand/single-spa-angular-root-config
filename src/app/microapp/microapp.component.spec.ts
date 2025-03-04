import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroappComponent } from './microapp.component';

describe('MicroappComponent', () => {
  let component: MicroappComponent;
  let fixture: ComponentFixture<MicroappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroappComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MicroappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
