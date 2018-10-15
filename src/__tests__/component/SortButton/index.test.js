import React from "react";
import { expect } from "code";
import { shallow } from "enzyme";
import SortButton from "../../../component/SortButton";
import sinon from "sinon";

describe("Given SortButton", () => {
  let component;
  let handleSortSpy;
  beforeEach(() => {
    handleSortSpy = sinon.spy();
    component = shallow(<SortButton handleSort={handleSortSpy} />);
  });

  it("should exist as 'form'", () => {
    expect(component.is("form.sortbutton")).to.be.true();
  });
  it("should contain a <button> and text <search>", () => {
    expect(component.find("button.pizzaSort")).to.have.length(1);
  });
  describe("When the Sort button is clicked", () => {
    beforeEach(() => {
      component.simulate("onClick", { preventDefault: sinon.spy() });
    });
  });
});
