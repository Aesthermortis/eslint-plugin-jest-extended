import { existsSync } from "node:fs";
import path from "node:path";
import type { Linter } from "eslint";
import plugin from "../src/index.js";

const ruleNames = Object.keys(plugin.rules);
const numberOfRules = 5;
const ruleNamePrefix = "jest-extended/";
const allConfig = (
  plugin.configs as {
    all: Linter.Config & {
      plugins?: { "jest-extended"?: { meta: unknown } };
      rules?: Record<string, unknown>;
    };
  }
).all;

describe("rules", () => {
  it("should have a corresponding doc for each rule", () => {
    for (const rule of ruleNames) {
      const docPath = path.resolve(import.meta.dirname, "../docs/rules", `${rule}.md`);

      // eslint-disable-next-line security/detect-non-literal-fs-filename -- paths are derived from local rule names.
      expect(existsSync(docPath)).toBe(true);
    }
  });

  it("should have the correct amount of rules", () => {
    expect(ruleNames).toHaveLength(numberOfRules);
  });

  it("should export configs that refer to actual rules", () => {
    const { configs } = plugin;

    expect(Object.keys(configs)).toEqual(["all"]);
    expect(allConfig).toMatchObject({
      name: "jest-extended/all",
      plugins: { "jest-extended": plugin },
    });
    expect(allConfig.plugins?.["jest-extended"]?.meta).toEqual({
      name: "eslint-plugin-jest-extended",
      namespace: "jest-extended",
      version: expect.any(String) as unknown,
    });
    expect(Object.keys(allConfig.rules ?? {})).toHaveLength(ruleNames.length);
    const allConfigRules = Object.keys(allConfig.rules ?? {});

    for (const rule of allConfigRules) {
      const ruleName = rule.slice(ruleNamePrefix.length);

      expect(rule.startsWith(ruleNamePrefix)).toBe(true);
      expect(ruleNames).toContain(ruleName);
    }
  });
});
