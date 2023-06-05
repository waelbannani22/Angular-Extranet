import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBiDashboardComponent } from './power-bi-dashboard.component';

describe('PowerBiDashboardComponent', () => {
  let component: PowerBiDashboardComponent;
  let fixture: ComponentFixture<PowerBiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerBiDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
