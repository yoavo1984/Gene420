import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainViewComponent } from './strain-view.component';

describe('StrainViewComponent', () => {
  let component: StrainViewComponent;
  let fixture: ComponentFixture<StrainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
