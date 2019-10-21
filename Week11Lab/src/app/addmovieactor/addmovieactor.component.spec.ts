import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmovieactorComponent } from './addmovieactor.component';

describe('AddmovieactorComponent', () => {
  let component: AddmovieactorComponent;
  let fixture: ComponentFixture<AddmovieactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmovieactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmovieactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
