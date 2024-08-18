import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarItemComponent } from './car-item.component';

describe('CarItemComponent', () => {
  let component: CarItemComponent;
  let fixture: ComponentFixture<CarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
