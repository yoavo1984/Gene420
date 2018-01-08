import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainTypeSelectorComponent } from './strain-type-selector.component';

describe('StrainTypeSelectorComponent', () => {
  let component: StrainTypeSelectorComponent;
  let fixture: ComponentFixture<StrainTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
