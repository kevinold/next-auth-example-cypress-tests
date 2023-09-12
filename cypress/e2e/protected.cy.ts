
describe('NextAuth - Admin', () => {
  let mockSessions: any;
  before(() => {
    cy.fixture("mockNextAuthSessions").then((sessions) => {
      mockSessions = sessions;
      cy.intercept("GET", "/api/auth/session", {
        statusCode: 200,
        body: {
          ...mockSessions["userA"],
        },
      });
    }).as("getMockedSession");
  });
  it('passes', () => {
    cy.visit('/protected')

    cy.wait("@getMockedSession");
    console.log("mockSessions", mockSessions)
    cy.get('h1').should('contain', 'Protected Page')
    cy.get('.header_signedInText__E_Qe9 > strong').should("contain", mockSessions.userA.user.email)
  })
})