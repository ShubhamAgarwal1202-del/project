import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchUsers } from './search-users';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { UserService } from '../../services/user';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('SearchUsers Component', () => {
  let component: SearchUsers;
  let fixture: ComponentFixture<SearchUsers>;


  const userServiceSpy = {
    searchUsers: vi.fn().mockReturnValue(
      of([{ userId: 1, username: 'john', role: 'User' }])
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchUsers],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search query', () => {
    expect(component.searchQuery).toBe('');
  });

  it('should not search when query is empty', () => {
    component.searchQuery = '';
    component.search();

    expect(userServiceSpy.searchUsers).not.toHaveBeenCalled();
  });

  it('should call searchUsers when query is provided', () => {
    component.searchQuery = 'john';
    component.search();

    expect(userServiceSpy.searchUsers).toHaveBeenCalledWith('john');
  });

  it('should populate users array after search', () => {
    component.searchQuery = 'john';
    component.search();

    expect(component.users.length).toBe(1);
    expect(component.users[0].username).toBe('john');
  });
});