import { encode } from "next-auth/jwt";
describe('NextAuth - Admin', () => {
  before(() => {

    //cy.setCookie('next-auth.session-token', "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..gxNUKPiT3Ta8HO8B.EmpAuvlQ8s6Ul9bqikjxxZRN8-8yjuYRWW2f468Ct89Bb5OqYWC_z4n1zKX1BDqA6KAYV_mXhIU6VEDIcI3zyLXAPVLjvByKh0RjgJLIylTCUWJz-HalYbU20HQR6ycKLfCCSCzh5owi-Ww2wt0NabWndmicOP7YmldlcsI21JgeBLfHmBzMQC4oPcGEaktjRJPDTGL1CTSpoUmWxZiWcpB7Iyzr3MnS8sMPaodcfKu_eX7vFK-XFWE93GDbXewdisTDBslj3WAgOX9ItmY7c54jvhDzrl_1dRecWknoAwirD2H0SDzu4zxn3cXJ_o13WBvDrptUUSMfuuGLNFoG-_9eAGBxLq8csBzgidf9WnBSOYiO7_OdpbifPuCu3CRdCfF3_8dccw1rRxDeDXXpOOf34Ln8IrSrvlx2u0dOp2OOxiB9UVL-CiWnwGKIv3iskD0z8X_Rqb9IO4qTWJc.lYYRaJq1M961LEaMX-mOFQ")
    // cy.setCookie('next-auth.callback-url', 'http%3A%2F%2Flocalhost%3A3000%2F')
    // cy.setCookie('next-auth.csrf-token', '300c1cec6b7b92311af72bdaa011bcbc4eb659d65401eb398a23db8ad2168f1e%7C846fc5ff120f42f80dbb2f895e79d143b421879bf990e330a9ca5bf7fe382cb2')
    cy.fixture("mockNextAuthSessions").then(async (mockSessions) => {
      const adminJWT = mockSessions["adminJWT"];

      const signedAdminJWT = await encode({
        token:adminJWT,
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 30 * 365 * 24 * 60 * 60 // 30 years
      })
      cy.setCookie('next-auth.session-token', signedAdminJWT)
      // cy.intercept("GET", "/api/auth/session", {
      //   statusCode: 200,
      //   body: {
      //     ...mockSessions["admin"],
      //   },
      // }).as("getMockedSession");
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