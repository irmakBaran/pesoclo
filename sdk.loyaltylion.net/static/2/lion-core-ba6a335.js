"use strict";
(self.webpackChunk_loyaltylion_tonks =
  self.webpackChunk_loyaltylion_tonks || []).push([
  [479],
  {
    7554: (e, t, r) => {
      var i = r(10).compose;
      t.Uo = function () {
        if (0 !== arguments.length)
          return "object" == typeof arguments[0] ? i : i.apply(null, arguments);
      };
    },
    8846: (e, t, r) => {
      t.Cq = void 0;
      var i = r(10),
        n = function () {
          var e = [],
            t = [],
            r = void 0;
          return {
            enhancer: function (e) {
              return (
                (r = e),
                function (e) {
                  return function (r) {
                    return i.compose.apply(void 0, t)(e)(r);
                  };
                }
              );
            },
            addMiddleware: function () {
              for (
                var i, n, o = arguments.length, s = Array(o), a = 0;
                a < o;
                a++
              )
                s[a] = arguments[a];
              (i = t).push.apply(
                i,
                s.map(function (e) {
                  return e(r);
                })
              ),
                (n = e).push.apply(n, s);
            },
            removeMiddleware: function (r) {
              var i = e.findIndex(function (e) {
                return e === r;
              });
              -1 !== i
                ? ((e = e.filter(function (e, t) {
                    return t !== i;
                  })),
                  (t = t.filter(function (e, t) {
                    return t !== i;
                  })))
                : console.error("Middleware does not exist!", r);
            },
            resetMiddlewares: function () {
              (t = []), (e = []);
            },
          };
        },
        o = n();
      t.ZP = o.enhancer;
      var s = o.addMiddleware,
        a = o.removeMiddleware,
        c = o.resetMiddlewares;
      t.Cq = s;
    },
    6205: (e, t, r) => {
      r.d(t, { j: () => n });
      var i = r(9532);
      const n = () => (0, i.PH)("[modals] clear");
    },
    2138: (e, t, r) => {
      r.d(t, {
        $s: () => l,
        BW: () => u,
        av: () => a,
        nX: () => c,
        xN: () => d,
      });
      var i = r(9532),
        n = r(4421),
        o = r(9183),
        s = r(476);
      const a = (e) =>
          (0, i.PH)("[referral widget] set email form values", { values: e }),
        c = () => (0, i.PH)("[referral widget] submit email form request"),
        l = () => (0, i.PH)("[referral widget] submit email form request ok"),
        d = () =>
          (0, i.PH)("[referral widget] submit email form request reset"),
        u = (e) => async (t, r) => {
          t(c()), (0, o.kU)({ location: "email" });
          const i = n.H.buildFromState(r(), t),
            a = await i.referrals.sendEmail(e);
          if ("error" in a)
            return (
              alert(
                409 === a.error.status
                  ? (0, s.t)("ui.referral_popup.duplicate_email")
                  : a.error.message ??
                      "Sorry, something went wrong. Please try again in a moment"
              ),
              void t(d())
            );
          t(l());
        };
    },
    70: (e, t, r) => {
      r.d(t, {
        AG: () => P,
        Aj: () => C,
        Fc: () => T,
        Ge: () => I,
        Kh: () => A,
        Ki: () => b,
        N4: () => L,
        Ro: () => q,
        WH: () => _,
        YD: () => v,
        bn: () => S,
        d3: () => k,
        hB: () => M,
        l: () => H,
        ql: () => F,
        rB: () => E,
        vF: () => O,
        zS: () => R,
      });
      var i = r(9532),
        n = r(4421),
        o = r(2307),
        s = r(6840),
        a = r(7365),
        c = r(8788),
        l = r(3524),
        d = r(2690),
        u = r(6233),
        p = r(4263),
        h = r(481),
        m = r(9121),
        g = r(5273),
        f = r(906),
        y = r(5172),
        w = r(686);
      const k = (e) =>
          (0, i.PH)("[rewards] open reward redeem modal", { id: e }),
        v = (e) =>
          (0, i.PH)("[rewards] open reward description modal", { id: e }),
        b = () => (0, i.PH)("[rewards] close reward description modal"),
        S = (e) => (0, i.PH)("[rewards] redeem request", { id: e }),
        R = (e) => (0, i.PH)("[rewards] redeem reward request success", e),
        C = (e) =>
          (0, i.PH)("[rewards] redeem free product reward request success", {
            id: e,
          }),
        P = (e) =>
          (0, i.PH)(
            "[rewards] redeem subscription buy with points reward request success",
            e
          ),
        _ = (e) => (0, i.PH)("[rewards] redeem reward request error", e),
        A = (e) =>
          (0, i.PH)("[rewards] redeem reward request reset", { id: e }),
        I = (e) => (0, i.PH)("[rewards] apply claimed request", { id: e }),
        M = (e) =>
          (0, i.PH)("[rewards] apply claimed reward request reset", { id: e }),
        E = (e) => (0, i.PH)("[rewards] set claimed reward can be applied", e),
        q = (e) => (0, i.PH)("[rewards] set claimed reward apply result", e),
        F = () => (0, i.PH)("[rewards] finish closing reward redeem modal"),
        T = () => (0, i.PH)("[rewards] start closing reward redeem modal"),
        H = () => async (e) => {
          e(T()), await (0, h._v)(f.A), e(F());
        },
        O = (e) => {
          let { rewardId: t } = e;
          return async (e, r) => {
            const i = r();
            if (null !== (0, y.rq)(i)) return;
            e(S(t));
            const h = i.customer;
            if (!h) throw new o.G("Claiming reward requires customer");
            const f = h.id,
              w = (0, a.Wu)(i) ?? void 0,
              k = {
                customerId: f,
                attribution: (0, m.OY)(h.merchantId),
                emailTrackingId: w,
                rewardId: t,
              },
              v = n.H.buildFromState(i, e),
              b = (0, c.kL)(i, t);
            if (!b) throw new s.w("Claiming a reward requires a reward");
            const C = await v.customers.claimReward(k);
            if ("error" in C)
              e(_({ error: { name: C.error.message ?? C.error.type }, id: t }));
            else {
              "product_discount_voucher" !== b.kind ||
                "shopify" !== (0, l.O2)(i) ||
                (0, p.vD)(i) ||
                (await (0, g.RA)(b, e, r)),
                (0, g.Oz)(h, b),
                e(R({ action: C.action, id: t }));
              "hide_claim_modal" ===
                (
                  await (0, d.f1)("customers.rewards.claimed", {
                    claimedReward: (0, u.M)(C.claimedReward, {
                      dispatch: e,
                      getState: r,
                    }),
                  })
                )?.action && e(H());
            }
          };
        },
        L = (e) => async (t, r) => {
          t(I(e.id));
          const i = (0, u.M)(e, { dispatch: t, getState: r }),
            n = await (0, d.f1)("customers.rewards.apply_claimed", {
              claimedReward: i,
            });
          n && "hide_claimed_reward_modal" === n.action && t((0, w.dP)()),
            n || t(q({ id: e.id, applyResult: null }));
        };
    },
    9262: (e, t, r) => {
      r.d(t, { Sp: () => m, k: () => h, lk: () => l, y2: () => p });
      var i = r(9532),
        n = r(4421),
        o = r(4401),
        s = r(4004),
        a = r(9937),
        c = r(2209);
      const l = {
          setReady: () => (
            s.k.debug("[checkoutRedemptionActions] setReady"),
            (0, i.PH)("[checkout redemption] ready")
          ),
          setInputMode: (e) =>
            (0, i.PH)("[checkout redemption] set input mode", { mode: e }),
          setEligibleTotalForDiscount: (e) =>
            (0, i.PH)("[checkout redemption] set eligible total for discount", {
              price: e,
            }),
          setRedemptionClaiming: () =>
            (0, i.PH)("[checkout redemption] redemption applying"),
          setRedemptionApplying: (e) =>
            (0, i.PH)("[checkout redemption] redemption submitted", {
              voucher: e,
            }),
          setRedemptionRemoving: () =>
            (0, i.PH)("[checkout redemption] redemption removing"),
          setRedemptionRemoved: () =>
            (0, i.PH)("[checkout redemption] redemption removed"),
          setError: (e) =>
            (0, i.PH)("[checkout redemption] set error", { error: e }),
          setRedemptionValue: (e) =>
            (0, i.PH)("[checkout redemption] set redemption value", {
              amount: e,
            }),
          setShopifyCheckoutToken: (e) =>
            (0, i.PH)("[checkout redemption] set shopify checkout token", {
              token: e,
            }),
          setRedemptionApplied: (e) =>
            (0, i.PH)("[checkout redemption] redemption applied", {
              voucher: e,
            }),
          setHasSubscriptionAppInstalled: () =>
            (0, i.PH)(
              "[checkout redemption] set has subscription app installed"
            ),
        },
        d = l;
      function u(e) {
        return {
          pointsApproved: e.points_approved,
          pointsPending: e.points_pending,
          pointsReserved: e.points_reserved,
          pointsSpent: e.points_spent,
        };
      }
      const p = (e, t) => async (r, i) => {
          const s = n.H.buildFromState(i(), r),
            a = await s.customers.cancelCheckoutDiscount(e, t);
          return "error" in a
            ? (r(d.setError(a.error)), !1)
            : (r((0, o.pD)(u(a.customer))), !0);
        },
        h = () => (e, t) => {
          const { id: r } = (0, c.t9)(t());
          r && (e(d.setRedemptionRemoving()), (0, a.v$)());
        },
        m = () => async (e, t) => {
          e(d.setRedemptionClaiming());
          const r = n.H.buildFromState(t(), e),
            i = (0, c.cG)(t()),
            s = (0, c.NX)(t()),
            h = (0, c.hM)(t());
          if (!s) return;
          e(l.setRedemptionValue(s));
          const m = await r.customers.redeemCheckoutDiscount(
            s,
            i.shopifyCheckoutToken,
            h
          );
          if ("error" in m) e(d.setError(m.error));
          else {
            e((0, o.pD)(u(m.customer)));
            try {
              e(
                d.setRedemptionApplying({
                  id: m.claimedReward.id,
                  code: m.claimedReward.code,
                })
              ),
                (0, a.iO)(m.claimedReward.code),
                setTimeout(() => {
                  const {
                    voucher: { isApplying: r },
                  } = (0, c.cG)(t());
                  r &&
                    e(
                      p(
                        m.claimedReward.id,
                        (0, a.IH)() ? "slider_conflict" : "slider_timeout"
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
    906: (e, t, r) => {
      r.d(t, { A: () => c, u: () => l });
      var i = r(7689),
        n = r(9445),
        o = r(3434),
        s = r(7307),
        a = r(6166);
      const c = 150,
        l = (e) => {
          const {
              isOpen: t,
              title: r,
              onCloseClick: l,
              onBackgroundClick: d,
              options: u = {},
              className: p,
              children: h,
              size: m = "large",
            } = e,
            g = (0, i.useRef)(null),
            f = (0, i.useCallback)(
              (e) => {
                if ("Escape" === e.key) return l?.();
                document.activeElement === g.current &&
                  ((" " !== e.key && "Enter" !== e.key) ||
                    (e.preventDefault(), e.stopPropagation(), l?.()));
              },
              [l]
            );
          (0, i.useEffect)(
            () => (
              window.addEventListener("keydown", f),
              () => window.removeEventListener("keydown", f)
            ),
            [f]
          ),
            (0, i.useEffect)(() => {
              g.current && g.current.focus();
            });
          const y = i.createElement(
              "a",
              {
                tabIndex: 0,
                role: "button",
                ref: g,
                className: (0, s.ok)("modal__close-button"),
                "data-testid": "modal-close-btn",
                onClick: () => l?.(),
              },
              "×"
            ),
            w = t
              ? i.createElement(
                  n.Z,
                  {
                    key: "1",
                    in: t,
                    classNames: {
                      enter: (0, s.ok)("modal-and-screen--enter"),
                      enterActive: (0, s.ok)("modal-and-screen--enter-active"),
                      exit: (0, s.ok)("modal-and-screen--exit"),
                      exitActive: (0, s.ok)("modal-and-screen--exit-active"),
                    },
                    timeout: c,
                  },
                  i.createElement(
                    "div",
                    { className: (0, s.ok)("modal-and-screen") },
                    i.createElement("div", {
                      className: (0, s.ok)("screen", "screen--light"),
                      onClick: d,
                    }),
                    i.createElement(
                      "div",
                      {
                        role: "dialog",
                        "aria-modal": "true",
                        className:
                          (0, s.ok)("modal", `modal--${m}`) + " " + (p || ""),
                      },
                      r &&
                        i.createElement(
                          "div",
                          { className: (0, s.ok)("modal__header") },
                          i.createElement(
                            "div",
                            { className: (0, s.ok)("modal__title") },
                            r
                          ),
                          y
                        ),
                      i.createElement(
                        "div",
                        {
                          className: (0, s.ok)(
                            "modal__content",
                            u.noPadding ? "modal__content--no-padding" : ""
                          ),
                        },
                        i.createElement(a.S, null, !r && y, h)
                      )
                    )
                  )
                )
              : null;
          return i.createElement(o.Z, null, w);
        };
    },
    6166: (e, t, r) => {
      r.d(t, { S: () => l });
      var i = r(7689),
        n = r(6030),
        o = r(4004),
        s = r(4787);
      const a = () => i.createElement(s.N, { i18nKey: "ui.general.error" });
      class c extends i.Component {
        componentDidCatch(e, t) {
          this.setState({ hasError: !0 }),
            o.k.error(`Error in React Tree: ${e.name}: ${e.message}`, {
              err: e,
              componentStack: t.componentStack,
              state: this.props.state,
            });
        }
        render() {
          return this.state.hasError
            ? void 0 === this.props.renderIfError
              ? i.createElement(a, null)
              : this.props.renderIfError
            : this.props.children;
        }
        constructor(e) {
          super(e), (this.state = { hasError: !1 });
        }
      }
      c.displayName = "ErrorBoundary";
      const l = (0, n.$j)((e) => ({ state: e }))(c);
    },
    7865: (e, t, r) => {
      r.d(t, { Cu: () => s, If: () => n, Rn: () => o, yf: () => i });
      const i = { section: "order-summary__section" },
        n = {
          orderSubtotal: "data-checkout-subtotal-price-target",
          giftCardAmount: "data-checkout-applied-gift-card-amount-target",
        },
        o = {
          section: `.${i.section}`,
          orderSummary: ".order-summary__sections",
          orderSummaryErrors:
            ".order-summary__section--discount .field--error, .order-summary__section--discount .notice--warning",
          orderSummaryNotices:
            ".order-summary__section--discount .notice--info",
          orderSubtotal: `*[${n.orderSubtotal}]`,
          giftCardAmount: `*[${n.giftCardAmount}]`,
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
        s = 1e3;
    },
    9937: (e, t, r) => {
      r.d(t, { IH: () => u, MI: () => d, iO: () => s, v$: () => a });
      var i = r(4274),
        n = r(3850),
        o = r(7865);
      function s(e) {
        const t = document.querySelector(o.Rn.discountForm.codeInput),
          r = document.querySelector(o.Rn.discountForm.submitButton);
        if (!t?.form || !r)
          throw new n.T("Discount input or submit button not found");
        t.setAttribute("value", e),
          t.form.dispatchEvent(l()),
          t.setAttribute("value", ""),
          c(r);
      }
      function a() {
        const e = (0, i.Oc)(
          document.querySelectorAll(o.Rn.appliedReductionTag)
        ).filter((e) =>
          Boolean(e.querySelector('input[name="checkout[clear_discount]"]'))
        );
        if (0 === e.length) return !1;
        const t = e[0].querySelector(o.Rn.appliedReductionTags.removeButton),
          r = document.querySelector(o.Rn.discountForm.submitButton);
        return !!t?.form && (t.form.dispatchEvent(l()), r && c(r), !0);
      }
      function c(e) {
        const t = e.querySelector(o.Rn.button.spinner);
        if (!t) return;
        const r = e.querySelectorAll(
          [o.Rn.button.content, o.Rn.button.iconForMobile].join(", ")
        );
        0 !== r.length &&
          ((t.style.display = "none"),
          r.forEach((e) => (e.style.opacity = "1")));
      }
      function l() {
        const e = document.createEvent("Event");
        return e.initEvent("submit", !0, !0), e;
      }
      function d() {
        return (
          (0, i.Oc)(document.querySelectorAll(o.Rn.orderSummaryErrors)).length >
          0
        );
      }
      function u() {
        return (
          (0, i.Oc)(document.querySelectorAll(o.Rn.orderSummaryNotices))
            .length > 0
        );
      }
    },
    2209: (e, t, r) => {
      r.d(t, {
        NX: () => f,
        P_: () => u,
        mR: () => g,
        Qp: () => d,
        PU: () => w,
        A7: () => k,
        yH: () => c,
        cG: () => a,
        t9: () => v,
        hM: () => y,
        Ap: () => p,
        E4: () => m,
      });
      var i = r(208);
      r(8274);
      class n extends Error {
        constructor(...e) {
          super(...e), (this.name = "NoCheckoutRedemptionRewardError");
        }
      }
      var o = r(5833),
        s = r(8788);
      const a = (e) => e.checkoutRedemption,
        c = (0, i.P1)(a, (e) => {
          let { ready: t } = e;
          return t;
        }),
        l = (0, i.P1)(s.u, (e) => {
          if (!e)
            throw new n("Checkout redemption reward required for this feature");
          return e;
        }),
        d = (0, i.P1)(a, (e) => e.inputMode),
        u = (e) => e.checkoutRedemption.eligibleTotalForDiscount,
        p = (0, i.P1)(u, (e) => e > 0),
        h = (0, i.P1)(a, s.u, o.H5, (e, t, r) => {
          if (!t)
            throw new n("Checkout redemption reward required for this feature");
          const {
              eligibleTotalForDiscount: i,
              redeemDiscountValue: o,
              voucher: { code: s },
            } = e,
            a = s && o ? o : 0,
            c = Math.floor(r.pointsRedeemable / t.point_cost),
            l = Math.min(t.max_redemption_amount, Math.ceil(i / 100), c + a),
            d = t.redemption_amount_step;
          return Math.floor(l / d) * d;
        }),
        m = (0, i.P1)(l, h, (e, t) => t >= e.min_redemption_amount),
        g = (0, i.P1)(a, (e) => {
          let {
            voucher: { code: t, isApplying: r },
          } = e;
          return null !== t && !r;
        }),
        f = (0, i.P1)(a, l, h, (e, t, r) => {
          const { redeemDiscountValue: i, inputMode: n } = e;
          if (null !== i) return i;
          switch (n) {
            case "select":
              return r;
            case "slider":
              return t.min_redemption_amount;
          }
        }),
        y = (0, i.P1)(a, (e) => {
          let { hasSubscriptionAppInstalled: t } = e;
          return t;
        }),
        w = (0, i.P1)(a, l, h, m, f, p, (e, t, r, i, n, o) => {
          const {
              redemption_amount_step: s,
              min_redemption_amount: a,
              point_cost: c,
            } = t,
            { voucher: l } = e;
          return {
            disabled: null !== l.code || !i || !o,
            min: a,
            max: r,
            step: s,
            pointsPerUnit: c,
            value: n,
          };
        }),
        k = (0, i.P1)(l, (e) => e.point_cost * e.min_redemption_amount),
        v = (e) => e.checkoutRedemption.voucher;
      (0, i.P1)(a, (e) => e.voucher.code);
    },
    5392: (e, t, r) => {
      r.d(t, { h: () => a });
      var i = r(208),
        n = r(5833),
        o = r(4856),
        s = r(9119);
      const a = (0, i.P1)(o.$Q, n.H5, s.O6, s.wS, (e, t, r, i) =>
        e ? t.pointsRedeemable + r - i : t.pointsRedeemable
      );
    },
    3603: (e, t, r) => {
      r.d(t, { $N: () => l, iP: () => c, pq: () => d });
      var i = r(208),
        n = r(6460),
        o = r(8268),
        s = r(1667),
        a = r(4263);
      const c = (0, i.P1)(s.r7, (e) => e.loyaltyWidget),
        l = (0, i.P1)(c, (e) => e.enabled),
        d = (0, i.P1)(
          c,
          n.G,
          o.Zp,
          a.vD,
          (e, t, r, i) => (e.enabled || i) && (!t.checkout || r.onThankYou)
        );
    },
    9311: (e, t, r) => {
      r.d(t, { b: () => s, y: () => a });
      var i = r(9532),
        n = r(7111),
        o = r(8746);
      const s = (e) => (0, i.PH)("[beacon] set content width", { width: e }),
        a = () => async (e, t) => {
          (0, n.OK)(t()) ? e((0, o.OD)()) : e((0, o.Wk)());
        };
    },
    6988: (e, t, r) => {
      r.d(t, {
        BW: () => y,
        DV: () => d,
        Mr: () => p,
        Ui: () => g,
        _W: () => h,
        eS: () => a,
        gk: () => l,
        h7: () => u,
        qF: () => f,
        u_: () => m,
        yg: () => c,
      });
      var i = r(9532),
        n = r(4421),
        o = r(9183),
        s = r(476);
      const a = () => (0, i.PH)("[refer-email] open toast"),
        c = () => (0, i.PH)("[refer-email] close toast"),
        l = (e) => (0, i.PH)("[refer-email] set toast message", { message: e }),
        d = (e) => (0, i.PH)("[refer-email] set toast status", { status: e }),
        u = () => (0, i.PH)("[refer-email] modal open"),
        p = () => (0, i.PH)("[refer-email] modal close"),
        h = () => (0, i.PH)("[refer-email] set form request"),
        m = () => (0, i.PH)("[refer-email] set form request ok"),
        g = () => (0, i.PH)("[refer-email] set form request reset"),
        f = (e, t) => (r) => {
          r(l(e)),
            r(d(t)),
            r(a()),
            setTimeout(() => {
              r(c());
            }, 2500),
            "success" === t && (r(g()), r(p()));
        },
        y = (e) => async (t, r) => {
          t(h()), (0, o.kU)({ location: "email" });
          const i = n.H.buildFromState(r(), t),
            u = await i.referrals.sendEmail(e);
          if ("error" in u)
            return (
              t(
                l(
                  409 === u.error.status
                    ? (0, s.t)("app_turnkey.refer.duplicate_email")
                    : u.error.message ??
                        (0, s.t)("app_turnkey.general.something_went_wrong")
                )
              ),
              t(d("error")),
              t(a()),
              setTimeout(() => {
                t(c());
              }, 2500),
              void t(g())
            );
          t(m()), t(f("Email sent!", "success"));
        };
    },
    1566: (e, t, r) => {
      r.d(t, {
        DS: () => l,
        Go: () => f,
        PQ: () => u,
        R1: () => a,
        VO: () => d,
        V_: () => c,
        e6: () => m,
        n: () => g,
        sw: () => h,
        yx: () => p,
      });
      var i = r(4421),
        n = r(4401),
        o = r(5627),
        s = r(9532);
      const a = (e, t) =>
          (0, s.PH)("[ruleAction] set toast status", { id: e, status: t }),
        c = (e) => (0, s.PH)("[ruleAction] close toast", { id: e }),
        l = (e) => (0, s.PH)("[ruleAction] reset ruleAction state", { id: e }),
        d = (e) => (0, s.PH)("[ruleAction] open modal", { id: e }),
        u = (e) => (0, s.PH)("[ruleAction] close modal", { id: e }),
        p = (e) => (0, s.PH)("[ruleAction] submit request", { id: e }),
        h = (e, t) =>
          (0, s.PH)("[ruleAction] set result", { id: e, result: t }),
        m = (e, t) => async (r, n) => {
          if (t.isEarning) return;
          r(p(e));
          const o = i.H.buildFromState(n(), r),
            s = await o.customers.signupToNewsletter();
          if ("error" in s) {
            const t = s.error.message ?? s.error.type;
            return (
              r(h(e, { status: "error", err: { message: t } })),
              y(r, e),
              r(a(e, "error")),
              void w(r, e)
            );
          }
          return (
            r(h(e, { status: "success" })),
            y(r, e),
            r(a(e, "success")),
            w(r, e),
            s
          );
        },
        g = (e, t, r) => async (n, o) => {
          if (r.isEarning) return;
          n(p(t));
          const s = i.H.buildFromState(o(), n),
            c = await s.customers.setBirthday({ birthday: e });
          if ("error" in c) {
            const e = c.error.message || c.error.type;
            return (
              n(h(t, { status: "error", err: { message: e } })),
              y(n, t),
              n(a(t, "error")),
              void w(n, t)
            );
          }
          n(h(t, { status: "success" })), y(n, t), n(a(t, "success")), w(n, t);
        },
        f = (e) => {
          let { ruleId: t, ruleAction: r, properties: s } = e;
          return async (e, c) => {
            if (r?.isEarning) return;
            const l = (0, o.ef)(c(), t);
            if (!l) return;
            e(p(t));
            const d = i.H.buildFromState(c(), e),
              u = await d.customers.trackEvent({ name: l.name, properties: s });
            if ("error" in u) {
              const r = u.error.message || u.error.type;
              return (
                e(h(t, { status: "error", err: { message: r } })),
                y(e, t),
                e(a(t, "error")),
                void w(e, t)
              );
            }
            l.oneTime &&
              e((0, n.uG)({ ruleContext: [{ id: t, limitReached: !0 }] })),
              e(h(t, { status: "success" })),
              y(e, t),
              e(a(t, "success")),
              w(e, t);
          };
        },
        y = (e, t) => {
          setTimeout(() => {
            e(u(t));
          }, 200);
        },
        w = (e, t) => {
          setTimeout(() => {
            e(c(t));
          }, 3e3);
        };
    },
    682: (e, t, r) => {
      r.d(t, { c: () => n, u: () => o });
      var i = r(9532);
      const n = (e) =>
          (0, i.PH)("[turnkey client config] set config", { config: e }),
        o = (0, i.Lq)({ forceMode: null }, (e) => [
          e(n, (e, t) => {
            let { config: r } = t;
            return r;
          }),
        ]);
    },
    4180: (e, t, r) => {
      r.d(t, { u: () => o, I: () => n });
      var i = r(9532);
      const n = (e) =>
          (0, i.PH)("[turnkey] set customisations", { customisations: e }),
        o = (0, i.Lq)(
          {
            keyColors: { primary: "#5f50d4", secondary: "#42d4b2" },
            interfaceColors: {
              buttons: "primary",
              icons: "secondary",
              links: "secondary",
            },
            header: { backgroundColor: "secondary", backgroundImage: "" },
            homeActionTiles: { backgroundColor: "primary", textColor: "white" },
            widget: {
              backgroundColor: "primary",
              textColor: "white",
              position: "right",
              visible: "true",
            },
            dashboard: { textHelp: "" },
          },
          (e) => [
            e(n, (e, t) => {
              let { customisations: r } = t;
              return r;
            }),
          ]
        );
    },
    5922: (e, t, r) => {
      r.d(t, { BV: () => p, lw: () => o, se: () => s });
      var i = r(9532),
        n = r(1566);
      function o(e) {
        return "success" === e;
      }
      const s = {
          modalOpen: !1,
          isEarning: !1,
          result: null,
          toast: { status: null },
        },
        a = (e) => ({ ...e, modalOpen: !0 }),
        c = (e) => ({ ...e, modalOpen: !1 }),
        l = (e) => ({ ...e, toast: { status: null } }),
        d = (e) => ({ ...e, isEarning: !0 }),
        u = (e) => s,
        p = (0, i.Lq)({}, (e) => [
          e(n.VO, (e, t) => {
            let { id: r } = t;
            return (0, i.Fo)(e, r, a, s, { applyToOthers: [c] });
          }),
          e(n.PQ, (e, t) => {
            let { id: r } = t;
            return (0, i.Fo)(e, r, c, s, { applyToOthers: [c] });
          }),
          e(n.yx, (e, t) => {
            let { id: r } = t;
            return (0, i.Fo)(e, r, d, s);
          }),
          e(n.sw, (e, t) =>
            (0, i.Fo)(
              e,
              t.id,
              ((e) => {
                let { result: t } = e;
                return (e) => ({ ...e, isEarning: !1, result: t });
              })(t),
              s
            )
          ),
          e(n.V_, (e, t) => {
            let { id: r } = t;
            return (0, i.Fo)(e, r, l, s, { applyToOthers: [l] });
          }),
          e(n.R1, (e, t) =>
            (0, i.Fo)(
              e,
              t.id,
              ((e) => {
                let { status: t } = e;
                return (e) => ({ ...e, toast: { status: t } });
              })(t),
              s
            )
          ),
          e(n.DS, (e, t) => {
            let { id: r } = t;
            return (0, i.Fo)(e, r, u, s);
          }),
        ]);
    },
    2036: (e, t, r) => {
      r.d(t, { Y: () => s, y: () => a });
      var i = r(9532),
        n = r(8568),
        o = r(3524);
      const s = (e) => (0, i.PH)("[translations] set", { translations: e }),
        a = (e) => (t, r) => {
          const i = (0, o.GV)(r()),
            a = (0, n.F)(r());
          a && t(s({ ...a, [i]: { ...a[i], ...e } }));
        };
    },
    8401: (e, t, r) => {
      r.d(t, { D: () => o, M: () => n });
      var i = r(9532);
      const n = {
          update: (e) => (0, i.PH)("[program] update", { program: e }),
          addRule: (e) => (0, i.PH)("[program] add rule", { rule: e }),
        },
        o = n.update;
    },
    1752: (e, t, r) => {
      r.d(t, { BW: () => a, Lt: () => d, Of: () => l, XH: () => c });
      var i = r(9532),
        n = r(4421),
        o = r(3524),
        s = r(7960);
      const a = (e) => (0, i.PH)("[referee incentive] set code", { code: e }),
        c = () => (0, i.PH)("[referee incentive] set code fetching"),
        l = (e) =>
          (0, i.PH)("[referee incentive] set code fetching error", {
            error: e,
          }),
        d = (e) => async (t, r) => {
          t(c());
          const i = n.H.buildFromState(r(), t),
            d = await i.referrals.refereeIncentiveCode({
              siteToken: (0, o.MW)(r()),
              referralId: e,
            });
          "error" in d
            ? t(l(d.error))
            : (t(a(d.code)), t((0, s.jk)(d.referralBlocked)));
        };
    },
    7960: (e, t, r) => {
      r.d(t, {
        Bw: () => a,
        C_: () => l,
        OJ: () => u,
        bp: () => c,
        jk: () => d,
        lm: () => p,
      });
      var i = r(9532),
        n = r(5833),
        o = r(4856),
        s = r(1752);
      const a = (e) =>
          (0, i.PH)("[referral welcome modal] set open", { open: e }),
        c = (e) => (t, r) => {
          const i = r(),
            c = (0, n._V)(i);
          if (!(0, o.pb)(i)) return;
          const l = !c;
          t(a(l)), l && t((0, s.Lt)(e));
        },
        l = () => (0, i.PH)("[referral welcome modal] close"),
        d = (e) =>
          (0, i.PH)("[referred] set referral blocked", { referralBlocked: e }),
        u = (e) =>
          (0, i.PH)(
            "[referral welcome modal] set discount applied modal open",
            { open: e }
          ),
        p = () => (e) => {
          e(u(!0));
        };
    },
    1289: (e, t, r) => {
      r.d(t, { N: () => o, Q: () => i });
      var i,
        n = r(9532);
      !(function (e) {
        (e.ChangeState = "[root] change state"),
          (e.RemoveCustomer = "[root] remove customer");
      })(i || (i = {}));
      const o = {
        removeCustomer: () => (0, n.PH)(i.RemoveCustomer),
        changeState: (e) => (0, n.PH)(i.ChangeState, e),
      };
    },
    2679: (e, t, r) => {
      r.d(t, {
        L3: () => o,
        Ws: () => c,
        _G: () => l,
        h_: () => a,
        nH: () => n,
        wo: () => s,
      });
      var i = r(9532);
      const n = (e) => (0, i.PH)("[site] set", { site: e }),
        o = (e) => (0, i.PH)("[site] update", { site: e }),
        s = (e) => (0, i.PH)("[site] change locale", { locale: e }),
        a = (e) =>
          (0, i.PH)("[site] update integrated loyalty page sections", {
            sections: e,
          }),
        c = (e) => (0, i.PH)("[site] set theme configuration", e),
        l = (e) => (0, i.PH)("[site] set site theme content", e);
    },
    6777: (e, t, r) => {
      r.d(t, { T: () => i });
      r(8274);
      class i extends Error {
        constructor(...e) {
          super(...e), (this.name = "ShopifyCartRequiredError");
        }
      }
    },
    3850: (e, t, r) => {
      r.d(t, { T: () => i });
      r(8274);
      class i extends Error {
        constructor(...e) {
          super(...e), (this.name = "ShopifyCheckoutRedemptionError");
        }
      }
    },
    4987: (e, t, r) => {
      r.d(t, { T: () => s, x: () => o });
      var i = r(9532);
      const n = (0, r(5810).aV)(),
        o = (e) => (0, i.PH)("[browser] set state", { browser: e }),
        s = (0, i.Lq)(n, (e) => [
          e(o, (e, t) => {
            let { browser: r } = t;
            return { ...e, ...r };
          }),
        ]);
    },
    2092: (e, t, r) => {
      r.d(t, { S7: () => s, kA: () => c, lb: () => o, zM: () => a });
      r(9630);
      var i = r(9532),
        n = r(5170);
      const o = (e) => (0, i.PH)("[page] set init data", { initData: e }),
        s = (e) => (t, r) => {
          const i = (0, n.wq)(r()),
            s = e.customer?.id;
          if ("shogun" !== i || "string" != typeof s) return t(o(e));
          t(o({ ...e, customer: { ...e.customer, id: l(s) } }));
        },
        a = (e) =>
          (0, i.PH)("[page] set integrated page section", {
            kind: e.kind,
            section: e,
          }),
        c = (0, i.Lq)({ initData: null, integratedPageSections: {} }, (e) => [
          e(o, (e, t) => {
            let { initData: r } = t;
            return { ...e, initData: r };
          }),
          e(a, (e, t) => {
            let { kind: r, section: i } = t;
            return {
              ...e,
              integratedPageSections: { ...e.integratedPageSections, [r]: i },
            };
          }),
        ]);
      function l(e) {
        return atob(e).replace(/^.+\/Customer\//, "");
      }
    },
    9341: (e, t, r) => {
      r.d(t, { J: () => s, K: () => o });
      var i = r(208),
        n = r(1667);
      const o = (e) => e.app.themeManifest,
        s = (0, i.P1)(n.l$, n.qb, (e, t) =>
          e ? "turnkey" : t.createdByMerchant ? "integrated-page" : "legacy"
        );
    },
    8761: (e, t, r) => {
      r.d(t, { NE: () => d, h8: () => c, i2: () => l });
      var i = r(208),
        n = r(7487),
        o = r(5833),
        s = r(8788),
        a = r(8268);
      function c(e, t) {
        const r = (0, o._V)(e);
        if (!r) return !1;
        const i = (0, s.kL)(e, t);
        if (!i) return !1;
        if ((0, n.J6)(i)) {
          const r = (0, a.yB)(e, t);
          if (1 === i.session_options.session_limit && r) return !1;
        }
        return !!(r.pointsRedeemable >= i.point_cost);
      }
      const l = (0, i.P1)(
          s.Rq,
          o._V,
          (e) => e,
          (e, t, r) => (t ? e.filter((e) => c(r, e.id)) : [])
        ),
        d = () =>
          (0, i.P1)(
            s.Rq,
            o._V,
            (e, t) => t,
            (e) => e,
            (e, t, r, i) =>
              t
                ? e.filter((e) =>
                    (function (e, t, r) {
                      const i = (0, o._V)(e);
                      if (!i) return !1;
                      const c = (0, s.kL)(e, t);
                      if (!c) return !1;
                      if ((0, n.J6)(c)) {
                        const r = (0, a.yB)(e, t);
                        if (1 === c.session_options.session_limit && r)
                          return !1;
                      }
                      return !!(
                        i.pointsApproved >= c.point_cost * ((100 - r) / 100) &&
                        i.pointsApproved <= c.point_cost
                      );
                    })(i, e.id, r)
                  )
                : []
          );
    },
    9544: (e, t, r) => {
      r.d(t, { v: () => i });
      const i = (0, r(208).P1)(
        (e) => e.page.initData,
        (e) => {
          const t = e?.customer?.id;
          return "string" == typeof t && t.length > 0 ? t : null;
        }
      );
    },
    6231: (e, t, r) => {
      r.d(t, { _: () => s });
      var i = r(208),
        n = r(6460),
        o = r(3524);
      const s = (0, i.P1)(o.IH, n.G, (e, t) => {
        if (t.useThemeOverride) return t.useThemeOverride;
        const r = e?.settings.sdkTheme ?? "legacy";
        return "default" === r ? "legacy" : r;
      });
    },
    9119: (e, t, r) => {
      r.d(t, { O6: () => d, ci: () => p, wS: () => u });
      var i = r(208),
        n = r(4004),
        o = r(7377),
        s = r(1780),
        a = r(8788),
        c = r(5627),
        l = r(8268);
      const d = (0, i.P1)(l.Iq, c.De, c.HM, (e, t, r) => {
          if (!e) return 0;
          if (!t && 0 === r.length) return 0;
          return (
            o.uX.getBasePointsFromCart(e, t) + o.uX.getBonusPointsFromCart(e, r)
          );
        }),
        u = (0, i.P1)(
          l.Iq,
          l.po,
          l.eI,
          (e) => e,
          (e, t, r, i) => {
            if (!e) return 0;
            if (0 === t.length && 0 === r.length) return 0;
            return (
              t
                .filter((t) => t.cart_token === e.token)
                .reduce((e, t) => e + t.reward_cost - t.reserved_points, 0) +
              r
                .map((t) => ({
                  cost: p(t, e, i),
                  reservedPoints: t.reservedPoints,
                }))
                .reduce((e, t) => {
                  let { cost: r, reservedPoints: i } = t;
                  return e + r - i;
                }, 0)
            );
          }
        );
      function p(e, t, r) {
        const i = e.usages.find(
            (e) => e.cartIdentifier === t.token && "claimed" === e.status
          ),
          o = i && (0, s.w1)(r, i.claimedRewardId);
        (i && o) ||
          n.k.error(
            "Missing usage or claimedReward for script hash redemption",
            {
              redemptionId: e.id,
              redemptionUsages: e.usages.map((e) => e.id),
              usageId: i?.id,
              claimedRewardId: i?.claimedRewardId,
            }
          );
        const c = (0, a.kL)(r, e.rewardId);
        return o ? o.point_cost : c?.point_cost ?? 0;
      }
    },
    8318: (e, t, r) => {
      r.d(t, {
        Au: () => S,
        By: () => _,
        F9: () => A,
        HO: () => P,
        cg: () => u,
        dY: () => R,
        eS: () => C,
      });
      r(8274);
      var i = r(208),
        n = r(7290),
        o = r(4004),
        s = r(476),
        a = r(5833),
        c = r(4856),
        l = r(8788),
        d = r(5627);
      const u = (0, i.P1)(c.LI, (e) => e.loyaltyTierBenefits);
      function p(e, t) {
        return Math.ceil(
          Math.max(0, e.bounds.lower - (t.loyaltyTierEligibleSpend ?? 0)) / 100
        );
      }
      function h(e, t) {
        return e.bounds.lower - (t.loyaltyTierEligiblePoints ?? 0);
      }
      function m(e, t) {
        return e.bounds.upper
          ? (e.bounds.upper + 1 - (t.loyaltyTierEligibleSpend ?? 0)) / 100
          : null;
      }
      function g(e, t) {
        return e.bounds.upper
          ? e.bounds.upper + 1 - (t.loyaltyTierEligiblePoints ?? 0)
          : null;
      }
      function f(e, t, r, i) {
        if (!e.bounds.upper || !i) return null;
        const n = (() => {
          switch (r) {
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
        return "number" == typeof n && n > 1
          ? (o.k.error(
              "Invalid tiers progress calculation: should be in next tier",
              { tier: e, customer: t, tiersMode: r, isCurrent: i, progress: n }
            ),
            null)
          : n;
      }
      function y(e) {
        return e?.loyaltyTierMembership?.expiresAt
          ? (0, s.p6)(new Date(e.loyaltyTierMembership.expiresAt))
          : null;
      }
      function w(e, t) {
        return t.reduce((t, r) => {
          const i = e.find((e) => e.rewardId === r.id);
          return i ? [...t, { ...i, reward: r }] : t;
        }, []);
      }
      function k(e, t) {
        return e
          .reduce((e, r) => {
            const i = t.find((e) => e.id === r.ruleId);
            return i ? [...e, { ...r, rule: i }] : e;
          }, [])
          .sort((e, t) =>
            e.rule.sortKey && t.rule.sortKey
              ? 0 + e.rule.sortKey - t.rule.sortKey
              : e.rule.id - t.rule.id
          );
      }
      const v = (0, i.P1)(
          l.O5,
          d.qw,
          c.ll,
          a.cQ,
          u,
          a._V,
          c.SN,
          (e, t, r, i, n, o, s) =>
            r
              .slice()
              .sort((e, t) => e.position - t.position)
              .map((r) => {
                const a = !!i && r.id === i.id;
                return {
                  ...r,
                  number: r.position + 1,
                  rewardOverrides: w(r.rewardOverrides, e),
                  ruleOverrides: k(r.ruleOverrides, t),
                  benefits: n.filter((e) => e.loyaltyTierIds.includes(r.id)),
                  expiresAt: a ? y(o) : null,
                  isCurrent: a,
                  isNext: !!i && r.position > i.position,
                  isPrevious: !!i && r.position < i.position,
                  progressToNextTier: o ? f(r, o, s.loyaltyTiersMode, a) : null,
                  neededPoints: o ? h(r, o) : 0,
                  neededSpend: o ? p(r, o) : 0,
                  pointsToNextTier: o ? g(r, o) : 0,
                  spendToNextTier: o ? m(r, o) : 0,
                };
              })
        ),
        b = (0, i.P1)(c.qH, (e) => !!e && e.settings.loyaltyTiersEnabled),
        S = (0, i.P1)(b, c.ll, (e, t) => {
          const r = t.filter((e) => !e.hidden).length;
          if (1 === r) throw new Error("There is only one visible tier");
          return e && r > 0;
        }),
        R = (0, i.P1)(c.ll, (e) => e.map((e) => e.id)),
        C = (0, i.P1)(c.ll, a.mU, (e, t) =>
          e.filter((e) => !e.hidden || e.id === t).map((e) => e.id)
        ),
        P = (0, i.P1)(C, v, (e, t) => t.filter((t) => e.includes(t.id))),
        _ = (0, n.B)(
          (e, t) => t,
          v,
          (e, t) => t.find((t) => t.id === e) ?? null
        ),
        A = (0, i.P1)(
          (e, t) => t,
          v,
          (e, t) => {
            const r = t.findIndex((t) => t.id === e);
            return t[r + 1] || null;
          }
        );
    },
    6233: (e, t, r) => {
      r.d(t, { M: () => l, k: () => d });
      r(8274);
      var i = r(4494);
      function n(e) {
        return e.replace(/([_][a-z])/gi, (e) =>
          e.toUpperCase().replace("_", "")
        );
      }
      var o = r(70),
        s = r(5571),
        a = r(2307),
        c = r(5833);
      function l(e, t) {
        return {
          ...((r = e), (0, i.mZ)(r, n)),
          setCanBeApplied: (r) => {
            if ("boolean" != typeof r)
              throw new TypeError("canBeApplied must be a boolean");
            t.dispatch((0, o.rB)({ id: e.id, canBeApplied: r }));
          },
          setApplied: (r) => {
            if ("boolean" != typeof r)
              throw new TypeError("applied must be a boolean");
            t.dispatch(
              (0, o.Ro)({
                id: e.id,
                applyResult: r ? { status: "success" } : null,
              })
            );
          },
        };
        var r;
      }
      function d(e) {
        return async function () {
          let {
            limit: t,
            hideUsed: r,
            hideVoid: i,
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          const n = e.getState(),
            o = (0, c._V)(n);
          if (!o) throw new a.G("Fetching claimed rewards requires customer");
          return o.claimedRewards
            .slice(0, t || o.claimedRewards.length)
            .filter((e) => !r || !(0, s.rk)(e))
            .filter((e) => !r || !(0, s.RP)(e))
            .filter((e) => !i || !("void" === e.state))
            .map((t) => l(t, e));
        };
      }
    },
    52: (e, t, r) => {
      function i(e) {
        return new Promise((t) => setTimeout(t, e));
      }
      r.d(t, { z: () => m });
      var n = r(9341),
        o = r(6460),
        s = r(6231),
        a = r(3524),
        c = r(3519),
        l = r(5810),
        d = r(3538),
        u = r(3588),
        p = r(4895);
      let h = !1;
      async function m(e) {
        let { state: t, settings: r = {}, force: m = !1 } = e;
        const g = (0, a.lH)(t),
          f = (0, s._)(t),
          y = (0, u.jG)({
            name: f,
            revision: p.T.must((0, n.K)(t)[f]),
            host: c.v.sdkHost,
            siteToken: g.token,
            digest: g.meta.loyaltyPanelCustomisationDigest,
            options: (0, u.xB)(g, (0, o.G)(t)),
          }),
          w = (0, l.Oh)({
            ...(Object.keys(r).length > 0
              ? { settings: encodeURIComponent(JSON.stringify(r)) }
              : {}),
            ...(m ? { timestamp: Date.now().toString() } : {}),
          });
        for (; h; ) await i(50);
        let k;
        try {
          (h = !0),
            (k = await (0, d.BS)(
              `${y.cssUrl}${w}`,
              { "data-lion-css": "theme" },
              { removeOnError: !0 }
            )),
            await i(500),
            document
              .querySelectorAll('link[data-lion-css="theme"]')
              .forEach((e) => {
                e !== k && e.parentNode && e.parentNode.removeChild(e);
              });
        } finally {
          h = !1;
        }
      }
    },
    1386: (e, t, r) => {
      r.r(t), r.d(t, { createLion: () => dn });
      var i = r(6220),
        n = r(2199),
        o = r(2265);
      function s(e, t, r) {
        if (!t.has(e))
          throw new TypeError("attempted to get private field on non-instance");
        return r;
      }
      var a = r(9895);
      function c(e, t) {
        (0, a.Z)(e, t), t.add(e);
      }
      r(8274);
      var l = r(2909),
        d = r(4421),
        u = r(6205),
        p = r(3519),
        h = r(8846),
        m = r(4856),
        g = r(3524),
        f = r(6186),
        y = r(4004),
        w = r(4167),
        k = r(4263),
        v = r(825),
        b = r(5810);
      function S() {
        const e = (0, b.ce)("ll_auth");
        if (e) {
          const t = (function (e) {
            let t;
            try {
              t = JSON.parse((0, v.J)(e));
            } catch {
              return y.k.warn("Could not parse auth from query", e), null;
            }
            if (
              ((r = t),
              !(
                "object" == typeof r &&
                null !== r &&
                "jwt" in r &&
                "string" == typeof r.jwt &&
                "expires_at" in r &&
                "number" == typeof r.expires_at &&
                "connect_host" in r &&
                "string" == typeof r.connect_host &&
                "refresh_url" in r &&
                "string" == typeof r.refresh_url
              ))
            )
              return y.k.warn("Invalid auth query data", t), null;
            var r;
            return {
              host: t.connect_host,
              jwt: t.jwt,
              jwtExpiresAt: new Date(1e3 * t.expires_at),
              refreshUrl: t.refresh_url,
            };
          })(e);
          if (t) return t;
        }
        return null;
      }
      var R = r(7684),
        C = r(52);
      const P = ["shogun", "shopify", "unknown"];
      var _ = r(7487),
        A = r(5788),
        I = r(6072);
      const M = (e, t) => {
        let r = null;
        const i = () => {
            const i = e.getState();
            t(i, r), (r = i);
          },
          n = e.subscribe(i);
        return i(), n;
      };
      var E = r(7377),
        q = r(3588),
        F = r(8810),
        T = r(1408),
        H = r(9532);
      const O = (e) => (0, H.PH)("[api] set revision", { revision: e }),
        L = (e) => (0, H.PH)("[api] set build", { build: e }),
        Z = (e) => (0, H.PH)("[auth packet] update", { authPacket: e });
      var D = r(4401),
        W = r(2036),
        B = r(2136),
        N = r(8401),
        U = r(1289),
        V = r(2709),
        x = r(2679),
        $ = r(7928),
        j = r(2493),
        G = r(70),
        X = r(8563),
        z = r(8746),
        Y = r(8761),
        K = r(8788),
        J = r(1667),
        Q = r(7365);
      function ee(e) {
        const t = e.getState(),
          r = (0, Q.HZ)(t),
          i = (0, J.l$)(t);
        if (r && (0, K.kL)(t, r) && (0, Y.h8)(t, r)) {
          if (i)
            return void (function (e, t) {
              setTimeout(() => {
                e.dispatch((0, z.P4)("redeem")),
                  e.dispatch((0, z.Wk)()),
                  setTimeout(() => {
                    e.dispatch((0, X.h7)(t));
                  }, $.C3);
              }, $.o_);
            })(e, r);
          e.dispatch((0, G.d3)(r));
        }
      }
      var te = r(686),
        re = r(5833);
      const ie = (e) => (0, H.PH)("[email tracking] set", { trackingState: e }),
        ne = () => (0, H.PH)("[email tracking] clear action"),
        oe = () => (0, H.PH)("[email tracking] clear reward id"),
        se = () => (0, H.PH)("[email tracking] clear email tracking id");
      function ae(e) {
        switch ((0, Q.Hc)(e.getState())) {
          case "claim_reward":
            ee(e);
            break;
          case "refer":
            !(function (e) {
              const t = e.getState();
              if ((0, J.l$)(t)) {
                if (!(0, re._V)(t)) return;
                setTimeout(() => {
                  e.dispatch((0, z.P4)("refer")), e.dispatch((0, z.Wk)());
                }, $.o_);
              } else e.dispatch((0, te.s$)());
            })(e);
        }
        e.dispatch(ne()), e.dispatch(oe()), (0, b.rN)("ll_act", "ll_rid");
      }
      var ce = r(3868),
        le = r(5627);
      class de {
        getBonusPointsForProduct(e) {
          if (!this.enabled) return null;
          const t = (0, le.HM)(this.store.getState()).find((t) => {
            const { productId: r, productVariantId: i } = t.properties;
            return !(!i || i !== e.toString()) || r === e.toString();
          });
          return t ? t.value : null;
        }
        constructor(e) {
          this.store = e;
          const t = (0, ce.wy)(this.store.getState(), "limespot");
          this.enabled = !!t && t.enabled;
        }
      }
      class ue {
        constructor(e) {
          (0, ce.wy)(e.getState(), "limespot") && (this.limespot = new de(e));
        }
      }
      var pe = r(10),
        he = r(9311);
      const me = (0, H.Lq)({ contentWidth: 0 }, (e) => [
        e(he.b, (e, t) => {
          let { width: r } = t;
          return { ...e, contentWidth: r };
        }),
      ]);
      var ge = r(4229);
      const fe = (e) => ({ ...e, modalOpen: !0 }),
        ye = (e) => ({ ...e, modalOpen: !1, isClaiming: !1 }),
        we = (e) => ge.q,
        ke = (e) => ({ ...e, isClaiming: !0 }),
        ve = (e) => ({ ...e, toastOpen: !0 }),
        be = (e) => ({ ...e, toastOpen: !1 }),
        Se = (0, H.Lq)({}, (e) => [
          e(X.h7, (e, t) => {
            let { id: r } = t;
            return (0, H.Fo)(e, r, fe, ge.q, { applyToOthers: [ye, be] });
          }),
          e(X.Mr, (e, t) => {
            let { id: r } = t;
            return (0, H.Fo)(e, r, ye, ge.q);
          }),
          e(X.d_, (e, t) =>
            (0, H.Fo)(
              e,
              t.id,
              ((e) => {
                let { result: t } = e;
                return (e) => ({ ...e, result: t });
              })(t),
              ge.q
            )
          ),
          e(X.Km, (e, t) => {
            let { id: r } = t;
            return (0, H.Fo)(e, r, we, ge.q);
          }),
          e(X.wU, (e, t) => {
            let { id: r } = t;
            return (0, H.Fo)(e, r, ke, ge.q);
          }),
          e(X.T_, (e, t) => {
            let { id: r } = t;
            return (0, H.Fo)(e, r, ve, ge.q);
          }),
          e(X.yg, (e, t) => {
            let { id: r } = t;
            return (0, H.Fo)(e, r, be, ge.q);
          }),
          e(X.I4, (e) => (0, H.Jn)(e, be, ge.q)),
        ]);
      var Re = r(682),
        Ce = r(4180),
        Pe = r(2391);
      const _e = (0, H.Lq)({ contentHeight: 0 }, (e) => [
          e(Pe.D, (e, t) => {
            let { height: r } = t;
            return { ...e, contentHeight: r };
          }),
        ]),
        Ae = (0, H.Lq)(
          {
            isOpen: !1,
            page: "dashboard",
            guestPage: "welcome",
            headerExpanded: !0,
            pageOpenFromNotification: null,
          },
          (e) => [
            e(z.M7.setPopoutOpen, (e) => ({ ...e, isOpen: !0 })),
            e(z.M7.setPopoutClosed, (e) => ({ ...e, isOpen: !1 })),
            e(z.M7.setPopoutPage, (e, t) => {
              let { page: r } = t;
              return { ...e, page: r };
            }),
            e(z.qz, (e, t) => {
              let { page: r } = t;
              return { ...e, guestPage: r };
            }),
            e(z.QM, (e) => ({ ...e, headerExpanded: !1 })),
            e(z.H7, (e) => ({ ...e, headerExpanded: !0 })),
            e(z.qb, (e, t) => {
              let { notificationId: r } = t;
              return { ...e, pageOpenFromNotification: r };
            }),
          ]
        );
      var Ie = r(6988);
      const Me = (0, H.Lq)(
        {
          modalOpen: !1,
          submitting: !1,
          submitSuccess: !1,
          toast: { open: !1, message: "", status: "success" },
        },
        (e) => [
          e(Ie.eS, (e) => ({ ...e, toast: { ...e.toast, open: !0 } })),
          e(Ie.yg, (e) => ({ ...e, toast: { ...e.toast, open: !1 } })),
          e(Ie.gk, (e, t) => {
            let { message: r } = t;
            return { ...e, toast: { ...e.toast, message: r } };
          }),
          e(Ie.DV, (e, t) => {
            let { status: r } = t;
            return { ...e, toast: { ...e.toast, status: r } };
          }),
          e(Ie._W, (e) => ({ ...e, submitting: !0 })),
          e(Ie.u_, (e) => ({ ...e, submitting: !1, submitSuccess: !0 })),
          e(Ie.Ui, (e) => ({ ...e, submitting: !1, submitSuccess: !1 })),
          e(Ie.h7, (e) => ({ ...e, modalOpen: !0 })),
          e(Ie.Mr, (e) => ({ ...e, modalOpen: !1 })),
        ]
      );
      var Ee = r(5922);
      const qe = (0, pe.combineReducers)({
          beacon: me,
          popout: Ae,
          ruleAction: Ee.BV,
          claim: Se,
          referEmail: Me,
          notificationsUi: _e,
          customisations: Ce.u,
          clientConfig: Re.u,
        }),
        Fe = qe(void 0, { type: "@@INIT" }),
        Te = {
          emailAction: null,
          emailClaimRewardId: null,
          emailTrackingId: null,
        },
        He = (0, H.Lq)(Te, (e) => [
          e(ie, (e, t) => {
            let { trackingState: r } = t;
            return r;
          }),
          e(ne, (e) => ({ ...e, emailAction: null })),
          e(oe, (e) => ({ ...e, emailClaimRewardId: null })),
          e(se, (e) => ({ ...e, emailTrackingId: null })),
        ]);
      var Oe = r(4987);
      const Le = (e) => (0, H.PH)("[client config] update", { config: e }),
        Ze = {
          checkout: !1,
          disableBundledCSS: !1,
          disableBundledFonts: !1,
          useClassIsolator: !1,
          useThemeOverride: void 0,
          useUiOverride: void 0,
          useCamelCaseHooksResources: void 0,
        },
        De = (0, H.Lq)(Ze, (e) => [
          e(Le, (e, t) => {
            let { config: r } = t;
            return { ...e, ...r };
          }),
        ]);
      var We = r(1750),
        Be = r(2092);
      const Ne = {
          isEmbedded: !1,
          currentPageId: "rewards",
          customerBirthdaySubmitError: null,
          customerNewsletterSignupError: null,
          customerNewsletterSignupSuccess: null,
          historyInfoModalOpenFor: null,
          isCustomerBirthdaySubmitSuccess: !1,
          isMobileMenuOpen: !1,
          isCustomerBirthdaySubmitting: !1,
          isCustomerNewsletterSignupSubmitting: !1,
          isPendingPointsHelpModalOpen: !1,
          isReferralWidgetModalOpen: !1,
          ruleActionModalOpenFor: null,
          triggeredRuleError: [],
          triggeredRuleRequesting: [],
          triggeredRuleSuccess: [],
        },
        Ue = {
          emailForm: {
            submitSuccess: !1,
            submitting: !1,
            touched: !1,
            values: { message: "", name: "", recipients: "" },
          },
        },
        Ve = { allIds: [], byId: {} },
        xe = { allIds: [], byId: {} },
        $e = {
          isModalOpen: !1,
          isDiscountAppliedModalOpen: !1,
          referralBlocked: null,
        },
        je = {
          facebook: { sdkState: "initial" },
          twitterSdk: "initial",
          recharge: {},
        },
        Ge = {
          cart: null,
          cartRewardVariants: [],
          shopifyScriptRedemptions: [],
          buyWithPointsStatus: "not_started",
          localCurrency: null,
          localCurrencyFailedAttempts: 0,
          onThankYou: !1,
          frontend: E.Fq.getShopifyFrontendFromPage(),
        },
        Xe = {
          ready: !1,
          inputMode: "slider",
          redeemDiscountValue: null,
          shopifyCheckoutToken: null,
          eligibleTotalForDiscount: 0,
          voucher: { code: null, id: null, isRemoving: !1, isApplying: !1 },
          hasSubscriptionAppInstalled: !1,
        },
        ze = {
          revision: "",
          themeManifest: { default: "", modern: "" },
          fontManifest: null,
        },
        Ye = { build: 0, revision: "" },
        Ke = { value: null, isFetching: !1, error: null },
        Je = {
          customRewardDescriptionModalOpenFor: null,
          isRewardDescriptionModalOpen: !1,
          redeemRewardErrors: {},
          redeemRewardModalOpenFor: null,
          redeemRewardModalClosing: !1,
          redeemRewardSuccess: null,
          redeemingRewardFor: null,
          apply: {},
        },
        Qe = { translations: null },
        et = {
          app: ze,
          api: Ye,
          authPacket: null,
          browser: (0, Oe.T)(void 0, { type: "@@INIT" }),
          checkoutRedemption: Xe,
          clientConfiguration: De(void 0, { type: "@@INIT" }),
          customer: null,
          controlMode: (0, w.z1)(void 0, { type: "@@INIT" }),
          emailTracking: Te,
          hooks: (0, We.As)(void 0, { type: "@@INIT" }),
          integrations: je,
          isLoyaltySplashOrPanelModalOpen: false,
          loyaltyPanel: Ne,
          notifications: Ve,
          page: (0, Be.kA)(void 0, { type: "@@INIT" }),
          productsOnPage: xe,
          program: null,
          referralWidget: Ue,
          referred: $e,
          refereeIncentiveCode: Ke,
          rewards: Je,
          shopify: Ge,
          site: null,
          appTurnkey: Fe,
          i18n: Qe,
        },
        tt = (e) => (0, H.PH)("[app] set revision", { revision: e }),
        rt = (e) => (0, H.PH)("[app] set theme manifest", { themeManifest: e }),
        it = (e) => (0, H.PH)("[app] set font manifest", { fontManifest: e }),
        nt = (e) => (0, H.PH)("[app] set preview mode", { previewMode: e }),
        ot = tt,
        st = rt,
        at = it,
        ct = (0, H.Lq)(ze, (e) => [
          e(tt, (e, t) => {
            let { revision: r } = t;
            return { ...e, revision: r };
          }),
          e(rt, (e, t) => {
            let { themeManifest: r } = t;
            return { ...e, themeManifest: r };
          }),
          e(it, (e, t) => {
            let { fontManifest: r } = t;
            return { ...e, fontManifest: r };
          }),
          e(nt, (e, t) => {
            let { previewMode: r } = t;
            return { ...e, previewMode: r };
          }),
        ]),
        lt = (e) => e.authPacket;
      var dt = r(7564),
        ut = r(3308),
        pt = r(8106);
      const ht = "UA-116483193-1",
        { analytics: mt } = (0, b.aV)();
      function gt(e) {
        return {
          cid: e.visitorId,
          v: "1",
          t: e.type,
          tid: ht,
          av: e.appVersion,
          an: "loyaltylion-sdk",
          ...("eventCategory" in e ? { ec: e.eventCategory } : {}),
          ...("eventAction" in e ? { ea: e.eventAction } : {}),
          dl: e.hostname,
          ul: mt.userLanguage,
          sr: mt.screenRes,
          sd: `${window.screen.pixelDepth}-bit`,
          vp: mt.viewport,
          de: mt.characterSet,
          z: Math.round(new Date().getTime() * Math.random()).toString(),
          aip: "1",
        };
      }
      function ft(e) {
        pt.d
          .post("https://www.google-analytics.com/collect", {
            body: (0, b.Oh)(gt(e), { skipEmptyValues: !0 }),
          })
          .catch(() => {});
      }
      class yt {
        trackPageview() {
          (0, R.C)() ||
            ft({
              type: "pageview",
              visitorId: this.visitorId,
              hostname: `https://${this.sdkHost}`,
              appVersion: this.revision,
            });
        }
        trackEvent(e, t) {
          (0, R.C)() ||
            ft({
              type: "event",
              eventAction: t,
              eventCategory: e,
              visitorId: this.visitorId,
              hostname: `https://${this.sdkHost}`,
              appVersion: this.revision,
            });
        }
        constructor(e, t, r) {
          (this.visitorId = e), (this.sdkHost = t), (this.revision = r);
        }
      }
      var wt = r(476),
        kt = r(2690),
        vt = r(8318),
        bt = r(6233);
      function St(e, t) {
        switch (t) {
          case "spend":
            return (e / 100).toFixed(2);
          case "points":
            return e.toString();
        }
      }
      async function Rt(e) {
        const t = e.getState(),
          r = (0, re._V)(t);
        if (!r) return null;
        const i = r.loyaltyTierMembership
            ? (0, vt.By)(t, r.loyaltyTierMembership.loyaltyTierId)
            : null,
          n = i
            ? (function (e, t, r) {
                return e.loyaltyTierMembership
                  ? {
                      expiresAt: e.loyaltyTierMembership.expiresAt,
                      loyaltyTier: {
                        default: t.default,
                        hidden: t.hidden,
                        id: t.id,
                        lowerBound: St(t.bounds.lower, r),
                        upperBound: t.bounds.upper
                          ? St(t.bounds.upper, r)
                          : null,
                        name: t.name,
                        number: t.number,
                      },
                      manual: e.loyaltyTierMembership.manual,
                      startedAt: e.loyaltyTierMembership.startedAt,
                    }
                  : null;
              })(r, i, (0, m.LI)(t).settings.loyaltyTiersMode)
            : null;
        return {
          birthday: r.birthday,
          blocked: r.blocked,
          createdAt: r.createdAt,
          email: r.email,
          enrolled: r.enrolled,
          enrolledAt: r.enrolledAt,
          guest: r.guest,
          id: r.id,
          insightsSegment: r.insightsSegment,
          merchantId: r.merchantId,
          metadata: {},
          pointsApproved: r.pointsRedeemable,
          pointsPending: r.pointsPending,
          pointsSpent: r.pointsSpent,
          properties: r.properties,
          referralId: r.referralId,
          referralUrl: r.referralUrls.direct,
          referredBy: r.referredBy,
          rewardsClaimed: r.claimedRewards.length,
          updatedAt: r.updatedAt,
          loyaltyTierMembership: n,
          getClaimedRewards: (0, bt.k)(e),
        };
      }
      var Ct = new WeakMap();
      class Pt {
        async getCustomer() {
          return Rt((0, i.Z)(this, Ct));
        }
        constructor(e) {
          (0, n.Z)(this, Ct, { writable: !0, value: void 0 }),
            (0, o.Z)(this, Ct, e);
        }
      }
      var _t = r(2494),
        At = r(7554),
        It = r(9262);
      const Mt = (0, H.Lq)(Xe, (e) => [
        e(It.lk.setReady, (e) => ({ ...e, ready: !0 })),
        e(It.lk.setEligibleTotalForDiscount, (e, t) => {
          let { price: r } = t;
          return {
            ...e,
            eligibleTotalForDiscount: r,
            redeemDiscountValue:
              null === e.redeemDiscountValue
                ? null
                : Math.min(e.redeemDiscountValue, r / 100),
          };
        }),
        e(It.lk.setInputMode, (e, t) => {
          let { mode: r } = t;
          return { ...e, inputMode: r };
        }),
        e(It.lk.setShopifyCheckoutToken, (e, t) => {
          let { token: r } = t;
          return { ...e, shopifyCheckoutToken: r };
        }),
        e(It.lk.setRedemptionValue, (e, t) => {
          let { amount: r } = t;
          return { ...e, redeemDiscountValue: r };
        }),
        e(It.lk.setError, (e) => e),
        e(It.lk.setRedemptionClaiming, (e) => ({
          ...e,
          voucher: { ...e.voucher, isApplying: !0, isRemoving: !1 },
        })),
        e(It.lk.setRedemptionApplied, (e, t) => {
          let { voucher: r } = t;
          return { ...e, voucher: { ...e.voucher, ...r, isApplying: !1 } };
        }),
        e(It.lk.setRedemptionApplying, (e, t) => {
          let { voucher: r } = t;
          return { ...e, voucher: { ...e.voucher, ...r, isRemoving: !1 } };
        }),
        e(It.lk.setRedemptionRemoving, (e) => ({
          ...e,
          voucher: { ...e.voucher, isApplying: !1, isRemoving: !0 },
        })),
        e(It.lk.setRedemptionRemoved, (e) => ({
          ...e,
          voucher: {
            ...e.voucher,
            code: null,
            id: null,
            isApplying: !1,
            isRemoving: !1,
          },
        })),
        e(It.lk.setHasSubscriptionAppInstalled, (e) => ({
          ...e,
          hasSubscriptionAppInstalled: !0,
        })),
      ]);
      var Et = r(9305);
      const qt = (0, H.Lq)(false, (e) => [
          e(Et.f, () => !0),
          e(Et.j, () => !1),
          e(u.j, () => !1),
        ]),
        Ft = (0, H.Lq)(Ne, (e) => [
          e(te.D4, (e, t) => {
            let { id: r } = t;
            return { ...e, currentPageId: r };
          }),
          e(te.mT, (e, t) => {
            let { value: r } = t;
            return { ...e, isMobileMenuOpen: r };
          }),
          e(te.VO, (e, t) => {
            let { id: r } = t;
            return { ...e, ruleActionModalOpenFor: r };
          }),
          e(te.XI, (e) => ({ ...e, ruleActionModalOpenFor: null })),
          e(te.Ys, (e, t) => ({ ...e, historyInfoModalOpenFor: t })),
          e(te.dP, (e) => ({ ...e, historyInfoModalOpenFor: null })),
          e(te.Gf, (e) => ({ ...e, isReferralWidgetModalOpen: !0 })),
          e(te.sJ, (e) => ({ ...e, isReferralWidgetModalOpen: !1 })),
          e(te.Jx, (e) => ({ ...e, isPendingPointsHelpModalOpen: !0 })),
          e(te.bW, (e) => ({ ...e, isPendingPointsHelpModalOpen: !1 })),
          e(u.j, (e) => ({
            ...e,
            ruleActionModalOpenFor: null,
            historyInfoModalOpenFor: null,
            isReferralWidgetModalOpen: !1,
            isPendingPointsHelpModalOpen: !1,
          })),
          e(te.HT, (e, t) => {
            let { id: r } = t;
            return {
              ...e,
              triggeredRuleRequesting: e.triggeredRuleRequesting.concat(r),
            };
          }),
          e(te.on, (e, t) => {
            let { id: r } = t;
            return {
              ...e,
              triggeredRuleRequesting: e.triggeredRuleRequesting.filter(
                (e) => e !== r
              ),
            };
          }),
          e(te.zr, (e, t) => ({
            ...e,
            triggeredRuleError: e.triggeredRuleError.concat(t),
            triggeredRuleRequesting: e.triggeredRuleRequesting.filter(
              (e) => e !== t.id
            ),
          })),
          e(te.OM, (e, t) => {
            let { id: r } = t;
            return {
              ...e,
              triggeredRuleError: e.triggeredRuleError.filter(
                (e) => e.id !== r
              ),
              triggeredRuleRequesting: e.triggeredRuleRequesting.filter(
                (e) => e !== r
              ),
              triggeredRuleSuccess: e.triggeredRuleSuccess.filter(
                (e) => e.id !== r
              ),
            };
          }),
          e(te.Wq, (e) => ({ ...e, isCustomerBirthdaySubmitting: !0 })),
          e(te.tv, (e) => ({
            ...e,
            isCustomerBirthdaySubmitSuccess: !0,
            isCustomerBirthdaySubmitting: !1,
          })),
          e(te.EE, (e, t) => {
            let { error: r } = t;
            return {
              ...e,
              customerBirthdaySubmitError: r,
              isCustomerBirthdaySubmitting: !1,
            };
          }),
          e(te.yv, (e) => ({
            ...e,
            customerBirthdaySubmitError: null,
            isCustomerBirthdaySubmitSuccess: !1,
            isCustomerBirthdaySubmitting: !1,
          })),
          e(te.$N, (e) => ({ ...e, isCustomerNewsletterSignupSubmitting: !0 })),
          e(te.Am, (e, t) => ({
            ...e,
            customerNewsletterSignupSuccess: t,
            isCustomerNewsletterSignupSubmitting: !1,
          })),
          e(te.WK, (e, t) => {
            let { error: r } = t;
            return {
              ...e,
              customerNewsletterSignupError: r,
              isCustomerNewsletterSignupSubmitting: !1,
            };
          }),
          e(te.AI, (e) => ({
            ...e,
            customerNewsletterSignupError: null,
            customerNewsletterSignupSuccess: null,
            isCustomerNewsletterSignupSubmitting: !1,
          })),
          e(te.pU.setEmbedded, (e, t) => {
            let { value: r } = t;
            return { ...e, isEmbedded: r };
          }),
        ]),
        Tt = (e) =>
          (0, H.PH)("[products on page] update product", { product: e }),
        Ht = (0, pe.combineReducers)({
          allIds: (0, H.Lq)(xe.allIds, (e) => [
            e(Tt, (e, t) => {
              let { product: r } = t;
              return e.includes(r.id) ? e : e.concat(r.id);
            }),
          ]),
          byId: (0, H.Lq)(xe.byId, (e) => [
            e(Tt, (e, t) => {
              let {
                product: { id: r, price: i },
              } = t;
              return { ...e, [r]: { ...e[r], id: r, price: i } };
            }),
          ]),
        });
      var Ot = r(2138);
      const Lt = (0, H.Lq)(Ue, (e) => [
        e(Ot.av, (e, t) => {
          let { values: r } = t;
          return {
            ...e,
            emailForm: {
              ...e.emailForm,
              values: { ...e.emailForm.values, ...r },
            },
          };
        }),
        e(Ot.nX, (e) => ({
          ...e,
          emailForm: { ...e.emailForm, submitting: !0 },
        })),
        e(Ot.$s, (e) => ({
          ...e,
          emailForm: {
            ...e.emailForm,
            submitting: !1,
            submitSuccess: !0,
            values: { ...e.emailForm.values, recipients: "" },
          },
        })),
        e(Ot.xN, (e) => ({
          ...e,
          emailForm: { ...e.emailForm, submitting: !1, submitSuccess: !1 },
        })),
      ]);
      var Zt = r(344),
        Dt = r(5273);
      const Wt = (0, H.Lq)(Je, (e) => [
        e(G.d3, (e, t) => {
          let { id: r } = t;
          return { ...e, redeemRewardModalOpenFor: r };
        }),
        e(G.Fc, (e) => ({ ...e, redeemRewardModalClosing: !0 })),
        e(G.ql, (e) => Nt(e)),
        e(u.j, (e) => ({
          ...Nt(e),
          customRewardDescriptionModalOpenFor: null,
        })),
        e(G.YD, (e, t) => {
          let { id: r } = t;
          return { ...e, customRewardDescriptionModalOpenFor: r };
        }),
        e(G.Ki, (e) => ({ ...e, customRewardDescriptionModalOpenFor: null })),
        e(G.bn, (e, t) => {
          let { id: r } = t;
          return { ...e, redeemingRewardFor: r };
        }),
        e(G.WH, (e, t) => {
          const r = e.redeemRewardErrors[t.id],
            i =
              r && (0, K.GK)(r.name)
                ? {
                    ...r,
                    affectedVariants: [
                      ...(r.affectedVariants ?? []),
                      ...(t.error.affectedVariants ?? []),
                    ],
                  }
                : t.error;
          return {
            ...e,
            redeemRewardErrors: { ...e.redeemRewardErrors, [t.id]: i },
            redeemingRewardFor: null,
          };
        }),
        e(G.zS, (e, t) => ({
          ...e,
          redeemRewardErrors: { ...e.redeemRewardErrors, [t.id]: void 0 },
          redeemRewardSuccess: t,
          redeemingRewardFor: null,
        })),
        e(G.Aj, (e, t) => {
          let { id: r } = t;
          const i = e.redeemRewardErrors[r];
          return {
            ...e,
            redeemRewardErrors: Bt(e, { id: r }, i),
            redeemRewardSuccess: null,
            redeemingRewardFor: null,
          };
        }),
        e(G.AG, (e, t) => {
          const r = e.redeemRewardErrors[t.id];
          return {
            ...e,
            redeemRewardErrors: Bt(e, t, r),
            redeemRewardSuccess: t,
            redeemingRewardFor: null,
          };
        }),
        e(G.Kh, (e, t) => {
          let { id: r } = t;
          return {
            ...e,
            redeemRewardErrors: { ...e.redeemRewardErrors, [r]: void 0 },
            redeemRewardSuccess: null,
            redeemingRewardFor: null,
          };
        }),
        e(G.Ge, (e, t) => {
          let { id: r } = t;
          return {
            ...e,
            apply: (0, H.Fo)(
              e.apply,
              r,
              (e) => ({ ...e, isApplying: !0 }),
              Zt.h
            ),
          };
        }),
        e(G.hB, (e, t) => {
          let { id: r } = t;
          return { ...e, apply: (0, H.Fo)(e.apply, r, (e) => Zt.h, Zt.h) };
        }),
        e(G.rB, (e, t) => {
          let { id: r, canBeApplied: i } = t;
          return {
            ...e,
            apply: (0, H.Fo)(
              e.apply,
              r,
              (e) => ({ ...e, canBeApplied: i }),
              Zt.h
            ),
          };
        }),
        e(G.Ro, (e, t) => {
          let { id: r, applyResult: i } = t;
          return {
            ...e,
            apply: (0, H.Fo)(
              e.apply,
              r,
              (e) => ({ ...e, applyResult: i, isApplying: !1 }),
              Zt.h
            ),
          };
        }),
      ]);
      function Bt(e, t, r) {
        return {
          ...e.redeemRewardErrors,
          [t.id]: r && (0, K.GK)(r.name) ? r : void 0,
        };
      }
      function Nt(e) {
        const t = e.redeemRewardErrors,
          r = e.redeemRewardModalOpenFor;
        return {
          ...e,
          redeemRewardErrors: ((e) => {
            if (null === r || !t[r]) return e;
            const i = t[r]?.name;
            return i && ((0, K.GK)(i) || (0, Dt.sH)(i))
              ? e
              : { ...e, [r]: void 0 };
          })(t),
          redeemRewardModalOpenFor: null,
          redeemRewardSuccess: null,
          redeemRewardModalClosing: !1,
        };
      }
      const Ut = (0, H.Lq)(Ye, (e) => [
          e(O, (e, t) => {
            let { revision: r } = t;
            return { ...e, revision: r };
          }),
          e(L, (e, t) => {
            let { build: r } = t;
            return { ...e, build: r };
          }),
        ]),
        Vt = (0, H.Lq)(null, (e) => [
          e(Z, (e, t) => {
            let { authPacket: r } = t;
            return r;
          }),
        ]);
      var xt = r(9172),
        $t = r(2307);
      const jt = (0, H.Lq)(null, (e) => [
        e(D.Xg, (e, t) => {
          let { customer: r } = t;
          return {
            ...r,
            actions: r.actions
              .concat()
              .map((e) => ({ ...e, id: e.id || T.V.v4() })),
            claimedRewards: r.claimedRewards
              .concat()
              .sort(
                (e, t) =>
                  new Date(t.claimed_at).getTime() -
                  new Date(e.claimed_at).getTime()
              ),
          };
        }),
        e(D.pD, (e, t) => {
          let { points: r } = t;
          if (!e) throw new $t.G("Cannot set points without a customer");
          return { ...e, ...r };
        }),
        e(D.uG, (e, t) => {
          let { customer: r } = t;
          if (!e)
            throw new $t.G("UpdateCustomer requires a set customer first");
          return (
            (i = e),
            (n = r),
            {
              ...i,
              ...n,
              actions: n.actions ? n.actions.concat(i.actions) : i.actions,
              claimedRewards: n.claimedRewards
                ? n.claimedRewards
                    .concat(i.claimedRewards)
                    .sort(
                      (e, t) =>
                        new Date(t.claimed_at).getTime() -
                        new Date(e.claimed_at).getTime()
                    )
                : i.claimedRewards,
              completedRules: n.completedRules
                ? n.completedRules.concat(i.completedRules)
                : i.completedRules,
              pendingNotifications: n.pendingNotifications
                ? n.pendingNotifications.concat(i.pendingNotifications)
                : i.pendingNotifications,
              ruleContext: n.ruleContext
                ? (0, xt.Yr)(i.ruleContext, n.ruleContext)
                : i.ruleContext,
            }
          );
          var i, n;
        }),
        e(D.hd, (e, t) => {
          let { action: r } = t;
          if (!e)
            throw new $t.G("UpdateCustomer requires a set customer first");
          return { ...e, actions: [r, ...e.actions] };
        }),
        e(D.wO, (e, t) => {
          let { claimedReward: r } = t;
          if (!e)
            throw new $t.G("UpdateCustomer requires a set customer first");
          return { ...e, claimedRewards: [r, ...e.claimedRewards] };
        }),
        e(D.mp, (e, t) => {
          let { claimedReward: r } = t;
          if (!e)
            throw new $t.G("UpdateCustomer requires a set customer first");
          return {
            ...e,
            claimedRewards: e.claimedRewards.map((e) =>
              e.id === r.id ? r : e
            ),
          };
        }),
        e(D.$A, (e, t) => {
          let { completedRule: r } = t;
          if (!e)
            throw new $t.G("UpdateCustomer requires a set customer first");
          return { ...e, completedRules: [r, ...e.completedRules] };
        }),
      ]);
      const Gt = (0, H.Lq)(Qe, (e) => [
        e(W.Y, (e, t) => {
          let { translations: r } = t;
          return { ...e, translations: r };
        }),
      ]);
      var Xt = r(1635);
      const zt = (0, H.Lq)(je, (e) => [
        e(Xt.ql, (e, t) => {
          let { sdkState: r } = t;
          return { ...e, twitterSdk: r };
        }),
        e(Xt.mC, (e, t) => {
          let { sdkState: r } = t;
          return { ...e, facebook: { ...e.facebook, sdkState: r } };
        }),
        e(Xt.Ks, (e, t) => {
          let { addresses: r } = t;
          return { ...e, recharge: { ...e.recharge, addresses: r } };
        }),
        e(Xt.WP, (e, t) => {
          let { error: r } = t;
          return { ...e, recharge: { ...e.recharge, error: r } };
        }),
      ]);
      var Yt = r(4494);
      const Kt = (0, pe.combineReducers)({
          allIds: (0, H.Lq)(Ve.allIds, (e) => [
            e(B.wN, (e, t) => {
              let { notification: r } = t;
              return e.concat(r.id);
            }),
            e(B.no, (e, t) => {
              let { id: r } = t;
              return e.filter((e) => e !== r);
            }),
            e(B.L1, () => []),
          ]),
          byId: (0, H.Lq)(Ve.byId, (e) => [
            e(B.wN, (e, t) => {
              let { notification: r } = t;
              return { ...e, [r.id]: r };
            }),
            e(B.wD, (e, t) => {
              let { notification: r } = t;
              return (0, Yt.XP)(e).includes(r.id) ? { ...e, [r.id]: r } : e;
            }),
            e(B.no, (e, t) => {
              let { id: r } = t;
              const { [r]: i, ...n } = e;
              return n;
            }),
            e(B.L1, () => ({})),
          ]),
        }),
        Jt = (0, H.Lq)(null, (e) => [
          e(N.M.update, (e, t) => {
            let { program: r } = t;
            return r;
          }),
          e(N.M.addRule, (e, t) => {
            let { rule: r } = t;
            return e ? { ...e, rules: [...e.rules, r] } : null;
          }),
        ]);
      var Qt = r(1752);
      const er = (0, H.Lq)(Ke, (e) => [
        e(Qt.XH, (e) => ({ ...e, ...Ke, isFetching: !0 })),
        e(Qt.Of, (e, t) => {
          let { error: r } = t;
          return { ...e, isFetching: !1, error: r };
        }),
        e(Qt.BW, (e, t) => {
          let { code: r } = t;
          return { ...e, isFetching: !1, value: r };
        }),
      ]);
      var tr = r(7960);
      const rr = (0, H.Lq)($e, (e) => [
          e(tr.Bw, (e, t) => {
            let { open: r } = t;
            return { ...e, isModalOpen: r };
          }),
          e(tr.C_, (e) => ({ ...e, isModalOpen: !1 })),
          e(tr.OJ, (e, t) => {
            let { open: r } = t;
            return { ...e, isDiscountAppliedModalOpen: r };
          }),
          e(u.j, (e) => ({
            ...e,
            isModalOpen: !1,
            isDiscountAppliedModalOpen: !1,
          })),
          e(tr.jk, (e, t) => {
            let { referralBlocked: r } = t;
            return { ...e, referralBlocked: r };
          }),
        ]),
        ir = function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : et;
          return {
            ...e,
            customer: null,
            authPacket: null,
            integrations: { ...e.integrations, recharge: {} },
            loyaltyPanel: {
              ...e.loyaltyPanel,
              customerBirthdaySubmitError: null,
              customerNewsletterSignupError: null,
              customerNewsletterSignupSuccess: null,
              historyInfoModalOpenFor: null,
              isCustomerBirthdaySubmitSuccess: !1,
              isCustomerBirthdaySubmitting: !1,
              isCustomerNewsletterSignupSubmitting: !1,
              isPendingPointsHelpModalOpen: !1,
              ruleActionModalOpenFor: null,
              isReferralWidgetModalOpen: !1,
              triggeredRuleError: [],
              triggeredRuleRequesting: [],
              triggeredRuleSuccess: [],
            },
            notifications: { allIds: [], byId: {} },
            page: {
              ...e.page,
              initData: {
                token: e.page.initData?.token,
                auth: void 0,
                customer: void 0,
              },
            },
            referralWidget: et.referralWidget,
            rewards: {
              customRewardDescriptionModalOpenFor: null,
              isRewardDescriptionModalOpen: !1,
              redeemingRewardFor: null,
              redeemRewardErrors: {},
              redeemRewardModalOpenFor: null,
              redeemRewardModalClosing: !1,
              redeemRewardSuccess: null,
              apply: {},
            },
            shopify: { ...et.shopify },
            appTurnkey: {
              ...et.appTurnkey,
              customisations: e.appTurnkey.customisations,
              clientConfig: e.appTurnkey.clientConfig,
            },
          };
        },
        nr = function () {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : et,
            t = arguments.length > 1 ? arguments[1] : void 0;
          return { ...e, ...t };
        },
        or = (0, H.Lq)(Ge, (e) => [
          e(V.RV, (e, t) => {
            let { cart: r } = t;
            return { ...e, cart: r };
          }),
          e(V.mK, (e, t) => {
            let { variants: r } = t;
            return { ...e, cartRewardVariants: r };
          }),
          e(V.Lk, (e, t) => {
            let { variant: r } = t;
            return { ...e, cartRewardVariants: [...e.cartRewardVariants, r] };
          }),
          e(V.XX, (e, t) => {
            let { variant: r } = t;
            return {
              ...e,
              cartRewardVariants: e.cartRewardVariants.filter(
                (e) => e.id !== r.id
              ),
            };
          }),
          e(V.Gm, (e, t) => {
            let { redemptions: r } = t;
            return { ...e, shopifyScriptRedemptions: r };
          }),
          e(V.Gz, (e, t) => {
            let { redemption: r } = t;
            return {
              ...e,
              shopifyScriptRedemptions: [...e.shopifyScriptRedemptions, r],
            };
          }),
          e(V.ie, (e, t) => {
            let { redemption: r } = t;
            return {
              ...e,
              shopifyScriptRedemptions: e.shopifyScriptRedemptions.filter(
                (e) => e.id !== r.id
              ),
            };
          }),
          e(V.lQ, (e, t) => {
            let { value: r } = t;
            return { ...e, onThankYou: r };
          }),
          e(V.lP, (e, t) => {
            let { currency: r } = t;
            return { ...e, localCurrency: r };
          }),
          e(V.D4, (e) => ({
            ...e,
            localCurrencyFailedAttempts: e.localCurrencyFailedAttempts + 1,
          })),
          e(V.wh, (e) => ({ ...e, localCurrencyFailedAttempts: 0 })),
          e(V.LT, (e) => ({ ...e, buyWithPointsStatus: "started" })),
          e(V.vj, (e) => ({ ...e, buyWithPointsStatus: "stopped" })),
          e(V.wY, (e, t) => {
            let { frontend: r } = t;
            return { ...e, frontend: r };
          }),
        ]),
        sr = (0, H.Lq)(null, (e) => [
          e(x.nH, (e, t) => {
            let { site: r } = t;
            return r;
          }),
          e(x.L3, (e, t) => {
            let { site: r } = t;
            return e ? { ...e, ...r } : null;
          }),
          e(x.wo, (e, t) => {
            let { locale: r } = t;
            return e
              ? {
                  ...e,
                  settings: {
                    ...e.settings,
                    locale: { ...e.settings.locale, primary: r },
                  },
                }
              : null;
          }),
          e(x.h_, (e, t) => {
            let { sections: r } = t;
            return e
              ? {
                  ...e,
                  settings: {
                    ...e.settings,
                    integratedLoyaltyPage: {
                      ...e.settings.integratedLoyaltyPage,
                      sections: r,
                    },
                  },
                }
              : null;
          }),
          e(x.Ws, (e, t) => (e ? { ...e, themeConfiguration: t } : null)),
          e(x._G, (e, t) => (e ? { ...e, siteThemeContent: t } : null)),
        ]),
        ar = (0, pe.combineReducers)({
          app: ct,
          api: Ut,
          authPacket: Vt,
          browser: Oe.T,
          checkoutRedemption: Mt,
          clientConfiguration: De,
          customer: jt,
          controlMode: w.z1,
          emailTracking: He,
          hooks: We.As,
          integrations: zt,
          isLoyaltySplashOrPanelModalOpen: qt,
          loyaltyPanel: Ft,
          notifications: Kt,
          page: Be.kA,
          productsOnPage: Ht,
          program: Jt,
          referralWidget: Lt,
          referred: rr,
          refereeIncentiveCode: er,
          rewards: Wt,
          shopify: or,
          site: sr,
          appTurnkey: qe,
          i18n: Gt,
        }),
        cr = (e, t) => {
          switch (t.type) {
            case U.Q.RemoveCustomer:
              return ir(e);
            case U.Q.ChangeState:
              return nr(e, t.payload);
            default:
              return ar(e, t);
          }
        };
      var lr = r(8410);
      var dr = r(2935);
      const ur = (function ({
          sentry: e,
          actionTransformer: t = (e) => e,
          stateTransformer: r = (e) => e,
          configureSentryWithState: i,
        }) {
          return (n) => (o, s) =>
            n((n, s) => {
              const a = o(n, s),
                c = t(s),
                l = r(a);
              return (
                c &&
                  e.addBreadcrumb({
                    category: "redux.action",
                    type: "info",
                    data: c,
                  }),
                e.setContext("redux.state", l || null),
                null == i || i(e, a, s),
                a
              );
            }, s);
        })({
          sentry: dr.D_,
          stateTransformer: (e) =>
            (function (e) {
              const { customer: t, site: r, program: i } = e;
              return {
                ...e,
                customer: t ? (0, Yt.ei)(t, ["id"]) : null,
                site: r ? (0, Yt.ei)(r, ["id"]) : null,
                program: i ? (0, Yt.ei)(i, ["id"]) : null,
              };
            })(e),
          actionTransformer: (e) =>
            (function (e) {
              switch (e.type) {
                case pr.type:
                  return {
                    ...e,
                    payload: {
                      site: (0, Yt.ei)(e.payload.site, ["id", "domain"]),
                    },
                  };
                case gr.type:
                  return {
                    ...e,
                    payload: {
                      program: (0, Yt.ei)(e.payload.program, ["id", "name"]),
                    },
                  };
                case hr.type:
                  return {
                    ...e,
                    payload: {
                      customer: (0, Yt.ei)(e.payload.customer, ["id"]),
                    },
                  };
                default:
                  return e;
              }
            })(e),
          configureSentryWithState(e, t, r) {
            !(function (e) {
              switch (e.type) {
                case pr.type:
                  return (function (e) {
                    const t = {
                      ...e,
                      settings: (0, Yt.CE)(e.meta, [
                        "loyaltyPanelCustomisationDigest",
                        "legacyUiMigration",
                      ]),
                    };
                    dr.D_.setContext("site", t),
                      dr.D_.setTags({
                        "site.id": e.id,
                        "site.token": e.token,
                        "site.domain": e.domain,
                        "site.platform": e.platform,
                        "site.role": e.role,
                        "site.ui_mode": e.uiMode,
                      });
                  })(e.payload.site);
                case gr.type:
                  return (function (e) {
                    dr.D_.setContext("program", e),
                      dr.D_.setTags({ "program.id": e.id });
                  })(e.payload.program);
                case hr.type:
                  return fr(e.payload.customer);
                case mr.type:
                  return fr(null);
                default:
              }
            })(r);
          },
        }),
        pr = (0, H.BO)(x.nH),
        hr = (0, H.BO)(D.Xg),
        mr = (0, H.BO)(U.N.removeCustomer),
        gr = (0, H.BO)(N.M.update);
      function fr(e) {
        const t = e
          ? {
              ...(0, Yt.CE)(e, [
                "firstName",
                "fullName",
                "birthday",
                "actions",
                "claimedRewards",
              ]),
              properties: (0, Yt.ei)(e.properties, ["rechargeHash"]),
              pendingNotifications: e.pendingNotifications.slice(0, 10),
            }
          : null;
        dr.D_.setContext("customer", t),
          dr.D_.setUser(e ? { id: e.id.toString() } : null),
          dr.D_.setTags({
            "customer.id": e?.id,
            "customer.merchant_id": e?.merchantId,
            "customer.enrolled": e?.enrolled,
            "customer.blocked": e?.blocked,
            "customer.guest": e?.guest,
          });
      }
      const yr = [
        (e) => {
          let { dispatch: t, getState: r } = e;
          return (e) => (i) => {
            if ("function" == typeof i)
              try {
                const e = i(t, r);
                return (
                  (n = e),
                  Boolean(n && "function" == typeof n.then)
                    ? e.catch((e) => {
                        y.k.error("Thunk Error: ", { err: e, state: r() });
                      })
                    : e
                );
              } catch (e) {
                return y.k.error("Thunk Error: ", { err: e, state: r() }), e;
              }
            var n;
            return e(i);
          };
        },
        (e) => {
          let { getState: t } = e;
          return (e) => (r) => {
            try {
              return e(r);
            } catch (e) {
              return (
                y.k.error(`Reducer Error: ${e.message}`, {
                  err: e,
                  state: t(),
                }),
                e
              );
            }
          };
        },
        h.ZP,
      ];
      r(9630);
      var wr = r(7689),
        kr = r(7326),
        vr = r(6030),
        br = r(6166),
        Sr = r(7596);
      class Rr extends Error {
        constructor(...e) {
          super(...e), (this.name = "NoShopifyCartVariantsError");
        }
      }
      var Cr = r(6777),
        Pr = r(5170),
        _r = r(8268),
        Ar = r(5392);
      class Ir {
        async start() {
          "not_started" === this.getStatus() &&
            this.buyWithPointsEnabled() &&
            ((0, re._V)(this.state)
              ? (await this.fetchOwnedFreeProductVariants(),
                await this.cancelMissingRewardLineItems(),
                await this.cleanShopifyCart(),
                (this.unsubscribe = M(this.store, (e, t) => {
                  const r = (0, _r.Iq)(e),
                    i = t && (0, _r.Iq)(t);
                  r !== i &&
                    this.onCartUpdate(i, r).catch((e) => {
                      y.k.error("failed to handle cart update", { err: e }),
                        this.stopBuyWithPoints();
                    });
                })),
                this.store.dispatch((0, V.LT)()))
              : await this.removeLineItemsFromCartAndReload(
                  this.cartRewardLineItems
                ));
        }
        async onCartUpdate(e, t) {
          if ("started" === this.getStatus()) {
            if (!t)
              throw new Cr.T(
                "BuyWithPoints onCartUpdate requires at least a newCart"
              );
            (e && E.uX.cartsEqual(e, t)) ||
              (await this.cancelMissingRewardLineItems(),
              await this.cleanShopifyCart());
          }
        }
        buyWithPointsEnabled() {
          return (
            !(0, k.vD)(this.store.getState()) &&
            (0, K.Iy)(this.state).length > 0
          );
        }
        async fetchOwnedFreeProductVariants() {
          const e = await this.api.customers.fetchFreeProductVariants(
            this.cart.token
          );
          if (!("error" in e)) return e.variants;
          y.k.error("Error fetching free product variants for cart", {
            cartToken: this.cart.token,
            apiError: e.error,
          }),
            this.stopBuyWithPoints();
        }
        async cancelVariant(e) {
          if (
            !this.cartVariants.map((e) => e.variant_id).includes(e.toString(10))
          )
            return;
          const t = await this.api.customers.cancelFreeProductVariant(e);
          "error" in t &&
            y.k.error(
              `Error cancelling reward variant: ${e}, message: ${
                t.error.message ?? ""
              }`
            );
        }
        async cleanShopifyCart() {
          if (0 === this.cart.items.length) return;
          const e = [];
          if (
            ((0, m.pm)(this.state) &&
              !E.uX.cartHasPaidItems(this.cart) &&
              e.push(...this.cartRewardLineItems),
            e.push(...this.getUnownedCartVariants()),
            (0, m.$Q)(this.state) &&
              e.push(...this.getItemsToRemoveToBalanceCart()),
            e.length > 0)
          ) {
            const t = (0, xt.mN)(e, (e) => e.variant_id);
            await this.cancelRewardLineItems(t),
              await this.removeLineItemsFromCartAndReload(t);
          }
        }
        stopBuyWithPoints() {
          this.unsubscribe?.(), this.store.dispatch((0, V.vj)());
        }
        getStatus() {
          return (0, Pr.qk)(this.store.getState());
        }
        getUnownedCartVariants() {
          const e = this.cartVariants.map((e) => e.variant_id);
          return this.cartRewardLineItems.filter(
            (t) => !e.includes(t.variant_id.toString(10))
          );
        }
        getItemsToRemoveToBalanceCart() {
          const e = [];
          let t = (0, Ar.h)(this.state);
          if (t < 0)
            for (const r of this.cartRewardLineItems) {
              if (!r.variant_id) continue;
              const i = this.cartVariants.find(
                  (e) => e.variant_id === r.variant_id.toString(10)
                ),
                n = (0, K.tn)(this.state, i?.base_variant_id);
              if (
                n &&
                (y.k.info(
                  `Removing inCartReward line item (variantId: ${r.variant_id}) as instant-points balance no longer covers cost.`
                ),
                e.push(r),
                (t += n.point_cost),
                t >= 0)
              )
                return e;
            }
          return e;
        }
        async cancelMissingRewardLineItems() {
          const e = this.cart.items.map((e) => e.variant_id.toString(10)),
            t = this.cartVariants;
          for (const r of t)
            e.includes(r.variant_id) ||
              (y.k.info(
                `Deleting variant: ${r.variant_id} because it is no longer in cart`
              ),
              await this.cancelVariant((0, Sr.BA)(r.variant_id)));
        }
        async cancelRewardLineItems(e) {
          for (const t of e) await this.cancelVariant(t.variant_id);
        }
        async removeLineItemsFromCartAndReload(e) {
          if (0 === e.length) return;
          if (!(await E.OP.removeItemsFromCart(e)))
            return (
              y.k.error("Stopped buy with points - lost cart"),
              void this.stopBuyWithPoints()
            );
          this.emitItemsRemoved(e),
            f.u.listenerCount("cart.changed") ||
              f.u.listenerCount("cart.removedItems") ||
              window.location.reload();
        }
        emitItemsRemoved(e) {
          (0, f.j)({ event: "cart.removedItems", payload: e }),
            (0, f.j)({ event: "cart.changed" });
        }
        get cartRewardLineItems() {
          const e = this.cart.items,
            t = (0, K.Iy)(this.state);
          return e
            .filter((e) => /Reward #/.test(e.variant_title ?? ""))
            .filter((e) =>
              t.some((t) =>
                t.target_products.some((t) => t.id === e.product_id)
              )
            );
        }
        get cartVariants() {
          const e = (0, _r.po)(this.state);
          if (!e)
            throw new Rr("Shopify Cart Variants required for Buy With Points");
          return e;
        }
        get cart() {
          const e = (0, _r.Iq)(this.state);
          if (!e) throw new Cr.T("");
          return e;
        }
        get state() {
          return this.store.getState();
        }
        get api() {
          return d.H.buildFromState(this.state, this.store.dispatch);
        }
        constructor(e) {
          this.store = e;
        }
      }
      var Mr = r(8349),
        Er = r(9544),
        qr = r(9119);
      class Fr {
        async start() {
          "not_started" === this.getManagerStatus() &&
            this.buyWithPointsEnabled() &&
            ((0, re._V)(this.getState())
              ? (0, Er.v)(this.getState())
                ? (await this.fetchRedemptionsForCart(),
                  await this.cancelMissingRewardLineItems(),
                  await this.cleanShopifyCart(),
                  (this.unsubscribe = M(this.store, (e, t) => {
                    const r = (0, _r.Iq)(e),
                      i = t && (0, _r.Iq)(t);
                    r !== i &&
                      this.onCartUpdate(i, r).catch((e) => {
                        y.k.error("failed to handle cart update", { err: e }),
                          this.stopBuyWithPoints();
                      });
                  })),
                  this.store.dispatch((0, V.LT)()))
                : this.stopBuyWithPoints()
              : await this.removeLineItemsFromCartAndReload(
                  this.getLineItemsWithDiscountProperty()
                ));
        }
        async onCartUpdate(e, t) {
          if ("started" === this.getManagerStatus()) {
            if (!t)
              throw new Cr.T(
                "BuyWithPoints onCartUpdate requires at least a newCart"
              );
            (e && E.uX.cartsEqual(e, t)) ||
              (await this.cancelMissingRewardLineItems(),
              await this.cleanShopifyCart());
          }
        }
        async cleanShopifyCart() {
          if (0 === this.getCart().items.length) return;
          const e = this.getLineItemsToRemove();
          if (0 !== e.length) {
            for (const t of e) {
              const e = Or(t, this.getState());
              e && (await this.cancelRedemption(e));
            }
            await this.removeLineItemsFromCartAndReload(e);
          }
        }
        getLineItemsToRemove() {
          if (0 === this.getCart().items.length) return [];
          const e = [];
          return (0, m.pm)(this.getState()) &&
            !E.uX.cartHasPaidItems(this.getCart())
            ? this.getLineItemsWithDiscountProperty()
            : (e.push(...this.getUnexpectedRewardLineItems()),
              e.push(...this.getDuplicateRewardLineItems()),
              (0, m.$Q)(this.getState()) &&
                e.push(...this.getItemsToRemoveToBalanceCart()),
              (0, xt.mN)(e, (e) => e.key));
        }
        async fetchRedemptionsForCart() {
          try {
            await this.getLionApi().customers.fetchShopifyScriptProductRedemptions(
              { cartIdentifier: this.getCart().token }
            );
          } catch (e) {
            y.k.error("Error fetching script redemptions for cart", { err: e }),
              this.stopBuyWithPoints();
          }
        }
        async cancelMissingRewardLineItems() {
          const e = (0, _r.eI)(this.getState()),
            t = this.getLineItemsWithDiscountProperty();
          for (const r of e) {
            t.some((e) => Tr(e, r.metadata.encodedContext)) ||
              (await this.cancelRedemption(r));
          }
        }
        getUnexpectedRewardLineItems() {
          const e = this.getLineItemsWithDiscountProperty(),
            t = (0, _r.eI)(this.getState()).map(
              (e) => e.metadata.encodedContext
            );
          return e.filter((e) => {
            const r = Hr(e);
            return !t.includes(r ?? "");
          });
        }
        getDuplicateRewardLineItems() {
          const e = this.getLineItemsWithDiscountProperty(),
            t = e.reduce((e, t) => {
              const r = Hr(t);
              return r ? ((e[r] = e[r] ? e[r] + 1 : 1), e) : e;
            }, {});
          return e.filter((e) => {
            const r = Hr(e);
            return !!r && t[r] > 1;
          });
        }
        getItemsToRemoveToBalanceCart() {
          const e = [];
          let t = (0, Ar.h)(this.getState());
          if (t >= 0) return e;
          const r = this.getLineItemsWithValidRedemptions();
          for (const { line: i, redemption: n } of r) {
            const r = (0, qr.ci)(n, this.getCart(), this.getState());
            if (
              (y.k.info(
                `Removing inCartReward line item (variantId: ${n.product.variantId}) as instant-points balance no longer covers cost.`
              ),
              e.push(i),
              (t += r),
              t >= 0)
            )
              return e;
          }
          return e;
        }
        getLineItemsWithValidRedemptions() {
          return this.getLineItemsWithDiscountProperty()
            .map((e) => {
              const t = Or(e, this.getState());
              return t ? { redemption: t, line: e } : null;
            })
            .filter((e) => !!e);
        }
        getLineItemsWithDiscountProperty() {
          return this.getCart().items.filter(
            E.uX.lineHasScriptDiscountProperty
          );
        }
        async cancelRedemption(e) {
          for (const t of e.usages.filter((e) => "claimed" === e.status))
            await this.getLionApi().customers.cancelShopifyScriptProductRedemptionUsage(
              { usageId: t.id }
            );
          this.store.dispatch((0, V.ie)(e));
        }
        async removeLineItemsFromCartAndReload(e) {
          if (0 === e.length) return;
          const t = await E.OP.removeItemsFromCart(e);
          if (!t)
            return (
              y.k.error("Stopped buy with points - lost cart"),
              void this.stopBuyWithPoints()
            );
          this.store.dispatch((0, V.RV)(t)),
            (0, f.j)({ event: "cart.removedItems", payload: e }),
            (0, f.j)({ event: "cart.changed" }),
            f.u.listenerCount("cart.changed") > 0 ||
              f.u.listenerCount("cart.removedItems") > 0 ||
              window.location.reload();
        }
        stopBuyWithPoints() {
          this.unsubscribe?.(), this.store.dispatch((0, V.vj)());
        }
        getState() {
          return this.store.getState();
        }
        getCart() {
          const e = (0, _r.Iq)(this.getState());
          if (!e) throw new Cr.T("");
          return e;
        }
        getManagerStatus() {
          return (0, Pr.qk)(this.getState());
        }
        buyWithPointsEnabled() {
          return (
            !(0, k.vD)(this.getState()) && (0, K.Iy)(this.getState()).length > 0
          );
        }
        getLionApi() {
          return d.H.buildFromState(this.getState(), this.store.dispatch);
        }
        constructor(e) {
          this.store = e;
        }
      }
      function Tr(e, t) {
        const r = Hr(e);
        return !!r && r === t;
      }
      function Hr(e) {
        return e.properties ? e.properties[Mr.c] : null;
      }
      function Or(e, t) {
        return (
          (0, _r.eI)(t).find((t) => t.metadata.encodedContext === Hr(e)) ?? null
        );
      }
      var Lr = r(4274),
        Zr = ["earn", "rewards", "refer", "tiers", "history", "help"];
      const Dr = ["redeem", "account"];
      function Wr(e) {
        const t = e.toLowerCase();
        if (
          (function (e) {
            return Dr.includes(e);
          })(t)
        )
          switch (t) {
            case "account":
              return "history";
            case "redeem":
              return "rewards";
          }
        return (function (e) {
          return (0, Lr.q9)(Zr, e);
        })(t)
          ? t
          : null;
      }
      const Br = [{ name: "refer" }, { name: "account-link" }],
        Nr = [{ name: "checkoutSlider" }, { name: "loyaltyWidget" }],
        Ur = [
          { name: "account" },
          { name: "history-table", requiresFeature: "sdkComponentAdvanced" },
          {
            name: "claimed-rewards-list",
            requiresFeature: "sdkComponentAdvanced",
          },
          { name: "points", requiresCustomer: !0 },
          { name: "points-for" },
          { name: "points-for-id" },
          { name: "points-for-product-id" },
          { name: "points-for-rule" },
          { name: "referral-url", requiresCustomer: !0 },
          { name: "rewards-list", requiresFeature: "sdkComponentAdvanced" },
          { name: "rules-list", requiresFeature: "sdkComponentAdvanced" },
          { name: "seamless-product-reward", requiresCustomer: !0 },
          {
            name: "seamless-product-reward-widget",
            requiresCustomer: !0,
            requiresFeature: "sdkComponentInCartRewards",
          },
          { name: "current-tier-name" },
          { name: "tier-overview" },
          { name: "tier-benefits-compare" },
          { name: "tier-rewards-compare" },
          { name: "tier-rules-compare" },
          { name: "powered-by" },
          { name: "integrated-page", requiresFeature: "integratedPage" },
          {
            name: "integrated-page-section",
            requiresFeature: "integratedPage",
          },
          { name: "app-styles" },
        ];
      function Vr(e) {
        const t = [...Nr, ...Ur];
        return (0, xt.VS)(t, (t) =>
          "requiresCustomer" in t && !e ? null : xr(t, { removeChildren: !0 })
        ).filter(_.C_);
      }
      function xr(e) {
        let { removeChildren: t } =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        const r = `data-lion-${e.name}`,
          i = `*[${r}]`,
          n = document.querySelectorAll(i);
        return (0, Lr.Oc)(n).map(
          (i) => (
            t && (i.innerHTML = ""),
            { definition: e, element: i, attribute: i.getAttribute(r) ?? "" }
          )
        );
      }
      class $r {
        scan() {
          const e = [];
          (0, xt.VS)(Br, (e) => xr(e))
            .filter(_.C_)
            .forEach((t) => {
              this.isAlreadyAugmented(t.element) ||
                (!(function (e, t) {
                  const { attribute: r, element: i, definition: n } = e;
                  switch (
                    ((i && i instanceof Element) ||
                      y.k.error(
                        `Invalid attempt to augment element: ${i} for selector: ${r}`,
                        { augmentationElement: e }
                      ),
                    n.name)
                  ) {
                    case "refer":
                      i.addEventListener("click", (e) => {
                        e.preventDefault(), t.dispatch((0, te.s$)());
                      });
                      break;
                    case "account-link": {
                      const e = Wr(r),
                        n = i.getAttribute("href");
                      if ("string" == typeof n && "#" !== n) {
                        if (n.includes("i.thechive.com")) break;
                        y.k.warn(
                          "You have attached a `data-lion-account-link` handler to a link which already has a `href` attribute. This is not recommended because the link will react differently before LoyaltyLion finishes loading. Remove the `href` attribute or set it to `#` instead.",
                          { element: i }
                        );
                      }
                      i.addEventListener("click", (r) => {
                        r.preventDefault(),
                          e && t.dispatch((0, te.oO)(e)),
                          t.dispatch((0, Et.f)());
                      });
                      break;
                    }
                    default:
                      y.k.error(`No augmentation found for: ${r}`, {
                        augmentationElement: e,
                      });
                  }
                })(t, this.store),
                this.augmentedElements.push(t.element),
                e.push(t));
            }),
            I.q.trackPageComponent(e, (0, g.lH)(this.store.getState()).id);
        }
        isAlreadyAugmented(e) {
          return this.augmentedElements.some((t) => t.isSameNode(e));
        }
        constructor(e) {
          (this.store = e), (this.augmentedElements = []), this.scan();
        }
      }
      function jr(e, t) {
        const r = (function (e) {
          const t = e.match(/^-+(.*)$/) ?? e.match(/^(.*)-+$/);
          if (t) return { isNegative: !0, num: t[1] };
          return { isNegative: !1, num: e };
        })((e = (e + "").replace(/[^\d,.-]/g, "")));
        r.num.match(/[.|,]$/) && (e = r.num.slice(0, -1));
        const i = (function (e, t) {
          let r = e.match(/\D/g) ?? [];
          switch (((r = r.filter((e, t) => r.indexOf(e) === t)), r.length)) {
            case 0:
              return e ? `${e}00` : null;
            case 2: {
              const t = r[0],
                i = r[1],
                n = e.split(t).join("");
              return `${n.split(i)[0]}${n.split(i)[1] || "00"}`;
            }
            case 1:
              return (function (e, t, r) {
                if (e.split(t).length > 2) return `${e.split(t).join("")}`;
                const i = e.split(t)[0],
                  n = e.split(t)[1];
                if (3 !== n.length || i.length > 3 || t === r.decimalSeparator)
                  return `${i}${n}`;
                return `${i}${n}00`;
              })(e, r[0], t);
            default:
              return null;
          }
        })(e, t);
        return i ? (r.isNegative ? -1 * Number(i) : Number(i)) : null;
      }
      const Gr = {
        pointsFor: "data-lion-points-for",
        pricesForProduct: [
          "data-lion-price-for-product-id",
          "data-lion-points-price",
        ],
      };
      class Xr {
        scan() {
          (0, le.J5)(this.store.getState()) &&
            document
              .querySelectorAll(
                Gr.pricesForProduct.map((e) => `*[${e}]`).join(", ")
              )
              .forEach((e) => {
                this.upsertProductFromElement(e),
                  this.isAlreadyObserved(e) || this.observeElement(e);
              });
        }
        observeElement(e) {
          if ("function" != typeof MutationObserver) return;
          new MutationObserver(() => {
            this.upsertProductFromElement(e);
          }).observe(e, { childList: !0 }),
            this.observedElements.push(e);
        }
        upsertProductFromElement(e) {
          const t = (function (e, t) {
            const r = (function (e, t) {
                return e.textContent ? jr(e.textContent, t) : null;
              })(e, t),
              i = (function (e) {
                for (const t of Gr.pricesForProduct) {
                  const r = e.getAttribute(t);
                  if (r) return r;
                }
                return null;
              })(e);
            return r && i ? { price: r, id: i } : null;
          })(e, this.currency);
          t && this.store.dispatch(Tt(t));
        }
        isAlreadyObserved(e) {
          return this.observedElements.some((t) => t.isSameNode(e));
        }
        get currency() {
          return (0, g.j)(this.store.getState());
        }
        constructor(e) {
          (this.store = e), (this.observedElements = []), this.scan();
        }
      }
      var zr = r(3850),
        Yr = r(1780),
        Kr = r(3538),
        Jr = r(272),
        Qr = r(4895),
        ei = r(2209),
        ti = r(7865),
        ri = r(9937);
      const ii = 2e3;
      class ni {
        async start() {
          y.k.debug("[ShopifyCheckoutRedemptionManager#start]");
          const { dispatch: e } = this.store,
            t = (function () {
              const e =
                window.Shopify?.Checkout &&
                "string" == typeof window.Shopify.Checkout.token
                  ? window.Shopify.Checkout.token
                  : null;
              if (!e) throw new zr.T("Shopify checkout token not found");
              return e;
            })();
          y.k.debug("[ShopifyCheckoutRedemptionManager#start]", {
            checkoutToken: t,
          }),
            e(It.lk.setInputMode((0, b.Vv)(ti.Cu) ? "select" : "slider")),
            e(It.lk.setShopifyCheckoutToken(t)),
            await this.waitForCart();
          const r = (0, _r.Iq)(this.store.getState());
          return (
            y.k.debug("[ShopifyCheckoutRedemptionManager#start]", { cart: r }),
            r &&
              (await this.setCartAndEligibleLineItems(r).catch((e) => {
                y.k.error("failed to setCartAndEligibleLineItems", { err: e });
              })),
            this.watchForCartChanges(),
            await (async function (e) {
              if ("function" != typeof MutationObserver)
                throw new zr.T("MutationObserver unsupported");
              const t = await (0, Kr.br)(ti.Rn.orderSummary, ii);
              if (!t) throw new zr.T("Order summary not found");
              new MutationObserver(e).observe(t, { childList: !0 });
            })((0, l.D)(500, this.refresh, { atBegin: !1 })),
            this.checkForActiveRedemption(t),
            this.refresh(),
            (async function () {
              y.k.debug(
                "[ShopifyCheckoutRedemptionManager#createRedemptionSection] start"
              );
              const e = await (0, Kr.br)(ti.Rn.discountSection, ii);
              if (!e?.parentNode) throw new zr.T("Discount section not found");
              const t = document.createElement("div");
              return (
                (t.className = [
                  ti.yf.section,
                  `${ti.yf.section}--redemption`,
                ].join(" ")),
                e.parentNode.insertBefore(t, e),
                t
              );
            })()
          );
        }
        setEligibleTotalForDiscount() {
          y.k.debug(
            "[ShopifyCheckoutRedemptionManager#setEligibleTotalForDiscount] start"
          );
          const e = this.getEligibleSubtotal();
          if (
            (y.k.debug(
              "[ShopifyCheckoutRedemptionManager#setEligibleTotalForDiscount]",
              { subtotal: e }
            ),
            null === e)
          )
            return;
          const t = Math.max(
            0,
            e -
              (0, Lr.Oc)(
                document.querySelectorAll(ti.Rn.giftCardAmount)
              ).reduce((e, t) => {
                const r = (0, Kr.VY)(t, ti.If.giftCardAmount);
                if (!r) return e + 0;
                const i = (0, Sr.pU)(r);
                return null === i || i <= 0 ? e + 0 : e + i;
              }, 0)
          );
          y.k.debug(
            "[ShopifyCheckoutRedemptionManager#setEligibleTotalForDiscount]",
            { total: t }
          ),
            this.store.dispatch(It.lk.setReady()),
            this.store.dispatch(It.lk.setEligibleTotalForDiscount(t));
        }
        getEligibleSubtotal() {
          return this.cart && this.eligibleLineItems
            ? 0 === this.cart.items.length
              ? (function () {
                  y.k.debug(
                    "[ShopifyCheckoutRedemptionManager#getCheckoutSubtotal] start"
                  );
                  const e = document.querySelector(ti.Rn.orderSubtotal);
                  if (
                    (y.k.debug(
                      "[ShopifyCheckoutRedemptionManager#getCheckoutSubtotal]",
                      { element: e }
                    ),
                    !e)
                  )
                    return null;
                  const t = (0, Kr.VY)(e, ti.If.orderSubtotal);
                  if (
                    (y.k.debug(
                      "[ShopifyCheckoutRedemptionManager#getCheckoutSubtotal]",
                      { value: t }
                    ),
                    !t)
                  )
                    return null;
                  const r = (0, Sr.pU)(t);
                  if (
                    (y.k.debug(
                      "[ShopifyCheckoutRedemptionManager#getCheckoutSubtotal]",
                      { subtotal: r }
                    ),
                    null === r || r <= 0)
                  )
                    return null;
                  return r;
                })()
              : this.eligibleLineItems.reduce((e, t) => e + t.line_price, 0)
            : null;
        }
        checkForAppliedRedemption() {
          y.k.debug(
            "[ShopifyCheckoutRedemptionManager#checkForAppliedRedemption] start"
          );
          const {
            code: e,
            id: t,
            isApplying: r,
          } = (0, ei.t9)(this.store.getState());
          r &&
            t &&
            e &&
            oi().has(e) &&
            this.store.dispatch(It.lk.setRedemptionApplied({ id: t, code: e }));
        }
        checkForRemovedDiscount() {
          y.k.debug(
            "[ShopifyCheckoutRedemptionManager#checkForRemovedDiscount] start"
          );
          const {
            code: e,
            id: t,
            isApplying: r,
          } = (0, ei.t9)(this.store.getState());
          (r && !(0, ri.MI)()) ||
            (e &&
              t &&
              (oi().has(e) ||
                this.store
                  .dispatch(
                    (0, It.y2)(
                      t,
                      (0, ri.MI)() ? "slider_invalid" : "slider_removed"
                    )
                  )
                  .then(() => this.store.dispatch(It.lk.setRedemptionRemoved()))
                  .catch(() => {})));
        }
        watchForCartChanges() {
          M(this.store, (e) => {
            const t = (0, _r.Iq)(e);
            t &&
              ((this.cart && E.uX.cartsEqual(this.cart, t)) ||
                this.setCartAndEligibleLineItems(t).catch((e) => {
                  y.k.error("failed to setCartAndEligibleLineItems", {
                    err: e,
                  });
                }));
          });
        }
        async waitForCart() {
          if (this.cart)
            return void y.k.debug(
              "[ShopifyCheckoutRedemptionManager#waitForCart] cart already present",
              { cart: this.cart }
            );
          const e = this.store.getState(),
            t = e.site?.platform,
            r = e.shopify.frontend;
          if ("shopify" !== t || "unknown" !== r)
            return void y.k.debug(
              "[ShopifyCheckoutRedemptionManager#waitForCart] platform is not Shopify or frontend is already known"
            );
          await new Promise((e) => {
            y.k.debug(
              "[ShopifyCheckoutRedemptionManager#waitForCart] starting wait loop"
            );
            const t = setInterval(() => {
              y.k.debug(
                "[ShopifyCheckoutRedemptionManager#waitForCart] waiting"
              ),
                window.Shopify &&
                  (y.k.debug(
                    "[ShopifyCheckoutRedemptionManager#waitForCart] window.Shopify is present",
                    { window }
                  ),
                  this.store.dispatch((0, V.wY)("shopify")),
                  clearInterval(t),
                  e());
            }, 100);
          }),
            y.k.debug(
              "[ShopifyCheckoutRedemptionManager#waitForCart] fetching cart"
            );
          const i = await (0, Jr.P)();
          i &&
            (y.k.debug(
              "[ShopifyCheckoutRedemptionManager#waitForCart] dispatching cart",
              { cart: i }
            ),
            this.store.dispatch((0, V.RV)(i)));
        }
        async setCartAndEligibleLineItems(e) {
          try {
            (this.cart = e),
              this.setSubscriptionAppStatusFromLineItems(e.items),
              (this.eligibleLineItems = await this.filterEligibleLineItems(
                e.items
              )),
              y.k.debug(
                "[ShopifyCheckoutRedemptionManager#setCartAndEligibleLineItems]",
                {
                  cart: e,
                  cartItems: e.items,
                  eligibleLineItems: this.eligibleLineItems,
                }
              ),
              this.refresh();
          } catch (e) {
            y.k.error("failed to filter eligible line items", { err: e });
          }
        }
        setSubscriptionAppStatusFromLineItems(e) {
          e.some((e) => e.selling_plan_allocation) &&
            this.store.dispatch(It.lk.setHasSubscriptionAppInstalled());
        }
        async filterEligibleLineItems(e) {
          const { target_collections: t, order_type: r } = this.checkoutReward;
          let i = e;
          "one_time" === r &&
            (i = i.filter((e) => Boolean(!e.selling_plan_allocation)));
          const n = t.length > 0 ? t[0].id ?? null : null;
          if (!n) return i;
          const o =
            await this.api.checkoutRedemption.qualifyProductsForCollection({
              collectionId: n,
              productIds: i
                .filter((e) => Boolean(e.product_id))
                .map((e) => e.product_id),
            });
          if ("error" in o)
            return (
              y.k.error("failed to qualify products for collection", {
                res: o,
              }),
              i
            );
          const s = o.qualifiedProducts
            .filter((e) => e.inCollection)
            .map((e) => e.productId);
          return i.filter((e) => e.product_id && s.includes(e.product_id));
        }
        checkForActiveRedemption(e) {
          y.k.debug(
            "[ShopifyCheckoutRedemptionManager#checkForActiveRedemption] start"
          );
          const t = (0, Yr.nl)(this.store.getState()).find((t) =>
            Boolean(
              "approved" === t.state && t.session.token && t.session.token === e
            )
          );
          t &&
            (this.store.dispatch(
              It.lk.setRedemptionValue(t.redeemable.discount_amount)
            ),
            this.store.dispatch(
              It.lk.setRedemptionApplied({ id: t.id, code: t.redeemable.code })
            ));
        }
        get api() {
          return d.H.buildFromState(this.store.getState(), this.store.dispatch);
        }
        constructor(e) {
          (this.store = e),
            (this.refresh = () => {
              y.k.debug("[ShopifyCheckoutRedemptionManager#refresh] start"),
                this.setEligibleTotalForDiscount(),
                this.checkForAppliedRedemption(),
                this.checkForRemovedDiscount();
            }),
            y.k.debug("[ShopifyCheckoutRedemptionManager#constructor]");
          const t = (0, K.u)(e.getState());
          if (
            (y.k.debug(
              "[ShopifyCheckoutRedemptionManager#constructor] checkoutReward",
              { checkoutReward: t }
            ),
            !t)
          )
            throw new zr.T("No checkout redemption reward");
          this.checkoutReward = t;
        }
      }
      function oi() {
        const e = (0, Lr.Oc)(
          document.querySelectorAll(ti.Rn.appliedReductionCodes)
        );
        return new Set(
          e
            .filter((e) => null !== e.textContent)
            .map((e) => Qr.T.must(e.textContent))
        );
      }
      var si = r(3603),
        ai = r(1231),
        ci = r(6460);
      var li = new WeakMap(),
        di = new WeakMap(),
        ui = new WeakSet(),
        pi = new WeakSet(),
        hi = new WeakSet(),
        mi = new WeakSet(),
        gi = new WeakSet(),
        fi = new WeakSet(),
        yi = new WeakSet(),
        wi = new WeakMap(),
        ki = new WeakSet(),
        vi = new WeakSet(),
        bi = new WeakSet(),
        Si = new WeakSet(),
        Ri = new WeakSet(),
        Ci = new WeakSet(),
        Pi = new WeakSet(),
        _i = new WeakSet();
      class UI {
        get store() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.ui.store"),
            (0, i.Z)(this, li)
          );
        }
        async start() {
          if (this.started) return this.refresh();
          s(this, _i, Ui).call(this),
            s(this, gi, qi).call(this),
            s(this, fi, Fi).call(this),
            s(this, yi, Ti).call(this),
            (0, i.Z)(this, li).dispatch((0, V.lQ)(E.Fq.isOnThankYouPage())),
            await (0, Kr.oC)(),
            (this.priceForProductManager = new Xr((0, i.Z)(this, li))),
            (this.augmentedElementsManager = new $r((0, i.Z)(this, li))),
            s(this, ui, Ai).call(this),
            await s(this, Ri, Wi)
              .call(this)
              .catch((e) =>
                y.k.error("failed to startShopifyCheckoutRedemption", {
                  err: e,
                })
              ),
            s(this, pi, Ii).call(this),
            ae((0, i.Z)(this, li));
          try {
            await s(this, vi, Li).call(this);
          } catch (e) {
            y.k.error(
              "Error when loading shopify-cart-dependent functionality",
              { err: e }
            );
          }
          (0, i.Z)(this, li).dispatch((0, B.bT)()), (this.started = !0);
        }
        createLoyaltyWidgetPortal() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.createLoyaltyWidgetPortal"
          ),
            s(this, ui, Ai).call(this);
        }
        assertComponents() {
          I.q.trackUndocumentedApiAccess("loyaltylion.ui.assertComponents"),
            s(this, pi, Ii).call(this);
        }
        refresh(e) {
          if (this.rendered)
            return e?.debounce
              ? (0, i.Z)(this, di).call(this)
              : void s(this, hi, Mi).call(this);
        }
        renderApp(e) {
          I.q.trackUndocumentedApiAccess("loyaltylion.ui.renderApp"),
            s(this, mi, Ei).call(this, e);
        }
        openRuleActionModal(e) {
          I.q.trackUndocumentedApiAccess("loyaltylion.ui.openRuleActionModal"),
            (0, i.Z)(this, li).dispatch((0, te.VO)(e));
        }
        closeRuleActionModal() {
          I.q.trackUndocumentedApiAccess("loyaltylion.ui.closeRuleActionModal"),
            (0, i.Z)(this, li).dispatch((0, te.XI)());
        }
        openRedeemRewardModal(e) {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.openRedeemRewardModal"
          ),
            (0, Y.h8)((0, i.Z)(this, li).getState(), e) &&
              (0, i.Z)(this, li).dispatch((0, G.d3)(e));
        }
        closeRedeemRewardModal() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.closeRedeemRewardModal"
          ),
            (0, i.Z)(this, li).dispatch((0, G.l)());
        }
        openHistoryInfoModal(e) {
          I.q.trackUndocumentedApiAccess("loyaltylion.ui.openHistoryInfoModal"),
            (0, i.Z)(this, li).dispatch((0, te.Ys)(e));
        }
        closeHistoryInfoModal() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.closeHistoryInfoModal"
          ),
            (0, i.Z)(this, li).dispatch((0, te.dP)());
        }
        openReferralWidgetModal() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.openReferralWidgetModal"
          ),
            (0, i.Z)(this, li).dispatch((0, te.s$)());
        }
        closeReferralWidgetModal() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.closeReferralWidgetModal"
          ),
            (0, i.Z)(this, li).dispatch((0, te.sJ)());
        }
        setActiveLoyaltyPanelPage() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.setActiveLoyaltyPanelPage"
          ),
            s(this, gi, qi).call(this);
        }
        displayFriendReferralWelcomePopUp() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.displayFriendReferralWelcomePopUp"
          ),
            s(this, fi, Fi).call(this);
        }
        displayReferralDiscountAppliedModal() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.displayReferralDiscountAppliedModal"
          ),
            s(this, yi, Ti).call(this);
        }
        get site() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.ui.site"),
            (0, g.lH)((0, i.Z)(this, li).getState())
          );
        }
        get components() {
          return {
            buyWithPoints: {
              refresh: () => {
                I.q.track({
                  name: "undocumented_api_access",
                  undocumented_api_path:
                    "loyaltylion.ui.components.buyWithPoints.refresh",
                }),
                  y.k.warn(
                    '"lion.ui.components.buyWithPoints.refresh()" is deprecated. Please use "lion.ui.refresh()"'
                  ),
                  this.refresh();
              },
            },
          };
        }
        getElementsToPortal() {
          return (
            I.q.trackUndocumentedApiAccess(
              "loyaltylion.ui.getElementsToPortal"
            ),
            s(this, ki, Oi).call(this)
          );
        }
        async loadShopifyCartFunctionality() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.loadShopifyCartFunctionality"
          ),
            await s(this, vi, Li).call(this);
        }
        async fetchAndUpdateCart() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.ui.fetchAndUpdateCart"),
            s(this, bi, Zi).call(this)
          );
        }
        updateSessionCart(e) {
          I.q.trackUndocumentedApiAccess("loyaltylion.ui.updateSessionCart"),
            s(this, Si, Di).call(this, e);
        }
        async startShopifyCheckoutRedemption() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.startShopifyCheckoutRedemption"
          ),
            await s(this, Ri, Wi).call(this);
        }
        observeCartStateForAddedItems() {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.ui.observeCartStateForAddedItems"
          ),
            s(this, Pi, Ni).call(this);
        }
        constructor(e) {
          c(this, ui),
            c(this, pi),
            c(this, hi),
            c(this, mi),
            c(this, gi),
            c(this, fi),
            c(this, yi),
            (0, n.Z)(this, wi, { get: Hi, set: void 0 }),
            c(this, ki),
            c(this, vi),
            c(this, bi),
            c(this, Si),
            c(this, Ri),
            c(this, Ci),
            c(this, Pi),
            c(this, _i),
            (0, n.Z)(this, li, { writable: !0, value: void 0 }),
            (0, n.Z)(this, di, { writable: !0, value: void 0 }),
            (this.createdPortalElements = []),
            (this.started = !1),
            (this.rendered = !1),
            (0, o.Z)(this, li, e),
            (0, o.Z)(
              this,
              di,
              (0, l.D)(250, () => {
                s(this, hi, Mi).call(this);
              })
            );
        }
      }
      function Ai() {
        if (!(0, si.pq)((0, i.Z)(this, li).getState())) return;
        const e = document.createElement("div");
        document.body.appendChild(e),
          this.createdPortalElements.push({
            definition: (0, Qr.b)(Nr.find((e) => "loyaltyWidget" === e.name)),
            attribute: "",
            element: e,
          });
      }
      function Ii() {
        if (!(0, J.dt)((0, i.Z)(this, li).getState())) return;
        (this.container = document.createElement("div")),
          this.container.setAttribute("data-lion-react-container", ""),
          document.body.appendChild(this.container);
        const e = s(this, ki, Oi).call(this);
        s(this, mi, Ei).call(this, e),
          (this.rendered = !0),
          I.q.trackPageComponent(e, (0, i.Z)(this, wi).id);
      }
      function Mi() {
        try {
          kr.unmountComponentAtNode(this.container);
        } catch (e) {
          if (!(e instanceof DOMException && e.message.includes("removeChild")))
            throw e;
          y.k.warn(
            "DOM node not found while refreshing UI. This may be caused by manipulating DOM elements which are controlled by LoyaltyLion's application. This is not supported and can cause UI problems"
          );
        }
        s(this, mi, Ei).call(this, s(this, ki, Oi).call(this)),
          this.priceForProductManager.scan(),
          this.augmentedElementsManager.scan();
      }
      function Ei(e) {
        (0, i.Z)(this, li).dispatch(
          te.pU.setEmbedded(e.some((e) => "account" === e.attribute))
        ),
          kr.render(
            wr.createElement(
              vr.zt,
              { store: (0, i.Z)(this, li) },
              wr.createElement(
                br.S,
                { renderIfError: null },
                wr.createElement(ai.gV, { portalElements: e })
              )
            ),
            this.container
          );
      }
      function qi() {
        const e = Wr((0, b.ce)("tab") ?? "");
        if (e) return void (0, i.Z)(this, li).dispatch((0, te.oO)(e));
        const t = (0, i.Z)(this, wi).settings.loyaltyPanel.defaultPage;
        t && (0, i.Z)(this, li).dispatch((0, te.oO)(t));
      }
      function Fi() {
        const e = (0, b.ce)("ll_ref_id"),
          t = (0, J.l$)((0, i.Z)(this, li).getState()),
          r = (0, re._V)((0, i.Z)(this, li).getState());
        e &&
          (t && !r
            ? ((0, i.Z)(this, li).dispatch((0, Qt.Lt)(e)),
              (0, i.Z)(this, li).dispatch((0, z.qz)("referral")),
              (0, i.Z)(this, li).dispatch((0, z.Wk)()))
            : (0, i.Z)(this, li).dispatch((0, tr.bp)(e)));
      }
      function Ti() {
        const e = (0, b.ce)("discount_applied");
        (0, J.l$)((0, i.Z)(this, li).getState()) && e
          ? ((0, i.Z)(this, li).dispatch((0, z.qz)("referral-applied")),
            (0, i.Z)(this, li).dispatch(z.M7.setPopoutOpen()),
            (0, b.rN)("discount_applied"))
          : e &&
            ((0, i.Z)(this, li).dispatch((0, tr.lm)()),
            (0, b.rN)("discount_applied"));
      }
      function Hi() {
        return (0, g.lH)((0, i.Z)(this, li).getState());
      }
      function Oi() {
        return [
          ...this.createdPortalElements,
          ...Vr(Boolean((0, re._V)((0, i.Z)(this, li).getState()))),
        ];
      }
      async function Li() {
        ((0, _r.r3)((0, i.Z)(this, li).getState())
          ? await s(this, bi, Zi).call(this)
          : null) &&
          (s(this, Pi, Ni).call(this), await s(this, Ci, Bi).call(this));
      }
      async function Zi() {
        const e = await (0, Jr.P)();
        return e ? ((0, i.Z)(this, li).dispatch((0, V.RV)(e)), e) : null;
      }
      function Di(e) {
        const t = j.HX.get("shopifyCart");
        if (e && (0, _.hX)(e)) {
          if (t && (0, _.hX)(t)) {
            E.uX.getAddedItemFromCarts(t, e) &&
              lr.a.track(lr.o.AddedItemToCart);
          }
          j.HX.set({ shopifyCart: e });
        } else
          y.k.error("Attempted to update session cart with invalid cart", {
            fingerprintType: "message",
            newCart: e,
            oldCart: t,
          });
      }
      async function Wi() {
        const e = (0, i.Z)(this, li).getState();
        if (!(0, re._V)(e)) return;
        if (!(0, ci.G)(e).checkout) return;
        if ((0, K.u)(e))
          try {
            const e = await new ni((0, i.Z)(this, li)).start();
            this.createdPortalElements.push({
              definition: (0, Qr.b)(
                Nr.find((e) => "checkoutSlider" === e.name)
              ),
              element: e,
              attribute: "",
            });
          } catch (t) {
            if ("Shopify checkout token not found" === t.message)
              return I.q.track({
                name: "checkout_redemption.checkout_token_not_found",
                client_revision: e.app.revision,
                site_id: (0, i.Z)(this, wi).id,
              });
            if ("Discount section not found" === t.message)
              return I.q.track({
                name: "checkout_redemption.discount_section_not_found",
                client_revision: e.app.revision,
                site_id: (0, i.Z)(this, wi).id,
              });
            y.k.error("Shopify checkout redemption manager failed to start", {
              err: t,
              fingerprintType: "message",
            });
          }
      }
      async function Bi() {
        const { useBuyWithPointsScript: e } = (0, J.r7)(
          (0, i.Z)(this, li).getState()
        );
        this.buyWithPointsManager = e
          ? new Fr((0, i.Z)(this, li))
          : new Ir((0, i.Z)(this, li));
        try {
          await this.buyWithPointsManager.start();
        } catch (e) {
          y.k.error("Buy with Points component failed to start", {
            err: e,
            fingerprintType: "message",
          });
        }
      }
      function Ni() {
        M((0, i.Z)(this, li), (e, t) => {
          const r = (0, _r.Iq)(e),
            i = t && (0, _r.Iq)(t);
          r && r !== i && s(this, Si, Di).call(this, r);
        });
      }
      function Ui() {
        I.q.performance.mark("ui.start"),
          I.q.trackHistograms([
            {
              name: "loader_to_ui_start",
              value: I.q.performance.measure("loader.init", "ui.start"),
            },
          ]);
      }
      var Vi = new WeakMap(),
        xi = new WeakMap(),
        $i = new WeakSet(),
        ji = new WeakMap(),
        Gi = new WeakMap(),
        Xi = new WeakSet(),
        zi = new WeakSet(),
        Yi = new WeakSet(),
        Ki = new WeakSet(),
        Ji = new WeakSet(),
        Qi = new WeakSet();
      class Lion {
        get store() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.store"),
            (0, i.Z)(this, Vi)
          );
        }
        start(e) {
          let {
            data: t,
            authPacket: r,
            customer: n,
            initData: o,
            translations: a,
          } = e;
          (p.v.env = t.config.env),
            (p.v.sdkHost = t.config.sdkHost),
            (p.v.platformHost = t.config.platformHost),
            (p.v.loyaltylionFacebookAppId = t.config.loyaltylionFacebookAppId),
            (p.v.appHost = t.config.appHost),
            (p.v.iconBaseUrl = t.config.iconBaseUrl),
            (this.analytics = new yt(
              j.JB.get("visitorId"),
              p.v.sdkHost,
              this.revision
            ));
          const c = t.site,
            { api: l } = t.config;
          l &&
            ((0, i.Z)(this, Vi).dispatch(O(l.revision)),
            (0, i.Z)(this, Vi).dispatch(L(l.build ?? 0))),
            (0, i.Z)(this, Vi).dispatch((0, Be.lb)(o)),
            (0, i.Z)(this, Vi).dispatch((0, x.nH)(c));
          const u = {
            ...t.program,
            loyaltyTiers: t.program.loyaltyTiers.map((e) => ({ ...e })),
          };
          (0, i.Z)(this, Vi).dispatch((0, N.D)(u));
          const h = (0, i.Z)(this, Vi).getState(),
            m = (0, dt.fN)(h),
            g = { ...a, ...c.translationOverrides };
          wt.ag.setTranslations(m, g),
            (0, i.Z)(this, Vi).dispatch((0, W.Y)({ [m]: g })),
            wt.ag.setLocale((0, dt.fN)(h), (0, dt.po)(h), (0, dt.Ri)(h)),
            r && (0, i.Z)(this, Vi).dispatch(Z(r)),
            n && (0, i.Z)(this, Vi).dispatch((0, D.Xg)(n)),
            s(this, Ji, cn).call(this),
            s(this, Qi, ln).call(this),
            (this.api = new d.H(c.token, r, (0, i.Z)(this, Vi).dispatch)),
            (0, f.j)({ event: "ready" });
        }
        configure(e) {
          const {
            checkout: t,
            disableBundledCSS: r,
            disableBundledFonts: n,
            useClassIsolator: o,
            useCamelCaseHooksResources: a,
            useThemeOverride: c,
            useUiOverride: l,
            shopifyFrontend: d,
            __EXPERIMENTAL__forcePreviewMode: u,
            __EXPERIMENTAL__enableFreeProductRewardsWithoutCart: p,
          } = e;
          var h;
          "boolean" == typeof t &&
            (0, i.Z)(this, Vi).dispatch(Le({ checkout: t })),
            "boolean" == typeof r &&
              (0, i.Z)(this, Vi).dispatch(Le({ disableBundledCSS: r })),
            "boolean" == typeof n &&
              (0, i.Z)(this, Vi).dispatch(Le({ disableBundledFonts: n })),
            "boolean" == typeof o &&
              (0, i.Z)(this, Vi).dispatch(Le({ useClassIsolator: o })),
            "boolean" == typeof a &&
              (0, i.Z)(this, Vi).dispatch(
                Le({ useCamelCaseHooksResources: a })
              ),
            "string" == typeof c &&
              (0, q.HI)(c) &&
              (0, i.Z)(this, Vi).dispatch(Le({ useThemeOverride: c })),
            "string" == typeof l &&
              (0, F.E)(l) &&
              (0, i.Z)(this, Vi).dispatch(Le({ useUiOverride: l })),
            "boolean" == typeof u &&
              ((0, i.Z)(this, Vi).dispatch(
                Le({ __EXPERIMENTAL__forcePreviewMode: u })
              ),
              s(this, Yi, sn).call(this)),
            "boolean" == typeof p &&
              (0, i.Z)(this, Vi).dispatch(
                Le({ __EXPERIMENTAL__enableFreeProductRewardsWithoutCart: p })
              ),
            "string" == typeof d &&
              ((h = d),
              P.includes(h)
                ? (0, i.Z)(this, Vi).dispatch((0, V.wY)(d))
                : y.k.warn(
                    `Unexpected value passed for shopifyFrontend config. Must be one of: ${P.filter(
                      (e) => "unknown" !== e
                    ).join(", ")}`
                  )),
            e.save_customer_data_to_cookie &&
              y.k.warn(
                "Saving data customer data to a cookie is no longer supported. If you need this feature, please contact us at support@loyaltylion.com"
              ),
            e.show_loyalty_widget &&
              y.k.warn(
                "The `show_loyalty_widget` configuration option is no longer supported. If you need this feature, please contact us at support@loyaltylion.com"
              );
        }
        registerHook(e, t) {
          kt.ai.registerHook(e, t);
        }
        get resources() {
          const { sdkJsApi: e } = (0, m.Uw)((0, i.Z)(this, Vi).getState());
          return e ? (0, i.Z)(this, xi) : null;
        }
        on(e, t, r) {
          f.u.on(e, t, r);
        }
        removeListener(e, t) {
          f.u.removeListener(e, t);
        }
        setCartState(e) {
          (0, _.hX)(e)
            ? (0, i.Z)(this, Vi).dispatch((0, V.RV)(e))
            : y.k.error(
                `Site: ${
                  (0, i.Z)(this, Gi).id
                } Attempted to set invalid cart state`,
                {
                  cart: e,
                  consoleMessage: "setCartState requires a shopify cart object",
                }
              );
        }
        identify_customer(e) {
          this.legacyCustomerAuthenticator.setCustomerData(e).catch((e) => {
            y.k.error("Legacy `identify_customer` failed", { err: e });
          });
        }
        auth_customer(e) {
          this.legacyCustomerAuthenticator.setAuthData(e).catch((e) => {
            y.k.error("Legacy `auth_customer` failed", { err: e });
          });
        }
        identify_product() {}
        track_pageview() {}
        async authenticateCustomer(e) {
          if (!e || !e.customer || !e.auth)
            throw new Error(
              "`customer` and `auth` properties are required for initialization"
            );
          const t = (0, i.Z)(this, Vi).getState(),
            r = await (0, _t.k)({
              authParams: e,
              sdkHost: p.v.sdkHost,
              token: (0, g.MW)(t),
              revision: t.app.revision,
              referrer: j.JB.get("referrer") || {},
              visitorId: j.JB.get("visitorId") || "",
            });
          r &&
            (s(this, $i, en).call(this, r),
            (0, i.Z)(this, Vi).dispatch(
              (0, Be.S7)({ auth: e.auth, customer: e.customer })
            ));
        }
        async logoutCustomer() {
          (0, re._V)((0, i.Z)(this, Vi).getState())
            ? ((0, i.Z)(this, Vi).dispatch(U.N.removeCustomer()),
              this.ui?.refresh())
            : y.k.info("Customer not signed in");
        }
        updateCustomer(e) {
          I.q.trackUndocumentedApiAccess("loyaltylion.updateCustomer"),
            this.dev.updateCustomer(e);
        }
        setCustomerAndAuthPacket(e) {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.setCustomerAndAuthPacket"
          ),
            s(this, $i, en).call(this, e);
        }
        init() {
          throw new Error(
            "Cannot call lion.init more than once. Please ensure there is only a single instance of the LoyaltyLion SDK snippet on the page"
          );
        }
        _push(e) {}
        get utils() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.utils"),
            { uuid: T.V.v4 }
          );
        }
        get dev() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.dev"),
            {
              addMessageNotification: () => {
                const e = 1e3 * Math.random();
                (0, i.Z)(this, Vi).dispatch(
                  (0, B.D7)([
                    {
                      createdAt: new Date().toISOString(),
                      id: T.V.v4(),
                      message: `${e.toFixed()} points for doing a thing`,
                      value: e,
                      kind: "point",
                    },
                  ])
                );
              },
              addRedemptionNotification: () => {
                (0, i.Z)(this, Vi).dispatch(
                  (0, B.D7)([
                    {
                      id: "reward_redemption",
                      kind: "reward_redemption",
                      createdAt: new Date().toISOString(),
                    },
                  ])
                );
              },
              addReferralPromptNotification: () => {
                (0, i.Z)(this, Vi).dispatch(
                  (0, B.D7)([
                    {
                      createdAt: new Date().toISOString(),
                      id: "post_purchase_referral",
                      kind: "post_purchase_referral",
                    },
                  ])
                );
              },
              changeLocale: (e) => {
                (0, i.Z)(this, Vi).dispatch((0, x.wo)(e));
              },
              reloadThemeCss: () => {
                (0, C.z)({
                  state: (0, i.Z)(this, Vi).getState(),
                  force: !0,
                }).catch(console.error);
              },
              selectNotificationsToDisplay: () =>
                (0, ut.$8)((0, i.Z)(this, Vi).getState()),
              updateCustomer: (e) => {
                (0, i.Z)(this, Vi).dispatch((0, D.uG)(e));
              },
            }
          );
        }
        get customer() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.customer"),
            (0, i.Z)(this, ji)
          );
        }
        get site() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.site"),
            (0, i.Z)(this, Gi)
          );
        }
        get program() {
          return (
            I.q.trackUndocumentedApiAccess("loyaltylion.program"),
            (0, m.LI)((0, i.Z)(this, Vi).getState())
          );
        }
        displayPendingNotifications(e) {
          I.q.trackUndocumentedApiAccess(
            "loyaltylion.displayPendingNotifications"
          ),
            s(this, Xi, nn).call(this, e);
        }
        analyticsObserver(e, t) {
          I.q.trackUndocumentedApiAccess("loyaltylion.analyticsObserver"),
            s(this, zi, on).call(this, e, t);
        }
        localCurrencyListener() {
          I.q.trackUndocumentedApiAccess("loyaltylion.localCurrencyListener"),
            s(this, Ji, cn).call(this);
        }
        startWindowSizeListener() {
          I.q.trackUndocumentedApiAccess("loyaltylion.startWindowSizeListener"),
            s(this, Qi, ln).call(this);
        }
        constructor(e, t, r, a, l) {
          c(this, $i),
            (0, n.Z)(this, ji, { get: tn, set: void 0 }),
            (0, n.Z)(this, Gi, { get: rn, set: void 0 }),
            c(this, Xi),
            c(this, zi),
            c(this, Yi),
            c(this, Ki),
            c(this, Ji),
            c(this, Qi),
            (0, n.Z)(this, Vi, { writable: !0, value: void 0 }),
            (0, n.Z)(this, xi, { writable: !0, value: void 0 }),
            (this.token = t),
            (this.revision = r),
            (this.themeManifest = a),
            (this.fontManifest = l),
            (this.version = $.Jn),
            (this.isLoyaltyLion = !0),
            (0, o.Z)(this, Vi, e),
            (0, o.Z)(this, xi, new Pt(e)),
            s(this, Ki, an).call(this),
            (function (e) {
              const t = (0, b.ce)("ll_eid") || j.HX.get("emailTrackingId"),
                r = (0, b.ce)("ll_rid"),
                i = {
                  emailAction: (0, Q.dY)((0, b.ce)("ll_act")),
                  emailClaimRewardId: r ? parseInt(r, 10) : null,
                  emailTrackingId: t,
                };
              e.dispatch(ie(i)), j.HX.set({ emailTrackingId: t });
            })((0, i.Z)(this, Vi)),
            (0, i.Z)(this, Vi).dispatch(ot(r)),
            (0, i.Z)(this, Vi).dispatch(st(a)),
            (0, i.Z)(this, Vi).dispatch(at(l)),
            (this.legacyCustomerAuthenticator = new A.u(async (e) =>
              this.authenticateCustomer(e)
            )),
            f.u.on("ready", () => {
              y.k.info("Ready"),
                s(this, Yi, sn).call(this),
                s(this, Xi, nn).call(this, (0, i.Z)(this, ji)),
                M((0, i.Z)(this, Vi), (e, t) => {
                  wt.ag.setLocale((0, dt.fN)(e), (0, dt.po)(e), (0, dt.Ri)(e));
                  const r = lt(e);
                  r !== (t && lt(t)) &&
                    (this.api = new d.H(
                      this.token,
                      r,
                      (0, i.Z)(this, Vi).dispatch
                    )),
                    s(this, zi, on).call(this, e, t);
                }),
                (this.ui = new UI((0, i.Z)(this, Vi))),
                (this.integrations = new ue((0, i.Z)(this, Vi))),
                this.ui.start().catch((e) => {
                  y.k.error(`Error when starting UI: ${e.message}`, {
                    err: e,
                    fingerprintType: "message",
                  });
                });
            });
        }
      }
      function en(e) {
        (0, i.Z)(this, Vi).dispatch((0, B.L1)()),
          (0, i.Z)(this, Vi).dispatch((0, u.j)()),
          e.customer &&
            ((0, i.Z)(this, Vi).dispatch((0, D.Xg)(e.customer)),
            s(this, Xi, nn).call(this, e.customer)),
          e.authPacket && (0, i.Z)(this, Vi).dispatch(Z(e.authPacket)),
          (0, i.Z)(this, Vi).dispatch((0, B.bT)()),
          this.ui?.refresh();
      }
      function tn() {
        return (0, re._V)((0, i.Z)(this, Vi).getState());
      }
      function rn() {
        return (0, g.lH)((0, i.Z)(this, Vi).getState());
      }
      function nn(e) {
        if (e?.pendingNotifications) {
          const t = (0, i.Z)(this, Gi).notifications;
          e.pendingNotifications.forEach((e) => {
            const r = t.find((t) => t.kind === e.kind)?.settings.delay ?? 0;
            setTimeout(() => {
              (0, i.Z)(this, Vi).dispatch((0, B.D7)([e]));
            }, 1e3 * r);
          });
        }
      }
      function on(e, t) {
        t &&
          ((e.isLoyaltySplashOrPanelModalOpen &&
            !t.isLoyaltySplashOrPanelModalOpen) ||
            (e.loyaltyPanel.isEmbedded && !t.loyaltyPanel.isEmbedded)) &&
          this.analytics.trackEvent("panel", "open");
      }
      function sn() {
        const e = (0, R.C)((0, i.Z)(this, Vi));
        e &&
          (0, i.Z)(this, Vi).dispatch(
            ((e) => {
              let { context: t, lion: i } = e;
              return async (e, n) => {
                const { status: o } = (0, k.vS)(n());
                if ("enabled" === o || "loading" === o) return;
                const s = S();
                if ((s && e(w.fE.setAuth(s)), (0, m.qH)(n()))) {
                  e((0, w.P6)(t)), e((0, w.Oe)("loading"));
                  try {
                    const {
                      createControlModeHelpers: o,
                      MockHttpClient: s,
                      controlModeMiddleware: a,
                    } = await Promise.all([r.e(675), r.e(766), r.e(77)])
                      .then(r.bind(r, 2023))
                      .then((t) => {
                        let { startControlMode: r } = t;
                        return r(e, n);
                      });
                    if (((0, h.Cq)(a), i)) {
                      const t = o(e, n);
                      (i.control = t), (i.edit = t);
                    }
                    (d.H.buildFromState = (e, t) => {
                      const r = (0, g.lH)(e);
                      return new d.H(r.token, e.authPacket, t, new s(e));
                    }),
                      i &&
                        ((i.api = d.H.buildFromState(n(), e)),
                        Object.defineProperty(i, "resources", {
                          get() {
                            throw new Error(
                              "lion.resources is disabled when previewing"
                            );
                          },
                        })),
                      (0, f.j)({ event: "controlMode:enabled", context: t });
                  } catch (t) {
                    y.k.error("control mode failed to start", { err: t }),
                      e((0, w.Oe)("failed"));
                  }
                  y.k.debug(`Control mode started in '${t}' context`),
                    e((0, w.Oe)("enabled"));
                }
              };
            })({ context: e, lion: this })
          );
      }
      function an() {
        0;
      }
      function cn() {
        (0, J.r7)((0, i.Z)(this, Vi).getState()).currencyConversionEnabled &&
          setInterval(() => {
            if (!window.Currency && !window.Shopify?.currency) return;
            const e = (0, E.yB)();
            e &&
              (0, i.Z)(this, Vi)
                .dispatch((0, V.RS)(e))
                .catch((e) => {
                  y.k.warn("Failed to request local currency", { err: e });
                });
          }, 1e3);
      }
      function ln() {
        const e = () => {
          (0, i.Z)(this, Vi).dispatch(
            (0, Oe.x)({
              window: { height: window.innerHeight, width: window.innerWidth },
            })
          );
        };
        e(), window.addEventListener("resize", (0, l.D)(250, e));
      }
      const dn = (e, t, r, i) => {
        try {
          const n = (function () {
            const e = (0, pe.legacy_createStore)(
              cr,
              et,
              (0, At.Uo)((0, pe.applyMiddleware)(...yr), ur)
            );
            return lr.a.initialize(e), e;
          })();
          return kt.ai.initialize(n), (I.q.store = n), new Lion(n, e, t, r, i);
        } catch (r) {
          return (
            y.k.error("Failed to create Lion instance", {
              err: r,
              token: e,
              revision: t,
            }),
            null
          );
        }
      };
    },
    2909: (e, t, r) => {
      function i(e, t, r) {
        var i = (r || {}).atBegin;
        return (function (e, t, r) {
          var i,
            n = r || {},
            o = n.noTrailing,
            s = void 0 !== o && o,
            a = n.noLeading,
            c = void 0 !== a && a,
            l = n.debounceMode,
            d = void 0 === l ? void 0 : l,
            u = !1,
            p = 0;
          function h() {
            i && clearTimeout(i);
          }
          function m() {
            for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
              n[o] = arguments[o];
            var a = this,
              l = Date.now() - p;
            function m() {
              (p = Date.now()), t.apply(a, n);
            }
            function g() {
              i = void 0;
            }
            u ||
              (c || !d || i || m(),
              h(),
              void 0 === d && l > e
                ? c
                  ? ((p = Date.now()), s || (i = setTimeout(d ? g : m, e)))
                  : m()
                : !0 !== s &&
                  (i = setTimeout(d ? g : m, void 0 === d ? e - l : e)));
          }
          return (
            (m.cancel = function (e) {
              var t = (e || {}).upcomingOnly,
                r = void 0 !== t && t;
              h(), (u = !r);
            }),
            m
          );
        })(e, t, { debounceMode: !1 !== (void 0 !== i && i) });
      }
      r.d(t, { D: () => i });
    },
  },
]);
