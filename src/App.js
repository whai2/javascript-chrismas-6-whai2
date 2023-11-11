import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
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
    OutputView.printEvent(inputDate);
    OutputView.printTotalEventPrice();
    OutputView.printAfterDiscountPrice();
    OutputView.printBedge();
  }
}

export default App;
