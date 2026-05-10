import packageJson from "../package.json" with { type: "json" };
import allRules from "./configs/all.js";
import rules from "./rules/index.js";

const namespace = "jest-extended";

const plugin = {
  meta: {
    name: "eslint-plugin-jest-extended",
    namespace,
    version: packageJson.version,
  },
  configs: {},
  rules,
};

Object.assign(plugin.configs, {
  all: {
    name: `${namespace}/all`,
    plugins: { [namespace]: plugin },
    rules: allRules,
  },
});

export default plugin;
