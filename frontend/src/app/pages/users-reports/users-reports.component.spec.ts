import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReportsComponent } from './users-reports.component';

describe('UsersReportsComponent', () => {
  let component: UsersReportsComponent;
  let fixture: ComponentFixture<UsersReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
