import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneticsModalComponent } from './genetics-modal.component';

describe('GeneticsModalComponent', () => {
  let component: GeneticsModalComponent;
  let fixture: ComponentFixture<GeneticsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
