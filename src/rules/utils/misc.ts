import path from "node:path";
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import type { Rule } from "eslint";
import packageJson from "../../../package.json" with { type: "json" };
import { type AccessorNode, getAccessorValue, isSupportedAccessor } from "./accessors.js";
import { AST_NODE_TYPES } from "./astNodeTypes.js";
import { followTypeAssertionChain } from "./followTypeAssertionChain.js";
import type { ParsedExpectFnCall } from "./parseJestFnCall.js";

interface RuleModuleWithName extends Rule.RuleModule {
  defaultOptions: unknown[];
  name: string;
}

interface RuleDefinition<Options extends unknown[], MessageIds extends string> {
  create(context: Readonly<TSESLint.RuleContext<MessageIds, Options>>): TSESLint.RuleListener;
  defaultOptions: Options;
  meta: Omit<Rule.RuleMetaData, "messages"> & {
    messages: Record<MessageIds, string>;
  };
  name: string;
}

export const createRule = <Options extends unknown[], MessageIds extends string>(
  rule: RuleDefinition<Options, MessageIds>,
): RuleModuleWithName => {
  const ruleName = path.parse(rule.name).name;
  const repositorySource = packageJson.repository as unknown;
  const repository =
    typeof repositorySource === "string"
      ? repositorySource
      : (repositorySource as { url: string }).url;

  return {
    ...rule,
    create: (context) =>
      rule.create(
        context as unknown as Readonly<TSESLint.RuleContext<MessageIds, Options>>,
      ) as Rule.RuleListener,
    meta: {
      ...rule.meta,
      docs: {
        ...rule.meta.docs,
        url: `${repository}/blob/v${packageJson.version}/docs/rules/${ruleName}.md`,
      },
    },
  };
};

/**
 * Represents a `MemberExpression` with a "known" `property`.
 */
export interface KnownMemberExpression<Name extends string = string>
  extends TSESTree.MemberExpressionComputedName {
  property: AccessorNode<Name>;
}

/**
 * Represents a `CallExpression` with a "known" `property` accessor.
 *
 * i.e `KnownCallExpression<'includes'>` represents `.includes()`.
 */
export interface KnownCallExpression<Name extends string = string> extends TSESTree.CallExpression {
  callee: CalledKnownMemberExpression<Name>;
}

/**
 * Represents a `MemberExpression` with a "known" `property`, that is called.
 *
 * This is `KnownCallExpression` from the perspective of the `MemberExpression` node.
 */
interface CalledKnownMemberExpression<
  Name extends string = string,
> extends KnownMemberExpression<Name> {
  parent: KnownCallExpression<Name>;
}

export enum DescribeAlias {
  "describe" = "describe",
  "fdescribe" = "fdescribe",
  "xdescribe" = "xdescribe",
}

export enum TestCaseName {
  "fit" = "fit",
  "it" = "it",
  "test" = "test",
  "xit" = "xit",
  "xtest" = "xtest",
}

export enum HookName {
  "beforeAll" = "beforeAll",
  "beforeEach" = "beforeEach",
  "afterAll" = "afterAll",
  "afterEach" = "afterEach",
}

export enum ModifierName {
  not = "not",
  rejects = "rejects",
  resolves = "resolves",
}

export enum EqualityMatcher {
  toBe = "toBe",
  toEqual = "toEqual",
  toStrictEqual = "toStrictEqual",
}

export const findTopMostCallExpression = (
  node: TSESTree.CallExpression,
): TSESTree.CallExpression => {
  let topMostCallExpression = node;
  let { parent } = node;

  while (parent) {
    if (parent.type === AST_NODE_TYPES.CallExpression) {
      topMostCallExpression = parent;

      parent = parent.parent;

      continue;
    }

    if (parent.type !== AST_NODE_TYPES.MemberExpression) {
      break;
    }

    parent = parent.parent;
  }

  return topMostCallExpression;
};

export const isBooleanLiteral = (node: TSESTree.Node): node is TSESTree.BooleanLiteral =>
  node.type === AST_NODE_TYPES.Literal && typeof node.value === "boolean";

export const getFirstMatcherArg = (
  expectFnCall: ParsedExpectFnCall,
): TSESTree.SpreadElement | TSESTree.Expression => {
  const [firstArg] = expectFnCall.args;

  if (firstArg.type === AST_NODE_TYPES.SpreadElement) {
    return firstArg;
  }

  return followTypeAssertionChain(firstArg);
};

export const isInstanceOfBinaryExpression = (
  node: TSESTree.Node,
  className: string,
): node is TSESTree.BinaryExpression =>
  node.type === AST_NODE_TYPES.BinaryExpression &&
  node.operator === "instanceof" &&
  isSupportedAccessor(node.right, className);

export const isParsedInstanceOfMatcherCall = (
  expectFnCall: ParsedExpectFnCall,
  classArg?: string,
): boolean => {
  return (
    getAccessorValue(expectFnCall.matcher) === "toBeInstanceOf" &&
    expectFnCall.args.length === 1 &&
    isSupportedAccessor(expectFnCall.args[0], classArg)
  );
};

/**
 * Checks if the given `ParsedExpectMatcher` is either a call to one of the equality matchers,
 * with a boolean` literal as the sole argument, *or* is a call to `toBeTrue` or `toBeFalse`.
 *
 * @param expectFnCall Parsed matcher call to check.
 * @returns Whether the matcher asserts a boolean equality.
 */
export const isBooleanEqualityMatcher = (expectFnCall: ParsedExpectFnCall): boolean => {
  const matcherName = getAccessorValue(expectFnCall.matcher);

  if (["toBeTrue", "toBeFalse"].includes(matcherName)) {
    return true;
  }

  if (expectFnCall.args.length !== 1) {
    return false;
  }

  const arg = getFirstMatcherArg(expectFnCall);

  return (
    Object.prototype.hasOwnProperty.call(EqualityMatcher, matcherName) && isBooleanLiteral(arg)
  );
};
