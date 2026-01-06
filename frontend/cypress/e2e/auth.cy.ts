describe('Auth Flow', () => {
  it('logs in and creates project', () => {
    cy.login('test@test.com', '123456');
    cy.createProject('Proyecto Cypress', 'Descripción E2E');
  });
});
