## [3.0.1](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v3.0.0...v3.0.1) (2025-09-21)


### Reverts

* downgrade `ariperkkio/eslint-remote-tester-run-action` action ([#290](https://github.com/jest-community/eslint-plugin-jest-extended/issues/290)) ([5fbbe87](https://github.com/jest-community/eslint-plugin-jest-extended/commit/5fbbe87efedccdb94559724783405671cc94613a))

# [3.0.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.4.0...v3.0.0) (2025-01-17)


### Features

* adjust Node constraints to match `eslint-plugin-jest` ([#235](https://github.com/jest-community/eslint-plugin-jest-extended/issues/235)) ([6d2414a](https://github.com/jest-community/eslint-plugin-jest-extended/commit/6d2414a5bbb16988e7b3e0e88eca66ae0dab76c9))
* drop support for Node v14 ([#232](https://github.com/jest-community/eslint-plugin-jest-extended/issues/232)) ([fef65e0](https://github.com/jest-community/eslint-plugin-jest-extended/commit/fef65e0fb61adca91598bbf4f3018273fb7b752e))
* support `@typescript-eslint/utils` v7 & v8 ([#241](https://github.com/jest-community/eslint-plugin-jest-extended/issues/241)) ([40766b0](https://github.com/jest-community/eslint-plugin-jest-extended/commit/40766b019eb70271837e5eeb45d44dd21a999ca6))
* upgrade `@typescript-eslint/utils` to v6 ([#238](https://github.com/jest-community/eslint-plugin-jest-extended/issues/238)) ([657bc42](https://github.com/jest-community/eslint-plugin-jest-extended/commit/657bc428599e4b5794603c9b308dedb5029bf2c2))


### BREAKING CHANGES

* Versions of Node v18 up to 18.11.x are no longer supported
* drop support for Node v14

# [3.0.0-next.4](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v3.0.0-next.3...v3.0.0-next.4) (2025-01-17)


### Features

* support `@typescript-eslint/utils` v7 & v8 ([#241](https://github.com/jest-community/eslint-plugin-jest-extended/issues/241)) ([414dc8f](https://github.com/jest-community/eslint-plugin-jest-extended/commit/414dc8f778d761c6f0f3eb3b621406cbe74b1afa))

# [3.0.0-next.3](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v3.0.0-next.2...v3.0.0-next.3) (2025-01-16)


### Features

* upgrade `@typescript-eslint/utils` to v6 ([#238](https://github.com/jest-community/eslint-plugin-jest-extended/issues/238)) ([3815685](https://github.com/jest-community/eslint-plugin-jest-extended/commit/381568546db6b94fc2a92386556b737f1551e262))

# [3.0.0-next.2](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v3.0.0-next.1...v3.0.0-next.2) (2025-01-16)


### Features

* adjust Node constraints to match `eslint-plugin-jest` ([#235](https://github.com/jest-community/eslint-plugin-jest-extended/issues/235)) ([c9fb39c](https://github.com/jest-community/eslint-plugin-jest-extended/commit/c9fb39caa43e074e64fb9fdb4dbcbdb2822fc57a))


### BREAKING CHANGES

* Versions of Node v18 up to 18.11.x are no longer supported

# [3.0.0-next.1](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.4.0...v3.0.0-next.1) (2025-01-16)


### Features

* drop support for Node v14 ([#232](https://github.com/jest-community/eslint-plugin-jest-extended/issues/232)) ([a3e953f](https://github.com/jest-community/eslint-plugin-jest-extended/commit/a3e953f06572f03777148f903f3e6486034468eb))


### BREAKING CHANGES

* drop support for Node v14

# [2.4.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.3.0...v2.4.0) (2024-04-20)


### Features

* support ESLint v9 ([#185](https://github.com/jest-community/eslint-plugin-jest-extended/issues/185)) ([42d36b1](https://github.com/jest-community/eslint-plugin-jest-extended/commit/42d36b198d0c6b489636843475e8ebd9ea4e837d))

# [2.3.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.2.0...v2.3.0) (2024-04-20)


### Features

* add should-be-fine support for flat configs ([#181](https://github.com/jest-community/eslint-plugin-jest-extended/issues/181)) ([7d106b0](https://github.com/jest-community/eslint-plugin-jest-extended/commit/7d106b0fc8eb99946ba760bd9f4feccc8fb6e18e))

# [2.2.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.1.0...v2.2.0) (2024-04-19)


### Features

* support providing aliases for `@jest/globals` package ([#180](https://github.com/jest-community/eslint-plugin-jest-extended/issues/180)) ([d070ca7](https://github.com/jest-community/eslint-plugin-jest-extended/commit/d070ca79caf41e0974c8b048a741f0db8104e4d1))

# [2.1.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.0.3...v2.1.0) (2024-04-19)


### Features

* support `failing.each` ([#179](https://github.com/jest-community/eslint-plugin-jest-extended/issues/179)) ([b2adda4](https://github.com/jest-community/eslint-plugin-jest-extended/commit/b2adda4cacf1616ce18bed4d655a8a5b533c6664))

## [4.0.0](https://github.com/Aesthermortis/eslint-plugin-jest-extended/compare/v3.0.1...v4.0.0) (2026-05-10)


### ⚠ BREAKING CHANGES

* **tooling:** the package now targets Node 24+, npm 11+, ESLint 10, and ESM-only consumption.

### 🩹 Fixes

* **plugin:** align meta and config typings ([8a0f52b](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/8a0f52b0a204f1da6dc808b057be6b8aba7e1acc))


### 📚 Documentation

* **code-of-conduct:** add Contributor Covenant Code of Conduct ([c7a2cb3](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/c7a2cb36eadbe2ac06c60091e471274eecb36125))


### 🧹 Chores

* **config:** enforce top-level __tests__ layout ([1920d48](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/1920d48f4f50f71bfb541e1e17664c32b6c75bcc))
* **index:** refactor plugin export assertions ([56db742](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/56db74267bfbd934d8ee11695c16f45befc13446))
* **lint:** add stricter flat config presets ([7018abc](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/7018abcbfbe3c918f50440bc76e28017b80e2be1))
* **rules:** centralize AST node type constants ([deab28c](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/deab28c1a1a1a2e8abe3170cc574c90c90e8964d))
* **rules:** flatten matcher test case generation ([6693f2c](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/6693f2c3c51146bd89fb3419ae07a55f28c87ab3))
* **rules:** import TypeScript parser directly ([df9dea1](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/df9dea1a72ec331680e953a09f5967316fed8a4b))
* **tsconfig:** update build configuration for TypeScript ([cc2c1df](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/cc2c1df77c993c38ec9f392fac771bb154527b21))
* **utils:** add utility edge case coverage ([5a4961e](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/5a4961e20676034ae79ee9aa468abe1528cd937e))


### 🤖 Automation

* **config:** configure prettier plugins and LF endings ([8a9d1cd](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/8a9d1cd83bdce510da500ffc483f9dfb54d1ac85))
* **deps:** bump @commitlint/cli to version 21.0.0 ([5d28b3d](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/5d28b3de1b3b958a16dfbbab12b27dcd98c9e2ca))
* **deps:** bump @commitlint/config-conventional to version 21.0.0 ([4d13731](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/4d137311c894518437c871165f4e47e6cbdf588d))
* **deps:** bump dedent to version 1.7.2 ([ac133e9](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/ac133e9ae2702f925c282093ccdf34a269f2cd09))
* **deps:** bump jest to version 30.4.2 ([25ed172](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/25ed1729a1566e10e9d29da7233e37b51afe5fd1))
* **deps:** bump lint-staged to 17.0.4 ([05198d1](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/05198d110c10bd1ca2e3ac0d17c545a817971864))
* **deps:** bump lint-staged to version 17.0.3 ([31fd3c0](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/31fd3c000f3a29b7e68293ce4ecda48952af7fe1))
* **deps:** bump locked dependencies ([6aadbac](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/6aadbac267d24e5dbc053e6815ecda7aefbdf004))
* **deps:** bump typescript to version 6.0.3 ([139c593](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/139c593e686f7899e9349cd1a6797e1bfcf22320))
* **docs:** simplify generated rule docs format ([da0112c](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/da0112c79bfeec15ff841e0de5a6bb0cb418907d))
* **tooling:** migrate repo to npm and ESM ([f5471f7](https://github.com/Aesthermortis/eslint-plugin-jest-extended/commit/f5471f7d9e52f190f29acb3effc598e57b7c0513))

## [2.0.3](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.0.2...v2.0.3) (2024-04-19)


### Bug Fixes

* replace use of deprecated methods ([#178](https://github.com/jest-community/eslint-plugin-jest-extended/issues/178)) ([31c01ea](https://github.com/jest-community/eslint-plugin-jest-extended/commit/31c01ea02f4b8dbdf7e103efbde5aa9bd03fbfb2))

## [2.0.2](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.0.1...v2.0.2) (2024-04-19)


### Performance Improvements

* use `Set` instead of iterating, and deduplicate a function ([#175](https://github.com/jest-community/eslint-plugin-jest-extended/issues/175)) ([d0652cd](https://github.com/jest-community/eslint-plugin-jest-extended/commit/d0652cdb82b692cdee0f2ef4616b96e89c6d4ddf))

## [2.0.1](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v2.0.0...v2.0.1) (2024-04-19)


### Performance Improvements

* don't collect more info than needed when resolving jest functions ([#172](https://github.com/jest-community/eslint-plugin-jest-extended/issues/172)) ([08e130c](https://github.com/jest-community/eslint-plugin-jest-extended/commit/08e130c79df9e81e6b4c9c0e0f8b52885ee20ada))

# [2.0.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v1.2.0...v2.0.0) (2022-08-25)


### Features

* drop support for `eslint@6` ([#26](https://github.com/jest-community/eslint-plugin-jest-extended/issues/26)) ([d3d40f3](https://github.com/jest-community/eslint-plugin-jest-extended/commit/d3d40f30266b00bf7182adcd90f52f3ccd1859ba))
* drop support for Node versions 12 and 17 ([#25](https://github.com/jest-community/eslint-plugin-jest-extended/issues/25)) ([14c90ed](https://github.com/jest-community/eslint-plugin-jest-extended/commit/14c90edffc359db59b1492fa9a94e361b6959f28))


### BREAKING CHANGES

* Support for ESLint version 6 is removed
* Node versions 12 and 17 are no longer supported

# [1.2.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v1.1.0...v1.2.0) (2022-08-20)


### Features

* switch to new scope-based jest fn call parser to support `@jest/globals` ([#20](https://github.com/jest-community/eslint-plugin-jest-extended/issues/20)) ([35ddfed](https://github.com/jest-community/eslint-plugin-jest-extended/commit/35ddfedd58de975ca2c235a5295dfa28aab11ac5))

# [1.1.0](https://github.com/jest-community/eslint-plugin-jest-extended/compare/v1.0.0...v1.1.0) (2022-08-20)


### Features

* create `prefer-to-have-been-called-once` rule ([#19](https://github.com/jest-community/eslint-plugin-jest-extended/issues/19)) ([12e6372](https://github.com/jest-community/eslint-plugin-jest-extended/commit/12e6372ec54df6d768254bd528a970163a9fbc63))

# 1.0.0 (2022-08-15)


### Features

* bunch of updates ([#5](https://github.com/jest-community/eslint-plugin-jest-extended/issues/5)) ([8e45c68](https://github.com/jest-community/eslint-plugin-jest-extended/commit/8e45c682b7c287f2180b03c4e903288a69c32711))
* create `prefer-to-be-array` rule ([9bd067c](https://github.com/jest-community/eslint-plugin-jest-extended/commit/9bd067ccc37d7651f812782bde785868c9cadfb4))
* create `prefer-to-be-false` rule ([b35e45c](https://github.com/jest-community/eslint-plugin-jest-extended/commit/b35e45c23cb2aa660034ac49b5082c61f34de758))
* create `prefer-to-be-object` rule ([676de1d](https://github.com/jest-community/eslint-plugin-jest-extended/commit/676de1d77ba19430d96f5df93ce8f3a548c6acfe))
* create `prefer-to-be-true` rule ([22f8093](https://github.com/jest-community/eslint-plugin-jest-extended/commit/22f8093136c30212498b8a347891f1cff995003b))
* initial commit ([3ed88c4](https://github.com/jest-community/eslint-plugin-jest-extended/commit/3ed88c4699d2ef82780183bae00560282a3f1916))
