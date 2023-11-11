import { MissionUtils } from "@woowacourse/mission-utils";
import { menu } from "./Menu.js";
import { OrderError } from "./OrderError.js";
import { Counter } from "./Counter.js";
import { model } from "./Model.js";

export class Order {
  constructor(orders) {
    this.orders = orders;
    //1차 점검
    this.error = new OrderError(orders);
    this.counter = new Counter();
    this.#splitAsCommas(orders);
  }

  #splitAsCommas(orders) {
    const split = orders.split(',');
    
    const totalOrder = [];
    for (let i = 0; i < split.length; i++) {
      const order = this.#splitAsDash(split[i]);
      totalOrder.push(order);
    }

    // 2차 점검
    this.error.menusValidate(totalOrder);
    this.counter.totalMenuCounter(totalOrder);
    this.#totalPricePrint();
    //this.#totalPrice(totalOrder);
  }

  #splitAsDash(order) {
    const split = order.split('-');
    const counts = Number(split[1])

    MissionUtils.Console.print(`${split[0]} ${counts}개`);

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
    MissionUtils.Console.print(`${formatPrice}원`);
  }
}