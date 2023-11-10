import { menu } from "./Menu.js";

export class OrderError {

  constructor(orders) {
    this.#formatValidate(orders);
    this.orders = orders;
  }

  #formatValidate(orders) {
    if (/^[가-힣ㄱ-ㅎa-zA-Z]+\-\d+(,|$)(?! )/.test(orders)) {
      return orders
    }
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }

  #numberValidate(number) {
    if (/^[+]?[1-9]\d*$/.test(number)) {
      return Number(number);
    } 
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }

  menusValidate(orders) {
    let totalCount = 0;
    for (let i = 0; i < orders.length; i++) {
      const eachOrder = orders[i];
      this.#menuValidate(eachOrder[0]);
      totalCount += this.#numberValidate(eachOrder[1]);
      
    }
    this.#menuDuplicateValidate(orders);
    this.#totalCountValidate(totalCount);
  }

  #menuValidate(order) {
    let finalvelidate = 0;
    for (const category in menu) {
      const valdateNumber = this.#eachMenuValidate(menu[category], order);
      finalvelidate += valdateNumber;
    }
    if (finalvelidate === 0) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  #eachMenuValidate(category, order) {
    for (const eachMenu in category) {
      if (eachMenu === order) {
        return 1;
      }
    }
    return 0;
  }

  #menuDuplicateValidate(orders) {
    for (let i = 0; i < orders.length-1; i++) {
      if (orders[i][0] === orders[i+1][0]) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    }
  }

  #totalCountValidate(number) {
    if (number > 20) {
      throw new Error("[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.");
    }
  }
}