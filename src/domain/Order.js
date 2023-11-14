import { Counter } from "./Counter.js";
import { model } from "../database/Model.js";

export class Order {
  constructor(orders) {
    this.orders = orders;
    this.counter = new Counter();
    this.#splitAsCommas(orders);
  }

  #splitAsCommas(orders) {
    const split = orders.split(",");
    model.totalOrder = [];
    for (let i = 0; i < split.length; i++) {
      const order = this.#splitAsDash(split[i]);
      model.totalOrder.push(order);
    }

    this.counter.totalMenuCounter(model.totalOrder);
  }

  #splitAsDash(order) {
    const split = order.split("-");
    return split;
  }
}
