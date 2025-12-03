describe('flight app', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('visits the initial page and check th title', () => {
    cy.contains('Welcome!');
  });

  it('should have UTF-8 as charset', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('should do an implicit subject assertion', () => {
    cy.get('.sidebar-wrapper ul.nav li:last a').should('contain.text', 'About');
  });
});
