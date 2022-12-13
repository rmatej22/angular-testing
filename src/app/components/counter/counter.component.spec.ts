import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    const incrementBtn = debugEl.query(By.css('[data-testid="increment-button"]'));

    incrementBtn.triggerEventHandler('click', null);

    fixture.detectChanges();

    const count = debugEl.query(By.css('[data-testid="count"]'));

    expect(count.nativeElement.textContent).toBe('1');
  });
});
