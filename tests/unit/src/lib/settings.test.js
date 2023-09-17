const {
  setAPIConfig,
  setOAuthPaths,
} = require("../../../../src/lib/settings.js");

describe("settings", () => {
  let app;

  beforeEach(() => {
    app = {
      set: jest.fn(),
    };
  });

  describe("setAPIConfig", () => {
    it("should set 'API.API_BASE_URL", () => {
      setAPIConfig({ app, baseUrl: "http://example.com" });

      expect(app.set).toBeCalledWith("API.BASE_URL", "http://example.com");
    });

    it("should set 'API.PATHS.SESSION", () => {
      setAPIConfig({ app, sessionPath: "/api/session" });

      expect(app.set).toBeCalledWith("API.PATHS.SESSION", "/api/session");
    });

    it("should set 'API.PATHS.SESSION", () => {
      setAPIConfig({ app, authorizationPath: "/api/authorization" });

      expect(app.set).toBeCalledWith(
        "API.PATHS.AUTHORIZATION",
        "/api/authorization"
      );
    });
  });

  describe("setOAuthPaths", () => {
    it("should set 'APP.PATHS.ENTRYPOINT", () => {
      setOAuthPaths({ app, entryPointPath: "/website/subpath" });

      expect(app.set).toBeCalledWith(
        "APP.PATHS.ENTRYPOINT",
        "/website/subpath"
      );
    });
  });
});
