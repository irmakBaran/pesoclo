(self.webpackChunkclient = self.webpackChunkclient || []).push([
  [52],
  {
    52: (t, e, n) => {
      "use strict";
      n.d(e, { default: () => v });
      var a = n(300);
      const r = (...t) => {
          console.log("[klarna-osm]", ...t);
        },
        o = (t) => new Promise((e) => setTimeout(e, t));
      var i = n(573);
      const c = {
          "Europe/Vienna": "AT",
          "Australia/Lord_Howe": "AU",
          "Antarctica/Macquarie": "AU",
          "Australia/Hobart": "AU",
          "Australia/Currie": "AU",
          "Australia/Melbourne": "AU",
          "Australia/Sydney": "AU",
          "Australia/Broken_Hill": "AU",
          "Australia/Brisbane": "AU",
          "Australia/Lindeman": "AU",
          "Australia/Adelaide": "AU",
          "Australia/Darwin": "AU",
          "Australia/Perth": "AU",
          "Australia/Eucla": "AU",
          "Europe/Brussels": "BE",
          "America/St_Johns": "CA",
          "America/Halifax": "CA",
          "America/Glace_Bay": "CA",
          "America/Moncton": "CA",
          "America/Goose_Bay": "CA",
          "America/Blanc-Sablon": "CA",
          "America/Toronto": "CA",
          "America/Nipigon": "CA",
          "America/Thunder_Bay": "CA",
          "America/Iqaluit": "CA",
          "America/Pangnirtung": "CA",
          "America/Resolute": "CA",
          "America/Atikokan": "CA",
          "America/Rankin_Inlet": "CA",
          "America/Winnipeg": "CA",
          "America/Rainy_River": "CA",
          "America/Regina": "CA",
          "America/Swift_Current": "CA",
          "America/Edmonton": "CA",
          "America/Cambridge_Bay": "CA",
          "America/Yellowknife": "CA",
          "America/Inuvik": "CA",
          "America/Creston": "CA",
          "America/Dawson_Creek": "CA",
          "America/Vancouver": "CA",
          "America/Whitehorse": "CA",
          "America/Dawson": "CA",
          "Europe/Zurich": "CH",
          "Europe/Prague": "CZ",
          "Europe/Berlin": "DE",
          "Europe/Busingen": "DE",
          "Europe/Copenhagen": "DK",
          "Europe/Madrid": "ES",
          "Africa/Ceuta": "ES",
          "Atlantic/Canary": "ES",
          "Europe/Helsinki": "FI",
          "Europe/Paris": "FR",
          "Europe/Budapest": "HU",
          "Europe/Rome": "IT",
          "America/Mexico_City": "MX",
          "America/Cancun": "MX",
          "America/Merida": "MX",
          "America/Monterrey": "MX",
          "America/Matamoros": "MX",
          "America/Mazatlan": "MX",
          "America/Chihuahua": "MX",
          "America/Ojinaga": "MX",
          "America/Hermosillo": "MX",
          "America/Tijuana": "MX",
          "America/Santa_Isabel": "MX",
          "America/Bahia_Banderas": "MX",
          "Europe/Amsterdam": "NL",
          "Arctic/Longyearbyen": "NO",
          "Europe/Oslo": "NO",
          "Europe/Warsaw": "PL",
          "Europe/Lisbon": "PT",
          "Atlantic/Madeira": "PT",
          "Atlantic/Azores": "PT",
          "Europe/Stockholm": "SE",
          "Europe/Bratislava": "SK",
        },
        s = "klarnaosm_user_locale";
      class l {
        static getCountryFromTimeZone() {
          var t;
          const { timeZone: e } = Intl.DateTimeFormat().resolvedOptions(),
            n = null !== (t = c[e]) && void 0 !== t ? t : null;
          return (
            n ||
              r("[getCountryFromTimeZone] unsupported country or time zone", {
                timeZone: e,
              }),
            n
          );
        }
        static async getUsersCountry() {
          let t = l.getCachedUsersCountry();
          if (t) return r("Found users country in cache"), t;
          try {
            const e = new AbortController();
            setTimeout(() => e.abort(), 1500);
            const n = window.location.hostname,
              a = Shopify.shop,
              r = n !== a ? n : "",
              o = new URL(i.GEOSERVICE_URL);
            o.searchParams.set("defaultDomain", a),
              o.searchParams.set("customDomain", r);
            const c = await fetch(o, { signal: e.signal });
            if (!c.ok) throw new Error(c.statusText);
            t = (await c.json()).country;
          } catch (t) {
            return (
              r("[getUsersCountry] Failed", t),
              r("[getUsersCountry] trying to parse from time zone"),
              this.getCountryFromTimeZone()
            );
          }
          return t && l.setCachedUsersCountry(t), t;
        }
        static getCachedUsersCountry() {
          return localStorage.getItem(s) || null;
        }
        static setCachedUsersCountry(t) {
          r("Setting users country to cache", t), localStorage.setItem(s, t);
        }
        constructor(t) {
          this.midLocales = null != t ? t : {};
        }
        static findLocale(t, e, n) {
          var a, o;
          if (t) {
            r("[getMatchingLocale] Valid locales for users country", t);
            const i = null !== (a = t[0]) && void 0 !== a ? a : null;
            let c = "";
            if (
              (e && "undefined" != typeof Shopify
                ? ((c = Shopify.locale),
                  r("[getMatchingLocale] Using Shopify.locale", c))
                : navigator.language &&
                  ((c = navigator.language.slice(0, 2)),
                  r("[getMatchingLocale] Using browser language", c)),
              c)
            ) {
              const e = t.find((t) => t.startsWith(c));
              if (e) return e;
            }
            return n &&
              null !== (o = t.find((t) => t.startsWith("en"))) &&
              void 0 !== o
              ? o
              : i;
          }
          return null;
        }
        getMatchingLocale(t, e, n) {
          if (!t || !this.midLocales)
            return (
              r("[getMatchingLocale] Invalid data", t, this.midLocales), null
            );
          r("[getMatchingLocale] Available countries for merchant", n);
          const a = this.getFilteredLocales(n);
          r("[getMatchingLocale] Valid locales for merchant", a);
          const o = null == a ? void 0 : a[t];
          return l.findLocale(o, e, !0);
        }
        getFilteredLocales(t) {
          if (!t) return this.midLocales;
          const e = new Set(t);
          return Object.keys(this.midLocales).reduce((t, n) => {
            var a;
            return (
              e.has(n) &&
                (t[n] =
                  null !== (a = this.midLocales[n]) && void 0 !== a ? a : []),
              t
            );
          }, {});
        }
        getMatchingLocaleWithMidLocales(t, e) {
          if (
            !t ||
            !this.midLocales ||
            0 === Object.keys(this.midLocales).length
          )
            return (
              r("[getMatchingLocale] Invalid data", t, this.midLocales), null
            );
          const n = this.midLocales[t];
          return l.findLocale(n, e, !1);
        }
      }
      const d = l;
      class u {
        constructor(t) {
          this.store = t;
        }
        inject() {
          if (!this.isOSMScriptAlreadyInjected())
            try {
              this.injectKlarnaOSMScriptTag(),
                r("Klarna OSM Script Tag has been added successfully");
            } catch (t) {
              r("Could not add script element", t);
            }
        }
        isOSMScriptAlreadyInjected() {
          return null !== document.getElementById("klarna-osm-script-tag");
        }
        logIfEmptyClientId() {
          this.store.client_id ||
            r(
              "Creating OSM script element without data-client-id. This will cause placements not to show up. Check your configuration of Klarna OSM on the Klarna Merchant Portal."
            );
        }
        injectKlarnaOSMScriptTag() {
          const t = this.createKlarnaOSMScriptTag(),
            e = document.querySelector("body");
          e.insertBefore(t, e.children[0]);
        }
        createKlarnaOSMScriptTag() {
          this.logIfEmptyClientId();
          const t = document.createElement("script"),
            e = this.store.playground_active ? "playground" : "production";
          return (
            (t.id = "klarna-osm-script-tag"),
            (t.async = !0),
            t.setAttribute("data-environment", e),
            (t.src = "https://js.klarna.com/web-sdk/v1/klarna.js"),
            t.setAttribute("data-client-id", this.store.client_id),
            t
          );
        }
      }
      class p {
        static getVariantIdFromQueryString() {
          const t = new URLSearchParams(window.location.search).get("variant");
          return t ? Number.parseInt(t, 10) : null;
        }
        constructor(t, e) {
          (this.store = t),
            (this.productVariants = e),
            (this.conflictingAppIds = []),
            (this.eventHandler = () => {
              this.updatePlacements();
            }),
            (this.localeService = new d(t.mid_locales));
        }
        async init() {
          var t;
          (window.klarna_OSMP = window.klarna_OSMP || {}),
            (window.klarna_OSMP.updaterId =
              null !== (t = window.klarna_OSMP.updaterId) && void 0 !== t
                ? t
                : 0),
            (window.klarna_OSMP.rerenders = new Array(
              this.calculateRerendersLenBasedOnPlacementsCount()
            )),
            (this.conflictingAppIds = ["tmenu-app"].filter(
              (t) => !!document.getElementById(t)
            )),
            this.logIfConflictingAppsDetected(),
            this.injectOnSiteScript(),
            await this.initPurchaseAmountIfCartOrProductPage(),
            this.listenForInputChange();
        }
        calculateRerendersLenBasedOnPlacementsCount() {
          var t, e, n;
          return (
            5 +
            2 *
              (null !==
                (n =
                  null ===
                    (e =
                      null === (t = window.klarna_OSMP) || void 0 === t
                        ? void 0
                        : t.placements) || void 0 === e
                    ? void 0
                    : e.filter((t) => t.placement_page === this.currentPageType)
                        .length) && void 0 !== n
                ? n
                : 0)
          );
        }
        logIfConflictingAppsDetected() {
          this.conflictingAppIds.length > 0 &&
            r(
              `Detected apps conflicting with Klarna placements: ${this.conflictingAppIds.join(
                ", "
              )}. It may cause unwanted behaviour.`
            );
        }
        injectOnSiteScript() {
          new u(this.store).inject();
        }
        async initPurchaseAmountIfCartOrProductPage() {
          ["cart", "product"].includes(this.currentPageType) &&
            (await this.updatePurchaseAmount());
        }
        listenForInputChange() {
          "cart" === this.currentPageType &&
            (0 !== this.conflictingAppIds.length
              ? this.updatePlacementsOnInputEvents()
              : this.updatePlacementsOnDomMutations()),
            "product" === this.currentPageType &&
              new MutationObserver((t) => {
                this.getKlarnaPlacements().forEach((t) => {
                  const e = String(this.getDataPurchaseAmount() || 0),
                    n = t.getAttribute("data-purchase-amount");
                  e !== t.getAttribute("data-purchase-amount") &&
                    (r(`amount changed to ${e} from ${n}`),
                    t.setAttribute("data-purchase-amount", e));
                });
              }).observe(document.body, { childList: !0, subtree: !0 });
        }
        updatePlacementsOnDomMutations() {
          const t = new MutationObserver(async (e) => {
            window.klarna_OSMP.updaterId += 1;
            const n = window.klarna_OSMP.updaterId,
              a = [void 0, void 0, await this.getCartTotal()];
            let i = 5;
            if (
              (p.addCurrentTimeToRerenders(),
              p.calculateMaxTimeBetweenRerenders() < 1e3)
            )
              return (
                r(
                  "Detected too frequent placement rerenders based on DOM modifications. Switching logic to input related one."
                ),
                (i = -1),
                t.disconnect(),
                void this.updatePlacementsOnInputEvents()
              );
            const c = async () => {
              const t = await this.getCartTotal();
              return (
                r("Comparing amount and history", t, a),
                !!a.some((e) => e !== t) &&
                  (this.updatePurchaseAmount(t), a.shift(), a.push(t), !0)
              );
            };
            for (; i > 0 && n === window.klarna_OSMP.updaterId; )
              (i -= 1), await o(1e3), await c();
          });
          t.observe(document.body, { childList: !0, subtree: !0 });
        }
        static addCurrentTimeToRerenders() {
          const { rerenders: t } = window.klarna_OSMP;
          t.shift(), t.push(new Date());
        }
        static calculateMaxTimeBetweenRerenders() {
          var t, e;
          const { rerenders: n } = window.klarna_OSMP;
          return (
            ((null === (t = n[n.length - 1]) || void 0 === t
              ? void 0
              : t.getTime()) || 1 / 0) -
            ((null === (e = n[0]) || void 0 === e ? void 0 : e.getTime()) ||
              -1 / 0)
          );
        }
        updatePlacementsOnInputEvents() {
          document.querySelectorAll("select, input").forEach((t) => {
            t.removeEventListener("change", this.eventHandler, !0),
              t.addEventListener("change", this.eventHandler, !0);
          });
        }
        async updatePlacements() {
          await o(20), (window.klarna_OSMP.updaterId += 1);
          const t = window.klarna_OSMP.updaterId;
          r("Updater started with id", t);
          let e = await this.getCartTotal();
          const n = async (t) => {
            await o(t);
            const n = await this.getCartTotal();
            return n !== e && (this.updatePurchaseAmount(n), (e = n), !0);
          };
          for (;;) {
            let e = 10,
              a = 50;
            for (; e && !(t < window.klarna_OSMP.updaterId) && !(await n(a)); )
              (a *= 1.5), (e -= 1);
            if (t < window.klarna_OSMP.updaterId) {
              r("Updater terminated due to new one running", t);
              break;
            }
            if (!(await n(1e3))) break;
          }
          this.updatePlacementsOnInputEvents();
        }
        async updatePurchaseAmount(t = "") {
          const e = this.getKlarnaPlacements();
          let n = t;
          n ||
            ("cart" === this.currentPageType
              ? (n = await this.getCartTotal())
              : "product" === this.currentPageType &&
                (n = this.getDataPurchaseAmount())),
            r("Updating purchase amount", n),
            e.forEach((t) => {
              r("updating placement", t),
                t.setAttribute("data-purchase-amount", String(n));
            }),
            0 !== this.conflictingAppIds.length && this.listenForInputChange();
        }
        async getCartTotal() {
          const t = await fetch("/cart.json");
          if (!t.ok) throw new Error();
          const e = await t.json();
          return e.total_price ? e.total_price : 0;
        }
      }
      const m = {
          getCompetitorElement(t) {
            return (
              r("[getCompetitorElement]", t),
              "afterpay" === t ? this.findAfterpayElement() : null
            );
          },
          findAfterpayElement() {
            var t, e;
            let n = null;
            if (window.afterpay_product_selector)
              return window.afterpay_product_selector;
            if (
              window.Afterpay &&
              window.Afterpay.supportedTheme &&
              window.Afterpay.supportedTheme.product
            ) {
              r("[findAfterpayElement] Found window.Afterpay.supportedTheme");
              const e = window.Afterpay.supportedTheme.product,
                a =
                  e[Object.keys(e).reduce((t, e) => (t && t > e ? t : e), "")];
              n =
                null !== (t = null == a ? void 0 : a.selector) && void 0 !== t
                  ? t
                  : null;
            } else
              window.Afterpay &&
                void 0 === window.Afterpay.supportedTheme &&
                window.Afterpay.commonElements.product &&
                window.Afterpay.commonElements.product.price_selector &&
                (r(
                  "[findAfterpayElement] Found window.Afterpay.commonElements"
                ),
                (n =
                  null !==
                    (e =
                      window.Afterpay.commonElements.product.price_selector.find(
                        (t) => {
                          try {
                            if (document.querySelector(t)) return t;
                          } catch (t) {}
                          return null;
                        }
                      )) && void 0 !== e
                    ? e
                    : null));
            return r("[findAfterpayElement] got productElement", n), n;
          },
        },
        h = [
          ".product-form",
          ".price",
          ".product__title",
          ".shopify-payment-button",
          ".add-to-cart",
          ".product-form__submit",
          ".product-form__payment-container",
          ".product__form",
          ".product-price",
          ".product__price",
          ".product-add-to-cart",
          ".product-single__add-to-cart",
          ".btn--shopify-payment-btn",
          ".product-action-flex",
          "#product-add-to-cart",
          ".shopify-product-form",
          ".product-single__form",
          ".current_price",
          ".product-details__form",
          ".product-detail",
          "form.price",
          "[data-shopify]",
          ".product-single__description",
          ".product-title",
          ".product-description",
          ".product-single__desc",
          ".product-main__information",
          ".product-variants",
          ".main-price",
          '[data-action="add-to-cart"]',
          ".ProductMeta__Description",
          ".ProductMeta__TaxNotice",
          '[itemprop="offers"]',
        ],
        g = [
          ".cart__footer",
          ".cart__blocks",
          ".totals",
          ".cart__checkout-button",
          ".cart-totals",
          ".cart__footer__text",
          ".cart__submit-controls",
          ".cart__subtotal-container",
          ".cart__subtotal",
          ".cart-bottom",
          ".cart_bottom",
          ".cart__buttons",
          ".cart-meta",
          ".cart-total-bottom",
          ".subtotal_amount",
          ".subtotal__container",
          ".cart-price",
          ".cart__checkout-wrapper",
          ".cart__row",
          ".cart-subtotal__price",
          ".cart-recap__checkout",
          ".hulkapps-cart-original-total",
          ".cart-total-price",
          ".checkout-buttons",
          ".Cart__Total",
          ".js-cart_subtotal",
          ".secondary_button",
        ],
        f = [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          ".h1",
          ".h2",
          ".h3",
          ".h4",
          ".h5",
          "body",
        ];
      const y = [
          ["/products/", "product"],
          ["/collections", "collections"],
          ["/pages/", "static"],
          ["/cart", "cart"],
          ["/checkouts", "checkout"],
        ],
        A = {
          product: "product",
          home: "home",
          collection: "collections",
          page: "static",
        };
      class w extends p {
        static initObserver(t, e) {
          return (
            r("initObserver", { rootNode: t, element: e }),
            new a.MutationSummary({
              callback: (t) => {
                if (void 0 === t) return;
                const n = t[0];
                if (0 === n.added.length) return;
                const a = n.added[0];
                a.classList.contains("afterpay-paragraph") &&
                  ((a.previousSibling &&
                    a.previousSibling.innerHTML.includes("klarna")) ||
                    (r(
                      "Detected competitor widget change in the DOM, inserting Ad position above it."
                    ),
                    a && a.parentNode
                      ? a.parentNode.insertBefore(e, a)
                      : r("Cannot insert ad above competitor widget")));
              },
              rootNode: t,
              observeOwnChanges: !0,
              queries: [{ all: !0 }],
            })
          );
        }
        constructor() {
          var t, e, n, a;
          super(
            window.klarna_OSMP.store,
            null !==
              (a =
                null ===
                  (n =
                    null ===
                      (e =
                        null ===
                          (t =
                            null === window || void 0 === window
                              ? void 0
                              : window.ShopifyAnalytics) || void 0 === t
                          ? void 0
                          : t.meta) || void 0 === e
                      ? void 0
                      : e.product) || void 0 === n
                  ? void 0
                  : n.variants) && void 0 !== a
              ? a
              : []
          ),
            (this.placements = window.klarna_OSMP.placements),
            (this.detectedAfterpayElement = null),
            (this.usersCountry = null),
            (window.klarna_OSMP = window.klarna_OSMP || {}),
            (window.KlarnaOnsiteService = window.KlarnaOnsiteService || []),
            (window.Klarna = window.Klarna || {}),
            (this.currentPageType = w.getCurrentPage());
        }
        static getCurrentPage() {
          if (this.isHomePage()) return "home";
          const t = this.determineCurrentPageBasedOnPath(),
            e = this.getCurrentPageFromShopifyAnalytics();
          return t || e;
        }
        static isHomePage() {
          var t, e, n, a;
          const r =
            (null ===
              (a =
                null !==
                  (e =
                    null ===
                      (t =
                        null === Shopify || void 0 === Shopify
                          ? void 0
                          : Shopify.routes) || void 0 === t
                      ? void 0
                      : t.root) && void 0 !== e
                  ? e
                  : null ===
                      (n =
                        null === Shopify || void 0 === Shopify
                          ? void 0
                          : Shopify.routes) || void 0 === n
                  ? void 0
                  : n.root_url) || void 0 === a
              ? void 0
              : a.slice(0, -1)) || "/";
          return window.location.pathname === r;
        }
        static determineCurrentPageBasedOnPath() {
          for (const [t, e] of y)
            if (window.location.pathname.includes(t)) return e;
          return "";
        }
        static getCurrentPageFromShopifyAnalytics() {
          var t, e, n;
          const a =
            null ===
              (n =
                null ===
                  (e =
                    null ===
                      (t =
                        null === window || void 0 === window
                          ? void 0
                          : window.ShopifyAnalytics) || void 0 === t
                      ? void 0
                      : t.meta) || void 0 === e
                  ? void 0
                  : e.page) || void 0 === n
              ? void 0
              : n.pageType;
          return A[a] || "";
        }
        async init() {
          var t;
          if ((r("init"), !this.placements || !this.store))
            return void r("Insufficient data. exiting...");
          const { Shopify: e } = window,
            n =
              null !== (t = e.currency && e.currency.active) && void 0 !== t
                ? t
                : e.Checkout.currency;
          void 0 !== e &&
          (r(`Selected currency: ${n}`),
          r(`Shop currency: ${this.store.currency}`),
          this.store.currency && this.store.currency !== n)
            ? r(`Currency ${n} not supported. exiting...`)
            : (await this.checkForCompetitorAds(),
              this.placements.some((t) => "geolocation" === t.locale_option) &&
                ((this.usersCountry = await d.getUsersCountry()),
                r("Using geolocation, got users country:", this.usersCountry)),
              this.injectPlacements(),
              await super.init());
        }
        async checkForCompetitorAds() {
          this.placements.filter((t) => "below" === t.position).length &&
            (await o(1e3),
            (this.detectedAfterpayElement = m.getCompetitorElement("afterpay")),
            this.detectedAfterpayElement &&
              r("got detectedAfterpayElement", this.detectedAfterpayElement));
        }
        findCurrentPage() {
          let t = this.currentPageType;
          return (
            "static" === t && (t = window.location.pathname),
            r(`Page detected: ${t}`),
            t
          );
        }
        injectPlacement(t, e, n) {
          var a, o, i, c, s, l, d, u, p, m, y;
          let A = t.placement_page;
          if (
            ("static" === this.currentPageType &&
              (A = `${
                (null ===
                  (o =
                    null === (a = window.Shopify) || void 0 === a
                      ? void 0
                      : a.routes) || void 0 === o
                  ? void 0
                  : o.root) || "/"
              }pages/${t.static_page}`),
            n === A)
          ) {
            r("-----------------"),
              r(`Attempting to inject Ad position '${t.name ? t.name : e}'.`, {
                install_method: t.install_method ? t.install_method : "",
                competitor_placement: "above" !== t.position,
              });
            try {
              const n = `margin: ${[
                t.padding_top,
                t.padding_right,
                t.padding_bottom,
                t.padding_left,
              ]
                .map((t) => (t ? "1em" : "0"))
                .join(" ")}`;
              let a = null;
              "right" === t.justification
                ? (a = "display: flex; justify-content: flex-end;")
                : "center" === t.justification &&
                  (a = "display: flex; justify-content: center;");
              const o = document.createElement("div");
              o.setAttribute("style", n);
              let A = null;
              if ("geolocation" === t.locale_option) {
                if (
                  (t.countries &&
                    !t.countries.find((t) => t === this.usersCountry)) ||
                  ("EUR" !== this.store.currency &&
                    this.usersCountry !== t.country)
                )
                  return (
                    r(
                      `Ad is not supported for this user's country: ${
                        this.usersCountry
                      }, countries for this placement: ${
                        null !==
                          (c =
                            null === (i = t.countries) || void 0 === i
                              ? void 0
                              : i.join(", ")) && void 0 !== c
                          ? c
                          : t.country
                      }`
                    ),
                    !1
                  );
                A = this.localeService.getMatchingLocale(
                  this.usersCountry,
                  t.honor_storefront_locale,
                  t.countries
                );
              } else if ("auto" === t.locale_option && this.store.mid_locales) {
                const e =
                    null === Shopify || void 0 === Shopify
                      ? void 0
                      : Shopify.locale,
                  { country: n, data_locale: a } = t,
                  o = this.store.mid_locales[n];
                r("auto locale selection:", {
                  locales: o,
                  shopLocale: e,
                  country: n,
                  dataLocale: a,
                  midLocales: this.store.mid_locales,
                }),
                  o &&
                    (A =
                      null !==
                        (d =
                          null !==
                            (l =
                              null !== (s = o.find((t) => t.startsWith(e))) &&
                              void 0 !== s
                                ? s
                                : o.find((t) => a === t)) && void 0 !== l
                            ? l
                            : o[0]) && void 0 !== d
                        ? d
                        : null);
              }
              const v = A || t.data_locale;
              r("Got matching locale:", A), r("Using locale:", v);
              const _ = document.createElement("klarna-placement");
              "product" === this.currentPageType &&
              0 === (this.getDataPurchaseAmount() || 0) &&
              "dynamic" === t.type
                ? (r("Using fallback placement", this.store.fallback_placement),
                  _.setAttribute("data-key", this.store.fallback_placement))
                : _.setAttribute("data-key", t.data_key),
                _.setAttribute(
                  "data-purchase-amount",
                  String(this.getDataPurchaseAmount() || 0)
                ),
                _.setAttribute("data-preloaded", "true"),
                _.setAttribute("data-locale", v),
                ("dark" !== t.theme && "custom" !== t.theme) ||
                  _.setAttribute("data-theme", t.theme),
                o.appendChild(_);
              const C = (function (t) {
                let e = t.anchor_element;
                "autopicker" === t.install_method &&
                  (e = (function (t) {
                    const e =
                      [...("cart" === t ? g : h), ...f].find((t) =>
                        document.querySelector(t)
                      ) || "h1";
                    return r("Selected anchor:", e), e;
                  })(t.placement_page));
                const n = document.querySelector(e);
                if (!n)
                  throw new Error(
                    `Could not find anchor element for placement ${t.id}`
                  );
                return n;
              })(t);
              if ("above" === t.position)
                r(`Ad position injected at element: ${t.anchor_element}`),
                  null === (u = C.parentNode) ||
                    void 0 === u ||
                    u.insertBefore(o, C);
              else if ("below" === t.position) {
                C.nextSibling
                  ? null ===
                      (m =
                        null === (p = C.nextSibling) || void 0 === p
                          ? void 0
                          : p.parentNode) ||
                    void 0 === m ||
                    m.insertBefore(o, C.nextSibling)
                  : null === (y = C.parentNode) || void 0 === y || y.append(o),
                  r(
                    `Ad position injected at element (competitor): ${t.anchor_element}`
                  );
                const e = this.detectedAfterpayElement === t.anchor_element;
                this.detectedAfterpayElement &&
                  e &&
                  C.parentNode &&
                  (r("Observing for competitor widget changes."),
                  w.initObserver(C.parentNode, o));
              }
              if (
                (this.watchForRemoval(_, e),
                a && o.querySelector("klarna-placement"))
              ) {
                const t = o.querySelector("klarna-placement");
                if (!t) return r("Failed to find klarna-placement element"), !1;
                t.setAttribute("style", a);
              }
              return _;
            } catch (e) {
              r(
                `Failed to insert placement for placement id ${t.id}(${t.anchor_element})`,
                e
              );
            }
          }
          return !1;
        }
        injectPlacements() {
          let t = 0,
            e = 0;
          const n = this.findCurrentPage();
          this.placements.forEach((a, r) => {
            this.injectPlacement(a, r, n) ? (t += 1) : (e += 1);
          }),
            r(`Loaded: ${t}. Failed: ${e}`);
        }
        getDataPurchaseAmount() {
          var t, e, n, a, r, o;
          let i = null;
          const c = p.getVariantIdFromQueryString();
          return (
            c &&
              (i =
                null === (t = this.productVariants) || void 0 === t
                  ? void 0
                  : t.find((t) => t.id === c)),
            i
              ? i.price
              : null !==
                  (o =
                    null ===
                      (r =
                        null ===
                          (a =
                            null ===
                              (n =
                                null ===
                                  (e =
                                    null === window || void 0 === window
                                      ? void 0
                                      : window.ShopifyAnalytics) || void 0 === e
                                  ? void 0
                                  : e.meta) || void 0 === n
                              ? void 0
                              : n.product) || void 0 === a
                          ? void 0
                          : a.variants[0]) || void 0 === r
                      ? void 0
                      : r.price) && void 0 !== o
              ? o
              : 0
          );
        }
        getKlarnaPlacements() {
          return Array.from(
            document.getElementsByTagName("klarna-placement")
          ).filter((t) => !t.id);
        }
        watchForRemoval(t, e) {
          const n = new WeakSet();
          let a = t;
          do {
            n.add(a), (a = a.parentElement);
          } while (a);
          const o = new MutationObserver((a) => {
            a.forEach((a) => {
              a.removedNodes.forEach((a) => {
                n.has(a) &&
                  !document.body.contains(t) &&
                  (r("placement was removed, reinserting..."),
                  o.disconnect(),
                  this.reinsertPlacement(e));
              });
            });
          });
          document.body.contains(t)
            ? o.observe(document.body, { childList: !0, subtree: !0 })
            : (r("Reinserting placement before observer attached"),
              this.reinsertPlacement(e));
        }
        reinsertPlacement(t) {
          const e = this.placements[t];
          if (!e) throw new Error("Index out of bounds for placements array");
          this.injectPlacement(e, t, this.findCurrentPage())
            ? (super.updatePurchaseAmount(),
              r("finished reinserting placement"))
            : r("failed to reinsert placement");
        }
      }
      const v = new w();
    },
    573: (t) => {
      (() => {
        "use strict";
        var e,
          n = {};
        (e = n),
          Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.SHOPIFY_API_KEY =
            e.DEVELOPMENT_PATH_PREFIX =
            e.GEOSERVICE_URL =
            e.APP_URL =
            e.NODE_ENV =
              void 0),
          (e.NODE_ENV = "production"),
          (e.APP_URL = "https://skosm.klarna.com"),
          (e.GEOSERVICE_URL = `${e.APP_URL}/geolocation/v1`),
          (e.DEVELOPMENT_PATH_PREFIX = ""),
          (e.SHOPIFY_API_KEY = "4439684aa13a71f0befb66b3a308e7d4"),
          (t.exports = n);
      })();
    },
  },
]);
