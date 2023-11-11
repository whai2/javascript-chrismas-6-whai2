export class EventError {
  constructor(date) {
    this.date = date;
    this.#validate(date);
  }

  #validate(date) {
    this.#numberValidate(date);
    this.#dateOverValidate(date);
  }

  #numberValidate(date) {
    if (/^[+]?[1-9]\d*$/.test(date)) {
      return Number(date);
    } 
    throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }

  #dateOverValidate(date) {
    if (date > 31) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }
}