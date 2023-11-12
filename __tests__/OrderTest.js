import { Order } from "../src/Order.js";
import { model } from "../src/Model.js";
import { OrderError } from "../src/OrderError.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import OutputView from "../src/OutputView.js";

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("주문 클래스 테스트", () => {
  const input = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
  new Order(input);

  test("주문 메뉴와 개수 모두 보여준다.", () => {
    const logSpy = getLogSpy();

    OutputView.printMenu();

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

    OutputView.totalPricePrint();

    const log = "142,000원";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
});

describe("주문 예외 테스트", () => {
  test.each([
    [
      "해산물파스타:2,티본스테이크:1,제로콜라:1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      "해산물파스타-2/티본스테이크-1/제로콜라-1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      "해산물파스타-2, 티본스테이크-1, 제로콜라-1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      "해산물파스타--5,티본스테이크-1,제로콜라-1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      "해산물파스타-0b101,티본스테이크-1,제로콜라-1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      "해산물파스타-1E3,티본스테이크-1,제로콜라-1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
  ])("주문 입력 형태가 잘못될 경우, 에러가 발생한다.", (inputs, errorMessage) => {

    expect(() => {
      new OrderError(inputs)
    }).toThrow(errorMessage);
  });

  test.each([
    [
      "해산물파스타-0,티본스테이크-1,제로콜라-1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      "시저샐러드-1,시저샐러드-1",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      "토마토파스타-5",
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
  ])("0개 주문이 있을 경우, 메뉴가 중복될 경우, 없는 메뉴를 주문할 경우, 에러가 발생한다.", (input, errorMessage) => {
    new Order(input)
    const error = new OrderError(input);

    expect(() => {
      error.menusValidate(model.totalOrder)
    }).toThrow(errorMessage);
  });

  test("음료만 주문할 경우, 에러가 발생한다.", () => {
    const input = "제로콜라-1";
    const errorMessage = "[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요.";

    new Order(input)
    const error = new OrderError(input);
    error.menusValidate(model.totalOrder)

    expect(() => {
      error.onlyBeverageValidate();
    }).toThrow(errorMessage);
  });

  test("0개 주문이 있을 경우, 메뉴가 중복될 경우, 에러가 발생한다.", () => {
    const input = "시저샐러드-18,제로콜라-3";
    const errorMessage = "[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.";

    new Order(input)
    const error = new OrderError(input);
    error.menusValidate(model.totalOrder)

    expect(() => {
      error.totalCountOverValidate();
    }).toThrow(errorMessage);
  });
});