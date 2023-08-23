export class NavigationPage {
  formsLayoutsPage() {
    this.#selectGroupMenuItem("Form");
    cy.contains("Form Layouts").click();
  }

  formsDatepickerPage() {
    this.#selectGroupMenuItem("Form");
    cy.contains("Datepicker").click();
  }

  tablesSmartTablePage() {
    this.#selectGroupMenuItem("Tables & Data");
    cy.contains("Smart Table").click();
  }

  modalsToasterPage() {
    this.#selectGroupMenuItem("Modal & Overlays");
    cy.contains("Toastr").click();
  }

  modalsTooltipPage() {
    this.#selectGroupMenuItem("Modal & Overlays");
    cy.contains("Tooltip").click();
  }

  #selectGroupMenuItem(groupName) {
    cy.contains("a", groupName).then((menuItem) => {
      cy.wrap(menuItem)
        .find(".expand-state g g")
        .invoke("attr", "data-name")
        .then((attr) => {
          if (attr.includes("left")) {
            cy.wrap(menuItem).click();
          }
        });
    });
  }
}

export const navigateTo = new NavigationPage();
