import type { ESLint, Rule } from "eslint";

declare const jestExtended: {
  meta: {
    name: "eslint-plugin-jest-extended";
    namespace: "jest-extended";
    version: string;
  };
  configs: {
    all: {
      name: "jest-extended/all";
      plugins: { "jest-extended": ESLint.Plugin };
      rules: {
        "jest-extended/prefer-to-be-array": "error";
        "jest-extended/prefer-to-be-false": "error";
        "jest-extended/prefer-to-be-object": "error";
        "jest-extended/prefer-to-be-true": "error";
        "jest-extended/prefer-to-have-been-called-once": "error";
      };
    };
  };
  rules: {
    "prefer-to-be-array": Rule.RuleModule;
    "prefer-to-be-false": Rule.RuleModule;
    "prefer-to-be-object": Rule.RuleModule;
    "prefer-to-be-true": Rule.RuleModule;
    "prefer-to-have-been-called-once": Rule.RuleModule;
  };
};

export type JestExtendedPlugin = typeof jestExtended;
export default jestExtended;
