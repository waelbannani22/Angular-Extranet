import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPharmacienComponent } from './login-pharmacien.component';

describe('LoginPharmacienComponent', () => {
  let component: LoginPharmacienComponent;
  let fixture: ComponentFixture<LoginPharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPharmacienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
