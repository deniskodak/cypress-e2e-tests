export class FormDatepickerPage {
  selectDateInCommonDatepickerFromToday(dayFromToday = 1) {
    const date = new Date();
    date.setDate(date.getDate() + dayFromToday);

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const expectedDate = this.#selectDateInDatepicker(date);
        cy.wrap(input).invoke("prop", "value").should("contain", expectedDate);
      });
  }

  selectRangeInCommonDatepickerFromToday(
    startDayFromToday = 1,
    lastDayFromToday = 1
  ) {
    const startDate = this.#generateDateFromToday(startDayFromToday);
    const lastDate = this.#generateDateFromToday(lastDayFromToday);

    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const startExpectedDate = this.#selectDateInDatepicker(startDate);
        const lastExpectedDate = this.#selectDateInDatepicker(lastDate);
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", startExpectedDate + " - " + lastExpectedDate);
      });
  }

  #selectDateInDatepicker = (date) => {
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
            .contains(new RegExp("\\s*" + futureDate + "\\s*", "g"))
            .click();
        }
      });

    return expectedDate;
  };

  #generateDateFromToday(dayFromToday) {
    const date = new Date();
    date.setDate(date.getDate() + dayFromToday);
    return date;
  }
}

export const onFormDatepickerPage = new FormDatepickerPage();
