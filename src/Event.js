import { model } from "./database/Model.js";

export class Event {
  constructor(date) {
    this.#initialize();
    if (model.totalprice >= 10000) {
      this.#eventPlaner(date);
      return true;
    }
    return false;
  }

  #initialize() {
    model.discountprice = 0;
    model.giftprice = 0;
    model.eventDiscountList = [0, 0, 0, 0]; // 디데이, 평일, 주말, 특별
  }

  #eventPlaner(date) {
    this.date = Number(date);
    if (this.date > 25) {
      this.#afterChrismas();
      return true;
    }
    this.#beforeChrismas();

    if (model.totalprice >= 120000) {
      model.giftprice = 25000;
    }
  }

  #beforeChrismas() {
    this.#dDayDiscount();
    this.#weekDiscount();
    this.#specialDiscount();
  }

  #afterChrismas() {
    this.#weekDiscount();
    this.#specialDiscount();
  }

  #dDayDiscount() {
    let discounts = 1000;
    discounts += (this.date - 1) * 100;

    model.discountprice += discounts;
    model.eventDiscountList[0] += discounts;
  }

  #weekDiscount() {
    const weekend = this.#weekendCalculator(this.date);
    if (weekend === true) {
      this.#weekendDiscount();
      return true;
    }
    this.#weekdayDiscount();
  }

  #weekdayDiscount() {
    if (model.menuCount[2] !== 0) {
      // 디저트 주문이 있다면
      let counts = model.menuCount[2];
      model.discountprice += 2023 * counts;
      model.eventDiscountList[1] += 2023 * counts;
    }
  }

  #weekendDiscount() {
    if (model.menuCount[1] !== 0) {
      // 메인 주문이 있다면
      let counts = model.menuCount[1];
      model.discountprice += 2023 * counts;
      model.eventDiscountList[2] += 2023 * counts;
    }
  }

  #specialDiscount() {
    const specialDay = this.#specialCalculator(this.date);
    if (specialDay === true) {
      model.discountprice += 1000;
      model.eventDiscountList[3] += 1000;
    }
  }

  #weekendCalculator(date) {
    if ((date - 1) % 7 === 0 || (date - 2) % 7 === 0) {
      return true;
    }
    return false;
  }

  #specialCalculator(date) {
    if ((date - 3) % 7 === 0 || date === 25) {
      return true;
    }
    return false;
  }
}
