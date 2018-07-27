import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaUploadComponent } from './dna-upload.component';

describe('DnaUploadComponent', () => {
  let component: DnaUploadComponent;
  let fixture: ComponentFixture<DnaUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnaUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
