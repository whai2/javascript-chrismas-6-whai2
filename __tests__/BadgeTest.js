import { Order } from "../src/Order.js";
import { Event } from "../src/Event.js";
import { Badge } from "../src/Badge.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("배지 클래스 테스트", () => {
  test.each([
    ["아이스크림-3,제로콜라-1", "26"],
    ["아이스크림-3,제로콜라-1", "25"],
    ["티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", "3"],
  ])("총 혜택에 맞게, 배지를 부여한다.", (inputMenu, inputDate) => {
    const logSpy = getLogSpy();

    // 주문 객체 생성 -> 모델 객체에 주문 내역 저장 -> 이벤트 내역 저장
    new Order(inputMenu);
    new Event(inputDate);
    new Badge();

    const logs = [
      "별",
      "트리",
      "산타",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
});