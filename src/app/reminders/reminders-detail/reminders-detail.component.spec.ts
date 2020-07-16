import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersDetailComponent } from './reminders-detail.component';

describe('RemindersDetailComponent', () => {
  let component: RemindersDetailComponent;
  let fixture: ComponentFixture<RemindersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
