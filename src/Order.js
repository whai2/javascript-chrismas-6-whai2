import { MissionUtils } from "@woowacourse/mission-utils";

export class Order {
  #order //-를 포함하는 문자열

  constructor(orders) {
    this.orders = orders;
    this.#splitAsCommas(orders);
  }

  #splitAsCommas(orders) {
    const split = orders.split(',');
    
    for (let i = 0; i < split.length; i++) {
      this.#splitAsDash(split[i]);
    }
  }

  #splitAsDash(order) {
    const split = order.split('-');
    MissionUtils.Console.print(`${split[0]} ${split[1]}개`);
  }
}