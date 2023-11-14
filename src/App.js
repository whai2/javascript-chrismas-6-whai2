import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import { model } from "./database/Model.js";
import { Event } from "./domain/Event.js";
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
      Console.print("없음");
      return true;
    }
    OutputView.giftEventPrint();
  }
}

export default App;
