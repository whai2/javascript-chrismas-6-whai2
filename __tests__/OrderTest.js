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
    new Order(input);

    const log = "142,000원";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
});

describe("주문 예외 테스트", () => {
  test.each([
    [
      ["해산물파스타:2,티본스테이크:1,제로콜라:1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      ["해산물파스타-2/티본스테이크-1/제로콜라-1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      ["해산물파스타-2, 티본스테이크-1, 제로콜라-1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      ["제로콜라-1"],
      "[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요."
    ],
    [
      ["토마토파스타-5"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      ["시저샐러드-1,시저샐러드-1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
  ])("위와 같은 상황에서, 에러가 발생한다.", (inputs,errorMessage) => {

    expect(()=> {
      new Order(inputs)
    }).toThrow(errorMessage);
  });

  test.each([
    [
      ["해산물파스타-0,티본스테이크-1,제로콜라-1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      ["해산물파스타--5,티본스테이크-1,제로콜라-1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      ["해산물파스타-0b101,티본스테이크-1,제로콜라-1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
    [
      ["해산물파스타-1E3,티본스테이크-1,제로콜라-1"],
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
    ],
  ])("주문한 개수가 숫자가 아닐 경우, 에러가 발생한다.", (inputs,errorMessage) => {

    expect(()=> {
      new Order(inputs)
    }).toThrow(errorMessage);
  });
});