import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStrainModalComponent } from './review-strain-modal.component';

describe('ReviewStrainModalComponent', () => {
  let component: ReviewStrainModalComponent;
  let fixture: ComponentFixture<ReviewStrainModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewStrainModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStrainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
