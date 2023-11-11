export class DiscountEvent {
  constructor(date, totalprice) {
    this.date = Number(date);
    this.totalprice = totalprice;

    if (this.date > 25) {
      this.#afterChrismas(totalprice);
      return true;
    }
    this.#beforeChrismas(totalprice);
  }

  #beforeChrismas(totalprice) {
    this.dDayDiscount();
    this.weekdayDiscount();
    this.weekendDiscount();
    this.specialDiscount();
  }

  #afterChrismas(totalprice) {
    this.weekdayDiscount();
    this.weekendDiscount();
    this.specialDiscount();
  }
}

export class GiftEvnet {
  constructor(totalprice) {

  }
}