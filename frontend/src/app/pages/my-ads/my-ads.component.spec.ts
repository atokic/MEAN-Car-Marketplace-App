import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdsComponent } from './my-ads.component';

describe('MyAdsComponent', () => {
  let component: MyAdsComponent;
  let fixture: ComponentFixture<MyAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
