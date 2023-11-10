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
}