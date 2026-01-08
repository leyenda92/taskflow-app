describe('Integración Frontend + Backend', () => {
  const projectName = 'Proyecto Integración';
  const projectName2 = 'Otro Proyecto';

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    cy.clearLocalStorage();
  });

  it('Inicia sesión y crea proyecto', () => {
    cy.login('test@test.com', 'password123');
    cy.createProject(projectName);
  });

  it('Muestra el proyecto en el dashboard', () => {
    cy.login('test@test.com', 'password123');
    cy.get('[data-cy=project-list]').contains(projectName).should('be.visible');
  });

  it('Edita un proyecto existente', () => {
  cy.login('test@test.com', 'password123');
  cy.createProject(projectName2);
  
  // Esperar a que aparezca y hacer click en el botón de editar
  cy.get('[data-cy=project-list]').contains(projectName2).should('be.visible');
  cy.wait(500);
  
  // Click en primer botón de la lista (editar)
  cy.get('[data-cy=project-item]').first().find('button').eq(0).click();
  
  // Cambiar nombre
  cy.get('input').filter('[class*="editInput"]').clear().type('Proyecto Editado');
  cy.get('button').contains('✅').click();
  
  cy.get('[data-cy=project-list]').contains('Proyecto Editado').should('be.visible');
});

  it('Elimina un proyecto con confirmación', () => {
    cy.login('test@test.com', 'password123');
    cy.createProject('Proyecto a Eliminar');
    
    // Stub del confirm
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });
    
    // Click en eliminar (botón 🗑️)
    cy.get('[data-cy=project-list]').contains('Proyecto a Eliminar').parent().find('button').last().click();
    
    cy.get('[data-cy=project-list]').contains('Proyecto a Eliminar').should('not.exist');
  });

  it('Cancela eliminación si no confirma', () => {
    cy.login('test@test.com', 'password123');
    cy.createProject('No Eliminar');
    
    // Stub del confirm retorna false
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(false);
    });
    
    cy.get('[data-cy=project-list]').contains('No Eliminar').parent().find('button').last().click();
    cy.get('[data-cy=project-list]').contains('No Eliminar').should('be.visible');
  });

  it('Busca proyectos por nombre', () => {
    cy.login('test@test.com', 'password123');
    cy.createProject('Alpha Project');
    cy.createProject('Beta Project');
    
    // Buscar "Alpha"
    cy.get('input[placeholder*="Buscar"]').type('Alpha');
    
    cy.get('[data-cy=project-list]').contains('Alpha Project').should('be.visible');
    cy.get('[data-cy=project-list]').contains('Beta Project').should('not.exist');
  });

  it('Muestra contador de proyectos', () => {
  cy.login('test@test.com', 'password123');
  
  // Verificar que el contador existe (puede tener cualquier número)
  cy.contains(/Total de proyectos: \d+/).should('be.visible');
});

  it('Ordena proyectos A-Z y Z-A', () => {
    cy.login('test@test.com', 'password123');
    cy.createProject('Zebra');
    cy.createProject('Alpha');
    
    // Ordenar A-Z
    cy.contains('A-Z').click();
    cy.get('[data-cy=project-item]').first().should('contain', 'Alpha');
    
    // Ordenar Z-A
    cy.contains('Z-A').click();
    cy.get('[data-cy=project-item]').first().should('contain', 'Zebra');
  });

  it('Crea proyecto con Enter', () => {
    cy.login('test@test.com', 'password123');
    
    cy.get('[data-cy=project-name]').type('Proyecto Enter{enter}');
    cy.get('[data-cy=project-list]').contains('Proyecto Enter').should('be.visible');
  });

it('Muestra estado vacío cuando no hay proyectos', () => {
  cy.login('test@test.com', 'password123');
  
  // Eliminar todos los proyectos existentes
  cy.window().then((win) => {
    cy.stub(win, 'confirm').returns(true);
  });
  
  cy.get('[data-cy=project-item]').then(($items) => {
    if ($items.length > 0) {
      // Eliminar todos
      cy.get('[data-cy=project-item]').each(() => {
        cy.get('[data-cy=project-item]').first().find('button').last().click();
        cy.wait(300);
      });
    }
  });
  
  cy.contains('No tienes proyectos todavía').should('be.visible');
});

  it('Cierra sesión correctamente', () => {
    cy.login('test@test.com', 'password123');
    
    cy.contains('Cerrar Sesión').click();
    cy.url().should('include', '/login');
  });

  it('Rechaza registro con datos inválidos', () => {
    cy.visit('/login');
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/register',
      body: { name: 'a', email: 'invalid', password: '123' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('Valida creación de proyecto con nombre corto', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      body: {
        email: 'test@test.com',
        password: 'password123',
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);

      const token = loginResponse.body.token;
      expect(token).to.exist;

      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/projects',
        body: { name: 'a' },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });

  it('Tiene headers de seguridad (Helmet)', () => {
    cy.request('http://localhost:3000/api/health').then((response) => {
      expect(response.headers).to.have.property('x-content-type-options');
      expect(response.headers).to.have.property('x-frame-options');
    });
  });
});