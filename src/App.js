import { Console } from "@woowacourse/mission-utils";
import {
  extractMainNumbers,
  getCustomPattern,
  isCustomPattern,
  setFinalDivision,
} from "./utils.js";
import { BASE_SEPARATOR_REGEX } from "./constants.js";

class App {
  async run() {
    const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.");
    const numbers = this.extractNumbersFromInput(input);
    const result = this.add(numbers);
    Console.print(`결과 : ${result}`);
  }

  extractNumbersFromInput(input) {
    if (input === "") return [0];

    let expression = input;
    let division = BASE_SEPARATOR_REGEX;

    const isCustom = isCustomPattern(input);
    if (isCustom) {
      const custom = getCustomPattern(input);
      expression = extractMainNumbers(input);
      division = setFinalDivision(custom);
    }

    const numbers = expression.split(division).filter(Boolean).map(Number);
    return numbers;
  }

  add(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum;
  }
}

export default App;
