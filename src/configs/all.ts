import type { Linter } from 'eslint';

import rules from '../rules/index.js';

const namespace = 'jest-extended';

const allRules: Linter.RulesRecord = Object.fromEntries(
  Object.entries(rules)
    .filter(([, rule]) => !rule.meta?.deprecated)
    .map(([name]) => [`${namespace}/${name}`, 'error']),
);

export default allRules;
