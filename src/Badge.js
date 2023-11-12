import { model } from "./Model.js";

export class Badge {
  constructor() {
    model.badge = null;
    this.#badgePrint();
  }

  #badgePrint() {
    const totalEventPrice = model.discountprice + model.giftprice;
    this.#eachBadgePrint(totalEventPrice);
  }

  #eachBadgePrint(totalEventPrice) {
    const badgeList = ["별", "트리", "산타"];
    if (5000 <= totalEventPrice && totalEventPrice < 10000) {
      model.badge = badgeList[0]
    }
    if (10000 <= totalEventPrice && totalEventPrice < 20000) {
      model.badge = badgeList[1]
    }
    if (20000 <= totalEventPrice) {
      model.badge = badgeList[2]
    }
  }
}