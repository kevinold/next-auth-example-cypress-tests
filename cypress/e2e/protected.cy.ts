describe("NextAuth - Admin", () => {
  const user = "userA";
  before(() => {
    cy.setNextAuthSessionToken(user);
  });
  it("passes", () => {
    cy.visit("/protected");

    cy.get("h1").should("contain", "Protected Page");
    cy.getNextAuthToken(user)
      .its("email")
      .then((email) => {
        cy.get(".header_signedInText__E_Qe9 > strong").should("contain", email);
      });
  });
});
