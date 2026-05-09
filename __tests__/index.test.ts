import { existsSync } from "node:fs";
import { resolve } from "node:path";
import plugin from "../src/index.js";

const ruleNames = Object.keys(plugin.rules);
const numberOfRules = 5;

describe("rules", () => {
  it("should have a corresponding doc for each rule", () => {
    ruleNames.forEach((rule) => {
      const docPath = resolve(import.meta.dirname, "../docs/rules", `${rule}.md`);

      if (!existsSync(docPath)) {
        throw new Error(
          `Could not find documentation file for rule "${rule}" in path "${docPath}"`,
        );
      }
    });
  });

  it("should have the correct amount of rules", () => {
    const { length } = ruleNames;

    if (length !== numberOfRules) {
      throw new Error(
        `There should be exactly ${numberOfRules} rules, but there are ${length}. If you've added a new rule, please update this number.`,
      );
    }
  });

  it("should export configs that refer to actual rules", () => {
    const { configs } = plugin;

    expect(Object.keys(configs)).toEqual(["all"]);
    expect(configs.all).toMatchObject({
      name: "jest-extended/all",
      plugins: { "jest-extended": plugin },
    });
    expect(configs.all.plugins?.["jest-extended"].meta).toEqual({
      name: "eslint-plugin-jest-extended",
      namespace: "jest-extended",
      version: expect.any(String),
    });
    expect(Object.keys(configs.all.rules ?? {})).toHaveLength(ruleNames.length);
    const allConfigRules = Object.keys(configs.all.rules ?? {});

    allConfigRules.forEach((rule) => {
      const ruleNamePrefix = "jest-extended/";
      const ruleName = rule.slice(ruleNamePrefix.length);

      expect(rule.startsWith(ruleNamePrefix)).toBe(true);
      expect(ruleNames).toContain(ruleName);
    });
  });
});
