import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPollTemplatesComponent } from './my-poll-templates.component';

describe('MyPollTemplatesComponent', () => {
  let component: MyPollTemplatesComponent;
  let fixture: ComponentFixture<MyPollTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPollTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPollTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
