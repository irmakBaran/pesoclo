/*! For license information please see sdk.js.LICENSE.txt */
var e,
  t,
  n = {
    382: (e, t, n) => {
      var i = n(6964);
      e.exports = function (e, t) {
        return new Promise(function (n, a) {
          var s,
            r = t || {};
          function o(e) {
            a(e || new Error("Aborted"));
          }
          function c(e, t) {
            e.bail
              ? o(e)
              : s.retry(e)
              ? r.onRetry && r.onRetry(e, t)
              : a(s.mainError());
          }
          "randomize" in r || (r.randomize = !0),
            (s = i.operation(r)).attempt(function (t) {
              var i;
              try {
                i = e(o, t);
              } catch (e) {
                return void c(e, t);
              }
              Promise.resolve(i)
                .then(n)
                .catch(function (e) {
                  c(e, t);
                });
            });
        });
      };
    },
    6964: (e, t, n) => {
      e.exports = n(8074);
    },
    8074: (e, t, n) => {
      var i = n(5804);
      (t.operation = function (e) {
        var n = t.timeouts(e);
        return new i(n, {
          forever: e && (e.forever || e.retries === 1 / 0),
          unref: e && e.unref,
          maxRetryTime: e && e.maxRetryTime,
        });
      }),
        (t.timeouts = function (e) {
          if (e instanceof Array) return [].concat(e);
          var t = {
            retries: 10,
            factor: 2,
            minTimeout: 1e3,
            maxTimeout: 1 / 0,
            randomize: !1,
          };
          for (var n in e) t[n] = e[n];
          if (t.minTimeout > t.maxTimeout)
            throw new Error("minTimeout is greater than maxTimeout");
          for (var i = [], a = 0; a < t.retries; a++)
            i.push(this.createTimeout(a, t));
          return (
            e && e.forever && !i.length && i.push(this.createTimeout(a, t)),
            i.sort(function (e, t) {
              return e - t;
            }),
            i
          );
        }),
        (t.createTimeout = function (e, t) {
          var n = t.randomize ? Math.random() + 1 : 1,
            i = Math.round(
              n * Math.max(t.minTimeout, 1) * Math.pow(t.factor, e)
            );
          return Math.min(i, t.maxTimeout);
        }),
        (t.wrap = function (e, n, i) {
          if ((n instanceof Array && ((i = n), (n = null)), !i))
            for (var a in ((i = []), e)) "function" == typeof e[a] && i.push(a);
          for (var s = 0; s < i.length; s++) {
            var r = i[s],
              o = e[r];
            (e[r] = function (i) {
              var a = t.operation(n),
                s = Array.prototype.slice.call(arguments, 1),
                r = s.pop();
              s.push(function (e) {
                a.retry(e) ||
                  (e && (arguments[0] = a.mainError()),
                  r.apply(this, arguments));
              }),
                a.attempt(function () {
                  i.apply(e, s);
                });
            }.bind(e, o)),
              (e[r].options = n);
          }
        });
    },
    5804: (e) => {
      function t(e, t) {
        "boolean" == typeof t && (t = { forever: t }),
          (this._originalTimeouts = JSON.parse(JSON.stringify(e))),
          (this._timeouts = e),
          (this._options = t || {}),
          (this._maxRetryTime = (t && t.maxRetryTime) || 1 / 0),
          (this._fn = null),
          (this._errors = []),
          (this._attempts = 1),
          (this._operationTimeout = null),
          (this._operationTimeoutCb = null),
          (this._timeout = null),
          (this._operationStart = null),
          (this._timer = null),
          this._options.forever &&
            (this._cachedTimeouts = this._timeouts.slice(0));
      }
      (e.exports = t),
        (t.prototype.reset = function () {
          (this._attempts = 1),
            (this._timeouts = this._originalTimeouts.slice(0));
        }),
        (t.prototype.stop = function () {
          this._timeout && clearTimeout(this._timeout),
            this._timer && clearTimeout(this._timer),
            (this._timeouts = []),
            (this._cachedTimeouts = null);
        }),
        (t.prototype.retry = function (e) {
          if ((this._timeout && clearTimeout(this._timeout), !e)) return !1;
          var t = new Date().getTime();
          if (e && t - this._operationStart >= this._maxRetryTime)
            return (
              this._errors.push(e),
              this._errors.unshift(
                new Error("RetryOperation timeout occurred")
              ),
              !1
            );
          this._errors.push(e);
          var n = this._timeouts.shift();
          if (void 0 === n) {
            if (!this._cachedTimeouts) return !1;
            this._errors.splice(0, this._errors.length - 1),
              (n = this._cachedTimeouts.slice(-1));
          }
          var i = this;
          return (
            (this._timer = setTimeout(function () {
              i._attempts++,
                i._operationTimeoutCb &&
                  ((i._timeout = setTimeout(function () {
                    i._operationTimeoutCb(i._attempts);
                  }, i._operationTimeout)),
                  i._options.unref && i._timeout.unref()),
                i._fn(i._attempts);
            }, n)),
            this._options.unref && this._timer.unref(),
            !0
          );
        }),
        (t.prototype.attempt = function (e, t) {
          (this._fn = e),
            t &&
              (t.timeout && (this._operationTimeout = t.timeout),
              t.cb && (this._operationTimeoutCb = t.cb));
          var n = this;
          this._operationTimeoutCb &&
            (this._timeout = setTimeout(function () {
              n._operationTimeoutCb();
            }, n._operationTimeout)),
            (this._operationStart = new Date().getTime()),
            this._fn(this._attempts);
        }),
        (t.prototype.try = function (e) {
          console.log("Using RetryOperation.try() is deprecated"),
            this.attempt(e);
        }),
        (t.prototype.start = function (e) {
          console.log("Using RetryOperation.start() is deprecated"),
            this.attempt(e);
        }),
        (t.prototype.start = t.prototype.try),
        (t.prototype.errors = function () {
          return this._errors;
        }),
        (t.prototype.attempts = function () {
          return this._attempts;
        }),
        (t.prototype.mainError = function () {
          if (0 === this._errors.length) return null;
          for (
            var e = {}, t = null, n = 0, i = 0;
            i < this._errors.length;
            i++
          ) {
            var a = this._errors[i],
              s = a.message,
              r = (e[s] || 0) + 1;
            (e[s] = r), r >= n && ((t = a), (n = r));
          }
          return t;
        });
    },
    6178: (e) => {
      var t = window.console || {};
      function n(e, n) {
        for (e = e.split(","); e.length; ) {
          var i = e.pop();
          t[i] || (t[i] = n);
        }
      }
      n("memory", {}),
        n(
          "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn",
          function () {}
        ),
        (e.exports = t);
    },
    562: function (e, t, n) {
      var i;
      !(function (a, s) {
        var r = "function",
          o = "undefined",
          c = "object",
          l = "string",
          d = "major",
          u = "model",
          g = "name",
          b = "type",
          h = "vendor",
          p = "version",
          m = "architecture",
          I = "console",
          f = "mobile",
          C = "tablet",
          y = "smarttv",
          x = "wearable",
          G = "embedded",
          A = "Amazon",
          v = "Apple",
          B = "ASUS",
          Z = "BlackBerry",
          Q = "Browser",
          w = "Chrome",
          k = "Firefox",
          X = "Google",
          E = "Huawei",
          N = "LG",
          W = "Microsoft",
          L = "Motorola",
          F = "Opera",
          R = "Samsung",
          U = "Sharp",
          O = "Sony",
          _ = "Xiaomi",
          S = "Zebra",
          D = "Facebook",
          Y = "Chromium OS",
          T = "Mac OS",
          V = function (e) {
            for (var t = {}, n = 0; n < e.length; n++)
              t[e[n].toUpperCase()] = e[n];
            return t;
          },
          H = function (e, t) {
            return typeof e === l && -1 !== J(t).indexOf(J(e));
          },
          J = function (e) {
            return e.toLowerCase();
          },
          M = function (e, t) {
            if (typeof e === l)
              return (
                (e = e.replace(/^\s\s*/, "")),
                typeof t === o ? e : e.substring(0, 500)
              );
          },
          j = function (e, t) {
            for (var n, i, a, o, l, d, u = 0; u < t.length && !l; ) {
              var g = t[u],
                b = t[u + 1];
              for (n = i = 0; n < g.length && !l && g[n]; )
                if ((l = g[n++].exec(e)))
                  for (a = 0; a < b.length; a++)
                    (d = l[++i]),
                      typeof (o = b[a]) === c && o.length > 0
                        ? 2 === o.length
                          ? typeof o[1] == r
                            ? (this[o[0]] = o[1].call(this, d))
                            : (this[o[0]] = o[1])
                          : 3 === o.length
                          ? typeof o[1] !== r || (o[1].exec && o[1].test)
                            ? (this[o[0]] = d ? d.replace(o[1], o[2]) : s)
                            : (this[o[0]] = d ? o[1].call(this, d, o[2]) : s)
                          : 4 === o.length &&
                            (this[o[0]] = d
                              ? o[3].call(this, d.replace(o[1], o[2]))
                              : s)
                        : (this[o] = d || s);
              u += 2;
            }
          },
          z = function (e, t) {
            for (var n in t)
              if (typeof t[n] === c && t[n].length > 0) {
                for (var i = 0; i < t[n].length; i++)
                  if (H(t[n][i], e)) return "?" === n ? s : n;
              } else if (H(t[n], e)) return "?" === n ? s : n;
            return e;
          },
          P = {
            ME: "4.90",
            "NT 3.11": "NT3.51",
            "NT 4.0": "NT4.0",
            2e3: "NT 5.0",
            XP: ["NT 5.1", "NT 5.2"],
            Vista: "NT 6.0",
            7: "NT 6.1",
            8: "NT 6.2",
            8.1: "NT 6.3",
            10: ["NT 6.4", "NT 10.0"],
            RT: "ARM",
          },
          $ = {
            browser: [
              [/\b(?:crmo|crios)\/([\w\.]+)/i],
              [p, [g, "Chrome"]],
              [/edg(?:e|ios|a)?\/([\w\.]+)/i],
              [p, [g, "Edge"]],
              [
                /(opera mini)\/([-\w\.]+)/i,
                /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
              ],
              [g, p],
              [/opios[\/ ]+([\w\.]+)/i],
              [p, [g, F + " Mini"]],
              [/\bopr\/([\w\.]+)/i],
              [p, [g, F]],
              [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
              [p, [g, "Baidu"]],
              [
                /(kindle)\/([\w\.]+)/i,
                /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
                /(?:ms|\()(ie) ([\w\.]+)/i,
                /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                /(heytap|ovi)browser\/([\d\.]+)/i,
                /(weibo)__([\d\.]+)/i,
              ],
              [g, p],
              [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
              [p, [g, "UC" + Q]],
              [
                /microm.+\bqbcore\/([\w\.]+)/i,
                /\bqbcore\/([\w\.]+).+microm/i,
                /micromessenger\/([\w\.]+)/i,
              ],
              [p, [g, "WeChat"]],
              [/konqueror\/([\w\.]+)/i],
              [p, [g, "Konqueror"]],
              [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
              [p, [g, "IE"]],
              [/ya(?:search)?browser\/([\w\.]+)/i],
              [p, [g, "Yandex"]],
              [/slbrowser\/([\w\.]+)/i],
              [p, [g, "Smart Lenovo " + Q]],
              [/(avast|avg)\/([\w\.]+)/i],
              [[g, /(.+)/, "$1 Secure " + Q], p],
              [/\bfocus\/([\w\.]+)/i],
              [p, [g, k + " Focus"]],
              [/\bopt\/([\w\.]+)/i],
              [p, [g, F + " Touch"]],
              [/coc_coc\w+\/([\w\.]+)/i],
              [p, [g, "Coc Coc"]],
              [/dolfin\/([\w\.]+)/i],
              [p, [g, "Dolphin"]],
              [/coast\/([\w\.]+)/i],
              [p, [g, F + " Coast"]],
              [/miuibrowser\/([\w\.]+)/i],
              [p, [g, "MIUI " + Q]],
              [/fxios\/([-\w\.]+)/i],
              [p, [g, k]],
              [/\bqihu|(qi?ho?o?|360)browser/i],
              [[g, "360 " + Q]],
              [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],
              [[g, /(.+)/, "$1 " + Q], p],
              [/samsungbrowser\/([\w\.]+)/i],
              [p, [g, R + " Internet"]],
              [/(comodo_dragon)\/([\w\.]+)/i],
              [[g, /_/g, " "], p],
              [/metasr[\/ ]?([\d\.]+)/i],
              [p, [g, "Sogou Explorer"]],
              [/(sogou)mo\w+\/([\d\.]+)/i],
              [[g, "Sogou Mobile"], p],
              [
                /(electron)\/([\w\.]+) safari/i,
                /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i,
              ],
              [g, p],
              [/(lbbrowser)/i, /\[(linkedin)app\]/i],
              [g],
              [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
              [[g, D], p],
              [
                /(Klarna)\/([\w\.]+)/i,
                /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                /safari (line)\/([\w\.]+)/i,
                /\b(line)\/([\w\.]+)\/iab/i,
                /(alipay)client\/([\w\.]+)/i,
                /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i,
              ],
              [g, p],
              [/\bgsa\/([\w\.]+) .*safari\//i],
              [p, [g, "GSA"]],
              [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
              [p, [g, "TikTok"]],
              [/headlesschrome(?:\/([\w\.]+)| )/i],
              [p, [g, w + " Headless"]],
              [/ wv\).+(chrome)\/([\w\.]+)/i],
              [[g, w + " WebView"], p],
              [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
              [p, [g, "Android " + Q]],
              [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
              [g, p],
              [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
              [p, [g, "Mobile Safari"]],
              [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
              [p, g],
              [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
              [
                g,
                [
                  p,
                  z,
                  {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/",
                  },
                ],
              ],
              [/(webkit|khtml)\/([\w\.]+)/i],
              [g, p],
              [/(navigator|netscape\d?)\/([-\w\.]+)/i],
              [[g, "Netscape"], p],
              [/mobile vr; rv:([\w\.]+)\).+firefox/i],
              [p, [g, k + " Reality"]],
              [
                /ekiohf.+(flow)\/([\w\.]+)/i,
                /(swiftfox)/i,
                /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                /(firefox)\/([\w\.]+)/i,
                /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                /(links) \(([\w\.]+)/i,
                /panasonic;(viera)/i,
              ],
              [g, p],
              [/(cobalt)\/([\w\.]+)/i],
              [g, [p, /master.|lts./, ""]],
            ],
            cpu: [
              [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
              [[m, "amd64"]],
              [/(ia32(?=;))/i],
              [[m, J]],
              [/((?:i[346]|x)86)[;\)]/i],
              [[m, "ia32"]],
              [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
              [[m, "arm64"]],
              [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
              [[m, "armhf"]],
              [/windows (ce|mobile); ppc;/i],
              [[m, "arm"]],
              [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
              [[m, /ower/, "", J]],
              [/(sun4\w)[;\)]/i],
              [[m, "sparc"]],
              [
                /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
              ],
              [[m, J]],
            ],
            device: [
              [
                /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
              ],
              [u, [h, R], [b, C]],
              [
                /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                /samsung[- ]([-\w]+)/i,
                /sec-(sgh\w+)/i,
              ],
              [u, [h, R], [b, f]],
              [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
              [u, [h, v], [b, f]],
              [
                /\((ipad);[-\w\),; ]+apple/i,
                /applecoremedia\/[\w\.]+ \((ipad)/i,
                /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
              ],
              [u, [h, v], [b, C]],
              [/(macintosh);/i],
              [u, [h, v]],
              [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
              [u, [h, U], [b, f]],
              [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
              [u, [h, E], [b, C]],
              [
                /(?:huawei|honor)([-\w ]+)[;\)]/i,
                /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
              ],
              [u, [h, E], [b, f]],
              [
                /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
                /\b; (\w+) build\/hm\1/i,
                /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
                /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
              ],
              [
                [u, /_/g, " "],
                [h, _],
                [b, f],
              ],
              [
                /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
                /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i,
              ],
              [
                [u, /_/g, " "],
                [h, _],
                [b, C],
              ],
              [
                /; (\w+) bui.+ oppo/i,
                /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
              ],
              [u, [h, "OPPO"], [b, f]],
              [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
              [u, [h, "Vivo"], [b, f]],
              [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
              [u, [h, "Realme"], [b, f]],
              [
                /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                /\bmot(?:orola)?[- ](\w*)/i,
                /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
              ],
              [u, [h, L], [b, f]],
              [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
              [u, [h, L], [b, C]],
              [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
              [u, [h, N], [b, C]],
              [
                /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                /\blg-?([\d\w]+) bui/i,
              ],
              [u, [h, N], [b, f]],
              [
                /(ideatab[-\w ]+)/i,
                /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
              ],
              [u, [h, "Lenovo"], [b, C]],
              [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
              [
                [u, /_/g, " "],
                [h, "Nokia"],
                [b, f],
              ],
              [/(pixel c)\b/i],
              [u, [h, X], [b, C]],
              [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
              [u, [h, X], [b, f]],
              [
                /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
              ],
              [u, [h, O], [b, f]],
              [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
              [
                [u, "Xperia Tablet"],
                [h, O],
                [b, C],
              ],
              [
                / (kb2005|in20[12]5|be20[12][59])\b/i,
                /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
              ],
              [u, [h, "OnePlus"], [b, f]],
              [
                /(alexa)webm/i,
                /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                /(kf[a-z]+)( bui|\)).+silk\//i,
              ],
              [u, [h, A], [b, C]],
              [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
              [
                [u, /(.+)/g, "Fire Phone $1"],
                [h, A],
                [b, f],
              ],
              [/(playbook);[-\w\),; ]+(rim)/i],
              [u, h, [b, C]],
              [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
              [u, [h, Z], [b, f]],
              [
                /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
              ],
              [u, [h, B], [b, C]],
              [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
              [u, [h, B], [b, f]],
              [/(nexus 9)/i],
              [u, [h, "HTC"], [b, C]],
              [
                /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
              ],
              [h, [u, /_/g, " "], [b, f]],
              [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
              [u, [h, "Acer"], [b, C]],
              [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
              [u, [h, "Meizu"], [b, f]],
              [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
              [u, [h, "Ulefone"], [b, f]],
              [
                /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                /(hp) ([\w ]+\w)/i,
                /(asus)-?(\w+)/i,
                /(microsoft); (lumia[\w ]+)/i,
                /(lenovo)[-_ ]?([-\w]+)/i,
                /(jolla)/i,
                /(oppo) ?([\w ]+) bui/i,
              ],
              [h, u, [b, f]],
              [
                /(kobo)\s(ereader|touch)/i,
                /(archos) (gamepad2?)/i,
                /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                /(kindle)\/([\w\.]+)/i,
                /(nook)[\w ]+build\/(\w+)/i,
                /(dell) (strea[kpr\d ]*[\dko])/i,
                /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                /(trinity)[- ]*(t\d{3}) bui/i,
                /(gigaset)[- ]+(q\w{1,9}) bui/i,
                /(vodafone) ([\w ]+)(?:\)| bui)/i,
              ],
              [h, u, [b, C]],
              [/(surface duo)/i],
              [u, [h, W], [b, C]],
              [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
              [u, [h, "Fairphone"], [b, f]],
              [/(u304aa)/i],
              [u, [h, "AT&T"], [b, f]],
              [/\bsie-(\w*)/i],
              [u, [h, "Siemens"], [b, f]],
              [/\b(rct\w+) b/i],
              [u, [h, "RCA"], [b, C]],
              [/\b(venue[\d ]{2,7}) b/i],
              [u, [h, "Dell"], [b, C]],
              [/\b(q(?:mv|ta)\w+) b/i],
              [u, [h, "Verizon"], [b, C]],
              [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
              [u, [h, "Barnes & Noble"], [b, C]],
              [/\b(tm\d{3}\w+) b/i],
              [u, [h, "NuVision"], [b, C]],
              [/\b(k88) b/i],
              [u, [h, "ZTE"], [b, C]],
              [/\b(nx\d{3}j) b/i],
              [u, [h, "ZTE"], [b, f]],
              [/\b(gen\d{3}) b.+49h/i],
              [u, [h, "Swiss"], [b, f]],
              [/\b(zur\d{3}) b/i],
              [u, [h, "Swiss"], [b, C]],
              [/\b((zeki)?tb.*\b) b/i],
              [u, [h, "Zeki"], [b, C]],
              [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
              [[h, "Dragon Touch"], u, [b, C]],
              [/\b(ns-?\w{0,9}) b/i],
              [u, [h, "Insignia"], [b, C]],
              [/\b((nxa|next)-?\w{0,9}) b/i],
              [u, [h, "NextBook"], [b, C]],
              [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
              [[h, "Voice"], u, [b, f]],
              [/\b(lvtel\-)?(v1[12]) b/i],
              [[h, "LvTel"], u, [b, f]],
              [/\b(ph-1) /i],
              [u, [h, "Essential"], [b, f]],
              [/\b(v(100md|700na|7011|917g).*\b) b/i],
              [u, [h, "Envizen"], [b, C]],
              [/\b(trio[-\w\. ]+) b/i],
              [u, [h, "MachSpeed"], [b, C]],
              [/\btu_(1491) b/i],
              [u, [h, "Rotor"], [b, C]],
              [/(shield[\w ]+) b/i],
              [u, [h, "Nvidia"], [b, C]],
              [/(sprint) (\w+)/i],
              [h, u, [b, f]],
              [/(kin\.[onetw]{3})/i],
              [
                [u, /\./g, " "],
                [h, W],
                [b, f],
              ],
              [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
              [u, [h, S], [b, C]],
              [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
              [u, [h, S], [b, f]],
              [/smart-tv.+(samsung)/i],
              [h, [b, y]],
              [/hbbtv.+maple;(\d+)/i],
              [
                [u, /^/, "SmartTV"],
                [h, R],
                [b, y],
              ],
              [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
              [
                [h, N],
                [b, y],
              ],
              [/(apple) ?tv/i],
              [h, [u, v + " TV"], [b, y]],
              [/crkey/i],
              [
                [u, w + "cast"],
                [h, X],
                [b, y],
              ],
              [/droid.+aft(\w+)( bui|\))/i],
              [u, [h, A], [b, y]],
              [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
              [u, [h, U], [b, y]],
              [/(bravia[\w ]+)( bui|\))/i],
              [u, [h, O], [b, y]],
              [/(mitv-\w{5}) bui/i],
              [u, [h, _], [b, y]],
              [/Hbbtv.*(technisat) (.*);/i],
              [h, u, [b, y]],
              [
                /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
              ],
              [
                [h, M],
                [u, M],
                [b, y],
              ],
              [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
              [[b, y]],
              [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
              [h, u, [b, I]],
              [/droid.+; (shield) bui/i],
              [u, [h, "Nvidia"], [b, I]],
              [/(playstation [345portablevi]+)/i],
              [u, [h, O], [b, I]],
              [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
              [u, [h, W], [b, I]],
              [/((pebble))app/i],
              [h, u, [b, x]],
              [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
              [u, [h, v], [b, x]],
              [/droid.+; (glass) \d/i],
              [u, [h, X], [b, x]],
              [/droid.+; (wt63?0{2,3})\)/i],
              [u, [h, S], [b, x]],
              [/(quest( 2| pro)?)/i],
              [u, [h, D], [b, x]],
              [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
              [h, [b, G]],
              [/(aeobc)\b/i],
              [u, [h, A], [b, G]],
              [
                /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i,
              ],
              [u, [b, f]],
              [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
              [u, [b, C]],
              [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
              [[b, C]],
              [
                /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
              ],
              [[b, f]],
              [/(android[-\w\. ]{0,9});.+buil/i],
              [u, [h, "Generic"]],
            ],
            engine: [
              [/windows.+ edge\/([\w\.]+)/i],
              [p, [g, "EdgeHTML"]],
              [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
              [p, [g, "Blink"]],
              [
                /(presto)\/([\w\.]+)/i,
                /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                /ekioh(flow)\/([\w\.]+)/i,
                /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                /(icab)[\/ ]([23]\.[\d\.]+)/i,
                /\b(libweb)/i,
              ],
              [g, p],
              [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
              [p, g],
            ],
            os: [
              [/microsoft (windows) (vista|xp)/i],
              [g, p],
              [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],
              [g, [p, z, P]],
              [
                /windows nt 6\.2; (arm)/i,
                /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
              ],
              [
                [p, z, P],
                [g, "Windows"],
              ],
              [
                /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
                /cfnetwork\/.+darwin/i,
              ],
              [
                [p, /_/g, "."],
                [g, "iOS"],
              ],
              [
                /(mac os x) ?([\w\. ]*)/i,
                /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
              ],
              [
                [g, T],
                [p, /_/g, "."],
              ],
              [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
              [p, g],
              [
                /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                /(blackberry)\w*\/([\w\.]*)/i,
                /(tizen|kaios)[\/ ]([\w\.]+)/i,
                /\((series40);/i,
              ],
              [g, p],
              [/\(bb(10);/i],
              [p, [g, Z]],
              [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
              [p, [g, "Symbian"]],
              [
                /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
              ],
              [p, [g, k + " OS"]],
              [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
              [p, [g, "webOS"]],
              [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
              [p, [g, "watchOS"]],
              [/crkey\/([\d\.]+)/i],
              [p, [g, w + "cast"]],
              [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
              [[g, Y], p],
              [
                /panasonic;(viera)/i,
                /(netrange)mmh/i,
                /(nettv)\/(\d+\.[\w\.]+)/i,
                /(nintendo|playstation) ([wids345portablevuch]+)/i,
                /(xbox); +xbox ([^\);]+)/i,
                /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                /(mint)[\/\(\) ]?(\w*)/i,
                /(mageia|vectorlinux)[; ]/i,
                /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                /(hurd|linux) ?([\w\.]*)/i,
                /(gnu) ?([\w\.]*)/i,
                /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                /(haiku) (\w+)/i,
              ],
              [g, p],
              [/(sunos) ?([\w\.\d]*)/i],
              [[g, "Solaris"], p],
              [
                /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                /(unix) ?([\w\.]*)/i,
              ],
              [g, p],
            ],
          },
          q = function (e, t) {
            if ((typeof e === c && ((t = e), (e = s)), !(this instanceof q)))
              return new q(e, t).getResult();
            var n = typeof a !== o && a.navigator ? a.navigator : s,
              i = e || (n && n.userAgent ? n.userAgent : ""),
              I = n && n.userAgentData ? n.userAgentData : s,
              y = t
                ? (function (e, t) {
                    var n = {};
                    for (var i in e)
                      t[i] && t[i].length % 2 == 0
                        ? (n[i] = t[i].concat(e[i]))
                        : (n[i] = e[i]);
                    return n;
                  })($, t)
                : $,
              x = n && n.userAgent == i;
            return (
              (this.getBrowser = function () {
                var e,
                  t = {};
                return (
                  (t[g] = s),
                  (t[p] = s),
                  j.call(t, i, y.browser),
                  (t[d] =
                    typeof (e = t[p]) === l
                      ? e.replace(/[^\d\.]/g, "").split(".")[0]
                      : s),
                  x &&
                    n &&
                    n.brave &&
                    typeof n.brave.isBrave == r &&
                    (t[g] = "Brave"),
                  t
                );
              }),
              (this.getCPU = function () {
                var e = {};
                return (e[m] = s), j.call(e, i, y.cpu), e;
              }),
              (this.getDevice = function () {
                var e = {};
                return (
                  (e[h] = s),
                  (e[u] = s),
                  (e[b] = s),
                  j.call(e, i, y.device),
                  x && !e[b] && I && I.mobile && (e[b] = f),
                  x &&
                    "Macintosh" == e[u] &&
                    n &&
                    typeof n.standalone !== o &&
                    n.maxTouchPoints &&
                    n.maxTouchPoints > 2 &&
                    ((e[u] = "iPad"), (e[b] = C)),
                  e
                );
              }),
              (this.getEngine = function () {
                var e = {};
                return (e[g] = s), (e[p] = s), j.call(e, i, y.engine), e;
              }),
              (this.getOS = function () {
                var e = {};
                return (
                  (e[g] = s),
                  (e[p] = s),
                  j.call(e, i, y.os),
                  x &&
                    !e[g] &&
                    I &&
                    "Unknown" != I.platform &&
                    (e[g] = I.platform
                      .replace(/chrome os/i, Y)
                      .replace(/macos/i, T)),
                  e
                );
              }),
              (this.getResult = function () {
                return {
                  ua: this.getUA(),
                  browser: this.getBrowser(),
                  engine: this.getEngine(),
                  os: this.getOS(),
                  device: this.getDevice(),
                  cpu: this.getCPU(),
                };
              }),
              (this.getUA = function () {
                return i;
              }),
              (this.setUA = function (e) {
                return (
                  (i = typeof e === l && e.length > 500 ? M(e, 500) : e), this
                );
              }),
              this.setUA(i),
              this
            );
          };
        (q.VERSION = "1.0.37"),
          (q.BROWSER = V([g, p, d])),
          (q.CPU = V([m])),
          (q.DEVICE = V([u, h, b, I, f, y, C, x, G])),
          (q.ENGINE = q.OS = V([g, p])),
          typeof t !== o
            ? (e.exports && (t = e.exports = q), (t.UAParser = q))
            : n.amdO
            ? (i = function () {
                return q;
              }.call(t, n, t, e)) === s || (e.exports = i)
            : typeof a !== o && (a.UAParser = q);
        var K = typeof a !== o && (a.jQuery || a.Zepto);
        if (K && !K.ua) {
          var ee = new q();
          (K.ua = ee.getResult()),
            (K.ua.get = function () {
              return ee.getUA();
            }),
            (K.ua.set = function (e) {
              ee.setUA(e);
              var t = ee.getResult();
              for (var n in t) K.ua[n] = t[n];
            });
        }
      })("object" == typeof window ? window : this);
    },
    4531: (e, t, n) => {
      n.r(t), n.d(t, { default: () => i });
      const i = {
        content: {
          nodes: [
            {
              type: "TEXT",
              name: "TEXT_MAIN",
              value: "Enjoy Buyer Protection with Klarna",
            },
            {
              type: "ACTION",
              name: "ACTION_LEARN_MORE",
              label: "See payment options",
              url: "",
            },
            {
              type: "ACTION",
              name: "ACTION_OPEN_BUYERS_PROTECTION_LINK",
              label: "Buyer Protection",
              url: "https://www.klarna.com/uk/buyer-protection-description/",
            },
          ],
        },
        impression_url: "",
      };
    },
    4868: (e, t, n) => {
      var i = {
        "./cs-CZ.ts": [8116, 8116],
        "./da-DK.ts": [6331, 6331],
        "./de-AT.ts": [4579, 4579],
        "./de-CH.ts": [1845, 1845],
        "./de-DE.ts": [7821, 7821],
        "./el-GR.ts": [8261, 8261],
        "./en-AT.ts": [2079, 2079],
        "./en-AU.ts": [3056, 3056],
        "./en-BE.ts": [6091, 6091],
        "./en-CA.ts": [7562, 7562],
        "./en-CH.ts": [6489, 6489],
        "./en-CZ.ts": [5319, 5319],
        "./en-DE.ts": [81, 81],
        "./en-DK.ts": [5731, 5731],
        "./en-ES.ts": [8170, 8170],
        "./en-FI.ts": [4587, 4587],
        "./en-FR.ts": [9774, 9774],
        "./en-GB.ts": [4531],
        "./en-GR.ts": [7379, 7379],
        "./en-HU.ts": [9437, 9437],
        "./en-IE.ts": [9096, 9096],
        "./en-IT.ts": [4679, 4679],
        "./en-MX.ts": [3247, 3247],
        "./en-NL.ts": [7992, 7992],
        "./en-NO.ts": [8441, 8441],
        "./en-NZ.ts": [7294, 7294],
        "./en-PL.ts": [278, 278],
        "./en-PT.ts": [3806, 3806],
        "./en-RO.ts": [2469, 2469],
        "./en-SE.ts": [7270, 7270],
        "./en-SK.ts": [6664, 6664],
        "./en-US.ts": [3818, 3818],
        "./es-ES.ts": [1467, 1467],
        "./es-MX.ts": [4422, 4422],
        "./es-US.ts": [6059, 6059],
        "./fi-FI.ts": [4881, 4881],
        "./fr-BE.ts": [2930, 2930],
        "./fr-CA.ts": [6611, 6611],
        "./fr-CH.ts": [2476, 2476],
        "./fr-FR.ts": [8543, 8543],
        "./hu-HU.ts": [277, 277],
        "./it-CH.ts": [3859, 3859],
        "./it-IT.ts": [2101, 2101],
        "./nb-NO.ts": [1428, 1428],
        "./nl-BE.ts": [3636, 3636],
        "./nl-NL.ts": [9207, 9207],
        "./no-NO.ts": [829, 829],
        "./pl-PL.ts": [2715, 2715],
        "./pt-PT.ts": [2667, 2667],
        "./ro-RO.ts": [6789, 6789],
        "./sk-SK.ts": [6315, 6315],
        "./sv-FI.ts": [7345, 7345],
        "./sv-SE.ts": [7772, 7772],
      };
      function a(e) {
        if (!n.o(i, e))
          return Promise.resolve().then(() => {
            var t = new Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          });
        var t = i[e],
          a = t[0];
        return Promise.all(t.slice(1).map(n.e)).then(() => n(a));
      }
      (a.keys = () => Object.keys(i)), (a.id = 4868), (e.exports = a);
    },
    1187: (e, t) => {
      var n, i;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Device = t.IFRAMEID = t.InteractionModes = void 0),
        (function (e) {
          (e.DEVICE_BEST = "DEVICE_BEST"),
            (e.ON_PAGE = "ON_PAGE"),
            (e.IFRAME = "IFRAME"),
            (e.REDIRECT = "REDIRECT");
        })(n || (t.InteractionModes = n = {})),
        (t.IFRAMEID = "klarna-flow-interaction-mode-iframe"),
        (function (e) {
          (e.MOBILE = "MOBILE"),
            (e.DESKTOP = "DESKTOP"),
            (e.WEBVIEW = "WEBVIEW"),
            (e.UNKNOWN = "UNKNOWN");
        })(i || (t.Device = i = {}));
    },
    5890: function (e, t, n) {
      var i =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.updateIframeUrl =
          t.updatePopupUrl =
          t.getOpenedWindow =
          t.closeInteractionMode =
          t.Popup =
          t.WindowBlockedError =
          t.detectDeviceBest =
          t.triggerOnPage =
          t.triggerIframe =
          t.triggerRedirect =
          t.InteractionModes =
            void 0);
      const a = n(1187);
      Object.defineProperty(t, "InteractionModes", {
        enumerable: !0,
        get: function () {
          return a.InteractionModes;
        },
      });
      const s = n(375);
      Object.defineProperty(t, "triggerOnPage", {
        enumerable: !0,
        get: function () {
          return s.triggerOnPage;
        },
      });
      const r = n(1745);
      Object.defineProperty(t, "triggerIframe", {
        enumerable: !0,
        get: function () {
          return r.triggerIframe;
        },
      });
      const o = i(n(7819)),
        c = n(857);
      Object.defineProperty(t, "triggerRedirect", {
        enumerable: !0,
        get: function () {
          return c.triggerRedirect;
        },
      });
      const l = n(4961);
      Object.defineProperty(t, "detectDeviceBest", {
        enumerable: !0,
        get: function () {
          return l.detectDeviceBest;
        },
      });
      const d = n(8531);
      Object.defineProperty(t, "Popup", {
        enumerable: !0,
        get: function () {
          return d.Popup;
        },
      }),
        Object.defineProperty(t, "WindowBlockedError", {
          enumerable: !0,
          get: function () {
            return d.WindowBlockedError;
          },
        }),
        (t.closeInteractionMode = function () {
          o.default.ACTIVE_OVERLAY && o.default.ACTIVE_OVERLAY.destroy();
        }),
        (t.getOpenedWindow = function () {
          return o.default.ACTIVE_OVERLAY?.getOpenedWindow();
        }),
        (t.updatePopupUrl = function () {}),
        (t.updateIframeUrl = function () {});
    },
    8414: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WindowBlockedError = void 0);
      class n extends Error {
        constructor(e) {
          super(e), Object.setPrototypeOf(this, n.prototype);
        }
      }
      t.WindowBlockedError = n;
    },
    8531: (e, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WindowBlockedError = t.Popup = void 0);
      const i = n(8414);
      Object.defineProperty(t, "WindowBlockedError", {
        enumerable: !0,
        get: function () {
          return i.WindowBlockedError;
        },
      });
      const a = n(5597);
      Object.defineProperty(t, "Popup", {
        enumerable: !0,
        get: function () {
          return a.Popup;
        },
      });
    },
    5597: function (e, t, n) {
      var i =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Popup = t.DEFAULT_OVERLAY_CONTENT = void 0);
      const a = n(8414),
        s = i(n(7819)),
        r = n(4324),
        o = i(n(6678));
      t.DEFAULT_OVERLAY_CONTENT = {
        text: "Don't see the Klarna window? We'll help you open it to complete your purchase.",
        buttonLabel: "Continue",
      };
      const { maxAppHeight: c, preferredAppWidth: l } = o.default.viewport;
      t.Popup = class {
        constructor(e = window) {
          (this.openOverlay = (
            e,
            { overlayContent: t, previousActiveElement: n, onDestroy: i }
          ) => {
            new s.default({
              windowOpener: this.windowOpener,
              overlayContent: t,
              onOverlayClick: e,
              onDestroy: i,
              previousActiveElement: n,
            }).create();
          }),
            (this.openWindow = (
              e,
              {
                id: t = "Klarna",
                hideOverlay: n = !1,
                overlayContent: i,
                previousActiveElement: o,
                onDestroy: d,
                styles: { width: u = l, height: g = c } = {},
              }
            ) => {
              const { top: b, left: h } = ((e, t) => {
                  const n = screen.width,
                    i = screen.height,
                    a =
                      void 0 !== window.screenLeft
                        ? window.screenLeft
                        : window.screenX;
                  return {
                    top:
                      (i - t) / 2 +
                      (void 0 !== window.screenTop
                        ? window.screenTop
                        : window.screenY),
                    left: (n - e) / 2 + a,
                  };
                })(u, g),
                p = window.open(
                  e,
                  t,
                  `resizable=yes, width=${u}, height=${g}, top=${b}, left=${h}`
                );
              if (!p) throw new a.WindowBlockedError("Popup blocked");
              if (
                ((this.openedWindow = p),
                "about:blank" === e && this.injectKlarnaHeartbeat(),
                this.addListener(),
                s.default.ACTIVE_OVERLAY && s.default.ACTIVE_OVERLAY.destroy(),
                !n)
              ) {
                const e = new s.default({
                  windowOpener: this.windowOpener,
                  overlayContent: i,
                  onOverlayClick: () => this.openedWindow?.focus(),
                  onDestroy: () => {
                    this.closeOpenedWindow(), d?.();
                  },
                  previousActiveElement: o,
                });
                e.create();
                const t = () => {
                  e.destroy(), this.removeListener();
                };
                new r.WindowPoll(this.openedWindow, t).start();
              }
            }),
            (this.closeOpenedWindow = () => {
              this.openedWindow?.closed || this.openedWindow?.close();
            }),
            (this.getOpenedWindow = () => this.openedWindow),
            (this.updateWindowURL = (e) => {
              this.openedWindow &&
                !this.openedWindow.closed &&
                (this.openedWindow.location.href = e);
            }),
            (this.windowOpener = e);
        }
        addListener() {
          this.windowOpener.addEventListener("unload", this.closeOpenedWindow);
        }
        removeListener() {
          this.windowOpener.removeEventListener(
            "unload",
            this.closeOpenedWindow
          );
        }
        injectKlarnaHeartbeat() {
          this.openedWindow?.document.write(
            '\n        <style>\n          @keyframes heartbeat {\n            0%,\n            20%,\n            50%,\n            100% {\n              transform: scale3d(1, 1, 1);\n            }\n            10%,\n            30% {\n              transform: scale3d(1.1, 1.1, 1.1);\n            }\n          }\n          #klarna-logo-wrapper {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n          }\n          #klarna-logo {\n            animation: heartbeat 1.7s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite;\n            margin-bottom: 24px;\n          }\n        </style>\n        <div id="klarna-logo-wrapper">\n          <div id="klarna-logo">\n            <svg\n              width="131"\n              height="54"\n              viewBox="0 0 131 54"\n              fill="none"\n              xmlns="http://www.w3.org/2000/svg"\n            >\n              <title>Klarna</title>\n              <path\n                fill-rule="evenodd"\n                clip-rule="evenodd"\n                d="M0.5 15.8677C0.5 7.36407 7.33232 0.46875 15.7596 0.46875H115.24C123.668 0.46875 130.5 7.36407 130.5 15.8677V38.1322C130.5 46.6358 123.668 53.53 115.24 53.53H15.7596C7.33232 53.53 0.5 46.6358 0.5 38.1322V15.8677Z"\n                fill="#FFB3C7"\n              />\n              <path\n                fill-rule="evenodd"\n                clip-rule="evenodd"\n                d="M100.387 22.7873C102.07 22.7873 103.632 23.3069 104.924 24.1902V23.2102H109.502V38.5148H104.924V37.5371C103.632 38.4193 102.07 38.9377 100.387 38.9377C95.9319 38.9377 92.3204 35.3236 92.3204 30.8637C92.3204 26.4037 95.9319 22.7873 100.387 22.7873ZM52.0983 22.7873C53.7814 22.7873 55.3419 23.3069 56.6355 24.1902V23.2102H61.2124V38.5148H56.6355V37.5371C55.3419 38.4193 53.7814 38.9377 52.0983 38.9377C47.643 38.9377 44.0303 35.3236 44.0303 30.8637C44.0303 26.4037 47.643 22.7873 52.0983 22.7873ZM114.362 33.0863C115.949 33.0863 117.234 34.3743 117.234 35.9625C117.234 37.5508 115.949 38.8377 114.362 38.8377C112.776 38.8377 111.489 37.5508 111.489 35.9625C111.489 34.3743 112.776 33.0863 114.362 33.0863ZM34.0622 16.3867C34.0622 21.1786 32.1963 25.6363 28.8721 28.9492L35.8839 38.5216H29.6194L21.9977 28.1193L23.9647 26.6447C27.2265 24.1982 29.0981 20.459 29.0981 16.3867H34.0622ZM21.3912 16.3867V38.5205H16.418V16.3867H21.3912ZM42.1541 16.3901V38.5148H37.3637V16.3901H42.1541ZM84.1865 22.7987C87.8741 22.7987 90.7031 25.2214 90.7031 28.7832V38.5148H86.1308V30.4407C86.1308 28.2091 84.9747 27.0051 82.9633 27.0051C81.086 27.0051 79.5267 28.1454 79.5267 30.4726V38.5148H74.9135V23.2114H79.471V24.9349C80.6283 23.3671 82.358 22.7987 84.1865 22.7987ZM68.2935 23.2102V25.2043C69.2111 24.0083 70.9203 23.2114 72.7795 23.2114V27.6645C72.7613 27.6645 72.7431 27.6622 72.725 27.6622C70.9135 27.6622 68.3037 28.9594 68.3037 31.3696V38.5148H63.6076V23.2102H68.2935ZM100.762 26.9255C98.4714 26.9255 96.6145 28.6888 96.6145 30.8637C96.6145 33.0374 98.4714 34.8007 100.762 34.8007C103.053 34.8007 104.91 33.0374 104.91 30.8637C104.91 28.6888 103.053 26.9255 100.762 26.9255ZM52.472 26.9255C50.1824 26.9255 48.3255 28.6888 48.3255 30.8637C48.3255 33.0374 50.1824 34.8007 52.472 34.8007C54.7627 34.8007 56.6196 33.0374 56.6196 30.8637C56.6196 28.6888 54.7627 26.9255 52.472 26.9255Z"\n                fill="black"\n              />\n            </svg>\n          </div>\n        </div>\n      '
          );
        }
      };
    },
    4324: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WindowPoll = void 0),
        (t.WindowPoll = class {
          constructor(e, t) {
            (this.start = () => {
              this.openedWindowPolling = setInterval(() => {
                this.window.closed &&
                  (this.cleanupCallback(),
                  clearInterval(this.openedWindowPolling));
              }, 100);
            }),
              (this.window = e),
              (this.cleanupCallback = t);
          }
        });
    },
    1745: function (e, t, n) {
      var i =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.triggerIframe = void 0);
      const a = n(1187),
        s = n(2569),
        r = i(n(7819)),
        o = n(69),
        c = (e) => {
          const t = r.default.ACTIVE_OVERLAY?.getIframe();
          t && (t.src = e);
        };
      t.triggerIframe = function (e, t) {
        const n = (0, o.useStyles)(),
          i = t?.id ?? a.IFRAMEID,
          l = (0, s.createIframeStyles)(t?.styles),
          d = document.createElement("iframe");
        Object.assign(d.style, { ...l, ...n });
        for (const [n, a] of Object.entries({
          scrolling: "no",
          frameborder: "0",
          allow: "camera;microphone",
          src: e,
          id: i,
          title: t.title,
        }))
          n && a && d.setAttribute(n, a);
        r.default.ACTIVE_OVERLAY && r.default.ACTIVE_OVERLAY.destroy();
        const u = new r.default({
          windowOpener: t.fullscreenWindow || window,
          overlayContent: { ...t.overlayContent, iframe: d },
          onDestroy: t.onClose,
          onOverlayClick: () => u.destroy(),
          previousActiveElement: t.previousActiveElement,
        });
        return u.create(), { iframe: u.getIframe(), updateUrl: c };
      };
    },
    375: (e, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.triggerOnPage = void 0);
      const i = n(8531);
      t.triggerOnPage = function (e, t) {
        try {
          const n = new i.Popup(t.fullscreenWindow);
          return (
            n.openWindow(e, t),
            { getOpenedWindow: n.getOpenedWindow, updateUrl: n.updateWindowURL }
          );
        } catch (e) {
          throw e;
        }
      };
    },
    857: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.triggerRedirect = void 0),
        (t.triggerRedirect = function (e) {
          try {
            window.location.href = e;
          } catch (e) {
            throw e;
          }
        });
    },
    4343: (e, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.detectDevice = void 0);
      const i = n(1187);
      t.detectDevice = function () {
        const e = navigator.userAgent;
        return /((wv|sdk) \([^\)]+\))|WebView/i.test(e)
          ? i.Device.WEBVIEW
          : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              e
            )
          ? i.Device.MOBILE
          : /Windows|Macintosh|Linux/i.test(e)
          ? i.Device.DESKTOP
          : i.Device.UNKNOWN;
      };
    },
    4961: (e, t, n) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.detectDeviceBest = void 0);
      const i = n(1187),
        a = n(4343);
      t.detectDeviceBest = function () {
        const e = (0, a.detectDevice)();
        return e === i.Device.MOBILE || e === i.Device.DESKTOP
          ? i.InteractionModes.ON_PAGE
          : (i.Device.WEBVIEW, i.InteractionModes.REDIRECT);
      };
    },
    2569: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createIframeStyles = void 0),
        (t.createIframeStyles = function (e = {}) {
          return {
            display: "block",
            background: `${e.background ?? "white"}`,
            ...(e.width && { width: `${e.width}px` }),
            ...(e.height && { height: `${e.height}px` }),
            ...((e.borderRadius || 0 === e.borderRadius) && {
              borderRadius: `${e.borderRadius}px`,
            }),
          };
        });
    },
    7819: function (e, t, n) {
      var i =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      const a = i(n(3925));
      class s {
        constructor({
          windowOpener: e,
          overlayContent: t,
          onOverlayClick: n,
          onDestroy: i,
          previousActiveElement: a,
        }) {
          (this.windowOpener = e),
            (this.overlayContent = t),
            (this.onOverlayClick = n),
            (this.onDestroy = i),
            (this.previousActiveElement = a),
            (s.ACTIVE_OVERLAY = this);
        }
        createShadowRoot() {
          const e = this.windowOpener.document.createElement("div");
          e.setAttribute("id", "klarna-fullscreen-shadow-dom"),
            this.windowOpener.document.body.append(e);
          const t = this.windowOpener.document.createElement("span");
          return e.append(t), e.attachShadow({ mode: "open" });
        }
        create() {
          (this.root = this.createShadowRoot()),
            (this.root.innerHTML = (0, a.default)(
              this.overlayContent?.text,
              this.overlayContent?.buttonLabel,
              this.overlayContent?.iframe
            )),
            (this.overlay = this.root.querySelector(".overlay-open"));
          const e = this.overlay.querySelector("#overlay-close-button");
          document.body.style.overflow = "hidden";
          const t = (e) => {
            e.stopPropagation(), this.destroy();
          };
          this.overlay.addEventListener("click", this.onOverlayClick),
            (this.removeOverlayClickListener = () => {
              this.overlay?.removeEventListener("click", this.onOverlayClick);
            }),
            e?.addEventListener("click", (e) => t(e)),
            (this.removeOverlayCloseButtonListener = () => {
              e?.removeEventListener("click", (e) => t(e));
            });
        }
        getIframe() {
          return this.root?.querySelector("iframe");
        }
        destroy() {
          this.overlay?.classList.add("overlay-close"),
            this.onDestroy && this.onDestroy(),
            this.removeOverlayClickListener &&
              this.removeOverlayClickListener(),
            this.removeOverlayCloseButtonListener &&
              this.removeOverlayCloseButtonListener(),
            (document.body.style.overflow = ""),
            setTimeout(() => {
              this.root?.host?.parentNode?.removeChild(this.root?.host),
                this.previousActiveElement?.focus();
            }, 350);
        }
        getOpenedWindow() {
          return this.windowOpener;
        }
      }
      (s.ACTIVE_OVERLAY = null), (t.default = s);
    },
    6853: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          "\n@keyframes overlay-open-animation {\n    0% {\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  \n  @keyframes overlay-close-animation {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n  \n  .overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 2147483647;\n    background-image: radial-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  .overlay-open {\n    @extend .overlay;\n    animation: overlay-open-animation 0.3s linear;\n    opacity: 1;\n  }\n  \n  .overlay-close {\n    @extend .overlay;\n    animation: overlay-close-animation 0.3s linear;\n    opacity: 0;\n  }\n  \n  .close-button {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    cursor: pointer;\n  }\n  \n  .content {\n    width: 100%;\n    max-width: 350px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n  \n  .klarna-button {\n    background-color: white;\n    border: none;\n    cursor: pointer;\n    outline: 0;\n    -webkit-tap-highlight-color: transparent;\n    border-radius: 20px;\n    height: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 9px 14px 9px 16px;\n    color: rgb(23, 23, 23);\n    font-family: 'Klarna Text', 'Klarna Sans', Helvetica, Arial, sans-serif;\n    font-weight: 500;\n    font-size: 14px;\n    text-rendering: geometricPrecision;\n    -webkit-font-smoothing: antialiased;\n    line-height: 20px;\n  }\n  \n  .klarna-logo {\n    width: 120px;\n    max-width: 100%;\n    height: auto;\n  }\n  \n  .text-content {\n    color: white;\n    font-family: 'Klarna Text', 'Klarna Sans', Helvetica, Arial, sans-serif;\n    font-size: 14px;\n    text-rendering: geometricPrecision;\n    -webkit-font-smoothing: antialiased;\n    line-height: 20px;\n    text-align: center;\n    margin: 20px 0;\n  }\n  \n");
    },
    3925: function (e, t, n) {
      var i =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      const a = i(n(6853));
      t.default = (e, t, n) =>
        n
          ? `\n<style>${a.default}</style>\n<div class="overlay overlay-open">\n  ${n.outerHTML}\n</div>\n`
          : `\n<style>${
              a.default
            }</style>\n<div class="overlay overlay-open">\n  <div class="content">\n    <svg id="overlay-klarna-logo" width="81" height="20" viewBox="0 0 81 20" class="klarna-logo">\n      <g>\n        <path d="M78.3352549,14.3292706 C77.0678017,14.3292706 76.0403439,15.3567284 76.0403439,16.6243597 C76.0403439,17.8916348 77.0678017,18.9192707 78.3352549,18.9192707 C79.6027081,18.9192707 80.630344,17.8916348 80.630344,16.6243597 C80.630344,15.3567284 79.6027081,14.3292706 78.3352549,14.3292706" fill="white"></path>\n        <path d="M70.7958568,7.22817345 L70.7958568,6.4467803 L74.4529833,6.4467803 L74.4529833,18.6618356 L70.7958568,18.6618356 L70.7958568,17.8811547 C69.7626656,18.5857975 68.5156063,19 67.1704277,19 C63.6107082,19 60.7250027,16.1142945 60.7250027,12.554575 C60.7250027,8.99485561 63.6107082,6.10915009 67.1704277,6.10915009 C68.5156063,6.10915009 69.7626656,6.52335256 70.7958568,7.22817345 Z M67.4697718,15.6974209 C69.3000267,15.6974209 70.7835696,14.2902722 70.7835696,12.554575 C70.7835696,10.8188779 69.3000267,9.41208536 67.4697718,9.41208536 C65.6395168,9.41208536 64.1559739,10.8188779 64.1559739,12.554575 C64.1559739,14.2902722 65.6395168,15.6974209 67.4697718,15.6974209 Z" fill="white"></path>\n        <path d="M54.2263333,6.11823191 C52.765406,6.11823191 51.3828316,6.57178896 50.4584442,7.82312205 L50.4584442,6.4474926 L46.8169884,6.4474926 L46.8169884,18.6618356 L50.503141,18.6618356 L50.503141,12.2427657 C50.503141,10.3852653 51.7487757,9.47565814 53.2485235,9.47565814 C54.8558285,9.47565814 55.7798597,10.4358386 55.7798597,12.2174791 L55.7798597,18.6618356 L59.4327124,18.6618356 L59.4327124,10.8940256 C59.4327124,8.05141421 57.1725844,6.11823191 54.2263333,6.11823191" fill="white"></path>\n        <path d="M41.5278044,8.03788051 L41.5278044,6.44695838 L37.7834212,6.44695838 L37.7834212,18.6618356 L41.536174,18.6618356 L41.536174,12.9588053 C41.536174,11.0347048 43.6216104,10.0004452 45.0686479,10.0004452 C45.0834281,10.0004452 45.097318,10.0018698 45.1120982,10.0020479 L45.1120982,6.44767068 C43.6269526,6.44767068 42.2609392,7.08357654 41.5278044,8.03788051" fill="white"></path>\n        <path d="M32.2128788,7.22817345 L32.2128788,6.4467803 L35.8701833,6.4467803 L35.8701833,18.6618356 L32.2128788,18.6618356 L32.2128788,17.8811547 C31.1796876,18.5857975 29.9326283,19 28.5876277,19 C25.0279083,19 22.1422028,16.1142945 22.1422028,12.554575 C22.1422028,8.99485561 25.0279083,6.10915009 28.5876277,6.10915009 C29.9326283,6.10915009 31.1796876,6.52335256 32.2128788,7.22817345 Z M28.8867938,15.6974209 C30.7170487,15.6974209 32.2007697,14.2902722 32.2007697,12.554575 C32.2007697,10.8188779 30.7170487,9.41208536 28.8867938,9.41208536 C27.0567169,9.41208536 25.5729959,10.8188779 25.5729959,12.554575 C25.5729959,14.2902722 27.0567169,15.6974209 28.8867938,15.6974209 Z" fill="white"></path>\n        <path d="M16.8150889 18.6618356 20.6429893 18.6618356 20.6429893 1.00338343 16.8150889 1.00338343z" fill="white"></path>\n        <path d="M14.1770857,1 L10.2104649,1 C10.2104649,4.25111544 8.71570325,7.23511837 6.10957549,9.1873547 L4.53806353,10.3642524 L10.6271604,18.6673559 L15.6335612,18.6673559 L10.0307872,11.0272257 C12.6865979,8.38263373 14.1770857,4.82469505 14.1770857,1" fill="white"></path>\n        <path d="M0 18.6666436 4.05334336 18.6666436 4.05334336 1 0 1z" fill="white"></path>\n      </g>\n    </svg>\n    ${
              e ? `<p class="text-content">${e}</p>` : ""
            }\n    ${
              t
                ? `<button id="overlay-continue-button" class="klarna-button">${t}</button>`
                : ""
            }\n  </div>\n  <svg id="overlay-close-button" width="20" height="20" class="close-button">\n    <path d="M10.872,10.004 C11.321,9.864 11.747,9.631 12.102,9.275 L17.704,3.674 L16.29,2.26 L10.688,7.861 C10.298,8.252 9.665,8.252 9.274,7.861 L3.704,2.291 L2.29,3.705 L7.86,9.275 C8.224,9.639 8.66,9.875 9.121,10.013 C8.665,10.148 8.237,10.375 7.892,10.721 L2.29,16.322 L3.704,17.736 L9.307,12.135 C9.684,11.757 10.34,11.757 10.72,12.135 L16.29,17.705 L17.704,16.291 L12.134,10.721 C11.779,10.366 11.34,10.137 10.872,10.004" fill="white"></path>\n  </svg>\n</div>\n`;
    },
    69: function (e, t, n) {
      var i =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.useStyles = void 0);
      const a = i(n(6678)),
        {
          midResolutionHeight: s,
          lowResolutionWidth: r,
          preferredAppWidth: o,
          framedModeMinMargin: c,
          maxAppHeight: l,
        } = a.default.viewport,
        d = (e) => {
          const t = window.matchMedia(e);
          let n = t.matches;
          const i = (e) => {
              n = e.matches;
            },
            a = ((e) => (
              e.addEventListener("change", i),
              () => {
                e.removeEventListener("change", i);
              }
            ))(t);
          return window.addEventListener("resize", a), n;
        };
      t.useStyles = () => {
        const e = d(`(max-width: ${r}px)`),
          t = d(`(min-height: ${s}px)`),
          n = e ? "100%" : `${o}px`,
          i = e ? "100%" : t ? "70%" : `calc(100% - ${c}px)`,
          a = d("(orientation: portrait)"),
          u = e && a ? void 0 : l;
        return {
          width: n,
          height: i,
          maxHeight: u ? `${u}px` : void 0,
          borderRadius: e ? "0px" : "16px",
          transition: "height 0.5s ease",
        };
      };
    },
    6678: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = {
          viewport: {
            preferredAppWidth: 480,
            minHalfPanelHeight: 590,
            lowResolutionWidth: 560,
            midResolutionHeight: 800,
            highResolutionHeight: 1200,
            framedModeMinMargin: 40,
            maxAppHeight: 960,
          },
        });
    },
    8752: (e, t, n) => {
      n.d(t, { mN: () => v, AH: () => c, W3: () => x, Ec: () => G });
      const i = globalThis,
        a =
          i.ShadowRoot &&
          (void 0 === i.ShadyCSS || i.ShadyCSS.nativeShadow) &&
          "adoptedStyleSheets" in Document.prototype &&
          "replace" in CSSStyleSheet.prototype,
        s = Symbol(),
        r = new WeakMap();
      class o {
        constructor(e, t, n) {
          if (((this._$cssResult$ = !0), n !== s))
            throw Error(
              "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
            );
          (this.cssText = e), (this.t = t);
        }
        get styleSheet() {
          let e = this.o;
          const t = this.t;
          if (a && void 0 === e) {
            const n = void 0 !== t && 1 === t.length;
            n && (e = r.get(t)),
              void 0 === e &&
                ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
                n && r.set(t, e));
          }
          return e;
        }
        toString() {
          return this.cssText;
        }
      }
      const c = (e, ...t) => {
          const n =
            1 === e.length
              ? e[0]
              : t.reduce(
                  (t, n, i) =>
                    t +
                    ((e) => {
                      if (!0 === e._$cssResult$) return e.cssText;
                      if ("number" == typeof e) return e;
                      throw Error(
                        "Value passed to 'css' function must be a 'css' function result: " +
                          e +
                          ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                      );
                    })(n) +
                    e[i + 1],
                  e[0]
                );
          return new o(n, e, s);
        },
        l = (e, t) => {
          if (a)
            e.adoptedStyleSheets = t.map((e) =>
              e instanceof CSSStyleSheet ? e : e.styleSheet
            );
          else
            for (const n of t) {
              const t = document.createElement("style"),
                a = i.litNonce;
              void 0 !== a && t.setAttribute("nonce", a),
                (t.textContent = n.cssText),
                e.appendChild(t);
            }
        },
        d = a
          ? (e) => e
          : (e) =>
              e instanceof CSSStyleSheet
                ? ((e) => {
                    let t = "";
                    for (const n of e.cssRules) t += n.cssText;
                    return ((e) =>
                      new o("string" == typeof e ? e : e + "", void 0, s))(t);
                  })(e)
                : e,
        {
          is: u,
          defineProperty: g,
          getOwnPropertyDescriptor: b,
          getOwnPropertyNames: h,
          getOwnPropertySymbols: p,
          getPrototypeOf: m,
        } = Object,
        I = globalThis,
        f = I.trustedTypes,
        C = f ? f.emptyScript : "",
        y = I.reactiveElementPolyfillSupport,
        x = {
          toAttribute(e, t) {
            switch (t) {
              case Boolean:
                e = e ? C : null;
                break;
              case Object:
              case Array:
                e = null == e ? e : JSON.stringify(e);
            }
            return e;
          },
          fromAttribute(e, t) {
            let n = e;
            switch (t) {
              case Boolean:
                n = null !== e;
                break;
              case Number:
                n = null === e ? null : Number(e);
                break;
              case Object:
              case Array:
                try {
                  n = JSON.parse(e);
                } catch (e) {
                  n = null;
                }
            }
            return n;
          },
        },
        G = (e, t) => !u(e, t),
        A = {
          attribute: !0,
          type: String,
          converter: x,
          reflect: !1,
          hasChanged: G,
        };
      (Symbol.metadata ??= Symbol("metadata")),
        (I.litPropertyMetadata ??= new WeakMap());
      class v extends HTMLElement {
        static addInitializer(e) {
          this._$Ei(), (this.l ??= []).push(e);
        }
        static get observedAttributes() {
          return this.finalize(), this._$Eh && [...this._$Eh.keys()];
        }
        static createProperty(e, t = A) {
          if (
            (t.state && (t.attribute = !1),
            this._$Ei(),
            this.elementProperties.set(e, t),
            !t.noAccessor)
          ) {
            const n = Symbol(),
              i = this.getPropertyDescriptor(e, n, t);
            void 0 !== i && g(this.prototype, e, i);
          }
        }
        static getPropertyDescriptor(e, t, n) {
          const { get: i, set: a } = b(this.prototype, e) ?? {
            get() {
              return this[t];
            },
            set(e) {
              this[t] = e;
            },
          };
          return {
            get() {
              return i?.call(this);
            },
            set(t) {
              const s = i?.call(this);
              a.call(this, t), this.requestUpdate(e, s, n);
            },
            configurable: !0,
            enumerable: !0,
          };
        }
        static getPropertyOptions(e) {
          return this.elementProperties.get(e) ?? A;
        }
        static _$Ei() {
          if (this.hasOwnProperty("elementProperties")) return;
          const e = m(this);
          e.finalize(),
            void 0 !== e.l && (this.l = [...e.l]),
            (this.elementProperties = new Map(e.elementProperties));
        }
        static finalize() {
          if (this.hasOwnProperty("finalized")) return;
          if (
            ((this.finalized = !0),
            this._$Ei(),
            this.hasOwnProperty("properties"))
          ) {
            const e = this.properties,
              t = [...h(e), ...p(e)];
            for (const n of t) this.createProperty(n, e[n]);
          }
          const e = this[Symbol.metadata];
          if (null !== e) {
            const t = litPropertyMetadata.get(e);
            if (void 0 !== t)
              for (const [e, n] of t) this.elementProperties.set(e, n);
          }
          this._$Eh = new Map();
          for (const [e, t] of this.elementProperties) {
            const n = this._$Eu(e, t);
            void 0 !== n && this._$Eh.set(n, e);
          }
          this.elementStyles = this.finalizeStyles(this.styles);
        }
        static finalizeStyles(e) {
          const t = [];
          if (Array.isArray(e)) {
            const n = new Set(e.flat(1 / 0).reverse());
            for (const e of n) t.unshift(d(e));
          } else void 0 !== e && t.push(d(e));
          return t;
        }
        static _$Eu(e, t) {
          const n = t.attribute;
          return !1 === n
            ? void 0
            : "string" == typeof n
            ? n
            : "string" == typeof e
            ? e.toLowerCase()
            : void 0;
        }
        constructor() {
          super(),
            (this._$Ep = void 0),
            (this.isUpdatePending = !1),
            (this.hasUpdated = !1),
            (this._$Em = null),
            this._$Ev();
        }
        _$Ev() {
          (this._$ES = new Promise((e) => (this.enableUpdating = e))),
            (this._$AL = new Map()),
            this._$E_(),
            this.requestUpdate(),
            this.constructor.l?.forEach((e) => e(this));
        }
        addController(e) {
          (this._$EO ??= new Set()).add(e),
            void 0 !== this.renderRoot &&
              this.isConnected &&
              e.hostConnected?.();
        }
        removeController(e) {
          this._$EO?.delete(e);
        }
        _$E_() {
          const e = new Map(),
            t = this.constructor.elementProperties;
          for (const n of t.keys())
            this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
          e.size > 0 && (this._$Ep = e);
        }
        createRenderRoot() {
          const e =
            this.shadowRoot ??
            this.attachShadow(this.constructor.shadowRootOptions);
          return l(e, this.constructor.elementStyles), e;
        }
        connectedCallback() {
          (this.renderRoot ??= this.createRenderRoot()),
            this.enableUpdating(!0),
            this._$EO?.forEach((e) => e.hostConnected?.());
        }
        enableUpdating() {}
        disconnectedCallback() {
          this._$EO?.forEach((e) => e.hostDisconnected?.());
        }
        attributeChangedCallback(e, t, n) {
          this._$AK(e, n);
        }
        _$EC(e, t) {
          const n = this.constructor.elementProperties.get(e),
            i = this.constructor._$Eu(e, n);
          if (void 0 !== i && !0 === n.reflect) {
            const a = (
              void 0 !== n.converter?.toAttribute ? n.converter : x
            ).toAttribute(t, n.type);
            (this._$Em = e),
              null == a ? this.removeAttribute(i) : this.setAttribute(i, a),
              (this._$Em = null);
          }
        }
        _$AK(e, t) {
          const n = this.constructor,
            i = n._$Eh.get(e);
          if (void 0 !== i && this._$Em !== i) {
            const e = n.getPropertyOptions(i),
              a =
                "function" == typeof e.converter
                  ? { fromAttribute: e.converter }
                  : void 0 !== e.converter?.fromAttribute
                  ? e.converter
                  : x;
            (this._$Em = i),
              (this[i] = a.fromAttribute(t, e.type)),
              (this._$Em = null);
          }
        }
        requestUpdate(e, t, n) {
          if (void 0 !== e) {
            if (
              ((n ??= this.constructor.getPropertyOptions(e)),
              !(n.hasChanged ?? G)(this[e], t))
            )
              return;
            this.P(e, t, n);
          }
          !1 === this.isUpdatePending && (this._$ES = this._$ET());
        }
        P(e, t, n) {
          this._$AL.has(e) || this._$AL.set(e, t),
            !0 === n.reflect &&
              this._$Em !== e &&
              (this._$Ej ??= new Set()).add(e);
        }
        async _$ET() {
          this.isUpdatePending = !0;
          try {
            await this._$ES;
          } catch (e) {
            Promise.reject(e);
          }
          const e = this.scheduleUpdate();
          return null != e && (await e), !this.isUpdatePending;
        }
        scheduleUpdate() {
          return this.performUpdate();
        }
        performUpdate() {
          if (!this.isUpdatePending) return;
          if (!this.hasUpdated) {
            if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
              for (const [e, t] of this._$Ep) this[e] = t;
              this._$Ep = void 0;
            }
            const e = this.constructor.elementProperties;
            if (e.size > 0)
              for (const [t, n] of e)
                !0 !== n.wrapped ||
                  this._$AL.has(t) ||
                  void 0 === this[t] ||
                  this.P(t, this[t], n);
          }
          let e = !1;
          const t = this._$AL;
          try {
            (e = this.shouldUpdate(t)),
              e
                ? (this.willUpdate(t),
                  this._$EO?.forEach((e) => e.hostUpdate?.()),
                  this.update(t))
                : this._$EU();
          } catch (t) {
            throw ((e = !1), this._$EU(), t);
          }
          e && this._$AE(t);
        }
        willUpdate() {}
        _$AE(e) {
          this._$EO?.forEach((e) => e.hostUpdated?.()),
            this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
            this.updated(e);
        }
        _$EU() {
          (this._$AL = new Map()), (this.isUpdatePending = !1);
        }
        get updateComplete() {
          return this.getUpdateComplete();
        }
        getUpdateComplete() {
          return this._$ES;
        }
        shouldUpdate() {
          return !0;
        }
        update() {
          (this._$Ej &&= this._$Ej.forEach((e) => this._$EC(e, this[e]))),
            this._$EU();
        }
        updated() {}
        firstUpdated() {}
      }
      (v.elementStyles = []),
        (v.shadowRootOptions = { mode: "open" }),
        (v.elementProperties = new Map()),
        (v.finalized = new Map()),
        y?.({ ReactiveElement: v }),
        (I.reactiveElementVersions ??= []).push("2.0.4");
    },
    3450: (e, t, n) => {
      n.d(t, {
        JW: () => v,
        XX: () => D,
        c0: () => B,
        qy: () => A,
        s6: () => Z,
      });
      const i = globalThis,
        a = i.trustedTypes,
        s = a ? a.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
        r = "$lit$",
        o = `lit$${(Math.random() + "").slice(9)}$`,
        c = "?" + o,
        l = `<${c}>`,
        d = document,
        u = () => d.createComment(""),
        g = (e) =>
          null === e || ("object" != typeof e && "function" != typeof e),
        b = Array.isArray,
        h = "[ \t\n\f\r]",
        p = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
        m = /-->/g,
        I = />/g,
        f = RegExp(
          `>|${h}(?:([^\\s"'>=/]+)(${h}*=${h}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
          "g"
        ),
        C = /'/g,
        y = /"/g,
        x = /^(?:script|style|textarea|title)$/i,
        G =
          (e) =>
          (t, ...n) => ({ _$litType$: e, strings: t, values: n }),
        A = G(1),
        v = G(2),
        B = Symbol.for("lit-noChange"),
        Z = Symbol.for("lit-nothing"),
        Q = new WeakMap(),
        w = d.createTreeWalker(d, 129);
      function k(e, t) {
        if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
          throw Error("invalid template strings array");
        return void 0 !== s ? s.createHTML(t) : t;
      }
      const X = (e, t) => {
        const n = e.length - 1,
          i = [];
        let a,
          s = 2 === t ? "<svg>" : "",
          c = p;
        for (let t = 0; t < n; t++) {
          const n = e[t];
          let d,
            u,
            g = -1,
            b = 0;
          for (
            ;
            b < n.length && ((c.lastIndex = b), (u = c.exec(n)), null !== u);

          )
            (b = c.lastIndex),
              c === p
                ? "!--" === u[1]
                  ? (c = m)
                  : void 0 !== u[1]
                  ? (c = I)
                  : void 0 !== u[2]
                  ? (x.test(u[2]) && (a = RegExp("</" + u[2], "g")), (c = f))
                  : void 0 !== u[3] && (c = f)
                : c === f
                ? ">" === u[0]
                  ? ((c = a ?? p), (g = -1))
                  : void 0 === u[1]
                  ? (g = -2)
                  : ((g = c.lastIndex - u[2].length),
                    (d = u[1]),
                    (c = void 0 === u[3] ? f : '"' === u[3] ? y : C))
                : c === y || c === C
                ? (c = f)
                : c === m || c === I
                ? (c = p)
                : ((c = f), (a = void 0));
          const h = c === f && e[t + 1].startsWith("/>") ? " " : "";
          s +=
            c === p
              ? n + l
              : g >= 0
              ? (i.push(d), n.slice(0, g) + r + n.slice(g) + o + h)
              : n + o + (-2 === g ? t : h);
        }
        return [k(e, s + (e[n] || "<?>") + (2 === t ? "</svg>" : "")), i];
      };
      class E {
        constructor({ strings: e, _$litType$: t }, n) {
          let i;
          this.parts = [];
          let s = 0,
            l = 0;
          const d = e.length - 1,
            g = this.parts,
            [b, h] = X(e, t);
          if (
            ((this.el = E.createElement(b, n)),
            (w.currentNode = this.el.content),
            2 === t)
          ) {
            const e = this.el.content.firstChild;
            e.replaceWith(...e.childNodes);
          }
          for (; null !== (i = w.nextNode()) && g.length < d; ) {
            if (1 === i.nodeType) {
              if (i.hasAttributes())
                for (const e of i.getAttributeNames())
                  if (e.endsWith(r)) {
                    const t = h[l++],
                      n = i.getAttribute(e).split(o),
                      a = /([.?@])?(.*)/.exec(t);
                    g.push({
                      type: 1,
                      index: s,
                      name: a[2],
                      strings: n,
                      ctor:
                        "." === a[1]
                          ? R
                          : "?" === a[1]
                          ? U
                          : "@" === a[1]
                          ? O
                          : F,
                    }),
                      i.removeAttribute(e);
                  } else
                    e.startsWith(o) &&
                      (g.push({ type: 6, index: s }), i.removeAttribute(e));
              if (x.test(i.tagName)) {
                const e = i.textContent.split(o),
                  t = e.length - 1;
                if (t > 0) {
                  i.textContent = a ? a.emptyScript : "";
                  for (let n = 0; n < t; n++)
                    i.append(e[n], u()),
                      w.nextNode(),
                      g.push({ type: 2, index: ++s });
                  i.append(e[t], u());
                }
              }
            } else if (8 === i.nodeType)
              if (i.data === c) g.push({ type: 2, index: s });
              else {
                let e = -1;
                for (; -1 !== (e = i.data.indexOf(o, e + 1)); )
                  g.push({ type: 7, index: s }), (e += o.length - 1);
              }
            s++;
          }
        }
        static createElement(e) {
          const t = d.createElement("template");
          return (t.innerHTML = e), t;
        }
      }
      function N(e, t, n = e, i) {
        if (t === B) return t;
        let a = void 0 !== i ? n._$Co?.[i] : n._$Cl;
        const s = g(t) ? void 0 : t._$litDirective$;
        return (
          a?.constructor !== s &&
            (a?._$AO?.(!1),
            void 0 === s ? (a = void 0) : ((a = new s(e)), a._$AT(e, n, i)),
            void 0 !== i ? ((n._$Co ??= [])[i] = a) : (n._$Cl = a)),
          void 0 !== a && (t = N(e, a._$AS(e, t.values), a, i)),
          t
        );
      }
      class W {
        constructor(e, t) {
          (this._$AV = []),
            (this._$AN = void 0),
            (this._$AD = e),
            (this._$AM = t);
        }
        get parentNode() {
          return this._$AM.parentNode;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        u(e) {
          const {
              el: { content: t },
              parts: n,
            } = this._$AD,
            i = (e?.creationScope ?? d).importNode(t, !0);
          w.currentNode = i;
          let a = w.nextNode(),
            s = 0,
            r = 0,
            o = n[0];
          for (; void 0 !== o; ) {
            if (s === o.index) {
              let t;
              2 === o.type
                ? (t = new L(a, a.nextSibling, this, e))
                : 1 === o.type
                ? (t = new o.ctor(a, o.name, o.strings, this, e))
                : 6 === o.type && (t = new _(a, this, e)),
                this._$AV.push(t),
                (o = n[++r]);
            }
            s !== o?.index && ((a = w.nextNode()), s++);
          }
          return (w.currentNode = d), i;
        }
        p(e) {
          let t = 0;
          for (const n of this._$AV)
            void 0 !== n &&
              (void 0 !== n.strings
                ? (n._$AI(e, n, t), (t += n.strings.length - 2))
                : n._$AI(e[t])),
              t++;
        }
      }
      class L {
        get _$AU() {
          return this._$AM?._$AU ?? this._$Cv;
        }
        constructor(e, t, n, i) {
          (this.type = 2),
            (this._$AH = Z),
            (this._$AN = void 0),
            (this._$AA = e),
            (this._$AB = t),
            (this._$AM = n),
            (this.options = i),
            (this._$Cv = i?.isConnected ?? !0);
        }
        get parentNode() {
          let e = this._$AA.parentNode;
          const t = this._$AM;
          return void 0 !== t && 11 === e?.nodeType && (e = t.parentNode), e;
        }
        get startNode() {
          return this._$AA;
        }
        get endNode() {
          return this._$AB;
        }
        _$AI(e, t = this) {
          (e = N(this, e, t)),
            g(e)
              ? e === Z || null == e || "" === e
                ? (this._$AH !== Z && this._$AR(), (this._$AH = Z))
                : e !== this._$AH && e !== B && this._(e)
              : void 0 !== e._$litType$
              ? this.$(e)
              : void 0 !== e.nodeType
              ? this.T(e)
              : ((e) => b(e) || "function" == typeof e?.[Symbol.iterator])(e)
              ? this.k(e)
              : this._(e);
        }
        S(e) {
          return this._$AA.parentNode.insertBefore(e, this._$AB);
        }
        T(e) {
          this._$AH !== e && (this._$AR(), (this._$AH = this.S(e)));
        }
        _(e) {
          this._$AH !== Z && g(this._$AH)
            ? (this._$AA.nextSibling.data = e)
            : this.T(d.createTextNode(e)),
            (this._$AH = e);
        }
        $(e) {
          const { values: t, _$litType$: n } = e,
            i =
              "number" == typeof n
                ? this._$AC(e)
                : (void 0 === n.el &&
                    (n.el = E.createElement(k(n.h, n.h[0]), this.options)),
                  n);
          if (this._$AH?._$AD === i) this._$AH.p(t);
          else {
            const e = new W(i, this),
              n = e.u(this.options);
            e.p(t), this.T(n), (this._$AH = e);
          }
        }
        _$AC(e) {
          let t = Q.get(e.strings);
          return void 0 === t && Q.set(e.strings, (t = new E(e))), t;
        }
        k(e) {
          b(this._$AH) || ((this._$AH = []), this._$AR());
          const t = this._$AH;
          let n,
            i = 0;
          for (const a of e)
            i === t.length
              ? t.push(
                  (n = new L(this.S(u()), this.S(u()), this, this.options))
                )
              : (n = t[i]),
              n._$AI(a),
              i++;
          i < t.length &&
            (this._$AR(n && n._$AB.nextSibling, i), (t.length = i));
        }
        _$AR(e = this._$AA.nextSibling, t) {
          for (this._$AP?.(!1, !0, t); e && e !== this._$AB; ) {
            const t = e.nextSibling;
            e.remove(), (e = t);
          }
        }
        setConnected(e) {
          void 0 === this._$AM && ((this._$Cv = e), this._$AP?.(e));
        }
      }
      class F {
        get tagName() {
          return this.element.tagName;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        constructor(e, t, n, i, a) {
          (this.type = 1),
            (this._$AH = Z),
            (this._$AN = void 0),
            (this.element = e),
            (this.name = t),
            (this._$AM = i),
            (this.options = a),
            n.length > 2 || "" !== n[0] || "" !== n[1]
              ? ((this._$AH = Array(n.length - 1).fill(new String())),
                (this.strings = n))
              : (this._$AH = Z);
        }
        _$AI(e, t = this, n, i) {
          const a = this.strings;
          let s = !1;
          if (void 0 === a)
            (e = N(this, e, t, 0)),
              (s = !g(e) || (e !== this._$AH && e !== B)),
              s && (this._$AH = e);
          else {
            const i = e;
            let r, o;
            for (e = a[0], r = 0; r < a.length - 1; r++)
              (o = N(this, i[n + r], t, r)),
                o === B && (o = this._$AH[r]),
                (s ||= !g(o) || o !== this._$AH[r]),
                o === Z ? (e = Z) : e !== Z && (e += (o ?? "") + a[r + 1]),
                (this._$AH[r] = o);
          }
          s && !i && this.j(e);
        }
        j(e) {
          e === Z
            ? this.element.removeAttribute(this.name)
            : this.element.setAttribute(this.name, e ?? "");
        }
      }
      class R extends F {
        constructor() {
          super(...arguments), (this.type = 3);
        }
        j(e) {
          this.element[this.name] = e === Z ? void 0 : e;
        }
      }
      class U extends F {
        constructor() {
          super(...arguments), (this.type = 4);
        }
        j(e) {
          this.element.toggleAttribute(this.name, !!e && e !== Z);
        }
      }
      class O extends F {
        constructor(e, t, n, i, a) {
          super(e, t, n, i, a), (this.type = 5);
        }
        _$AI(e, t = this) {
          if ((e = N(this, e, t, 0) ?? Z) === B) return;
          const n = this._$AH,
            i =
              (e === Z && n !== Z) ||
              e.capture !== n.capture ||
              e.once !== n.once ||
              e.passive !== n.passive,
            a = e !== Z && (n === Z || i);
          i && this.element.removeEventListener(this.name, this, n),
            a && this.element.addEventListener(this.name, this, e),
            (this._$AH = e);
        }
        handleEvent(e) {
          "function" == typeof this._$AH
            ? this._$AH.call(this.options?.host ?? this.element, e)
            : this._$AH.handleEvent(e);
        }
      }
      class _ {
        constructor(e, t, n) {
          (this.element = e),
            (this.type = 6),
            (this._$AN = void 0),
            (this._$AM = t),
            (this.options = n);
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(e) {
          N(this, e);
        }
      }
      const S = i.litHtmlPolyfillSupport;
      S?.(E, L), (i.litHtmlVersions ??= []).push("3.1.2");
      const D = (e, t, n) => {
        const i = n?.renderBefore ?? t;
        let a = i._$litPart$;
        if (void 0 === a) {
          const e = n?.renderBefore ?? null;
          i._$litPart$ = a = new L(t.insertBefore(u(), e), e, void 0, n ?? {});
        }
        return a._$AI(e), a;
      };
    },
    5542: (e, t, n) => {
      n.d(t, { EM: () => i, MZ: () => o, wk: () => c });
      const i = (e) => (t, n) => {
        void 0 !== n
          ? n.addInitializer(() => {
              customElements.define(e, t);
            })
          : customElements.define(e, t);
      };
      var a = n(8752);
      const s = {
          attribute: !0,
          type: String,
          converter: a.W3,
          reflect: !1,
          hasChanged: a.Ec,
        },
        r = (e = s, t, n) => {
          const { kind: i, metadata: a } = n;
          let r = globalThis.litPropertyMetadata.get(a);
          if (
            (void 0 === r &&
              globalThis.litPropertyMetadata.set(a, (r = new Map())),
            r.set(n.name, e),
            "accessor" === i)
          ) {
            const { name: i } = n;
            return {
              set(n) {
                const a = t.get.call(this);
                t.set.call(this, n), this.requestUpdate(i, a, e);
              },
              init(t) {
                return void 0 !== t && this.P(i, void 0, e), t;
              },
            };
          }
          if ("setter" === i) {
            const { name: i } = n;
            return function (n) {
              const a = this[i];
              t.call(this, n), this.requestUpdate(i, a, e);
            };
          }
          throw Error("Unsupported decorator location: " + i);
        };
      function o(e) {
        return (t, n) =>
          "object" == typeof n
            ? r(e, t, n)
            : ((e, t, n) => {
                const i = t.hasOwnProperty(n);
                return (
                  t.constructor.createProperty(
                    n,
                    i ? { ...e, wrapped: !0 } : e
                  ),
                  i ? Object.getOwnPropertyDescriptor(t, n) : void 0
                );
              })(e, t, n);
      }
      function c(e) {
        return o({ ...e, state: !0, attribute: !1 });
      }
    },
    8091: (e, t, n) => {
      n.d(t, { WF: () => s, AH: () => i.AH, qy: () => a.qy, JW: () => a.JW });
      var i = n(8752),
        a = n(3450);
      class s extends i.mN {
        constructor() {
          super(...arguments),
            (this.renderOptions = { host: this }),
            (this._$Do = void 0);
        }
        createRenderRoot() {
          const e = super.createRenderRoot();
          return (this.renderOptions.renderBefore ??= e.firstChild), e;
        }
        update(e) {
          const t = this.render();
          this.hasUpdated ||
            (this.renderOptions.isConnected = this.isConnected),
            super.update(e),
            (this._$Do = (0, a.XX)(t, this.renderRoot, this.renderOptions));
        }
        connectedCallback() {
          super.connectedCallback(), this._$Do?.setConnected(!0);
        }
        disconnectedCallback() {
          super.disconnectedCallback(), this._$Do?.setConnected(!1);
        }
        render() {
          return a.c0;
        }
      }
      (s._$litElement$ = !0),
        (s.finalized = !0),
        globalThis.litElementHydrateSupport?.({ LitElement: s });
      const r = globalThis.litElementPolyfillSupport;
      r?.({ LitElement: s }),
        (globalThis.litElementVersions ??= []).push("4.0.4");
    },
  },
  i = {};
function a(e) {
  var t = i[e];
  if (void 0 !== t) return t.exports;
  var s = (i[e] = { exports: {} });
  return n[e].call(s.exports, s, s.exports, a), s.exports;
}
(a.m = n),
  (a.amdO = {}),
  (a.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return a.d(t, { a: t }), t;
  }),
  (a.d = (e, t) => {
    for (var n in t)
      a.o(t, n) &&
        !a.o(e, n) &&
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
  }),
  (a.f = {}),
  (a.e = (e) =>
    Promise.all(Object.keys(a.f).reduce((t, n) => (a.f[n](e, t), t), []))),
  (a.u = (e) =>
    "0.0.237/" + (4328 === e ? "klarna-test-drive-badge" : e) + ".js"),
  (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
  (e = {}),
  (t = "@klarna-web-sdk/lib:"),
  (a.l = (n, i, s, r) => {
    if (e[n]) e[n].push(i);
    else {
      var o, c;
      if (void 0 !== s)
        for (
          var l = document.getElementsByTagName("script"), d = 0;
          d < l.length;
          d++
        ) {
          var u = l[d];
          if (
            u.getAttribute("src") == n ||
            u.getAttribute("data-webpack") == t + s
          ) {
            o = u;
            break;
          }
        }
      o ||
        ((c = !0),
        ((o = document.createElement("script")).type = "module"),
        (o.charset = "utf-8"),
        (o.timeout = 120),
        a.nc && o.setAttribute("nonce", a.nc),
        o.setAttribute("data-webpack", t + s),
        (o.src = n)),
        (e[n] = [i]);
      var g = (t, i) => {
          (o.onerror = o.onload = null), clearTimeout(b);
          var a = e[n];
          if (
            (delete e[n],
            o.parentNode && o.parentNode.removeChild(o),
            a && a.forEach((e) => e(i)),
            t)
          )
            return t(i);
        },
        b = setTimeout(
          g.bind(null, void 0, { type: "timeout", target: o }),
          12e4
        );
      (o.onerror = g.bind(null, o.onerror)),
        (o.onload = g.bind(null, o.onload)),
        c && document.head.appendChild(o);
    }
  }),
  (a.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
  (() => {
    var e;
    if (("string" == typeof import.meta.url && (e = import.meta.url), !e))
      throw new Error("Automatic publicPath is not supported in this browser");
    (e = e
      .replace(/#.*$/, "")
      .replace(/\?.*$/, "")
      .replace(/\/[^\/]+$/, "/")),
      (a.p = e + "../");
  })(),
  (() => {
    var e = { 1249: 0 };
    a.f.j = (t, n) => {
      var i = a.o(e, t) ? e[t] : void 0;
      if (0 !== i)
        if (i) n.push(i[2]);
        else {
          var s = new Promise((n, a) => (i = e[t] = [n, a]));
          n.push((i[2] = s));
          var r = a.p + a.u(t),
            o = new Error();
          a.l(
            r,
            (n) => {
              if (a.o(e, t) && (0 !== (i = e[t]) && (e[t] = void 0), i)) {
                var s = n && ("load" === n.type ? "missing" : n.type),
                  r = n && n.target && n.target.src;
                (o.message =
                  "Loading chunk " + t + " failed.\n(" + s + ": " + r + ")"),
                  (o.name = "ChunkLoadError"),
                  (o.type = s),
                  (o.request = r),
                  i[1](o);
              }
            },
            "chunk-" + t,
            t
          );
        }
    };
    var t = (t, n) => {
        var i,
          s,
          [r, o, c] = n,
          l = 0;
        if (r.some((t) => 0 !== e[t])) {
          for (i in o) a.o(o, i) && (a.m[i] = o[i]);
          c && c(a);
        }
        for (t && t(n); l < r.length; l++)
          (s = r[l]), a.o(e, s) && e[s] && e[s][0](), (e[s] = 0);
      },
      n = (self.webpackChunk_klarna_web_sdk_lib =
        self.webpackChunk_klarna_web_sdk_lib || []);
    n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
  })();
var s = {};
(() => {
  a.d(s, { A: () => Hr });
  var e = {};
  a.r(e),
    a.d(e, {
      ALL: () => c,
      DEBUG: () => d,
      ERROR: () => b,
      FATAL: () => h,
      INFO: () => u,
      OFF: () => p,
      TRACE: () => l,
      WARN: () => g,
    });
  const t = { INIT: 5, MERCHANT_WARN: 5 },
    n = (e) => 100 * Math.random() < e;
  let i = (function (e) {
    return (
      (e.websdk = "websdk"),
      (e.osm = "osm-client-script"),
      (e.identitySdk = "identity-sdk"),
      e
    );
  })({});
  const r = {
      create: function (e, t) {
        new e.Image().src = t;
      },
    },
    o = {
      create: function (e, t, n) {
        e.navigator.sendBeacon(t, JSON.stringify(n));
      },
    };
  var c = 0,
    l = 0,
    d = 1,
    u = 2,
    g = 3,
    b = 4,
    h = 5,
    p = 6,
    m =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }
        return e;
      },
    I =
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
    f = "/v1/";
  const C = {};
  function y(t) {
    let n = u,
      i = {};
    const a = (e, a = {}, s = {}, r = u) => {
        r < n || (C[t] && C[t].event(e, { level: r, ...s, ...i, ...a }, {}, r));
      },
      s =
        (e, t) =>
        (n, i = {}, a = {}) =>
          e(n, i, a, t);
    return {
      configure: ({ options: e, data: n = {}, instanceId: a }) => {
        (i = n),
          C[t] ||
            (C[t] = (function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : window;
              if ("object" !== (void 0 === e ? "undefined" : I(e)) || !e)
                throw new TypeError("expected configuration object");
              var n = e.baseUrl,
                i = void 0 === n ? "https://eu.klarnaevt.com" : n,
                a = e.client,
                s = e.clientVersion,
                C = e.sessionId,
                y = e.commonData,
                x = void 0 === y ? {} : y,
                G = e.instanceId,
                A = void 0 === G ? Math.floor(9e3 * Math.random()) + 1e3 : G,
                v = e.logLevel || c;
              if ("string" != typeof a)
                throw new TypeError(
                  "expected `client` in the configuration object"
                );
              if ("string" != typeof s)
                throw new TypeError(
                  "expected `clientVersion` in the configuration object"
                );
              if ("string" != typeof C)
                throw new TypeError(
                  "expected `sessionId` in the configuration object"
                );
              if ("number" != typeof v || v < c || v > p)
                throw new TypeError("invalid `logLevel` (" + v + ")");
              function B(e) {
                return Object.keys(e)
                  .sort()
                  .map(function (t) {
                    return (
                      encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                    );
                  })
                  .join("&");
              }
              function Z(e) {
                var n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  l = arguments[2];
                if (
                  !(
                    v >
                    (arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : c)
                  )
                ) {
                  if (!e)
                    throw new TypeError("expected `name` as first parameter");
                  var d = (function (e, t) {
                    return "" + i + f + a + "/" + s + "/" + e + "?" + B(t);
                  })(
                    e,
                    (n = m({}, x, n, {
                      iid: A,
                      sid: C,
                      timestamp: n.timestamp || new Date().getTime(),
                    }))
                  );
                  try {
                    o.create(t, d, l);
                  } catch (e) {
                    l && (d += "&" + B(l)), r.create(t, d);
                  }
                }
              }
              return {
                event: Z,
                trace: function (e, t, n) {
                  Z(e, t, n, l);
                },
                debug: function (e, t, n) {
                  Z(e, t, n, d);
                },
                info: function (e, t, n) {
                  Z(e, t, n, u);
                },
                warn: function (e, t, n) {
                  Z(e, t, n, g);
                },
                error: function (e, t, n) {
                  Z(e, t, n, b);
                },
                fatal: function (e, t, n) {
                  Z(e, t, n, h);
                },
                setLogLevel: function () {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : c;
                  if ("number" != typeof e || e < c || e > p)
                    throw new TypeError("invalid `logLevel` (" + e + ")");
                  v = e;
                },
                getConfig: function () {
                  return {
                    baseUrl: i,
                    client: a,
                    clientVersion: s,
                    sessionId: C,
                    instanceId: A,
                    logLevel: v,
                  };
                },
              };
            })(x({ ...e, instanceId: a })));
      },
      event: a,
      trace: s(a, l),
      debug: s(a, d),
      info: s(a, u),
      warn: s(a, g),
      error: s(a, b),
      fatal: s(a, h),
      setLogLevel(i = "ALL") {
        try {
          const a = i.toUpperCase();
          (n = a in e ? e[a] : c), C[t] && C[t].setLogLevel(n);
        } catch (e) {}
      },
      removeInstance() {
        C[t] && delete C[t];
      },
    };
  }
  const x = ({
      client: e = "sdk",
      clientVersion: t = "",
      sessionId: n = "",
      instanceId: i,
      baseUrl: a = "",
    }) => ({
      client: e,
      clientVersion: t,
      environment: "production",
      sessionId: n,
      instanceId: i,
      baseUrl: a,
    }),
    G = "Klarna Web SDK:",
    A = "color: black; background-color: #FFB3C7; padding: 2px;";
  function v(e) {
    console.error(`%c${G} ${e}`, A),
      y(i.websdk).event("metric_merchant_error", { message: e });
  }
  function B(e) {
    console.warn(`%c${G} ${e}`, A),
      n(t.MERCHANT_WARN) &&
        y(i.websdk).event("metric_merchant_warn", { message: e });
  }
  const Z = {
    randomUUID:
      "undefined" != typeof crypto &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
  };
  let Q;
  const w = new Uint8Array(16);
  function k() {
    if (
      !Q &&
      ((Q =
        "undefined" != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)),
      !Q)
    )
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    return Q(w);
  }
  const X = [];
  for (let e = 0; e < 256; ++e) X.push((e + 256).toString(16).slice(1));
  const E = function (e, t, n) {
      if (Z.randomUUID && !t && !e) return Z.randomUUID();
      const i = (e = e || {}).random || (e.rng || k)();
      if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), t)) {
        n = n || 0;
        for (let e = 0; e < 16; ++e) t[n + e] = i[e];
        return t;
      }
      return (function (e, t = 0) {
        return (
          X[e[t + 0]] +
          X[e[t + 1]] +
          X[e[t + 2]] +
          X[e[t + 3]] +
          "-" +
          X[e[t + 4]] +
          X[e[t + 5]] +
          "-" +
          X[e[t + 6]] +
          X[e[t + 7]] +
          "-" +
          X[e[t + 8]] +
          X[e[t + 9]] +
          "-" +
          X[e[t + 10]] +
          X[e[t + 11]] +
          X[e[t + 12]] +
          X[e[t + 13]] +
          X[e[t + 14]] +
          X[e[t + 15]]
        );
      })(i);
    },
    N = "klarna_initialize_messenger_handshake",
    W = "klarna_initialize_messenger_handshake_complete",
    L = /(\.klarna\.com|\.klarna\.net|^x\.klarnacdn\.net)$/u;
  var F, R;
  !(function (e) {
    (e.assertEqual = (e) => e),
      (e.assertIs = function () {}),
      (e.assertNever = function () {
        throw new Error();
      }),
      (e.arrayToEnum = (e) => {
        const t = {};
        for (const n of e) t[n] = n;
        return t;
      }),
      (e.getValidEnumValues = (t) => {
        const n = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
          i = {};
        for (const e of n) i[e] = t[e];
        return e.objectValues(i);
      }),
      (e.objectValues = (t) =>
        e.objectKeys(t).map(function (e) {
          return t[e];
        })),
      (e.objectKeys =
        "function" == typeof Object.keys
          ? (e) => Object.keys(e)
          : (e) => {
              const t = [];
              for (const n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
              return t;
            }),
      (e.find = (e, t) => {
        for (const n of e) if (t(n)) return n;
      }),
      (e.isInteger =
        "function" == typeof Number.isInteger
          ? (e) => Number.isInteger(e)
          : (e) => "number" == typeof e && isFinite(e) && Math.floor(e) === e),
      (e.joinValues = function (e, t = " | ") {
        return e.map((e) => ("string" == typeof e ? `'${e}'` : e)).join(t);
      }),
      (e.jsonStringifyReplacer = (e, t) =>
        "bigint" == typeof t ? t.toString() : t);
  })(F || (F = {})),
    (function (e) {
      e.mergeShapes = (e, t) => ({ ...e, ...t });
    })(R || (R = {}));
  const U = F.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set",
    ]),
    O = (e) => {
      switch (typeof e) {
        case "undefined":
          return U.undefined;
        case "string":
          return U.string;
        case "number":
          return isNaN(e) ? U.nan : U.number;
        case "boolean":
          return U.boolean;
        case "function":
          return U.function;
        case "bigint":
          return U.bigint;
        case "symbol":
          return U.symbol;
        case "object":
          return Array.isArray(e)
            ? U.array
            : null === e
            ? U.null
            : e.then &&
              "function" == typeof e.then &&
              e.catch &&
              "function" == typeof e.catch
            ? U.promise
            : "undefined" != typeof Map && e instanceof Map
            ? U.map
            : "undefined" != typeof Set && e instanceof Set
            ? U.set
            : "undefined" != typeof Date && e instanceof Date
            ? U.date
            : U.object;
        default:
          return U.unknown;
      }
    },
    _ = F.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite",
    ]);
  class S extends Error {
    constructor(e) {
      super(),
        (this.issues = []),
        (this.addIssue = (e) => {
          this.issues = [...this.issues, e];
        }),
        (this.addIssues = (e = []) => {
          this.issues = [...this.issues, ...e];
        });
      const t = new.target.prototype;
      Object.setPrototypeOf
        ? Object.setPrototypeOf(this, t)
        : (this.__proto__ = t),
        (this.name = "ZodError"),
        (this.issues = e);
    }
    get errors() {
      return this.issues;
    }
    format(e) {
      const t =
          e ||
          function (e) {
            return e.message;
          },
        n = { _errors: [] },
        i = (e) => {
          for (const a of e.issues)
            if ("invalid_union" === a.code) a.unionErrors.map(i);
            else if ("invalid_return_type" === a.code) i(a.returnTypeError);
            else if ("invalid_arguments" === a.code) i(a.argumentsError);
            else if (0 === a.path.length) n._errors.push(t(a));
            else {
              let e = n,
                i = 0;
              for (; i < a.path.length; ) {
                const n = a.path[i];
                i === a.path.length - 1
                  ? ((e[n] = e[n] || { _errors: [] }), e[n]._errors.push(t(a)))
                  : (e[n] = e[n] || { _errors: [] }),
                  (e = e[n]),
                  i++;
              }
            }
        };
      return i(this), n;
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, F.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return 0 === this.issues.length;
    }
    flatten(e = (e) => e.message) {
      const t = {},
        n = [];
      for (const i of this.issues)
        i.path.length > 0
          ? ((t[i.path[0]] = t[i.path[0]] || []), t[i.path[0]].push(e(i)))
          : n.push(e(i));
      return { formErrors: n, fieldErrors: t };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  S.create = (e) => new S(e);
  const D = (e, t) => {
    let n;
    switch (e.code) {
      case _.invalid_type:
        n =
          e.received === U.undefined
            ? "Required"
            : `Expected ${e.expected}, received ${e.received}`;
        break;
      case _.invalid_literal:
        n = `Invalid literal value, expected ${JSON.stringify(
          e.expected,
          F.jsonStringifyReplacer
        )}`;
        break;
      case _.unrecognized_keys:
        n = `Unrecognized key(s) in object: ${F.joinValues(e.keys, ", ")}`;
        break;
      case _.invalid_union:
        n = "Invalid input";
        break;
      case _.invalid_union_discriminator:
        n = `Invalid discriminator value. Expected ${F.joinValues(e.options)}`;
        break;
      case _.invalid_enum_value:
        n = `Invalid enum value. Expected ${F.joinValues(
          e.options
        )}, received '${e.received}'`;
        break;
      case _.invalid_arguments:
        n = "Invalid function arguments";
        break;
      case _.invalid_return_type:
        n = "Invalid function return type";
        break;
      case _.invalid_date:
        n = "Invalid date";
        break;
      case _.invalid_string:
        "object" == typeof e.validation
          ? "includes" in e.validation
            ? ((n = `Invalid input: must include "${e.validation.includes}"`),
              "number" == typeof e.validation.position &&
                (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
            : "startsWith" in e.validation
            ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
            : "endsWith" in e.validation
            ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
            : F.assertNever(e.validation)
          : (n =
              "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid");
        break;
      case _.too_small:
        n =
          "array" === e.type
            ? `Array must contain ${
                e.exact ? "exactly" : e.inclusive ? "at least" : "more than"
              } ${e.minimum} element(s)`
            : "string" === e.type
            ? `String must contain ${
                e.exact ? "exactly" : e.inclusive ? "at least" : "over"
              } ${e.minimum} character(s)`
            : "number" === e.type
            ? `Number must be ${
                e.exact
                  ? "exactly equal to "
                  : e.inclusive
                  ? "greater than or equal to "
                  : "greater than "
              }${e.minimum}`
            : "date" === e.type
            ? `Date must be ${
                e.exact
                  ? "exactly equal to "
                  : e.inclusive
                  ? "greater than or equal to "
                  : "greater than "
              }${new Date(Number(e.minimum))}`
            : "Invalid input";
        break;
      case _.too_big:
        n =
          "array" === e.type
            ? `Array must contain ${
                e.exact ? "exactly" : e.inclusive ? "at most" : "less than"
              } ${e.maximum} element(s)`
            : "string" === e.type
            ? `String must contain ${
                e.exact ? "exactly" : e.inclusive ? "at most" : "under"
              } ${e.maximum} character(s)`
            : "number" === e.type
            ? `Number must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "less than or equal to"
                  : "less than"
              } ${e.maximum}`
            : "bigint" === e.type
            ? `BigInt must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "less than or equal to"
                  : "less than"
              } ${e.maximum}`
            : "date" === e.type
            ? `Date must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "smaller than or equal to"
                  : "smaller than"
              } ${new Date(Number(e.maximum))}`
            : "Invalid input";
        break;
      case _.custom:
        n = "Invalid input";
        break;
      case _.invalid_intersection_types:
        n = "Intersection results could not be merged";
        break;
      case _.not_multiple_of:
        n = `Number must be a multiple of ${e.multipleOf}`;
        break;
      case _.not_finite:
        n = "Number must be finite";
        break;
      default:
        (n = t.defaultError), F.assertNever(e);
    }
    return { message: n };
  };
  let Y = D;
  function T(e, t) {
    const n = ((e) => {
      const { data: t, path: n, errorMaps: i, issueData: a } = e,
        s = [...n, ...(a.path || [])],
        r = { ...a, path: s };
      let o = "";
      const c = i
        .filter((e) => !!e)
        .slice()
        .reverse();
      for (const e of c) o = e(r, { data: t, defaultError: o }).message;
      return { ...a, path: s, message: a.message || o };
    })({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, Y, D].filter(
        (e) => !!e
      ),
    });
    e.common.issues.push(n);
  }
  class V {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      "valid" === this.value && (this.value = "dirty");
    }
    abort() {
      "aborted" !== this.value && (this.value = "aborted");
    }
    static mergeArray(e, t) {
      const n = [];
      for (const i of t) {
        if ("aborted" === i.status) return H;
        "dirty" === i.status && e.dirty(), n.push(i.value);
      }
      return { status: e.value, value: n };
    }
    static async mergeObjectAsync(e, t) {
      const n = [];
      for (const e of t) n.push({ key: await e.key, value: await e.value });
      return V.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, t) {
      const n = {};
      for (const i of t) {
        const { key: t, value: a } = i;
        if ("aborted" === t.status) return H;
        if ("aborted" === a.status) return H;
        "dirty" === t.status && e.dirty(),
          "dirty" === a.status && e.dirty(),
          "__proto__" === t.value ||
            (void 0 === a.value && !i.alwaysSet) ||
            (n[t.value] = a.value);
      }
      return { status: e.value, value: n };
    }
  }
  const H = Object.freeze({ status: "aborted" }),
    J = (e) => ({ status: "valid", value: e }),
    M = (e) => "aborted" === e.status,
    j = (e) => "dirty" === e.status,
    z = (e) => "valid" === e.status,
    P = (e) => "undefined" != typeof Promise && e instanceof Promise;
  var $;
  !(function (e) {
    (e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
      (e.toString = (e) =>
        "string" == typeof e ? e : null == e ? void 0 : e.message);
  })($ || ($ = {}));
  class q {
    constructor(e, t, n, i) {
      (this._cachedPath = []),
        (this.parent = e),
        (this.data = t),
        (this._path = n),
        (this._key = i);
    }
    get path() {
      return (
        this._cachedPath.length ||
          (this._key instanceof Array
            ? this._cachedPath.push(...this._path, ...this._key)
            : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath
      );
    }
  }
  const K = (e, t) => {
    if (z(t)) return { success: !0, data: t.value };
    if (!e.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        const t = new S(e.common.issues);
        return (this._error = t), this._error;
      },
    };
  };
  function ee(e) {
    if (!e) return {};
    const {
      errorMap: t,
      invalid_type_error: n,
      required_error: i,
      description: a,
    } = e;
    if (t && (n || i))
      throw new Error(
        'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
      );
    return t
      ? { errorMap: t, description: a }
      : {
          errorMap: (e, t) =>
            "invalid_type" !== e.code
              ? { message: t.defaultError }
              : void 0 === t.data
              ? { message: null != i ? i : t.defaultError }
              : { message: null != n ? n : t.defaultError },
          description: a,
        };
  }
  class te {
    constructor(e) {
      (this.spa = this.safeParseAsync),
        (this._def = e),
        (this.parse = this.parse.bind(this)),
        (this.safeParse = this.safeParse.bind(this)),
        (this.parseAsync = this.parseAsync.bind(this)),
        (this.safeParseAsync = this.safeParseAsync.bind(this)),
        (this.spa = this.spa.bind(this)),
        (this.refine = this.refine.bind(this)),
        (this.refinement = this.refinement.bind(this)),
        (this.superRefine = this.superRefine.bind(this)),
        (this.optional = this.optional.bind(this)),
        (this.nullable = this.nullable.bind(this)),
        (this.nullish = this.nullish.bind(this)),
        (this.array = this.array.bind(this)),
        (this.promise = this.promise.bind(this)),
        (this.or = this.or.bind(this)),
        (this.and = this.and.bind(this)),
        (this.transform = this.transform.bind(this)),
        (this.brand = this.brand.bind(this)),
        (this.default = this.default.bind(this)),
        (this.catch = this.catch.bind(this)),
        (this.describe = this.describe.bind(this)),
        (this.pipe = this.pipe.bind(this)),
        (this.readonly = this.readonly.bind(this)),
        (this.isNullable = this.isNullable.bind(this)),
        (this.isOptional = this.isOptional.bind(this));
    }
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return O(e.data);
    }
    _getOrReturnCtx(e, t) {
      return (
        t || {
          common: e.parent.common,
          data: e.data,
          parsedType: O(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        }
      );
    }
    _processInputParams(e) {
      return {
        status: new V(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: O(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        },
      };
    }
    _parseSync(e) {
      const t = this._parse(e);
      if (P(t)) throw new Error("Synchronous parse encountered promise.");
      return t;
    }
    _parseAsync(e) {
      const t = this._parse(e);
      return Promise.resolve(t);
    }
    parse(e, t) {
      const n = this.safeParse(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    safeParse(e, t) {
      var n;
      const i = {
          common: {
            issues: [],
            async:
              null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
            contextualErrorMap: null == t ? void 0 : t.errorMap,
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: O(e),
        },
        a = this._parseSync({ data: e, path: i.path, parent: i });
      return K(i, a);
    }
    async parseAsync(e, t) {
      const n = await this.safeParseAsync(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    async safeParseAsync(e, t) {
      const n = {
          common: {
            issues: [],
            contextualErrorMap: null == t ? void 0 : t.errorMap,
            async: !0,
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: O(e),
        },
        i = this._parse({ data: e, path: n.path, parent: n }),
        a = await (P(i) ? i : Promise.resolve(i));
      return K(n, a);
    }
    refine(e, t) {
      const n = (e) =>
        "string" == typeof t || void 0 === t
          ? { message: t }
          : "function" == typeof t
          ? t(e)
          : t;
      return this._refinement((t, i) => {
        const a = e(t),
          s = () => i.addIssue({ code: _.custom, ...n(t) });
        return "undefined" != typeof Promise && a instanceof Promise
          ? a.then((e) => !!e || (s(), !1))
          : !!a || (s(), !1);
      });
    }
    refinement(e, t) {
      return this._refinement(
        (n, i) =>
          !!e(n) || (i.addIssue("function" == typeof t ? t(n, i) : t), !1)
      );
    }
    _refinement(e) {
      return new Oe({
        schema: this,
        typeName: Me.ZodEffects,
        effect: { type: "refinement", refinement: e },
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    optional() {
      return _e.create(this, this._def);
    }
    nullable() {
      return Se.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return Ae.create(this, this._def);
    }
    promise() {
      return Ue.create(this, this._def);
    }
    or(e) {
      return Ze.create([this, e], this._def);
    }
    and(e) {
      return we.create(this, e, this._def);
    }
    transform(e) {
      return new Oe({
        ...ee(this._def),
        schema: this,
        typeName: Me.ZodEffects,
        effect: { type: "transform", transform: e },
      });
    }
    default(e) {
      const t = "function" == typeof e ? e : () => e;
      return new De({
        ...ee(this._def),
        innerType: this,
        defaultValue: t,
        typeName: Me.ZodDefault,
      });
    }
    brand() {
      return new Ve({ typeName: Me.ZodBranded, type: this, ...ee(this._def) });
    }
    catch(e) {
      const t = "function" == typeof e ? e : () => e;
      return new Ye({
        ...ee(this._def),
        innerType: this,
        catchValue: t,
        typeName: Me.ZodCatch,
      });
    }
    describe(e) {
      return new (0, this.constructor)({ ...this._def, description: e });
    }
    pipe(e) {
      return He.create(this, e);
    }
    readonly() {
      return Je.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  const ne = /^c[^\s-]{8,}$/i,
    ie = /^[a-z][a-z0-9]*$/,
    ae = /^[0-9A-HJKMNP-TV-Z]{26}$/,
    se =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    re =
      /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  let oe;
  const ce =
      /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,
    le =
      /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
  class de extends te {
    _parse(e) {
      if (
        (this._def.coerce && (e.data = String(e.data)),
        this._getType(e) !== U.string)
      ) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.string,
            received: t.parsedType,
          }),
          H
        );
      }
      const t = new V();
      let n;
      for (const r of this._def.checks)
        if ("min" === r.kind)
          e.data.length < r.value &&
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              code: _.too_small,
              minimum: r.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: r.message,
            }),
            t.dirty());
        else if ("max" === r.kind)
          e.data.length > r.value &&
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              code: _.too_big,
              maximum: r.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: r.message,
            }),
            t.dirty());
        else if ("length" === r.kind) {
          const i = e.data.length > r.value,
            a = e.data.length < r.value;
          (i || a) &&
            ((n = this._getOrReturnCtx(e, n)),
            i
              ? T(n, {
                  code: _.too_big,
                  maximum: r.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: r.message,
                })
              : a &&
                T(n, {
                  code: _.too_small,
                  minimum: r.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: r.message,
                }),
            t.dirty());
        } else if ("email" === r.kind)
          re.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              validation: "email",
              code: _.invalid_string,
              message: r.message,
            }),
            t.dirty());
        else if ("emoji" === r.kind)
          oe ||
            (oe = new RegExp(
              "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
              "u"
            )),
            oe.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              T(n, {
                validation: "emoji",
                code: _.invalid_string,
                message: r.message,
              }),
              t.dirty());
        else if ("uuid" === r.kind)
          se.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              validation: "uuid",
              code: _.invalid_string,
              message: r.message,
            }),
            t.dirty());
        else if ("cuid" === r.kind)
          ne.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              validation: "cuid",
              code: _.invalid_string,
              message: r.message,
            }),
            t.dirty());
        else if ("cuid2" === r.kind)
          ie.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              validation: "cuid2",
              code: _.invalid_string,
              message: r.message,
            }),
            t.dirty());
        else if ("ulid" === r.kind)
          ae.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              validation: "ulid",
              code: _.invalid_string,
              message: r.message,
            }),
            t.dirty());
        else if ("url" === r.kind)
          try {
            new URL(e.data);
          } catch (i) {
            (n = this._getOrReturnCtx(e, n)),
              T(n, {
                validation: "url",
                code: _.invalid_string,
                message: r.message,
              }),
              t.dirty();
          }
        else
          "regex" === r.kind
            ? ((r.regex.lastIndex = 0),
              r.regex.test(e.data) ||
                ((n = this._getOrReturnCtx(e, n)),
                T(n, {
                  validation: "regex",
                  code: _.invalid_string,
                  message: r.message,
                }),
                t.dirty()))
            : "trim" === r.kind
            ? (e.data = e.data.trim())
            : "includes" === r.kind
            ? e.data.includes(r.value, r.position) ||
              ((n = this._getOrReturnCtx(e, n)),
              T(n, {
                code: _.invalid_string,
                validation: { includes: r.value, position: r.position },
                message: r.message,
              }),
              t.dirty())
            : "toLowerCase" === r.kind
            ? (e.data = e.data.toLowerCase())
            : "toUpperCase" === r.kind
            ? (e.data = e.data.toUpperCase())
            : "startsWith" === r.kind
            ? e.data.startsWith(r.value) ||
              ((n = this._getOrReturnCtx(e, n)),
              T(n, {
                code: _.invalid_string,
                validation: { startsWith: r.value },
                message: r.message,
              }),
              t.dirty())
            : "endsWith" === r.kind
            ? e.data.endsWith(r.value) ||
              ((n = this._getOrReturnCtx(e, n)),
              T(n, {
                code: _.invalid_string,
                validation: { endsWith: r.value },
                message: r.message,
              }),
              t.dirty())
            : "datetime" === r.kind
            ? ((s = r).precision
                ? s.offset
                  ? new RegExp(
                      `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`
                    )
                  : new RegExp(
                      `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}Z$`
                    )
                : 0 === s.precision
                ? s.offset
                  ? new RegExp(
                      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"
                    )
                  : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")
                : s.offset
                ? new RegExp(
                    "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"
                  )
                : new RegExp(
                    "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$"
                  )
              ).test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              T(n, {
                code: _.invalid_string,
                validation: "datetime",
                message: r.message,
              }),
              t.dirty())
            : "ip" === r.kind
            ? ((i = e.data),
              (("v4" !== (a = r.version) && a) || !ce.test(i)) &&
                (("v6" !== a && a) || !le.test(i)) &&
                ((n = this._getOrReturnCtx(e, n)),
                T(n, {
                  validation: "ip",
                  code: _.invalid_string,
                  message: r.message,
                }),
                t.dirty()))
            : F.assertNever(r);
      var i, a, s;
      return { status: t.value, value: e.data };
    }
    _regex(e, t, n) {
      return this.refinement((t) => e.test(t), {
        validation: t,
        code: _.invalid_string,
        ...$.errToObj(n),
      });
    }
    _addCheck(e) {
      return new de({ ...this._def, checks: [...this._def.checks, e] });
    }
    email(e) {
      return this._addCheck({ kind: "email", ...$.errToObj(e) });
    }
    url(e) {
      return this._addCheck({ kind: "url", ...$.errToObj(e) });
    }
    emoji(e) {
      return this._addCheck({ kind: "emoji", ...$.errToObj(e) });
    }
    uuid(e) {
      return this._addCheck({ kind: "uuid", ...$.errToObj(e) });
    }
    cuid(e) {
      return this._addCheck({ kind: "cuid", ...$.errToObj(e) });
    }
    cuid2(e) {
      return this._addCheck({ kind: "cuid2", ...$.errToObj(e) });
    }
    ulid(e) {
      return this._addCheck({ kind: "ulid", ...$.errToObj(e) });
    }
    ip(e) {
      return this._addCheck({ kind: "ip", ...$.errToObj(e) });
    }
    datetime(e) {
      var t;
      return "string" == typeof e
        ? this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            message: e,
          })
        : this._addCheck({
            kind: "datetime",
            precision:
              void 0 === (null == e ? void 0 : e.precision)
                ? null
                : null == e
                ? void 0
                : e.precision,
            offset:
              null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
            ...$.errToObj(null == e ? void 0 : e.message),
          });
    }
    regex(e, t) {
      return this._addCheck({ kind: "regex", regex: e, ...$.errToObj(t) });
    }
    includes(e, t) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: null == t ? void 0 : t.position,
        ...$.errToObj(null == t ? void 0 : t.message),
      });
    }
    startsWith(e, t) {
      return this._addCheck({ kind: "startsWith", value: e, ...$.errToObj(t) });
    }
    endsWith(e, t) {
      return this._addCheck({ kind: "endsWith", value: e, ...$.errToObj(t) });
    }
    min(e, t) {
      return this._addCheck({ kind: "min", value: e, ...$.errToObj(t) });
    }
    max(e, t) {
      return this._addCheck({ kind: "max", value: e, ...$.errToObj(t) });
    }
    length(e, t) {
      return this._addCheck({ kind: "length", value: e, ...$.errToObj(t) });
    }
    nonempty(e) {
      return this.min(1, $.errToObj(e));
    }
    trim() {
      return new de({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }],
      });
    }
    toLowerCase() {
      return new de({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }],
      });
    }
    toUpperCase() {
      return new de({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }],
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((e) => "datetime" === e.kind);
    }
    get isEmail() {
      return !!this._def.checks.find((e) => "email" === e.kind);
    }
    get isURL() {
      return !!this._def.checks.find((e) => "url" === e.kind);
    }
    get isEmoji() {
      return !!this._def.checks.find((e) => "emoji" === e.kind);
    }
    get isUUID() {
      return !!this._def.checks.find((e) => "uuid" === e.kind);
    }
    get isCUID() {
      return !!this._def.checks.find((e) => "cuid" === e.kind);
    }
    get isCUID2() {
      return !!this._def.checks.find((e) => "cuid2" === e.kind);
    }
    get isULID() {
      return !!this._def.checks.find((e) => "ulid" === e.kind);
    }
    get isIP() {
      return !!this._def.checks.find((e) => "ip" === e.kind);
    }
    get minLength() {
      let e = null;
      for (const t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxLength() {
      let e = null;
      for (const t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
  }
  function ue(e, t) {
    const n = (e.toString().split(".")[1] || "").length,
      i = (t.toString().split(".")[1] || "").length,
      a = n > i ? n : i;
    return (
      (parseInt(e.toFixed(a).replace(".", "")) %
        parseInt(t.toFixed(a).replace(".", ""))) /
      Math.pow(10, a)
    );
  }
  de.create = (e) => {
    var t;
    return new de({
      checks: [],
      typeName: Me.ZodString,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...ee(e),
    });
  };
  class ge extends te {
    constructor() {
      super(...arguments),
        (this.min = this.gte),
        (this.max = this.lte),
        (this.step = this.multipleOf);
    }
    _parse(e) {
      if (
        (this._def.coerce && (e.data = Number(e.data)),
        this._getType(e) !== U.number)
      ) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.number,
            received: t.parsedType,
          }),
          H
        );
      }
      let t;
      const n = new V();
      for (const i of this._def.checks)
        "int" === i.kind
          ? F.isInteger(e.data) ||
            ((t = this._getOrReturnCtx(e, t)),
            T(t, {
              code: _.invalid_type,
              expected: "integer",
              received: "float",
              message: i.message,
            }),
            n.dirty())
          : "min" === i.kind
          ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            T(t, {
              code: _.too_small,
              minimum: i.value,
              type: "number",
              inclusive: i.inclusive,
              exact: !1,
              message: i.message,
            }),
            n.dirty())
          : "max" === i.kind
          ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            T(t, {
              code: _.too_big,
              maximum: i.value,
              type: "number",
              inclusive: i.inclusive,
              exact: !1,
              message: i.message,
            }),
            n.dirty())
          : "multipleOf" === i.kind
          ? 0 !== ue(e.data, i.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            T(t, {
              code: _.not_multiple_of,
              multipleOf: i.value,
              message: i.message,
            }),
            n.dirty())
          : "finite" === i.kind
          ? Number.isFinite(e.data) ||
            ((t = this._getOrReturnCtx(e, t)),
            T(t, { code: _.not_finite, message: i.message }),
            n.dirty())
          : F.assertNever(i);
      return { status: n.value, value: e.data };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, $.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, $.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, $.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, $.toString(t));
    }
    setLimit(e, t, n, i) {
      return new ge({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: e, value: t, inclusive: n, message: $.toString(i) },
        ],
      });
    }
    _addCheck(e) {
      return new ge({ ...this._def, checks: [...this._def.checks, e] });
    }
    int(e) {
      return this._addCheck({ kind: "int", message: $.toString(e) });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: $.toString(e),
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: $.toString(e),
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: $.toString(e),
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: $.toString(e),
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: $.toString(t),
      });
    }
    finite(e) {
      return this._addCheck({ kind: "finite", message: $.toString(e) });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: $.toString(e),
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: $.toString(e),
      });
    }
    get minValue() {
      let e = null;
      for (const t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (const t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
    get isInt() {
      return !!this._def.checks.find(
        (e) =>
          "int" === e.kind || ("multipleOf" === e.kind && F.isInteger(e.value))
      );
    }
    get isFinite() {
      let e = null,
        t = null;
      for (const n of this._def.checks) {
        if ("finite" === n.kind || "int" === n.kind || "multipleOf" === n.kind)
          return !0;
        "min" === n.kind
          ? (null === t || n.value > t) && (t = n.value)
          : "max" === n.kind && (null === e || n.value < e) && (e = n.value);
      }
      return Number.isFinite(t) && Number.isFinite(e);
    }
  }
  ge.create = (e) =>
    new ge({
      checks: [],
      typeName: Me.ZodNumber,
      coerce: (null == e ? void 0 : e.coerce) || !1,
      ...ee(e),
    });
  class be extends te {
    constructor() {
      super(...arguments), (this.min = this.gte), (this.max = this.lte);
    }
    _parse(e) {
      if (
        (this._def.coerce && (e.data = BigInt(e.data)),
        this._getType(e) !== U.bigint)
      ) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.bigint,
            received: t.parsedType,
          }),
          H
        );
      }
      let t;
      const n = new V();
      for (const i of this._def.checks)
        "min" === i.kind
          ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            T(t, {
              code: _.too_small,
              type: "bigint",
              minimum: i.value,
              inclusive: i.inclusive,
              message: i.message,
            }),
            n.dirty())
          : "max" === i.kind
          ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            T(t, {
              code: _.too_big,
              type: "bigint",
              maximum: i.value,
              inclusive: i.inclusive,
              message: i.message,
            }),
            n.dirty())
          : "multipleOf" === i.kind
          ? e.data % i.value !== BigInt(0) &&
            ((t = this._getOrReturnCtx(e, t)),
            T(t, {
              code: _.not_multiple_of,
              multipleOf: i.value,
              message: i.message,
            }),
            n.dirty())
          : F.assertNever(i);
      return { status: n.value, value: e.data };
    }
    gte(e, t) {
      return this.setLimit("min", e, !0, $.toString(t));
    }
    gt(e, t) {
      return this.setLimit("min", e, !1, $.toString(t));
    }
    lte(e, t) {
      return this.setLimit("max", e, !0, $.toString(t));
    }
    lt(e, t) {
      return this.setLimit("max", e, !1, $.toString(t));
    }
    setLimit(e, t, n, i) {
      return new be({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: e, value: t, inclusive: n, message: $.toString(i) },
        ],
      });
    }
    _addCheck(e) {
      return new be({ ...this._def, checks: [...this._def.checks, e] });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: $.toString(e),
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: $.toString(e),
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: $.toString(e),
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: $.toString(e),
      });
    }
    multipleOf(e, t) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: $.toString(t),
      });
    }
    get minValue() {
      let e = null;
      for (const t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (const t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return e;
    }
  }
  be.create = (e) => {
    var t;
    return new be({
      checks: [],
      typeName: Me.ZodBigInt,
      coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
      ...ee(e),
    });
  };
  class he extends te {
    _parse(e) {
      if (
        (this._def.coerce && (e.data = Boolean(e.data)),
        this._getType(e) !== U.boolean)
      ) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.boolean,
            received: t.parsedType,
          }),
          H
        );
      }
      return J(e.data);
    }
  }
  he.create = (e) =>
    new he({
      typeName: Me.ZodBoolean,
      coerce: (null == e ? void 0 : e.coerce) || !1,
      ...ee(e),
    });
  class pe extends te {
    _parse(e) {
      if (
        (this._def.coerce && (e.data = new Date(e.data)),
        this._getType(e) !== U.date)
      ) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.date,
            received: t.parsedType,
          }),
          H
        );
      }
      if (isNaN(e.data.getTime()))
        return T(this._getOrReturnCtx(e), { code: _.invalid_date }), H;
      const t = new V();
      let n;
      for (const i of this._def.checks)
        "min" === i.kind
          ? e.data.getTime() < i.value &&
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              code: _.too_small,
              message: i.message,
              inclusive: !0,
              exact: !1,
              minimum: i.value,
              type: "date",
            }),
            t.dirty())
          : "max" === i.kind
          ? e.data.getTime() > i.value &&
            ((n = this._getOrReturnCtx(e, n)),
            T(n, {
              code: _.too_big,
              message: i.message,
              inclusive: !0,
              exact: !1,
              maximum: i.value,
              type: "date",
            }),
            t.dirty())
          : F.assertNever(i);
      return { status: t.value, value: new Date(e.data.getTime()) };
    }
    _addCheck(e) {
      return new pe({ ...this._def, checks: [...this._def.checks, e] });
    }
    min(e, t) {
      return this._addCheck({
        kind: "min",
        value: e.getTime(),
        message: $.toString(t),
      });
    }
    max(e, t) {
      return this._addCheck({
        kind: "max",
        value: e.getTime(),
        message: $.toString(t),
      });
    }
    get minDate() {
      let e = null;
      for (const t of this._def.checks)
        "min" === t.kind && (null === e || t.value > e) && (e = t.value);
      return null != e ? new Date(e) : null;
    }
    get maxDate() {
      let e = null;
      for (const t of this._def.checks)
        "max" === t.kind && (null === e || t.value < e) && (e = t.value);
      return null != e ? new Date(e) : null;
    }
  }
  pe.create = (e) =>
    new pe({
      checks: [],
      coerce: (null == e ? void 0 : e.coerce) || !1,
      typeName: Me.ZodDate,
      ...ee(e),
    });
  class me extends te {
    _parse(e) {
      if (this._getType(e) !== U.symbol) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.symbol,
            received: t.parsedType,
          }),
          H
        );
      }
      return J(e.data);
    }
  }
  me.create = (e) => new me({ typeName: Me.ZodSymbol, ...ee(e) });
  class Ie extends te {
    _parse(e) {
      if (this._getType(e) !== U.undefined) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.undefined,
            received: t.parsedType,
          }),
          H
        );
      }
      return J(e.data);
    }
  }
  Ie.create = (e) => new Ie({ typeName: Me.ZodUndefined, ...ee(e) });
  class fe extends te {
    _parse(e) {
      if (this._getType(e) !== U.null) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.null,
            received: t.parsedType,
          }),
          H
        );
      }
      return J(e.data);
    }
  }
  fe.create = (e) => new fe({ typeName: Me.ZodNull, ...ee(e) });
  class Ce extends te {
    constructor() {
      super(...arguments), (this._any = !0);
    }
    _parse(e) {
      return J(e.data);
    }
  }
  Ce.create = (e) => new Ce({ typeName: Me.ZodAny, ...ee(e) });
  class ye extends te {
    constructor() {
      super(...arguments), (this._unknown = !0);
    }
    _parse(e) {
      return J(e.data);
    }
  }
  ye.create = (e) => new ye({ typeName: Me.ZodUnknown, ...ee(e) });
  class xe extends te {
    _parse(e) {
      const t = this._getOrReturnCtx(e);
      return (
        T(t, {
          code: _.invalid_type,
          expected: U.never,
          received: t.parsedType,
        }),
        H
      );
    }
  }
  xe.create = (e) => new xe({ typeName: Me.ZodNever, ...ee(e) });
  class Ge extends te {
    _parse(e) {
      if (this._getType(e) !== U.undefined) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.void,
            received: t.parsedType,
          }),
          H
        );
      }
      return J(e.data);
    }
  }
  Ge.create = (e) => new Ge({ typeName: Me.ZodVoid, ...ee(e) });
  class Ae extends te {
    _parse(e) {
      const { ctx: t, status: n } = this._processInputParams(e),
        i = this._def;
      if (t.parsedType !== U.array)
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.array,
            received: t.parsedType,
          }),
          H
        );
      if (null !== i.exactLength) {
        const e = t.data.length > i.exactLength.value,
          a = t.data.length < i.exactLength.value;
        (e || a) &&
          (T(t, {
            code: e ? _.too_big : _.too_small,
            minimum: a ? i.exactLength.value : void 0,
            maximum: e ? i.exactLength.value : void 0,
            type: "array",
            inclusive: !0,
            exact: !0,
            message: i.exactLength.message,
          }),
          n.dirty());
      }
      if (
        (null !== i.minLength &&
          t.data.length < i.minLength.value &&
          (T(t, {
            code: _.too_small,
            minimum: i.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: i.minLength.message,
          }),
          n.dirty()),
        null !== i.maxLength &&
          t.data.length > i.maxLength.value &&
          (T(t, {
            code: _.too_big,
            maximum: i.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: i.maxLength.message,
          }),
          n.dirty()),
        t.common.async)
      )
        return Promise.all(
          [...t.data].map((e, n) => i.type._parseAsync(new q(t, e, t.path, n)))
        ).then((e) => V.mergeArray(n, e));
      const a = [...t.data].map((e, n) =>
        i.type._parseSync(new q(t, e, t.path, n))
      );
      return V.mergeArray(n, a);
    }
    get element() {
      return this._def.type;
    }
    min(e, t) {
      return new Ae({
        ...this._def,
        minLength: { value: e, message: $.toString(t) },
      });
    }
    max(e, t) {
      return new Ae({
        ...this._def,
        maxLength: { value: e, message: $.toString(t) },
      });
    }
    length(e, t) {
      return new Ae({
        ...this._def,
        exactLength: { value: e, message: $.toString(t) },
      });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  }
  function ve(e) {
    if (e instanceof Be) {
      const t = {};
      for (const n in e.shape) {
        const i = e.shape[n];
        t[n] = _e.create(ve(i));
      }
      return new Be({ ...e._def, shape: () => t });
    }
    return e instanceof Ae
      ? new Ae({ ...e._def, type: ve(e.element) })
      : e instanceof _e
      ? _e.create(ve(e.unwrap()))
      : e instanceof Se
      ? Se.create(ve(e.unwrap()))
      : e instanceof ke
      ? ke.create(e.items.map((e) => ve(e)))
      : e;
  }
  Ae.create = (e, t) =>
    new Ae({
      type: e,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: Me.ZodArray,
      ...ee(t),
    });
  class Be extends te {
    constructor() {
      super(...arguments),
        (this._cached = null),
        (this.nonstrict = this.passthrough),
        (this.augment = this.extend);
    }
    _getCached() {
      if (null !== this._cached) return this._cached;
      const e = this._def.shape(),
        t = F.objectKeys(e);
      return (this._cached = { shape: e, keys: t });
    }
    _parse(e) {
      if (this._getType(e) !== U.object) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.object,
            received: t.parsedType,
          }),
          H
        );
      }
      const { status: t, ctx: n } = this._processInputParams(e),
        { shape: i, keys: a } = this._getCached(),
        s = [];
      if (
        !(this._def.catchall instanceof xe && "strip" === this._def.unknownKeys)
      )
        for (const e in n.data) a.includes(e) || s.push(e);
      const r = [];
      for (const e of a) {
        const t = i[e],
          a = n.data[e];
        r.push({
          key: { status: "valid", value: e },
          value: t._parse(new q(n, a, n.path, e)),
          alwaysSet: e in n.data,
        });
      }
      if (this._def.catchall instanceof xe) {
        const e = this._def.unknownKeys;
        if ("passthrough" === e)
          for (const e of s)
            r.push({
              key: { status: "valid", value: e },
              value: { status: "valid", value: n.data[e] },
            });
        else if ("strict" === e)
          s.length > 0 &&
            (T(n, { code: _.unrecognized_keys, keys: s }), t.dirty());
        else if ("strip" !== e)
          throw new Error(
            "Internal ZodObject error: invalid unknownKeys value."
          );
      } else {
        const e = this._def.catchall;
        for (const t of s) {
          const i = n.data[t];
          r.push({
            key: { status: "valid", value: t },
            value: e._parse(new q(n, i, n.path, t)),
            alwaysSet: t in n.data,
          });
        }
      }
      return n.common.async
        ? Promise.resolve()
            .then(async () => {
              const e = [];
              for (const t of r) {
                const n = await t.key;
                e.push({
                  key: n,
                  value: await t.value,
                  alwaysSet: t.alwaysSet,
                });
              }
              return e;
            })
            .then((e) => V.mergeObjectSync(t, e))
        : V.mergeObjectSync(t, r);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return (
        $.errToObj,
        new Be({
          ...this._def,
          unknownKeys: "strict",
          ...(void 0 !== e
            ? {
                errorMap: (t, n) => {
                  var i, a, s, r;
                  const o =
                    null !==
                      (s =
                        null === (a = (i = this._def).errorMap) || void 0 === a
                          ? void 0
                          : a.call(i, t, n).message) && void 0 !== s
                      ? s
                      : n.defaultError;
                  return "unrecognized_keys" === t.code
                    ? {
                        message:
                          null !== (r = $.errToObj(e).message) && void 0 !== r
                            ? r
                            : o,
                      }
                    : { message: o };
                },
              }
            : {}),
        })
      );
    }
    strip() {
      return new Be({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
      return new Be({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(e) {
      return new Be({
        ...this._def,
        shape: () => ({ ...this._def.shape(), ...e }),
      });
    }
    merge(e) {
      return new Be({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
        typeName: Me.ZodObject,
      });
    }
    setKey(e, t) {
      return this.augment({ [e]: t });
    }
    catchall(e) {
      return new Be({ ...this._def, catchall: e });
    }
    pick(e) {
      const t = {};
      return (
        F.objectKeys(e).forEach((n) => {
          e[n] && this.shape[n] && (t[n] = this.shape[n]);
        }),
        new Be({ ...this._def, shape: () => t })
      );
    }
    omit(e) {
      const t = {};
      return (
        F.objectKeys(this.shape).forEach((n) => {
          e[n] || (t[n] = this.shape[n]);
        }),
        new Be({ ...this._def, shape: () => t })
      );
    }
    deepPartial() {
      return ve(this);
    }
    partial(e) {
      const t = {};
      return (
        F.objectKeys(this.shape).forEach((n) => {
          const i = this.shape[n];
          e && !e[n] ? (t[n] = i) : (t[n] = i.optional());
        }),
        new Be({ ...this._def, shape: () => t })
      );
    }
    required(e) {
      const t = {};
      return (
        F.objectKeys(this.shape).forEach((n) => {
          if (e && !e[n]) t[n] = this.shape[n];
          else {
            let e = this.shape[n];
            for (; e instanceof _e; ) e = e._def.innerType;
            t[n] = e;
          }
        }),
        new Be({ ...this._def, shape: () => t })
      );
    }
    keyof() {
      return Le(F.objectKeys(this.shape));
    }
  }
  (Be.create = (e, t) =>
    new Be({
      shape: () => e,
      unknownKeys: "strip",
      catchall: xe.create(),
      typeName: Me.ZodObject,
      ...ee(t),
    })),
    (Be.strictCreate = (e, t) =>
      new Be({
        shape: () => e,
        unknownKeys: "strict",
        catchall: xe.create(),
        typeName: Me.ZodObject,
        ...ee(t),
      })),
    (Be.lazycreate = (e, t) =>
      new Be({
        shape: e,
        unknownKeys: "strip",
        catchall: xe.create(),
        typeName: Me.ZodObject,
        ...ee(t),
      }));
  class Ze extends te {
    _parse(e) {
      const { ctx: t } = this._processInputParams(e),
        n = this._def.options;
      if (t.common.async)
        return Promise.all(
          n.map(async (e) => {
            const n = {
              ...t,
              common: { ...t.common, issues: [] },
              parent: null,
            };
            return {
              result: await e._parseAsync({
                data: t.data,
                path: t.path,
                parent: n,
              }),
              ctx: n,
            };
          })
        ).then(function (e) {
          for (const t of e) if ("valid" === t.result.status) return t.result;
          for (const n of e)
            if ("dirty" === n.result.status)
              return t.common.issues.push(...n.ctx.common.issues), n.result;
          const n = e.map((e) => new S(e.ctx.common.issues));
          return T(t, { code: _.invalid_union, unionErrors: n }), H;
        });
      {
        let e;
        const i = [];
        for (const a of n) {
          const n = { ...t, common: { ...t.common, issues: [] }, parent: null },
            s = a._parseSync({ data: t.data, path: t.path, parent: n });
          if ("valid" === s.status) return s;
          "dirty" !== s.status || e || (e = { result: s, ctx: n }),
            n.common.issues.length && i.push(n.common.issues);
        }
        if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
        const a = i.map((e) => new S(e));
        return T(t, { code: _.invalid_union, unionErrors: a }), H;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  function Qe(e, t) {
    const n = O(e),
      i = O(t);
    if (e === t) return { valid: !0, data: e };
    if (n === U.object && i === U.object) {
      const n = F.objectKeys(t),
        i = F.objectKeys(e).filter((e) => -1 !== n.indexOf(e)),
        a = { ...e, ...t };
      for (const n of i) {
        const i = Qe(e[n], t[n]);
        if (!i.valid) return { valid: !1 };
        a[n] = i.data;
      }
      return { valid: !0, data: a };
    }
    if (n === U.array && i === U.array) {
      if (e.length !== t.length) return { valid: !1 };
      const n = [];
      for (let i = 0; i < e.length; i++) {
        const a = Qe(e[i], t[i]);
        if (!a.valid) return { valid: !1 };
        n.push(a.data);
      }
      return { valid: !0, data: n };
    }
    return n === U.date && i === U.date && +e == +t
      ? { valid: !0, data: e }
      : { valid: !1 };
  }
  Ze.create = (e, t) => new Ze({ options: e, typeName: Me.ZodUnion, ...ee(t) });
  class we extends te {
    _parse(e) {
      const { status: t, ctx: n } = this._processInputParams(e),
        i = (e, i) => {
          if (M(e) || M(i)) return H;
          const a = Qe(e.value, i.value);
          return a.valid
            ? ((j(e) || j(i)) && t.dirty(), { status: t.value, value: a.data })
            : (T(n, { code: _.invalid_intersection_types }), H);
        };
      return n.common.async
        ? Promise.all([
            this._def.left._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
          ]).then(([e, t]) => i(e, t))
        : i(
            this._def.left._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            })
          );
    }
  }
  we.create = (e, t, n) =>
    new we({ left: e, right: t, typeName: Me.ZodIntersection, ...ee(n) });
  class ke extends te {
    _parse(e) {
      const { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== U.array)
        return (
          T(n, {
            code: _.invalid_type,
            expected: U.array,
            received: n.parsedType,
          }),
          H
        );
      if (n.data.length < this._def.items.length)
        return (
          T(n, {
            code: _.too_small,
            minimum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array",
          }),
          H
        );
      !this._def.rest &&
        n.data.length > this._def.items.length &&
        (T(n, {
          code: _.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        t.dirty());
      const i = [...n.data]
        .map((e, t) => {
          const i = this._def.items[t] || this._def.rest;
          return i ? i._parse(new q(n, e, n.path, t)) : null;
        })
        .filter((e) => !!e);
      return n.common.async
        ? Promise.all(i).then((e) => V.mergeArray(t, e))
        : V.mergeArray(t, i);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new ke({ ...this._def, rest: e });
    }
  }
  ke.create = (e, t) => {
    if (!Array.isArray(e))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new ke({ items: e, typeName: Me.ZodTuple, rest: null, ...ee(t) });
  };
  class Xe extends te {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== U.map)
        return (
          T(n, {
            code: _.invalid_type,
            expected: U.map,
            received: n.parsedType,
          }),
          H
        );
      const i = this._def.keyType,
        a = this._def.valueType,
        s = [...n.data.entries()].map(([e, t], s) => ({
          key: i._parse(new q(n, e, n.path, [s, "key"])),
          value: a._parse(new q(n, t, n.path, [s, "value"])),
        }));
      if (n.common.async) {
        const e = new Map();
        return Promise.resolve().then(async () => {
          for (const n of s) {
            const i = await n.key,
              a = await n.value;
            if ("aborted" === i.status || "aborted" === a.status) return H;
            ("dirty" !== i.status && "dirty" !== a.status) || t.dirty(),
              e.set(i.value, a.value);
          }
          return { status: t.value, value: e };
        });
      }
      {
        const e = new Map();
        for (const n of s) {
          const i = n.key,
            a = n.value;
          if ("aborted" === i.status || "aborted" === a.status) return H;
          ("dirty" !== i.status && "dirty" !== a.status) || t.dirty(),
            e.set(i.value, a.value);
        }
        return { status: t.value, value: e };
      }
    }
  }
  Xe.create = (e, t, n) =>
    new Xe({ valueType: t, keyType: e, typeName: Me.ZodMap, ...ee(n) });
  class Ee extends te {
    _parse(e) {
      const { status: t, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== U.set)
        return (
          T(n, {
            code: _.invalid_type,
            expected: U.set,
            received: n.parsedType,
          }),
          H
        );
      const i = this._def;
      null !== i.minSize &&
        n.data.size < i.minSize.value &&
        (T(n, {
          code: _.too_small,
          minimum: i.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: i.minSize.message,
        }),
        t.dirty()),
        null !== i.maxSize &&
          n.data.size > i.maxSize.value &&
          (T(n, {
            code: _.too_big,
            maximum: i.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: i.maxSize.message,
          }),
          t.dirty());
      const a = this._def.valueType;
      function s(e) {
        const n = new Set();
        for (const i of e) {
          if ("aborted" === i.status) return H;
          "dirty" === i.status && t.dirty(), n.add(i.value);
        }
        return { status: t.value, value: n };
      }
      const r = [...n.data.values()].map((e, t) =>
        a._parse(new q(n, e, n.path, t))
      );
      return n.common.async ? Promise.all(r).then((e) => s(e)) : s(r);
    }
    min(e, t) {
      return new Ee({
        ...this._def,
        minSize: { value: e, message: $.toString(t) },
      });
    }
    max(e, t) {
      return new Ee({
        ...this._def,
        maxSize: { value: e, message: $.toString(t) },
      });
    }
    size(e, t) {
      return this.min(e, t).max(e, t);
    }
    nonempty(e) {
      return this.min(1, e);
    }
  }
  Ee.create = (e, t) =>
    new Ee({
      valueType: e,
      minSize: null,
      maxSize: null,
      typeName: Me.ZodSet,
      ...ee(t),
    });
  class Ne extends te {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      const { ctx: t } = this._processInputParams(e);
      return this._def
        .getter()
        ._parse({ data: t.data, path: t.path, parent: t });
    }
  }
  Ne.create = (e, t) => new Ne({ getter: e, typeName: Me.ZodLazy, ...ee(t) });
  class We extends te {
    _parse(e) {
      if (e.data !== this._def.value) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            received: t.data,
            code: _.invalid_literal,
            expected: this._def.value,
          }),
          H
        );
      }
      return { status: "valid", value: e.data };
    }
    get value() {
      return this._def.value;
    }
  }
  function Le(e, t) {
    return new Fe({ values: e, typeName: Me.ZodEnum, ...ee(t) });
  }
  We.create = (e, t) => new We({ value: e, typeName: Me.ZodLiteral, ...ee(t) });
  class Fe extends te {
    _parse(e) {
      if ("string" != typeof e.data) {
        const t = this._getOrReturnCtx(e),
          n = this._def.values;
        return (
          T(t, {
            expected: F.joinValues(n),
            received: t.parsedType,
            code: _.invalid_type,
          }),
          H
        );
      }
      if (-1 === this._def.values.indexOf(e.data)) {
        const t = this._getOrReturnCtx(e),
          n = this._def.values;
        return (
          T(t, { received: t.data, code: _.invalid_enum_value, options: n }), H
        );
      }
      return J(e.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const e = {};
      for (const t of this._def.values) e[t] = t;
      return e;
    }
    get Values() {
      const e = {};
      for (const t of this._def.values) e[t] = t;
      return e;
    }
    get Enum() {
      const e = {};
      for (const t of this._def.values) e[t] = t;
      return e;
    }
    extract(e) {
      return Fe.create(e);
    }
    exclude(e) {
      return Fe.create(this.options.filter((t) => !e.includes(t)));
    }
  }
  Fe.create = Le;
  class Re extends te {
    _parse(e) {
      const t = F.getValidEnumValues(this._def.values),
        n = this._getOrReturnCtx(e);
      if (n.parsedType !== U.string && n.parsedType !== U.number) {
        const e = F.objectValues(t);
        return (
          T(n, {
            expected: F.joinValues(e),
            received: n.parsedType,
            code: _.invalid_type,
          }),
          H
        );
      }
      if (-1 === t.indexOf(e.data)) {
        const e = F.objectValues(t);
        return (
          T(n, { received: n.data, code: _.invalid_enum_value, options: e }), H
        );
      }
      return J(e.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  Re.create = (e, t) =>
    new Re({ values: e, typeName: Me.ZodNativeEnum, ...ee(t) });
  class Ue extends te {
    unwrap() {
      return this._def.type;
    }
    _parse(e) {
      const { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== U.promise && !1 === t.common.async)
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.promise,
            received: t.parsedType,
          }),
          H
        );
      const n = t.parsedType === U.promise ? t.data : Promise.resolve(t.data);
      return J(
        n.then((e) =>
          this._def.type.parseAsync(e, {
            path: t.path,
            errorMap: t.common.contextualErrorMap,
          })
        )
      );
    }
  }
  Ue.create = (e, t) => new Ue({ type: e, typeName: Me.ZodPromise, ...ee(t) });
  class Oe extends te {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === Me.ZodEffects
        ? this._def.schema.sourceType()
        : this._def.schema;
    }
    _parse(e) {
      const { status: t, ctx: n } = this._processInputParams(e),
        i = this._def.effect || null,
        a = {
          addIssue: (e) => {
            T(n, e), e.fatal ? t.abort() : t.dirty();
          },
          get path() {
            return n.path;
          },
        };
      if (((a.addIssue = a.addIssue.bind(a)), "preprocess" === i.type)) {
        const e = i.transform(n.data, a);
        return n.common.issues.length
          ? { status: "dirty", value: n.data }
          : n.common.async
          ? Promise.resolve(e).then((e) =>
              this._def.schema._parseAsync({ data: e, path: n.path, parent: n })
            )
          : this._def.schema._parseSync({ data: e, path: n.path, parent: n });
      }
      if ("refinement" === i.type) {
        const e = (e) => {
          const t = i.refinement(e, a);
          if (n.common.async) return Promise.resolve(t);
          if (t instanceof Promise)
            throw new Error(
              "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
            );
          return e;
        };
        if (!1 === n.common.async) {
          const i = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return "aborted" === i.status
            ? H
            : ("dirty" === i.status && t.dirty(),
              e(i.value),
              { status: t.value, value: i.value });
        }
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then((n) =>
            "aborted" === n.status
              ? H
              : ("dirty" === n.status && t.dirty(),
                e(n.value).then(() => ({ status: t.value, value: n.value })))
          );
      }
      if ("transform" === i.type) {
        if (!1 === n.common.async) {
          const e = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          if (!z(e)) return e;
          const s = i.transform(e.value, a);
          if (s instanceof Promise)
            throw new Error(
              "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
            );
          return { status: t.value, value: s };
        }
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then((e) =>
            z(e)
              ? Promise.resolve(i.transform(e.value, a)).then((e) => ({
                  status: t.value,
                  value: e,
                }))
              : e
          );
      }
      F.assertNever(i);
    }
  }
  (Oe.create = (e, t, n) =>
    new Oe({ schema: e, typeName: Me.ZodEffects, effect: t, ...ee(n) })),
    (Oe.createWithPreprocess = (e, t, n) =>
      new Oe({
        schema: t,
        effect: { type: "preprocess", transform: e },
        typeName: Me.ZodEffects,
        ...ee(n),
      }));
  class _e extends te {
    _parse(e) {
      return this._getType(e) === U.undefined
        ? J(void 0)
        : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  _e.create = (e, t) =>
    new _e({ innerType: e, typeName: Me.ZodOptional, ...ee(t) });
  class Se extends te {
    _parse(e) {
      return this._getType(e) === U.null
        ? J(null)
        : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Se.create = (e, t) =>
    new Se({ innerType: e, typeName: Me.ZodNullable, ...ee(t) });
  class De extends te {
    _parse(e) {
      const { ctx: t } = this._processInputParams(e);
      let n = t.data;
      return (
        t.parsedType === U.undefined && (n = this._def.defaultValue()),
        this._def.innerType._parse({ data: n, path: t.path, parent: t })
      );
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  De.create = (e, t) =>
    new De({
      innerType: e,
      typeName: Me.ZodDefault,
      defaultValue:
        "function" == typeof t.default ? t.default : () => t.default,
      ...ee(t),
    });
  class Ye extends te {
    _parse(e) {
      const { ctx: t } = this._processInputParams(e),
        n = { ...t, common: { ...t.common, issues: [] } },
        i = this._def.innerType._parse({
          data: n.data,
          path: n.path,
          parent: { ...n },
        });
      return P(i)
        ? i.then((e) => ({
            status: "valid",
            value:
              "valid" === e.status
                ? e.value
                : this._def.catchValue({
                    get error() {
                      return new S(n.common.issues);
                    },
                    input: n.data,
                  }),
          }))
        : {
            status: "valid",
            value:
              "valid" === i.status
                ? i.value
                : this._def.catchValue({
                    get error() {
                      return new S(n.common.issues);
                    },
                    input: n.data,
                  }),
          };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  Ye.create = (e, t) =>
    new Ye({
      innerType: e,
      typeName: Me.ZodCatch,
      catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
      ...ee(t),
    });
  class Te extends te {
    _parse(e) {
      if (this._getType(e) !== U.nan) {
        const t = this._getOrReturnCtx(e);
        return (
          T(t, {
            code: _.invalid_type,
            expected: U.nan,
            received: t.parsedType,
          }),
          H
        );
      }
      return { status: "valid", value: e.data };
    }
  }
  (Te.create = (e) => new Te({ typeName: Me.ZodNaN, ...ee(e) })),
    Symbol("zod_brand");
  class Ve extends te {
    _parse(e) {
      const { ctx: t } = this._processInputParams(e),
        n = t.data;
      return this._def.type._parse({ data: n, path: t.path, parent: t });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class He extends te {
    _parse(e) {
      const { status: t, ctx: n } = this._processInputParams(e);
      if (n.common.async)
        return (async () => {
          const e = await this._def.in._parseAsync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return "aborted" === e.status
            ? H
            : "dirty" === e.status
            ? (t.dirty(), { status: "dirty", value: e.value })
            : this._def.out._parseAsync({
                data: e.value,
                path: n.path,
                parent: n,
              });
        })();
      {
        const e = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return "aborted" === e.status
          ? H
          : "dirty" === e.status
          ? (t.dirty(), { status: "dirty", value: e.value })
          : this._def.out._parseSync({
              data: e.value,
              path: n.path,
              parent: n,
            });
      }
    }
    static create(e, t) {
      return new He({ in: e, out: t, typeName: Me.ZodPipeline });
    }
  }
  class Je extends te {
    _parse(e) {
      const t = this._def.innerType._parse(e);
      return z(t) && (t.value = Object.freeze(t.value)), t;
    }
  }
  var Me;
  (Je.create = (e, t) =>
    new Je({ innerType: e, typeName: Me.ZodReadonly, ...ee(t) })),
    Be.lazycreate,
    (function (e) {
      (e.ZodString = "ZodString"),
        (e.ZodNumber = "ZodNumber"),
        (e.ZodNaN = "ZodNaN"),
        (e.ZodBigInt = "ZodBigInt"),
        (e.ZodBoolean = "ZodBoolean"),
        (e.ZodDate = "ZodDate"),
        (e.ZodSymbol = "ZodSymbol"),
        (e.ZodUndefined = "ZodUndefined"),
        (e.ZodNull = "ZodNull"),
        (e.ZodAny = "ZodAny"),
        (e.ZodUnknown = "ZodUnknown"),
        (e.ZodNever = "ZodNever"),
        (e.ZodVoid = "ZodVoid"),
        (e.ZodArray = "ZodArray"),
        (e.ZodObject = "ZodObject"),
        (e.ZodUnion = "ZodUnion"),
        (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
        (e.ZodIntersection = "ZodIntersection"),
        (e.ZodTuple = "ZodTuple"),
        (e.ZodRecord = "ZodRecord"),
        (e.ZodMap = "ZodMap"),
        (e.ZodSet = "ZodSet"),
        (e.ZodFunction = "ZodFunction"),
        (e.ZodLazy = "ZodLazy"),
        (e.ZodLiteral = "ZodLiteral"),
        (e.ZodEnum = "ZodEnum"),
        (e.ZodEffects = "ZodEffects"),
        (e.ZodNativeEnum = "ZodNativeEnum"),
        (e.ZodOptional = "ZodOptional"),
        (e.ZodNullable = "ZodNullable"),
        (e.ZodDefault = "ZodDefault"),
        (e.ZodCatch = "ZodCatch"),
        (e.ZodPromise = "ZodPromise"),
        (e.ZodBranded = "ZodBranded"),
        (e.ZodPipeline = "ZodPipeline"),
        (e.ZodReadonly = "ZodReadonly");
    })(Me || (Me = {}));
  const je = de.create,
    ze = ge.create,
    Pe = (Te.create, be.create, he.create),
    $e = (pe.create, me.create, Ie.create),
    qe = fe.create,
    Ke = (Ce.create, ye.create),
    et = (xe.create, Ge.create, Ae.create),
    tt = Be.create,
    nt = (Be.strictCreate, Ze.create),
    it = (we.create, ke.create, Xe.create, Ee.create, Ne.create, We.create),
    at = (Fe.create, Re.create, Ue.create, Oe.create, _e.create, Se.create);
  Oe.createWithPreprocess, He.create;
  const st = tt({ messageId: je(), method: je(), data: Ke() }),
    rt = tt({
      messageId: je(),
      method: je(),
      origin: je(),
      reject: Ke().or($e()),
      resolve: Ke().or($e()),
    });
  class ot {
    static isIframe(e) {
      try {
        return !!e.contentWindow;
      } catch (e) {
        return !1;
      }
    }
    handshakeComplete = !1;
    constructor({ source: e, target: t }) {
      (this.callbacks = new Map()), (this.source = e), (this.target = t);
      const { port1: n, port2: i } = new MessageChannel();
      (this.sourcePort = n),
        (this.targetPort = i),
        (this.sourcePort.onmessage = this.onMessageFromTarget.bind(this));
    }
    onMessageFromTarget(e) {
      if (e.data === W) return void (this.handshakeComplete = !0);
      const t = rt.safeParse(e.data);
      if (!t.success) return void v("Invalid data schema received from target");
      const n = this.callbacks.get(t.data.messageId);
      if (!n)
        return void v(`Callback not available for method: ${t.data.method}`);
      const { reject: i, resolve: a, method: s } = t.data;
      void 0 !== i
        ? n.reject(i)
        : void 0 !== a
        ? n.resolve(a)
        : v(`No resolution available for method: ${s}`);
    }
    waitForHandshake() {
      return new Promise((e, t) => {
        const n = setTimeout(() => {
            t(new Error("Handshake timeout"));
          }, 5e3),
          i = setInterval(() => {
            this.handshakeComplete &&
              (clearTimeout(n), clearInterval(i), e(!0));
          }, 100);
      });
    }
    async postMessageToTarget({ method: e, data: t }) {
      const n = E();
      return (
        this.sourcePort.postMessage({ messageId: n, method: e, data: t }),
        new Promise((e, t) => {
          this.callbacks.set(n, { resolve: e, reject: t });
        })
      );
    }
    async initiateHandshake() {
      ot.isIframe(this.target)
        ? this.target.contentWindow?.postMessage({ type: N }, "*", [
            this.targetPort,
          ])
        : this.target.postMessage({ type: N }, "*", [this.targetPort]),
        await this.waitForHandshake();
    }
    destroy() {
      this.sourcePort.close(), this.targetPort.close();
    }
  }
  class ct {
    constructor({
      validateOrigin: e = !0,
      removeListenerAfterHandshake: t = !0,
    }) {
      (this.handlers = new Map()), (this.handshakeComplete = !1);
      const n = (i) => {
        i.data.type === N &&
          i.ports[0]?.postMessage &&
          (!e ||
            ["development", "test"].includes("production") ||
            L.test(new URL(i.origin).hostname)) &&
          ((this.port = i.ports[0]),
          this.port.postMessage(W),
          (this.port.onmessage = this.onMessageFromSource.bind(this)),
          (this.sourceOrigin = i.origin),
          (this.handshakeComplete = !0),
          t && window.removeEventListener("message", n));
      };
      window.addEventListener("message", n);
    }
    waitForHandshake() {
      return new Promise((e) => {
        const t = setInterval(() => {
          this.handshakeComplete && (clearInterval(t), e(!0));
        }, 100);
      });
    }
    async sendMessageToSource(e) {
      this.handshakeComplete || (await this.waitForHandshake()),
        this.port.postMessage(e);
    }
    async onMessageFromSource(e) {
      const { messageId: t, method: n, data: i } = st.parse(e.data),
        a = {
          messageId: t,
          method: n,
          origin: this.sourceOrigin,
          reject: void 0,
          resolve: void 0,
        },
        s = this.handlers.get(n);
      if (!s)
        return (
          (a.reject = `Unhandled method: ${n}, add appropriate handler.`),
          void this.sendMessageToSource(a)
        );
      try {
        a.resolve = await s({
          data: i,
          config: { sourceOrigin: this.sourceOrigin },
        });
      } catch (e) {
        a.reject = e;
      }
      this.sendMessageToSource(a);
    }
    registerHandler(e, t) {
      this.handlers.set(e, t);
    }
  }
  let lt = (function (e) {
      return (
        (e.IFRAME = "iframe"),
        (e.WINDOW = "window"),
        (e.REDIRECT = "redirect"),
        (e.SDK = "sdk"),
        e
      );
    })({}),
    dt = (function (e) {
      return (
        (e.TECHNICAL_ERROR = "TECHNICAL_ERROR"),
        (e.ACCESS_ERROR = "ACCESS_ERROR"),
        (e.RESOURCE_ERROR = "RESOURCE_ERROR"),
        (e.INPUT_ERROR = "INPUT_ERROR"),
        e
      );
    })({}),
    ut = (function (e) {
      return (
        (e.INITIATE_CALLED = "initiate_called"),
        (e.INITIATE_INTEGRATOR_HANDLED_INTERACTION_TRIGGERED =
          "initiate_integrator_handled_interaction_triggered"),
        (e.INITIATE_INTEGRATOR_CLOSED_INTERACTION =
          "initiate_integrator_closed_interaction"),
        (e.INITIATE_INTERACTION_MODE_TRIGGERED =
          "inititate_interaction_mode_triggered"),
        (e.INITIATE_COMPLETED = "initiate_completed"),
        (e.FETCH_CALLED = "fetch_called"),
        (e.FETCH_COMPLETED = "fetch_completed"),
        (e.CAN_MAKE_PAYMENT_CALLED = "can_make_payment_called"),
        (e.CAN_MAKE_PAYMENT_COMPLETED = "can_make_payment_completed"),
        (e.CANCEL_CALLED = "cancel_called"),
        (e.CANCEL_COMPLETED = "cancel_completed"),
        (e.PREPARE_CALLED = "prepare_called"),
        (e.PREPARE_COMPLETED = "prepare_completed"),
        (e.REQUEST_CALLED = "request_called"),
        (e.REQUEST_COMPLETED = "request_completed"),
        (e.SUBMIT_CALLED = "submit_called"),
        (e.SUBMIT_COMPLETED = "submit_completed"),
        (e.UPDATE_CALLED = "update_called"),
        (e.UPDATE_COMPLETED = "update_completed"),
        (e.MAKE_PAYMENT_REQUEST_CALLED = "make_payment_request_called"),
        (e.MAKE_PAYMENT_REQUEST_COMPLETED = "make_payment_request_completed"),
        (e.UPDATE_PAYMENT_REQUEST_CALLED = "update_payment_request_called"),
        (e.UPDATE_PAYMENT_REQUEST_COMPLETED =
          "update_payment_request_completed"),
        e
      );
    })({});
  class gt extends Error {
    constructor(e) {
      super(),
        (this.message = `${e.status} ${e.statusText}`),
        (this.status = e.status),
        (this.statusText = e.statusText),
        (this.response = e.response);
    }
  }
  const bt = (e) => {
      const t = { ...e };
      return (
        Object.keys(t).forEach((e) => (void 0 === t[e] ? delete t[e] : {})), t
      );
    },
    ht = {
      africa: "eu",
      america: "na",
      antarctica: "na",
      arctic: "na",
      asia: "oc",
      atlantic: "na",
      australia: "oc",
      europe: "eu",
      indian: "oc",
      pacific: "na",
    },
    pt = () => {
      const e = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (e) {
        const t = e.split("/")[0].toLowerCase();
        if (t in ht) return ht[t];
      }
      return (
        B("Provided region is not supported - defaulting region to eu"), "eu"
      );
    };
  let mt = (function (e) {
      return (
        (e.PAYMENT_BUTTON = "klarna-payment-button"),
        (e.IDENTITY_BUTTON = "klarna-identity-button"),
        (e.PLACEMENT = "klarna-placement"),
        e
      );
    })({}),
    It = (function (e) {
      return (e.IDENTITY = "identity"), (e.PAYMENT = "payment"), e;
    })({}),
    ft = (function (e) {
      return (e.DEFAULT = "default"), (e.LIGHT = "light"), (e.DARK = "dark"), e;
    })({}),
    Ct = (function (e) {
      return (e.DEFAULT = "default"), (e.PILL = "pill"), (e.RECT = "rect"), e;
    })({}),
    yt = (function (e) {
      return (
        (e.CHECKOUT = "checkout"),
        (e.CUSTOM_TYPE_0 = "custom-type0"),
        (e.CUSTOM_TYPE_1 = "custom-type1"),
        (e.CUSTOM_TYPE_0_INLINE = "custom-type0-inline"),
        (e.CUSTOM_TYPE_2_INLINE = "custom-type2-inline"),
        (e.CUSTOM_TYPE_3_INLINE = "custom-type3-inline"),
        (e.CUSTOM_TYPE_1_335_AUTO = "custom-type1-335-auto"),
        (e.CUSTOM_TYPE_3_335_AUTO = "custom-type3-335-auto"),
        (e.TOP_STRIP_PROMOTION_AUTO_SIZE = "top-strip-promotion-auto-size"),
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
  const xt = {
      production: "https://js.klarna.com",
      playground: "https://js.playground.klarna.com",
      staging: "https://x.nonprod.us1.js.klarna.net",
      development: "https://x.nonprod.us1.js.klarna.net",
    },
    Gt = [
      "en-AU",
      "en-NZ",
      "en-AT",
      "de-AT",
      "nl-BE",
      "en-BE",
      "fr-BE",
      "en-CH",
      "de-CH",
      "it-CH",
      "fr-CH",
      "en-CZ",
      "cs-CZ",
      "de-DE",
      "en-DE",
      "da-DK",
      "en-DK",
      "es-ES",
      "en-ES",
      "fi-FI",
      "sv-FI",
      "en-FI",
      "fr-FR",
      "en-FR",
      "en-GB",
      "en-GR",
      "el-GR",
      "en-IE",
      "en-IT",
      "it-IT",
      "nl-NL",
      "en-NL",
      "no-NO",
      "nb-NO",
      "en-NO",
      "en-PL",
      "pl-PL",
      "en-PT",
      "pt-PT",
      "en-RO",
      "ro-RO",
      "sv-SE",
      "en-SE",
      "en-CA",
      "fr-CA",
      "es-MX",
      "en-MX",
      "en-US",
      "es-US",
      "en-HU",
      "hu-HU",
      "en-SK",
      "sk-SK",
    ].map((e) => e.toLowerCase()),
    At = [
      "top-strip-promotion-standard",
      "credit-promotion-standard",
      "credit-promotion-small",
      "info-page-standard",
      "info-page-auto-size",
    ],
    vt = {
      [yt.FOOTER_PROMOTION_AUTO_SIZE]: "static",
      [yt.SIDEBAR_PROMOTION_AUTO_SIZE]: "static",
      [yt.CHECKOUT]: "json",
      [yt.CREDIT_PROMOTION_AUTO_SIZE]: "json",
      [yt.CREDIT_PROMOTION_BADGE]: "json",
      [yt.CREDIT_PROMOTION_STANDARD]: "json",
      [yt.CREDIT_PROMOTION_SMALL]: "json",
      [yt.TOP_STRIP_PROMOTION_BADGE]: "json",
      [yt.HOMEPAGE_PROMOTION_TALL]: "json",
      [yt.HOMEPAGE_PROMOTION_WIDE]: "json",
      [yt.HOMEPAGE_PROMOTION_BOX]: "json",
      [yt.TOP_STRIP_PROMOTION_AUTO_SIZE]: "json",
      [yt.TOP_STRIP_PROMOTION_STANDARD]: "json",
      [yt.INFO_PAGE]: "json",
      [yt.CUSTOM_TYPE_0]: "json",
      [yt.CUSTOM_TYPE_1]: "json",
      [yt.CUSTOM_TYPE_1_335_AUTO]: "json",
      [yt.CREDIT_PROMOTION_INLINE]: "html",
      [yt.CUSTOM_TYPE_2_INLINE]: "html",
      [yt.CUSTOM_TYPE_3_INLINE]: "html",
      [yt.CUSTOM_TYPE_0_INLINE]: "html",
      [yt.CUSTOM_TYPE_3_335_AUTO]: "html",
    },
    Bt = ["default", "dark", "custom", "light"],
    Zt = {
      production: {
        oc: "https://osm.klarnaservices.com",
        eu: "https://osm.klarnaservices.com",
        na: "https://osm.klarnaservices.com",
      },
      playground: {
        oc: "https://oc-assets.playground.klarnaservices.com",
        eu: "https://eu-assets.playground.klarnaservices.com",
        na: "https://na-assets.playground.klarnaservices.com",
      },
      staging: {
        oc: "https://s3.int.klarna.net/pre-purchase/library/global",
        eu: "https://s3.int.klarna.net/pre-purchase/library/global",
        na: "https://s3.int.klarna.net/pre-purchase/library/global",
      },
      development: {
        oc: "https://oc-assets.klarnaservices.com",
        eu: "https://eu-assets.klarnaservices.com",
        na: "https://na-assets.klarnaservices.com",
      },
    },
    Qt = [
      "2353e544-2ff2-59c2-b212-1bf4f3464e4c",
      "8881c1ea-b112-5bac-af6e-8d7673373121",
      "69ae9909-fa83-5679-9b79-e3152d192025",
      "8a9301af-27eb-579f-9680-ce15f71b6b0a",
      "1e91f355-200d-5918-9a94-e89ab9989159",
      "55253bbc-5618-57c1-9537-dcb976a96121",
      "90182b69-f31b-5041-8277-82b3a07eae17",
      "5c1f8dc6-5298-5c13-abef-6a253ea06ea5",
      "da5a1c6d-c02c-514c-b40d-73b0d676d464",
      "67a23d03-8270-5475-a8a0-babe4ba86687",
      "4f39e2bc-5713-52f1-8c90-570f7ddd4781",
      "a9e8fb36-aa4e-589d-bd62-7c8c99e46092",
      "14573f95-97e7-52f1-b7f2-a903accb435b",
      "cce1bc9a-2ba6-59ab-88ea-ba0b767aab8b",
      "e8880bde-72dd-5de0-8876-4dc28a556ff9",
      "a9c619b7-b577-54d7-aa7b-adeadc7fc5ee",
      "e81bcf70-038a-546b-8bd6-0c08ea4733e2",
      "ce4123ca-9676-51b5-8db5-76d854d54c88",
      "723d3bf3-0a90-5aae-8140-310d9fa478bd",
      "78384c12-9830-508f-9046-f45b93ede7a1",
      "52de8130-3107-59f9-aaa1-5a90bf0cdf13",
      "ecb0e555-fd5f-554e-966a-bf58f1f72a8e",
      "c6406cbf-893d-59c1-816d-086e9ca7c5c7",
      "76424947-b4c8-5f11-9125-46bff698a0f8",
      "58a92553-dc92-5af4-af7e-65693266e81c",
      "a84c8537-64a5-5f76-a0ff-6d9b934088ec",
      "1fb43ba0-2264-5dd0-9ccd-7d6a889613bf",
      "601ee633-997e-5b4e-867a-a5a13c4c5f63",
      "c782324b-2ee6-5130-9606-c7f112a0fe23",
      "78bdf5e2-8292-54ee-9e27-dea8fb4aacf6",
      "fc432336-af8d-571e-8a4c-15d0efcf7f67",
      "663643dc-79c8-5ecd-ba91-86403fef3965",
      "67472e2d-1d9a-5311-87ef-9e93ea03f399",
      "fce97b2a-8c6a-5ba5-a107-948485bc2e83",
      "0b42169a-608f-5c81-b17a-29900c8c66a4",
      "ca810ec7-49ec-5b63-9183-accae4bf3307",
      "c68e9833-599c-5e14-bc57-f78c822b12ad",
      "bfd35799-3d4c-5582-b71b-c3e963568427",
      "1a13d8c3-3c33-51ee-a722-e45955c20fa6",
      "ad0754c5-71a6-54ac-96c0-f941a0bb7f5c",
      "d3e8cc9b-a1ad-51b9-96a7-05fe230edce3",
      "062884b5-df83-531b-828c-d3118de89b06",
      "49a82178-2eba-54ce-b8c1-2531a004a138",
      "71d3225b-aa87-5f0e-9904-876af56d6c66",
      "e4708f00-bd5a-5e18-bd66-f4621c238887",
      "aad339e0-64b3-54d8-8982-a6df9322269e",
      "f6186bbc-da96-57ed-affd-c0978a613268",
      "2bc7b9f0-0433-5989-9ee0-a4b375bf929c",
      "991fe595-2850-5cbc-adba-989fc270713f",
      "1afa0d69-128e-56cf-8879-328f60a66c65",
      "3a543f47-e295-5ea0-93ab-61dfb0dae37a",
      "addb8461-59ed-5e10-b577-9abcbd197d84",
      "6ca24f4c-0c64-5517-adb2-fd5eda9701aa",
      "cbca9c58-53b0-522a-a432-a6103901733c",
      "19e055a1-5941-513a-8d5f-676b6d10b013",
      "738bf438-6a08-50db-92e1-acfdc06706c2",
      "9ce697be-c972-53b9-88bb-cac352b69f47",
      "a897c548-029d-5d34-9b59-813ceb9d7264",
      "998bc69d-b942-5eff-9edf-b1b1e81ae391",
      "c7a1c0da-0b49-5732-913b-0a47a3e1a60e",
      "9ee94060-75f8-5f0e-99bb-3954fcf3a62f",
      "db8aa4d5-8069-5218-933c-de7e3b494f89",
      "a264dbba-6c2d-59b9-9167-c3f4a9791f21",
      "008032f1-657e-5cca-a105-f3edd2bbe84f",
      "af16f814-4a20-5c20-ad2d-942ad93f3590",
      "e36cb7cd-c699-555c-a80d-0fcd56d7f303",
      "ba76a301-1323-5e62-aac3-6b3ce95623ee",
      "0904ad5a-0fb5-5069-bca9-12dbae8d8e5d",
      "6b01ee08-344c-5e9b-ae46-b31a477259f0",
      "f53b110c-50fa-5540-8225-bad651221124",
      "23aec4ae-cd98-5f0a-b4d5-0df5c4a223c6",
      "17e2e730-3d33-585a-b9e7-c5a75e966127",
      "203b5252-c6b6-56a1-8e9d-d0caafebb88c",
      "63ae67c6-ab0e-575e-9f1c-712b9027cc6c",
      "a17591c7-36f9-526b-92a5-f2ff0449a3fc",
      "9766ad09-9605-58a9-aed8-0cd3011da25e",
      "fd6d2432-21c6-5928-86ad-eb0566325c12",
      "48de90a6-1bce-576b-a8eb-6d649c96b55c",
      "0403e8ae-1038-580c-be1c-c38d38837f01",
      "32198a5b-390c-59f6-b1b8-b318f945a14f",
      "d8a32f56-c17e-5e88-bc50-b9b35b9ced2d",
      "6600934b-c14a-54d5-a447-6dc4b146f321",
      "7cfbaac4-729a-5930-ba1a-ad3504155e8e",
      "614d55ad-6cb6-5670-9879-49fd2cac64bf",
      "f46705b8-e9e5-5070-80c6-389dcc32f0d4",
      "6d98ac83-11a1-584b-9aa4-e4374ea442e6",
      "19cf327c-7c49-5b82-853b-83d93c0fa116",
    ];
  function wt(e, t = Gt) {
    return !!e && t.includes(e.toLowerCase());
  }
  const kt = { eu: "en-GB", na: "en-US", oc: "en-AU" },
    Xt = (e = "", t = window, n = !0) => {
      e && (e = e.replace("_", "-"));
      const i = e.split("-");
      if (
        wt(
          (e =
            i.length > 1 ? `${i[0].toLowerCase()}-${i[1].toUpperCase()}` : "")
        )
      )
        return e;
      if (!n) return;
      const a = t.navigator?.language;
      if (wt(a)) return a;
      const s = pt();
      return kt[s];
    },
    Et = {
      at: "eu",
      au: "oc",
      be: "eu",
      ca: "na",
      ch: "eu",
      cz: "eu",
      de: "eu",
      dk: "eu",
      es: "eu",
      fi: "eu",
      fr: "eu",
      gb: "eu",
      gr: "eu",
      ie: "eu",
      it: "eu",
      mx: "na",
      nl: "eu",
      no: "eu",
      nz: "oc",
      pl: "eu",
      pt: "eu",
      ro: "eu",
      se: "eu",
      us: "na",
    },
    Nt = (e) => {
      if ((e && (e = e.replace("_", "-")), e && wt(e))) {
        const t = e.split("-")[1].toLowerCase();
        if (t in Et) return Et[t];
      }
      const t = pt();
      return (
        B(`Provided locale is not supported - defaulting region to ${t}`), t
      );
    },
    Wt = ({ paymentRequestId: e, currency: t, locale: n }) =>
      e && e.split(":").length >= 3
        ? e.split(":")[2].substring(0, 2)
        : t
        ? ((e) => ("USD" === e ? "na" : "eu"))(t)
        : Nt(n),
    Lt = ({ environment: e, locale: t, currency: n }) => {
      const i = Xt(t),
        a = Wt({ currency: n, locale: i });
      return "playground" === e
        ? `https://${a}.playground.klarnaevt.com`
        : `https://${a}.klarnaevt.com`;
    },
    Ft = ({ config: e, trackerClient: t, extraTrackingData: n, locale: i }) => {
      const { version: a, environment: s, sessionId: r } = e,
        o = y(t),
        c = bt({
          clientId: n?.clientId,
          accountId: n?.accountId,
          additionalIdentifier: n?.additionalIdentifier,
          sdk: "websdk",
          aId: n?.aId,
        });
      return (
        o.configure({
          options: {
            client: t,
            clientVersion: a,
            sessionId: r,
            baseUrl: Lt({ environment: s, locale: i }),
          },
          data: c,
        }),
        o
      );
    };
  class Rt {
    static instance = null;
    static getInstance(e) {
      return (
        !Rt.instance &&
          e &&
          (Rt.instance = (function (e) {
            return Ft({
              config: {
                version: e.version,
                environment: e.environment,
                sessionId: e.sessionId,
              },
              trackerClient: i.websdk,
              extraTrackingData: { aId: e.additionalIdentifier },
            });
          })(e)),
        Rt.instance
      );
    }
  }
  const Ut = () => Rt.getInstance(),
    Ot = class {
      events = new Map();
      on(e, t) {
        e && t
          ? (this.events.get(e) || this.events.set(e, []),
            this.events.get(e)?.push(t))
          : B("Event name or callback is not provided");
      }
      off(e, t) {
        if (e && t) {
          const n = this.events.get(e);
          n &&
            this.events.set(
              e,
              n.filter((e) => e !== t)
            );
        } else B("Event name or callback is not provided");
      }
      emit(e, t) {
        const n = this.events.get(e);
        n?.forEach((e) => {
          "function" == typeof e && e(t);
        });
      }
      of(e) {
        if (e) return this.events.get(e);
        B("Event name is not provided");
      }
      once(e, t) {
        if (e && t) {
          const n = (i) => {
            t(i), this.off(e, n);
          };
          this.on(e, n);
        } else B("Event name or callback is not provided");
      }
    };
  let _t = (function (e) {
    return (e.UPDATE = "update"), (e.ERROR = "error"), e;
  })({});
  class St extends Ot {
    constructor() {
      super();
    }
    static getInstance() {
      return St.instance || (St.instance = new St()), St.instance;
    }
  }
  var Dt;
  !(function (e) {
    (e.fatal = "fatal"),
      (e.error = "error"),
      (e.warning = "warning"),
      (e.log = "log"),
      (e.info = "info"),
      (e.debug = "debug"),
      (e.critical = "critical");
  })(Dt || (Dt = {}));
  const Yt =
      /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    Tt =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
    Vt =
      /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    Ht = "?",
    Jt = /^(?:(\w+):)\/\/(?:([\w-]+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
  function Mt(e) {
    return ((e && e.message) || "No error message")
      .split("\n")
      .filter((e) => !!e)[0];
  }
  function jt(e) {
    try {
      const t = (function (e) {
        if (!e.stack) return null;
        const t = [],
          n = e.stack.split("\n");
        let i, a;
        for (let s = 0; s < n.length; ++s) {
          if ((i = Yt.exec(n[s])))
            a = {
              filename:
                i[2] && 0 === i[2].indexOf("address at ")
                  ? i[2].substr(11)
                  : i[2],
              function: i[1] || Ht,
              lineno: i[3] ? +i[3] : null,
              colno: i[4] ? +i[4] : null,
            };
          else if ((i = Vt.exec(n[s])))
            a = {
              filename: i[2],
              function: i[1] || Ht,
              lineno: +i[3],
              colno: i[4] ? +i[4] : null,
            };
          else {
            if (!(i = Tt.exec(n[s]))) continue;
            0 !== s ||
              i[5] ||
              void 0 === e.columnNumber ||
              (t[0].column = e.columnNumber + 1),
              (a = {
                filename: i[3],
                function: i[1] || Ht,
                lineno: i[4] ? +i[4] : null,
                colno: i[5] ? +i[5] : null,
              });
          }
          !a.function && a.lineno && (a.function = Ht), t.push(a);
        }
        return t.length
          ? { value: Mt(e), type: e.name, stacktrace: { frames: t.reverse() } }
          : null;
      })(e);
      if (t) return t;
    } catch (e) {}
    return { value: Mt(e), type: e && e.name, stacktrace: { frames: [] } };
  }
  class zt {
    constructor(e) {
      if (e && e.dsn) {
        const t = Jt.exec(e.dsn),
          n = t ? t.slice(1) : [],
          i = n[5].split("/"),
          a = i.slice(0, -1).join("/");
        (this.apiUrl =
          n[0] +
          "://" +
          n[3] +
          (n[4] ? ":" + n[4] : "") +
          (a ? "/" + a : "") +
          "/api/" +
          i.pop() +
          "/store/"),
          (this.authHeader =
            "Sentry sentry_version=7,sentry_key=" +
            n[1] +
            (n[2] ? ",sentry_secret=" + n[2] : ""));
      }
      this.environment = e && e.environment;
    }
    prepare(e) {
      return { ...this.getRequestBlank(), exception: { values: [jt(e)] } };
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
        event_id: "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (e) => {
          const t = (16 * Math.random()) | 0;
          return ("x" === e ? t : (3 & t) | 8).toString(16);
        }),
        sdk: { name: "micro-sentry.javascript.core", version: "0.0.0" },
        timestamp: Date.now() / 1e3,
        environment: this.environment,
      };
    }
  }
  function Pt(e, t) {
    return "[object RegExp]" === Object.prototype.toString.call(t)
      ? t.test(e)
      : "string" == typeof t && -1 !== e.indexOf(t);
  }
  function $t() {
    return window;
  }
  class qt extends zt {
    constructor(e, t = $t()) {
      super(e),
        (this.options = e),
        (this.window = t),
        (this.destroyed = !1),
        (this._state = {});
      const {
        plugins: n = [],
        beforeSend: i = (e) => e,
        beforeBreadcrumb: a = (e) => e,
        blacklistUrls: s = [],
        ignoreErrors: r = [],
        release: o,
      } = this.options || {};
      (this.plugins = n.map((e) => new e(this))),
        (this.beforeSend = i),
        (this.beforeBreadcrumb = a),
        (this.blacklistUrls = s),
        (this.ignoreErrors = r),
        (this.release = o);
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
      const e = new qt({ ...this.options, plugins: [] });
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
          this.ignoreErrors.some((t) => Pt(e, t))
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
        sdk: { name: "micro-sentry.javascript.browser", version: "0.0.0" },
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
      return !!t && this.blacklistUrls.some((e) => Pt(t, e));
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
        const i = this._state[n],
          a = Array.isArray(i) ? i : null,
          s = e[n],
          r = Array.isArray(s) ? s : null;
        return {
          ...t,
          [n]:
            a || r
              ? [...(a || []), ...(r || [])]
              : {
                  ...("string" != typeof i ? i : {}),
                  ...("string" != typeof s ? s : {}),
                },
        };
      }, this._state);
    }
    setKeyState(e, t) {
      this._state[e] = t;
    }
  }
  let Kt = (function (e) {
    return (e.SENTRY_NOT_CONFIGURED = "sentry_not_configured"), e;
  })({});
  var en = (function (e) {
    return (
      (e.sessionStorageNotSupported = "sessionStorage-not-supported"),
      (e.localStorageNotSupported = "localStorage-not-supported"),
      (e.dynamicImportFailed = "dynamic-import-failed"),
      (e.multipleCustomElementsWithSameTagName =
        "multiple-custom-elements-same-tag-name"),
      (e.unexpectedTokenMethodParamsList =
        "unexpected-token-method-params-list"),
      (e.missingColonAfterPropertyId = "missing-colon-after-property-id"),
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
      (e.performanceMarkIsNotAFunction = "performance-mark-is-not-a-function"),
      e
    );
  })(en || {});
  const tn = [
      "https://s3.int.klarna.net",
      "https://js.klarna.com",
      "https://x.klarnacdn.net",
      "https://x.nonprod.us1.js.klarna.net",
      "https://osm.klarnaservices.com",
      "https://eu-assets.playground.klarnaservices.com",
      "https://na-assets.playground.klarnaservices.com",
      "https://ap-assets.playground.klarnaservices.com",
    ],
    nn = (e) => tn.some((t) => e.startsWith(t)),
    an = [
      "Unexpected token '",
      "Storage type: ",
      "Failed to fetch dynamically imported module",
      "Missing runtime config",
      "Failed to execute 'define",
      "Importing a module script failed.",
      "NetworkError when attempting to fetch resource",
    ];
  let sn;
  const rn = () =>
      sn ||
      (((e, t, n = i.websdk) => {
        const a = y(n);
        try {
          a.event("error", { message: t, name_1: e });
        } catch {}
      })(Kt.SENTRY_NOT_CONFIGURED, "Sentry client not initialized"),
      on),
    on = {
      report: console.log,
      setTags: () => {},
      setTag: () => {},
      setExtras: () => {},
      setExtra: () => {},
    },
    cn = ({ version: e, environment: t, tags: i }) => (
      sn ||
        (sn = new qt({
          dsn: "https://6fdc8e6e634d4a998b6f0dbfd7b025e1@o24547.ingest.sentry.io/4505471301713920",
          release: e,
          environment: t,
          beforeSend: (e) => {
            e.exception?.values?.forEach(({ value: t }) => {
              e.fingerprint = ((e) => {
                switch (e) {
                  case "Storage type: sessionStorage not supported":
                    return [en.sessionStorageNotSupported];
                  case "Storage type: localStorage not supported":
                    return [en.localStorageNotSupported];
                  case "Cannot define multiple custom elements with the same tag name":
                    return [en.multipleCustomElementsWithSameTagName];
                  case "Unexpected token ';'. Expected an opening '(' before a method's parameter list.":
                    return [en.unexpectedTokenMethodParamsList];
                  case e.match(/Failed to fetch dynamically imported module/)
                    ?.input:
                    return [en.dynamicImportFailed];
                  case e.match("missing : after property id")?.input:
                    return [en.missingColonAfterPropertyId];
                  case e.match("Unexpected token '='")?.input:
                    return [en.unexpectedTokenEqual];
                  case e.match("expected expression, got '='")?.input:
                    return [en.expectedExpressionGotEqual];
                  case e.match(/error loading dynamically imported module/)
                    ?.input:
                    return [en.dynamicImportFailed];
                  case e.match(/performance is not defined/)?.input:
                    return [en.performanceNotDefined];
                  case e.match(/performance?.mark is not a function/)?.input:
                    return [en.performanceMarkIsNotAFunction];
                  case e.match(
                    /undefined is not an object (evaluating 'this.renderOptions.renderBefore')/
                  )?.input:
                    return [en.undefinedIsNotAnObjectRenderOptions];
                  case e.match(/this.renderOptions is undefined/)?.input:
                    return [en.renderOptionsIsUndefined];
                  case e.match(
                    /Cannot read properties of null (reading 'insertBefore')/
                  )?.input:
                    return [en.cannotReadPropertiesOfNull];
                  case e.match(
                    /null is not an object (evaluating 'this._$AA.parentNode.insertBefore')/
                  )?.input:
                    return [en.nullIsNotAnObjectParentNodeInsertBefore];
                  case e.match(
                    /Failed to execute 'invoke' on 'CreateHTMLCallback': The provided callback is no longer runnable./
                  )?.input:
                    return [en.failedToExecuteInvokeOnCreateHTMLCallback];
                  case e.match(
                    "Failed to fetch: GET https://js.klarna.com/na/cma/"
                  )?.input:
                    return [en.failedToFetchOSMAPI];
                }
              })(t);
            });
            const t = ((e) => {
              let t = !0;
              return (
                e.exception?.values?.forEach(({ stacktrace: e }) => {
                  e?.frames?.forEach(({ filename: e }) => {
                    t = !nn(e);
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
                      an.forEach((i) => {
                        e.includes(i) && (t = n(5));
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
      i &&
        Object.entries(i).forEach(([e, t]) => {
          t && sn.setTag(e, t.toString());
        }),
      sn
    );
  var ln = a(1187);
  const dn = tt({
      accountId: je().optional(),
      baseUrl: je(),
      clientId: je(),
      clientOrigin: je().optional(),
      environment: je(),
      sessionId: je(),
      version: je(),
    }),
    un = nt([
      it("CREATED"),
      it("SUBMITTED"),
      it("IN_PROGRESS"),
      it("PREPARED"),
      it("PENDING_CONFIRMATION"),
      it("AUTHORIZED"),
    ]),
    gn = tt({
      city: je(),
      country: je().regex(/^[A-Z]{2}$/),
      postalCode: je().optional(),
      region: je().optional(),
      streetAddress: je(),
      streetAddress2: je().optional(),
    }),
    bn = tt({
      address: gn.optional(),
      recipient: tt({
        attention: je().optional(),
        email: je().optional(),
        familyName: je(),
        givenName: je(),
        phone: je().optional(),
      }).optional(),
      shippingReference: je().optional(),
    }).optional(),
    hn =
      (nt([it("iframe"), it("window"), it("redirect"), it("sdk")]),
      tt({
        buyer: tt({
          address: gn.optional(),
          email: je().optional(),
          familyName: je().optional(),
          givenName: je().optional(),
          phone: je().optional(),
        }).optional(),
        currency: je(),
        merchantReference: je().optional(),
        paymentAmount: ze(),
        lineItems: et(
          tt({
            imageUrl: je().optional(),
            name: je(),
            productIdentifier: je().optional(),
            productUrl: je().optional(),
            quantity: ze(),
            reference: je().optional(),
            shippingReference: je().optional(),
            totalAmount: ze(),
            totalTaxAmount: ze(),
            unitPrice: ze(),
          })
        ).optional(),
        paymentReference: je().optional(),
        shipping: tt({
          address: gn.optional(),
          recipient: tt({
            attention: je().optional(),
            email: je().optional(),
            familyName: je(),
            givenName: je(),
            phone: je()
              .regex(/^\+\d{1,15}$/)
              .optional(),
          }).optional(),
          shippingReference: je().optional(),
        }).optional(),
        config: tt({ redirectUrl: je().optional() }).optional(),
      })),
    pn = hn.extend({
      currency: je().optional(),
      paymentAmount: ze().optional(),
    }),
    mn = tt({
      interactionMode: nt([
        it(ln.InteractionModes.ON_PAGE),
        it(ln.InteractionModes.DEVICE_BEST),
        it(ln.InteractionModes.REDIRECT),
      ]).optional(),
    }),
    In = tt({
      klarnaUserId: je(),
      givenName: je(),
      familyName: je(),
      email: je(),
      phone: je(),
      phoneVerified: Pe(),
      emailVerified: Pe(),
      address: gn,
      locale: je(),
      dateOfBirth: je(),
      nationalIdentification: tt({ number: je(), country: je() }),
      shipping: bn,
    }).nullable(),
    fn = tt({
      distribution: tt({ url: je() }).partial().nullable(),
      paymentConfirmationToken: je().nullable(),
      paymentAuthorizationId: je().nullable(),
      userAccountProfile: In,
      userAccountLinking: tt({
        userAccountLinkingRefreshToken: je(),
        userAccountLinkingIdToken: je(),
      }).nullable(),
    })
      .partial()
      .nullable(),
    Cn =
      (tt({
        expiresAt: je(),
        paymentRequest: hn
          .extend({ config: tt({ redirectUrl: je().optional() }).optional() })
          .partial()
          .nullable(),
        paymentRequestId: je(),
        previousState: un.optional(),
        state: un,
        stateContext: fn.optional(),
      }),
      tt({
        city: je(),
        country: je().regex(/^[A-Z]{2}$/),
        postal_code: je().optional(),
        region: je().optional(),
        street_address: je(),
        street_address2: je().optional(),
      })),
    yn = tt({
      address: Cn.optional(),
      recipient: tt({
        attention: je().optional(),
        email: je().optional(),
        family_name: je(),
        given_name: je(),
        phone: je().optional(),
      }).optional(),
      shipping_reference: je().optional(),
    }).optional(),
    xn = tt({
      klarna_user_id: je(),
      given_name: je(),
      family_name: je(),
      email: je(),
      phone: je(),
      phone_verified: Pe(),
      email_verified: Pe(),
      address: Cn,
      locale: je(),
      date_of_birth: je(),
      national_identification: tt({ number: je(), country: je() }),
      shipping: yn,
    }).nullable(),
    Gn = tt({
      distribution: tt({ url: je() }).partial().nullable(),
      payment_confirmation_token: je().nullable(),
      payment_authorization_id: je().nullable(),
      user_account_profile: xn,
      user_account_linking: tt({
        user_account_linking_refresh_token: je(),
        user_account_linking_id_token: je(),
      }).nullable(),
    })
      .partial()
      .nullable(),
    An = tt({
      buyer: tt({
        address: Cn.optional(),
        email: je().optional(),
        family_name: je().optional(),
        given_name: je().optional(),
        phone: je().optional(),
      }).optional(),
      currency: je(),
      merchant_reference: je().optional(),
      payment_amount: ze(),
      line_items: et(
        tt({
          image_url: je().optional(),
          name: je(),
          product_identifier: je().optional(),
          product_url: je().optional(),
          quantity: ze(),
          reference: je().optional(),
          shipping_reference: je().optional(),
          total_amount: ze(),
          total_tax_amount: ze(),
          unit_price: ze(),
        })
      ).optional(),
      payment_reference: je().optional(),
      shipping: yn,
      config: tt({ redirect_url: je().optional() }).optional(),
    }),
    vn = tt({
      ...An.shape,
      internal: tt({ effective_ux_mode: je().optional() }),
    }),
    Bn = vn.extend({
      config: tt({ redirect_url: je().optional() }).optional(),
      internal: tt({ effective_ux_mode: je().optional() }).optional(),
      currency: je().optional(),
      payment_amount: ze().optional(),
    }),
    Zn = tt({
      expires_at: je(),
      payment_request: An.extend({
        config: tt({ redirect_url: je().optional() }).optional(),
      })
        .partial()
        .nullable(),
      payment_request_id: je(),
      previous_state: un,
      state: un,
      state_context: Gn,
    }).partial(),
    Qn = {
      paymentApiSetup: {
        data: dn.extend({
          environment: je().optional(),
          sessionId: je().optional(),
          version: je().optional(),
        }),
        response: Pe(),
      },
      paymentApiSendAuthorizationRequest: {
        data: tt({ body: vn, region: je() }),
        response: Zn,
      },
      paymentApiPatchAuthorizationRequest: {
        data: tt({ id: je(), body: Bn, region: je() }),
        response: Zn,
      },
      paymentApiGetAuthorizationRequest: {
        data: tt({ id: je(), region: je() }),
        response: Zn,
      },
      paymentApiCancelConfirmation: {
        data: tt({ paymentConfirmationToken: je(), region: je() }),
        response: Zn,
      },
    },
    wn = tt({ currency: je(), country: je(), paymentAmount: ze().optional() }),
    kn = {
      paymentRequest: {},
      paymentRequestOptions: {},
      paymentRequestState: "CREATED",
    },
    Xn = {
      clear() {
        Object.keys(kn).forEach((e) => {
          delete kn[e];
        });
      },
      set(e, t) {
        kn[e] = t;
      },
      get: (e) => kn[e],
      delete(e) {
        delete kn[e];
      },
      updatePaymentRequest(e) {
        kn.paymentRequest = { ...kn.paymentRequest, ...e };
      },
      updatePaymentRequestOptions(e) {
        kn.paymentRequestOptions = { ...kn.paymentRequestOptions, ...e };
      },
    },
    En = (e) => {
      const t = pn.safeParse(e);
      if (!1 === t.success)
        throw new Wn(dt.INPUT_ERROR, "Invalid PaymentRequest", t.error);
      Xn.updatePaymentRequest(t.data);
    },
    Nn = (e) => {
      const t = mn.safeParse(e);
      if (!1 === t.success)
        throw new Wn(dt.INPUT_ERROR, "Invalid PaymentRequestOptions", t.error);
      Xn.updatePaymentRequestOptions(t.data);
    };
  class Wn extends Error {
    constructor(e, t, n) {
      super(), (this.type = e), (this.message = t), (this.originalError = n);
    }
  }
  function Ln(e, t, n) {
    const i = { type: e, message: t, errorId: E() };
    if (n instanceof Wn) return Ln(n.type, n.message, n.originalError);
    if (n instanceof gt && n.response) {
      const e = n.response;
      e.error_id && (i.errorId = e.error_id),
        e.error_type && (i.type = e.error_type),
        e.error_message && (i.message = e.error_message);
    }
    n instanceof S &&
      (i.fields = n.issues.map((e) => ({
        attribute: e.path.join("."),
        reason: e.message,
      }))),
      St.getInstance().emit(_t.ERROR, i),
      Ut().event(e, {
        error: `ErrorId: ${i.errorId} - ${t}`,
        paymentRequestId: Xn.get("paymentRequestId"),
      }),
      n instanceof gt ||
        (function ({
          errorID: e,
          errorType: t,
          errorMessage: n,
          originalError: i,
        }) {
          const a = rn();
          a.setTag("errorID", e), a.setTag("errorType", t);
          const s = `${t}: ${n}`;
          i
            ? ((i.name = s), a.setExtras({ originalError: i }), a.report(i))
            : a.report(new Error(s));
        })({
          errorID: i.errorId,
          errorMessage: i.message,
          errorType: i.type,
          originalError: n,
        });
  }
  const Fn = {
      getStorageItem: { data: tt({ key: je() }), response: at(je()) },
      setStorageItem: { data: tt({ key: je(), data: je() }), response: qe() },
      removeStorageItem: { data: tt({ key: je() }), response: qe() },
      ...Qn,
    },
    Rn = "klarna-communication-iframe",
    Un = new (class {
      constructor() {
        this.initialized = !1;
      }
      async createTarget(e = "") {
        return new Promise((t, n) => {
          try {
            const n = `${e}backend_bridge_iframe.html`,
              i = document.querySelector(`#${Rn}`);
            i && t({ target: i, src: n });
            const a = document.createElement("iframe");
            (a.src = n),
              (a.id = Rn),
              (a.style.cssText = "display:none!important"),
              document.body.appendChild(a),
              (a.onload = () => t({ target: a, src: n }));
          } catch (e) {
            n(e);
          }
        });
      }
      async init(e) {
        try {
          const { target: t } = await this.createTarget(e.baseUrl);
          (this.messenger = new ot({ source: window, target: t })),
            await this.messenger.initiateHandshake(),
            (this.initialized = !0),
            await this.call({ method: "paymentApiSetup", data: e });
        } catch (e) {
          throw new Error("BackendBridge: init failed");
        }
      }
      async call(e) {
        if (!this.initialized)
          throw new Wn(dt.TECHNICAL_ERROR, "Bridge not initialized");
        const t = Fn[e.method].data.safeParse(e.data);
        if (!1 === t.success)
          throw new Wn(dt.TECHNICAL_ERROR, "Invalid request", t.error);
        return this.messenger
          .postMessageToTarget({ method: e.method, data: t.data })
          .then((t) => {
            const n = Fn[e.method].response.safeParse(t);
            if (!1 === n.success)
              throw new Wn(dt.RESOURCE_ERROR, "Invalid response", n.error);
            return n.data;
          })
          .catch((e) => {
            throw Object.prototype.hasOwnProperty.call(e, "status") &&
              Object.prototype.hasOwnProperty.call(e, "statusText") &&
              Object.prototype.hasOwnProperty.call(e, "response")
              ? new gt(e)
              : new Wn(dt.TECHNICAL_ERROR, "Unexpected error", e);
          });
      }
    })();
  function On(e) {
    const t = "string" == typeof e ? new Error(e) : e;
    rn().report(t);
  }
  const _n = "__klarna_sdk_";
  let Sn = (function (e) {
    return (
      (e.localStorage = "localStorage"),
      (e.sessionStorage = "sessionStorage"),
      (e.klarnaIframeStorage = "klarnaIframeStorage"),
      e
    );
  })({});
  const Dn = (e) => {
      try {
        return (function (e, t = window) {
          if (!t?.sessionStorage)
            throw new Error(`client does not support ${Sn.sessionStorage}`);
          const n = () => JSON.parse(t.sessionStorage.getItem(e) || "{}"),
            i = {
              get: (e) => {
                const t = n(),
                  i = t?.[e];
                return i || null;
              },
              set: (i, a) => {
                const s = n();
                return (
                  null === a ? delete s[i] : (s[i] = a),
                  t.sessionStorage.setItem(e, JSON.stringify(s))
                );
              },
              remove: (e) => i.set(e, null),
              flush: () => t.sessionStorage.removeItem(e),
            };
          return i;
        })(`${_n}${e}`);
      } catch {
        On("Storage type: sessionStorage not supported");
      }
    },
    Yn = Dn("identity-api"),
    Tn = "klarna-sign-in-code-verifier",
    Vn = "klarna-sign-in-nonce",
    Hn = "klarna-sign-in-state",
    Jn = "klarna-sign-in-session-id",
    Mn = "klarna-sign-in-button-configurations";
  var jn = a(562);
  const zn = () => {
      const e = (0, jn.UAParser)(window.navigator.userAgent);
      return {
        browserName: e.browser.name,
        browserVersion: e.browser.version,
        osName: e.os.name,
        osVersion: e.os.version,
        deviceModel: e.device.model,
        deviceType: e.device.type,
        deviceVendor: e.device.vendor,
        engineName: e.engine.name,
        engineVersion: e.engine.version,
        userAgent: e.ua,
      };
    },
    Pn = i.identitySdk;
  class $n {
    static getInstance() {
      return (
        $n.instance ||
          (($n.instance = new $n()), ($n.instance.tracker = y(Pn))),
        $n.instance
      );
    }
    configure = (e, t, n, i) => {
      this.tracker.configure({
        options: {
          client: Pn,
          clientVersion: "v1",
          sessionId: e,
          baseUrl: i.url,
        },
        data: {
          clientId: t,
          environment: n,
          sdk: "websdk",
          commonData: { ...zn(), sessionId: e },
        },
        instanceId: Pn,
      });
    };
    sendEvent({ name: e, options: t }) {
      this.tracker.event(e, {}, t);
    }
  }
  class qn extends Error {}
  const Kn = (e, { errorTitle: t, ...n }) => {
    (async (e) => {
      if (e instanceof Error) return e;
      if (
        "object" == typeof e &&
        null !== e &&
        "message" in e &&
        "string" == typeof e.message
      )
        return new Error(e.message);
      if (
        e &&
        "object" == typeof e &&
        "json" in e &&
        "bodyUsed" in e &&
        "function" == typeof e.json
      )
        try {
          return e.bodyUsed && "body" in e
            ? new Error(Buffer.from(e.body).toString("utf-8"))
            : new Error(JSON.stringify(await e.json()));
        } catch (e) {
          return e;
        }
      try {
        return new Error(JSON.stringify(e));
      } catch {
        return new Error(String(e));
      }
    })(e).then((e) => {
      if (e instanceof qn) e.message;
      else {
        {
          const i = rn(),
            a = Yn.get(Jn);
          n && i.setExtras(n),
            i.setExtra("errorTitle", t),
            i.setExtra("sessionId", a),
            i.report(e),
            $n
              .getInstance()
              .sendEvent({
                name: "unexpected_error",
                options: { errorTitle: t, funnelId: a },
              });
        }
        e.message;
      }
    });
  };
  class ei extends Ot {
    constructor() {
      super();
    }
    static getInstance() {
      return ei.instance || (ei.instance = new ei()), ei.instance;
    }
  }
  const ti = ei;
  let ni = (function (e) {
      return (
        (e.DA = "da"),
        (e.DE = "de"),
        (e.EN = "en"),
        (e.ES = "es"),
        (e.FI = "fi"),
        (e.FR = "fr"),
        (e.IT = "it"),
        (e.NL = "nl"),
        (e.NB = "nb"),
        (e.PL = "pl"),
        (e.PT = "pt"),
        (e.SV = "sv"),
        e
      );
    })({}),
    ii = (function (e) {
      return (
        (e.PayWith = "pay_with"),
        (e.ContinueWith = "continue_with"),
        (e.OverlayContentText = "overlay_content_text"),
        (e.OverlayContentButtonLabel = "overlay_content_button_label"),
        e
      );
    })({});
  const ai = (e) => Object.values(ni).includes(e),
    si = (e) => e.substring(0, 2)?.toLowerCase(),
    ri = () => {
      const e = window.navigator.language,
        t = Xt();
      if (t) {
        const e = si(t);
        if (ai(e)) return e;
      }
      if (e) {
        const t = si(e);
        if (ai(t)) return t;
      }
      return ni.EN;
    },
    oi = (e, t) => {
      let n = 0;
      return e.split(/{{?([a-zA-Z]+ )?[a-z]+.[a-z]*}}/).map((e) => {
        if (void 0 === e) {
          const e = t?.[n];
          return n++, e;
        }
        return e;
      });
    },
    ci = {
      [ii.ContinueWith]: {
        [ni.DA]: "Fortsæt med {{klarna}}",
        [ni.DE]: "Weiter mit {{klarna}}",
        [ni.EN]: "Continue with {{klarna}}",
        [ni.ES]: "Continuar con {{klarna}}",
        [ni.FI]: "Jatka Klarnalla",
        [ni.FR]: "Continuer avec {{klarna}}",
        [ni.IT]: "Continua con {{klarna}}",
        [ni.NL]: "Verdergaan met {{klarna}}",
        [ni.NB]: "Fortsett med {{klarna}}",
        [ni.PL]: "Kontynuuj z {{klarna}}",
        [ni.PT]: "Continuar com {{klarna}}",
        [ni.SV]: "Fortsätt med {{klarna}}",
      },
      [ii.PayWith]: {
        [ni.DA]: "Betal med {{klarna}}",
        [ni.DE]: "Bezahlen mit {{klarna}}",
        [ni.EN]: "Pay with {{klarna}}",
        [ni.ES]: "Pagar con {{klarna}}",
        [ni.FI]: "Maksa käyttäen {{klarna}}",
        [ni.FR]: "Payer avec {{klarna}}",
        [ni.IT]: "Paga con {{klarna}}",
        [ni.NL]: "Betalen met {{klarna}}",
        [ni.NB]: "Betal med {{klarna}}",
        [ni.PL]: "Zapłać za pomocą {{klarna}}",
        [ni.PT]: "Pagar com {{klarna}}",
        [ni.SV]: "Betala med {{klarna}}",
      },
      [ii.OverlayContentText]: {
        [ni.DA]:
          "Ser du ikke Klarna-vinduet? Vi hjælper dig med at åbne det for at fuldføre din tilmelding.",
        [ni.DE]:
          "Sie sehen das Klarna-Fenster nicht? Wir helfen Ihnen dabei, es zu öffnen, um Ihre Anmeldung abzuschließen.",
        [ni.EN]:
          "Don't see the Klarna window? We'll help you open it to complete your sign in.",
        [ni.ES]:
          "¿No ves la ventana de Klarna? Te ayudaremos a abrirla para completar tu inicio de sesión.",
        [ni.FI]:
          "Et näe Klarnan ikkunaa? Autamme sinua avaamaan sen ja kirjautumaan sisään.",
        [ni.FR]:
          "Vous ne voyez pas la fenêtre Klarna ? Nous vous aiderons à l'ouvrir pour finaliser votre connexion.",
        [ni.IT]:
          "Non vedi la finestra di Klarna? Ti aiuteremo ad aprirla per completare l'accesso.",
        [ni.NL]:
          "Zie je het Klarna-venster niet? We helpen je het te openen om je aanmelding te voltooien.",
        [ni.NB]:
          "Ser du ikke Klarna-vinduet? Vi hjelper deg med å åpne det for å fullføre innloggingen din.",
        [ni.PL]:
          "Nie widzisz okna Klarna? Pomożemy je otworzyć, aby zakończyć proces logowania.",
        [ni.PT]:
          "Não está vendo a janela do Klarna? Vamos ajudar a abri-la para concluir seu login.",
        [ni.SV]:
          "Öppnas inte Klarnas fönster automatiskt? Klicka här så hjälper vi dig att logga in.",
      },
      [ii.OverlayContentButtonLabel]: {
        [ni.DA]: "Fortsæt",
        [ni.DE]: "Weiter",
        [ni.EN]: "Continue",
        [ni.ES]: "Continuar",
        [ni.FI]: "Jatka",
        [ni.FR]: "Continuer",
        [ni.IT]: "Continua",
        [ni.NL]: "Doorgaan",
        [ni.NB]: "Fortsett",
        [ni.PL]: "Kontynuuj",
        [ni.PT]: "Continuar",
        [ni.SV]: "Fortsätt",
      },
    },
    li = (e, { locale: t, params: n } = {}) => {
      const i = t || ri();
      let a = ci[e][i];
      return n && a && (a = oi(a, n).join("")), a;
    };
  let di = (function (e) {
    return (
      (e.CHECKOUT = "checkout"),
      (e.CONTINUE = "continue"),
      (e.CONNECT = "connect"),
      (e.DONATE = "donate"),
      (e.SIGNIN = "signin"),
      (e.SIGNUP = "signup"),
      (e.SUBSCRIBE = "subscribe"),
      (e.PAY = "pay"),
      e
    );
  })({});
  var ui = a(8091),
    gi = a(5542);
  const bi = ui.qy`<svg viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.8039 0.304688H9.94258C9.94258 3.46943 8.48749 6.37417 5.95055 8.27456L4.42074 9.42023L10.3482 17.5029H15.2217L9.7677 10.0657C12.353 7.49125 13.8039 4.02786 13.8039 0.304688ZM17.839 13.3736C19.0325 13.3736 20 14.3411 20 15.5346C20 16.7281 19.0325 17.6957 17.839 17.6957C16.6455 17.6957 15.678 16.7281 15.678 15.5346C15.678 14.3411 16.6455 13.3736 17.839 13.3736ZM3.94903 0.304688V17.5029H0V0.304688H3.94903Z"
  />
</svg>`,
    hi = ui.AH`:root{--current-gap: 0px}:host{width:335px;height:48px;display:inline-block}#klarna-identity-button{container-type:inline-size;container-name:identity-button-content;position:relative;height:inherit;width:inherit;min-height:35px;max-height:60px;padding:0;outline:none;border:0;margin:0;background-color:rgba(0,0,0,0)}#klarna-identity-button:focus #klarna-identity-button__outline{position:absolute;inset:-4px;border:2px solid #0d0e0f;border-radius:8px;min-height:inherit;max-height:64px;margin:auto 0}#klarna-identity-button #klarna-identity-button__inner-container{display:inline-block;min-height:inherit;max-height:inherit;min-width:min-content;width:inherit;height:inherit;cursor:pointer;transition:background-color .2s ease;box-sizing:border-box;border-radius:8px}#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text{font-family:"-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Arial","sans-serif";font-weight:500;height:inherit;font-size:16px;opacity:1;transition:color .2s ease;text-rendering:optimizeLegibility;white-space:nowrap;max-height:inherit;min-height:inherit;position:relative;display:flex;justify-content:center;align-items:center;--current-gap: 14px;gap:var(--current-gap);margin:0 var(--current-gap) 0 var(--current-gap)}#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text #logo{width:20px;height:20px}#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#0e0e0f;width:inherit;height:inherit}#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text #copy{flex:1 1 0%;margin-right:calc(var(--current-gap) + 20px)}#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text #copy--center{flex:0 1 0%}#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text #copy--right{flex:1 1 0%;margin-left:calc(var(--current-gap) + 20px)}@container identity-button-content (width < 250px){#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text{font-size:12px;--current-gap: 8px}}@container identity-button-content (width < 195px){#klarna-identity-button #klarna-identity-button__inner-container #klarna-identity-button__text #copy{font-size:12px;margin-right:0px}}#klarna-identity-button.theme-light #klarna-identity-button__inner-container{color:#0e0e0f;background-color:#fff;border:1px solid #0e0e0f}#klarna-identity-button.theme-light #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#0e0e0f}#klarna-identity-button.theme-light:hover #klarna-identity-button__inner-container{background-color:#f1f1f1;color:#333536}#klarna-identity-button.theme-light:hover #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#333536}#klarna-identity-button.theme-light:focus #klarna-identity-button__outline{inset:-5px}#klarna-identity-button.theme-light:focus #klarna-identity-button__outline #klarna-identity-button__text #logo svg{fill:#0d0e0f}#klarna-identity-button.theme-light:active #klarna-identity-button__inner-container{background-color:#e2e2e2;color:#0d0e0f}#klarna-identity-button.theme-default #klarna-identity-button__inner-container{color:#0e0e0f;background-color:#ffb3c7;border:none}#klarna-identity-button.theme-default #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#0e0e0f}#klarna-identity-button.theme-default:hover #klarna-identity-button__inner-container{background-color:#f0a5b7;color:#333536}#klarna-identity-button.theme-default:hover #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#333536}#klarna-identity-button.theme-default:active #klarna-identity-button__inner-container{background-color:#feb3c7;color:#0d0e0f}#klarna-identity-button.theme-default:active #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#0d0e0f}#klarna-identity-button.theme-dark #klarna-identity-button__inner-container{color:#fff;background-color:#0e0e0f;border:none}#klarna-identity-button.theme-dark #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#fff}#klarna-identity-button.theme-dark:hover #klarna-identity-button__inner-container{background-color:#333536;color:#f1f1f1}#klarna-identity-button.theme-dark:hover #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#f1f1f1}#klarna-identity-button.theme-dark:active #klarna-identity-button__inner-container{background-color:#0d0e0f;color:#e2e2e2}#klarna-identity-button.theme-dark:active #klarna-identity-button__inner-container #klarna-identity-button__text #logo svg{fill:#e2e2e2}#klarna-identity-button.shape-rect #klarna-identity-button__inner-container{border-radius:0}#klarna-identity-button.shape-rect:focus #klarna-identity-button__outline{border-radius:0}#klarna-identity-button.shape-pill #klarna-identity-button__inner-container{border-radius:35px}#klarna-identity-button.shape-pill:focus #klarna-identity-button__outline{border-radius:35px}#klarna-identity-button.copy-default-en{min-width:165px}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1pZGVudGl0eS9zcmMva2xhcm5hSWRlbnRpdHlCdXR0b24vc3R5bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QkEsTUFDRSxrQkFBQSxDQUtGLE1BQ0UsV0FBQSxDQUNBLFdBQUEsQ0FDQSxvQkFBQSxDQUlGLHdCQUNFLDBCQUFBLENBQ0Esc0NBQUEsQ0FDQSxpQkFBQSxDQUNBLGNBQUEsQ0FDQSxhQUFBLENBQ0EsZUFBQSxDQUNBLGVBQUEsQ0FDQSxTQUFBLENBQ0EsWUFBQSxDQUNBLFFBQUEsQ0FDQSxRQUFBLENBQ0EsOEJBQUEsQ0FHRSwrREFDRSxpQkFBQSxDQUNBLFVBQUEsQ0FDQSx3QkFBQSxDQUNBLGlCQXBDVyxDQXFDWCxrQkFBQSxDQUNBLGVBQUEsQ0FDQSxhQUFBLENBSUosaUVBQ0Usb0JBQUEsQ0FDQSxrQkFBQSxDQUNBLGtCQUFBLENBQ0EscUJBQUEsQ0FDQSxhQUFBLENBQ0EsY0FBQSxDQUNBLGNBQUEsQ0FDQSxvQ0FBQSxDQUNBLHFCQUFBLENBQ0EsaUJBckRhLENBdURiLCtGQUNFLHlGQUFBLENBRUEsZUFBQSxDQUNBLGNBQUEsQ0FDQSxjQUFBLENBQ0EsU0FBQSxDQUNBLHlCQUFBLENBQ0EsaUNBQUEsQ0FDQSxrQkFBQSxDQUNBLGtCQUFBLENBQ0Esa0JBQUEsQ0FDQSxpQkFBQSxDQUNBLFlBQUEsQ0FDQSxzQkFBQSxDQUNBLGtCQUFBLENBQ0EsbUJBQUEsQ0FDQSxzQkFBQSxDQUNBLGdEQUFBLENBRUEscUdBQ0UsVUFBQSxDQUNBLFdBQUEsQ0FFQSx5R0FDRSxZQS9GTSxDQWdHTixhQUFBLENBQ0EsY0FBQSxDQUlKLHFHQUNFLFdBQUEsQ0FDQSw0Q0FBQSxDQUVBLDZHQUNFLFdBQUEsQ0FHRiw0R0FDRSxXQUFBLENBQ0EsMkNBQUEsQ0FRVixtREFHTSwrRkFDRSxjQUFBLENBQ0Esa0JBQUEsQ0FBQSxDQU1SLG1EQUlRLHFHQUNFLGNBQUEsQ0FDQSxnQkFBQSxDQUFBLENBU1IsNkVBQ0UsYUFsSlksQ0FtSloscUJBeklZLENBMElaLHdCQUFBLENBSUkscUhBQ0UsWUF6Sk0sQ0FnS1osbUZBQ0Usd0JBdEpRLENBdUpSLGFBaktRLENBcUtKLDJIQUNFLFlBdEtFLENBOEtWLDJFQUNFLFVBQUEsQ0FJSSxtSEFDRSxZQW5MRyxDQTJMWCxvRkFDRSx3QkFsTFMsQ0FtTFQsYUE3TFMsQ0FtTWIsK0VBQ0UsYUF0TVksQ0F1TVosd0JBbE1XLENBbU1YLFdBQUEsQ0FJSSx1SEFDRSxZQTdNTSxDQW9OWixxRkFDRSx3QkEvTU8sQ0FnTlAsYUFyTlEsQ0F5TkosNkhBQ0UsWUExTkUsQ0FrT1Ysc0ZBQ0Usd0JBN05RLENBOE5SLGFBbk9TLENBdU9MLDhIQUNFLFlBeE9HLENBaVBiLDRFQUNFLFVBMU9ZLENBMk9aLHdCQXJQWSxDQXNQWixXQUFBLENBSUksb0hBQ0UsU0FqUE0sQ0F3UFosa0ZBQ0Usd0JBbFFRLENBbVFSLGFBelBRLENBNlBKLDBIQUNFLFlBOVBFLENBc1FWLG1GQUNFLHdCQWhSUyxDQWlSVCxhQXZRUyxDQTJRTCwySEFDRSxZQTVRRyxDQXNSYiw0RUFDRSxlQW5SVSxDQXNSWiwwRUFDRSxlQXZSVSxDQTRSWiw0RUFDRSxrQkE1UlUsQ0ErUlosMEVBQ0Usa0JBaFNVLENBcVNkLHdDQUNFLGVBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBWYXJpYWJsZXMgZm9yIGVhc2Ugb2YgY2hhbmdlXG5cbi8vIENvbG9yc1xuXG4vLyBCbGFja1xuJHJlZ3VsYXJfYmxhY2s6ICMwZTBlMGY7XG4kaG92ZXJfYmxhY2s6ICMzMzM1MzY7XG4kYWN0aXZlX2JsYWNrOiAjMGQwZTBmO1xuXG4vLyBQaW5rXG4kcmVndWxhcl9waW5rOiAjZmZiM2M3O1xuJGhvdmVyX3Bpbms6ICNmMGE1Yjc7XG4kYWN0aXZlX3Bpbms6ICNmZWIzYzc7IC8vIFRPRE86IEdldCBwcm9wZXIgY29sb3JcblxuLy8gV2hpdGVcbiRyZWd1bGFyX3doaXRlOiAjZmZmZmZmO1xuJGhvdmVyX3doaXRlOiAjZjFmMWYxO1xuJGFjdGl2ZV93aGl0ZTogI2UyZTJlMjtcblxuLy8gU2hhcGVcbiRyYWRpdXNfZGVmYXVsdDogOHB4O1xuJHJhZGl1c19yZWN0OiAwO1xuJHJhZGl1c19waWxsOiAzNXB4O1xuXG46cm9vdCB7XG4gIC0tY3VycmVudC1nYXA6IDBweDtcbn1cblxuLy8gSGVyZSB3ZSBzZXQgdGhlIGtsYXJuYS1pZGVudGl0eS1idXR0b24gY29udGFpbmVyIHRvIGhhdmUgaXRzIGRlZmF1bHQgaGVpZ2h0IGFuZCB3aWR0aC5cbi8vIE1lcmNoYW50cyBjYW4gb3ZlcndyaXRlIHRob3NlIHN0eWxlcyBieSBkZWZpbmluZyBhIG1vcmUgc3BlY2lmaWMgc2VsZWN0b3IsIGUuZy4gYSBjbGFzc1xuOmhvc3Qge1xuICB3aWR0aDogMzM1cHg7XG4gIGhlaWdodDogNDhweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4vLyBEZWZhdWx0IEJ1dHRvblxuI2tsYXJuYS1pZGVudGl0eS1idXR0b24ge1xuICBjb250YWluZXItdHlwZTogaW5saW5lLXNpemU7XG4gIGNvbnRhaW5lci1uYW1lOiBpZGVudGl0eS1idXR0b24tY29udGVudDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIHdpZHRoOiBpbmhlcml0O1xuICBtaW4taGVpZ2h0OiAzNXB4O1xuICBtYXgtaGVpZ2h0OiA2MHB4O1xuICBwYWRkaW5nOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IDA7XG4gIG1hcmdpbjogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgJjpmb2N1cyB7XG4gICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX291dGxpbmUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgaW5zZXQ6IC00cHg7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAkYWN0aXZlX2JsYWNrO1xuICAgICAgYm9yZGVyLXJhZGl1czogJHJhZGl1c19kZWZhdWx0O1xuICAgICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICAgIG1heC1oZWlnaHQ6IDY0cHg7XG4gICAgICBtYXJnaW46IGF1dG8gMDtcbiAgICB9XG4gIH1cblxuICAja2xhcm5hLWlkZW50aXR5LWJ1dHRvbl9faW5uZXItY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBtYXgtaGVpZ2h0OiBpbmhlcml0O1xuICAgIG1pbi13aWR0aDogbWluLWNvbnRlbnQ7XG4gICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJvcmRlci1yYWRpdXM6ICRyYWRpdXNfZGVmYXVsdDtcblxuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX190ZXh0IHtcbiAgICAgIGZvbnQtZmFtaWx5OiAnLWFwcGxlLXN5c3RlbScsICdCbGlua01hY1N5c3RlbUZvbnQnLCAnU2Vnb2UgVUknLCAnUm9ib3RvJywgJ0FyaWFsJyxcbiAgICAgICAgJ3NhbnMtc2VyaWYnO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2U7XG4gICAgICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIG1heC1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIC0tY3VycmVudC1nYXA6IDE0cHg7XG4gICAgICBnYXA6IHZhcigtLWN1cnJlbnQtZ2FwKTtcbiAgICAgIG1hcmdpbjogMCB2YXIoLS1jdXJyZW50LWdhcCkgMCB2YXIoLS1jdXJyZW50LWdhcCk7XG5cbiAgICAgICNsb2dvIHtcbiAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgIGhlaWdodDogMjBweDtcblxuICAgICAgICBzdmcge1xuICAgICAgICAgIGZpbGw6ICRyZWd1bGFyX2JsYWNrO1xuICAgICAgICAgIHdpZHRoOiBpbmhlcml0O1xuICAgICAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAjY29weSB7XG4gICAgICAgIGZsZXg6IDEgMSAwJTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBjYWxjKHZhcigtLWN1cnJlbnQtZ2FwKSArIDIwcHgpO1xuXG4gICAgICAgICYtLWNlbnRlciB7XG4gICAgICAgICAgZmxleDogMCAxIDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgJi0tcmlnaHQge1xuICAgICAgICAgIGZsZXg6IDEgMSAwJTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1jdXJyZW50LWdhcCkgKyAyMHB4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBCcmVha3BvaW50XG5AY29udGFpbmVyIGlkZW50aXR5LWJ1dHRvbi1jb250ZW50ICh3aWR0aCA8IDI1MHB4KSB7XG4gICNrbGFybmEtaWRlbnRpdHktYnV0dG9uIHtcbiAgICAja2xhcm5hLWlkZW50aXR5LWJ1dHRvbl9faW5uZXItY29udGFpbmVyIHtcbiAgICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX190ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAtLWN1cnJlbnQtZ2FwOiA4cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBjb250YWluZXIgaWRlbnRpdHktYnV0dG9uLWNvbnRlbnQgKHdpZHRoIDwgMTk1cHgpIHtcbiAgI2tsYXJuYS1pZGVudGl0eS1idXR0b24ge1xuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX3RleHQge1xuICAgICAgICAjY29weSB7XG4gICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFRoZW1lXG4ja2xhcm5hLWlkZW50aXR5LWJ1dHRvbi50aGVtZS1saWdodCB7XG4gICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgIGNvbG9yOiAkcmVndWxhcl9ibGFjaztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVndWxhcl93aGl0ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkcmVndWxhcl9ibGFjaztcblxuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX190ZXh0IHtcbiAgICAgICNsb2dvIHtcbiAgICAgICAgc3ZnIHtcbiAgICAgICAgICBmaWxsOiAkcmVndWxhcl9ibGFjaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICY6aG92ZXIge1xuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGhvdmVyX3doaXRlO1xuICAgICAgY29sb3I6ICRob3Zlcl9ibGFjaztcblxuICAgICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX3RleHQge1xuICAgICAgICAjbG9nbyB7XG4gICAgICAgICAgc3ZnIHtcbiAgICAgICAgICAgIGZpbGw6ICRob3Zlcl9ibGFjaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmOmZvY3VzIHtcbiAgICAja2xhcm5hLWlkZW50aXR5LWJ1dHRvbl9fb3V0bGluZSB7XG4gICAgICBpbnNldDogLTVweDtcblxuICAgICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX3RleHQge1xuICAgICAgICAjbG9nbyB7XG4gICAgICAgICAgc3ZnIHtcbiAgICAgICAgICAgIGZpbGw6ICRhY3RpdmVfYmxhY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJjphY3RpdmUge1xuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGl2ZV93aGl0ZTtcbiAgICAgIGNvbG9yOiAkYWN0aXZlX2JsYWNrO1xuICAgIH1cbiAgfVxufVxuXG4ja2xhcm5hLWlkZW50aXR5LWJ1dHRvbi50aGVtZS1kZWZhdWx0IHtcbiAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX2lubmVyLWNvbnRhaW5lciB7XG4gICAgY29sb3I6ICRyZWd1bGFyX2JsYWNrO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRyZWd1bGFyX3Bpbms7XG4gICAgYm9yZGVyOiBub25lO1xuXG4gICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX3RleHQge1xuICAgICAgI2xvZ28ge1xuICAgICAgICBzdmcge1xuICAgICAgICAgIGZpbGw6ICRyZWd1bGFyX2JsYWNrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX2lubmVyLWNvbnRhaW5lciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaG92ZXJfcGluaztcbiAgICAgIGNvbG9yOiAkaG92ZXJfYmxhY2s7XG5cbiAgICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX190ZXh0IHtcbiAgICAgICAgI2xvZ28ge1xuICAgICAgICAgIHN2ZyB7XG4gICAgICAgICAgICBmaWxsOiAkaG92ZXJfYmxhY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJjphY3RpdmUge1xuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGl2ZV9waW5rO1xuICAgICAgY29sb3I6ICRhY3RpdmVfYmxhY2s7XG5cbiAgICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX190ZXh0IHtcbiAgICAgICAgI2xvZ28ge1xuICAgICAgICAgIHN2ZyB7XG4gICAgICAgICAgICBmaWxsOiAkYWN0aXZlX2JsYWNrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4ja2xhcm5hLWlkZW50aXR5LWJ1dHRvbi50aGVtZS1kYXJrIHtcbiAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX2lubmVyLWNvbnRhaW5lciB7XG4gICAgY29sb3I6ICRyZWd1bGFyX3doaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRyZWd1bGFyX2JsYWNrO1xuICAgIGJvcmRlcjogbm9uZTtcblxuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX190ZXh0IHtcbiAgICAgICNsb2dvIHtcbiAgICAgICAgc3ZnIHtcbiAgICAgICAgICBmaWxsOiAkcmVndWxhcl93aGl0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICY6aG92ZXIge1xuICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGhvdmVyX2JsYWNrO1xuICAgICAgY29sb3I6ICRob3Zlcl93aGl0ZTtcblxuICAgICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX3RleHQge1xuICAgICAgICAjbG9nbyB7XG4gICAgICAgICAgc3ZnIHtcbiAgICAgICAgICAgIGZpbGw6ICRob3Zlcl93aGl0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX2lubmVyLWNvbnRhaW5lciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWN0aXZlX2JsYWNrO1xuICAgICAgY29sb3I6ICRhY3RpdmVfd2hpdGU7XG5cbiAgICAgICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX190ZXh0IHtcbiAgICAgICAgI2xvZ28ge1xuICAgICAgICAgIHN2ZyB7XG4gICAgICAgICAgICBmaWxsOiAkYWN0aXZlX3doaXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBTaGFwZVxuI2tsYXJuYS1pZGVudGl0eS1idXR0b24uc2hhcGUtcmVjdCB7XG4gICNrbGFybmEtaWRlbnRpdHktYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgIGJvcmRlci1yYWRpdXM6ICRyYWRpdXNfcmVjdDtcbiAgfVxuXG4gICY6Zm9jdXMgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX291dGxpbmUge1xuICAgIGJvcmRlci1yYWRpdXM6ICRyYWRpdXNfcmVjdDtcbiAgfVxufVxuXG4ja2xhcm5hLWlkZW50aXR5LWJ1dHRvbi5zaGFwZS1waWxsIHtcbiAgI2tsYXJuYS1pZGVudGl0eS1idXR0b25fX2lubmVyLWNvbnRhaW5lciB7XG4gICAgYm9yZGVyLXJhZGl1czogJHJhZGl1c19waWxsO1xuICB9XG5cbiAgJjpmb2N1cyAja2xhcm5hLWlkZW50aXR5LWJ1dHRvbl9fb3V0bGluZSB7XG4gICAgYm9yZGVyLXJhZGl1czogJHJhZGl1c19waWxsO1xuICB9XG59XG5cbi8vIENvcHlcbiNrbGFybmEtaWRlbnRpdHktYnV0dG9uLmNvcHktZGVmYXVsdC1lbiB7XG4gIG1pbi13aWR0aDogMTY1cHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */`;
  function pi(e) {
    var t = (function (e, t) {
      if ("object" != typeof e || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var i = n.call(e, "string");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == typeof t ? t : t + "";
  }
  function mi(e, t, n) {
    "symbol" == typeof t && (t = (t = t.description) ? "[" + t + "]" : "");
    try {
      Object.defineProperty(e, "name", {
        configurable: !0,
        value: n ? n + " " + t : t,
      });
    } catch (e) {}
    return e;
  }
  function Ii(e) {
    if (Object(e) !== e)
      throw TypeError(
        "right-hand side of 'in' should be an object, got " +
          (null !== e ? typeof e : "null")
      );
    return e;
  }
  const fi = {
      OVERLAY: !0,
      SHAPE: Ct.DEFAULT,
      THEME: ft.DEFAULT,
      LOGO: "left",
      LABEL: di.CONTINUE,
    },
    Ci = mt.IDENTITY_BUTTON;
  var yi = a(382),
    xi = a.n(yi);
  let Gi;
  function Ai(e, t) {
    if (null == e) return !1;
    try {
      return (
        e instanceof t ||
        Object.getPrototypeOf(e)[Symbol.toStringTag] ===
          t.prototype[Symbol.toStringTag]
      );
    } catch {
      return !1;
    }
  }
  ("undefined" != typeof navigator &&
    navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) ||
    (Gi = "oauth4webapi/v2.10.4");
  const vi = Symbol(),
    Bi = Symbol(),
    Zi = Symbol(),
    Qi = Symbol(),
    wi = new TextEncoder(),
    ki = new TextDecoder();
  function Xi(e) {
    return "string" == typeof e ? wi.encode(e) : ki.decode(e);
  }
  const Ei = 32768;
  function Ni(e) {
    return "string" == typeof e
      ? (function (e) {
          try {
            const t = atob(
                e.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")
              ),
              n = new Uint8Array(t.length);
            for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
            return n;
          } catch (e) {
            throw new Fi("The input to be decoded is not correctly encoded.", {
              cause: e,
            });
          }
        })(e)
      : (function (e) {
          e instanceof ArrayBuffer && (e = new Uint8Array(e));
          const t = [];
          for (let n = 0; n < e.byteLength; n += Ei)
            t.push(String.fromCharCode.apply(null, e.subarray(n, n + Ei)));
          return btoa(t.join(""))
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
        })(e);
  }
  class Wi extends Error {
    constructor(e) {
      super(e ?? "operation not supported"),
        (this.name = this.constructor.name),
        Error.captureStackTrace?.(this, this.constructor);
    }
  }
  class Li extends Error {
    constructor(e, t) {
      super(e, t),
        (this.name = this.constructor.name),
        Error.captureStackTrace?.(this, this.constructor);
    }
  }
  const Fi = Li,
    Ri = new (class {
      constructor(e) {
        (this.cache = new Map()), (this._cache = new Map()), (this.maxSize = e);
      }
      get(e) {
        let t = this.cache.get(e);
        return (
          t || ((t = this._cache.get(e)) ? (this.update(e, t), t) : void 0)
        );
      }
      has(e) {
        return this.cache.has(e) || this._cache.has(e);
      }
      set(e, t) {
        return (
          this.cache.has(e) ? this.cache.set(e, t) : this.update(e, t), this
        );
      }
      delete(e) {
        return this.cache.has(e)
          ? this.cache.delete(e)
          : !!this._cache.has(e) && this._cache.delete(e);
      }
      update(e, t) {
        this.cache.set(e, t),
          this.cache.size >= this.maxSize &&
            ((this._cache = this.cache), (this.cache = new Map()));
      }
    })(100);
  function Ui(e) {
    return e instanceof CryptoKey;
  }
  function Oi(e) {
    return Ui(e) && "private" === e.type;
  }
  function _i(e) {
    try {
      const t = e.headers.get("dpop-nonce");
      t && Ri.set(new URL(e.url).origin, t);
    } catch {}
    return e;
  }
  function Si(e) {
    return null !== e && "object" == typeof e && !Array.isArray(e);
  }
  function Di(e) {
    Ai(e, Headers) && (e = Object.fromEntries(e.entries()));
    const t = new Headers(e);
    if (
      (Gi && !t.has("user-agent") && t.set("user-agent", Gi),
      t.has("authorization"))
    )
      throw new TypeError(
        '"options.headers" must not include the "authorization" header name'
      );
    if (t.has("dpop"))
      throw new TypeError(
        '"options.headers" must not include the "dpop" header name'
      );
    return t;
  }
  function Yi(e) {
    if (("function" == typeof e && (e = e()), !(e instanceof AbortSignal)))
      throw new TypeError(
        '"options.signal" must return or be an instance of AbortSignal'
      );
    return e;
  }
  function Ti(e) {
    return "string" == typeof e && 0 !== e.length;
  }
  function Vi() {
    return Ni(crypto.getRandomValues(new Uint8Array(32)));
  }
  function Hi(e) {
    return encodeURIComponent(e).replace(/%20/g, "+");
  }
  function Ji(e) {
    switch (e.algorithm.name) {
      case "RSA-PSS":
        return (function (e) {
          switch (e.algorithm.hash.name) {
            case "SHA-256":
              return "PS256";
            case "SHA-384":
              return "PS384";
            case "SHA-512":
              return "PS512";
            default:
              throw new Wi("unsupported RsaHashedKeyAlgorithm hash name");
          }
        })(e);
      case "RSASSA-PKCS1-v1_5":
        return (function (e) {
          switch (e.algorithm.hash.name) {
            case "SHA-256":
              return "RS256";
            case "SHA-384":
              return "RS384";
            case "SHA-512":
              return "RS512";
            default:
              throw new Wi("unsupported RsaHashedKeyAlgorithm hash name");
          }
        })(e);
      case "ECDSA":
        return (function (e) {
          switch (e.algorithm.namedCurve) {
            case "P-256":
              return "ES256";
            case "P-384":
              return "ES384";
            case "P-521":
              return "ES512";
            default:
              throw new Wi("unsupported EcKeyAlgorithm namedCurve");
          }
        })(e);
      case "Ed25519":
      case "Ed448":
        return "EdDSA";
      default:
        throw new Wi("unsupported CryptoKey algorithm name");
    }
  }
  function Mi(e) {
    const t = e?.[vi];
    return "number" == typeof t && Number.isFinite(t) ? t : 0;
  }
  function ji(e) {
    const t = e?.[Bi];
    return "number" == typeof t && Number.isFinite(t) && -1 !== Math.sign(t)
      ? t
      : 30;
  }
  function zi() {
    return Math.floor(Date.now() / 1e3);
  }
  function Pi(e) {
    if ("object" != typeof e || null === e)
      throw new TypeError('"as" must be an object');
    if (!Ti(e.issuer))
      throw new TypeError('"as.issuer" property must be a non-empty string');
    return !0;
  }
  function $i(e) {
    if ("object" != typeof e || null === e)
      throw new TypeError('"client" must be an object');
    if (!Ti(e.client_id))
      throw new TypeError(
        '"client.client_id" property must be a non-empty string'
      );
    return !0;
  }
  function qi(e) {
    if (!Ti(e))
      throw new TypeError(
        '"client.client_secret" property must be a non-empty string'
      );
    return e;
  }
  function Ki(e, t) {
    if (void 0 !== t)
      throw new TypeError(
        `"options.clientPrivateKey" property must not be provided when ${e} client authentication method is used.`
      );
  }
  function ea(e, t) {
    if (void 0 !== t)
      throw new TypeError(
        `"client.client_secret" property must not be provided when ${e} client authentication method is used.`
      );
  }
  async function ta(e, t, n, i, a) {
    switch (
      (n.delete("client_secret"),
      n.delete("client_assertion_type"),
      n.delete("client_assertion"),
      t.token_endpoint_auth_method)
    ) {
      case void 0:
      case "client_secret_basic":
        Ki("client_secret_basic", a),
          i.set(
            "authorization",
            (function (e, t) {
              const n = Hi(e),
                i = Hi(t);
              return `Basic ${btoa(`${n}:${i}`)}`;
            })(t.client_id, qi(t.client_secret))
          );
        break;
      case "client_secret_post":
        Ki("client_secret_post", a),
          n.set("client_id", t.client_id),
          n.set("client_secret", qi(t.client_secret));
        break;
      case "private_key_jwt": {
        if ((ea("private_key_jwt", t.client_secret), void 0 === a))
          throw new TypeError(
            '"options.clientPrivateKey" must be provided when "client.token_endpoint_auth_method" is "private_key_jwt"'
          );
        const { key: i, kid: s } = (function (e) {
          if (e instanceof CryptoKey) return { key: e };
          if (!(e?.key instanceof CryptoKey)) return {};
          if (void 0 !== e.kid && !Ti(e.kid))
            throw new TypeError('"kid" must be a non-empty string');
          return { key: e.key, kid: e.kid };
        })(a);
        if (!Oi(i))
          throw new TypeError(
            '"options.clientPrivateKey.key" must be a private CryptoKey'
          );
        n.set("client_id", t.client_id),
          n.set(
            "client_assertion_type",
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
          ),
          n.set(
            "client_assertion",
            await (async function (e, t, n, i) {
              return na(
                { alg: Ji(n), kid: i },
                (function (e, t) {
                  const n = zi() + Mi(t);
                  return {
                    jti: Vi(),
                    aud: [e.issuer, e.token_endpoint],
                    exp: n + 60,
                    iat: n,
                    nbf: n,
                    iss: t.client_id,
                    sub: t.client_id,
                  };
                })(e, t),
                n
              );
            })(e, t, i, s)
          );
        break;
      }
      case "tls_client_auth":
      case "self_signed_tls_client_auth":
      case "none":
        ea(t.token_endpoint_auth_method, t.client_secret),
          Ki(t.token_endpoint_auth_method, a),
          n.set("client_id", t.client_id);
        break;
      default:
        throw new Wi("unsupported client token_endpoint_auth_method");
    }
  }
  async function na(e, t, n) {
    if (!n.usages.includes("sign"))
      throw new TypeError(
        'CryptoKey instances used for signing assertions must include "sign" in their "usages"'
      );
    const i = `${Ni(Xi(JSON.stringify(e)))}.${Ni(Xi(JSON.stringify(t)))}`;
    return `${i}.${Ni(await crypto.subtle.sign(ya(n), n, Xi(i)))}`;
  }
  let ia;
  async function aa(e) {
    return (
      ia || (ia = new WeakMap()),
      ia.get(e) ||
        (async function (e) {
          const {
              kty: t,
              e: n,
              n: i,
              x: a,
              y: s,
              crv: r,
            } = await crypto.subtle.exportKey("jwk", e),
            o = { kty: t, e: n, n: i, x: a, y: s, crv: r };
          return ia.set(e, o), o;
        })(e)
    );
  }
  function sa(e, t, n) {
    if ("string" != typeof e) {
      if (n?.[Qi])
        throw new TypeError(`"as.mtls_endpoint_aliases.${t}" must be a string`);
      throw new TypeError(`"as.${t}" must be a string`);
    }
    return new URL(e);
  }
  function ra(e) {
    const t = e;
    return (
      "object" == typeof t &&
      !Array.isArray(t) &&
      null !== t &&
      void 0 !== t.error
    );
  }
  async function oa(e, t, n, i, a) {
    const s = (function (e, t, n) {
      return n?.[Qi] && e.mtls_endpoint_aliases && t in e.mtls_endpoint_aliases
        ? sa(e.mtls_endpoint_aliases[t], t, n)
        : sa(e[t], t);
    })(e, "token_endpoint", a);
    i.set("grant_type", n);
    const r = Di(a?.headers);
    return (
      r.set("accept", "application/json"),
      void 0 !== a?.DPoP &&
        (await (async function (e, t, n, i, a, s) {
          const {
            privateKey: r,
            publicKey: o,
            nonce: c = Ri.get(n.origin),
          } = t;
          if (!Oi(r))
            throw new TypeError(
              '"DPoP.privateKey" must be a private CryptoKey'
            );
          if (!Ui((l = o)) || "public" !== l.type)
            throw new TypeError('"DPoP.publicKey" must be a public CryptoKey');
          var l;
          if (void 0 !== c && !Ti(c))
            throw new TypeError(
              '"DPoP.nonce" must be a non-empty string or undefined'
            );
          if (!o.extractable)
            throw new TypeError('"DPoP.publicKey.extractable" must be true');
          const d = zi() + a,
            u = await na(
              { alg: Ji(r), typ: "dpop+jwt", jwk: await aa(o) },
              {
                iat: d,
                jti: Vi(),
                htm: i,
                nonce: c,
                htu: `${n.origin}${n.pathname}`,
                ath: s
                  ? Ni(await crypto.subtle.digest("SHA-256", Xi(s)))
                  : void 0,
              },
              r
            );
          e.set("dpop", u);
        })(r, a.DPoP, s, "POST", Mi(t))),
      (async function (e, t, n, i, a, s, r) {
        return (
          await ta(e, t, a, s, r?.clientPrivateKey),
          s.set(
            "content-type",
            "application/x-www-form-urlencoded;charset=UTF-8"
          ),
          (r?.[Zi] || fetch)(i.href, {
            body: a,
            headers: Object.fromEntries(s.entries()),
            method: n,
            redirect: "manual",
            signal: r?.signal ? Yi(r.signal) : null,
          }).then(_i)
        );
      })(e, t, "POST", s, i, r, a)
    );
  }
  Symbol();
  const ca = new WeakMap();
  async function la(e, t, n, i = !1, a = !1) {
    if ((Pi(e), $i(t), !Ai(n, Response)))
      throw new TypeError('"response" must be an instance of Response');
    if (200 !== n.status) {
      let e;
      if (
        (e = await (async function (e) {
          if (e.status > 399 && e.status < 500) {
            Ia(e);
            try {
              const t = await e.json();
              if (Si(t) && "string" == typeof t.error && t.error.length)
                return (
                  void 0 !== t.error_description &&
                    "string" != typeof t.error_description &&
                    delete t.error_description,
                  void 0 !== t.error_uri &&
                    "string" != typeof t.error_uri &&
                    delete t.error_uri,
                  void 0 !== t.algs &&
                    "string" != typeof t.algs &&
                    delete t.algs,
                  void 0 !== t.scope &&
                    "string" != typeof t.scope &&
                    delete t.scope,
                  t
                );
            } catch {}
          }
        })(n))
      )
        return e;
      throw new Fi('"response" is not a conform Token Endpoint response');
    }
    let s;
    Ia(n);
    try {
      s = await n.json();
    } catch (e) {
      throw new Fi('failed to parse "response" body as JSON', { cause: e });
    }
    if (!Si(s)) throw new Fi('"response" body must be a top level object');
    if (!Ti(s.access_token))
      throw new Fi(
        '"response" body "access_token" property must be a non-empty string'
      );
    if (!Ti(s.token_type))
      throw new Fi(
        '"response" body "token_type" property must be a non-empty string'
      );
    if (
      ((s.token_type = s.token_type.toLowerCase()),
      "dpop" !== s.token_type && "bearer" !== s.token_type)
    )
      throw new Wi("unsupported `token_type` value");
    if (
      void 0 !== s.expires_in &&
      ("number" != typeof s.expires_in || s.expires_in <= 0)
    )
      throw new Fi(
        '"response" body "expires_in" property must be a positive number'
      );
    if (!a && void 0 !== s.refresh_token && !Ti(s.refresh_token))
      throw new Fi(
        '"response" body "refresh_token" property must be a non-empty string'
      );
    if (void 0 !== s.scope && "string" != typeof s.scope)
      throw new Fi('"response" body "scope" property must be a string');
    if (!i) {
      if (void 0 !== s.id_token && !Ti(s.id_token))
        throw new Fi(
          '"response" body "id_token" property must be a non-empty string'
        );
      if (s.id_token) {
        const { claims: n } = await (async function (e, t, n, i, a) {
          const { 0: s, 1: r, 2: o, length: c } = e.split(".");
          if (5 === c) throw new Wi("JWE structure JWTs are not supported");
          if (3 !== c) throw new Fi("Invalid JWT");
          let l;
          try {
            l = JSON.parse(Xi(Ni(s)));
          } catch (e) {
            throw new Fi(
              "failed to parse JWT Header body as base64url encoded JSON",
              { cause: e }
            );
          }
          if (!Si(l)) throw new Fi("JWT Header must be a top level object");
          if ((t(l), void 0 !== l.crit))
            throw new Fi('unexpected JWT "crit" header parameter');
          const d = Ni(o);
          let u, g;
          if (
            n !== xa &&
            ((u = await n(l)),
            !(await crypto.subtle.verify(ya(u), u, d, Xi(`${s}.${r}`))))
          )
            throw new Fi("JWT signature verification failed");
          try {
            g = JSON.parse(Xi(Ni(r)));
          } catch (e) {
            throw new Fi(
              "failed to parse JWT Payload body as base64url encoded JSON",
              { cause: e }
            );
          }
          if (!Si(g)) throw new Fi("JWT Payload must be a top level object");
          const b = zi() + i;
          if (void 0 !== g.exp) {
            if ("number" != typeof g.exp)
              throw new Fi('unexpected JWT "exp" (expiration time) claim type');
            if (g.exp <= b - a)
              throw new Fi(
                'unexpected JWT "exp" (expiration time) claim value, timestamp is <= now()'
              );
          }
          if (void 0 !== g.iat && "number" != typeof g.iat)
            throw new Fi('unexpected JWT "iat" (issued at) claim type');
          if (void 0 !== g.iss && "string" != typeof g.iss)
            throw new Fi('unexpected JWT "iss" (issuer) claim type');
          if (void 0 !== g.nbf) {
            if ("number" != typeof g.nbf)
              throw new Fi('unexpected JWT "nbf" (not before) claim type');
            if (g.nbf > b + a)
              throw new Fi(
                'unexpected JWT "nbf" (not before) claim value, timestamp is > now()'
              );
          }
          if (
            void 0 !== g.aud &&
            "string" != typeof g.aud &&
            !Array.isArray(g.aud)
          )
            throw new Fi('unexpected JWT "aud" (audience) claim type');
          return { header: l, claims: g, signature: d, key: u };
        })(
          s.id_token,
          Ga.bind(
            void 0,
            t.id_token_signed_response_alg,
            e.id_token_signing_alg_values_supported
          ),
          xa,
          Mi(t),
          ji(t)
        )
          .then(ha.bind(void 0, ["aud", "exp", "iat", "iss", "sub"]))
          .then(ua.bind(void 0, e.issuer))
          .then(da.bind(void 0, t.client_id));
        if (Array.isArray(n.aud) && 1 !== n.aud.length && n.azp !== t.client_id)
          throw new Fi(
            'unexpected ID Token "azp" (authorized party) claim value'
          );
        if (t.require_auth_time && "number" != typeof n.auth_time)
          throw new Fi(
            'unexpected ID Token "auth_time" (authentication time) claim value'
          );
        ca.set(s, n);
      }
    }
    return s;
  }
  function da(e, t) {
    if (Array.isArray(t.claims.aud)) {
      if (!t.claims.aud.includes(e))
        throw new Fi('unexpected JWT "aud" (audience) claim value');
    } else if (t.claims.aud !== e)
      throw new Fi('unexpected JWT "aud" (audience) claim value');
    return t;
  }
  function ua(e, t) {
    if (t.claims.iss !== e)
      throw new Fi('unexpected JWT "iss" (issuer) claim value');
    return t;
  }
  const ga = new WeakSet(),
    ba = {
      aud: "audience",
      c_hash: "code hash",
      client_id: "client id",
      exp: "expiration time",
      iat: "issued at",
      iss: "issuer",
      jti: "jwt id",
      nonce: "nonce",
      s_hash: "state hash",
      sub: "subject",
      ath: "access token hash",
      htm: "http method",
      htu: "http uri",
      cnf: "confirmation",
    };
  function ha(e, t) {
    for (const n of e)
      if (void 0 === t.claims[n])
        throw new Fi(`JWT "${n}" (${ba[n]}) claim missing`);
    return t;
  }
  const pa = Symbol(),
    ma = Symbol();
  function Ia(e) {
    if (e.bodyUsed)
      throw new TypeError('"response" body has been used already');
  }
  function fa(e) {
    if ("number" != typeof e.modulusLength || e.modulusLength < 2048)
      throw new Fi(`${e.name} modulusLength must be at least 2048 bits`);
  }
  function Ca(e) {
    switch (e) {
      case "P-256":
        return "SHA-256";
      case "P-384":
        return "SHA-384";
      case "P-521":
        return "SHA-512";
      default:
        throw new Wi();
    }
  }
  function ya(e) {
    switch (e.algorithm.name) {
      case "ECDSA":
        return { name: e.algorithm.name, hash: Ca(e.algorithm.namedCurve) };
      case "RSA-PSS":
        switch ((fa(e.algorithm), e.algorithm.hash.name)) {
          case "SHA-256":
          case "SHA-384":
          case "SHA-512":
            return {
              name: e.algorithm.name,
              saltLength: parseInt(e.algorithm.hash.name.slice(-3), 10) >> 3,
            };
          default:
            throw new Wi();
        }
      case "RSASSA-PKCS1-v1_5":
        return fa(e.algorithm), e.algorithm.name;
      case "Ed448":
      case "Ed25519":
        return e.algorithm.name;
    }
    throw new Wi();
  }
  const xa = Symbol();
  function Ga(e, t, n) {
    if (void 0 === e) {
      if (Array.isArray(t)) {
        if (!t.includes(n.alg))
          throw new Fi('unexpected JWT "alg" header parameter');
      } else if ("RS256" !== n.alg)
        throw new Fi('unexpected JWT "alg" header parameter');
    } else if (n.alg !== e)
      throw new Fi('unexpected JWT "alg" header parameter');
  }
  function Aa(e, t) {
    const { 0: n, length: i } = e.getAll(t);
    if (i > 1) throw new Fi(`"${t}" parameter must be provided only once`);
    return n;
  }
  const va = Symbol(),
    Ba = Symbol();
  const Za = {
      development: {
        EU: {
          oidc: {
            idpUrl: "https://login.nonprod.klarna.net/",
            issuerUrl: "https://login.nonprod.klarna.net",
          },
          tracker: {
            url: "https://frontend-event-router-eu.staging.c2c.klarna.net",
            enabled: !1,
          },
        },
        NA: {
          oidc: {
            idpUrl: "https://login.nonprod.klarna.net/na/lp/idp",
            issuerUrl: "https://login.nonprod.klarna.net",
          },
          tracker: {
            url: "https://frontend-event-router-us.staging.c2c.klarna.net",
            enabled: !1,
          },
        },
        OC: {
          oidc: { idpUrl: "", issuerUrl: "" },
          tracker: { url: "", enabled: !1 },
        },
      },
      staging: {
        EU: {
          oidc: {
            idpUrl: "https://login.nonprod.klarna.net/",
            issuerUrl: "https://login.nonprod.klarna.net",
          },
          tracker: {
            url: "https://frontend-event-router-eu.staging.c2c.klarna.net",
            enabled: !0,
          },
        },
        NA: {
          oidc: {
            idpUrl: "https://login.nonprod.klarna.net/na/lp/idp",
            issuerUrl: "https://login.nonprod.klarna.net",
          },
          tracker: {
            url: "https://frontend-event-router-us.staging.c2c.klarna.net",
            enabled: !0,
          },
        },
        OC: {
          oidc: { idpUrl: "", issuerUrl: "" },
          tracker: { url: "", enabled: !1 },
        },
      },
      playground: {
        EU: {
          oidc: {
            idpUrl: "https://login.playground.klarna.com/",
            issuerUrl: "https://login.playground.klarna.com",
          },
          tracker: { url: "https://eu.playground.klarnaevt.com", enabled: !0 },
        },
        NA: {
          oidc: {
            idpUrl: "https://login.playground.klarna.com/na/lp/idp",
            issuerUrl: "https://login.playground.klarna.com",
          },
          tracker: { url: "https://na.playground.klarnaevt.com", enabled: !0 },
        },
        OC: {
          oidc: { idpUrl: "", issuerUrl: "" },
          tracker: { url: "", enabled: !1 },
        },
      },
      production: {
        EU: {
          oidc: {
            idpUrl: "https://login.klarna.com/",
            issuerUrl: "https://login.klarna.com",
          },
          tracker: { url: "https://eu.klarnaevt.com", enabled: !0 },
        },
        NA: {
          oidc: {
            idpUrl: "https://login.klarna.com/na/lp/idp",
            issuerUrl: "https://login.klarna.com",
          },
          tracker: { url: "https://na.klarnaevt.com", enabled: !0 },
        },
        OC: {
          oidc: { idpUrl: "", issuerUrl: "" },
          tracker: { url: "", enabled: !1 },
        },
      },
    },
    Qa = { retries: 3, minTimeout: 100, maxTimeout: 200, maxRetryTime: 1e3 };
  class wa extends Error {}
  class ka {
    constructor(e, t) {
      (this.authorizationServerMetadata = e), (this.environmentConfig = t);
    }
    getIdpOrigin = () => new URL(this.environmentConfig.oidc.idpUrl).origin;
    getPopupFlowRedirectUri = () =>
      `${this.getIdpOrigin()}/popup/callback/${window.btoa(
        window.location.origin
      )}`;
    constructOIDCAuthorizationUrl = async ({
      clientId: e,
      redirectUri: t,
      scope: n,
      sessionId: i,
      locale: a,
    }) => {
      if (!this.authorizationServerMetadata.authorization_endpoint)
        throw new Error("Authorization Endpoint not present");
      const s = Vi(),
        r = await (async function (e) {
          if (!Ti(e))
            throw new TypeError('"codeVerifier" must be a non-empty string');
          return Ni(await crypto.subtle.digest("SHA-256", Xi(e)));
        })(s),
        o = Vi(),
        c = Vi();
      Yn.set(Tn, s), Yn.set(Vn, o), Yn.set(Hn, c);
      const l = new URLSearchParams({
          client_id: e,
          code_challenge: r,
          code_challenge_method: "S256",
          redirect_uri: t,
          state: c,
          nonce: o,
          response_type: "code",
          scope: n,
          funnel_id: i,
        }),
        d = new URLSearchParams(window.location.search).get(
          "klarna-auth-prompt"
        );
      d && l.set("prompt", d), a && l.set("ui_locales", a);
      const u = new URL(
        this.authorizationServerMetadata.authorization_endpoint
      );
      return (u.search = l.toString()), u;
    };
    verifyLogin = async ({
      clientId: e,
      urlWithLoginParams: t,
      isPopupFlow: n,
      redirectUri: i = "",
    }) => {
      const a = Yn.get(Hn);
      if (!a) throw new Error("state missing");
      const s = Yn.get(Tn);
      if (!s) throw new Error("codeVerifier missing");
      const r = Yn.get(Vn);
      if (!r) throw new Error("nonce missing");
      const o = ti.getInstance(),
        c = { client_id: e, token_endpoint_auth_method: "none" },
        l = (function (e, t, n, i) {
          if (
            (Pi(e),
            $i(t),
            n instanceof URL && (n = n.searchParams),
            !(n instanceof URLSearchParams))
          )
            throw new TypeError(
              '"parameters" must be an instance of URLSearchParams, or URL'
            );
          if (Aa(n, "response"))
            throw new Fi(
              '"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()'
            );
          const a = Aa(n, "iss"),
            s = Aa(n, "state");
          if (!a && e.authorization_response_iss_parameter_supported)
            throw new Fi('response parameter "iss" (issuer) missing');
          if (a && a !== e.issuer)
            throw new Fi('unexpected "iss" (issuer) response parameter value');
          switch (i) {
            case void 0:
            case Ba:
              if (void 0 !== s)
                throw new Fi(
                  'unexpected "state" response parameter encountered'
                );
              break;
            case va:
              break;
            default:
              if (!Ti(i))
                throw new Fi('"expectedState" must be a non-empty string');
              if (void 0 === s)
                throw new Fi('response parameter "state" missing');
              if (s !== i)
                throw new Fi('unexpected "state" response parameter value');
          }
          const r = Aa(n, "error");
          if (r)
            return {
              error: r,
              error_description: Aa(n, "error_description"),
              error_uri: Aa(n, "error_uri"),
            };
          const o = Aa(n, "id_token"),
            c = Aa(n, "token");
          if (void 0 !== o || void 0 !== c)
            throw new Wi("implicit and hybrid flows are not supported");
          return (l = new URLSearchParams(n)), ga.add(l), l;
          var l;
        })(this.authorizationServerMetadata, c, t, a);
      if (ra(l)) {
        o.emit("error", l);
        const e = new Error("Invalid Authorization Response");
        throw (
          (Kn(e, {
            errorTitle: "oauth.validateAuthResponse failed!",
            result: l,
          }),
          "Login cancelled by user" === l.error_description &&
            this.tracker.sendEvent({ name: "login_cancelled" }),
          e)
        );
      }
      let d;
      try {
        d = await xi()(
          async () =>
            (async function (e, t, n, i, a, s) {
              if ((Pi(e), $i(t), !ga.has(n)))
                throw new TypeError(
                  '"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()'
                );
              if (!Ti(i))
                throw new TypeError('"redirectUri" must be a non-empty string');
              if (!Ti(a))
                throw new TypeError(
                  '"codeVerifier" must be a non-empty string'
                );
              const r = Aa(n, "code");
              if (!r)
                throw new Fi('no authorization code in "callbackParameters"');
              const o = new URLSearchParams(s?.additionalParameters);
              return (
                o.set("redirect_uri", i),
                o.set("code_verifier", a),
                o.set("code", r),
                oa(e, t, "authorization_code", o, s)
              );
            })(
              this.authorizationServerMetadata,
              c,
              l,
              n ? this.getPopupFlowRedirectUri() : i,
              s
            ),
          {
            ...Qa,
            onRetry: (e, t) => {
              Kn(e, {
                errorTitle: "oauth.authorizationCodeGrantRequest call failed!",
                attempt: t,
              });
            },
          }
        );
      } catch (e) {
        throw (
          (Kn(e, { errorTitle: "Token exchange failed" }),
          new wa(`Token Exchange failed. Reason: ${e}`))
        );
      }
      if (!d.ok) {
        const e = await d.json(),
          t = "Token exchange failed",
          n = new wa(t);
        throw (Kn(n, { errorTitle: t, result: e }), n);
      }
      const u = await (async function (e, t, n, i, a) {
        const s = await la(e, t, n);
        if (ra(s)) return s;
        if (!Ti(s.id_token))
          throw new Fi(
            '"response" body "id_token" property must be a non-empty string'
          );
        a ?? (a = t.default_max_age ?? ma);
        const r = (function (e) {
          if (!e.id_token) return;
          const t = ca.get(e);
          if (!t)
            throw new TypeError(
              '"ref" was already garbage collected or did not resolve from the proper sources'
            );
          return t;
        })(s);
        if ((t.require_auth_time || a !== ma) && void 0 === r.auth_time)
          throw new Fi(
            'ID Token "auth_time" (authentication time) claim missing'
          );
        if (a !== ma) {
          if ("number" != typeof a || a < 0)
            throw new TypeError(
              '"options.max_age" must be a non-negative number'
            );
          const e = zi() + Mi(t),
            n = ji(t);
          if (r.auth_time + a < e - n)
            throw new Fi(
              "too much time has elapsed since the last End-User authentication"
            );
        }
        switch (i) {
          case void 0:
          case pa:
            if (void 0 !== r.nonce)
              throw new Fi('unexpected ID Token "nonce" claim value');
            break;
          default:
            if (!Ti(i))
              throw new TypeError('"expectedNonce" must be a non-empty string');
            if (void 0 === r.nonce)
              throw new Fi('ID Token "nonce" claim missing');
            if (r.nonce !== i)
              throw new Fi('unexpected ID Token "nonce" claim value');
        }
        return s;
      })(this.authorizationServerMetadata, c, d, r);
      if (ra(u)) {
        const e = new Error("Invalid AuthorizationCodeOpenID Response");
        throw (
          (Kn(e, {
            errorTitle: "oauth.processAuthorizationCodeOpenIDResponse failed!",
            result: u,
          }),
          e)
        );
      }
      const {
        access_token: g,
        id_token: b,
        token_type: h,
        refresh_token: p,
        scope: m,
        expires_in: I,
      } = u;
      return {
        access_token: g,
        id_token: b,
        token_type: h,
        refresh_token: p,
        scope: m,
        expires_in: I,
      };
    };
  }
  class Xa {
    static environment = "production";
    static region = "EU";
    static setEnvironment(e) {
      Xa.environment = e;
    }
    static setRegion(e) {
      Xa.region = e;
    }
    static async getInstance() {
      if (!Xa.authorizationServer) {
        const n = ((e = Xa.region), (t = Xa.environment), Za[t][e]),
          i = await (async (e) => {
            const t = await xi()(
                async () =>
                  (async function (e, t) {
                    if (!(e instanceof URL))
                      throw new TypeError(
                        '"issuerIdentifier" must be an instance of URL'
                      );
                    if ("https:" !== e.protocol && "http:" !== e.protocol)
                      throw new TypeError(
                        '"issuer.protocol" must be "https:" or "http:"'
                      );
                    const n = new URL(e.href);
                    n.pathname =
                      `${n.pathname}/.well-known/openid-configuration`.replace(
                        "//",
                        "/"
                      );
                    const i = Di(t?.headers);
                    return (
                      i.set("accept", "application/json"),
                      fetch(n.href, {
                        headers: Object.fromEntries(i.entries()),
                        method: "GET",
                        redirect: "manual",
                        signal: null,
                      }).then(_i)
                    );
                  })(new URL(e.oidc.idpUrl)),
                {
                  ...Qa,
                  onRetry: (e, t) => {
                    Kn(e, {
                      errorTitle: "Discovery request failed!",
                      attempt: t,
                    });
                  },
                }
              ),
              n = await (async function (e, t) {
                if (!(e instanceof URL))
                  throw new TypeError(
                    '"expectedIssuer" must be an instance of URL'
                  );
                if (!Ai(t, Response))
                  throw new TypeError(
                    '"response" must be an instance of Response'
                  );
                if (200 !== t.status)
                  throw new Fi(
                    '"response" is not a conform Authorization Server Metadata response'
                  );
                let n;
                Ia(t);
                try {
                  n = await t.json();
                } catch (e) {
                  throw new Fi('failed to parse "response" body as JSON', {
                    cause: e,
                  });
                }
                if (!Si(n))
                  throw new Fi('"response" body must be a top level object');
                if (!Ti(n.issuer))
                  throw new Fi(
                    '"response" body "issuer" property must be a non-empty string'
                  );
                if (new URL(n.issuer).href !== e.href)
                  throw new Fi(
                    '"response" body "issuer" does not match "expectedIssuer"'
                  );
                return n;
              })(new URL(e.oidc.issuerUrl), t);
            if (!0 !== n.code_challenge_methods_supported?.includes("S256"))
              throw new Error("Code challenge method not supported");
            return n;
          })(n);
        Xa.authorizationServer = new ka(i, n);
      }
      var e, t;
      return Xa.authorizationServer;
    }
  }
  class Ea extends Error {}
  function Na(e, t) {
    if ("string" != typeof e)
      throw new Ea("Invalid token specified: must be a string");
    t || (t = {});
    const n = !0 === t.header ? 0 : 1,
      i = e.split(".")[n];
    if ("string" != typeof i)
      throw new Ea(`Invalid token specified: missing part #${n + 1}`);
    let a;
    try {
      a = (function (e) {
        let t = e.replace(/-/g, "+").replace(/_/g, "/");
        switch (t.length % 4) {
          case 0:
            break;
          case 2:
            t += "==";
            break;
          case 3:
            t += "=";
            break;
          default:
            throw new Error("base64 string is not of the correct length");
        }
        try {
          return (function (e) {
            return decodeURIComponent(
              atob(e).replace(/(.)/g, (e, t) => {
                let n = t.charCodeAt(0).toString(16).toUpperCase();
                return n.length < 2 && (n = "0" + n), "%" + n;
              })
            );
          })(t);
        } catch (e) {
          return atob(t);
        }
      })(i);
    } catch (e) {
      throw new Ea(
        `Invalid token specified: invalid base64 for part #${n + 1} (${
          e.message
        })`
      );
    }
    try {
      return JSON.parse(a);
    } catch (e) {
      throw new Ea(
        `Invalid token specified: invalid json for part #${n + 1} (${
          e.message
        })`
      );
    }
  }
  Ea.prototype.name = "InvalidTokenError";
  const Wa = ({ id_token: e, refresh_token: t }) => {
      try {
        return {
          user_account_profile: { ...Na(e) },
          user_account_linking: {
            user_account_linking_refresh_token: t,
            user_account_linking_id_token: e,
          },
        };
      } catch (e) {
        console.error("Error decoding Identity JWT: ", e.message);
      }
    },
    La = () => {
      const e = new URLSearchParams(window.location.search);
      return !!e.get("code") && !!e.get("state");
    },
    Fa = async ({ redirectUri: e, clientId: t }) => {
      try {
        if (
          !e ||
          !((e) => {
            if (!La()) return !1;
            if (e.origin !== window.location.origin) return !1;
            if (e.pathname !== window.location.pathname) return !1;
            const t = new URLSearchParams(e.search),
              n = new URLSearchParams(window.location.search);
            for (const e of t.keys()) if (n.get(e) !== t.get(e)) return !1;
            return !0;
          })(new URL(e))
        )
          return;
        const n = await Xa.getInstance(),
          i = await n.verifyLogin({
            urlWithLoginParams: new URL(window.location.href),
            isPopupFlow: !1,
            redirectUri: e,
            clientId: t,
          });
        return Wa(i);
      } catch (e) {
        Kn(e, { errorTitle: "verifyLogin failed for redirect flow." });
      }
    };
  var Ra = a(5890),
    Ua = a(6178),
    Oa = a.n(Ua);
  class _a {
    static addListener(e, t) {
      window.removeEventListener
        ? window.addEventListener("message", t, !1)
        : window.attachEvent("on" + e, t, !1);
    }
    static removeListener(e, t) {
      window.removeEventListener
        ? window.removeEventListener("message", t)
        : window.detachEvent("on" + e, t);
    }
    constructor(e) {
      (this.origin = e.origin),
        (this.target = e.target),
        (this.frame = e.frame),
        (this.debug = e.debug),
        (this.console = e.console || console),
        (this.sendPlainObject = e.sendPlainObject),
        (this.sourceID = e.sourceID || "unknown"),
        (this.disableMessageSourceCheck = !!e.disableMessageSourceCheck),
        (this._listener = null),
        (this.onMessage = function () {
          throw new Error("Missing `onMessage` callback");
        }),
        this.bindToMessage(this.onPostMessage, this);
    }
    getTarget() {
      return this.frame
        ? "function" == typeof this.frame
          ? this.frame()
          : this.frame.contentWindow
        : this.target;
    }
    hasTarget() {
      try {
        return !!this.getTarget();
      } catch (e) {
        return !1;
      }
    }
    onPostMessage(e) {
      let t;
      try {
        if (
          !this.disableMessageSourceCheck &&
          this.hasTarget() &&
          !Sa(e.srcElement) &&
          !Da(e.srcElement) &&
          e.source !== this.getTarget()
        )
          return void (
            this.debug &&
            this.console.warn("[Posten(%s)] ignored message:", this.sourceID, e)
          );
        if ("*" !== this.origin && e.origin !== this.origin)
          return void (
            this.debug &&
            this.console.warn(
              "[Posten(%s)] rejected message from " +
                e.origin +
                ", expecting " +
                this.origin +
                ". Target window:",
              this.sourceID,
              this.getTarget()
            )
          );
        (t = this.sendPlainObject ? e.data : JSON.parse(e.data)),
          this.debug &&
            this.console.info(
              "%c [Posten(%s) <- %s] message received:",
              "color: #16a085",
              this.sourceID,
              e.origin || "unknown",
              t
            ),
          this.onMessage(null, t, e);
      } catch (e) {
        this.onMessage(e);
      }
    }
    send(e) {
      if (!this.sendPlainObject)
        for (var t in e)
          if (e[t] && e[t].toJSON)
            try {
              e[t].toJSON = null;
            } catch (e) {}
      let n;
      Sa(e.port) && ((n = e.port), delete e.port);
      const i = this.getTarget(),
        a = this.sendPlainObject ? e : JSON.stringify(e);
      Sa(i) || Da(i)
        ? i.postMessage(a)
        : i.postMessage(a, this.origin, n ? [n] : []),
        this.debug &&
          this.console.info(
            "%c [Posten -> %s] sending message:",
            "color: #16a085",
            this.origin,
            e
          );
    }
    bindToMessage(e, t) {
      this._listener = function () {
        e.apply(t, arguments);
      };
      const n = this.getTarget();
      Sa(n) || Da(n)
        ? (n.onmessage = this._listener)
        : _a.addListener("message", this._listener);
    }
    unbind() {
      if (!this._listener) return;
      const e = this.getTarget();
      Sa(e) || Da(e)
        ? (e.onmessage = null)
        : _a.removeListener("message", this._listener),
        (this._listener = null);
    }
  }
  const Sa = (e) => "MessagePort" in window && e instanceof window.MessagePort,
    Da = (e) =>
      "BroadcastChannel" in window && e instanceof window.BroadcastChannel;
  class Ya {
    static createPosten({
      src: e = window,
      target: t,
      origin: n = "*",
      debug: i,
      sourceID: a,
      disableMessageSourceCheck: s,
    }) {
      const r = {
        src: e,
        origin: n,
        console: Oa(),
        debug: i,
        sourceID: a,
        disableMessageSourceCheck: s,
      };
      return (
        t.url && (r.origin = Ya.getOriginFromURL(t.url)),
        t.window ? (r.target = t.window) : t.frame && (r.frame = t.frame),
        new _a(r)
      );
    }
    static getOriginFromURL(e = "") {
      const t = e.match(/^[a-z]+:\/\/[a-z0-9A-Z\.:\-]+/);
      if (t) return t[0];
    }
    constructor(e = {}) {
      if (!e.target) throw new Error("Property `options.target` is required.");
      "[object Object]" === Object.prototype.toString.call(e.debug)
        ? ((this.debug = !!e.debug.logs), (this.logErrors = !!e.debug.errors))
        : ((this.debug = !!e.debug), (this.logErrors = this.debug)),
        (this.posten = Ya.createPosten({ ...e, debug: this.debug })),
        (this.posten.onMessage = (...e) => {
          this.posten && this.posten.hasTarget() && this.onMessage(...e);
        }),
        (this.messageHandlers = {}),
        (this.queue = e.queue || []),
        (this.sourceID = e.sourceID || "NO NAME"),
        (this.targetIsReady = e.targetIsReady),
        (this.shouldBuffer = !this.targetIsReady),
        (this.autoSyncOnStart =
          null != e.autoSyncOnStart ? e.autoSyncOnStart : !this.targetIsReady),
        this.addMessageHandler(
          "@@messenger/ready",
          this.onReadyMessage.bind(this)
        ),
        this.addMessageHandler(
          "@@messenger/SYN",
          this.onSyncMessage.bind(this)
        ),
        this.addMessageHandler(
          "@@messenger/SYN-ACK",
          this.onAcknowledgeSyncMessage.bind(this)
        ),
        this.addMessageHandler(
          "@@messenger/ACK",
          this.onAcknowledgeMessage.bind(this)
        ),
        this.addMessageHandler(
          "@@messenger/transferPort",
          this.onTransferPort.bind(this)
        ),
        this.startTargetExistenceCheckPolling(e.targetExistenceCheckInterval),
        this.targetIsReady ? this.ready() : this.autoSyncOnStart && this.sync();
    }
    log(...e) {
      this.debug && Oa().log("[Messenger(%s)]", this.sourceID, ...e);
    }
    logError(...e) {
      this.debug &&
        this.logErrors &&
        Oa().error("[Messenger(%s)]", this.sourceID, ...e);
    }
    hasTarget() {
      return this.posten && this.posten.hasTarget();
    }
    startTargetExistenceCheckPolling(e = 100) {
      this.existenceCheckPoller = setInterval(() => {
        this.shouldBuffer ||
          this.hasTarget() ||
          (this.log("Target no longer exists. Start buffering."),
          (this.shouldBuffer = !0));
      }, e);
    }
    sync() {
      this.hasTarget() &&
        (this.posten.send({ action: "@@messenger/SYN" }), this.log("SYN"));
    }
    acknowledgeSync() {
      this.hasTarget() &&
        (this.posten.send({ action: "@@messenger/SYN-ACK" }),
        this.log("SYN-ACK"));
    }
    acknowledge() {
      this.hasTarget() &&
        (this.posten.send({ action: "@@messenger/ACK" }), this.log("ACK"));
    }
    addMessageHandler(e, t) {
      return (
        (this.messageHandlers[e] = t),
        () => {
          delete this.messageHandlers[e];
        }
      );
    }
    transferPort(e) {
      this.log("Transfer port:", e),
        this.send({ action: "@@messenger/transferPort", port: e });
    }
    getPort() {
      return this.port
        ? Promise.resolve(this.port)
        : new Promise((e) => {
            this.resolvePortPromise = e;
          });
    }
    send(e) {
      !this.shouldBuffer && this.hasTarget()
        ? this.posten.send({ ...e, __sourceID: this.sourceID })
        : (this.log("Buffering message:", e), this.queue.push(e));
    }
    ready({ fromPostMessage: e = !1 } = {}) {
      this.hasTarget() &&
        (this.log("Ready to receive messages."),
        (this.shouldBuffer = !1),
        e || this.send({ action: "@@messenger/ready" }),
        this.flush(this.queue, this.send));
    }
    flush() {
      for (
        this.log("Flushing buffer:", [].concat(this.queue));
        this.queue.length > 0;

      )
        this.send(this.queue.shift());
    }
    pause() {
      this.shouldBuffer = !0;
    }
    destroy() {
      clearInterval(this.existenceCheckPoller),
        this.posten && this.posten.unbind(),
        delete this.posten;
    }
    onMessage(e, t, n) {
      if (e) return void this.logError(e);
      const i = this.messageHandlers[t.action];
      "function" == typeof i && i(t, n);
    }
    onReadyMessage() {
      this.ready({ fromPostMessage: !0 });
    }
    onSyncMessage() {
      this.acknowledgeSync();
    }
    onAcknowledgeSyncMessage() {
      this.ready({ fromPostMessage: !0 }), this.acknowledge();
    }
    onAcknowledgeMessage() {
      this.ready({ fromPostMessage: !0 });
    }
    onTransferPort(e, t) {
      const n = t.ports[0];
      this.log("Received port:", n),
        !this.port && this.resolvePortPromise && this.resolvePortPromise(n),
        (this.port = n);
    }
  }
  class Ta {
    constructor({ popup: e, authServer: t, sdkConfig: n }) {
      (this.popup = e),
        (this.authServer = t),
        (this.sdkConfig = n),
        (this.tracker = $n.getInstance()),
        (this.identityEvents = ti.getInstance());
    }
    goto(e) {
      (this.popup.document.body.innerHTML =
        '\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />\n    <meta name="theme-color" content="rgb(254, 254, 254)" />\n    <meta name="theme-color" content="rgb(0, 0, 0)" media="(prefers-color-scheme: dark)" />\n    <title>Klarna</title>\n    <link\n      rel="shortcut icon"\n      href="https://x.klarnacdn.net/ui/favicon/v1/favicon.ico"\n      type="image/x-icon"\n    />\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="32x32"\n      href="https://x.klarnacdn.net/ui/favicon/v1/favicon-32x32.png"\n    />\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="16x16"\n      href="https://x.klarnacdn.net/ui/favicon/v1/favicon-16x16.png"\n    />\n  </head>\n\n  <style>\n    .logo-container {\n      width: 100%;\n      height: 100%;\n      background-color: var(--background);\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      z-index: 1;\n      display: flex;\n    }\n\n    #klarna-logo {\n      display: flex;\n      margin-bottom: 24px;\n    }\n  </style>\n\n  <body>\n    <div class="logo-container">\n      <div id="klarna-logo">\n        <svg\n          width="131"\n          height="54"\n          viewBox="0 0 131 54"\n          fill="none"\n          xmlns="http://www.w3.org/2000/svg"\n        >\n          <path\n            fill-rule="evenodd"\n            clip-rule="evenodd"\n            d="M0.5 15.8677C0.5 7.36407 7.33232 0.46875 15.7596 0.46875H115.24C123.668 0.46875 130.5 7.36407 130.5 15.8677V38.1322C130.5 46.6358 123.668 53.53 115.24 53.53H15.7596C7.33232 53.53 0.5 46.6358 0.5 38.1322V15.8677Z"\n            fill="#FFB3C7"\n          />\n          <path\n            fill-rule="evenodd"\n            clip-rule="evenodd"\n            d="M100.387 22.7873C102.07 22.7873 103.632 23.3069 104.924 24.1902V23.2102H109.502V38.5148H104.924V37.5371C103.632 38.4193 102.07 38.9377 100.387 38.9377C95.9319 38.9377 92.3204 35.3236 92.3204 30.8637C92.3204 26.4037 95.9319 22.7873 100.387 22.7873ZM52.0983 22.7873C53.7814 22.7873 55.3419 23.3069 56.6355 24.1902V23.2102H61.2124V38.5148H56.6355V37.5371C55.3419 38.4193 53.7814 38.9377 52.0983 38.9377C47.643 38.9377 44.0303 35.3236 44.0303 30.8637C44.0303 26.4037 47.643 22.7873 52.0983 22.7873ZM114.362 33.0863C115.949 33.0863 117.234 34.3743 117.234 35.9625C117.234 37.5508 115.949 38.8377 114.362 38.8377C112.776 38.8377 111.489 37.5508 111.489 35.9625C111.489 34.3743 112.776 33.0863 114.362 33.0863ZM34.0622 16.3867C34.0622 21.1786 32.1963 25.6363 28.8721 28.9492L35.8839 38.5216H29.6194L21.9977 28.1193L23.9647 26.6447C27.2265 24.1982 29.0981 20.459 29.0981 16.3867H34.0622ZM21.3912 16.3867V38.5205H16.418V16.3867H21.3912ZM42.1541 16.3901V38.5148H37.3637V16.3901H42.1541ZM84.1865 22.7987C87.8741 22.7987 90.7031 25.2214 90.7031 28.7832V38.5148H86.1308V30.4407C86.1308 28.2091 84.9747 27.0051 82.9633 27.0051C81.086 27.0051 79.5267 28.1454 79.5267 30.4726V38.5148H74.9135V23.2114H79.471V24.9349C80.6283 23.3671 82.358 22.7987 84.1865 22.7987ZM68.2935 23.2102V25.2043C69.2111 24.0083 70.9203 23.2114 72.7795 23.2114V27.6645C72.7613 27.6645 72.7431 27.6622 72.725 27.6622C70.9135 27.6622 68.3037 28.9594 68.3037 31.3696V38.5148H63.6076V23.2102H68.2935ZM100.762 26.9255C98.4714 26.9255 96.6145 28.6888 96.6145 30.8637C96.6145 33.0374 98.4714 34.8007 100.762 34.8007C103.053 34.8007 104.91 33.0374 104.91 30.8637C104.91 28.6888 103.053 26.9255 100.762 26.9255ZM52.472 26.9255C50.1824 26.9255 48.3255 28.6888 48.3255 30.8637C48.3255 33.0374 50.1824 34.8007 52.472 34.8007C54.7627 34.8007 56.6196 33.0374 56.6196 30.8637C56.6196 28.6888 54.7627 26.9255 52.472 26.9255Z"\n            fill="black"\n          />\n      </svg>\n    </div>\n  </body>\n</html>\n'),
        (this.messenger = new Ya({
          target: { window: this.popup },
          origin: this.authServer.getIdpOrigin(),
          sourceID: "SIWK-to-OIDC",
        })),
        this.messenger.addMessageHandler(
          "redirect",
          this.redirectMessageHandler
        ),
        (this.popup.location.href = e.toString());
    }
    redirectToErrorScreen = () => {
      if (this.popup) {
        const e = `${this.authServer.getIdpOrigin()}/error`;
        this.popup.location.href = e;
      }
    };
    redirectMessageHandler = async (e) => {
      if (
        (this.tracker.sendEvent({
          name: "redirect_handler_triggered",
          options: { sessionId: this.sdkConfig.sessionId },
        }),
        !e.data)
      )
        throw new Error("Redirect event does not have data");
      try {
        const t = new URL(e.data.url),
          n = await this.authServer.verifyLogin({
            clientId: this.sdkConfig.clientId,
            urlWithLoginParams: t,
            isPopupFlow: !0,
          });
        this.identityEvents.emit("signin", Wa(n)),
          this.tracker.sendEvent({
            name: "login_success",
            options: { sessionId: this.sdkConfig.sessionId },
          }),
          this.popup.close();
      } catch (e) {
        Kn(e, { errorTitle: "verifyLogin failed for popup flow!" }),
          e instanceof wa ? this.redirectToErrorScreen() : this.popup.close(),
          this.tracker.sendEvent({
            name: "login_failure",
            options: { sessionId: this.sdkConfig.sessionId },
          });
      }
    };
  }
  class Va {
    constructor(e, t) {
      (this.config = e), (this.sdkConfig = t);
    }
    async start() {
      "REDIRECT" === this.findBestInteractionMode() &&
        (await this.startRedirectFlow()),
        await this.startOnPageFlow();
    }
    findBestInteractionMode() {
      return this.config.interactionMode &&
        "DEVICE_BEST" !== this.config.interactionMode
        ? this.config.interactionMode
        : (0, Ra.detectDeviceBest)() === Ra.InteractionModes.IFRAME
        ? `${Ra.InteractionModes.REDIRECT}`
        : `${Ra.InteractionModes.ON_PAGE}`;
    }
    async startRedirectFlow() {
      const { redirectUri: e } = this.config;
      if (!e) throw new qn("redirectUri is not provided!");
      const t = await Xa.getInstance(),
        n = await t.constructOIDCAuthorizationUrl({
          clientId: this.sdkConfig.clientId,
          redirectUri: e,
          scope: this.config.scope,
          sessionId: this.sdkConfig.sessionId,
        });
      (0, Ra.triggerRedirect)(n.toString());
    }
    async startOnPageFlow() {
      const e = await Xa.getInstance(),
        t = await e.constructOIDCAuthorizationUrl({
          clientId: this.sdkConfig.clientId,
          redirectUri: e.getPopupFlowRedirectUri(),
          scope: this.config.scope,
          sessionId: this.sdkConfig.sessionId,
        }),
        n = {
          overlayContent: {
            text: li(ii.OverlayContentText),
            buttonLabel: li(ii.OverlayContentButtonLabel),
          },
          styles: { width: 400, height: 929 },
          hideOverlay: this.config.hideOverlay,
        };
      try {
        const { getOpenedWindow: i } = (0, Ra.triggerOnPage)(t.toString(), n),
          a = i();
        new Ta({ popup: a, authServer: e, sdkConfig: this.sdkConfig }).goto(t);
      } catch (e) {
        await this.startRedirectFlow();
      }
    }
  }
  class Ha extends Ot {
    constructor() {
      super();
    }
  }
  class Ja {
    constructor(e, t) {
      (this.config = e),
        (this.sdkConfig = t),
        (this.buttonEvents = new Ha()),
        (this.state = "created");
    }
    mount(e) {
      if ("created" !== this.state) return;
      const t = "string" == typeof e ? document.querySelector(e) : e;
      if (!t)
        throw (v("Missing valid `container`"), new Error("Missing Container"));
      const n = document.createElement(mt.IDENTITY_BUTTON),
        i = document.createElement("span");
      n.appendChild(i);
      const { id: a, ...s } = this.config;
      Object.assign(n.dataset, s),
        (n.id = a),
        n.setAttribute("data-testid", a),
        t.appendChild(n),
        (this.state = "mounted"),
        (this.element = n);
    }
    unmount() {
      this.element && "mounted" === this.state && this.element.remove();
    }
    attach(e) {
      if ("created" !== this.state) return;
      const t = "string" == typeof e ? document.querySelector(e) : e;
      t || v("Missing valid `button` element"),
        t.addEventListener("click", this.clickHandler),
        (this.state = "attached"),
        (this.element = t);
    }
    detach() {
      this.element &&
        "attached" === this.state &&
        this.element.removeEventListener("click", this.clickHandler);
    }
    on(e, t) {
      this.buttonEvents.on(e, t);
    }
    async click() {
      await this.clickHandler();
    }
    async initAuthorizationServer() {
      return Xa.getInstance().then((e) => {
        if (!e) throw new Error("Could not create Authorization Server");
        this.buttonEvents.emit("ready");
      });
    }
    getPublicAPI() {
      return {
        mount: this.mount.bind(this),
        unmount: this.unmount.bind(this),
        attach: this.attach.bind(this),
        detach: this.detach.bind(this),
        on: this.on.bind(this),
      };
    }
    clickHandler = async () => {
      this.buttonEvents.emit("clicked"),
        new Va(this.config, this.sdkConfig)
          .start()
          .then(() => {})
          .catch(() => {});
    };
  }
  class Ma {
    constructor(e) {
      (this.config = { environment: "playground", ...e }),
        (this.identityEvents = ti.getInstance()),
        Xa.setEnvironment(this.config.environment),
        Xa.setRegion(this.getRegion()),
        Yn.set(Jn, this.config.sessionId),
        (this.buttons = new Map()),
        (function (e) {
          let t, n, i, a, s, r, o, c, l, d, u, g, b, h, p, m;
          if (!customElements.get(mt.IDENTITY_BUTTON)) {
            class I extends ui.WF {
              static {
                ({
                  e: [n, i, a, s, r, o, c, l, d, u, g, b, h, p],
                  c: [m, t],
                } = (function (e, t, n, i, a, s) {
                  var r,
                    o,
                    c,
                    l,
                    d,
                    u,
                    g,
                    b = Symbol.metadata || Symbol.for("Symbol.metadata"),
                    h = Object.defineProperty,
                    p = Object.create,
                    m = [p(null), p(null)],
                    I = t.length;
                  function f(t, n, i) {
                    return function (a, s) {
                      n && ((s = a), (a = e));
                      for (var r = 0; r < t.length; r++)
                        s = t[r].apply(a, i ? [s] : []);
                      return i ? s : a;
                    };
                  }
                  function C(e, t, n, i) {
                    if ("function" != typeof e && (i || void 0 !== e))
                      throw new TypeError(
                        t +
                          " must " +
                          (n || "be") +
                          " a function" +
                          (i ? "" : " or undefined")
                      );
                    return e;
                  }
                  function y(e, t, n, i, a, s, c, l, d, u, g) {
                    function b(e) {
                      if (!g(e))
                        throw new TypeError(
                          "Attempted to access private element on non-instance"
                        );
                    }
                    var p = [].concat(t[0]),
                      I = t[3],
                      y = !c,
                      x = 1 === a,
                      G = 3 === a,
                      A = 4 === a,
                      v = 2 === a;
                    function B(t, n, i) {
                      return function (a, s) {
                        return (
                          n && ((s = a), (a = e)), i && i(a), Z[t].call(a, s)
                        );
                      };
                    }
                    if (!y) {
                      var Z = {},
                        Q = [],
                        w = G ? "get" : A || x ? "set" : "value";
                      if (
                        (d
                          ? (u || x
                              ? (Z = {
                                  get: mi(
                                    function () {
                                      return I(this);
                                    },
                                    i,
                                    "get"
                                  ),
                                  set: function (e) {
                                    t[4](this, e);
                                  },
                                })
                              : (Z[w] = I),
                            u || mi(Z[w], i, v ? "" : w))
                          : u || (Z = Object.getOwnPropertyDescriptor(e, i)),
                        !u && !d)
                      ) {
                        if ((o = m[+l][i]) && 7 != (o ^ a))
                          throw Error(
                            "Decorating two elements with the same name (" +
                              Z[w].name +
                              ") is not supported yet"
                          );
                        m[+l][i] = a < 3 ? 1 : a;
                      }
                    }
                    for (var k = e, X = p.length - 1; X >= 0; X -= n ? 2 : 1) {
                      var E = C(p[X], "A decorator", "be", !0),
                        N = n ? p[X - 1] : void 0,
                        W = {},
                        L = {
                          kind: [
                            "field",
                            "accessor",
                            "method",
                            "getter",
                            "setter",
                            "class",
                          ][a],
                          name: i,
                          metadata: r,
                          addInitializer: function (e, t) {
                            if (e.v)
                              throw Error(
                                "attempted to call addInitializer after decoration was finished"
                              );
                            C(t, "An initializer", "be", !0), s.push(t);
                          }.bind(null, W),
                        };
                      if (y)
                        (o = E.call(N, k, L)),
                          (W.v = 1),
                          C(o, "class decorators", "return") && (k = o);
                      else if (
                        ((L.static = l),
                        (L.private = d),
                        (o = L.access =
                          {
                            has: d
                              ? g.bind()
                              : function (e) {
                                  return i in e;
                                },
                          }),
                        A ||
                          (o.get = d
                            ? v
                              ? function (e) {
                                  return b(e), Z.value;
                                }
                              : B("get", 0, b)
                            : function (e) {
                                return e[i];
                              }),
                        v ||
                          G ||
                          (o.set = d
                            ? B("set", 0, b)
                            : function (e, t) {
                                e[i] = t;
                              }),
                        (k = E.call(
                          N,
                          x ? { get: Z.get, set: Z.set } : Z[w],
                          L
                        )),
                        (W.v = 1),
                        x)
                      ) {
                        if ("object" == typeof k && k)
                          (o = C(k.get, "accessor.get")) && (Z.get = o),
                            (o = C(k.set, "accessor.set")) && (Z.set = o),
                            (o = C(k.init, "accessor.init")) && Q.unshift(o);
                        else if (void 0 !== k)
                          throw new TypeError(
                            "accessor decorators must return an object with get, set, or init properties or undefined"
                          );
                      } else
                        C(
                          k,
                          (u ? "field" : "method") + " decorators",
                          "return"
                        ) && (u ? Q.unshift(k) : (Z[w] = k));
                    }
                    return (
                      a < 2 && c.push(f(Q, l, 1), f(s, l, 0)),
                      u ||
                        y ||
                        (d
                          ? x
                            ? c.splice(-1, 0, B("get", l), B("set", l))
                            : c.push(v ? Z[w] : C.call.bind(Z[w]))
                          : h(e, i, Z)),
                      k
                    );
                  }
                  function x(e) {
                    return h(e, b, {
                      configurable: !0,
                      enumerable: !0,
                      value: r,
                    });
                  }
                  return (
                    void 0 !== s && (r = s[b]),
                    (r = p(null == r ? null : r)),
                    (d = []),
                    (u = function (e) {
                      e && d.push(f(e));
                    }),
                    (g = function (t, i) {
                      for (var a = 0; a < n.length; a++) {
                        var s = n[a],
                          r = s[1],
                          o = 7 & r;
                        if ((8 & r) == t && !o == i) {
                          var u = s[2],
                            g = !!s[3],
                            b = 16 & r;
                          y(
                            t ? e : e.prototype,
                            s,
                            b,
                            g ? "#" + u : pi(u),
                            o,
                            o < 2 ? [] : t ? (l = l || []) : (c = c || []),
                            d,
                            !!t,
                            g,
                            i,
                            t && g
                              ? function (t) {
                                  return Ii(t) === e;
                                }
                              : void 0
                          );
                        }
                      }
                    }),
                    g(8, 0),
                    g(0, 0),
                    g(8, 1),
                    g(0, 1),
                    u(c),
                    u(l),
                    (o = d),
                    I || x(e),
                    {
                      e: o,
                      get c() {
                        var n = [];
                        return (
                          I && [x((e = y(e, [t], 0, e.name, 5, n))), f(n, 1)]
                        );
                      },
                    }
                  );
                })(
                  this,
                  [(0, gi.EM)(Ci)],
                  [
                    [(0, gi.MZ)({ attribute: "data-shape" }), 1, "shape"],
                    [(0, gi.MZ)({ attribute: "data-theme" }), 1, "theme"],
                    [
                      (0, gi.MZ)({ attribute: "data-logo-alignment" }),
                      1,
                      "logoAlignment",
                    ],
                    [
                      (0, gi.MZ)({ attribute: "data-hide-overlay" }),
                      1,
                      "hideOverlay",
                    ],
                    [
                      (0, gi.MZ)({ attribute: "data-interaction-mode" }),
                      1,
                      "interactionMode",
                    ],
                    [(0, gi.MZ)({ attribute: "data-scope" }), 1, "scope"],
                    [
                      (0, gi.MZ)({ attribute: "data-redirect-uri" }),
                      1,
                      "redirectUri",
                    ],
                  ],
                  0,
                  0,
                  ui.WF
                ));
              }
              constructor(...e) {
                super(...e), p(this);
              }
              #e = n(this, fi.SHAPE);
              get shape() {
                return this.#e;
              }
              set shape(e) {
                this.#e = e;
              }
              #t = (i(this), a(this, fi.THEME));
              get theme() {
                return this.#t;
              }
              set theme(e) {
                this.#t = e;
              }
              #n = (s(this), r(this, fi.LOGO));
              get logoAlignment() {
                return this.#n;
              }
              set logoAlignment(e) {
                this.#n = e;
              }
              #i = (o(this), c(this, "false"));
              get hideOverlay() {
                return this.#i;
              }
              set hideOverlay(e) {
                this.#i = e;
              }
              #a = (l(this), d(this, ""));
              get interactionMode() {
                return this.#a;
              }
              set interactionMode(e) {
                this.#a = e;
              }
              #s = (u(this), g(this, ""));
              get scope() {
                return this.#s;
              }
              set scope(e) {
                this.#s = e;
              }
              #r = (b(this), h(this, ""));
              get redirectUri() {
                return this.#r;
              }
              set redirectUri(e) {
                this.#r = e;
              }
              alignLogo(e) {
                const t = li(ii.ContinueWith, { params: ["Klarna"] });
                switch (e) {
                  case "center":
                    return ui.qy`<span id="logo">${bi}</span> <span id="copy--center">${t}</span>`;
                  case "right":
                    return ui.qy`<span id="copy--right">${t}</span> <span id="logo">${bi}</span>`;
                  default:
                    return ui.qy`<span id="logo">${bi}</span> <span id="copy">${t}</span>`;
                }
              }
              handleClick() {
                this.identityButton.click();
              }
              connectedCallback() {
                super.connectedCallback(),
                  (this.identityButton = e.registerButton(this));
              }
              disconnectedCallback() {
                super.disconnectedCallback(), e.unregisterButton(this);
              }
              render() {
                return ui.qy`
        <style>
          ${hi}
        </style>
        <button
          id="${Ci}"
          class="theme-${this.theme} shape-${this.shape}"
          @click=${this.handleClick}
        >
          <div id="${Ci}__outline"></div>
          <div id="${Ci}__inner-container">
            <span id="${Ci}__text"> ${this.alignLogo(
                  this.logoAlignment
                )} </span>
          </div>
        </button>
      `;
              }
              static {
                t();
              }
            }
          }
        })(this);
    }
    button(e) {
      if (!e) {
        if (this.buttons.size < 1) throw new Error("There are no buttons!");
        if (this.buttons.size > 1)
          throw new Error(
            "There are multiple identity buttons. Please provide an id"
          );
        return this.buttons.values().next().value;
      }
      return "string" == typeof e
        ? this.buttons.get(e)
        : this.createButton(e).getPublicAPI();
    }
    on = (e, t) => {
      this.identityEvents.on(e, t),
        "signin" === e &&
          La() &&
          this.checkRedirectFlowResponse()
            .then(() => {})
            .catch((e) => {
              Kn(e, { errorTitle: "redirectFlowResponse check failed!" });
            });
    };
    getIdentityPublicAPI = () => ({
      button: this.button.bind(this),
      on: this.on.bind(this),
    });
    registerButton(e) {
      const t = e.getAttribute("id");
      if (t && this.buttons.get(t)) return this.buttons.get(t);
      const n = {
        id: t,
        ...e.dataset,
        hideOverlay: "true" === e.dataset.hideOverlay?.toLocaleLowerCase(),
      };
      return this.createButton(n, e);
    }
    unregisterButton(e) {
      const t = e.dataset;
      this.buttons.delete(t.id);
    }
    getRegion = () => {
      if (!this.config.identityRuntimeConfig?.naClientIds) {
        const e = "Identity naClientIds list not found";
        Kn(new Error(e), { errorTitle: e });
      }
      return (this.config.identityRuntimeConfig?.naClientIds ?? []).includes(
        this.config.clientId
      )
        ? "NA"
        : "EU";
    };
    checkRedirectFlowResponse = async () => {
      (() => {
        try {
          return Yn.get(Mn);
        } catch (e) {}
        return [];
      })().forEach(this.createButton);
      for (const [, e] of this.buttons.entries()) {
        const t = await Fa({
          redirectUri: e.config.redirectUri,
          clientId: this.config.clientId,
        });
        if (t) return void this.identityEvents.emit("signin", t);
      }
    };
    createButton = (e, t) => {
      if (!e.id) {
        if (this.buttons.size > 0)
          throw new Error(
            "There are identity buttons registered. Please provide an id"
          );
        (e.id = "klarna-identity-button"),
          t &&
            (t.setAttribute("id", e.id), t.setAttribute("data-testid", e.id));
      }
      const n = new Ja(e, this.config);
      return (
        this.buttons.set(e.id, n),
        n.initAuthorizationServer().catch((e) => {
          const t = "Could not create Authorization Server";
          this.identityEvents.emit("error", new Error(t)),
            Kn(e, { errorTitle: t });
        }),
        ((e) => {
          const t = Array.from(e.entries()).map(([, e]) => e.config);
          Yn.set(Mn, t);
        })(this.buttons),
        n
      );
    };
  }
  let ja = (function (e) {
    return (
      (e.MODAL_OPENED_LEGACY = "informationalModalOpened"),
      (e.MODAL_CLOSED_LEGACY = "informationalModalClosed"),
      (e.PLACEMENT_RENDERED_LEGACY = "placementRendered"),
      (e.PLACEMENT_RENDERED = "placement-rendered"),
      (e.MODAL_OPENED = "informational-modal-opened"),
      (e.MODAL_CLOSED = "informational-modal-closed"),
      e
    );
  })({});
  class za extends Ot {
    constructor() {
      super();
    }
    static getInstance() {
      return za.instance || (za.instance = new za()), za.instance;
    }
  }
  function Pa(e = "") {
    return e.replace(/-/g, "").length <= 32;
  }
  const $a = (e) =>
    class extends e {
      connectedCallback() {
        try {
          super.connectedCallback();
        } catch (e) {
          On(e);
        }
      }
      disconnectedCallback() {
        try {
          super.disconnectedCallback();
        } catch (e) {
          On(e);
        }
      }
      performUpdate() {
        try {
          super.performUpdate();
        } catch (e) {
          On(e);
        }
      }
    };
  function qa() {
    const e = document.querySelector('script[src*="klarna.js"]');
    return e?.attributes;
  }
  const Ka = (e, t, n = window) =>
    ![
      "www.klarna.com",
      "www.klarnademo.com",
      "demo.klarna.dev",
      "demo-store-eu.staging.c2c.klarna.net",
    ].includes(n.location.hostname) &&
    ("playground" === e || (!!t && t.startsWith("_test_")));
  var es = a(3450);
  class ts {
    constructor() {}
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(e, t, n) {
      (this._$Ct = e), (this._$AM = t), (this._$Ci = n);
    }
    _$AS(e, t) {
      return this.update(e, t);
    }
    update(e, t) {
      return this.render(...t);
    }
  }
  class ns extends ts {
    constructor(e) {
      if ((super(e), (this.it = es.s6), 2 !== e.type))
        throw Error(
          this.constructor.directiveName +
            "() can only be used in child bindings"
        );
    }
    render(e) {
      if (e === es.s6 || null == e) return (this._t = void 0), (this.it = e);
      if (e === es.c0) return e;
      if ("string" != typeof e)
        throw Error(
          this.constructor.directiveName + "() called with a non-string value"
        );
      if (e === this.it) return this._t;
      this.it = e;
      const t = [e];
      return (
        (t.raw = t),
        (this._t = {
          _$litType$: this.constructor.resultType,
          strings: t,
          values: [],
        })
      );
    }
  }
  (ns.directiveName = "unsafeHTML"), (ns.resultType = 1);
  const is = ((as = ns), (...e) => ({ _$litDirective$: as, values: e }));
  var as;
  const ss = ui.AH`klarna-placement-checkout{display:flex;width:100%}.checkout-container{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#17120f;font-size:12px;font-weight:400;line-height:14px;background-color:#fff;padding:0px;width:100%}.checkout-container .checkout-buyers-protection-link{margin:0px 3.5px;color:#000}.checkout-container .checkout-zero-financing{border-radius:6px;background:#ddffe3;padding:10px;color:#000;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;font-size:14px;font-style:normal;font-weight:500;line-height:105%;display:flex;gap:10px}.checkout-container .checkout-zero-financing svg{height:16px;width:16px}.checkout-container .checkmark-flex-container{display:flex;flex-direction:row;align-items:center}.checkout-container .checkout-main-text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif,sans-serif;font-style:normal;font-weight:500;font-size:14px;line-height:145%;display:inline-block;align-items:center;color:#0e0e0f;flex:none;order:0;align-self:stretch;flex-grow:0}.checkout-container .checkout-legal-text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif,sans-serif;font-style:normal;font-weight:400;font-size:12px;line-height:145%;display:flex;align-items:center;color:#5f6163;flex:none;order:1;align-self:stretch;flex-grow:0}.checkout-container .checkout-text-info{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif,sans-serif;font-style:normal;font-weight:400;font-size:12px;line-height:105%;color:#5f6163;flex:none;order:1;flex-grow:1}.checkout-container .checkout-cta-link,.checkout-container .checkout-buyers-protection-link{color:#000;text-decoration:underline}.checkout-container .checkout-cta-link:hover,.checkout-container .checkout-buyers-protection-link:hover{cursor:pointer;color:#333536}.checkout-container .checkout-icon{fill:#5f6163}.checkout-container.dark{background-color:#171616}.checkout-container.dark .checkout-main-text,.checkout-container.dark .checkout-cta-link,.checkout-container.dark .checkout-buyers-protection-link{color:#fff}.checkout-container.dark .logo{color:#fff}.checkout-container.dark .checkout-cta-link:hover,.checkout-container.dark .checkout-buyers-protection-link:hover{cursor:pointer;color:#f1f1f1}.checkout-container.dark .checkout-text-info,.checkout-container.dark .checkout-legal-text{color:#c7c9cc}.checkout-container.dark .checkout-icon{fill:#fff}.vertical-space{height:2px;width:100%}.horisontal-space{width:5px;height:100%}.logo{font-family:"Klarna Headline";font-weight:bold;color:#17120f;text-transform:none !important;letter-spacing:0 !important;font-size:16px;margin-left:3.5px}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2NoZWNrb3V0L3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi8uLi9rbGFybmEtbWVzc2FnaW5nL3NyYy9zdHlsZXMvX21peGlucy5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL192YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSwwQkFDRSxZQUFBLENBQ0EsVUFBQSxDQUdGLG9CQUNFLCtFQUFBLENBQ0EsYUFBQSxDQUNBLGNBQUEsQ0FDQSxlQUFBLENBQ0EsZ0JBQUEsQ0FDQSxxQkFBQSxDQUNBLFdBQUEsQ0FDQSxVQUFBLENBRUEscURBQ0UsZ0JBQUEsQ0FDQSxVQUFBLENBR0YsNkNBQ0UsaUJBQUEsQ0FDQSxrQkFBQSxDQUNBLFlBQUEsQ0FDQSxVQUFBLENBQ0EsK0VBQUEsQ0FDQSxjQUFBLENBQ0EsaUJBQUEsQ0FDQSxlQUFBLENBQ0EsZ0JBQUEsQ0FFQSxZQUFBLENBQ0EsUUFBQSxDQUVBLGlEQUNFLFdBQUEsQ0FDQSxVQUFBLENBSUosOENBQ0UsWUFBQSxDQUNBLGtCQUFBLENBQ0Esa0JBQUEsQ0FHRix3Q0FDRSwwRkFBQSxDQUVBLGlCQUFBLENBQ0EsZUFBQSxDQUNBLGNBQUEsQ0FDQSxnQkFBQSxDQUNBLG9CQUFBLENBQ0Esa0JBQUEsQ0FDQSxhQUFBLENBQ0EsU0FBQSxDQUNBLE9BQUEsQ0FDQSxrQkFBQSxDQUNBLFdBQUEsQ0FHRix5Q0FDRSwwRkFBQSxDQUVBLGlCQUFBLENBQ0EsZUFBQSxDQUNBLGNBQUEsQ0FDQSxnQkFBQSxDQUNBLFlBQUEsQ0FDQSxrQkFBQSxDQUNBLGFBQUEsQ0FDQSxTQUFBLENBQ0EsT0FBQSxDQUNBLGtCQUFBLENBQ0EsV0FBQSxDQUdGLHdDQUNFLDBGQUFBLENBRUEsaUJBQUEsQ0FDQSxlQUFBLENBQ0EsY0FBQSxDQUNBLGdCQUFBLENBQ0EsYUFBQSxDQUNBLFNBQUEsQ0FDQSxPQUFBLENBQ0EsV0FBQSxDQUdGLDRGQUVFLFVBQUEsQ0FDQSx5QkFBQSxDQUVBLHdHQUNFLGNBQUEsQ0FDQSxhQUFBLENBR0osbUNBQ0UsWUFBQSxDQUlKLHlCQUNFLHdCQUFBLENBRUEsbUpBR0UsVUFBQSxDQUdGLCtCQUNFLFVBQUEsQ0FLQSxrSEFDRSxjQUFBLENBQ0EsYUFBQSxDQUlKLDJGQUVFLGFBQUEsQ0FFRix3Q0FDRSxTQUFBLENBSUosZ0JBQ0UsVUFBQSxDQUNBLFVBQUEsQ0FHRixrQkFDRSxTQUFBLENBQ0EsV0FBQSxDQUdGLE1DakpFLDZCQ1VpQixDRFRqQixnQkFBQSxDQUNBLGFDSmMsQ0RLZCw4QkFBQSxDQUNBLDJCQUFBLENEZ0pBLGNBQUEsQ0FDQSxpQkFBQSIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL3N0eWxlcy9taXhpbnMnO1xuXG5rbGFybmEtcGxhY2VtZW50LWNoZWNrb3V0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jaGVja291dC1jb250YWluZXIge1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEFyaWFsLCBzYW5zLXNlcmlmO1xuICBjb2xvcjogIzE3MTIwZjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMTRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgcGFkZGluZzogMHB4O1xuICB3aWR0aDogMTAwJTtcblxuICAuY2hlY2tvdXQtYnV5ZXJzLXByb3RlY3Rpb24tbGluayB7XG4gICAgbWFyZ2luOiAwcHggMy41cHg7XG4gICAgY29sb3I6ICMwMDA7XG4gIH1cblxuICAuY2hlY2tvdXQtemVyby1maW5hbmNpbmcge1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBiYWNrZ3JvdW5kOiAjZGRmZmUzO1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgY29sb3I6ICMwMDA7XG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgbGluZS1oZWlnaHQ6IDEwNSU7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMTBweDtcblxuICAgIHN2ZyB7XG4gICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICB3aWR0aDogMTZweDtcbiAgICB9XG4gIH1cblxuICAuY2hlY2ttYXJrLWZsZXgtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC5jaGVja291dC1tYWluLXRleHQge1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgQXJpYWwsIHNhbnMtc2VyaWYsXG4gICAgICBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMTQ1JTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjb2xvcjogIzBlMGUwZjtcbiAgICBmbGV4OiBub25lO1xuICAgIG9yZGVyOiAwO1xuICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgZmxleC1ncm93OiAwO1xuICB9XG5cbiAgLmNoZWNrb3V0LWxlZ2FsLXRleHQge1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgQXJpYWwsIHNhbnMtc2VyaWYsXG4gICAgICBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBsaW5lLWhlaWdodDogMTQ1JTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sb3I6ICM1ZjYxNjM7XG4gICAgZmxleDogbm9uZTtcbiAgICBvcmRlcjogMTtcbiAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICAgIGZsZXgtZ3JvdzogMDtcbiAgfVxuXG4gIC5jaGVja291dC10ZXh0LWluZm8ge1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgQXJpYWwsIHNhbnMtc2VyaWYsXG4gICAgICBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBsaW5lLWhlaWdodDogMTA1JTtcbiAgICBjb2xvcjogIzVmNjE2MztcbiAgICBmbGV4OiBub25lO1xuICAgIG9yZGVyOiAxO1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgfVxuXG4gIC5jaGVja291dC1jdGEtbGluayxcbiAgLmNoZWNrb3V0LWJ1eWVycy1wcm90ZWN0aW9uLWxpbmsge1xuICAgIGNvbG9yOiBibGFjaztcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblxuICAgICY6aG92ZXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6ICMzMzM1MzY7XG4gICAgfVxuICB9XG4gIC5jaGVja291dC1pY29uIHtcbiAgICBmaWxsOiAjNWY2MTYzO1xuICB9XG59XG5cbi5jaGVja291dC1jb250YWluZXIuZGFyayB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxNzE2MTY7XG5cbiAgLmNoZWNrb3V0LW1haW4tdGV4dCxcbiAgLmNoZWNrb3V0LWN0YS1saW5rLFxuICAuY2hlY2tvdXQtYnV5ZXJzLXByb3RlY3Rpb24tbGluayB7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLmxvZ28ge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIC5jaGVja291dC1jdGEtbGluayxcbiAgLmNoZWNrb3V0LWJ1eWVycy1wcm90ZWN0aW9uLWxpbmsge1xuICAgICY6aG92ZXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6ICNmMWYxZjE7XG4gICAgfVxuICB9XG5cbiAgLmNoZWNrb3V0LXRleHQtaW5mbyxcbiAgLmNoZWNrb3V0LWxlZ2FsLXRleHQge1xuICAgIGNvbG9yOiAjYzdjOWNjO1xuICB9XG4gIC5jaGVja291dC1pY29uIHtcbiAgICBmaWxsOiB3aGl0ZTtcbiAgfVxufVxuXG4udmVydGljYWwtc3BhY2Uge1xuICBoZWlnaHQ6IDJweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5ob3Jpc29udGFsLXNwYWNlIHtcbiAgd2lkdGg6IDVweDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ubG9nbyB7XG4gIEBpbmNsdWRlIGxvZ287XG5cbiAgZm9udC1zaXplOiAxNnB4O1xuICBtYXJnaW4tbGVmdDogMy41cHg7XG59XG4iLCJAaW1wb3J0ICd2YXJpYWJsZXMnO1xuXG5AbWl4aW4gbG9nbyB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktbG9nbztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAgIWltcG9ydGFudDtcbn1cblxuQG1peGluIGZsZXgtY2VudGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGluaGVyaXQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmc7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAmLmRhcmsge1xuICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1kYXJrLWJnO1xuICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcblxuICAgIC5saW5rLFxuICAgIC5sZWdhbCxcbiAgICAubG9nbyB7XG4gICAgICBjb2xvcjogJGNvbG9yLWRhcmstcHJpbWFyeSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5pY29uIHN2ZyB7XG4gICAgICBmaWxsOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbGluayB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1peGluIGJhZGdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1peGluIGxlZ2FsIHtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBjb2xvcjogJGNvbG9yLXNlY29uZGFyeTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMTJweDtcbn1cblxuQG1peGluIGJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xuICBnYXA6IDVweDtcbn1cblxuQG1peGluIGFkZG9ucy1iYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBmbGV4LWNlbnRlcjtcbn1cblxuQG1peGluIGJhZGdlLXRleHQtd3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG5AbWl4aW4gaG9tZXBhZ2UtYW5pbWF0aW9ucyB7XG4gIEBrZXlmcmFtZXMgaGVhZGluZ19hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgIH1cbiAgICAyJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA4JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDk1JSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIHN1YnRleHRfYW5pbWF0aW9uIHtcbiAgICAwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA4NiUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgOTElIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIENvbG9yc1xuJGNvbG9yLXByaW1hcnk6ICMxNzEyMGY7XG4kY29sb3Itc2Vjb25kYXJ5OiAjNzg3NDcxO1xuJGNvbG9yLWJnOiAjZmZmZmZmO1xuJGNvbG9yLWJvcmRlcjogI2YwZWVlYjtcbiRjb2xvci10b3Atc3RyaXAtYmc6ICNmMGVlZWI7XG4kY29sb3ItZGFyay1wcmltYXJ5OiAjZmZmZmZmO1xuJGNvbG9yLWRhcmstYmc6ICMxNzEyMGY7XG4kY29sb3ItcGluazogI2ZlYjNjNztcblxuLy8gRm9udCBmYW1pbGllc1xuJGZvbnQtZmFtaWx5LWJhc2U6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBBcmlhbCxcbiAgc2Fucy1zZXJpZjtcbiRmb250LWZhbWlseS1sb2dvOiAnS2xhcm5hIEhlYWRsaW5lJztcbiJdLCJzb3VyY2VSb290IjoiIn0= */`;
  const rs = /\bklarna\b\.?\s?/gi,
    os = /\bklarna\w+[.]?/gi,
    cs = '\n<span class="logo" part="osm-logo">$&</span>.';
  function ls(e) {
    return new RegExp(rs).test(e) || new RegExp(os).test(e);
  }
  function ds(e) {
    return is(
      (function (e = "") {
        return e.replace(rs, cs);
      })(e)
    );
  }
  const us = ui.AH`p{margin:0}.container{display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;text-align:center;color:#17120f;font-size:12px;font-weight:400;line-height:14px;background-color:#fff;border-style:solid;border-color:#f0eeeb;border-radius:5px;border-width:1px;padding:4px 8px;flex-direction:row-reverse;justify-content:center;align-items:center;display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box}.container.dark{color:#fff;background-color:#17120f;border-color:#f0eeeb}.container.dark .link,.container.dark .legal,.container.dark .logo{color:#fff !important}.container.dark .icon svg{fill:#fff}.container.dark{border-color:#17120f}.container.small{min-height:40px;max-width:335px}.container.standard{min-height:70px;max-width:350px}.container.standard.container{font-weight:400;font-size:16px;line-height:20px;text-align:center;padding-left:14px;padding-right:14px;padding-top:9px;padding-bottom:9px}.container.standard.container .legal{font-size:14px;line-height:18px}.container.standard .link{font-size:16px;line-height:20px}.container.standard .logo{font-size:16px}.container.custom-type1 .logo{display:none}.link{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#17120f;font-weight:400;font-size:12px;text-decoration:underline;white-space:nowrap;background:none;border:none;padding:0;cursor:pointer}.logo{font-family:"Klarna Headline";font-weight:bold;color:#17120f;text-transform:none !important;letter-spacing:0 !important}.legal{margin-top:4px;color:#787471;font-size:10px;font-weight:400;line-height:12px}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2NyZWRpdC1wcm9tb3Rpb24tYXV0by1zaXplL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi8uLi9rbGFybmEtbWVzc2FnaW5nL3NyYy9zdHlsZXMvX21peGlucy5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL192YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxFQUNFLFFBQUEsQ0FHRixXQ1lFLFlBQUEsQ0FDQSxxQkFBQSxDQUNBLHNCQUFBLENBQ0EsbUJBQUEsQ0FDQSxxQkFBQSxDQUNBLCtFQ1ppQixDRGFqQixpQkFBQSxDQUNBLGFDeEJjLENEeUJkLGNBQUEsQ0FDQSxlQUFBLENBQ0EsZ0JBQUEsQ0FDQSxxQkMxQlMsQ0QyQlQsa0JBQUEsQ0FDQSxvQkMzQmEsQ0Q0QmIsaUJBQUEsQ0FDQSxnQkFBQSxDQUNBLGVBQUEsQ0FDQSwwQkFBQSxDQUNBLHNCQUFBLENBQ0Esa0JBQUEsQ0Q3QkEsWUFBQSxDQUNBLHFCQUFBLENBQ0Esc0JBQUEsQ0FDQSxtQkFBQSxDQUNBLHFCQUFBLENDMkJBLGdCQUNFLFVDbENpQixDRG1DakIsd0JDbENZLENEbUNaLG9CQ3RDVyxDRHdDWCxtRUFHRSxxQkFBQSxDQUdGLDBCQUNFLFNDN0NlLENGUW5CLGdCQUNFLG9CRVJZLENGV2QsaUJBQ0UsZUFBQSxDQUNBLGVBQUEsQ0FHRixvQkFDRSxlQUFBLENBQ0EsZUFBQSxDQUVBLDhCQUNFLGVBQUEsQ0FDQSxjQUFBLENBQ0EsZ0JBQUEsQ0FDQSxpQkFBQSxDQUNBLGlCQUFBLENBQ0Esa0JBQUEsQ0FDQSxlQUFBLENBQ0Esa0JBQUEsQ0FFQSxxQ0FDRSxjQUFBLENBQ0EsZ0JBQUEsQ0FJSiwwQkFDRSxjQUFBLENBQ0EsZ0JBQUEsQ0FHRiwwQkFDRSxjQUFBLENBT0YsOEJBQ0UsWUFBQSxDQUtOLE1DTEUsK0VDOUNpQixDRCtDakIsYUN6RGMsQ0QwRGQsZUFBQSxDQUNBLGNBQUEsQ0FDQSx5QkFBQSxDQUNBLGtCQUFBLENBQ0EsZUFBQSxDQUNBLFdBQUEsQ0FDQSxTQUFBLENBQ0EsY0FBQSxDQUFBLE1BL0RBLDZCQ1VpQixDRFRqQixnQkFBQSxDQUNBLGFDSmMsQ0RLZCw4QkFBQSxDQUNBLDJCQUFBLENEK0RGLE9DS0UsY0FBQSxDQUNBLGFDMUVnQixDRDJFaEIsY0FBQSxDQUNBLGVBQUEsQ0FDQSxnQkFBQSIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL3N0eWxlcy9taXhpbnMnO1xuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4uY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgY29udGFpbmVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgJi5kYXJrIHtcbiAgICBib3JkZXItY29sb3I6ICRjb2xvci1kYXJrLWJnO1xuICB9XG5cbiAgJi5zbWFsbCB7XG4gICAgbWluLWhlaWdodDogNDBweDtcbiAgICBtYXgtd2lkdGg6IDMzNXB4O1xuICB9XG5cbiAgJi5zdGFuZGFyZCB7XG4gICAgbWluLWhlaWdodDogNzBweDtcbiAgICBtYXgtd2lkdGg6IDM1MHB4O1xuXG4gICAgJi5jb250YWluZXIge1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgcGFkZGluZy1sZWZ0OiAxNHB4O1xuICAgICAgcGFkZGluZy1yaWdodDogMTRweDtcbiAgICAgIHBhZGRpbmctdG9wOiA5cHg7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogOXB4O1xuXG4gICAgICAubGVnYWwge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIC5saW5rIHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgIH1cblxuICAgIC5sb2dvIHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICB9XG4gIH1cblxuICAvLyBDdXN0b20gdHlwZSBmb3IgU2FrcyBGaWZ0aCBBdmVudWUgd2l0aCB0aGVcbiAgLy8gc2FtZSB0ZW1wbGF0ZSBhcyBjcmVkaXQtcHJvbW90aW9uIGJ1dCB3aXRoIGhpZGRlbiBsb2dvXG4gICYuY3VzdG9tLXR5cGUxIHtcbiAgICAubG9nbyB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxufVxuXG4ubGluayB7XG4gIEBpbmNsdWRlIGxpbms7XG59XG5cbi5sb2dvIHtcbiAgQGluY2x1ZGUgbG9nbztcbn1cblxuLmxlZ2FsIHtcbiAgQGluY2x1ZGUgbGVnYWw7XG59XG4iLCJAaW1wb3J0ICd2YXJpYWJsZXMnO1xuXG5AbWl4aW4gbG9nbyB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktbG9nbztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAgIWltcG9ydGFudDtcbn1cblxuQG1peGluIGZsZXgtY2VudGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGluaGVyaXQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmc7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAmLmRhcmsge1xuICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1kYXJrLWJnO1xuICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcblxuICAgIC5saW5rLFxuICAgIC5sZWdhbCxcbiAgICAubG9nbyB7XG4gICAgICBjb2xvcjogJGNvbG9yLWRhcmstcHJpbWFyeSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5pY29uIHN2ZyB7XG4gICAgICBmaWxsOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbGluayB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1peGluIGJhZGdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1peGluIGxlZ2FsIHtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBjb2xvcjogJGNvbG9yLXNlY29uZGFyeTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMTJweDtcbn1cblxuQG1peGluIGJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xuICBnYXA6IDVweDtcbn1cblxuQG1peGluIGFkZG9ucy1iYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBmbGV4LWNlbnRlcjtcbn1cblxuQG1peGluIGJhZGdlLXRleHQtd3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG5AbWl4aW4gaG9tZXBhZ2UtYW5pbWF0aW9ucyB7XG4gIEBrZXlmcmFtZXMgaGVhZGluZ19hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgIH1cbiAgICAyJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA4JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDk1JSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIHN1YnRleHRfYW5pbWF0aW9uIHtcbiAgICAwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA4NiUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgOTElIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIENvbG9yc1xuJGNvbG9yLXByaW1hcnk6ICMxNzEyMGY7XG4kY29sb3Itc2Vjb25kYXJ5OiAjNzg3NDcxO1xuJGNvbG9yLWJnOiAjZmZmZmZmO1xuJGNvbG9yLWJvcmRlcjogI2YwZWVlYjtcbiRjb2xvci10b3Atc3RyaXAtYmc6ICNmMGVlZWI7XG4kY29sb3ItZGFyay1wcmltYXJ5OiAjZmZmZmZmO1xuJGNvbG9yLWRhcmstYmc6ICMxNzEyMGY7XG4kY29sb3ItcGluazogI2ZlYjNjNztcblxuLy8gRm9udCBmYW1pbGllc1xuJGZvbnQtZmFtaWx5LWJhc2U6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBBcmlhbCxcbiAgc2Fucy1zZXJpZjtcbiRmb250LWZhbWlseS1sb2dvOiAnS2xhcm5hIEhlYWRsaW5lJztcbiJdLCJzb3VyY2VSb290IjoiIn0= */`,
    gs = ({ width: e = 71.25, height: t = 30 } = {}) =>
      `<svg\n  part="osm-badge"\n  role="img"\n  xmlns="http://www.w3.org/2000/svg"\n  width=${e} height=${t}\n  viewBox="0 0 71.25 30"\n  aria-label="Klarna"\n  version="2.1"\n  <title id="osm-klarna-title">Klarna badge</title>\n>\n  <g clip-path="url(#a)">\n    <path fill="#FFA8CD" d="M62.7688 0H8.48123C3.79718 0 0 3.79718 0 8.48123V21.5188C0 26.2028 3.79718 30 8.48123 30H62.7688c4.684 0 8.4812-3.7972 8.4812-8.4812V8.48123C71.25 3.79718 67.4528 0 62.7688 0Z"/>\n    <path fill="#0B051D" d="M57.412 19.1418c-1.2436 0-2.2134-1.0286-2.2134-2.2776 0-1.2491.9698-2.2776 2.2134-2.2776 1.2441 0 2.2135 1.0285 2.2135 2.2776 0 1.249-.9694 2.2776-2.2135 2.2776Zm-.6215 2.4062c1.0608 0 2.4145-.4041 3.1645-1.9837l.0731.0367c-.329.8633-.329 1.3776-.329 1.5062v.202h2.6704v-8.8901h-2.6704v.2021c0 .1286 0 .6428.329 1.5061l-.0731.0368c-.75-1.5797-2.1037-1.9838-3.1645-1.9838-2.543 0-4.3355 2.0205-4.3355 4.6839 0 2.6633 1.7925 4.6838 4.3355 4.6838Zm-8.9822-9.3677c-1.2073 0-2.1586.4225-2.9268 1.9838l-.0732-.0368c.3292-.8633.3292-1.3775.3292-1.5061v-.2021h-2.6708v8.8901h2.744v-4.6838c0-1.2307.7134-2.0021 1.8659-2.0021 1.1526 0 1.7193.6612 1.7193 1.9837v4.7022H51.54v-5.6573c0-2.0205-1.5731-3.4716-3.7317-3.4716Zm-9.3112 1.9838-.0731-.0368c.3293-.8633.3293-1.3775.3293-1.5061v-.2021h-2.6708v8.8901h2.7439l.0183-4.2797c0-1.249.6586-2.0021 1.7379-2.0021.2926 0 .5305.0367.8048.1102v-2.7185c-1.2073-.2571-2.2866.2021-2.8903 1.745Zm-8.7257 4.9777c-1.244 0-2.2135-1.0286-2.2135-2.2776 0-1.2491.9695-2.2776 2.2135-2.2776 1.2439 0 2.2134 1.0285 2.2134 2.2776 0 1.249-.9695 2.2776-2.2134 2.2776Zm-.622 2.4062c1.061 0 2.4147-.4041 3.1647-1.9837l.0732.0367c-.3293.8633-.3293 1.3776-.3293 1.5062v.202h2.6708v-8.8901H32.058v.2021c0 .1286 0 .6428.3293 1.5061l-.0732.0368c-.75-1.5797-2.1037-1.9838-3.1647-1.9838-2.5428 0-4.3355 2.0205-4.3355 4.6839 0 2.6633 1.7927 4.6838 4.3355 4.6838Zm-8.1588-.2388h2.744V8.45166h-2.744V21.3092ZM18.9784 8.45166h-2.7988c0 2.29594-1.4086 4.35314-3.5489 5.82264l-.8415.5878V8.45166H8.88062V21.3092h2.90858v-6.3736l4.8111 6.3736h3.5489L15.521 15.211c2.1037-1.5245 3.4757-3.894 3.4574-6.75934Z"/>\n  </g>\n  <defs>\n    <clipPath id="a">\n      <path fill="#fff" d="M0 0h71.25v30H0z"/>\n    </clipPath>\n  </defs>\n</svg>`,
    bs = ui.AH`p{margin:0}.container{display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;text-align:center;color:#17120f;font-size:12px;font-weight:400;line-height:14px;background-color:#fff;border-style:solid;border-color:#f0eeeb;border-radius:5px;border-width:1px;padding:4px 8px;flex-direction:row-reverse;justify-content:center;align-items:center;font-size:14px;line-height:20px;flex-direction:row;justify-content:flex-start;text-align:left;padding-left:14px;padding-right:14px;padding-top:14px;padding-bottom:14px;border-radius:0px}.container.dark{color:#fff;background-color:#17120f;border-color:#f0eeeb}.container.dark .link,.container.dark .legal,.container.dark .logo{color:#fff !important}.container.dark .icon svg{fill:#fff}.link{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#17120f;font-weight:400;font-size:12px;text-decoration:underline;white-space:nowrap;background:none;border:none;padding:0;cursor:pointer;font-size:14px;line-height:20px}.badge{display:flex;align-items:center}.legal{margin-top:4px;color:#787471;font-size:10px;font-weight:400;line-height:12px;font-size:14px;font-weight:400;line-height:20px}.text-wrapper{margin-left:14px;margin-right:0px}.logo{font-family:"Klarna Headline";font-weight:bold;color:#17120f;text-transform:none !important;letter-spacing:0 !important}.badge-container{display:flex;flex-direction:inherit;justify-content:center;align-items:center;gap:5px}.badge-text-wrapper{margin-left:5px;margin-right:5px}.addons-badge-container{display:flex;flex-direction:inherit;justify-content:center;align-items:center}@media(max-width: 200px){.container{flex-wrap:wrap;justify-content:flex-start}.text-wrapper{margin-top:14px;margin-left:0}}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2NyZWRpdC1wcm9tb3Rpb24tYmFkZ2Uvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3N0eWxlcy9fbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vLi8uLi9rbGFybmEtbWVzc2FnaW5nL3NyYy9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLEVBQ0UsUUFBQSxDQUdGLFdDWUUsWUFBQSxDQUNBLHFCQUFBLENBQ0Esc0JBQUEsQ0FDQSxtQkFBQSxDQUNBLHFCQUFBLENBQ0EsK0VDWmlCLENEYWpCLGlCQUFBLENBQ0EsYUN4QmMsQ0R5QmQsY0FBQSxDQUNBLGVBQUEsQ0FDQSxnQkFBQSxDQUNBLHFCQzFCUyxDRDJCVCxrQkFBQSxDQUNBLG9CQzNCYSxDRDRCYixpQkFBQSxDQUNBLGdCQUFBLENBQ0EsZUFBQSxDQUNBLDBCQUFBLENBQ0Esc0JBQUEsQ0FDQSxrQkFBQSxDRDdCQSxjQUFBLENBQ0EsZ0JBQUEsQ0FDQSxrQkFBQSxDQUNBLDBCQUFBLENBQ0EsZUFBQSxDQUNBLGlCQUFBLENBQ0Esa0JBQUEsQ0FDQSxnQkFBQSxDQUNBLG1CQUFBLENBQ0EsaUJBQUEsQ0NzQkEsZ0JBQ0UsVUNsQ2lCLENEbUNqQix3QkNsQ1ksQ0RtQ1osb0JDdENXLENEd0NYLG1FQUdFLHFCQUFBLENBR0YsMEJBQ0UsU0M3Q2UsQ0ZjckIsTUNxQ0UsK0VDOUNpQixDRCtDakIsYUN6RGMsQ0QwRGQsZUFBQSxDQUNBLGNBQUEsQ0FDQSx5QkFBQSxDQUNBLGtCQUFBLENBQ0EsZUFBQSxDQUNBLFdBQUEsQ0FDQSxTQUFBLENBQ0EsY0FBQSxDRDVDQSxjQUFBLENBQ0EsZ0JBQUEsQ0FHRixPQzRDRSxZQUFBLENBQ0Esa0JBQUEsQ0R6Q0YsT0M2Q0UsY0FBQSxDQUNBLGFDMUVnQixDRDJFaEIsY0FBQSxDQUNBLGVBQUEsQ0FDQSxnQkFBQSxDRC9DQSxjQUFBLENBQ0EsZUFBQSxDQUNBLGdCQUFBLENBR0YsY0FDRSxnQkFBQSxDQUNBLGdCQUFBLENBR0YsTUN2Q0UsNkJDVWlCLENEVGpCLGdCQUFBLENBQ0EsYUNKYyxDREtkLDhCQUFBLENBQ0EsMkJBQUEsQ0R1Q0YsaUJDbkNFLFlBQUEsQ0FDQSxzQkFBQSxDQUNBLHNCQUFBLENBQ0Esa0JBQUEsQ0FzRUEsT0FBQSxDRGxDRixvQkMwQ0UsZUFBQSxDQUNBLGdCQUFBLENEdkNGLHdCQzNDRSxZQUFBLENBQ0Esc0JBQUEsQ0FDQSxzQkFBQSxDQUNBLGtCQUFBLENENENGLHlCQUNFLFdBQ0UsY0FBQSxDQUNBLDBCQUFBLENBR0YsY0FDRSxlQUFBLENBQ0EsYUFBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vc3R5bGVzL21peGlucyc7XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbi5jb250YWluZXIge1xuICBAaW5jbHVkZSBjb250YWluZXI7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZy1sZWZ0OiAxNHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxNHB4O1xuICBwYWRkaW5nLXRvcDogMTRweDtcbiAgcGFkZGluZy1ib3R0b206IDE0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDBweDtcbn1cblxuLmxpbmsge1xuICBAaW5jbHVkZSBsaW5rO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xufVxuXG4uYmFkZ2Uge1xuICBAaW5jbHVkZSBiYWRnZTtcbn1cblxuLmxlZ2FsIHtcbiAgQGluY2x1ZGUgbGVnYWw7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG59XG5cbi50ZXh0LXdyYXBwZXIge1xuICBtYXJnaW4tbGVmdDogMTRweDtcbiAgbWFyZ2luLXJpZ2h0OiAwcHg7XG59XG5cbi5sb2dvIHtcbiAgQGluY2x1ZGUgbG9nbztcbn1cblxuLmJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGJhZGdlLWNvbnRhaW5lcjtcbn1cblxuLmJhZGdlLXRleHQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIGJhZGdlLXRleHQtd3JhcHBlcjtcbn1cblxuLmFkZG9ucy1iYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBhZGRvbnMtYmFkZ2UtY29udGFpbmVyO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMjAwcHgpIHtcbiAgLmNvbnRhaW5lciB7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgfVxuXG4gIC50ZXh0LXdyYXBwZXIge1xuICAgIG1hcmdpbi10b3A6IDE0cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJ3ZhcmlhYmxlcyc7XG5cbkBtaXhpbiBsb2dvIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1sb2dvO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICBsZXR0ZXItc3BhY2luZzogMCAhaW1wb3J0YW50O1xufVxuXG5AbWl4aW4gZmxleC1jZW50ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogaW5oZXJpdDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbkBtaXhpbiBjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1iZztcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYuZGFyayB7XG4gICAgY29sb3I6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWRhcmstYmc7XG4gICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuXG4gICAgLmxpbmssXG4gICAgLmxlZ2FsLFxuICAgIC5sb2dvIHtcbiAgICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmljb24gc3ZnIHtcbiAgICAgIGZpbGw6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBsaW5rIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5AbWl4aW4gYmFkZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gbGVnYWwge1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIGNvbG9yOiAkY29sb3Itc2Vjb25kYXJ5O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xufVxuXG5AbWl4aW4gYmFkZ2UtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgZmxleC1jZW50ZXI7XG4gIGdhcDogNXB4O1xufVxuXG5AbWl4aW4gYWRkb25zLWJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xufVxuXG5AbWl4aW4gYmFkZ2UtdGV4dC13cmFwcGVyIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbkBtaXhpbiBob21lcGFnZS1hbmltYXRpb25zIHtcbiAgQGtleWZyYW1lcyBoZWFkaW5nX2FuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgfVxuICAgIDIlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDglIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDkwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgOTUlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc3VidGV4dF9hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDg2JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MSUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29sb3JzXG4kY29sb3ItcHJpbWFyeTogIzE3MTIwZjtcbiRjb2xvci1zZWNvbmRhcnk6ICM3ODc0NzE7XG4kY29sb3ItYmc6ICNmZmZmZmY7XG4kY29sb3ItYm9yZGVyOiAjZjBlZWViO1xuJGNvbG9yLXRvcC1zdHJpcC1iZzogI2YwZWVlYjtcbiRjb2xvci1kYXJrLXByaW1hcnk6ICNmZmZmZmY7XG4kY29sb3ItZGFyay1iZzogIzE3MTIwZjtcbiRjb2xvci1waW5rOiAjZmViM2M3O1xuXG4vLyBGb250IGZhbWlsaWVzXG4kZm9udC1mYW1pbHktYmFzZTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEFyaWFsLFxuICBzYW5zLXNlcmlmO1xuJGZvbnQtZmFtaWx5LWxvZ286ICdLbGFybmEgSGVhZGxpbmUnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */`,
    hs = ui.qy`<svg
  part="badge"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 60 30"
  aria-label="Klarna"
>
  ${ui.JW`<g fill="none" fill-rule="evenodd">
    <path fill="#FFB3C7" d="M55.5 30h-51C2.025 30 0 27.975 0 25.5v-21C0 2.0265 2.025 0 4.5 0h51C57.9735 0 60 2.0265 60 4.5v21c0 2.475-2.0265 4.5-4.5 4.5"></path><path fill="#000" d="M45.74265 18.1758c-1.02 0-1.8465-.783-1.8465-1.752 0-.966.8265-1.7505 1.8465-1.7505s1.8465.7845 1.8465 1.7505c0 .969-.8265 1.752-1.8465 1.752Zm1.8525-5.157v.438c-.5745-.393-1.269-.6255-2.019-.6255-1.9845 0-3.5925 1.6095-3.5925 3.5925 0 1.9845 1.608 3.5925 3.5925 3.5925.75 0 1.4445-.231 2.019-.6225v.435h2.04v-6.81h-2.04Zm-31.5522-3.0345h-2.2125c0 1.812-.831 3.474-2.2845 4.563l-.876.6555 3.3945 4.6275h2.79l-3.123-4.257c1.479-1.4745 2.3115-3.4575 2.3115-5.589m-7.9077 9.84615h2.265v-9.846h-2.265zm9.3765-.003h2.1345v-9.843h-2.1345zM38.3613 12.8364c-.813 0-1.584.2535-2.0985.951v-.7665h-2.0295v6.807h2.0535v-3.5775c0-1.035.6945-1.542 1.5315-1.542.894 0 1.41.534 1.41 1.5285v3.591h2.0355v-4.3305c0-1.5825-1.26-2.661-2.9025-2.661m-14.12115 5.3394c-1.02 0-1.8465-.783-1.8465-1.752 0-.966.8265-1.7505 1.8465-1.7505s1.8465.7845 1.8465 1.7505c0 .969-.8265 1.752-1.8465 1.752Zm1.8525-5.157v.438c-.5745-.393-1.269-.6255-2.019-.6255-1.9845 0-3.5925 1.6095-3.5925 3.5925 0 1.9845 1.608 3.5925 3.5925 3.5925.75 0 1.4445-.231 2.019-.6225v.435h2.04v-6.81h-2.04Zm5.19195.88845v-.8865h-2.0865v6.807h2.091v-3.1785c0-1.0725 1.1625-1.6485 1.968-1.6485h.0255v-1.98c-.828 0-1.59.3555-1.998.8865m20.5137 3.50535c-.7065 0-1.2795.573-1.2795 1.281 0 .705.573 1.278 1.2795 1.278.7065 0 1.2795-.573 1.2795-1.278 0-.708-.573-1.281-1.2795-1.281"></path>
  </g>`}
</svg>`,
    ps = ui.qy`<svg
  part="badge"
  role="img"
  focusable="false"
  viewBox="0 0 35 22"
  aria-label="Mastercard"
>
  ${ui.JW`<g fill="none">
    <path fill="#FF5F00" d="M12.144 3.898h8.591v13.959h-8.591z"/><path fill="#EB001B" d="M13.0286 10.87904c-.00215-2.72342 1.25459-5.29659 3.40812-6.97808-3.65851-2.86026-8.91228-2.44364-12.0691.95708-3.15683 3.40071-3.15683 8.64376 0 12.04448 3.15682 3.40071 8.41059 3.81733 12.0691.95707-2.15422-1.68202-3.41104-4.25626-3.40812-6.98055Z"/><path fill="#F79E1B" d="M30.87476 10.87904c0 3.39865-1.95083 6.4989-5.02376 7.98409-3.07292 1.48518-6.72853 1.09455-9.41428-1.006 2.1526-1.68292 3.40943-4.25575 3.40943-6.97932 0-2.72357-1.25683-5.2964-3.40943-6.97931 2.68575-2.10055 6.34136-2.49119 9.41428-1.006 3.07293 1.48518 5.02376 4.58544 5.02376 7.98408v.00246ZM30.23 17v-.82857h.16667V16H30v.17143h.15667V17H30.23Zm.77 0v-1h-.12l-.14.71429L30.6 16h-.12v1h.08667v-.75714l.13.65h.09l.13-.65V17H31Z"/>
  </g>`}
</svg> `,
    ms = ui.qy`<svg
  part="badge"
  role="img"
  focusable="false"
  viewBox="0 0 35 22"
  aria-label="Maestro"
>
  ${ui.JW`<g fill="none" fill-rule="evenodd">
    <path fill="#000" d="M0 22h35V0H0z"/><path fill="#FFF" d="M25.66418 19.92579v.04787h.0442c.01019 0 .01813-.00184.02424-.00591.00591-.00387.00897-.00998.00897-.01833 0-.00795-.00306-.01365-.00897-.01793-.0061-.00367-.01405-.0057-.02424-.0057h-.0442Zm.0446-.03382c.02303 0 .04095.0051.05338.01548.01243.0104.01874.02424.01874.04197 0 .01487-.00489.02709-.01487.03687-.01019.00978-.02424.01548-.04257.01772l.05887.06783h-.04604l-.0546-.06722h-.01751v.06722h-.0383v-.17987h.0829Zm-.0114.2416c.02098 0 .04033-.00408.05826-.01182a.1599.1599 0 0 0 .04767-.03218.15503.15503 0 0 0 .03198-.04808c.00774-.01833.0114-.03789.0114-.05887 0-.02078-.00366-.04033-.0114-.05887a.15177.15177 0 0 0-.03198-.04787.15147.15147 0 0 0-.04767-.03178c-.01793-.00774-.03728-.01181-.05826-.01181a.15268.15268 0 0 0-.05948.01181c-.01854.00774-.03463.01813-.04807.03178-.01386.01365-.02424.02954-.03199.04787-.00794.01854-.01181.0381-.01181.05887 0 .02098.00387.04054.01181.05887.00775.01833.01813.03422.03199.04808.01344.01344.02953.02424.04807.03218a.15268.15268 0 0 0 .05948.01182Zm0-.34447c.0273 0 .05276.0051.0766.01508.02383.01018.0448.02403.06273.04155.01773.01752.03178.0383.04217.06172a.18732.18732 0 0 1 .01548.07517.18635.18635 0 0 1-.01548.07496.20168.20168 0 0 1-.04217.06152.19954.19954 0 0 1-.06274.04156c-.02383.01039-.0493.01548-.07659.01548-.0279 0-.05398-.0051-.07802-.01548a.19283.19283 0 0 1-.06274-.04156c-.01772-.01772-.03198-.03809-.04196-.06152-.01039-.02342-.01569-.04848-.01569-.07496a.18409.18409 0 0 1 .01569-.07517.1928.1928 0 0 1 .04196-.06172c.01772-.01752.0385-.03137.06274-.04155.02404-.00999.05011-.01508.07802-.01508Zm-2.92905-1.70907c.08535 0 .20757.0163.30107.05296l-.13017.39865c-.08942-.03646-.17905-.04889-.2646-.04889-.27643 0-.41495.17906-.41495.5005v1.09022h-.4229v-1.94455h.41903v.23589c.1098-.17091.26848-.28478.51252-.28478Zm-1.46423.43531h-.69157v.87878c0 .19535.06906.32532.2807.32532.1098 0 .24811-.03647.3742-.1098l.12223.36218c-.13445.0935-.3461.15054-.52902.15054-.5003 0-.67528-.26868-.67528-.7201v-.88692h-.39457v-.38642h.39457v-.58993h.42697l.0002.58993h.69157v.38642Zm-2.03316.1098c-.11795-.07313-.35791-.16663-.60602-.16663-.23182 0-.37033.08535-.37033.22774 0 .13017.14666.16663.32959.19128l.19942.02831c.4231.06111.67936.24017.67936.58198 0 .37013-.32552.63454-.88693.63454-.31717 0-.6103-.08148-.8419-.25218l.19921-.3298c.1424.1098.35384.2035.64676.2035.28886 0 .44347-.08535.44347-.23589 0-.1098-.1098-.1709-.34161-.2035l-.19943-.02831c-.43532-.06111-.6712-.25626-.6712-.57363 0-.38643.31716-.62252.80951-.62252.30923 0 .58993.06905.79343.2033l-.18333.3418Zm-3.22993.30515h1.00895c-.04482-.30108-.2198-.47178-.49236-.47178-.30107 0-.47177.19107-.51659.47178Zm1.44833.1709c0 .05684-.00407.1098-.00814.16276h-1.44426c.0611.34997.30922.47586.58177.47586.19536 0 .40273-.07313.56549-.2033l.20757.3133c-.2361.19922-.50457.27255-.7975.27255-.58178 0-.99672-.40292-.99672-1.02117 0-.60601.39885-1.02116.9682-1.02116.54511 0 .91952.41515.9236 1.02116Zm6.75095-.62333c-.08678 0-.16745.01528-.2418.04563-.07435.03056-.13852.07313-.1927.12793-.05439.055-.09696.12059-.12793.19698-.03116.0766-.04665.16072-.04665.2528 0 .09207.01549.1762.04665.2528.03097.07638.07354.14218.12793.19697.05418.0548.11835.09758.1927.12793.07435.03055.15502.04583.2418.04583.08657 0 .16724-.01528.24139-.04583.07476-.03035.13933-.07313.19392-.12793.055-.0548.09799-.12059.12915-.19698.03117-.0766.04685-.16072.04685-.2528 0-.09207-.01568-.1762-.04685-.2528-.03116-.07638-.07415-.14197-.12915-.19697-.05459-.0548-.11916-.09737-.19392-.12793-.07415-.03035-.15482-.04563-.2414-.04563Zm0-.40007c.15013 0 .28926.02607.41739.07822.12792.05194.23833.12385.33163.21511.0935.09146.16683.19943.21959.32389.05256.12467.07904.25993.07904.40618 0 .14626-.02648.28152-.07904.40599-.05276.12466-.1261.23263-.2196.32389-.09329.09146-.2037.16316-.33162.21531-.12813.05215-.26726.07822-.4174.07822-.15032 0-.28945-.02607-.41738-.07822s-.23833-.12385-.33102-.21531c-.09268-.09126-.1654-.19923-.21817-.3239-.05275-.12446-.07924-.25972-.07924-.40598 0-.14625.02649-.28151.07924-.40618.05276-.12446.12549-.23243.21817-.32389.09269-.09126.2031-.16317.33102-.21511.12793-.05215.26706-.07822.41739-.07822Zm-10.62763 1.0234c0 .34162.22387.62252.58993.62252.34975 0 .58585-.26868.58585-.62252 0-.35383-.2361-.62251-.58585-.62251-.36606 0-.58993.2807-.58993.62251Zm1.57443 0v.97228h-.4231v-.23609c-.13424.17519-.33753.28498-.61437.28498-.5451 0-.97228-.42737-.97228-1.02117 0-.594.42717-1.02116.97228-1.02116.27684 0 .48013.11.61437.28478v-.2359h.4231v.97228Zm-2.38395.97228v-1.22059c0-.45956-.29293-.76878-.7649-.77285-.24812-.00408-.50438.07333-.68343.34589-.13424-.21573-.34569-.3459-.64269-.3459-.20757 0-.41087.06092-.56955.28886v-.23996h-.4231v1.94455h.42717v-1.078c0-.33774.1872-.5168.47585-.5168.2807 0 .4231.18314.4231.51273v1.08207h.42716v-1.078c0-.33774.19535-.5168.47606-.5168.28885 0 .42716.18314.42716.51273v1.08207h.42717Z"/><path fill="#7673C0" d="M14.28578 14.81822h6.41666V3.28737h-6.41666z"/><path fill="#EB001B" d="M14.69323 9.0528c0-2.33934 1.09531-4.42261 2.80092-5.76543-1.24748-.98205-2.8213-1.5679-4.532-1.5679-4.04963 0-7.33272 3.28329-7.33272 7.33333 0 4.05003 3.2831 7.33333 7.33272 7.33333 1.7107 0 3.28452-.58585 4.532-1.5679-1.7056-1.34282-2.80092-3.4261-2.80092-5.76543"/><path fill="#00A1DF" d="M29.3589 9.0528c0 4.05003-3.2829 7.33333-7.33273 7.33333-1.7107 0-3.28472-.58585-4.532-1.5679 1.70561-1.34282 2.80093-3.4261 2.80093-5.76543 0-2.33934-1.09532-4.42261-2.80093-5.76543 1.24728-.98205 2.8213-1.5679 4.532-1.5679 4.04984 0 7.33272 3.28329 7.33272 7.33333"/>
  </g>`}
</svg> `,
    Is = ui.qy`<svg
  part="badge"
  role="img"
  focusable="false"
  viewBox="0 0 35 22"
  aria-label="Visa"
>
  ${ui.JW`<g fill="none">
    <path fill="#1A1F70" d="M33.24443 22H1.7277C.76903 21.9849 0 21.20974 0 20.2588V1.7412C0 .79027.76903.0151 1.7277 0h31.51673C34.214 0 35 .77956 35 1.7412v18.5176C35 21.22043 34.214 22 33.24443 22"/><path fill="#FFF" d="M17.33333 7.645 15.8889 14.3h-1.72222l1.41666-6.655h1.75Zm7.33334 4.29.91666-2.5025.52778 2.5025h-1.44444ZM26.6111 14.3h1.58333l-1.38888-6.65503h-1.5c-.314-.00275-.59888.18165-.72223.46753L21.97223 14.3h1.83333l.3611-.99h2.22223l.22222.99Zm-4.55555-2.1725c0-1.76-2.44445-1.87-2.44445-2.64 0-.2475.25-.495.75-.5775.59104-.05274 1.18558.0517 1.72222.3025L22.3889 7.81c-.52195-.20292-1.07815-.30558-1.63889-.30257-1.72222 0-2.91667.90757-2.94444 2.20007-.02778 1.2925.8611 1.485 1.52777 1.815.66667.33.91667.55.8889.825-.02779.275-.52779.66-1.02779.66-.61702.00205-1.22593-.13923-1.77777-.4125l-.33334 1.4575a5.77516 5.77516 0 0 0 1.94445.33003c1.83333 0 3.02778-.88003 3.02778-2.25503M14.8611 7.645 12.02778 14.3h-1.83334L8.80556 8.965c-.03566-.24817-.19111-.46362-.41667-.5775a6.6586 6.6586 0 0 0-1.72222-.55l.05555-.1925h2.94445c.39585-.00586.73734.27392.80555.66l.75 3.85 1.80556-4.51h1.83333Z"/>
  </g>`}
</svg> `,
    fs = ui.qy`<svg
  part="badge"
  role="img"
  focusable="false"
  viewBox="0 0 35 22"
  aria-label="VisaElectron"
>
  ${ui.JW`<path fill="#FFF" d="M0 4h32v14H0Z"/><path fill="#F7B600" d="M0 18v3a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1v-3H0Z"/><path fill="#1A1F71" d="M25.38 14.93a1.57 1.57 0 0 1 .01.25.6.6 0 0 1 .36-.26c.06-.02.1-.03.16-.03.2 0 .34.05.43.16.1.1.14.25.14.44v.96h-.21v-.84c0-.17-.03-.3-.1-.39-.05-.09-.16-.13-.32-.13l-.09.01a.4.4 0 0 0-.16.07c-.05.04-.1.1-.14.18a.68.68 0 0 0-.07.32v.78h-.21v-1.18a3.13 3.13 0 0 0-.02-.34h.22Zm-.61.77c0 .1-.02.21-.06.31a.77.77 0 0 1-.75.48.85.85 0 0 1-.32-.06.76.76 0 0 1-.48-.74c0-.11.02-.22.06-.32a.77.77 0 0 1 .74-.48c.12 0 .23.02.33.06a.76.76 0 0 1 .48.74Zm-.23 0a.68.68 0 0 0-.04-.24.54.54 0 0 0-.54-.37.58.58 0 0 0-.24.04.53.53 0 0 0-.18.13.59.59 0 0 0-.1.2.68.68 0 0 0-.05.23c0 .09.01.17.04.24l.11.2a.58.58 0 0 0 .42.18c.1-.01.17-.03.24-.06a.54.54 0 0 0 .3-.32.68.68 0 0 0 .04-.24Zm-2.32-.3a4.38 4.38 0 0 0-.01-.47h.21v.28a.47.47 0 0 1 .17-.22.5.5 0 0 1 .32-.1c.07 0 .12 0 .16.02l-.04.21a.36.36 0 0 0-.12-.01.44.44 0 0 0-.36.16.5.5 0 0 0-.11.32v.86h-.22v-1.04Zm-.32-.27h-.45v.9c0 .05 0 .1.02.13a.2.2 0 0 0 .05.09c.01.02.04.03.07.04h.2a.53.53 0 0 0 .1-.05l.02.2a.69.69 0 0 1-.42.04.3.3 0 0 1-.12-.06.34.34 0 0 1-.1-.13.5.5 0 0 1-.03-.2v-.96h-.32v-.2h.32v-.43h.21v.43h.44v.2Zm-1.27.16a.46.46 0 0 0-.38-.2.52.52 0 0 0-.53.36.73.73 0 0 0-.04.24c0 .09.01.17.04.25a.52.52 0 0 0 .53.36.46.46 0 0 0 .38-.2l.18.13a.72.72 0 0 1-.56.26.85.85 0 0 1-.33-.05.72.72 0 0 1-.42-.42.9.9 0 0 1-.05-.33.9.9 0 0 1 .05-.32.72.72 0 0 1 .42-.42.85.85 0 0 1 .63 0 1 1 0 0 1 .26.2l-.18.14Zm-2.78.46c0 .08.03.15.06.22a.57.57 0 0 0 .29.29.58.58 0 0 0 .51-.04.6.6 0 0 0 .19-.19l.16.14a.77.77 0 0 1-.3.25.84.84 0 0 1-.66.01.74.74 0 0 1-.42-.42.83.83 0 0 1-.06-.32c0-.11.02-.22.06-.32a.77.77 0 0 1 .4-.42c.1-.04.2-.06.31-.06a.69.69 0 0 1 .68.47 1 1 0 0 1 .05.3v.1h-1.27Zm1.04-.17a.49.49 0 0 0-.13-.36.48.48 0 0 0-.37-.13.57.57 0 0 0-.49.3.4.4 0 0 0-.04.19h1.03Zm-1.72.87h-.21V14h.21zm-1.89-.21h1.23v.21h-1.47v-2.3h1.43v.21h-1.2v.79h1.12v.21h-1.11zm9.9-10.33L26.63 13h-1.67l-.21-1.06h-2.3L22.07 13H20.2l2.66-6.5c.2-.45.51-.58.94-.58h1.39Zm-2.21 4.57h1.48l-.41-2.05-.12-.61-.24.68-.71 1.98Zm-2.39-4.4c-.35-.14-.9-.3-1.6-.3-1.77 0-3.02.96-3.03 2.34-.01 1.02.89 1.58 1.57 1.92.7.35.93.57.93.88 0 .48-.56.7-1.07.7-.72 0-1.1-.12-1.7-.38l-.22-.11-.25 1.58c.42.2 1.19.37 2 .38 1.88 0 3.1-.95 3.11-2.42 0-.8-.47-1.42-1.5-1.92-.63-.33-1.01-.55-1-.88 0-.3.32-.61 1.02-.61a3.1 3.1 0 0 1 1.34.27l.16.08.24-1.53m-8.28 6.9 1.1-7.08h1.8l-1.13 7.08H12.3M6.38 6.83a7.2 7.2 0 0 0-1.88-.78l.02-.14h2.9c.38.01.7.14.8.6l.63 3.25.19.98 1.75-4.83h1.9l-2.82 7.07h-1.9L6.38 6.83ZM0 1v3h32V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1Z"/>`}
</svg> `,
    Cs = ui.AH`.container{display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;text-align:center;color:#17120f;font-size:12px;font-weight:400;line-height:14px;background-color:#fff;border-style:solid;border-color:#f0eeeb;border-radius:5px;border-width:1px;padding:4px 8px;flex-direction:row-reverse;justify-content:center;align-items:center;border:none;display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box;background:none}.container.dark{color:#fff;background-color:#17120f;border-color:#f0eeeb}.container.dark .link,.container.dark .legal,.container.dark .logo{color:#fff !important}.container.dark .icon svg{fill:#fff}.footer-badges{display:inline-flex;align-items:center;justify-content:center;flex-wrap:wrap;list-style-type:none;margin:-8px;padding:0px}.footer-badges .badge{margin:8px 8px;height:30px;white-space:nowrap}.footer-badges .badge>svg{height:100%}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2Zvb3Rlci1wcm9tb3Rpb24tYXV0by1zaXplL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi8uLi9rbGFybmEtbWVzc2FnaW5nL3NyYy9zdHlsZXMvX21peGlucy5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL192YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxXQ2dCRSxZQUFBLENBQ0EscUJBQUEsQ0FDQSxzQkFBQSxDQUNBLG1CQUFBLENBQ0EscUJBQUEsQ0FDQSwrRUNaaUIsQ0RhakIsaUJBQUEsQ0FDQSxhQ3hCYyxDRHlCZCxjQUFBLENBQ0EsZUFBQSxDQUNBLGdCQUFBLENBQ0EscUJDMUJTLENEMkJULGtCQUFBLENBQ0Esb0JDM0JhLENENEJiLGlCQUFBLENBQ0EsZ0JBQUEsQ0FDQSxlQUFBLENBQ0EsMEJBQUEsQ0FDQSxzQkFBQSxDQUNBLGtCQUFBLENEakNBLFdBQUEsQ0FDQSxZQUFBLENBQ0EscUJBQUEsQ0FDQSxzQkFBQSxDQUNBLG1CQUFBLENBQ0EscUJBQUEsQ0FDQSxlQUFBLENDNkJBLGdCQUNFLFVDbENpQixDRG1DakIsd0JDbENZLENEbUNaLG9CQ3RDVyxDRHdDWCxtRUFHRSxxQkFBQSxDQUdGLDBCQUNFLFNDN0NlLENGT3JCLGVBQ0UsbUJBQUEsQ0FDQSxrQkFBQSxDQUNBLHNCQUFBLENBQ0EsY0FBQSxDQUNBLG9CQUFBLENBQ0EsV0FBQSxDQUNBLFdBQUEsQ0FFQSxzQkFDRSxjQUFBLENBQ0EsV0FBQSxDQUNBLGtCQUFBLENBRUEsMEJBQ0UsV0FBQSIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL3N0eWxlcy9taXhpbnMnO1xuXG4uY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgY29udGFpbmVyO1xuICBib3JkZXI6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbn1cblxuLmZvb3Rlci1iYWRnZXMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBtYXJnaW46IC04cHg7XG4gIHBhZGRpbmc6IDBweDtcblxuICAuYmFkZ2Uge1xuICAgIG1hcmdpbjogOHB4IDhweDtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuICAgID4gc3ZnIHtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG4gIH1cbn1cbiIsIkBpbXBvcnQgJ3ZhcmlhYmxlcyc7XG5cbkBtaXhpbiBsb2dvIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1sb2dvO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICBsZXR0ZXItc3BhY2luZzogMCAhaW1wb3J0YW50O1xufVxuXG5AbWl4aW4gZmxleC1jZW50ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogaW5oZXJpdDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbkBtaXhpbiBjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1iZztcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYuZGFyayB7XG4gICAgY29sb3I6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWRhcmstYmc7XG4gICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuXG4gICAgLmxpbmssXG4gICAgLmxlZ2FsLFxuICAgIC5sb2dvIHtcbiAgICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmljb24gc3ZnIHtcbiAgICAgIGZpbGw6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBsaW5rIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5AbWl4aW4gYmFkZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gbGVnYWwge1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIGNvbG9yOiAkY29sb3Itc2Vjb25kYXJ5O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xufVxuXG5AbWl4aW4gYmFkZ2UtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgZmxleC1jZW50ZXI7XG4gIGdhcDogNXB4O1xufVxuXG5AbWl4aW4gYWRkb25zLWJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xufVxuXG5AbWl4aW4gYmFkZ2UtdGV4dC13cmFwcGVyIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbkBtaXhpbiBob21lcGFnZS1hbmltYXRpb25zIHtcbiAgQGtleWZyYW1lcyBoZWFkaW5nX2FuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgfVxuICAgIDIlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDglIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDkwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgOTUlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc3VidGV4dF9hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDg2JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MSUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29sb3JzXG4kY29sb3ItcHJpbWFyeTogIzE3MTIwZjtcbiRjb2xvci1zZWNvbmRhcnk6ICM3ODc0NzE7XG4kY29sb3ItYmc6ICNmZmZmZmY7XG4kY29sb3ItYm9yZGVyOiAjZjBlZWViO1xuJGNvbG9yLXRvcC1zdHJpcC1iZzogI2YwZWVlYjtcbiRjb2xvci1kYXJrLXByaW1hcnk6ICNmZmZmZmY7XG4kY29sb3ItZGFyay1iZzogIzE3MTIwZjtcbiRjb2xvci1waW5rOiAjZmViM2M3O1xuXG4vLyBGb250IGZhbWlsaWVzXG4kZm9udC1mYW1pbHktYmFzZTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEFyaWFsLFxuICBzYW5zLXNlcmlmO1xuJGZvbnQtZmFtaWx5LWxvZ286ICdLbGFybmEgSGVhZGxpbmUnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */`,
    ys = `${mt.PLACEMENT}-${yt.FOOTER_PROMOTION_AUTO_SIZE}`;
  function xs() {
    return ui.qy`
    <style>
      ${Cs}
    </style>
    <div id="${ys}">
      <div class="container" part="osm-container">
        <ul class="footer-badges">
          <li class="badge klarna" part="osm-logo">${hs}</li>
          <li class="badge mastercard" part="osm-logo">${ps}</li>
          <li class="badge maestro" part="osm-logo">${ms}</li>
          <li class="badge visa" part="osm-logo">${Is}</li>
          <li class="badge visaelectron" part="osm-logo">${fs}</li>
        </ul>
      </div>
    </div>
  `;
  }
  function Gs(e, t, n) {
    try {
      const i = new URL(e);
      return i.searchParams.set(t, n), i.toString();
    } catch (t) {
      return e;
    }
  }
  function As(e, t) {
    const n = window.origin || window.location.origin;
    let i = e;
    return (
      Pa(t)
        ? (i = Gs(i, "legacyOSMClientId", t))
        : ((i = Gs(i, "integratorOrigin", n)), (i = Gs(i, "clientId", t))),
      i
    );
  }
  var vs = a(4531);
  const Bs = {};
  function Zs(e) {
    return e?.split("-")[0] || "";
  }
  function Qs(e) {
    const { paymentAmount: t, purchaseAmount: n, purchase_amount: i } = e;
    return void 0 !== t ? t : void 0 !== n ? n : i;
  }
  function ws(e, t) {
    return (
      t.length &&
        t.forEach(
          (t) =>
            (e = e.replace(
              new RegExp(`\\b${t.text}?\\b(?![^<]*?<\\/a>)`, "gmi"),
              `<a href="${t.url}" taget="_blank" part="osm-link" class="link">$&</a>`
            ))
        ),
      e
    );
  }
  const ks = (e) => {
    switch (e) {
      case yt.CUSTOM_TYPE_0:
      case yt.CUSTOM_TYPE_1:
      case yt.CREDIT_PROMOTION_AUTO_SIZE:
      case yt.CREDIT_PROMOTION_STANDARD:
      case yt.CREDIT_PROMOTION_SMALL:
        return {
          variationReplaceKey: "credit-promotion-",
          requiredAttributes: [
            "mainText",
            "legalText",
            "ctaLabel",
            "ctaLink",
            "variation",
            "theme",
            "customStyles",
          ],
        };
      case yt.CHECKOUT:
        return {
          variationReplaceKey: "credit-promotion-",
          requiredAttributes: [
            "mainText",
            "zeroInterestBadgeText",
            "ctaLabel",
            "ctaLink",
            "variation",
            "theme",
            "customStyles",
            "buyersProtectionLink",
            "buyersProtectionLabel",
          ],
        };
      case yt.CREDIT_PROMOTION_BADGE:
        return {
          variationReplaceKey: "",
          requiredAttributes: [
            "mainText",
            "legalText",
            "ctaLink",
            "ctaLabel",
            "fixedDiscountAmount",
            "discountRate",
            "theme",
            "customStyles",
          ],
        };
      case yt.TOP_STRIP_PROMOTION_BADGE:
        return {
          variationReplaceKey: "",
          requiredAttributes: [
            "mainText",
            "legalText",
            "ctaLabel",
            "ctaLink",
            "fixedDiscountAmount",
            "discountRate",
            "theme",
            "customStyles",
          ],
        };
      case yt.TOP_STRIP_PROMOTION_STANDARD:
      case yt.TOP_STRIP_PROMOTION_AUTO_SIZE:
        return {
          variationReplaceKey: "top-strip-promotion-",
          requiredAttributes: [
            "mainText",
            "ctaLabel",
            "variation",
            "ctaLink",
            "theme",
            "customStyles",
          ],
        };
      case yt.HOMEPAGE_PROMOTION_WIDE:
      case yt.HOMEPAGE_PROMOTION_TALL:
      case yt.HOMEPAGE_PROMOTION_BOX:
        return {
          variationReplaceKey: "",
          requiredAttributes: [
            "textTitle",
            "textSubtitle",
            "locale",
            "theme",
            "ctaLink",
          ],
        };
      case yt.INFO_PAGE:
        return {
          variationReplaceKey: "",
          requiredAttributes: [
            "infoPageMainTitle",
            "infoPageMainSubtitle",
            "infoPagePaymentSectionTitle",
            "infoPagePaymentSectionDescription",
            "infoPageJourneyTitle",
            "infoPageJourneyStepOne",
            "infoPageJourneyStepTwo",
            "infoPageJourneyStepThree",
            "infoPageTitleTertiaryFirstColumn",
            "infoPageContentTertiaryFirstColumn",
            "infoPageTitleTertiarySecondColumn",
            "infoPageContentTertiarySecondColumn",
            "infoPageTitleFirstColumn",
            "infoPageContentFirstColumn",
            "infoPageTitleSecondColumn",
            "infoPageContentSecondColumn",
            "infoPageFAQs",
            "infoPagePMGroups",
            "theme",
            "assetsUrl",
          ],
        };
      default:
        return { requiredAttributes: [], variationReplaceKey: "" };
    }
  };
  function Xs(e = [], t) {
    const n = (function (e, t) {
        const { assetsUrl: n, customStyles: i, locale: a, theme: s } = t,
          r = {
            mainText: "",
            legalText: "",
            textTitle: "",
            textInfo: "",
            discountRate: "",
            fixedDiscountAmount: "",
            textSubtitle: "",
            badge: "",
            ctaLabel: "",
            ctaLink: "",
            infoPageMainTitle: "",
            infoPageMainSubtitle: "",
            infoPagePaymentSectionTitle: "",
            infoPagePaymentSectionDescription: "",
            infoPageJourneyTitle: "",
            infoPageJourneyStepOne: "",
            infoPageJourneyStepTwo: "",
            infoPageJourneyStepThree: "",
            infoPageTitleTertiaryFirstColumn: "",
            infoPageContentTertiaryFirstColumn: "",
            infoPageTitleTertiarySecondColumn: "",
            infoPageContentTertiarySecondColumn: "",
            infoPageTitleFirstColumn: "",
            infoPageContentFirstColumn: "",
            infoPageTitleSecondColumn: "",
            infoPageContentSecondColumn: "",
            infoPageFAQs: [],
            infoPagePMGroups: [],
            assetsUrl: n,
            customStyles: i,
            locale: a,
            theme: "light" === s ? "default" : s,
            variation: "",
          };
        return (
          e?.forEach(
            ({
              value: e,
              label: n,
              url: i,
              hyper_link_list: a,
              name: s,
              info_page_faq_nodes: o,
              pm_group_nodes: c,
            }) => {
              switch (s) {
                case "TEXT_MAIN":
                  r.mainText = e;
                  break;
                case "TEXT_LEGAL":
                  r.legalText = e;
                  break;
                case "TEXT_INFO":
                  r.textInfo = e;
                  break;
                case "TEXT_TITLE":
                  r.textTitle = e;
                  break;
                case "TEXT_SUB_TITLE":
                  r.textSubtitle = e;
                  break;
                case "TEXT_BADGE_DISCOUNT_AMOUNT":
                  r.fixedDiscountAmount = e;
                  break;
                case "TEXT_BADGE_DISCOUNT_RATE":
                  r.discountRate = e;
                  break;
                case "ZERO_INTEREST_BADGE_TEXT":
                  r.zeroInterestBadgeText = e;
                  break;
                case "ACTION_OPEN_BUYERS_PROTECTION_LINK":
                  (r.buyersProtectionLink = i), (r.buyersProtectionLabel = n);
                  break;
                case "KLARNA_BADGE":
                  r.badge = i;
                  break;
                case "ACTION_LEARN_MORE":
                  (r.ctaLabel = n),
                    (r.ctaLink =
                      i ||
                      (function ({
                        locale: e,
                        environment: t,
                        bespokeId:
                          n = "payment-information-generic-interstitial",
                        clientId: i,
                      }) {
                        const a = Nt(e),
                          s = Zt[t][a],
                          r = (function (e, t) {
                            const [n, i] = e.split("-");
                            return window.btoa(
                              JSON.stringify({
                                language: n,
                                country: i,
                                bespokeId: t,
                              })
                            );
                          })(e, n);
                        let o = `${s}/learn-more/index.html?showButtons=true&showBackground=false`;
                        return (o = As(o, i)), `${o}#${r}`;
                      })(t));
                  break;
                case "CHECKOUT_USP":
                  r.checkoutUSPs = (r.checkoutUSPs || []).concat([e]);
                  break;
                case "ACTION_CHECKOUT_LEARN_MORE":
                  (r.ctaLink = i),
                    (r.checkoutLearnMore = { value: e, label: n });
                  break;
                case "TEXT_INFO_PAGE_MAIN_TITLE":
                  r.infoPageMainTitle = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_MAIN_SUBTITLE":
                  r.infoPageMainSubtitle = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_PAYMENT_SECTION_TITLE":
                  r.infoPagePaymentSectionTitle = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_PAYMENT_SECTION_DESCRIPTION":
                  r.infoPagePaymentSectionDescription = ws(e, a);
                  break;
                case "TEXT_INFO_JOURNEY_TITLE":
                  r.infoPageJourneyTitle = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_JOURNEY_STEP_ONE":
                  r.infoPageJourneyStepOne = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_JOURNEY_STEP_TWO":
                  r.infoPageJourneyStepTwo = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_JOURNEY_STEP_THREE":
                  r.infoPageJourneyStepThree = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_TITLE_TERTIARY_FIRST_COLUMN":
                  r.infoPageTitleTertiaryFirstColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_CONTENT_TERTIARY_FIRST_COLUMN":
                  r.infoPageContentTertiaryFirstColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_TITLE_TERTIARY_SECOND_COLUMN":
                  r.infoPageTitleTertiarySecondColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_CONTENT_TERTIARY_SECOND_COLUMN":
                  r.infoPageContentTertiarySecondColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_TITLE_FIRST_COLUMN":
                  r.infoPageTitleFirstColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_CONTENT_FIRST_COLUMN":
                  r.infoPageContentFirstColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_TITLE_SECOND_COLUMN":
                  r.infoPageTitleSecondColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_CONTENT_SECOND_COLUMN":
                  r.infoPageContentSecondColumn = ws(e, a);
                  break;
                case "TEXT_INFO_PAGE_FAQ_DEFAULT":
                  r.infoPageFAQs = o;
                  break;
                case "TEXT_INFO_PAGE_PAYMENT_OPTIONS":
                  r.infoPagePMGroups = c;
              }
            }
          ),
          r
        );
      })(e, t),
      { requiredAttributes: i, variationReplaceKey: a } = ks(t.key);
    return (
      a && (n.variation = t.key.replace(a, "")),
      i.reduce((e, t) => ({ ...e, [t]: n[t] }), {})
    );
  }
  const Es = Object.keys(vt);
  function Ns(e = window) {
    return e.klarnaIntegratorApi;
  }
  function Ws(e = window) {
    try {
      e.klarnaIntegratorApi.fullscreen.hide({ isOpf: !0 });
    } catch (e) {}
  }
  function Ls(e = window) {
    return Ns(e)
      ? (function (e = window) {
          try {
            return e.parent.frames[e.klarnaIntegratorApi.fullscreen.frameId];
          } catch (e) {}
        })(e)
      : e;
  }
  let Fs = (function (e) {
      return (
        (e.LEARN_MORE = "LEARN_MORE"),
        (e.PREQUALIFICATION = "PREQUALIFICATION"),
        e
      );
    })({}),
    Rs = (function (e) {
      return (e.CLOSE = "CLOSE"), e;
    })({});
  const Us = (e, t) => (n) => {
    try {
      if (!nn(n.origin)) throw new Error("Invalid klarna origin");
      const i = JSON.parse(n.data),
        a = { source: i.source, type: i.type, dialogHeight: i.dialogHeight };
      if (!(a.source in Fs)) throw new Error("Invalid event source");
      const s = (e, t) => {
        const n = Ls().innerHeight;
        e.style.height = `${Math.min(t, n)}px`;
      };
      if (a.source === Fs.LEARN_MORE) {
        const t = parseInt(a.dialogHeight);
        Number.isNaN(t) || s(e, t), e.focus();
      }
      a.source in Fs &&
        a.type === Rs.CLOSE &&
        ((0, Ra.closeInteractionMode)(),
        t(ja.MODAL_CLOSED),
        t(ja.MODAL_CLOSED_LEGACY));
    } catch (e) {}
  };
  function Os(e, t) {
    const { emit: n } = e;
    Ls().addEventListener("message", Us(t, n), !1);
  }
  function _s(e, t) {
    const { ctaLink: n, emit: i } = t;
    e.preventDefault(), i(ja.MODAL_OPENED), i(ja.MODAL_OPENED_LEGACY);
    const a = n.replace(
      "showButtons=false&showBackground=true",
      "showButtons=true&showBackground=false&websdk=true"
    );
    return (
      (function (e = window) {
        try {
          e.klarnaIntegratorApi.fullscreen.show({ isOpf: !0 });
        } catch (e) {}
      })(),
      (0, Ra.triggerIframe)(a, {
        overlayContent: {
          text: li(ii.OverlayContentText),
          buttonLabel: li(ii.OverlayContentButtonLabel),
        },
        previousActiveElement: e.target,
        fullscreenWindow: Ls(),
        onClose: Ws,
        title: "Information about Klarna's payment methods",
        id: t.iframeId,
        styles: { borderRadius: 0 },
      })
    );
  }
  const Ss = ui.AH`.container{max-width:300px;min-height:300px;background-color:#feb3c7;color:#000}.container.dark{background-color:#000;color:#fff}.container .content{min-height:189px;width:100%}.container .content-container{cursor:pointer;display:flex;justify-content:space-between;flex-wrap:wrap;padding:23px;min-height:254px}.container .heading,.container .sub-text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif,sans-serif}.container .heading{font-size:44px;letter-spacing:-0.94px;line-height:44px;font-weight:700;opacity:0;animation:heading_animation 10s infinite;animation-timing-function:cubic-bezier(0.25, 0.1, 0.25, 1);transform-origin:0 0;animation-delay:0s}.container .sub-text{font-size:20px;margin-top:10px}.container .sub-text div{transform-origin:0 0;opacity:0;animation:heading_animation 10s infinite;animation-timing-function:cubic-bezier(0.25, 0.1, 0.25, 1);animation-delay:.3s}.container .logo-container{margin-top:20px;min-width:89px;display:flex;height:45px;width:100%;justify-content:flex-end}.container .logo-container svg{width:90px;height:45px}.container .heading-nl,.container .heading-es,.container .heading-fr,.container .heading-it,.container .heading-no{font-size:38px}.container .badge-pink{display:none}.container .badge-pink.dark{display:block}.container .badge-black{display:initial}.container .badge-black.dark{display:none}@keyframes heading_animation{0%{opacity:0;transform:scale(0)}2%{transform:scale(1.08)}4%{transform:scale(1)}8%{opacity:1}90%{opacity:1;transform:scale(1)}95%{opacity:0;transform:scale(1)}100%{opacity:0;transform:scale(1)}}@keyframes subtext_animation{0%{opacity:1}4%{opacity:1}86%{opacity:1}91%{opacity:0}100%{opacity:0}}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2hvbWUtcGFnZS1wcm9tb3Rpb24tYm94L3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi8uLi9rbGFybmEtbWVzc2FnaW5nL3NyYy9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL19taXhpbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxXQUNFLGVBQUEsQ0FDQSxnQkFBQSxDQUNBLHdCQ0VXLENERFgsVUFBQSxDQUVBLGdCQUNFLHFCQUFBLENBQ0EsVUFBQSxDQUdGLG9CQUNFLGdCQUFBLENBQ0EsVUFBQSxDQUdGLDhCQUNFLGNBQUEsQ0FDQSxZQUFBLENBQ0EsNkJBQUEsQ0FDQSxjQUFBLENBQ0EsWUFBQSxDQUNBLGdCQUFBLENBR0YseUNBRUUsMEZBQUEsQ0FHRixvQkFDRSxjQUFBLENBQ0Esc0JBQUEsQ0FDQSxnQkFBQSxDQUNBLGVBQUEsQ0FDQSxTQUFBLENBQ0Esd0NBQUEsQ0FDQSwwREFBQSxDQUNBLG9CQUFBLENBQ0Esa0JBQUEsQ0FHRixxQkFDRSxjQUFBLENBQ0EsZUFBQSxDQUVBLHlCQUNFLG9CQUFBLENBQ0EsU0FBQSxDQUNBLHdDQUFBLENBQ0EsMERBQUEsQ0FDQSxtQkFBQSxDQUlKLDJCQUNFLGVBQUEsQ0FDQSxjQUFBLENBQ0EsWUFBQSxDQUNBLFdBQUEsQ0FDQSxVQUFBLENBQ0Esd0JBQUEsQ0FFQSwrQkFDRSxVQUFBLENBQ0EsV0FBQSxDQUlKLG1IQUtFLGNBQUEsQ0FHRix1QkFDRSxZQUFBLENBRUEsNEJBQ0UsYUFBQSxDQUlKLHdCQUNFLGVBQUEsQ0FFQSw2QkFDRSxZQUFBLENFS0osNkJBQ0UsR0FDRSxTQUFBLENBQ0Esa0JBQUEsQ0FFRixHQUNFLHFCQUFBLENBRUYsR0FDRSxrQkFBQSxDQUVGLEdBQ0UsU0FBQSxDQUVGLElBQ0UsU0FBQSxDQUNBLGtCQUFBLENBRUYsSUFDRSxTQUFBLENBQ0Esa0JBQUEsQ0FFRixLQUNFLFNBQUEsQ0FDQSxrQkFBQSxDQUFBLENBSUosNkJBQ0UsR0FDRSxTQUFBLENBRUYsR0FDRSxTQUFBLENBRUYsSUFDRSxTQUFBLENBRUYsSUFDRSxTQUFBLENBRUYsS0FDRSxTQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi9zdHlsZXMvbWl4aW5zJztcbkBpbXBvcnQgJy4uL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4uY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1waW5rO1xuICBjb2xvcjogIzAwMDtcblxuICAmLmRhcmsge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cblxuICAuY29udGVudCB7XG4gICAgbWluLWhlaWdodDogMTg5cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuY29udGVudC1jb250YWluZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgcGFkZGluZzogMjNweDtcbiAgICBtaW4taGVpZ2h0OiAyNTRweDtcbiAgfVxuXG4gIC5oZWFkaW5nLFxuICAuc3ViLXRleHQge1xuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZSwgc2Fucy1zZXJpZjtcbiAgfVxuXG4gIC5oZWFkaW5nIHtcbiAgICBmb250LXNpemU6IDQ0cHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0wLjk0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDQ0cHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGFuaW1hdGlvbjogaGVhZGluZ19hbmltYXRpb24gMTBzIGluZmluaXRlO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xuICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xuICB9XG5cbiAgLnN1Yi10ZXh0IHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcblxuICAgIGRpdiB7XG4gICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgYW5pbWF0aW9uOiBoZWFkaW5nX2FuaW1hdGlvbiAxMHMgaW5maW5pdGU7XG4gICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKTtcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcbiAgICB9XG4gIH1cblxuICAubG9nby1jb250YWluZXIge1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgbWluLXdpZHRoOiA4OXB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiA0NXB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgICBzdmcge1xuICAgICAgd2lkdGg6IDkwcHg7XG4gICAgICBoZWlnaHQ6IDQ1cHg7XG4gICAgfVxuICB9XG5cbiAgLmhlYWRpbmctbmwsXG4gIC5oZWFkaW5nLWVzLFxuICAuaGVhZGluZy1mcixcbiAgLmhlYWRpbmctaXQsXG4gIC5oZWFkaW5nLW5vIHtcbiAgICBmb250LXNpemU6IDM4cHg7XG4gIH1cblxuICAuYmFkZ2UtcGluayB7XG4gICAgZGlzcGxheTogbm9uZTtcblxuICAgICYuZGFyayB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIH1cblxuICAuYmFkZ2UtYmxhY2sge1xuICAgIGRpc3BsYXk6IGluaXRpYWw7XG5cbiAgICAmLmRhcmsge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuQGluY2x1ZGUgaG9tZXBhZ2UtYW5pbWF0aW9ucztcbiIsIi8vIENvbG9yc1xuJGNvbG9yLXByaW1hcnk6ICMxNzEyMGY7XG4kY29sb3Itc2Vjb25kYXJ5OiAjNzg3NDcxO1xuJGNvbG9yLWJnOiAjZmZmZmZmO1xuJGNvbG9yLWJvcmRlcjogI2YwZWVlYjtcbiRjb2xvci10b3Atc3RyaXAtYmc6ICNmMGVlZWI7XG4kY29sb3ItZGFyay1wcmltYXJ5OiAjZmZmZmZmO1xuJGNvbG9yLWRhcmstYmc6ICMxNzEyMGY7XG4kY29sb3ItcGluazogI2ZlYjNjNztcblxuLy8gRm9udCBmYW1pbGllc1xuJGZvbnQtZmFtaWx5LWJhc2U6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBBcmlhbCxcbiAgc2Fucy1zZXJpZjtcbiRmb250LWZhbWlseS1sb2dvOiAnS2xhcm5hIEhlYWRsaW5lJztcbiIsIkBpbXBvcnQgJ3ZhcmlhYmxlcyc7XG5cbkBtaXhpbiBsb2dvIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1sb2dvO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICBsZXR0ZXItc3BhY2luZzogMCAhaW1wb3J0YW50O1xufVxuXG5AbWl4aW4gZmxleC1jZW50ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogaW5oZXJpdDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbkBtaXhpbiBjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1iZztcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYuZGFyayB7XG4gICAgY29sb3I6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWRhcmstYmc7XG4gICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuXG4gICAgLmxpbmssXG4gICAgLmxlZ2FsLFxuICAgIC5sb2dvIHtcbiAgICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmljb24gc3ZnIHtcbiAgICAgIGZpbGw6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBsaW5rIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5AbWl4aW4gYmFkZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gbGVnYWwge1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIGNvbG9yOiAkY29sb3Itc2Vjb25kYXJ5O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xufVxuXG5AbWl4aW4gYmFkZ2UtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgZmxleC1jZW50ZXI7XG4gIGdhcDogNXB4O1xufVxuXG5AbWl4aW4gYWRkb25zLWJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xufVxuXG5AbWl4aW4gYmFkZ2UtdGV4dC13cmFwcGVyIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbkBtaXhpbiBob21lcGFnZS1hbmltYXRpb25zIHtcbiAgQGtleWZyYW1lcyBoZWFkaW5nX2FuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgfVxuICAgIDIlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDglIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDkwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgOTUlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc3VidGV4dF9hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDg2JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MSUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */`,
    Ds = ui.AH`.container{max-width:160px;min-height:600px}.container .content{min-height:399px;width:100%}.container .content-container{cursor:pointer;display:flex;justify-content:space-between;flex-wrap:wrap;padding:110px 11px 29px}.container .heading{font-size:46px;letter-spacing:-0.94px;line-height:45px}.container .sub-text{font-size:20px;line-height:27px;margin-top:10px}.container .logo-container{min-width:104px;display:flex;margin:10px 0 0;height:52px;width:100%;justify-content:center}.container .logo-container svg{width:104px;height:52px}.container .heading-de,.container .heading-cs,.container .heading-hu,.container .heading-pl{font-size:36px}.container .heading-pt{font-size:40px}.container .heading-da,.container .heading-sv,.container .heading-no{font-size:42px}.container .heading-es,.container .heading-it{font-size:34px}.container .heading-fr,.container .heading-ro{font-size:32px}.container .heading-el{font-size:29px}.container .heading-nl{font-size:24px}.heading{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;font-weight:700;opacity:0;animation:heading_animation 10s infinite;animation-timing-function:cubic-bezier(0.25, 0.1, 0.25, 1);transform-origin:0 0;animation-delay:0s}.sub-text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}.sub-text div{transform-origin:0 0;opacity:0;animation:heading_animation 10s infinite;animation-timing-function:cubic-bezier(0.25, 0.1, 0.25, 1);animation-delay:.3s}.container{background-color:#feb3c7;color:#000}.container .badge-pink{display:none}.container.dark{background-color:#000;color:#fff}.container.dark .badge-pink{display:block}.container.dark .badge-black{display:none}@keyframes heading_animation{0%{opacity:0;transform:scale(0)}2%{transform:scale(1.08)}4%{transform:scale(1)}8%{opacity:1}90%{opacity:1;transform:scale(1)}95%{opacity:0;transform:scale(1)}100%{opacity:0;transform:scale(1)}}@keyframes subtext_animation{0%{opacity:1}4%{opacity:1}86%{opacity:1}91%{opacity:0}100%{opacity:0}}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2hvbWUtcGFnZS1wcm9tb3Rpb24tdGFsbC9zdHlsZS5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL192YXJpYWJsZXMuc2NzcyIsIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3N0eWxlcy9fbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsV0FDRSxlQUFBLENBQ0EsZ0JBQUEsQ0FFQSxvQkFDRSxnQkFBQSxDQUNBLFVBQUEsQ0FHRiw4QkFDRSxjQUFBLENBQ0EsWUFBQSxDQUNBLDZCQUFBLENBQ0EsY0FBQSxDQUNBLHVCQUFBLENBR0Ysb0JBQ0UsY0FBQSxDQUNBLHNCQUFBLENBQ0EsZ0JBQUEsQ0FHRixxQkFDRSxjQUFBLENBQ0EsZ0JBQUEsQ0FDQSxlQUFBLENBR0YsMkJBQ0UsZUFBQSxDQUNBLFlBQUEsQ0FDQSxlQUFBLENBQ0EsV0FBQSxDQUNBLFVBQUEsQ0FDQSxzQkFBQSxDQUdGLCtCQUNFLFdBQUEsQ0FDQSxXQUFBLENBR0YsNEZBSUUsY0FBQSxDQUdGLHVCQUNFLGNBQUEsQ0FHRixxRUFHRSxjQUFBLENBR0YsOENBRUUsY0FBQSxDQUdGLDhDQUVFLGNBQUEsQ0FHRix1QkFDRSxjQUFBLENBR0YsdUJBQ0UsY0FBQSxDQUlKLFNBQ0UsK0VDeEVpQixDRHlFakIsZUFBQSxDQUNBLFNBQUEsQ0FDQSx3Q0FBQSxDQUNBLDBEQUFBLENBQ0Esb0JBQUEsQ0FDQSxrQkFBQSxDQUdGLFVBQ0UsK0VDbEZpQixDRHFGbkIsY0FDRSxvQkFBQSxDQUNBLFNBQUEsQ0FDQSx3Q0FBQSxDQUNBLDBEQUFBLENBQ0EsbUJBQUEsQ0FHRixXQUNFLHdCQ2pHVyxDRGtHWCxVQUFBLENBRUEsdUJBQ0UsWUFBQSxDQUdGLGdCQUNFLHFCQUFBLENBQ0EsVUFBQSxDQUVBLDRCQUNFLGFBQUEsQ0FFRiw2QkFDRSxZQUFBLENFdkJKLDZCQUNFLEdBQ0UsU0FBQSxDQUNBLGtCQUFBLENBRUYsR0FDRSxxQkFBQSxDQUVGLEdBQ0Usa0JBQUEsQ0FFRixHQUNFLFNBQUEsQ0FFRixJQUNFLFNBQUEsQ0FDQSxrQkFBQSxDQUVGLElBQ0UsU0FBQSxDQUNBLGtCQUFBLENBRUYsS0FDRSxTQUFBLENBQ0Esa0JBQUEsQ0FBQSxDQUlKLDZCQUNFLEdBQ0UsU0FBQSxDQUVGLEdBQ0UsU0FBQSxDQUVGLElBQ0UsU0FBQSxDQUVGLElBQ0UsU0FBQSxDQUVGLEtBQ0UsU0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vc3R5bGVzL21peGlucyc7XG5AaW1wb3J0ICcuLi9zdHlsZXMvdmFyaWFibGVzJztcblxuLmNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogMTYwcHg7XG4gIG1pbi1oZWlnaHQ6IDYwMHB4O1xuXG4gIC5jb250ZW50IHtcbiAgICBtaW4taGVpZ2h0OiAzOTlweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5jb250ZW50LWNvbnRhaW5lciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBwYWRkaW5nOiAxMTBweCAxMXB4IDI5cHg7XG4gIH1cblxuICAuaGVhZGluZyB7XG4gICAgZm9udC1zaXplOiA0NnB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAtMC45NHB4O1xuICAgIGxpbmUtaGVpZ2h0OiA0NXB4O1xuICB9XG5cbiAgLnN1Yi10ZXh0IHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDI3cHg7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfVxuXG4gIC5sb2dvLWNvbnRhaW5lciB7XG4gICAgbWluLXdpZHRoOiAxMDRweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1hcmdpbjogMTBweCAwIDA7XG4gICAgaGVpZ2h0OiA1MnB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG5cbiAgLmxvZ28tY29udGFpbmVyIHN2ZyB7XG4gICAgd2lkdGg6IDEwNHB4O1xuICAgIGhlaWdodDogNTJweDtcbiAgfVxuXG4gIC5oZWFkaW5nLWRlLFxuICAuaGVhZGluZy1jcyxcbiAgLmhlYWRpbmctaHUsXG4gIC5oZWFkaW5nLXBsIHtcbiAgICBmb250LXNpemU6IDM2cHg7XG4gIH1cblxuICAuaGVhZGluZy1wdCB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgLmhlYWRpbmctZGEsXG4gIC5oZWFkaW5nLXN2LFxuICAuaGVhZGluZy1ubyB7XG4gICAgZm9udC1zaXplOiA0MnB4O1xuICB9XG5cbiAgLmhlYWRpbmctZXMsXG4gIC5oZWFkaW5nLWl0IHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gIH1cblxuICAuaGVhZGluZy1mcixcbiAgLmhlYWRpbmctcm8ge1xuICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgfVxuXG4gIC5oZWFkaW5nLWVsIHtcbiAgICBmb250LXNpemU6IDI5cHg7XG4gIH1cblxuICAuaGVhZGluZy1ubCB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICB9XG59XG5cbi5oZWFkaW5nIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICBmb250LXdlaWdodDogNzAwO1xuICBvcGFjaXR5OiAwO1xuICBhbmltYXRpb246IGhlYWRpbmdfYW5pbWF0aW9uIDEwcyBpbmZpbml0ZTtcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMjUsIDAuMSwgMC4yNSwgMSk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgYW5pbWF0aW9uLWRlbGF5OiAwcztcbn1cblxuLnN1Yi10ZXh0IHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xufVxuXG4uc3ViLXRleHQgZGl2IHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICBvcGFjaXR5OiAwO1xuICBhbmltYXRpb246IGhlYWRpbmdfYW5pbWF0aW9uIDEwcyBpbmZpbml0ZTtcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMjUsIDAuMSwgMC4yNSwgMSk7XG4gIGFuaW1hdGlvbi1kZWxheTogMC4zcztcbn1cblxuLmNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1waW5rO1xuICBjb2xvcjogIzAwMDtcblxuICAuYmFkZ2UtcGluayB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICYuZGFyayB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICBjb2xvcjogI2ZmZjtcblxuICAgIC5iYWRnZS1waW5rIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICAuYmFkZ2UtYmxhY2sge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbn1cbkBpbmNsdWRlIGhvbWVwYWdlLWFuaW1hdGlvbnM7XG4iLCIvLyBDb2xvcnNcbiRjb2xvci1wcmltYXJ5OiAjMTcxMjBmO1xuJGNvbG9yLXNlY29uZGFyeTogIzc4NzQ3MTtcbiRjb2xvci1iZzogI2ZmZmZmZjtcbiRjb2xvci1ib3JkZXI6ICNmMGVlZWI7XG4kY29sb3ItdG9wLXN0cmlwLWJnOiAjZjBlZWViO1xuJGNvbG9yLWRhcmstcHJpbWFyeTogI2ZmZmZmZjtcbiRjb2xvci1kYXJrLWJnOiAjMTcxMjBmO1xuJGNvbG9yLXBpbms6ICNmZWIzYzc7XG5cbi8vIEZvbnQgZmFtaWxpZXNcbiRmb250LWZhbWlseS1iYXNlOiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgQXJpYWwsXG4gIHNhbnMtc2VyaWY7XG4kZm9udC1mYW1pbHktbG9nbzogJ0tsYXJuYSBIZWFkbGluZSc7XG4iLCJAaW1wb3J0ICd2YXJpYWJsZXMnO1xuXG5AbWl4aW4gbG9nbyB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktbG9nbztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAgIWltcG9ydGFudDtcbn1cblxuQG1peGluIGZsZXgtY2VudGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGluaGVyaXQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmc7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAmLmRhcmsge1xuICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1kYXJrLWJnO1xuICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcblxuICAgIC5saW5rLFxuICAgIC5sZWdhbCxcbiAgICAubG9nbyB7XG4gICAgICBjb2xvcjogJGNvbG9yLWRhcmstcHJpbWFyeSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5pY29uIHN2ZyB7XG4gICAgICBmaWxsOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbGluayB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1peGluIGJhZGdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1peGluIGxlZ2FsIHtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBjb2xvcjogJGNvbG9yLXNlY29uZGFyeTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMTJweDtcbn1cblxuQG1peGluIGJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xuICBnYXA6IDVweDtcbn1cblxuQG1peGluIGFkZG9ucy1iYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBmbGV4LWNlbnRlcjtcbn1cblxuQG1peGluIGJhZGdlLXRleHQtd3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG5AbWl4aW4gaG9tZXBhZ2UtYW5pbWF0aW9ucyB7XG4gIEBrZXlmcmFtZXMgaGVhZGluZ19hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgIH1cbiAgICAyJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA4JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDk1JSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIHN1YnRleHRfYW5pbWF0aW9uIHtcbiAgICAwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA4NiUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgOTElIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */`,
    Ys = ui.AH`.container{max-width:728px;min-height:90px;background-color:#feb3c7;color:#000}.container .content{padding-right:10px;max-width:100%}.container .content-container{cursor:pointer;display:flex;justify-content:space-between;flex-wrap:wrap;padding:9px 18px}.container .heading{font-size:34px;letter-spacing:-0.94px;line-height:45px}.container .sub-text{font-size:20px}.container .logo-container{min-width:104px;display:flex;margin:10px 0}.container .logo-container svg{width:104px;height:52px}.container .badge-pink{display:none}.container .heading-sv{font-size:27px}.container .heading-de{font-size:34px}.container .heading-es{font-size:34px}.container .heading-fr{font-size:32px}.container.dark{background-color:#000;color:#fff}.container.dark .badge-pink{display:block}.container.dark .badge-black{display:none}.heading{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;font-weight:700;opacity:0;animation:heading_animation 10s infinite;animation-timing-function:cubic-bezier(0.25, 0.1, 0.25, 1);transform-origin:0 0;animation-delay:0s}.sub-text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}.sub-text div{transform-origin:0 0;opacity:0;animation:heading_animation 10s infinite;animation-timing-function:cubic-bezier(0.25, 0.1, 0.25, 1);animation-delay:.3s}@keyframes heading_animation{0%{opacity:0;transform:scale(0)}2%{transform:scale(1.08)}4%{transform:scale(1)}8%{opacity:1}90%{opacity:1;transform:scale(1)}95%{opacity:0;transform:scale(1)}100%{opacity:0;transform:scale(1)}}@keyframes subtext_animation{0%{opacity:1}4%{opacity:1}86%{opacity:1}91%{opacity:0}100%{opacity:0}}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2hvbWUtcGFnZS1wcm9tb3Rpb24td2lkZS9zdHlsZS5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL192YXJpYWJsZXMuc2NzcyIsIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3N0eWxlcy9fbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsV0FDRSxlQUFBLENBQ0EsZUFBQSxDQUNBLHdCQ0VXLENERFgsVUFBQSxDQUVBLG9CQUNFLGtCQUFBLENBQ0EsY0FBQSxDQUdGLDhCQUNFLGNBQUEsQ0FDQSxZQUFBLENBQ0EsNkJBQUEsQ0FDQSxjQUFBLENBQ0EsZ0JBQUEsQ0FHRixvQkFDRSxjQUFBLENBQ0Esc0JBQUEsQ0FDQSxnQkFBQSxDQUdGLHFCQUNFLGNBQUEsQ0FHRiwyQkFDRSxlQUFBLENBQ0EsWUFBQSxDQUNBLGFBQUEsQ0FHRiwrQkFDRSxXQUFBLENBQ0EsV0FBQSxDQUdGLHVCQUNFLFlBQUEsQ0FHRix1QkFDRSxjQUFBLENBRUYsdUJBQ0UsY0FBQSxDQUVGLHVCQUNFLGNBQUEsQ0FFRix1QkFDRSxjQUFBLENBR0YsZ0JBQ0UscUJBQUEsQ0FDQSxVQUFBLENBRUEsNEJBQ0UsYUFBQSxDQUVGLDZCQUNFLFlBQUEsQ0FLTixTQUNFLCtFQy9EaUIsQ0RnRWpCLGVBQUEsQ0FDQSxTQUFBLENBQ0Esd0NBQUEsQ0FDQSwwREFBQSxDQUNBLG9CQUFBLENBQ0Esa0JBQUEsQ0FHRixVQUNFLCtFQ3pFaUIsQ0Q0RW5CLGNBQ0Usb0JBQUEsQ0FDQSxTQUFBLENBQ0Esd0NBQUEsQ0FDQSwwREFBQSxDQUNBLG1CQUFBLENFS0EsNkJBQ0UsR0FDRSxTQUFBLENBQ0Esa0JBQUEsQ0FFRixHQUNFLHFCQUFBLENBRUYsR0FDRSxrQkFBQSxDQUVGLEdBQ0UsU0FBQSxDQUVGLElBQ0UsU0FBQSxDQUNBLGtCQUFBLENBRUYsSUFDRSxTQUFBLENBQ0Esa0JBQUEsQ0FFRixLQUNFLFNBQUEsQ0FDQSxrQkFBQSxDQUFBLENBSUosNkJBQ0UsR0FDRSxTQUFBLENBRUYsR0FDRSxTQUFBLENBRUYsSUFDRSxTQUFBLENBRUYsSUFDRSxTQUFBLENBRUYsS0FDRSxTQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi9zdHlsZXMvbWl4aW5zJztcbkBpbXBvcnQgJy4uL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4uY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiA3MjhweDtcbiAgbWluLWhlaWdodDogOTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXBpbms7XG4gIGNvbG9yOiAjMDAwO1xuXG4gIC5jb250ZW50IHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5jb250ZW50LWNvbnRhaW5lciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBwYWRkaW5nOiA5cHggMThweDtcbiAgfVxuXG4gIC5oZWFkaW5nIHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0wLjk0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDQ1cHg7XG4gIH1cblxuICAuc3ViLXRleHQge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIC5sb2dvLWNvbnRhaW5lciB7XG4gICAgbWluLXdpZHRoOiAxMDRweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1hcmdpbjogMTBweCAwO1xuICB9XG5cbiAgLmxvZ28tY29udGFpbmVyIHN2ZyB7XG4gICAgd2lkdGg6IDEwNHB4O1xuICAgIGhlaWdodDogNTJweDtcbiAgfVxuXG4gIC5iYWRnZS1waW5rIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLmhlYWRpbmctc3Yge1xuICAgIGZvbnQtc2l6ZTogMjdweDtcbiAgfVxuICAuaGVhZGluZy1kZSB7XG4gICAgZm9udC1zaXplOiAzNHB4O1xuICB9XG4gIC5oZWFkaW5nLWVzIHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gIH1cbiAgLmhlYWRpbmctZnIge1xuICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgfVxuXG4gICYuZGFyayB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICBjb2xvcjogI2ZmZjtcblxuICAgIC5iYWRnZS1waW5rIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICAuYmFkZ2UtYmxhY2sge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLmhlYWRpbmcge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIG9wYWNpdHk6IDA7XG4gIGFuaW1hdGlvbjogaGVhZGluZ19hbmltYXRpb24gMTBzIGluZmluaXRlO1xuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICBhbmltYXRpb24tZGVsYXk6IDBzO1xufVxuXG4uc3ViLXRleHQge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG59XG5cbi5zdWItdGV4dCBkaXYge1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gIG9wYWNpdHk6IDA7XG4gIGFuaW1hdGlvbjogaGVhZGluZ19hbmltYXRpb24gMTBzIGluZmluaXRlO1xuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xufVxuXG5AaW5jbHVkZSBob21lcGFnZS1hbmltYXRpb25zO1xuIiwiLy8gQ29sb3JzXG4kY29sb3ItcHJpbWFyeTogIzE3MTIwZjtcbiRjb2xvci1zZWNvbmRhcnk6ICM3ODc0NzE7XG4kY29sb3ItYmc6ICNmZmZmZmY7XG4kY29sb3ItYm9yZGVyOiAjZjBlZWViO1xuJGNvbG9yLXRvcC1zdHJpcC1iZzogI2YwZWVlYjtcbiRjb2xvci1kYXJrLXByaW1hcnk6ICNmZmZmZmY7XG4kY29sb3ItZGFyay1iZzogIzE3MTIwZjtcbiRjb2xvci1waW5rOiAjZmViM2M3O1xuXG4vLyBGb250IGZhbWlsaWVzXG4kZm9udC1mYW1pbHktYmFzZTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEFyaWFsLFxuICBzYW5zLXNlcmlmO1xuJGZvbnQtZmFtaWx5LWxvZ286ICdLbGFybmEgSGVhZGxpbmUnO1xuIiwiQGltcG9ydCAndmFyaWFibGVzJztcblxuQG1peGluIGxvZ28ge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWxvZ287XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gIGxldHRlci1zcGFjaW5nOiAwICFpbXBvcnRhbnQ7XG59XG5cbkBtaXhpbiBmbGV4LWNlbnRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBpbmhlcml0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1peGluIGNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMTRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJnO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6ICRjb2xvci1ib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIHBhZGRpbmc6IDRweCA4cHg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgJi5kYXJrIHtcbiAgICBjb2xvcjogJGNvbG9yLWRhcmstcHJpbWFyeTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItZGFyay1iZztcbiAgICBib3JkZXItY29sb3I6ICRjb2xvci1ib3JkZXI7XG5cbiAgICAubGluayxcbiAgICAubGVnYWwsXG4gICAgLmxvZ28ge1xuICAgICAgY29sb3I6ICRjb2xvci1kYXJrLXByaW1hcnkgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAuaWNvbiBzdmcge1xuICAgICAgZmlsbDogJGNvbG9yLWRhcmstcHJpbWFyeTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGxpbmsge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBtaXhpbiBiYWRnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbkBtaXhpbiBsZWdhbCB7XG4gIG1hcmdpbi10b3A6IDRweDtcbiAgY29sb3I6ICRjb2xvci1zZWNvbmRhcnk7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDEycHg7XG59XG5cbkBtaXhpbiBiYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBmbGV4LWNlbnRlcjtcbiAgZ2FwOiA1cHg7XG59XG5cbkBtaXhpbiBhZGRvbnMtYmFkZ2UtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgZmxleC1jZW50ZXI7XG59XG5cbkBtaXhpbiBiYWRnZS10ZXh0LXdyYXBwZXIge1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuQG1peGluIGhvbWVwYWdlLWFuaW1hdGlvbnMge1xuICBAa2V5ZnJhbWVzIGhlYWRpbmdfYW5pbWF0aW9uIHtcbiAgICAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICB9XG4gICAgMiUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA4KTtcbiAgICB9XG4gICAgNCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgOCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgOTAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA5NSUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzdWJ0ZXh0X2FuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgNCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgODYlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDkxJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */`,
    Ts = ui.AH`.container{display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;text-align:center;color:#17120f;font-size:12px;font-weight:400;line-height:14px;background-color:#fff;border-style:solid;border-color:#f0eeeb;border-radius:5px;border-width:1px;padding:4px 8px;flex-direction:row-reverse;justify-content:center;align-items:center;flex-direction:unset;text-align:left;font-size:16px;font-weight:400;line-height:16px;padding:35px 14px 15px 15px;border-radius:0px;border-width:0px}.container.dark{color:#fff;background-color:#17120f;border-color:#f0eeeb}.container.dark .link,.container.dark .legal,.container.dark .logo{color:#fff !important}.container.dark .icon svg{fill:#fff}.link{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#17120f;font-weight:400;font-size:12px;text-decoration:underline;white-space:nowrap;background:none;border:none;padding:0;cursor:pointer;font-size:inherit}.logo{font-family:"Klarna Headline";font-weight:bold;color:#17120f;text-transform:none !important;letter-spacing:0 !important;font-size:inherit}p{margin:0}.nowrap{white-space:nowrap}.landing-page{max-width:1150px;overflow:hidden}.landing-page h1{font-size:4em;line-height:70px;margin:0 0 20px}.landing-page h2{font-size:2em;line-height:40px;font-weight:500;margin:50px 0 10px}.landing-page .content{font-size:1em;font-weight:normal;line-height:25px}.landing-page .question{margin:18px 0;font-weight:500}.landing-page .columns{display:flex;flex-wrap:wrap;margin:0 -25px}.landing-page .section-item{flex:1 0 50%;box-sizing:border-box;padding:0 25px;max-width:750px;min-width:320px}.landing-page .section-item img{margin:auto;width:100%}.landing-page .section-item .section-image{padding-top:50px}.landing-page .journey{margin:0 -25px}.landing-page .journey>*{padding:0 25px}.landing-page .journey-steps-wrapper{display:flex;flex-wrap:wrap;margin:0 -25px}.landing-page .journey-step{flex:1 1 160px;box-sizing:border-box;padding:0 25px 0}.landing-page .journey-step .icon{display:flex;justify-content:center;margin:50px 0 20px;height:50px}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL2luZm8tcGFnZS9zdHlsZS5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL19taXhpbnMuc2NzcyIsIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3N0eWxlcy9fdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsV0NnQkUsWUFBQSxDQUNBLHFCQUFBLENBQ0Esc0JBQUEsQ0FDQSxtQkFBQSxDQUNBLHFCQUFBLENBQ0EsK0VDWmlCLENEYWpCLGlCQUFBLENBQ0EsYUN4QmMsQ0R5QmQsY0FBQSxDQUNBLGVBQUEsQ0FDQSxnQkFBQSxDQUNBLHFCQzFCUyxDRDJCVCxrQkFBQSxDQUNBLG9CQzNCYSxDRDRCYixpQkFBQSxDQUNBLGdCQUFBLENBQ0EsZUFBQSxDQUNBLDBCQUFBLENBQ0Esc0JBQUEsQ0FDQSxrQkFBQSxDRGpDQSxvQkFBQSxDQUNBLGVBQUEsQ0FFQSxjQUFBLENBQ0EsZUFBQSxDQUNBLGdCQUFBLENBRUEsMkJBQUEsQ0FDQSxpQkFBQSxDQUNBLGdCQUFBLENDMEJBLGdCQUNFLFVDbENpQixDRG1DakIsd0JDbENZLENEbUNaLG9CQ3RDVyxDRHdDWCxtRUFHRSxxQkFBQSxDQUdGLDBCQUNFLFNDN0NlLENGVXJCLE1DeUNFLCtFQzlDaUIsQ0QrQ2pCLGFDekRjLENEMERkLGVBQUEsQ0FDQSxjQUFBLENBQ0EseUJBQUEsQ0FDQSxrQkFBQSxDQUNBLGVBQUEsQ0FDQSxXQUFBLENBQ0EsU0FBQSxDQUNBLGNBQUEsQ0RoREEsaUJBQUEsQ0FHRixNQ2xCRSw2QkNVaUIsQ0RUakIsZ0JBQUEsQ0FDQSxhQ0pjLENES2QsOEJBQUEsQ0FDQSwyQkFBQSxDRGdCQSxpQkFBQSxDQUdGLEVBQ0UsUUFBQSxDQUdGLFFBQ0Usa0JBQUEsQ0FHRixjQUNFLGdCQUFBLENBQ0EsZUFBQSxDQUVBLGlCQUNFLGFBQUEsQ0FDQSxnQkFBQSxDQUNBLGVBQUEsQ0FHRixpQkFDRSxhQUFBLENBQ0EsZ0JBQUEsQ0FDQSxlQUFBLENBQ0Esa0JBQUEsQ0FHRix1QkFDRSxhQUFBLENBQ0Esa0JBQUEsQ0FDQSxnQkFBQSxDQUdGLHdCQUNFLGFBQUEsQ0FDQSxlQUFBLENBR0YsdUJBQ0UsWUFBQSxDQUNBLGNBQUEsQ0FDQSxjQUFBLENBR0YsNEJBQ0UsWUFBQSxDQUNBLHFCQUFBLENBQ0EsY0FBQSxDQUNBLGVBQUEsQ0FDQSxlQUFBLENBRUEsZ0NBQ0UsV0FBQSxDQUNBLFVBQUEsQ0FHRiwyQ0FDRSxnQkFBQSxDQUlKLHVCQUNFLGNBQUEsQ0FDQSx5QkFDRSxjQUFBLENBSUoscUNBQ0UsWUFBQSxDQUNBLGNBQUEsQ0FDQSxjQUFBLENBR0YsNEJBQ0UsY0FBQSxDQUNBLHFCQUFBLENBQ0EsZ0JBQUEsQ0FFQSxrQ0FDRSxZQUFBLENBQ0Esc0JBQUEsQ0FDQSxrQkFBQSxDQUNBLFdBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi9zdHlsZXMvbWl4aW5zJztcblxuLmNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGNvbnRhaW5lcjtcbiAgZmxleC1kaXJlY3Rpb246IHVuc2V0O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuXG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG5cbiAgcGFkZGluZzogMzVweCAxNHB4IDE1cHggMTVweDtcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xuICBib3JkZXItd2lkdGg6IDBweDtcbn1cblxuLmxpbmsge1xuICBAaW5jbHVkZSBsaW5rO1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbi5sb2dvIHtcbiAgQGluY2x1ZGUgbG9nbztcbiAgZm9udC1zaXplOiBpbmhlcml0O1xufVxuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4ubm93cmFwIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLmxhbmRpbmctcGFnZSB7XG4gIG1heC13aWR0aDogMTE1MHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDRlbTtcbiAgICBsaW5lLWhlaWdodDogNzBweDtcbiAgICBtYXJnaW46IDAgMCAyMHB4O1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogMmVtO1xuICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgbWFyZ2luOiA1MHB4IDAgMTBweDtcbiAgfVxuXG4gIC5jb250ZW50IHtcbiAgICBmb250LXNpemU6IDFlbTtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICB9XG5cbiAgLnF1ZXN0aW9uIHtcbiAgICBtYXJnaW46IDE4cHggMDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG5cbiAgLmNvbHVtbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIG1hcmdpbjogMCAtMjVweDtcbiAgfVxuXG4gIC5zZWN0aW9uLWl0ZW0ge1xuICAgIGZsZXg6IDEgMCA1MCU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBwYWRkaW5nOiAwIDI1cHg7XG4gICAgbWF4LXdpZHRoOiA3NTBweDtcbiAgICBtaW4td2lkdGg6IDMyMHB4O1xuXG4gICAgaW1nIHtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC5zZWN0aW9uLWltYWdlIHtcbiAgICAgIHBhZGRpbmctdG9wOiA1MHB4O1xuICAgIH1cbiAgfVxuXG4gIC5qb3VybmV5IHtcbiAgICBtYXJnaW46IDAgLTI1cHg7XG4gICAgPiAqIHtcbiAgICAgIHBhZGRpbmc6IDAgMjVweDtcbiAgICB9XG4gIH1cblxuICAuam91cm5leS1zdGVwcy13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBtYXJnaW46IDAgLTI1cHg7XG4gIH1cblxuICAuam91cm5leS1zdGVwIHtcbiAgICBmbGV4OiAxIDEgMTYwcHg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBwYWRkaW5nOiAwIDI1cHggMDtcblxuICAgIC5pY29uIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1hcmdpbjogNTBweCAwIDIwcHg7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgfVxuICB9XG59XG4iLCJAaW1wb3J0ICd2YXJpYWJsZXMnO1xuXG5AbWl4aW4gbG9nbyB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktbG9nbztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAgIWltcG9ydGFudDtcbn1cblxuQG1peGluIGZsZXgtY2VudGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGluaGVyaXQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmc7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAmLmRhcmsge1xuICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1kYXJrLWJnO1xuICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLWJvcmRlcjtcblxuICAgIC5saW5rLFxuICAgIC5sZWdhbCxcbiAgICAubG9nbyB7XG4gICAgICBjb2xvcjogJGNvbG9yLWRhcmstcHJpbWFyeSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5pY29uIHN2ZyB7XG4gICAgICBmaWxsOiAkY29sb3ItZGFyay1wcmltYXJ5O1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbGluayB7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1peGluIGJhZGdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1peGluIGxlZ2FsIHtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBjb2xvcjogJGNvbG9yLXNlY29uZGFyeTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMTJweDtcbn1cblxuQG1peGluIGJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xuICBnYXA6IDVweDtcbn1cblxuQG1peGluIGFkZG9ucy1iYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBmbGV4LWNlbnRlcjtcbn1cblxuQG1peGluIGJhZGdlLXRleHQtd3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG5AbWl4aW4gaG9tZXBhZ2UtYW5pbWF0aW9ucyB7XG4gIEBrZXlmcmFtZXMgaGVhZGluZ19hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgIH1cbiAgICAyJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA4JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDk1JSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIHN1YnRleHRfYW5pbWF0aW9uIHtcbiAgICAwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA0JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA4NiUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgOTElIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIENvbG9yc1xuJGNvbG9yLXByaW1hcnk6ICMxNzEyMGY7XG4kY29sb3Itc2Vjb25kYXJ5OiAjNzg3NDcxO1xuJGNvbG9yLWJnOiAjZmZmZmZmO1xuJGNvbG9yLWJvcmRlcjogI2YwZWVlYjtcbiRjb2xvci10b3Atc3RyaXAtYmc6ICNmMGVlZWI7XG4kY29sb3ItZGFyay1wcmltYXJ5OiAjZmZmZmZmO1xuJGNvbG9yLWRhcmstYmc6ICMxNzEyMGY7XG4kY29sb3ItcGluazogI2ZlYjNjNztcblxuLy8gRm9udCBmYW1pbGllc1xuJGZvbnQtZmFtaWx5LWJhc2U6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBBcmlhbCxcbiAgc2Fucy1zZXJpZjtcbiRmb250LWZhbWlseS1sb2dvOiAnS2xhcm5hIEhlYWRsaW5lJztcbiJdLCJzb3VyY2VSb290IjoiIn0= */`;
  function Vs({
    theme: e,
    infoPageMainTitle: t,
    infoPageMainSubtitle: n,
    assetsUrl: i,
    infoPageTitleFirstColumn: a,
    infoPageContentFirstColumn: s,
    infoPageTitleSecondColumn: r,
    infoPageContentSecondColumn: o,
    infoPageTitleTertiaryFirstColumn: c,
    infoPageContentTertiaryFirstColumn: l,
    infoPageTitleTertiarySecondColumn: d,
    infoPageContentTertiarySecondColumn: u,
    infoPageJourneyTitle: g,
    infoPageJourneyStepOne: b,
    infoPageJourneyStepTwo: h,
    infoPageJourneyStepThree: p,
    infoPagePaymentSectionDescription: m,
    infoPagePaymentSectionTitle: I,
    infoPageFAQs: f,
    infoPagePMGroups: C,
  }) {
    return ui.qy`
    <style>
      ${Ts}
    </style>
    <div
      data-testid="${t ? "info-page" : ""}"
      class="container ${e}"
      part="osm-container"
    >
      <div class="landing-page">
        <h1 part="osm-heading">${t}</h1>
        <p class="content">${n}</p>

        ${(function (e) {
          const {
            assetsUrl: t,
            infoPagePaymentSectionDescription: n,
            infoPagePaymentSectionTitle: i,
            infoPagePMGroups: a,
          } = e;
          return is(
            `\n      <section class="columns">\n          <div class="section-item">\n          <div class="section-image">\n              <img loading="lazy" alt="Klarna Checkout is easy, convenient and fast"\n              src="${t}/images/info-page-sleeping.webp"/>\n          </div>\n          </div>\n\n          <div class="section-item">\n              <h2 part="osm-heading">${i}</h2>\n              <p class="content">${n}</p>\n          </div>\n\n          ${(function (
              e
            ) {
              const { infoPagePMGroups: t } = e;
              return t?.length
                ? `${t
                    .map((e) => {
                      const {
                        title: t,
                        description: n,
                        hyper_link_list: i,
                      } = e;
                      return `\n        <div class="section-item payment-method">\n          <h2 part="osm-heading">${t}</h2>\n          <p class="content">\n            ${ws(
                        n,
                        i
                      )}\n          </p>\n        </div>\n      `;
                    })
                    .join("")}`
                : "";
            })({ infoPagePMGroups: a })}<br />\n      </section>\n  `
          );
        })({
          assetsUrl: i,
          infoPagePaymentSectionDescription: m,
          infoPagePaymentSectionTitle: I,
          infoPagePMGroups: C,
        })}
        ${(function (e) {
          const {
            infoPageJourneyTitle: t,
            infoPageJourneyStepOne: n,
            infoPageJourneyStepTwo: i,
            infoPageJourneyStepThree: a,
          } = e;
          return is(
            `\n      <section class="journey">\n          <h2 part="osm-heading">${t}</h2>\n          <div class="journey-steps-wrapper">\n          <div class="journey-step">\n              <div class="icon"><svg\n  aria-labelledby="osm-klarna-shopping-cart"\n  viewBox="0 0 50 47"\n>\n  <path\n    fill-rule="evenodd"\n    d="M21 2c5 0 9.2 3.7 9.9 8.5h10.6l-1.8 15h6.6v1.7c0 .1.6 12.3 2.5 18l.8 2.3H18.3l.8-2.3.4-1.2h-10c-2.7 0-4.9-2-5.3-4.5l-3.8-29H11A10 10 0 0 1 21 2Zm22 27H25c-.1 3.1-.6 10-1.8 15h21.6A113 113 0 0 1 43 29Zm-5.5-15h-33l3.4 25c0 .9.8 1.5 1.7 1.5h10.7c1-6 1.3-13.2 1.3-13.3v-1.7h14.6L37.5 14Zm-6.3 17.5a2.7 2.7 0 0 0 5.6 0h3.5a6.2 6.2 0 1 1-12.5 0h3.4ZM21 5.5c-3 0-5.6 2.1-6.3 5h12.6c-.7-2.9-3.2-5-6.3-5Z"\n  />\n</svg></div>\n              <p class="content">${n}</p>\n          </div>\n\n          <div class="journey-step">\n              <div class="icon">${gs(
              { width: 95, height: 40 }
            )}</div>\n              <p class="content">${i}</p>\n          </div>\n\n          <div class="journey-step">\n              <div class="icon"><svg aria-hidden="true" viewBox="0 0 34 50">\n  <path\n    fill-rule="evenodd"\n    d="M28.3 0c2.8 0 5.2 2.4 5.2 5.3v39.5c0 2.8-2.4 5.2-5.3 5.2H5.9a5.2 5.2 0 0 1-5.3-5.3V5.4A5.2 5.2 0 0 1 5.8 0h22.4ZM11.4 3.5H5.7c-1 0-1.7.8-1.7 1.8v39.5c0 1 .8 1.7 1.8 1.7h22.4c1 0 1.8-.8 1.8-1.8V5.4c0-1-.8-1.8-1.8-1.8h-5.7l-2.3 3h-6.4l-2.3-3Zm5.5 36a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8.3-13a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM21.7 15c0 3.3-1.3 6.4-3.5 8.6l4.8 6.6h-4.3l-5.3-7.1 1.4-1a8.8 8.8 0 0 0 3.5-7.1ZM13 15v15.2H9.5V15H13Z"\n  />\n</svg></div>\n              <p class="content">${a}</p>\n          </div>\n\n          <div class="journey-step"></div>\n          </div>\n      </section>\n  `
          );
        })({
          infoPageJourneyTitle: g,
          infoPageJourneyStepOne: b,
          infoPageJourneyStepTwo: h,
          infoPageJourneyStepThree: p,
        })}
        ${(function (e) {
          const {
            infoPageTitleTertiaryFirstColumn: t,
            infoPageContentTertiaryFirstColumn: n,
            infoPageTitleTertiarySecondColumn: i,
            infoPageContentTertiarySecondColumn: a,
          } = e;
          return is(
            `\n      <section class="columns">\n          <div class="section-item">\n          <h2 part="osm-heading">${t}</h2>\n          <p class="content">${n}</p>\n          </div>\n\n          <div class="section-item">\n          <h2 part="osm-heading">${i}</h2>\n          <p class="content">${a}</p>\n          </div>\n      </section>\n  `
          );
        })({
          infoPageTitleTertiaryFirstColumn: c,
          infoPageContentTertiaryFirstColumn: l,
          infoPageTitleTertiarySecondColumn: d,
          infoPageContentTertiarySecondColumn: u,
        })}
        ${(function (e) {
          const {
            assetsUrl: t,
            infoPageTitleFirstColumn: n,
            infoPageContentFirstColumn: i,
            infoPageTitleSecondColumn: a,
            infoPageContentSecondColumn: s,
            infoPageFAQs: r,
            infoPagePMGroups: o,
          } = e;
          return is(
            `\n  <section class="columns">\n      <div class="section-item">\n          <div class="section-image">\n              <img loading="lazy" alt="Manage your purchases through the Klarna app"\n              src="${t}/images/info-page-app-v2.webp"/>\n          </div>\n          <h2 part="osm-heading">${n}</h2>\n          <p class="content">${i}</p>\n          ${(function (
              e
            ) {
              let t = [];
              const { infoPageFAQs: n, infoPagePMGroups: i } = e;
              return (
                n?.length && (t = [...t, ...n]),
                i?.length && i.forEach((e) => (t = [...t, ...e.faq])),
                `<div>${t
                  .map((e) => {
                    const { question: t, answer: n, hyper_link_list: i } = e;
                    return `\n      <h3 part="osm-heading" class="content question">${t}</h3>\n      <p class="content">${ws(
                      n,
                      i
                    )}</p>\n    `;
                  })
                  .join("")}</div>`
              );
            })({
              infoPageFAQs: r,
              infoPagePMGroups: o,
            })}\n      </div>\n\n      <div class="section-item">\n          <div class="section-image">\n              <img loading="lazy" alt="Klarna makes shopping smoooth"\n              src="${t}/images/info-page-pocket.webp"/>\n          </div>\n          <h2 part="osm-heading">\n              ${a}\n          </h2>\n          <p class="content">${s}</p>\n      </div>\n  </section>\n  `
          );
        })({
          assetsUrl: i,
          infoPageTitleFirstColumn: a,
          infoPageContentFirstColumn: s,
          infoPageTitleSecondColumn: r,
          infoPageContentSecondColumn: o,
          infoPageFAQs: f,
          infoPagePMGroups: C,
        })}
      </div>
    </div>
  `;
  }
  function Hs({ code: e, onLearnMoreClick: t }) {
    let n = "";
    function i(e) {
      t(e, n);
    }
    return (
      setTimeout(() => {
        const e = [...document.querySelectorAll('[onclick^="kmerchant"]')];
        document.querySelectorAll("klarna-placement").forEach((t) => {
          if (null === t.shadowRoot) return;
          const n = t.shadowRoot.querySelector('[onclick^="kmerchant"]');
          n && e.push(n);
        });
        for (const t of e) {
          const e = /\{[^}]*url: '([^']*)[^}]*\}/,
            a = t.getAttribute("onclick").match(e)[1];
          (n = a),
            t.setAttribute("onclick", ""),
            t.addEventListener("click", i.bind(this));
        }
      }, 1e3),
      ui.qy`${is(e)}`
    );
  }
  const Js = ui.qy`<svg
  viewBox="0 0 38 22"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <title>Acceptance mark / Klarna / Inside Checkout / Pink</title>
  <g id="Delivery" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="Acceptance-mark-/-Klarna-/-Inside-Checkout-/-Pink">
      <g id="Mark" transform="translate(-0.000300, 0.000400)">
        <path
          d="M35,22 L3,22 C1.344,22 0,20.656 0,19 L0,3 C0,1.343 1.344,0 3,0 L35,0 C36.657,0 38,1.343 38,3 L38,19 C38,20.656 36.657,22 35,22"
          id="BG"
          fill="#FFB3C7"
        ></path>
        <path
          d="M30.5664,13.3271 C29.8184,13.3271 29.2124,12.7531 29.2124,12.0431 C29.2124,11.3341 29.8184,10.7601 30.5664,10.7601 C31.3144,10.7601 31.9204,11.3341 31.9204,12.0431 C31.9204,12.7531 31.3144,13.3271 30.5664,13.3271 L30.5664,13.3271 Z M31.9244,9.5481 L31.9244,9.8671 C31.5034,9.5791 30.9934,9.4101 30.4444,9.4101 C28.9894,9.4101 27.8104,10.5891 27.8104,12.0431 C27.8104,13.4981 28.9894,14.6771 30.4444,14.6771 C30.9934,14.6771 31.5034,14.5081 31.9244,14.2201 L31.9244,14.5391 L33.4204,14.5391 L33.4204,9.5481 L31.9244,9.5481 Z"
          id="Letter"
          fill="#000000"
        ></path>
        <path
          d="M8.792,7.3222 L7.171,7.3222 C7.171,8.6502 6.561,9.8702 5.495,10.6682 L4.854,11.1482 L7.341,14.5412 L9.387,14.5412 L7.098,11.4192 C8.183,10.3392 8.792,8.8842 8.792,7.3222"
          id="Letter"
          fill="#000000"
        ></path>
        <polygon
          id="Letter"
          fill="#000000"
          points="2.9953 14.5406 4.6553 14.5406 4.6553 7.3216 2.9953 7.3216"
        ></polygon>
        <polygon
          id="Letter"
          fill="#000000"
          points="9.8693 14.5386 11.4333 14.5386 11.4333 7.3236 9.8693 7.3236"
        ></polygon>
        <path
          d="M25.1552,9.414 C24.5582,9.414 23.9932,9.599 23.6152,10.11 L23.6152,9.548 L22.1282,9.548 L22.1282,14.539 L23.6342,14.539 L23.6342,11.916 C23.6342,11.157 24.1422,10.785 24.7562,10.785 C25.4122,10.785 25.7902,11.178 25.7902,11.905 L25.7902,14.539 L27.2822,14.539 L27.2822,11.365 C27.2822,10.203 26.3592,9.414 25.1552,9.414"
          id="Letter"
          fill="#000000"
        ></path>
        <path
          d="M14.8017,13.3271 C14.0537,13.3271 13.4477,12.7531 13.4477,12.0431 C13.4477,11.3341 14.0537,10.7601 14.8017,10.7601 C15.5497,10.7601 16.1557,11.3341 16.1557,12.0431 C16.1557,12.7531 15.5497,13.3271 14.8017,13.3271 L14.8017,13.3271 Z M16.1607,9.5481 L16.1607,9.8671 C15.7387,9.5791 15.2297,9.4101 14.6797,9.4101 C13.2257,9.4101 12.0457,10.5891 12.0457,12.0431 C12.0457,13.4981 13.2257,14.6771 14.6797,14.6771 C15.2297,14.6771 15.7387,14.5081 16.1607,14.2201 L16.1607,14.5391 L17.6557,14.5391 L17.6557,9.5481 L16.1607,9.5481 Z"
          id="Letter"
          fill="#000000"
        ></path>
        <path
          d="M19.9668,10.1982 L19.9668,9.5482 L18.4368,9.5482 L18.4368,14.5392 L19.9698,14.5392 L19.9698,12.2092 C19.9698,11.4232 20.8218,11.0002 21.4128,11.0002 L21.4318,11.0002 L21.4318,9.5482 C20.8238,9.5482 20.2668,9.8072 19.9668,10.1982"
          id="Letter"
          fill="#000000"
        ></path>
        <path
          d="M35.0058,12.7685 C34.4878,12.7685 34.0688,13.1885 34.0688,13.7055 C34.0688,14.2245 34.4878,14.6445 35.0058,14.6445 C35.5238,14.6445 35.9428,14.2245 35.9428,13.7055 C35.9428,13.1885 35.5238,12.7685 35.0058,12.7685"
          id="Letter"
          fill="#000000"
        ></path>
      </g>
    </g>
  </g>
</svg>`,
    Ms = ui.AH`p{margin:0}#badge{display:flex;min-height:22px;min-width:38px;width:100%;box-sizing:border-box}svg{min-width:100%;min-height:22px}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3NpZGViYXItcHJvbW90aW9uLWF1dG8tc2l6ZS9zdHlsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEVBQ0UsUUFBQSxDQUdGLE9BQ0UsWUFBQSxDQUNBLGVBQUEsQ0FDQSxjQUFBLENBQ0EsVUFBQSxDQUNBLHFCQUFBLENBR0YsSUFDRSxjQUFBLENBQ0EsZUFBQSIsInNvdXJjZXNDb250ZW50IjpbInAge1xuICBtYXJnaW46IDA7XG59XG5cbiNiYWRnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDIycHg7XG4gIG1pbi13aWR0aDogMzhweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbnN2ZyB7XG4gIG1pbi13aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMjJweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */`,
    js = ui.AH`:host{width:auto;height:auto}.loading{filter:blur(5px) brightness(100%);transition:filter 300ms ease-out}.dark.loading{filter:blur(5px) brightness(30%);transition:filter 300ms ease-out;background-color:#000}.loaded,.dark.loaded{filter:blur(0) brightness(100%)}.homepage-promotion-tall{width:160px !important}.homepage-promotion-wide{width:720px !important}.homepage-promotion-box{width:300px !important}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3N0eWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFDRSxVQUFBLENBQ0EsV0FBQSxDQUdGLFNBQ0UsaUNBQUEsQ0FDQSxnQ0FBQSxDQUdGLGNBQ0UsZ0NBQUEsQ0FDQSxnQ0FBQSxDQUNBLHFCQUFBLENBR0YscUJBRUUsK0JBQUEsQ0FHRix5QkFDRSxzQkFBQSxDQUdGLHlCQUNFLHNCQUFBLENBR0Ysd0JBQ0Usc0JBQUEiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIHdpZHRoOiBhdXRvO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5sb2FkaW5nIHtcbiAgZmlsdGVyOiBibHVyKDVweCkgYnJpZ2h0bmVzcygxMDAlKTtcbiAgdHJhbnNpdGlvbjogZmlsdGVyIDMwMG1zIGVhc2Utb3V0O1xufVxuXG4uZGFyay5sb2FkaW5nIHtcbiAgZmlsdGVyOiBibHVyKDVweCkgYnJpZ2h0bmVzcygzMCUpO1xuICB0cmFuc2l0aW9uOiBmaWx0ZXIgMzAwbXMgZWFzZS1vdXQ7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuXG4ubG9hZGVkLFxuLmRhcmsubG9hZGVkIHtcbiAgZmlsdGVyOiBibHVyKDApIGJyaWdodG5lc3MoMTAwJSk7XG59XG5cbi5ob21lcGFnZS1wcm9tb3Rpb24tdGFsbCB7XG4gIHdpZHRoOiAxNjBweCAhaW1wb3J0YW50O1xufVxuXG4uaG9tZXBhZ2UtcHJvbW90aW9uLXdpZGUge1xuICB3aWR0aDogNzIwcHggIWltcG9ydGFudDtcbn1cblxuLmhvbWVwYWdlLXByb21vdGlvbi1ib3gge1xuICB3aWR0aDogMzAwcHggIWltcG9ydGFudDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */`,
    zs = ui.AH`.container{display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;text-align:center;color:#17120f;font-size:12px;font-weight:400;line-height:14px;background-color:#fff;border-style:solid;border-color:#f0eeeb;border-radius:5px;border-width:1px;padding:4px 8px;flex-direction:row-reverse;justify-content:center;align-items:center;font-size:16px;font-weight:500;line-height:25px;color:#17120f;background-color:#f0eeeb;padding:8px 14px;text-align:center;border-radius:0px;border-width:0px;border-style:solid;border-color:#f0eeeb}.container.dark{color:#fff;background-color:#17120f;border-color:#f0eeeb}.container.dark .link,.container.dark .legal,.container.dark .logo{color:#fff !important}.container.dark .icon svg{fill:#fff}.link{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#17120f;font-weight:400;font-size:12px;text-decoration:underline;white-space:nowrap;background:none;border:none;padding:0;cursor:pointer;font-size:inherit}.logo{font-family:"Klarna Headline";font-weight:bold;color:#17120f;text-transform:none !important;letter-spacing:0 !important;font-size:inherit}p{margin:0}@media(max-width: 200px){.container{flex-wrap:wrap;justify-content:flex-end}}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3RvcC1zdHJpcC1wcm9tb3Rpb24tYXV0by1zaXplL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLi8uLi9rbGFybmEtbWVzc2FnaW5nL3NyYy9zdHlsZXMvX21peGlucy5zY3NzIiwid2VicGFjazovLy4vLi4va2xhcm5hLW1lc3NhZ2luZy9zcmMvc3R5bGVzL192YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxXQ2dCRSxZQUFBLENBQ0EscUJBQUEsQ0FDQSxzQkFBQSxDQUNBLG1CQUFBLENBQ0EscUJBQUEsQ0FDQSwrRUNaaUIsQ0RhakIsaUJBQUEsQ0FDQSxhQ3hCYyxDRHlCZCxjQUFBLENBQ0EsZUFBQSxDQUNBLGdCQUFBLENBQ0EscUJDMUJTLENEMkJULGtCQUFBLENBQ0Esb0JDM0JhLENENEJiLGlCQUFBLENBQ0EsZ0JBQUEsQ0FDQSxlQUFBLENBQ0EsMEJBQUEsQ0FDQSxzQkFBQSxDQUNBLGtCQUFBLENEakNBLGNBQUEsQ0FDQSxlQUFBLENBQ0EsZ0JBQUEsQ0FFQSxhRVBjLENGUWQsd0JFSm1CLENGS25CLGdCQUFBLENBQ0EsaUJBQUEsQ0FFQSxpQkFBQSxDQUNBLGdCQUFBLENBQ0Esa0JBQUEsQ0FDQSxvQkVYbUIsQ0RrQ25CLGdCQUNFLFVDbENpQixDRG1DakIsd0JDbENZLENEbUNaLG9CQ3RDVyxDRHdDWCxtRUFHRSxxQkFBQSxDQUdGLDBCQUNFLFNDN0NlLENGYXJCLE1Dc0NFLCtFQzlDaUIsQ0QrQ2pCLGFDekRjLENEMERkLGVBQUEsQ0FDQSxjQUFBLENBQ0EseUJBQUEsQ0FDQSxrQkFBQSxDQUNBLGVBQUEsQ0FDQSxXQUFBLENBQ0EsU0FBQSxDQUNBLGNBQUEsQ0Q3Q0EsaUJBQUEsQ0FHRixNQ3JCRSw2QkNVaUIsQ0RUakIsZ0JBQUEsQ0FDQSxhQ0pjLENES2QsOEJBQUEsQ0FDQSwyQkFBQSxDRG1CQSxpQkFBQSxDQUdGLEVBQ0UsUUFBQSxDQUdGLHlCQUNFLFdBQ0UsY0FBQSxDQUNBLHdCQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi9zdHlsZXMvbWl4aW5zJztcblxuLmNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGNvbnRhaW5lcjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMjVweDtcblxuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci10b3Atc3RyaXAtYmc7XG4gIHBhZGRpbmc6IDhweCAxNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgYm9yZGVyLXJhZGl1czogMHB4O1xuICBib3JkZXItd2lkdGg6IDBweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAkY29sb3ItdG9wLXN0cmlwLWJnO1xufVxuXG4ubGluayB7XG4gIEBpbmNsdWRlIGxpbms7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbn1cblxuLmxvZ28ge1xuICBAaW5jbHVkZSBsb2dvO1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAyMDBweCkge1xuICAuY29udGFpbmVyIHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgfVxufVxuIiwiQGltcG9ydCAndmFyaWFibGVzJztcblxuQG1peGluIGxvZ28ge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWxvZ287XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gIGxldHRlci1zcGFjaW5nOiAwICFpbXBvcnRhbnQ7XG59XG5cbkBtaXhpbiBmbGV4LWNlbnRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBpbmhlcml0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1peGluIGNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMTRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJnO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6ICRjb2xvci1ib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIHBhZGRpbmc6IDRweCA4cHg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgJi5kYXJrIHtcbiAgICBjb2xvcjogJGNvbG9yLWRhcmstcHJpbWFyeTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItZGFyay1iZztcbiAgICBib3JkZXItY29sb3I6ICRjb2xvci1ib3JkZXI7XG5cbiAgICAubGluayxcbiAgICAubGVnYWwsXG4gICAgLmxvZ28ge1xuICAgICAgY29sb3I6ICRjb2xvci1kYXJrLXByaW1hcnkgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAuaWNvbiBzdmcge1xuICAgICAgZmlsbDogJGNvbG9yLWRhcmstcHJpbWFyeTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGxpbmsge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBtaXhpbiBiYWRnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbkBtaXhpbiBsZWdhbCB7XG4gIG1hcmdpbi10b3A6IDRweDtcbiAgY29sb3I6ICRjb2xvci1zZWNvbmRhcnk7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDEycHg7XG59XG5cbkBtaXhpbiBiYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBmbGV4LWNlbnRlcjtcbiAgZ2FwOiA1cHg7XG59XG5cbkBtaXhpbiBhZGRvbnMtYmFkZ2UtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgZmxleC1jZW50ZXI7XG59XG5cbkBtaXhpbiBiYWRnZS10ZXh0LXdyYXBwZXIge1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuQG1peGluIGhvbWVwYWdlLWFuaW1hdGlvbnMge1xuICBAa2V5ZnJhbWVzIGhlYWRpbmdfYW5pbWF0aW9uIHtcbiAgICAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICB9XG4gICAgMiUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA4KTtcbiAgICB9XG4gICAgNCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgOCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgOTAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA5NSUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzdWJ0ZXh0X2FuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgNCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgODYlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDkxJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICB9XG59XG4iLCIvLyBDb2xvcnNcbiRjb2xvci1wcmltYXJ5OiAjMTcxMjBmO1xuJGNvbG9yLXNlY29uZGFyeTogIzc4NzQ3MTtcbiRjb2xvci1iZzogI2ZmZmZmZjtcbiRjb2xvci1ib3JkZXI6ICNmMGVlZWI7XG4kY29sb3ItdG9wLXN0cmlwLWJnOiAjZjBlZWViO1xuJGNvbG9yLWRhcmstcHJpbWFyeTogI2ZmZmZmZjtcbiRjb2xvci1kYXJrLWJnOiAjMTcxMjBmO1xuJGNvbG9yLXBpbms6ICNmZWIzYzc7XG5cbi8vIEZvbnQgZmFtaWxpZXNcbiRmb250LWZhbWlseS1iYXNlOiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgQXJpYWwsXG4gIHNhbnMtc2VyaWY7XG4kZm9udC1mYW1pbHktbG9nbzogJ0tsYXJuYSBIZWFkbGluZSc7XG4iXSwic291cmNlUm9vdCI6IiJ9 */`,
    Ps = ui.AH`.container{display:flex;flex-direction:column;justify-content:center;align-items:stretch;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;text-align:center;color:#17120f;font-size:12px;font-weight:400;line-height:14px;background-color:#fff;border-style:solid;border-color:#f0eeeb;border-radius:5px;border-width:1px;padding:4px 8px;flex-direction:row-reverse;justify-content:center;align-items:center;font-size:16px;line-height:24px;border-color:#17120f;border-radius:0px;border-width:0px;background-color:#f0eeeb;padding:8px 14px;text-align:left}.container.dark{color:#fff;background-color:#17120f;border-color:#f0eeeb}.container.dark .link,.container.dark .legal,.container.dark .logo{color:#fff !important}.container.dark .icon svg{fill:#fff}.link{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#17120f;font-weight:400;font-size:12px;text-decoration:underline;white-space:nowrap;background:none;border:none;padding:0;cursor:pointer;font-size:16px}.badge{font-family:"Klarna Headline";font-weight:bold;color:#17120f;text-transform:none !important;letter-spacing:0 !important;display:flex}p{margin:0}.text-wrapper{margin-left:0px;margin-right:14px}.logo{font-family:"Klarna Headline";font-weight:bold;color:#17120f;text-transform:none !important;letter-spacing:0 !important;font-size:inherit}.badge-container{display:flex;flex-direction:inherit;justify-content:center;align-items:center;gap:5px}.badge-text-wrapper{margin-left:5px;margin-right:5px}.addons-badge-container{display:flex;flex-direction:inherit;justify-content:center;align-items:center}@media(max-width: 200px){.container{flex-wrap:wrap;justify-content:flex-end}.text-wrapper{margin-top:16px;margin-left:0}}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3RvcC1zdHJpcC1wcm9tb3Rpb24tYmFkZ2Uvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1tZXNzYWdpbmcvc3JjL3N0eWxlcy9fbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vLi8uLi9rbGFybmEtbWVzc2FnaW5nL3NyYy9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFdDZ0JFLFlBQUEsQ0FDQSxxQkFBQSxDQUNBLHNCQUFBLENBQ0EsbUJBQUEsQ0FDQSxxQkFBQSxDQUNBLCtFQ1ppQixDRGFqQixpQkFBQSxDQUNBLGFDeEJjLENEeUJkLGNBQUEsQ0FDQSxlQUFBLENBQ0EsZ0JBQUEsQ0FDQSxxQkMxQlMsQ0QyQlQsa0JBQUEsQ0FDQSxvQkMzQmEsQ0Q0QmIsaUJBQUEsQ0FDQSxnQkFBQSxDQUNBLGVBQUEsQ0FDQSwwQkFBQSxDQUNBLHNCQUFBLENBQ0Esa0JBQUEsQ0RqQ0EsY0FBQSxDQUNBLGdCQUFBLENBQ0Esb0JFTGMsQ0ZNZCxpQkFBQSxDQUNBLGdCQUFBLENBQ0Esd0JFSm1CLENGS25CLGdCQUFBLENBQ0EsZUFBQSxDQzRCQSxnQkFDRSxVQ2xDaUIsQ0RtQ2pCLHdCQ2xDWSxDRG1DWixvQkN0Q1csQ0R3Q1gsbUVBR0UscUJBQUEsQ0FHRiwwQkFDRSxTQzdDZSxDRlFyQixNQzJDRSwrRUM5Q2lCLENEK0NqQixhQ3pEYyxDRDBEZCxlQUFBLENBQ0EsY0FBQSxDQUNBLHlCQUFBLENBQ0Esa0JBQUEsQ0FDQSxlQUFBLENBQ0EsV0FBQSxDQUNBLFNBQUEsQ0FDQSxjQUFBLENEbERBLGNBQUEsQ0FHRixPQ2hCRSw2QkNVaUIsQ0RUakIsZ0JBQUEsQ0FDQSxhQ0pjLENES2QsOEJBQUEsQ0FDQSwyQkFBQSxDRGNBLFlBQUEsQ0FHRixFQUNFLFFBQUEsQ0FHRixjQUNFLGVBQUEsQ0FDQSxpQkFBQSxDQUdGLE1DOUJFLDZCQ1VpQixDRFRqQixnQkFBQSxDQUNBLGFDSmMsQ0RLZCw4QkFBQSxDQUNBLDJCQUFBLENENEJBLGlCQUFBLENBR0YsaUJDM0JFLFlBQUEsQ0FDQSxzQkFBQSxDQUNBLHNCQUFBLENBQ0Esa0JBQUEsQ0FzRUEsT0FBQSxDRDFDRixvQkNrREUsZUFBQSxDQUNBLGdCQUFBLENEL0NGLHdCQ25DRSxZQUFBLENBQ0Esc0JBQUEsQ0FDQSxzQkFBQSxDQUNBLGtCQUFBLENEb0NGLHlCQUNFLFdBQ0UsY0FBQSxDQUNBLHdCQUFBLENBRUYsY0FDRSxlQUFBLENBQ0EsYUFBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vc3R5bGVzL21peGlucyc7XG5cbi5jb250YWluZXIge1xuICBAaW5jbHVkZSBjb250YWluZXI7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIGJvcmRlci1jb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGJvcmRlci1yYWRpdXM6IDBweDtcbiAgYm9yZGVyLXdpZHRoOiAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci10b3Atc3RyaXAtYmc7XG4gIHBhZGRpbmc6IDhweCAxNHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4ubGluayB7XG4gIEBpbmNsdWRlIGxpbms7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLmJhZGdlIHtcbiAgQGluY2x1ZGUgbG9nbztcbiAgZGlzcGxheTogZmxleDtcbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLnRleHQtd3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiAwcHg7XG4gIG1hcmdpbi1yaWdodDogMTRweDtcbn1cblxuLmxvZ28ge1xuICBAaW5jbHVkZSBsb2dvO1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbi5iYWRnZS1jb250YWluZXIge1xuICBAaW5jbHVkZSBiYWRnZS1jb250YWluZXI7XG59XG5cbi5iYWRnZS10ZXh0LXdyYXBwZXIge1xuICBAaW5jbHVkZSBiYWRnZS10ZXh0LXdyYXBwZXI7XG59XG5cbi5hZGRvbnMtYmFkZ2UtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgYWRkb25zLWJhZGdlLWNvbnRhaW5lcjtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDIwMHB4KSB7XG4gIC5jb250YWluZXIge1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICB9XG4gIC50ZXh0LXdyYXBwZXIge1xuICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJ3ZhcmlhYmxlcyc7XG5cbkBtaXhpbiBsb2dvIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1sb2dvO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICBsZXR0ZXItc3BhY2luZzogMCAhaW1wb3J0YW50O1xufVxuXG5AbWl4aW4gZmxleC1jZW50ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogaW5oZXJpdDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbkBtaXhpbiBjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktYmFzZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1iZztcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYuZGFyayB7XG4gICAgY29sb3I6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWRhcmstYmc7XG4gICAgYm9yZGVyLWNvbG9yOiAkY29sb3ItYm9yZGVyO1xuXG4gICAgLmxpbmssXG4gICAgLmxlZ2FsLFxuICAgIC5sb2dvIHtcbiAgICAgIGNvbG9yOiAkY29sb3ItZGFyay1wcmltYXJ5ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmljb24gc3ZnIHtcbiAgICAgIGZpbGw6ICRjb2xvci1kYXJrLXByaW1hcnk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBsaW5rIHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5AbWl4aW4gYmFkZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWl4aW4gbGVnYWwge1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIGNvbG9yOiAkY29sb3Itc2Vjb25kYXJ5O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xufVxuXG5AbWl4aW4gYmFkZ2UtY29udGFpbmVyIHtcbiAgQGluY2x1ZGUgZmxleC1jZW50ZXI7XG4gIGdhcDogNXB4O1xufVxuXG5AbWl4aW4gYWRkb25zLWJhZGdlLWNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGZsZXgtY2VudGVyO1xufVxuXG5AbWl4aW4gYmFkZ2UtdGV4dC13cmFwcGVyIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbkBtaXhpbiBob21lcGFnZS1hbmltYXRpb25zIHtcbiAgQGtleWZyYW1lcyBoZWFkaW5nX2FuaW1hdGlvbiB7XG4gICAgMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgfVxuICAgIDIlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDglIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDkwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgOTUlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc3VidGV4dF9hbmltYXRpb24ge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDg2JSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICA5MSUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29sb3JzXG4kY29sb3ItcHJpbWFyeTogIzE3MTIwZjtcbiRjb2xvci1zZWNvbmRhcnk6ICM3ODc0NzE7XG4kY29sb3ItYmc6ICNmZmZmZmY7XG4kY29sb3ItYm9yZGVyOiAjZjBlZWViO1xuJGNvbG9yLXRvcC1zdHJpcC1iZzogI2YwZWVlYjtcbiRjb2xvci1kYXJrLXByaW1hcnk6ICNmZmZmZmY7XG4kY29sb3ItZGFyay1iZzogIzE3MTIwZjtcbiRjb2xvci1waW5rOiAjZmViM2M3O1xuXG4vLyBGb250IGZhbWlsaWVzXG4kZm9udC1mYW1pbHktYmFzZTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEFyaWFsLFxuICBzYW5zLXNlcmlmO1xuJGZvbnQtZmFtaWx5LWxvZ286ICdLbGFybmEgSGVhZGxpbmUnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */`;
  function $s(e) {
    var t = (function (e, t) {
      if ("object" != typeof e || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var i = n.call(e, "string");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == typeof t ? t : t + "";
  }
  function qs(e, t, n) {
    "symbol" == typeof t && (t = (t = t.description) ? "[" + t + "]" : "");
    try {
      Object.defineProperty(e, "name", {
        configurable: !0,
        value: n ? n + " " + t : t,
      });
    } catch (e) {}
    return e;
  }
  function Ks(e) {
    if (Object(e) !== e)
      throw TypeError(
        "right-hand side of 'in' should be an object, got " +
          (null !== e ? typeof e : "null")
      );
    return e;
  }
  const er = "",
    tr = void 0;
  function nr(e, t) {
    let s,
      r,
      o,
      c,
      l,
      d,
      u,
      g,
      b,
      h,
      p,
      m,
      I,
      f,
      C,
      y,
      x,
      G,
      A,
      v,
      Z,
      Q,
      w,
      k,
      X,
      E,
      N,
      W,
      L,
      F,
      R,
      U,
      O,
      _,
      S,
      D,
      Y,
      T;
    if (!customElements.get(mt.PLACEMENT)) {
      class V extends ui.WF {
        static {
          ({
            e: [
              r,
              o,
              c,
              l,
              d,
              u,
              g,
              b,
              h,
              p,
              m,
              I,
              f,
              C,
              y,
              x,
              G,
              A,
              v,
              Z,
              Q,
              w,
              k,
              X,
              E,
              N,
              W,
              L,
              F,
              R,
              U,
              O,
              _,
              S,
              D,
              Y,
            ],
            c: [T, s],
          } = (function (e, t, n, i, a, s) {
            var r,
              o,
              c,
              l,
              d,
              u,
              g,
              b = Symbol.metadata || Symbol.for("Symbol.metadata"),
              h = Object.defineProperty,
              p = Object.create,
              m = [p(null), p(null)],
              I = t.length;
            function f(t, n, i) {
              return function (a, s) {
                n && ((s = a), (a = e));
                for (var r = 0; r < t.length; r++)
                  s = t[r].apply(a, i ? [s] : []);
                return i ? s : a;
              };
            }
            function C(e, t, n, i) {
              if ("function" != typeof e && (i || void 0 !== e))
                throw new TypeError(
                  t +
                    " must " +
                    (n || "be") +
                    " a function" +
                    (i ? "" : " or undefined")
                );
              return e;
            }
            function y(e, t, n, i, a, s, c, l, d, u, g) {
              function b(e) {
                if (!g(e))
                  throw new TypeError(
                    "Attempted to access private element on non-instance"
                  );
              }
              var p = [].concat(t[0]),
                I = t[3],
                y = !c,
                x = 1 === a,
                G = 3 === a,
                A = 4 === a,
                v = 2 === a;
              function B(t, n, i) {
                return function (a, s) {
                  return n && ((s = a), (a = e)), i && i(a), Z[t].call(a, s);
                };
              }
              if (!y) {
                var Z = {},
                  Q = [],
                  w = G ? "get" : A || x ? "set" : "value";
                if (
                  (d
                    ? (u || x
                        ? (Z = {
                            get: qs(
                              function () {
                                return I(this);
                              },
                              i,
                              "get"
                            ),
                            set: function (e) {
                              t[4](this, e);
                            },
                          })
                        : (Z[w] = I),
                      u || qs(Z[w], i, v ? "" : w))
                    : u || (Z = Object.getOwnPropertyDescriptor(e, i)),
                  !u && !d)
                ) {
                  if ((o = m[+l][i]) && 7 != (o ^ a))
                    throw Error(
                      "Decorating two elements with the same name (" +
                        Z[w].name +
                        ") is not supported yet"
                    );
                  m[+l][i] = a < 3 ? 1 : a;
                }
              }
              for (var k = e, X = p.length - 1; X >= 0; X -= n ? 2 : 1) {
                var E = C(p[X], "A decorator", "be", !0),
                  N = n ? p[X - 1] : void 0,
                  W = {},
                  L = {
                    kind: [
                      "field",
                      "accessor",
                      "method",
                      "getter",
                      "setter",
                      "class",
                    ][a],
                    name: i,
                    metadata: r,
                    addInitializer: function (e, t) {
                      if (e.v)
                        throw Error(
                          "attempted to call addInitializer after decoration was finished"
                        );
                      C(t, "An initializer", "be", !0), s.push(t);
                    }.bind(null, W),
                  };
                if (y)
                  (o = E.call(N, k, L)),
                    (W.v = 1),
                    C(o, "class decorators", "return") && (k = o);
                else if (
                  ((L.static = l),
                  (L.private = d),
                  (o = L.access =
                    {
                      has: d
                        ? g.bind()
                        : function (e) {
                            return i in e;
                          },
                    }),
                  A ||
                    (o.get = d
                      ? v
                        ? function (e) {
                            return b(e), Z.value;
                          }
                        : B("get", 0, b)
                      : function (e) {
                          return e[i];
                        }),
                  v ||
                    G ||
                    (o.set = d
                      ? B("set", 0, b)
                      : function (e, t) {
                          e[i] = t;
                        }),
                  (k = E.call(N, x ? { get: Z.get, set: Z.set } : Z[w], L)),
                  (W.v = 1),
                  x)
                ) {
                  if ("object" == typeof k && k)
                    (o = C(k.get, "accessor.get")) && (Z.get = o),
                      (o = C(k.set, "accessor.set")) && (Z.set = o),
                      (o = C(k.init, "accessor.init")) && Q.unshift(o);
                  else if (void 0 !== k)
                    throw new TypeError(
                      "accessor decorators must return an object with get, set, or init properties or undefined"
                    );
                } else
                  C(k, (u ? "field" : "method") + " decorators", "return") &&
                    (u ? Q.unshift(k) : (Z[w] = k));
              }
              return (
                a < 2 && c.push(f(Q, l, 1), f(s, l, 0)),
                u ||
                  y ||
                  (d
                    ? x
                      ? c.splice(-1, 0, B("get", l), B("set", l))
                      : c.push(v ? Z[w] : C.call.bind(Z[w]))
                    : h(e, i, Z)),
                k
              );
            }
            function x(e) {
              return h(e, b, { configurable: !0, enumerable: !0, value: r });
            }
            return (
              void 0 !== s && (r = s[b]),
              (r = p(null == r ? null : r)),
              (d = []),
              (u = function (e) {
                e && d.push(f(e));
              }),
              (g = function (t, i) {
                for (var a = 0; a < n.length; a++) {
                  var s = n[a],
                    r = s[1],
                    o = 7 & r;
                  if ((8 & r) == t && !o == i) {
                    var u = s[2],
                      g = !!s[3],
                      b = 16 & r;
                    y(
                      t ? e : e.prototype,
                      s,
                      b,
                      g ? "#" + u : $s(u),
                      o,
                      o < 2 ? [] : t ? (l = l || []) : (c = c || []),
                      d,
                      !!t,
                      g,
                      i,
                      t && g
                        ? function (t) {
                            return Ks(t) === e;
                          }
                        : undefined
                    );
                  }
                }
              }),
              g(8, 0),
              g(0, 0),
              g(8, 1),
              g(0, 1),
              u(c),
              u(l),
              (o = d),
              I || x(e),
              {
                e: o,
                get c() {
                  var n = [];
                  return I && [x((e = y(e, [t], 0, e.name, 5, n))), f(n, 1)];
                },
              }
            );
          })(
            this,
            [(0, gi.EM)(mt.PLACEMENT), $a],
            [
              [(0, gi.MZ)({ attribute: "data-key", type: yt }), 1, "key"],
              [
                (0, gi.MZ)({ attribute: "data-custom-payment-method-ids" }),
                1,
                "customPaymentMethodIds",
              ],
              [
                (0, gi.MZ)({ attribute: "data-message-prefix" }),
                1,
                "messagePrefix",
              ],
              [(0, gi.MZ)({ attribute: "data-theme" }), 1, "theme"],
              [(0, gi.MZ)({ attribute: "data-locale" }), 1, "locale"],
              [(0, gi.MZ)({ attribute: "data-instance" }), 1, "instance"],
              [
                (0, gi.MZ)({ attribute: "data-payment-amount" }),
                1,
                "paymentAmount",
              ],
              [
                (0, gi.MZ)({ attribute: "data-purchase-amount" }),
                1,
                "purchaseAmount",
              ],
              [
                (0, gi.MZ)({ attribute: "data-purchase_amount" }),
                1,
                "purchase_amount",
              ],
              [(0, gi.MZ)({ attribute: "data-inline" }), 1, "inline"],
              [
                (0, gi.MZ)({ attribute: "data-message-preference" }),
                1,
                "messagePreference",
              ],
              [(0, gi.MZ)({ type: Object }), 1, "placementAttributes"],
              [(0, gi.wk)(), 1, "code"],
              [(0, gi.wk)(), 1, "tracker"],
              [(0, gi.wk)(), 1, "nodes"],
              [(0, gi.wk)(), 1, "impressionUrl"],
              [(0, gi.wk)(), 1, "isLoading"],
              [(0, gi.wk)(), 1, "config"],
            ],
            0,
            0,
            ui.WF
          ));
        }
        #e = r(this, "");
        get key() {
          return this.#e;
        }
        set key(e) {
          this.#e = e;
        }
        #t = (o(this), c(this, ""));
        get customPaymentMethodIds() {
          return this.#t;
        }
        set customPaymentMethodIds(e) {
          this.#t = e;
        }
        #n = (l(this), d(this, ""));
        get messagePrefix() {
          return this.#n;
        }
        set messagePrefix(e) {
          this.#n = e;
        }
        #i = (u(this), g(this, er));
        get theme() {
          return this.#i;
        }
        set theme(e) {
          this.#i = e;
        }
        #a = (b(this), h(this, void 0));
        get locale() {
          return this.#a;
        }
        set locale(e) {
          this.#a = e;
        }
        #s = (p(this), m(this, ""));
        get instance() {
          return this.#s;
        }
        set instance(e) {
          this.#s = e;
        }
        #r = (I(this), f(this, tr));
        get paymentAmount() {
          return this.#r;
        }
        set paymentAmount(e) {
          this.#r = e;
        }
        #o = (C(this), y(this, tr));
        get purchaseAmount() {
          return this.#o;
        }
        set purchaseAmount(e) {
          this.#o = e;
        }
        #c = (x(this), G(this, tr));
        get purchase_amount() {
          return this.#c;
        }
        set purchase_amount(e) {
          this.#c = e;
        }
        #l = (A(this), v(this, ""));
        get inline() {
          return this.#l;
        }
        set inline(e) {
          this.#l = e;
        }
        #d = (Z(this), Q(this, void 0));
        get messagePreference() {
          return this.#d;
        }
        set messagePreference(e) {
          this.#d = e;
        }
        #u = (w(this), k(this, {}));
        get placementAttributes() {
          return this.#u;
        }
        set placementAttributes(e) {
          this.#u = e;
        }
        #g = (X(this), E(this, ""));
        get code() {
          return this.#g;
        }
        set code(e) {
          this.#g = e;
        }
        #b = (N(this), W(this, void 0));
        get tracker() {
          return this.#b;
        }
        set tracker(e) {
          this.#b = e;
        }
        #h = (L(this), F(this, void 0));
        get nodes() {
          return this.#h;
        }
        set nodes(e) {
          this.#h = e;
        }
        #p = (R(this), U(this, ""));
        get impressionUrl() {
          return this.#p;
        }
        set impressionUrl(e) {
          this.#p = e;
        }
        #m = (O(this), _(this, !1));
        get isLoading() {
          return this.#m;
        }
        set isLoading(e) {
          this.#m = e;
        }
        instanceId = (S(this), -1);
        #I = D(this, t);
        get config() {
          return this.#I;
        }
        set config(e) {
          this.#I = e;
        }
        isInline() {
          return this.hasAttribute("data-inline") && "true" === this.inline;
        }
        constructor() {
          super(), Y(this), (this.instanceId = this.getSamplingInstanceId());
          try {
            this.setupSentryWithTags(),
              (this.tracker = Ft({
                config: {
                  version: t.version,
                  environment: t.environment,
                  sessionId: t.sessionId,
                },
                trackerClient: i.osm,
                extraTrackingData: { aId: t.additionalIdentifier },
                locale: this.locale,
              }));
          } catch (e) {
            On(e);
          }
        }
        setupSentryWithTags() {
          const e = {
            accountId: t.accountId,
            clientId: t.clientId,
            product: mt.PLACEMENT,
          };
          cn({ environment: t.environment, version: t.version, tags: e });
        }
        createRenderRoot() {
          return this.isInline() ? this : super.createRenderRoot();
        }
        async updateContent() {
          try {
            const {
                locale: e,
                key: n,
                legacyRendering: i,
                theme: s = er,
                messagePrefix: r,
                customPaymentMethodIds: o,
              } = this.dataset,
              c = Qs(this.dataset),
              l = (function (e) {
                const { key: t = "", locale: n = "", theme: i } = e;
                if (
                  (At.includes(t) &&
                    B(
                      `The placement type ${t} will soon be deprecated. Please check https://docs.klarna.com/on-site-messaging/in-depth-knowledge/placements/#deprecated-placement-types`
                    ),
                  i &&
                    !Bt.includes(i?.toLowerCase()) &&
                    B(
                      `The provide theme(${i}) is not a valid argument. Please use one of these valid values: ${Bt}.`
                    ),
                  !Es.includes(t) && !t.includes("custom"))
                )
                  return (
                    B(
                      `${t} is not a valid placement type. Please check https://docs.klarna.com/on-site-messaging/in-depth-knowledge/placements/`
                    ),
                    !1
                  );
                const a = wt(n);
                return (
                  n
                    ? a || B(`invalid data-locale (${n}) in klarna-placement`)
                    : B("undefined data-locale in klarna-placement"),
                  !!(function (e, t) {
                    if (`${e}`.includes("credit")) {
                      if (void 0 === t)
                        return (
                          B("missing data-purchase-amount in klarna-placement"),
                          !1
                        );
                      if (Number.isNaN(parseFloat(t)))
                        return (
                          B(
                            "invalid purchase-amount in klarna-placement, it should be a number"
                          ),
                          !1
                        );
                      if (parseFloat(t) < 0)
                        return (
                          B(
                            "invalid purchase-amount in klarna-placement, it should be >= 0"
                          ),
                          !1
                        );
                      if (
                        (`${t}`.includes(".") || `${t}`.includes(",")) &&
                        (B(
                          "The data-purchase-amount should be in minor units (e.g. $120.00 should be passed as 12000). Please check https://docs.klarna.com/on-site-messaging/in-depth-knowledge/placements/#attributes"
                        ),
                        "number" != typeof (n = parseFloat(t)) ||
                          !isFinite(n) ||
                          Math.floor(n) !== n)
                      )
                        return !1;
                    }
                    var n;
                    return !0;
                  })(t, Qs(e))
                );
              })(this.dataset),
              d = Xt(e, window, !1),
              u = Nt(d),
              g = ((e) => {
                const t = this.dataset.messagePreference || "klarna";
                return "klarna" !== t && "in-store" !== t
                  ? (B(
                      "data-message-preference can only be one of [klarna, in-store]"
                    ),
                    "klarna")
                  : t;
              })(),
              b = Zt[this.config.environment][u];
            if (!l) return;
            if ("static" === vt[n] && !i)
              return void this.sendImpressionEvent();
            const h = i ? "html" : vt[n];
            this.isLoading = !0;
            const p = this.getClientId(),
              m = await (async function (
                {
                  locale: e,
                  key: t,
                  paymentAmount: n,
                  clientId: i,
                  accountId: s,
                  theme: r,
                  inline: o,
                  messagePrefix: c,
                  customPaymentMethodIds: l,
                  environment: d,
                  messagePreference: u,
                },
                g = "json"
              ) {
                let b = "json" === g ? "/messaging" : "/s";
                b = o ? "/i" : b;
                const h = Nt(e),
                  p = `${xt[d]}/${h}/cma`,
                  m = Pa(i);
                Qt.includes(i) && (b = o ? "/i" : "/s");
                let I = `${p}${
                  m ? "/v3" : "/v4"
                }${b}?placement_key=${t}&locale=${e}&channel=web`;
                r && (I = `${I}&theme=${r}`),
                  m && (I = `${I}&client_id=${i}`),
                  void 0 === n ||
                    "" === n ||
                    t.includes("top-strip") ||
                    t.includes("home") ||
                    (I = `${I}&payment_amount=${n}`),
                  c && (I = `${I}&message_prefix=${c}`),
                  o && (I = `${I}&inline=${o}`),
                  l && (I = `${I}&custom_payment_method_ids=${l}`),
                  u && (I = `${I}&message_preference=${u}`);
                const f = { "Klarna-Client-Type": "klarna-web-sdk" };
                let C;
                m || (f.Authorization = `basic ${i}`),
                  s && (f["Klarna-Account"] = s);
                try {
                  if (
                    ((C = Bs[I]),
                    C ||
                      ((C = await fetch(I, { headers: f })),
                      (Bs[I] = C && 200 === C.status ? C.clone() : void 0)),
                    C && 200 === C.status)
                  )
                    return await C.clone().json();
                  if (C && 200 !== C.status && "checkout" === t) {
                    let t = vs.default;
                    try {
                      e
                        ? (t = (await a(4868)(`./${e}.ts`)).default)
                        : On("No locale provided. Fallback to en-GB.");
                    } catch (t) {
                      On(
                        `Failed to load the locale file for ${e}. Fallback to en-GB. ${t.message}`
                      );
                    }
                    return t;
                  }
                  return;
                } catch (n) {
                  if ("checkout" === t) {
                    let t = vs.default;
                    try {
                      e
                        ? (t = (await a(4868)(`./${e}.ts`)).default)
                        : On("No locale provided. Fallback to en-GB.");
                    } catch (t) {
                      On(
                        `Failed to load the locale file for ${e}. Fallback to en-GB. ${t.message}`
                      );
                    }
                    return t;
                  }
                  if (
                    "Failed to fetch" === n.message ||
                    "Load failed" === n.message
                  )
                    return;
                  return void (
                    (!C || C.status < 400 || C.status >= 600) &&
                    On(n)
                  );
                }
              })(
                {
                  locale: d,
                  key: n,
                  paymentAmount: c,
                  theme: s,
                  inline: this.isInline(),
                  messagePrefix: r,
                  customPaymentMethodIds: o,
                  clientId: p,
                  accountId: this.getAccountId(),
                  environment: t.environment,
                  messagePreference: g,
                },
                h
              );
            if (
              (m ||
                ((this.nodes = []),
                (this.code = ""),
                (this.placementAttributes = {})),
              m)
            ) {
              (this.nodes = m.content?.nodes), (this.code = m.code || "");
              const e = (m.custom_styles || "").replace(
                "{{i:klarna_fonts_link}}",
                ""
              );
              this.nodes &&
                (this.placementAttributes = Xs(this.nodes, {
                  assetsUrl: b,
                  customStyles: e,
                  locale: d,
                  theme: s,
                  key: n,
                  environment: this.config.environment,
                  clientId: p,
                  origin: window.origin || window.location.origin,
                })),
                (this.impressionUrl = m.impression_url),
                this.sendImpressionEvent();
            }
          } catch (e) {
            On(e);
          } finally {
            this.isLoading = !1;
          }
        }
        getAccountId() {
          const e = qa();
          return e ? e["data-account-id"]?.value : void 0;
        }
        getClientId() {
          const e = qa();
          return (
            (e ? e["data-client-id"]?.value : void 0) || this.config.clientId
          );
        }
        getSamplingInstanceId() {
          return Math.floor(1e4 * Math.random()) + 1;
        }
        addKlarnaFont() {
          const e = this.shadowRoot?.host;
          if (e && e.parentNode) {
            const t = document.createElement("link");
            (t.rel = "stylesheet"),
              (t.href =
                "https://x.klarnacdn.net/onsite-messaging/fonts/v1.2/fonts.css"),
              e.parentNode.insertBefore(t, e.nextSibling || null);
          }
        }
        getRenderType() {
          return this.isInline()
            ? "inline"
            : this.code
            ? "shadow-dom"
            : "messaging";
        }
        connectedCallback() {
          super.connectedCallback();
          const e = document.createElement("span");
          var n;
          this.appendChild(e),
            (this.config =
              ((n = this.instance),
              Dn(`__klarna_sdk-${n}-config`).get("config") || t)),
            performance?.mark(`componentInitStart-${this.instanceId}`),
            this.updateContent(),
            this.addKlarnaFont(),
            this.addEventListener("click", (e) => {
              e.stopPropagation();
            });
        }
        disconnectedCallback() {
          super.disconnectedCallback();
        }
        firstUpdated() {
          this.informForDeprecation();
        }
        informForDeprecation() {
          document.querySelector(
            'script[src*="klarnaservices"][src*="/lib.js"],script[src*="pre-purchase"][src*="/lib.js"]'
          ) &&
            B(
              'The Klarna library you are utilizing will be deprecated end of 2024. We strongly recommend updating your integration for continued support and enhanced features. For migration details, please visit: https://docs.klarna.com/on-site-messaging/migrate-to-new-klarna-websdk/"'
            );
        }
        async updated(e) {
          !e.has("tracker") &&
            (e.has("theme") ||
              e.has("paymentAmount") ||
              e.has("purchaseAmount") ||
              e.has("purchase_amount") ||
              e.has("locale") ||
              e.has("messagePrefix") ||
              e.has("messagePreference")) &&
            (await this.updateContent());
        }
        onLearnMoreClick(t) {
          let n = this.placementAttributes?.ctaLink || "";
          n = As(n, this.getClientId());
          const { iframe: i } = _s(t, {
            emit: e.Messaging.emit,
            ctaLink: n,
            iframeId: "learn-more-iframe",
          });
          Os({ emit: e.Messaging.emit }, i);
        }
        onOpenInterstitialFromLegacyRendering(t, n) {
          const i = As(n, this.getClientId()),
            { iframe: a } = _s(t, {
              emit: e.Messaging.emit,
              ctaLink: i,
              iframeId: "learn-more-iframe",
            });
          Os({ emit: e.Messaging.emit }, a);
        }
        getPlacementByKey() {
          const { key: e } = this.dataset;
          if (this.code)
            return (
              this.sendLegacyRenderingEvent(),
              ui.qy`${Hs({
                code: this.code,
                onLearnMoreClick:
                  this.onOpenInterstitialFromLegacyRendering.bind(this),
              })}`
            );
          switch (e) {
            case yt.CHECKOUT:
              return ui.qy` ${(function (e) {
                const {
                    onLearnMoreClick: t,
                    locale: n,
                    mainText: i,
                    ctaLabel: a,
                    ctaLink: s,
                    theme: r,
                    zeroInterestBadgeText: o,
                    buyersProtectionLabel: c,
                    buyersProtectionLink: l,
                  } = e,
                  d = i?.replace(
                    c,
                    '<a class="checkout-buyers-protection-link" target="_blank" href="' +
                      l +
                      '">' +
                      c +
                      "</a>"
                  );
                return ui.qy`
    <style>
      ${ss}
    </style>
    <div
      data-testid="checkout"
      class="${n} checkout-container ${r}"
      part="osm-checkout-container"
      aria-label="Checkout Information"
      role="region"
    >
      ${
        o
          ? ui.qy` <div class="checkout-zero-financing">
            ${ui.qy` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
    <g clip-path="url(#a)">
      <path
        fill="#00B76E"
        d="M30.841 34.406H18.224a3.776 3.776 0 0 1-3.776-3.775V12.027a3.775 3.775 0 0 1 1.233-2.79l6.308-5.75a3.773 3.773 0 0 1 5.086 0l6.308 5.75a3.774 3.774 0 0 1 1.232 2.79V30.63a3.776 3.776 0 0 1-3.774 3.775Z"
      />
      <path
        fill="url(#b)"
        d="m11.412 30.115-8.92-8.92a3.775 3.775 0 0 1 0-5.34L15.646 2.701a3.78 3.78 0 0 1 2.844-1.107l11.963.554.554 11.964a3.774 3.774 0 0 1-1.1 2.844L16.753 30.11a3.773 3.773 0 0 1-5.34.005Z"
      />
      <path fill="#000" d="M24.304 11.476a3.173 3.173 0 1 0 0-6.347 3.173 3.173 0 0 0 0 6.347Z" />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1="17.057"
        x2="14.699"
        y1="6.961"
        y2="32.896"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#38FF9C" />
        <stop offset="1" stop-color="#0DE871" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>`} ${o}
          </div>`
          : ""
      }
      <div class="vertical-space"></div>
      <div class="checkmark-flex-container">
        <div class="checkout-icon ${r}">${ui.qy`<svg aria-hidden="true" role="img" viewBox="0 0 20 20" height="20" width="20">
    <g fill="none" fill-rule="evenodd" transform="translate(4, 4) scale(1)">
      <path
        class="checkout-icon"
        d="M10.215 1 4.292 8.558 1.414 5.68 0 7.094l3.676 3.676a.999.999 0 0 0 .707.293l.06-.002c.286-.018.55-.157.727-.381l6.619-8.446L10.215 1Z"
        fill="#5F6163"
        style="transition: fill 0.2s ease 0s;"
      ></path>
    </g>
  </svg>`}</div>
        <div class="horisontal-space"></div>
        <div>
          <div class="checkout-main-text ${r}" role="heading" aria-level="2">
            ${is(d)}
          </div>
          <div class="vertical-space"></div>
          <div
            class="checkout-text-info"
            @click=${t}
            aria-labelledby="checkout-cta-link"
          >
            <span>
              <a id="checkout-cta-link" class="checkout-cta-link" href="${s}" role="button"
                >${a}</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
              })({
                locale: this.locale,
                onLearnMoreClick: this.onLearnMoreClick.bind(this),
                ...this.placementAttributes,
              })}`;
            case yt.CUSTOM_TYPE_0:
            case yt.CREDIT_PROMOTION_AUTO_SIZE:
            case yt.CREDIT_PROMOTION_STANDARD:
            case yt.CREDIT_PROMOTION_SMALL:
              return ui.qy`${(function ({
                customStyles: e = "",
                theme: t = "default",
                variation: n = "auto-size",
                mainText: i = "",
                ctaLabel: a = "",
                legalText: s,
                onLearnMoreClick: r,
              }) {
                return ui.qy`<style>
      ${us}
    </style>
    ${ui.qy`${is(e)}`}
    <div
      data-testid="${i ? "credit-promotion-auto-size" : ""}"
      class="container ${t} ${n}"
      part="osm-container"
    >
      <p part="osm-message">
        ${ds(((o = i), ls(o) || (o += " Klarna"), o))}
        <button class="link" part="osm-cta" @click=${r}>${a}</button>
      </p>
      ${s ? ui.qy`<p part="osm-legal" class="legal">${s}</p>` : ""}
    </div>`;
                var o;
              })({
                ...this.placementAttributes,
                onLearnMoreClick: this.onLearnMoreClick.bind(this),
              })} `;
            case yt.CREDIT_PROMOTION_BADGE:
              return ui.qy` ${(function ({
                customStyles: e,
                theme: t,
                mainText: n,
                ctaLabel: i,
                legalText: a,
                fixedDiscountAmount: s,
                discountRate: r,
                onLearnMoreClick: o,
              }) {
                return ui.qy`
    <style>
      ${bs}
    </style>
    ${ui.qy`${is(e)}`}
    <div
      data-testid="${n ? "credit-promotion-badge" : ""}"
      class="container ${t}"
      part="osm-container"
    >
      <div class="badge-container">
        <div class="badge" part="osm-badge-container">${is(gs())}</div>
        ${(function () {
          const e = s || r;
          return e
            ? is(
                `\n      <div class="addons-badge-container">\n        \n    <div id="osm-badge-text" class="badge-text-wrapper">\n      <p class="text" part="osm-badge-text">${e}</p>\n    </div>\n        \n    <div id="osm-deals-badge" class="badge" part="osm-deals-badge-container">\n      <svg part="osm-deal-badge" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="osm-klarna-deal-title" width="20px" height="20px" viewBox="0 0 36 36" fill="none"><title id="osm-klarna-deal-title">Klarna deal badge</title><g clip-path="url(#clip0_602_5481)"><path d="M29.4547 34.4063H16.8381C15.8367 34.4063 14.8763 34.0085 14.1682 33.3004C13.4601 32.5923 13.0623 31.6319 13.0623 30.6305V12.0268C13.0622 11.5016 13.1717 10.9821 13.3839 10.5017C13.5961 10.0213 13.9063 9.59043 14.2946 9.23676L20.6029 3.48645C21.298 2.85237 22.2049 2.50085 23.1457 2.50085C24.0866 2.50085 24.9935 2.85237 25.6886 3.48645L31.9969 9.23676C32.3851 9.59043 32.6953 10.0213 32.9075 10.5017C33.1197 10.9821 33.2293 11.5016 33.2292 12.0268V30.6305C33.2292 31.6316 32.8316 32.5918 32.1238 33.2999C31.4159 34.008 30.4559 34.4059 29.4547 34.4063Z" fill="#ED6990"/><path d="M10.0258 30.1154L1.10611 21.1943C0.755437 20.8438 0.477263 20.4276 0.287474 19.9696C0.0976847 19.5115 0 19.0206 0 18.5248C0 18.0289 0.0976847 17.538 0.287474 17.0799C0.477263 16.6219 0.755437 16.2057 1.10611 15.8552L14.26 2.70137C14.6309 2.32911 15.0754 2.03833 15.5651 1.8476C16.0548 1.65687 16.5789 1.57039 17.104 1.59368L29.067 2.14752L29.6209 14.112C29.6453 14.6365 29.56 15.1604 29.3705 15.6501C29.181 16.1398 28.8913 16.5846 28.5201 16.956L15.3663 30.1098C15.0162 30.4612 14.6002 30.7402 14.1423 30.9307C13.6843 31.1211 13.1932 31.2195 12.6972 31.22C12.2011 31.2205 11.7099 31.1232 11.2515 30.9337C10.7931 30.7441 10.3766 30.466 10.0258 30.1154Z" fill="url(#paint0_linear_602_5481)"/><path d="M22.9182 11.4757C24.6709 11.4757 26.0917 10.0549 26.0917 8.3022C26.0917 6.5495 24.6709 5.12866 22.9182 5.12866C21.1655 5.12866 19.7446 6.5495 19.7446 8.3022C19.7446 10.0549 21.1655 11.4757 22.9182 11.4757Z" fill="black"/></g><defs><linearGradient id="paint0_linear_602_5481" x1="15.6709" y1="6.96045" x2="13.3129" y2="32.8957" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB4C8"/><stop offset="1" stop-color="#FF99B4"/></linearGradient><clipPath id="clip0_602_5481"><rect width="36" height="36" fill="white"/></clipPath></defs></svg>\n    </div>\n      </div>\n    `
              )
            : "";
        })()}
      </div>
      <div class="text-wrapper">
        <p part="osm-message" class="text">
          ${n}
          <button @click=${o} class="link" part="osm-cta">${i}</button>
        </p>
        ${a ? ui.qy`<p part="osm-legal" class="legal">${a}</p>` : ""}
      </div>
    </div>
  `;
              })({
                ...this.placementAttributes,
                onLearnMoreClick: this.onLearnMoreClick.bind(this),
              })}`;
            case yt.FOOTER_PROMOTION_AUTO_SIZE:
              return ui.qy`${xs()}`;
            case yt.SIDEBAR_PROMOTION_AUTO_SIZE:
              return ui.qy`${ui.qy`
    <style>
      ${Ms}
    </style>
    <div style="all: initial;">
      <div id="badge">${Js}</div>
    </div>
  `}`;
            case yt.TOP_STRIP_PROMOTION_BADGE:
              return ui.qy`
            ${(function ({
              customStyles: e,
              theme: t,
              mainText: n,
              ctaLabel: i,
              legalText: a,
              onLearnMoreClick: s,
              fixedDiscountAmount: r,
              discountRate: o,
            }) {
              return ui.qy`
    <style>
      ${Ps}
    </style>
    ${ui.qy`${is(e)}`}
    <div
      data-testid="${n ? "top-strip-promotion-badge" : ""}"
      class="container ${t}"
      part="osm-container"
    >
      <div class="badge-container">
        <div class="badge" part="osm-badge-container">${is(gs())}</div>
        ${(function ({ fixedDiscountAmount: e, discountRate: t }) {
          const n = e || t;
          return n
            ? is(
                `\n    <div class="addons-badge-container">\n      \n  <div id="osm-badge-text" class="badge-text-wrapper">\n    <p class="text" part="osm-badge-text">${n}</p>\n  </div>\n      \n  <div id="osm-deals-badge" class="badge" part="osm-deals-badge-container">\n    <svg part="osm-deal-badge" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="osm-klarna-deal-title" width="20px" height="20px" viewBox="0 0 36 36" fill="none"><title id="osm-klarna-deal-title">Klarna deal badge</title><g clip-path="url(#clip0_602_5481)"><path d="M29.4547 34.4063H16.8381C15.8367 34.4063 14.8763 34.0085 14.1682 33.3004C13.4601 32.5923 13.0623 31.6319 13.0623 30.6305V12.0268C13.0622 11.5016 13.1717 10.9821 13.3839 10.5017C13.5961 10.0213 13.9063 9.59043 14.2946 9.23676L20.6029 3.48645C21.298 2.85237 22.2049 2.50085 23.1457 2.50085C24.0866 2.50085 24.9935 2.85237 25.6886 3.48645L31.9969 9.23676C32.3851 9.59043 32.6953 10.0213 32.9075 10.5017C33.1197 10.9821 33.2293 11.5016 33.2292 12.0268V30.6305C33.2292 31.6316 32.8316 32.5918 32.1238 33.2999C31.4159 34.008 30.4559 34.4059 29.4547 34.4063Z" fill="#ED6990"/><path d="M10.0258 30.1154L1.10611 21.1943C0.755437 20.8438 0.477263 20.4276 0.287474 19.9696C0.0976847 19.5115 0 19.0206 0 18.5248C0 18.0289 0.0976847 17.538 0.287474 17.0799C0.477263 16.6219 0.755437 16.2057 1.10611 15.8552L14.26 2.70137C14.6309 2.32911 15.0754 2.03833 15.5651 1.8476C16.0548 1.65687 16.5789 1.57039 17.104 1.59368L29.067 2.14752L29.6209 14.112C29.6453 14.6365 29.56 15.1604 29.3705 15.6501C29.181 16.1398 28.8913 16.5846 28.5201 16.956L15.3663 30.1098C15.0162 30.4612 14.6002 30.7402 14.1423 30.9307C13.6843 31.1211 13.1932 31.2195 12.6972 31.22C12.2011 31.2205 11.7099 31.1232 11.2515 30.9337C10.7931 30.7441 10.3766 30.466 10.0258 30.1154Z" fill="url(#paint0_linear_602_5481)"/><path d="M22.9182 11.4757C24.6709 11.4757 26.0917 10.0549 26.0917 8.3022C26.0917 6.5495 24.6709 5.12866 22.9182 5.12866C21.1655 5.12866 19.7446 6.5495 19.7446 8.3022C19.7446 10.0549 21.1655 11.4757 22.9182 11.4757Z" fill="black"/></g><defs><linearGradient id="paint0_linear_602_5481" x1="15.6709" y1="6.96045" x2="13.3129" y2="32.8957" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB4C8"/><stop offset="1" stop-color="#FF99B4"/></linearGradient><clipPath id="clip0_602_5481"><rect width="36" height="36" fill="white"/></clipPath></defs></svg>\n  </div>\n    </div>\n  `
              )
            : "";
        })({ fixedDiscountAmount: r, discountRate: o })}
      </div>
      <div class="text-wrapper">
        <p part="osm-message" class="text">
          ${n}
          <button @click=${s} class="link" part="osm-cta">${i}</button>
        </p>
        ${a ? ui.qy`<p part="osm-legal" class="legal">${a}</p>` : ""}
      </div>
    </div>
  `;
            })({
              ...this.placementAttributes,
              onLearnMoreClick: this.onLearnMoreClick.bind(this),
            })}
          `;
            case yt.TOP_STRIP_PROMOTION_STANDARD:
            case yt.TOP_STRIP_PROMOTION_AUTO_SIZE:
              return ui.qy`<klarna-placement-top-strip-promotion-auto-size
              dataAttributes=${JSON.stringify(this.placementAttributes)}
              .onLearnMoreClick=${this.onLearnMoreClick.bind(this)}
            />

            ${(function ({
              customStyles: e,
              theme: t,
              variation: n = "auto-size",
              mainText: i,
              ctaLabel: a,
              legalText: s,
              onLearnMoreClick: r,
            }) {
              return ui.qy`
    <style>
      ${zs}
    </style>
    ${ui.qy`${is(e)}`}
    <div
      data-testid="${a ? "top-strip-promotion-auto-size" : ""}"
      class="container ${t} ${n}"
      part="osm-container"
    >
      <p part="osm-message">
        ${ds(((o = i), ls(o) || (o += " Klarna"), o))}
        <button class="link" part="osm-cta" @click=${r}>${a}</button>
      </p>
      ${s ? ui.qy`<p part="osm-legal" class="legal">${s}</p>` : ""}
    </div>
  `;
              var o;
            })({
              ...this.placementAttributes,
              onLearnMoreClick: this.onLearnMoreClick.bind(this),
            })} `;
            case yt.HOMEPAGE_PROMOTION_WIDE:
              return ui.qy`
            ${(function ({
              textTitle: e = "",
              textSubtitle: t = "",
              locale: n = "",
              theme: i = "",
              onLearnMoreClick: a,
            }) {
              const s = Zs(n);
              return ui.qy`
    <style>
      ${Ys}
    </style>
    <div
      data-testid="${e ? "home-page-promotion-wide" : ""}"
      class="container ${i}"
      @click=${a}
    >
      <div class="content-container">
        <div class="content">
          <div class="heading-${s.toLowerCase()} heading item">
            <div>${ui.qy`${is(e)}`}</div>
          </div>
          <div class="sub-text-${s.toLowerCase()} sub-text item">
            <div>${ui.qy`${is(t)}`}</div>
          </div>
        </div>
        <div class="logo-container item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="badge-pink ${i}"
            viewBox="0 0 118.64 59.32"
          >
            <rect width="118.64" height="59.32" fill="#ffb3c7" rx="8.9" ry="8.9" />
            <path
              d="M94.12 25.75v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.65-3.46 3.56 3.56 0 0 1-3.65 3.46Zm-58.73-16.2h-4.37a11.2 11.2 0 0 1-4.52 9l-1.73 1.32 6.71 9.15h5.52l-6.18-8.42a15.46 15.46 0 0 0 4.57-11.05Zm-15.63 0h4.48v19.47h-4.48zm18.54.01h4.22v19.46h-4.22zm41.23 5.63a4.88 4.88 0 0 0-4.15 1.88v-1.51h-4v13.46h4.06v-7.08a2.85 2.85 0 0 1 3-3.05c1.77 0 2.79 1.06 2.79 3v7.11h4v-8.54c.04-3.14-2.46-5.27-5.7-5.27Zm-24.26.37v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.66-3.46 3.56 3.56 0 0 1-3.66 3.46Zm13.93-8.44v-1.75h-4.12v13.46h4.13v-6.29c0-2.12 2.3-3.26 3.9-3.26v-3.91a5 5 0 0 0-3.91 1.75Zm40.57 6.93A2.53 2.53 0 1 0 105 37a2.53 2.53 0 0 0-2.57-2.57Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="badge-black ${i}"
            viewBox="0 0 118.64 59.32"
          >
            <rect width="118.64" height="59.32" rx="8.9" ry="8.9" />
            <path
              fill="#fff"
              d="M94.12 25.75v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.65-3.46 3.56 3.56 0 0 1-3.65 3.46Zm-58.73-16.2h-4.37a11.2 11.2 0 0 1-4.52 9l-1.73 1.32 6.71 9.15h5.52l-6.18-8.42a15.46 15.46 0 0 0 4.57-11.05Zm-15.63 0h4.48v19.47h-4.48zm18.54.01h4.22v19.46h-4.22zm41.23 5.63a4.88 4.88 0 0 0-4.15 1.88v-1.51h-4v13.46h4.06v-7.08a2.85 2.85 0 0 1 3-3.05c1.77 0 2.79 1.06 2.79 3v7.11h4v-8.54c.04-3.14-2.46-5.27-5.7-5.27Zm-24.26.37v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.66-3.46 3.56 3.56 0 0 1-3.66 3.46Zm13.93-8.44v-1.75h-4.12v13.46h4.13v-6.29c0-2.12 2.3-3.26 3.9-3.26v-3.91a5 5 0 0 0-3.91 1.75Zm40.57 6.93A2.53 2.53 0 1 0 105 37a2.53 2.53 0 0 0-2.57-2.57Z"
            />
          </svg>
        </div>
      </div>
    </div>
  `;
            })({
              ...this.placementAttributes,
              onLearnMoreClick: this.onLearnMoreClick.bind(this),
            })}
          `;
            case yt.HOMEPAGE_PROMOTION_TALL:
              return ui.qy`
            ${(function ({
              textTitle: e = "",
              textSubtitle: t = "",
              locale: n = "",
              theme: i = "",
              onLearnMoreClick: a,
            }) {
              const s = Zs(n);
              return ui.qy`
    <style>
      ${Ds}
    </style>
    <div
      data-testid="${e ? "home-page-promotion-tall" : ""}"
      class="container ${i}"
      @click=${a}
    >
      <div class="content-container">
        <div class="content">
          <div class="heading-${s.toLowerCase()} heading item">
            <div>${ui.qy`${is(e)}`}</div>
          </div>
          <div class="sub-text-${s.toLowerCase()} sub-text item">
            <div>${ui.qy`${is(t)}`}</div>
          </div>
        </div>
        <div class="logo-container item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="badge-pink ${i}"
            viewBox="0 0 118.64 59.32"
          >
            <rect width="118.64" height="59.32" fill="#ffb3c7" rx="8.9" ry="8.9" />
            <path
              d="M94.12 25.75v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.65-3.46 3.56 3.56 0 0 1-3.65 3.46Zm-58.73-16.2h-4.37a11.2 11.2 0 0 1-4.52 9l-1.73 1.32 6.71 9.15h5.52l-6.18-8.42a15.46 15.46 0 0 0 4.57-11.05Zm-15.63 0h4.48v19.47h-4.48zm18.54.01h4.22v19.46h-4.22zm41.23 5.63a4.88 4.88 0 0 0-4.15 1.88v-1.51h-4v13.46h4.06v-7.08a2.85 2.85 0 0 1 3-3.05c1.77 0 2.79 1.06 2.79 3v7.11h4v-8.54c.04-3.14-2.46-5.27-5.7-5.27Zm-24.26.37v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.66-3.46 3.56 3.56 0 0 1-3.66 3.46Zm13.93-8.44v-1.75h-4.12v13.46h4.13v-6.29c0-2.12 2.3-3.26 3.9-3.26v-3.91a5 5 0 0 0-3.91 1.75Zm40.57 6.93A2.53 2.53 0 1 0 105 37a2.53 2.53 0 0 0-2.57-2.57Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="badge-black ${i}"
            viewBox="0 0 118.64 59.32"
          >
            <rect width="118.64" height="59.32" rx="8.9" ry="8.9" />
            <path
              fill="#fff"
              d="M94.12 25.75v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.65-3.46 3.56 3.56 0 0 1-3.65 3.46Zm-58.73-16.2h-4.37a11.2 11.2 0 0 1-4.52 9l-1.73 1.32 6.71 9.15h5.52l-6.18-8.42a15.46 15.46 0 0 0 4.57-11.05Zm-15.63 0h4.48v19.47h-4.48zm18.54.01h4.22v19.46h-4.22zm41.23 5.63a4.88 4.88 0 0 0-4.15 1.88v-1.51h-4v13.46h4.06v-7.08a2.85 2.85 0 0 1 3-3.05c1.77 0 2.79 1.06 2.79 3v7.11h4v-8.54c.04-3.14-2.46-5.27-5.7-5.27Zm-24.26.37v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.66-3.46 3.56 3.56 0 0 1-3.66 3.46Zm13.93-8.44v-1.75h-4.12v13.46h4.13v-6.29c0-2.12 2.3-3.26 3.9-3.26v-3.91a5 5 0 0 0-3.91 1.75Zm40.57 6.93A2.53 2.53 0 1 0 105 37a2.53 2.53 0 0 0-2.57-2.57Z"
            />
          </svg>
        </div>
      </div>
    </div>
  `;
            })({
              ...this.placementAttributes,
              onLearnMoreClick: this.onLearnMoreClick.bind(this),
            })}
          `;
            case yt.HOMEPAGE_PROMOTION_BOX:
              return ui.qy`
            ${(function ({
              textTitle: e = "",
              textSubtitle: t = "",
              locale: n = "",
              theme: i = "",
              onLearnMoreClick: a,
            }) {
              const s = Zs(n);
              return ui.qy`
    <style>
      ${Ss}
    </style>
    <div
      data-testid="${e ? "home-page-promotion-box" : ""}"
      class="container ${i}"
      @click=${a}
    >
      <div class="content-container">
        <div class="content">
          <div class="heading-${s.toLowerCase()} heading item">
            <div>${ui.qy`${is(e)}`}</div>
          </div>
          <div class="sub-text-${s.toLowerCase()} sub-text item">
            <div>${ui.qy`${is(t)}`}</div>
          </div>
        </div>
        <div class="logo-container item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="badge-pink ${i}"
            viewBox="0 0 118.64 59.32"
          >
            <rect width="118.64" height="59.32" fill="#ffb3c7" rx="8.9" ry="8.9" />
            <path
              d="M94.12 25.75v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.65-3.46 3.56 3.56 0 0 1-3.65 3.46Zm-58.73-16.2h-4.37a11.2 11.2 0 0 1-4.52 9l-1.73 1.32 6.71 9.15h5.52l-6.18-8.42a15.46 15.46 0 0 0 4.57-11.05Zm-15.63 0h4.48v19.47h-4.48zm18.54.01h4.22v19.46h-4.22zm41.23 5.63a4.88 4.88 0 0 0-4.15 1.88v-1.51h-4v13.46h4.06v-7.08a2.85 2.85 0 0 1 3-3.05c1.77 0 2.79 1.06 2.79 3v7.11h4v-8.54c.04-3.14-2.46-5.27-5.7-5.27Zm-24.26.37v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.66-3.46 3.56 3.56 0 0 1-3.66 3.46Zm13.93-8.44v-1.75h-4.12v13.46h4.13v-6.29c0-2.12 2.3-3.26 3.9-3.26v-3.91a5 5 0 0 0-3.91 1.75Zm40.57 6.93A2.53 2.53 0 1 0 105 37a2.53 2.53 0 0 0-2.57-2.57Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="badge-black ${i}"
            viewBox="0 0 118.64 59.32"
          >
            <rect width="118.64" height="59.32" rx="8.9" ry="8.9" />
            <path
              fill="#fff"
              d="M94.12 25.75v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.65-3.46 3.56 3.56 0 0 1-3.65 3.46Zm-58.73-16.2h-4.37a11.2 11.2 0 0 1-4.52 9l-1.73 1.32 6.71 9.15h5.52l-6.18-8.42a15.46 15.46 0 0 0 4.57-11.05Zm-15.63 0h4.48v19.47h-4.48zm18.54.01h4.22v19.46h-4.22zm41.23 5.63a4.88 4.88 0 0 0-4.15 1.88v-1.51h-4v13.46h4.06v-7.08a2.85 2.85 0 0 1 3-3.05c1.77 0 2.79 1.06 2.79 3v7.11h4v-8.54c.04-3.14-2.46-5.27-5.7-5.27Zm-24.26.37v.86a7.1 7.1 0 1 0 0 11.74v.86h4V25.75Zm-3.67 10.19a3.47 3.47 0 1 1 3.66-3.46 3.56 3.56 0 0 1-3.66 3.46Zm13.93-8.44v-1.75h-4.12v13.46h4.13v-6.29c0-2.12 2.3-3.26 3.9-3.26v-3.91a5 5 0 0 0-3.91 1.75Zm40.57 6.93A2.53 2.53 0 1 0 105 37a2.53 2.53 0 0 0-2.57-2.57Z"
            />
          </svg>
        </div>
      </div>
    </div>
  `;
            })({
              ...this.placementAttributes,
              onLearnMoreClick: this.onLearnMoreClick.bind(this),
            })}
          `;
            case yt.INFO_PAGE:
              return ui.qy` ${Vs({ ...this.placementAttributes })}`;
            case yt.CUSTOM_TYPE_3_INLINE:
            case yt.CUSTOM_TYPE_3_335_AUTO:
            case yt.CREDIT_PROMOTION_INLINE:
            case yt.CUSTOM_TYPE_1:
              return ui.qy`${Hs({
                code: this.code,
                onLearnMoreClick:
                  this.onOpenInterstitialFromLegacyRendering.bind(this),
              })}`;
            default:
              return ui.qy`<div></div>`;
          }
        }
        attachTestDriveBadge() {
          return Ka(this.config.environment, this.config.clientId)
            ? ui.qy`<test-drive-badge></test-drive-badge>`
            : null;
        }
        sendImpressionEvent() {
          let e, t, i;
          try {
            const n = new URL(this.impressionUrl).searchParams;
            (e = n.get("pt")), (t = n.get("j")), (i = n.get("pm"));
          } catch (e) {}
          const a = Zs(this.locale),
            s = ((r = this.locale), r?.split("-")[1] || "");
          var r;
          (n(50) || "checkout" === this.key) &&
            this.tracker.event(
              "b",
              {},
              {
                iv: "web-sdk",
                d: this.key,
                h: `${a}`.toUpperCase(),
                i: `${s}`.toUpperCase(),
                n: window.location.host,
                ae: window.location.pathname,
                g: Pa(this.getClientId()) ? this.getClientId() : void 0,
                mpf: this.messagePrefix,
                rt: this.getRenderType(),
                ab: "osm-frontends",
                pt: e,
                j: t,
                pm: Number(i),
              }
            ),
            n(10) &&
              this.tracker.event(
                "aggr_b",
                {},
                {
                  iv: "web-sdk",
                  d: this.key,
                  h: `${a}`.toUpperCase(),
                  i: `${s}`.toUpperCase(),
                  ab: "osm-frontends",
                }
              );
        }
        sendRenderPerformanceEvent() {
          if (n(5) && performance?.mark)
            try {
              performance.mark(`componentInitEnd-${this.instanceId}`),
                performance.measure(
                  `componentInitializationToRender-${this.instanceId}`,
                  `componentInitStart-${this.instanceId}`,
                  `componentInitEnd-${this.instanceId}`
                );
              const e = performance.getEntriesByName(
                `componentInitializationToRender-${this.instanceId}`
              )[0];
              this.tracker.event(
                "osm_rendering_time",
                {},
                { ms: e.duration, placement_key: this.key }
              );
            } catch (e) {}
        }
        sendLegacyRenderingEvent() {
          if (n(1))
            try {
              this.tracker.event(
                "osm_legacy_rendering",
                {},
                { client_id: this.getClientId(), placement_key: this.key }
              );
            } catch (e) {}
        }
        render() {
          const { key: t } = this.dataset,
            n = Boolean(this.nodes?.length || this.code),
            i = this.isLoading ? "loading" : "loaded";
          return (
            n && this.sendRenderPerformanceEvent(),
            this.isLoading ||
              (e.Messaging.emit(ja.PLACEMENT_RENDERED, {
                content: n,
                element: this.renderRoot,
              }),
              e.Messaging.emit(ja.PLACEMENT_RENDERED_LEGACY, {
                content: n,
                element: this.renderRoot,
              })),
            this.isLoading || n || "static" === vt[t]
              ? ui.qy`
        <style>
          ${js}
        </style>
        <div
          class="${i} ${this.theme} ${this.key}"
          style="height: auto; width: 100%; display: inline-block;"
        >
          ${ui.qy`${this.getPlacementByKey()}${this.attachTestDriveBadge()}`}
        </div>
      `
              : ui.qy`<!-- No content found for the given configuration -->`
          );
        }
        static {
          s();
        }
      }
      return T;
    }
  }
  class ir {
    constructor(e, t) {
      const n = document.createElement(e),
        i = document.createElement("span");
      if ((n.appendChild(i), t)) {
        const { id: e, ...i } = t;
        Object.assign(n.dataset, i),
          e && ((this.id = e), (n.id = e), n.removeAttribute("data-id"));
      }
      this.htmlElement = n;
    }
    mount(e) {
      return (
        (this.containerElement =
          "string" == typeof e ? document.querySelector(e) : e),
        this.containerElement instanceof HTMLElement
          ? (this.containerElement.appendChild(this.htmlElement),
            this.getPublicAPI())
          : (v("Missing valid `container`"), this)
      );
    }
    unmount() {
      return this.containerElement && this.containerElement.hasChildNodes()
        ? (this.containerElement.removeChild(this.htmlElement),
          this.getPublicAPI())
        : (B("Element not mounted"), this.getPublicAPI());
    }
    getPublicAPI() {
      return {
        mount: this.mount.bind(this),
        unmount: this.unmount.bind(this),
        htmlElement: this.htmlElement,
        id: this.id,
      };
    }
  }
  function ar() {
    const e = new CustomEvent("OSM:refresh");
    return document.dispatchEvent(e), null;
  }
  const sr = function () {
      const e = za.getInstance(),
        t = e.on.bind(e),
        n = e.off.bind(e),
        i = e.emit.bind(e);
      return (
        (function (e, t) {
          ((e, t = {}) => {
            window.Klarna &&
              (Object.prototype.hasOwnProperty.call(window.Klarna, e)
                ? (window.Klarna[e] = { ...window.Klarna[e], ...t })
                : (window.Klarna[e] = t));
          })("OnsiteMessaging", {
            refresh: ar,
            eventListeners: {},
            on: e,
            off: t,
          });
        })(t, n),
        {
          placement: (e) => new ir(mt.PLACEMENT, e).getPublicAPI(),
          on: t,
          off: n,
          emit: i,
        }
      );
    },
    rr = {
      pendingConfirmation: {
        data: tt({ payment_confirmation_token: je() }),
        response: Pe(),
      },
      closeInteractionMode: { response: Pe() },
    };
  class or {
    constructor() {
      this.messengerTarget = new ct({
        validateOrigin: !0,
        removeListenerAfterHandshake: !1,
      });
    }
    async pendingConfirmation(e) {
      const { data: t } = e;
      return rr.pendingConfirmation.data.parse(t), !0;
    }
    async closeInteractionMode() {
      (0, Ra.closeInteractionMode)();
    }
    registerAllHandlers() {
      const e = {
        pendingConfirmation: this.pendingConfirmation.bind(this),
        closeInteractionMode: this.closeInteractionMode.bind(this),
      };
      for (const [t, n] of Object.entries(e))
        this.messengerTarget.registerHandler(t, n);
    }
  }
  let cr = (function (e) {
    return (e.DISABLED = "disabled"), (e.LOADING = "loading"), e;
  })({});
  const lr = (e) =>
      Array.isArray(e)
        ? e.map((e) => lr(e))
        : null != e && e.constructor === Object
        ? Object.keys(e).reduce(
            (t, n) => (
              (t[n.replace(/(_\w)/g, (e) => e[1].toUpperCase())] = lr(e[n])), t
            ),
            {}
          )
        : e,
    dr = (e) =>
      Array.isArray(e)
        ? e.map((e) => dr(e))
        : null != e && e.constructor === Object
        ? Object.keys(e).reduce(
            (t, n) => (
              (t[n.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`)] = dr(e[n])),
              t
            ),
            {}
          )
        : e;
  let ur;
  const gr = () => {
    const e = Xn.get("emit"),
      t = Xn.get("paymentRequestState");
    (ur && t === ur) || ((ur = t), e("update", Wr()));
  };
  async function br() {
    const e = Xn.get("paymentRequestId");
    Ut().event(ut.CANCEL_CALLED, { paymentRequestId: e });
    const t = Xn.get("paymentRequestResult"),
      n = t?.paymentConfirmationToken;
    if (!n)
      return Ln(dt.RESOURCE_ERROR, "Payment confirmation token not available");
    try {
      const e = await (async function (e) {
        const t = Xn.get("paymentRequest"),
          n = Xn.get("paymentRequestId"),
          i = await Un.call({
            method: "paymentApiCancelConfirmation",
            data: {
              paymentConfirmationToken: e,
              region: Wt({
                paymentRequestId: n,
                currency: t?.currency,
                locale: Xt(),
              }),
            },
          }),
          a = lr(i);
        return (
          Xn.set("paymentRequest", a.paymentRequest),
          Xn.set("paymentRequestState", a.state),
          Xn.set("paymentRequestStateContext", a.stateContext),
          Xn.delete("paymentRequestResult"),
          a
        );
      })(n);
      return (
        gr(),
        Ut().event(ut.CANCEL_COMPLETED, {
          paymentRequestId: e.paymentRequestId,
        }),
        Wr()
      );
    } catch (e) {
      Ln(dt.TECHNICAL_ERROR, "Cancel failed", e);
    }
  }
  const hr = ["EUR"],
    pr = { EUR: ["DE"] },
    mr = async (e) => {
      if ((Ut().event(ut.CAN_MAKE_PAYMENT_CALLED, { ...e }), !e))
        return Ln(dt.INPUT_ERROR, "Invalid parameters");
      try {
        wn.parse(e);
      } catch (e) {
        return Ln(dt.INPUT_ERROR, "Invalid options", e);
      }
      const t = e.currency,
        n = e.country;
      return (t && !hr.includes(t)) || (t && n && !pr[t]?.includes(n))
        ? (Ut().event(ut.CAN_MAKE_PAYMENT_COMPLETED, { result: "false" }), !1)
        : (Ut().event(ut.CAN_MAKE_PAYMENT_COMPLETED, { result: "true" }), !0);
    };
  async function Ir() {
    const e = Xn.get("paymentRequestId"),
      t = Xn.get("paymentRequest"),
      n = await Un.call({
        method: "paymentApiGetAuthorizationRequest",
        data: {
          id: e,
          region: Wt({
            paymentRequestId: e,
            currency: t?.currency,
            locale: Xt(),
          }),
        },
      }),
      i = lr(n);
    return (
      Xn.set("paymentRequest", i.paymentRequest),
      Xn.set("paymentRequestState", i.state),
      Xn.set("paymentRequestStateContext", i.stateContext),
      Xn.set("paymentRequestResult", {
        paymentConfirmationToken: i.stateContext?.paymentConfirmationToken,
      }),
      i
    );
  }
  async function fr() {
    const e = Xn.get("paymentRequestId");
    if ((Ut().event(ut.FETCH_CALLED, { paymentRequestId: e }), !e))
      return Ln(dt.RESOURCE_ERROR, "No payment request available");
    try {
      const e = await Ir();
      return (
        Ut().event(ut.FETCH_COMPLETED, {
          paymentRequestId: e.paymentRequestId,
        }),
        Wr()
      );
    } catch (e) {
      Ln(dt.TECHNICAL_ERROR, "Fetch failed", e);
    }
  }
  async function Cr(e, t) {
    const n = Xn.get("paymentRequestId");
    if (
      (Ut().event(ut.MAKE_PAYMENT_REQUEST_CALLED, {
        effectiveUxMode: t,
        paymentRequestId: n,
      }),
      t === lt.REDIRECT && !e?.config?.redirectUrl)
    )
      throw new Wn(
        dt.INPUT_ERROR,
        "PaymentRequest.config.redirectUrl is required"
      );
    const i = { ...dr(e), internal: { effective_ux_mode: t } },
      a = e?.currency || Xn.get("paymentRequest").currency,
      s = await Un.call({
        method: "paymentApiSendAuthorizationRequest",
        data: {
          body: i,
          region: Wt({ paymentRequestId: n, currency: a, locale: Xt() }),
        },
      }),
      r = lr(s);
    return (
      Xn.set("paymentRequest", r.paymentRequest),
      Xn.set("paymentRequestState", r.state),
      Xn.set("paymentRequestId", r.paymentRequestId),
      Xn.set("paymentRequestStateContext", r.stateContext),
      Ut().event(ut.MAKE_PAYMENT_REQUEST_COMPLETED, {
        paymentRequestId: r.paymentRequestId,
      }),
      r
    );
  }
  const yr = (e) => new Promise((t) => setTimeout(t, e)),
    xr = 5;
  async function Gr(e, t = 0) {
    if (t > xr) return;
    await yr(1e3);
    const n = await Ir();
    if ("IN_PROGRESS" === n.previousState && "SUBMITTED" === n.state)
      return e && e(), void gr();
    if ("PENDING_CONFIRMATION" === n.state || "AUTHORIZED" === n.state) {
      if (
        (e && e(),
        window.klarnaIntegratorApi?.handleInteraction ||
          !n.paymentRequest.config.redirectUrl)
      )
        return void gr();
      if (Vr.updateCallback)
        try {
          const e = await Vr.updateCallback?.(Wr());
          if ("boolean" == typeof e && !1 === e) return;
        } catch (e) {
          Ln(dt.TECHNICAL_ERROR, "Update callback failed", e);
        }
      else gr();
      const t = n.paymentRequest.config.redirectUrl
        .replace("{klarna.payment_request.id}", n.paymentRequestId)
        .replace(
          "{klarna.payment_request.payment_confirmation_token}",
          n.stateContext.paymentConfirmationToken
        );
      return window.location.assign(t);
    }
    gr(), Gr(e, t + 1);
  }
  const Ar = {
    overlayContent: {
      text: li(ii.OverlayContentText),
      buttonLabel: li(ii.OverlayContentButtonLabel),
    },
  };
  function vr({ onCloseIframe: e }) {
    return new Promise((t, n) => {
      try {
        const { updateUrl: e } = (0, Ra.triggerOnPage)("about:blank", Ar),
          n = lt.WINDOW;
        t({ updateUrl: e, effectiveMode: n });
      } catch (i) {
        i instanceof Ra.WindowBlockedError
          ? new Ra.Popup().openOverlay(() => {
              try {
                const { updateUrl: e } = (0, Ra.triggerOnPage)(
                  "about:blank",
                  Ar
                );
                t({ updateUrl: e, effectiveMode: lt.WINDOW });
              } catch (i) {
                if (i instanceof Ra.WindowBlockedError) {
                  const { updateUrl: n } = (0, Ra.triggerIframe)(
                    "about:blank",
                    { ...Ar, onClose: e }
                  );
                  t({ updateUrl: n, effectiveMode: lt.IFRAME });
                } else n(i);
              }
            }, Ar)
          : n(i);
      }
    });
  }
  const Br = ["SUBMITTED"],
    Zr = ["IN_PROGRESS", "PENDING_CONFIRMATION", "AUTHORIZED"];
  function Qr() {
    const e = setInterval(
      () =>
        (async function (e) {
          const t = Xn.get("paymentRequestState");
          if (!Br.includes(t)) return;
          const n = await Ir();
          n.state !== t &&
            Zr.includes(n.state) &&
            (clearInterval(e), "IN_PROGRESS" === n.state && gr());
        })(e),
      2e3
    );
    setTimeout(() => clearInterval(e), 1e4);
  }
  async function wr(e, t, n) {
    Ut().event(ut.UPDATE_PAYMENT_REQUEST_CALLED, {
      paymentRequestId: e,
      effectiveUxMode: n,
    });
    const i = {};
    t?.config?.redirectUrl &&
      (i.config = { redirect_url: t?.config?.redirectUrl }),
      n && (i.internal = { effective_ux_mode: n }),
      t?.currency && (i.currency = t.currency),
      t?.paymentAmount && (i.payment_amount = t.paymentAmount),
      t?.buyer && (i.buyer = dr(t.buyer)),
      t?.merchantReference && (i.merchant_reference = t.merchantReference),
      t?.lineItems && (i.line_items = dr(t.lineItems)),
      t?.shipping && (i.shipping = dr(t.shipping));
    const a = t?.currency || Xn.get("paymentRequest").currency,
      s = await Un.call({
        method: "paymentApiPatchAuthorizationRequest",
        data: {
          id: e,
          body: i,
          region: Wt({ paymentRequestId: e, currency: a, locale: Xt() }),
        },
      }),
      r = lr(s);
    return (
      Xn.set("paymentRequest", r.paymentRequest),
      Xn.set("paymentRequestState", r.state),
      Xn.set("paymentRequestId", r.paymentRequestId),
      Xn.set("paymentRequestStateContext", r.stateContext),
      Ut().event(ut.UPDATE_PAYMENT_REQUEST_COMPLETED, {
        paymentRequestId: r.paymentRequestId,
      }),
      r
    );
  }
  async function kr(e, t) {
    const n = Xn.get("paymentRequestId");
    Ut().event(ut.INITIATE_CALLED, { ...t, paymentRequestId: n });
    try {
      e && En(e), t && Nn(t);
    } catch (e) {
      return Ln(dt.TECHNICAL_ERROR, "Initiate failed", e);
    }
    const i = Xn.get("paymentRequest"),
      a = Xn.get("paymentRequestOptions"),
      s = Xn.get("config"),
      r = `${xt[s.environment || "playground"]}/web-sdk/v1/flow-end/index.html`,
      o = Ns(window);
    try {
      (n ? pn : hn).parse(i);
    } catch (e) {
      return Ln(dt.INPUT_ERROR, "Invalid PaymentRequest", e);
    }
    try {
      mn.parse(a);
    } catch (e) {
      return Ln(dt.INPUT_ERROR, "Invalid PaymentRequestOptions", e);
    }
    if (o?.handleInteraction) {
      const e =
        a?.interactionMode === Ra.InteractionModes.ON_PAGE
          ? lt.WINDOW
          : lt.REDIRECT;
      Ut().event(ut.INITIATE_INTEGRATOR_HANDLED_INTERACTION_TRIGGERED, {
        effectiveUxMode: e,
        paymentRequestId: n,
      });
      try {
        const t = n ? await wr(n, i, e) : await Cr(i, e);
        gr(),
          Qr(),
          o.handleInteraction(t.stateContext?.distribution.url),
          o.onPaymentFlowClosed &&
            o.onPaymentFlowClosed(() => {
              Ut().event(ut.INITIATE_INTEGRATOR_CLOSED_INTERACTION, {
                paymentRequestId: t.paymentRequestId,
              }),
                Gr();
            }),
          Ut().event(ut.INITIATE_COMPLETED, {
            paymentRequestId: t.paymentRequestId,
          });
      } catch (e) {
        window.klarnaIntegratorApi.handleInteraction(
          `${r}?error=internalError`
        ),
          Ln(dt.TECHNICAL_ERROR, "Initiate failed", e);
      }
      return Wr();
    }
    const c =
      a?.interactionMode &&
      a?.interactionMode !== Ra.InteractionModes.DEVICE_BEST
        ? a.interactionMode
        : (0, Ra.detectDeviceBest)();
    if (
      (Ut().event(ut.INITIATE_INTERACTION_MODE_TRIGGERED, {
        interactionMode: c,
        paymentRequestId: n,
      }),
      c === Ra.InteractionModes.ON_PAGE)
    ) {
      try {
        const [e, t] = await Promise.allSettled([
          vr({ onCloseIframe: Gr }),
          n ? wr(n, i, lt.WINDOW) : Cr(i, lt.WINDOW),
        ]);
        if ("rejected" === e.status)
          throw new Wn(
            dt.TECHNICAL_ERROR,
            "Failed to open an interaction",
            e.reason
          );
        const { updateUrl: a, effectiveMode: s } = e.value;
        if ("rejected" === t.status)
          throw (
            (a(`${r}?error=internalError`),
            new Wn(dt.TECHNICAL_ERROR, "API request failed", t.reason))
          );
        s === lt.WINDOW
          ? (function () {
              const e = new AbortController(),
                t = () => e.abort();
              window.addEventListener("focus", () => Gr(t), {
                signal: e.signal,
              });
            })()
          : await wr(t.value.paymentRequestId, null, s),
          a(t.value.stateContext?.distribution.url),
          Qr(),
          gr(),
          Ut().event(ut.INITIATE_COMPLETED, {
            paymentRequestId: t.value.paymentRequestId,
          });
      } catch (e) {
        Ln(dt.TECHNICAL_ERROR, "Initiate failed", e);
      }
      return Wr();
    }
    if (c === Ra.InteractionModes.REDIRECT) {
      try {
        const e = n ? await wr(n, i, lt.REDIRECT) : await Cr(i, lt.REDIRECT);
        gr(),
          Ut().event(ut.INITIATE_COMPLETED, {
            paymentRequestId: e.paymentRequestId,
          }),
          (0, Ra.triggerRedirect)(e.stateContext?.distribution.url);
      } catch (e) {
        Ln(dt.TECHNICAL_ERROR, "Initiate failed", e);
      }
      return Wr();
    }
  }
  async function Xr() {
    Ut().event(ut.PREPARE_CALLED),
      B("prepare is not implemented yet"),
      Ut().event(ut.PREPARE_COMPLETED);
  }
  async function Er(e, t) {
    const n = Xn.get("paymentRequestId");
    Ut().event(ut.SUBMIT_CALLED, { ...t, paymentRequestId: n });
    try {
      e && En(e), t && Nn(t);
    } catch (e) {
      return Ln(dt.TECHNICAL_ERROR, "Submission failed", e);
    }
    const i = Xn.get("paymentRequest"),
      a = Xn.get("paymentRequestOptions");
    if (n)
      return Ln(
        dt.RESOURCE_ERROR,
        "There is an ongoing payment request, please use the `Klarna.Payment.request().update()` method instead."
      );
    try {
      hn.parse(i);
    } catch (e) {
      return Ln(dt.INPUT_ERROR, "Invalid PaymentRequest", e);
    }
    try {
      mn.parse(a);
    } catch (e) {
      return Ln(dt.INPUT_ERROR, "Invalid PaymentRequestOptions", e);
    }
    try {
      const e = await Cr(i, lt.REDIRECT);
      return (
        gr(),
        Ut().event(ut.SUBMIT_COMPLETED, {
          paymentRequestId: e.paymentRequestId,
        }),
        Wr()
      );
    } catch (e) {
      Ln(dt.TECHNICAL_ERROR, "Submission failed", e);
    }
  }
  async function Nr(e) {
    const t = Xn.get("paymentRequestId");
    Ut().event(ut.UPDATE_CALLED, { paymentRequestId: t });
    try {
      e && En(e);
    } catch (e) {
      return Ln(dt.TECHNICAL_ERROR, "Update failed", e);
    }
    const n = Xn.get("paymentRequest");
    if (!t) return Xn.get("paymentRequest");
    try {
      pn.parse(n);
    } catch (e) {
      return Ln(dt.INPUT_ERROR, "Invalid PurchaseContext", e);
    }
    try {
      const e = await wr(t, n);
      return (
        Ut().event(ut.UPDATE_COMPLETED, {
          paymentRequestId: e.paymentRequestId,
        }),
        Wr()
      );
    } catch (e) {
      Ln(dt.TECHNICAL_ERROR, "Update failed", e);
    }
  }
  const Wr = (e, t) => {
    try {
      e && ("string" == typeof e ? Xn.set("paymentRequestId", e) : En(e)),
        t && Nn(t);
    } catch (e) {
      throw new Wn(dt.INPUT_ERROR, "Invalid inputs", e);
    }
    return {
      paymentRequestId: kn.paymentRequestId,
      paymentRequest: kn.paymentRequest,
      result: kn.paymentRequestResult,
      state: kn.paymentRequestState,
      stateContext: kn.paymentRequestStateContext,
      cancel: br,
      canMakePayment: mr,
      fetch: fr,
      initiate: kr,
      prepare: Xr,
      submit: Er,
      update: Nr,
    };
  };
  class Lr extends ir {
    constructor(e) {
      super(mt.PAYMENT_BUTTON, e);
    }
    toggleState(e, t) {
      const n = e.toLowerCase();
      if (Object.values(cr).includes(n)) {
        const e =
          void 0 !== t
            ? t.toString()
            : "true" === this.htmlElement.getAttribute(`data-${n}`)
            ? "false"
            : "true";
        this.htmlElement.setAttribute(`data-${n}`, e);
      } else
        B(
          `Invalid state: ${e}. Allowed values are: ${Object.values(cr).join(
            ", "
          )}`
        );
      return this;
    }
    on(e, t) {
      return (this.htmlElement.onclick = () => t(Wr(), this.id)), this;
    }
    getPublicAPI() {
      return {
        ...super.getPublicAPI(),
        toggleState: this.toggleState.bind(this),
        on: this.on.bind(this),
      };
    }
  }
  const Fr = ui.qy`<svg
  width="56"
  height="15"
  viewBox="0 0 56 15"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M54.0426 10.4219C53.182 10.4219 52.4844 11.1154 52.4844 11.9711C52.4844 12.8265 53.182 13.5201 54.0426 13.5201C54.9033 13.5201 55.601 12.8265 55.601 11.9711C55.601 11.1154 54.9033 10.4219 54.0426 10.4219Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M46.4625 4.87305C47.3759 4.87305 48.2226 5.15263 48.9242 5.62839V5.10095H51.4074V13.3461H48.9242V12.8191C48.2226 13.2948 47.3759 13.5744 46.4625 13.5744C44.0454 13.5744 42.0859 11.6265 42.0859 9.22371C42.0859 6.8209 44.0454 4.87305 46.4625 4.87305ZM44.4157 9.22371C44.4157 10.3953 45.423 11.3451 46.6658 11.3451C47.9086 11.3451 48.9159 10.3953 48.9159 9.22371C48.9159 8.05211 47.9086 7.10253 46.6658 7.10253C45.423 7.10253 44.4157 8.05211 44.4157 9.22371Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M37.6717 4.87891C36.6797 4.87891 35.7409 5.18506 35.1132 6.02971V5.10116H32.6406V13.3458H35.1436V9.01297C35.1436 7.75915 35.9894 7.14517 37.0077 7.14517C38.0991 7.14517 38.7265 7.79329 38.7265 8.9959V13.3458H41.2069V8.10257C41.2069 6.1838 39.6722 4.87891 37.6717 4.87891Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M29.0503 6.17543V5.10156H26.5078V13.3466H29.056V9.49706C29.056 8.19829 30.472 7.50017 31.4546 7.50017C31.4646 7.50017 31.474 7.50113 31.4841 7.50125V5.10204C30.4756 5.10204 29.5481 5.53128 29.0503 6.17543Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M20.2632 4.87305C21.1765 4.87305 22.0233 5.15263 22.7248 5.62839V5.10095H25.2082V13.3461H22.7248V12.8191C22.0233 13.2948 21.1765 13.5744 20.2632 13.5744C17.8461 13.5744 15.8867 11.6265 15.8867 9.22371C15.8867 6.8209 17.8461 4.87305 20.2632 4.87305ZM18.2162 9.22371C18.2162 10.3953 19.2237 11.3451 20.4663 11.3451C21.7091 11.3451 22.7165 10.3953 22.7165 9.22371C22.7165 8.05211 21.7091 7.10253 20.4663 7.10253C19.2237 7.10253 18.2162 8.05211 18.2162 9.22371Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M12.2695 13.3472H14.8687V1.42773H12.2695V13.3472Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10.4786 1.42578H7.78522C7.78522 3.62028 6.77026 5.63449 5.00067 6.95225L3.93359 7.74665L8.06817 13.3512H11.4676L7.66322 8.19416C9.46655 6.40906 10.4786 4.00745 10.4786 1.42578Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0.851562 13.3508H3.60383V1.42578H0.851562V13.3508Z"
    fill="white"
  />
</svg>`,
    Rr = ui.AH`:root{--current-gap: 0px}:host{width:auto;height:auto;display:inline-block}#klarna-payment-button{container-type:inline-size;container-name:button-payment-content;position:relative;height:48px;width:335px;min-height:35px;max-height:60px;padding:0;outline:none;border:0;margin:0;background-color:rgba(0,0,0,0)}#klarna-payment-button:focus #klarna-payment-button__outline{position:absolute;inset:-4px;border:2px solid #0d0e0f;border-radius:8px;min-height:inherit;max-height:64px;margin:auto 0}#klarna-payment-button #klarna-payment-button__inner-container{display:inline-block;min-height:inherit;max-height:inherit;min-width:min-content;width:inherit;height:inherit;cursor:pointer;transition:background-color .2s ease;box-sizing:border-box;border-radius:8px}#klarna-payment-button #klarna-payment-button__text{font-family:"-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Arial","sans-serif";font-weight:500;height:inherit;font-size:16px;opacity:1;transition:color .2s ease;text-rendering:optimizeLegibility;white-space:nowrap;max-height:inherit;min-height:inherit;position:relative;display:flex;justify-content:center;align-items:center;gap:var(--current-gap);margin:0 var(--current-gap) 0 var(--current-gap)}#klarna-payment-button #klarna-payment-button__text.hidden{opacity:0}#klarna-payment-button #logo{display:flex;justify-content:center;align-items:center;margin-left:4px}#klarna-payment-button #logo svg{fill:#0e0e0f;width:inherit;height:inherit}@container button-payment-content (width < 250px){#klarna-payment-button #klarna-payment-button__text{font-size:12px;--current-gap: 8px}}@container button-payment-content (width < 195px){#klarna-payment-button #logo{margin-left:0px}}#klarna-payment-button.theme-light #klarna-payment-button__inner-container{color:#0e0e0f;background-color:#fff;border:1px solid #0e0e0f}#klarna-payment-button.theme-light #logo svg{fill:#0e0e0f}#klarna-payment-button.theme-light:hover #klarna-payment-button__inner-container{background-color:#f1f1f1;color:#333536}#klarna-payment-button.theme-light:hover #logo svg{fill:#333536}#klarna-payment-button.theme-light:focus #klarna-payment-button__outline{inset:-5px}#klarna-payment-button.theme-light:focus #logo svg{fill:#0d0e0f}#klarna-payment-button.theme-light:active #klarna-payment-button__inner-container{background-color:#e2e2e2;color:#0d0e0f}#klarna-payment-button.theme-light path{fill:#171717}#klarna-payment-button.theme-default #klarna-payment-button__inner-container{color:#0e0e0f;background-color:#ffb3c7;border:none}#klarna-payment-button.theme-default #logo svg{fill:#0e0e0f}#klarna-payment-button.theme-default:hover #klarna-payment-button__inner-container{background-color:#f0a5b7;color:#333536}#klarna-payment-button.theme-default:hover #logo svg{fill:#333536}#klarna-payment-button.theme-default:active #klarna-payment-button__inner-container{background-color:#feb3c7;color:#0d0e0f}#klarna-payment-button.theme-default:active #logo svg{fill:#0d0e0f}#klarna-payment-button.theme-default path{fill:#171717}#klarna-payment-button.theme-dark #klarna-payment-button__inner-container{color:#fff;background-color:#0e0e0f;border:none}#klarna-payment-button.theme-dark #logo svg{fill:#fff}#klarna-payment-button.theme-dark:hover #klarna-payment-button__inner-container{background-color:#333536;color:#f1f1f1}#klarna-payment-button.theme-dark:hover #logo svg{fill:#f1f1f1}#klarna-payment-button.theme-dark:active #klarna-payment-button__inner-container{background-color:#0d0e0f;color:#e2e2e2}#klarna-payment-button.theme-dark:active #logo svg{fill:#e2e2e2}#klarna-payment-button.theme-dark path{fill:#fff}#klarna-payment-button.shape-rect #klarna-payment-button__inner-container{border-radius:0}#klarna-payment-button.shape-rect:focus #klarna-payment-button__outline{border-radius:0}#klarna-payment-button.shape-pill #klarna-payment-button__inner-container{border-radius:35px}#klarna-payment-button.shape-pill:focus #klarna-payment-button__outline{border-radius:35px}#klarna-payment-button:disabled{opacity:.3;pointer-events:none}#klarna-payment-button:disabled #klarna-payment-button__inner-container:hover{background-color:#ffb3c7}#klarna-payment-button:disabled.theme-light:hover #klarna-payment-button__inner-container{background-color:#fff;color:#0e0e0f}#klarna-payment-button:disabled.theme-dark:hover #klarna-payment-button__inner-container{background-color:#0e0e0f;color:#fff}#klarna-payment-button__spinner{width:24px;height:24px;border:2px solid;border-bottom-color:rgba(0,0,0,0);border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite;position:absolute;top:calc(50% - 12px);right:calc(50% - 12px);pointer-events:none}.theme-light #klarna-payment-button__spinner{border-color:#0e0e0f;border-bottom-color:#fff}.theme-dark #klarna-payment-button__spinner{border-color:#fff;border-bottom-color:#0e0e0f}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uL2tsYXJuYS1wYXltZW50L3NyYy9jb21wb25lbnRzL3BheW1lbnRCdXR0b24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QkEsTUFDRSxrQkFBQSxDQUtGLE1BQ0UsVUFBQSxDQUNBLFdBQUEsQ0FDQSxvQkFBQSxDQUlGLHVCQUNFLDBCQUFBLENBQ0EscUNBQUEsQ0FDQSxpQkFBQSxDQUNBLFdBQUEsQ0FDQSxXQUFBLENBQ0EsZUFBQSxDQUNBLGVBQUEsQ0FDQSxTQUFBLENBQ0EsWUFBQSxDQUNBLFFBQUEsQ0FDQSxRQUFBLENBQ0EsOEJBQUEsQ0FHRSw2REFDRSxpQkFBQSxDQUNBLFVBQUEsQ0FDQSx3QkFBQSxDQUNBLGlCQXBDVyxDQXFDWCxrQkFBQSxDQUNBLGVBQUEsQ0FDQSxhQUFBLENBSUosK0RBQ0Usb0JBQUEsQ0FDQSxrQkFBQSxDQUNBLGtCQUFBLENBQ0EscUJBQUEsQ0FDQSxhQUFBLENBQ0EsY0FBQSxDQUNBLGNBQUEsQ0FDQSxvQ0FBQSxDQUNBLHFCQUFBLENBQ0EsaUJBckRhLENBd0RmLG9EQUNFLHlGQUFBLENBQ0EsZUFBQSxDQUNBLGNBQUEsQ0FDQSxjQUFBLENBQ0EsU0FBQSxDQUNBLHlCQUFBLENBQ0EsaUNBQUEsQ0FDQSxrQkFBQSxDQUNBLGtCQUFBLENBQ0Esa0JBQUEsQ0FDQSxpQkFBQSxDQUVBLFlBQUEsQ0FDQSxzQkFBQSxDQUNBLGtCQUFBLENBRUEsc0JBQUEsQ0FDQSxnREFBQSxDQUVBLDJEQUNFLFNBQUEsQ0FJSiw2QkFDRSxZQUFBLENBQ0Esc0JBQUEsQ0FDQSxrQkFBQSxDQUNBLGVBQUEsQ0FFQSxpQ0FDRSxZQXZHVSxDQXdHVixhQUFBLENBQ0EsY0FBQSxDQUtKLGtEQUNFLG9EQUNFLGNBQUEsQ0FDQSxrQkFBQSxDQUFBLENBSUosa0RBQ0UsNkJBQ0UsZUFBQSxDQUFBLENBTUYsMkVBQ0UsYUE5SFUsQ0ErSFYscUJBckhVLENBc0hWLHdCQUFBLENBSUEsNkNBQ0UsWUFySVEsQ0EwSVYsaUZBQ0Usd0JBaElNLENBaUlOLGFBM0lNLENBK0lOLG1EQUNFLFlBaEpJLENBc0pSLHlFQUNFLFVBQUEsQ0FJQSxtREFDRSxZQTNKSyxDQWlLVCxrRkFDRSx3QkF4Sk8sQ0F5SlAsYUFuS08sQ0F1S1gsd0NBQ0UsWUFBQSxDQUtGLDZFQUNFLGFBaExVLENBaUxWLHdCQTVLUyxDQTZLVCxXQUFBLENBSUEsK0NBQ0UsWUF2TFEsQ0E0TFYsbUZBQ0Usd0JBdkxLLENBd0xMLGFBN0xNLENBaU1OLHFEQUNFLFlBbE1JLENBd01SLG9GQUNFLHdCQW5NTSxDQW9NTixhQXpNTyxDQTZNUCxzREFDRSxZQTlNSyxDQW1OWCwwQ0FDRSxZQUFBLENBS0YsMEVBQ0UsVUFsTlUsQ0FtTlYsd0JBN05VLENBOE5WLFdBQUEsQ0FJQSw0Q0FDRSxTQXpOUSxDQThOVixnRkFDRSx3QkF4T00sQ0F5T04sYUEvTk0sQ0FtT04sa0RBQ0UsWUFwT0ksQ0EwT1IsaUZBQ0Usd0JBcFBPLENBcVBQLGFBM09PLENBK09QLG1EQUNFLFlBaFBLLENBcVBYLHVDQUNFLFNBQUEsQ0FNRiwwRUFDRSxlQXpQUSxDQTRQVix3RUFDRSxlQTdQUSxDQWtRViwwRUFDRSxrQkFsUVEsQ0FxUVYsd0VBQ0Usa0JBdFFRLENBMlFaLGdDQUNFLFVBQUEsQ0FDQSxtQkFBQSxDQUVBLDhFQUNFLHdCQTVSUyxDQWdTVCwwRkFDRSxxQkE1UlEsQ0E2UlIsYUF2U1EsQ0E0U1YseUZBQ0Usd0JBN1NRLENBOFNSLFVBcFNRLENBMlNoQixnQ0FDRSxVQUFBLENBQ0EsV0FBQSxDQUNBLGdCQUFBLENBQ0EsaUNBQUEsQ0FDQSxpQkFBQSxDQUNBLG9CQUFBLENBQ0EscUJBQUEsQ0FDQSxxQ0FBQSxDQUNBLGlCQUFBLENBQ0Esb0JBQUEsQ0FDQSxzQkFBQSxDQUNBLG1CQUFBLENBRUEsNkNBQ0Usb0JBcFVZLENBcVVaLHdCQTNUWSxDQTZUZCw0Q0FDRSxpQkE5VFksQ0ErVFosMkJBelVZLENBNFVkLG9CQUNFLEdBQ0Usc0JBQUEsQ0FFRixLQUNFLHdCQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBWYXJpYWJsZXMgZm9yIGVhc2Ugb2YgY2hhbmdlXG5cbi8vIENvbG9yc1xuXG4vLyBCbGFja1xuJHJlZ3VsYXJfYmxhY2s6ICMwZTBlMGY7XG4kaG92ZXJfYmxhY2s6ICMzMzM1MzY7XG4kYWN0aXZlX2JsYWNrOiAjMGQwZTBmO1xuXG4vLyBQaW5rXG4kcmVndWxhcl9waW5rOiAjZmZiM2M3O1xuJGhvdmVyX3Bpbms6ICNmMGE1Yjc7XG4kYWN0aXZlX3Bpbms6ICNmZWIzYzc7IC8vIFRPRE86IEdldCBwcm9wZXIgY29sb3JcblxuLy8gV2hpdGVcbiRyZWd1bGFyX3doaXRlOiAjZmZmZmZmO1xuJGhvdmVyX3doaXRlOiAjZjFmMWYxO1xuJGFjdGl2ZV93aGl0ZTogI2UyZTJlMjtcblxuLy8gU2hhcGVcbiRyYWRpdXNfZGVmYXVsdDogOHB4O1xuJHJhZGl1c19yZWN0OiAwO1xuJHJhZGl1c19waWxsOiAzNXB4O1xuXG46cm9vdCB7XG4gIC0tY3VycmVudC1nYXA6IDBweDtcbn1cblxuLy8gSGVyZSB3ZSBzZXQgdGhlIGtsYXJuYS1wYXltZW50LWJ1dHRvbiBjb250YWluZXIgdG8gaGF2ZSBpdHMgZGVmYXVsdCBoZWlnaHQgYW5kIHdpZHRoLlxuLy8gTWVyY2hhbnRzIGNhbiBvdmVyd3JpdGUgdGhvc2Ugc3R5bGVzIGJ5IGRlZmluaW5nIGEgbW9yZSBzcGVjaWZpYyBzZWxlY3RvciwgZS5nLiBhIGNsYXNzXG46aG9zdCB7XG4gIHdpZHRoOiBhdXRvO1xuICBoZWlnaHQ6IGF1dG87XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLy8gRGVmYXVsdCBCdXR0b25cbiNrbGFybmEtcGF5bWVudC1idXR0b24ge1xuICBjb250YWluZXItdHlwZTogaW5saW5lLXNpemU7XG4gIGNvbnRhaW5lci1uYW1lOiBidXR0b24tcGF5bWVudC1jb250ZW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNDhweDtcbiAgd2lkdGg6IDMzNXB4O1xuICBtaW4taGVpZ2h0OiAzNXB4O1xuICBtYXgtaGVpZ2h0OiA2MHB4O1xuICBwYWRkaW5nOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IDA7XG4gIG1hcmdpbjogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgJjpmb2N1cyB7XG4gICAgI2tsYXJuYS1wYXltZW50LWJ1dHRvbl9fb3V0bGluZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBpbnNldDogLTRweDtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkICRhY3RpdmVfYmxhY2s7XG4gICAgICBib3JkZXItcmFkaXVzOiAkcmFkaXVzX2RlZmF1bHQ7XG4gICAgICBtaW4taGVpZ2h0OiBpbmhlcml0O1xuICAgICAgbWF4LWhlaWdodDogNjRweDtcbiAgICAgIG1hcmdpbjogYXV0byAwO1xuICAgIH1cbiAgfVxuXG4gICNrbGFybmEtcGF5bWVudC1idXR0b25fX2lubmVyLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgbWF4LWhlaWdodDogaW5oZXJpdDtcbiAgICBtaW4td2lkdGg6IG1pbi1jb250ZW50O1xuICAgIHdpZHRoOiBpbmhlcml0O1xuICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzIGVhc2U7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3JkZXItcmFkaXVzOiAkcmFkaXVzX2RlZmF1bHQ7XG4gIH1cblxuICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX190ZXh0IHtcbiAgICBmb250LWZhbWlseTogJy1hcHBsZS1zeXN0ZW0nLCAnQmxpbmtNYWNTeXN0ZW1Gb250JywgJ1NlZ29lIFVJJywgJ1JvYm90bycsICdBcmlhbCcsICdzYW5zLXNlcmlmJztcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2U7XG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG1heC1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICBnYXA6IHZhcigtLWN1cnJlbnQtZ2FwKTtcbiAgICBtYXJnaW46IDAgdmFyKC0tY3VycmVudC1nYXApIDAgdmFyKC0tY3VycmVudC1nYXApO1xuXG4gICAgJi5oaWRkZW4ge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gIH1cblxuICAjbG9nbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1sZWZ0OiA0cHg7XG5cbiAgICBzdmcge1xuICAgICAgZmlsbDogJHJlZ3VsYXJfYmxhY2s7XG4gICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICB9XG4gIH1cblxuICAvLyBCcmVha3BvaW50XG4gIEBjb250YWluZXIgYnV0dG9uLXBheW1lbnQtY29udGVudCAod2lkdGggPCAyNTBweCkge1xuICAgICNrbGFybmEtcGF5bWVudC1idXR0b25fX3RleHQge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgLS1jdXJyZW50LWdhcDogOHB4O1xuICAgIH1cbiAgfVxuXG4gIEBjb250YWluZXIgYnV0dG9uLXBheW1lbnQtY29udGVudCAod2lkdGggPCAxOTVweCkge1xuICAgICNsb2dvIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwcHg7XG4gICAgfVxuICB9XG5cbiAgLy8gVGhlbWVcbiAgJi50aGVtZS1saWdodCB7XG4gICAgI2tsYXJuYS1wYXltZW50LWJ1dHRvbl9faW5uZXItY29udGFpbmVyIHtcbiAgICAgIGNvbG9yOiAkcmVndWxhcl9ibGFjaztcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRyZWd1bGFyX3doaXRlO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHJlZ3VsYXJfYmxhY2s7XG4gICAgfVxuXG4gICAgI2xvZ28ge1xuICAgICAgc3ZnIHtcbiAgICAgICAgZmlsbDogJHJlZ3VsYXJfYmxhY2s7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpob3ZlciB7XG4gICAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaG92ZXJfd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkaG92ZXJfYmxhY2s7XG4gICAgICB9XG5cbiAgICAgICNsb2dvIHtcbiAgICAgICAgc3ZnIHtcbiAgICAgICAgICBmaWxsOiAkaG92ZXJfYmxhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmZvY3VzIHtcbiAgICAgICNrbGFybmEtcGF5bWVudC1idXR0b25fX291dGxpbmUge1xuICAgICAgICBpbnNldDogLTVweDtcbiAgICAgIH1cblxuICAgICAgI2xvZ28ge1xuICAgICAgICBzdmcge1xuICAgICAgICAgIGZpbGw6ICRhY3RpdmVfYmxhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmFjdGl2ZSB7XG4gICAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWN0aXZlX3doaXRlO1xuICAgICAgICBjb2xvcjogJGFjdGl2ZV9ibGFjaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXRoIHtcbiAgICAgIGZpbGw6IHJnYmEoMjMsIDIzLCAyMywgMSk7XG4gICAgfVxuICB9XG5cbiAgJi50aGVtZS1kZWZhdWx0IHtcbiAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgY29sb3I6ICRyZWd1bGFyX2JsYWNrO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHJlZ3VsYXJfcGluaztcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICB9XG5cbiAgICAjbG9nbyB7XG4gICAgICBzdmcge1xuICAgICAgICBmaWxsOiAkcmVndWxhcl9ibGFjaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgICNrbGFybmEtcGF5bWVudC1idXR0b25fX2lubmVyLWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRob3Zlcl9waW5rO1xuICAgICAgICBjb2xvcjogJGhvdmVyX2JsYWNrO1xuICAgICAgfVxuXG4gICAgICAjbG9nbyB7XG4gICAgICAgIHN2ZyB7XG4gICAgICAgICAgZmlsbDogJGhvdmVyX2JsYWNrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjphY3RpdmUge1xuICAgICAgI2tsYXJuYS1wYXltZW50LWJ1dHRvbl9faW5uZXItY29udGFpbmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGl2ZV9waW5rO1xuICAgICAgICBjb2xvcjogJGFjdGl2ZV9ibGFjaztcbiAgICAgIH1cblxuICAgICAgI2xvZ28ge1xuICAgICAgICBzdmcge1xuICAgICAgICAgIGZpbGw6ICRhY3RpdmVfYmxhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXRoIHtcbiAgICAgIGZpbGw6IHJnYmEoMjMsIDIzLCAyMywgMSk7XG4gICAgfVxuICB9XG5cbiAgJi50aGVtZS1kYXJrIHtcbiAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgY29sb3I6ICRyZWd1bGFyX3doaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHJlZ3VsYXJfYmxhY2s7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgfVxuXG4gICAgI2xvZ28ge1xuICAgICAgc3ZnIHtcbiAgICAgICAgZmlsbDogJHJlZ3VsYXJfd2hpdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpob3ZlciB7XG4gICAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaG92ZXJfYmxhY2s7XG4gICAgICAgIGNvbG9yOiAkaG92ZXJfd2hpdGU7XG4gICAgICB9XG5cbiAgICAgICNsb2dvIHtcbiAgICAgICAgc3ZnIHtcbiAgICAgICAgICBmaWxsOiAkaG92ZXJfd2hpdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmFjdGl2ZSB7XG4gICAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWN0aXZlX2JsYWNrO1xuICAgICAgICBjb2xvcjogJGFjdGl2ZV93aGl0ZTtcbiAgICAgIH1cblxuICAgICAgI2xvZ28ge1xuICAgICAgICBzdmcge1xuICAgICAgICAgIGZpbGw6ICRhY3RpdmVfd2hpdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXRoIHtcbiAgICAgIGZpbGw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hhcGVcbiAgJi5zaGFwZS1yZWN0IHtcbiAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgYm9yZGVyLXJhZGl1czogJHJhZGl1c19yZWN0O1xuICAgIH1cblxuICAgICY6Zm9jdXMgI2tsYXJuYS1wYXltZW50LWJ1dHRvbl9fb3V0bGluZSB7XG4gICAgICBib3JkZXItcmFkaXVzOiAkcmFkaXVzX3JlY3Q7XG4gICAgfVxuICB9XG5cbiAgJi5zaGFwZS1waWxsIHtcbiAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgYm9yZGVyLXJhZGl1czogJHJhZGl1c19waWxsO1xuICAgIH1cblxuICAgICY6Zm9jdXMgI2tsYXJuYS1wYXltZW50LWJ1dHRvbl9fb3V0bGluZSB7XG4gICAgICBib3JkZXItcmFkaXVzOiAkcmFkaXVzX3BpbGw7XG4gICAgfVxuICB9XG5cbiAgLy8gRGlzYWJsZWRcbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC4zO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuXG4gICAgI2tsYXJuYS1wYXltZW50LWJ1dHRvbl9faW5uZXItY29udGFpbmVyOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRyZWd1bGFyX3Bpbms7XG4gICAgfVxuXG4gICAgJi50aGVtZS1saWdodDpob3ZlciB7XG4gICAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVndWxhcl93aGl0ZTtcbiAgICAgICAgY29sb3I6ICRyZWd1bGFyX2JsYWNrO1xuICAgICAgfVxuICAgIH1cblxuICAgICYudGhlbWUtZGFyazpob3ZlciB7XG4gICAgICAja2xhcm5hLXBheW1lbnQtYnV0dG9uX19pbm5lci1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVndWxhcl9ibGFjaztcbiAgICAgICAgY29sb3I6ICRyZWd1bGFyX3doaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBMb2FkaW5nXG4ja2xhcm5hLXBheW1lbnQtYnV0dG9uX19zcGlubmVyIHtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgYm9yZGVyOiAycHggc29saWQ7XG4gIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYW5pbWF0aW9uOiByb3RhdGlvbiAxcyBsaW5lYXIgaW5maW5pdGU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDUwJSAtIDEycHgpO1xuICByaWdodDogY2FsYyg1MCUgLSAxMnB4KTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5cbiAgLnRoZW1lLWxpZ2h0ICYge1xuICAgIGJvcmRlci1jb2xvcjogJHJlZ3VsYXJfYmxhY2s7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHJlZ3VsYXJfd2hpdGU7XG4gIH1cbiAgLnRoZW1lLWRhcmsgJiB7XG4gICAgYm9yZGVyLWNvbG9yOiAkcmVndWxhcl93aGl0ZTtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAkcmVndWxhcl9ibGFjaztcbiAgfVxuXG4gIEBrZXlmcmFtZXMgcm90YXRpb24ge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */`;
  function Ur(e) {
    var t = (function (e, t) {
      if ("object" != typeof e || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var i = n.call(e, "string");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == typeof t ? t : t + "";
  }
  function Or(e, t, n) {
    "symbol" == typeof t && (t = (t = t.description) ? "[" + t + "]" : "");
    try {
      Object.defineProperty(e, "name", {
        configurable: !0,
        value: n ? n + " " + t : t,
      });
    } catch (e) {}
    return e;
  }
  function _r(e) {
    if (Object(e) !== e)
      throw TypeError(
        "right-hand side of 'in' should be an object, got " +
          (null !== e ? typeof e : "null")
      );
    return e;
  }
  const Sr = mt.PAYMENT_BUTTON,
    Dr = ft.DEFAULT,
    Yr = Ct.DEFAULT,
    Tr = di.PAY;
  class Vr {
    constructor(e) {
      (this.config = e),
        (this.eventBus = St.getInstance()),
        (this.tracker = Rt.getInstance(e)),
        Xn.set("config", e),
        Xn.set("emit", this.eventBus.emit.bind(this.eventBus)),
        (function (e) {
          let t, n, i, a, s, r, o, c, l, d, u, g, b, h, p, m, I, f, C, y, x;
          if (!customElements.get(mt.PAYMENT_BUTTON)) {
            class G extends ui.WF {
              static {
                ({
                  e: [i, a, s, r, o, c, l, d, u, g, b, h, p, m, I, f, C, y, t],
                  c: [x, n],
                } = (function (e, t, n, i, a, s) {
                  var r,
                    o,
                    c,
                    l,
                    d,
                    u,
                    g,
                    b = Symbol.metadata || Symbol.for("Symbol.metadata"),
                    h = Object.defineProperty,
                    p = Object.create,
                    m = [p(null), p(null)],
                    I = t.length;
                  function f(t, n, i) {
                    return function (a, s) {
                      n && ((s = a), (a = e));
                      for (var r = 0; r < t.length; r++)
                        s = t[r].apply(a, i ? [s] : []);
                      return i ? s : a;
                    };
                  }
                  function C(e, t, n, i) {
                    if ("function" != typeof e && (i || void 0 !== e))
                      throw new TypeError(
                        t +
                          " must " +
                          (n || "be") +
                          " a function" +
                          (i ? "" : " or undefined")
                      );
                    return e;
                  }
                  function y(e, t, n, i, a, s, c, l, d, u, g) {
                    function b(e) {
                      if (!g(e))
                        throw new TypeError(
                          "Attempted to access private element on non-instance"
                        );
                    }
                    var p = [].concat(t[0]),
                      I = t[3],
                      y = !c,
                      x = 1 === a,
                      G = 3 === a,
                      A = 4 === a,
                      v = 2 === a;
                    function B(t, n, i) {
                      return function (a, s) {
                        return (
                          n && ((s = a), (a = e)), i && i(a), Z[t].call(a, s)
                        );
                      };
                    }
                    if (!y) {
                      var Z = {},
                        Q = [],
                        w = G ? "get" : A || x ? "set" : "value";
                      if (
                        (d
                          ? (u || x
                              ? (Z = {
                                  get: Or(
                                    function () {
                                      return I(this);
                                    },
                                    i,
                                    "get"
                                  ),
                                  set: function (e) {
                                    t[4](this, e);
                                  },
                                })
                              : (Z[w] = I),
                            u || Or(Z[w], i, v ? "" : w))
                          : u || (Z = Object.getOwnPropertyDescriptor(e, i)),
                        !u && !d)
                      ) {
                        if ((o = m[+l][i]) && 7 != (o ^ a))
                          throw Error(
                            "Decorating two elements with the same name (" +
                              Z[w].name +
                              ") is not supported yet"
                          );
                        m[+l][i] = a < 3 ? 1 : a;
                      }
                    }
                    for (var k = e, X = p.length - 1; X >= 0; X -= n ? 2 : 1) {
                      var E = C(p[X], "A decorator", "be", !0),
                        N = n ? p[X - 1] : void 0,
                        W = {},
                        L = {
                          kind: [
                            "field",
                            "accessor",
                            "method",
                            "getter",
                            "setter",
                            "class",
                          ][a],
                          name: i,
                          metadata: r,
                          addInitializer: function (e, t) {
                            if (e.v)
                              throw Error(
                                "attempted to call addInitializer after decoration was finished"
                              );
                            C(t, "An initializer", "be", !0), s.push(t);
                          }.bind(null, W),
                        };
                      if (y)
                        (o = E.call(N, k, L)),
                          (W.v = 1),
                          C(o, "class decorators", "return") && (k = o);
                      else if (
                        ((L.static = l),
                        (L.private = d),
                        (o = L.access =
                          {
                            has: d
                              ? g.bind()
                              : function (e) {
                                  return i in e;
                                },
                          }),
                        A ||
                          (o.get = d
                            ? v
                              ? function (e) {
                                  return b(e), Z.value;
                                }
                              : B("get", 0, b)
                            : function (e) {
                                return e[i];
                              }),
                        v ||
                          G ||
                          (o.set = d
                            ? B("set", 0, b)
                            : function (e, t) {
                                e[i] = t;
                              }),
                        (k = E.call(
                          N,
                          x ? { get: Z.get, set: Z.set } : Z[w],
                          L
                        )),
                        (W.v = 1),
                        x)
                      ) {
                        if ("object" == typeof k && k)
                          (o = C(k.get, "accessor.get")) && (Z.get = o),
                            (o = C(k.set, "accessor.set")) && (Z.set = o),
                            (o = C(k.init, "accessor.init")) && Q.unshift(o);
                        else if (void 0 !== k)
                          throw new TypeError(
                            "accessor decorators must return an object with get, set, or init properties or undefined"
                          );
                      } else
                        C(
                          k,
                          (u ? "field" : "method") + " decorators",
                          "return"
                        ) && (u ? Q.unshift(k) : (Z[w] = k));
                    }
                    return (
                      a < 2 && c.push(f(Q, l, 1), f(s, l, 0)),
                      u ||
                        y ||
                        (d
                          ? x
                            ? c.splice(-1, 0, B("get", l), B("set", l))
                            : c.push(v ? Z[w] : C.call.bind(Z[w]))
                          : h(e, i, Z)),
                      k
                    );
                  }
                  function x(e) {
                    return h(e, b, {
                      configurable: !0,
                      enumerable: !0,
                      value: r,
                    });
                  }
                  return (
                    void 0 !== s && (r = s[b]),
                    (r = p(null == r ? null : r)),
                    (d = []),
                    (u = function (e) {
                      e && d.push(f(e));
                    }),
                    (g = function (t, i) {
                      for (var a = 0; a < n.length; a++) {
                        var s = n[a],
                          r = s[1],
                          o = 7 & r;
                        if ((8 & r) == t && !o == i) {
                          var u = s[2],
                            g = !!s[3],
                            b = 16 & r;
                          y(
                            t ? e : e.prototype,
                            s,
                            b,
                            g ? "#" + u : Ur(u),
                            o,
                            o < 2 ? [] : t ? (l = l || []) : (c = c || []),
                            d,
                            !!t,
                            g,
                            i,
                            t && g
                              ? function (t) {
                                  return _r(t) === e;
                                }
                              : void 0
                          );
                        }
                      }
                    }),
                    g(8, 0),
                    g(0, 0),
                    g(8, 1),
                    g(0, 1),
                    u(c),
                    u(l),
                    (o = d),
                    I || x(e),
                    {
                      e: o,
                      get c() {
                        var n = [];
                        return (
                          I && [x((e = y(e, [t], 0, e.name, 5, n))), f(n, 1)]
                        );
                      },
                    }
                  );
                })(
                  this,
                  [(0, gi.EM)(Sr)],
                  [
                    [(0, gi.MZ)({ attribute: "onclick" }), 1, "onclick"],
                    [(0, gi.MZ)({ attribute: "data-theme" }), 4, "theme"],
                    [(0, gi.MZ)({ attribute: "data-shape" }), 4, "shape"],
                    [(0, gi.MZ)({ attribute: "data-disabled" }), 1, "disabled"],
                    [(0, gi.MZ)({ attribute: "data-loading" }), 1, "loading"],
                    [(0, gi.MZ)({ attribute: "data-label" }), 1, "label"],
                    [(0, gi.MZ)({ attribute: "data-locale" }), 1, "locale"],
                    [
                      (0, gi.MZ)({ attribute: "data-payment-amount" }),
                      1,
                      "paymentAmount",
                    ],
                    [(0, gi.MZ)({ attribute: "data-currency" }), 1, "currency"],
                    [
                      (0, gi.MZ)({ attribute: "data-redirect-url" }),
                      1,
                      "redirectUrl",
                    ],
                    [
                      (0, gi.MZ)({ attribute: "data-interaction-mode" }),
                      1,
                      "interactionMode",
                    ],
                  ],
                  0,
                  0,
                  ui.WF
                ));
              }
              constructor(...e) {
                super(...e), y(this);
              }
              #e = (t(this), Dr);
              get _theme() {
                return this.#e;
              }
              set _theme(e) {
                this.#e = e;
              }
              #t = Yr;
              get _shape() {
                return this.#t;
              }
              set _shape(e) {
                this.#t = e;
              }
              #n = i(this);
              get onclick() {
                return this.#n;
              }
              set onclick(e) {
                this.#n = e;
              }
              set theme(e) {
                var t;
                this._theme =
                  ((t = e ?? this._theme),
                  Object.values(ft).includes(t)
                    ? t
                    : (nn(window.location.origin) &&
                        B(
                          `Invalid theme requested: "${t}", using default theme instead.`
                        ),
                      ft.DEFAULT));
              }
              get theme() {
                return this._theme;
              }
              set shape(e) {
                var t;
                this._shape =
                  ((t = e ?? this._shape),
                  Object.values(Ct).includes(t)
                    ? t
                    : (nn(window.location.origin) &&
                        B(
                          `Invalid shape requested: "${t}", using default shape instead.`
                        ),
                      Ct.DEFAULT));
              }
              get shape() {
                return this._shape;
              }
              #i = (a(this), s(this, "false"));
              get disabled() {
                return this.#i;
              }
              set disabled(e) {
                this.#i = e;
              }
              #a = (r(this), o(this, "false"));
              get loading() {
                return this.#a;
              }
              set loading(e) {
                this.#a = e;
              }
              #s = (c(this), l(this, Tr));
              get label() {
                return this.#s;
              }
              set label(e) {
                this.#s = e;
              }
              #r = (d(this), u(this, "en"));
              get locale() {
                return this.#r;
              }
              set locale(e) {
                this.#r = e;
              }
              #o = (g(this), b(this));
              get paymentAmount() {
                return this.#o;
              }
              set paymentAmount(e) {
                this.#o = e;
              }
              #c = (h(this), p(this));
              get currency() {
                return this.#c;
              }
              set currency(e) {
                this.#c = e;
              }
              #l = (m(this), I(this));
              get redirectUrl() {
                return this.#l;
              }
              set redirectUrl(e) {
                this.#l = e;
              }
              #d = (f(this), C(this));
              get interactionMode() {
                return this.#d;
              }
              set interactionMode(e) {
                this.#d = e;
              }
              render() {
                const e = Xt(this.locale).substring(0, 2)?.toLowerCase(),
                  t = ((e, { locale: t, params: n } = {}) => {
                    const i = t || ri(),
                      a = ci[e][i];
                    return n && a ? oi(a, n) : [a];
                  })(
                    ((n = this.label),
                    (i = It.PAYMENT) === It.IDENTITY
                      ? (n === di.CONNECT || n === di.SIGNIN || di.SIGNUP,
                        ii.ContinueWith)
                      : i === It.PAYMENT
                      ? n === di.CONTINUE
                        ? ii.ContinueWith
                        : n === di.CHECKOUT
                        ? ii.PayWith
                        : n === di.SUBSCRIBE || n === di.DONATE
                        ? ii.ContinueWith
                        : ii.PayWith
                      : ii.ContinueWith),
                    { locale: e, params: [ui.qy`<span id="logo">${Fr}</span>`] }
                  );
                var n, i;
                return ui.qy`
        <style>
          ${Rr}
        </style>
        <button
          id="${Sr}"
          class="theme-${this.theme} shape-${this.shape}"
          @click=${this.handleClick}
          part="button"
          ?disabled=${"true" === this.disabled}
        >
          <div id="${Sr}__outline"></div>
          <div id="${Sr}__inner-container">
            <span id="${Sr}__text" class="${
                  "true" === this.loading ? "hidden" : ""
                }">
              ${t}
            </span>
            ${
              "true" === this.loading
                ? ui.qy`<span id="${Sr}__spinner"></span>`
                : ""
            }
          </div>
        </button>
      `;
              }
              handleClick(t) {
                t.stopPropagation(),
                  t.preventDefault(),
                  this.onclick && "function" == typeof this.onclick
                    ? this.onclick()
                    : e
                        .getPublicAPI()
                        .request()
                        .initiate(
                          {
                            paymentAmount: Number.parseInt(
                              this.paymentAmount,
                              10
                            ),
                            currency: this.currency,
                          },
                          {
                            redirectUrl: this.redirectUrl,
                            interactionMode: this.interactionMode,
                          }
                        );
              }
              static {
                n();
              }
            }
          }
        })(this),
        new or().registerAllHandlers(),
        this.setupSentryWithTags();
    }
    setupSentryWithTags() {
      const e = {
        accountId: this.config.accountId,
        clientId: this.config.clientId,
        product: mt.PLACEMENT,
      };
      cn({
        environment: this.config.environment,
        version: this.config.version,
        tags: e,
      });
    }
    buttonApi(e) {
      return new Lr(e).getPublicAPI();
    }
    requestApi(e, t) {
      try {
        return Wr(e, t);
      } catch (e) {
        Ln(dt.TECHNICAL_ERROR, "Unexpected error", e);
      }
    }
    onApi(e, t) {
      switch (e) {
        case "update":
          return (Vr.updateCallback = t), this.eventBus.on(_t.UPDATE, t);
        case "error":
          return this.eventBus.on(_t.ERROR, t);
        default:
          throw new Error(`Unsupported event: ${e}`);
      }
    }
    getPublicAPI() {
      return {
        button: this.buttonApi.bind(this),
        request: this.requestApi.bind(this),
        on: this.onApi.bind(this),
        off: this.eventBus.off.bind(this.eventBus),
      };
    }
  }
  const Hr = class {
    constructor(e) {
      e?.instanceId || (e.instanceId = E()), (this.config = e);
      const t = Dn(`${e.instanceId}-config`);
      t && t.set("config", this.config),
        this.config.clientToken && this.configureSDKWithClientToken(),
        (this.tracker = Ft({
          config: {
            version: this.config.version,
            environment: this.config.environment,
            sessionId: this.config.sessionId,
          },
          trackerClient: i.websdk,
          extraTrackingData: {
            additionalIdentifier: this.config.additionalIdentifier,
            clientId: this.config.clientId,
            accountId: this.config.accountId,
            instanceId: this.config.instanceId,
          },
        })),
        this.initSentryUtils(),
        this.trackRollout(),
        this.initializeSDKFeatures(),
        this.loadTestDriveBadge(),
        Un.init(this.config);
    }
    trackRollout() {
      if (n(t.INIT)) {
        const e = (() => {
          try {
            return ((e) => {
              try {
                return (function (e, t = window) {
                  if (!t?.localStorage)
                    throw new Error(
                      `client does not support ${Sn.localStorage}`
                    );
                  const n = () => JSON.parse(t.localStorage.getItem(e) || "{}"),
                    i = {
                      get: (e) => {
                        const t = n(),
                          a = t?.[e];
                        if (!a) return null;
                        const s = t?.ttl;
                        return s && s < Date.now() ? (i.flush(), null) : a;
                      },
                      set: (i, a) => {
                        const s = n();
                        return (
                          null === a ? delete s[i] : (s[i] = a),
                          t.localStorage.setItem(e, JSON.stringify(s))
                        );
                      },
                      remove: (e) => i.set(e, null),
                      flush: () => t.localStorage.removeItem(e),
                    };
                  return i;
                })(`${_n}${e}`);
              } catch {
                On("Storage type: localStorage not supported");
              }
            })("version").get("rolloutVariant");
          } catch {
            return "none";
          }
        })();
        this.tracker.event("metric_sdk_init", { rolloutVariant: e });
      }
    }
    loadTestDriveBadge = () => {
      const { environment: e, clientId: t } = this.config;
      Ka(e || "", t) && a.e(4328).then(a.bind(a, 7667));
    };
    configureSDKWithClientToken = () => {
      const {
        sessionId: e,
        clientId: t,
        environment: n,
      } = ((e) => {
        try {
          const t = Na(e);
          return {
            sessionId: t.session_id,
            clientId: t.client_id,
            environment: t.environment,
          };
        } catch (e) {
          console.error("Error decoding JWT: ", e.message);
        }
      })(this.config.clientToken);
      (this.config.environment = n),
        (this.config.clientId = t),
        this.setSession({
          session_id: e,
          client_token: this.config.clientToken,
        });
    };
    initSentryUtils = () => {
      const {
          accountId: e,
          clientId: t,
          clientToken: n,
          environment: i,
          version: a,
          additionalIdentifier: s,
          instanceId: r,
        } = this.config,
        o = bt({
          accountId: e,
          clientId: t,
          clientToken: n,
          instanceId: r,
          additionalIdentifier: s,
        });
      cn({ environment: i, version: a, tags: o });
    };
    getMethodsObject() {
      return { getSession: this.getSession, setSession: this.setSession };
    }
    initializeSDKFeatures = () => {
      try {
        (this.Messaging = sr.call(this, this.config, this.getMethodsObject())),
          nr(this, this.config);
      } catch {
        this.tracker.event("error", {
          message: "Failed to initialize Messaging SDK",
        });
      }
      try {
        this.paymentSDK = new Vr(this.config);
      } catch {}
      try {
        this.identitySDK = new Ma({
          sessionId: this.config.sessionId,
          environment: this.config.environment,
          clientId: this.config.clientId,
          identityRuntimeConfig: this.config.runtimeConfig?.identity,
        });
      } catch {}
    };
    getSession = () => this.session;
    setSession = (e) => {
      this.session = e;
    };
    getPublicAPI() {
      {
        const e = this.paymentSDK?.getPublicAPI(),
          t = this.identitySDK?.getIdentityPublicAPI(),
          n = this.Messaging;
        return new (class {
          Payment = e;
          Identity = t;
          Messaging = n;
        })();
      }
    }
  };
})();
var r = s.A;
export { r as default };
//# sourceMappingURL=sdk.js.map
