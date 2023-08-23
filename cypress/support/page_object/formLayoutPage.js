export class FormLayoutPage {
  submitInlineFormWithNameAndEmail(name, email, withCheckbox = false) {
    cy.contains("nb-card", "Inline")
      .find("form")
      .then((form) => {
        cy.wrap(form).find('[placeholder="Jane Doe"]').clear().type(name);
        cy.wrap(form).find('[placeholder="Email"]').clear().type(email);
        if (withCheckbox) {
          cy.wrap(form).find('input[type="checkbox"]').check({ force: true });
        }
        cy.wrap(form).submit();
      });
  }

  submitBasicFormWithNameAndEmail(email, password, withCheckbox = false) {
    cy.contains("nb-card", "Basic")
      .find("form")
      .then((form) => {
        cy.wrap(form).find('[placeholder="Email"]').clear().type(email);
        cy.wrap(form).find('[placeholder="Password"]').clear().type(password);
        if (withCheckbox) {
          cy.wrap(form).find('input[type="checkbox"]').check({ force: true });
        }
        cy.wrap(form).submit();
      });
  }
}

export const onFormLayoutsPage = new FormLayoutPage();
