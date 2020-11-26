import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollTemplateComponent } from './poll-template.component';

describe('PollTemplateComponent', () => {
  let component: PollTemplateComponent;
  let fixture: ComponentFixture<PollTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
