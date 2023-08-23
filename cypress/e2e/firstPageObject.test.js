import { onFormDatepickerPage } from "../support/page_object/formDatepickerPage";
import { onFormLayoutsPage } from "../support/page_object/formLayoutPage";
import { navigateTo } from "../support/page_object/navigatePage";
import { onSmartTablePage } from "../support/page_object/tableSmartTablePage";

describe("page object patter", () => {
  beforeEach(() => {
    cy.openHomePage()
  });

  it("verify page navigation across the pages", () => {
    navigateTo.formsLayoutsPage();
    navigateTo.formsDatepickerPage();
    navigateTo.modalsToasterPage();
    navigateTo.modalsTooltipPage();
    navigateTo.tablesSmartTablePage();
  });

  it("should submit Inline and Basic form and select tomorrow date", () => {
    navigateTo.formsLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      "Denys",
      "Denys@gmail.com",
      true
    );
    onFormLayoutsPage.submitBasicFormWithNameAndEmail(
      "Denys@gmail.com",
      "testpwd",
      true
    );
    navigateTo.formsDatepickerPage();
    onFormDatepickerPage.selectDateInCommonDatepickerFromToday(1);
    onFormDatepickerPage.selectRangeInCommonDatepickerFromToday(1, 3);
  });

  it.only("should change modify age, add new row and then delete it and apply search", () => {
    navigateTo.tablesSmartTablePage();
    onSmartTablePage.modifyAgeByFirstName("Larry", "25");
    onSmartTablePage.addRowWithFulLNameToTable("John", "Smith");
    onSmartTablePage.deleteRowByIndexInTable(0);
    onSmartTablePage.applyFilterByAge(35)
  });
});
