describe('Counter', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'Angular Workshop: Counters');
  });

  it('increments counter', () => {
    cy.byTestId('count').first().should('have.text', '5');
    cy.byTestId('increment-button').first().click();
    cy.byTestId('count').first().should('have.text', '6');
  });

  it('decrements counter', () => {
    cy.byTestId('decrement-button').first().click();
    cy.byTestId('count').first().should('have.text', '4');
  });

  it('resets the count', () => {
    cy.byTestId('reset-input').first().type('123');
    cy.byTestId('reset-button').first().click();
    cy.byTestId('count').first().should('have.text', '123');
  });
});
