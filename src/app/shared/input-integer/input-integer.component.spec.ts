import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIntegerComponent } from './input-integer.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputIntegerComponent', () => {
  let component: InputIntegerComponent;
  let fixture: ComponentFixture<InputIntegerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [InputIntegerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIntegerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
