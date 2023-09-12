describe("NextAuth - Admin", () => {
  before(() => {
    cy.setNextAuthSessionToken("admin");
  });
  it("displays the admin page with user information", () => {
    cy.visit("/admin");

    cy.get("h1").should("contain", "This page is protected by Middleware");
  });
});
