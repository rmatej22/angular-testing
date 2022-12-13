import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, expectText } from 'src/app/spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CounterComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
      });
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');

    fixture.detectChanges();

    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');

    fixture.detectChanges();

    expectText(fixture, 'count', '-1');
  });
});
