import { Order } from "../src/Order.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("주문 클래스 테스트", () => {
  test("주문 메뉴와 개수 모두 보여준다.", () => {
    const logSpy = getLogSpy();

    const input = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
    new Order(input);

    const logs = [
      "티본스테이크 1개",
      "바비큐립 1개",
      "초코케이크 2개",
      "제로콜라 1개",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("할인 전 충주문 금액을 보여준다.", () => {
    const logSpy = getLogSpy();

    const input = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
    const order = new Order(input);

    const log = "142,000원";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
});