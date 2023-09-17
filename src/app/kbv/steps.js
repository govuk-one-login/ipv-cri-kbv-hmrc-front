module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "intro",
  },
  "/intro": {
    next: "/oauth2/callback",
  },
};
