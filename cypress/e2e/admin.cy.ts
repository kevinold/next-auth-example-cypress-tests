describe('NextAuth - Admin', () => {
  before(() => {

    cy.setCookie('next-auth.session-token', "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..uFc8bmJwftldFb3c.Kijn8KXCj0FR-j4lc6WCw9wayuwjWHmmw7eqtU4dDFkl7CcIXxNJUxtoVOpFfK1ofz74B2kjzOZ5tm2WaQ88x9sSQVLc1vlLNbrwD97S4AfdtiSRMLRiPxqd9Ctehc9nv-UNFQEzMjE6Xpn9BDTzCbex4cFR7KCrJcYlDHQTOufec_y8riP9xydxv8A00L2Y3McU45HfTvg65nBR5WYoIxuHzgSnWCFXhguWYN8M86gkiKvAhIfxxm8N6OLjqLXaxZCCcPrwYcTIgKLyk9P5vwBTyf9wp2paRRa-aGhRyHiNp_AXVFw-klgmKIrC8BqTGBAuVor2AGdUDkipnRKbp78jgERlkpE9MXwnt55R-ZoVmWwQoVifk0-UZIfVARpurg5f5dFYxNkGJwuxxzycGgM87UGQvwxlTGPV1md8_zv80x-P0eVc2Z7ySQ.HRT_IkAZryb-zQuVd16KAQ")
    // cy.setCookie('next-auth.callback-url', 'http%3A%2F%2Flocalhost%3A3000%2F')
    // cy.setCookie('next-auth.csrf-token', '300c1cec6b7b92311af72bdaa011bcbc4eb659d65401eb398a23db8ad2168f1e%7C846fc5ff120f42f80dbb2f895e79d143b421879bf990e330a9ca5bf7fe382cb2')
    cy.intercept({url: '/admin', middleware: true}, (req) => {
      req.continue((res) => {
        // 'res' represents the real destination response
        // you can manipulate 'res' before it's sent to the browser
        res.statusCode = 200
        res.headers.location = '/admin'
      })
      // req.reply((res) => {
      //   expect(res.statusCode).to.equal(307)
      //   // the server wants to redirect us to another domain
      //   expect(res.headers).to.have.property('location', '/api/auth/signin?callbackUrl=%2Fadmin')
      //   res.statusCode = 200
      //   res.headers.location = '/admin'
      //   // need to provide something for the updated "res"
      //   // object to be used
      //   // https://github.com/cypress-io/cypress/issues/9555
      //   res.send(200, 'stay here')
      // })
    })

    cy.fixture("mockNextAuthSessions").then((mockSessions) => {
      cy.intercept("GET", "/api/auth/session", {
        statusCode: 200,
        body: {
          ...mockSessions["admin"],
        },
      }).as("getMockedSession");
    });
    // cy.intercept('/admin', (req) => {
    //   // dynamically get billing plan name at request-time
    //   const planName = getPlanName()
    //   // this object will automatically be JSON.stringified and
    //   // sent as the response
    //   req.reply({ plan: planName })
    // })
    // cy.intercept(
    //   {
    //     url: 'http://localhost:3000/**',
    //     middleware: true,
    //   },
    //   (req) => {
    //     req.on('response', (res) => {
    //       // Throttle the response to 1 Mbps to simulate a
    //       // mobile 3G connection
    //       res.setThrottle(1000)
    //     })
    //   }
    // )
  });
  it('passes', () => {
    cy.visit('/admin')

    //cy.wait("@getMockedSession");
    cy.get('p').first().should('contain', 'Only admin users can see this page.')
  })
})