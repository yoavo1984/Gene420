import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneticsFooterComponent } from './genetics-footer.component';

describe('GeneticsFooterComponent', () => {
  let component: GeneticsFooterComponent;
  let fixture: ComponentFixture<GeneticsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
