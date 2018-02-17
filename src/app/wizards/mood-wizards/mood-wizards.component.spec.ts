import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodWizardsComponent } from './mood-wizards.component';

describe('MoodWizardsComponent', () => {
  let component: MoodWizardsComponent;
  let fixture: ComponentFixture<MoodWizardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodWizardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodWizardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
