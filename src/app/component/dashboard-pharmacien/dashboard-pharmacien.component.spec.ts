import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPharmacienComponent } from './dashboard-pharmacien.component';

describe('DashboardPharmacienComponent', () => {
  let component: DashboardPharmacienComponent;
  let fixture: ComponentFixture<DashboardPharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPharmacienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
