describe('Integración Frontend + Backend', () => {
  const projectName = 'Proyecto Integración';

  it('Inicia sesión y crea proyecto', () => {
    cy.login('test@test.com', 'password123');
    cy.createProject(projectName);
  });

  it('Muestra el proyecto en el dashboard', () => {
    cy.login('test@test.com', 'password123');
    cy.get('[data-cy=project-list]').contains(projectName).should('be.visible');
  });
});
