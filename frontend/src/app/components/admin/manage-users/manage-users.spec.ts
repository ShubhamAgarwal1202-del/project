import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageUsers } from './manage-users';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ManageUsers', () => {
  let component: ManageUsers;
  let fixture: ComponentFixture<ManageUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUsers],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(ManageUsers);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});