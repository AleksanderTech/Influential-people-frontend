import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeQuoteComponent } from './change-quote.component';

describe('ChangeQuoteComponent', () => {
  let component: ChangeQuoteComponent;
  let fixture: ComponentFixture<ChangeQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
