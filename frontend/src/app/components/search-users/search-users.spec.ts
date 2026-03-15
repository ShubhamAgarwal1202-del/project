import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchUsers } from './search-users';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('SearchUsers', () => {
  let component: SearchUsers;
  let fixture: ComponentFixture<SearchUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchUsers],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(SearchUsers);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});