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
    
    let totalprice = 0;
    for (let i = 0; i < split.length; i++) {
      const totalPrice = this.#splitAsDash(split[i]);
      totalprice += totalPrice;
    }

    const formatPrice = this.#formatCurrency(totalprice);
    MissionUtils.Console.print(`${formatPrice}원`);
  }

  #splitAsDash(order) {
    const split = order.split('-');
    const counts = this.#countValidater(split[1])

    MissionUtils.Console.print(`${split[0]} ${counts}개`);

    const totalPrice = this.#totalPrize(split[0], counts);
    return totalPrice;
  }

  #totalPrize(name, counts) {
    let totalprice = 0;
    for (const category in menu) {
      const eachPrice = this.#eachPrice(menu[category], name, counts)
      totalprice += eachPrice;
    }
    return totalprice;
  }

  #eachPrice(category, name, counts) {
    for (const eachMenu in category) {
      if (eachMenu === name) {
        const price = category[eachMenu];
        console.log(price * counts)
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