import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifPharmacienComponent } from './verif-pharmacien.component';

describe('VerifPharmacienComponent', () => {
  let component: VerifPharmacienComponent;
  let fixture: ComponentFixture<VerifPharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifPharmacienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifPharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
