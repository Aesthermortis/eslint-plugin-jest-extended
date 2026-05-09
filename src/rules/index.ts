import type { Rule } from "eslint";
import preferToBeArray from "./prefer-to-be-array.js";
import preferToBeFalse from "./prefer-to-be-false.js";
import preferToBeObject from "./prefer-to-be-object.js";
import preferToHaveBeenCalledOnce from "./prefer-to-have-been-called-once.js";
import preferToBeTrue from "./prefer-to-be-true.js";

const rules = {
  "prefer-to-be-array": preferToBeArray,
  "prefer-to-be-false": preferToBeFalse,
  "prefer-to-be-object": preferToBeObject,
  "prefer-to-be-true": preferToBeTrue,
  "prefer-to-have-been-called-once": preferToHaveBeenCalledOnce,
} satisfies Record<string, Rule.RuleModule>;

export default rules;
