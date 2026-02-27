const selectors = require('../utils/selectors');

class NavigationPage {
  goToProfile() {
    cy.get(selectors.navigation.profileMenuItem).scrollIntoView();

    cy.get(selectors.navigation.profileMenuItem).should('be.visible');

    cy.get(selectors.navigation.profileMenuItem).click();
  }
}

module.exports = new NavigationPage();
