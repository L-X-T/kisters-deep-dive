describe('flight app', () => {
  beforeEach(() => {
    cy.visit('/flight-search');
  });

  it('visits the flight card and check the page title', () => {
    cy.get('h1').contains('Flight Search');
  });

  it('should verify that flight search is showing results', () => {
    cy.get('input[name=from]').clear().type('Hamburg');
    cy.get('input[name=to]').clear().type('Graz');
    cy.get('form .btn').first().click();

    cy.get('app-flight-card').its('length').should('be.gte', 5);
  });

  it('should correctly update the first flight card when clicking on delay', () => {
    cy.get('input[name=from]').clear().type('Hamburg');
    cy.get('input[name=to]').clear().type('Graz');
    cy.get('form .btn').first().click();
    cy.get('app-flight-search div:nth-child(1) p:nth-child(2)').contains('12.12.2025');
    cy.get('form .btn').eq(1).click();
    cy.get('app-flight-search div:nth-child(1) p:nth-child(2)').contains('13.12.2025');
  });

  it('should search for flights from Wien to Eisenstadt by intercepting', () => {
    cy.fixture('flights').then((f) => cy.intercept('GET', 'https://demo.angulararchitects.io/api/Flight**', f));
    cy.get('input[name=from]').clear().type('Wien');
    cy.get('input[name=to]').clear().type('Eisenstadt');
    cy.get('form .btn').first().click();
    cy.get('app-flight-card').should('have.length', 3);
  });

  it('should check the remove and select buttons of the first flight card', () => {
    cy.get('input[name=from]').clear().type('Hamburg');
    cy.get('input[name=to]').clear().type('Graz');
    cy.get('form .btn').first().click();
    cy.get('app-flight-card').its('length').should('be.gte', 1);
    cy.get('app-flight-card').first().as('flight-card');

    cy.get('@flight-card').find('> div').should('have.css', 'background-color', 'rgb(204, 197, 185)');
    cy.get('@flight-card').contains('button', 'Remove').click();
    cy.get('@flight-card').find('> div').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get('@flight-card').contains('button', 'Remove').should('not.exist');
    cy.get('@flight-card').contains('button', 'Select').should('exist');
  });
});
