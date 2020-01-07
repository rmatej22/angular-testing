import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { take, toArray } from 'rxjs/operators';

import { click, expectText, setFieldValue } from '../spec-helpers/element.spec-helper';
import { IndependentCounterComponent } from './independent-counter.component';

const startCount = 123;
const newCount = 456;

describe('IndependentCounterComponent', () => {
    let component: IndependentCounterComponent;
    let fixture: ComponentFixture<IndependentCounterComponent>;

    function expectCount(count: number): void {
        expectText(fixture, 'count', String(count));
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IndependentCounterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndependentCounterComponent);
        component = fixture.componentInstance;
        component.startCount = startCount;
        component.ngOnChanges();
        fixture.detectChanges();
    });

    it('shows the start count', () => {
        expectCount(startCount);
    });

    it('increments the count', () => {
        click(fixture, 'increment-button');
        fixture.detectChanges();
        expectCount(startCount + 1);
    });

    it('decrements the count', () => {
        click(fixture, 'decrement-button');
        fixture.detectChanges();
        expectCount(startCount - 1);
    });

    it('resets the count', () => {
        setFieldValue(fixture, 'reset-input', String(newCount));
        click(fixture, 'reset-button');
        fixture.detectChanges();
        expectCount(newCount);
    });

    it('emits countChange events', () => {
        let events: number[] | undefined;
        component.countChange.pipe(take(3), toArray()).subscribe((actualEvents) => {
            events = actualEvents;
        });

        click(fixture, 'increment-button');
        click(fixture, 'decrement-button');
        setFieldValue(fixture, 'reset-input', String(newCount));
        click(fixture, 'reset-button');

        expect(events).toEqual([startCount + 1, startCount, newCount]);
    });
});
