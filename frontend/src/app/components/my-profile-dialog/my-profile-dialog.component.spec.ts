import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileDialogComponent } from './my-profile-dialog.component';

describe('MyProfileDialogComponent', () => {
  let component: MyProfileDialogComponent;
  let fixture: ComponentFixture<MyProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProfileDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
