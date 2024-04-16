"use strict";
(self.webpackChunk_loyaltylion_tonks =
  self.webpackChunk_loyaltylion_tonks || []).push([
  [766],
  {
    9850: (e, t, n) => {
      n.d(t, { P: () => s, w: () => a });
      var r = n(4274),
        i = [
          "point",
          "tier",
          "guest_introduction",
          "post_purchase_referral",
          "post_purchase_signup",
        ];
      function a(e) {
        return (0, r.q9)(i, e.kind);
      }
      var o = [
        "guest_introduction",
        "point",
        "post_purchase_referral",
        "reward_redemption",
        "tier",
      ];
      function s(e) {
        return (0, r.q9)(o, e);
      }
    },
    6081: (e, t, n) => {
      n.d(t, { Du: () => d, a7: () => o, s: () => s, tn: () => c });
      var r = n(3052),
        i = n(7596);
      const a = new RegExp(
        /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/
      );
      function o(e, t = {}) {
        const n = (function (e) {
            const t = e.replace(/^#/, "").trim().toLowerCase();
            if (3 === t.length || 4 === t.length)
              return t
                .split("")
                .map((e) => e + e)
                .join("");
            if (6 === t.length || 8 === t.length) return t;
            throw new TypeError(`Unexpected length for hex color: ${e}`);
          })(e),
          i = a.exec(n);
        if (t.alpha && (t.alpha < 0 || t.alpha > 1))
          throw new TypeError(
            "Alpha channel must be between 0 and 1 inclusive"
          );
        if (!i) throw new TypeError(`Unable to parse hex color: ${e}`);
        const o = { red: i[1], green: i[2], blue: i[3], alpha: i[4] };
        var s;
        return (0, r.Z)(
          {
            red: parseInt(o.red, 16),
            green: parseInt(o.green, 16),
            blue: parseInt(o.blue, 16),
            alpha: u(
              parseInt(null !== (s = o.alpha) && void 0 !== s ? s : "ff", 16) /
                255,
              3
            ),
          },
          t
        );
      }
      function s(e, { includeHash: t = !0, includeAlpha: n = !0 } = {}) {
        const r = (e) => {
          const t = Math.round(e).toString(16);
          return 1 === t.length ? `0${t}` : t;
        };
        return `${t ? "#" : ""}${r(e.red)}${r(e.green)}${r(e.blue)}${
          1 !== e.alpha && n ? r(255 * e.alpha) : ""
        }`;
      }
      function l(e) {
        const t = e.red / 255,
          n = e.green / 255,
          r = e.blue / 255,
          i = e.alpha,
          a = Math.max(t, n, r),
          o = Math.min(t, n, r),
          s = Math.round(((a + o) / 2) * 100);
        if (a === o) return { hue: 0, saturation: 0, lightness: s, alpha: i };
        const l = a - o,
          c = s <= 50 ? l / (a + o) : l / (2 - a - o);
        let d;
        return (
          (d =
            a === t
              ? (n - r) / l + (n < r ? 6 : 0)
              : a === n
              ? (r - t) / l + 2
              : (t - n) / l + 4),
          {
            hue: Math.round(60 * d),
            saturation: Math.round(100 * c),
            lightness: s,
            alpha: i,
          }
        );
      }
      function c(e, t) {
        const n =
            "string" == typeof e
              ? (function (e, t = {}) {
                  return l(o(e, t));
                })(e)
              : "red" in e
              ? l(e)
              : e,
          i = (e, t, r) => {
            const i = n[e];
            return (function (e, t, n) {
              return Math.min(Math.max(t, e), n);
            })(i + (t > 0 ? r - i : i) * (t / r), 0, r);
          };
        return (0, r.Z)(
          {},
          n,
          void 0 !== t.alpha && { alpha: u(i("alpha", t.alpha / 100, 1), 3) },
          void 0 !== t.lightness && {
            lightness: Math.round(i("lightness", t.lightness, 100)),
          },
          void 0 !== t.saturation && {
            saturation: Math.round(i("saturation", t.saturation, 100)),
          }
        );
      }
      function d(e) {
        return "red" in e
          ? `rgba(${[e.red, e.green, e.blue, e.alpha].join(", ")})`
          : `hsla(${[
              e.hue,
              `${e.saturation}%`,
              `${e.lightness}%`,
              e.alpha,
            ].join(", ")})`;
      }
      function u(e, t) {
        return (0, i.zI)(e.toFixed(t));
      }
    },
    70: (e, t, n) => {
      n.d(t, {
        AG: () => C,
        Aj: () => N,
        Fc: () => A,
        Ge: () => P,
        Kh: () => x,
        Ki: () => E,
        N4: () => R,
        Ro: () => S,
        WH: () => T,
        YD: () => w,
        bn: () => y,
        d3: () => g,
        hB: () => $,
        l: () => M,
        ql: () => K,
        rB: () => I,
        vF: () => q,
        zS: () => b,
      });
      var r = n(9532),
        i = n(4421),
        a = n(2307),
        o = n(6840),
        s = n(7365),
        l = n(8788),
        c = n(3524),
        d = n(2690),
        u = n(6233),
        m = n(4263),
        p = n(481),
        f = n(9121),
        _ = n(5273),
        h = n(906),
        k = n(5172),
        v = n(686);
      const g = (e) =>
          (0, r.PH)("[rewards] open reward redeem modal", { id: e }),
        w = (e) =>
          (0, r.PH)("[rewards] open reward description modal", { id: e }),
        E = () => (0, r.PH)("[rewards] close reward description modal"),
        y = (e) => (0, r.PH)("[rewards] redeem request", { id: e }),
        b = (e) => (0, r.PH)("[rewards] redeem reward request success", e),
        N = (e) =>
          (0, r.PH)("[rewards] redeem free product reward request success", {
            id: e,
          }),
        C = (e) =>
          (0, r.PH)(
            "[rewards] redeem subscription buy with points reward request success",
            e
          ),
        T = (e) => (0, r.PH)("[rewards] redeem reward request error", e),
        x = (e) =>
          (0, r.PH)("[rewards] redeem reward request reset", { id: e }),
        P = (e) => (0, r.PH)("[rewards] apply claimed request", { id: e }),
        $ = (e) =>
          (0, r.PH)("[rewards] apply claimed reward request reset", { id: e }),
        I = (e) => (0, r.PH)("[rewards] set claimed reward can be applied", e),
        S = (e) => (0, r.PH)("[rewards] set claimed reward apply result", e),
        K = () => (0, r.PH)("[rewards] finish closing reward redeem modal"),
        A = () => (0, r.PH)("[rewards] start closing reward redeem modal"),
        M = () => async (e) => {
          e(A()), await (0, p._v)(h.A), e(K());
        },
        q = (e) => {
          let { rewardId: t } = e;
          return async (e, n) => {
            const r = n();
            if (null !== (0, k.rq)(r)) return;
            e(y(t));
            const p = r.customer;
            if (!p) throw new a.G("Claiming reward requires customer");
            const h = p.id,
              v = (0, s.Wu)(r) ?? void 0,
              g = {
                customerId: h,
                attribution: (0, f.OY)(p.merchantId),
                emailTrackingId: v,
                rewardId: t,
              },
              w = i.H.buildFromState(r, e),
              E = (0, l.kL)(r, t);
            if (!E) throw new o.w("Claiming a reward requires a reward");
            const N = await w.customers.claimReward(g);
            if ("error" in N)
              e(T({ error: { name: N.error.message ?? N.error.type }, id: t }));
            else {
              "product_discount_voucher" !== E.kind ||
                "shopify" !== (0, c.O2)(r) ||
                (0, m.vD)(r) ||
                (await (0, _.RA)(E, e, n)),
                (0, _.Oz)(p, E),
                e(b({ action: N.action, id: t }));
              "hide_claim_modal" ===
                (
                  await (0, d.f1)("customers.rewards.claimed", {
                    claimedReward: (0, u.M)(N.claimedReward, {
                      dispatch: e,
                      getState: n,
                    }),
                  })
                )?.action && e(M());
            }
          };
        },
        R = (e) => async (t, n) => {
          t(P(e.id));
          const r = (0, u.M)(e, { dispatch: t, getState: n }),
            i = await (0, d.f1)("customers.rewards.apply_claimed", {
              claimedReward: r,
            });
          i && "hide_claimed_reward_modal" === i.action && t((0, v.dP)()),
            i || t(S({ id: e.id, applyResult: null }));
        };
    },
    906: (e, t, n) => {
      n.d(t, { A: () => l, u: () => c });
      var r = n(7689),
        i = n(9445),
        a = n(3434),
        o = n(7307),
        s = n(6166);
      const l = 150,
        c = (e) => {
          const {
              isOpen: t,
              title: n,
              onCloseClick: c,
              onBackgroundClick: d,
              options: u = {},
              className: m,
              children: p,
              size: f = "large",
            } = e,
            _ = (0, r.useRef)(null),
            h = (0, r.useCallback)(
              (e) => {
                if ("Escape" === e.key) return c?.();
                document.activeElement === _.current &&
                  ((" " !== e.key && "Enter" !== e.key) ||
                    (e.preventDefault(), e.stopPropagation(), c?.()));
              },
              [c]
            );
          (0, r.useEffect)(
            () => (
              window.addEventListener("keydown", h),
              () => window.removeEventListener("keydown", h)
            ),
            [h]
          ),
            (0, r.useEffect)(() => {
              _.current && _.current.focus();
            });
          const k = r.createElement(
              "a",
              {
                tabIndex: 0,
                role: "button",
                ref: _,
                className: (0, o.ok)("modal__close-button"),
                "data-testid": "modal-close-btn",
                onClick: () => c?.(),
              },
              "×"
            ),
            v = t
              ? r.createElement(
                  i.Z,
                  {
                    key: "1",
                    in: t,
                    classNames: {
                      enter: (0, o.ok)("modal-and-screen--enter"),
                      enterActive: (0, o.ok)("modal-and-screen--enter-active"),
                      exit: (0, o.ok)("modal-and-screen--exit"),
                      exitActive: (0, o.ok)("modal-and-screen--exit-active"),
                    },
                    timeout: l,
                  },
                  r.createElement(
                    "div",
                    { className: (0, o.ok)("modal-and-screen") },
                    r.createElement("div", {
                      className: (0, o.ok)("screen", "screen--light"),
                      onClick: d,
                    }),
                    r.createElement(
                      "div",
                      {
                        role: "dialog",
                        "aria-modal": "true",
                        className:
                          (0, o.ok)("modal", `modal--${f}`) + " " + (m || ""),
                      },
                      n &&
                        r.createElement(
                          "div",
                          { className: (0, o.ok)("modal__header") },
                          r.createElement(
                            "div",
                            { className: (0, o.ok)("modal__title") },
                            n
                          ),
                          k
                        ),
                      r.createElement(
                        "div",
                        {
                          className: (0, o.ok)(
                            "modal__content",
                            u.noPadding ? "modal__content--no-padding" : ""
                          ),
                        },
                        r.createElement(s.S, null, !n && k, p)
                      )
                    )
                  )
                )
              : null;
          return r.createElement(a.Z, null, v);
        };
    },
    6571: (e, t, n) => {
      n.d(t, { m: () => f, n: () => p });
      var r = n(7689),
        i = n(6030),
        a = n(3434),
        o = n(9445),
        s = n(1231),
        l = n(9341),
        c = n(3308),
        d = n(3418),
        u = n(7307),
        m = n(1503);
      const p = 200,
        f = () => {
          const e = (0, i.v9)((e) => (0, c.$8)(e).map((t) => (0, c.t0)(e, t))),
            t = (0, i.v9)(c.g6),
            n = (0, i.v9)(l.J);
          return r.createElement(
            s.z$.Provider,
            { value: n },
            r.createElement(
              a.Z,
              {
                appear: !0,
                className: (0, u.ok)(
                  "notification-container",
                  `notification-container--${(0, d.Kh)(t)}`
                ),
              },
              e.map((e) =>
                r.createElement(
                  o.Z,
                  {
                    appear: !0,
                    unmountOnExit: !0,
                    timeout: p,
                    key: e.id,
                    classNames: {
                      appear: (0, u.ok)("notification--enter"),
                      appearActive: (0, u.ok)("notification--enter-active"),
                      enter: (0, u.ok)("notification--enter"),
                      enterActive: (0, u.ok)("notification--enter-active"),
                      exit: (0, u.ok)("notification--exit"),
                      exitActive: (0, u.ok)("notification--exit-active"),
                    },
                  },
                  r.createElement(m.t, { notification: e })
                )
              )
            )
          );
        };
    },
    1503: (e, t, n) => {
      n.d(t, { t: () => re });
      var r = n(7689),
        i = n(6030),
        a = n(2136),
        o = n(4787),
        s = n(4263),
        l = n(7307),
        c = n(7664),
        d = n(9850),
        u = n(4346),
        m = n(3418),
        p = n(9121);
      const f = (e) => {
          let {
            showContainerPointer: t,
            notification: n,
            onClick: o,
            onCloseClick: s,
            children: c,
            className: f,
          } = e;
          const _ = (0, i.v9)(u.eD),
            h = (0, i.I0)(),
            k = (0, d.P)(n.kind) && `notification--${(0, p.xC)(n.kind)}`,
            v = (0, l.c)(
              "notification",
              `notification--${(0, m.ST)(n.kind)}`,
              k,
              {
                "notification--mobile": _,
                "notification--actionable": Boolean(t),
                "notification--point": "tier" === n.kind,
              }
            );
          return r.createElement(
            "div",
            { className: v.concat(f ? ` ${f}` : "") },
            r.createElement(
              "div",
              { className: (0, l.c)("notification__content"), onClick: o },
              c
            ),
            r.createElement(
              "a",
              {
                className: (0, l.c)("notification__close-button"),
                "data-testid": "notification-close-button",
                tabIndex: 0,
                onClick: () => {
                  s && s(), h((0, a.no)(n.id));
                },
              },
              "×"
            )
          );
        },
        _ = (e) => {
          let { notification: t } = e;
          const n = (0, i.I0)(),
            d = (0, a.dV)(),
            u = (0, i.v9)(s.vD);
          return r.createElement(
            f,
            { notification: t },
            r.createElement(
              "div",
              { className: (0, l.ok)("notification__message") },
              r.createElement(o.N, {
                i18nKey: "sdk.guest_introduction",
                useStateTranslations: !0,
              })
            ),
            r.createElement(
              "div",
              { className: (0, l.ok)("notification__action") },
              r.createElement(
                "a",
                {
                  className: (0, l.ok)(
                    "notification__action-button",
                    "action-button"
                  ),
                  tabIndex: 0,
                  onClick: u ? c.Z : () => n(d(t)),
                },
                r.createElement(o.N, {
                  i18nKey: "ui.referral_popup.learn_more",
                  useStateTranslations: !0,
                })
              )
            )
          );
        };
      var h = n(6087);
      const k = (e) => {
        let { notification: t } = e;
        const n = (0, h.T)(),
          o = (0, a.dV)(),
          s = (0, i.I0)(),
          c = () => s(o(t)),
          d = () =>
            "modern" !== n
              ? null
              : r.createElement("div", {
                  className: (0, l.ok)("notification__icon", {
                    "notification__icon--points": "point" === t.kind,
                    "notification__icon--tier": "tier" === t.kind,
                  }),
                });
        return r.createElement(
          f,
          { showContainerPointer: !0, notification: t, onClick: c },
          r.createElement(
            "div",
            { className: (0, l.ok)("notification__message"), onClick: c },
            r.createElement(d, null),
            t.message
          )
        );
      };
      var v = n(3152),
        g = n(3524),
        w = n(1667),
        E = n(9123),
        y = n(7377);
      const b = (e) => {
        let { notification: t } = e;
        const n = (0, i.v9)(g.O7),
          {
            urls: { signup: a, login: s },
          } = (0, i.v9)(w.r7),
          c = (0, i.v9)(E.P),
          d =
            "integrated_page_only" === c ||
            "integrated_page_and_legacy_panel" === c;
        if (!n) return null;
        const u = (e) => {
          (0, v.m)({
            cta_clicked: e,
            site_notification_id: n.id,
            site_notification_kind: n.kind,
            customer_merchant_id: y.Fq.guestCustomerIdOnCheckout(),
          });
        };
        return r.createElement(
          f,
          { notification: t, onCloseClick: () => u("close") },
          r.createElement(
            "div",
            { className: (0, l.c)("notification__header") },
            r.createElement(
              "div",
              { className: (0, l.c)("notification__title") },
              r.createElement(o.N, {
                i18nKey: "ui.guest_sign_up_notification.heading",
                useStateTranslations: !0,
              })
            )
          ),
          r.createElement(
            "div",
            { className: (0, l.c)("notification__message") },
            n.settings.message
          ),
          r.createElement(
            "div",
            { className: (0, l.c)("notification__action") },
            r.createElement(
              "a",
              {
                className: (0, l.c)(
                  "notification__action-button",
                  "action-button"
                ),
                rel: "noopener noreferrer",
                href: a,
                onClick: () => u("signup"),
                "data-testid": "notification-signup-button",
              },
              r.createElement(o.N, {
                i18nKey: "ui.guest_sign_up_notification.sign_up",
                useStateTranslations: !0,
              })
            ),
            r.createElement(
              "a",
              {
                className: (0, l.c)(
                  "notification__action-button",
                  "action-button",
                  "action-button--neutral"
                ),
                rel: "noopener noreferrer",
                href: s,
                onClick: () => u("login"),
              },
              d
                ? r.createElement(o.N, {
                    i18nKey: "sdk.integrated_page.welcome_guest.log_in",
                    useStateTranslations: !0,
                  })
                : r.createElement(o.N, {
                    i18nKey: "ui.splash.login",
                    useStateTranslations: !0,
                  })
            )
          )
        );
      };
      var N = n(4856),
        C = n(8847),
        T = n(5627),
        x = n(5170),
        P = n(476),
        $ = n(5810),
        I = n(7665),
        S = n(6355),
        K = n(8933),
        A = n(1635),
        M = n(6363),
        q = n(3203);
      const R = (e) => {
          let { type: t, href: n, target: i, onClick: a } = e;
          return r.createElement(
            "a",
            (0, K.Z)(
              {},
              { onClick: a, href: n, target: i },
              {
                rel: "noopener noreferrer",
                className: (0, l.ok)(
                  "referral-share__button",
                  `referral-share__button--${t}`
                ),
              }
            )
          );
        },
        H = (e) => {
          let { data: t, className: n, onClick: i } = e;
          return r.createElement("a", {
            onClick: () => {
              (0, $.v_)(t) && (i?.(), navigator.share(t));
            },
            rel: "noopener noreferrer",
            className: (0, l.ok)(
              "referral-share__button",
              "referral-share__button--native-share"
            ).concat(` ${n}`),
          });
        },
        Z = (e) => {
          let { notification: t, referralUrls: n } = e;
          const a = (0, i.I0)(),
            o = (0, i.v9)(s.vD),
            l = (0, i.v9)(g._o),
            c = (0, q.L)(n.twitter, l),
            d = (0, q.ll)(n.whatsapp, l),
            u = (e) => (r) => {
              if (o)
                return (
                  r.preventDefault(),
                  void r.nativeEvent.stopImmediatePropagation()
                );
              (0, v.m)({
                site_notification_id: t.id,
                site_notification_kind: t.kind,
                cta_clicked: `share_${e}`,
              }),
                "facebook" === e && a((0, A.yp)("share", n.facebook));
            };
          return r.createElement(
            r.Fragment,
            null,
            r.createElement(R, {
              href: c,
              type: "twitter",
              target: "_blank",
              onClick: u("twitter"),
            }),
            r.createElement(R, { type: "facebook", onClick: u("facebook") }),
            r.createElement(R, {
              href: d,
              type: "whatsapp",
              target: "_blank",
              onClick: u("whatsapp"),
            })
          );
        },
        O = (e) => {
          let { notification: t, referralUrls: n } = e;
          const a = (0, i.I0)(),
            o = (0, i.v9)(M.T7).sdkState,
            l = (0, i.v9)(M._W),
            c = (0, i.v9)(s.vD);
          return (
            (0, r.useEffect)(
              () => (
                "initial" === o && a((0, A.kD)("share")),
                () => {
                  "ready" === o && a((0, A.mC)("initial"));
                }
              ),
              [a, o]
            ),
            (0, r.useEffect)(
              () => (
                "initial" === l && a((0, A.Wx)()),
                () => {
                  "ready" === l && a((0, A.ql)("initial"));
                }
              ),
              [a, l]
            ),
            c || ("ready" === o && "ready" === l)
              ? r.createElement(Z, { referralUrls: n, notification: t })
              : null
          );
        };
      var D = n(2342);
      const B = (e) => {
          let { referralRule: t } = e;
          const n = (0, i.v9)(N.pb),
            a = (0, i.v9)(g.j),
            s = (0, i.v9)(x.HO),
            l = (0, P.t)("ui.general.points_count_raw", {
              smart_count: t.value,
            }),
            c = (0, I.pY)(a, s, t.properties.qualifyingPurchaseAmount);
          if (!n)
            return r.createElement(o.N, {
              i18nKey: "ui.referral_popup.intro_no_offer",
              params: { points: l, amount: c },
              useStateTranslations: !0,
            });
          switch (n.kind) {
            case "cart_discount": {
              const e = (0, S.Q)({
                incentive: n,
                currency: a,
                localCurrency: s,
              });
              return r.createElement(o.N, {
                i18nKey: "ui.referral_popup.intro_with_offer",
                params: { points: l, discount: e, amount: c },
                useStateTranslations: !0,
              });
            }
            case "free_shipping":
              return r.createElement(o.N, {
                i18nKey: "ui.referral_popup.intro_free_shipping_offer",
                params: { points: l, amount: c },
                useStateTranslations: !0,
              });
          }
        },
        F = (e) => {
          let { notification: t } = e;
          const n = (0, i.I0)(),
            c = (0, i.v9)(g.gh),
            d = (0, i.v9)(u.eD),
            m = (0, i.v9)(s.vD),
            p = (0, i.v9)(T.Fx),
            _ = (0, i.v9)((e) => (c?.id ? (0, C.$)(e, c.id) : null));
          if (!c || !_ || !p) return null;
          const h = { url: _.device_share },
            k = () => {
              (0, v.m)({
                cta_clicked: "share_direct",
                site_notification_kind: c.kind,
                site_notification_id: c.id,
              });
            },
            w = d && (m || (0, $.v_)(h));
          return r.createElement(
            f,
            {
              notification: t,
              onCloseClick: () =>
                (0, v.m)({
                  cta_clicked: "close",
                  site_notification_kind: c.kind,
                  site_notification_id: c.id,
                }),
            },
            r.createElement(
              "div",
              { className: (0, l.ok)("notification__header") },
              r.createElement(
                "div",
                { className: (0, l.ok)("notification__title") },
                r.createElement(o.N, {
                  i18nKey: "sdk.referral_prompt_short",
                  useStateTranslations: !0,
                })
              )
            ),
            r.createElement(
              "div",
              { className: (0, l.ok)("notification__message") },
              r.createElement(B, { referralRule: p })
            ),
            r.createElement(
              "div",
              { className: (0, l.ok)("notification__row") },
              r.createElement("input", {
                className: (0, l.ok)("notification__row-input"),
                disabled: !0,
                type: "text",
                value: _.direct,
                onCopy: k,
              }),
              r.createElement(D.m, {
                className: (0, l.ok)("notification__row-button"),
                clipboardText: _.direct,
                onClick: k,
              }),
              w &&
                r.createElement(H, {
                  className: (0, l.ok)("notification__row-button"),
                  data: h,
                  onClick: () => {
                    (0, v.m)({
                      cta_clicked: "share_device_share",
                      site_notification_kind: c.kind,
                      site_notification_id: c.id,
                    }),
                      n((0, a.no)(t.id));
                  },
                })
            ),
            !d &&
              r.createElement(
                "div",
                { className: (0, l.ok)("notification__action") },
                r.createElement(O, { referralUrls: _, notification: c })
              )
          );
        };
      var U = n(5833),
        L = n(8979),
        z = n(4895),
        j = n(70),
        V = n(876);
      const G = "notification-rewards-list",
        Y = (e) => {
          let { customer: t, maxRewardsToShow: n, onClaim: a } = e;
          const o = (0, i.v9)((e) => (0, L.a)(e, t))
            .sort((e, t) => {
              let { point_cost: n } = e,
                { point_cost: r } = t;
              return r - n;
            })
            .slice(0, n);
          return r.createElement(
            r.Fragment,
            null,
            o.map((e) =>
              r.createElement(
                r.Fragment,
                { key: e.id },
                r.createElement(Q, { onClaim: a, rewardId: e.id, customer: t })
              )
            )
          );
        },
        Q = (e) => {
          let { rewardId: t, customer: n, onClaim: o } = e;
          const s = (0, i.I0)(),
            c = z.T.must((0, i.v9)((e) => (0, L.n)(e, t))),
            d = "integrated",
            u = (0, l.KP)("reward-item", d);
          return r.createElement(
            l.QB.Provider,
            { value: d },
            r.createElement(
              l.Qj.Provider,
              { value: u },
              r.createElement(
                "div",
                {
                  className: (0, l.c)(`${G}__item`),
                  "data-testid": "reward-item",
                },
                r.createElement(
                  "div",
                  { className: (0, l.c)(`${G}__content`) },
                  r.createElement(W, { reward: c }),
                  r.createElement(J, { reward: c })
                ),
                r.createElement(
                  "div",
                  { className: (0, l.c)(`${G}__action`) },
                  r.createElement(V.X, {
                    reward: c,
                    customer: n,
                    disabled: !1,
                    onClick: () => {
                      o(), s((0, j.d3)(c.id)), s((0, a.L1)());
                    },
                  })
                )
              )
            )
          );
        },
        W = (e) => {
          let { reward: t } = e;
          return r.createElement(
            "div",
            { className: (0, l.c)(`${G}__title`) },
            t.title
          );
        },
        J = (e) => {
          let { reward: t } = e;
          return r.createElement(o.o.span, {
            className: (0, l.c)(`${G}__cost`),
            i18nKey: "ui.general.points_count",
            params: { smart_count: t.point_cost },
            useStateTranslations: !0,
          });
        },
        X = () => {
          const e = "panel" === (0, l.On)();
          return r.createElement("hr", {
            className: (0, l.ok)(
              "notification__divider",
              e && "notification__divider--panel"
            ),
          });
        },
        ee = (e) => {
          let { notification: t } = e;
          const n = (0, i.v9)(U._V),
            a = (0, i.v9)(g.sY);
          if (!n || !a) return null;
          const o = (e) =>
            (0, p.IU)({
              customer: n,
              ctaClicked: e,
              siteNotificationKind: a.kind,
              siteNotificationId: a.id,
            });
          return r.createElement(
            f,
            {
              onClick: () => o("other"),
              onCloseClick: () => o("close"),
              notification: t,
            },
            r.createElement(te, { customer: n, notificationConfig: a }),
            r.createElement(X, null),
            r.createElement(Y, {
              customer: n,
              maxRewardsToShow: a.settings.maxRewardsToShow,
              onClaim: () => o("claim"),
            }),
            r.createElement(ne, { trackClick: () => o("see_all_rewards") })
          );
        },
        te = (e) => {
          let { customer: t, notificationConfig: n } = e;
          return r.createElement(
            "div",
            { className: (0, l.ok)("notification__reward-message") },
            (function (e, t) {
              const n = /\{\{\s*([^}{ ]+)\s*\}\}/;
              let r = e;
              for (;;) {
                const e = r.match(n);
                if (null === e) break;
                const i = e[0],
                  a = t[e[1]];
                r = r.replace(i, a ? `${a}` : "");
              }
              return r;
            })(n.settings.message, { points: (0, P.uf)(t.pointsApproved) })
          );
        },
        ne = (e) => {
          let { trackClick: t } = e;
          const n = (0, i.v9)(w.sM),
            a = (0, i.v9)(s.vD);
          return n
            ? r.createElement(
                r.Fragment,
                null,
                r.createElement(X, null),
                r.createElement(
                  "div",
                  {
                    onClick: t,
                    className: (0, l.ok)("notification__footer-link"),
                  },
                  r.createElement(
                    o.o.a,
                    (0, K.Z)({}, a ? {} : { href: n }, {
                      i18nKey: "sdk.see_available_rewards",
                      style: { cursor: "pointer" },
                      useStateTranslations: !0,
                    })
                  )
                )
              )
            : null;
        },
        re = r.memo((e) => {
          let { notification: t } = e;
          switch (t.kind) {
            case "point":
            case "tier":
              return r.createElement(k, { notification: t });
            case "guest_introduction":
              return r.createElement(_, { notification: t });
            case "post_purchase_referral":
              return r.createElement(F, { notification: t });
            case "post_purchase_signup":
              return r.createElement(b, { notification: t });
            case "reward_redemption":
              return r.createElement(ee, { notification: t });
          }
        });
      re.displayName = "NotificationItem";
    },
    876: (e, t, n) => {
      n.d(t, { X: () => c });
      var r = n(8933),
        i = n(7689),
        a = n(4787),
        o = n(6087),
        s = n(7307),
        l = n(705);
      const c = (e) => {
        let { reward: t, customer: n, disabled: c, onClick: d } = e;
        const u = (0, s.On)(),
          m = (0, s.VG)(),
          p = (0, o.T)(),
          f = (e) => {
            let { children: t, i18nKey: n, params: o } = e;
            const f = i.createElement(
              l.si,
              (0, r.Z)(
                { disabled: Boolean(c) },
                "legacy" === p || "panel" === u
                  ? {
                      className: (0, s.c)(
                        `${m}__redeem-button`,
                        c && `${m}__redeem-button--disabled`
                      ),
                    }
                  : {},
                { testId: "redeem-reward-button", onClick: c ? void 0 : d }
              ),
              i.createElement(a.o.span, {
                i18nKey: n,
                params: o,
                useStateTranslations: !0,
                className: (0, s.c)(
                  `${m}__redeem-button-text`,
                  "integrated" === u &&
                    "loyalty-page-reward-item__redeem-button-text"
                ),
              }),
              t
            );
            return "modern" === p
              ? i.createElement(
                  "div",
                  { className: (0, s.c)(`${m}__actions`) },
                  f
                )
              : f;
          };
        if ("checkout_redemption" === t.kind) return null;
        if (!c || "other" === c)
          return i.createElement(f, {
            i18nKey: "ui.dashboard.redeem_points.get_reward",
          });
        switch (c) {
          case "already_redeemed":
            return i.createElement(f, {
              i18nKey: "sdk.seamless_product_reward.already_redeemed",
            });
          case "out_of_stock":
            return i.createElement(f, {
              i18nKey: "ui.dashboard.redeem_points.out_of_stock",
            });
          case "paid_items_required":
            return i.createElement(f, {
              i18nKey: "sdk.seamless_product_reward.paid_items_required",
            });
          case "not_subscriber":
            return i.createElement(f, {
              i18nKey:
                "ui.dashboard.redeem_points.recharge_subscription_required",
            });
          case "insufficient_points":
            return i.createElement(
              f,
              {
                i18nKey: "ui.dashboard.redeem_points.more_points_needed",
                params: { total_cost: t.point_cost },
              },
              i.createElement("div", {
                className: (0, s.c)(`${m}__fill`),
                style: {
                  width: (n.pointsRedeemable / t.point_cost) * 100 + "%",
                },
              })
            );
        }
      };
    },
    705: (e, t, n) => {
      n.d(t, { aI: () => u, si: () => d, zx: () => c });
      var r = n(8933),
        i = n(9803),
        a = n.n(i),
        o = n(7689),
        s = n(6087),
        l = n(7307);
      const c = (e) => {
          let {
            children: t,
            disabled: n = !1,
            completed: i = !1,
            loading: s = !1,
            href: c,
            onClick: d,
            className: u,
            testId: m,
            tag: p = "button",
            style: f = "normal",
          } = e;
          const _ = {
            className: a()(
              (0, l.c)("action-button", `action-button--${f}`, {
                "action-button--disabled": n,
                "action-button--completed": i,
                "action-button--loading": s,
              }),
              u
            ),
            ...(m ? { "data-testid": m } : {}),
          };
          if (c || "a" === p)
            return o.createElement("a", (0, r.Z)({ href: c }, _), t);
          const h = {
            onClick: (e) => {
              e.preventDefault(), d && !n && !s && d();
            },
            ..._,
          };
          return "button" === p
            ? o.createElement("button", (0, r.Z)({}, h), t)
            : o.createElement("div", (0, r.Z)({}, h), t);
        },
        d = (e) => {
          const t = (0, s.T)(),
            n = (0, l.On)();
          return o.createElement(
            c,
            (0, r.Z)(
              {
                style: "integrated" === n ? "tile" : "primary",
                tag: "legacy" === t ? "div" : "button",
              },
              e
            )
          );
        },
        u = (e) => {
          let { limitReached: t, className: n = "", ...i } = e;
          const a = [
            n,
            "legacy" === (0, s.T)()
              ? (0, l.c)({
                  "rule-item__button": !0,
                  "rule-item__button--completed": i.completed,
                  "rule-item__button--disabled": i.disabled,
                  "rule-item__button--limit-reached": t,
                })
              : "",
          ]
            .join(" ")
            .trim();
          return o.createElement(
            d,
            (0, r.Z)({ className: a, testId: "rule-item-button" }, i)
          );
        };
    },
    2342: (e, t, n) => {
      n.d(t, { m: () => d });
      var r = n(9803),
        i = n.n(r),
        a = n(3863),
        o = n.n(a),
        s = n(7689),
        l = n(7307),
        c = n(4004);
      class d extends s.Component {
        async copyText(e) {
          let t = "error";
          await o()(e)
            .then(() => {
              this.props.onClick?.(), (t = "success");
            })
            .catch(() => {
              t = "error";
            });
          const n = [(0, l.ok)(`copy-to-clipboard-button--${t}`)];
          this.props.className && n.push(`${this.props.className}--${t}`),
            this.ref.current &&
              (this.ref.current.classList.add(...n),
              "number" == typeof this.clickClassTimeout &&
                window.clearTimeout(this.clickClassTimeout),
              (this.clickClassTimeout = window.setTimeout(() => {
                this.ref.current?.classList.remove(...n);
              }, 1500)));
        }
        render() {
          return s.createElement("button", {
            ref: this.ref,
            className: i()(
              (0, l.ok)("copy-to-clipboard-button"),
              this.props.className ?? ""
            ),
            onClick: () => {
              this.copyText(this.props.clipboardText).catch((e) =>
                c.k.error("failed to copy text", { err: e })
              );
            },
            title: "Copy to clipboard",
          });
        }
        constructor(e) {
          super(e), (this.ref = s.createRef());
        }
      }
    },
    6166: (e, t, n) => {
      n.d(t, { S: () => c });
      var r = n(7689),
        i = n(6030),
        a = n(4004),
        o = n(4787);
      const s = () => r.createElement(o.N, { i18nKey: "ui.general.error" });
      class l extends r.Component {
        componentDidCatch(e, t) {
          this.setState({ hasError: !0 }),
            a.k.error(`Error in React Tree: ${e.name}: ${e.message}`, {
              err: e,
              componentStack: t.componentStack,
              state: this.props.state,
            });
        }
        render() {
          return this.state.hasError
            ? void 0 === this.props.renderIfError
              ? r.createElement(s, null)
              : this.props.renderIfError
            : this.props.children;
        }
        constructor(e) {
          super(e), (this.state = { hasError: !1 });
        }
      }
      l.displayName = "ErrorBoundary";
      const c = (0, i.$j)((e) => ({ state: e }))(l);
    },
    8094: (e, t, n) => {
      n.d(t, { O: () => s });
      var r = n(8933),
        i = n(7689),
        a = n(2157),
        o = n(6043);
      const s = (e) => {
        let { element: t, elementsProps: n = {}, children: s } = e;
        const l = a._Z[t.type],
          c = n[t.type],
          d = (0, o.g4)(t),
          u = { ...c, ...d, style: { ...c?.style, ...d.style } };
        return i.createElement(l, (0, r.Z)({}, u), s);
      };
    },
    7759: (e, t, n) => {
      n.d(t, { t: () => o });
      var r = n(8933),
        i = n(7689),
        a = n(2157);
      const o = (e) => {
        let { text: t, textsProps: n = {}, children: o } = e;
        const s = a.fk.reduce((e, o) => {
          if (o in t) {
            const t = a.DM[o],
              s = n[o];
            return i.createElement(t, (0, r.Z)({}, s), e);
          }
          return e;
        }, o);
        return i.createElement(i.Fragment, null, s);
      };
    },
    2157: (e, t, n) => {
      n.d(t, { DM: () => i, _Z: () => a, fk: () => r });
      const r = ["bold", "italic"],
        i = { bold: "strong", italic: "em" },
        a = {
          "heading-one": "h1",
          "heading-two": "h2",
          "bulleted-list": "ul",
          "numbered-list": "ol",
          "list-item": "li",
          link: "a",
          paragraph: "p",
        };
    },
    6043: (e, t, n) => {
      n.d(t, { BM: () => i, g4: () => r });
      n(8274);
      function r(e) {
        const t = {};
        return (
          "link" === e.type &&
            ((t.href = e.url), (t.target = e.openInNewTab ? "_blank" : void 0)),
          e.align && (t.style = { textAlign: e.align }),
          t
        );
      }
      function i(e) {
        return "text" in e && "string" == typeof e.text;
      }
      Error;
    },
    6087: (e, t, n) => {
      n.d(t, { T: () => a });
      var r = n(6030),
        i = n(6231);
      function a() {
        return (0, r.v9)(i._);
      }
    },
    9341: (e, t, n) => {
      n.d(t, { J: () => o, K: () => a });
      var r = n(208),
        i = n(1667);
      const a = (e) => e.app.themeManifest,
        o = (0, r.P1)(i.l$, i.qb, (e, t) =>
          e ? "turnkey" : t.createdByMerchant ? "integrated-page" : "legacy"
        );
    },
    8847: (e, t, n) => {
      n.d(t, { $: () => o, i: () => a });
      var r = n(208),
        i = n(5833);
      const a = (0, r.P1)(i.H5, (e) => e.referralUrls),
        o = (0, r.P1)(
          (e, t) => t,
          i._V,
          (e, t) => t?.notificationReferralUrls[e] ?? null
        );
    },
    6231: (e, t, n) => {
      n.d(t, { _: () => o });
      var r = n(208),
        i = n(6460),
        a = n(3524);
      const o = (0, r.P1)(a.IH, i.G, (e, t) => {
        if (t.useThemeOverride) return t.useThemeOverride;
        const n = e?.settings.sdkTheme ?? "legacy";
        return "default" === n ? "legacy" : n;
      });
    },
    8318: (e, t, n) => {
      n.d(t, {
        Au: () => y,
        By: () => T,
        F9: () => x,
        HO: () => C,
        cg: () => u,
        dY: () => b,
        eS: () => N,
      });
      n(8274);
      var r = n(208),
        i = n(7290),
        a = n(4004),
        o = n(476),
        s = n(5833),
        l = n(4856),
        c = n(8788),
        d = n(5627);
      const u = (0, r.P1)(l.LI, (e) => e.loyaltyTierBenefits);
      function m(e, t) {
        return Math.ceil(
          Math.max(0, e.bounds.lower - (t.loyaltyTierEligibleSpend ?? 0)) / 100
        );
      }
      function p(e, t) {
        return e.bounds.lower - (t.loyaltyTierEligiblePoints ?? 0);
      }
      function f(e, t) {
        return e.bounds.upper
          ? (e.bounds.upper + 1 - (t.loyaltyTierEligibleSpend ?? 0)) / 100
          : null;
      }
      function _(e, t) {
        return e.bounds.upper
          ? e.bounds.upper + 1 - (t.loyaltyTierEligiblePoints ?? 0)
          : null;
      }
      function h(e, t, n, r) {
        if (!e.bounds.upper || !r) return null;
        const i = (() => {
          switch (n) {
            case "points":
              return null === t.loyaltyTierEligiblePoints
                ? null
                : Math.max(
                    (t.loyaltyTierEligiblePoints - e.bounds.lower) /
                      (e.bounds.upper - e.bounds.lower),
                    0
                  );
            case "spend":
              return null === t.loyaltyTierEligibleSpend
                ? null
                : Math.max(
                    (t.loyaltyTierEligibleSpend - e.bounds.lower) /
                      (e.bounds.upper - e.bounds.lower),
                    0
                  );
          }
        })();
        return "number" == typeof i && i > 1
          ? (a.k.error(
              "Invalid tiers progress calculation: should be in next tier",
              { tier: e, customer: t, tiersMode: n, isCurrent: r, progress: i }
            ),
            null)
          : i;
      }
      function k(e) {
        return e?.loyaltyTierMembership?.expiresAt
          ? (0, o.p6)(new Date(e.loyaltyTierMembership.expiresAt))
          : null;
      }
      function v(e, t) {
        return t.reduce((t, n) => {
          const r = e.find((e) => e.rewardId === n.id);
          return r ? [...t, { ...r, reward: n }] : t;
        }, []);
      }
      function g(e, t) {
        return e
          .reduce((e, n) => {
            const r = t.find((e) => e.id === n.ruleId);
            return r ? [...e, { ...n, rule: r }] : e;
          }, [])
          .sort((e, t) =>
            e.rule.sortKey && t.rule.sortKey
              ? 0 + e.rule.sortKey - t.rule.sortKey
              : e.rule.id - t.rule.id
          );
      }
      const w = (0, r.P1)(
          c.O5,
          d.qw,
          l.ll,
          s.cQ,
          u,
          s._V,
          l.SN,
          (e, t, n, r, i, a, o) =>
            n
              .slice()
              .sort((e, t) => e.position - t.position)
              .map((n) => {
                const s = !!r && n.id === r.id;
                return {
                  ...n,
                  number: n.position + 1,
                  rewardOverrides: v(n.rewardOverrides, e),
                  ruleOverrides: g(n.ruleOverrides, t),
                  benefits: i.filter((e) => e.loyaltyTierIds.includes(n.id)),
                  expiresAt: s ? k(a) : null,
                  isCurrent: s,
                  isNext: !!r && n.position > r.position,
                  isPrevious: !!r && n.position < r.position,
                  progressToNextTier: a ? h(n, a, o.loyaltyTiersMode, s) : null,
                  neededPoints: a ? p(n, a) : 0,
                  neededSpend: a ? m(n, a) : 0,
                  pointsToNextTier: a ? _(n, a) : 0,
                  spendToNextTier: a ? f(n, a) : 0,
                };
              })
        ),
        E = (0, r.P1)(l.qH, (e) => !!e && e.settings.loyaltyTiersEnabled),
        y = (0, r.P1)(E, l.ll, (e, t) => {
          const n = t.filter((e) => !e.hidden).length;
          if (1 === n) throw new Error("There is only one visible tier");
          return e && n > 0;
        }),
        b = (0, r.P1)(l.ll, (e) => e.map((e) => e.id)),
        N = (0, r.P1)(l.ll, s.mU, (e, t) =>
          e.filter((e) => !e.hidden || e.id === t).map((e) => e.id)
        ),
        C = (0, r.P1)(N, w, (e, t) => t.filter((t) => e.includes(t.id))),
        T = (0, i.B)(
          (e, t) => t,
          w,
          (e, t) => t.find((t) => t.id === e) ?? null
        ),
        x = (0, r.P1)(
          (e, t) => t,
          w,
          (e, t) => {
            const n = t.findIndex((t) => t.id === e);
            return t[n + 1] || null;
          }
        );
    },
    6233: (e, t, n) => {
      n.d(t, { M: () => c, k: () => d });
      n(8274);
      var r = n(4494);
      function i(e) {
        return e.replace(/([_][a-z])/gi, (e) =>
          e.toUpperCase().replace("_", "")
        );
      }
      var a = n(70),
        o = n(5571),
        s = n(2307),
        l = n(5833);
      function c(e, t) {
        return {
          ...((n = e), (0, r.mZ)(n, i)),
          setCanBeApplied: (n) => {
            if ("boolean" != typeof n)
              throw new TypeError("canBeApplied must be a boolean");
            t.dispatch((0, a.rB)({ id: e.id, canBeApplied: n }));
          },
          setApplied: (n) => {
            if ("boolean" != typeof n)
              throw new TypeError("applied must be a boolean");
            t.dispatch(
              (0, a.Ro)({
                id: e.id,
                applyResult: n ? { status: "success" } : null,
              })
            );
          },
        };
        var n;
      }
      function d(e) {
        return async function () {
          let {
            limit: t,
            hideUsed: n,
            hideVoid: r,
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          const i = e.getState(),
            a = (0, l._V)(i);
          if (!a) throw new s.G("Fetching claimed rewards requires customer");
          return a.claimedRewards
            .slice(0, t || a.claimedRewards.length)
            .filter((e) => !n || !(0, o.rk)(e))
            .filter((e) => !n || !(0, o.RP)(e))
            .filter((e) => !r || !("void" === e.state))
            .map((t) => c(t, e));
        };
      }
    },
    3418: (e, t, n) => {
      function r(e) {
        return e.replace(/([a-z])_([a-z])/g, "$1-$2").toLowerCase();
      }
      function i(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function a(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }
      n.d(t, { Kh: () => i, ST: () => r, fp: () => a });
    },
    7664: (e, t, n) => {
      function r() {}
      n.d(t, { Z: () => r });
    },
    6355: (e, t, n) => {
      n.d(t, { Q: () => i });
      var r = n(7665);
      function i(e) {
        let { incentive: t, currency: n, localCurrency: i } = e;
        switch (t.discountKind) {
          case "flat":
            return (0, r.pY)(n, i, t.discountAmount);
          case "percentage":
            return `${t.discountAmount}%`;
        }
      }
    },
  },
]);
