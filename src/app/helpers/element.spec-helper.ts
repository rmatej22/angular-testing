import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// helper for finding element by id
export function findElement<T>(fixture: ComponentFixture<T>, id: string): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${id}"]`));
}

// helper for click action on element with given ID
export function click<T>(fixture: ComponentFixture<T>, id: string): void {
  const element = findElement(fixture, id);
  const clickEvent = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', clickEvent);
}
// click event object
export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  };
}

// helper that expects given text to be on a elemnt
export function expectText<T>(
  fixture: ComponentFixture<T>,
  id: string,
  text: string,
): void {
  const element = findElement(fixture, id);
  const elText = element.nativeElement.textContent;
  expect(elText).toBe(text);
}

// set value in some field
export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  id: string,
  value: string,
): void {
  setFieldElementValue(findElement(fixture, id).nativeElement, value);
}
// setts value and dispatch event
export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
): void {
  element.value = value;
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(element, isSelect ? 'change' : 'input', isSelect ? false : true);
}
// dispatch fake event
export function dispatchFakeEvent(
  element: EventTarget,
  type: string,
  bubbles: boolean = false,
): void {
  const event = document.createEvent('Event');
  event.initEvent(type, bubbles, false);
  element.dispatchEvent(event);
}

// function that finds component we need
export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}
