import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjointsComponent } from './conjoints.component';

describe('ConjointsComponent', () => {
  let component: ConjointsComponent;
  let fixture: ComponentFixture<ConjointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
