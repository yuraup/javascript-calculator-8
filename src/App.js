import { Console } from "@woowacourse/mission-utils";
import { BASE_SEPARATOR_REGEX } from "./constants.js";
import { validateInput, validateNumbers } from "./errors.js";
import {
  extractMainNumbers,
  getCustomPattern,
  isCustomPattern,
  setFinalDivision,
} from "./utils.js";

class App {
  async run() {
    try {
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.");
      validateInput(input);

      const numbers = this.extractNumbersFromInput(input);
      const result = this.add(numbers);

      Console.print(`결과 : ${result}`);
    } catch (err) {
      Console.print(err.message);
      throw err;
    }
  }

  extractNumbersFromInput(input) {
    if (input === "") return [0];

    let expression = input;
    let division = BASE_SEPARATOR_REGEX;

    if (isCustomPattern(input)) {
      const custom = getCustomPattern(input);
      expression = extractMainNumbers(input);
      division = setFinalDivision(custom);
    }

    const numbers = expression
      .split(division)
      .map((t) => t.trim())
      .filter(Boolean)
      .map(Number);
    return numbers;
  }

  add(numbers) {
    validateNumbers(numbers);
    return numbers.reduce((a, b) => a + b, 0);
  }
}

export default App;
