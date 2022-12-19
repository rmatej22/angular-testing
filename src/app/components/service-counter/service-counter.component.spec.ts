import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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

describe('ServiceCounterComponent -  unit test', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;
  let fakeCounterService: CounterService;
  const currentCount = 123;

  beforeEach(async () => {
    fakeCounterService = jasmine.createSpyObj('CounterService', {
      getCount: of(currentCount),
      increment: undefined,
      decrement: undefined,
      reset: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
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
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    expect(fakeCounterService.reset).toHaveBeenCalled();
  });
});
