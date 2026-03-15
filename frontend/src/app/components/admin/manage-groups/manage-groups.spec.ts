import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageGroups } from './manage-groups';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ManageGroups', () => {
  let component: ManageGroups;
  let fixture: ComponentFixture<ManageGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGroups],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(ManageGroups);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});