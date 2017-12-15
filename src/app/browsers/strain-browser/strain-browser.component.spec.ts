import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainBrowserComponent } from './strain-browser.component';

describe('StrainBrowserComponent', () => {
  let component: StrainBrowserComponent;
  let fixture: ComponentFixture<StrainBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
