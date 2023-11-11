import { model } from "./Model.js";
import { MissionUtils } from "@woowacourse/mission-utils";

export class Badge {
  constructor() {
    model.badge = null;
    this.#badgePrint();
  }

  #badgePrint() {
    let totalEventPrice = model.discountprice + model.giftprice;
    this.#eachBadgePrint(totalEventPrice);
  }

  #eachBadgePrint(totalEventPrice) {
    let badgeList = ["별", "트리", "산타"];
    if (5000 <= totalEventPrice && totalEventPrice < 10000) {
      console.log(totalEventPrice)
      model.badge = badgeList[0]
    }
    if (10000 <= totalEventPrice && totalEventPrice < 20000) {
      console.log(totalEventPrice)
      model.badge = badgeList[1]
    }
    if (20000 < totalEventPrice) {
      model.badge = badgeList[2]
    }
  }
}