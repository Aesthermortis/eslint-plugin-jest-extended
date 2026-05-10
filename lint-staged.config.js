// @ts-check

const config = {
  "**/*": ["prettier --write --ignore-unknown"],
  "**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}": [
    "eslint --fix --max-warnings=0 --report-unused-disable-directives --no-warn-ignored",
  ],
};

export default config;
