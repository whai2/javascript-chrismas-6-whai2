import { MissionUtils } from "@woowacourse/mission-utils";
import { Counter } from "./Counter.js";
import { model } from "./Model.js";

export class Order {
  constructor(orders) {
    this.orders = orders;
    this.counter = new Counter();
    this.#splitAsCommas(orders);
  }

  #splitAsCommas(orders) {
    const split = orders.split(',');
    model.totalOrder = [];
    for (let i = 0; i < split.length; i++) {
      const order = this.#splitAsDash(split[i]);
      model.totalOrder.push(order);
    }

    this.counter.totalMenuCounter(model.totalOrder);
  }

  #splitAsDash(order) {
    const split = order.split('-');
    return split;
  }

  #formatCurrency(number) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    minimumFractionDigits: 0, 
    }).format(number).replace(/₩/g, '');
  }

  #totalPricePrint() {
    const formatPrice = this.#formatCurrency(model.totalprice);
    MissionUtils.Console.print(`\n<할인 전 총주문 금액>\n${formatPrice}원`);
  }
}