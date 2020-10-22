/// <reference types="cypress" />
describe("page", () => {
  it("with mocked cy.route2 respone, there is no request body in cy.wait", () => {
    const intercept = {
      method: "POST",
      pathname: "/graphql",
    };
    const response = {
      body: {
        data: {
          hello: "world",
        },
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    cy.route2(intercept, response).as("gql");
    cy.visit(
      "https://mapstaging.tacklehunger.org/donate?site=recOJoeAptDHrjhOC"
    );
    cy.wait("@gql").then((request) => console.log(request));
  });
  it("with NON-mocked cy.route2 respone, there is a request body in cy.wait", () => {
    const intercept = {
      method: "POST",
      pathname: "/graphql",
    };
    cy.route2(intercept).as("gql");
    cy.visit(
      "https://mapstaging.tacklehunger.org/donate?site=recOJoeAptDHrjhOC"
    );
    cy.wait("@gql").then((request) => console.log(request));
  });
});
