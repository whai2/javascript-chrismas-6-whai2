import { Order } from "../src/Order.js";
import { Event } from "../src/Event.js";
import { MissionUtils } from "@woowacourse/mission-utils";

// 주문 객체 생성 -> 모델 객체에 주문 내역 저장
const input = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
new Order(input);

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};


describe("이벤트 클래스 테스트", () => {
  const logSpy = getLogSpy();

  const input = "3";
  new Event(input);

  test("할인 이벤트 혜택 내역을 출력한다.", () => {
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
    const logs = [
      "크리스마스 디데이 할인: -1,200원",
      "평일 할인: -4,046원",
      "특별 할인: -1,000원",
      "증정 이벤트: -25,000원",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
});