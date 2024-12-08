describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca todas as tarefas como completas', () => {
    cy.visit(''); 

    // Inserindo tarefas
    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    // Marcando todas as tarefas como completas
    cy.get('[data-cy=toggle-all]')
      .click();

    // Verifica se todas as tarefas estão marcadas como completas
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .each(($el) => {
        cy.wrap($el).should('be.checked');
      });
  });


  it('Limpa tarefa completas', () => {
    cy.visit(''); 

    // Inserindo tarefas
    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    // Marcando todas as tarefas como completas
    cy.get('[data-cy=toggle-all]')
      .click();

    // Insere mais uma tarefa
    cy.get('[data-cy=todo-input]')
      .type('Outra tarefa{enter}');

    // Limpando tarefas completas
    cy.get('[data-cy=clear-completed]')
      .click();

    // Verifica se apenas a tarefa adicionada por ultimo ainda existe
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

  });
});