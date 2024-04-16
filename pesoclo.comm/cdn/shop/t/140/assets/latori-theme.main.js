!(function () {
  var e = {
      90: function (e) {
        !(function (t, n) {
          var o = (function (e, t, n) {
            "use strict";
            var o, r;
            if (
              ((function () {
                var t,
                  n = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    fastLoadedClass: "ls-is-cached",
                    iframeLoadMode: 0,
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: 0.8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125,
                  };
                for (t in ((r = e.lazySizesConfig || e.lazysizesConfig || {}),
                n))
                  t in r || (r[t] = n[t]);
              })(),
              !t || !t.getElementsByClassName)
            )
              return { init: function () {}, cfg: r, noSupport: !0 };
            var i = t.documentElement,
              a = e.HTMLPictureElement,
              s = "addEventListener",
              c = "getAttribute",
              l = e[s].bind(e),
              d = e.setTimeout,
              u = e.requestAnimationFrame || d,
              p = e.requestIdleCallback,
              f = /^picture$/i,
              h = ["load", "error", "lazyincluded", "_lazyloaded"],
              m = {},
              y = Array.prototype.forEach,
              g = function (e, t) {
                return (
                  m[t] || (m[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
                  m[t].test(e[c]("class") || "") && m[t]
                );
              },
              v = function (e, t) {
                g(e, t) ||
                  e.setAttribute(
                    "class",
                    (e[c]("class") || "").trim() + " " + t
                  );
              },
              b = function (e, t) {
                var n;
                (n = g(e, t)) &&
                  e.setAttribute(
                    "class",
                    (e[c]("class") || "").replace(n, " ")
                  );
              },
              E = function (e, t, n) {
                var o = n ? s : "removeEventListener";
                n && E(e, t),
                  h.forEach(function (n) {
                    e[o](n, t);
                  });
              },
              w = function (e, n, r, i, a) {
                var s = t.createEvent("Event");
                return (
                  r || (r = {}),
                  (r.instance = o),
                  s.initEvent(n, !i, !a),
                  (s.detail = r),
                  e.dispatchEvent(s),
                  s
                );
              },
              L = function (t, n) {
                var o;
                !a && (o = e.picturefill || r.pf)
                  ? (n &&
                      n.src &&
                      !t[c]("srcset") &&
                      t.setAttribute("srcset", n.src),
                    o({ reevaluate: !0, elements: [t] }))
                  : n && n.src && (t.src = n.src);
              },
              C = function (e, t) {
                return (getComputedStyle(e, null) || {})[t];
              },
              S = function (e, t, n) {
                for (
                  n = n || e.offsetWidth;
                  n < r.minSize && t && !e._lazysizesWidth;

                )
                  (n = t.offsetWidth), (t = t.parentNode);
                return n;
              },
              _ =
                ((ve = []),
                (be = []),
                (Ee = ve),
                (we = function () {
                  var e = Ee;
                  for (Ee = ve.length ? be : ve, ye = !0, ge = !1; e.length; )
                    e.shift()();
                  ye = !1;
                }),
                (Le = function (e, n) {
                  ye && !n
                    ? e.apply(this, arguments)
                    : (Ee.push(e), ge || ((ge = !0), (t.hidden ? d : u)(we)));
                }),
                (Le._lsFlush = we),
                Le),
              O = function (e, t) {
                return t
                  ? function () {
                      _(e);
                    }
                  : function () {
                      var t = this,
                        n = arguments;
                      _(function () {
                        e.apply(t, n);
                      });
                    };
              },
              T = function (e) {
                var t,
                  o = 0,
                  i = r.throttleDelay,
                  a = r.ricTimeout,
                  s = function () {
                    (t = !1), (o = n.now()), e();
                  },
                  c =
                    p && a > 49
                      ? function () {
                          p(s, { timeout: a }),
                            a !== r.ricTimeout && (a = r.ricTimeout);
                        }
                      : O(function () {
                          d(s);
                        }, !0);
                return function (e) {
                  var r;
                  (e = !0 === e) && (a = 33),
                    t ||
                      ((t = !0),
                      (r = i - (n.now() - o)) < 0 && (r = 0),
                      e || r < 9 ? c() : d(c, r));
                };
              },
              N = function (e) {
                var t,
                  o,
                  r = 99,
                  i = function () {
                    (t = null), e();
                  },
                  a = function () {
                    var e = n.now() - o;
                    e < r ? d(a, r - e) : (p || i)(i);
                  };
                return function () {
                  (o = n.now()), t || (t = d(a, r));
                };
              },
              z =
                ((Z = /^img$/i),
                (G = /^iframe$/i),
                (Q =
                  "onscroll" in e && !/(gle|ing)bot/.test(navigator.userAgent)),
                (K = 0),
                (X = 0),
                (Y = 0),
                (ee = -1),
                (te = function (e) {
                  Y--, (!e || Y < 0 || !e.target) && (Y = 0);
                }),
                (ne = function (e) {
                  return (
                    null == J && (J = "hidden" == C(t.body, "visibility")),
                    J ||
                      !(
                        "hidden" == C(e.parentNode, "visibility") &&
                        "hidden" == C(e, "visibility")
                      )
                  );
                }),
                (oe = function (e, n) {
                  var o,
                    r = e,
                    a = ne(e);
                  for (
                    I -= n, V += n, U -= n, W += n;
                    a && (r = r.offsetParent) && r != t.body && r != i;

                  )
                    (a = (C(r, "opacity") || 1) > 0) &&
                      "visible" != C(r, "overflow") &&
                      ((o = r.getBoundingClientRect()),
                      (a =
                        W > o.left &&
                        U < o.right &&
                        V > o.top - 1 &&
                        I < o.bottom + 1));
                  return a;
                }),
                (re = function () {
                  var e,
                    n,
                    a,
                    s,
                    l,
                    d,
                    u,
                    p,
                    f,
                    h,
                    m,
                    y,
                    g = o.elements;
                  if ((F = r.loadMode) && Y < 8 && (e = g.length)) {
                    for (n = 0, ee++; n < e; n++)
                      if (g[n] && !g[n]._lazyRace)
                        if (
                          !Q ||
                          (o.prematureUnveil && o.prematureUnveil(g[n]))
                        )
                          pe(g[n]);
                        else if (
                          (((p = g[n][c]("data-expand")) && (d = 1 * p)) ||
                            (d = X),
                          h ||
                            ((h =
                              !r.expand || r.expand < 1
                                ? i.clientHeight > 500 && i.clientWidth > 500
                                  ? 500
                                  : 370
                                : r.expand),
                            (o._defEx = h),
                            (m = h * r.expFactor),
                            (y = r.hFac),
                            (J = null),
                            X < m && Y < 1 && ee > 2 && F > 2 && !t.hidden
                              ? ((X = m), (ee = 0))
                              : (X = F > 1 && ee > 1 && Y < 6 ? h : K)),
                          f !== d &&
                            ((B = innerWidth + d * y),
                            (R = innerHeight + d),
                            (u = -1 * d),
                            (f = d)),
                          (a = g[n].getBoundingClientRect()),
                          (V = a.bottom) >= u &&
                            (I = a.top) <= R &&
                            (W = a.right) >= u * y &&
                            (U = a.left) <= B &&
                            (V || W || U || I) &&
                            (r.loadHidden || ne(g[n])) &&
                            ((k && Y < 3 && !p && (F < 3 || ee < 4)) ||
                              oe(g[n], d)))
                        ) {
                          if ((pe(g[n]), (l = !0), Y > 9)) break;
                        } else
                          !l &&
                            k &&
                            !s &&
                            Y < 4 &&
                            ee < 4 &&
                            F > 2 &&
                            (D[0] || r.preloadAfterLoad) &&
                            (D[0] ||
                              (!p &&
                                (V ||
                                  W ||
                                  U ||
                                  I ||
                                  "auto" != g[n][c](r.sizesAttr)))) &&
                            (s = D[0] || g[n]);
                    s && !l && pe(s);
                  }
                }),
                (ie = T(re)),
                (ae = function (e) {
                  var t = e.target;
                  t._lazyCache
                    ? delete t._lazyCache
                    : (te(e),
                      v(t, r.loadedClass),
                      b(t, r.loadingClass),
                      E(t, ce),
                      w(t, "lazyloaded"));
                }),
                (se = O(ae)),
                (ce = function (e) {
                  se({ target: e.target });
                }),
                (le = function (e, t) {
                  var n = e.getAttribute("data-load-mode") || r.iframeLoadMode;
                  0 == n
                    ? e.contentWindow.location.replace(t)
                    : 1 == n && (e.src = t);
                }),
                (de = function (e) {
                  var t,
                    n = e[c](r.srcsetAttr);
                  (t = r.customMedia[e[c]("data-media") || e[c]("media")]) &&
                    e.setAttribute("media", t),
                    n && e.setAttribute("srcset", n);
                }),
                (ue = O(function (e, t, n, o, i) {
                  var a, s, l, u, p, h;
                  (p = w(e, "lazybeforeunveil", t)).defaultPrevented ||
                    (o &&
                      (n ? v(e, r.autosizesClass) : e.setAttribute("sizes", o)),
                    (s = e[c](r.srcsetAttr)),
                    (a = e[c](r.srcAttr)),
                    i && (u = (l = e.parentNode) && f.test(l.nodeName || "")),
                    (h = t.firesLoad || ("src" in e && (s || a || u))),
                    (p = { target: e }),
                    v(e, r.loadingClass),
                    h && (clearTimeout(q), (q = d(te, 2500)), E(e, ce, !0)),
                    u && y.call(l.getElementsByTagName("source"), de),
                    s
                      ? e.setAttribute("srcset", s)
                      : a &&
                        !u &&
                        (G.test(e.nodeName) ? le(e, a) : (e.src = a)),
                    i && (s || u) && L(e, { src: a })),
                    e._lazyRace && delete e._lazyRace,
                    b(e, r.lazyClass),
                    _(function () {
                      var t = e.complete && e.naturalWidth > 1;
                      (h && !t) ||
                        (t && v(e, r.fastLoadedClass),
                        ae(p),
                        (e._lazyCache = !0),
                        d(function () {
                          "_lazyCache" in e && delete e._lazyCache;
                        }, 9)),
                        "lazy" == e.loading && Y--;
                    }, !0);
                })),
                (pe = function (e) {
                  if (!e._lazyRace) {
                    var t,
                      n = Z.test(e.nodeName),
                      o = n && (e[c](r.sizesAttr) || e[c]("sizes")),
                      i = "auto" == o;
                    ((!i && k) ||
                      !n ||
                      (!e[c]("src") && !e.srcset) ||
                      e.complete ||
                      g(e, r.errorClass) ||
                      !g(e, r.lazyClass)) &&
                      ((t = w(e, "lazyunveilread").detail),
                      i && A.updateElem(e, !0, e.offsetWidth),
                      (e._lazyRace = !0),
                      Y++,
                      ue(e, t, i, o, n));
                  }
                }),
                (fe = N(function () {
                  (r.loadMode = 3), ie();
                })),
                (he = function () {
                  3 == r.loadMode && (r.loadMode = 2), fe();
                }),
                (me = function () {
                  k ||
                    (n.now() - $ < 999
                      ? d(me, 999)
                      : ((k = !0),
                        (r.loadMode = 3),
                        ie(),
                        l("scroll", he, !0)));
                }),
                {
                  _: function () {
                    ($ = n.now()),
                      (o.elements = t.getElementsByClassName(r.lazyClass)),
                      (D = t.getElementsByClassName(
                        r.lazyClass + " " + r.preloadClass
                      )),
                      l("scroll", ie, !0),
                      l("resize", ie, !0),
                      l("pageshow", function (e) {
                        if (e.persisted) {
                          var n = t.querySelectorAll("." + r.loadingClass);
                          n.length &&
                            n.forEach &&
                            u(function () {
                              n.forEach(function (e) {
                                e.complete && pe(e);
                              });
                            });
                        }
                      }),
                      e.MutationObserver
                        ? new MutationObserver(ie).observe(i, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0,
                          })
                        : (i[s]("DOMNodeInserted", ie, !0),
                          i[s]("DOMAttrModified", ie, !0),
                          setInterval(ie, 999)),
                      l("hashchange", ie, !0),
                      [
                        "focus",
                        "mouseover",
                        "click",
                        "load",
                        "transitionend",
                        "animationend",
                      ].forEach(function (e) {
                        t[s](e, ie, !0);
                      }),
                      /d$|^c/.test(t.readyState)
                        ? me()
                        : (l("load", me),
                          t[s]("DOMContentLoaded", ie),
                          d(me, 2e4)),
                      o.elements.length ? (re(), _._lsFlush()) : ie();
                  },
                  checkElems: ie,
                  unveil: pe,
                  _aLSL: he,
                }),
              A =
                ((x = O(function (e, t, n, o) {
                  var r, i, a;
                  if (
                    ((e._lazysizesWidth = o),
                    (o += "px"),
                    e.setAttribute("sizes", o),
                    f.test(t.nodeName || ""))
                  )
                    for (
                      i = 0, a = (r = t.getElementsByTagName("source")).length;
                      i < a;
                      i++
                    )
                      r[i].setAttribute("sizes", o);
                  n.detail.dataAttr || L(e, n.detail);
                })),
                (j = function (e, t, n) {
                  var o,
                    r = e.parentNode;
                  r &&
                    ((n = S(e, r, n)),
                    (o = w(e, "lazybeforesizes", { width: n, dataAttr: !!t }))
                      .defaultPrevented ||
                      ((n = o.detail.width) &&
                        n !== e._lazysizesWidth &&
                        x(e, r, o, n)));
                }),
                (H = N(function () {
                  var e,
                    t = M.length;
                  if (t) for (e = 0; e < t; e++) j(M[e]);
                })),
                {
                  _: function () {
                    (M = t.getElementsByClassName(r.autosizesClass)),
                      l("resize", H);
                  },
                  checkElems: H,
                  updateElem: j,
                }),
              P = function () {
                !P.i && t.getElementsByClassName && ((P.i = !0), A._(), z._());
              };
            var M, x, j, H;
            var D,
              k,
              q,
              F,
              $,
              B,
              R,
              I,
              U,
              W,
              V,
              J,
              Z,
              G,
              Q,
              K,
              X,
              Y,
              ee,
              te,
              ne,
              oe,
              re,
              ie,
              ae,
              se,
              ce,
              le,
              de,
              ue,
              pe,
              fe,
              he,
              me;
            var ye, ge, ve, be, Ee, we, Le;
            return (
              d(function () {
                r.init && P();
              }),
              (o = {
                cfg: r,
                autoSizer: A,
                loader: z,
                init: P,
                uP: L,
                aC: v,
                rC: b,
                hC: g,
                fire: w,
                gW: S,
                rAF: _,
              })
            );
          })(t, t.document, Date);
          (t.lazySizes = o), e.exports && (e.exports = o);
        })("undefined" != typeof window ? window : {});
      },
      505: function (e, t, n) {
        var o, r, i;
        !(function (a, s) {
          if (a) {
            (s = s.bind(null, a, a.document)),
              e.exports
                ? s(n(90))
                : ((r = [n(90)]),
                  void 0 ===
                    (i = "function" == typeof (o = s) ? o.apply(t, r) : o) ||
                    (e.exports = i));
          }
        })("undefined" != typeof window ? window : 0, function (e, t, n) {
          "use strict";
          var o = function () {
            var r,
              i,
              a,
              s,
              c,
              l,
              d,
              u = n.cfg,
              p = {
                "data-bgset": 1,
                "data-include": 1,
                "data-poster": 1,
                "data-bg": 1,
                "data-script": 1,
              },
              f = "(\\s|^)(" + u.loadedClass,
              h = t.documentElement,
              m = function (e) {
                n.rAF(function () {
                  n.rC(e, u.loadedClass),
                    u.unloadedClass && n.rC(e, u.unloadedClass),
                    n.aC(e, u.lazyClass),
                    ("none" == e.style.display ||
                      (e.parentNode && "none" == e.parentNode.style.display)) &&
                      setTimeout(function () {
                        n.loader.unveil(e);
                      }, 0);
                });
              },
              y = function (e) {
                var t, n, o, r;
                for (t = 0, n = e.length; t < n; t++)
                  (r = (o = e[t]).target).getAttribute(o.attributeName) &&
                    ("source" == r.localName &&
                      r.parentNode &&
                      (r = r.parentNode.querySelector("img")),
                    r && f.test(r.className) && m(r));
              };
            u.unloadedClass && (f += "|" + u.unloadedClass),
              (f += "|" + u.loadingClass + ")(\\s|$)"),
              (f = new RegExp(f)),
              (p[u.srcAttr] = 1),
              (p[u.srcsetAttr] = 1),
              e.MutationObserver
                ? ((a = new MutationObserver(y)),
                  (r = function () {
                    s ||
                      ((s = !0),
                      a.observe(h, {
                        subtree: !0,
                        attributes: !0,
                        attributeFilter: Object.keys(p),
                      }));
                  }),
                  (i = function () {
                    s && ((s = !1), a.disconnect());
                  }))
                : (h.addEventListener(
                    "DOMAttrModified",
                    ((l = []),
                    (d = function () {
                      y(l), (l = []), (c = !1);
                    }),
                    function (e) {
                      s &&
                        p[e.attrName] &&
                        e.newValue &&
                        (l.push({
                          target: e.target,
                          attributeName: e.attrName,
                        }),
                        c || (setTimeout(d), (c = !0)));
                    }),
                    !0
                  ),
                  (r = function () {
                    s = !0;
                  }),
                  (i = function () {
                    s = !1;
                  })),
              addEventListener("lazybeforeunveil", i, !0),
              addEventListener("lazybeforeunveil", r),
              addEventListener("lazybeforesizes", i, !0),
              addEventListener("lazybeforesizes", r),
              r(),
              removeEventListener("lazybeforeunveil", o);
          };
          addEventListener("lazybeforeunveil", o);
        });
      },
      449: function (e, t, n) {
        /**
         *
         *
         * @author Jerry Bendy <jerry@icewingcc.com>
         * @licence MIT
         *
         */
        !(function (e) {
          "use strict";
          var t,
            n = (function () {
              try {
                if (
                  e.URLSearchParams &&
                  "bar" === new e.URLSearchParams("foo=bar").get("foo")
                )
                  return e.URLSearchParams;
              } catch (e) {}
              return null;
            })(),
            o = n && "a=1" === new n({ a: 1 }).toString(),
            r = n && "+" === new n("s=%2B").get("s"),
            i =
              !n ||
              ((t = new n()).append("s", " &"), "s=+%26" === t.toString()),
            a = d.prototype,
            s = !(!e.Symbol || !e.Symbol.iterator);
          if (!(n && o && r && i)) {
            var c;
            (a.append = function (e, t) {
              m(this.__URLSearchParams__, e, t);
            }),
              (a.delete = function (e) {
                delete this.__URLSearchParams__[e];
              }),
              (a.get = function (e) {
                var t = this.__URLSearchParams__;
                return this.has(e) ? t[e][0] : null;
              }),
              (a.getAll = function (e) {
                var t = this.__URLSearchParams__;
                return this.has(e) ? t[e].slice(0) : [];
              }),
              (a.has = function (e) {
                return g(this.__URLSearchParams__, e);
              }),
              (a.set = function (e, t) {
                this.__URLSearchParams__[e] = ["" + t];
              }),
              (a.toString = function () {
                var e,
                  t,
                  n,
                  o,
                  r = this.__URLSearchParams__,
                  i = [];
                for (t in r)
                  for (n = u(t), e = 0, o = r[t]; e < o.length; e++)
                    i.push(n + "=" + u(o[e]));
                return i.join("&");
              }),
              !!r && n && !o && e.Proxy
                ? ((c = new Proxy(n, {
                    construct: function (e, t) {
                      return new e(new d(t[0]).toString());
                    },
                  })).toString = Function.prototype.toString.bind(d))
                : (c = d),
              Object.defineProperty(e, "URLSearchParams", { value: c });
            var l = e.URLSearchParams.prototype;
            (l.polyfill = !0),
              (l.forEach =
                l.forEach ||
                function (e, t) {
                  var n = h(this.toString());
                  Object.getOwnPropertyNames(n).forEach(function (o) {
                    n[o].forEach(function (n) {
                      e.call(t, n, o, this);
                    }, this);
                  }, this);
                }),
              (l.sort =
                l.sort ||
                function () {
                  var e,
                    t,
                    n,
                    o = h(this.toString()),
                    r = [];
                  for (e in o) r.push(e);
                  for (r.sort(), t = 0; t < r.length; t++) this.delete(r[t]);
                  for (t = 0; t < r.length; t++) {
                    var i = r[t],
                      a = o[i];
                    for (n = 0; n < a.length; n++) this.append(i, a[n]);
                  }
                }),
              (l.keys =
                l.keys ||
                function () {
                  var e = [];
                  return (
                    this.forEach(function (t, n) {
                      e.push(n);
                    }),
                    f(e)
                  );
                }),
              (l.values =
                l.values ||
                function () {
                  var e = [];
                  return (
                    this.forEach(function (t) {
                      e.push(t);
                    }),
                    f(e)
                  );
                }),
              (l.entries =
                l.entries ||
                function () {
                  var e = [];
                  return (
                    this.forEach(function (t, n) {
                      e.push([n, t]);
                    }),
                    f(e)
                  );
                }),
              s && (l[e.Symbol.iterator] = l[e.Symbol.iterator] || l.entries);
          }
          function d(e) {
            ((e = e || "") instanceof URLSearchParams || e instanceof d) &&
              (e = e.toString()),
              (this.__URLSearchParams__ = h(e));
          }
          function u(e) {
            var t = {
              "!": "%21",
              "'": "%27",
              "(": "%28",
              ")": "%29",
              "~": "%7E",
              "%20": "+",
              "%00": "\0",
            };
            return encodeURIComponent(e).replace(
              /[!'\(\)~]|%20|%00/g,
              function (e) {
                return t[e];
              }
            );
          }
          function p(e) {
            return e
              .replace(/[ +]/g, "%20")
              .replace(/(%[a-f0-9]{2})+/gi, function (e) {
                return decodeURIComponent(e);
              });
          }
          function f(t) {
            var n = {
              next: function () {
                var e = t.shift();
                return { done: void 0 === e, value: e };
              },
            };
            return (
              s &&
                (n[e.Symbol.iterator] = function () {
                  return n;
                }),
              n
            );
          }
          function h(e) {
            var t = {};
            if ("object" == typeof e)
              if (y(e))
                for (var n = 0; n < e.length; n++) {
                  var o = e[n];
                  if (!y(o) || 2 !== o.length)
                    throw new TypeError(
                      "Failed to construct 'URLSearchParams': Sequence initializer must only contain pair elements"
                    );
                  m(t, o[0], o[1]);
                }
              else for (var r in e) e.hasOwnProperty(r) && m(t, r, e[r]);
            else {
              0 === e.indexOf("?") && (e = e.slice(1));
              for (var i = e.split("&"), a = 0; a < i.length; a++) {
                var s = i[a],
                  c = s.indexOf("=");
                -1 < c
                  ? m(t, p(s.slice(0, c)), p(s.slice(c + 1)))
                  : s && m(t, p(s), "");
              }
            }
            return t;
          }
          function m(e, t, n) {
            var o =
              "string" == typeof n
                ? n
                : null != n && "function" == typeof n.toString
                ? n.toString()
                : JSON.stringify(n);
            g(e, t) ? e[t].push(o) : (e[t] = [o]);
          }
          function y(e) {
            return (
              !!e && "[object Array]" === Object.prototype.toString.call(e)
            );
          }
          function g(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
        })(void 0 !== n.g ? n.g : "undefined" != typeof window ? window : this);
      },
      624: function () {
        document.addEventListener("DOMContentLoaded", () => {
          const e = document.querySelectorAll(
            ".countdown-section [data-end-date]"
          );
          e &&
            e.forEach((e) => {
              const t = 1e3 * e.dataset.endDate;
              "false" === e.parentElement.dataset.sticky &&
                e.closest(".countdown-section").classList.remove("sticky");
              let n = setInterval(() => {
                let o = new Date(),
                  r = t - o.getTime(),
                  i = Math.floor(r / 864e5),
                  a = Math.floor(r / 60 / 60 / 1e3),
                  s = Math.floor((r % 36e5) / 6e4),
                  c = Math.floor((r % 6e4) / 1e3);
                if (
                  (a < 10 && (a = "0" + a),
                  s < 10 && (s = "0" + s),
                  c < 10 && (c = "0" + c),
                  r >= 0)
                ) {
                  (a >= 24 || s >= 60 || c >= 60) &&
                    ((a %= 24), a < 10 && (a = "0" + a));
                  let t = "day";
                  i && "0" !== i && +i > 1 && (t = "days"),
                    (e.querySelector("[data-timer]").innerText =
                      i && "0" !== i
                        ? `${i} ${t} ${a}h:${s}m:${c}s`
                        : `${a}h:${s}m:${c}s`);
                } else
                  clearInterval(n), e.closest(".countdown-section").remove();
              }, 1e3);
            });
        });
      },
      133: function () {
        function e(e, t) {
          if ((console.log("handleHeightNavigationSeperator"), e)) {
            let e = t.closest("ul.child"),
              n = e.querySelectorAll("li:not(.grandchild li)"),
              o = 0,
              r = !1;
            if (n.length > 0)
              for (let e = 0; e < n.length; e++) {
                let t = n[e];
                r || o++, t.classList.contains("open") && (r = !0);
              }
            let i = "child-count-" + o;
            e.classList.remove("child-count-1"),
              e.classList.remove("child-count-2"),
              e.classList.remove("child-count-3"),
              e.classList.add(i);
          } else {
            let e = t.querySelectorAll("li:not(.grandchild li)"),
              n = 0,
              o = !1;
            if (e.length > 0) {
              for (let t = 0; t < e.length; t++) {
                let r = e[t];
                o || n++, r.classList.contains("open") && (o = !0);
              }
              let r = "child-count-" + n;
              t.classList.remove("child-count-1"),
                t.classList.remove("child-count-2"),
                t.classList.remove("child-count-3"),
                t.classList.add(r);
            }
          }
        }
        document.addEventListener("DOMContentLoaded", () => {
          document.body.classList.contains("template-password") ||
            (!(function () {
              let t = document.querySelectorAll("[data-toggle-menu]");
              for (var n = 0; n < t.length; n++)
                t[n].addEventListener("click", function (t) {
                  t.preventDefault();
                  let n = t.target,
                    o = n.closest("li").parentElement.querySelector(".open"),
                    r = n.closest("li").querySelector("ul.child"),
                    i = !1;
                  if (
                    (r ||
                      ((r = n.closest("li").querySelector("ul.grandchild")),
                      (i = !0)),
                    o &&
                      o !== n.closest("li") &&
                      (n
                        .closest("li")
                        .parentElement.querySelector(".open")
                        .classList.toggle("open"),
                      o
                        .querySelector(".header__menu-toggle")
                        .classList.remove("list-active"),
                      n
                        .closest("li")
                        .parentElement.classList.remove("child-open"),
                      o.querySelector("ul.child") &&
                        (o.querySelector("ul.child").style.maxHeight = null)),
                    n.closest("li").classList.toggle("open"),
                    n
                      .closest("li")
                      .parentElement.classList.toggle("child-open"),
                    n.classList.contains("header__menu-toggle")
                      ? n.classList.toggle("list-active")
                      : n
                          .closest("li")
                          .querySelector(".header__menu-toggle")
                          .classList.toggle("list-active"),
                    r &&
                      (n.closest("li").classList.contains("open") ||
                        n.classList.contains("header__menu-toggle")) &&
                      o !== n.closest("li"))
                  )
                    if (i) {
                      let e = r.scrollHeight,
                        t = r.closest("ul.child").scrollHeight;
                      r.closest("ul.child").style.maxHeight = e + t + "px";
                    } else r.style.maxHeight = r.scrollHeight + "px";
                  else
                    (r.closest("ul.child").style.maxHeight =
                      r.parentElement.querySelector("a").scrollHeight + "px"),
                      (r.style.maxHeight = null);
                  e(i, r);
                });
            })(),
            document.querySelectorAll("[data-modal]").forEach(function (e) {
              e.addEventListener("click", function (t) {
                t.preventDefault();
                const n = document.getElementById(e.dataset.modal);
                n.classList.add("open"),
                  n.querySelectorAll(".modal-exit").forEach(function (e) {
                    e.addEventListener("click", function (e) {
                      e.preventDefault(), n.classList.remove("open");
                    });
                  });
              });
            }),
            (function () {
              let e = document.getElementById("sidebar"),
                t = document.querySelectorAll("[data-sidebar]");
              for (var n = 0; n < t.length; n++)
                t[n].addEventListener("click", function (t) {
                  t.preventDefault(),
                    document.body.classList.add("sidebar--open"),
                    e.classList.add("active");
                });
              let o = document.querySelectorAll("[data-sidebar-close]");
              for (n = 0; n < o.length; n++)
                o[n].addEventListener("click", function (t) {
                  t.preventDefault(),
                    document.body.classList.remove("sidebar--open"),
                    e.classList.remove("active");
                });
              document.addEventListener(
                "click",
                function (t) {
                  t.target.closest("#sidebar") ||
                    t.target.closest("[data-sidebar]") ||
                    t.target.closest(".currency__modal") ||
                    e.classList.remove("active");
                },
                !1
              );
            })(),
            (function () {
              let e = document.querySelectorAll("[data-cart-number]");
              theme.getCart(function (t) {
                if (t && t.item_count && t.item_count > 0)
                  for (var n = 0; n < e.length; n++)
                    e[n].innerHTML = t.item_count;
              });
            })(),
            document
              .querySelectorAll(".shopify-localization-form select")
              .forEach(function (e) {
                e.addEventListener("change", function (e) {
                  e.target.form.submit();
                });
              }),
            document
              .querySelectorAll(".shopify-currency-form select")
              .forEach(function (e) {
                e.addEventListener("change", function (t) {
                  (e
                    .closest(".shopify-currency-form")
                    .querySelector('[name="currency"]').value = e.value),
                    t.target.form.submit();
                });
              }));
        });
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var i = (t[o] = { exports: {} });
    return e[o].call(i.exports, i, i.exports, n), i.exports;
  }
  (n.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (function () {
      "use strict";
      n(449), n(90), n(505);
      var e = {
        products: {
          addToCart: {
            start: new Event("products:addToCart:start"),
            end: new Event("products:addToCart:end"),
            success: new Event("products:addToCart:success"),
          },
          removeFromCart: {
            start: new Event("products:removeFromCart:start"),
            end: new Event("products:removeFromCart:end"),
          },
        },
        cart: {
          get: {
            start: new Event("cart:get:start"),
            end: new Event("cart:get:end"),
          },
          updated: new Event("cart:updated"),
          cleared: new Event("cart:cleared"),
        },
        quickshop: {
          addToCart: {
            start: new Event("quickshop:addToCart:start"),
            end: new Event("quickshop:addToCart:end"),
          },
        },
      };
      const t = new Headers();
      t.append("Content-Type", "application/json"),
        (function (e, t, n) {
          function o(e, t) {
            return typeof e === t;
          }
          function r() {
            return "function" != typeof t.createElement
              ? t.createElement(arguments[0])
              : u
              ? t.createElementNS.call(
                  t,
                  "http://www.w3.org/2000/svg",
                  arguments[0]
                )
              : t.createElement.apply(t, arguments);
          }
          function i() {
            var e = t.body;
            return e || ((e = r(u ? "svg" : "body")).fake = !0), e;
          }
          var a = [],
            s = [],
            c = {
              _version: "3.6.0",
              _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0,
              },
              _q: [],
              on: function (e, t) {
                var n = this;
                setTimeout(function () {
                  t(n[e]);
                }, 0);
              },
              addTest: function (e, t, n) {
                s.push({ name: e, fn: t, options: n });
              },
              addAsyncTest: function (e) {
                s.push({ name: null, fn: e });
              },
            },
            l = function () {};
          (l.prototype = c), (l = new l());
          var d = t.documentElement,
            u = "svg" === d.nodeName.toLowerCase(),
            p = c._config.usePrefixes
              ? " -webkit- -moz- -o- -ms- ".split(" ")
              : ["", ""];
          c._prefixes = p;
          var f = (c.testStyles = function (e, n, o, a) {
            var s,
              c,
              l,
              u,
              p = "modernizr",
              f = r("div"),
              h = i();
            if (parseInt(o, 10))
              for (; o--; )
                ((l = r("div")).id = a ? a[o] : p + (o + 1)), f.appendChild(l);
            return (
              ((s = r("style")).type = "text/css"),
              (s.id = "s" + p),
              (h.fake ? h : f).appendChild(s),
              h.appendChild(f),
              s.styleSheet
                ? (s.styleSheet.cssText = e)
                : s.appendChild(t.createTextNode(e)),
              (f.id = p),
              h.fake &&
                ((h.style.background = ""),
                (h.style.overflow = "hidden"),
                (u = d.style.overflow),
                (d.style.overflow = "hidden"),
                d.appendChild(h)),
              (c = n(f, e)),
              h.fake
                ? (h.parentNode.removeChild(h),
                  (d.style.overflow = u),
                  d.offsetHeight)
                : f.parentNode.removeChild(f),
              !!c
            );
          });
          l.addTest("touchevents", function () {
            var n;
            if (
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof DocumentTouch)
            )
              n = !0;
            else {
              var o = [
                "@media (",
                p.join("touch-enabled),("),
                "heartz",
                ")",
                "{#modernizr{top:9px;position:absolute}}",
              ].join("");
              f(o, function (e) {
                n = 9 === e.offsetTop;
              });
            }
            return n;
          }),
            (function () {
              var e, t, n, r, i, c;
              for (var d in s)
                if (s.hasOwnProperty(d)) {
                  if (
                    ((e = []),
                    (t = s[d]).name &&
                      (e.push(t.name.toLowerCase()),
                      t.options &&
                        t.options.aliases &&
                        t.options.aliases.length))
                  )
                    for (n = 0; n < t.options.aliases.length; n++)
                      e.push(t.options.aliases[n].toLowerCase());
                  for (
                    r = o(t.fn, "function") ? t.fn() : t.fn, i = 0;
                    i < e.length;
                    i++
                  )
                    1 === (c = e[i].split(".")).length
                      ? (l[c[0]] = r)
                      : (!l[c[0]] ||
                          l[c[0]] instanceof Boolean ||
                          (l[c[0]] = new Boolean(l[c[0]])),
                        (l[c[0]][c[1]] = r)),
                      a.push((r ? "" : "no-") + c.join("-"));
                }
            })(),
            (function (e) {
              var t = d.className,
                n = l._config.classPrefix || "";
              if ((u && (t = t.baseVal), l._config.enableJSClass)) {
                var o = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
                t = t.replace(o, "$1" + n + "js$2");
              }
              l._config.enableClasses &&
                ((t += " " + n + e.join(" " + n)),
                u ? (d.className.baseVal = t) : (d.className = t));
            })(a),
            delete c.addTest,
            delete c.addAsyncTest;
          for (var h = 0; h < l._q.length; h++) l._q[h]();
          e.Modernizr = l;
        })(window, document),
        (theme.onCartUpdate = (t) => {
          (e.cart.updated.cart = t), document.dispatchEvent(e.cart.updated);
        }),
        (theme.onItemsAdded = (t) => {
          t && document.dispatchEvent(e.products.addToCart.success),
            (e.products.addToCart.end.items = t),
            document.dispatchEvent(e.products.addToCart.end);
        }),
        (theme.getCart = async (t) => {
          document.dispatchEvent(e.cart.get.start);
          const n = await fetch(`${Shopify.routes.root}cart?view=_json`).then(
            (e) => e.json()
          );
          return (
            document.dispatchEvent(e.cart.get.end),
            "function" == typeof t && t(n),
            theme.onCartUpdate(n)
          );
        }),
        (theme.hideMessage = function (e, t) {
          let n = 0;
          for (n = 0; n < e.length; ++n)
            e[n].classList.contains(t) || e[n].classList.add(t);
        }),
        (theme.showMessage = function (e, t) {
          let n = 0;
          for (n = 0; n < e.length; ++n) e[n].classList.remove(t);
        }),
        (theme.clearCart = async (n) => {
          const o = await fetch(`${Shopify.routes.root}cart/clear`, {
            method: "GET",
            headers: t,
          });
          document.dispatchEvent(e.cart.cleared),
            "function" == typeof n && n(o);
        }),
        (theme.addToCart = async (n, o, r) => {
          (e.products.addToCart.start.items = n),
            document.dispatchEvent(e.products.addToCart.start),
            r && (r.classList.add("loading"), r.setAttribute("disabled", !0));
          const i = await fetch(`${Shopify.routes.root}cart/add.js`, {
            method: "POST",
            headers: t,
            body: JSON.stringify({ items: n }),
          }).then(async (e) => await e.json());
          "function" == typeof o && o(i),
            r &&
              (r.classList.remove("loading"),
              r.classList.add("success"),
              setTimeout(() => {
                r.removeAttribute("disabled"), r.classList.remove("success");
              }, 1e3)),
            theme.onItemsAdded(i.items),
            theme.getCart();
        }),
        (theme.removeFromCart = async (n, o) => {
          if (!Array.isArray(n)) throw "error";
          (e.products.removeFromCart.start.items = n),
            document.dispatchEvent(e.products.removeFromCart.start);
          const r = await fetch(`${Shopify.routes.root}cart/update.js`, {
            method: "POST",
            headers: t,
            body: JSON.stringify({
              updates: Object.assign({}, ...n.map((e) => ({ [e]: 0 }))),
            }),
          }).then((e) => e.json());
          document.dispatchEvent(e.products.removeFromCart.end),
            "function" == typeof o && o(r),
            theme.getCart();
        }),
        (theme.updateCart = async (e, n) => {
          const o = await fetch(`${Shopify.routes.root}cart/update.js`, {
            method: "POST",
            headers: t,
            body: JSON.stringify({ updates: e }),
          }).then((e) => e.json());
          "function" == typeof n && n(o), theme.getCart();
        }),
        (theme.loaderShow = function (e) {
          e && e.classList.add("active");
        }),
        (theme.loaderHide = function (e) {
          e && e.classList.remove("active");
        }),
        (theme.updateCartNote = async (e, n) => {
          const o = await fetch(`${Shopify.routes.root}cart/update.js`, {
            method: "POST",
            headers: t,
            body: JSON.stringify({ note: e }),
          }).then((e) => e.json());
          "function" == typeof n && n(o), theme.getCart();
        }),
        (theme.changeQuantity = async (e, n, o) => {
          const r = await fetch(`${Shopify.routes.root}cart/update.js`, {
            method: "POST",
            headers: t,
            body: JSON.stringify({ updates: { [e]: n } }),
          }).then((e) => e.json());
          "function" == typeof o && o(r), theme.getCart();
        }),
        (theme.quickshop = (e) => {
          e &&
            e.dataset.variantId &&
            theme.addToCart([{ id: e.dataset.variantId, quantity: 1 }]);
        }),
        (theme.formatMoney = function (e, t) {
          function n(e, t) {
            return void 0 === e ? t : e;
          }
          function o(e, t, o, r) {
            if (
              ((t = n(t, 2)),
              (o = n(o, ",")),
              (r = n(r, ".")),
              isNaN(e) || null == e)
            )
              return 0;
            var i = (e = (e / 100).toFixed(t)).split(".");
            return (
              i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + o) +
              (i[1] ? r + i[1] : "")
            );
          }
          "string" == typeof e && (e = e.replace(".", ""));
          var r = "",
            i = /\{\{\s*(\w+)\s*\}\}/,
            a = t || document.body.dataset.moneyFormat || "${{amount}}";
          switch (a.match(i)[1]) {
            case "amount":
              r = o(e, 2);
              break;
            case "amount_no_decimals":
              r = o(e, 0);
              break;
            case "amount_with_comma_separator":
              r = o(e, 2, ".", ",");
              break;
            case "amount_with_space_separator":
              r = o(e, 2, " ", ",");
              break;
            case "amount_with_period_and_space_separator":
              r = o(e, 2, " ", ".");
              break;
            case "amount_no_decimals_with_comma_separator":
              r = o(e, 0, ".", ",");
              break;
            case "amount_no_decimals_with_space_separator":
              r = o(e, 0, " ");
              break;
            case "amount_with_apostrophe_separator":
              r = o(e, 2, "'", ".");
          }
          return a.replace(i, r);
        }),
        (theme.handleCartNumber = function () {
          let e = document.querySelectorAll("[data-cart-number]");
          theme.getCart(function (t) {
            t &&
              t.item_count &&
              t.item_count > 0 &&
              e.forEach((e) => {
                e.innerHTML = t.item_count;
              });
          });
        });
      class o {
        constructor(e, t) {
          if (
            ((this.Element = e),
            (this.Settings = Object.assign(
              {
                toggleSelector: 'header, [class*="head"], [class*="-toggle"]',
                isOpen: !0,
                allowMultipleOpen: !1,
                allowCollapseAll: !1,
              },
              t
            )),
            (this.Toggles = this.Element.querySelectorAll(
              this.Settings.toggleSelector
            )),
            this.Toggles.length < 1)
          )
            return (
              console.warn(
                "No element found that could be used as an accordion handle."
              ),
              !1
            );
          this.Settings.isOpen &&
            (this.Toggles.forEach((e) => (e.parentNode.ariaset.current = !1)),
            (this.Toggles[0].parentNode.ariaset.current = !0)),
            this.Toggles.on("click", (e) =>
              this.ToggleSection(e.currentTarget)
            );
        }
        ToggleSection(e) {
          e.parentNode.ariaset.current =
            !e.parentNode.ariaset.current.toBoolean();
        }
      }
      const r = function (e) {
          let t = Object.assign(
              { header: { include: !0, selector: "header.header" } },
              e
            ),
            n = document.querySelector(t.header.selector) || null;
          t.header.include &&
            n &&
            document.documentElement.style.setProperty(
              "--hh",
              `${n.clientHeight}px`
            );
          for (let e in document.viewport)
            document.documentElement.style.setProperty(
              `--v${e.first}`,
              0.01 * document.viewport[e] + "px"
            );
          let o = document.querySelector("#shopify-section-countdown") || null;
          return (
            o &&
              document.documentElement.style.setProperty(
                "--ch",
                `${o.clientHeight}px`
              ),
            document.viewport
          );
        },
        i = (e) => {
          let t = Object.prototype.toString
              .call(e)
              .replace(/[\[\]]/g, "")
              .split(" "),
            n = {
              __proto: null,
              __type: t[1],
              object: t[0],
              type: t[1].toLowerCase(),
            };
          return (
            /(?:null|undefined)/gi.test(t[1]) ||
              (e instanceof Object
                ? ((n.__proto = "Object"),
                  e.constructor && (n.__type = e.constructor.name))
                : (n.__proto = Object.getPrototypeOf(e))),
            n
          );
        };
      var a;
      document,
        (a = window),
        Function.prototype.debounce ||
          (Function.prototype.debounce = function (e) {
            const t = this;
            let n;
            return (
              (e = e || 250),
              function () {
                clearTimeout(n),
                  (n = setTimeout(() => {
                    (n = null), t.apply(this, arguments);
                  }, e));
              }
            );
          }),
        Function.prototype.throttle ||
          (Function.prototype.throttle = function (e) {
            const t = this;
            let n;
            return (
              (e = e || 250),
              function () {
                clearTimeout(n),
                  n || t.apply(this, arguments),
                  (n = setTimeout(() => (n = null), e));
              }
            );
          }),
        Array.prototype.hasOwnProperty("last") ||
          Object.defineProperty(Array.prototype, "last", {
            get: function () {
              return this[this.length - 1];
            },
          }),
        Array.prototype.hasOwnProperty("first") ||
          Object.defineProperty(Array.prototype, "first", {
            get: function () {
              return this[0];
            },
          }),
        Array.prototype.shuffle ||
          (Array.prototype.shuffle = function () {
            const e = [...this];
            for (let t = e.length - 1; t > 0; --t) {
              const n = Math.floor(Math.random() * (t - 1));
              [e[t], e[n]] = [e[n], e[t]];
            }
            return e;
          }),
        String.prototype.toBoolean ||
          (String.prototype.toBoolean = function () {
            return !/^(?:false|-?0n?|\s*|n(?:ull|an|one)|undefined)$/i.test(
              this
            );
          }),
        String.prototype.hasOwnProperty("first") ||
          Object.defineProperty(String.prototype, "first", {
            get: function () {
              return this.substr(0, 1);
            },
          }),
        String.prototype.hasOwnProperty("last") ||
          Object.defineProperty(String.prototype, "last", {
            get: function () {
              return this.substr(-1, 1);
            },
          }),
        String.prototype.handleize ||
          (String.prototype.handleize = function () {
            return this.trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w\s-]/g, "");
          }),
        String.prototype.imgURL ||
          (String.prototype.imgURL = function (e) {
            return this.trim()
              .replace(
                /_(?:pico|icon|thumb|small|compact|medium|large|grande|original|(?:\d{1,4})x\d{1,4}|master)+\./g,
                "."
              )
              .replace(/\.(?:jpe?g|png|gif)/g, function (t) {
                return "_" + e + t;
              });
          }),
        Number.prototype.hasOwnProperty("positive") ||
          Object.defineProperty(Number.prototype, "positive", {
            get: function () {
              return this > 0;
            },
          }),
        Number.prototype.hasOwnProperty("isZero") ||
          Object.defineProperty(Number.prototype, "isZero", {
            get: function () {
              return 0 === this;
            },
          }),
        Number.prototype.hasOwnProperty("negative") ||
          Object.defineProperty(Number.prototype, "negative", {
            get: function () {
              return this < 0;
            },
          }),
        Number.prototype.pad ||
          (Number.prototype.pad = function (e) {
            const t = { size: 2, char: "0" };
            switch (typeof e) {
              case "object":
                e instanceof Array
                  ? ((t.size = e[0] >= t.size ? e[0] : t.size),
                    (t.char = e[e.length - 1] || t.char))
                  : Object.assign(t, e);
                break;
              case "number":
                t.size = e >= t.size ? e : t.size;
                break;
              case "string":
                t.char = e.substr(0, 1) || t.char;
            }
            let n = String(this);
            for (; n.length < (t.size || 2); ) n = (t.char || "0") + n;
            return n;
          }),
        HTMLDocument.prototype.hasOwnProperty("viewport") ||
          Object.defineProperty(HTMLDocument.prototype, "viewport", {
            get: function () {
              return {
                height: a.innerHeight || this.documentElement.clientHeight,
                width: a.innerWidth || this.documentElement.clientWidth,
                ratio:
                  a.innerWith / a.innerHeight ||
                  this.documentElement.clientWidth /
                    this.documentElement.clientHeight,
              };
            },
          }),
        HTMLDocument.prototype.on ||
          (HTMLDocument.prototype.on = function () {
            HTMLDocument.prototype.addEventListener.apply(this, arguments);
          }),
        HTMLDocument.prototype.off ||
          (HTMLDocument.prototype.off = function () {
            HTMLDocument.prototype.removeEventListener.apply(this, arguments);
          }),
        HTMLDocument.prototype.trigger ||
          (HTMLDocument.prototype.trigger = function (e) {
            let t = document.createEvent("HTMLEvents");
            t.initEvent(e, !0, !0), this.dispatchEvent(t);
          }),
        Window.prototype.on ||
          (Window.prototype.on = function () {
            Window.prototype.addEventListener.apply(this, arguments);
          }),
        Window.prototype.off ||
          (Window.prototype.off = function () {
            Window.prototype.removeEventListener.apply(this, arguments);
          }),
        HTMLFormElement.prototype.validate ||
          (HTMLFormElement.prototype.validate = function () {
            return (
              (this.invalidFields = []),
              Array.from(this.elements).forEach((e) => {
                !e.name ||
                  e.disabled ||
                  ["file", "reset", "submit", "button"].indexOf(e.type) > -1 ||
                  (e.readOnly
                    ? ((e.readOnly = !1),
                      e.validity.valid || this.invalidFields.push(e),
                      (e.readOnly = !0))
                    : e.validity.valid || this.invalidFields.push(e));
              }),
              (this.valid = 0 === this.invalidFields.length),
              this.valid
            );
          }),
        HTMLFormElement.prototype.serialize ||
          (HTMLFormElement.prototype.serialize = function () {
            let e = {};
            return (
              Array.from(this.elements).forEach((t) => {
                if (
                  !t.name ||
                  t.disabled ||
                  ["file", "reset", "submit", "button"].indexOf(t.type) > -1
                )
                  return;
                if (["checkbox", "radio"].indexOf(t.type) > -1 && !t.checked)
                  return;
                const n = t.name.match(/(\w+)\[(\w+)\]/i);
                if ("select-multiple" === t.type) {
                  let o = [];
                  Array.from(t.options).forEach((e) => {
                    e.selected && o.push(e.value);
                  }),
                    n.length > 1
                      ? ((e[n[1]] = e[n[1]] || {}),
                        (e[n[1]][n[2].toLowerCase()] = o))
                      : (e[t.name] = o);
                } else
                  n.length > 1
                    ? ((e[n[1]] = e[n[1]] || {}),
                      (e[n[1]][n[2].toLowerCase()] = t.value))
                    : (e[t.name] = t.value);
              }),
              e
            );
          }),
        HTMLFormElement.prototype.trigger ||
          (HTMLFormElement.prototype.trigger = function (e) {
            let t = document.createEvent("HTMLEvents");
            t.initEvent(e, !0, !0), this.dispatchEvent(t);
          }),
        Node.prototype.hasOwnProperty("Siblings") ||
          Object.defineProperty(Node.prototype, "Siblings", {
            get: function () {
              return [...this.parentNode.childNodes].filter(
                (e) => e !== this && 1 === e.nodeType
              );
            },
          }),
        Node.prototype.siblings ||
          (Node.prototype.siblings = function (e) {
            if (e) {
              let t = this.parentNode.querySelectorAll(e);
              return 1 === t.length ? t[0] : t;
            }
            return [...this.parentNode.childNodes].filter(
              (e) => e !== this && 1 === e.nodeType
            );
          }),
        Node.prototype.wrap ||
          (Node.prototype.wrap = function (e, t) {
            if (
              ((e = e || "p"),
              (t = Object.assign({ type: 3, ignoreEmptyNode: !0 }, t))
                .ignoreEmptyNode && "" === this.textContent.trim())
            )
              return;
            if (this.nodeType !== t.type) return;
            this.textContent = this.textContent.trim();
            let n = document.createElement(e);
            return (
              this.parentNode.insertBefore(n, this), n.appendChild(this), this
            );
          }),
        NodeList.prototype.wrap ||
          (NodeList.prototype.wrap = function (e, t) {
            return this.forEach((n) => n.wrap(e, t)), this;
          }),
        NodeList.prototype.first ||
          (NodeList.prototype.first = function () {
            return Array.from(this)[0];
          }),
        NodeList.prototype.last ||
          (NodeList.prototype.last = function () {
            let e = Array.from(this);
            return e[e.length - 1];
          }),
        NodeList.prototype.on ||
          (NodeList.prototype.on = function () {
            this.forEach((e) =>
              Node.prototype.addEventListener.apply(e, arguments)
            );
          }),
        NodeList.prototype.off ||
          (NodeList.prototype.off = function () {
            this.forEach((e) =>
              Node.prototype.removeEventListener.apply(e, arguments)
            );
          }),
        Element.prototype.hasOwnProperty("ariaset") ||
          Object.defineProperty(Element.prototype, "ariaset", {
            get: function () {
              const e = {};
              for (let t in this)
                if (/^aria/.test(t)) {
                  let n = t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`),
                    o = t
                      .replace("aria", "")
                      .replace(/(^[A-Z])/, (e) => e.toLowerCase());
                  Object.defineProperty(e, o, {
                    get: () => this[t] || this.getAttribute(n),
                    set: (e) => this.setAttribute(n, (this[t] = e)),
                  });
                }
              return e;
            },
          }),
        Element.prototype.hasOwnProperty("isInViewport") ||
          Object.defineProperty(Element.prototype, "isInViewport", {
            get: function () {
              let e = this.getBoundingClientRect();
              const t = e.height / -3,
                n = e.width / -3;
              return (
                e.top >= t &&
                e.left >= n &&
                e.bottom <=
                  (window.innerHeight ||
                    document.documentElement.clientHeight) -
                    t &&
                e.right <=
                  (window.innerWidth || document.documentElement.clientWidth) -
                    n
              );
            },
          }),
        Element.prototype.hasOwnProperty("isVisible") ||
          Object.defineProperty(Element.prototype, "isVisible", {
            get: function () {
              if (null === this.offsetParent) {
                let e = this.getBoundingClientRect();
                return (
                  e.height > 0 &&
                  e.width > 0 &&
                  !this.matches('[type="hidden"]') &&
                  !this.hidden &&
                  "none" !== this.style.display &&
                  0 !== this.style.opacity &&
                  "hidden" !== this.style.visibility
                );
              }
              return null !== this.offsetParent;
            },
          }),
        Element.prototype.on ||
          (Element.prototype.on = function () {
            Element.prototype.addEventListener.apply(this, arguments);
          }),
        Element.prototype.off ||
          (Element.prototype.off = function () {
            Element.prototype.removeEventListener.apply(this, arguments);
          }),
        Element.prototype.up ||
          (Element.prototype.up = function () {
            return this.parent.insertBefore(this, this.prevSibling), this;
          }),
        Element.prototype.down ||
          (Element.prototype.down = function () {
            return this.parent.insertBefore(this, this.nextSibling), this;
          }),
        Element.prototype.asFirst ||
          (Element.prototype.asFirst = function () {
            return (
              this.parentNode.insertBefore(this, this.parentNode.children[0]),
              this
            );
          }),
        Element.prototype.asLast ||
          (Element.prototype.asLast = function () {
            return this.parentNode.appendChild(this), this;
          }),
        Element.prototype.sort ||
          (Element.prototype.sort = function (e) {
            e &&
              e.sortBy.indexOf("data-") > -1 &&
              ((e.useDataset = !0), (e.sortBy = e.sortBy.replace("data-", ""))),
              (e = Object.assign({ sortBy: "innerText", hidden: !1 }, e))
                .hidden && this.classList.add("sort--hidden");
            const t = [...this.children];
            t.sort((t, n) => {
              const o = Math.abs(
                  (e.useDataset ? t.dataset[e.sortBy] : t[e.sortBy]).replace(
                    "_",
                    ""
                  )
                ),
                r = Math.abs(
                  (e.useDataset ? n.dataset[e.sortBy] : n[e.sortBy]).replace(
                    "_",
                    ""
                  )
                );
              return o < r ? -1 : o > r ? 1 : 0;
            }),
              t.forEach((e) => this.appendChild(e)),
              e.hidden && this.classList.remove("sort--hidden");
          }),
        Element.prototype.trigger ||
          (Element.prototype.trigger = function (e) {
            let t = document.createEvent("HTMLEvents");
            t.initEvent(e, !0, !0), this.dispatchEvent(t);
          }),
        Element.prototype.show ||
          (Element.prototype.show = function () {
            if (!this.hidden) return !1;
            this.setAttribute("aria-hidden", (this.hidden = !1));
          }),
        Element.prototype.hide ||
          (Element.prototype.hide = function () {
            if (this.hidden) return !1;
            this.setAttribute("aria-hidden", (this.hidden = !0));
          }),
        Element.prototype.toggle ||
          (Element.prototype.toggle = function (e) {
            let t = { fade: !1, fadeOutDuration: 150, fadeInDuration: 300 },
              n = i(e).type;
            switch (n) {
              case "boolean":
                t.fade = e;
                break;
              case "number":
                t = { fade: !0, fadeInDuration: e, fadeOutDuration: e / 2 };
                break;
              case "array":
                if (((t.fade = !0), e.length > 1)) {
                  (t.fadeInDuration = e[0]), (t.fadeOutDuration = e[1]);
                  break;
                }
                (t.fadeInDuration = e[0]), (t.fadeOutDuration = e[0] / 2);
                break;
              case "object":
                t = Object.assign(t, e);
                break;
              default:
                console.log(
                  `Found argment of invalid type '${n}' for Element.prototype.toggle method.`
                );
            }
            t.fade
              ? this.isVisible
                ? this.fadeOut(t.fadeOutDuration)
                : this.fadeIn(t.fadeInDuration)
              : (this.hidden = !this.hidden);
          }),
        Element.prototype.fadeOut ||
          (Element.prototype.fadeOut = function (e = 150) {
            if (this.isVisible) {
              let t = this;
              (t.style.opacity = 1),
                (function n() {
                  (t.style.opacity -= 0.1) <= 0
                    ? ((t.hidden = !0), t.removeAttribute("style"))
                    : setTimeout(() => requestAnimationFrame(n), e / 10);
                })();
            }
          }),
        Element.prototype.fadeIn ||
          (Element.prototype.fadeIn = function (e = 300) {
            if (!this.isVisible) {
              let t = this;
              (t.hidden = !1),
                (t.style.opacity = 0),
                (function n() {
                  let o = parseFloat(t.style.opacity);
                  (o += 0.1) < 1
                    ? ((t.style.opacity = o),
                      setTimeout(() => requestAnimationFrame(n), e / 10))
                    : t.removeAttribute("style");
                })();
            }
          }),
        Element.prototype.accordion ||
          (Element.prototype.accordion = function (e) {
            return new o(this, e);
          }),
        Date.prototype.diff ||
          (Date.prototype.diff = function (e) {
            if ("object" === i(e).type) return e;
            if (-1 === "date number".indexOf(i(e).type))
              return (
                console.warn("Parameter is no valid date object nor timestamp"),
                null
              );
            let t = this.getTime() - ("date" === i(e).type ? e.getTime() : e);
            return {
              days: Math.floor(Math.abs(t) / 864e5),
              hours: Math.floor((Math.abs(t) % 864e5) / 36e5),
              minutes: Math.floor((Math.abs(t) % 36e5) / 6e4),
              seconds: Math.floor((Math.abs(t) % 6e4) / 1e3),
              past: t > 0,
            };
          });
      n(624), n(133);
      document.addEventListener("DOMContentLoaded", () => {
        r({ header: { include: !1 } }),
          window.addEventListener("resize", () => {
            r({ header: { include: !1 } });
          }),
          Array.from(
            document.querySelectorAll('a[href*="#cc-settings"]')
          ).forEach(function (e) {
            e.addEventListener("click", function (e) {
              e.preventDefault(), window.showPreferences();
            });
          }),
          document.addEventListener("DOMContentLoaded", () => {
            [...document.querySelectorAll("video")].forEach((e) => {
              e.setAttribute("autoplay", !0), e.setAttribute("loop", !0);
            });
          });
      });
    })();
})();
