!(function (n) {
  "use strict";
  let e;
  !(function (n) {
    (n.TRACKING_ACCEPTED = "trackingConsentAccepted"),
      (n.TRACKING_DECLINED = "trackingConsentDeclined"),
      (n.MARKETING_ACCEPTED = "firstPartyMarketingConsentAccepted"),
      (n.SALE_OF_DATA_ACCEPTED = "thirdPartyMarketingConsentAccepted"),
      (n.ANALYTICS_ACCEPTED = "analyticsConsentAccepted"),
      (n.PREFERENCES_ACCEPTED = "preferencesConsentAccepted"),
      (n.MARKETING_DECLINED = "firstPartyMarketingConsentDeclined"),
      (n.SALE_OF_DATA_DECLINED = "thirdPartyMarketingConsentDeclined"),
      (n.ANALYTICS_DECLINED = "analyticsConsentDeclined"),
      (n.PREFERENCES_DECLINED = "preferencesConsentDeclined"),
      (n.CONSENT_COLLECTED = "visitorConsentCollected"),
      (n.CONSENT_TRACKING_API_LOADED = "consentTrackingApiLoaded");
  })(e || (e = {}));
  let t, o, r, c, i, s, a;
  !(function (n) {
    (n.ACCEPTED = "yes"),
      (n.DECLINED = "no"),
      (n.NO_INTERACTION = "no_interaction"),
      (n.NO_VALUE = "");
  })(t || (t = {})),
    (function (n) {
      (n.NO_VALUE = ""), (n.ACCEPTED = "1"), (n.DECLINED = "0");
    })(o || (o = {})),
    (function (n) {
      (n.GDPR = "GDPR"), (n.CCPA = "CCPA"), (n.NO_VALUE = "");
    })(r || (r = {})),
    (function (n) {
      (n.PREFERENCES = "p"),
        (n.ANALYTICS = "a"),
        (n.MARKETING = "m"),
        (n.SALE_OF_DATA = "t");
    })(c || (c = {})),
    (function (n) {
      (n.MARKETING = "m"),
        (n.ANALYTICS = "a"),
        (n.PREFERENCES = "p"),
        (n.SALE_OF_DATA = "s");
    })(i || (i = {})),
    (function (n) {
      (n.MARKETING = "marketing"),
        (n.ANALYTICS = "analytics"),
        (n.PREFERENCES = "preferences"),
        (n.SALE_OF_DATA = "sale_of_data"),
        (n.EMAIL = "email");
    })(s || (s = {})),
    (function (n) {
      (n.HEADLESS_STOREFRONT = "headlessStorefront"),
        (n.ROOT_DOMAIN = "rootDomain"),
        (n.CHECKOUT_ROOT_DOMAIN = "checkoutRootDomain"),
        (n.STOREFRONT_ROOT_DOMAIN = "storefrontRootDomain"),
        (n.STOREFRONT_ACCESS_TOKEN = "storefrontAccessToken");
    })(a || (a = {}));
  const u = ["v", "con", "reg"];
  function l(n, e) {
    var t = Object.keys(n);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(n);
      e &&
        (o = o.filter(function (e) {
          return Object.getOwnPropertyDescriptor(n, e).enumerable;
        })),
        t.push.apply(t, o);
    }
    return t;
  }
  function E(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? l(Object(t), !0).forEach(function (e) {
            A(n, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t))
        : l(Object(t)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return n;
  }
  function A(n, e, t) {
    return (
      e in n
        ? Object.defineProperty(n, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (n[e] = t),
      n
    );
  }
  function f(n) {
    const e = document.cookie ? document.cookie.split("; ") : [];
    for (let t = 0; t < e.length; t++) {
      const [o, r] = e[t].split("=");
      if (n === decodeURIComponent(o)) {
        return JSON.parse(decodeURIComponent(r));
      }
    }
  }
  function C(n, e) {
    if (null === e) return;
    let t,
      o,
      r = document.head.querySelector("meta[name=".concat(e, "]"));
    if (r instanceof HTMLMetaElement) {
      t = r.content;
      try {
        const n = t.replace(/1/g, "true").replace(/0/g, "false"),
          e = n
            .split(";")
            .map((n) => n.trim())
            .map((n) => n.split("=").map((n) => n.trim()));
        if (((o = Object.fromEntries(e)), o.purposes)) {
          const n = o.purposes.split(/(true|false)/).filter(Boolean),
            e = {};
          for (let t = 0; t < n.length; t += 2) e[n[t]] = JSON.parse(n[t + 1]);
          o.purposes = e;
        }
        for (let [n, e] of Object.entries(o))
          "true" === e && (o[n] = !0), "false" === e && (o[n] = !1);
      } catch (n) {
        return;
      }
      return o;
    }
  }
  function d(n) {
    let e =
      arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    return f(n) || C(0, e);
  }
  function T(n) {
    return n === encodeURIComponent(decodeURIComponent(n));
  }
  function p(n, e, t, o) {
    if (!T(o))
      throw new TypeError("Cookie value is not correctly URI encoded.");
    if (!T(n)) throw new TypeError("Cookie name is not correctly URI encoded.");
    let r = "".concat(n, "=").concat(o);
    (r += "; path=/"),
      (r += "; domain=".concat(e)),
      (r += "; expires=".concat(
        new Date(new Date().getTime() + t).toUTCString()
      )),
      (r += "; secure"),
      (document.cookie = r);
  }
  function N() {
    const n = d("_tracking_consent");
    if (
      void 0 !== n &&
      !(function (n) {
        if ("2.1" !== n.v) return !0;
        return !(function (n, e) {
          const t = e.slice().sort();
          return (
            n.length === e.length &&
            n
              .slice()
              .sort()
              .every((n, e) => n === t[e])
          );
        })(
          Object.keys(n).filter((n) => "region" !== n && "lim" !== n),
          u
        );
      })(n)
    )
      return n;
  }
  function _() {
    try {
      let n = N();
      if (!n) return;
      return n;
    } catch (n) {
      return;
    }
  }
  function g() {
    return {
      m: y(i.MARKETING),
      a: y(i.ANALYTICS),
      p: y(i.PREFERENCES),
      s: y(i.SALE_OF_DATA),
    };
  }
  function O() {
    return g()[i.SALE_OF_DATA];
  }
  function D() {
    let n =
      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
    return null === n && (n = _()), void 0 === n;
  }
  function R(n) {
    switch (n) {
      case o.ACCEPTED:
        return t.ACCEPTED;
      case o.DECLINED:
        return t.DECLINED;
      default:
        return t.NO_VALUE;
    }
  }
  function S(n) {
    switch (n) {
      case i.ANALYTICS:
        return s.ANALYTICS;
      case i.MARKETING:
        return s.MARKETING;
      case i.PREFERENCES:
        return s.PREFERENCES;
      case i.SALE_OF_DATA:
        return s.SALE_OF_DATA;
    }
  }
  function y(n) {
    const e = _();
    if (!e) return o.NO_VALUE;
    const t = e.con.CMP;
    return t ? t[n] : o.NO_VALUE;
  }
  function h() {
    return d("_cmp_a", "shopify-cmp-metadata");
  }
  function I(n) {
    const e = h();
    if (!e) return !0;
    const t = e.purposes[n];
    return "boolean" != typeof t || t;
  }
  function w() {
    return I(c.PREFERENCES);
  }
  function L() {
    return I(c.ANALYTICS);
  }
  function m() {
    return I(c.MARKETING);
  }
  function P() {
    return I(c.SALE_OF_DATA);
  }
  function b() {
    const n = h();
    return !!n && "boolean" == typeof n.display_banner && n.display_banner;
  }
  function k() {
    const n = h();
    return (n && n.sale_of_data_region) || !1;
  }
  function v(n) {
    void 0 !== n.consent
      ? F({
          [c.PREFERENCES]: n.consent,
          [c.ANALYTICS]: n.consent,
          [c.MARKETING]: n.consent,
          [c.SALE_OF_DATA]: n.consent,
        })
      : void 0 !== n.granular_consent &&
        F({
          [c.PREFERENCES]: w(),
          [c.ANALYTICS]: L(),
          [c.MARKETING]: m(),
          [c.SALE_OF_DATA]: P(),
        });
  }
  function M(n, e) {
    document.dispatchEvent(new CustomEvent(n, { detail: e || {} }));
  }
  function F(n) {
    const t = n[c.MARKETING],
      o = n[c.SALE_OF_DATA],
      r = n[c.ANALYTICS],
      i = n[c.PREFERENCES];
    !0 === t ? M(e.MARKETING_ACCEPTED) : !1 === t && M(e.MARKETING_DECLINED),
      !0 === o
        ? M(e.SALE_OF_DATA_ACCEPTED)
        : !1 === o && M(e.SALE_OF_DATA_DECLINED),
      !0 === r ? M(e.ANALYTICS_ACCEPTED) : !1 === r && M(e.ANALYTICS_DECLINED),
      !0 === i
        ? M(e.PREFERENCES_ACCEPTED)
        : !1 === i && M(e.PREFERENCES_DECLINED);
    const s = (function (n) {
      return {
        marketingAllowed: n[c.MARKETING],
        saleOfDataAllowed: n[c.SALE_OF_DATA],
        analyticsAllowed: n[c.ANALYTICS],
        preferencesAllowed: n[c.PREFERENCES],
        firstPartyMarketingAllowed: n[c.MARKETING],
        thirdPartyMarketingAllowed: n[c.SALE_OF_DATA],
      };
    })(n);
    M(e.CONSENT_COLLECTED, s);
    const a = [r, i, t, o];
    a.every((n) => !0 === n) && M(e.TRACKING_ACCEPTED),
      a.every((n) => !1 === n) && M(e.TRACKING_DECLINED);
  }
  function j(n, e) {
    const t = new XMLHttpRequest(),
      o = JSON.stringify(n);
    t.open("POST", "/set_tracking_consent.json", !0),
      t.setRequestHeader("Content-Type", "application/json"),
      (t.onreadystatechange = function () {
        if (4 !== t.readyState) return;
        const o = (function (n) {
          try {
            return JSON.parse(n);
          } catch (n) {
            return { error: "Unknown error" };
          }
        })(t.responseText);
        var r;
        0 === (r = t.status) || (200 >= r && r < 400)
          ? (v(n), e(null, o))
          : e(o);
      }),
      t.send(o);
  }
  function G(n) {
    const e = JSON.stringify({
      marketing: n.marketing,
      analytics: n.analytics,
      preferences: n.preferences,
      saleOfData: n.sale_of_data,
    }).replace(/"/g, "");
    return {
      query: "query { consentManagement { cookies(visitorConsent: ".concat(
        e,
        ") { answersCookie trackingConsentCookie } } }"
      ),
      variables: {},
    };
  }
  function K(n, e) {
    const t = n.granular_consent,
      o = {
        headers: {
          "content-type": "application/json",
          "x-shopify-storefront-access-token": t.storefrontAccessToken,
        },
        body: JSON.stringify(G(t)),
        method: "POST",
      };
    fetch(
      "https://".concat(t.checkoutRootDomain, "/api/unstable/graphql.json"),
      o
    )
      .then((n) => {
        if (n.ok) return n.json();
        throw new Error("Server error");
      })
      .then((o) => {
        const r = "." + (t.checkoutRootDomain || window.location.hostname),
          c = "." + (t.storefrontRootDomain || window.location.hostname),
          i = o.data.consentManagement.cookies.trackingConsentCookie,
          s = o.data.consentManagement.cookies.answersCookie;
        p("_tracking_consent", r, 31536e6, i),
          p("_cmp_a", r, 31536e6, s),
          c !== r &&
            (p("_tracking_consent", c, 31536e6, i), p("_cmp_a", c, 31536e6, s)),
          v(n),
          e(null, o);
      })
      .catch((n) => {
        e({ error: "Error while setting headless consent: " + n.message });
      });
  }
  function U(n, e) {
    if (
      (e ||
        (e = () =>
          console.warn(
            "setTrackingConsent should use a callback because it is an async function. Use an empty callback to silence the warning."
          )),
      D() &&
        console.warn(
          "Shop is not configured to block privacy regulation in online store settings."
        ),
      (function (n) {
        if ("boolean" != typeof n && "object" != typeof n)
          throw TypeError(
            "setTrackingConsent must be called with a boolean or object consent value"
          );
        if ("object" == typeof n) {
          const e = Object.keys(n);
          if (0 === e.length)
            throw TypeError("The submitted consent object is empty.");
          const t = [
            s.MARKETING,
            s.ANALYTICS,
            s.PREFERENCES,
            s.SALE_OF_DATA,
            s.EMAIL,
            a.ROOT_DOMAIN,
            a.CHECKOUT_ROOT_DOMAIN,
            a.STOREFRONT_ROOT_DOMAIN,
            a.STOREFRONT_ACCESS_TOKEN,
            a.HEADLESS_STOREFRONT,
          ];
          for (const n of e)
            if (!t.includes(n))
              throw TypeError(
                "The submitted consent object should only contain the following keys: "
                  .concat(t.join(", "), ". Extraneous key: ")
                  .concat(n, ".")
              );
        }
      })(n),
      "function" != typeof e)
    )
      throw TypeError(
        "setTrackingConsent must be called with a callback function"
      );
    if ("object" == typeof n) {
      const t = H(n.analytics),
        o = x(n.analytics);
      return (n.storefrontAccessToken ? K : j)(
        E(
          E({ granular_consent: n }, null !== t && { referrer: t }),
          null !== o && { landing_page: o }
        ),
        e
      );
    }
    {
      const t = H(n),
        o = x(n);
      return j(
        E(
          E({ consent: n }, null !== t && { referrer: t }),
          null !== o && { landing_page: o }
        ),
        e
      );
    }
  }
  function Y(n, e) {
    if ("boolean" != typeof n)
      throw TypeError(
        "setCCPAConsent must be called with a boolean consent value"
      );
    if ("function" != typeof e)
      throw TypeError("setCCPAConsent must be called with a callback function");
    return j({ ccpa_consent: n }, e);
  }
  function V() {
    if (D()) return t.NO_VALUE;
    const n = g();
    return n[i.MARKETING] === o.ACCEPTED && n[i.ANALYTICS] === o.ACCEPTED
      ? t.ACCEPTED
      : n[i.MARKETING] === o.DECLINED || n[i.ANALYTICS] === o.DECLINED
      ? t.DECLINED
      : t.NO_INTERACTION;
  }
  function B() {
    const n = (function () {
      const n = _();
      return D(n) ? r.NO_VALUE : n.reg;
    })();
    return n in r ? n : r.NO_VALUE;
  }
  function q() {
    return (
      console.warn("getShopPrefs is deprecated and will be removed."),
      { limit: [] }
    );
  }
  function H(n) {
    return n ? (X() ? document.referrer : "") : null;
  }
  function x(n) {
    return n
      ? X()
        ? window.location.pathname + window.location.search
        : "/"
      : null;
  }
  function J() {
    return (function () {
      const n = _();
      return D(n) ? "" : n.region || "";
    })();
  }
  function X() {
    if ("" === document.referrer) return !0;
    const n = document.createElement("a");
    return (n.href = document.referrer), window.location.hostname != n.hostname;
  }
  function z() {
    return (
      console.warn("isRegulationEnforced is deprecated and will be removed."),
      !0
    );
  }
  function Q() {
    return !!D() || (m() && L());
  }
  function W() {
    return k()
      ? "string" == typeof navigator.globalPrivacyControl
        ? "1" !== navigator.globalPrivacyControl
        : "boolean" == typeof navigator.globalPrivacyControl
        ? !navigator.globalPrivacyControl
        : null
      : null;
  }
  function Z() {
    return (
      console.warn(
        "userDataCanBeSold is deprecated and will be replaced with saleOfDataAllowed."
      ),
      P()
    );
  }
  function $() {
    return b() && V() === t.NO_INTERACTION;
  }
  function nn() {
    return !1 === W()
      ? t.DECLINED
      : ((n = O()),
        D() ? t.NO_VALUE : n === o.NO_VALUE ? t.NO_INTERACTION : R(n));
    var n;
  }
  function en() {
    return (
      console.warn("shouldShowCCPABanner is deprecated and will be removed."),
      k() && nn() === t.NO_INTERACTION
    );
  }
  function tn() {
    return !0;
  }
  function on(n, e, t) {
    try {
      var o;
      !(function (n) {
        const e = new XMLHttpRequest();
        e.open("POST", "https://notify.bugsnag.com/", !0),
          e.setRequestHeader("Content-Type", "application/json"),
          e.setRequestHeader(
            "Bugsnag-Api-Key",
            "95ba910bcec4542ef2a0b64cd7ca666c"
          ),
          e.setRequestHeader("Bugsnag-Payload-Version", "5");
        const t = (function (n) {
          const e = (function (n) {
              return n.stackTrace || n.stack || n.description || n.name;
            })(n.error),
            [t, o] = (e || "unknown error").split("\n")[0].split(":");
          return JSON.stringify({
            payloadVersion: 5,
            notifier: {
              name: "ConsentTrackingAPI",
              version: "latest",
              url: "-",
            },
            events: [
              {
                exceptions: [
                  {
                    errorClass: (t || "").trim(),
                    message: (o || "").trim(),
                    stacktrace: [
                      {
                        file: "consent-tracking-api.js",
                        lineNumber: "1",
                        method: e,
                      },
                    ],
                    type: "browserjs",
                  },
                ],
                context: n.context || "general",
                app: { id: "ConsentTrackingAPI", version: "latest" },
                metaData: {
                  request: { shopId: n.shopId, shopUrl: window.location.href },
                  device: { userAgent: window.navigator.userAgent },
                  "Additional Notes": n.notes,
                },
                unhandled: !1,
              },
            ],
          });
        })(n);
        e.send(t);
      })({
        error: n,
        context: e,
        shopId:
          cn() ||
          (null === (o = window.Shopify) || void 0 === o ? void 0 : o.shop),
        notes: t,
      });
    } catch (n) {}
  }
  function rn(n) {
    return function () {
      try {
        return n(...arguments);
      } catch (n) {
        throw (on(n), n);
      }
    };
  }
  function cn() {
    try {
      const n = document.getElementById("shopify-features").textContent;
      return JSON.parse(n).shopId;
    } catch (n) {
      return null;
    }
  }
  function sn() {
    return m();
  }
  function an() {
    return P();
  }
  function un() {
    const n = {},
      e = g();
    for (const t of Object.keys(e)) n[S(t)] = R(e[t]);
    return n;
  }
  function ln(n, e) {
    return "object" == typeof n &&
      n.headlessStorefront &&
      !n.storefrontAccessToken
      ? (function (n, e) {
          function t(n) {
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : o.NO_VALUE;
            return !0 === n ? o.ACCEPTED : !1 === n ? o.DECLINED : e;
          }
          const c = {
              [i.ANALYTICS]: t(n[s.ANALYTICS], o.DECLINED),
              [i.MARKETING]: t(n[s.MARKETING], o.DECLINED),
              [i.PREFERENCES]: t(n[s.PREFERENCES], o.DECLINED),
              [i.SALE_OF_DATA]: t(n[s.SALE_OF_DATA]),
            },
            a = { v: "2.1", reg: r.NO_VALUE, con: { CMP: c } },
            u = encodeURIComponent(JSON.stringify(a));
          p("_tracking_consent", n.rootDomain, 31536e6, u), e(null);
        })(n, e)
      : U(n, e);
  }
  const En = (n) => {
    let { useBugsnagReporting: e } = n;
    O() != o.DECLINED && !1 === W() && Y(!1, () => !1);
    const t = {
      getTrackingConsent: V,
      setTrackingConsent: ln,
      userCanBeTracked: Q,
      getRegulation: B,
      isRegulationEnforced: z,
      getShopPrefs: q,
      shouldShowGDPRBanner: $,
      userDataCanBeSold: Z,
      setCCPAConsent: Y,
      getCCPAConsent: nn,
      shouldShowCCPABanner: en,
      doesMerchantSupportGranularConsent: tn,
      analyticsProcessingAllowed: L,
      preferencesProcessingAllowed: w,
      marketingAllowed: sn,
      firstPartyMarketingAllowed: sn,
      saleOfDataAllowed: an,
      thirdPartyMarketingAllowed: an,
      currentVisitorConsent: un,
      shouldShowBanner: b,
      saleOfDataRegion: k,
      getRegion: J,
      unstable: {
        analyticsProcessingAllowed: L,
        preferencesProcessingAllowed: w,
        marketingAllowed: sn,
        saleOfDataAllowed: an,
        currentVisitorConsent: un,
        shouldShowBanner: b,
        saleOfDataRegion: k,
      },
    };
    if (!e) return t;
    const r = ["unstable"];
    for (const n in t)
      t.hasOwnProperty(n) && (t[n] = r.includes(n) ? t[n] : rn(t[n]));
    return t;
  };
  function An() {
    let n =
      arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : { useBugsnagReporting: !1 };
    return En(n);
  }
  function fn() {
    (window.Shopify.customerPrivacy = window.Shopify.trackingConsent =
      An({ useBugsnagReporting: !0 })),
      M(e.CONSENT_TRACKING_API_LOADED);
  }
  (window.Shopify = window.Shopify ? window.Shopify : {}),
    fn(),
    (n.default = An),
    (n.setGlobalObject = fn),
    Object.defineProperty(n, "__esModule", { value: !0 });
})({});
//# sourceMappingURL=consent-tracking-api.js.map
