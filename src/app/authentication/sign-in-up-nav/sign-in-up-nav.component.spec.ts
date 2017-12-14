import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInUpNavComponent } from './sign-in-up-nav.component';

describe('SignInUpNavComponent', () => {
  let component: SignInUpNavComponent;
  let fixture: ComponentFixture<SignInUpNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInUpNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInUpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
