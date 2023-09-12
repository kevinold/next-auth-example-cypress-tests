/// <reference types="cypress" />

Cypress.Commands.add("getNextAuthToken", (profile: string) => {
  cy.fixture("mockNextAuthTokens").then((mockSessions) => {
    return mockSessions[profile];
  });
});

Cypress.Commands.add("setNextAuthSessionToken", (profile: string) => {
  cy.fixture("mockNextAuthTokens").then(async (mockSessions) => {
    const token = mockSessions[profile];

    cy.task("encodeJwt", token).then((jwt) => {
      // @ts-ignore
      cy.setCookie("next-auth.session-token", jwt);
    });
  });
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      setNextAuthSessionToken(profile: string): Chainable<any>;
      getNextAuthToken(profile: string): Chainable<any>;
    }
  }
}
