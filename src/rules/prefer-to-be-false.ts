import type { TSESTree } from "@typescript-eslint/utils";
import {
  EqualityMatcher,
  createRule,
  getAccessorValue,
  getFirstMatcherArg,
  parseJestFnCall,
} from "./utils/index.js";

interface FalseLiteral extends TSESTree.BooleanLiteral {
  value: false;
}

const isFalseLiteral = (node: TSESTree.Node): node is FalseLiteral =>
  node.type === "Literal" && node.value === false;

export default createRule({
  name: "prefer-to-be-false",
  meta: {
    docs: {
      description: "Suggest using `toBeFalse()`",
    },
    messages: {
      preferToBeFalse: "Prefer using `toBeFalse()` to test value is `false`.",
    },
    fixable: "code",
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        const jestFnCall = parseJestFnCall(node, context);

        if (jestFnCall?.type !== "expect") {
          return;
        }

        if (
          jestFnCall.args.length === 1 &&
          isFalseLiteral(getFirstMatcherArg(jestFnCall)) &&
          Object.prototype.hasOwnProperty.call(
            EqualityMatcher,
            getAccessorValue(jestFnCall.matcher),
          )
        ) {
          context.report({
            node: jestFnCall.matcher,
            messageId: "preferToBeFalse",
            fix: (fixer) => [
              fixer.replaceText(jestFnCall.matcher, "toBeFalse"),
              fixer.remove(jestFnCall.args[0]),
            ],
          });
        }
      },
    };
  },
});
