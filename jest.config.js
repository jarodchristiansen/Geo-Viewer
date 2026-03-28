// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/styles/(.*)$": "<rootDir>/styles/$1",
    "^@/helpers/(.*)$": "<rootDir>/helpers/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

// next/jest defaults to the @next/swc native transformer. On some Windows installs the
// downloaded next-swc.win32-x64-msvc.node is invalid ("not a valid Win32 application").
// That "binary" is a normal compiled addon—nothing suspicious—but Jest workers crash if it
// won't load. Use Babel for tests instead (same as next build when .babelrc disables SWC).
const withBabelTransform = async () => {
  const config = await createJestConfig(customJestConfig)();
  return {
    ...config,
    transform: {
      ...config.transform,
      "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
    },
  };
};

module.exports = withBabelTransform;
