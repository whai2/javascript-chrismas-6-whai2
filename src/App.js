import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { model } from "./Model.js";
import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      OutputView.printStartComment();
      await this.input();
    } catch (e) {
      Console.print(e.message);
    }
  }

  async input() {
    const inputDate = await InputView.readDate();
    const inputMenu = await InputView.readMenu();

    this.output(inputDate, inputMenu);
  }

  output(inputDate, inputMenu) {
    OutputView.printEventComment(inputDate);
    OutputView.printMenu(inputMenu);
    OutputView.totalPricePrint();

    new Event(inputDate);
    this.#eventOutput();

    OutputView.printBedge();
  }

  #eventOutput() {
    OutputView.giftEventListPrint();
    OutputView.discountPrint();
    this.#eventListOutput();
    OutputView.printTotalEventPrice();
    OutputView.printAfterDiscountPrice();
  }

  #eventListOutput() {
    if (model.discountprice === 0) {
      Console.print("\n<혜택 내역>\n없음");
      return true;
    }
    OutputView.giftEventPrint();
  }
}

export default App;
