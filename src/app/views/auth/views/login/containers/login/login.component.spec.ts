import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

import * as fromStore from '../../../../../../store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<fromStore.IRootState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, LoginFormComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({})]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
