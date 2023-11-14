import { model } from "../database/Model.js";

export class Badge {
  constructor() {
    model.badge = "없음";
    this.#badgePrint();
  }

  #badgePrint() {
    const totalEventPrice = model.discountprice + model.giftprice;
    this.#eachBadgeStorage(totalEventPrice);
  }

  #eachBadgeStorage(totalEventPrice) {
    const badgeList = ["별", "트리", "산타"];
    switch (true) {
      case (5000 <= totalEventPrice && totalEventPrice < 10000):
        model.badge = badgeList[0];
        break;
      case (10000 <= totalEventPrice && totalEventPrice < 20000):
        model.badge = badgeList[1];
        break;
      case (20000 <= totalEventPrice):
        model.badge = badgeList[2];
        break;
    }
  }
}
