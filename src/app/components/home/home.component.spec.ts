import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findComponent } from 'src/app/helpers/element.spec-helper';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('initialize component', () => {
    expect(component).toBeTruthy();
  });

  it('renders independent counter', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter).toBeTruthy();
  });

  it('passes the value for start count', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.properties.startCount).toBe(5);
  });

  it('listen countChange event', () => {
    spyOn(console, 'log');
    const counter = findComponent(fixture, 'app-counter');
    const count = 5;
    counter.triggerEventHandler('countChange', 5);
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count,
    );
  });

  it('renders service-counter', () => {
    const counter = findComponent(fixture, 'app-service-counter');
    expect(counter).toBeTruthy();
  });

  it('renders ngrx-counter', () => {
    const counter = findComponent(fixture, 'app-ngrx-counter');
    expect(counter).toBeTruthy();
  });
});
