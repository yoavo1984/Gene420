import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesQuestionnaireComponent } from './preferences-questionnaire.component';

describe('PreferencesQuestionnaireComponent', () => {
  let component: PreferencesQuestionnaireComponent;
  let fixture: ComponentFixture<PreferencesQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
