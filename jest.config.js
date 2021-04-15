module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
      "\\.(css|sass)$": "identity-obj-proxy",
    },
  };
