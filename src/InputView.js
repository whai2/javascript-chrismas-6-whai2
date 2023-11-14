import { Console } from "@woowacourse/mission-utils";
import { EventError } from "./EventError.js";
import { OrderError } from "./OrderError.js";
import { Order } from "./Order.js";
import { model } from "./database/Model.js";

const InputView = {
  async readDate() {
    const inputDate = await Console.readLineAsync(
      "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)"
    );
    new EventError(inputDate);
    return inputDate;
  },

  async readMenu() {
    const inputMenu = await Console.readLineAsync(
      "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)"
    );

    const error = new OrderError(inputMenu);
    new Order(inputMenu);
    error.menusValidate(model.totalOrder);
    error.onlyBeverageValidate();
    error.totalCountOverValidate();

    return inputMenu;
  },
};

export default InputView;
