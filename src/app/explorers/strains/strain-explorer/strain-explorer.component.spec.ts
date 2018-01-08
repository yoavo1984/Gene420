import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainExplorerComponent } from './strain-explorer.component';

describe('StrainExplorerComponent', () => {
  let component: StrainExplorerComponent;
  let fixture: ComponentFixture<StrainExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
