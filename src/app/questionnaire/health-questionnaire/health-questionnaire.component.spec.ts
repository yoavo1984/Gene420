import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthQuestionnaireComponent } from './health-questionnaire.component';

describe('HealthQuestionnaireComponent', () => {
  let component: HealthQuestionnaireComponent;
  let fixture: ComponentFixture<HealthQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
