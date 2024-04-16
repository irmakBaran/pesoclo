(self.webpackChunk_loyaltylion_tonks =
  self.webpackChunk_loyaltylion_tonks || []).push([
  [481],
  {
    3863: (e) => {
      e.exports = function (e) {
        if (navigator.clipboard)
          return navigator.clipboard.writeText(e).catch(function (e) {
            throw void 0 !== e
              ? e
              : new DOMException(
                  "The request is not allowed",
                  "NotAllowedError"
                );
          });
        var t = document.createElement("span");
        (t.textContent = e),
          (t.style.whiteSpace = "pre"),
          document.body.appendChild(t);
        var r = window.getSelection(),
          n = window.document.createRange();
        r.removeAllRanges(), n.selectNode(t), r.addRange(n);
        var a = !1;
        try {
          a = window.document.execCommand("copy");
        } catch (e) {
          console.log("error", e);
        }
        return (
          r.removeAllRanges(),
          window.document.body.removeChild(t),
          a
            ? Promise.resolve()
            : Promise.reject(
                new DOMException(
                  "The request is not allowed",
                  "NotAllowedError"
                )
              )
        );
      };
    },
    1770: function (e, t, r) {
      var n, a;
      (n = function (e, t, r) {
        var n = function (e, t, r, n, a, o) {
          function l(e) {
            var t,
              r,
              n,
              a,
              o,
              l,
              i = e < 0;
            if (
              ((e = Math.abs(e).toFixed(c.decimals)),
              (r = (t = (e += "").split("."))[0]),
              (n = t.length > 1 ? c.options.decimal + t[1] : ""),
              c.options.useGrouping)
            ) {
              for (a = "", o = 0, l = r.length; o < l; ++o)
                0 !== o && o % 3 == 0 && (a = c.options.separator + a),
                  (a = r[l - o - 1] + a);
              r = a;
            }
            return (
              c.options.numerals.length &&
                ((r = r.replace(/[0-9]/g, function (e) {
                  return c.options.numerals[+e];
                })),
                (n = n.replace(/[0-9]/g, function (e) {
                  return c.options.numerals[+e];
                }))),
              (i ? "-" : "") + c.options.prefix + r + n + c.options.suffix
            );
          }
          function i(e, t, r, n) {
            return (r * (1 - Math.pow(2, (-10 * e) / n)) * 1024) / 1023 + t;
          }
          function s(e) {
            return "number" == typeof e && !isNaN(e);
          }
          var c = this;
          if (
            ((c.version = function () {
              return "1.9.3";
            }),
            (c.options = {
              useEasing: !0,
              useGrouping: !0,
              separator: ",",
              decimal: ".",
              easingFn: i,
              formattingFn: l,
              prefix: "",
              suffix: "",
              numerals: [],
            }),
            o && "object" == typeof o)
          )
            for (var d in c.options)
              o.hasOwnProperty(d) && null !== o[d] && (c.options[d] = o[d]);
          "" === c.options.separator
            ? (c.options.useGrouping = !1)
            : (c.options.separator = "" + c.options.separator);
          for (
            var m = 0, u = ["webkit", "moz", "ms", "o"], p = 0;
            p < u.length && !window.requestAnimationFrame;
            ++p
          )
            (window.requestAnimationFrame =
              window[u[p] + "RequestAnimationFrame"]),
              (window.cancelAnimationFrame =
                window[u[p] + "CancelAnimationFrame"] ||
                window[u[p] + "CancelRequestAnimationFrame"]);
          window.requestAnimationFrame ||
            (window.requestAnimationFrame = function (e, t) {
              var r = new Date().getTime(),
                n = Math.max(0, 16 - (r - m)),
                a = window.setTimeout(function () {
                  e(r + n);
                }, n);
              return (m = r + n), a;
            }),
            window.cancelAnimationFrame ||
              (window.cancelAnimationFrame = function (e) {
                clearTimeout(e);
              }),
            (c.initialize = function () {
              return !(
                !c.initialized &&
                ((c.error = ""),
                (c.d = "string" == typeof e ? document.getElementById(e) : e),
                c.d
                  ? ((c.startVal = Number(t)),
                    (c.endVal = Number(r)),
                    s(c.startVal) && s(c.endVal)
                      ? ((c.decimals = Math.max(0, n || 0)),
                        (c.dec = Math.pow(10, c.decimals)),
                        (c.duration = 1e3 * Number(a) || 2e3),
                        (c.countDown = c.startVal > c.endVal),
                        (c.frameVal = c.startVal),
                        (c.initialized = !0),
                        0)
                      : ((c.error =
                          "[CountUp] startVal (" +
                          t +
                          ") or endVal (" +
                          r +
                          ") is not a number"),
                        1))
                  : ((c.error = "[CountUp] target is null or undefined"), 1))
              );
            }),
            (c.printValue = function (e) {
              var t = c.options.formattingFn(e);
              "INPUT" === c.d.tagName
                ? (this.d.value = t)
                : "text" === c.d.tagName || "tspan" === c.d.tagName
                ? (this.d.textContent = t)
                : (this.d.innerHTML = t);
            }),
            (c.count = function (e) {
              c.startTime || (c.startTime = e), (c.timestamp = e);
              var t = e - c.startTime;
              (c.remaining = c.duration - t),
                c.options.useEasing
                  ? c.countDown
                    ? (c.frameVal =
                        c.startVal -
                        c.options.easingFn(
                          t,
                          0,
                          c.startVal - c.endVal,
                          c.duration
                        ))
                    : (c.frameVal = c.options.easingFn(
                        t,
                        c.startVal,
                        c.endVal - c.startVal,
                        c.duration
                      ))
                  : c.countDown
                  ? (c.frameVal =
                      c.startVal - (c.startVal - c.endVal) * (t / c.duration))
                  : (c.frameVal =
                      c.startVal + (c.endVal - c.startVal) * (t / c.duration)),
                c.countDown
                  ? (c.frameVal = c.frameVal < c.endVal ? c.endVal : c.frameVal)
                  : (c.frameVal =
                      c.frameVal > c.endVal ? c.endVal : c.frameVal),
                (c.frameVal = Math.round(c.frameVal * c.dec) / c.dec),
                c.printValue(c.frameVal),
                t < c.duration
                  ? (c.rAF = requestAnimationFrame(c.count))
                  : c.callback && c.callback();
            }),
            (c.start = function (e) {
              c.initialize() &&
                ((c.callback = e), (c.rAF = requestAnimationFrame(c.count)));
            }),
            (c.pauseResume = function () {
              c.paused
                ? ((c.paused = !1),
                  delete c.startTime,
                  (c.duration = c.remaining),
                  (c.startVal = c.frameVal),
                  requestAnimationFrame(c.count))
                : ((c.paused = !0), cancelAnimationFrame(c.rAF));
            }),
            (c.reset = function () {
              (c.paused = !1),
                delete c.startTime,
                (c.initialized = !1),
                c.initialize() &&
                  (cancelAnimationFrame(c.rAF), c.printValue(c.startVal));
            }),
            (c.update = function (e) {
              if (c.initialize()) {
                if (!s((e = Number(e))))
                  return void (c.error =
                    "[CountUp] update() - new endVal is not a number: " + e);
                (c.error = ""),
                  e !== c.frameVal &&
                    (cancelAnimationFrame(c.rAF),
                    (c.paused = !1),
                    delete c.startTime,
                    (c.startVal = c.frameVal),
                    (c.endVal = e),
                    (c.countDown = c.startVal > c.endVal),
                    (c.rAF = requestAnimationFrame(c.count)));
              }
            }),
            c.initialize() && c.printValue(c.startVal);
        };
        return n;
      }),
        void 0 === (a = "function" == typeof n ? n.call(t, r, t, e) : n) ||
          (e.exports = a);
    },
    6258: (e, t, r) => {
      "use strict";
      var n = r(6257);
      function a() {}
      function o() {}
      (o.resetWarningCache = a),
        (e.exports = function () {
          function e(e, t, r, a, o, l) {
            if (l !== n) {
              var i = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
              );
              throw ((i.name = "Invariant Violation"), i);
            }
          }
          function t() {
            return e;
          }
          e.isRequired = e;
          var r = {
            array: e,
            bigint: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: o,
            resetWarningCache: a,
          };
          return (r.PropTypes = r), r;
        });
    },
    507: (e, t, r) => {
      e.exports = r(6258)();
    },
    6257: (e) => {
      "use strict";
      e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
    4564: (e, t, r) => {
      "use strict";
      r.d(t, { Z: () => y });
      var n = r(7326),
        a = r(7689),
        o = r(507),
        l = r.n(o),
        i = !(
          "undefined" == typeof window ||
          !window.document ||
          !window.document.createElement
        ),
        s = (function () {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function (t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })();
      function c(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function d(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var m = (function (e) {
        function t() {
          return (
            c(this, t),
            d(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          (function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          s(t, [
            {
              key: "componentWillUnmount",
              value: function () {
                this.defaultNode && document.body.removeChild(this.defaultNode),
                  (this.defaultNode = null);
              },
            },
            {
              key: "render",
              value: function () {
                return i
                  ? (this.props.node ||
                      this.defaultNode ||
                      ((this.defaultNode = document.createElement("div")),
                      document.body.appendChild(this.defaultNode)),
                    n.createPortal(
                      this.props.children,
                      this.props.node || this.defaultNode
                    ))
                  : null;
              },
            },
          ]),
          t
        );
      })(a.Component);
      m.propTypes = { children: l().node.isRequired, node: l().any };
      const u = m;
      var p = (function () {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
      function _(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function h(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var f = (function (e) {
        function t() {
          return (
            _(this, t),
            h(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          (function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          p(t, [
            {
              key: "componentDidMount",
              value: function () {
                this.renderPortal();
              },
            },
            {
              key: "componentDidUpdate",
              value: function (e) {
                this.renderPortal();
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                n.unmountComponentAtNode(this.defaultNode || this.props.node),
                  this.defaultNode &&
                    document.body.removeChild(this.defaultNode),
                  (this.defaultNode = null),
                  (this.portal = null);
              },
            },
            {
              key: "renderPortal",
              value: function (e) {
                this.props.node ||
                  this.defaultNode ||
                  ((this.defaultNode = document.createElement("div")),
                  document.body.appendChild(this.defaultNode));
                var t = this.props.children;
                "function" == typeof this.props.children.type &&
                  (t = a.cloneElement(this.props.children)),
                  (this.portal = n.unstable_renderSubtreeIntoContainer(
                    this,
                    t,
                    this.props.node || this.defaultNode
                  ));
              },
            },
            {
              key: "render",
              value: function () {
                return null;
              },
            },
          ]),
          t
        );
      })(a.Component);
      const g = f;
      f.propTypes = { children: l().node.isRequired, node: l().any };
      const y = n.createPortal ? u : g;
    },
    3867: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { default: () => vl });
      var n = r(7689),
        a = r(6030),
        o = r(4564),
        l = r(6460),
        i = r(7307);
      const s = (e) => {
          const { useClassIsolator: t } = (0, a.v9)(l.G);
          return t
            ? n.createElement(
                "div",
                { className: (0, i.c)("isolator") },
                e.children
              )
            : n.createElement("div", { id: "loyaltylion" }, e.children);
        },
        c = (e) => {
          let { children: t } = e;
          const { useClassIsolator: r } = (0, a.v9)(l.G);
          return r
            ? n.createElement("div", { className: (0, i.ok)("custom-css") }, t)
            : n.createElement(
                "div",
                { id: (0, i.ok)("loyalty-panel-custom-css") },
                t
              );
        };
      var d = r(6087);
      const m = (e) => {
        let { node: t, allowCustomCss: r = !1, ...a } = e;
        const l = (0, d.T)(),
          i =
            !0 === a.isolate ||
            ("if-not-legacy-theme" === a.isolate && "legacy" !== l),
          m = (e) => {
            let { children: t } = e;
            return i
              ? n.createElement(s, null, t)
              : n.createElement(n.Fragment, null, t);
          },
          u = (e) => {
            let { children: t } = e;
            return r
              ? n.createElement(c, null, t)
              : n.createElement(n.Fragment, null, t);
          };
        return n.createElement(
          o.Z,
          { node: t },
          n.createElement(m, null, n.createElement(u, null, a.children))
        );
      };
      var u = r(4856),
        p = r(4263),
        _ = r(5833),
        h = r(9445),
        f = r(3434);
      const g = new (class {
        disableBodyScroll(e) {
          this.isIosDevice
            ? e &&
              ((this.allTargetElements[e] = e),
              e.addEventListener("touchstart", (e) => {
                1 === e.targetTouches.length &&
                  (this.initialClientY = e.targetTouches[0].clientY);
              }),
              e.addEventListener("touchmove", (t) => {
                1 === t.targetTouches.length && this.handleScroll(t, e);
              }))
            : this.setOverflowHidden(),
            this.firstTargetElement || (this.firstTargetElement = e);
        }
        clearAllBodyScrollLocks() {
          this.isIosDevice
            ? (Object.keys(this.allTargetElements).forEach((e) => {
                const t = this.allTargetElements[e];
                (t.ontouchstart = null),
                  (t.ontouchmove = null),
                  delete this.allTargetElements[e];
              }),
              (this.initialClientY = -1))
            : (this.setOverflowAuto(), (this.firstTargetElement = null));
        }
        enableBodyScroll(e) {
          this.isIosDevice
            ? ((e.ontouchstart = null), (e.ontouchmove = null))
            : this.firstTargetElement === e &&
              (this.setOverflowAuto(), (this.firstTargetElement = null));
        }
        preventDefault(e) {
          const t = e || window.event;
          return t.preventDefault && t.preventDefault(), !1;
        }
        setOverflowHidden() {
          setTimeout(() => {
            (this.previousBodyOverflowSetting = document.body.style.overflow),
              (this.previousDocumentElementOverflowSetting =
                document.documentElement.style.overflow),
              (document.body.style.overflow = "hidden"),
              (document.documentElement.style.overflow = "hidden");
          });
        }
        setOverflowAuto() {
          setTimeout(() => {
            (document.body.style.overflow =
              this.previousBodyOverflowSetting || ""),
              (document.documentElement.style.overflow =
                this.previousDocumentElementOverflowSetting || "");
          });
        }
        isTargetElementTotallyScrolled(e) {
          return !!e && e.scrollHeight - e.scrollTop <= e.clientHeight;
        }
        handleScroll(e, t) {
          const r = e.targetTouches[0].clientY - this.initialClientY;
          return t && 0 === t.scrollTop && r > 0
            ? this.preventDefault(e)
            : !(this.isTargetElementTotallyScrolled(t) && r < 0) ||
                this.preventDefault(e);
        }
        constructor() {
          (this.isIosDevice =
            "undefined" != typeof window &&
            window.navigator &&
            window.navigator.platform &&
            /iPad|iPhone|iPod|(iPad Simulator)|(iPhone Simulator)|(iPod Simulator)/.test(
              window.navigator.platform
            )),
            (this.firstTargetElement = null),
            (this.allTargetElements = {}),
            (this.initialClientY = -1),
            (this.previousBodyOverflowSetting = ""),
            (this.previousDocumentElementOverflowSetting = "");
        }
      })();
      function y(e) {
        g.disableBodyScroll(document.querySelector(e));
      }
      const b = (0, a.$j)((e) => ({
        isLoyaltyModalOpen: e.isLoyaltySplashOrPanelModalOpen,
      }))((e) => {
        const t = e.isLoyaltyModalOpen
          ? n.createElement(
              h.Z,
              {
                key: "1",
                classNames: {
                  enter: (0, i.ok)("loyalty-modal--enter"),
                  enterActive: (0, i.ok)("loyalty-modal--enter-active"),
                  exit: (0, i.ok)("loyalty-modal--exit"),
                  exitActive: (0, i.ok)("loyalty-modal--exit-active"),
                },
                onEnter: () => {
                  window.innerWidth <= 600
                    ? y("#loyaltylion-loyalty-modal-screen")
                    : y(".lion-loyalty-panel-content__overflow-container");
                },
                onExit: () => {
                  g.clearAllBodyScrollLocks();
                },
                timeout: 150,
              },
              n.createElement(
                "div",
                { className: (0, i.ok)("loyalty-modal") },
                n.createElement(
                  "div",
                  {
                    id: "loyaltylion-loyalty-modal-screen",
                    className: `${(0, i.ok)("screen", "screen--dark")}`,
                  },
                  e.children
                )
              )
            )
          : null;
        return n.createElement(f.Z, null, t);
      });
      var v = r(9305),
        E = r(3524),
        w = r(476),
        k = r(208);
      const N = [
        {
          i18nKeyMenu: "ui.dashboard.menu.earn_points",
          i18nKeyTitle: "ui.dashboard.page_titles.earn",
          i18nKeyDescription: "ui.splash.earn_heading_personalised",
          id: "earn",
        },
        {
          i18nKeyMenu: "ui.dashboard.menu.redeem_points",
          i18nKeyTitle: "ui.dashboard.page_titles.redeem",
          i18nKeyDescription: "ui.splash.rewards_heading",
          id: "rewards",
        },
        {
          i18nKeyMenu: "ui.dashboard.menu.refer_friends",
          i18nKeyTitle: "ui.dashboard.page_titles.refer",
          id: "refer",
        },
        {
          i18nKeyMenu: "ui.dashboard.menu.tiers",
          i18nKeyTitle: "ui.dashboard.page_titles.tiers",
          id: "tiers",
        },
        {
          i18nKeyMenu: "ui.dashboard.menu.account",
          i18nKeyTitle: "ui.dashboard.page_titles.account",
          id: "history",
        },
        {
          i18nKeyMenu: "ui.dashboard.menu.help",
          i18nKeyTitle: "ui.dashboard.page_titles.help",
          id: "help",
        },
      ];
      var C = r(342);
      const x = (0, k.P1)(
        C.Yh,
        (e) => N.find((t) => t.id === e.currentPageId) || N[0]
      );
      var S = r(4787);
      const I = () =>
        n.createElement(
          "div",
          {
            className: (0, i.ok)(
              "loyalty-panel-content",
              "loyalty-panel-content--blocked"
            ),
          },
          n.createElement(
            "header",
            { className: (0, i.ok)("loyalty-panel-content__header") },
            n.createElement(S.N, { i18nKey: "ui.blocked.sorry" })
          ),
          n.createElement(
            "div",
            {
              className: (0, i.ok)("loyalty-panel-content__overflow-container"),
            },
            n.createElement(
              "p",
              null,
              n.createElement(S.N, { i18nKey: "ui.blocked.message" })
            )
          )
        );
      var $ = r(5627),
        K = r(9656),
        T = r(9074);
      function P(e, t) {
        if (arguments.length < 1)
          throw new TypeError(
            "1 argument required, but only " + arguments.length + " present"
          );
        var r = t || {},
          n = r.locale,
          a = n && n.options && n.options.weekStartsOn,
          o = null == a ? 0 : (0, K.Z)(a),
          l = null == r.weekStartsOn ? o : (0, K.Z)(r.weekStartsOn);
        if (!(l >= 0 && l <= 6))
          throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
          );
        var i = (0, T.Z)(e, r),
          s = i.getDay(),
          c = (s < l ? 7 : 0) + s - l;
        return i.setDate(i.getDate() - c), i.setHours(0, 0, 0, 0), i;
      }
      function O(e) {
        e = e || {};
        var t = {};
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        return t;
      }
      function R(e, t) {
        if (arguments.length < 1)
          throw new TypeError(
            "1 argument required, but only " + arguments.length + " present"
          );
        var r = O(t);
        return (r.weekStartsOn = 1), P(e, r);
      }
      function F(e, t, r) {
        if (arguments.length < 2)
          throw new TypeError(
            "2 arguments required, but only " + arguments.length + " present"
          );
        var n = (0, T.Z)(e, r),
          a = (0, K.Z)(t);
        return n.setDate(n.getDate() + a), n;
      }
      function q(e, t, r) {
        if (arguments.length < 2)
          throw new TypeError(
            "2 arguments required, but only " + arguments.length + " present"
          );
        var n = (0, K.Z)(t),
          a = 7 * n;
        return F(e, a, r);
      }
      var H = r(4104);
      function A(e, t) {
        if (arguments.length < 1)
          throw new TypeError(
            "1 argument required, but only " + arguments.length + " present"
          );
        var r = (0, T.Z)(e, t);
        return r.setDate(1), r.setHours(0, 0, 0, 0), r;
      }
      var M = r(4443);
      function D(e, t) {
        if (arguments.length < 1)
          throw new TypeError(
            "1 argument required, but only " + arguments.length + " present"
          );
        var r = (0, T.Z)(e, t),
          n = new Date(0);
        return n.setFullYear(r.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
      }
      var V = r(3829),
        j = r(4776);
      function B(e, t) {
        let { unitOnly: r } =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        const n = new Date();
        let a;
        return (
          (a = e.days
            ? 7 === e.days
              ? R(q(n, 1))
              : (0, H.Z)(F(n, 1))
            : e.months
            ? A((0, M.Z)(n, 1))
            : D((0, V.Z)(n, 1))),
          (0, j.Km)(a, n, { locale: t, unitOnly: r })
        );
      }
      var L = r(7564),
        U = r(6231),
        z = r(1667),
        W = r(3418),
        G = r(4004),
        Y = r(686),
        Z = r(8933),
        Q = r(5170),
        X = r(7665);
      const J = (e) => {
        let { points: t, isPerUnit: r, className: o } = e;
        const l = (0, a.v9)(E.j),
          i = (0, a.v9)(Q.HO);
        return n.createElement(
          "div",
          (0, Z.Z)({}, o ? { className: o } : {}),
          r
            ? n.createElement(S.N, {
                i18nKey: "ui.dashboard.earn_points.points_per",
                params: { smart_count: t, currency: (0, X.pY)(l, i, 1) },
              })
            : n.createElement(S.N, {
                i18nKey: "ui.general.points_count",
                params: { smart_count: t },
              })
        );
      };
      var ee = r(8836),
        te = r(4346),
        re = r(705);
      const ne = (e) => {
          let { completed: t, onTrigger: r, url: o } = e;
          const l = (0, a.v9)(te.eD);
          if (t)
            return n.createElement(
              "div",
              { className: (0, i.c)("clickthrough-visit__completed") },
              n.createElement(S.N, {
                i18nKey: "ui.general.visiting_thanks",
                params: { url: o },
              })
            );
          return n.createElement(
            "div",
            {
              className: (0, i.ok)("clickthrough__wrapper"),
              "data-testid": "clickthrough-wrapper",
            },
            n.createElement(
              re.aI,
              {
                onClick: () => {
                  (0, ee.y)({
                    parent: window.parent,
                    platform: "generic",
                    url: o,
                    isMobile: l,
                    onClose: () => {
                      setTimeout(() => {
                        r({ url: o });
                      }, 3e3);
                    },
                  }).catch((e) => {
                    G.k.error("Could not watch clickthrough window", {
                      err: e,
                    });
                  });
                },
                className: (0, i.ok)("clickthrough__button"),
              },
              n.createElement(S.N, {
                i18nKey: "defaults.rules.clickthrough.visit_page",
              })
            )
          );
        },
        ae = (e) => {
          let { url: t, completed: r, onTrigger: o } = e;
          const l = (0, a.v9)(te.eD);
          if (r)
            return n.createElement(
              "div",
              { className: (0, i.ok)("facebook-like__completed") },
              n.createElement(S.N, {
                i18nKey: "ui.referral_popup.like_facebook_success",
              })
            );
          return n.createElement(
            "div",
            {
              className: (0, i.ok)("facebook-like__wrapper"),
              "data-testid": "facebook-wrapper",
            },
            n.createElement(
              re.aI,
              {
                onClick: () => {
                  (0, ee.y)({
                    parent: window.parent,
                    platform: "facebook",
                    url: t,
                    isMobile: l,
                    onClose: () => {
                      setTimeout(() => {
                        o({ url: t });
                      }, 3e3);
                    },
                  }).catch((e) => {
                    G.k.error("Could not watch facebook window", { err: e });
                  });
                },
                className: (0, i.ok)("facebook-like__button"),
              },
              n.createElement(S.N, {
                i18nKey: "defaults.rules.complete_activity",
              })
            )
          );
        };
      class oe extends n.Component {
        componentWillUnmount() {
          this.props.reset();
        }
        render() {
          return this.props.customer
            ? this.props.completed
              ? n.createElement(
                  "div",
                  { className: (0, i.c)("newsletter-signup-action") },
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "newsletter-signup-action__completed"
                      ),
                    },
                    n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.earn_points.newsletter_signup.success_text",
                    })
                  )
                )
              : n.createElement(
                  "div",
                  {
                    className: (0, i.c)("newsletter-signup-action"),
                    "data-testid": "newsletter-signup-action",
                  },
                  n.createElement(
                    "div",
                    { className: (0, i.c)("newsletter-signup-action__help") },
                    n.createElement(S.N, {
                      i18nKey: "defaults.rules.newsletter_signup.description",
                      params: { points_text: this.props.rule.valueText },
                    })
                  ),
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "newsletter-signup-action__button-wrapper"
                      ),
                    },
                    n.createElement(
                      re.aI,
                      {
                        onClick: this.handleSignup,
                        loading: this.props.isSubmitting,
                        className: (0, i.c)("newsletter-signup-action__button"),
                      },
                      n.createElement(S.N, {
                        i18nKey:
                          "defaults.rules.newsletter_signup.action_button_text",
                      })
                    )
                  )
                )
            : null;
        }
        constructor(...e) {
          super(...e),
            (this.handleSignup = async () => {
              const e = await this.props.signup();
              e && "error" in e && alert((0, w.t)("ui.general.error"));
            });
        }
      }
      const le = (0, a.$j)(
          (e) => ({
            customer: (0, _._V)(e),
            isSubmitSuccess: e.loyaltyPanel.customerNewsletterSignupSuccess,
            isSubmitting: e.loyaltyPanel.isCustomerNewsletterSignupSubmitting,
            submitError: e.loyaltyPanel.customerNewsletterSignupError,
          }),
          (e) => ({
            reset: () => e((0, Y.AI)()),
            signup: async () => e((0, Y.e6)()),
          })
        )(oe),
        ie = (e) => {
          let { completed: t, onTrigger: r, social_name: o, username: l } = e;
          const s = (0, a.v9)(te.eD);
          if (t)
            return n.createElement(
              "div",
              { className: (0, i.c)(`${o}-follow__completed`) },
              n.createElement(S.N, {
                i18nKey: "ui.general.following_thanks",
                params: { username: l, social_name: (0, W.fp)(o) },
              })
            );
          return n.createElement(
            "div",
            { className: (0, i.c)(`${o}-follow__link`) },
            n.createElement(
              re.aI,
              {
                onClick: () => {
                  (0, ee.y)({
                    parent: window.parent,
                    platform: o,
                    username: l,
                    isMobile: s,
                    onClose: () => {
                      setTimeout(() => {
                        r({ username: l });
                      }, 3e3);
                    },
                  }).catch((e) => {
                    G.k.error(`Could not watch ${o} window`, { err: e });
                  });
                },
                className: (0, i.c)(`${o}-follow__button`),
              },
              n.createElement(S.N, { i18nKey: "ui.general.follow" }),
              " @",
              l
            )
          );
        },
        se = (e) => {
          let { rule: t } = e;
          const r = (0, a.I0)(),
            o = (0, d.T)(),
            l = (0, a.v9)(L.fN),
            s = (0, n.useCallback)(
              (e) => r(Y.Go({ id: t.id, properties: e })),
              [r, t.id]
            ),
            c = (0, n.useCallback)(() => r(Y.VO(t.id)), [r, t.id]),
            m = (0, n.useCallback)(() => r(Y.s$()), [r]);
          if (t.completedForever)
            return "modern" === o
              ? n.createElement(
                  re.aI,
                  { completed: !0, disabled: !0 },
                  n.createElement(S.o.span, {
                    className: (0, i.ok)("rule-item__completed"),
                    i18nKey: "ui.general.completed",
                  })
                )
              : n.createElement("div", {
                  className: (0, i.ok)("rule-item__completed-forever"),
                  "data-testid": "completed-forever",
                });
          if (
            !(function (e) {
              return "" !== e.actionButtonText;
            })(t)
          )
            return null;
          switch (t.kind) {
            case "instagramFollow":
              return n.createElement(ie, {
                completed: t.completedForever,
                onTrigger: s,
                username: t.properties.instagramHandle,
                social_name: "instagram",
              });
            case "twitterFollow":
              return n.createElement(ie, {
                completed: t.completedForever,
                onTrigger: s,
                username: t.properties.twitterHandle,
                social_name: "twitter",
              });
            case "facebookLike":
              return n.createElement(ae, {
                completed: t.completedForever,
                onTrigger: s,
                url: t.properties.facebookLikeUrl,
              });
            case "clickthrough":
              return n.createElement(ne, {
                completed: t.completedForever,
                onTrigger: s,
                url: t.properties.clickthroughDestinationUrl,
              });
            case "newsletterSignup":
              return n.createElement(le, {
                completed: t.completedForever,
                rule: t,
              });
            case "birthday":
              return n.createElement(ce, { rule: t, openModal: c });
            default: {
              const e = "referral" === t.kind ? m : c,
                r = (0, $.cQ)(t),
                a = !t.actionable || r;
              return n.createElement(
                re.aI,
                { onClick: e, disabled: a, limitReached: r },
                r
                  ? n.createElement(S.o.div, {
                      className: (0, i.ok)("rule-item__limit-reached"),
                      i18nKey: "ui.general.wait_duration",
                      params: {
                        duration: B(t.limitInterval, l, { unitOnly: !0 }),
                      },
                    })
                  : t.actionButtonText
              );
            }
          }
        },
        ce = (e) => {
          let { rule: t, openModal: r } = e;
          const o = (0, a.v9)(L.fN),
            { birthday: l, birthdaySetAt: s } = (0, a.v9)(_.zl);
          if (!l)
            return n.createElement(re.aI, { onClick: r }, t.actionButtonText);
          const c = (0, j.QF)({ birthday: l, birthdaySetAt: s });
          return c <= 0
            ? n.createElement(
                re.aI,
                { completed: !0 },
                n.createElement(S.o.span, {
                  className: (0, i.ok)("rule-item__completed"),
                  i18nKey: "ui.general.completed",
                })
              )
            : n.createElement(
                re.aI,
                { disabled: !0 },
                n.createElement(
                  "div",
                  { className: (0, i.ok)("rule-item__limit-reached") },
                  (0, j.Km)(F(new Date(), c), new Date(), {
                    locale: o,
                    unit: "day",
                    unitOnly: !0,
                  })
                )
              );
        },
        de = (e) => {
          let { children: t, customer: r, rule: a, style: o } = e;
          const l = (0, i.On)() ?? "integrated",
            s = (0, i.KP)("rule-item", l);
          return n.createElement(
            "div",
            {
              "data-rule-id": a.id,
              className: (0, i.c)(
                `${s}`,
                `${s}--${(0, W.Kh)(a.kind)}`,
                `${s}--${a.id}`,
                `${s}--${a.name}`,
                {
                  [`${s}--style-${o}`]: Boolean(o),
                  [`${s}--completed-forever`]: a.completedForever,
                  [`${s}--actionable`]: Boolean(r) && a.actionable,
                  [`${s}--guest`]: !r,
                  [`${s}--authenticated`]: Boolean(r),
                }
              ),
            },
            t
          );
        },
        me = ["1", "legacy"];
      const ue = (e) => {
        let { mode: t, ruleId: r, requestedStyle: o } = e;
        const l = (0, a.v9)(U._),
          s = (0, a.v9)(_._V),
          c = (0, a.v9)(z.M0),
          d = (0, a.v9)((e) => (0, $.ef)(e, r)),
          m = (0, a.I0)(),
          u = (0, n.useCallback)(() => {
            (function (e, t) {
              return Boolean(e && t && t.actionable && !t.completedForever);
            })(s, d) && m((0, Y.VO)(r));
          }, [s, m, d, r]);
        if (!d) return null;
        const p = (function (e, t, r) {
            if ("panel" === t) return null;
            if ("" === e) return r ? "legacy" : "1";
            if (
              !(function (e) {
                return me.includes(e);
              })(e)
            )
              return (
                G.k.warn(
                  "Unsupported rule style provided, please ensure data-lion-style ondata-lion-rules-list is one of ['legacy', '1']"
                ),
                "1"
              );
            return e;
          })(o, t, c),
          h = (0, i.KP)("rule-item", t),
          f = (e) => {
            let { children: t } = e;
            return "legacy" === l
              ? n.createElement(n.Fragment, null, t)
              : n.createElement(
                  "div",
                  { className: (0, i.c)(`${h}__actions`) },
                  t
                );
          },
          g = (e) => {
            let { children: t } = e;
            return "legacy" === l
              ? n.createElement(n.Fragment, null, t)
              : n.createElement(
                  "div",
                  { className: (0, i.c)(`${h}__icon-wrap`) },
                  t
                );
          };
        return n.createElement(
          i.QB.Provider,
          { value: t },
          n.createElement(
            de,
            { customer: s, rule: d, style: p },
            n.createElement(
              "div",
              {
                onClick: pe(p) ? void 0 : u,
                className: (0, i.c)(`${h}__content`),
              },
              n.createElement(
                g,
                null,
                n.createElement("div", {
                  className: (0, i.c)(
                    `${h}__icon`,
                    "icon",
                    "icon__rule",
                    `icon__rule--${(0, W.Kh)(d.kind)}`
                  ),
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.c)(`${h}__title`) },
                d.displayTitle
              ),
              n.createElement(J, {
                points: d.value,
                isPerUnit: d.isValuePerUnit,
                className: (0, i.c)(`${h}__points`),
              }),
              (function (e) {
                return "legacy" === e || null === e;
              })(p) &&
                (0, $.cQ)(d) &&
                n.createElement(_e, { block: h, rule: d }),
              (function (e) {
                return "legacy" === e || null === e;
              })(p) &&
                d.completedForever &&
                n.createElement("div", {
                  className: (0, i.c)(`${h}__completed-forever`),
                }),
              pe(p) &&
                s &&
                n.createElement(f, null, n.createElement(se, { rule: d }))
            )
          )
        );
      };
      function pe(e) {
        return "1" === e;
      }
      const _e = (e) => {
        let { block: t, rule: r } = e;
        const o = (0, a.v9)(L.fN);
        return n.createElement(
          "div",
          { className: (0, i.c)(`${t}__limit-reached`) },
          r.limitInterval ? B(r.limitInterval, o, { unitOnly: !0 }) : null
        );
      };
      const he = (e) => {
        let { mode: t, requestedStyle: r = "", className: o = "" } = e;
        const l = (0, a.v9)((e) => (0, $.ST)(e, t)),
          s =
            "panel" === t
              ? "loyalty-panel-page-earn__rules-list"
              : "rules-list";
        return n.createElement(
          "div",
          { className: (0, i.c)(s) + ` ${o}` },
          l.map((e) =>
            n.createElement(ue, {
              key: e,
              mode: t,
              ruleId: e,
              requestedStyle: r,
            })
          )
        );
      };
      r(8274);
      const fe = (0, a.$j)((e, t) => {
        let { siteId: r } = t;
        return {
          ruleIds: (0, $.Pj)(e, r).map((e) => e.id),
          site: (0, u.Et)(e, r),
        };
      })(function (e) {
        const { site: t, siteId: r, ruleIds: a } = e;
        if (!t) throw new Error(`Could not find Site ${r}`);
        return 0 === a.length
          ? null
          : n.createElement(
              "div",
              { className: (0, i.c)("other-site-rules") },
              n.createElement(
                "div",
                { className: (0, i.c)("other-site-rules__header") },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.earn_points.go_to_other_site.header",
                  params: { store_name: t.name },
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.c)("loyalty-panel-page-earn__rules-list") },
                a.map((e) =>
                  n.createElement(ue, {
                    key: e,
                    mode: "panel",
                    requestedStyle: "",
                    ruleId: e,
                  })
                )
              )
            );
      });
      class ge extends n.Component {
        render() {
          const { otherSiteIds: e } = this.props;
          return n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-page-earn") },
            n.createElement(he, { mode: "panel" }),
            e.map((e) => n.createElement(fe, { key: e, siteId: e }))
          );
        }
      }
      const ye = (0, a.$j)((e) => ({
        otherSiteIds: (0, u.$e)(e).map((e) => e.id),
      }))(ge);
      class be extends n.PureComponent {
        render() {
          const { helpContent: e } = this.props;
          return n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-page-help") },
            n.createElement("div", {
              className: (0, i.ok)("loyalty-panel-page-help__content"),
              dangerouslySetInnerHTML: { __html: e },
            })
          );
        }
      }
      const ve = (0, a.$j)((e) => ({ helpContent: (0, z.r7)(e).helpContent }))(
        be
      );
      var Ee = r(6109),
        we = r(1780);
      const ke = (e) => {
          let { pointState: t } = e;
          switch (t) {
            case "approved":
              return n.createElement(S.N, { i18nKey: "ui.general.approved" });
            case "declined":
              return n.createElement(S.N, { i18nKey: "ui.general.declined" });
            case "expired":
              return n.createElement(S.N, { i18nKey: "ui.general.expired" });
            case "pending":
              return n.createElement(S.N, { i18nKey: "ui.general.pending" });
            case "void":
              return n.createElement(S.N, { i18nKey: "ui.general.void" });
          }
          G.k.error(`Invalid point state: ${t} for history row`);
        },
        Ne = (e) => {
          let { className: t = "", mode: r } = e;
          const o = (0, a.v9)(_.M4),
            l = (0, a.v9)(Ee.wD);
          if (!o) return null;
          const s = 0 === l.length,
            c = (0, i.KP)("history-table", r);
          return n.createElement(
            i.Qj.Provider,
            { value: c },
            n.createElement(
              "table",
              { className: (0, i.c)(`${c}`) + ` ${t}` },
              n.createElement(
                "thead",
                null,
                n.createElement(
                  "tr",
                  null,
                  n.createElement(
                    "th",
                    {
                      "data-i18n-key": "ui.general.date",
                      className: (0, i.c)(`${c}__header-cell`),
                    },
                    n.createElement(S.N, { i18nKey: "ui.general.date" })
                  ),
                  n.createElement(
                    "th",
                    {
                      "data-i18n-key": "ui.general.type",
                      className: (0, i.c)(`${c}__header-cell`),
                    },
                    n.createElement(S.N, { i18nKey: "ui.general.type" })
                  ),
                  n.createElement(
                    "th",
                    {
                      "data-i18n-key": "ui.general.action",
                      className: (0, i.c)(`${c}__header-cell`),
                    },
                    n.createElement(S.N, { i18nKey: "ui.general.action" })
                  ),
                  n.createElement(
                    "th",
                    {
                      "data-i18n-key": "ui.general.points_plural",
                      className: (0, i.c)(`${c}__header-cell`),
                    },
                    n.createElement(S.N, {
                      i18nKey: "ui.general.points_plural",
                    })
                  ),
                  n.createElement(
                    "th",
                    {
                      "data-i18n-key": "ui.general.status",
                      className: (0, i.c)(
                        `${c}__header-cell`,
                        `${c}__header-cell--centre-aligned`
                      ),
                    },
                    n.createElement(S.N, { i18nKey: "ui.general.status" })
                  )
                )
              ),
              n.createElement(
                "tbody",
                null,
                s
                  ? n.createElement(Ce, null)
                  : l.map((e) => n.createElement(xe, { action: e, key: e.id }))
              )
            )
          );
        },
        Ce = () => {
          const e = (0, i.VG)();
          return n.createElement(
            "tr",
            { className: (0, i.c)(`${e}__row`) },
            n.createElement(
              "td",
              {
                colSpan: 5,
                className: (0, i.c)(
                  `${e}__row-cell`,
                  `${e}__row-cell--empty-state`
                ),
              },
              n.createElement(S.o.span, {
                i18nKey: "ui.dashboard.history.empty_state",
              })
            )
          );
        },
        xe = (e) => {
          let { action: t } = e;
          const r = (0, i.VG)();
          return n.createElement(
            "tr",
            { key: t.id, className: (0, i.c)(`${r}__row`) },
            n.createElement(
              "td",
              { className: (0, i.c)(`${r}__row-cell`, `${r}__row-date`) },
              (0, w.p6)(new Date(t.date))
            ),
            n.createElement(
              "td",
              { "data-i18n-key": Se(t), className: (0, i.c)(`${r}__row-cell`) },
              (0, w.t)(Se(t))
            ),
            n.createElement("td", {
              className: (0, i.c)(`${r}__row-cell`),
              dangerouslySetInnerHTML: { __html: t.actionText },
            }),
            n.createElement(
              "td",
              { className: (0, i.c)(`${r}__row-cell`) },
              t.displayPoints
            ),
            n.createElement(
              "td",
              { className: (0, i.c)(`${r}__row-cell`, `${r}__row-status`) },
              n.createElement(Ie, { block: r, action: t })
            )
          );
        };
      function Se(e) {
        switch (e.type) {
          case "add":
          case "deduct":
            return "ui.general.transaction";
          case "flow":
          case "rule":
            return "ui.general.activity";
          case "reward":
            return "ui.general.reward_one";
        }
      }
      const Ie = (e) => {
          let { action: t, block: r } = e;
          const o = (0, a.I0)(),
            l = (0, a.v9)(we.bM),
            s = (e) => {
              (" " !== e.key && "Enter" !== e.key) ||
                (e.stopPropagation(), e.preventDefault(), c());
            },
            c = (0, n.useCallback)(() => {
              ("reward" !== t.type || l.includes(t.claimedRewardId)) &&
                o((0, Y.Ys)({ type: "action", id: t.id }));
            }, [t, o, l]);
          switch (t.type) {
            case "add":
            case "deduct":
              return n.createElement("span", null, "-");
            case "flow":
            case "rule":
            case "reward":
              return n.createElement(
                "div",
                {
                  tabIndex: 0,
                  onKeyPress: s,
                  onClick: c,
                  className: (0, i.c)(
                    `${r}__bubble`,
                    "history-state-bubble",
                    `history-state-bubble--${t.state}`
                  ),
                },
                n.createElement(ke, { pointState: t.state })
              );
          }
        },
        $e = (0, a.$j)(null, (e) => ({
          onLinkClick: () => e((0, Y.oO)("earn")),
        }))((e) => {
          let { onLinkClick: t } = e;
          return n.createElement(
            "div",
            { className: (0, i.ok)("no-activities-help") },
            n.createElement(
              "div",
              null,
              n.createElement(S.N, {
                i18nKey: "ui.dashboard.account.no_activities_help",
              })
            ),
            n.createElement(
              "a",
              { href: "#", onClick: t, className: (0, i.ok)("action-button") },
              n.createElement(S.N, { i18nKey: "ui.dashboard.page_titles.earn" })
            )
          );
        }),
        Ke = () => {
          const e = (0, a.v9)(Ee.wD);
          return n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-page-history") },
            e.length > 0
              ? n.createElement(Ne, { mode: "panel" })
              : n.createElement($e, null)
          );
        };
      var Te = r(10),
        Pe = r(1635),
        Oe = r(9183),
        Re = r(6363),
        Fe = r(8847),
        qe = r(6355),
        He = r(3203),
        Ae = r(481);
      const Me = (e) => {
        if (0 === (e = e.trim()).length) return [];
        let t;
        if (e.match(/,/)) {
          if (e.match(";")) return [];
          t = e.split(",");
        } else if (e.match(/;/)) {
          if (e.match(",")) return [];
          t = e.split(";");
        } else t = e.split(" ");
        return t
          .map((e) => e.trim())
          .filter((e) => e.match(/^[^@,; ]+@[^@,; ]+$/));
      };
      var De = r(2138);
      class Ve extends n.Component {
        shouldComponentUpdate(e) {
          return JSON.stringify(e) !== JSON.stringify(this.props);
        }
        validate(e) {
          switch (e) {
            case "message":
              return this.props.formValues.message.length >= 5;
            case "name":
              return this.props.formValues.name.length > 0;
            case "recipients":
              return Me(this.props.formValues.recipients).length > 0;
          }
        }
        render() {
          return n.createElement(
            "form",
            {
              onSubmit: this.handleSubmit,
              className: (0, i.ok)("referral-email-form"),
            },
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-email-form__field") },
              n.createElement(
                "label",
                {
                  className: (0, i.ok)(
                    "referral-email-form__label",
                    "referral-email-form__label--recipients"
                  ),
                },
                n.createElement(S.N, {
                  i18nKey: "ui.referral_popup.recipients",
                })
              ),
              n.createElement("input", {
                type: "input",
                name: "recipients",
                placeholder: "alice@example.com, james@example.com",
                className: (0, i.ok)("referral-email-form__input", {
                  "referral-email-form__input--error":
                    this.touched && !this.validate("recipients"),
                }),
                value: this.props.formValues.recipients,
                onChange: this.setRecipients,
              })
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-email-form__field") },
              n.createElement(
                "label",
                {
                  className: (0, i.ok)(
                    "referral-email-form__label",
                    "referral-email-form__label---your-name"
                  ),
                },
                n.createElement(S.N, { i18nKey: "ui.referral_popup.your_name" })
              ),
              n.createElement("input", {
                type: "input",
                name: "name",
                className: (0, i.ok)("referral-email-form__input", {
                  "referral-email-form__input--error":
                    this.touched && !this.validate("name"),
                }),
                value: this.props.formValues.name,
                onChange: this.setName,
              })
            ),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "referral-email-form__field",
                  "referral-email-form__field--message"
                ),
              },
              n.createElement(
                "label",
                {
                  className: (0, i.ok)(
                    "referral-email-form__label",
                    "referral-email-form__label--message"
                  ),
                },
                n.createElement(S.N, {
                  i18nKey: "ui.referral_popup.message_label",
                })
              ),
              n.createElement("textarea", {
                name: "message",
                className: (0, i.ok)(
                  "referral-email-form__input",
                  "referral-email-form__textarea",
                  {
                    "referral-email-form__input--error":
                      this.touched && !this.validate("message"),
                  }
                ),
                value: this.props.formValues.message,
                onChange: this.setMessage,
              })
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-email-form__buttons") },
              n.createElement(
                "button",
                {
                  type: "submit",
                  className: (0, i.ok)(
                    "action-button",
                    this.props.submitting ? "action-button--loading" : "",
                    "referral-email-form__button",
                    "referral-email-form__submit-button"
                  ),
                },
                n.createElement(S.N, { i18nKey: "ui.referral_popup.send_btn" })
              ),
              n.createElement(
                "button",
                {
                  "data-testid": "refer-email-form__back-button",
                  className: (0, i.ok)(
                    "action-button",
                    "action-button--neutral",
                    "referral-email-form__button"
                  ),
                  type: "button",
                  onClick: this.handleClose,
                },
                n.createElement(S.N, { i18nKey: "ui.referral_popup.back_btn" })
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("referral-email-form__success-message", {
                    "referral-email-form__success-message--visible":
                      this.props.submitSuccess,
                  }),
                },
                n.createElement(S.N, {
                  i18nKey: "ui.referral_popup.emails_sent",
                })
              )
            )
          );
        }
        componentDidMount() {
          this.props.setValues({
            message: this.formValues.message || this.props.emailContent,
            name: this.formValues.name || this.props.firstName,
          });
        }
        get touched() {
          return this.state.touched;
        }
        get formValues() {
          return this.props.formValues;
        }
        get formFields() {
          return Object.keys(this.props.formValues);
        }
        constructor(e) {
          super(e),
            (this.handleClose = () => {
              this.props.submitting || this.props.onClose();
            }),
            (this.handleSubmit = (e) => {
              if (
                (e.preventDefault(),
                this.props.submitting || this.props.submitSuccess)
              )
                return;
              if (!this.formFields.every((e) => this.validate(e)))
                return void this.setState({ touched: !0 });
              const { formValues: t } = this.props;
              this.setState({ touched: !1 }),
                this.props
                  .submit({
                    message: t.message,
                    name: t.name,
                    recipients: Me(t.recipients),
                  })
                  .then(async () => (0, Ae._v)(2500))
                  .then(() => {
                    this.props.reset();
                  })
                  .catch((e) =>
                    G.k.error("failed to submit referral email form", {
                      err: e,
                    })
                  );
            }),
            (this.setFieldValues = (e) => {
              this.setState({ touched: !0 }), this.props.setValues(e);
            }),
            (this.setRecipients = (e) => {
              e.persist(), this.setFieldValues({ recipients: e.target.value });
            }),
            (this.setName = (e) => {
              e.persist(),
                this.setFieldValues({ name: e.target.value.slice(0, 50) });
            }),
            (this.setMessage = (e) => {
              e.persist(),
                this.setFieldValues({ message: e.target.value.slice(0, 1e3) });
            }),
            (this.state = { touched: !1 });
        }
      }
      const je = (0, a.$j)(
        (e) => ({
          firstName: (0, _.H5)(e).firstName,
          emailContent: (0, E.Ub)(e),
          formValues: e.referralWidget.emailForm.values,
          touched: e.referralWidget.emailForm.touched,
          submitting: e.referralWidget.emailForm.submitting,
          submitSuccess: e.referralWidget.emailForm.submitSuccess,
        }),
        (e) => ({
          ...(0, Te.bindActionCreators)({ setValues: De.av, reset: De.xN }, e),
          submit: async (t) => e((0, De.BW)(t)),
        })
      )(Ve);
      var Be = r(3519);
      const Le = (e) => {
        let { type: t, href: r, target: a, onClick: o, buttonTextKey: l } = e;
        const s = { onClick: o, href: r, target: a };
        return n.createElement(
          "a",
          (0, Z.Z)({}, s, {
            className: (0, i.ok)(
              "referral-share-button",
              `referral-share-button--${t}`
            ),
          }),
          n.createElement(S.N, { i18nKey: l })
        );
      };
      class Ue extends n.PureComponent {
        render() {
          const {
              isFacebookSdkReady: e,
              mobileShareUrl: t,
              isMobile: r,
            } = this.props,
            a = {
              type: "facebook-messenger",
              buttonTextKey: "sdk.referral_share_buttons.facebook_messenger",
            };
          return r
            ? n.createElement(
                Le,
                (0, Z.Z)({ onClick: this.handleClick, href: t }, a)
              )
            : e
            ? n.createElement(Le, (0, Z.Z)({ onClick: this.handleClick }, a))
            : null;
        }
        constructor(...e) {
          super(...e),
            (this.handleClick = () => {
              (0, Oe.kU)({ location: "facebook" }),
                this.props.isMobile || this.props.sendMessage();
            });
        }
      }
      const ze = (0, a.$j)(
        (e) => {
          return {
            isMobile: (0, te.eD)(e),
            mobileShareUrl:
              ((t = {
                link: (0, Fe.i)(e).facebook,
                appId: (0, u.ol)(e) ?? Be.v.loyaltylionFacebookAppId,
              }),
              `fb-messenger://share?link=${encodeURIComponent(
                t.link
              )}&app_id=${encodeURIComponent(t.appId)}`),
            isFacebookSdkReady: "ready" === (0, Re.T7)(e).sdkState,
          };
          var t;
        },
        (e, t) => ({ sendMessage: () => e((0, Pe.yp)("send", t.referralUrl)) })
      )(Ue);
      class We extends n.PureComponent {
        render() {
          const { isFacebookSdkReady: e } = this.props;
          return e
            ? n.createElement(Le, {
                onClick: this.handleClick,
                type: "facebook",
                buttonTextKey: "sdk.referral_share_buttons.facebook_share",
              })
            : null;
        }
        constructor(...e) {
          super(...e),
            (this.handleClick = () => {
              (0, Oe.kU)({ location: "facebook" }), this.props.facebookShare();
            });
        }
      }
      const Ge = (0, a.$j)(
          (e) => ({ isFacebookSdkReady: "ready" === (0, Re.T7)(e).sdkState }),
          (e, t) => ({
            facebookShare: () => e((0, Pe.yp)("share", t.referralUrl)),
          })
        )(We),
        Ye = () => {
          (0, Oe.kU)({ location: "whatsapp" });
        },
        Ze = (0, a.$j)(
          (e, t) => ({ shareContent: (0, He.ll)(t.referralUrl, (0, E._o)(e)) }),
          {}
        )((e) => {
          let { shareContent: t } = e;
          return n.createElement(Le, {
            href: t,
            target: "_blank",
            type: "whatsapp",
            buttonTextKey: "sdk.referral_share_buttons.whatsapp",
            onClick: Ye,
          });
        });
      var Qe = r(2342);
      class Xe extends n.Component {
        render() {
          const e = "modern" === this.props.themeName;
          return n.createElement(
            "div",
            {
              className: (0, i.ok)(
                "referral-widget",
                `referral-widget--${this.formatModifier}`,
                "referral-widget--authenticated"
              ),
            },
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "referral-widget-panels",
                  this.state.isEmailFormOpen
                    ? "referral-widget-panels--slide"
                    : ""
                ),
              },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "referral-widget-panel",
                    "referral-widget-main"
                  ),
                },
                e &&
                  n.createElement(
                    "div",
                    { className: (0, i.ok)("referral-widget-main__heading") },
                    n.createElement(S.N, {
                      i18nKey: "sdk.referral_prompt_short",
                    })
                  ),
                n.createElement("div", {
                  className: (0, i.ok)("referral-widget-main__icon"),
                }),
                n.createElement(
                  "div",
                  { className: (0, i.ok)("referral-widget-main__intro") },
                  this.introText
                ),
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "referral-widget-main__share-controls"
                    ),
                  },
                  n.createElement(
                    "div",
                    {
                      className: (0, i.ok)(
                        "referral-widget-main__share-buttons"
                      ),
                    },
                    n.createElement(
                      "a",
                      {
                        href: (0, He.L)(
                          this.props.referralUrls.twitter,
                          this.props.siteTweetContent
                        ),
                        onClick: this.trackReferralClick("twitter"),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: (0, i.ok)(
                          "referral-share-button",
                          "referral-share-button--twitter"
                        ),
                      },
                      n.createElement(S.N, {
                        i18nKey: "sdk.referral_share_buttons.twitter",
                      })
                    ),
                    this.renderReferralsAdvancedSharing(),
                    n.createElement(Ge, {
                      referralUrl: this.props.referralUrls.facebook,
                    }),
                    n.createElement(
                      "a",
                      {
                        className: (0, i.ok)(
                          "referral-share-button",
                          "referral-share-button--email"
                        ),
                        onClick: this.showEmailForm,
                      },
                      n.createElement(S.N, {
                        i18nKey: "sdk.referral_share_buttons.email",
                      })
                    )
                  ),
                  n.createElement(
                    "div",
                    {
                      className: (0, i.ok)("referral-widget-main__share-link"),
                    },
                    n.createElement(
                      "div",
                      {
                        className: (0, i.ok)(
                          "referral-widget-main__share-link-text"
                        ),
                      },
                      n.createElement(S.N, {
                        i18nKey: "ui.referral_popup.link_text",
                      })
                    ),
                    n.createElement(
                      "div",
                      {
                        className: (0, i.ok)(
                          "referral-widget-main__share-link-container"
                        ),
                      },
                      n.createElement(
                        "div",
                        {
                          className: (0, i.ok)(
                            "referral-widget-main__share-link-url"
                          ),
                          style: { textTransform: "none" },
                          onClick: this.trackReferralClick("direct"),
                        },
                        this.directUrl
                      ),
                      n.createElement(Qe.m, {
                        onClick: this.trackReferralClick("direct"),
                        clipboardText: this.directUrl,
                      })
                    )
                  )
                )
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "referral-widget-panel",
                    "referral-widget-email-form"
                  ),
                },
                n.createElement(je, { onClose: this.hideEmailForm })
              )
            ),
            e &&
              n.createElement("div", {
                className: (0, i.ok)("referral-widget-picture"),
              })
          );
        }
        get introText() {
          const {
            refereeIncentive: e,
            firstReferralRule: t,
            currency: r,
            localCurrency: a,
          } = this.props;
          if (!t) return "";
          const o = (0, w.t)("ui.general.points_count_raw", {
              smart_count: t.value,
            }),
            l = (0, X.pY)(r, a, t.properties.qualifyingPurchaseAmount);
          if (!e)
            return n.createElement(S.N, {
              i18nKey: "ui.referral_popup.intro_no_offer",
              params: { points: o, amount: l },
            });
          switch (e.kind) {
            case "cart_discount": {
              const t = (0, qe.Q)({
                incentive: e,
                currency: r,
                localCurrency: a,
              });
              return n.createElement(S.N, {
                i18nKey: "ui.referral_popup.intro_with_offer",
                params: { points: o, discount: t, amount: l },
              });
            }
            case "free_shipping":
              return n.createElement(S.N, {
                i18nKey: "ui.referral_popup.intro_free_shipping_offer",
                params: { points: o, amount: l },
              });
          }
        }
        get directUrl() {
          return this.props.referralUrls.direct;
        }
        get formatModifier() {
          return this.props.format && "modal" !== this.props.format
            ? "format-panel"
            : "format-modal";
        }
        bindTwitterHandlers() {
          !this.handlers.twitter &&
            this.twitterSdk &&
            ((this.handlers.twitter = { tweet: this.onTweetStart.bind(this) }),
            this.twitterSdk.events.bind("tweet", this.handlers.twitter.tweet));
        }
        unbindTwitterHandlers() {
          this.handlers.twitter &&
            this.twitterSdk &&
            this.handlers.twitter.tweet &&
            this.twitterSdk.events.unbind("tweet", this.handlers.twitter.tweet);
        }
        componentDidMount() {
          "initial" === this.props.twitterSdkState
            ? this.props.loadTwitterSdk()
            : "ready" === this.props.twitterSdkState &&
              this.bindTwitterHandlers(),
            "initial" === this.props.facebookSdkState &&
              this.props.loadFacebookSdk();
        }
        UNSAFE_componentWillReceiveProps(e) {
          "ready" !== this.props.twitterSdkState &&
            "ready" === e.twitterSdkState &&
            this.bindTwitterHandlers();
        }
        componentWillUnmount() {
          this.unbindTwitterHandlers(),
            this.props.facebookHasMerchantAppId ||
              this.props.resetFacebookSdkState();
        }
        onTweetStart() {
          this.props.trackReferralShare({
            referralId: (0, He.Aq)(this.props.referralUrls.twitter),
          });
        }
        get twitterSdk() {
          return window.twttr;
        }
        renderReferralsAdvancedSharing() {
          return this.props.referralsAdvancedSharingEnabled
            ? n.createElement(
                n.Fragment,
                null,
                n.createElement(Ze, {
                  referralUrl: this.props.referralUrls.whatsapp,
                }),
                n.createElement(ze, {
                  referralUrl: this.props.referralUrls.facebook,
                })
              )
            : null;
        }
        constructor(e) {
          super(e),
            (this.trackReferralClick = (e) => () => {
              (0, Oe.kU)({ location: e });
            }),
            (this.showEmailForm = () => {
              this.setState({ isEmailFormOpen: !0 });
            }),
            (this.hideEmailForm = () => {
              this.setState({ isEmailFormOpen: !1 });
            }),
            (this.state = { isEmailFormOpen: !1 }),
            (this.handlers = {});
        }
      }
      Xe.displayName = "ReferralWidget";
      const Je = (0, a.$j)(
          (e) => ({
            currency: (0, E.j)(e),
            localCurrency: (0, Q.HO)(e),
            currentLocale: (0, L.fN)(e),
            facebookSdkState: (0, Re.T7)(e).sdkState,
            facebookHasMerchantAppId: Boolean((0, u.ol)(e)),
            firstReferralRule: (0, $.Fx)(e),
            refereeIncentive: (0, u.pb)(e),
            referralUrls: (0, Fe.i)(e),
            themeName: (0, U._)(e),
            siteName: (0, E.lH)(e).name,
            siteTweetContent: (0, E._o)(e),
            twitterSdkState: e.integrations.twitterSdk,
            referralsAdvancedSharingEnabled: (0, u.Uw)(e)
              .referralsAdvancedSharing,
          }),
          (e) => ({
            ...(0, Te.bindActionCreators)(
              { loadTwitterSdk: Pe.Wx, trackReferralShare: Oe.PV },
              e
            ),
            loadFacebookSdk: () => e((0, Pe.kD)("share")),
            resetFacebookSdkState: () => e((0, Pe.mC)("initial")),
          })
        )(Xe),
        et = (0, a.$j)((e) => {
          const {
            urls: { login: t, signup: r },
          } = (0, z.r7)(e);
          return { loginURL: t, signupURL: r };
        })((e) => {
          let { format: t = "modal", loginURL: r, signupURL: a } = e;
          return n.createElement(
            "div",
            {
              className: (0, i.ok)(
                "referral-widget",
                `referral-widget--format-${t}`,
                "referral-widget--guest"
              ),
            },
            "modal" === t &&
              n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "referral-widget__header",
                    "modal__header"
                  ),
                },
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "referral-widget__title--guest",
                      "modal__title"
                    ),
                  },
                  n.createElement(S.N, { i18nKey: "ui.referral_popup.header" })
                )
              ),
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-widget-needs-auth") },
              n.createElement(
                "div",
                { className: (0, i.ok)("referral-widget-needs-auth__help") },
                n.createElement(S.N, {
                  i18nKey: "ui.referral_popup.please_log_in_or_signup",
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.ok)("referral-widget-needs-auth__buttons") },
                n.createElement(
                  "a",
                  { href: r, className: (0, i.ok)("action-button") },
                  n.createElement(S.N, { i18nKey: "ui.splash.login" })
                ),
                n.createElement(
                  "span",
                  {
                    className: (0, i.ok)(
                      "referral-widget-needs-auth__button-spacer"
                    ),
                  },
                  "/"
                ),
                n.createElement(
                  "a",
                  { href: a, className: (0, i.ok)("action-button") },
                  n.createElement(S.N, { i18nKey: "ui.splash.signup" })
                )
              )
            )
          );
        }),
        tt = (0, a.$j)((e) => ({ customer: (0, _._V)(e) }))((e) =>
          e.customer
            ? n.createElement(Je, { format: "panel" })
            : n.createElement(et, null)
        );
      class rt extends Error {
        constructor(...e) {
          super(...e), (this.name = "NoClaimedRewardError");
        }
      }
      var nt = r(5571),
        at = r(5273),
        ot = r(5172),
        lt = r(7664);
      const it = (e) => {
          let { handleClick: t, disabled: r, applying: a, applied: o } = e;
          const l = (0, i.VG)();
          return n.createElement(
            re.si,
            {
              onClick: r ? () => null : () => t(),
              testId: `${l}__apply-button`,
              completed: o,
              disabled: o,
              loading: a,
              className: (0, i.c)("apply-reward-button"),
            },
            o
              ? n.createElement(S.N, {
                  i18nKey: "ui.general.rewards.reward_applied",
                })
              : n.createElement(S.N, {
                  i18nKey: "ui.general.rewards.apply_reward",
                })
          );
        },
        st = () =>
          n.createElement(it, {
            handleClick: lt.Z,
            disabled: !0,
            applied: !0,
            applying: !1,
          }),
        ct = (e) => {
          let { kind: t } = e;
          const r = (0, d.T)(),
            a = (0, i.VG)();
          return "modern" !== r
            ? null
            : n.createElement("div", {
                className: (0, i.c)(
                  `${a}__icon`,
                  "icon",
                  "icon__reward",
                  `icon__reward--${(0, W.ST)(t)}`
                ),
              });
        },
        dt = (e) => {
          let { claimedRewardId: t, mode: r } = e;
          const o = (0, d.T)(),
            l = (0, a.v9)(L.fN),
            s = (0, a.v9)((e) => (0, we.w1)(e, t)),
            { canBeApplied: c, applyResult: m } = (0, a.v9)((e) =>
              (0, ot.PF)(e, t)
            ),
            u = (0, a.I0)(),
            p = (0, n.useCallback)(() => {
              u((0, Y.Ys)({ id: t, type: "claimedReward" }));
            }, [t, u]);
          if (!s) throw new rt("ClaimedRewardItem needs a ClaimedReward");
          const _ = (0, at.Vi)(s.reward) ? s.reward.target_site : null,
            h = (0, i.KP)("claimed-reward-item", r),
            { claimed_at: f, reward: g } = s;
          return (0, nt.RP)(s)
            ? null
            : n.createElement(
                i.QB.Provider,
                { value: r },
                n.createElement(
                  i.Qj.Provider,
                  { value: h },
                  n.createElement(
                    "div",
                    (0, Z.Z)(
                      {
                        className: (0, i.c)(
                          h,
                          `${h}--${s.state}`,
                          _ && `${h}--cross-store`,
                          c && `${h}--can-be-applied}`,
                          "success" === m?.status && `${h}--applied`
                        ),
                      },
                      "modern" === o ? { onClick: p } : {}
                    ),
                    n.createElement(
                      "div",
                      { className: (0, i.c)(`${h}__left`) },
                      n.createElement(ct, { kind: s.reward.kind }),
                      n.createElement("div", {
                        className: (0, i.c)(`${h}__title`),
                        dangerouslySetInnerHTML: { __html: g.title },
                      }),
                      n.createElement(
                        "div",
                        { className: (0, i.c)(`${h}__date`) },
                        (0, j.Km)(new Date(f), new Date(), { locale: l })
                      ),
                      _ &&
                        n.createElement(
                          "div",
                          { className: (0, i.c)(`${h}__use-at`) },
                          n.createElement(
                            n.Fragment,
                            null,
                            n.createElement(S.N, {
                              i18nKey: "ui.general.rewards.use_at",
                              params: { store_name: _.name },
                            })
                          )
                        )
                    ),
                    n.createElement(
                      "div",
                      { className: (0, i.c)(`${h}__right`) },
                      n.createElement(mt, {
                        claimedReward: s,
                        mode: r,
                        openInfoModal: p,
                      })
                    )
                  )
                )
              );
        },
        mt = (e) => {
          let { claimedReward: t, mode: r, openInfoModal: o } = e;
          const l = (0, d.T)(),
            s = (0, i.VG)(),
            { applyResult: c } = (0, a.v9)((e) => (0, ot.PF)(e, t.id));
          return "success" === c?.status
            ? n.createElement(st, null)
            : "modern" === l && "integrated" === r
            ? n.createElement("div", { className: (0, i.c)(`${s}__chevron`) })
            : (0, nt.rk)(t)
            ? n.createElement(ut, {
                block: s,
                usedAt: (0, nt.$g)(t),
                openInfoModal: o,
              })
            : n.createElement(pt, { block: s, openInfoModal: o });
        },
        ut = (e) => {
          let { usedAt: t, block: r, openInfoModal: o } = e;
          const l = (0, a.v9)(L.fN);
          return n.createElement(
            "div",
            {
              "data-i18n-key": t
                ? "ui.dashboard.redeem_points.reward_used_ago"
                : "ui.general.used",
              onClick: o,
              className: (0, i.c)(
                `${r}__view-reward-button`,
                "action-button",
                "action-button--neutral",
                "action-button--fixed-width"
              ),
            },
            n.createElement(
              S.N,
              (0, Z.Z)(
                {
                  i18nKey: t
                    ? "ui.dashboard.redeem_points.reward_used_ago"
                    : "ui.general.used",
                },
                t && {
                  params: {
                    time_ago: (0, j.Km)(new Date(t), new Date(), { locale: l }),
                  },
                }
              )
            )
          );
        },
        pt = (e) => {
          let { block: t, openInfoModal: r } = e;
          return n.createElement(
            "div",
            {
              "data-i18n-key": "ui.dashboard.redeem_points.view_reward",
              onClick: r,
              className: (0, i.c)(
                `${t}__view-reward-button`,
                "action-button",
                "action-button--fixed-width"
              ),
            },
            n.createElement(S.N, {
              i18nKey: "ui.dashboard.redeem_points.view_reward",
            })
          );
        },
        _t = (e) => {
          let { mode: t, hideUsed: r = !1, hideVoid: o = !1 } = e;
          const l = (0, a.v9)((e) =>
            (0, we.bE)(e, { hideVoid: o, hideUsed: r })
          );
          if (!Boolean((0, a.v9)(_._V))) return null;
          const s =
              "panel" === t
                ? "loyalty-panel-page-rewards__claimed-rewards-list"
                : "claimed-rewards-list",
            c = 0 === l.length;
          return n.createElement(
            "div",
            {
              "data-i18n-key": c
                ? "ui.dashboard.redeem_points.no_rewards"
                : null,
              className: (0, i.c)(s, c && `${s}--empty ${s}--no-items`),
            },
            c
              ? n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.no_rewards",
                })
              : l.map((e) =>
                  n.createElement(dt, { mode: t, key: e, claimedRewardId: e })
                )
          );
        },
        ht = (e) => {
          let { mode: t } = e;
          const r = (0, a.v9)(_._V),
            o = r ? r.pointsRedeemable : 0,
            l = r ? r.pointsPending : 0,
            s = (0, a.I0)(),
            c = (0, n.useCallback)(() => s((0, Y.Jx)()), [s]);
          if (!r) return null;
          if (l <= 0) return null;
          const d = (0, i.KP)("rewards", t);
          return n.createElement(
            "div",
            { className: (0, i.ok)(`${d}__points-explain-box`) },
            n.createElement(
              "div",
              {
                "data-i18n-key": "ui.dashboard.redeem_points.redeemable_points",
                className: (0, i.ok)(`${d}__points-explain-box-redeemable`),
              },
              n.createElement(S.N, {
                i18nKey: "ui.dashboard.redeem_points.redeemable_points",
                params: {
                  points: (0, w.t)("ui.general.points_count", {
                    smart_count: o,
                  }),
                },
              })
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)(`${d}__points-explain-box-pending`) },
              n.createElement(
                "a",
                {
                  "data-i18n-key": "ui.dashboard.redeem_points.why_not_all",
                  className: (0, i.ok)(`${d}__points-explain-box-pending-link`),
                  onClick: c,
                },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.why_not_all",
                })
              )
            )
          );
        };
      var ft = r(8788),
        gt = r(2818),
        yt = r(70),
        bt = r(876);
      const vt = (e) => {
          let { reward: t } = e;
          const r = (0, i.VG)(),
            o = (0, a.I0)(),
            l = (0, at.Vi)(t) ? t.target_site : null,
            s = () => o((0, yt.YD)(t.id)),
            c = () => o((0, yt.YD)(t.id)),
            d = () =>
              t.description
                ? n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        `${r}__more-info-url`,
                        `${r}__terms-url`
                      ),
                    },
                    n.createElement(S.o.a, {
                      onClick: s,
                      i18nKey:
                        "ui.dashboard.redeem_points.terms_and_conditions_title",
                    })
                  )
                : null,
            m = (() => {
              switch (t.kind) {
                case "cart_discount_voucher": {
                  const e = l
                    ? n.createElement(
                        Et,
                        { externalLink: !0 },
                        n.createElement(S.o.a, {
                          href: l.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          i18nKey: "ui.general.rewards.use_at",
                          params: { store_name: l.name },
                        })
                      )
                    : null;
                  return n.createElement(n.Fragment, null, e);
                }
                case "collection_discount_voucher": {
                  const e = () => {
                    const e = (0, at.qX)(t);
                    return e
                      ? n.createElement(
                          Et,
                          { externalLink: !0 },
                          l
                            ? n.createElement(S.o.a, {
                                href: `${l.url}${e}`,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                i18nKey:
                                  "ui.general.rewards.view_collection_at_alien_store",
                                params: { store_name: l.name },
                              })
                            : n.createElement(S.o.a, {
                                i18nKey:
                                  "ui.dashboard.redeem_points.view_collection",
                                href: e,
                              })
                        )
                      : null;
                  };
                  return n.createElement(
                    n.Fragment,
                    null,
                    n.createElement(e, null),
                    n.createElement(d, null)
                  );
                }
                case "product_discount_voucher":
                case "product_cart":
                case "subscription_buy_with_points": {
                  const e = (0, at.Dw)(t);
                  return n.createElement(
                    n.Fragment,
                    null,
                    e &&
                      "" !== e &&
                      n.createElement(
                        Et,
                        { externalLink: !0 },
                        n.createElement(S.o.a, {
                          i18nKey: "ui.dashboard.redeem_points.view_product",
                          href: e,
                        })
                      ),
                    n.createElement(d, null)
                  );
                }
                case "custom":
                  return n.createElement(
                    Et,
                    null,
                    n.createElement(S.o.a, {
                      onClick: c,
                      i18nKey: "ui.dashboard.redeem_points.more_information",
                    })
                  );
                default:
                  return null;
              }
            })();
          return m
            ? n.createElement("div", { className: (0, i.c)(`${r}__links`) }, m)
            : null;
        },
        Et = (e) => {
          let { externalLink: t, children: r } = e;
          const a = (0, i.VG)();
          return n.createElement(
            "div",
            {
              className: (0, i.c)(
                `${a}__more-info-url`,
                t && `${a}__more-info-url--external-link`
              ),
            },
            r
          );
        },
        wt = (e) => {
          let { rewardId: t, mode: r } = e;
          const o = (0, a.I0)(),
            l = (0, a.v9)(_._V),
            s = (0, a.v9)((e) => (0, ft.kL)(e, t)),
            c = (0, a.v9)((e) => !(!s || !l) && (0, gt.I)(e, s, l));
          if (!s) return null;
          const d = (0, at.Vi)(s) ? s.target_site : null,
            m = (0, i.KP)("reward-item", r);
          return n.createElement(
            i.QB.Provider,
            { value: r },
            n.createElement(
              i.Qj.Provider,
              { value: m },
              n.createElement(
                "div",
                {
                  className: (0, i.c)(
                    `${m}`,
                    `${m}--${(0, W.ST)(s.kind)}`,
                    `${m}--${l ? "customer" : "guest"}`,
                    d && `${m}--cross-store`
                  ),
                  "data-reward-id": s.id,
                },
                n.createElement(
                  "div",
                  { className: (0, i.c)(`${m}__content`) },
                  n.createElement(ct, { kind: s.kind }),
                  n.createElement(kt, { reward: s }),
                  n.createElement(Nt, { reward: s }),
                  n.createElement(Ct, { reward: s }),
                  n.createElement(vt, { reward: s }),
                  l &&
                    n.createElement(bt.X, {
                      reward: s,
                      customer: l,
                      disabled: c,
                      onClick: () => {
                        o((0, yt.d3)(s.id));
                      },
                    })
                )
              )
            )
          );
        },
        kt = (e) => {
          let { reward: t } = e;
          const r = (0, i.VG)(),
            a = (0, i.c)(`${r}__title`);
          return "checkout_redemption" === t.kind
            ? n.createElement(
                "div",
                { className: a },
                n.createElement(S.o.text, {
                  i18nKey:
                    "ui.dashboard.redeem_points.checkout_redemption_short_message",
                })
              )
            : n.createElement("div", {
                className: a,
                dangerouslySetInnerHTML: { __html: t.title },
              });
        },
        Nt = (e) => {
          let { reward: t } = e;
          const r = (0, i.VG)(),
            o = (0, d.T)(),
            l = (0, a.v9)(E.j),
            s = (0, a.v9)(Q.HO),
            c = "legacy" === o,
            m = () =>
              n.createElement(
                "span",
                { className: (0, i.c)(`${r}__cost`) },
                n.createElement(S.o.span, {
                  i18nKey: "ui.general.points_count",
                  params: { smart_count: t.point_cost },
                })
              ),
            u = (() => {
              switch (t.kind) {
                case "cart_discount_voucher": {
                  const e = t.minimum_spend ?? 0;
                  return n.createElement(
                    n.Fragment,
                    null,
                    n.createElement(m, null),
                    e > 0 &&
                      c &&
                      n.createElement(S.o.span, {
                        className: (0, i.c)(`${r}__min-spend`),
                        i18nKey:
                          "ui.dashboard.redeem_points.voucher_meta_min_spend",
                        params: { amount: (0, X.pY)(l, s, e) },
                      })
                  );
                }
                case "checkout_redemption":
                  return n.createElement(S.o.text, {
                    i18nKey:
                      "ui.dashboard.redeem_points.checkout_redemption_points",
                    params: { points: t.point_cost, unit: (0, X.pY)(l, s, 1) },
                  });
                case "collection_discount_voucher":
                  return n.createElement(
                    n.Fragment,
                    null,
                    "percentage" === t.discount_type &&
                      n.createElement(S.o.span, {
                        className: (0, i.c)(`${r}__percent-off`),
                        i18nKey:
                          "ui.dashboard.redeem_points.collection_percent_off",
                        params: { discount: `${t.discount_amount}%` },
                      }),
                    n.createElement(m, null)
                  );
                case "product_discount_voucher":
                  return n.createElement(
                    n.Fragment,
                    null,
                    n.createElement(S.o.span, {
                      className: (0, i.c)(`${r}__percent-off`),
                      i18nKey: "ui.dashboard.redeem_points.free_product",
                    }),
                    n.createElement(m, null)
                  );
                case "product_cart":
                case "subscription_buy_with_points":
                  return n.createElement(
                    n.Fragment,
                    null,
                    n.createElement(S.o.span, {
                      className: (0, i.c)(`${r}__percent-off`),
                      i18nKey: "ui.dashboard.redeem_points.product_percent_off",
                      params: { discount: `${t.discount_amount}%` },
                    }),
                    n.createElement(m, null)
                  );
                default:
                  return n.createElement(m, null);
              }
            })();
          return n.createElement(
            "div",
            { className: (0, i.c)(`${r}__meta`) },
            u
          );
        },
        Ct = (e) => {
          let { reward: t } = e;
          const r = (0, i.VG)(),
            a = t.target_products.length > 0 ? t.target_products[0] : null;
          return a?.image_url
            ? n.createElement(
                "div",
                { className: (0, i.c)(`${r}__product-image`) },
                n.createElement("img", {
                  src: a.image_url,
                  alt: `Photo of ${t.title}`,
                })
              )
            : null;
        },
        xt = (e) => {
          let { mode: t } = e;
          const r = (0, a.v9)((e) => (0, ft.c_)(e, t)),
            o =
              "panel" === t
                ? "loyalty-panel-page-rewards__rewards-list"
                : "rewards-list";
          return n.createElement(
            "div",
            { className: (0, i.c)(o) },
            r.map((e) => n.createElement(wt, { key: e, mode: t, rewardId: e }))
          );
        },
        St = () => {
          const e = (0, a.v9)(ft.u),
            t = (0, a.v9)(E.j),
            r = (0, a.v9)(Q.HO);
          return e
            ? n.createElement(
                "div",
                { className: (0, i.ok)("checkout-redemption-banner") },
                n.createElement("div", {
                  "data-i18n-key":
                    "ui.dashboard.redeem_points.checkout_redemption_message",
                  className: (0, i.ok)(
                    "checkout-redemption-banner__icon icon__rule--product-purchase"
                  ),
                }),
                n.createElement(S.N, {
                  i18nKey:
                    "ui.dashboard.redeem_points.checkout_redemption_message",
                  params: { points: e.point_cost, unit: (0, X.pY)(t, r, 1) },
                })
              )
            : null;
        },
        It = () => {
          const e = (0, a.v9)(u.D6);
          if (!e) throw new Error("Could not find primary site");
          const t = (0, i.KP)("rewards", "panel");
          return n.createElement(
            "div",
            { className: (0, i.ok)(`${t}__go_to_primary_site`) },
            n.createElement(
              "div",
              {
                "data-i18n-key":
                  "ui.dashboard.redeem_points.rewards_available_on_primary_site",
                className: (0, i.ok)(`${t}__go_to_primary_site__text`),
              },
              n.createElement(S.N, {
                i18nKey:
                  "ui.dashboard.redeem_points.rewards_available_on_primary_site",
                params: { store_name: e.name },
              })
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)(`${t}__go_to_primary_site__cta_outer`) },
              n.createElement(
                "a",
                {
                  "data-i18n-key":
                    "ui.dashboard.redeem_points.go_to_other_site",
                  className: (0, i.ok)(
                    "action-button",
                    `${t}__go_to_primary_site__cta`
                  ),
                  href: e.url,
                },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.go_to_other_site",
                  params: { store_name: e.name },
                })
              )
            )
          );
        },
        $t = () =>
          n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-page-ichive-rewards") },
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "loyalty-panel-page-ichive-rewards__section"
                ),
              },
              n.createElement(
                "p",
                null,
                "Your earned points are valuable! Why? Because you can cash them in for free shit on The Chivery!"
              )
            ),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "loyalty-panel-page-ichive-rewards__section"
                ),
              },
              n.createElement(
                "p",
                null,
                "Don't worry, redeeming your points will not reduce your total that we display (and judge you by) on iCHIVE, so go get some cool stuff and upload some pictures of you rocking it!"
              )
            ),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "loyalty-panel-page-ichive-rewards__section"
                ),
              },
              n.createElement(
                "p",
                null,
                "Head on over to",
                " ",
                n.createElement(
                  "a",
                  { href: "https://www.thechivery.com/account" },
                  "The Chivery"
                ),
                " to see how many points you have to redeem and how much awesome stuff you can order!"
              )
            ),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "loyalty-panel-page-ichive-rewards__logo-section"
                ),
              },
              n.createElement(
                "a",
                {
                  href: "https://www.thechivery.com/account",
                  className: (0, i.ok)(
                    "loyalty-panel-page-ichive-rewards__logo-link"
                  ),
                },
                n.createElement("img", {
                  src: "//my.thechivery.com/img/thechivery/logo.png",
                  alt: "The Chivery",
                })
              )
            )
          ),
        Kt = () => {
          const e = (0, a.v9)(E.lH);
          return 2141 === e.id
            ? n.createElement($t, null)
            : "ecommerce" !== e.role
            ? n.createElement(Tt, null, n.createElement(It, null))
            : n.createElement(
                Tt,
                null,
                n.createElement(ht, { mode: "panel" }),
                n.createElement(St, null),
                n.createElement(xt, { mode: "panel" }),
                n.createElement(
                  Pt,
                  null,
                  n.createElement(_t, { mode: "panel" })
                )
              );
        },
        Tt = (e) => {
          let { children: t } = e;
          const r = (0, i.KP)("rewards", "panel");
          return n.createElement("div", { className: (0, i.ok)(r) }, t);
        },
        Pt = (e) => {
          let { children: t } = e;
          return n.createElement(
            "div",
            {
              className: (0, i.ok)(
                "loyalty-panel-page-rewards__claimed-rewards"
              ),
            },
            n.createElement(
              "div",
              {
                "data-i18n-key": "ui.dashboard.redeem_points.your_rewards",
                className: (0, i.ok)(
                  "loyalty-panel-page-rewards__claimed-rewards-header"
                ),
              },
              n.createElement(S.N, {
                i18nKey: "ui.dashboard.redeem_points.your_rewards",
              })
            ),
            t
          );
        };
      var Ot = r(8318),
        Rt = r(9172),
        Ft = r(4895);
      const qt = (e) => {
          let { fill: t } = e;
          return (
            t < 0 && (t = 0),
            t > 1 && (t = 1),
            n.createElement(
              "div",
              { className: (0, i.ok)("progress-bar__container") },
              n.createElement("div", {
                className: (0, i.ok)("progress-bar__fill"),
                style: { width: `${Math.round(100 * t)}%` },
              })
            )
          );
        },
        Ht = (e) => {
          let { expiresAt: t } = e;
          return t
            ? n.createElement(
                "div",
                { className: (0, i.ok)("tier-box__expiry") },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.tiers.user_tier_info_expiry",
                  params: { expires_at: t },
                })
              )
            : null;
        },
        At = (e) => {
          let { currency: t, nextTier: r, tier: a, tiersMode: o } = e;
          switch (o) {
            case "points":
              return a.pointsToNextTier
                ? n.createElement(
                    "div",
                    { className: (0, i.ok)("tier-box__value-to-next") },
                    n.createElement(S.N, {
                      i18nKey: "ui.dashboard.tiers.earn_amount_for_next_tier",
                      params: {
                        needed_points: a.pointsToNextTier,
                        tier_name: r.name,
                      },
                    })
                  )
                : null;
            case "spend":
              return a.spendToNextTier
                ? n.createElement(
                    "div",
                    { className: (0, i.ok)("tier-box__value-to-next") },
                    n.createElement(S.N, {
                      i18nKey: "ui.dashboard.tiers.spend_amount_for_next_tier",
                      params: {
                        needed_spend: (0, X.pY)(t, null, a.spendToNextTier),
                        tier_name: r.name,
                      },
                    })
                  )
                : null;
          }
        },
        Mt = (e) => {
          let { conditions: t } = e;
          const r = (0, a.v9)(L.fN);
          return t.condition_text?.[r]
            ? n.createElement(
                "div",
                { className: (0, i.ok)("tier-box__condition-text") },
                t.condition_text[r]
              )
            : n.createElement(
                "div",
                { className: (0, i.ok)("tier-box__condition-text") },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.tiers.conditions_for_tier",
                })
              );
        },
        Dt = (0, a.$j)((e) => ({ currency: (0, E.j)(e) }))((e) => {
          let { currency: t, nextTier: r, tier: a, tiersMode: o } = e;
          return a.isCurrent
            ? n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "tier-box__footer tier-box__footer--current"
                  ),
                },
                n.createElement(
                  "div",
                  { className: (0, i.ok)("tier-box__you-are-here") },
                  n.createElement(S.N, {
                    i18nKey: "ui.dashboard.tiers.you_are_here",
                  })
                ),
                a.expiresAt && n.createElement(Ht, { expiresAt: a.expiresAt }),
                r &&
                  null !== a.progressToNextTier &&
                  null === a.conditions &&
                  n.createElement(
                    n.Fragment,
                    null,
                    n.createElement(At, {
                      currency: t,
                      tier: a,
                      nextTier: r,
                      tiersMode: o,
                    }),
                    n.createElement(qt, { fill: a.progressToNextTier })
                  )
              )
            : n.createElement(
                "div",
                { className: (0, i.ok)("tier-box__footer") },
                a.conditions &&
                  n.createElement(Mt, { conditions: a.conditions })
              );
        }),
        Vt = (e) => {
          let { id: t } = e;
          const r = (0, a.v9)((e) => (0, Ot.By)(e, t));
          return !r || (!r.isCurrent && r.hidden)
            ? null
            : n.createElement(
                "div",
                {
                  className: (0, i.ok)("loyalty-panel-tier-item", {
                    "loyalty-panel-tier-item--current": r.isCurrent,
                    "loyalty-panel-tier-item--previous": r.isPrevious,
                    "loyalty-panel-tier-item--next": r.isNext,
                  }),
                },
                n.createElement(jt, { tier: r }),
                n.createElement("div", {
                  className: (0, i.ok)("loyalty-panel-tier-item__accent"),
                  style: r.colour ? { backgroundColor: r.colour } : {},
                }),
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "loyalty-panel-tier-item__inner",
                      r.isPrevious && "loyalty-panel-tier-item__inner--hide"
                    ),
                  },
                  n.createElement(Bt, { tier: r }),
                  n.createElement(Lt, { tier: r })
                )
              );
        },
        jt = (e) => {
          let { tier: t } = e;
          const r = (0, a.v9)(E.j),
            o = (0, a.v9)(Q.HO),
            l = (0, a.v9)(u.SN).loyaltyTiersMode;
          return n.createElement(
            "header",
            { className: (0, i.ok)("loyalty-panel-tier-item__header") },
            n.createElement(
              "div",
              { className: (0, i.ok)("loyalty-panel-tier-item__name") },
              t.name
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("loyalty-panel-tier-item__context") },
              t.isCurrent &&
                (t.expiresAt
                  ? n.createElement(S.N, {
                      i18nKey: "ui.dashboard.tiers.user_tier_info_expiry",
                      params: { expires_at: t.expiresAt },
                    })
                  : n.createElement(S.N, {
                      i18nKey: "ui.dashboard.tiers.user_tier_info",
                    })),
              t.isNext &&
                (t.conditions
                  ? n.createElement(Mt, { conditions: t.conditions })
                  : "spend" === l
                  ? n.createElement(S.N, {
                      i18nKey: "ui.dashboard.tiers.spend_until_next_tier",
                      params: { needed_spend: (0, X.pY)(r, o, t.neededSpend) },
                    })
                  : n.createElement(S.N, {
                      i18nKey: "ui.dashboard.tiers.points_until_next_tier",
                      params: { needed_points: t.neededPoints },
                    }))
            )
          );
        },
        Bt = (e) => {
          let { tier: t } = e;
          const [r, o] = (0, n.useState)(!1),
            l = (0, a.v9)($.qw),
            s = (0, Rt.VS)(l, (e) => e.configurations).filter(
              (e) => e.tierId === t.id
            ),
            c = 4 === s.length ? 4 : 3,
            d = (function (e) {
              let {
                allRules: t,
                numberOfRulesToDisplay: r,
                rulesPanelOpen: n,
                tierId: a,
              } = e;
              const o = t
                .filter(
                  (e) =>
                    Ft.T.must(e.configurations.find((e) => e.tierId === a))
                      .enabled
                )
                .filter((e) => "signup" !== e.kind);
              return n ? o : o.slice(0, r);
            })({
              allRules: l,
              rulesPanelOpen: r,
              numberOfRulesToDisplay: c,
              tierId: t.id,
            });
          return 0 === s.length
            ? null
            : n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "loyalty-panel-tier-item__list-container"
                  ),
                },
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "loyalty-panel-tier-item__list-heading"
                    ),
                  },
                  n.createElement(S.N, {
                    i18nKey: "ui.dashboard.tiers.earn_activities",
                  })
                ),
                n.createElement(
                  "ul",
                  { className: (0, i.ok)("loyalty-panel-tier-item__list") },
                  d.map((e) => {
                    const r = Ft.T.must(
                      e.configurations.find((e) => e.tierId === t.id)
                    );
                    return n.createElement(
                      "li",
                      {
                        key: e.id,
                        className: (0, i.ok)(
                          "loyalty-panel-tier-item__list-item",
                          "loyalty-panel-tier-item__list-item--rule"
                        ),
                      },
                      `${e.displayTitle} - `,
                      e.isValuePerUnit
                        ? n.createElement(J, {
                            className: (0, i.ok)(
                              "loyalty-panel-tier-item__list-item-value"
                            ),
                            isPerUnit: !0,
                            points: r.value,
                          })
                        : n.createElement(
                            "span",
                            {
                              className: (0, i.ok)(
                                "loyalty-panel-tier-item__list-item-value"
                              ),
                            },
                            (0, w.uf)(r.value)
                          )
                    );
                  }),
                  !r &&
                    l.length > c &&
                    n.createElement(
                      "li",
                      {
                        className: (0, i.ok)(
                          "loyalty-panel-tier-item__list-item"
                        ),
                        onClick: () => o(!0),
                      },
                      n.createElement(
                        "a",
                        {
                          href: "#",
                          className: (0, i.ok)(
                            "loyalty-panel-tier-item__view-more-link"
                          ),
                        },
                        n.createElement(S.N, {
                          i18nKey: "ui.dashboard.tiers.view_more",
                        })
                      )
                    )
                )
              );
        };
      const Lt = (e) => {
        let { tier: t } = e;
        const [r, a] = (0, n.useState)(!1),
          o = 4 === t.rewardOverrides.length ? 4 : 3;
        return n.createElement(
          "div",
          { className: (0, i.ok)("loyalty-panel-tier-item__list-container") },
          t.rewardOverrides.length > 0 &&
            n.createElement(
              n.Fragment,
              null,
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("loyalty-panel-tier-item__list-heading"),
                },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.tiers.redeem_points",
                })
              ),
              n.createElement(
                "ul",
                { className: (0, i.ok)("loyalty-panel-tier-item__list") },
                t.rewardOverrides
                  .filter((e) => e.enabled)
                  .filter((e, t) => r || t < o)
                  .map((e) =>
                    n.createElement("li", {
                      key: e.rewardId,
                      className: (0, i.ok)(
                        "loyalty-panel-tier-item__list-item",
                        "loyalty-panel-tier-item__list-item--reward"
                      ),
                      dangerouslySetInnerHTML: { __html: e.reward.title },
                    })
                  ),
                !r &&
                  t.rewardOverrides.length > o &&
                  n.createElement(
                    "li",
                    {
                      onClick: () => a(!0),
                      className: (0, i.ok)(
                        "loyalty-panel-tier-item__list-item"
                      ),
                    },
                    n.createElement(
                      "a",
                      {
                        href: "#",
                        className: (0, i.ok)(
                          "loyalty-panel-tier-item__view-more-link"
                        ),
                      },
                      n.createElement(S.N, {
                        i18nKey: "ui.dashboard.tiers.view_more",
                      })
                    )
                  )
              )
            )
        );
      };
      class Ut extends n.PureComponent {
        render() {
          const { loyaltyTierIds: e } = this.props;
          return n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-page-tiers") },
            n.createElement(
              "div",
              { id: (0, i.ok)("loyalty-panel-content__overflow-container") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("loyalty-panel-page-tiers__tiers-list"),
                },
                e.map((e) => n.createElement(Vt, { key: e, id: e }))
              )
            )
          );
        }
      }
      const zt = (0, a.$j)((e) => ({ loyaltyTierIds: (0, Ot.dY)(e) }))(Ut),
        Wt = () => {
          const e = (0, a.v9)(x),
            t = (0, a.v9)(E.oC);
          if ((0, a.v9)(_.H5).blocked) return n.createElement(I, null);
          const r = () => {
            switch (e.id) {
              case "earn":
                return n.createElement(ye, null);
              case "rewards":
                return n.createElement(Kt, null);
              case "refer":
                return n.createElement(tt, null);
              case "tiers":
                return n.createElement(zt, null);
              case "history":
                return n.createElement(Ke, null);
              case "help":
                return n.createElement(ve, null);
            }
          };
          return n.createElement(
            "div",
            {
              className: (0, i.ok)(
                "loyalty-panel-content",
                `loyalty-panel-content--${e.id}`
              ),
            },
            n.createElement(
              "header",
              { className: (0, i.ok)("loyalty-panel-content__header") },
              (0, w.t)(e.i18nKeyTitle)
            ),
            e.i18nKeyDescription &&
              n.createElement("div", {
                className: (0, i.ok)("loyalty-panel-content__page-description"),
                dangerouslySetInnerHTML: {
                  __html: (0, w.t)(e.i18nKeyDescription, { store_name: t }),
                },
              }),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "loyalty-panel-content__overflow-container"
                ),
              },
              n.createElement(r, null)
            )
          );
        },
        Gt = (0, a.$j)((e) => {
          const t = (0, _._V)(e);
          return {
            isWhiteLabel: (0, u.SN)(e).authorizedFeatures.whiteLabel,
            isLoggedIn: Boolean(t),
            isCustomerBlocked: !!t && t.blocked,
          };
        })((e) => {
          let { isWhiteLabel: t, isLoggedIn: r, isCustomerBlocked: a } = e;
          if (t || a) return null;
          const o = r ? "loggedin" : "loggedout",
            l = (0, i.ok)({
              "loyalty-panel-sidebar__powered-by": r,
              "loyalty-splash__powered-by": !r,
            });
          return n.createElement(
            "div",
            { className: l },
            n.createElement(
              "a",
              {
                className: `${l}-link`,
                href: `https://loyaltylion.com/powered-by-loyaltylion?utm_campaign=poweredby&utm_source=ll&utm_medium=referral&utm_content=${o}`,
                target: "_blank",
                rel: "noopener",
              },
              n.createElement(S.N, { i18nKey: "ui.general.powered_by" }),
              " LoyaltyLion"
            )
          );
        });
      var Yt = r(1770),
        Zt = r.n(Yt);
      class Qt extends n.Component {
        componentDidUpdate(e) {
          const t = e.points,
            r = this.props.points;
          if (t === r || !this.element) return;
          new (Zt())(this.element, t, r, 0, this.duration, {
            formattingFn: w.uf,
          }).start();
        }
        render() {
          return n.createElement(
            "lionpoints",
            { is: "lionpoints", ref: (e) => (this.element = e) },
            (0, w.uf)(this.props.points)
          );
        }
        get duration() {
          return 1;
        }
      }
      const Xt = (e) => {
        let { mode: t } = e;
        const r = (0, a.I0)(),
          o = (0, a.v9)(_.H5),
          l = o.blocked,
          s = o.pointsTotal,
          c = (0, a.v9)(Ot.Au),
          d = (0, a.v9)(_.cQ),
          m = (0, a.v9)(C.Yh).isMobileMenuOpen,
          p = (0, a.v9)(u.LI).name;
        return n.createElement(
          "header",
          { className: (0, i.ok)("loyalty-panel-sidebar__header") },
          "modal" === t &&
            n.createElement(
              "a",
              {
                onClick: () => r((0, v.j)()),
                className: (0, i.ok)(
                  "loyalty-panel-sidebar__mobile-close-button"
                ),
              },
              n.createElement(S.N, {
                i18nKey: "ui.dashboard.menu.return_to_store",
              })
            ),
          n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-sidebar__title") },
            p
          ),
          n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-sidebar__points") },
            n.createElement(
              "span",
              { className: (0, i.ok)("loyalty-panel-sidebar__points-value") },
              n.createElement(Qt, { points: s })
            ),
            n.createElement(
              "span",
              { className: (0, i.ok)("loyalty-panel-sidebar__points-text") },
              n.createElement(S.N, { i18nKey: "sdk.points" })
            )
          ),
          c &&
            !l &&
            d &&
            n.createElement(
              "div",
              { className: (0, i.ok)("loyalty-panel-sidebar__tier-info") },
              n.createElement(
                "a",
                {
                  className: (0, i.ok)("loyalty-panel-sidebar__tier-info-link"),
                  onClick: () => r((0, Y.oO)("tiers")),
                },
                n.createElement("span", {
                  className: (0, i.ok)("loyalty-panel-sidebar__tier-info-icon"),
                }),
                n.createElement(
                  "span",
                  {
                    className: (0, i.ok)(
                      "loyalty-panel-sidebar__tier-info-name"
                    ),
                  },
                  d.name
                )
              )
            ),
          n.createElement("a", {
            onClick: () => r((0, Y.mT)(!m)),
            className: (0, i.ok)(
              "loyalty-panel-sidebar__mobile-menu-toggle-button",
              m && "loyalty-panel-sidebar__mobile-menu-toggle-button--active"
            ),
          })
        );
      };
      class Jt extends n.PureComponent {
        render() {
          const { isActive: e, page: t } = this.props,
            r = (0, i.ok)(
              "loyalty-panel-sidebar__menu-item",
              "loyalty-panel-sidebar__menu-item--icon",
              `loyalty-panel-sidebar__menu-item--${t.id}`,
              { active: e }
            );
          return n.createElement(
            "a",
            { className: r, onClick: this.onClickHandler },
            n.createElement(S.N, { i18nKey: t.i18nKeyMenu })
          );
        }
        onClickHandler() {
          const { page: e, onChangePage: t } = this.props;
          t(e.id);
        }
        constructor(e) {
          super(e), (this.onClickHandler = this.onClickHandler.bind(this));
        }
      }
      const er = () => {
          const e = (0, a.I0)(),
            t = (0, a.v9)(Ot.Au),
            r = (0, a.v9)(C.Yh).isMobileMenuOpen,
            o = null !== (0, a.v9)($.El),
            l = (0, a.v9)(x),
            s = (0, a.v9)(_.H5).blocked,
            c = (0, n.useCallback)((t) => e((0, Y.oO)(t)), [e]);
          return s
            ? null
            : n.createElement(
                "nav",
                {
                  className: (0, i.ok)(
                    "loyalty-panel-sidebar__menu",
                    r && "loyalty-panel-sidebar__menu--open"
                  ),
                },
                N.filter((e) => t || "tiers" !== e.id)
                  .filter((e) => o || "refer" !== e.id)
                  .map((e, t) =>
                    n.createElement(Jt, {
                      key: t,
                      page: e,
                      isActive: e.id === l.id,
                      onChangePage: (e) => c(e),
                    })
                  )
              );
        },
        tr = (e) => {
          let { mode: t = "modal" } = e;
          return n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-panel-sidebar") },
            n.createElement(Xt, { mode: t }),
            n.createElement(er, null),
            n.createElement(Gt, null)
          );
        },
        rr = (e) => {
          let { mode: t } = e;
          const r = (0, a.I0)(),
            o = (0, i.ok)({
              "loyalty-panel": !0,
              "component--reset": !0,
              "loyalty-panel--format-modal": "modal" === t,
              "loyalty-panel--format-embed": "embed" === t,
            }),
            l =
              "modal" === t
                ? n.createElement(
                    "a",
                    {
                      onClick: () => r((0, v.j)()),
                      className: (0, i.ok)("loyalty-panel__close-button"),
                    },
                    "×"
                  )
                : null;
          return n.createElement(
            "div",
            { className: o },
            l,
            n.createElement(tr, { mode: t }),
            n.createElement(Wt, null)
          );
        };
      var nr = r(9803),
        ar = r.n(nr),
        or = r(7487);
      const lr = (e) => {
        let { introText: t, children: r, type: a } = e;
        return n.createElement(
          "div",
          {
            className: (0, i.ok)(
              "loyalty-splash-column",
              `loyalty-splash-column--${a}`
            ),
          },
          n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-splash-column__intro") },
            n.createElement(
              "p",
              { className: (0, i.ok)("loyalty-splash-column__intro-text") },
              t,
              " "
            )
          ),
          n.createElement(
            "div",
            { className: (0, i.ok)("loyalty-splash-column__items") },
            r
          )
        );
      };
      function ir(e) {
        const t = "icon__" + ("reward--" + (0, W.ST)(e.kind));
        return (0, i.ok)("loyalty-splash-item__icon", "icon", t, {
          [`${t}--subscription`]: (0, or.Aq)(e),
        });
      }
      const sr = (0, a.$j)((e) => ({
        rewards: (0, ft.qH)(e),
        siteName: (0, E.lH)(e).name,
      }))((e) => {
        let { siteName: t, rewards: r } = e;
        const o = (0, a.v9)(E.j),
          l = (0, a.v9)(Q.HO),
          s = n.createElement(S.N, {
            i18nKey: "ui.splash.rewards_heading_generalised",
            params: { store_name: t },
          });
        return n.createElement(
          lr,
          { introText: s, type: "rewards" },
          r.map((e, t) =>
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "loyalty-splash-item",
                  "loyalty-splash-item--reward"
                ),
                key: t,
                "data-reward-id": `${e.id}`,
              },
              n.createElement("div", { className: ir(e) }),
              n.createElement(
                "div",
                { className: (0, i.ok)("loyalty-splash-item__info") },
                n.createElement("div", {
                  className: (0, i.ok)("loyalty-splash-item__title"),
                  dangerouslySetInnerHTML: { __html: e.title },
                }),
                n.createElement("div", {
                  className: (0, i.ok)("loyalty-splash-item__value"),
                  dangerouslySetInnerHTML: { __html: (0, ft.nI)(e, o, l) },
                })
              )
            )
          )
        );
      });
      function cr() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return t
          .map((e) => e.trim())
          .filter((e) => !!e)
          .map((e) => (/[.,?!;:]$/.test(e) ? e : `${e}.`))
          .join(" ");
      }
      const dr = (0, a.$j)((e) => ({ rules: (0, $.rm)(e) }))((e) => {
        let { rules: t } = e;
        const r = n.createElement(S.N, { i18nKey: "ui.splash.earn_heading" });
        return n.createElement(
          lr,
          { introText: r, type: "rules" },
          t.map((e, t) => {
            return n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "loyalty-splash-item",
                  "loyalty-splash-item--rule"
                ),
                "data-rule-id": `${e.id}`,
                key: t,
              },
              n.createElement("div", {
                className: (0, i.ok)(
                  "loyalty-splash-item__icon",
                  "icon",
                  "icon__" + ("rule--" + (0, W.Kh)(e.kind))
                ),
              }),
              n.createElement(
                "div",
                { className: (0, i.ok)("loyalty-splash-item__info") },
                n.createElement(
                  "div",
                  { className: (0, i.ok)("loyalty-splash-item__title") },
                  e.displayTitle
                ),
                n.createElement(
                  "div",
                  { className: (0, i.ok)("loyalty-splash-item__value") },
                  ((r = e.valueText),
                  /<[a-z]/i.test(r)
                    ? n.createElement("span", {
                        dangerouslySetInnerHTML: { __html: e.valueText },
                      })
                    : e.valueText)
                )
              )
            );
            var r;
          })
        );
      });
      class mr extends n.Component {
        render() {
          const {
              programName: e,
              siteName: t,
              mode: r,
              loginURL: a,
              signupURL: o,
            } = this.props,
            l = ar()(
              (0, i.ok)("loyalty-splash"),
              (0, i.ok)("component--reset"),
              (0, i.ok)(`loyalty-splash--format-${r}`)
            );
          return n.createElement(
            "div",
            { className: l },
            n.createElement(
              "a",
              {
                onClick: this.props.onCloseClick,
                className: (0, i.ok)("loyalty-splash__close-button"),
              },
              "×"
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("loyalty-splash__mobile-bar") },
              n.createElement(
                "a",
                {
                  onClick: this.props.onCloseClick,
                  className: (0, i.ok)("loyalty-splash__mobile-close-button"),
                },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.menu.return_to_store",
                })
              )
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("loyalty-splash__heading") },
              n.createElement(
                "div",
                { className: (0, i.ok)("loyalty-splash__title") },
                n.createElement(S.N, {
                  i18nKey: "ui.splash.introducing_programme",
                  params: { name: e },
                })
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "loyalty-splash__title",
                    "loyalty-splash__title--welcome"
                  ),
                },
                n.createElement(S.N, {
                  i18nKey: "ui.splash.welcome_to_loyalty_program",
                  params: { name: e },
                })
              )
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("loyalty-splash__content") },
              n.createElement(sr, null),
              n.createElement(dr, null)
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("loyalty-splash__footer") },
              n.createElement(
                "p",
                { className: (0, i.ok)("loyalty-splash__get-started-text") },
                n.createElement(S.N, {
                  i18nKey: "ui.splash.login_start_personalised",
                  params: { store_name: t },
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.ok)("loyalty-splash__actions") },
                n.createElement(
                  "a",
                  { href: a, className: (0, i.ok)("action-button") },
                  n.createElement(S.N, { i18nKey: "ui.splash.login" })
                ),
                n.createElement(
                  "span",
                  { className: (0, i.ok)("loyalty-splash__button-spacer") },
                  "/"
                ),
                n.createElement(
                  "a",
                  { href: o, className: (0, i.ok)("action-button") },
                  n.createElement(S.N, { i18nKey: "ui.splash.signup" })
                )
              ),
              n.createElement(Gt, null)
            )
          );
        }
      }
      mr.displayName = "LoyaltySplash";
      const ur = (0, a.$j)(
        (e) => {
          const {
            urls: { login: t, signup: r },
          } = (0, z.r7)(e);
          return {
            programName: (0, u.LI)(e).name,
            siteName: (0, E.lH)(e).name,
            loginURL: t,
            signupURL: r,
          };
        },
        { onCloseClick: v.j }
      )(mr);
      var pr = r(906);
      const _r = (e) => {
          let { action: t } = e;
          switch (t.type) {
            case "add":
            case "deduct":
            case "flow":
            case "rule":
              return null;
            case "reward":
              return n.createElement(hr, {
                claimedRewardId: t.claimedRewardId,
              });
          }
        },
        hr = (e) => {
          let { claimedRewardId: t } = e;
          const r = (0, a.v9)((e) => (0, we.w1)(e, t)),
            o = (0, a.v9)((e) => (0, ot.PF)(e, t)),
            l = (0, a.I0)();
          if (!r) throw new rt("RewardActionsSection needs a ClaimedReward");
          const i = () => {
            l((0, yt.N4)(r));
          };
          if (gr(o)) {
            const { applyResult: e, isApplying: t } = o;
            return n.createElement(
              fr,
              null,
              n.createElement(it, {
                applied: "success" === e?.status,
                applying: t,
                disabled: Boolean(e),
                handleClick: i,
              })
            );
          }
          return null;
        },
        fr = (e) => {
          let { children: t } = e;
          return n.createElement(
            "div",
            { className: (0, i.ok)("history-info-modal-content__actions") },
            t
          );
        };
      function gr(e) {
        return Boolean(e.canBeApplied || e.applyResult);
      }
      const yr = (e) => {
          let { action: t } = e;
          const r = (0, a.v9)(L.fN);
          return n.createElement(
            "div",
            { className: (0, i.ok)("history-info-modal-content__basic") },
            n.createElement(
              "div",
              { className: (0, i.ok)("history-info-modal-content__info") },
              "state" in t && n.createElement(br, { action: t }),
              n.createElement(
                "div",
                { className: (0, i.ok)("history-info-modal-content__points") },
                n.createElement(S.N, {
                  i18nKey: "ui.general.points_count_raw",
                  params: { smart_count: t.points },
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.ok)("history-info-modal-content__date") },
                (0, j.Km)(new Date(t.date), new Date(), { locale: r })
              )
            )
          );
        },
        br = (e) => {
          let { action: t } = e;
          const r = (0, a.v9)((e) =>
              (0, we.w1)(e, ("reward" === t.type && t.claimedRewardId) || null)
            ),
            o = r && (0, or.Fu)(r) && (0, nt.ds)(r) ? "expired" : t.state;
          return n.createElement(
            "div",
            {
              "data-testid": "history-info-modal__state-bubble",
              className: (0, i.ok)(
                "history-state-bubble",
                `history-state-bubble--${o}`,
                "history-info-modal-content__state-bubble"
              ),
            },
            n.createElement(ke, { pointState: o })
          );
        };
      function vr() {
        const e = (0, a.v9)(E.lH).domain;
        return (0, a.v9)(z.tw) ?? `https://${e}/tools/recurring/login`;
      }
      const Er = () => {
        const e = vr();
        return (0, a.v9)(_.i_).rechargeHash
          ? n.createElement(
              "div",
              { className: (0, i.ok)("manage-subscriptions-link") },
              n.createElement(
                "a",
                { href: e },
                n.createElement(S.N, {
                  i18nKey:
                    "ui.dashboard.redeem_points.apply_subscription_discount",
                })
              )
            )
          : null;
      };
      const wr = (e) => {
          let { kind: t, reward: r } = e;
          const o = (0, a.v9)(E.j),
            l = (0, a.v9)(Q.HO);
          if ("one_time" === r.order_type)
            return n.createElement(S.N, {
              i18nKey:
                "ui.dashboard.redeem_points.subscription_discount.one_time.long_description",
            });
          const i = r.recurring_cycle_limit,
            s =
              "percentage" === r.discount_type
                ? `${r.discount_amount}%`
                : (0, X.v1)(o, l, r.discount_amount),
            c = (function (e, t, r) {
              const n =
                "all" === e
                  ? "ui.dashboard.redeem_points.subscription_or_one_off_discount"
                  : "ui.dashboard.redeem_points.subscription_discount";
              return null === t
                ? `${n}.all_payments.${r}`
                : 1 === t
                ? `${n}.first_payment.${r}`
                : `${n}.first_n_payments.${r}`;
            })(
              r.order_type,
              i,
              "long" === t ? "long_description" : "short_description"
            ),
            d = { discount: s, ...(i && { payments: i }) };
          return n.createElement(S.N, { i18nKey: c, params: d });
        },
        kr = (e) => {
          let { kind: t, reward: r } = e;
          const o = (0, a.v9)(E.j),
            l = (0, a.v9)(Q.HO),
            i = r.recurring_cycle_limit,
            s =
              "percentage" === r.discount_type
                ? `${r.discount_amount}%`
                : (0, X.v1)(o, l, r.discount_amount),
            c = (function (e, t) {
              const r =
                "ui.dashboard.redeem_points.active_subscription_discount";
              return null === e
                ? `${r}.all_payments.${t}`
                : 1 === e
                ? `${r}.next_payment.${t}`
                : `${r}.next_n_payments.${t}`;
            })(i, "long" === t ? "long_description" : "short_description"),
            d = { discount: s, ...(i && { payments: i }) };
          return n.createElement(S.N, { i18nKey: c, params: d });
        },
        Nr = (e) => {
          let { code: t } = e;
          return n.createElement(
            "div",
            { className: (0, i.ok)("reward-code") },
            n.createElement(
              "div",
              { className: (0, i.ok)("reward-code__code") },
              t
            ),
            n.createElement(Qe.m, {
              clipboardText: t,
              className: (0, i.ok)("reward-code__clipboard-button"),
            })
          );
        },
        Cr = (e) => {
          let { claimedRewardId: t } = e;
          const r = (0, a.v9)((e) => (0, we.w1)(e, t)),
            o = (0, a.v9)(E.j),
            l = (0, a.v9)(Q.HO),
            s = (0, a.v9)(L.fN);
          if (!r)
            throw new rt("HistoryInfoModalRewardContent needs a ClaimedReward");
          const { redeemable: c, reward: d } = r,
            m = (0, at.Vi)(d) ? d.target_site : null;
          if ("used_at" in c && c.used_at) {
            const e = (0, j.Km)(new Date(c.used_at), new Date(), { locale: s });
            return m
              ? n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.reward_used_at_ago",
                  params: { time_ago: e, store_name: m.name },
                })
              : n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.reward_used_ago",
                  params: { time_ago: e },
                });
          }
          if ((0, or.Fu)(r)) {
            const e = r.redeemable.balance,
              t = r.redeemable.expires_on,
              a = (0, nt.ds)(r);
            return n.createElement(
              "div",
              null,
              n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "history-info-modal-content__comment-balance"
                  ),
                },
                n.createElement(
                  "b",
                  null,
                  n.createElement(S.N, {
                    i18nKey: "ui.general.rewards.gift_card_balance_label",
                  }),
                  ":"
                ),
                n.createElement(
                  "span",
                  {
                    className: (0, i.ok)(
                      "history-info-modal-content__comment-balance-amount"
                    ),
                  },
                  n.createElement("span", {
                    dangerouslySetInnerHTML: {
                      __html: ` ${(0, X.pY)(o, l, e / 100)}`,
                    },
                  })
                )
              ),
              t &&
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "history-info-modal-content__comment-expiry"
                    ),
                  },
                  n.createElement(S.N, {
                    i18nKey: a
                      ? "ui.general.rewards.gift_card_expired"
                      : "ui.general.rewards.gift_card_expiry",
                    params: { date: (0, w.p6)(new Date(t)) },
                  })
                ),
              n.createElement(Nr, { code: Ft.T.must(r.redeemable.code) })
            );
          }
          if ("voucher" === c.redeemable_type) {
            const e = d.minimum_spend
                ? n.createElement(
                    "div",
                    {
                      className: (0, i.ok)(
                        "history-info-modal-content__comment-min-spend"
                      ),
                    },
                    n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.redeem_points.voucher_meta_min_spend",
                      params: { amount: (0, X.pY)(o, l, d.minimum_spend) },
                    })
                  )
                : null,
              t = () =>
                ("cart_discount_voucher" !== d.kind &&
                  "active_subscription_discount_voucher" !== d.kind) ||
                "one_time" === d.order_type ||
                (0, or.Aq)(d)
                  ? null
                  : n.createElement(
                      "div",
                      {
                        className: (0, i.ok)(
                          "history-info-modal-content__comment-subscription-discount"
                        ),
                      },
                      "cart_discount_voucher" === d.kind
                        ? n.createElement(wr, { kind: "long", reward: d })
                        : n.createElement(kr, { kind: "long", reward: d })
                    );
            return n.createElement(
              n.Fragment,
              null,
              n.createElement(t, null),
              e,
              n.createElement(Nr, { code: c.code }),
              m && n.createElement(xr, { alienSite: m, claimedReward: r }),
              ((0, or.Aq)(d) ||
                "active_subscription_discount_voucher" === d.kind) &&
                n.createElement(Er, null)
            );
          }
          if ("fulfilment" === c.redeemable_type) {
            const e = c.fulfilled_at;
            return n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "history-info-modal-content__comment--left"
                ),
              },
              n.createElement(
                "b",
                null,
                n.createElement(S.N, { i18nKey: "ui.general.status" }),
                ":"
              ),
              " ",
              e
                ? n.createElement(S.N, {
                    i18nKey: "ui.general.fulfilled_on",
                    params: { date: e },
                  })
                : n.createElement(S.N, { i18nKey: "ui.general.pending" })
            );
          }
          return null;
        },
        xr = (e) => {
          let { alienSite: t, claimedReward: r } = e;
          const a = (() => {
            if ("voucher" === r.redeemable.redeemable_type) {
              const e = (0, at.qX)(r.reward);
              return e
                ? `${t.url}/discount/${r.redeemable.code}?redirect=${e}`
                : `${t.url}/discount/${r.redeemable.code}`;
            }
            return t.url;
          })();
          return n.createElement(
            n.Fragment,
            null,
            n.createElement(
              "a",
              {
                href: a,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-i18n-key": "ui.general.rewards.visit_store",
                className: (0, i.ok)(
                  "history-info-modal-content__visit-store-button",
                  "action-button",
                  "action-button--fixed-width"
                ),
              },
              n.createElement(S.N, {
                i18nKey: "ui.general.rewards.visit_store",
              })
            ),
            n.createElement(Sr, { alienSiteName: t.name })
          );
        },
        Sr = (e) => {
          let { alienSiteName: t } = e;
          return n.createElement(
            "div",
            {
              className: (0, i.ok)(
                "history-info-modal-content__cross-store-explainer"
              ),
            },
            n.createElement(S.N, {
              i18nKey:
                "ui.dashboard.redeem_points.voucher_success_alien_store_explainer",
              params: { store_name: t },
            })
          );
        },
        Ir = () => {
          const e = (0, a.v9)(Ee.wD),
            t = (0, a.v9)(we.gG),
            r = (0, a.v9)(L.fN),
            o = (0, a.v9)(_._V),
            l = (0, a.v9)(C.SH),
            s = (0, a.v9)($.qw),
            c = (0, a.I0)(),
            d = () => c((0, Y.dP)()),
            m = (function (e, t, r, n) {
              if (!e) return null;
              if (!t) return null;
              switch (t.type) {
                case "action":
                  return r.find((e) => e.id === t.id) ?? null;
                case "claimedReward": {
                  const e = n.find((e) => e.id === t.id);
                  return e ? Tr(e) : null;
                }
              }
            })(o, l, e, t),
            u = Boolean(m);
          return n.createElement(
            i.QB.Provider,
            { value: "integrated" },
            n.createElement(
              pr.u,
              {
                isOpen: u,
                onCloseClick: u ? d : null,
                onBackgroundClick: u ? d : null,
                title: n.createElement(Pr, { action: m }),
                options: { noPadding: !0 },
                className: (0, i.ok)("modal--history-info"),
              },
              m &&
                n.createElement($r, {
                  action: m,
                  customer: o,
                  programRules: s,
                  locale: r,
                })
            )
          );
        };
      const $r = (e) => {
          let { action: t, customer: r, programRules: o } = e;
          const l = (0, a.v9)((e) => (0, ot.KK)(e, t));
          return n.createElement(
            "div",
            {
              className: (0, i.ok)(
                "history-info-modal-content",
                l && gr(l) && "history-info-modal-content--can-be-applied"
              ),
            },
            n.createElement(yr, { action: t }),
            r && n.createElement(Kr, { action: t, programRules: o }),
            n.createElement(_r, { action: t })
          );
        },
        Kr = (e) => {
          let { action: t, programRules: r } = e;
          const o = (0, a.v9)(L.fN),
            l = (e) => {
              let { children: t } = e;
              return n.createElement(
                "div",
                { className: (0, i.ok)("history-info-modal-content__comment") },
                t
              );
            },
            s = (() => {
              switch (t.type) {
                case "reward":
                  return "void" === t.state
                    ? n.createElement(S.N, {
                        i18nKey: "ui.dashboard.redeem_points.reward_refunded",
                      })
                    : "approved" === t.state
                    ? n.createElement(Cr, {
                        claimedRewardId: t.claimedRewardId,
                      })
                    : null;
                case "rule": {
                  if ("expired" === t.state)
                    return n.createElement(S.N, {
                      i18nKey: "ui.dashboard.account.comments.points_expired",
                    });
                  const e = r.find((e) => e.id === t.ruleId);
                  if (!e) return null;
                  if ("purchase" === e.kind || "referral" === e.kind)
                    switch (t.state) {
                      case "declined":
                        return n.createElement(S.N, {
                          i18nKey:
                            "ui.dashboard.account.comments.purchase_declined",
                        });
                      case "void":
                        return n.createElement(S.N, {
                          i18nKey:
                            "ui.dashboard.account.comments.purchase_void",
                        });
                      case "pending":
                        return t.approveDate
                          ? n.createElement(S.N, {
                              i18nKey:
                                "ui.dashboard.account.comments.purchase_pending",
                              params: {
                                time: (0, j.Km)(
                                  new Date(t.approveDate),
                                  new Date(),
                                  { locale: o, unitOnly: !0 }
                                ),
                              },
                            })
                          : n.createElement(S.N, {
                              i18nKey:
                                "ui.dashboard.account.comments.purchase_pending_indefinite",
                            });
                      case "approved":
                        return null;
                    }
                  else if ("pending" === t.state && t.approveDate)
                    return n.createElement(S.N, {
                      i18nKey: "ui.dashboard.account.comments.pending",
                      params: {
                        time: (0, j.Km)(new Date(t.approveDate), new Date(), {
                          locale: o,
                          unitOnly: !0,
                        }),
                      },
                    });
                  return null;
                }
                default:
                  return null;
              }
            })();
          return s ? n.createElement(l, null, s) : null;
        },
        Tr = (e) => ({
          actionText: e.reward.title,
          claimedRewardId: e.id,
          date: e.claimed_at,
          id: String(e.id),
          points: e.point_cost,
          rewardId: e.reward.id,
          state: e.state,
          type: "reward",
          displayPoints: `-${e.point_cost.toString()}`,
          alienSite: (0, at.Vi)(e.reward) ? e.reward.target_site : void 0,
        }),
        Pr = (e) => {
          let { action: t } = e;
          if (!t) return null;
          const r = n.createElement("span", {
            dangerouslySetInnerHTML: { __html: t.actionText },
          });
          return "reward" === t.type && t.alienSite
            ? n.createElement(
                n.Fragment,
                null,
                r,
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "history-info-modal-content__cross-store-sub"
                    ),
                  },
                  n.createElement(S.N, {
                    i18nKey: "ui.general.rewards.use_at",
                    params: { store_name: t.alienSite.name },
                  })
                )
              )
            : r;
        };
      var Or = r(4274);
      class Rr extends n.PureComponent {
        render() {
          return n.createElement(
            "div",
            { className: (0, i.ok)("pending-points-help-modal-content") },
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "pending-points-help-modal-content__heading"
                ),
              },
              n.createElement(S.N, {
                i18nKey: "ui.dashboard.redeem_points.points_help.heading_why",
              })
            ),
            n.createElement(
              "div",
              {
                ref: (e) => (this.historyLinkDiv = e),
                className: (0, i.ok)("pending-points-help-modal-content__text"),
              },
              n.createElement(S.N, {
                i18nKey: "ui.dashboard.redeem_points.points_help.content",
              })
            )
          );
        }
        componentDidMount() {
          if (!this.historyLinkDiv) return;
          const e = (0, Or.Oc)(
            this.historyLinkDiv.getElementsByTagName("a")
          ).find((e) => "account" === e.getAttribute("data-link"));
          e && e.addEventListener("click", this.handleAccountClick);
        }
        componentWillUnmount() {
          this.historyLinkDiv &&
            this.historyLinkDiv.removeEventListener(
              "click",
              this.handleAccountClick
            );
        }
        constructor(...e) {
          super(...e),
            (this.handleAccountClick = (e) => {
              e.preventDefault(),
                this.props.close(),
                this.props.changePage("history");
            });
        }
      }
      const Fr = (0, a.$j)(null, { changePage: Y.oO, close: Y.bW })(Rr);
      class qr extends n.Component {
        render() {
          return n.createElement(
            pr.u,
            {
              isOpen: this.props.isOpen,
              onCloseClick: () => this.props.close(),
              onBackgroundClick: () => this.props.close(),
              title: "Help",
              className: (0, i.ok)("modal--pending-points-help"),
            },
            n.createElement(Fr, null)
          );
        }
      }
      qr.displayName = "PendingPointsHelpModal";
      const Hr = (0, a.$j)((e) => ({ isOpen: (0, C.th)(e) }), { close: Y.bW })(
        qr
      );
      var Ar = r(7960),
        Mr = r(2123);
      class Dr extends n.PureComponent {
        render() {
          const { close: e, isModalOpen: t } = this.props;
          return n.createElement(
            pr.u,
            { isOpen: t, onCloseClick: e, onBackgroundClick: e },
            n.createElement(
              "div",
              {
                className: (0, i.ok)("referral-discount-applied-modal--header"),
              },
              n.createElement(
                "h1",
                null,
                n.createElement(S.N, {
                  i18nKey: "ui.referree_notification.discount_applied_header",
                })
              )
            ),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "referral-discount-applied-modal--content"
                ),
              },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "referral-discount-applied-modal--content--message"
                  ),
                },
                n.createElement(S.N, {
                  i18nKey: "ui.referree_notification.discount_applied_content",
                })
              )
            ),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "referral-discount-applied-modal--continue"
                ),
                onClick: e,
              },
              n.createElement(
                "a",
                {
                  className: (0, i.ok)(
                    "action-button",
                    "referral-discount-applied-modal--continue--button"
                  ),
                  href: "#",
                },
                n.createElement(S.N, {
                  i18nKey: "ui.referree_notification.continue",
                })
              )
            )
          );
        }
      }
      const Vr = (0, a.$j)(
        (e) => ({ isModalOpen: (0, Mr.WG)(e) }),
        (e) => ({
          close: () => {
            e((0, Ar.OJ)(!1));
          },
        })
      )(Dr);
      var jr = r(6918),
        Br = r(3868);
      class Lr extends n.PureComponent {
        render() {
          return n.createElement(
            "div",
            { className: (0, i.ok)("referral-modal--incentive--code") },
            this.getContent()
          );
        }
        getContent() {
          const {
            isFetching: e,
            error: t,
            value: r,
          } = this.props.refereeIncentiveCodeState;
          return e
            ? n.createElement("div", {
                className: (0, i.ok)("standalone-spinner"),
              })
            : t || !r
            ? n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "referral-modal--incentive--code__error"
                  ),
                },
                n.createElement(S.N, { i18nKey: "ui.general.error" })
              )
            : n.createElement(Nr, { code: r });
        }
      }
      Lr.displayName = "RefereeIncentiveCode";
      const Ur = (0, a.$j)((e) => ({
          refereeIncentiveCodeState: (0, jr.Z)(e),
        }))(Lr),
        zr = () => {
          const e = (0, a.v9)(u.pb),
            t = (0, a.v9)(Mr.RD),
            r = (0, a.v9)(E.j),
            o = (0, a.v9)(Q.HO),
            l = (0, a.v9)(jr.Z),
            s = "shopify" === (0, a.v9)(E.O2),
            c = (0, a.v9)(Br.wt),
            d = (0, a.v9)(Mr.ox),
            m = s && !c,
            p = (0, a.I0)(),
            _ = () => p((0, Ar.C_)());
          return null === d
            ? null
            : n.createElement(
                pr.u,
                { isOpen: t, onCloseClick: _, onBackgroundClick: _ },
                d
                  ? n.createElement(Wr, null)
                  : n.createElement(
                      n.Fragment,
                      null,
                      n.createElement(
                        "div",
                        { className: (0, i.ok)("referral-modal--header") },
                        n.createElement(
                          "h1",
                          null,
                          n.createElement(S.N, {
                            i18nKey: "ui.referree_notification.heading",
                          })
                        )
                      ),
                      n.createElement(
                        "div",
                        { className: (0, i.ok)("referral-modal--incentive") },
                        n.createElement(
                          "div",
                          {
                            className: (0, i.ok)(
                              "referral-modal--incentive--message"
                            ),
                          },
                          e &&
                            n.createElement(Gr, {
                              incentive: e,
                              currency: r,
                              localCurrency: o,
                            })
                        ),
                        n.createElement(Ur, null)
                      ),
                      n.createElement(Yr, {
                        close: _,
                        incentive: e,
                        incentiveCodeState: l,
                        canApplyDiscountToShopify: m,
                      })
                    )
              );
        },
        Wr = () =>
          n.createElement(
            n.Fragment,
            null,
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-modal--header") },
              n.createElement(
                "h1",
                null,
                n.createElement(S.N, {
                  i18nKey: "ui.referree_notification.blocked_referral_header",
                })
              )
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-modal--unsuccessful-message") },
              n.createElement(
                "p",
                null,
                n.createElement(S.N, {
                  i18nKey: "ui.referree_notification.blocked_referral_text",
                })
              )
            )
          ),
        Gr = (e) => {
          let { currency: t, localCurrency: r, incentive: a } = e;
          switch (a.kind) {
            case "free_shipping":
              return n.createElement(S.N, {
                i18nKey: "ui.referree_notification.free_shipping_voucher_text",
              });
            case "cart_discount": {
              const { minimumSpend: e } = a,
                o = (0, qe.Q)({ incentive: a, currency: t, localCurrency: r });
              return e > 0
                ? n.createElement(S.N, {
                    i18nKey:
                      "ui.referree_notification.voucher_discount_text_min_spend",
                    params: { amount: (0, X.pY)(t, r, e), discount: o },
                  })
                : n.createElement(S.N, {
                    i18nKey: "ui.referree_notification.voucher_discount_text",
                    params: { discount: o },
                  });
            }
          }
        },
        Yr = (e) => {
          let {
            close: t,
            incentive: r,
            incentiveCodeState: a,
            canApplyDiscountToShopify: o,
          } = e;
          return r && o
            ? n.createElement(Qr, {
                incentive: r,
                incentiveCodeState: a,
                close: t,
              })
            : n.createElement(Xr, { incentive: r, close: t });
        },
        Zr = (e) => {
          let { incentive: t } = e;
          return n.createElement(
            "p",
            {
              className: (0, i.ok)(
                "referral-modal__collection-restriction-text"
              ),
            },
            n.createElement("span", null, t.collectionRestrictionText)
          );
        },
        Qr = (e) => {
          let { incentive: t, incentiveCodeState: r, close: a } = e;
          return r.value
            ? n.createElement(
                "div",
                null,
                n.createElement(
                  "div",
                  { className: (0, i.ok)("referral-modal--more") },
                  (0, He.Ix)(t) &&
                    n.createElement(
                      "div",
                      null,
                      n.createElement(Zr, { incentive: t })
                    )
                ),
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)("referral-modal--continue"),
                    onClick: a,
                  },
                  n.createElement(
                    "a",
                    {
                      className: (0, i.ok)(
                        "action-button",
                        "referral-modal--continue--button"
                      ),
                      href: `/discount/${r.value}?redirect=${window.location.pathname}?discount_applied=${r.value}`,
                    },
                    n.createElement(S.N, {
                      i18nKey: "ui.referree_notification.apply_discount",
                    })
                  )
                )
              )
            : null;
        },
        Xr = (e) => {
          let { close: t, incentive: r } = e;
          return n.createElement(
            "div",
            null,
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-modal--more") },
              n.createElement(
                "div",
                null,
                n.createElement(
                  "h3",
                  { className: (0, i.ok)("referral-modal--more--title") },
                  n.createElement(S.N, {
                    i18nKey: "ui.referree_notification.voucher_help_heading",
                  })
                ),
                n.createElement(
                  "p",
                  { className: (0, i.ok)("referral-modal--more--text") },
                  n.createElement(S.N, {
                    i18nKey: "ui.referree_notification.voucher_help_content",
                  })
                ),
                r && (0, He.Ix)(r) && n.createElement(Zr, { incentive: r })
              )
            ),
            n.createElement(
              "div",
              { className: (0, i.ok)("referral-modal--continue"), onClick: t },
              n.createElement(
                "a",
                {
                  className: (0, i.ok)(
                    "action-button",
                    "referral-modal--continue--button"
                  ),
                  href: window.location.pathname,
                },
                n.createElement(S.N, {
                  i18nKey: "ui.referree_notification.continue",
                })
              )
            )
          );
        };
      var Jr = r(6166);
      class en extends n.PureComponent {
        render() {
          const e = this.props.isOpen
            ? n.createElement(
                h.Z,
                {
                  key: "1",
                  in: this.props.isOpen,
                  classNames: {
                    enter: (0, i.ok)("modal-and-screen--enter"),
                    enterActive: (0, i.ok)("modal-and-screen--enter-active"),
                    exit: (0, i.ok)("modal-and-screen--exit"),
                    exitActive: (0, i.ok)("modal-and-screen--exit-active"),
                  },
                  timeout: 150,
                },
                n.createElement(
                  "div",
                  { className: (0, i.ok)("modal-and-screen") },
                  n.createElement("div", {
                    className: (0, i.ok)("screen", "screen--light"),
                    onClick: () => this.props.closeModal(),
                  }),
                  n.createElement(
                    "div",
                    {
                      className: (0, i.ok)(
                        "referral-widget-modal",
                        this.props.onThankYou &&
                          "referral-widget-modal--checkout"
                      ),
                    },
                    n.createElement(
                      "div",
                      { className: (0, i.ok)("referral-widget-modal__header") },
                      n.createElement(S.N, {
                        i18nKey: "ui.referral_popup.header",
                      })
                    ),
                    n.createElement(
                      "a",
                      {
                        className: (0, i.ok)(
                          "referral-widget-modal__close-button"
                        ),
                        onClick: () => this.props.closeModal(),
                      },
                      "×"
                    ),
                    n.createElement(
                      Jr.S,
                      null,
                      this.props.customer
                        ? n.createElement(Je, { format: "modal" })
                        : n.createElement(et, null)
                    )
                  )
                )
              )
            : null;
          return n.createElement(f.Z, null, e);
        }
      }
      en.displayName = "ReferralWidgetModal";
      const tn = (0, a.$j)(
        (e) => ({
          customer: (0, _._V)(e),
          isOpen: e.loyaltyPanel.isReferralWidgetModalOpen,
          onThankYou: (0, Q.lZ)(e),
        }),
        { closeModal: Y.sJ }
      )(en);
      var rn;
      !(function (e) {
        (e[(e.Confirm = 0)] = "Confirm"), (e[(e.Cancel = 1)] = "Cancel");
      })(rn || (rn = {}));
      const nn = (e) => {
          let {
            handleClick: t,
            disabled: r,
            submitting: a,
            labelI18nKey: o,
            buttonKind: l,
          } = e;
          const s = (0, d.T)(),
            c =
              "ui.general.yes" === o && "modern" === s
                ? "ui.general.redeem"
                : o;
          return n.createElement(
            "div",
            {
              onClick: r ? () => null : () => t(),
              className: (0, i.ok)(
                "action-button",
                "action-button--fixed-width",
                "redeem-reward-modal__button",
                l === rn.Cancel ? "redeem-reward-modal__button--cancel" : "",
                l === rn.Cancel ? "action-button--neutral" : "",
                l === rn.Confirm ? "redeem-reward-modal__button--confirm" : "",
                a ? "action-button--loading" : "",
                r ? "action-button--disabled" : ""
              ),
            },
            n.createElement(S.N, { i18nKey: c })
          );
        },
        an = "ui.general.error",
        on = (e) => {
          let { i18nKey: t = an } = e;
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__error") },
              n.createElement(S.N, { i18nKey: t })
            )
          );
        },
        ln = (e) => {
          let { reward: t } = e;
          const r = vr(),
            o = (0, a.v9)(ot.Sg),
            l = (0, a.v9)(ot.rq),
            s = (0, a.v9)(we.Pp),
            c = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            d = (0, a.I0)(),
            m = l === t.id,
            u = null !== l && l !== t.id;
          return c
            ? n.createElement(on, null)
            : o?.id === t.id
            ? n.createElement(
                "div",
                { className: (0, i.c)("redeem-reward-modal__content") },
                n.createElement(
                  "div",
                  { className: (0, i.c)("redeem-reward-modal__summary") },
                  n.createElement(S.N, {
                    i18nKey:
                      "ui.dashboard.redeem_points.voucher_success_message",
                  }),
                  " ",
                  n.createElement(S.N, {
                    i18nKey: "ui.dashboard.redeem_points.rewards_page_info",
                  })
                ),
                n.createElement(
                  "div",
                  {
                    className: (0, i.c)(
                      "redeem-reward-modal__usage-instructions"
                    ),
                  },
                  n.createElement(S.o.span, {
                    i18nKey:
                      "ui.dashboard.redeem_points.active_subscription_discount.usage_instructions",
                    mutateText: (e) =>
                      e.replace(
                        "<a>",
                        `<a href='${r}' target='_blank' rel='noreferrer' class='${(0,
                        i.c)("redeem-reward-modal__summary-link")}'>`
                      ),
                  })
                ),
                "voucher" === s?.redeemable.redeemable_type &&
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "redeem-reward-modal__code-container"
                      ),
                    },
                    n.createElement(Nr, { code: s.redeemable.code })
                  )
              )
            : n.createElement(
                "div",
                { className: (0, i.c)("redeem-reward-modal__content") },
                n.createElement(
                  "div",
                  { className: (0, i.c)("redeem-reward-modal__confirm-box") },
                  n.createElement(
                    "div",
                    { className: (0, i.c)("redeem-reward-modal__description") },
                    n.createElement(kr, { kind: "long", reward: t })
                  ),
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "redeem-reward-modal__confirm-summary"
                      ),
                    },
                    (0, ft.zD)(t)
                  ),
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "redeem-reward-modal__button-container"
                      ),
                    },
                    n.createElement(nn, {
                      handleClick: () => d((0, yt.l)()),
                      disabled: !1,
                      labelI18nKey: "ui.general.not_now",
                      submitting: !1,
                      buttonKind: rn.Cancel,
                    }),
                    n.createElement(nn, {
                      handleClick: () => d((0, yt.vF)({ rewardId: t.id })),
                      disabled: u,
                      labelI18nKey: "ui.general.yes",
                      submitting: m,
                      buttonKind: rn.Confirm,
                    })
                  )
                )
              );
        },
        sn = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(ot.rq),
            o = (0, a.v9)(we.Pp),
            l = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            s = Boolean(r && r !== t.id),
            c = r === t.id,
            d = (0, a.v9)(ot.Sg),
            m = (0, at.Vi)(t) ? t.target_site : null,
            u = (0, a.I0)(),
            p = () => u((0, yt.l)()),
            _ = () => u((0, yt.vF)({ rewardId: t.id })),
            h = (0, a.v9)(E.j),
            f = (0, a.v9)(Q.HO),
            g = (0, ft.DU)(t, h, f);
          if (l)
            return (0, at.Dj)(l.name)
              ? n.createElement(on, {
                  i18nKey:
                    "ui.dashboard.redeem_points.subscription_reward_deactivated",
                })
              : n.createElement(on, null);
          if (d && d.id === t.id) {
            if (!o || "voucher" !== o.redeemable.redeemable_type)
              throw new rt(
                "Rendering claimed reward success requires a Claimed Reward"
              );
            return n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__content") },
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__summary") },
                m
                  ? n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.redeem_points.voucher_success_message_alien_store",
                      params: { store_name: m.name },
                    })
                  : n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.redeem_points.voucher_success_message",
                    }),
                " ",
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.rewards_page_info",
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__code-container") },
                n.createElement(Nr, { code: o.redeemable.code })
              ),
              (0, or.Aq)(o.reward) && n.createElement(Er, null),
              m &&
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "redeem-reward-modal__cross-store-container"
                    ),
                  },
                  n.createElement(
                    "div",
                    {
                      className: (0, i.ok)(
                        "redeem-reward-modal__button-container"
                      ),
                    },
                    n.createElement(
                      "a",
                      {
                        href: `${m.url}/discount/${o.redeemable.code}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: (0, i.ok)(
                          "action-button",
                          "action-button--fixed-width",
                          "redeem-reward-modal__button",
                          "redeem-reward-modal__button--margin-left"
                        ),
                      },
                      n.createElement(S.N, {
                        i18nKey: "ui.general.rewards.visit_store",
                        params: { store_name: m.name },
                      })
                    )
                  )
                )
            );
          }
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__confirm-box") },
              "one_time" !== t.order_type &&
                !(0, or.Aq)(t) &&
                n.createElement(
                  "div",
                  { className: (0, i.ok)("redeem-reward-modal__description") },
                  n.createElement(wr, { kind: "long", reward: t })
                ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__confirm-summary"),
                },
                (0, ft.zD)(t)
              ),
              g &&
                n.createElement("div", {
                  className: (0, i.ok)("redeem-reward-modal__minimum-spend"),
                  dangerouslySetInnerHTML: { __html: g },
                }),
              m &&
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "redeem-reward-modal__cross-store-extra"
                    ),
                  },
                  n.createElement("div", {
                    className: (0, i.ok)("redeem-reward-modal__info-icon"),
                  }),
                  n.createElement(
                    "div",
                    { className: (0, i.ok)("redeem-reward-modal__info-text") },
                    n.createElement(S.N, {
                      i18nKey: "ui.general.rewards.use_at_confirmation",
                      params: { store_name: m.name },
                    })
                  )
                ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__button-container"),
                },
                n.createElement(nn, {
                  handleClick: p,
                  disabled: !1,
                  labelI18nKey: "ui.general.not_now",
                  submitting: !1,
                  buttonKind: rn.Cancel,
                }),
                n.createElement(nn, {
                  handleClick: _,
                  disabled: s,
                  labelI18nKey: "ui.general.yes",
                  submitting: c,
                  buttonKind: rn.Confirm,
                })
              )
            )
          );
        },
        cn = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(ot.rq),
            o = (0, a.v9)(we.Pp),
            l = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            s = Boolean(r && r !== t.id),
            c = r === t.id,
            d = (0, a.v9)(ot.Sg),
            m = (0, at.Vi)(t) ? t.target_site : null,
            u = (0, at.qX)(t),
            p = (0, a.I0)(),
            _ = () => p((0, yt.l)()),
            h = () => p((0, yt.vF)({ rewardId: t.id })),
            f = (0, a.v9)(E.j),
            g = (0, a.v9)(Q.HO),
            y = (0, ft.DU)(t, f, g);
          if (l) return n.createElement(on, null);
          if (d && d.id === t.id) {
            if (!o || "voucher" !== o.redeemable.redeemable_type)
              throw new rt(
                "Rendering claimed reward success requires a Claimed Reward"
              );
            return n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__content") },
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__summary") },
                m
                  ? n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.redeem_points.voucher_success_message_alien_store",
                      params: { store_name: m.name },
                    })
                  : n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.redeem_points.voucher_success_message",
                    }),
                " ",
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.rewards_page_info",
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__code-container") },
                n.createElement(Nr, { code: o.redeemable.code })
              ),
              m && u
                ? n.createElement(
                    "div",
                    {
                      className: (0, i.ok)(
                        "redeem-reward-modal__cross-store-container"
                      ),
                    },
                    n.createElement(
                      "div",
                      {
                        className: (0, i.ok)(
                          "redeem-reward-modal__button-container"
                        ),
                      },
                      n.createElement(
                        "a",
                        {
                          href: `${m.url}/discount/${o.redeemable.code}?redirect=${u}`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: (0, i.ok)(
                            "action-button",
                            "action-button--fixed-width",
                            "redeem-reward-modal__button",
                            "redeem-reward-modal__button--margin-left"
                          ),
                        },
                        n.createElement(S.N, {
                          i18nKey: "ui.dashboard.redeem_points.view_collection",
                        })
                      )
                    )
                  )
                : n.createElement(
                    n.Fragment,
                    null,
                    n.createElement(
                      "div",
                      {
                        className: (0, i.ok)(
                          "redeem-reward-modal__button-container"
                        ),
                      },
                      u &&
                        n.createElement(dn, {
                          link: u,
                          alignment: "right",
                          i18nKey: "ui.dashboard.redeem_points.view_collection",
                        }),
                      n.createElement(dn, {
                        link: "/cart",
                        alignment: "left",
                        i18nKey: "ui.general.go_to_cart",
                      })
                    )
                  )
            );
          }
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__confirm-box") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__confirm-summary"),
                },
                (0, ft.zD)(t)
              ),
              y &&
                n.createElement("div", {
                  className: (0, i.ok)("redeem-reward-modal__minimum-spend"),
                  dangerouslySetInnerHTML: { __html: y },
                }),
              m &&
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "redeem-reward-modal__cross-store-extra"
                    ),
                  },
                  n.createElement("div", {
                    className: (0, i.ok)("redeem-reward-modal__info-icon"),
                  }),
                  n.createElement(
                    "div",
                    { className: (0, i.ok)("redeem-reward-modal__info-text") },
                    n.createElement(S.N, {
                      i18nKey: "ui.general.rewards.use_at_confirmation",
                      params: { store_name: m.name },
                    })
                  )
                ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__button-container"),
                },
                n.createElement(nn, {
                  handleClick: _,
                  disabled: !1,
                  labelI18nKey: "ui.general.not_now",
                  submitting: !1,
                  buttonKind: rn.Cancel,
                }),
                n.createElement(nn, {
                  handleClick: h,
                  disabled: s,
                  labelI18nKey: "ui.general.yes",
                  submitting: c,
                  buttonKind: rn.Confirm,
                })
              )
            )
          );
        },
        dn = (e) => {
          let { link: t, alignment: r, i18nKey: a } = e;
          return n.createElement(
            "a",
            {
              href: t,
              target: "_blank",
              rel: "noopener noreferrer",
              className: (0, i.ok)(
                "action-button",
                "action-button--fixed-width",
                "redeem-reward-modal__button",
                `redeem-reward-modal__button--margin-${r}`
              ),
            },
            n.createElement(S.N, { i18nKey: a })
          );
        },
        mn = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(ot.rq),
            o = (0, a.v9)(we.Pp),
            l = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            s = Boolean(r && r !== t.id),
            c = r === t.id,
            d = (0, a.v9)(ot.Sg),
            m = (0, a.I0)(),
            u = () => m((0, yt.l)()),
            p = () => m((0, yt.vF)({ rewardId: t.id }));
          if (l) return n.createElement(on, null);
          if (d && d.id === t.id) {
            if (!o || "fulfilment" !== o.redeemable.redeemable_type)
              throw new rt(
                "Rendering claimed reward success requires a Claimed Reward"
              );
            return t.content.fulfilment_instructions
              ? n.createElement(
                  "div",
                  { className: (0, i.ok)("redeem-reward-modal__content") },
                  n.createElement(
                    "div",
                    { className: (0, i.ok)("redeem-reward-modal__summary") },
                    t.content.fulfilment_instructions
                  )
                )
              : null;
          }
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__confirm-box") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__confirm-summary"),
                },
                (0, ft.zD)(t)
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__button-container"),
                },
                n.createElement(nn, {
                  handleClick: u,
                  disabled: !1,
                  labelI18nKey: "ui.general.not_now",
                  submitting: !1,
                  buttonKind: rn.Cancel,
                }),
                n.createElement(nn, {
                  handleClick: p,
                  disabled: s,
                  labelI18nKey: "ui.general.yes",
                  submitting: c,
                  buttonKind: rn.Confirm,
                })
              )
            )
          );
        },
        un = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(ot.rq),
            o = (0, a.v9)(we.Pp),
            l = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            s = Boolean(r && r !== t.id),
            c = r === t.id,
            d = (0, a.v9)(ot.Sg),
            m = (0, a.I0)(),
            u = () => m((0, yt.l)()),
            p = () => m((0, yt.vF)({ rewardId: t.id }));
          if (l) return n.createElement(on, null);
          if (d && d.id === t.id) {
            if (!o || "voucher" !== o.redeemable.redeemable_type)
              throw new rt(
                "Rendering claimed reward success requires a Claimed Reward"
              );
            return n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__content") },
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__summary") },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.voucher_success_message",
                }),
                " ",
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.rewards_page_info",
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__code-container") },
                n.createElement(Nr, { code: o.redeemable.code })
              )
            );
          }
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__confirm-box") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__confirm-summary"),
                },
                (0, ft.zD)(t)
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__button-container"),
                },
                n.createElement(nn, {
                  handleClick: u,
                  disabled: !1,
                  labelI18nKey: "ui.general.not_now",
                  submitting: !1,
                  buttonKind: rn.Cancel,
                }),
                n.createElement(nn, {
                  handleClick: p,
                  disabled: s,
                  labelI18nKey: "ui.general.yes",
                  submitting: c,
                  buttonKind: rn.Confirm,
                })
              )
            )
          );
        },
        pn = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(ot.rq),
            o = (0, a.v9)(we.Pp),
            l = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            s = Boolean(r && r !== t.id),
            c = r === t.id,
            d = (0, a.v9)(ot.Sg),
            m = (0, a.I0)(),
            u = () => m((0, yt.l)()),
            p = () => m((0, yt.vF)({ rewardId: t.id }));
          if (l) return n.createElement(on, null);
          if (d && d.id === t.id) {
            if (!o || "gift_card" !== o.redeemable.redeemable_type)
              throw new rt(
                "Rendering claimed reward success requires a Claimed Reward"
              );
            return n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__content") },
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__summary") },
                n.createElement(S.N, {
                  i18nKey:
                    "ui.dashboard.redeem_points.gift_card_success_message",
                }),
                " ",
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.rewards_page_info",
                })
              ),
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__code-container") },
                n.createElement(Nr, { code: Ft.T.must(o.redeemable.code) })
              )
            );
          }
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__confirm-box") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__confirm-summary"),
                },
                (0, ft.zD)(t)
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__button-container"),
                },
                n.createElement(nn, {
                  handleClick: u,
                  disabled: !1,
                  labelI18nKey: "ui.general.not_now",
                  submitting: !1,
                  buttonKind: rn.Cancel,
                }),
                n.createElement(nn, {
                  handleClick: p,
                  disabled: s,
                  labelI18nKey: "ui.general.yes",
                  submitting: c,
                  buttonKind: rn.Confirm,
                })
              )
            )
          );
        };
      var _n = r(7596),
        hn = r(4421),
        fn = r(2709);
      class gn extends Error {
        constructor(...e) {
          super(...e), (this.name = "InvalidRewardError");
        }
      }
      var yn = r(2307),
        bn = r(6840),
        vn = r(6777),
        En = r(7365),
        wn = r(8268),
        kn = r(6186),
        Nn = r(5810),
        Cn = r(9121),
        xn = r(7377);
      const Sn = (e) => {
        let { rewardId: t, variantId: r } = e;
        return async (e, n) => {
          const a = n();
          if (null !== (0, ot.rq)(a)) return;
          const o = (0, _._V)(a);
          if (!o) throw new yn.G("Claiming reward requires customer");
          const l = (0, wn.Iq)(a);
          if (!l)
            throw new vn.T(
              "Shopify Cart required to redeem product cart reward"
            );
          const i = (0, ft.kL)(a, t);
          if (!i) throw new bn.w("Claiming a reward requires a reward");
          if ("product_cart" !== i.kind)
            throw new gn(
              "Redeeming a free product reward must be used with a free product reward"
            );
          const s = (0, En.Wu)(a) ?? void 0,
            c = {
              cart: l,
              attribution: (0, Cn.OY)(o.merchantId),
              emailTrackingId: s,
              rewardId: t,
              variantId: r,
            };
          e((0, yt.bn)(t));
          const d = hn.H.buildFromState(a, e),
            m = await d.customers.redeemFreeProductVariant(c);
          if ("error" in m) return On(m, e, { rewardId: t, variantId: r });
          (0, at.Oz)(o, i);
          const u = m.variant,
            p = await xn.OP.addProductToCart((0, _n.BA)(u.variant_id));
          if (!p) return;
          if (p.token !== l.token) {
            const n = {
              previousCartToken: l.token,
              newCartToken: p.token,
              customerRewardId: u.customer_reward_id,
            };
            try {
              const a = await d.customers.updateFreeVariantShopifyCartToken(n);
              if ("error" in a) return On(a, e, { rewardId: t, variantId: r });
              e((0, fn.XX)(u)), e((0, fn.Lk)(a));
            } catch (e) {
              G.k.error("Could not update shopify cart token", { err: e });
            }
          }
          e((0, fn.RV)(p));
          const h = xn.uX.getAddedItemFromCarts(l, p);
          h && (0, kn.j)({ event: "cart.addedItem", payload: h }),
            (0, kn.j)({ event: "cart.changed" }),
            0 === kn.u.listenerCount("cart.changed")
              ? (0, Nn.gB)("/cart")
              : e((0, yt.Aj)(t));
        };
      };
      var In = r(9544),
        $n = r(2690),
        Kn = r(6233);
      const Tn = (e) => {
        let { rewardId: t, variantId: r } = e;
        return async (e, n) => {
          const a = n();
          if (null !== (0, ot.rq)(a)) return;
          if (!(0, z.r7)(a).useBuyWithPointsScript)
            throw new gn(
              "Site not configured for Shopify Script product redemption"
            );
          const o = (0, _._V)(a),
            l = (0, wn.Iq)(a),
            i = (0, ft.kL)(a, t),
            s = (0, In.v)(a);
          if (!o || !s)
            throw new yn.G(
              "Claiming BuyWithPointsReward via Shopify Script method requires customer to be signed into platform"
            );
          if (!l && !$n.ai.isHookRegistered("customers.rewards.claimed"))
            throw new vn.T(
              "Shopify frontend or `customers.rewards.claimed` hook is required"
            );
          if (!i) throw new bn.w("Claiming a reward requires a reward");
          if ("product_cart" !== i.kind)
            throw new gn(
              "Redeeming a free product reward must be used with a free product reward"
            );
          const c = i.target_products.find(
              (e) => e.variant_id === (0, _n.pU)(r)
            ),
            d = c?.id?.toString();
          if (!c || !d)
            throw new gn("No valid target product found for reward");
          const m = (0, En.Wu)(a) ?? void 0,
            u = (0, Cn.OY)(o.merchantId);
          e((0, yt.bn)(t));
          const p = hn.H.buildFromState(a, e),
            h = await p.customers.redeemShopifyScriptProductReward({
              cart: l,
              contextParams: { action: "free_product", customerMerchantId: s },
              product: { productId: d, variantId: r },
              rewardId: t,
              attribution: u,
              emailTrackingId: m,
            });
          if ("error" in h) return On(h, e, { rewardId: t, variantId: r });
          (0, at.Oz)(o, i),
            l &&
              (await (async function (e) {
                let {
                  cart: t,
                  redemption: r,
                  claimedReward: n,
                  api: a,
                  dispatch: o,
                } = e;
                const l = r.rewardId,
                  i = r.product.variantId,
                  s = await xn.OP.addProductToCart((0, _n.BA)(i), {
                    __lion_context: r.metadata.encodedContext,
                  });
                if (!s) return;
                if (s.token !== t.token) {
                  const e = {
                    previousCartToken: t.token,
                    newCartToken: s.token,
                    customerRewardId: n.id,
                  };
                  try {
                    const t = await a.customers.updateScriptsShopifyCartToken(
                      e
                    );
                    if ("error" in t)
                      return On(t, o, { rewardId: l, variantId: i });
                    o((0, fn.ie)(r)), o((0, fn.Gz)(t));
                  } catch (e) {
                    G.k.error("Could not update shopify cart token", {
                      err: e,
                    });
                  }
                }
                o((0, fn.RV)(s));
                const c = xn.uX.getAddedItemFromCarts(t, s);
                c && (0, kn.j)({ event: "cart.addedItem", payload: c });
                (0, kn.j)({ event: "cart.changed" });
              })({
                cart: l,
                redemption: h.productRedemption,
                claimedReward: h.claimedReward,
                api: p,
                dispatch: e,
              }));
          const f = await (0, $n.f1)("customers.rewards.claimed", {
            claimedReward: (0, Kn.M)(h.claimedReward, {
              dispatch: e,
              getState: n,
            }),
          });
          e((0, yt.Aj)(t)),
            e((0, yt.l)()),
            f ||
              !l ||
              kn.u.listenerCount("cart.changed") > 0 ||
              (0, Nn.gB)("/cart");
        };
      };
      const Pn = (e) => async (t, r) => {
        const n = r();
        return (0, z.r7)(n).useBuyWithPointsScript ? t(Tn(e)) : t(Sn(e));
      };
      function On(e, t, r) {
        let { rewardId: n, variantId: a } = r;
        e.error.message && (0, at.Ag)(e.error.message)
          ? t(
              (0, yt.WH)({
                error: {
                  name: e.error.message || e.error.type,
                  affectedVariants: a ? [a] : [],
                },
                id: n,
              })
            )
          : t(
              (0, yt.WH)({
                error: { name: e.error.message ?? e.error.type },
                id: n,
              })
            );
      }
      const Rn = (e) => {
          let {
            handleSelect: t,
            outOfStockVariantIds: r,
            selectedVariantId: a,
            targetProducts: o,
          } = e;
          return n.createElement(
            "div",
            {
              className: (0, i.c)(
                "redeem-reward-modal__free-product-variant-selector"
              ),
            },
            n.createElement(
              "select",
              {
                className: (0, i.c)("select"),
                id: "product-variant-selector",
                value: a,
                onChange: t,
              },
              o.map((e) =>
                n.createElement(
                  "option",
                  {
                    key: `${e.id ?? ""}--${e.variant_id ?? ""}`,
                    value: e.variant_id?.toString(),
                  },
                  e.title,
                  e.variant_id && r.includes(e.variant_id.toString())
                    ? ` - ${(0, w.t)(
                        "ui.dashboard.redeem_points.out_of_stock"
                      )}`
                    : ""
                )
              )
            )
          );
        },
        Fn = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(ot.rq),
            o = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            l = Boolean(r && r !== t.id),
            s = r === t.id,
            c = (0, a.v9)(ot.Sg),
            [d, m] = (0, n.useState)(
              Ft.T.must(t.target_products[0].variant_id).toString()
            ),
            u = (0, a.I0)(),
            p = (0, n.useCallback)(() => {
              u((0, yt.l)());
            }, [u]),
            _ = (0, n.useCallback)(() => {
              u(Pn({ rewardId: t.id, variantId: d.toString() })).catch((e) =>
                G.k.error("failed to redeem reward", { err: e })
              );
            }, [u, t.id, d]),
            h = (0, n.useCallback)((e) => {
              e.persist(), m(e.target.value);
            }, []);
          if (o && (0, at.sH)(o.name))
            return n.createElement(on, {
              i18nKey: "ui.dashboard.redeem_points.too_many_requests",
            });
          if (o && !(0, at.Ag)(o.name)) return n.createElement(on, null);
          if (c && c.id === t.id)
            return n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__content-item") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__success-message"),
                },
                n.createElement(S.N, {
                  i18nKey:
                    "ui.dashboard.redeem_points.bwp_product_success_message",
                }),
                " ",
                n.createElement(S.N, {
                  i18nKey:
                    "ui.dashboard.redeem_points.bwp_product_instructions",
                })
              )
            );
          const f = t.target_products,
            g = o?.affectedVariants ? o.affectedVariants : [],
            y = g.includes(d);
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__confirm-box") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__confirm-summary"),
                },
                (0, ft.zD)(t)
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)(
                    "redeem-reward-modal__confirm-summary-extra"
                  ),
                },
                n.createElement(S.N, {
                  i18nKey:
                    "ui.dashboard.redeem_points.free_product_extra_confirm_text",
                })
              ),
              f.length > 1 &&
                n.createElement(Rn, {
                  handleSelect: h,
                  selectedVariantId: d,
                  outOfStockVariantIds: g,
                  targetProducts: f,
                }),
              y
                ? n.createElement(nn, {
                    handleClick: lt.Z,
                    disabled: !0,
                    labelI18nKey: "ui.dashboard.redeem_points.out_of_stock",
                    submitting: !1,
                    buttonKind: rn.Cancel,
                  })
                : n.createElement(
                    "div",
                    {
                      className: (0, i.ok)(
                        "redeem-reward-modal__button-container"
                      ),
                    },
                    n.createElement(nn, {
                      handleClick: p,
                      disabled: !1,
                      labelI18nKey: "ui.general.not_now",
                      submitting: !1,
                      buttonKind: rn.Cancel,
                    }),
                    n.createElement(nn, {
                      handleClick: _,
                      disabled: l,
                      labelI18nKey: "ui.general.yes",
                      submitting: s,
                      buttonKind: rn.Confirm,
                    })
                  )
            )
          );
        },
        qn = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(ot.rq),
            o = (0, a.v9)(we.Pp),
            l = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            s = Boolean(r && r !== t.id),
            c = r === t.id,
            d = (0, a.v9)(ot.Sg),
            m = "shopify" === (0, a.v9)(Q.wq),
            u = (0, a.I0)(),
            p = () => u((0, yt.l)()),
            _ = () => u((0, yt.vF)({ rewardId: t.id })),
            h = (0, at.Dw)(t);
          if (l) return n.createElement(on, null);
          if (d && d.id === t.id) {
            if (!o || "voucher" !== o.redeemable.redeemable_type)
              throw new rt(
                "Rendering claimed reward success requires a Claimed Reward"
              );
            return n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__content") },
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__summary") },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.voucher_success_message",
                }),
                " ",
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.rewards_page_info",
                })
              ),
              m &&
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)("redeem-reward-modal__summary-extra"),
                  },
                  n.createElement(S.N, {
                    i18nKey:
                      "ui.dashboard.redeem_points.product_shopify_redeem_instructions",
                  })
                ),
              n.createElement(
                "div",
                { className: (0, i.ok)("redeem-reward-modal__code-container") },
                n.createElement(Nr, { code: o.redeemable.code })
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__button-container"),
                },
                h &&
                  n.createElement(
                    "a",
                    {
                      href: h,
                      className: (0, i.ok)(
                        "action-button",
                        "action-button--fixed-width",
                        "redeem-reward-modal__button",
                        "redeem-reward-modal__button--margin-right"
                      ),
                    },
                    n.createElement(S.N, {
                      i18nKey: "ui.dashboard.redeem_points.view_product",
                    })
                  ),
                n.createElement(
                  "a",
                  {
                    href: "/cart",
                    className: (0, i.ok)(
                      "action-button",
                      "action-button--fixed-width",
                      "redeem-reward-modal__button",
                      "redeem-reward-modal__button--margin-left"
                    ),
                  },
                  n.createElement(S.N, { i18nKey: "ui.general.go_to_cart" })
                )
              )
            );
          }
          return n.createElement(
            "div",
            { className: (0, i.ok)("redeem-reward-modal__content") },
            n.createElement(
              "div",
              { className: (0, i.ok)("redeem-reward-modal__confirm-box") },
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__confirm-summary"),
                },
                (0, ft.zD)(t)
              ),
              n.createElement(
                "div",
                {
                  className: (0, i.ok)("redeem-reward-modal__button-container"),
                },
                n.createElement(nn, {
                  handleClick: p,
                  disabled: !1,
                  labelI18nKey: "ui.general.not_now",
                  submitting: !1,
                  buttonKind: rn.Cancel,
                }),
                n.createElement(nn, {
                  handleClick: _,
                  disabled: s,
                  labelI18nKey: "ui.general.yes",
                  submitting: c,
                  buttonKind: rn.Confirm,
                })
              )
            )
          );
        },
        Hn = () => async (e, t) => {
          const r = t(),
            n = (0, _._V)(r);
          if (!n) throw new Error("Customer not found in state");
          const a = (0, In.v)(r) ?? n.merchantId,
            o = hn.H.buildFromState(r, e),
            l = await o.customers.fetchRechargeAddresses({ merchantId: a });
          if ("error" in l)
            return (function (e, t, r) {
              let { merchantId: n } = r;
              t(
                (0, Pe.WP)({
                  error: { name: e.error.message ?? e.error.type },
                  merchantId: n,
                })
              );
            })(l, e, { merchantId: a });
          e((0, Pe.Ks)({ addresses: l.addresses }));
        },
        An = (e) => {
          let { rewardId: t, variantId: r, addressId: n } = e;
          return async (e, a) => {
            const o = a();
            if (null !== (0, ot.rq)(o)) return;
            const l = (0, ft.kL)(o, t);
            if (!l) throw new bn.w("Claiming a reward requires a reward");
            if ("subscription_buy_with_points" !== l.kind)
              throw new gn(
                "Redeeming a subscription free product reward must be used with a subscriptionBuyWithPoints reward"
              );
            e((0, yt.bn)(t));
            const i = (0, _._V)(o);
            if (!i) throw new Error("Customer not found in state");
            const s = (0, In.v)(o) ?? i.merchantId,
              c = hn.H.buildFromState(o, e),
              d = (0, En.Wu)(o) ?? void 0,
              m = (0, Cn.OY)(i.merchantId),
              u = l.target_products
                .find((e) => e.variant_id === (0, _n.pU)(r))
                ?.id?.toString();
            if (!u) throw new gn("No valid target product found for reward");
            const p = await c.customers.redeemSubscriptionBuyWithPointsReward({
              customerMerchantId: s,
              customerAddressId: n,
              rewardId: t,
              attribution: m,
              emailTrackingId: d,
              product: { variantId: r, productId: u },
            });
            if ("error" in p) return On(p, e, { rewardId: t, variantId: r });
            e((0, yt.AG)({ id: t, action: p.action }));
          };
        },
        Mn = (e) => {
          let { handleSelect: t, selectedAddressId: r, addresses: a } = e;
          return n.createElement(
            "div",
            {
              className: (0, i.c)(
                "redeem-reward-modal__reward-option-selector"
              ),
            },
            n.createElement(
              "select",
              {
                id: "recharge-address-selector",
                className: (0, i.c)("select"),
                value: r ?? void 0,
                onChange: t,
              },
              a.map((e) =>
                n.createElement(
                  "option",
                  { key: e.id, value: e.id },
                  (function (e) {
                    return [e.address1, e.address2, e.city, e.province]
                      .filter((e) => e)
                      .join(", ");
                  })(e)
                )
              )
            )
          );
        };
      const Dn = (e) => {
          let { reward: t } = e;
          const r = (0, a.I0)(),
            o = (0, a.v9)(ot.rq),
            l = o === t.id,
            s = null !== o && o !== t.id,
            c = t.target_products,
            [d, m] = (0, n.useState)(Ft.T.must(c[0].variant_id).toString()),
            u = (0, a.v9)(Re.Jy),
            [p, _] = (0, n.useState)(u ? u[0].id : null),
            h = (0, n.useCallback)(() => {
              const e = d;
              if (!p)
                throw new Error("A recharge address must have been selected");
              r(An({ rewardId: t.id, variantId: e, addressId: p })).catch((e) =>
                G.k.error("failed to redeem reward", { err: e })
              );
            }, [r, t.id, d, p]),
            f = (0, a.v9)((e) => (0, ot.KF)(e, t.id)),
            g = (0, a.v9)(E.lH),
            y = (0, a.v9)((e) => e.integrations.recharge.error),
            b = (0, a.v9)(ot.Sg);
          return (
            (0, n.useEffect)(() => {
              r(Hn());
            }, [r]),
            (0, n.useEffect)(() => {
              u && _(u[0].id);
            }, [u]),
            f && (0, at.C5)(f.name)
              ? n.createElement(on, {
                  i18nKey:
                    "ui.dashboard.redeem_points.recharge_onetime_customer_not_found",
                })
              : f || y
              ? n.createElement(on, null)
              : b && b.id === t.id
              ? n.createElement(
                  "div",
                  { className: (0, i.c)("redeem-reward-modal__content-item") },
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "redeem-reward-modal__success-message"
                      ),
                    },
                    n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.redeem_points.bwp_product_success_message",
                    }),
                    n.createElement(
                      "span",
                      { className: (0, i.c)("redeem-reward-modal__spacer") },
                      " "
                    ),
                    n.createElement(S.N, {
                      i18nKey:
                        "ui.dashboard.redeem_points.recharge_onetime_product_instructions",
                      params: {
                        delivery_schedule_link: `https://${g.domain}/tools/recurring/login`,
                      },
                    })
                  )
                )
              : n.createElement(
                  "div",
                  { className: (0, i.c)("redeem-reward-modal__content") },
                  n.createElement(
                    "div",
                    { className: (0, i.c)("redeem-reward-modal__confirm-box") },
                    n.createElement(
                      "div",
                      {
                        className: (0, i.c)(
                          "redeem-reward-modal__confirm-summary"
                        ),
                      },
                      (0, ft.zD)(t),
                      n.createElement(
                        "span",
                        { className: (0, i.c)("redeem-reward-modal__spacer") },
                        " "
                      ),
                      n.createElement(S.N, {
                        i18nKey:
                          "ui.dashboard.redeem_points.recharge_onetime_confirm",
                      })
                    )
                  ),
                  n.createElement(
                    "form",
                    {
                      className: (0, i.c)(
                        "redeem-reward-modal__reward-select-options"
                      ),
                    },
                    c.length > 1 &&
                      n.createElement(
                        "div",
                        { className: (0, i.c)("redeem-reward-modal__option") },
                        n.createElement(S.o.label, {
                          i18nKey: "ui.dashboard.redeem_points.product_variant",
                          htmlFor: "product-variant-selector",
                        }),
                        n.createElement(Rn, {
                          handleSelect: (e) => m(e.target.value),
                          selectedVariantId: d,
                          outOfStockVariantIds: [],
                          targetProducts: c,
                        })
                      ),
                    n.createElement(
                      "div",
                      { className: (0, i.c)("redeem-reward-modal__option") },
                      n.createElement(S.o.label, {
                        i18nKey: "ui.dashboard.redeem_points.shipping_address",
                        htmlFor: "recharge-address-selector",
                      }),
                      n.createElement(Mn, {
                        handleSelect: (e) => _((0, _n.pU)(e.target.value)),
                        addresses: u ?? [],
                        selectedAddressId: p,
                      })
                    )
                  ),
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "redeem-reward-modal__button-container"
                      ),
                    },
                    n.createElement(nn, {
                      handleClick: () => r((0, yt.l)()),
                      disabled: !1,
                      labelI18nKey: "ui.general.not_now",
                      submitting: !1,
                      buttonKind: rn.Cancel,
                    }),
                    n.createElement(nn, {
                      handleClick: h,
                      disabled: s || !p,
                      labelI18nKey: "ui.general.yes",
                      submitting: l,
                      buttonKind: rn.Confirm,
                    })
                  )
                )
          );
        },
        Vn = () => {
          const e = (0, a.v9)(ft.fk),
            t = (0, a.v9)((e) => e.rewards.redeemRewardModalClosing),
            r = (0, a.I0)(),
            o = () => r((0, yt.l)());
          return n.createElement(
            pr.u,
            {
              className: (0, i.ok)(
                "redeem-reward-modal",
                e && `redeem-reward-modal--${(0, W.Kh)(e.kind)}`
              ),
              size: "small",
              isOpen: !t && null !== e,
              title:
                e &&
                n.createElement("span", {
                  dangerouslySetInnerHTML: { __html: e.title },
                }),
              onCloseClick: o,
              onBackgroundClick: o,
            },
            e ? n.createElement(jn, { reward: e }) : null
          );
        },
        jn = (e) => {
          let { reward: t } = e;
          switch (t.kind) {
            case "cart_discount_voucher":
              return n.createElement(sn, { reward: t });
            case "active_subscription_discount_voucher":
              return n.createElement(ln, { reward: t });
            case "gift_card":
              return n.createElement(pn, { reward: t });
            case "product_cart":
              return n.createElement(Fn, { reward: t });
            case "product_discount_voucher":
              return n.createElement(qn, { reward: t });
            case "collection_discount_voucher":
              return n.createElement(cn, { reward: t });
            case "free_shipping_voucher":
              return n.createElement(un, { reward: t });
            case "custom":
              return n.createElement(mn, { reward: t });
            case "subscription_buy_with_points":
              return n.createElement(Dn, { reward: t });
            default:
              return (
                G.k.error(`Unable to render modal for reward kind: ${t.kind}`, {
                  reward: t,
                }),
                null
              );
          }
        },
        Bn = () => {
          const e = (0, a.I0)(),
            t = (0, a.v9)(ft.vy),
            r = () => e((0, yt.Ki)());
          return n.createElement(
            pr.u,
            {
              isOpen: null !== t,
              title:
                t &&
                n.createElement("span", {
                  dangerouslySetInnerHTML: { __html: t.title },
                }),
              onCloseClick: r,
              onBackgroundClick: r,
              className: (0, i.ok)("redeem-reward-modal"),
            },
            n.createElement(
              "div",
              { className: (0, i.ok)("reward-description-modal-content") },
              t ? n.createElement(Ln, { reward: t }) : null
            )
          );
        },
        Ln = (e) => {
          let { reward: t } = e;
          return t.description
            ? n.createElement(n.Fragment, null, t.description)
            : "cart_discount_voucher" === t.kind
            ? n.createElement(wr, { kind: "long", reward: t })
            : null;
        },
        Un = (e, t) => e.replace(/[^0-9]/g, "").slice(0, t),
        zn = (e) => {
          let { isSubmitting: t, submitError: r, locale: a, submit: o } = e;
          const [l, s] = (0, n.useState)({
            day: { touched: !1, error: !1, value: "" },
            month: { touched: !1, error: !1, value: "" },
            year: { touched: !1, error: !1, value: "" },
            submit: { touched: !1, error: !1, errorMsg: "" },
          });
          return n.createElement(
            "form",
            {
              className: (0, i.ok)("birthday-entry-form"),
              onSubmit: (e) => {
                if (
                  (e.preventDefault(),
                  e.persist(),
                  !l.month.value || !l.day.value || !l.year.value)
                )
                  return;
                if (t) return;
                if (
                  (s((e) => ({ ...e, submit: { ...e.submit, touched: !0 } })),
                  l.day.error || l.month.error || l.year.error)
                )
                  return;
                const r = new Date(
                  Date.UTC(
                    Ft.T.must((0, _n.pU)(l.year.value)),
                    Ft.T.must((0, _n.pU)(l.month.value)),
                    Ft.T.must((0, _n.pU)(l.day.value))
                  )
                );
                if (!(0, j.OF)(r))
                  return s((e) => ({
                    ...e,
                    submit: {
                      ...e.submit,
                      error: !0,
                      errorMsg: "Please enter a date in the past",
                    },
                  }));
                o(r.toISOString().replace(/T.*$/, ""));
              },
            },
            n.createElement(
              "div",
              { className: (0, i.ok)("birthday-entry-form__inputs") },
              n.createElement(
                "select",
                {
                  className: (0, i.ok)(
                    "select",
                    "birthday-entry-form__select",
                    "birthday-entry-form__select--month",
                    l.month.touched && l.month.error
                      ? "birthday-entry-form__select--error"
                      : ""
                  ),
                  value: l.month.value,
                  onChange: (e) => {
                    e.persist(),
                      s((t) => ({
                        ...t,
                        month: {
                          ...t.month,
                          value: e.target.value,
                          error: !(0, j.O1)({ month: e.target.value }),
                          touched: !0,
                        },
                        day: {
                          ...t.day,
                          error: !(0, j.gB)({
                            day: t.day.value,
                            month: e.target.value,
                            year: t.year.value,
                          }),
                        },
                      }));
                  },
                },
                "" === l.month.value
                  ? n.createElement(
                      "option",
                      { key: "-1", value: "" },
                      (0, w.t)("ui.dashboard.earn_points.birthday.month")
                    )
                  : null,
                (0, j.Dj)(a).map((e, t) =>
                  n.createElement("option", { key: t, value: t }, (0, W.fp)(e))
                )
              ),
              n.createElement("input", {
                className: (0, i.ok)(
                  l.day.touched && l.day.error
                    ? "birthday-entry-form__input--error"
                    : "",
                  "birthday-entry-form__input",
                  "birthday-entry-form__input--day"
                ),
                type: "text",
                placeholder: (0, w.t)("ui.dashboard.earn_points.birthday.day"),
                value: l.day.value,
                onChange: (e) => {
                  e.persist(),
                    s((t) => ({
                      ...t,
                      day: {
                        ...t.day,
                        value: Un(e.target.value, 2),
                        error:
                          !!t.year.touched &&
                          !(0, j.gB)({
                            day: e.target.value,
                            month: t.month.value,
                            year: t.year.value,
                          }),
                        touched: !0,
                      },
                    }));
                },
              }),
              n.createElement("input", {
                className: (0, i.ok)(
                  "birthday-entry-form__input",
                  "birthday-entry-form__input--year",
                  l.year.touched && l.year.error
                    ? "birthday-entry-form__input--error"
                    : ""
                ),
                type: "text",
                placeholder: (0, w.t)("ui.dashboard.earn_points.birthday.year"),
                value: l.year.value,
                onChange: (e) => {
                  e.persist(),
                    s((t) => ({
                      ...t,
                      year: {
                        ...t.year,
                        value: Un(e.target.value, 4),
                        error: !(0, j.LA)({ year: e.target.value }),
                        touched: !0,
                      },
                      day: {
                        ...t.day,
                        error: !(0, j.gB)({
                          day: t.day.value,
                          month: t.month.value,
                          year: e.target.value,
                        }),
                      },
                    }));
                },
              })
            ),
            n.createElement(
              "div",
              {
                className: (0, i.ok)(
                  "birthday-entry-form__invalid-message",
                  (l.submit.touched && l.submit.error) || r
                    ? "birthday-entry-form__invalid-message--visible"
                    : ""
                ),
              },
              r && "api_error" === r.type
                ? "Sorry, something went wrong"
                : l.submit.error
                ? l.submit.errorMsg
                : "Please enter a valid date"
            ),
            n.createElement(
              "button",
              {
                type: "submit",
                className: (0, i.ok)(
                  "action-button",
                  "action-modal__button",
                  t ? "action-button--loading" : "",
                  "birthday-entry-form__submit-button"
                ),
              },
              n.createElement(S.N, {
                i18nKey: "defaults.rules.birthday.save_button_text",
              })
            )
          );
        },
        Wn = (0, a.$j)(
          (e) => ({
            customer: (0, _._V)(e),
            isSubmitSuccess: e.loyaltyPanel.isCustomerBirthdaySubmitSuccess,
            isSubmitting: e.loyaltyPanel.isCustomerBirthdaySubmitting,
            submitError: e.loyaltyPanel.customerBirthdaySubmitError,
            locale: (0, L.fN)(e),
          }),
          { reset: Y.yv, submit: Y.n }
        )((e) => {
          let {
            reset: t,
            submit: r,
            isSubmitSuccess: a,
            isSubmitting: o,
            customer: l,
            rule: s,
            submitError: c,
            locale: d,
          } = e;
          if (
            ((0, n.useEffect)(
              () => () => {
                t();
              },
              []
            ),
            l?.birthday && !a)
          ) {
            const e = (0, j.QF)({
                birthday: l.birthday,
                birthdaySetAt: l.birthdaySetAt,
              }),
              t =
                0 === e
                  ? "Happy birthday!"
                  : n.createElement(S.N, {
                      i18nKey: "defaults.rules.birthday.description",
                      params: { days_count: e, smart_count: s.value },
                    });
            return n.createElement(
              "div",
              { className: (0, i.ok)("birthday-action") },
              t
            );
          }
          return n.createElement(
            "div",
            { className: (0, i.ok)("birthday-action") },
            !a &&
              n.createElement(
                "div",
                { className: (0, i.ok)("birthday-action__help") },
                n.createElement(S.N, {
                  i18nKey: "defaults.rules.birthday.action_help_text",
                  params: { points: s.value },
                })
              ),
            a
              ? n.createElement(
                  "div",
                  { className: (0, i.ok)("birthday-action__success") },
                  n.createElement(S.N, {
                    i18nKey: "defaults.rules.birthday.success_text",
                    params: { points: s.value },
                  })
                )
              : n.createElement(zn, {
                  isSubmitting: o,
                  submitError: c,
                  submit: r,
                  locale: d,
                })
          );
        }),
        Gn = (e) => {
          let { rule: t } = e;
          const r = (0, a.v9)(L.fN);
          if (!(0, $.cQ)(t)) return null;
          const o = B(t.limitInterval, r, { unitOnly: !0 });
          return n.createElement(
            "div",
            { className: (0, i.c)("action-modal__limit-reached") },
            n.createElement(S.N, {
              i18nKey: "ui.dashboard.earn_points.completed_already",
            }),
            n.createElement(S.N, {
              i18nKey: "ui.dashboard.earn_points.complete_again_in",
              params: { duration: `<strong>${o}</strong>` },
            })
          );
        },
        Yn = (e) => {
          let { rule: t, siteId: r } = e;
          const o = (0, a.v9)((e) => (0, u.Et)(e, r));
          if (!o) throw new Error(`Could not find site ${r}`);
          return (0, $.cQ)(t)
            ? n.createElement(Gn, { rule: t })
            : n.createElement(
                "div",
                { className: (0, i.ok)("go-to-other-site-action") },
                n.createElement(
                  "a",
                  {
                    className: (0, i.ok)(
                      "action-button",
                      "action-modal__button",
                      "go-to-other-site-action__button"
                    ),
                    href: o.url,
                  },
                  n.createElement(S.N, {
                    i18nKey: "ui.dashboard.earn_points.go_to_other_site.action",
                    params: { store_name: o.name },
                  })
                )
              );
        };
      class Zn extends n.PureComponent {
        render() {
          return n.createElement(
            "div",
            { className: (0, i.ok)("referral-action") },
            n.createElement(
              "a",
              {
                className: (0, i.ok)(
                  "action-button",
                  "referral-action__button"
                ),
                onClick: this.handleClick,
              },
              n.createElement(S.N, {
                i18nKey: "ui.dashboard.menu.refer_friends",
              })
            )
          );
        }
        constructor(...e) {
          super(...e),
            (this.handleClick = (e) => {
              e.preventDefault(),
                this.props.closeModal(),
                this.props.changePage("refer");
            });
        }
      }
      const Qn = (0, a.$j)(null, { changePage: Y.oO, closeModal: Y.XI })(Zn),
        Xn = () =>
          n.createElement(
            "div",
            { className: (0, i.ok)("action-modal__description") },
            "'Thanks for creating an account!'"
          ),
        Jn = (e) => {
          let { rule: t } = e;
          return t.description && 0 !== t.description.length
            ? n.createElement("div", {
                className: (0, i.ok)("action-modal__description"),
                dangerouslySetInnerHTML: { __html: t.description },
              })
            : null;
        },
        ea = (e) => {
          let { rule: t } = e;
          const r = (0, a.v9)(_._V),
            o = (0, a.I0)(),
            l = (0, n.useCallback)(
              (e) => o(Y.Go({ id: t.id, properties: e })),
              [o, t.id]
            ),
            i = !!r && r.completedRules.some((e) => e.ruleId === t.id);
          if (!t.isForCurrentSite)
            return n.createElement(Yn, { rule: t, siteId: t.siteId });
          switch (t.kind) {
            case "facebookLike":
              return n.createElement(ae, {
                completed: i,
                onTrigger: l,
                url: t.properties.facebookLikeUrl,
              });
            case "twitterFollow":
              return n.createElement(ie, {
                completed: i,
                onTrigger: l,
                username: t.properties.twitterHandle,
                social_name: "twitter",
              });
            case "instagramFollow":
              return n.createElement(ie, {
                completed: i,
                onTrigger: l,
                username: t.properties.instagramHandle,
                social_name: "instagram",
              });
            case "clickthrough":
              return n.createElement(ne, {
                completed: i,
                onTrigger: l,
                url: t.properties.clickthroughDestinationUrl,
              });
            case "birthday":
              return n.createElement(Wn, { rule: t });
            case "newsletterSignup":
              return n.createElement(le, { rule: t, completed: i });
            case "signup":
              return n.createElement(Xn, null);
            case "custom":
              return null;
            case "referral":
              return n.createElement(Qn, null);
          }
          return (0, $.cQ)(t) ? n.createElement(Gn, { rule: t }) : null;
        },
        ta = () => {
          const e = (0, a.v9)(_._V),
            t = (0, a.v9)($.RF),
            r = (0, a.I0)(),
            o = () => r(Y.XI());
          return n.createElement(
            pr.u,
            {
              isOpen: null !== t,
              onCloseClick: o,
              onBackgroundClick: o,
              title: t?.displayTitle,
              className: (0, i.ok)("modal--rule-action"),
            },
            t &&
              n.createElement(
                n.Fragment,
                null,
                !e ||
                  (function (e, t) {
                    switch (e.kind) {
                      case "instagramPostHashtag":
                      case "instagramTagImage":
                        return Boolean(t.instagramId);
                      default:
                        return !0;
                    }
                  })(t, e)
                  ? n.createElement(Jn, { rule: t })
                  : null,
                n.createElement(ea, { rule: t })
              )
          );
        };
      const ra = () => {
        const e = (0, a.v9)(_.M4);
        return n.createElement(
          n.Fragment,
          null,
          n.createElement(
            b,
            null,
            e
              ? n.createElement(rr, { mode: "modal" })
              : n.createElement(ur, { mode: "modal" })
          ),
          n.createElement(tn, null),
          n.createElement(Bn, null),
          e &&
            n.createElement(
              n.Fragment,
              null,
              n.createElement(ta, null),
              n.createElement(Ir, null),
              n.createElement(Hr, null),
              n.createElement(Vn, null)
            ),
          n.createElement(zr, null),
          n.createElement(Vr, null)
        );
      };
      var na = r(6571),
        aa = r(4494);
      function oa(e) {
        return (0, aa.qh)(e)
          .map((e) => {
            let [t, r] = e;
            return r ? `--${t}: ${r};` : "";
          })
          .filter((e) => e.length > 0)
          .join("\n");
      }
      function la(e) {
        switch (e) {
          case "account_history":
            return "sdk.integrated_page.account_history.header";
          case "available_rewards":
            return "sdk.integrated_page.available_rewards.header";
          case "earn":
            return "sdk.integrated_page.earn.header";
          case "redeem":
            return "sdk.integrated_page.redeem.header";
          case "tiers_overview":
            return "sdk.integrated_page.tiers_overview.header";
          case "faq":
            return "sdk.integrated_page.faq.header";
        }
      }
      function ia(e) {
        const t =
          e.dataset.lionIntegratedPageSectionSettings ??
          e.dataset.lionAppStylesSettings ??
          "";
        if (t.length > 0)
          try {
            return JSON.parse(t);
          } catch (e) {
            G.k.warn("Failed to parse data-lion-section-settings", {
              err: e,
              sectionSettings: t,
            });
          }
        return {};
      }
      var sa = r(2126);
      function ca(e, t) {
        const r = new Map();
        for (const [n, a] of (0, aa.qh)(t)) {
          const t = da[n];
          if (t && void 0 !== a)
            for (const [n, o] of (0, aa.qh)(t(a, e))) o && r.set(n, o);
        }
        return (0, aa.sq)(r);
      }
      const da = {
          show_heading: null,
          primary_color: (e) => ({ "lion-primary-color": e }),
          secondary_color: (e) => ({ "lion-secondary-color": e }),
          icon_color: (e) => ({ "lion-icon-color": e }),
          button_border_radius: (e) => ({
            "lion-button-border-radius": `${e}px`,
          }),
          button_neutral_background_color: (e) => ({
            "lion-button-neutral-background-color": e,
            "lion-button-neutral-hover-background-color": sa.O.lighten(e, 8),
            "lion-button-neutral-active-background-color": sa.O.lighten(e, 8),
            "lion-button-neutral-active-shadow-color": sa.O.darken(e, 10),
          }),
          button_neutral_text_color: (e) => ({
            "lion-button-neutral-text-color": e,
          }),
          button_primary_background_color: (e) => ({
            "lion-button-primary-background-color": e,
            "lion-button-primary-hover-background-color": sa.O.lighten(e, 8),
            "lion-button-primary-active-background-color": sa.O.lighten(e, 8),
            "lion-button-primary-active-shadow-color": sa.O.darken(e, 8),
            "lion-button-tile-text-color": sa.O.darken(e, 35),
          }),
          button_primary_text_color: (e) => ({
            "lion-button-primary-text-color": e,
          }),
          button_size: (e) => ({
            "lion-button-font-size": {
              small: "0.8em",
              medium: "1em",
              large: "1.2em",
            }[e],
            "lion-button-padding": {
              small: "4px 15px",
              medium: "7px 18px",
              large: "9px 21px",
            }[e],
          }),
          section_background_color: (e) => ({
            "lion-section-background-color": e,
          }),
          section_border_color: (e) => ({ "lion-section-border-color": e }),
          section_border_radius: (e) => ({
            "lion-section-border-radius": `${e}px`,
          }),
          section_border_width: (e) => ({
            "lion-section-border-width": `${e}px`,
          }),
          section_grid_gap: (e) => ({ "lion-section-grid-gap": `${e}px` }),
          section_grid_columns_max: (e) => ({
            "lion-section-grid-columns": e.toString(),
          }),
          section_tile_background_color: (e) => ({
            "lion-tile-background-color": e,
          }),
          section_tile_border_color: (e) => ({ "lion-tile-border-color": e }),
          section_tile_border_width: (e) => ({
            "lion-tile-border-width": `${e}px`,
          }),
          heading_alignment: (e) => ({
            "lion-section-heading-text-align": {
              center: "center",
              left: "left",
              right: "right",
            }[e],
          }),
          heading_font_color: (e) => ({ "lion-section-heading-text-color": e }),
          heading_font_size: (e) => ({
            "lion-section-heading-font-size": `${e}px`,
          }),
          heading_line_color: (e) => ({ "lion-section-heading-line-color": e }),
          heading_line_size: (e) => ({
            "lion-section-heading-line-size": `${e}px`,
          }),
          heading_margin_bottom: (e) => ({
            "lion-section-heading-margin": `0 0 ${e}px 0`,
          }),
          show_pending_points: null,
          show_welcome_text: null,
          navigation_menu_show: null,
          background_color: (e) => ({ "lion-header-background-color": e }),
          navigation_menu_icons_show: (e) => ({
            "lion-header-nav-link-icon-display": e ? "inline-block" : "none",
          }),
          navigation_menu_link_accent_color: (e) => ({
            "lion-header-nav-link-accent-color": e,
            "lion-header-nav-link-border-color": sa.O.scale(e, { alpha: -80 }),
            "lion-header-nav-link-hover-border-color": sa.O.scale(e, {
              alpha: -60,
            }),
            "lion-header-nav-link-hover-background-color": sa.O.scale(e, {
              alpha: -95,
            }),
            "lion-header-nav-link-hover-icon-color": e,
            "lion-header-nav-link-hover-text-color": sa.O.darken(e, 30),
          }),
        },
        ma = (e) => {
          let { element: t } = e;
          const r = ca("app_styles", ia(t));
          return (
            (0, n.useEffect)(() => {
              t.innerHTML = `#loyaltylion, .lion-isolator { ${oa(r)} }`;
            }, [t, r]),
            null
          );
        };
      function ua(e) {
        return e.getAttribute("data-lion-class") || "";
      }
      var pa = r(2092),
        _a = r(1408);
      (0, k.P1)(z.qb, Ot.Au, (e, t) =>
        e.sections.filter((e) => "tiersOverview" !== e.kind || t)
      );
      const ha = (e) => {
        let { block: t, section: r } = e;
        const o = (function (e) {
          const t = (0, a.v9)((t) =>
              ((e, t) =>
                (0, z.qb)(e).sections.find(
                  (e) =>
                    e.kind ===
                    (function (e) {
                      switch (e) {
                        case "account_history":
                          return "accountHistory";
                        case "available_rewards":
                          return "availableRewards";
                        case "tiers_overview":
                          return "tiersOverview";
                        case "earn":
                        case "header":
                        case "redeem":
                          return e;
                        case "app_styles":
                          return null;
                        case "faq":
                          return "faq";
                      }
                    })(t)
                ) ?? null)(t, e)
            ),
            r = { background: "", element: "h3", className: void 0 };
          if (!t?.options || !("headingOptions" in t.options)) return r;
          return { ...r, ...t.options.headingOptions };
        })(r);
        return n.createElement(
          "div",
          {
            className: (0, i.c)(
              `${t}__heading`,
              "integrated-page-section__heading",
              o.className
            ),
            style: o.background ? { background: o.background } : void 0,
          },
          n.createElement(
            o.element,
            { className: (0, i.c)("integrated-page-section__heading-text") },
            n.createElement(S.N, { i18nKey: la(r) })
          ),
          n.createElement("div", {
            className: (0, i.c)("integrated-page-section__heading-underline"),
          })
        );
      };
      const fa = (e) => {
        let { id: t, block: r, children: a } = e;
        return n.createElement(
          "div",
          {
            "data-lion-integrated-page-section-id": t,
            className: (0, i.c)(r, "integrated-page-section"),
          },
          a
        );
      };
      function ga(e) {
        let { section: t, settings: r, selectors: a } = e;
        const o = ca(t, r);
        if (0 === Object.keys(o).length) return null;
        const l = a
          ? (0, Rt.VS)(a, (e) => [`#loyaltylion ${e}`, `.lion-isolator ${e}`])
          : ["#loyaltylion", ".lion-isolator"];
        return n.createElement("style", {
          type: "text/css",
          "data-lion-section-configuration": t,
          dangerouslySetInnerHTML: {
            __html: `\n          ${l.join(", ")} {\n            ${oa(
              o
            )}\n          }\n        `,
          },
        });
      }
      const ya = (e) => {
          let { id: t, settings: r } = e;
          const o = "account-history";
          return (0, a.v9)(_.M4)
            ? n.createElement(
                n.Fragment,
                null,
                n.createElement(ga, {
                  section: "account_history",
                  settings: r,
                  selectors: [".lion-account-history"],
                }),
                n.createElement(
                  fa,
                  { id: t, block: o },
                  r.show_heading &&
                    n.createElement(ha, {
                      section: "account_history",
                      block: o,
                    }),
                  n.createElement(Ne, { mode: "integrated" })
                )
              )
            : null;
        },
        ba = (e) => {
          let { id: t, settings: r } = e;
          if (!(0, a.v9)(_._V)) return null;
          const o = "available-rewards";
          return n.createElement(
            n.Fragment,
            null,
            n.createElement(ga, {
              section: "available_rewards",
              settings: r,
              selectors: [".lion-available-rewards"],
            }),
            n.createElement(
              fa,
              { id: t, block: o },
              r.show_heading &&
                n.createElement(ha, { section: "available_rewards", block: o }),
              n.createElement(_t, {
                mode: "integrated",
                hideUsed: !0,
                hideVoid: !0,
              })
            )
          );
        },
        va = (e) => {
          let { id: t, settings: r } = e;
          const a = "earn";
          return n.createElement(
            n.Fragment,
            null,
            n.createElement(ga, {
              section: "earn",
              settings: r,
              selectors: [".lion-earn"],
            }),
            n.createElement(
              fa,
              { id: t, block: a },
              r.show_heading &&
                n.createElement(ha, { section: "earn", block: a }),
              n.createElement(he, { mode: "integrated" })
            )
          );
        };
      var Ea = r(8094),
        wa = r(7759),
        ka = r(6043);
      const Na = (e) => {
          let { node: t, elementsProps: r = {}, textsProps: a = {} } = e;
          return (0, ka.BM)(t)
            ? n.createElement(wa.t, { text: t, textsProps: a }, t.text)
            : n.createElement(
                Ea.O,
                { element: t, elementsProps: r },
                t.children.map((e, t) =>
                  n.createElement(Na, {
                    node: e,
                    key: t,
                    elementsProps: r,
                    textsProps: a,
                  })
                )
              );
        },
        Ca = (e) => {
          let { nodes: t, elementsProps: r, textsProps: a } = e;
          return n.createElement(
            n.Fragment,
            null,
            t.map((e, t) =>
              n.createElement(Na, {
                node: e,
                key: t,
                elementsProps: r,
                textsProps: a,
              })
            )
          );
        },
        xa = () => {
          const e = (0, a.v9)(z.VN);
          return n.createElement(
            "div",
            { className: (0, i.ok)("faq-list") },
            n.createElement(
              "ul",
              { className: (0, i.ok)("faq-list__wrapper") },
              e.map((e, t) =>
                n.createElement(
                  "li",
                  { key: t, className: (0, i.ok)("faq-list__item") },
                  n.createElement(
                    "details",
                    { className: (0, i.ok)("faq-list__question") },
                    n.createElement(
                      "summary",
                      { className: (0, i.ok)("faq-list__question-summary") },
                      n.createElement(
                        "h3",
                        { className: (0, i.ok)("faq-list__question-header") },
                        e.header
                      ),
                      n.createElement("div", {
                        className: (0, i.ok)("faq-list__question-icon"),
                      })
                    ),
                    n.createElement(
                      "div",
                      { className: (0, i.ok)("faq-list__question-answer") },
                      n.createElement(Ca, { nodes: e.answer })
                    )
                  )
                )
              )
            )
          );
        },
        Sa = (e) => {
          let { id: t, settings: r } = e;
          return n.createElement(
            n.Fragment,
            null,
            n.createElement(ga, {
              section: "faq",
              settings: r,
              selectors: [".lion-faq"],
            }),
            n.createElement(
              fa,
              { id: t, block: "faq" },
              r.show_heading &&
                n.createElement(
                  n.Fragment,
                  null,
                  n.createElement(ha, { section: "faq", block: "faq" }),
                  n.createElement(
                    "header",
                    { className: (0, i.c)("faq-list__description") },
                    n.createElement(S.N, {
                      i18nKey: "sdk.integrated_page.faq.description",
                    })
                  )
                ),
              n.createElement(xa, null)
            )
          );
        },
        Ia = (e) => {
          let { id: t, settings: r } = e;
          const o = (0, a.v9)(_.M4);
          return "legacy" === (0, d.T)()
            ? null
            : n.createElement(
                n.Fragment,
                null,
                n.createElement(ga, {
                  section: "header",
                  settings: r,
                  selectors: [".lion-header"],
                }),
                n.createElement(
                  fa,
                  { id: t, block: "header" },
                  o
                    ? n.createElement($a, { settings: r })
                    : n.createElement(Ta, null)
                )
              );
        },
        $a = (e) => {
          let { settings: t } = e;
          const r = (0, a.v9)(z.FP),
            o = (0, a.v9)(_.H5),
            { name: l } = (0, a.v9)(u.LI),
            s = r?.loyalty_page_header["member_state.menu.show_menu"] ?? !0;
          return n.createElement(
            n.Fragment,
            null,
            t.show_welcome_text &&
              n.createElement(
                "div",
                { className: (0, i.c)("header__intro-text") },
                n.createElement(S.N, {
                  i18nKey: "sdk.integrated_page.welcome_member.intro_text",
                  params: { program_name: l },
                })
              ),
            n.createElement(
              "div",
              { className: (0, i.c)("header__your-points") },
              n.createElement(S.N, {
                i18nKey: "sdk.integrated_page.welcome_member.you_have_points",
                params: { smart_count: o.pointsTotal },
              })
            ),
            t.show_pending_points &&
              n.createElement(
                "div",
                { className: (0, i.c)("header__pending-points") },
                n.createElement(S.N, {
                  i18nKey: "sdk.integrated_page.welcome_member.pending",
                  params: { points: o.pointsPending },
                })
              ),
            s && n.createElement(Ka, null)
          );
        },
        Ka = () => {
          const e = (0, a.v9)((e) => e.page.integratedPageSections),
            t = (0, a.v9)(p.MP),
            [r, o] = (0, n.useState)([]);
          return (
            (0, n.useEffect)(() => {
              const t = [];
              document
                .querySelectorAll("div[data-lion-integrated-page-section-id]")
                .forEach((r) => {
                  const n = r.dataset.lionIntegratedPageSectionId;
                  if (!n) return;
                  const a = Object.values(e).find((e) => e.id === n);
                  a && t.push({ element: r, section: a.kind });
                }),
                o(t);
            }, [e]),
            0 === r.length
              ? null
              : n.createElement(
                  "nav",
                  { className: (0, i.c)("header__nav") },
                  r.map((e, r) => {
                    if ("header" === e.section || "app_styles" === e.section)
                      return null;
                    return n.createElement(S.o.a, {
                      key: r,
                      i18nKey: la(e.section),
                      className: (0, i.c)(
                        "header__nav-link",
                        `header__nav-link--${(0, W.ST)(e.section)}`
                      ),
                      onClick: () => {
                        const { element: r } = e;
                        let n = r.getBoundingClientRect().top + window.scrollY;
                        "editor" === t && (n -= 50),
                          window.scrollTo({ top: n, behavior: "smooth" });
                      },
                    });
                  })
                )
          );
        },
        Ta = () => {
          const e = (0, a.v9)(z.FP),
            t = (0, a.v9)($.Ce),
            { urls: r } = (0, a.v9)(z.r7),
            { name: o } = (0, a.v9)(u.LI),
            l =
              e?.loyalty_page_header["guest_state.layout.show_intro_text"] ??
              !0;
          return n.createElement(
            n.Fragment,
            null,
            l &&
              n.createElement(S.o.div, {
                className: (0, i.c)("header__join-today"),
                i18nKey:
                  t > 0
                    ? "sdk.integrated_page.welcome_guest.join_with_incentive"
                    : "sdk.integrated_page.welcome_guest.join_without_incentive",
                params: {
                  program_name: o,
                  signup_points: (0, w.t)("ui.general.points_count_raw", {
                    smart_count: t,
                  }),
                },
              }),
            n.createElement(
              "div",
              { className: (0, i.c)("header__join-buttons") },
              n.createElement(
                re.zx,
                { style: "primary", href: r.signup },
                n.createElement(S.o.text, {
                  i18nKey: "sdk.integrated_page.welcome_guest.join_now",
                })
              ),
              n.createElement(
                re.zx,
                { style: "neutral", href: r.login },
                n.createElement(S.o.text, {
                  i18nKey: "sdk.integrated_page.welcome_guest.log_in",
                })
              )
            )
          );
        },
        Pa = (e) => {
          let { id: t, settings: r } = e;
          const a = "redeem";
          return n.createElement(
            n.Fragment,
            null,
            n.createElement(ga, {
              section: "redeem",
              settings: r,
              selectors: [".lion-redeem"],
            }),
            n.createElement(
              fa,
              { id: t, block: a },
              r.show_heading &&
                n.createElement(ha, { section: "redeem", block: a }),
              n.createElement(xt, { mode: "integrated" })
            )
          );
        },
        Oa = (e) => {
          let { tier: t } = e;
          return n.createElement(
            "ul",
            {
              className: (0, i.ok)(
                "tier-box__benefits-list",
                "tier-benefits-list"
              ),
            },
            t.benefits.map((e) =>
              n.createElement(
                "li",
                {
                  key: e.id,
                  className: (0, i.ok)(
                    "tier-box__benefit",
                    "tier-benefits-list__item"
                  ),
                },
                e.content
              )
            )
          );
        },
        Ra = (e) => {
          let { currency: t, tier: r, tiersMode: a } = e;
          if (r.default || r.conditions)
            return n.createElement(
              "div",
              { className: (0, i.ok)("tier-box__sub-title") },
              !r.conditions &&
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.tiers.start_here",
                })
            );
          switch (a) {
            case "points":
              return n.createElement(
                "div",
                { className: (0, i.ok)("tier-box__sub-title") },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.tiers.reach_points",
                  params: { amount: r.bounds.lower },
                })
              );
            case "spend":
              return n.createElement(
                "div",
                { className: (0, i.ok)("tier-box__sub-title") },
                n.createElement(S.N, {
                  i18nKey: "ui.dashboard.tiers.spend_amount",
                  params: { amount: (0, X.pY)(t, null, r.bounds.lower / 100) },
                })
              );
          }
        },
        Fa = (0, a.$j)((e) => ({ currency: (0, E.j)(e) }))((e) => {
          let { currency: t, tier: r, tiersMode: a } = e;
          return n.createElement(
            "div",
            { className: (0, i.ok)("tier-box__header") },
            n.createElement(
              "div",
              { className: (0, i.ok)("tier-box__position") },
              r.number
            ),
            n.createElement("div", {
              className: (0, i.ok)("tier-box__accent"),
              style: r.colour ? { backgroundColor: r.colour } : {},
            }),
            n.createElement(
              "div",
              { className: (0, i.ok)("tier-box__title") },
              r.name
            ),
            n.createElement(Ra, { currency: t, tier: r, tiersMode: a })
          );
        }),
        qa = (e) => {
          let { tier: t } = e;
          const r = (0, a.v9)($.J5),
            o = r?.configurations.find((e) => e.tierId === t.id);
          return r && o
            ? n.createElement(
                "div",
                { className: (0, i.ok)("tier-box__purchase-rule") },
                n.createElement(J, {
                  className: (0, i.ok)("tier-box__purchase-rule-points"),
                  isPerUnit: !0,
                  points: o.value,
                })
              )
            : null;
        },
        Ha = (0, a.$j)((e, t) => ({
          hasCustomer: Boolean((0, _._V)(e)),
          tiersMode: (0, u.SN)(e).loyaltyTiersMode,
          tier: (0, Ot.By)(e, t.tierId),
          nextTier: (0, Ot.F9)(e, t.tierId),
        }))((e) => {
          let {
            className: t,
            hasCustomer: r,
            tiersMode: a,
            nextTier: o,
            tier: l,
          } = e;
          return l
            ? n.createElement(
                "div",
                {
                  className:
                    (0, i.ok)(`tier-box tier-box--${l.position}`, {
                      "tier-box--guest": !r,
                      "tier-box--previous": l.isPrevious,
                      "tier-box--current": l.isCurrent,
                      "tier-box--next": l.isNext,
                    }) + ` ${t || ""}`,
                },
                n.createElement(Fa, { tier: l, tiersMode: a }),
                n.createElement(qa, { tier: l }),
                n.createElement(Oa, { tier: l }),
                n.createElement(Dt, { tier: l, nextTier: o, tiersMode: a })
              )
            : null;
        }),
        Aa = (0, a.$j)((e) => {
          const t = Boolean((0, _._V)(e));
          return (0, Ot.Au)(e)
            ? { tierIds: (0, Ot.eS)(e), hasCustomer: t }
            : (G.k.warn(
                "Invalid Tiers: tiers are either disabled or all hidden"
              ),
              { tierIds: [], hasCustomer: t });
        })((e) => {
          let { className: t, hasCustomer: r, tierIds: a } = e;
          return n.createElement(
            "div",
            {
              className:
                (0, i.ok)("tier-overview", { "tier-overview--guest": !r }) +
                ` ${t || ""}`,
            },
            a.map((e) => n.createElement(Ha, { key: e, tierId: e }))
          );
        }),
        Ma = (e) => {
          let { id: t, settings: r } = e;
          const a = "tiers-overview";
          return n.createElement(
            n.Fragment,
            null,
            n.createElement(ga, {
              section: "tiers_overview",
              settings: r,
              selectors: [".lion-tiers-overview"],
            }),
            n.createElement(
              fa,
              { id: t, block: a },
              r.show_heading &&
                n.createElement(ha, { section: "tiers_overview", block: a }),
              n.createElement(Aa, null)
            )
          );
        };
      function Da(e) {
        let { section: t, settings: r } = e;
        const o = (0, a.I0)(),
          l = (function (e) {
            const t = (0, a.v9)(Ot.Au),
              r = (0, a.v9)(_.M4);
            switch (e) {
              case "tiers_overview":
                return t;
              case "account_history":
              case "available_rewards":
                return r;
              case "earn":
              case "header":
              case "redeem":
              case "faq":
                return !0;
              case "app_styles":
                return !1;
            }
          })(t),
          [i] = (0, n.useState)(() => _a.V.v4());
        if (
          ((0, n.useEffect)(() => {
            l && o((0, pa.zM)({ id: i, kind: t, settings: r }));
          }, [o, i, t, r, l]),
          !l)
        )
          return null;
        const s = (function (e) {
          switch (e) {
            case "earn":
              return va;
            case "redeem":
              return Pa;
            case "header":
              return Ia;
            case "account_history":
              return ya;
            case "faq":
              return Sa;
            case "available_rewards":
              return ba;
            case "tiers_overview":
              return Ma;
            case "app_styles":
              return null;
          }
        })(t);
        return s ? n.createElement(s, { id: i, settings: r }) : null;
      }
      const Va = (e) => {
          let { className: t } = e;
          const r = (0, a.v9)(_.M4),
            o = (0, a.v9)((e) => (0, z.qb)(e).sections).filter(
              (e) => !1 !== e.options.visible
            ),
            l = (0, n.useMemo)(
              () =>
                o.map((e, t) => n.createElement(ja, { key: t, section: e })),
              [o]
            );
          return n.createElement(
            "div",
            {
              className: (0, i.c)(t, "integrated-page", {
                "integrated-page--guest": !r,
                "integrated-page--authenticated": r,
              }),
            },
            l
          );
        },
        ja = (e) => {
          let { section: t } = e;
          switch (t.kind) {
            case "accountHistory":
              return n.createElement(Da, {
                section: "account_history",
                settings: { show_heading: t.options.showHeading },
              });
            case "availableRewards":
              return n.createElement(Da, {
                section: "available_rewards",
                settings: { show_heading: t.options.showHeading },
              });
            case "earn":
              return n.createElement(Da, {
                section: "earn",
                settings: { show_heading: t.options.showHeading },
              });
            case "redeem":
              return n.createElement(Da, {
                section: "redeem",
                settings: { show_heading: t.options.showHeading },
              });
            case "tiersOverview":
              return n.createElement(Da, {
                section: "tiers_overview",
                settings: { show_heading: t.options.showHeading },
              });
            case "faq":
              return n.createElement(Da, {
                section: "faq",
                settings: { show_heading: t.options.showHeading },
              });
            case "header": {
              const { options: e } = t;
              return n.createElement(Da, {
                section: "header",
                settings: {
                  navigation_menu_show: e.showMenu,
                  show_pending_points: e.showPendingPoints,
                  show_welcome_text: e.showIntroText,
                },
              });
            }
          }
        },
        Ba = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(Va, { className: r })
          );
        };
      var La;
      !(function (e) {
        (e.Primary = "#4d384b"), (e.Secondary = "#126bbf");
      })(La || (La = {}));
      var Ua = {
          appStyles: {
            embedSection: "main",
            schema: {
              name: "LoyaltyLion Styles SDK",
              target: "head",
              available_if:
                "{{ app.metafields.loyaltylion.feature__shopify_app_blocks }}",
              settings: [
                {
                  type: "header",
                  content: "Colors",
                  info: "Applied to general UI elements that do not have their own explicit color setting",
                },
                {
                  label: "Primary color",
                  id: "primary_color",
                  type: "color",
                  default: La.Primary,
                  info: "Used for primary UI elements such as borders",
                },
                {
                  label: "Secondary color",
                  id: "secondary_color",
                  type: "color",
                  default: La.Secondary,
                  info: "Used for secondary UI elements such as accents or backgrounds",
                },
                {
                  label: "Icon color",
                  id: "icon_color",
                  type: "color",
                  default: La.Secondary,
                  info: "Used for icon lines and backgrounds",
                },
                {
                  type: "header",
                  content: "Buttons",
                  info: "Applied to all buttons within LoyaltyLion sections and components",
                },
                {
                  label: "Button size",
                  id: "button_size",
                  type: "select",
                  default: "medium",
                  options: [
                    { value: "small", label: "Small" },
                    { value: "medium", label: "Medium" },
                    { value: "large", label: "Large" },
                  ],
                },
                {
                  label: "Rounded corners",
                  id: "button_border_radius",
                  type: "range",
                  min: 0,
                  max: 20,
                  step: 1,
                  unit: "px",
                  default: 4,
                },
                {
                  label: "Call to action background",
                  id: "button_primary_background_color",
                  type: "color",
                  default: La.Primary,
                },
                {
                  label: "Call to action text",
                  id: "button_primary_text_color",
                  type: "color",
                  default: "#ffffff",
                  info: "Call to action buttons are used for key activities, such as claiming a reward",
                },
                {
                  label: "Default background",
                  id: "button_neutral_background_color",
                  type: "color",
                  default: "#757575",
                },
                {
                  label: "Default text",
                  id: "button_neutral_text_color",
                  type: "color",
                  default: "#ffffff",
                  info: "Default buttons are used for any other action",
                },
              ],
            },
          },
          embeddedSdk: {
            embedSection: "sdk",
            includeLiquid:
              '\n    <script>\n      {% # theme-check-disable %}\n      !function(t,n){function o(n){var o=t.getElementsByTagName("script")[0],i=t.createElement("script");i.src=n,i.crossOrigin="",o.parentNode.insertBefore(i,o)}if(!n.isLoyaltyLion){window.loyaltylion=n,void 0===window.lion&&(window.lion=n),n.version=2,n.isLoyaltyLion=!0;var i=new Date,e=i.getFullYear().toString()+i.getMonth().toString()+i.getDate().toString();o("${SDK_HOST}/static/2/loader.js?t="+e);var r=!1;n.init=function(t){if(r)throw new Error("Cannot call lion.init more than once");r=!0;var a=n._token=t.token;if(!a)throw new Error("Token must be supplied to lion.init");for(var l=[],s="_push configure bootstrap shutdown on removeListener authenticateCustomer".split(" "),c=0;c<s.length;c+=1)!function(t,n){t[n]=function(){l.push([n,Array.prototype.slice.call(arguments,0)])}}(n,s[c]);o("${SDK_HOST}/sdk/start/"+a+".js?t="+e+i.getHours().toString()),n._initData=t,n._buffer=l}}}(document,window.loyaltylion||[]);\n      {% if shop.metafields.loyaltylion.token != nil %}\n        {% if customer != nil and customer.has_account %}\n          {% assign date = \'now\' | date: "%Y-%m-%d %H:%M:%S%z" %}\n          {% assign auth_token =\n            customer.id | append: date | append: customer.email | append: shop.metafields.loyaltylion.secret | sha1 %}\n          loyaltylion.init({\n            token: "{{ shop.metafields.loyaltylion.token }}",\n            customer: {\n              id: "{{ customer.id }}",\n              email: "{{ customer.email }}",\n              name: "{{ customer.name }}",\n              rechargeHash: "{{ customer.metafields.subscriptions.customer_string | if: customer.metafields.subscriptions.customer_string }}"\n            },\n            auth: {\n              date: "{{ date }}",\n              token: "{{ auth_token }}"\n            },\n          });\n        {% else %}\n          loyaltylion.init(\n            { token: "{{ shop.metafields.loyaltylion.token }}" }\n          );\n        {% endif %}\n      {% endif %}\n\n      loyaltylion.configure({\n        disableBundledCSS: {{ block.settings.disableBundledCSS }},\n        disableBundledFonts: {{ block.settings.disableBundledFonts }},\n        useClassIsolator: {{ block.settings.useClassIsolator }},\n      })\n      \n      {% # theme-check-enable %}\n    </script>\n  ',
            schema: {
              name: "LoyaltyLion SDK",
              target: "head",
              settings: [
                { type: "header", content: "Documentation" },
                {
                  type: "paragraph",
                  content:
                    "If you're unsure about any of these settings, please see our [developer documentation](https://developers.loyaltylion.com/sdk/).",
                },
                { type: "header", content: "Settings" },
                {
                  label: "Disable bundled CSS",
                  id: "disableBundledCSS",
                  type: "checkbox",
                  default: !1,
                  info: "Prevents our default styles from loading entirely, so you can start from a completely blank slate.",
                },
                {
                  label: "Disable bundled fonts",
                  id: "disableBundledFonts",
                  type: "checkbox",
                  default: !1,
                  info: "Disables loading our default font.",
                },
                {
                  label: "Use class isolator",
                  id: "useClassIsolator",
                  type: "checkbox",
                  default: !1,
                  info: "Uses class-based isolation instead of isolating by #loyaltylion.",
                },
              ],
            },
          },
        },
        za = "{{ app.metafields.loyaltylion.feature__shopify_app_blocks }}",
        Wa = {
          sectionGridGap: {
            label: "Grid gap",
            id: "section_grid_gap",
            type: "range",
            min: 0,
            max: 40,
            step: 1,
            unit: "px",
            default: 20,
            info: "Space between individual tiles within the section",
          },
          sectionGridMaxColumns: {
            label: "Grid max columns",
            id: "section_grid_columns_max",
            type: "range",
            min: 1,
            max: 5,
            step: 1,
            default: 5,
            info: "The maximum tiles per row on the section grid",
          },
          sectionBorderRadius: {
            label: "Rounded corners",
            id: "section_border_radius",
            type: "range",
            min: 0,
            max: 30,
            step: 1,
            unit: "px",
            default: 6,
          },
          sectionBackgroundColor: {
            label: "Background color",
            id: "section_background_color",
            type: "color",
            default: "#fafafa",
          },
          sectionBorderWidth: {
            label: "Border size",
            id: "section_border_width",
            type: "range",
            min: 0,
            max: 10,
            step: 1,
            unit: "px",
            default: 0,
          },
          sectionBorderColor: {
            label: "Border color",
            id: "section_border_color",
            type: "color",
            default: "#e0e3e5",
          },
          sectionTileBackgroundColor: {
            label: "Background color",
            id: "section_tile_background_color",
            type: "color",
            default: "#ffffff",
          },
          sectionTileBorderWidth: {
            label: "Border size",
            id: "section_tile_border_width",
            type: "range",
            min: 0,
            max: 10,
            step: 1,
            unit: "px",
            default: 0,
          },
          sectionTileBorderColor: {
            label: "Border color",
            id: "section_tile_border_color",
            type: "color",
            default: "#e0e3e5",
          },
        },
        Ga = {
          show: {
            label: "Show heading",
            id: "show_heading",
            type: "checkbox",
            default: !0,
          },
          fontSize: {
            label: "Heading font size",
            id: "heading_font_size",
            type: "range",
            min: 20,
            max: 40,
            step: 1,
            unit: "px",
            default: 28,
          },
          fontColor: {
            label: "Heading font color",
            id: "heading_font_color",
            type: "color",
            default: "#777777",
          },
          alignment: {
            label: "Heading alignment",
            id: "heading_alignment",
            type: "select",
            default: "center",
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
          margin: {
            label: "Heading margin",
            id: "heading_margin_bottom",
            type: "range",
            min: 0,
            max: 50,
            step: 1,
            unit: "px",
            default: 20,
            info: "Space between the heading and the content inside the section",
          },
          lineSize: {
            label: "Heading line size",
            id: "heading_line_size",
            type: "range",
            min: 0,
            max: 5,
            step: 1,
            unit: "px",
            default: 1,
            info: "Size of the horizontal line behind the heading",
          },
          lineColor: {
            label: "Heading line color",
            id: "heading_line_color",
            type: "color",
            default: "#e3e3e3",
            info: "Color of the horizontal line behind the heading",
          },
        };
      const Ya = [
        "app_styles",
        "account_history",
        "available_rewards",
        "earn",
        "header",
        "redeem",
        "tiers_overview",
        "faq",
      ];
      const Za = {
        ...{
          app_styles: Ua.appStyles,
          embedded_sdk: Ua.embeddedSdk,
          earn: {
            integratedPageSection: "earn",
            schema: {
              name: "Earn points",
              target: "section",
              available_if: za,
              settings: [
                { type: "header", content: "Heading" },
                Ga.show,
                Ga.fontSize,
                Ga.fontColor,
                Ga.lineSize,
                Ga.lineColor,
                Ga.alignment,
                Ga.margin,
                { type: "header", content: "Layout" },
                Wa.sectionGridGap,
                Wa.sectionGridMaxColumns,
                Wa.sectionBorderRadius,
                Wa.sectionBackgroundColor,
                Wa.sectionBorderWidth,
                Wa.sectionBorderColor,
                { type: "header", content: "Tiles" },
                Wa.sectionTileBackgroundColor,
                Wa.sectionTileBorderWidth,
                Wa.sectionTileBorderColor,
              ],
            },
          },
          redeem: {
            integratedPageSection: "redeem",
            schema: {
              name: "Rewards",
              target: "section",
              available_if: za,
              settings: [
                { type: "header", content: "Heading" },
                Ga.show,
                Ga.fontSize,
                Ga.fontColor,
                Ga.lineSize,
                Ga.lineColor,
                Ga.alignment,
                Ga.margin,
                { type: "header", content: "Layout" },
                Wa.sectionGridGap,
                Wa.sectionGridMaxColumns,
                Wa.sectionBorderRadius,
                Wa.sectionBackgroundColor,
                Wa.sectionBorderWidth,
                Wa.sectionBorderColor,
                { type: "header", content: "Tiles" },
                Wa.sectionTileBackgroundColor,
                Wa.sectionTileBorderWidth,
                Wa.sectionTileBorderColor,
              ],
            },
          },
          available_rewards: {
            integratedPageSection: "available_rewards",
            schema: {
              name: "Available rewards",
              target: "section",
              available_if: za,
              settings: [
                { type: "header", content: "Heading" },
                Ga.show,
                Ga.fontSize,
                Ga.fontColor,
                Ga.lineSize,
                Ga.lineColor,
                Ga.alignment,
                Ga.margin,
              ],
            },
          },
          account_history: {
            integratedPageSection: "account_history",
            schema: {
              name: "History",
              target: "section",
              available_if: za,
              settings: [
                { type: "header", content: "Heading" },
                Ga.show,
                Ga.fontSize,
                Ga.fontColor,
                Ga.lineSize,
                Ga.lineColor,
                Ga.alignment,
                Ga.margin,
              ],
            },
          },
          tiers_overview: {
            integratedPageSection: "tiers_overview",
            schema: {
              name: "Tiers overview",
              target: "section",
              available_if: za,
              settings: [
                { type: "header", content: "Heading" },
                Ga.show,
                Ga.fontSize,
                Ga.fontColor,
                Ga.lineSize,
                Ga.lineColor,
                Ga.alignment,
                Ga.margin,
              ],
            },
          },
          header: {
            integratedPageSection: "header",
            schema: {
              name: "Header and navigation",
              target: "section",
              available_if: za,
              settings: [
                {
                  label: "Show welcome text",
                  id: "show_welcome_text",
                  type: "checkbox",
                  default: !0,
                  info: "Display a short welcome message underneath the program name. The text can be customised in your LoyaltyLion languages page",
                },
                {
                  label: "Show pending points",
                  id: "show_pending_points",
                  type: "checkbox",
                  default: !0,
                  info: "Display the number of pending points a customer has underneath their total points",
                },
                { type: "header", content: "Navigation menu" },
                {
                  label: "Show navigation menu",
                  id: "navigation_menu_show",
                  type: "checkbox",
                  default: !0,
                  info: "Display a navigation menu, which allows users to quickly jump to any section on the page",
                },
                {
                  label: "Show menu icons",
                  id: "navigation_menu_icons_show",
                  type: "checkbox",
                  default: !0,
                },
                {
                  label: "Link accent color",
                  id: "navigation_menu_link_accent_color",
                  type: "color",
                  default: "#4d384b",
                  info: "Accent color for navigation menu links",
                },
                { type: "header", content: "Layout" },
                {
                  label: "Background color",
                  id: "background_color",
                  type: "color",
                  default: "#fdfdfd",
                },
              ],
            },
          },
        },
        faq: {
          integratedPageSection: "faq",
          schema: {
            name: "FAQ",
            target: "section",
            settings: [
              { type: "header", content: "Heading" },
              {
                label: "Show heading",
                id: "show_heading",
                type: "checkbox",
                default: !0,
              },
            ],
          },
        },
      };
      function Qa(e, t) {
        const r = Za[e].schema.settings
            .map((e) => ("id" in e ? e.id : null))
            .filter(or.C_),
          n = Object.keys(t),
          a = [];
        for (const e of n) r.includes(e) || a.push(e);
        return (
          a.length > 0 &&
            G.k.warn("Unexpected app block setting keys", {
              block: e,
              knownSettingIds: r,
              unknownIds: a,
            }),
          t
        );
      }
      const Xa = (e) => {
          let { element: t, section: r } = e;
          const a = ia(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(Da, { section: r, settings: Qa(r, a) })
          );
        },
        Ja = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(Ne, { mode: "integrated", className: r })
          );
        },
        eo = (0, a.$j)((e) => ({ guest: !(0, _._V)(e) }))((e) => {
          let { guest: t } = e;
          const r = t
            ? "https://loyaltylion.com/healthandwellness?utm_source=Poweredby&utm_medium=healthwellness&utm_campaign=loggedout"
            : "https://loyaltylion.com/healthandwellness?utm_source=Poweredby&utm_medium=healthwellness&utm_campaign=loggedin";
          return n.createElement(
            "div",
            { className: ar()((0, i.ok)("powered-by")) },
            n.createElement(
              "a",
              { href: r, target: "_blank", rel: "noreferrer" },
              "Powered by LoyaltyLion"
            )
          );
        }),
        to = (e) => {
          let { element: t } = e;
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(eo, null)
          );
        },
        ro = (e) => {
          let { element: t } = e;
          const r = "true" === t.getAttribute("data-hide-used")?.toString(),
            a = "true" === t.getAttribute("data-hide-void")?.toString();
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(_t, {
              mode: "integrated",
              hideUsed: r,
              hideVoid: a,
            })
          );
        };
      var no = r(5392);
      const ao = (e) => {
          let { className: t, reward: r, variantId: o } = e;
          const l = (0, a.v9)(Q.qk),
            s = (0, a.v9)((e) => (0, wn.GP)(e, o)),
            c = (0, a.v9)((e) => (0, u.pm)(e) && !(0, wn.xR)(e)),
            d = (0, a.v9)((e) => (0, wn.LT)(e, o)),
            m = (0, a.v9)(no.h),
            p = (0, a.v9)(ot.rq),
            _ = (0, n.useRef)(null),
            h = (0, a.I0)(),
            f = (0, n.useCallback)(async (e) => h(Pn(e)), [h]),
            g = m >= r.point_cost,
            y = "started" !== l || c || s || d || !g,
            b = r.id === p,
            v = !y && !b,
            E = ar()(
              (0, i.c)("in-cart-reward__button", "action-button", {
                "action-button--loading": b,
                "action-button--disabled": y && !b,
                "action-button--redeemed": s,
              }),
              t || !1,
              !!y && "disabled"
            );
          return n.createElement(
            "button",
            {
              ref: _,
              className: E,
              onClick: (e) => {
                (async (e) => {
                  if ((e.preventDefault(), v)) {
                    if ((await f({ rewardId: r.id, variantId: o }), !_.current))
                      throw new Error("buttonRef is null");
                    (0, kn.j)({
                      event: "seamlessProductReward:complete",
                      payload: _.current,
                    });
                  }
                })(e).catch((e) => {
                  G.k.error("InCartRewardButton.handleClick failed", {
                    err: e,
                  });
                });
              },
              "data-lion-inactive": y || null,
              "data-lion-active": v || null,
              "data-lion-redeemed": s || null,
              "data-lion-working": b || null,
              disabled: y || void 0,
            },
            n.createElement(oo, {
              canAfford: g,
              disabledAlreadyRedeemed: s,
              disabledNeedPaidItems: c,
              outOfStock: d,
              pointCost: r.point_cost,
              points: m,
            })
          );
        },
        oo = (e) => {
          let {
            canAfford: t,
            disabledAlreadyRedeemed: r,
            disabledNeedPaidItems: a,
            outOfStock: o,
            pointCost: l,
            points: i,
          } = e;
          if (r)
            return n.createElement(S.N, {
              i18nKey: "sdk.seamless_product_reward.already_redeemed",
            });
          if (a)
            return n.createElement(S.N, {
              i18nKey: "sdk.seamless_product_reward.paid_items_required",
            });
          if (t)
            return o
              ? n.createElement(S.N, {
                  i18nKey: "ui.dashboard.redeem_points.out_of_stock",
                })
              : n.createElement(S.N, {
                  i18nKey: "sdk.seamless_product_reward.buy_with_points",
                  params: { points: l },
                });
          {
            const e = l - i;
            return n.createElement(S.N, {
              i18nKey: "sdk.seamless_product_reward.need_more_points",
              params: { points: e, total_cost: l },
            });
          }
        },
        lo = (e) => {
          let { element: t, providedProductId: r } = e;
          const o = ua(t),
            l = t.getAttribute("data-variant-id")?.toString() ?? null,
            i = (0, a.v9)((e) => (0, ft.E2)(e, r)),
            s = (0, a.v9)((e) => (0, ft.tn)(e, l));
          if (!r)
            return (
              G.k.info("Buy with points button requires a product id"), null
            );
          if (l && !s)
            return (
              G.k.info(
                `Buy with points button found but no matching reward for variant id: ${l}`
              ),
              null
            );
          if (0 === i.length)
            return (
              G.k.info(
                `Buy with points button found but no matching reward for product id: ${r}`
              ),
              null
            );
          const [c, d] = (() => {
            if (l && s) return [s, l];
            (i.length > 1 || i[0].target_products.length > 1) &&
              G.k.info(
                `Multiple potential buy with points rewards or variants found for productId: ${r}, please specify a variantId with data-variant-id to accurately select reward`
              );
            const e = i[0];
            return [
              e,
              Ft.T.must(e.target_products[0].variant_id?.toString(10)),
            ];
          })();
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(ao, { className: o, reward: c, variantId: d })
          );
        },
        io = (e) => {
          let { targetProducts: t, value: r, onChange: a } = e;
          return n.createElement(
            "select",
            {
              className: (0, i.ok)(
                "in-cart-rewards-widget-item__variant-selector"
              ),
              onChange: a,
              value: r,
            },
            t.map((e) =>
              n.createElement(
                "option",
                {
                  key: `${e.id ?? ""}--${e.variant_id ?? ""}`,
                  value: e.variant_id?.toString(),
                },
                e.title
              )
            )
          );
        },
        so = (e) => {
          let { reward: t } = e;
          const r = (0, a.v9)(E.j),
            o = (0, a.v9)(Q.HO),
            [l, s] = (0, n.useState)(
              Ft.T.must(t.target_products[0].variant_id).toString()
            ),
            c = t.target_products[0];
          return void 0 === c.id
            ? null
            : n.createElement(
                "div",
                { className: (0, i.c)("in-cart-rewards-widget-item") },
                n.createElement(
                  "div",
                  {
                    className: (0, i.c)("in-cart-rewards-widget-item__picture"),
                  },
                  n.createElement("img", {
                    src: c.image_url,
                    alt: `Photo of ${t.title}`,
                  })
                ),
                n.createElement(
                  "div",
                  { className: (0, i.c)("in-cart-rewards-widget-item__name") },
                  t.title
                ),
                t.target_products.length > 1
                  ? n.createElement(io, {
                      value: l,
                      targetProducts: t.target_products,
                      onChange: (e) => s(e.target.value),
                    })
                  : null,
                n.createElement("div", {
                  className: (0, i.c)("in-cart-rewards-widget-item__cost"),
                  dangerouslySetInnerHTML: { __html: (0, ft.nI)(t, r, o) },
                }),
                n.createElement(
                  "div",
                  {
                    className: (0, i.c)("in-cart-rewards-widget-item__button"),
                  },
                  n.createElement(ao, { reward: t, variantId: l })
                )
              );
        },
        co = (e) => {
          let { className: t } = e;
          const r = (0, a.v9)(ft.Cr),
            [o, l] = (0, n.useState)(0),
            s = r.length - 1;
          return (
            (0, n.useEffect)(() => {
              (0, kn.j)({ event: "redemptionWidget:rendered" });
            }),
            0 === r.length
              ? null
              : n.createElement(
                  "div",
                  {
                    className:
                      (0, i.c)("in-cart-rewards-widget") + (t ? ` ${t}` : ""),
                  },
                  n.createElement(
                    "div",
                    {
                      className: (0, i.c)(
                        "in-cart-rewards-widget__rewards-slider"
                      ),
                      style: { left: -1 * o * 100 + "%" },
                    },
                    r.map((e) => n.createElement(so, { reward: e, key: e.id }))
                  ),
                  n.createElement(
                    "a",
                    {
                      className: (0, i.c)(
                        "in-cart-rewards-widget__navigator",
                        "in-cart-rewards-widget__navigator--back",
                        { "in-cart-rewards-widget__navigator--hidden": 0 === o }
                      ),
                      onClick: () => l(Math.max(o - 1, 0)),
                    },
                    "‹"
                  ),
                  n.createElement(
                    "a",
                    {
                      className: (0, i.c)(
                        "in-cart-rewards-widget__navigator",
                        "in-cart-rewards-widget__navigator--forward",
                        { "in-cart-rewards-widget__navigator--hidden": o === s }
                      ),
                      onClick: () => l(Math.min(o + 1, s)),
                    },
                    "›"
                  )
                )
          );
        },
        mo = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(co, { className: r })
          );
        },
        uo = (e) => {
          let { element: t } = e;
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(xt, { mode: "integrated" })
          );
        },
        po = (e) => {
          let { element: t } = e;
          const r = ua(t),
            a = t.getAttribute("data-lion-style") || "";
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(he, {
              mode: "integrated",
              requestedStyle: a,
              className: r,
            })
          );
        },
        _o = (0, a.$j)((e) => {
          if (!(0, Ot.Au)(e))
            return (
              G.k.warn(
                "Invalid Tiers: tiers are either disabled or all hidden"
              ),
              { tierName: null }
            );
          const t = (0, _.cQ)(e);
          return (
            t ||
              G.k.warn(
                "Unable to render current-tier-name - customer has no tier"
              ),
            { tierName: t ? t.name : null }
          );
        })((e) => {
          let { className: t, tierName: r } = e;
          return null === r
            ? null
            : n.createElement("span", { className: t }, r);
        }),
        ho = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t },
            n.createElement(_o, { className: r })
          );
        },
        fo = (e) => {
          let { kind: t, tiers: r } = e;
          return n.createElement(
            "thead",
            {
              className: (0, i.ok)(
                "tier-compare__header",
                `tier-compare__header--${t}`
              ),
            },
            n.createElement(
              "tr",
              null,
              n.createElement("th", {
                className: (0, i.ok)("tier-compare__header-cell"),
              }),
              r.map((e) =>
                n.createElement(
                  "th",
                  {
                    key: e.id,
                    className: (0, i.ok)(
                      "tier-compare__header-cell",
                      `tier-compare__header-cell--tier-${e.position}`,
                      { "tier-compare__header-cell--current": e.isCurrent }
                    ),
                  },
                  e.name
                )
              )
            )
          );
        },
        go = (e) => {
          let { enabled: t, color: r } = e;
          return t
            ? n.createElement("div", {
                className: (0, i.ok)(
                  "tier-benefits-compare__benefit-status-circle"
                ),
                style: r ? { backgroundColor: r } : {},
              })
            : n.createElement("div", {
                className: (0, i.ok)(
                  "tier-benefits-compare__benefit-status-cross"
                ),
              });
        },
        yo = (e) => {
          let { benefit: t, tiers: r } = e;
          return n.createElement(
            "tr",
            { className: (0, i.ok)("tier-benefits-compare__row") },
            n.createElement(
              "td",
              {
                className: (0, i.ok)(
                  "tier-benefits-compare__row-cell",
                  "tier-benefits-compare__benefit-text"
                ),
              },
              t.content
            ),
            r.map((e) => {
              const r = t.loyaltyTierIds.includes(e.id);
              return n.createElement(
                "td",
                {
                  key: e.id,
                  className: (0, i.ok)(
                    "tier-benefits-compare__row-cell",
                    `tier-benefits-compare__row-cell--tier-${e.position}`,
                    "tier-benefits-compare__benefit-status",
                    {
                      "tier-benefits-compare__benefit-status--enabled": r,
                      "tier-benefits-compare__benefit-status--current":
                        e.isCurrent,
                    }
                  ),
                },
                n.createElement(go, { enabled: r, color: e.colour })
              );
            })
          );
        },
        bo = (0, a.$j)((e) => ({
          benefits: (0, Ot.cg)(e),
          tiers: (0, Ot.HO)(e),
        }))((e) => {
          let { benefits: t, className: r, tiers: a } = e;
          return n.createElement(
            "div",
            { className: (0, i.ok)("tier-benefits-compare") + ` ${r || ""}` },
            n.createElement(
              "table",
              null,
              n.createElement(fo, { kind: "benefits", tiers: a }),
              n.createElement(
                "tbody",
                null,
                t.map((e) =>
                  n.createElement(yo, { key: e.id, benefit: e, tiers: a })
                )
              )
            )
          );
        }),
        vo = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(bo, { className: r })
          );
        },
        Eo = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(Aa, { className: r })
          );
        };
      const wo = (e) => {
          let { reward: t, tiers: r } = e;
          return n.createElement(
            "tr",
            {
              className: (0, i.ok)(
                "tier-rewards-compare__row",
                `tier-rewards-compare__row--reward-${t.id}`
              ),
            },
            n.createElement(
              "td",
              {
                className: (0, i.ok)(
                  "tier-rewards-compare__row-cell",
                  "tier-rewards-compare__reward-title"
                ),
              },
              n.createElement("span", {
                dangerouslySetInnerHTML: { __html: t.title },
              })
            ),
            r.map((e) =>
              n.createElement(
                "td",
                {
                  key: e.id,
                  className: (0, i.ok)(
                    "tier-rewards-compare__row-cell",
                    `tier-rewards-compare__row-cell--tier-${e.position}`,
                    "tier-rewards-compare__reward-cost",
                    { "tier-rewards-compare__row-cell--current": e.isCurrent }
                  ),
                },
                (function (e, t) {
                  const r = t.rewardOverrides.find((t) => t.rewardId === e.id);
                  return r ? (r.enabled ? r.cost : null) : e.point_cost;
                })(t, e)
              )
            )
          );
        },
        ko = (e) => {
          let { className: t } = e;
          const r = (0, a.v9)(Ot.HO),
            o = (0, a.v9)(ft.O5);
          return n.createElement(
            "div",
            { className: (0, i.ok)("tier-rewards-compare") + ` ${t ?? ""}` },
            n.createElement(
              "table",
              null,
              n.createElement(fo, { kind: "rewards", tiers: r }),
              n.createElement(
                "tbody",
                null,
                o.map((e) =>
                  n.createElement(wo, { key: e.id, tiers: r, reward: e })
                )
              )
            )
          );
        },
        No = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(ko, { className: r })
          );
        },
        Co = (e) => {
          let { rule: t, tiers: r } = e;
          return n.createElement(
            "tr",
            {
              className: (0, i.ok)(
                "tier-rules-compare__row",
                `tier-rules-compare__row--rule-${t.id}`
              ),
            },
            n.createElement(
              "td",
              {
                className: (0, i.ok)(
                  "tier-rules-compare__row-cell",
                  "tier-rules-compare__rule-title"
                ),
              },
              n.createElement("span", {
                dangerouslySetInnerHTML: { __html: t.displayTitle },
              })
            ),
            r.map((e) =>
              n.createElement(
                "td",
                {
                  key: e.id,
                  className: (0, i.ok)(
                    "tier-rules-compare__row-cell",
                    `tier-rules-compare__row-cell--tier-${e.position}`,
                    "tier-rules-compare__rule-value",
                    { "tier-rules-compare__row-cell--current": e.isCurrent }
                  ),
                },
                (function (e, t) {
                  const r = e.configurations.find((e) => e.tierId === t.id);
                  return r ? (r.enabled ? r.value : null) : e.value;
                })(t, e)
              )
            )
          );
        },
        xo = (0, a.$j)((e) => ({ tiers: (0, Ot.HO)(e), rules: (0, $.Kp)(e) }))(
          (e) => {
            let { className: t, rules: r, tiers: a } = e;
            return n.createElement(
              "div",
              { className: (0, i.ok)("tier-rules-compare") + ` ${t || ""}` },
              n.createElement(
                "table",
                null,
                n.createElement(fo, { kind: "rules", tiers: a }),
                n.createElement(
                  "tbody",
                  null,
                  r.map((e) =>
                    n.createElement(Co, { key: e.id, tiers: a, rule: e })
                  )
                )
              )
            );
          }
        ),
        So = (e) => {
          let { element: t } = e;
          const r = ua(t);
          return n.createElement(
            m,
            { node: t, isolate: "if-not-legacy-theme" },
            n.createElement(xo, { className: r })
          );
        },
        Io = (e) => {
          const t = (0, a.v9)(_.M4);
          return n.createElement(
            m,
            { node: e.element, isolate: !0, allowCustomCss: !0 },
            t
              ? n.createElement(rr, { mode: "embed" })
              : n.createElement(ur, { mode: "embed" })
          );
        };
      var $o = r(2209),
        Ko = r(9262);
      const To = (e) => {
          let {
            isAffordable: t,
            isEligible: r,
            hasRedeemed: a,
            costString: o,
          } = e;
          return a
            ? n.createElement(S.N, {
                i18nKey: "sdk.checkout_redemption.remove",
              })
            : r
            ? t
              ? n.createElement(
                  n.Fragment,
                  null,
                  n.createElement(S.N, {
                    i18nKey: "sdk.checkout_redemption.redeem_for",
                  }),
                  n.createElement("span", {
                    dangerouslySetInnerHTML: { __html: o },
                  })
                )
              : n.createElement(S.N, {
                  i18nKey: "sdk.checkout_redemption.insufficient_points",
                })
            : n.createElement(n.Fragment, null, "Redeem");
        },
        Po = (e) => {
          const { isApplying: t, isRemoving: r } = (0, $o.t9)(e);
          return {
            isAffordable: (0, $o.E4)(e),
            currency: (0, E.j)(e),
            localCurrency: (0, Q.HO)(e),
            hasRedeemed: (0, $o.mR)(e),
            redeemPrice: (0, $o.NX)(e),
            isLoading: t || r,
            isEligible: (0, $o.Ap)(e),
          };
        },
        Oo = () => {
          const {
              currency: e,
              localCurrency: t,
              hasRedeemed: r,
              isAffordable: o,
              redeemPrice: l,
              isLoading: i,
              isEligible: s,
            } = (0, a.v9)(Po),
            c = (0, a.I0)(),
            d = (0, n.useCallback)(() => c((0, Ko.k)()), [c]),
            m = (0, n.useCallback)(() => c((0, Ko.Sp)()), [c]),
            u = ` ${(0, X.pY)(e, t, l)}`,
            p = i || !s ? () => {} : r ? d : m,
            _ = i || !s || (!r && !o),
            h = o && s && !r ? "default" : "disabled";
          return n.createElement(
            "button",
            {
              className: ar()("field__input-btn", "btn", `btn--${h}`, {
                "btn--loading": i,
              }),
              onClick: p,
              disabled: _,
            },
            n.createElement(
              "span",
              { className: "btn__content visually-hidden-on-mobile" },
              n.createElement(To, {
                isAffordable: o,
                isEligible: s,
                hasRedeemed: r,
                costString: u,
              })
            ),
            (function (e) {
              let { isLoading: t, hasRedeemed: r } = e;
              return n.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "icon-svg shown-on-mobile",
                  opacity: t ? 0 : 1,
                  style: { transition: "opacity 0.3s" },
                  viewBox: "0 0 14 14",
                  width: "16",
                  height: "16",
                  "aria-hidden": "true",
                  focusable: "false",
                },
                r
                  ? n.createElement("path", {
                      stroke: "white",
                      strokeWidth: "1.7",
                      d: "M0,0 L14,14 M14,0 L0,14",
                    })
                  : n.createElement("use", { xlinkHref: "#arrow" })
              );
            })({ isLoading: i, hasRedeemed: r }),
            n.createElement("i", {
              style: { opacity: i ? 1 : 0 },
              className: "btn__spinner icon icon--button-spinner",
            }),
            n.createElement(
              "svg",
              {
                className:
                  "icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button",
                "aria-hidden": "true",
                focusable: "false",
              },
              n.createElement("use", { xlinkHref: "#spinner-button" })
            )
          );
        };
      const Ro = () => {
          const e = (0, a.v9)(E.j),
            t = (0, a.v9)(Q.HO),
            {
              disabled: r,
              max: o,
              min: l,
              step: i,
              value: s,
              pointsPerUnit: c,
            } = (0, a.v9)($o.PU),
            d = (0, a.I0)(),
            m = (0, n.useCallback)(
              (e) => d(Ko.lk.setRedemptionValue((0, _n.BA)(e.target.value))),
              [d]
            ),
            u = (0, n.useMemo)(() => {
              const r = [];
              for (let a = l; a <= o; a += i)
                r.push(
                  n.createElement(
                    "option",
                    { key: a, value: a },
                    (0, w.t)("sdk.checkout_redemption.value_select_option", {
                      smart_count: c * a,
                      amount: (0, X.v1)(e, t, a),
                    })
                  )
                );
              return r.reverse();
            }, [l, o, i, c, e, t]);
          return n.createElement(
            "div",
            { className: "field__input-wrapper field__input-wrapper--select" },
            n.createElement(
              "select",
              {
                "data-testid": "checkout-redemption-select",
                className: "field__input field__input--select",
                disabled: r,
                value: s,
                onChange: m,
              },
              u
            ),
            n.createElement(
              "div",
              { className: "field__caret" },
              n.createElement(
                "svg",
                {
                  className:
                    "icon-svg icon-svg--color-adaptive-lighter icon-svg--size-10 field__caret-svg",
                  "aria-hidden": "true",
                  focusable: "false",
                },
                n.createElement("use", { xlinkHref: "#caret-down" })
              )
            )
          );
        },
        Fo = { appearance: "auto", padding: "0.94em 0.5em", width: "100%" },
        qo = () => {
          const {
              disabled: e,
              max: t,
              min: r,
              step: o,
              value: l,
            } = (0, a.v9)($o.PU),
            i = (0, a.I0)(),
            s = (0, n.useCallback)(
              (e) => i(Ko.lk.setRedemptionValue(parseInt(e.target.value, 10))),
              [i]
            );
          return n.createElement(
            n.Fragment,
            null,
            n.createElement("style", {
              type: "text/css",
              dangerouslySetInnerHTML: {
                __html:
                  "\n            input[data-loyaltylion-range]::-moz-range-track {\n              background-color: #eee;\n              border: 1px solid #bbb;\n              border-radius: 3px;\n            }\n          ",
              },
            }),
            n.createElement("input", {
              "data-loyaltylion-range": !0,
              style: Fo,
              disabled: e,
              max: t,
              min: r,
              value: l,
              step: o,
              onChange: s,
              type: "range",
            })
          );
        },
        Ho = () => {
          const e = (0, a.v9)($o.Qp);
          return n.createElement(
            "div",
            { className: "field__input-btn-wrapper" },
            "select" === e
              ? n.createElement(Ro, null)
              : n.createElement(qo, null),
            n.createElement(Oo, null)
          );
        },
        Ao = (e) => ({
          currency: (0, E.j)(e),
          isAffordable: (0, $o.E4)(e),
          inputMode: (0, $o.Qp)(e),
          eligibleTotal: (0, $o.P_)(e),
          minimumPoints: (0, $o.A7)(e),
          hasRedeemed: (0, $o.mR)(e),
          checkoutReward: (0, ft.u)(e),
        }),
        Mo = () => {
          const {
              currency: e,
              isAffordable: t,
              inputMode: r,
              eligibleTotal: o,
              minimumPoints: l,
              hasRedeemed: s,
              checkoutReward: c,
            } = (0, a.v9)(Ao),
            d = c
              ? (function (e) {
                  const t =
                    e.target_collections.length > 0
                      ? e.target_collections[0]
                      : null;
                  if (!t) return "";
                  if (t.restriction_text) return t.restriction_text;
                  return (0, w.t)(
                    "sdk.checkout_redemption.generic_collection_restriction_text"
                  );
                })(c)
              : "";
          return 0 === o
            ? (function (e, t) {
                const r = cr(
                  (0, w.t)(
                    "sdk.checkout_redemption.help_text_zero_eligible_total",
                    { amount: (0, X.v1)(e, null, 0) }
                  ),
                  t
                );
                return n.createElement(
                  "span",
                  {
                    style: Do.unaffordable,
                    "data-testid": "help-text",
                    className: (0, i.c)(
                      "checkout-redemption__header__help-text"
                    ),
                  },
                  r
                );
              })(e, d)
            : s || t
            ? (function (e, t) {
                return n.createElement(
                  "span",
                  {
                    style: Do.affordable,
                    "data-testid": "help-text",
                    className: (0, i.c)(
                      "checkout-redemption__header__help-text"
                    ),
                  },
                  cr(
                    (function (e) {
                      switch (e) {
                        case "slider":
                          return (0, w.t)("sdk.checkout_redemption.help_text");
                        case "select":
                          return (0, w.t)(
                            "sdk.checkout_redemption.help_text_select_box"
                          );
                      }
                    })(e),
                    t
                  )
                );
              })(r, d)
            : (function (e) {
                return n.createElement(
                  "span",
                  {
                    style: Do.unaffordable,
                    "data-testid": "help-text",
                    className: (0, i.c)(
                      "checkout-redemption__header__help-text"
                    ),
                  },
                  n.createElement(S.N, {
                    i18nKey:
                      "sdk.checkout_redemption.help_text_insufficient_points",
                    params: { minimum_points: e },
                  })
                );
              })(l);
        },
        Do = {
          affordable: {
            color: "#969696",
            display: "block",
            margin: " 0.53em 0px 1.3em",
          },
          unaffordable: {
            color: "#a00a00",
            display: "block",
            margin: "0.53em 0 1.3em",
          },
        };
      const Vo = { header: { color: "#4b4b4b", fontSize: "1.14286em" } },
        jo = () => {
          const { pointsRedeemable: e } = (0, a.v9)(_.H5);
          return n.createElement(
            n.Fragment,
            null,
            n.createElement(
              "table",
              { className: (0, i.ok)("checkout-redemption__header") },
              n.createElement(
                "tbody",
                null,
                n.createElement(
                  "tr",
                  null,
                  n.createElement(
                    "td",
                    {
                      className: (0, i.ok)(
                        "checkout-redemption__header__title"
                      ),
                      style: Vo.header,
                    },
                    n.createElement(S.N, {
                      i18nKey: "sdk.checkout_redemption.redeem_points",
                    })
                  ),
                  n.createElement(
                    "td",
                    {
                      className: (0, i.ok)(
                        "checkout-redemption__header__points"
                      ),
                    },
                    n.createElement(Qt, { points: e }),
                    " ",
                    n.createElement(S.N, { i18nKey: "sdk.points" })
                  )
                )
              )
            ),
            n.createElement(Mo, null)
          );
        },
        Bo = (e) => {
          let { element: t } = e;
          return (0, a.v9)($o.yH)
            ? n.createElement(
                m,
                { node: t },
                n.createElement(
                  "div",
                  { className: "fieldset" },
                  n.createElement(
                    "div",
                    { className: "field" },
                    n.createElement(
                      "div",
                      { className: (0, i.ok)("checkout-redemption") },
                      n.createElement(jo, null),
                      n.createElement(Ho, null)
                    )
                  )
                )
              )
            : null;
        };
      var Lo = r(3603),
        Uo = r(2136),
        zo = r(3308),
        Wo = r(1503);
      const Go = () => {
          const e = (0, a.v9)(Lo.iP)
              .backgroundColors.standard.replace(")", ", 0.85)")
              .replace("rgb", "rgba"),
            t = (0, a.v9)((e) => (0, zo.$8)(e).map((t) => (0, zo.t0)(e, t))),
            r = (0, a.I0)(),
            o = { backgroundColor: e, color: e };
          return 0 === t.length
            ? null
            : n.createElement(
                n.Fragment,
                null,
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "notification-container",
                      "notification-container--on-widget"
                    ),
                  },
                  n.createElement(
                    "div",
                    { style: o, className: (0, i.ok)("notification-list") },
                    n.createElement(
                      "div",
                      {
                        onClick: () => r((0, Uo.L1)()),
                        className: (0, i.ok)("notification-list__close"),
                      },
                      "×"
                    ),
                    t.map((e) =>
                      n.createElement(Wo.t, { key: e.id, notification: e })
                    )
                  )
                )
              );
        },
        Yo = () => {
          const {
              backgroundColors: { dark: e },
            } = (0, a.v9)(Lo.iP),
            { pointsTotal: t } = (0, a.v9)(_.H5),
            r = { backgroundColor: e };
          return n.createElement(
            "span",
            { className: (0, i.ok)("loyalty-widget__points"), style: r },
            (0, w.uf)(t)
          );
        },
        Zo = (0, a.$j)((e) => ({
          backgroundColor: (0, Lo.iP)(e).backgroundColors.standard,
          programName: (0, u.LI)(e).name,
        }))((e) => {
          let { programName: t, backgroundColor: r } = e;
          const a = { backgroundColor: r };
          return n.createElement(
            "span",
            { className: (0, i.ok)("loyalty-widget__title"), style: a },
            n.createElement("span", {
              className: (0, i.ok)("loyalty-widget__icon"),
            }),
            t
          );
        }),
        Qo = (e) => {
          let { element: t } = e;
          const r = (0, a.I0)(),
            o = (0, a.v9)(_.M4),
            { enabled: l, fontColor: s, pagePosition: c } = (0, a.v9)(Lo.iP);
          return l
            ? n.createElement(
                m,
                { node: t, isolate: !0, allowCustomCss: !0 },
                n.createElement(
                  "div",
                  {
                    className: (0, i.ok)(
                      "loyalty-widget",
                      `loyalty-widget_position_${c}`
                    ),
                  },
                  n.createElement(Go, null),
                  n.createElement(
                    "div",
                    {
                      className: (0, i.ok)("loyalty-widget__body"),
                      style: { color: s },
                      onClick: () => r((0, v.f)()),
                    },
                    n.createElement(Zo, null),
                    o && n.createElement(Yo, null)
                  )
                )
              )
            : null;
        },
        Xo = (0, k.P1)(
          $.De,
          (e, t) => t,
          (e, t) => {
            const r = Number(t);
            return isNaN(r) ? null : Math.round(r / 100) * e;
          }
        ),
        Jo = (e) => {
          let { price: t, element: r } = e;
          const o = (0, a.v9)((e) => Xo(e, t));
          return o ? n.createElement(m, { node: r }, `${o}`) : null;
        },
        el = (e) => {
          let { element: t, ruleName: r } = e;
          const o = (0, a.v9)((e) => ("signup" === r ? (0, $.Ce)(e) : 0));
          return n.createElement(m, { node: t }, `${o}`);
        },
        tl = ["approved", "pending", "total", "spent", "lifetime", "cart"];
      const rl = (e) => {
          let { element: t, kind: r } = e;
          const o = (0, a.v9)(_.H5),
            l = (0, a.v9)(no.h),
            i = (() => {
              switch (
                (function (e) {
                  return tl.includes(e);
                })(r)
                  ? r
                  : "total"
              ) {
                case "cart":
                  return l;
                case "approved":
                  return o.pointsRedeemable;
                case "lifetime":
                  return o.pointsLifetime;
                case "pending":
                  return o.pointsPending;
                case "spent":
                  return o.pointsSpent;
                case "total":
                  return o.pointsTotal;
              }
            })();
          return n.createElement(m, { node: t }, (0, w.uf)(i));
        },
        nl = (e) => e.productsOnPage,
        al =
          ((0, k.P1)(nl, (e) => e.allIds),
          (0, k.P1)(
            nl,
            (e, t) => t,
            (e, t) => e.byId[t] ?? null
          )),
        ol = (0, k.P1)(al, $.De, E.j, Q.HO, (e, t, r, n) => {
          if (!e) return null;
          const a = (0, X.qe)(r, n, e.price / 100);
          return null === a ? null : Math.round(a) * t;
        }),
        ll = (0, a.$j)((e, t) => ({ points: ol(e, t.productId) }))((e) =>
          e.points
            ? n.createElement(m, { node: e.element }, `${e.points}`)
            : null
        );
      const il = (e) => {
          let { element: t, kind: r } = e;
          const o = (function (e, t) {
            if (!t) return e.direct;
            const r = t in e ? e[t] : void 0;
            return void 0 === r ? e.direct : r;
          })((0, a.v9)(Fe.i), r);
          return n.createElement(m, { node: t }, o);
        },
        sl = (e) => {
          let { portalElements: t, authorizedFeatures: r } = e;
          return n.createElement(
            n.Fragment,
            null,
            t
              .filter((e) =>
                (function (e, t) {
                  const { definition: r, element: n } = e;
                  if ("requiresFeature" in r && !t[r.requiresFeature])
                    return (
                      G.k.warn(
                        `Component '${r.name}' not available in your LoyaltyLion subscription. Contact support@loyaltylion.com for more information.`
                      ),
                      !1
                    );
                  if (!(n instanceof Element))
                    return (
                      G.k.error(
                        `Invalid attempt to portal element for selector: ${r.name}`,
                        { portalElement: e }
                      ),
                      !1
                    );
                  return !0;
                })(e, r)
              )
              .map((e, t) => n.createElement(cl, { portalElement: e, key: t }))
          );
        };
      const cl = (e) => {
        let { portalElement: t } = e;
        const { attribute: r, definition: o, element: l } = t,
          i = (0, a.v9)(z.r7),
          s = (0, a.v9)(E.lH),
          c = i.integratedLoyaltyPage.remoteConfig,
          d = "shopify" === s.platform && c.useAppBlocks;
        switch (o.name) {
          case "account":
            return n.createElement(Io, { element: l });
          case "points":
            return n.createElement(rl, { element: l, kind: r });
          case "referral-url":
            return n.createElement(il, { element: l, kind: r });
          case "loyaltyWidget":
            return n.createElement(Qo, (0, Z.Z)({}, t));
          case "points-for":
            return n.createElement(Jo, { element: l, price: r });
          case "points-for-id":
          case "points-for-product-id":
            return n.createElement(ll, { element: l, productId: r });
          case "points-for-rule":
            return n.createElement(el, { element: l, ruleName: r });
          case "checkoutSlider":
            return n.createElement(Bo, { element: l });
          case "history-table":
            return n.createElement(Ja, { element: l });
          case "rules-list":
            return n.createElement(po, { element: l });
          case "rewards-list":
            return n.createElement(uo, { element: l });
          case "claimed-rewards-list":
            return n.createElement(ro, { element: l });
          case "seamless-product-reward":
            return n.createElement(lo, { element: l, providedProductId: r });
          case "seamless-product-reward-widget":
            return n.createElement(mo, { element: l });
          case "current-tier-name":
            return n.createElement(ho, { element: l });
          case "tier-overview":
            return n.createElement(Eo, { element: l });
          case "tier-benefits-compare":
            return n.createElement(vo, { element: l });
          case "tier-rewards-compare":
            return n.createElement(No, { element: l });
          case "tier-rules-compare":
            return n.createElement(So, { element: l });
          case "powered-by":
            return n.createElement(to, { element: l });
          case "integrated-page":
            return n.createElement(Ba, { element: l });
          case "integrated-page-section":
            return (
              (m = r),
              Ya.includes(m)
                ? n.createElement(Xa, { element: l, section: r })
                : null
            );
          case "app-styles":
            return d ? n.createElement(ma, { element: l }) : null;
        }
        var m;
      };
      var dl = r(4029);
      function ml(e) {
        return `data:image/svg+xml,${`\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n      <text x="50%" y="58%" font-size="80" text-anchor="middle" dominant-baseline="middle">${e.emoji}</text>\n    </svg>\n  `
          .replace(/\n/g, "")
          .trim()}`;
      }
      function ul(e, t) {
        return (0, dl.E)(e, "kind", {
          library: (e) => {
            let { key: r } = e;
            const n = `${Be.v.iconBaseUrl}/${r}`;
            return `\n        .lion-header__nav-link--${t}:before {\n          mask: none no-repeat center/auto;\n          -webkit-mask: none no-repeat center/contain;\n          -webkit-mask-image: url(${n});\n          mask-image: url(${n});\n        }\n      `;
          },
          emoji: (e) =>
            `\n        .lion-header__nav-link--${t}:before {\n          -webkit-mask-image: none;\n          mask-image: none;\n          background: transparent url('${ml(
              e
            )}') no-repeat 50% 50%;\n        }\n      `,
          external: (e) => {
            let { url: r } = e;
            return `\n        .lion-header__nav-link--${t}:before {\n          -webkit-mask-image: none;\n          mask-image: none;\n          background: transparent url('${r}') no-repeat 50% 50%;\n        }\n      `;
          },
          upload: () => "",
        });
      }
      function pl(e, t, r) {
        const n = r.map((e) => `.lion-icon__${t}--${e}`).join(", ");
        switch (e.kind) {
          case "library": {
            const t = `${Be.v.iconBaseUrl}/${e.key}`;
            return `\n        ${n} {\n          -webkit-mask-image: url(${t});\n          mask-image: url(${t});\n        }\n      `;
          }
          case "emoji":
            return `\n        ${n} {\n          -webkit-mask-image: none;\n          mask-image: none;\n          background: transparent url('${ml(
              e
            )}') no-repeat 50% 50%;\n        }\n      `;
          case "external":
            return `\n        ${n} {\n          -webkit-mask-image: none;\n          mask-image: none;\n          background: transparent url(${e.url}) no-repeat 50% 50%;\n          background-size: 46px;\n        }\n      `;
          case "upload":
            return "";
        }
      }
      const _l = (e, t) =>
        (0, dl.E)(e, "kind", {
          library: (e) => {
            let { key: r } = e;
            const n = `${Be.v.iconBaseUrl}/${r}`;
            return "closed" === t
              ? `\n          .lion-faq-list__question-icon {\n            background-image: url(${n});\n          }\n        `
              : `\n        .lion-faq-list__question[open] .lion-faq-list__question-icon {\n          background-image: url(${n});\n        }\n      `;
          },
          emoji: (e) => {
            const r = ml(e);
            return "closed" === t
              ? `\n          .lion-faq-list__question-icon {\n            background-image: url('${r}');\n          }\n        `
              : `\n        .lion-faq-list__question[open] .lion-faq-list__question-icon {\n          background-image: url('${r}');\n        }\n      `;
          },
          external: (e) => {
            let { url: r } = e;
            return "closed" === t
              ? `\n        .lion-faq-list__question-icon {\n          background-image: url(${r});\n        }\n      `
              : `\n      .lion-faq-list__question[open] .lion-faq-list__question-icon {\n        background-image: url(${r});\n      }\n  `;
          },
          upload: () => "",
        });
      function hl(e, t, r) {
        const n = {};
        return (
          Object.keys(e[t]).forEach((a) => {
            const o = gl(e, r.vars, a, t);
            o && Object.assign(n, o);
          }),
          n
        );
      }
      function fl(e, t, r) {
        const n = [];
        return (
          Object.keys(e[t]).forEach((a) => {
            const o = gl(e, r.css, a, t);
            o && n.push(o);
          }),
          n
        );
      }
      function gl(e, t, r, n) {
        const a = e[n],
          o = a[r],
          l = {
            primary: e.brand["colors.brand.primary"],
            secondary: e.brand["colors.brand.secondary"],
          },
          i =
            "object" == typeof (s = o) && null !== s && "key_color" in s
              ? l[o.key_color]
              : o;
        var s;
        const c = t[r];
        return c ? c(i, a) : null;
      }
      const yl = {
        brand: {
          vars: {
            "colors.brand.primary": (e) => ({
              "lion-primary-color": sa.O.format(e),
              "lion-primary-color-darker1": sa.O.darken(e, 5),
              "lion-primary-color-darker2": sa.O.darken(e, 10),
              "lion-primary-color-darker3": sa.O.darken(e, 15),
            }),
            "colors.brand.secondary": (e) => ({
              "lion-secondary-color": sa.O.format(e),
              "lion-secondary-color-lighter1": sa.O.lighten(e, 5),
              "lion-secondary-color-darker1": sa.O.darken(e, 5),
              "lion-secondary-color-darker2": sa.O.darken(e, 10),
            }),
            "colors.call_to_action_buttons.background_color": (e) => ({
              "lion-button-primary-background-color": sa.O.format(e),
              "lion-button-primary-hover-background-color": sa.O.lighten(e, 8),
              "lion-button-primary-active-background-color": sa.O.lighten(e, 8),
              "lion-button-primary-active-shadow-color": sa.O.darken(e, 8),
              "lion-button-tile-text-color": sa.O.darken(e, 35),
            }),
            "colors.call_to_action_buttons.text_color": (e) => ({
              "lion-button-primary-text-color": sa.O.format(e),
            }),
            "colors.standard_buttons.background_color": (e) => ({
              "lion-button-neutral-background-color": sa.O.format(e),
              "lion-button-neutral-hover-background-color": sa.O.lighten(e, 8),
              "lion-button-neutral-active-background-color": sa.O.lighten(e, 8),
              "lion-button-neutral-active-shadow-color": sa.O.darken(e, 10),
            }),
            "colors.standard_buttons.text_color": (e) => ({
              "lion-button-neutral-text-color": sa.O.format(e),
            }),
            "buttons.default.border_radius": (e) => ({
              "lion-button-border-radius": `${e}px`,
            }),
            "buttons.default.size": (e) => ({
              "lion-button-font-size": (0, dl.E)(e, {
                small: () => "0.8em",
                medium: () => "1em",
                large: () => "1.2em",
              }),
              "lion-button-padding": (0, dl.E)(e, {
                small: () => "4px 15px",
                medium: () => "7px 18px",
                large: () => "9px 21px",
              }),
            }),
          },
          css: {},
        },
        loyalty_page: {
          vars: {
            "headings.main.font_color": (e) => ({
              "lion-section-heading-text-color": sa.O.format(e),
            }),
            "headings.main.font_size": (e) => ({
              "lion-section-heading-font-size": `${e}px`,
            }),
            "headings.main.line_color": (e) => ({
              "lion-section-heading-line-color": sa.O.format(e),
            }),
            "headings.main.line_size": (e) => ({
              "lion-section-heading-line-size": `${e}px`,
            }),
            "headings.main.margin_bottom": (e) => ({
              "lion-section-heading-margin": `0 0 ${e}px 0`,
            }),
            "headings.main.font": (e) =>
              "automatic" === e.kind
                ? {}
                : {
                    "lion-section-heading-font": (0, dl.E)(e.font_stack, {
                      "sans-serif": () =>
                        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                      serif: () =>
                        '"New York", Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
                      mono: () =>
                        '"SF Mono", Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
                    }),
                  },
          },
          css: {
            "headings.main.text_align": (e) =>
              (0, dl.E)(e, {
                left: () =>
                  "\n          .lion-integrated-page-section__heading {\n            text-align: left;\n          }\n          .lion-integrated-page-section__heading-text:before {\n            display: none;\n          }\n          .lion-integrated-page-section__heading-text:after {\n            width: 800px;\n          }\n        ",
                center: () => "",
                right: () =>
                  "\n          .lion-integrated-page-section__heading {\n            text-align: right;\n          }\n          .lion-integrated-page-section__heading-text:before {\n            width: 800px;\n          }\n          .lion-integrated-page-section__heading-text:after {\n            display: none;\n          }\n        ",
              }),
          },
        },
        loyalty_page_header: {
          vars: {
            "member_state.menu.show_icons": (e) => ({
              "lion-header-nav-link-icon-display": e ? "inline-block" : "none",
            }),
            "member_state.menu.accent_color": (e) => ({
              "lion-header-nav-link-accent-color": sa.O.format(e),
              "lion-header-nav-link-border-color": sa.O.scale(e, {
                alpha: -80,
              }),
              "lion-header-nav-link-hover-border-color": sa.O.scale(e, {
                alpha: -60,
              }),
              "lion-header-nav-link-hover-background-color": sa.O.scale(e, {
                alpha: -95,
              }),
              "lion-header-nav-link-hover-icon-color": sa.O.format(e),
              "lion-header-nav-link-hover-text-color": sa.O.darken(e, 10),
            }),
            "layout.main.background_color": (e) => ({
              "lion-header-background-color": sa.O.format(e),
            }),
            "layout.main.text_color": (e) => ({
              "lion-header-text-color": sa.O.format(e),
            }),
            "layout.main.border_radius": (e) => ({
              "lion-header-border-radius": `${e}px`,
            }),
          },
          css: {
            "member_state.menu_icons.earn_points": (e) => ul(e, "earn"),
            "member_state.menu_icons.rewards": (e) => ul(e, "redeem"),
            "member_state.menu_icons.tiers": (e) => ul(e, "tiers-overview"),
            "member_state.menu_icons.history": (e) => ul(e, "account-history"),
            "member_state.menu_icons.your_rewards": (e) =>
              ul(e, "available-rewards"),
          },
        },
        loyalty_page_earn_points: {
          vars: {
            "icons.icon_design.show_icon": null,
            "icons.icon_design.icon_color": (e) => ({
              "lion-rule-item-icon-color": sa.O.format(e),
            }),
            "layout.container.background_color": (e) => ({
              "lion-rules-background-color": sa.O.format(e),
            }),
            "layout.container.border_color": (e) => ({
              "lion-rules-border-color": sa.O.format(e),
            }),
            "layout.container.border_radius": (e) => ({
              "lion-rules-border-radius": `${e}px`,
            }),
            "layout.container.border_width": (e) => ({
              "lion-rules-border-width": `${e}px`,
            }),
            "layout.container.grid_gap": (e) => ({
              "lion-rules-grid-gap": `${e}px`,
            }),
            "layout.container.grid_max_columns": (e) => ({
              "lion-rules-grid-columns": e.toString(),
            }),
            "layout.container.padding": (e) => ({
              "lion-rules-padding": `${e}px`,
            }),
            "layout.items.background_color": (e) => ({
              "lion-rules-tile-background-color": sa.O.format(e),
            }),
            "layout.items.border_color": (e) => ({
              "lion-rules-tile-border-color": sa.O.format(e),
            }),
            "layout.items.border_radius": (e) => ({
              "lion-rules-tile-border-radius": `${e}px`,
            }),
            "layout.items.border_width": (e) => ({
              "lion-rules-tile-border-width": `${e}px`,
            }),
          },
          css: {
            "icons.icon_design.show_icon": (e) =>
              e
                ? ""
                : "\n          .lion-rule-item__icon-wrap {\n            display: none;\n          }\n        ",
            "icons.default_icons.birthday": (e) => pl(e, "rule", ["birthday"]),
            "icons.default_icons.pageview": (e) =>
              pl(e, "rule", ["pageview", "clickthrough"]),
            "icons.default_icons.purchase": (e) =>
              pl(e, "rule", [
                "purchase",
                "product-purchase",
                "collection-purchase",
                "trustpilot-product-review",
              ]),
            "icons.default_icons.signup": (e) => pl(e, "rule", ["signup"]),
            "icons.default_icons.review": (e) =>
              pl(e, "rule", [
                "trustpilot-service-review",
                "shopify-review",
                "stampedio-review",
                "review",
                "feefo-review",
                "loox-review",
                "verified-reviews",
                "yotpo-review",
              ]),
            "icons.default_icons.twitter": (e) =>
              pl(e, "rule", ["twitter-follow"]),
            "icons.default_icons.referral": (e) => pl(e, "rule", ["referral"]),
            "icons.default_icons.custom": (e) => pl(e, "rule", ["custom"]),
            "icons.default_icons.facebook": (e) =>
              pl(e, "rule", ["facebook-like"]),
            "icons.default_icons.instagram": (e) =>
              pl(e, "rule", [
                "instagram-follow",
                "instagram-post-hashtag",
                "instagram-tag-image",
              ]),
            "icons.default_icons.newsletter": (e) =>
              pl(e, "rule", ["newsletter-signup"]),
          },
        },
        loyalty_page_rewards: {
          vars: {
            "icons.icon_design.icon_color": (e) => ({
              "lion-reward-item-icon-color": sa.O.format(e),
            }),
            "layout.container.background_color": (e) => ({
              "lion-rewards-background-color": sa.O.format(e),
            }),
            "layout.container.border_color": (e) => ({
              "lion-rewards-border-color": sa.O.format(e),
            }),
            "layout.container.border_radius": (e) => ({
              "lion-rewards-border-radius": `${e}px`,
            }),
            "layout.container.border_width": (e) => ({
              "lion-rewards-border-width": `${e}px`,
            }),
            "layout.container.grid_gap": (e) => ({
              "lion-rewards-grid-gap": `${e}px`,
            }),
            "layout.container.grid_max_columns": (e) => ({
              "lion-rewards-grid-columns": e.toString(),
            }),
            "layout.container.padding": (e) => ({
              "lion-rewards-padding": `${e}px`,
            }),
            "layout.items.background_color": (e) => ({
              "lion-rewards-tile-background-color": sa.O.format(e),
            }),
            "layout.items.border_color": (e) => ({
              "lion-rewards-tile-border-color": sa.O.format(e),
            }),
            "layout.items.border_radius": (e) => ({
              "lion-rewards-tile-border-radius": `${e}px`,
            }),
            "layout.items.border_width": (e) => ({
              "lion-rewards-tile-border-width": `${e}px`,
            }),
          },
          css: {
            "icons.icon_design.show_icon": (e) =>
              e
                ? ""
                : "\n          .lion-reward-item__icon {\n            display: none;\n          }\n        ",
            "icons.default_icons.checkout_redemption": (e) =>
              pl(e, "reward", ["checkout-redemption"]),
            "icons.default_icons.custom": (e) => pl(e, "reward", ["custom"]),
            "icons.default_icons.discount": (e) =>
              pl(e, "reward", [
                "cart-discount-voucher",
                "product-discount-voucher",
                "collection-discount-voucher",
                "active-subscription-discount-voucher",
                "subscription",
              ]),
            "icons.default_icons.free_shipping": (e) =>
              pl(e, "reward", ["free-shipping-voucher"]),
            "icons.default_icons.gift_card": (e) =>
              pl(e, "reward", ["gift-card"]),
            "icons.default_icons.product": (e) =>
              pl(e, "reward", ["product-cart"]),
          },
        },
        loyalty_page_faq: {
          vars: {
            "general_appearance.container.list_gap": (e) => ({
              "lion-faq-list-gap": `${e}px`,
            }),
            "general_appearance.container.background_color": (e) => ({
              "lion-faq-background-color": sa.O.format(e),
            }),
            "general_appearance.container.padding": (e) => ({
              "lion-faq-padding": `${e}px`,
            }),
            "general_appearance.container.border_color": (e) => ({
              "lion-faq-border-color": sa.O.format(e),
            }),
            "general_appearance.container.border_width": (e) => ({
              "lion-faq-border-width": `${e}px`,
            }),
            "general_appearance.container.border_radius": (e) => ({
              "lion-faq-border-radius": `${e}px`,
            }),
            "general_appearance.items.background_color": (e) => ({
              "lion-faq-question-background-color": sa.O.format(e),
            }),
            "general_appearance.items.border_color": (e) => ({
              "lion-faq-question-border-color": sa.O.format(e),
            }),
            "general_appearance.items.border_radius": (e) => ({
              "lion-faq-question-border-radius": `${e}px`,
            }),
            "general_appearance.items.vertical_border_width": (e) => ({
              "lion-faq-question-vertical-border-width": `${e}px`,
            }),
            "general_appearance.items.horizontal_border_width": (e) => ({
              "lion-faq-question-horizontal-border-width": `${e}px`,
            }),
            "general_appearance.items.horizontal_padding": (e) => ({
              "lion-faq-question-horizontal-padding": `${e}px`,
            }),
            "general_appearance.items.vertical_padding": (e) => ({
              "lion-faq-question-vertical-padding": `${e}px`,
            }),
            "general_appearance.icons.icon_size": (e) => ({
              "lion-faq-accordion-icon-size": `${e}px`,
            }),
            "general_appearance.items.header_font_weight": (e) => ({
              "lion-faq-question-header-font-weight": e,
            }),
          },
          css: {
            "general_appearance.container.list_gap": (e, t) =>
              !e && t["general_appearance.items.vertical_border_width"]
                ? ".lion-faq-list__item:not(:last-child) {\n        border-bottom: none;\n      })"
                : "",
            "general_appearance.icons.open": (e) => _l(e, "open"),
            "general_appearance.icons.closed": (e) => _l(e, "closed"),
          },
        },
      };
      const bl = () => {
        const e = (0, a.v9)(z.FP);
        return (
          (0, n.useEffect)(() => {
            if (!e) return;
            const t = (function () {
              const e = document.querySelector(
                'style[data-lion-css="theme-configuration"]'
              );
              if (e) return e;
              const t = document.createElement("style");
              t.setAttribute("type", "text/css"),
                t.setAttribute("data-lion-css", "theme-configuration");
              const r = document.querySelector('link[data-lion-css="theme"]');
              if (!r?.parentElement)
                return (
                  G.k.warn(
                    "Could not add theme configuration element because theme stylesheet is missing"
                  ),
                  null
                );
              r.nextSibling
                ? r.parentElement.insertBefore(t, r.nextSibling)
                : r.parentElement.appendChild(t);
              return t;
            })();
            var r;
            t &&
              (t.innerHTML = `\n      #loyaltylion, .lion-isolator {\n        ${
                ((r = e),
                oa(
                  (0, aa.qh)(yl).reduce((e, t) => {
                    let [n, a] = t;
                    return { ...e, ...hl(r, n, a) };
                  }, {})
                ))
              }\n      }\n\n      ${(function (e) {
                const t = (0, aa.qh)(yl).reduce((t, r) => {
                    let [n, a] = r;
                    return [...t, ...fl(e, n, a)];
                  }, []),
                  r = (0, i.zg)({
                    css: e.brand["custom_css.global.css"],
                    prefix: "#loyaltylion",
                  });
                return (
                  t
                    .map((e) => (0, i.zg)({ css: e, prefix: "#loyaltylion" }))
                    .join("\n") +
                  "\n\n" +
                  r
                );
              })(e)}\n    `);
          }, [e]),
          null
        );
      };
      const vl = (e) => {
        let { portalElements: t } = e;
        const r = (0, a.v9)(p.rP),
          o = (0, a.v9)(u.Uw),
          l = !(0, a.v9)(Lo.$N);
        return "loading" === r
          ? null
          : n.createElement(
              n.Fragment,
              null,
              n.createElement(bl, null),
              n.createElement(sl, { portalElements: t, authorizedFeatures: o }),
              n.createElement(
                m,
                { isolate: !0, allowCustomCss: !0 },
                n.createElement(ra, null),
                l && n.createElement(na.m, null)
              )
            );
      };
    },
    2138: (e, t, r) => {
      "use strict";
      r.d(t, {
        $s: () => c,
        BW: () => m,
        av: () => i,
        nX: () => s,
        xN: () => d,
      });
      var n = r(9532),
        a = r(4421),
        o = r(9183),
        l = r(476);
      const i = (e) =>
          (0, n.PH)("[referral widget] set email form values", { values: e }),
        s = () => (0, n.PH)("[referral widget] submit email form request"),
        c = () => (0, n.PH)("[referral widget] submit email form request ok"),
        d = () =>
          (0, n.PH)("[referral widget] submit email form request reset"),
        m = (e) => async (t, r) => {
          t(s()), (0, o.kU)({ location: "email" });
          const n = a.H.buildFromState(r(), t),
            i = await n.referrals.sendEmail(e);
          if ("error" in i)
            return (
              alert(
                409 === i.error.status
                  ? (0, l.t)("ui.referral_popup.duplicate_email")
                  : i.error.message ??
                      "Sorry, something went wrong. Please try again in a moment"
              ),
              void t(d())
            );
          t(c());
        };
    },
    9262: (e, t, r) => {
      "use strict";
      r.d(t, { Sp: () => _, k: () => p, lk: () => c, y2: () => u });
      var n = r(9532),
        a = r(4421),
        o = r(4401),
        l = r(4004),
        i = r(9937),
        s = r(2209);
      const c = {
          setReady: () => (
            l.k.debug("[checkoutRedemptionActions] setReady"),
            (0, n.PH)("[checkout redemption] ready")
          ),
          setInputMode: (e) =>
            (0, n.PH)("[checkout redemption] set input mode", { mode: e }),
          setEligibleTotalForDiscount: (e) =>
            (0, n.PH)("[checkout redemption] set eligible total for discount", {
              price: e,
            }),
          setRedemptionClaiming: () =>
            (0, n.PH)("[checkout redemption] redemption applying"),
          setRedemptionApplying: (e) =>
            (0, n.PH)("[checkout redemption] redemption submitted", {
              voucher: e,
            }),
          setRedemptionRemoving: () =>
            (0, n.PH)("[checkout redemption] redemption removing"),
          setRedemptionRemoved: () =>
            (0, n.PH)("[checkout redemption] redemption removed"),
          setError: (e) =>
            (0, n.PH)("[checkout redemption] set error", { error: e }),
          setRedemptionValue: (e) =>
            (0, n.PH)("[checkout redemption] set redemption value", {
              amount: e,
            }),
          setShopifyCheckoutToken: (e) =>
            (0, n.PH)("[checkout redemption] set shopify checkout token", {
              token: e,
            }),
          setRedemptionApplied: (e) =>
            (0, n.PH)("[checkout redemption] redemption applied", {
              voucher: e,
            }),
          setHasSubscriptionAppInstalled: () =>
            (0, n.PH)(
              "[checkout redemption] set has subscription app installed"
            ),
        },
        d = c;
      function m(e) {
        return {
          pointsApproved: e.points_approved,
          pointsPending: e.points_pending,
          pointsReserved: e.points_reserved,
          pointsSpent: e.points_spent,
        };
      }
      const u = (e, t) => async (r, n) => {
          const l = a.H.buildFromState(n(), r),
            i = await l.customers.cancelCheckoutDiscount(e, t);
          return "error" in i
            ? (r(d.setError(i.error)), !1)
            : (r((0, o.pD)(m(i.customer))), !0);
        },
        p = () => (e, t) => {
          const { id: r } = (0, s.t9)(t());
          r && (e(d.setRedemptionRemoving()), (0, i.v$)());
        },
        _ = () => async (e, t) => {
          e(d.setRedemptionClaiming());
          const r = a.H.buildFromState(t(), e),
            n = (0, s.cG)(t()),
            l = (0, s.NX)(t()),
            p = (0, s.hM)(t());
          if (!l) return;
          e(c.setRedemptionValue(l));
          const _ = await r.customers.redeemCheckoutDiscount(
            l,
            n.shopifyCheckoutToken,
            p
          );
          if ("error" in _) e(d.setError(_.error));
          else {
            e((0, o.pD)(m(_.customer)));
            try {
              e(
                d.setRedemptionApplying({
                  id: _.claimedReward.id,
                  code: _.claimedReward.code,
                })
              ),
                (0, i.iO)(_.claimedReward.code),
                setTimeout(() => {
                  const {
                    voucher: { isApplying: r },
                  } = (0, s.cG)(t());
                  r &&
                    e(
                      u(
                        _.claimedReward.id,
                        (0, i.IH)() ? "slider_conflict" : "slider_timeout"
                      )
                    )
                      .then(() => e(d.setRedemptionRemoved()))
                      .catch(() => {});
                }, 5e3);
            } catch (t) {
              e(
                d.setError({
                  message: `Failed to apply discount to the cart: ${t.message}`,
                  type: "client_error",
                })
              );
            }
          }
        };
    },
    7865: (e, t, r) => {
      "use strict";
      r.d(t, { Cu: () => l, If: () => a, Rn: () => o, yf: () => n });
      const n = { section: "order-summary__section" },
        a = {
          orderSubtotal: "data-checkout-subtotal-price-target",
          giftCardAmount: "data-checkout-applied-gift-card-amount-target",
        },
        o = {
          section: `.${n.section}`,
          orderSummary: ".order-summary__sections",
          orderSummaryErrors:
            ".order-summary__section--discount .field--error, .order-summary__section--discount .notice--warning",
          orderSummaryNotices:
            ".order-summary__section--discount .notice--info",
          orderSubtotal: `*[${a.orderSubtotal}]`,
          giftCardAmount: `*[${a.giftCardAmount}]`,
          discountSection: ".order-summary__section--discount",
          appliedReductionCodes: ".reduction-code .reduction-code__text",
          appliedReductionTag:
            ".order-summary__section--total-lines button, .order-summary__section--discount .tag__wrapper",
          appliedReductionTags: { removeButton: ".tag__button" },
          button: {
            content: ".btn__content",
            iconForMobile: ".btn__icon.shown-on-mobile",
            spinner: ".btn__spinner",
          },
          discountForm: {
            codeInput: "input[data-discount-field]",
            submitButton: ".order-summary__section--discount button",
          },
        },
        l = 1e3;
    },
    9937: (e, t, r) => {
      "use strict";
      r.d(t, { IH: () => m, MI: () => d, iO: () => l, v$: () => i });
      var n = r(4274),
        a = r(3850),
        o = r(7865);
      function l(e) {
        const t = document.querySelector(o.Rn.discountForm.codeInput),
          r = document.querySelector(o.Rn.discountForm.submitButton);
        if (!t?.form || !r)
          throw new a.T("Discount input or submit button not found");
        t.setAttribute("value", e),
          t.form.dispatchEvent(c()),
          t.setAttribute("value", ""),
          s(r);
      }
      function i() {
        const e = (0, n.Oc)(
          document.querySelectorAll(o.Rn.appliedReductionTag)
        ).filter((e) =>
          Boolean(e.querySelector('input[name="checkout[clear_discount]"]'))
        );
        if (0 === e.length) return !1;
        const t = e[0].querySelector(o.Rn.appliedReductionTags.removeButton),
          r = document.querySelector(o.Rn.discountForm.submitButton);
        return !!t?.form && (t.form.dispatchEvent(c()), r && s(r), !0);
      }
      function s(e) {
        const t = e.querySelector(o.Rn.button.spinner);
        if (!t) return;
        const r = e.querySelectorAll(
          [o.Rn.button.content, o.Rn.button.iconForMobile].join(", ")
        );
        0 !== r.length &&
          ((t.style.display = "none"),
          r.forEach((e) => (e.style.opacity = "1")));
      }
      function c() {
        const e = document.createEvent("Event");
        return e.initEvent("submit", !0, !0), e;
      }
      function d() {
        return (
          (0, n.Oc)(document.querySelectorAll(o.Rn.orderSummaryErrors)).length >
          0
        );
      }
      function m() {
        return (
          (0, n.Oc)(document.querySelectorAll(o.Rn.orderSummaryNotices))
            .length > 0
        );
      }
    },
    2209: (e, t, r) => {
      "use strict";
      r.d(t, {
        NX: () => f,
        P_: () => m,
        mR: () => h,
        Qp: () => d,
        PU: () => y,
        A7: () => b,
        yH: () => s,
        cG: () => i,
        t9: () => v,
        hM: () => g,
        Ap: () => u,
        E4: () => _,
      });
      var n = r(208);
      r(8274);
      class a extends Error {
        constructor(...e) {
          super(...e), (this.name = "NoCheckoutRedemptionRewardError");
        }
      }
      var o = r(5833),
        l = r(8788);
      const i = (e) => e.checkoutRedemption,
        s = (0, n.P1)(i, (e) => {
          let { ready: t } = e;
          return t;
        }),
        c = (0, n.P1)(l.u, (e) => {
          if (!e)
            throw new a("Checkout redemption reward required for this feature");
          return e;
        }),
        d = (0, n.P1)(i, (e) => e.inputMode),
        m = (e) => e.checkoutRedemption.eligibleTotalForDiscount,
        u = (0, n.P1)(m, (e) => e > 0),
        p = (0, n.P1)(i, l.u, o.H5, (e, t, r) => {
          if (!t)
            throw new a("Checkout redemption reward required for this feature");
          const {
              eligibleTotalForDiscount: n,
              redeemDiscountValue: o,
              voucher: { code: l },
            } = e,
            i = l && o ? o : 0,
            s = Math.floor(r.pointsRedeemable / t.point_cost),
            c = Math.min(t.max_redemption_amount, Math.ceil(n / 100), s + i),
            d = t.redemption_amount_step;
          return Math.floor(c / d) * d;
        }),
        _ = (0, n.P1)(c, p, (e, t) => t >= e.min_redemption_amount),
        h = (0, n.P1)(i, (e) => {
          let {
            voucher: { code: t, isApplying: r },
          } = e;
          return null !== t && !r;
        }),
        f = (0, n.P1)(i, c, p, (e, t, r) => {
          const { redeemDiscountValue: n, inputMode: a } = e;
          if (null !== n) return n;
          switch (a) {
            case "select":
              return r;
            case "slider":
              return t.min_redemption_amount;
          }
        }),
        g = (0, n.P1)(i, (e) => {
          let { hasSubscriptionAppInstalled: t } = e;
          return t;
        }),
        y = (0, n.P1)(i, c, p, _, f, u, (e, t, r, n, a, o) => {
          const {
              redemption_amount_step: l,
              min_redemption_amount: i,
              point_cost: s,
            } = t,
            { voucher: c } = e;
          return {
            disabled: null !== c.code || !n || !o,
            min: i,
            max: r,
            step: l,
            pointsPerUnit: s,
            value: a,
          };
        }),
        b = (0, n.P1)(c, (e) => e.point_cost * e.min_redemption_amount),
        v = (e) => e.checkoutRedemption.voucher;
      (0, n.P1)(i, (e) => e.voucher.code);
    },
    5392: (e, t, r) => {
      "use strict";
      r.d(t, { h: () => i });
      var n = r(208),
        a = r(5833),
        o = r(4856),
        l = r(9119);
      const i = (0, n.P1)(o.$Q, a.H5, l.O6, l.wS, (e, t, r, n) =>
        e ? t.pointsRedeemable + r - n : t.pointsRedeemable
      );
    },
    3603: (e, t, r) => {
      "use strict";
      r.d(t, { $N: () => c, iP: () => s, pq: () => d });
      var n = r(208),
        a = r(6460),
        o = r(8268),
        l = r(1667),
        i = r(4263);
      const s = (0, n.P1)(l.r7, (e) => e.loyaltyWidget),
        c = (0, n.P1)(s, (e) => e.enabled),
        d = (0, n.P1)(
          s,
          a.G,
          o.Zp,
          i.vD,
          (e, t, r, n) => (e.enabled || n) && (!t.checkout || r.onThankYou)
        );
    },
    1752: (e, t, r) => {
      "use strict";
      r.d(t, { BW: () => i, Lt: () => d, Of: () => c, XH: () => s });
      var n = r(9532),
        a = r(4421),
        o = r(3524),
        l = r(7960);
      const i = (e) => (0, n.PH)("[referee incentive] set code", { code: e }),
        s = () => (0, n.PH)("[referee incentive] set code fetching"),
        c = (e) =>
          (0, n.PH)("[referee incentive] set code fetching error", {
            error: e,
          }),
        d = (e) => async (t, r) => {
          t(s());
          const n = a.H.buildFromState(r(), t),
            d = await n.referrals.refereeIncentiveCode({
              siteToken: (0, o.MW)(r()),
              referralId: e,
            });
          "error" in d
            ? t(c(d.error))
            : (t(i(d.code)), t((0, l.jk)(d.referralBlocked)));
        };
    },
    7960: (e, t, r) => {
      "use strict";
      r.d(t, {
        Bw: () => i,
        C_: () => c,
        OJ: () => m,
        bp: () => s,
        jk: () => d,
        lm: () => u,
      });
      var n = r(9532),
        a = r(5833),
        o = r(4856),
        l = r(1752);
      const i = (e) =>
          (0, n.PH)("[referral welcome modal] set open", { open: e }),
        s = (e) => (t, r) => {
          const n = r(),
            s = (0, a._V)(n);
          if (!(0, o.pb)(n)) return;
          const c = !s;
          t(i(c)), c && t((0, l.Lt)(e));
        },
        c = () => (0, n.PH)("[referral welcome modal] close"),
        d = (e) =>
          (0, n.PH)("[referred] set referral blocked", { referralBlocked: e }),
        m = (e) =>
          (0, n.PH)(
            "[referral welcome modal] set discount applied modal open",
            { open: e }
          ),
        u = () => (e) => {
          e(m(!0));
        };
    },
    6777: (e, t, r) => {
      "use strict";
      r.d(t, { T: () => n });
      r(8274);
      class n extends Error {
        constructor(...e) {
          super(...e), (this.name = "ShopifyCartRequiredError");
        }
      }
    },
    3850: (e, t, r) => {
      "use strict";
      r.d(t, { T: () => n });
      r(8274);
      class n extends Error {
        constructor(...e) {
          super(...e), (this.name = "ShopifyCheckoutRedemptionError");
        }
      }
    },
    8836: (e, t, r) => {
      "use strict";
      r.d(t, { y: () => a });
      var n = r(481);
      async function a(e) {
        const { isMobile: t, onClose: r, parent: a, platform: o } = e,
          l =
            "facebook" === o || "generic" === o
              ? e.url
              : (function (e, t) {
                  switch (e) {
                    case "twitter":
                      return `https://twitter.com/${t}`;
                    case "instagram":
                      return `https://www.instagram.com/${t}/`;
                  }
                })(o, e.username),
          i = (function (e) {
            switch (e) {
              case "twitter":
                return "LION_TWITTER_PROFILE_PAGE";
              case "instagram":
                return "LION_INSTAGRAM_PROFILE_PAGE";
              case "facebook":
                return "LION_FACEBOOK_PROFILE_PAGE";
              case "generic":
                return "LION_GENERIC_PAGE";
            }
          })(o),
          s = a.open(l, i, ["width=900", "height=600"].join(","));
        if (t) return r();
        if (!s) return;
        const c = Date.now();
        let d = 0;
        for (; !s.closed && d <= 2e4; )
          await (0, n._v)(100), (d = Date.now() - c);
        r();
      }
    },
    2092: (e, t, r) => {
      "use strict";
      r.d(t, { S7: () => l, kA: () => s, lb: () => o, zM: () => i });
      r(9630);
      var n = r(9532),
        a = r(5170);
      const o = (e) => (0, n.PH)("[page] set init data", { initData: e }),
        l = (e) => (t, r) => {
          const n = (0, a.wq)(r()),
            l = e.customer?.id;
          if ("shogun" !== n || "string" != typeof l) return t(o(e));
          t(o({ ...e, customer: { ...e.customer, id: c(l) } }));
        },
        i = (e) =>
          (0, n.PH)("[page] set integrated page section", {
            kind: e.kind,
            section: e,
          }),
        s = (0, n.Lq)({ initData: null, integratedPageSections: {} }, (e) => [
          e(o, (e, t) => {
            let { initData: r } = t;
            return { ...e, initData: r };
          }),
          e(i, (e, t) => {
            let { kind: r, section: n } = t;
            return {
              ...e,
              integratedPageSections: { ...e.integratedPageSections, [r]: n },
            };
          }),
        ]);
      function c(e) {
        return atob(e).replace(/^.+\/Customer\//, "");
      }
    },
    6109: (e, t, r) => {
      "use strict";
      r.d(t, { xW: () => _, wD: () => h });
      var n = r(4494);
      var a = r(208),
        o = r(476),
        l = r(5273),
        i = r(5833),
        s = r(7564),
        c = r(8788),
        d = r(5627);
      function m(e, t, r, a) {
        switch (e.type) {
          case "flow":
          case "add":
          case "deduct":
            return (
              (e.note
                ? e.note[a] ??
                  ((l = e.note),
                  null !==
                    (i = Object.values((0, n.CE)(l, ["import_id"])).find(
                      (e) => e && e.length > 0
                    )) && void 0 !== i
                    ? i
                    : null)
                : null) ?? (0, o.t)("defaults.general.activity_reason")
            );
          case "rule":
            return t.find((t) => t.id === e.ruleId)?.displayTitle ?? "";
          case "reward":
            return r.find((t) => t.id === e.rewardId)?.title ?? "";
        }
        var l, i;
      }
      function u(e, t) {
        if ("reward" === e.type) {
          const r = t.find((t) => t.id === e.rewardId);
          if (!r || !(0, l.Vi)(r)) return;
          return r.target_site;
        }
      }
      function p(e) {
        return "reward" === e.type
          ? `-${(0, o.uf)(e.points)}`
          : `${(0, o.uf)(e.points)}`;
      }
      const _ = (0, a.P1)(i._V, (e) => (e ? e.actions : [])),
        h = (0, a.P1)(_, d._w, c.O5, s.fN, (e, t, r, n) =>
          e.map((e) =>
            (function (e, t, r, n) {
              return {
                ...e,
                displayPoints: p(e),
                actionText: m(e, t, r, n),
                ...("reward" === e.type ? { alienSite: u(e, r) } : {}),
              };
            })(e, t, r, n)
          )
        );
    },
    9544: (e, t, r) => {
      "use strict";
      r.d(t, { v: () => n });
      const n = (0, r(208).P1)(
        (e) => e.page.initData,
        (e) => {
          const t = e?.customer?.id;
          return "string" == typeof t && t.length > 0 ? t : null;
        }
      );
    },
    6918: (e, t, r) => {
      "use strict";
      r.d(t, { Z: () => n });
      const n = (e) => e.refereeIncentiveCode;
    },
    2123: (e, t, r) => {
      "use strict";
      r.d(t, { RD: () => o, WG: () => l, ox: () => i });
      var n = r(208);
      function a(e) {
        return e.referred;
      }
      const o = (0, n.P1)(a, (e) => e.isModalOpen),
        l = (0, n.P1)(a, (e) => e.isDiscountAppliedModalOpen),
        i = (e) => e.referred.referralBlocked;
    },
    9119: (e, t, r) => {
      "use strict";
      r.d(t, { O6: () => d, ci: () => u, wS: () => m });
      var n = r(208),
        a = r(4004),
        o = r(7377),
        l = r(1780),
        i = r(8788),
        s = r(5627),
        c = r(8268);
      const d = (0, n.P1)(c.Iq, s.De, s.HM, (e, t, r) => {
          if (!e) return 0;
          if (!t && 0 === r.length) return 0;
          return (
            o.uX.getBasePointsFromCart(e, t) + o.uX.getBonusPointsFromCart(e, r)
          );
        }),
        m = (0, n.P1)(
          c.Iq,
          c.po,
          c.eI,
          (e) => e,
          (e, t, r, n) => {
            if (!e) return 0;
            if (0 === t.length && 0 === r.length) return 0;
            return (
              t
                .filter((t) => t.cart_token === e.token)
                .reduce((e, t) => e + t.reward_cost - t.reserved_points, 0) +
              r
                .map((t) => ({
                  cost: u(t, e, n),
                  reservedPoints: t.reservedPoints,
                }))
                .reduce((e, t) => {
                  let { cost: r, reservedPoints: n } = t;
                  return e + r - n;
                }, 0)
            );
          }
        );
      function u(e, t, r) {
        const n = e.usages.find(
            (e) => e.cartIdentifier === t.token && "claimed" === e.status
          ),
          o = n && (0, l.w1)(r, n.claimedRewardId);
        (n && o) ||
          a.k.error(
            "Missing usage or claimedReward for script hash redemption",
            {
              redemptionId: e.id,
              redemptionUsages: e.usages.map((e) => e.id),
              usageId: n?.id,
              claimedRewardId: n?.claimedRewardId,
            }
          );
        const s = (0, i.kL)(r, e.rewardId);
        return o ? o.point_cost : s?.point_cost ?? 0;
      }
    },
    2126: (e, t, r) => {
      "use strict";
      r.d(t, { O: () => o });
      var n = r(6081);
      function a(e, t) {
        return (0, n.Du)((0, n.tn)(e, t));
      }
      const o = {
        scale: a,
        darken: function (e, t) {
          return a(e, { lightness: -t });
        },
        lighten: function (e, t) {
          return a(e, { lightness: t });
        },
        format: function (e) {
          return "string" == typeof e ? e : (0, n.Du)(e);
        },
      };
    },
    3052: (e, t, r) => {
      "use strict";
      function n(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {},
            a = Object.keys(r);
          "function" == typeof Object.getOwnPropertySymbols &&
            (a = a.concat(
              Object.getOwnPropertySymbols(r).filter(function (e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable;
              })
            )),
            a.forEach(function (t) {
              n(e, t, r[t]);
            });
        }
        return e;
      }
      r.d(t, { Z: () => a });
    },
    4029: (e, t, r) => {
      "use strict";
      r.d(t, { E: () => a });
      var n = (e) => {
        throw new TypeError(
          `Internal Error: encountered impossible value "${((e) => {
            if ("symbol" == typeof e) return e.toString();
            if (void 0 === e) return "undefined";
            if ("string" == typeof e) return e;
            try {
              return JSON.stringify(e);
            } catch (t) {
              if (t instanceof TypeError)
                return "bigint" == typeof e
                  ? `${e.toString()} (bigint)`
                  : "circular object";
              throw t;
            }
          })(e)}"`
        );
      };
      function a(e, t, r) {
        if (void 0 !== r) {
          let n = e,
            o = t;
          return a.tag(n, o, r);
        }
        let o = e,
          l = t;
        return Object.prototype.hasOwnProperty.call(l, o)
          ? (0, l[o])(o)
          : Object.prototype.hasOwnProperty.call(l, "_")
          ? l._()
          : n(o);
      }
      a.tag = (e, t, r) => {
        let a = e[t];
        return Object.prototype.hasOwnProperty.call(r, a)
          ? (0, r[a])(e)
          : Object.prototype.hasOwnProperty.call(r, "_")
          ? r._()
          : n(e);
      };
    },
  },
]);
