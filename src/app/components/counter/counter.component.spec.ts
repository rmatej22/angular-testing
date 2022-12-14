import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  click,
  expectText,
  findElement,
  setFieldValue,
} from 'src/app/helpers/element.spec-helper';
import { CounterComponent } from './counter.component';

const startCount = 123;

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
        // set starting count to our variable by input
        component.startCount = startCount;
        component.ngOnChanges();
        fixture.detectChanges();
      });
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', String(startCount));
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');

    fixture.detectChanges();

    expectText(fixture, 'count', String(startCount + 1));
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');

    fixture.detectChanges();

    expectText(fixture, 'count', String(startCount - 1));
  });

  it('resets the count', () => {
    const newCount = '123';

    setFieldValue(fixture, 'reset-input', newCount);

    click(fixture, 'reset-button');

    fixture.detectChanges();

    expectText(fixture, 'count', newCount);
  });

  it('does not reset if value of input is not number', () => {
    const newValue = 'not a number';

    setFieldValue(fixture, 'reset-input', newValue);

    click(fixture, 'reset-button');

    fixture.detectChanges();

    expectText(fixture, 'count', String(startCount));
  });

  it('emits countChange event on increment', () => {
    let actualCount: number | undefined;

    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    click(fixture, 'increment-button');

    expect(actualCount).toBe(startCount + 1);
  });

  it('emits countChange events on decrement', () => {
    let actualCount: number | undefined;

    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    click(fixture, 'decrement-button');

    expect(actualCount).toBe(startCount - 1);
  });

  it('emits countChange events on reset', () => {
    const newCount = '123';

    let actualCount: number | undefined;

    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    setFieldValue(fixture, 'reset-input', newCount);

    click(fixture, 'reset-button');

    expect(actualCount).toBe(+newCount);
  });
});
