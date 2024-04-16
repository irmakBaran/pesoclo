(() => {
  "use strict";
  var e,
    t,
    n = {
      3056: (e, t, n) => {
        n.d(t, { A: () => c });
        const r = {
          randomUUID:
            "undefined" != typeof crypto &&
            crypto.randomUUID &&
            crypto.randomUUID.bind(crypto),
        };
        let o;
        const s = new Uint8Array(16);
        function i() {
          if (
            !o &&
            ((o =
              "undefined" != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)),
            !o)
          )
            throw new Error(
              "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
            );
          return o(s);
        }
        const a = [];
        for (let e = 0; e < 256; ++e) a.push((e + 256).toString(16).slice(1));
        const c = function (e, t, n) {
          if (r.randomUUID && !t && !e) return r.randomUUID();
          const o = (e = e || {}).random || (e.rng || i)();
          if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t)) {
            n = n || 0;
            for (let e = 0; e < 16; ++e) t[n + e] = o[e];
            return t;
          }
          return (function (e, t = 0) {
            return (
              a[e[t + 0]] +
              a[e[t + 1]] +
              a[e[t + 2]] +
              a[e[t + 3]] +
              "-" +
              a[e[t + 4]] +
              a[e[t + 5]] +
              "-" +
              a[e[t + 6]] +
              a[e[t + 7]] +
              "-" +
              a[e[t + 8]] +
              a[e[t + 9]] +
              "-" +
              a[e[t + 10]] +
              a[e[t + 11]] +
              a[e[t + 12]] +
              a[e[t + 13]] +
              a[e[t + 14]] +
              a[e[t + 15]]
            );
          })(o);
        };
      },
      6994: (e, t, n) => {
        n.d(t, {
          D3: () => r,
          G3: () => i,
          Id: () => c,
          O4: () => l,
          Ug: () => s,
          bV: () => o,
          iC: () => a,
        });
        let r = (function (e) {
            return (
              (e.PAYMENT_BUTTON = "klarna-payment-button"),
              (e.IDENTITY_BUTTON = "klarna-identity-button"),
              (e.PLACEMENT = "klarna-placement"),
              e
            );
          })({}),
          o = (function (e) {
            return (e.IDENTITY = "identity"), (e.PAYMENT = "payment"), e;
          })({}),
          s = (function (e) {
            return (
              (e.DEFAULT = "default"), (e.LIGHT = "light"), (e.DARK = "dark"), e
            );
          })({}),
          i = (function (e) {
            return (
              (e.DEFAULT = "default"), (e.PILL = "pill"), (e.RECT = "rect"), e
            );
          })({}),
          a = (function (e) {
            return (
              (e.CHECKOUT = "checkout"),
              (e.CUSTOM_TYPE_0 = "custom-type0"),
              (e.CUSTOM_TYPE_1 = "custom-type1"),
              (e.CUSTOM_TYPE_0_INLINE = "custom-type0-inline"),
              (e.CUSTOM_TYPE_2_INLINE = "custom-type2-inline"),
              (e.CUSTOM_TYPE_3_INLINE = "custom-type3-inline"),
              (e.CUSTOM_TYPE_1_335_AUTO = "custom-type1-335-auto"),
              (e.CUSTOM_TYPE_3_335_AUTO = "custom-type3-335-auto"),
              (e.TOP_STRIP_PROMOTION_AUTO_SIZE =
                "top-strip-promotion-auto-size"),
              (e.TOP_STRIP_PROMOTION_STANDARD = "top-strip-promotion-standard"),
              (e.TOP_STRIP_PROMOTION_BADGE = "top-strip-promotion-badge"),
              (e.CREDIT_PROMOTION_SMALL = "credit-promotion-small"),
              (e.CREDIT_PROMOTION_STANDARD = "credit-promotion-standard"),
              (e.CREDIT_PROMOTION_INLINE = "credit-promotion-inline"),
              (e.CREDIT_PROMOTION_AUTO_SIZE = "credit-promotion-auto-size"),
              (e.CREDIT_PROMOTION_BADGE = "credit-promotion-badge"),
              (e.SIDEBAR_PROMOTION_AUTO_SIZE = "sidebar-promotion-auto-size"),
              (e.FOOTER_PROMOTION_AUTO_SIZE = "footer-promotion-auto-size"),
              (e.INFO_PAGE = "info-page"),
              (e.HOMEPAGE_PROMOTION_TALL = "homepage-promotion-tall"),
              (e.HOMEPAGE_PROMOTION_WIDE = "homepage-promotion-wide"),
              (e.HOMEPAGE_PROMOTION_BOX = "homepage-promotion-box"),
              e
            );
          })({});
        const c = {
          production: "https://js.klarna.com",
          playground: "https://js.playground.klarna.com",
          staging: "https://x.nonprod.us1.js.klarna.net",
          development: "https://x.nonprod.us1.js.klarna.net",
        };
        let l = (function (e) {
          return (e.LIVE = "live"), (e.TEST = "test"), e;
        })({});
      },
      8334: (e, t, n) => {
        n.d(t, { $: () => r, s: () => o });
        const r = { INIT: 5, MERCHANT_WARN: 5 },
          o = (e) => 100 * Math.random() < e;
      },
      7971: (e, t, n) => {
        n.d(t, { A: () => a, v: () => i });
        var r = n(8334),
          o = n(1331);
        const s = "version",
          i = () => {
            try {
              return (0, o.nn)(s).get("rolloutVariant");
            } catch {
              return "none";
            }
          },
          a = (e) => {
            if (!e) throw new Error("Missing runtime config");
            try {
              const t = (0, o.nn)(s);
              (e.lib.defaultVersion !== e.lib?.canaryVersion &&
                "true" !== e.lib?.flushVersion) ||
                (t.remove("version"),
                t.remove("rolloutVariant"),
                t.remove("ttl"));
              const n = t.get("version");
              if (n) return n;
              {
                const t = (({
                  defaultVersion: e,
                  canaryVersion: t,
                  canaryWeight: n,
                }) => {
                  const i = (0, o.nn)(s),
                    a = Date.now() + 864e5;
                  return (
                    i.set("ttl", a.toString()),
                    (0, r.s)(100 * n)
                      ? (0, r.s)(50)
                        ? (i.set("rolloutVariant", "canary"),
                          i.set("version", t),
                          t)
                        : (i.set("rolloutVariant", "control"),
                          i.set("version", e),
                          e)
                      : (i.set("rolloutVariant", "none"),
                        i.set("version", e),
                        e)
                  );
                })(e.lib);
                if (t) return t;
                throw new Error("Failed to set rollout and version");
              }
            } catch (t) {
              if (e.lib.defaultVersion) return e.lib.defaultVersion;
              throw new Error(`Failed to get version: ${t.message}`);
            }
          };
      },
      9604: (e, t, n) => {
        function r(e = "") {
          return e.replace(/-/g, "").length <= 32;
        }
        n.d(t, { f: () => r });
      },
      3398: (e, t, n) => {
        n.d(t, { L: () => r });
        const r = () => !1;
      },
      509: (e, t, n) => {
        n.d(t, { E: () => r });
        const r = (e) => {
          const t = { ...e };
          return (
            Object.keys(t).forEach((e) => (void 0 === t[e] ? delete t[e] : {})),
            t
          );
        };
      },
      4074: (e, t, n) => {
        n.d(t, { G: () => o });
        var r = n(1866);
        function o(e) {
          const t = "string" == typeof e ? new Error(e) : e;
          (0, r.N)().report(t);
        }
      },
      1866: (e, t, n) => {
        var r;
        n.d(t, { N: () => E, r: () => w }),
          (function (e) {
            (e.fatal = "fatal"),
              (e.error = "error"),
              (e.warning = "warning"),
              (e.log = "log"),
              (e.info = "info"),
              (e.debug = "debug"),
              (e.critical = "critical");
          })(r || (r = {}));
        const o =
            /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
          s =
            /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
          i =
            /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
          a = "?",
          c =
            /^(?:(\w+):)\/\/(?:([\w-]+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
        function l(e) {
          return ((e && e.message) || "No error message")
            .split("\n")
            .filter((e) => !!e)[0];
        }
        function u(e) {
          try {
            const t = (function (e) {
              if (!e.stack) return null;
              const t = [],
                n = e.stack.split("\n");
              let r, c;
              for (let l = 0; l < n.length; ++l) {
                if ((r = o.exec(n[l])))
                  c = {
                    filename:
                      r[2] && 0 === r[2].indexOf("address at ")
                        ? r[2].substr(11)
                        : r[2],
                    function: r[1] || a,
                    lineno: r[3] ? +r[3] : null,
                    colno: r[4] ? +r[4] : null,
                  };
                else if ((r = i.exec(n[l])))
                  c = {
                    filename: r[2],
                    function: r[1] || a,
                    lineno: +r[3],
                    colno: r[4] ? +r[4] : null,
                  };
                else {
                  if (!(r = s.exec(n[l]))) continue;
                  0 !== l ||
                    r[5] ||
                    void 0 === e.columnNumber ||
                    (t[0].column = e.columnNumber + 1),
                    (c = {
                      filename: r[3],
                      function: r[1] || a,
                      lineno: r[4] ? +r[4] : null,
                      colno: r[5] ? +r[5] : null,
                    });
                }
                !c.function && c.lineno && (c.function = a), t.push(c);
              }
              return t.length
                ? {
                    value: l(e),
                    type: e.name,
                    stacktrace: { frames: t.reverse() },
                  }
                : null;
            })(e);
            if (t) return t;
          } catch (e) {}
          return { value: l(e), type: e && e.name, stacktrace: { frames: [] } };
        }
        class d {
          constructor(e) {
            if (e && e.dsn) {
              const t = c.exec(e.dsn),
                n = t ? t.slice(1) : [],
                r = n[5].split("/"),
                o = r.slice(0, -1).join("/");
              (this.apiUrl =
                n[0] +
                "://" +
                n[3] +
                (n[4] ? ":" + n[4] : "") +
                (o ? "/" + o : "") +
                "/api/" +
                r.pop() +
                "/store/"),
                (this.authHeader =
                  "Sentry sentry_version=7,sentry_key=" +
                  n[1] +
                  (n[2] ? ",sentry_secret=" + n[2] : ""));
            }
            this.environment = e && e.environment;
          }
          prepare(e) {
            return { ...this.getRequestBlank(), exception: { values: [u(e)] } };
          }
          report(e) {
            this.send(this.prepare(e));
          }
          send(e) {
            this.apiUrl && e && this.createRequest(e);
          }
          createRequest(e) {
            const t = new XMLHttpRequest();
            t.open("POST", this.apiUrl, !0),
              t.setRequestHeader("Content-type", "application/json"),
              t.setRequestHeader("X-Sentry-Auth", this.authHeader || ""),
              t.send(JSON.stringify(e));
          }
          getRequestBlank() {
            return {
              platform: "javascript",
              event_id: "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
                /[xy]/g,
                (e) => {
                  const t = (16 * Math.random()) | 0;
                  return ("x" === e ? t : (3 & t) | 8).toString(16);
                }
              ),
              sdk: { name: "micro-sentry.javascript.core", version: "0.0.0" },
              timestamp: Date.now() / 1e3,
              environment: this.environment,
            };
          }
        }
        function p(e, t) {
          return "[object RegExp]" === Object.prototype.toString.call(t)
            ? t.test(e)
            : "string" == typeof t && -1 !== e.indexOf(t);
        }
        function f() {
          return window;
        }
        class m extends d {
          constructor(e, t = f()) {
            super(e),
              (this.options = e),
              (this.window = t),
              (this.destroyed = !1),
              (this._state = {});
            const {
              plugins: n = [],
              beforeSend: r = (e) => e,
              beforeBreadcrumb: o = (e) => e,
              blacklistUrls: s = [],
              ignoreErrors: i = [],
              release: a,
            } = this.options || {};
            (this.plugins = n.map((e) => new e(this))),
              (this.beforeSend = r),
              (this.beforeBreadcrumb = o),
              (this.blacklistUrls = s),
              (this.ignoreErrors = i),
              (this.release = a);
          }
          get state() {
            return this._state;
          }
          clearState() {
            this._state = {};
          }
          setTags(e) {
            return this.setKeyState("tags", { ...e }), this;
          }
          setTag(e, t) {
            return this.extendState({ tags: { [e]: t } }), this;
          }
          setExtra(e, t) {
            return this.extendState({ extra: { [e]: t } }), this;
          }
          setExtras(e) {
            return this.setKeyState("extra", { ...e }), this;
          }
          setUser(e) {
            return this.setKeyState("user", e ? { ...e } : void 0), this;
          }
          clone() {
            const e = new m({ ...this.options, plugins: [] });
            return e.extendState(this.state), e;
          }
          withScope(e) {
            const t = this.clone();
            e(t), t.destroy(), this.setBreadcrumbs(void 0);
          }
          addBreadcrumb(e) {
            const t = this.beforeBreadcrumb(e);
            t &&
              this.extendState({
                breadcrumbs: [{ timestamp: Date.now() / 1e3, ...t }],
              });
          }
          setBreadcrumbs(e) {
            this.setKeyState("breadcrumbs", e);
          }
          captureMessage(e, t) {
            this.send({ ...this.getRequestBlank(), message: e, level: t });
          }
          destroy() {
            (this.destroyed = !0),
              this.plugins.forEach((e) => {
                e.destroy && e.destroy();
              });
          }
          isIgnoredError(e) {
            return (
              !!this.ignoreErrors.length &&
              this.getPossibleEventMessages(e).some((e) =>
                this.ignoreErrors.some((t) => p(e, t))
              )
            );
          }
          getRequestBlank() {
            return {
              request: {
                url: this.window.location.toString(),
                headers: { "User-Agent": this.window.navigator.userAgent },
              },
              ...super.getRequestBlank(),
              sdk: {
                name: "micro-sentry.javascript.browser",
                version: "0.0.0",
              },
              ...this.state,
            };
          }
          send(e) {
            if (this.destroyed || this.isDeniedUrl(e) || this.isIgnoredError(e))
              return;
            const t = this.beforeSend({ release: this.release, ...e });
            t && (super.send(t), this.setBreadcrumbs(void 0));
          }
          getPossibleEventMessages(e) {
            if (e.message) return [e.message];
            if (e.exception)
              try {
                const { type: t = "", value: n = "" } =
                  (e.exception.values && e.exception.values[0]) || {};
                return [`${n}`, `${t}: ${n}`];
              } catch (e) {
                return [];
              }
            return [];
          }
          isDeniedUrl(e) {
            if (!this.blacklistUrls.length) return !1;
            const t = this.getEventFilterUrl(e);
            return !!t && this.blacklistUrls.some((e) => p(t, e));
          }
          getEventFilterUrl(e) {
            try {
              if (e.exception) {
                const t =
                  e.exception.values &&
                  e.exception.values[0].stacktrace &&
                  e.exception.values[0].stacktrace.frames;
                return (t && t[t.length - 1].filename) || null;
              }
              return null;
            } catch (e) {
              return null;
            }
          }
          extendState(e) {
            this._state = Object.keys(e).reduce((t, n) => {
              const r = this._state[n],
                o = Array.isArray(r) ? r : null,
                s = e[n],
                i = Array.isArray(s) ? s : null;
              return {
                ...t,
                [n]:
                  o || i
                    ? [...(o || []), ...(i || [])]
                    : {
                        ...("string" != typeof r ? r : {}),
                        ...("string" != typeof s ? s : {}),
                      },
              };
            }, this._state);
          }
          setKeyState(e, t) {
            this._state[e] = t;
          }
        }
        let h = (function (e) {
          return (e.SENTRY_NOT_CONFIGURED = "sentry_not_configured"), e;
        })({});
        var g = n(3398),
          v = n(5298),
          y = n(5492),
          b = (function (e) {
            return (
              (e.sessionStorageNotSupported = "sessionStorage-not-supported"),
              (e.localStorageNotSupported = "localStorage-not-supported"),
              (e.dynamicImportFailed = "dynamic-import-failed"),
              (e.multipleCustomElementsWithSameTagName =
                "multiple-custom-elements-same-tag-name"),
              (e.unexpectedTokenMethodParamsList =
                "unexpected-token-method-params-list"),
              (e.missingColonAfterPropertyId =
                "missing-colon-after-property-id"),
              (e.unexpectedTokenEqual = "unexpected-token-equal"),
              (e.expectedExpressionGotEqual = "expected-expression-got-equal"),
              (e.performanceNotDefined = "performance-is-not-defined"),
              (e.undefinedIsNotAnObjectRenderOptions =
                "undefined-is-not-an-object-render-options"),
              (e.renderOptionsIsUndefined = "render-options-is-undefined"),
              (e.nullIsNotAnObjectParentNodeInsertBefore =
                "null-is-not-an-object-parent-node-insert-before"),
              (e.failedToFetchOSMAPI = "failed-to-fetch-osm-api"),
              (e.cannotReadPropertiesOfNull = "cannot-read-properties-of-null"),
              (e.failedToExecuteInvokeOnCreateHTMLCallback =
                "failed-to-execute-invoke-on-create-html-callback"),
              (e.performanceMarkIsNotAFunction =
                "performance-mark-is-not-a-function"),
              e
            );
          })(b || {}),
          I = n(6806),
          O = n(8334);
        const k = [
          "Unexpected token '",
          "Storage type: ",
          "Failed to fetch dynamically imported module",
          "Missing runtime config",
          "Failed to execute 'define",
          "Importing a module script failed.",
          "NetworkError when attempting to fetch resource",
        ];
        let T;
        const E = () =>
            T ||
            (((e, t, n = v.T.websdk) => {
              const r = (0, y.A)(n);
              try {
                r.event("error", { message: t, name_1: e });
              } catch {}
            })(h.SENTRY_NOT_CONFIGURED, "Sentry client not initialized"),
            S),
          S = {
            report: console.log,
            setTags: () => {},
            setTag: () => {},
            setExtras: () => {},
            setExtra: () => {},
          },
          w = ({ version: e, environment: t, tags: n }) => (
            (0, g.L)()
              ? (T = S)
              : T ||
                (T = new m({
                  dsn: "https://6fdc8e6e634d4a998b6f0dbfd7b025e1@o24547.ingest.sentry.io/4505471301713920",
                  release: e,
                  environment: t,
                  beforeSend: (e) => {
                    e.exception?.values?.forEach(({ value: t }) => {
                      e.fingerprint = ((e) => {
                        switch (e) {
                          case "Storage type: sessionStorage not supported":
                            return [b.sessionStorageNotSupported];
                          case "Storage type: localStorage not supported":
                            return [b.localStorageNotSupported];
                          case "Cannot define multiple custom elements with the same tag name":
                            return [b.multipleCustomElementsWithSameTagName];
                          case "Unexpected token ';'. Expected an opening '(' before a method's parameter list.":
                            return [b.unexpectedTokenMethodParamsList];
                          case e.match(
                            /Failed to fetch dynamically imported module/
                          )?.input:
                            return [b.dynamicImportFailed];
                          case e.match("missing : after property id")?.input:
                            return [b.missingColonAfterPropertyId];
                          case e.match("Unexpected token '='")?.input:
                            return [b.unexpectedTokenEqual];
                          case e.match("expected expression, got '='")?.input:
                            return [b.expectedExpressionGotEqual];
                          case e.match(
                            /error loading dynamically imported module/
                          )?.input:
                            return [b.dynamicImportFailed];
                          case e.match(/performance is not defined/)?.input:
                            return [b.performanceNotDefined];
                          case e.match(/performance?.mark is not a function/)
                            ?.input:
                            return [b.performanceMarkIsNotAFunction];
                          case e.match(
                            /undefined is not an object (evaluating 'this.renderOptions.renderBefore')/
                          )?.input:
                            return [b.undefinedIsNotAnObjectRenderOptions];
                          case e.match(/this.renderOptions is undefined/)
                            ?.input:
                            return [b.renderOptionsIsUndefined];
                          case e.match(
                            /Cannot read properties of null (reading 'insertBefore')/
                          )?.input:
                            return [b.cannotReadPropertiesOfNull];
                          case e.match(
                            /null is not an object (evaluating 'this._$AA.parentNode.insertBefore')/
                          )?.input:
                            return [b.nullIsNotAnObjectParentNodeInsertBefore];
                          case e.match(
                            /Failed to execute 'invoke' on 'CreateHTMLCallback': The provided callback is no longer runnable./
                          )?.input:
                            return [
                              b.failedToExecuteInvokeOnCreateHTMLCallback,
                            ];
                          case e.match(
                            "Failed to fetch: GET https://js.klarna.com/na/cma/"
                          )?.input:
                            return [b.failedToFetchOSMAPI];
                        }
                      })(t);
                    });
                    const t = ((e) => {
                      let t = !0;
                      return (
                        e.exception?.values?.forEach(({ stacktrace: e }) => {
                          e?.frames?.forEach(({ filename: e }) => {
                            t = !(0, I.i)(e);
                          });
                        }),
                        t ? null : e
                      );
                    })(e);
                    return t
                      ? ((e) => {
                          let t = !0;
                          return (
                            e.exception?.values?.forEach(({ value: e }) => {
                              k.forEach((n) => {
                                e.includes(n) && (t = (0, O.s)(5));
                              });
                            }),
                            t ? e : null
                          );
                        })(t)
                      : null;
                  },
                  blacklistUrls: [
                    /pagead\/js/i,
                    /graph\.facebook\.com/i,
                    /connect\.facebook\.net\/en_US\/all\.js/i,
                    /extensions\//i,
                    /^chrome:\/\//i,
                    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
                  ],
                })),
            n &&
              Object.entries(n).forEach(([e, t]) => {
                t && T.setTag(e, t.toString());
              }),
            T
          );
      },
      1331: (e, t, n) => {
        n.d(t, { nn: () => i, sp: () => a });
        var r = n(4074);
        const o = "__klarna_sdk_";
        let s = (function (e) {
          return (
            (e.localStorage = "localStorage"),
            (e.sessionStorage = "sessionStorage"),
            (e.klarnaIframeStorage = "klarnaIframeStorage"),
            e
          );
        })({});
        const i = (e) => {
            try {
              return (function (e, t = window) {
                if (!t?.localStorage)
                  throw new Error(`client does not support ${s.localStorage}`);
                const n = () => JSON.parse(t.localStorage.getItem(e) || "{}"),
                  r = {
                    get: (e) => {
                      const t = n(),
                        o = t?.[e];
                      if (!o) return null;
                      const s = t?.ttl;
                      return s && s < Date.now() ? (r.flush(), null) : o;
                    },
                    set: (r, o) => {
                      const s = n();
                      return (
                        null === o ? delete s[r] : (s[r] = o),
                        t.localStorage.setItem(e, JSON.stringify(s))
                      );
                    },
                    remove: (e) => r.set(e, null),
                    flush: () => t.localStorage.removeItem(e),
                  };
                return r;
              })(`${o}${e}`);
            } catch {
              (0, r.G)("Storage type: localStorage not supported");
            }
          },
          a = (e) => {
            try {
              return (function (e, t = window) {
                if (!t?.sessionStorage)
                  throw new Error(
                    `client does not support ${s.sessionStorage}`
                  );
                const n = () => JSON.parse(t.sessionStorage.getItem(e) || "{}"),
                  r = {
                    get: (e) => {
                      const t = n(),
                        r = t?.[e];
                      return r || null;
                    },
                    set: (r, o) => {
                      const s = n();
                      return (
                        null === o ? delete s[r] : (s[r] = o),
                        t.sessionStorage.setItem(e, JSON.stringify(s))
                      );
                    },
                    remove: (e) => r.set(e, null),
                    flush: () => t.sessionStorage.removeItem(e),
                  };
                return r;
              })(`${o}${e}`);
            } catch {
              (0, r.G)("Storage type: sessionStorage not supported");
            }
          };
      },
      5298: (e, t, n) => {
        n.d(t, { T: () => r });
        let r = (function (e) {
          return (
            (e.websdk = "websdk"),
            (e.osm = "osm-client-script"),
            (e.identitySdk = "identity-sdk"),
            e
          );
        })({});
      },
      5492: (e, t, n) => {
        n.d(t, { A: () => y });
        var r = {};
        n.r(r),
          n.d(r, {
            ALL: () => i,
            DEBUG: () => c,
            ERROR: () => d,
            FATAL: () => p,
            INFO: () => l,
            OFF: () => f,
            TRACE: () => a,
            WARN: () => u,
          });
        const o = {
            create: function (e, t) {
              new e.Image().src = t;
            },
          },
          s = {
            create: function (e, t, n) {
              e.navigator.sendBeacon(t, JSON.stringify(n));
            },
          };
        var i = 0,
          a = 0,
          c = 1,
          l = 2,
          u = 3,
          d = 4,
          p = 5,
          f = 6,
          m =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            },
          h =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          g = "/v1/";
        const v = {};
        function y(e) {
          let t = l,
            n = {};
          const y = (r, o = {}, s = {}, i = l) => {
              i < t ||
                (v[e] && v[e].event(r, { level: i, ...s, ...n, ...o }, {}, i));
            },
            I =
              (e, t) =>
              (n, r = {}, o = {}) =>
                e(n, r, o, t);
          return {
            configure: ({ options: t, data: r = {}, instanceId: y }) => {
              (n = r),
                v[e] ||
                  (v[e] = (function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : window;
                    if ("object" !== (void 0 === e ? "undefined" : h(e)) || !e)
                      throw new TypeError("expected configuration object");
                    var n = e.baseUrl,
                      r = void 0 === n ? "https://eu.klarnaevt.com" : n,
                      v = e.client,
                      y = e.clientVersion,
                      b = e.sessionId,
                      I = e.commonData,
                      O = void 0 === I ? {} : I,
                      k = e.instanceId,
                      T =
                        void 0 === k
                          ? Math.floor(9e3 * Math.random()) + 1e3
                          : k,
                      E = e.logLevel || i;
                    if ("string" != typeof v)
                      throw new TypeError(
                        "expected `client` in the configuration object"
                      );
                    if ("string" != typeof y)
                      throw new TypeError(
                        "expected `clientVersion` in the configuration object"
                      );
                    if ("string" != typeof b)
                      throw new TypeError(
                        "expected `sessionId` in the configuration object"
                      );
                    if ("number" != typeof E || E < i || E > f)
                      throw new TypeError("invalid `logLevel` (" + E + ")");
                    function S(e) {
                      return Object.keys(e)
                        .sort()
                        .map(function (t) {
                          return (
                            encodeURIComponent(t) +
                            "=" +
                            encodeURIComponent(e[t])
                          );
                        })
                        .join("&");
                    }
                    function w(e) {
                      var n =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        a = arguments[2];
                      if (
                        !(
                          E >
                          (arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : i)
                        )
                      ) {
                        if (!e)
                          throw new TypeError(
                            "expected `name` as first parameter"
                          );
                        var c = (function (e, t) {
                          return (
                            "" + r + g + v + "/" + y + "/" + e + "?" + S(t)
                          );
                        })(
                          e,
                          (n = m({}, O, n, {
                            iid: T,
                            sid: b,
                            timestamp: n.timestamp || new Date().getTime(),
                          }))
                        );
                        try {
                          s.create(t, c, a);
                        } catch (e) {
                          a && (c += "&" + S(a)), o.create(t, c);
                        }
                      }
                    }
                    return {
                      event: w,
                      trace: function (e, t, n) {
                        w(e, t, n, a);
                      },
                      debug: function (e, t, n) {
                        w(e, t, n, c);
                      },
                      info: function (e, t, n) {
                        w(e, t, n, l);
                      },
                      warn: function (e, t, n) {
                        w(e, t, n, u);
                      },
                      error: function (e, t, n) {
                        w(e, t, n, d);
                      },
                      fatal: function (e, t, n) {
                        w(e, t, n, p);
                      },
                      setLogLevel: function () {
                        var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : i;
                        if ("number" != typeof e || e < i || e > f)
                          throw new TypeError("invalid `logLevel` (" + e + ")");
                        E = e;
                      },
                      getConfig: function () {
                        return {
                          baseUrl: r,
                          client: v,
                          clientVersion: y,
                          sessionId: b,
                          instanceId: T,
                          logLevel: E,
                        };
                      },
                    };
                  })(b({ ...t, instanceId: y })));
            },
            event: y,
            trace: I(y, a),
            debug: I(y, c),
            info: I(y, l),
            warn: I(y, u),
            error: I(y, d),
            fatal: I(y, p),
            setLogLevel(n = "ALL") {
              try {
                const o = n.toUpperCase();
                (t = o in r ? r[o] : i), v[e] && v[e].setLogLevel(t);
              } catch (e) {}
            },
            removeInstance() {
              v[e] && delete v[e];
            },
          };
        }
        const b = ({
          client: e = "sdk",
          clientVersion: t = "",
          sessionId: n = "",
          instanceId: r,
          baseUrl: o = "",
        }) => ({
          client: e,
          clientVersion: t,
          environment: "production",
          sessionId: n,
          instanceId: r,
          baseUrl: o,
        });
      },
      6806: (e, t, n) => {
        n.d(t, { i: () => o });
        const r = [
            "https://s3.int.klarna.net",
            "https://js.klarna.com",
            "https://x.klarnacdn.net",
            "https://x.nonprod.us1.js.klarna.net",
            "https://osm.klarnaservices.com",
            "https://eu-assets.playground.klarnaservices.com",
            "https://na-assets.playground.klarnaservices.com",
            "https://ap-assets.playground.klarnaservices.com",
          ],
          o = (e) => r.some((t) => e.startsWith(t));
      },
    },
    r = {};
  function o(e) {
    var t = r[e];
    if (void 0 !== t) return t.exports;
    var s = (r[e] = { exports: {} });
    return n[e].call(s.exports, s, s.exports, o), s.exports;
  }
  (o.m = n),
    (o.amdO = {}),
    (o.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return o.d(t, { a: t }), t;
    }),
    (o.d = (e, t) => {
      for (var n in t)
        o.o(t, n) &&
          !o.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (o.f = {}),
    (o.e = (e) =>
      Promise.all(Object.keys(o.f).reduce((t, n) => (o.f[n](e, t), t), []))),
    (o.u = (e) =>
      "0.0.237/" +
      ({ 1249: "sdk", 4328: "klarna-test-drive-badge" }[e] || e) +
      ".chunk.js"),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (e = {}),
    (t = "@klarna-web-sdk/lib:"),
    (o.l = (n, r, s, i) => {
      if (e[n]) e[n].push(r);
      else {
        var a, c;
        if (void 0 !== s)
          for (
            var l = document.getElementsByTagName("script"), u = 0;
            u < l.length;
            u++
          ) {
            var d = l[u];
            if (
              d.getAttribute("src") == n ||
              d.getAttribute("data-webpack") == t + s
            ) {
              a = d;
              break;
            }
          }
        a ||
          ((c = !0),
          ((a = document.createElement("script")).charset = "utf-8"),
          (a.timeout = 120),
          o.nc && a.setAttribute("nonce", o.nc),
          a.setAttribute("data-webpack", t + s),
          (a.src = n)),
          (e[n] = [r]);
        var p = (t, r) => {
            (a.onerror = a.onload = null), clearTimeout(f);
            var o = e[n];
            if (
              (delete e[n],
              a.parentNode && a.parentNode.removeChild(a),
              o && o.forEach((e) => e(r)),
              t)
            )
              return t(r);
          },
          f = setTimeout(
            p.bind(null, void 0, { type: "timeout", target: a }),
            12e4
          );
        (a.onerror = p.bind(null, a.onerror)),
          (a.onload = p.bind(null, a.onload)),
          c && document.head.appendChild(a);
      }
    }),
    (o.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.p = "https://js.klarna.com/web-sdk/v1/"),
    (() => {
      var e = { 4396: 0 };
      o.f.j = (t, n) => {
        var r = o.o(e, t) ? e[t] : void 0;
        if (0 !== r)
          if (r) n.push(r[2]);
          else {
            var s = new Promise((n, o) => (r = e[t] = [n, o]));
            n.push((r[2] = s));
            var i = o.p + o.u(t),
              a = new Error();
            o.l(
              i,
              (n) => {
                if (o.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
                  var s = n && ("load" === n.type ? "missing" : n.type),
                    i = n && n.target && n.target.src;
                  (a.message =
                    "Loading chunk " + t + " failed.\n(" + s + ": " + i + ")"),
                    (a.name = "ChunkLoadError"),
                    (a.type = s),
                    (a.request = i),
                    r[1](a);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = (t, n) => {
          var r,
            s,
            [i, a, c] = n,
            l = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (r in a) o.o(a, r) && (o.m[r] = a[r]);
            c && c(o);
          }
          for (t && t(n); l < i.length; l++)
            (s = i[l]), o.o(e, s) && e[s] && e[s][0](), (e[s] = 0);
        },
        n = (self.webpackChunk_klarna_web_sdk_lib =
          self.webpackChunk_klarna_web_sdk_lib || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })(),
    (() => {
      var e = o(9604),
        t = o(509),
        n = o(6994);
      var r = o(7971),
        s = o(3398),
        i = o(1866),
        a = o(4074);
      var c = o(3056);
      function l() {
        const e = new CustomEvent("OSM:refresh");
        return document.dispatchEvent(e), null;
      }
      const u = [];
      class d extends Array {
        pop() {
          return u.pop();
        }
        push(e) {
          return u.push(e), u.length;
        }
        refresh = l;
      }
      const p = async ({
        accountId: l,
        clientId: u,
        clientToken: d,
        version: p,
        environment: f,
        additionalIdentifier: m,
        instanceId: h = "default",
      }) => {
        if (!u && !d)
          throw new Error(
            "Missing `client-id` attribute that is required for the SDK to work"
          );
        if (
          u &&
          !(function (e) {
            return /^klarna_(test|live)_(client|api)_[A-Za-z0-9_-]+={0,2}$/.test(
              e
            );
          })(u) &&
          !(0, e.f)(u)
        )
          throw new Error(
            'Invalid `client-id` attribute. Expected format: "klarna_<stage>_<key-type>_<base64>" or an UUID for legacy OSM integrations.'
          );
        let g,
          v = p,
          y = "https://js.klarna.com/web-sdk/";
        const b = (0, c.A)(),
          I = (0, t.E)({
            accountId: l,
            clientId: u,
            clientToken: d,
            instanceId: h,
            additionalIdentifier: m,
          }),
          [O, k] = (0, e.f)(u) ? [] : u.split("_");
        "playground" ==
          (f = (0, s.L)()
            ? "staging"
            : (0, e.f)(u) || (!u && d)
            ? "playground" === f?.toLowerCase()
              ? "playground"
              : "production"
            : k?.toLowerCase() === n.O4.TEST
            ? "playground"
            : "production") && (y = y.replace("js.", "js.playground."));
        try {
          (g = await (async (e, t = "production") => {
            const n =
              "production" === t ? "runtime-config" : `runtime-config-${t}`;
            try {
              const t = await fetch(`${e}config/${n}.json`);
              if (!t.ok)
                throw new Error(
                  `Failed to fetch configuration. Server responded with status ${t.status}: ${t.statusText}`
                );
              return await t.json();
            } catch (e) {
              return null;
            }
          })(y, f)),
            v
              ? ((g.lib.defaultVersion = v),
                (y += ((e) => {
                  const t = e.split("-next")[0];
                  return new RegExp(
                    "^([0-9]|[1-9][0-9]*).([0-9]|[1-9][0-9]*).([0-9]|[1-9][0-9]*)?$"
                  ).test(t);
                })(v)
                  ? `v1/${v}/`
                  : `${v}/`))
              : ((v = (0, r.A)(g)), (y += `v1/${v}/`));
          const e = { ...I, product: "entrypoint", sessionId: b };
          (0, i.r)({ environment: f, version: v, tags: e });
          const t = `${y}sdk.js`,
            { default: n } = await import(t);
          return new n({
            ...I,
            baseUrl: y,
            version: v,
            environment: f,
            sessionId: b,
            runtimeConfig: g,
          }).getPublicAPI();
        } catch (e) {
          try {
            const { default: e } = await Promise.all([
              o.e(443),
              o.e(1249),
            ]).then(o.bind(o, 1022));
            return new e({
              ...I,
              baseUrl: "0.0.237/",
              version: "0.0.237",
              environment: f,
              sessionId: b,
              runtimeConfig: g,
            }).getPublicAPI();
          } catch (e) {
            (0, a.G)(e);
          }
        }
      };
      (async function (e = window) {
        e.Klarna = e.Klarna || {};
        const t = ((e = document) =>
            e?.currentScript ?? e?.scripts?.[e?.scripts?.length - 1])(),
          {
            accountId: n,
            clientId: r,
            clientKey: o,
            clientToken: s,
            environment: i,
            version: a,
            additionalIdentifier: c,
          } = t?.dataset || {},
          u = r || o,
          f = new URL(t?.src),
          m = f?.searchParams?.get("ready"),
          h = e[m ?? "KlarnaSDKCallback"] ?? e.KlarnaSDKCallback;
        if (u || s) {
          const { isWebSDKAvailable: t } = ((e = window) => {
            const t = !!e.Klarna,
              n = !!((e) =>
                e.Klarna &&
                e.Klarna.Credit &&
                e.Klarna.DirectBankTransfer &&
                e.Klarna.DirectDebit &&
                e.Klarna.Payments)(e),
              r = !!((e) =>
                e.Klarna &&
                e.Klarna.Identity &&
                e.Klarna.Messaging &&
                e.Klarna.OnsiteMessaging &&
                e.Klarna.Payment)(e);
            return {
              isKlarnaNamespaceAvailable: t,
              isKPLibAvailable: n,
              isWebSDKAvailable: r,
            };
          })(e);
          if (
            (((e) => {
              (e.KlarnaOnsiteService = new d()),
                (e.kudt = e.KlarnaOnsiteService),
                (e.OnsiteMessaging = {
                  refresh: l,
                  eventListeners: {},
                  on: () => {},
                });
            })(e),
            t)
          )
            return void ("function" == typeof h && h(e.Klarna));
          const r = await p({
            accountId: n,
            clientId: u,
            clientToken: s,
            version: a,
            environment: i,
            additionalIdentifier: c,
          });
          (e.Klarna = Object.assign(r, e.Klarna)),
            "function" == typeof h && h(e.Klarna);
        } else
          try {
            e.Klarna.init = ({
              accountId: e,
              clientId: t,
              clientToken: n,
              version: r,
              environment: o,
              instanceId: s,
              additionalIdentifier: i,
            }) =>
              p({
                accountId: e,
                clientId: t,
                clientToken: n,
                version: r,
                environment: o,
                instanceId: s,
                additionalIdentifier: i,
              });
          } catch (e) {
            throw new Error("Klarna Web SDK init failed");
          }
      })().catch(() => {});
    })();
})();
