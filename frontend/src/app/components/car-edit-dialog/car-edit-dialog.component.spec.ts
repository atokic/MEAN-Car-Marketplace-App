import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEditDialogComponent } from './car-edit-dialog.component';

describe('CarEditDialogComponent', () => {
  let component: CarEditDialogComponent;
  let fixture: ComponentFixture<CarEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
