import React from "react";
import { expect } from "code";
import { shallow } from "enzyme";
import App from "../../../src/component/App";
import * as pizzaService from "../../pizza";
import sinon from "sinon";

describe("App", () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });
  afterEach(() => {
    sinon.restore();
  });

  it("should be a <main>", () => {
    expect(component.type()).to.equal("main");
  });

  it("should have a default PizzaList state of empty string", () => {
    expect(component.state().pizzaList).to.equal([]);
  });
  it("should have a default filterPizzaList state of empty string", () => {
    expect(component.state().filterPizzaList).to.equal([]);
  });
  it("should be a <PizzaList>", () => {
    expect(component.find("PizzaList").exists()).to.be.true();
  });
  it("should be a <SortButton>", () => {
    expect(component.find("SortButton").exists()).to.be.true();
  });
  it("should be a <FilterList>", () => {
    expect(component.find("FilterList").exists()).to.be.true();
  });

  describe("when the componentDidMount() is triggered", () => {
    let fetchPizzalist;
    beforeEach(() => {
      fetchPizzalist = sinon.stub(pizzaService, "fetchPizza");
      fetchPizzalist.resolves({
        pizzas: [
          "Sausage",
          "Cheese",
          "Pepperoni",
          "Hawaiian",
          "vegetable",
          "3 cheeSe",
          "macaroni",
          "Chicken",
          "Sausage and Pepperoni"
        ]
      });
    });

    it("it should update the state", async () => {
      await component.instance().componentDidMount();
      expect(component.state().pizzaList).to.equal([
        "Sausage",
        "Cheese",
        "Pepperoni",
        "Hawaiian",
        "vegetable",
        "3 cheeSe",
        "macaroni",
        "Chicken",
        "Sausage and Pepperoni"
      ]);
    });
  });

  describe("when the handleSortButton is triggered", () => {
    it("it should Sort the state", async () => {
      let fetchPizzalist = sinon.stub(pizzaService, "fetchPizza");
      fetchPizzalist.resolves({
        pizzas: [
          "Sausage",
          "Cheese",
          "Pepperoni",
          "Hawaiian",
          "vegetable",
          "3 cheeSe",
          "macaroni",
          "Chicken",
          "Sausage and Pepperoni"
        ]
      });

      await component.instance().componentDidMount();

      component
        .find("SortButton")
        .props()
        .handleSortButton();

      expect(component.state().pizzaList).to.equal([
        "3 cheeSe",
        "Cheese",
        "Chicken",
        "Hawaiian",
        "Pepperoni",
        "Sausage",
        "Sausage and Pepperoni",
        "macaroni",
        "vegetable"
      ]);
    });
  });

  describe("when the filtering is triggered", () => {
    it("it should filter the state", async () => {
      let fetchPizzalist = sinon.stub(pizzaService, "fetchPizza");
      fetchPizzalist.resolves({
        pizzas: [
          "Sausage",
          "Cheese",
          "Pepperoni",
          "Hawaiian",
          "vegetable",
          "3 cheeSe",
          "macaroni",
          "Chicken",
          "Sausage and Pepperoni"
        ]
      });

      await component.instance().componentDidMount();

      component
        .find("FilterList")
        .props()
        .handleFilter("m");

      expect(component.state().pizzaList).to.equal(["macaroni"]);
    });
  });
});
