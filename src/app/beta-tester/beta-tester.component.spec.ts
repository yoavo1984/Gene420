import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaTesterComponent } from './beta-tester.component';

describe('BetaTesterComponent', () => {
  let component: BetaTesterComponent;
  let fixture: ComponentFixture<BetaTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
