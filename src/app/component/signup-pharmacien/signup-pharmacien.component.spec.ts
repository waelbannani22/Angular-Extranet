import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPharmacienComponent } from './signup-pharmacien.component';

describe('SignupPharmacienComponent', () => {
  let component: SignupPharmacienComponent;
  let fixture: ComponentFixture<SignupPharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupPharmacienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
