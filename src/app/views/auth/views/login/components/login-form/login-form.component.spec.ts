import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginFormComponent } from './login-form.component';
import { SharedModule } from '../../../../../../shared/shared.module';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule, SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitted event if entering username and password', () => {
    let user;

    component.form.get('username').patchValue('ahmed');
    component.form.get('password').patchValue('123456');
    component.form.updateValueAndValidity();

    component.submitted.subscribe(value => {
      user = value;
    });

    component.onSubmit();

    expect(user.username).toBe('ahmed');
    expect(user.password).toBe('123456');
  });
});
