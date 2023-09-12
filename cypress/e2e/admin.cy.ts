describe("NextAuth - Admin", () => {
  before(() => {
    cy.fixture("mockNextAuthSessions").then(async (mockSessions) => {
      const token = mockSessions.admin;

      cy.task("encodeJwt", token).then((jwt) => {
        cy.setCookie("next-auth.session-token", jwt);
      });
    });

    // does not work for middware redirects
    //cy.fixture("mockNextAuthSessions").then(async (mockSessions) => {
    // cy.intercept("GET", "/api/auth/session", {
    //   statusCode: 200,
    //   body: {
    //     ...mockSessions["admin"],
    //   },
    // }).as("getMockedSession");
    //});
  });
  it("passes", () => {
    cy.visit("/admin");

    //cy.wait("@getMockedSession");
    cy.get("h1").should("contain", "This page is protected by Middleware");
  });
});
