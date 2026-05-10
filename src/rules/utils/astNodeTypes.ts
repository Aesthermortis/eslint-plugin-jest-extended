import type { AST_NODE_TYPES as AstNodeTypes } from "@typescript-eslint/utils";

export const AST_NODE_TYPES = {
  AwaitExpression: "AwaitExpression" as AstNodeTypes.AwaitExpression,
  BinaryExpression: "BinaryExpression" as AstNodeTypes.BinaryExpression,
  CallExpression: "CallExpression" as AstNodeTypes.CallExpression,
  Identifier: "Identifier" as AstNodeTypes.Identifier,
  ImportExpression: "ImportExpression" as AstNodeTypes.ImportExpression,
  ImportSpecifier: "ImportSpecifier" as AstNodeTypes.ImportSpecifier,
  Literal: "Literal" as AstNodeTypes.Literal,
  MemberExpression: "MemberExpression" as AstNodeTypes.MemberExpression,
  Property: "Property" as AstNodeTypes.Property,
  SpreadElement: "SpreadElement" as AstNodeTypes.SpreadElement,
  TaggedTemplateExpression: "TaggedTemplateExpression" as AstNodeTypes.TaggedTemplateExpression,
  TemplateLiteral: "TemplateLiteral" as AstNodeTypes.TemplateLiteral,
  TSAsExpression: "TSAsExpression" as AstNodeTypes.TSAsExpression,
  TSImportEqualsDeclaration: "TSImportEqualsDeclaration" as AstNodeTypes.TSImportEqualsDeclaration,
  TSTypeAssertion: "TSTypeAssertion" as AstNodeTypes.TSTypeAssertion,
} as const;
