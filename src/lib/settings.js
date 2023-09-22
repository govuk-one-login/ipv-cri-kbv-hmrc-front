module.exports = {
  setAPIConfig: ({ app, baseUrl, sessionPath, authorizationPath }) => {
    app.set("API.BASE_URL", baseUrl);
    app.set("API.PATHS.SESSION", sessionPath);
    app.set("API.PATHS.AUTHORIZATION", authorizationPath);
  },

  setOAuthPaths: ({ app, entryPointPath }) => {
    app.set("APP.PATHS.ENTRYPOINT", entryPointPath);
  },

  setAssetsPath: ({ app, assetsPath }) => {
    app.set("APP.ASSET_PATH", assetsPath);
  },
};
