import { CUSTOM_SEPARATOR_GLOBAL } from "./constants.js";

/**
 * [ERROR] 메시지를 정규화하고 에러를 던집니다.
 * - 예시: throwError("음수는 입력할 수 없습니다.");
 */
export function throwError(message) {
  const msg = message.startsWith("[ERROR]") ? message : `[ERROR] ${message}`;
  throw new Error(msg);
}

export function validateInput(input) {
  if (input == null || typeof input !== "string") {
    throwError("현재 입력에 숫자가 존재하지 않습니다.");
  }

  const count = input.match(CUSTOM_SEPARATOR_GLOBAL)?.length || 0;
  if (count > 1) {
    throwError("커스텀 구분자는 한 번만 선언할 수 있습니다.");
  }
}

export function validateNumbers(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throwError("현재 입력에 숫자가 존재하지 않습니다.");
  }

  if (numbers.some((n) => Number.isNaN(n))) {
    throwError("현재 입력에 숫자가 존재하지 않습니다.");
  }

  if (numbers.some((n) => n < 0)) {
    throwError("음수는 입력할 수 없습니다.");
  }
}
