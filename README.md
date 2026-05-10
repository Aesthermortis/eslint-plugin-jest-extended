<div align="center">
  <a href="https://eslint.org/">
    <img height="150" src="https://eslint.org/assets/images/logo/eslint-logo-color.svg">
  </a>
  <a href="https://jestjs.io/">
    <img width="150" height="150" vspace="" hspace="25" src="https://jestjs.io/img/jest.png">
  </a>
  <h1>eslint-plugin-jest-extended</h1>
  <p>ESLint plugin for <a href="https://github.com/jest-community/jest-extended">Jest Extended</a></p>
</div>

<p align="center">
  <a href="https://github.com/Aesthermortis/eslint-plugin-jest-extended/actions/workflows/validate.yml">
    <img
      alt="Quality checks"
      src="https://img.shields.io/github/actions/workflow/status/Aesthermortis/eslint-plugin-jest-extended/validate.yml?branch=main&label=Quality%20checks&logo=github&style=flat-square"
    >
  </a>
  <a href="./LICENSE">
    <img
      alt="MIT License"
      src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square"
    >
  </a>
  <a href="https://github.com/prettier/prettier">
    <img
      alt="Prettier Code Style"
      src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
    >
  </a>
</p>

## Installation

```sh
npm install --save-dev eslint eslint-plugin-jest-extended
```

**Note:** If you installed ESLint globally then you must also install
`eslint-plugin-jest-extended` globally.

## Usage

Import `eslint-plugin-jest-extended` in your `eslint.config.js` file, then
configure the rules you want to use.

```js
import jestExtended from "eslint-plugin-jest-extended";

export default [
  {
    files: ["**/*.test.js"],
    plugins: { "jest-extended": jestExtended },
    rules: {
      "jest-extended/prefer-to-be-true": "warn",
      "jest-extended/prefer-to-be-false": "error",
    },
  },
];
```

## Shareable configurations

### Recommended

This plugin does not export a recommended configuration, as the rules provided
by this plugin are about enforcing usage of preferred matchers for particular
patterns, rather than helping to prevent bugs & commonly overlooked traps.

### All

If you want to enable all rules instead of only some, use
`jestExtended.configs.all`:

```js
import jestExtended from "eslint-plugin-jest-extended";

export default [
  {
    files: [
      /* glob matching your test files */
    ],
    ...jestExtended.configs.all,
  },
];
```

Note that the `all` configuration may change in any release and is thus unsuited
for installations requiring long-term consistency.

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🌐 Set in the `all` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                             | Description                            | 💼  | 🔧  |
| :------------------------------------------------------------------------------- | :------------------------------------- | :-- | :-- |
| [prefer-to-be-array](docs/rules/prefer-to-be-array.md)                           | Suggest using `toBeArray()`            | 🌐  | 🔧  |
| [prefer-to-be-false](docs/rules/prefer-to-be-false.md)                           | Suggest using `toBeFalse()`            | 🌐  | 🔧  |
| [prefer-to-be-object](docs/rules/prefer-to-be-object.md)                         | Suggest using `toBeObject()`           | 🌐  | 🔧  |
| [prefer-to-be-true](docs/rules/prefer-to-be-true.md)                             | Suggest using `toBeTrue()`             | 🌐  | 🔧  |
| [prefer-to-have-been-called-once](docs/rules/prefer-to-have-been-called-once.md) | Suggest using `toHaveBeenCalledOnce()` | 🌐  | 🔧  |

<!-- end auto-generated rules list -->

## Credit

- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)

## Related Projects

### eslint-plugin-jest

This project aims to provide linting rules to aid in writing tests using jest.

https://github.com/jest-community/eslint-plugin-jest

### eslint-plugin-jest-formatting

This project aims to provide formatting rules (auto-fixable where possible) to
ensure consistency and readability in jest test suites.

https://github.com/dangreenisrael/eslint-plugin-jest-formatting
