import { model } from "./Model.js";
import { MissionUtils } from "@woowacourse/mission-utils";

export class Badge {
  constructor() {
    this.#badgePrint();
  }

  #badgePrint() {
    let totalEventPrice = model.discountprice + model.giftprice;
    console.log(totalEventPrice)
    this. #eachBadgePrint(totalEventPrice);
  }

  #eachBadgePrint(totalEventPrice) {
    let badgeList = ["별", "트리", "산타"];
    if (5000 <= totalEventPrice < 10000) {
      MissionUtils.Console.print(`${badgeList[0]}`);
    }
    if (10000 <= totalEventPrice < 20000) {
      MissionUtils.Console.print(`${badgeList[1]}`);
    }
    if (20000 < totalEventPrice) {
      MissionUtils.Console.print(`${badgeList[2]}`);
    }
  }
}