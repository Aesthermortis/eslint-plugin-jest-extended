import {
  createRule,
  getAccessorValue,
  getFirstMatcherArg,
  parseJestFnCall,
} from "./utils/index.js";

export default createRule({
  name: "prefer-to-have-been-called-once",
  meta: {
    docs: {
      description: "Suggest using `toHaveBeenCalledOnce()`",
    },
    messages: {
      preferCalledOnce: "Prefer `toHaveBeenCalledOnce()`",
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
          getAccessorValue(jestFnCall.matcher) === "toHaveBeenCalledTimes" &&
          jestFnCall.args.length === 1
        ) {
          const arg = getFirstMatcherArg(jestFnCall);

          if (arg.type !== "Literal" || arg.value !== 1) {
            return;
          }

          context.report({
            node: jestFnCall.matcher,
            messageId: "preferCalledOnce",
            fix: (fixer) => [
              fixer.replaceText(jestFnCall.matcher, "toHaveBeenCalledOnce"),
              fixer.remove(jestFnCall.args[0]),
            ],
          });
        }
      },
    };
  },
});
