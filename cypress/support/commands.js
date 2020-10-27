// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

function routeGql(operationName, responseData) {
  const matcher = {
    method: "POST",
    pathname: "/graphql",
  };

  cy.route2(matcher, (request) => {
    // responseData could be 0 or false so check for undefined
    if (responseData === undefined) {
      // Not mocked, send the request to the server
      request.reply();
    } else {
      const parsedBody = JSON.parse(request.body);
      const response = {
        body: {
          data: {
            [operationName]:
              typeof responseData === "function"
                ? responseData(parsedBody.variables)
                : responseData,
          },
        },
      };
      // Reply with mock without making external request
      request.reply(response);
    }
  }).as(operationName);
}
Cypress.Commands.add("routeGql", routeGql);

beforeEach(() => {
  /**
   * Setup some default network responses:
   */

  // EpicPayJWT - return a different JWT based on the donationType
  cy.routeGql("epicPayJWT", (variables) =>
    variables.donationType === "giftCard" ? "mockGiftCardJWT" : "mockDirectJWT"
  );
});
