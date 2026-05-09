import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es",
    importAttributesKey: "with",
    sourcemap: true,
  },
  external: [/\/package\.json$/u, "node:module", "node:path"],
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
  ],
};
