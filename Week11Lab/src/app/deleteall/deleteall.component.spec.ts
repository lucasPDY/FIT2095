import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteallComponent } from './deleteall.component';

describe('DeleteallComponent', () => {
  let component: DeleteallComponent;
  let fixture: ComponentFixture<DeleteallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
