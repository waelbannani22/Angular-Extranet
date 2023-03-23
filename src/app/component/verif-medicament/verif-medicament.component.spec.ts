import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifMedicamentComponent } from './verif-medicament.component';

describe('VerifMedicamentComponent', () => {
  let component: VerifMedicamentComponent;
  let fixture: ComponentFixture<VerifMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifMedicamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
