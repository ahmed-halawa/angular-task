import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';
import * as fromStore from '../../../../../../store';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore<fromStore.IRootState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent, SignupFormComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({})]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
