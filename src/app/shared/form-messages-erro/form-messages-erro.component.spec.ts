import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMessagesErroComponent } from './form-messages-erro.component';

describe('FormMessagesErroComponent', () => {
  let component: FormMessagesErroComponent;
  let fixture: ComponentFixture<FormMessagesErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMessagesErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMessagesErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
