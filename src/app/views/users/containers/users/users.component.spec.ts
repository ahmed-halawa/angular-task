import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { UsersComponent } from './users.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import * as fromStore from '../../../../store';


describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: MockStore<fromStore.IRootState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, NavbarComponent, LoaderComponent],
      providers: [provideMockStore({})]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
