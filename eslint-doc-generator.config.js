/** @satisfies {import("eslint-doc-generator").GenerateOptions} */
const config = {
  ignoreConfig: ["recommended"],

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
