import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitFormComponent } from './split-form.component';

describe('SplitFormComponent', () => {
  let component: SplitFormComponent;
  let fixture: ComponentFixture<SplitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
