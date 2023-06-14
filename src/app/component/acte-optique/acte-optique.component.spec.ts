import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeOptiqueComponent } from './acte-optique.component';

describe('ActeOptiqueComponent', () => {
  let component: ActeOptiqueComponent;
  let fixture: ComponentFixture<ActeOptiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActeOptiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeOptiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
