/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      createProject(name: string, description?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');

  cy.get('[data-cy=email-input]').type(email, { delay: 150 });
  cy.get('[data-cy=password-input]').type(password, { delay: 150 });

  cy.get('[data-cy=login-submit]').click();
  cy.url().should('include', '/dashboard');

  cy.wait(10000);
});

Cypress.Commands.add('createProject', (name, description = '') => {
  cy.wait(1000);
  
  cy.get('[data-cy=project-name]').type(name, { delay: 100 });
  cy.get('[data-cy=create-project-btn]').click();
  
  cy.wait(500);
  cy.get('[data-cy=project-list]').contains(name).should('be.visible');
});