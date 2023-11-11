import { Console } from "@woowacourse/mission-utils";
import { Order } from "./Order.js";
import { Event } from "./Event.js";
import { Badge } from "./Badge.js";
import { model } from "./Model.js";

const OutputView = {
    printStartComment() {
        Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
    },

    printEventComment(date) {
        Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
    },

    printMenu(menu) {
        Console.print("\n<주문 메뉴>");
        new Order(menu);
    },

    printEvent(date) {
        new Event(date);
    },

    printTotalEventPrice() {
        const totalEventPrice = model.discountprice + model.giftprice;
        const formatPrice = formatCurrency(totalEventPrice);
        Console.print(`\n<총혜택 금액>\n${formatPrice}`);
    },

    printAfterDiscountPrice() {
        const afterDiscountPrice = model.totalprice - model.discountprice;
        const formatPrice = formatCurrency(afterDiscountPrice);
        Console.print(`\n<할인 후 예상 결제 금액>\n${formatPrice}`);
    },

    printBedge() {
        new Badge();
        let badge = model.badge;
        Console.print(`\n<12월 이벤트 배지>\n${badge}`);
    },
}

export default OutputView;

function formatCurrency(number) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    minimumFractionDigits: 0, 
    }).format(number).replace(/₩/g, '');
}