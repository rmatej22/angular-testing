import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, expectText, setFieldValue } from 'src/app/helpers/element.spec-helper';
import { CounterService } from 'src/app/services/counter.service';
import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent -  integration test', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [CounterService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ServiceCounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('shows start count', () => {
    expectText(fixture, 'count', '0');
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

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectText(fixture, 'count', String(newCount));
  });
});
