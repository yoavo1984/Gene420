import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalQuestionnaireComponent } from './personal-questionnaire.component';

describe('PersonalQuestionnaireComponent', () => {
  let component: PersonalQuestionnaireComponent;
  let fixture: ComponentFixture<PersonalQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
