import type { TSESTree } from "@typescript-eslint/utils";
import dedent from "dedent";
import tseslint from "typescript-eslint";
import { RuleTester } from "eslint";
import {
  type ParsedJestFnCall,
  type ResolvedJestFnWithNode,
  createRule,
  getAccessorValue,
  isSupportedAccessor,
  parseJestFnCall,
} from "../../../src/rules/utils/index.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
});

const typescriptRuleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    ecmaVersion: 2024,
    sourceType: "module",
  },
});

const isNode = (obj: unknown): obj is TSESTree.Node => {
  if (typeof obj === "object" && obj !== null) {
    return ["type", "loc", "range", "parent"].every((p) => p in obj);
  }

  return false;
};

const rule = createRule({
  name: "parse-jest-fn-call-test",
  meta: {
    docs: {
      description: "Fake rule for testing parseJestFnCall",
    },
    messages: {
      details: "{{ data }}",
    },
    schema: [],
    type: "problem",
  },
  defaultOptions: [],
  create: (context) => ({
    CallExpression(node) {
      const jestFnCall = parseJestFnCall(node, context);

      if (jestFnCall) {
        const sorted = {
          // ...jestFnCall,
          name: jestFnCall.name,
          type: jestFnCall.type,
          head: jestFnCall.head,
          members: jestFnCall.members,
        };

        context.report({
          messageId: "details",
          node,
          data: {
            data: JSON.stringify(sorted, (_key, value) => {
              if (isNode(value)) {
                if (isSupportedAccessor(value)) {
                  return getAccessorValue(value);
                }

                return undefined;
              }

              return value;
            }),
          },
        });
      }
    },
  }),
});

interface TestResolvedJestFnWithNode extends Omit<ResolvedJestFnWithNode, "node"> {
  node: string;
}

interface TestParsedJestFnCall extends Omit<ParsedJestFnCall, "head" | "members"> {
  head: TestResolvedJestFnWithNode;
  members: string[];
}

// const sortParsedJestFnCallResults = ()

const expectedParsedJestFnCallResultData = (result: TestParsedJestFnCall) => ({
  data: JSON.stringify({
    name: result.name,
    type: result.type,
    head: result.head,
    members: result.members,
  }),
});

ruleTester.run("nonexistent methods", rule, {
  valid: [
    "describe.something()",
    "describe.me()",
    "test.me()",
    "it.fails()",
    "context()",
    "context.each``()",
    "context.each()",
    "describe.context()",
    "describe.concurrent()()",
    "describe.concurrent``()",
    "describe.every``()",
    "/regex/.test()",
    '"something".describe()',
    "[].describe()",
    "new describe().only()",
    "``.test()",
    "test.only``()",
    "test``.only()",
  ],
  invalid: [],
});

ruleTester.run("expect", rule, {
  valid: [
    {
      code: dedent`
        import { expect } from './test-utils';

        expect(x).toBe(y);
      `,
    },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect(x).not.resolves.toBe(x);
      `,
    },
    // {
    //   code: dedent`
    //     import { expect } from '@jest/globals';
    //
    //     expect(x).not().toBe(x);
    //   `,
    // },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect(x).is.toBe(x);
      `,
    },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect;
        expect(x);
        expect(x).toBe;
        expect(x).not.toBe;
        //expect(x).toBe(x).not();
      `,
    },
  ],
  invalid: [
    {
      code: "expect(x).toBe(y);",
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: null,
              local: "expect",
              type: "global",
              node: "expect",
            },
            members: ["toBe"],
          }),
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect.assertions();
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["assertions"],
          }),
          column: 1,
          line: 3,
        },
      ],
    },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect(x).toBe(y);
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["toBe"],
          }),
          column: 1,
          line: 3,
        },
      ],
    },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect(x).not(y);
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["not"],
          }),
          column: 1,
          line: 3,
        },
      ],
    },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect(x).not.toBe(y);
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["not", "toBe"],
          }),
          column: 1,
          line: 3,
        },
      ],
    },
    {
      code: dedent`
        import { expect } from '@jest/globals';

        expect.assertions();
        expect.hasAssertions();
        expect.anything();
        expect.not.arrayContaining();
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["assertions"],
          }),
          column: 1,
          line: 3,
        },
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["hasAssertions"],
          }),
          column: 1,
          line: 4,
        },
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["anything"],
          }),
          column: 1,
          line: 5,
        },
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["not", "arrayContaining"],
          }),
          column: 1,
          line: 6,
        },
      ],
    },
  ],
});

ruleTester.run("esm", rule, {
  valid: [
    {
      code: dedent`
        import { it } from './test-utils';

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        import { defineFeature, loadFeature } from "jest-cucumber";

        const feature = loadFeature("some/feature");

        defineFeature(feature, (test) => {
          test("A scenario", ({ given, when, then }) => {});
        });
      `,
    },
    {
      code: dedent`
        import { describe } from './test-utils';

        describe('a function that is not from jest', () => {});
      `,
    },
    {
      code: dedent`
        import { fn as it } from './test-utils';

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        import * as jest from '@jest/globals';
        const { it } = jest;

        it('is not supported', () => {});
      `,
    },
    {
      code: dedent`
        import ByDefault from './myfile';

        ByDefault.sayHello();
      `,
    },
    {
      code: dedent`
        async function doSomething() {
          const build = await rollup(config);
          build.generate();
        }
      `,
    },
  ],
  invalid: [],
});

ruleTester.run("esm (dynamic)", rule, {
  valid: [
    {
      code: dedent`
        const { it } = await import('./test-utils');

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        const { it } = await import(\`./test-utils\`);

        it('is not a jest function', () => {});
      `,
    },
  ],
  invalid: [
    {
      code: dedent`
        const { it } = await import("@jest/globals");

        it('is a jest function', () => {});
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "it",
            type: "test",
            head: {
              original: "it",
              local: "it",
              type: "import",
              node: "it",
            },
            members: [],
          }),
          column: 1,
          line: 3,
        },
      ],
    },
    {
      code: dedent`
        const { it } = await import(\`@jest/globals\`);

        it('is a jest function', () => {});
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "it",
            type: "test",
            head: {
              original: "it",
              local: "it",
              type: "import",
              node: "it",
            },
            members: [],
          }),
          column: 1,
          line: 3,
        },
      ],
    },
  ],
});

ruleTester.run("global aliases", rule, {
  valid: [
    {
      code: 'xcontext("skip this please", () => {});',
      settings: { jest: { globalAliases: { describe: ["context"] } } },
    },
  ],
  invalid: [
    {
      code: 'context("when there is an error", () => {})',
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "describe",
            type: "describe",
            head: {
              original: "describe",
              local: "context",
              type: "global",
              node: "context",
            },
            members: [],
          }),
          column: 1,
          line: 1,
        },
      ],
      settings: { jest: { globalAliases: { describe: ["context"] } } },
    },
    {
      code: 'context.skip("when there is an error", () => {})',
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "describe",
            type: "describe",
            head: {
              original: "describe",
              local: "context",
              type: "global",
              node: "context",
            },
            members: ["skip"],
          }),
          column: 1,
          line: 1,
        },
      ],
      settings: { jest: { globalAliases: { describe: ["context"] } } },
    },
    {
      code: dedent`
        context("when there is an error", () => {})
        xcontext("skip this please", () => {});
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "xdescribe",
            type: "describe",
            head: {
              original: "xdescribe",
              local: "xcontext",
              type: "global",
              node: "xcontext",
            },
            members: [],
          }),
          column: 1,
          line: 2,
        },
      ],
      settings: { jest: { globalAliases: { xdescribe: ["xcontext"] } } },
    },
    {
      code: dedent`
        context("when there is an error", () => {})
        describe("when there is an error", () => {})
        xcontext("skip this please", () => {});
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "describe",
            type: "describe",
            head: {
              original: "describe",
              local: "context",
              type: "global",
              node: "context",
            },
            members: [],
          }),
          column: 1,
          line: 1,
        },
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "describe",
            type: "describe",
            head: {
              original: null,
              local: "describe",
              type: "global",
              node: "describe",
            },
            members: [],
          }),
          column: 1,
          line: 2,
        },
      ],
      settings: { jest: { globalAliases: { describe: ["context"] } } },
    },
  ],
});

ruleTester.run("global package source", rule, {
  valid: [
    {
      code: dedent`
        import { expect } from 'bun:test'

        expect(x).toBe(y);
      `,
      settings: { jest: { globalPackage: "@jest/globals" } },
    },
    {
      code: dedent`
        import { it } from '@jest/globals';

        it('is not considered a test function', () => {});
      `,
      settings: { jest: { globalPackage: "bun:test" } },
    },
    {
      code: dedent`
        import { fn as it } from 'bun:test';

        it('is not considered a test function', () => {});
      `,
      settings: { jest: { globalPackage: "bun:test" } },
    },
  ],
  invalid: [
    {
      code: "expect(x).toBe(y);",
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: null,
              local: "expect",
              type: "global",
              node: "expect",
            },
            members: ["toBe"],
          }),
          column: 1,
          line: 1,
        },
      ],
      settings: { jest: { globalPackage: "bun:test" } },
    },
    {
      code: dedent`
        import { describe, expect, it } from 'bun:test'

        describe('some tests', () => {
          it('ensures something', () => {
            expect.assertions();
          });
        });
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "describe",
            type: "describe",
            head: {
              original: "describe",
              local: "describe",
              type: "import",
              node: "describe",
            },
            members: [],
          }),
          column: 1,
          line: 3,
        },
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "it",
            type: "test",
            head: {
              original: "it",
              local: "it",
              type: "import",
              node: "it",
            },
            members: [],
          }),
          column: 3,
          line: 4,
        },
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["assertions"],
          }),
          column: 5,
          line: 5,
        },
      ],
      settings: { jest: { globalPackage: "bun:test" } },
    },
    {
      code: dedent`
        import { expect } from 'bun:test'

        expect(x).not.toBe(y);
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: "expect",
              local: "expect",
              type: "import",
              node: "expect",
            },
            members: ["not", "toBe"],
          }),
          column: 1,
          line: 3,
        },
      ],
      settings: { jest: { globalPackage: "bun:test" } },
    },
    {
      code: 'context("when there is an error", () => {})',
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "describe",
            type: "describe",
            head: {
              original: "describe",
              local: "context",
              type: "global",
              node: "context",
            },
            members: [],
          }),
          column: 1,
          line: 1,
        },
      ],
      settings: {
        jest: {
          globalPackage: "bun:test",
          globalAliases: { describe: ["context"] },
        },
      },
    },
  ],
});

typescriptRuleTester.run("typescript", rule, {
  valid: [
    {
      code: dedent`
        declare const test: (name: string, fn: () => void) => void;

        test('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        import type { it } from '@jest/globals';

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        import { it } from '../it-utils';

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        function it(message: string, fn: () => void): void;
        function it(cases: unknown[], message: string, fn: () => void): void;
        function it(...all: any[]): void {}

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        interface it {}
        function it(...all: any[]): void {}

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        import { it as jestIt } from '@jest/globals';
        import { it } from '../it-utils';

        it('is not a jest function', () => {});
      `,
    },
    {
      code: dedent`
        import dedent from 'dedent';

        dedent();
      `,
    },
  ],
  invalid: [
    {
      code: dedent`
        import { it } from '../it-utils';
        import { it as jestIt } from '@jest/globals';

        jestIt('is a jest function', () => {});
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "it",
            type: "test",
            head: {
              original: "it",
              local: "jestIt",
              type: "import",
              node: "jestIt",
            },
            members: [],
          }),
          column: 1,
          line: 4,
        },
      ],
    },
  ],
});

ruleTester.run("misc", rule, {
  valid: [
    'import { spyOn } from "actions"; spyOn("foo")',
    "test().finally()",
    "expect(true).not.not.toBeDefined();",
    "expect(true).resolves.not.exactly.toBeDefined();",
  ],
  invalid: [
    {
      code: "beforeEach(() => {});",
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "beforeEach",
            type: "hook",
            head: {
              original: null,
              local: "beforeEach",
              type: "global",
              node: "beforeEach",
            },
            members: [],
          }),
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'jest.spyOn(console, "log");',
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "jest",
            type: "jest",
            head: {
              original: null,
              local: "jest",
              type: "global",
              node: "jest",
            },
            members: ["spyOn"],
          }),
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: dedent`
        test('valid-expect-in-promise', async () => {
          const text = await fetch('url')
            .then(res => res.text())
            .then(text => text);

          expect(text).toBe('text');
        });
      `,
      errors: [
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "test",
            type: "test",
            head: {
              original: null,
              local: "test",
              type: "global",
              node: "test",
            },
            members: [],
          }),
          column: 1,
          line: 1,
        },
        {
          messageId: "details" as const,
          data: expectedParsedJestFnCallResultData({
            name: "expect",
            type: "expect",
            head: {
              original: null,
              local: "expect",
              type: "global",
              node: "expect",
            },
            members: ["toBe"],
          }),
          column: 3,
          line: 6,
        },
      ],
    },
  ],
});
