import stripJs from "strip-js";
import S from "string";

export const sanitize = input => {
  return S(stripJs(input))
    .stripTags()
    .s.replace(/\s\s+/g, " ");
};
