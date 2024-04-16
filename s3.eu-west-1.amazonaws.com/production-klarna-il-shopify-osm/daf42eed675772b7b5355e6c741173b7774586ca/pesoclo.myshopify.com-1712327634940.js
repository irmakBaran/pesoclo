window.klarna_OSMP = window.klarna_OSMP || {};
window.klarna_OSMP.placements = [];
window.klarna_OSMP.store = {
  currency: "EUR",
  endpoint: "eu",
  playground_active: false,
  client_id: "8ada8dd8-fbe8-5792-9dfe-720f191d8312",
  mid_locales: {
    AT: ["de-AT", "en-AT"],
    BE: ["en-BE", "fr-BE", "nl-BE"],
    DE: ["de-DE", "en-DE"],
    ES: ["en-ES", "es-ES"],
    FI: ["en-FI", "fi-FI", "sv-FI"],
    FR: ["en-FR", "fr-FR"],
    IT: ["en-IT", "it-IT"],
    NL: ["en-NL", "nl-NL"],
    PT: ["en-PT", "pt-PT"],
  },
  fallback_placement: "top-strip-promotion-badge",
};
(() => {
  "use strict";
  var e,
    t,
    r = {},
    a = {};
  function o(e) {
    var t = a[e];
    if (void 0 !== t) return t.exports;
    var n = (a[e] = { exports: {} });
    return r[e].call(n.exports, n, n.exports, o), n.exports;
  }
  (o.m = r),
    (o.d = (e, t) => {
      for (var r in t)
        o.o(t, r) &&
          !o.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (o.f = {}),
    (o.e = (e) =>
      Promise.all(Object.keys(o.f).reduce((t, r) => (o.f[r](e, t), t), []))),
    (o.u = (e) => e + ".index.js"),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (e = {}),
    (t = "client:"),
    (o.l = (r, a, n, i) => {
      if (e[r]) e[r].push(a);
      else {
        var l, s;
        if (void 0 !== n)
          for (
            var d = document.getElementsByTagName("script"), u = 0;
            u < d.length;
            u++
          ) {
            var c = d[u];
            if (
              c.getAttribute("src") == r ||
              c.getAttribute("data-webpack") == t + n
            ) {
              l = c;
              break;
            }
          }
        l ||
          ((s = !0),
          ((l = document.createElement("script")).charset = "utf-8"),
          (l.timeout = 120),
          o.nc && l.setAttribute("nonce", o.nc),
          l.setAttribute("data-webpack", t + n),
          (l.src = r)),
          (e[r] = [a]);
        var p = (t, a) => {
            (l.onerror = l.onload = null), clearTimeout(f);
            var o = e[r];
            if (
              (delete e[r],
              l.parentNode && l.parentNode.removeChild(l),
              o && o.forEach((e) => e(a)),
              t)
            )
              return t(a);
          },
          f = setTimeout(
            p.bind(null, void 0, { type: "timeout", target: l }),
            12e4
          );
        (l.onerror = p.bind(null, l.onerror)),
          (l.onload = p.bind(null, l.onload)),
          s && document.head.appendChild(l);
      }
    }),
    (o.p =
      "https://production-klarna-il-shopify-osm.s3.eu-west-1.amazonaws.com/daf42eed675772b7b5355e6c741173b7774586ca/"),
    (() => {
      var e = { 792: 0 };
      o.f.j = (t, r) => {
        var a = o.o(e, t) ? e[t] : void 0;
        if (0 !== a)
          if (a) r.push(a[2]);
          else {
            var n = new Promise((r, o) => (a = e[t] = [r, o]));
            r.push((a[2] = n));
            var i = o.p + o.u(t),
              l = new Error();
            o.l(
              i,
              (r) => {
                if (o.o(e, t) && (0 !== (a = e[t]) && (e[t] = void 0), a)) {
                  var n = r && ("load" === r.type ? "missing" : r.type),
                    i = r && r.target && r.target.src;
                  (l.message =
                    "Loading chunk " + t + " failed.\n(" + n + ": " + i + ")"),
                    (l.name = "ChunkLoadError"),
                    (l.type = n),
                    (l.request = i),
                    a[1](l);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = (t, r) => {
          var a,
            n,
            [i, l, s] = r,
            d = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (a in l) o.o(l, a) && (o.m[a] = l[a]);
            s && s(o);
          }
          for (t && t(r); d < i.length; d++)
            (n = i[d]), o.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
        },
        r = (self.webpackChunkclient = self.webpackChunkclient || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })(),
    (async () => {
      if (!window.klarna_OSMP.isOSMLoaded) {
        window.klarna_OSMP.isOSMLoaded = !0;
        const { default: e } = await Promise.all([o.e(300), o.e(52)]).then(
          o.bind(o, 52)
        );
        await e.init();
      }
    })();
})();
