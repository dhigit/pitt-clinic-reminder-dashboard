import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersCreateComponent } from './reminders-create.component';

describe('RemindersCreateComponent', () => {
  let component: RemindersCreateComponent;
  let fixture: ComponentFixture<RemindersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
