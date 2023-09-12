describe('NextAuth - Admin', () => {
  before(() => {
    cy.fixture("mockNextAuthSessions").then((mockSessions) => {
      cy.intercept("GET", "/api/auth/session", {
        statusCode: 200,
        body: {
          ...mockSessions["admin"],
        },
      });
    });
  });
  it('passes', () => {
    cy.visit('/admin')

    cy.get('p').first().should('contain', 'Only admin users can see this page.')
  })
})