import { model } from "./Model.js";
import { menu } from "./Menu.js";

export class Counter {
  totalMenuCounter (orders) {
    // 초기화
    model.totalprice = 0;
    model.menuCount = [0,0,0,0];

    for (let i = 0; i < orders.length; i++) {
      const eachOrder = orders[i];
      this.#menuCounter(eachOrder[0], Number(eachOrder[1]))
    }
  }

  #menuCounter(name, counts) {
    for (const category in menu) {
      this.#eachMenuCounter(menu[category], name, counts)
    }
  }

  #eachMenuCounter(category, name, counts) {
    for (const eachMenu in category) {
      if (eachMenu === name) {
        this.#categoryCounter(category, counts);

        const price = category[eachMenu];
        model.totalprice += Number(price * counts);
      }
    }
  }

  #categoryCounter (category, counts) {
    let categoryList = ["beverage", "main", "desesert", "appetizer"];
    for (let i = 0; i < categoryList.length; i++) {
      if (category === menu[categoryList[i]]) {
        model.totalcounts += counts;
        model.menuCount[i] += counts;
      }
    }
  }
}