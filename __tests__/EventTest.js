import App from "../src/App.js";
import { Order } from "../src/domain/Order.js";
import { Event } from "../src/domain/Event.js";
import OutputView from "../src/view/OutputView.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EventError } from "../src/error/EventError.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("이벤트 클래스 테스트", () => {
  // 주문 객체 생성 -> 모델 객체에 주문 내역 저장
  const menuInput = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
  const input = "3";

  const logSpy = getLogSpy();

  new Order(menuInput);
  new Event(input);

  test("할인 이벤트 혜택 내역을 출력한다.", () => {
    OutputView.discountPrint();

    const logs = [
      "크리스마스 디데이 할인: -1,200원",
      "평일 할인: -4,046원",
      "특별 할인: -1,000원",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("증정 이벤트 혜택 내역을 같이 출력한다.", () => {
    OutputView.giftEventPrint();

    const log = "증정 이벤트: -25,000원";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });

  test.each([["숫자"], ["4.5"], ["-5"], ["0b101"], ["1E3"], ["32"]])(
    "이벤트 날짜를 잘못 입력한 경우, 에러가 발생한다.",
    (inputs) => {
      const errorMessage =
        "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";

      expect(() => {
        new EventError(inputs);
      }).toThrow(errorMessage);
    }
  );

  test("총주문 금액 10000원 미만 시, 이벤트 미적용", async () => {
    const logSpy = getLogSpy();
    mockQuestions(["3", "아이스크림-1,제로콜라-1"]);

    const app = new App();
    await app.run();

    const log = "없음";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
});
