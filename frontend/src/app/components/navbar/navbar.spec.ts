import { TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, RouterTestingModule]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Navbar);
    expect(fixture.componentInstance).toBeTruthy();
  });
});