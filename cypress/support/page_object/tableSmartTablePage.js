export class TableSmartTablePage {
  modifyAgeByFirstName(name = "", age = 0) {
    cy.get("tbody")
      .contains("tr", name)
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", age);
      });
  }

  addRowWithFulLNameToTable(firstName = "", lastName = "") {
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName);
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName);
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
  }

  deleteRowByIndexInTable(index = 0) {
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .eq(index)
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });
  }

  applyFilterByAge(age = 0) {
    cy.get("thead")
      .find("tr")
      .eq(1)
      .find('[placeholder="Age"]')
      .clear()
      .type(age);
    cy.wait(500);
    cy.get("tbody tr").each((tableRow) => {
      cy.wrap(tableRow).find("td").eq(6).should("contain", age);
    });
  }
}

export const onSmartTablePage = new TableSmartTablePage();
