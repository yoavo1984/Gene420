import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainCarouselComponent } from './strain-carousel.component';

describe('StrainCarouselComponent', () => {
  let component: StrainCarouselComponent;
  let fixture: ComponentFixture<StrainCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
