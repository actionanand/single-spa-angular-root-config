import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorryComponent } from './sorry.component';

describe('SorryComponent', () => {
  let component: SorryComponent;
  let fixture: ComponentFixture<SorryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SorryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SorryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
