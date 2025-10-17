import { BASE_SEPARATOR_REGEX, CUSTOM_SEPARATOR_PATTERN } from "./constants.js";

/** 입력에서 커스텀 구분자 패턴인지 검사 */
export function isCustomPattern(input) {
  return CUSTOM_SEPARATOR_PATTERN.test(input);
}

/** 입력에서 커스텀 구분자 추출 */
export function getCustomPattern(input) {
  const matchedPart = input.match(CUSTOM_SEPARATOR_PATTERN);
  if (matchedPart) return matchedPart[1];
  return null;
}

/** 커스텀 선언부 제거 및 본문 추출 */
export function extractMainNumbers(input) {
  return input.replace(CUSTOM_SEPARATOR_PATTERN, "");
}

/** 정규식 특수문자 이스케이프문 */
export function escapeReg(custom) {
  return custom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 구분자 병합을 통한 최종 정규식 생성 */
export function setFinalDivision(custom) {
  if (!custom) return BASE_SEPARATOR_REGEX;
  const esc = escapeReg(custom);
  return new RegExp(`${esc}|${BASE_SEPARATOR_REGEX.source}`);
}
