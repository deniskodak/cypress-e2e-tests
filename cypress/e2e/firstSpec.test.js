/// < reference types="cypress" />

import { navigateTo } from "../support/page_object/navigatePage";

const selectDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const futureDate = date.getDate();
  const futureMonth = date.toLocaleDateString("default", {
    month: "short",
  });
  const expectedDate =
    futureMonth + " " + futureDate + ", " + date.getFullYear();

  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then((dateString) => {
      if (!dateString.includes(futureMonth)) {
        cy.get("[data-name='chevron-right']").click();
        selectDate();
      } else {
        cy.get("nb-calendar-day-picker")
          .contains(new RegExp("^" + futureDate + "$", "g"))
          .click();
      }
    });

  return expectedDate;
};

describe("Test", () => {
  it.skip("first test", () => {
    cy.visit("/");
    navigateTo.formsLayoutsPage()

    cy.get('input[data-cy="inputEmail1"]');
  });

  it("find button by its parent", () => {
    cy.visit("/");
    navigateTo.formsLayoutsPage()

    cy.contains("nb-card", "Block form")
      .find("button")
      .should("contain", "Submit");
  });

  it("find button and checkbox inside by unique element and its parent", () => {
    cy.visit("/");
    navigateTo.formsLayoutsPage()

    cy.get("#inputEmail3")
      .parents("form")
      .find('button[status="warning"]')
      .should("contain", "Sign in")
      .parents("form")
      .find(".custom-checkbox")
      .click();
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    navigateTo.formsLayoutsPage()

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email') // "should" is cypress assertion

    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    cy.contains("nb-card", "Using the Grid").then((form) => {
      // form is a JQUERY element not cypress
      const emailLabel = form.find('[for="inputEmail1"]').text();
      const pwdLabel = form.find('[for="inputPassword2"]').text();
      expect(emailLabel).to.equal("Email"); // Chai assertion
      expect(pwdLabel).to.equal("Password"); // Chai assertion

      cy.contains("nb-card", "Basic form").then((basicForm) => {
        const pwdLabelInBasicForm = basicForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(pwdLabel).to.equal(pwdLabelInBasicForm);

        // return basicForm from JQUERY to cypress context
        cy.wrap(basicForm)
          .find('[for="exampleInputEmail1"]')
          .should("contain", "Email address");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    navigateTo.formsLayoutsPage()

    // assert text via should
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    // assert text via chai and jQUERY
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
    });

    // invoking text
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    // invoking class
    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      .then((classList) => {
        expect(classList).to.contain("checked");
      });
  });

  it("assert property", () => {
    cy.visit("/");
    navigateTo.formsDatepickerPage()

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const expectedDate = selectDate();
        cy.wrap(input).invoke("prop", "value").should("contain", expectedDate);
      });
  });

  it("check radio-buttons", () => {
    cy.visit("/");
    navigateTo.formsLayoutsPage()

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).first().should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check checkboxes", () => {
    cy.visit("/");
    navigateTo.modalsToasterPage()

    cy.get("[type='checkbox']").check({ force: true });
  });

  it("check dropdown and its list", () => {
    cy.visit("/");

    const bodyThemeClasses = {
      Light: "nb-theme-default",
      Dark: "nb-theme-dark",
      Cosmic: "nb-theme-cosmic",
      Corporate: "nb-theme-corporate",
    };

    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((optionLabel, index, arr) => {
        const optionText = optionLabel.text().trim();
        cy.wrap(optionLabel).click();

        cy.wrap(dropdown).should("contain", optionText);
        cy.get("body")
          .invoke("attr", "class")
          .should("contain", bodyThemeClasses[optionText]);
        if (index < arr.length - 1) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("check the table", () => {
    cy.visit("/");
    navigateTo.tablesSmartTablePage()
    // changing row col value
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });
    // adding new row
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Denys");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Kodak");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
    // check row is added
    cy.get("tbody")
      .find("tr")
      .first()
      .find("td")
      .then((tableCols) => {
        cy.wrap(tableCols).eq(2).should("contain", "Denys");
        cy.wrap(tableCols).eq(3).should("contain", "Kodak");
      });
    // check filter is working
    const ages = [20, 30, 40];

    cy.wrap(ages).each((age) => {
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
    });
  });

  it("check tooltip", () => {
    cy.visit("/");
    navigateTo.modalsTooltipPage()

    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });

  it.only("check native Alert", () => {
    cy.visit("/");
    navigateTo.tablesSmartTablePage()

    cy.get("tbody tr").first().find(".nb-trash").click();

    // bad practice
    cy.on("window:confirm", (confirm) => {
      // if confirm will not appear this code will never triggered and won't fail the test
      expect(confirm).to.equal("Are you sure you want to delete?");
    });

    // good practice
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr").first().find(".nb-trash").click().then(()=> {
        expect(stub.getCall(0)).to.be.calledWith("Are you sure you want to delete?")
    })

  });
});
