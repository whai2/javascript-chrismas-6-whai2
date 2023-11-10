import { MissionUtils } from "@woowacourse/mission-utils";
import { menu } from "./Menu.js";

export class Order {
  #order //-를 포함하는 문자열

  constructor(orders) {
    this.orders = orders;
    this.#splitAsCommas(orders);
  }

  #splitAsCommas(orders) {
    const split = orders.split(',');
    
    const totalOrder = [];
    for (let i = 0; i < split.length; i++) {
      const order = this.#splitAsDash(split[i]);
      totalOrder.push(order);
    }

    this.#totalPrice(totalOrder);
  }

  #splitAsDash(order) {
    const split = order.split('-');
    const counts = this.#countValidater(split[1])

    MissionUtils.Console.print(`${split[0]} ${counts}개`);

    return split;
  }

  #totalPrice(totalOrder) {
    let totalprice = 0;
    for (let i = 0; i < totalOrder.length; i++) {
      const eachOrder = totalOrder[i];
      const orderPrice = this.#orderPrice(eachOrder[0], eachOrder[1]);
      totalprice += orderPrice;
    }

    const formatPrice = this.#formatCurrency(totalprice);
    MissionUtils.Console.print(`${formatPrice}원`);
  }

  #orderPrice(name, counts) {
    let orderprice = 0;
    for (const category in menu) {
      const eachPrice = this.#eachPrice(menu[category], name, counts)
      orderprice += eachPrice;
    }
    return orderprice;
  }

  #eachPrice(category, name, counts) {
    for (const eachMenu in category) {
      if (eachMenu === name) {
        const price = category[eachMenu];
        return Number(price * counts);
      }
    }
    return 0;
  }

  #countValidater(number) {
    if (/^[+]?[1-9]\d*$/.test(number)) {
      return Number(number);
    } 
    throw new Error(errorComments.bonus[0]);
  }

  #formatCurrency(number) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    minimumFractionDigits: 0, 
    }).format(number).replace(/₩/g, '');
  }
}