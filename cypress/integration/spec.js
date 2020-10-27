/// <reference types="cypress" />

describe("Donations Page UI", () => {
  it("Disables cash option for a non-Merchant Site", () => {
    cy.visit("https://map.tacklehunger.org/donate?site=recztyRtmqwnzFPG2");
    cy.wait("@epicPayJWT");

    // Check the cash button is disabled
    cy.get("form").within(() => {
      cy.contains("Cash").should("be.disabled");
    });
  });
});

describe("Donations Page Requests", () => {
  beforeEach(() => {});

  it("Makes a direct donation using a card", () => {
    cy.visit("https://map.tacklehunger.org/donate?site=recztyRtmqwnzFPG2");
    cy.wait("@epicPayJWT");
  });
});
