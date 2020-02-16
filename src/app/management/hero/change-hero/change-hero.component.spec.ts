import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHeroComponent } from './change-hero.component';

describe('ChangeHeroComponent', () => {
  let component: ChangeHeroComponent;
  let fixture: ComponentFixture<ChangeHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
