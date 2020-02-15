import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroManagementComponent } from './hero-management.component';

describe('HeroManagementComponent', () => {
  let component: HeroManagementComponent;
  let fixture: ComponentFixture<HeroManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
