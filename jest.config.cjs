module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  collectCoverageFrom: [
    "src/pages/*.{js,jsx}",
    "!src/main.jsx",
    "!src/vite-env.d.js",
  ],
  testEnvironment: "jsdom",
};
