export class EventError {
  constructor(date) {
    this.date = date;
    this.#validate(date);
  }

  #validate(date) {
  }
}