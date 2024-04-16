(function (w) {
  var configuration = {
    config: {
      sdkHost: "sdk.loyaltylion.net",
      sdkStaticHost: "sdk.loyaltylion.net",
      platformHost: "platform.loyaltylion.com",
      appHost: "app.loyaltylion.com",
      bigCommerceClientId: "rb9cjzk9jybx0lnlz2mbelz9nqzsxjp",
      translationsDigest: "99ec4c84e1c258bd7b7334d4c5bfbf18",
      api: { revision: "0888efc154", build: 0 },
    },
    site: {
      id: 52236,
      platform: "shopify",
      settings: {
        integratedLoyaltyPageState: "only",
        locale: { primary: "de", date: "en", number: "en" },
        loyaltyPanel: { customCSSDigest: null },
        sdkTheme: "modern",
        useAppTurnkey: false,
      },
      meta: {
        loyaltyPanelCustomisationDigest: "bac0389867911711a30ac44090388abc",
        legacyUiMigration: {
          actionsCompleted: [],
          deadlineDate: null,
          lastPromptedAt: null,
          migrationState: "not_started",
          migrationTarget: "turnkey",
          selectedForMigration: false,
        },
      },
      uiMode: "integrated_page_only",
    },
  };
  w.loyaltylion && typeof w.loyaltylion.bootstrap === "function"
    ? w.loyaltylion.bootstrap(configuration)
    : w.lion && typeof w.lion._push === "function"
    ? w.lion._push(["configuration_v2", configuration])
    : !0;
})(window);
