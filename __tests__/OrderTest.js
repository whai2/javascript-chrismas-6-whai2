import { Order } from "Order.js";

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("주문 클래스 테스트", () => {
  test("- 기준으로 주문 메뉴와 개수를 알아낸다.", () => {
    const logSpy = getLogSpy();

    const input = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
    const splitInput = "티본스테이크-1";
    const order = new Order(input);
    order.splitAsDash(splitInput);

    const log = "티본스테이크 1개";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log))
  });
});