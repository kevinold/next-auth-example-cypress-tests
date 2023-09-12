describe("NextAuth - Protected", () => {
  const user = "userA";
  before(() => {
    cy.setNextAuthSessionToken(user);
  });
  it("displays the protected page with user information", () => {
    cy.visit("/protected");

    cy.get("h1").should("contain", "Protected Page");
    cy.getNextAuthToken(user)
      .its("email")
      .then((email) => {
        cy.get(".header_signedInText__E_Qe9 > strong").should("contain", email);
      });
  });
});
