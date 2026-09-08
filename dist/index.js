import packageJson from '../package.json' with { type: 'json' };
import path from 'node:path';

const AST_NODE_TYPES = {
    AwaitExpression: "AwaitExpression",
    BinaryExpression: "BinaryExpression",
    CallExpression: "CallExpression",
    Identifier: "Identifier",
    ImportExpression: "ImportExpression",
    ImportSpecifier: "ImportSpecifier",
    Literal: "Literal",
    MemberExpression: "MemberExpression",
    Property: "Property",
    SpreadElement: "SpreadElement",
    TaggedTemplateExpression: "TaggedTemplateExpression",
    TemplateLiteral: "TemplateLiteral",
    TSAsExpression: "TSAsExpression",
    TSImportEqualsDeclaration: "TSImportEqualsDeclaration",
    TSTypeAssertion: "TSTypeAssertion",
};

/**
 * Checks if the given `node` is a `StringLiteral`.
 *
 * If a `value` is provided & the `node` is a `StringLiteral`,
 * the `value` will be compared to that of the `StringLiteral`.
 *
 * @param node Node to check.
 * @param [value] Expected literal value.
 * @returns Whether the node is a string literal.
 * @template V
 */
const isStringLiteral = (node, value) => node.type === AST_NODE_TYPES.Literal &&
    typeof node.value === "string" &&
    (value === undefined || node.value === value);
/**
 * Checks if the given `node` is a `TemplateLiteral`.
 *
 * Complex `TemplateLiteral`s are not considered specific, and so will return `false`.
 *
 * If a `value` is provided & the `node` is a `TemplateLiteral`,
 * the `value` will be compared to that of the `TemplateLiteral`.
 *
 * @param node Node to check.
 * @param [value] Expected template value.
 * @returns Whether the node is a simple template literal.
 * @template V
 */
const isTemplateLiteral = (node, value) => node.type === AST_NODE_TYPES.TemplateLiteral &&
    node.quasis.length === 1 && // bail out if not simple
    (value === undefined || node.quasis[0].value.raw === value);
/**
 * Checks if the given `node` is a {@link StringNode}.
 *
 * @param node Node to check.
 * @param [specifics] Expected string value.
 * @returns Whether the node is a supported string node.
 * @template V
 */
const isStringNode = (node, specifics) => isStringLiteral(node, specifics) || isTemplateLiteral(node, specifics);
/**
 * Gets the value of the given `StringNode`.
 *
 * If the `node` is a `TemplateLiteral`, the `raw` value is used;
 * otherwise, `value` is returned instead.
 *
 * @param node String node to read.
 * @returns Static string value for the node.
 * @template S
 */
const getStringValue = (node) => isTemplateLiteral(node) ? node.quasis[0].value.raw : node.value;
/**
 * Checks if the given `node` is an `Identifier`.
 *
 * If a `name` is provided, & the `node` is an `Identifier`,
 * the `name` will be compared to that of the `identifier`.
 *
 * @param node Node to check.
 * @param [name] Expected identifier name.
 * @returns Whether the node is a matching identifier.
 * @template V
 */
const isIdentifier = (node, name) => node.type === AST_NODE_TYPES.Identifier && (name === undefined || node.name === name);
/**
 * Checks if the given `node` is a "supported accessor".
 *
 * This means that it's a node can be used to access properties,
 * and who's "value" can be statically determined.
 *
 * `MemberExpression` nodes most commonly contain accessors,
 * but it's possible for other nodes to contain them.
 *
 * If a `value` is provided & the `node` is an `AccessorNode`,
 * the `value` will be compared to that of the `AccessorNode`.
 *
 * Note that `value` here refers to the normalised value.
 * The property that holds the value is not always called `name`.
 *
 * @param node Node to check.
 * @param [value] Expected accessor value.
 * @returns Whether the node is a supported accessor.
 * @template V
 */
const isSupportedAccessor = (node, value) => isIdentifier(node, value) || isStringNode(node, value);
/**
 * Gets the value of the given `AccessorNode`,
 * account for the different node types.
 *
 * @param accessor Accessor node to read.
 * @returns Static accessor value.
 * @template S
 */
const getAccessorValue = (accessor) => accessor.type === AST_NODE_TYPES.Identifier ? accessor.name : getStringValue(accessor);

const isTypeCastExpression = (node) => node.type === AST_NODE_TYPES.TSAsExpression || node.type === AST_NODE_TYPES.TSTypeAssertion;
const followTypeAssertionChain = (expression) => isTypeCastExpression(expression) ? followTypeAssertionChain(expression.expression) : expression;

const createRule = (rule) => {
    const ruleName = path.parse(rule.name).name;
    const repositorySource = packageJson.repository;
    let repository;
    /* istanbul ignore else -- repository metadata shape is environment-dependent under ts-jest. */
    // eslint-disable-next-line unicorn/prefer-ternary -- Istanbul needs an if statement to ignore only the else branch.
    if (typeof repositorySource === "string") {
        repository = repositorySource;
    }
    else {
        repository = repositorySource.url;
    }
    return {
        ...rule,
        create: (context) => rule.create(context),
        meta: {
            ...rule.meta,
            docs: {
                ...rule.meta.docs,
                url: `${repository}/blob/v${packageJson.version}/docs/rules/${ruleName}.md`,
            },
        },
    };
};
var DescribeAlias;
(function (DescribeAlias) {
    DescribeAlias["describe"] = "describe";
    DescribeAlias["fdescribe"] = "fdescribe";
    DescribeAlias["xdescribe"] = "xdescribe";
})(DescribeAlias || (DescribeAlias = {}));
var TestCaseName;
(function (TestCaseName) {
    TestCaseName["fit"] = "fit";
    TestCaseName["it"] = "it";
    TestCaseName["test"] = "test";
    TestCaseName["xit"] = "xit";
    TestCaseName["xtest"] = "xtest";
})(TestCaseName || (TestCaseName = {}));
var HookName;
(function (HookName) {
    HookName["beforeAll"] = "beforeAll";
    HookName["beforeEach"] = "beforeEach";
    HookName["afterAll"] = "afterAll";
    HookName["afterEach"] = "afterEach";
})(HookName || (HookName = {}));
var ModifierName;
(function (ModifierName) {
    ModifierName["not"] = "not";
    ModifierName["rejects"] = "rejects";
    ModifierName["resolves"] = "resolves";
})(ModifierName || (ModifierName = {}));
var EqualityMatcher;
(function (EqualityMatcher) {
    EqualityMatcher["toBe"] = "toBe";
    EqualityMatcher["toEqual"] = "toEqual";
    EqualityMatcher["toStrictEqual"] = "toStrictEqual";
})(EqualityMatcher || (EqualityMatcher = {}));
const findTopMostCallExpression = (node) => {
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
const isBooleanLiteral = (node) => node.type === AST_NODE_TYPES.Literal && typeof node.value === "boolean";
const getFirstMatcherArg = (expectFnCall) => {
    const [firstArg] = expectFnCall.args;
    if (firstArg.type === AST_NODE_TYPES.SpreadElement) {
        return firstArg;
    }
    return followTypeAssertionChain(firstArg);
};
const isInstanceOfBinaryExpression = (node, className) => node.type === AST_NODE_TYPES.BinaryExpression &&
    node.operator === "instanceof" &&
    isSupportedAccessor(node.right, className);
const isParsedInstanceOfMatcherCall = (expectFnCall, classArg) => {
    return (getAccessorValue(expectFnCall.matcher) === "toBeInstanceOf" &&
        expectFnCall.args.length === 1 &&
        isSupportedAccessor(expectFnCall.args[0], classArg));
};
/**
 * Checks if the given `ParsedExpectMatcher` is either a call to one of the equality matchers,
 * with a boolean` literal as the sole argument, *or* is a call to `toBeTrue` or `toBeFalse`.
 *
 * @param expectFnCall Parsed matcher call to check.
 * @returns Whether the matcher asserts a boolean equality.
 */
const isBooleanEqualityMatcher = (expectFnCall) => {
    const matcherName = getAccessorValue(expectFnCall.matcher);
    if (["toBeTrue", "toBeFalse"].includes(matcherName)) {
        return true;
    }
    if (expectFnCall.args.length !== 1) {
        return false;
    }
    const arg = getFirstMatcherArg(expectFnCall);
    return (Object.prototype.hasOwnProperty.call(EqualityMatcher, matcherName) && isBooleanLiteral(arg));
};

// Parser helpers intentionally return parsed data, failure reasons, or null.
/* eslint-disable sonarjs/function-return-type */
const joinChains = (a, b) => a && b ? [...a, ...b] : null;
const DEFINITION_TYPE = {
    ImportBinding: "ImportBinding",
    Variable: "Variable",
};
/**
 * Builds the static property-access chain for a node.
 *
 * @param node Node to inspect.
 * @returns Accessor chain when every link is statically known.
 */
function getNodeChain(node) {
    if (isSupportedAccessor(node)) {
        return [node];
    }
    switch (node.type) {
        case AST_NODE_TYPES.TaggedTemplateExpression: {
            return getNodeChain(node.tag);
        }
        case AST_NODE_TYPES.MemberExpression: {
            return joinChains(getNodeChain(node.object), getNodeChain(node.property));
        }
        case AST_NODE_TYPES.CallExpression: {
            return getNodeChain(node.callee);
        }
    }
    return null;
}
const determineJestFnType = (name) => {
    if (name === "expect") {
        return "expect";
    }
    if (name === "jest") {
        return "jest";
    }
    if (Object.prototype.hasOwnProperty.call(DescribeAlias, name)) {
        return "describe";
    }
    if (Object.prototype.hasOwnProperty.call(TestCaseName, name)) {
        return "test";
    }
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(HookName, name)) {
        return "hook";
    }
    /* istanbul ignore next */
    return "unknown";
};
const ValidJestFnCallChains = new Set([
    "afterAll",
    "afterEach",
    "beforeAll",
    "beforeEach",
    "describe",
    "describe.each",
    "describe.only",
    "describe.only.each",
    "describe.skip",
    "describe.skip.each",
    "fdescribe",
    "fdescribe.each",
    "xdescribe",
    "xdescribe.each",
    "it",
    "it.concurrent",
    "it.concurrent.failing",
    "it.concurrent.each",
    "it.concurrent.failing.each",
    "it.concurrent.failing.only.each",
    "it.concurrent.failing.skip.each",
    "it.concurrent.only.each",
    "it.concurrent.skip.each",
    "it.each",
    "it.failing",
    "it.failing.each",
    "it.only",
    "it.only.each",
    "it.only.failing",
    "it.only.failing.each",
    "it.skip",
    "it.skip.each",
    "it.skip.failing",
    "it.skip.failing.each",
    "it.todo",
    "fit",
    "fit.each",
    "fit.failing",
    "fit.failing.each",
    "xit",
    "xit.each",
    "xit.failing",
    "xit.failing.each",
    "test",
    "test.concurrent",
    "test.concurrent.failing",
    "test.concurrent.each",
    "test.concurrent.failing.each",
    "test.concurrent.failing.only.each",
    "test.concurrent.failing.skip.each",
    "test.concurrent.only.each",
    "test.concurrent.skip.each",
    "test.each",
    "test.failing",
    "test.failing.each",
    "test.only",
    "test.only.each",
    "test.only.failing",
    "test.only.failing.each",
    "test.skip",
    "test.skip.each",
    "test.skip.failing",
    "test.skip.failing.each",
    "test.todo",
    "xtest",
    "xtest.each",
    "xtest.failing",
    "xtest.failing.each",
]);
const resolvePossibleAliasedGlobal = (global, context) => {
    const globalAliases = context.settings.jest?.globalAliases ?? {};
    const alias = Object.entries(globalAliases).find(([, aliases]) => aliases.includes(global));
    if (alias) {
        return alias[0];
    }
    return null;
};
const parseJestFnCallCache = new WeakMap();
const parseJestFnCall = (node, context) => {
    const jestFnCall = parseJestFnCallWithReason(node, context);
    if (typeof jestFnCall === "string") {
        return null;
    }
    return jestFnCall;
};
const parseJestFnCallWithReason = (node, context) => {
    let parsedJestFnCall = parseJestFnCallCache.get(node);
    /* istanbul ignore next */
    if (parsedJestFnCall) {
        return parsedJestFnCall;
    }
    parsedJestFnCall = parseJestFnCallWithReasonInner(node, context);
    parseJestFnCallCache.set(node, parsedJestFnCall);
    return parsedJestFnCall;
};
const parseJestFnCallWithReasonInner = (node, context) => {
    const chain = getNodeChain(node);
    if (!chain?.length) {
        return null;
    }
    const [first, ...rest] = chain;
    const last = chain.at(-1);
    if (!last) {
        return null;
    }
    const lastLink = getAccessorValue(last);
    // if we're an `each()`, ensure we're the outer CallExpression (i.e `.each()()`)
    if (lastLink === "each" &&
        node.callee.type !== AST_NODE_TYPES.CallExpression &&
        node.callee.type !== AST_NODE_TYPES.TaggedTemplateExpression) {
        return null;
    }
    if (node.callee.type === AST_NODE_TYPES.TaggedTemplateExpression && lastLink !== "each") {
        return null;
    }
    const resolved = resolveToJestFn(context, first);
    // we're not a jest function
    if (!resolved) {
        return null;
    }
    const name = resolved.original ?? resolved.local;
    const links = [name, ...rest.map((link) => getAccessorValue(link))];
    if (name !== "jest" && name !== "expect" && !ValidJestFnCallChains.has(links.join("."))) {
        return null;
    }
    const parsedJestFnCall = {
        name,
        head: { ...resolved, node: first },
        // every member node must have a member expression as their parent
        // in order to be part of the call chain we're parsing
        members: rest,
    };
    const type = determineJestFnType(name);
    if (type === "expect") {
        return parseJestExpectCallForNode(parsedJestFnCall, node);
    }
    // check that every link in the chain except the last is a member expression
    if (chain.slice(0, -1).some((nod) => nod.parent?.type !== AST_NODE_TYPES.MemberExpression)) {
        return null;
    }
    // ensure that we're at the "top" of the function call chain otherwise when
    // parsing e.g. x().y.z(), we'll incorrectly find & parse "x()" even though
    // the full chain is not a valid jest function call chain
    if (node.parent?.type === AST_NODE_TYPES.CallExpression ||
        node.parent?.type === AST_NODE_TYPES.MemberExpression) {
        return null;
    }
    return { ...parsedJestFnCall, type };
};
const isCalledMatcherMember = (member) => member.parent?.type === AST_NODE_TYPES.MemberExpression &&
    member.parent.parent?.type === AST_NODE_TYPES.CallExpression;
const isValidSecondModifier = (modifiers, name) => {
    if (name !== "not") {
        return false;
    }
    const firstModifier = getAccessorValue(modifiers[0]);
    return firstModifier === "resolves" || firstModifier === "rejects";
};
const getModifierFailure = (modifiers, name) => {
    if (modifiers.length === 0) {
        return Object.prototype.hasOwnProperty.call(ModifierName, name) ? null : "modifier-unknown";
    }
    if (modifiers.length === 1) {
        return isValidSecondModifier(modifiers, name) ? null : "modifier-unknown";
    }
    return "modifier-unknown";
};
const findModifiersAndMatcher = (members) => {
    const modifiers = [];
    for (const member of members) {
        // check if the member is being called, which means it is the matcher
        // (and also the end of the entire "expect" call chain)
        if (isCalledMatcherMember(member)) {
            return {
                matcher: member,
                args: member.parent.parent.arguments,
                modifiers,
            };
        }
        // otherwise, it should be a modifier
        const name = getAccessorValue(member);
        const modifierFailure = getModifierFailure(modifiers, name);
        if (modifierFailure) {
            return modifierFailure;
        }
        modifiers.push(member);
    }
    // this will only really happen if there are no members
    return "matcher-not-found";
};
const parseJestExpectCall = (typelessParsedJestFnCall) => {
    const modifiersAndMatcher = findModifiersAndMatcher(typelessParsedJestFnCall.members);
    if (typeof modifiersAndMatcher === "string") {
        return modifiersAndMatcher;
    }
    return {
        ...typelessParsedJestFnCall,
        type: "expect",
        ...modifiersAndMatcher,
    };
};
const parseJestExpectCallForNode = (typelessParsedJestFnCall, node) => {
    const result = parseJestExpectCall(typelessParsedJestFnCall);
    // if the `expect` call chain is not valid, only report on the topmost node
    // since all members in the chain are likely to get flagged for some reason
    if (typeof result === "string" && findTopMostCallExpression(node) !== node) {
        return null;
    }
    if (result === "matcher-not-found" && node.parent?.type === AST_NODE_TYPES.MemberExpression) {
        return "matcher-not-called";
    }
    return result;
};
const describeImportDefAsImport = (def) => {
    if (def.parent.type === AST_NODE_TYPES.TSImportEqualsDeclaration) {
        return null;
    }
    if (def.node.type !== AST_NODE_TYPES.ImportSpecifier) {
        return null;
    }
    // we only care about value imports
    if (def.parent.importKind === "type") {
        return null;
    }
    return {
        source: def.parent.source.value,
        imported: getAccessorValue(def.node.imported),
        local: def.node.local.name,
    };
};
/**
 * Attempts to find the node that represents the import source for the given expression node, if it looks like it's an
 * import.
 *
 * If no such node can be found (e.g. because the expression doesn't look like an import), then `null` is returned
 * instead.
 *
 * @param node Expression to inspect.
 * @returns Import source node when the expression is an import-like call.
 */
const findImportSourceNode = (node) => {
    if (node.type === AST_NODE_TYPES.AwaitExpression) {
        if (node.argument.type === AST_NODE_TYPES.ImportExpression) {
            return node.argument.source;
        }
        return null;
    }
    if (node.type === AST_NODE_TYPES.CallExpression && isIdentifier(node.callee, "require")) {
        return node.arguments[0] ?? null;
    }
    return null;
};
const describeVariableDefAsImport = (def) => {
    // make sure that we've actually being assigned a value
    if (!def.node.init) {
        return null;
    }
    const sourceNode = findImportSourceNode(def.node.init);
    if (!sourceNode || !isStringNode(sourceNode)) {
        return null;
    }
    if (def.name.parent?.type !== AST_NODE_TYPES.Property) {
        return null;
    }
    if (!isSupportedAccessor(def.name.parent.key)) {
        return null;
    }
    return {
        source: getStringValue(sourceNode),
        imported: getAccessorValue(def.name.parent.key),
        local: def.name.name,
    };
};
/**
 * Attempts to describe a definition as an import if possible.
 *
 * If the definition is an import binding, it's described as you'd expect.
 * If the definition is a variable, then we try and determine if it's either a dynamic `import()` or otherwise a call to
 * `require()`.
 *
 * If it's neither of these, `null` is returned to indicate that the definition is not describable as an import of any
 * kind.
 *
 * @param def Definition to describe.
 * @returns Import details when the definition points to an import.
 */
const describePossibleImportDef = (def) => {
    if (def.type === DEFINITION_TYPE.Variable) {
        return describeVariableDefAsImport(def);
    }
    if (def.type === DEFINITION_TYPE.ImportBinding) {
        return describeImportDefAsImport(def);
    }
    return null;
};
const resolveScope = (scope, identifier) => {
    let currentScope = scope;
    while (currentScope !== null) {
        const ref = currentScope.set.get(identifier);
        if (ref && ref.defs.length > 0) {
            const def = ref.defs.at(-1);
            if (!def) {
                return "local";
            }
            const importDetails = describePossibleImportDef(def);
            if (importDetails?.local === identifier) {
                return importDetails;
            }
            return "local";
        }
        currentScope = currentScope.upper;
    }
    return null;
};
const resolveToJestFn = (context, accessor) => {
    const identifier = getAccessorValue(accessor);
    const maybeImport = resolveScope(getScope(context, accessor), identifier);
    // the identifier was found as a local variable or function declaration
    // meaning it's not a function from jest
    if (maybeImport === "local") {
        return null;
    }
    if (maybeImport) {
        const globalPackage = context.settings.jest?.globalPackage ?? "@jest/globals";
        // the identifier is imported from our global package so return the original import name
        if (maybeImport.source === globalPackage) {
            return {
                original: maybeImport.imported,
                local: maybeImport.local,
                type: "import",
            };
        }
        return null;
    }
    return {
        original: resolvePossibleAliasedGlobal(identifier, context),
        local: identifier,
        type: "global",
    };
};
/* istanbul ignore next */
const getScope = (context, node) => {
    return context.sourceCode.getScope(node);
};
/* eslint-enable sonarjs/function-return-type */

const isArrayIsArrayCall = (node) => node.type === AST_NODE_TYPES.CallExpression &&
    node.callee.type === AST_NODE_TYPES.MemberExpression &&
    isSupportedAccessor(node.callee.object, "Array") &&
    isSupportedAccessor(node.callee.property, "isArray");
var preferToBeArray = createRule({
    name: "prefer-to-be-array",
    meta: {
        docs: {
            description: "Suggest using `toBeArray()`",
        },
        messages: {
            preferToBeArray: "Prefer using `toBeArray()` to test if a value is an array.",
        },
        fixable: "code",
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                const jestFnCall = parseJestFnCall(node, context);
                if (jestFnCall?.type !== "expect") {
                    return;
                }
                if (isParsedInstanceOfMatcherCall(jestFnCall, "Array")) {
                    context.report({
                        node: jestFnCall.matcher,
                        messageId: "preferToBeArray",
                        fix: (fixer) => [
                            fixer.replaceTextRange([jestFnCall.matcher.range[0], jestFnCall.matcher.range[1] + "(Array)".length], "toBeArray()"),
                        ],
                    });
                    return;
                }
                const { parent: expect } = jestFnCall.head.node;
                if (expect?.type !== AST_NODE_TYPES.CallExpression) {
                    return;
                }
                const [expectArg] = expect.arguments;
                if (!expectArg ||
                    !isBooleanEqualityMatcher(jestFnCall) ||
                    !(isArrayIsArrayCall(expectArg) || isInstanceOfBinaryExpression(expectArg, "Array"))) {
                    return;
                }
                context.report({
                    node: jestFnCall.matcher,
                    messageId: "preferToBeArray",
                    fix(fixer) {
                        const fixes = [
                            fixer.replaceText(jestFnCall.matcher, "toBeArray"),
                            expectArg.type === AST_NODE_TYPES.CallExpression
                                ? fixer.remove(expectArg.callee)
                                : fixer.removeRange([expectArg.left.range[1], expectArg.range[1]]),
                        ];
                        let invertCondition = getAccessorValue(jestFnCall.matcher) === "toBeFalse";
                        if (jestFnCall.args.length > 0) {
                            const [matcherArg] = jestFnCall.args;
                            fixes.push(fixer.remove(matcherArg));
                            // toBeFalse can't have arguments, so this won't be true beforehand
                            invertCondition =
                                matcherArg.type === AST_NODE_TYPES.Literal &&
                                    followTypeAssertionChain(matcherArg).value === false;
                        }
                        if (invertCondition) {
                            const notModifier = jestFnCall.modifiers.find((nod) => getAccessorValue(nod) === "not");
                            fixes.push(notModifier
                                ? fixer.removeRange([notModifier.range[0] - 1, notModifier.range[1]])
                                : fixer.insertTextBefore(jestFnCall.matcher, "not."));
                        }
                        return fixes;
                    },
                });
            },
        };
    },
});

const isFalseLiteral = (node) => node.type === AST_NODE_TYPES.Literal && node.value === false;
var preferToBeFalse = createRule({
    name: "prefer-to-be-false",
    meta: {
        docs: {
            description: "Suggest using `toBeFalse()`",
        },
        messages: {
            preferToBeFalse: "Prefer using `toBeFalse()` to test value is `false`.",
        },
        fixable: "code",
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                const jestFnCall = parseJestFnCall(node, context);
                if (jestFnCall?.type !== "expect") {
                    return;
                }
                if (jestFnCall.args.length === 1 &&
                    isFalseLiteral(getFirstMatcherArg(jestFnCall)) &&
                    Object.prototype.hasOwnProperty.call(EqualityMatcher, getAccessorValue(jestFnCall.matcher))) {
                    context.report({
                        node: jestFnCall.matcher,
                        messageId: "preferToBeFalse",
                        fix: (fixer) => [
                            fixer.replaceText(jestFnCall.matcher, "toBeFalse"),
                            fixer.remove(jestFnCall.args[0]),
                        ],
                    });
                }
            },
        };
    },
});

var preferToBeObject = createRule({
    name: "prefer-to-be-object",
    meta: {
        docs: {
            description: "Suggest using `toBeObject()`",
        },
        messages: {
            preferToBeObject: "Prefer using `toBeObject()` to test if a value is an Object.",
        },
        fixable: "code",
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                const jestFnCall = parseJestFnCall(node, context);
                if (jestFnCall?.type !== "expect") {
                    return;
                }
                if (isParsedInstanceOfMatcherCall(jestFnCall, "Object")) {
                    context.report({
                        node: jestFnCall.matcher,
                        messageId: "preferToBeObject",
                        fix: (fixer) => [
                            fixer.replaceTextRange([jestFnCall.matcher.range[0], jestFnCall.matcher.range[1] + "(Object)".length], "toBeObject()"),
                        ],
                    });
                    return;
                }
                const { parent: expect } = jestFnCall.head.node;
                if (expect?.type !== AST_NODE_TYPES.CallExpression) {
                    return;
                }
                const [expectArg] = expect.arguments;
                if (!expectArg ||
                    !isBooleanEqualityMatcher(jestFnCall) ||
                    !isInstanceOfBinaryExpression(expectArg, "Object")) {
                    return;
                }
                context.report({
                    node: jestFnCall.matcher,
                    messageId: "preferToBeObject",
                    fix(fixer) {
                        const fixes = [
                            fixer.replaceText(jestFnCall.matcher, "toBeObject"),
                            fixer.removeRange([expectArg.left.range[1], expectArg.range[1]]),
                        ];
                        let invertCondition = getAccessorValue(jestFnCall.matcher) === "toBeFalse";
                        if (jestFnCall.args?.length) {
                            const [matcherArg] = jestFnCall.args;
                            fixes.push(fixer.remove(matcherArg));
                            // toBeFalse can't have arguments, so this won't be true beforehand
                            invertCondition =
                                matcherArg.type === AST_NODE_TYPES.Literal &&
                                    followTypeAssertionChain(matcherArg).value === false;
                        }
                        if (invertCondition) {
                            const notModifier = jestFnCall.modifiers.find((nod) => getAccessorValue(nod) === "not");
                            fixes.push(notModifier
                                ? fixer.removeRange([notModifier.range[0] - 1, notModifier.range[1]])
                                : fixer.insertTextBefore(jestFnCall.matcher, "not."));
                        }
                        return fixes;
                    },
                });
            },
        };
    },
});

var preferToHaveBeenCalledOnce = createRule({
    name: "prefer-to-have-been-called-once",
    meta: {
        docs: {
            description: "Suggest using `toHaveBeenCalledOnce()`",
        },
        messages: {
            preferCalledOnce: "Prefer `toHaveBeenCalledOnce()`",
        },
        fixable: "code",
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                const jestFnCall = parseJestFnCall(node, context);
                if (jestFnCall?.type !== "expect") {
                    return;
                }
                if (getAccessorValue(jestFnCall.matcher) === "toHaveBeenCalledTimes" &&
                    jestFnCall.args.length === 1) {
                    const arg = getFirstMatcherArg(jestFnCall);
                    if (arg.type !== AST_NODE_TYPES.Literal || arg.value !== 1) {
                        return;
                    }
                    context.report({
                        node: jestFnCall.matcher,
                        messageId: "preferCalledOnce",
                        fix: (fixer) => [
                            fixer.replaceText(jestFnCall.matcher, "toHaveBeenCalledOnce"),
                            fixer.remove(jestFnCall.args[0]),
                        ],
                    });
                }
            },
        };
    },
});

const isTrueLiteral = (node) => node.type === AST_NODE_TYPES.Literal && node.value === true;
var preferToBeTrue = createRule({
    name: "prefer-to-be-true",
    meta: {
        docs: {
            description: "Suggest using `toBeTrue()`",
        },
        messages: {
            preferToBeTrue: "Prefer using `toBeTrue()` to test value is `true`.",
        },
        fixable: "code",
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                const jestFnCall = parseJestFnCall(node, context);
                if (jestFnCall?.type !== "expect") {
                    return;
                }
                if (jestFnCall.args.length === 1 &&
                    isTrueLiteral(getFirstMatcherArg(jestFnCall)) &&
                    Object.prototype.hasOwnProperty.call(EqualityMatcher, getAccessorValue(jestFnCall.matcher))) {
                    context.report({
                        node: jestFnCall.matcher,
                        messageId: "preferToBeTrue",
                        fix: (fixer) => [
                            fixer.replaceText(jestFnCall.matcher, "toBeTrue"),
                            fixer.remove(jestFnCall.args[0]),
                        ],
                    });
                }
            },
        };
    },
});

const rules = {
    "prefer-to-be-array": preferToBeArray,
    "prefer-to-be-false": preferToBeFalse,
    "prefer-to-be-object": preferToBeObject,
    "prefer-to-be-true": preferToBeTrue,
    "prefer-to-have-been-called-once": preferToHaveBeenCalledOnce,
};

const namespace$1 = "jest-extended";
const allRules = Object.fromEntries(Object.entries(rules)
    .filter(([, rule]) => !rule.meta?.deprecated)
    .map(([name]) => [`${namespace$1}/${name}`, "error"]));

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

export { plugin as default };
//# sourceMappingURL=index.js.map
