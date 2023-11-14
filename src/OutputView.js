import { Console } from "@woowacourse/mission-utils";
import { Badge } from "./Badge.js";
import { model } from "./database/Model.js";

const OutputView = {
  printStartComment() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },

  printEventComment(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`
    );
  },

  printMenu() {
    Console.print("\n<주문 메뉴>");
    for (let i = 0; i < model.totalOrder.length; i++) {
      const eachCount = model.totalOrder[i];
      Console.print(`${eachCount[0]} ${eachCount[1]}개`);
    }
  },

  totalPricePrint() {
    const formatPrice = formatCurrency(model.totalprice);
    Console.print(`\n<할인 전 총주문 금액>\n${formatPrice}원`);
  },

  giftEventListPrint() {
    if (model.totalprice >= 120000) {
      Console.print(`\n<증정 메뉴>\n샴페인 1개`);
      return true;
    }
    Console.print(`\n<증정 메뉴>\n없음`);
  },

  discountPrint() {
    Console.print("\n<혜택 내역>");
    let eventList = [
      "크리스마스 디데이 할인",
      "평일 할인",
      "주말 할인",
      "특별 할인",
    ];
    for (let i = 0; i < eventList.length; i++) {
      if (model.eventDiscountList[i] !== 0) {
        const formatDiscount = formatCurrency(model.eventDiscountList[i]);
        Console.print(`${eventList[i]}: -${formatDiscount}원`);
      }
    }
  },

  giftEventPrint() {
    if (model.totalprice >= 120000) {
      Console.print("증정 이벤트: -25,000원");
    }
  },

  printTotalEventPrice() {
    const totalEventPrice = model.discountprice + model.giftprice;
    const formatPrice = formatCurrency(totalEventPrice);
    Console.print(`\n<총혜택 금액>\n${formatPrice}원`);
  },

  printAfterDiscountPrice() {
    const afterDiscountPrice = model.totalprice - model.discountprice;
    const formatPrice = formatCurrency(afterDiscountPrice);
    Console.print(`\n<할인 후 예상 결제 금액>\n${formatPrice}원`);
  },

  printBedge() {
    new Badge();
    Console.print(`\n<12월 이벤트 배지>\n${model.badge}`);
  },
};

export default OutputView;

function formatCurrency(number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace(/₩/g, "");
}
