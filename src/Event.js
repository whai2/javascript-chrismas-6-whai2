import { model } from "./Model.js";

export class Event {
  constructor(date) {
    this.date = Number(date);

    if (this.date > 25) {
      this.#afterChrismas(model.totalprice);
      return true;
    }
    this.#beforeChrismas(model.totalprice);
  }

  #beforeChrismas(totalprice) {
    this.dDayDiscount(totalprice);
    this.weekdayDiscount(totalprice);
    this.weekendDiscount(totalprice);
    this.specialDiscount(totalprice);
  }

  #afterChrismas(totalprice) {
    this.weekdayDiscount(totalprice);
    this.weekendDiscount(totalprice);
    this.specialDiscount(totalprice);
  }

  #dDayDiscount(totalprice) {

  }

  #weekdayDiscount(totalprice) {

  }

  #weekendDiscount(totalprice) {

  }

  #specialDiscount(totalprice) {

  }
}

class GiftEvent {

}