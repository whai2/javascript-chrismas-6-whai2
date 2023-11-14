import { menu } from "../database/Menu.js";
import { model } from "../database/Model.js";

export class OrderError {
  constructor(orders) {
    this.#formatValidate(orders);
    this.orders = orders;
  }

  #formatValidate(orders) {
    if (/^[가-힣ㄱ-ㅎa-zA-Z]+\-\d+(,|$)(?! )/.test(orders)) {
      return orders;
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
    for (let i = 0; i < orders.length; i++) {
      const eachOrder = orders[i];
      this.#menuValidate(eachOrder[0]);
      this.#numberValidate(eachOrder[1]);
    }
    this.#menuDuplicateValidate(orders);
  }

  #menuValidate(order) {
    let existmenu = 0;
    for (const category in menu) {
      existmenu += this.#eachMenuValidate(menu[category], order);
    }
    this.#noExistMenu(existmenu);
  }

  #eachMenuValidate(category, order) {
    for (const eachMenu in category) {
      if (eachMenu === order) {
        return 1;
      }
    }
    return 0;
  }

  #noExistMenu(number) {
    if (number === 0) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  #menuDuplicateValidate(orders) {
    for (let i = 0; i < orders.length - 1; i++) {
      if (orders[i][0] === orders[i + 1][0]) {
        throw new Error(
          "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
        );
      }
    }
  }

  totalCountOverValidate() {
    if (model.totalcounts > 20) {
      throw new Error(
        "[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다."
      );
    }
  }

  onlyBeverageValidate() {
    for (let i = 1; i < model["menuCount"].length; i++) {
      if (model.menuCount[i] !== 0) {
        return true;
      }
    }
    throw new Error(
      "[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요."
    );
  }
}
