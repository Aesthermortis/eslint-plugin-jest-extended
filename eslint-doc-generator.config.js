/** @type {import("eslint-doc-generator").GenerateOptions} */
const config = {
  ignoreConfig: ["recommended"],
  ruleDocTitleFormat: "desc-parens-name",
  ruleDocSectionInclude: ["Rule details"],
  ruleListColumns: [
    "name",
    "description",
    "configsError",
    "configsWarn",
    "configsOff",
    "fixable",
    "hasSuggestions",
    "deprecated",
  ],
  urlConfigs: `https://github.com/jest-community/eslint-plugin-jest-extended/blob/main/README.md#shareable-configurations`,

  async postprocess(content, path) {
    const prettier = await import("prettier");
    const prettierConfig = await prettier.resolveConfig(path);

    return prettier.format(content, {
      ...prettierConfig,
      endOfLine: "lf",
      filepath: path,
      parser: "markdown",
    });
  },
};

export default config;
