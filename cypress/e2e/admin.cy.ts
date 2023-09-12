describe("NextAuth - Admin", () => {
  before(() => {
    cy.setNextAuthSessionToken("admin");
  });
  it("passes", () => {
    cy.visit("/admin");

    cy.get("h1").should("contain", "This page is protected by Middleware");
  });
});
