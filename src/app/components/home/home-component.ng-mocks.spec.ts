import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from '../counter/counter.component';
import { HomeComponent } from './home.component';
import { MockComponent } from 'ng-mocks';

describe('HomeComponent - mock child component)', () => {
  let component: HomeComponent;
  let counterComponent: CounterComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent(CounterComponent)],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();

        const counterElement = debugElement.query(By.directive(CounterComponent));
        counterComponent = counterElement.componentInstance;
      });
  });

  it('renders an independent counter', () => {
    expect(counterComponent).toBeTruthy();
  });

  it('passes a start count', () => {
    expect(counterComponent.startCount).toBe(5);
  });

  it('listens for count changes', () => {
    spyOn(console, 'log');
    const count = 5;
    counterComponent.countChange.emit(count);
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count,
    );
  });
});
