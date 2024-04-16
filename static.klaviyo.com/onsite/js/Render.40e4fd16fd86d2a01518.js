"use strict";
(self.webpackChunk_klaviyo_onsite_modules =
  self.webpackChunk_klaviyo_onsite_modules || []).push([
  [135],
  {
    49121: function (e, t, n) {
      n.d(t, {
        c: function () {
          return St;
        },
      });
      var o = n(33511),
        i = n(93885),
        r = n.n(i),
        s = n(76223),
        a = n.n(s),
        l = n(46138),
        d = n(2116),
        c = n.n(d),
        m = n(75992),
        u = n(32691),
        f = n(3321);
      const p = ["children", "actionId", "formVersionCId"];
      var h = (e) => {
        let { children: t, actionId: n, formVersionCId: o } = e,
          i = c()(e, p);
        const [r, a] = (0, s.useState)(!1),
          l = (0, f.Z)((e) => {
            var t;
            return e.formsState.actions && n
              ? null == (t = e.formsState.actions[n])
                ? void 0
                : t.actionType
              : void 0;
          }),
          d = (0, f.Z)((e) => {
            var t, o;
            return e.formsState.actions && n
              ? null == (t = e.formsState.actions[n]) || null == (o = t.data)
                ? void 0
                : o.newWindow
              : void 0;
          }),
          h = (0, f.Z)((e) => {
            var t, o;
            return e.formsState.actions && n
              ? null == (t = e.formsState.actions[n]) || null == (o = t.data)
                ? void 0
                : o.redirectUrl
              : void 0;
          }),
          y = (0, s.useMemo)(
            () =>
              n && l ? (0, u.l9)(l, { newWindow: d, redirectUrl: h }) : {},
            [n, l, d, h]
          );
        if (!n)
          return t(
            Object.assign(
              { onClick: void 0, handlingFormAction: r, ariaProps: y },
              i
            )
          );
        const g = (0, m.j)({ actionId: n, formVersionCId: o }),
          v = new g({ actionId: n, formVersionCId: o });
        return t(
          Object.assign(
            {
              onClick: n
                ? () => {
                    u.NB.has(g.formActionType) && a(!0),
                      v.runAction().catch(() => {
                        a(!1);
                        const e = document.querySelector(
                          `.klaviyo-form-version-cid_${o} [aria-invalid="true"]`
                        );
                        e && e.focus();
                      });
                  }
                : void 0,
              handlingFormAction: r,
              ariaProps: y,
            },
            i
          )
        );
      };
      const y = () => null;
      var g = ({
          formVersionCId: e,
          componentId: t,
          a11yIdentifierBlock: n,
        }) => {
          const o = (0, f.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            i = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.styling;
            }),
            s = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.image;
            }),
            d = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.altText;
            }),
            c = (0, f.Z)((e) => {
              var n;
              return null == (n = e.formsState.components[t])
                ? void 0
                : n.actionId;
            }),
            m = c ? l.aG : l.Ei,
            u = (null == i ? void 0 : i.width) || 100;
          return a().createElement(
            l.ZC,
            {
              style: {
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "auto",
              },
              a11yIdentifier: n,
            },
            o && !s
              ? a().createElement(y, null)
              : s &&
                  a().createElement(
                    h,
                    { actionId: c, formVersionCId: e },
                    ({ onClick: e, handlingFormAction: t, ariaProps: i }) =>
                      a().createElement(
                        l.ZC,
                        {
                          className: t ? "klaviyo-spinner" : "",
                          style: {
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            height: "auto",
                          },
                          onClick: e,
                          a11yIdentifier: n,
                        },
                        a().createElement(
                          m,
                          r()(
                            {
                              a11yIdentifier: n,
                              style: {
                                maxWidth: "100%",
                                width: u,
                                height: "auto",
                                cursor: e ? "pointer" : "initial",
                              },
                              src: s.url,
                              tabIndex: o || !c ? -1 : 0,
                            },
                            d && d.length > 0 ? { alt: d } : {},
                            i
                          )
                        )
                      )
                  )
          );
        },
        v = n(75356),
        b = n(94926);
      const I = `\n  color: #000000;\n  line-height: normal;\n\n  p {\n    margin: 0px;\n  }\n  span {\n    display: inline;\n  }\n  ol,\n  ul {\n    padding: 0 0 0 48px;\n    margin: 0;\n  }\n  ul {\n    list-style-type: disc;\n  }\n  li {\n    line-height: 18px;\n  }\n  a {\n    color: ${
          n(59208).Z.blue
        };\n    text-decoration: underline;\n    border-bottom: none;\n  }\n`,
        S = (0, b.iv)(I),
        x = ["html"];
      var C = (e) => {
        let { html: t } = e,
          n = c()(e, x);
        return a().createElement(
          "div",
          r()(
            {},
            t ? { dangerouslySetInnerHTML: { __html: t } } : {},
            { style: { width: "100%" }, className: `${o.Tc} ${S}` },
            n
          )
        );
      };
      const {
        A11yWrapper: w = () => null,
        useRecursivelySetA11yAttribute: E = () => "",
      } = {};
      var $ = ({ itemId: e, parentType: t = v.A, a11yIdentifierBlock: n }) => {
          const o = (0, f.Z)((n) => {
              var o, i, r, s, a, l;
              return t === v.p && n.formsState.teasers
                ? null == (o = n.formsState.teasers[e]) ||
                  null == (i = o.data) ||
                  null == (r = i.content)
                  ? void 0
                  : r.html
                : null == (s = n.formsState.components[e]) ||
                  null == (a = s.data) ||
                  null == (l = a.content)
                ? void 0
                : l.html;
            }),
            i = (0, s.useMemo)(() => `rich-text-${e}`, [e]),
            r = E({ a11yIdentifier: n || "", html: o });
          return n
            ? a().createElement(
                w,
                { identifier: n },
                a().createElement(C, { id: i, html: r })
              )
            : a().createElement(C, { id: i, html: o });
        },
        k = (n(26650), n(80101)),
        T = n(18017),
        Z = n(56623),
        V = n(74196),
        F = n(31269),
        _ = n(49325),
        O = n(68254),
        M = n(64425),
        D = n(85678),
        A = n(93811),
        z = n(30360),
        j = n(39833),
        W = n(58284);
      let N,
        B = (e) => e;
      var R = ({
          formVersionCId: e,
          componentId: t,
          theme: n,
          a11yIdentifierStyles: i,
        }) => {
          var d;
          const c = (0, f.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            m = (0, f.Z)((n) => {
              var o;
              const i =
                null == (o = n.onsiteState.openFormVersions[e])
                  ? void 0
                  : o.components[t];
              return (
                !!n.onsiteState.client.isDesignWorkflow ||
                !i ||
                i.valid ||
                void 0 === i.valid
              );
            }),
            u = (0, f.Z)((n) => {
              var o, i;
              return null == (o = n.onsiteState.openFormVersions[e]) ||
                null == (i = o.components[t])
                ? void 0
                : i.metadata;
            }, T.X),
            p = (0, f.Z)((n) => {
              var o, i;
              return null == (o = n.onsiteState.openFormVersions[e]) ||
                null == (i = o.components[t])
                ? void 0
                : i.validationErrorType;
            }),
            h = (0, f.Z)((n) => (0, j.HN)(n, e, t)),
            y = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.label;
            }),
            g = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.placeholder;
            }),
            v = (0, f.Z)((e) => {
              var n;
              return null == (n = e.formsState.components[t])
                ? void 0
                : n.componentType;
            }),
            I = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.fieldId;
            }),
            S = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.format;
            }),
            x = (0, f.Z)((e) => {
              var n, o;
              return (
                (null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                  ? void 0
                  : o.delimiter) || ""
              );
            }),
            C = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.prefill;
            }),
            w = (0, f.Z)((t) => {
              var n;
              return null == (n = t.onsiteState.openFormVersions[e])
                ? void 0
                : n.formId;
            }),
            E = (0, f.Z)((t) => {
              var n;
              return null == (n = t.onsiteState.openFormVersions[e])
                ? void 0
                : n.formVersionId;
            }),
            $ = (0, f.Z)((e) => e.onsiteState.client.klaviyoCompanyId),
            R = (0, f.Z)((t) => (0, j.wf)(t, e)),
            H = (0, f.Z)((e) => {
              const n = e.formsState.components[t];
              return void 0 !== n && (0, W.En)(n);
            }),
            P = (0, s.useMemo)(() => v === o.ZW || v === o.Ys, [v]),
            L = (0, s.useMemo)(
              () =>
                `${
                  null == I ? void 0 : I.replace(/ /g, "_").replace(/\$/g, "")
                }_${t}`,
              [I, t]
            ),
            q = (0, s.useMemo)(
              () =>
                v === o.eC ? "one-time-code" : I && o.no[I] ? o.no[I] : void 0,
              [I, v]
            ),
            { current: K } = (0, s.useRef)((0, k.Z)("klaviyo_ariaid_")),
            [U, G] = (0, s.useState)(!1),
            [Y, X] = (0, s.useState)(!1),
            [J, Q] = (0, s.useState)(),
            ee = ({
              value: n,
              validate: i,
              hasChangedSinceLastValidation: r,
            }) => {
              var s;
              const a = void 0 !== n ? n : "";
              Q(a),
                G(!1),
                X(!!r),
                (0, O.hX)({
                  formVersionCId: e,
                  componentId: t,
                  value: P
                    ? null ==
                      (s = o.Tb.find(
                        ({ value: e }) =>
                          JSON.stringify(e) === JSON.stringify(S)
                      ))
                      ? void 0
                      : s.convertValue(a, x)
                    : a,
                  validate: i,
                });
            };
          (0, s.useEffect)(() => {
            const e = (0, Z.FU)();
            if (C && e && v === o.xC && !c) {
              const { [o.HD]: t } = e;
              ee({ value: t, validate: !1 });
            }
          }, []),
            (0, s.useEffect)(() => {
              H &&
                !c &&
                w &&
                e &&
                R &&
                ((0, A.WN)(w),
                $ &&
                  (0, M.M)({
                    metric: z.mC,
                    formVersionCId: e,
                    formId: w,
                    companyId: $,
                  }));
            }, [H, c, w, $, e, R, E]);
          const te = (0, s.useMemo)(() => `label-${L}`, [L]),
            ne = (0, s.useMemo)(
              () =>
                y && y.length > 0
                  ? { "aria-labelledby": te }
                  : g
                  ? { "aria-label": g }
                  : {},
              [y, te, g]
            ),
            oe = Y || m,
            ie =
              !P || (g && !U)
                ? g
                : null ==
                  (d = o.Tb.find(
                    ({ value: e }) => JSON.stringify(e) === JSON.stringify(S)
                  ))
                ? void 0
                : d.label.replace(/ /g, x),
            re = P ? V.n : l.II;
          return a().createElement(
            l.ZC,
            {
              style: {
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                alignSelf: "flex-end",
              },
              a11yIdentifier: i,
            },
            a().createElement(
              F.Z,
              { id: te, a11yIdentifier: i, theme: n, htmlFor: L },
              y
            ),
            a().createElement(
              re,
              r()(
                {
                  id: L,
                  className: (0, b.iv)(
                    N ||
                      (N = B`
          &&& {
            &::placeholder {
              color: ${0};
              font-family: ${0};
              font-size: ${0};
              font-weight: ${0};
              letter-spacing: ${0}px;
            }
            &::-moz-placeholder {
              line-height: ${0}px;
            }
            &:hover {
              border-color: ${0} !important;
            }
          }
        `),
                    n.inputStyles.textStyles.placeholderColor,
                    n.inputStyles.textStyles.fontFamily,
                    n.inputStyles.textStyles.fontSize,
                    n.inputStyles.textStyles.fontWeight,
                    n.inputStyles.textStyles.letterSpacing,
                    n.inputStyles.textStyles.height,
                    n.inputStyles.border.activeColor
                  ),
                  style: Object.assign(
                    {
                      boxSizing: "border-box",
                      borderRadius: n.inputStyles.borderRadius,
                      paddingLeft: 16,
                      paddingRight: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      height: n.inputStyles.textStyles.height,
                      textAlign: "left",
                      color: n.inputStyles.textStyles.formInputTextColor,
                      fontFamily: n.inputStyles.textStyles.fontFamily,
                      fontSize: n.inputStyles.textStyles.fontSize,
                      fontWeight: n.inputStyles.textStyles.fontWeight,
                      letterSpacing: n.inputStyles.textStyles.letterSpacing,
                      backgroundColor: n.inputStyles.inputBackgroundColor,
                      border: "1px solid",
                      borderColor:
                        n.inputStyles.border[
                          oe ? "defaultColor" : "errorColor"
                        ],
                    },
                    U
                      ? {
                          borderColor:
                            n.inputStyles.border[
                              oe ? "activeColor" : "errorColor"
                            ],
                          boxShadow: `0 0 5px ${n.focusColor}`,
                        }
                      : {}
                  ),
                  type: ((e) => {
                    switch (e) {
                      case o.xC:
                        return "email";
                      case o.J8:
                        return "tel";
                      default:
                        return "text";
                    }
                  })(v),
                  autoComplete: q,
                  name: v === o.xC ? "email" : void 0,
                  tabIndex: c ? -1 : 0,
                  placeholder: ie,
                },
                ne,
                {
                  "aria-invalid": !oe,
                  "aria-describedby": oe ? void 0 : K,
                  onInit: () => {
                    c || (0, O.DK)({ formVersionCId: e, componentId: t });
                  },
                  onBlur: (e) =>
                    ee({
                      value: e.target.value,
                      validate: !0,
                      hasChangedSinceLastValidation: !1,
                    }),
                  onChange: (e) => {
                    (0, D.l)(),
                      ee({
                        value: e.target.value,
                        validate: !1,
                        hasChangedSinceLastValidation: !0,
                      });
                  },
                  onFocus: () => {
                    G(!0);
                  },
                  options: P
                    ? { date: !0, datePattern: S, delimiter: x }
                    : { delimiter: "" },
                  value: J || "",
                  a11yIdentifier: i,
                }
              )
            ),
            !c &&
              !Y &&
              a().createElement(_.Z, {
                theme: n,
                formVersionCId: e,
                componentAriaID: K,
                metadata: u,
                validationErrorType: p,
                validationErrorMessage: h,
                a11yIdentifier: i,
              })
          );
        },
        H = n(25564);
      let P,
        L = (e) => e;
      const { THEME_KEY: q } = H.Z;
      var K = ({
        componentId: e,
        formVersionCId: t,
        theme: n,
        a11yIdentifierBlock: o,
      }) => {
        const i = (0, f.Z)((t) => {
            var n, o;
            return null == (n = t.formsState.components[e]) ||
              null == (o = n.data)
              ? void 0
              : o.content;
          }),
          r = (0, f.Z)((t) => {
            var n;
            return null == (n = t.formsState.components[e])
              ? void 0
              : n.actionId;
          }),
          s = (0, f.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          d = (0, b.iv)(
            P ||
              (P = L`
    &&& {
      &:focus {
        box-shadow: 0 0 5px ${0};
      }
      ${0}
    }
  `),
            n.focusColor,
            !1 !== n[q].specifyHoverBackgroundColor
              ? `\n      &:hover {\n        background-color: ${
                  n[q].hoverBackgroundColor
                } !important;\n        ${
                  n[q].hoverTextColor || n[q].textColor
                    ? `color: ${
                        n[q].hoverTextColor || n[q].textColor
                      } !important;`
                    : ""
                }\n      }`
              : ""
          );
        return a().createElement(
          h,
          { formVersionCId: t, actionId: r },
          ({ onClick: e, handlingFormAction: t }) =>
            a().createElement(
              l.zx,
              {
                a11yIdentifier: o,
                className: t ? `klaviyo-spinner ${d}` : d,
                style: Object.assign(
                  {
                    background: n[q].backgroundColor,
                    borderRadius: n[q].borderRadius,
                    borderStyle: n[q].borderStyle,
                    borderColor: n[q].borderColor,
                    borderWidth: n[q].borderWidth,
                    color: n[q].textStyles.color,
                    fontFamily: n[q].textStyles.fontFamily,
                    fontSize: n[q].textStyles.fontSize,
                    fontWeight: n[q].textStyles.fontWeight,
                    letterSpacing: n[q].textStyles.letterSpacing,
                    lineHeight: 1,
                    whiteSpace: "normal",
                    paddingTop: n[q].paddingTop,
                    paddingBottom: n[q].paddingBottom,
                    textAlign: "center",
                    wordBreak: "break-word",
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    height: n[q].height,
                  },
                  n[q].fullWidth
                    ? { width: "100%" }
                    : { paddingLeft: 10, paddingRight: 10 }
                ),
                type: "button",
                onClick: e,
                tabIndex: s ? -1 : 0,
              },
              i
            )
        );
      };
      const U = ["selectorType", "fillColor", "formVersionCId", "id"],
        G = ({ fillColor: e, id: t }) =>
          a().createElement(
            "g",
            {
              id: t,
              stroke: "none",
              strokeWidth: "1",
              fill: "none",
              fillRule: "evenodd",
            },
            a().createElement(
              "g",
              {
                id: `checkbox-on-${t}`,
                transform: "translate(3.000000, 4.000000)",
                fill: "#303B43",
              },
              a().createElement("polygon", {
                id: `shape-${t}`,
                fill: e,
                points:
                  "4.45454545 9.20149254 1.11363636 5.75373134 0 6.90298507 4.45454545 11.5 14 1.64925373 12.8863636 0.5",
              })
            )
          ),
        Y = ({ fillColor: e, id: t }) =>
          a().createElement(
            "g",
            {
              id: t,
              stroke: "none",
              strokeWidth: "1",
              fill: "none",
              fillRule: "evenodd",
            },
            a().createElement(
              "g",
              {
                id: `shape-${t}`,
                transform: "translate(4.000000, 4.000000)",
                fill: "#303B43",
              },
              a().createElement("circle", {
                fill: e,
                id: `oval-${t}`,
                cx: "6",
                cy: "6",
                r: "5.55555556",
              })
            )
          );
      var X = (e) => {
        let { selectorType: t, fillColor: n, id: o } = e,
          i = c()(e, U);
        return a().createElement(
          "svg",
          r()(
            {
              style: {
                cursor: "pointer",
                display: "none",
                position: "absolute",
                margin: 0,
              },
              width: "20px",
              height: "20px",
              viewBox: "0 0 20 20",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
            },
            i
          ),
          a().createElement("defs", null),
          "radio" === t
            ? a().createElement(Y, { id: `radio_inner_${o}`, fillColor: n })
            : a().createElement(G, { id: `checkbox_inner_${o}`, fillColor: n })
        );
      };
      let J,
        Q = (e) => e;
      const ee = ["selectorType", "valid", "theme", "formVersionCId"],
        te = ({ backgroundColor: e }) =>
          a().createElement(
            "g",
            null,
            a().createElement(
              "g",
              null,
              a().createElement("rect", {
                strokeWidth: "1",
                x: "0.5",
                y: "0.5",
                width: "19",
                height: "19",
                rx: "2.22222222",
                fill: e,
              })
            )
          ),
        ne = ({ backgroundColor: e }) =>
          a().createElement(
            "g",
            null,
            a().createElement(
              "g",
              null,
              a().createElement("circle", {
                strokeWidth: "1",
                cx: "10",
                cy: "10",
                r: "9.5",
                fill: e,
              })
            )
          );
      var oe = (e) => {
        let { selectorType: t, valid: n, theme: o } = e,
          i = c()(e, ee);
        return a().createElement(
          "svg",
          r()(
            {
              className: (0, b.iv)(
                J ||
                  (J = Q`
        &&& {
          input:focus + label + label > * {
            filter: drop-shadow(0px 0px 2px ${0});
            stroke: ${0};
          }
        }
      `),
                o.focusColor,
                o.inputStyles.border.activeColor
              ),
              style: {
                stroke: n
                  ? o.inputStyles.border.defaultColor
                  : o.inputStyles.border.errorColor,
                marginRight: 8,
                minWidth: 20,
                width: "auto",
                height: "auto",
              },
              width: "20px",
              height: "20px",
              viewBox: "0 0 20 20",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
            },
            i
          ),
          "radio" === t
            ? a().createElement(ne, {
                backgroundColor: o.inputStyles.inputBackgroundColor,
              })
            : a().createElement(te, {
                backgroundColor: o.inputStyles.inputBackgroundColor,
              })
        );
      };
      let ie;
      const re = (0, b.iv)(
        ie ||
          (ie = ((e) => e)`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`)
      );
      var se = ({
        name: e,
        label: t,
        isValid: n,
        componentAriaID: i,
        componentType: r,
        onChange: d,
        tabIndex: c,
        theme: m,
        formVersionCId: u,
        a11yIdentifierStyles: f,
      }) => {
        const { current: p } = (0, s.useRef)((0, k.Z)(`${e}__`)),
          h = r === o.hD ? "radio" : "checkbox";
        return a().createElement(
          a().Fragment,
          null,
          a().createElement(l.II, {
            className: re,
            tabIndex: c,
            type: h,
            id: p,
            name: e,
            onChange: d,
            "aria-invalid": !n,
            "aria-label": t,
            "aria-describedby": n ? void 0 : i,
            a11yIdentifier: f,
          }),
          a().createElement(
            l.__,
            {
              style: {
                display: "flex",
                alignItems: "center",
                flex:
                  m.inputStyles.arrangement === o.ZC
                    ? " 1 0 100%"
                    : " 0 0 auto",
                paddingBottom: 8,
                wordBreak: "break-word",
                maxWidth: "100%",
                cursor: "pointer",
              },
              htmlFor: p,
              a11yIdentifier: f,
            },
            a().createElement(oe, {
              valid: n,
              selectorType: h,
              "aria-hidden": "true",
              theme: m,
              formVersionCId: u,
            }),
            a().createElement(X, {
              selectorType: h,
              "aria-hidden": "true",
              formVersionCId: u,
              fillColor: m.inputStyles.textStyles.formInputTextColor,
              id: p,
            }),
            a().createElement(
              l.ZC,
              {
                style: {
                  cursor: "pointer",
                  color: m.inputStyles.textStyles.color,
                  fontFamily: m.inputStyles.textStyles.fontFamily,
                  fontSize: m.inputStyles.textStyles.fontSize,
                  fontWeight: m.inputStyles.textStyles.fontWeight,
                  letterSpacing: m.inputStyles.textStyles.letterSpacing,
                  marginRight: 24,
                  display: "flex",
                  position: "relative",
                  top: 1,
                },
                a11yIdentifier: f,
              },
              t
            )
          )
        );
      };
      let ae,
        le = (e) => e;
      const de = ["selected", "id", "label"],
        ce = { right: "flex-end", left: "flex-start", center: "center" },
        me = ({ options: e, componentType: t, toggledOptionIndex: n }) =>
          e.reduce((e, i, r) => {
            let { selected: s, id: a, label: l } = i,
              d = c()(i, de),
              m = t !== o.hD && s;
            return (
              n === r && (m = !m),
              e.push(
                Object.assign(
                  { selected: m, label: l, id: a || (0, k.Z)(`${l}__`) },
                  d
                )
              ),
              e
            );
          }, []);
      var ue = ({
          formVersionCId: e,
          componentId: t,
          theme: n,
          a11yIdentifierStyles: i,
        }) => {
          const r = (0, f.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            d = (0, f.Z)((n) => {
              var o;
              const i =
                null == (o = n.onsiteState.openFormVersions[e])
                  ? void 0
                  : o.components[t];
              return (
                !!n.onsiteState.client.isDesignWorkflow ||
                !i ||
                i.valid ||
                void 0 === i.valid
              );
            }),
            c = (0, f.Z)((n) => {
              var o, i;
              return null == (o = n.onsiteState.openFormVersions[e]) ||
                null == (i = o.components[t])
                ? void 0
                : i.metadata;
            }, T.X),
            m = (0, f.Z)((n) => {
              var o, i;
              return null == (o = n.onsiteState.openFormVersions[e]) ||
                null == (i = o.components[t])
                ? void 0
                : i.validationErrorType;
            }),
            u = (0, f.Z)((n) => (0, j.HN)(n, e, t)),
            p = (0, f.Z)((e) => {
              var n;
              return null == (n = e.formsState.components[t])
                ? void 0
                : n.componentType;
            }),
            h = (0, f.Z)((e) => {
              var n, o;
              return (
                (null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                  ? void 0
                  : o.options) || []
              );
            }, T.X),
            y = (0, f.Z)((e) => {
              var n, o;
              return (
                (null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                  ? void 0
                  : o.fieldId) || ""
              );
            }),
            g = (0, f.Z)((e) => {
              var n, o;
              return null == (n = e.formsState.components[t]) ||
                null == (o = n.data)
                ? void 0
                : o.label;
            }),
            v = (0, f.Z)((e) => {
              var n, o, i;
              const r =
                null == (n = e.formsState.components[t]) ||
                null == (o = n.data) ||
                null == (i = o.styling)
                  ? void 0
                  : i.innerAlignment;
              return r ? ce[r] : "flex-start";
            }),
            [I, S] = (0, s.useState)([]);
          (0, s.useEffect)(() => {
            S(me({ options: h, componentType: p }));
          }, [h]);
          const { inputName: x, labelId: C } = (0, s.useMemo)(() => {
            const e = (0, k.Z)(`${encodeURIComponent(y)}__`);
            return { inputName: e, labelId: `kl_${e}_label` };
          }, []);
          return a().createElement(
            l.ZC,
            { style: { width: "100%", justifyContent: v, display: "flex" } },
            a().createElement(
              l.ZC,
              {
                className: (0, b.iv)(
                  ae ||
                    (ae = le`
          &&& {
            input:focus + label > svg circle,
            input:focus + label > svg rect {
              stroke: ${0};
            }
          }
        `),
                  n.inputStyles.border.activeColor
                ),
                style: Object.assign(
                  { alignSelf: "flex-end" },
                  n.inputStyles.arrangement === o.ZC
                    ? { display: "block" }
                    : { flexDirection: "column", flexWrap: "wrap" }
                ),
                a11yIdentifier: i,
              },
              a().createElement(
                F.Z,
                {
                  a11yIdentifier: i,
                  id: C,
                  theme: n,
                  style: { marginRight: 8, marginBottom: 8 },
                },
                g
              ),
              a().createElement(
                l.ZC,
                {
                  style: Object.assign(
                    {},
                    n.inputStyles.arrangement === o.ZC
                      ? { display: "block" }
                      : {
                          display: "inline-flex",
                          justifyContent: "flex-start",
                          flexWrap: "wrap",
                        }
                  ),
                  role: p === o.hD ? "radiogroup" : "group",
                  "aria-labelledby": C,
                  a11yIdentifier: i,
                },
                I.map(({ label: s, id: l }, c) =>
                  a().createElement(se, {
                    key: l,
                    formVersionCId: e,
                    theme: n,
                    name: x,
                    label: s,
                    isValid: d,
                    componentType: p,
                    componentAriaID: C,
                    onChange: () =>
                      ((n) => {
                        (0, D.l)();
                        const i = me({
                          options: I,
                          componentType: p,
                          toggledOptionIndex: n,
                        });
                        S(i);
                        const r = ((e) =>
                          e
                            .filter(({ selected: e }) => e)
                            .map((e) => e.value || e.label))(i);
                        (0, O.hX)({
                          formVersionCId: e,
                          componentId: t,
                          value: p === o.hD ? r.toString() : r,
                        });
                      })(c),
                    tabIndex: r ? -1 : 0,
                    a11yIdentifierStyles: i,
                  })
                )
              ),
              !r &&
                a().createElement(_.Z, {
                  theme: n,
                  formVersionCId: e,
                  componentAriaID: C,
                  validationErrorType: m,
                  validationErrorMessage: u,
                  metadata: c,
                  a11yIdentifier: i,
                })
            )
          );
        },
        fe = n(49889),
        pe = n.n(fe),
        he = n(52960),
        ye = n(72506);
      let ge,
        ve = (e) => e;
      const be = "rgb(96, 106, 114)",
        Ie = "white",
        Se = "copy",
        xe = "applied",
        Ce = {
          [Se]: { message: "Copied!", couponTooltipRectangleWidth: 80 },
          [xe]: {
            message: "Coupon applied to checkout!",
            couponTooltipRectangleWidth: 196,
          },
        };
      var we,
        Ee,
        $e = ({ show: e, theme: t, type: n, a11yIdentifier: o }) => {
          const { message: i, couponTooltipRectangleWidth: r } = Ce[n];
          return a().createElement(
            l.ZC,
            {
              style: { width: "100%", position: "relative" },
              a11yIdentifier: o,
            },
            e &&
              a().createElement(
                l.ZC,
                {
                  a11yIdentifier: o,
                  style: {
                    backgroundColor: "transparent",
                    position: "absolute",
                    zIndex: 1,
                    height: "37px",
                    minWidth: `${r}px`,
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    bottom: "-21px",
                    borderRadius: 4,
                    animationName: "klaviyo-fadein, klaviyo-fadeout",
                    animationDuration: "0.4s, 0.4s",
                    animationDelay: "0s, 1.6s",
                  },
                },
                a().createElement(
                  l.ZC,
                  {
                    a11yIdentifier: o,
                    className: (0, b.iv)(
                      ge ||
                        (ge = ve`
              &&& {
                &::after {
                  content: '';
                  display: block;
                  position: absolute;
                  width: 0;
                  height: 0;
                  bottom: ${0}px;
                  left: calc(50% - ${0}px);
                  border-style: solid;
                  border-width: ${0}px;
                  border-top-color: ${0};
                  border-right-color: transparent;
                  border-bottom-color: transparent;
                  border-left-color: transparent;
                }
                &::before {
                  content: '';
                  display: block;
                  position: absolute;
                  width: 0;
                  height: 0;
                  bottom: ${0}px;
                  left: calc(50% - ${0}px);
                  border-style: solid;
                  border-width: ${0}px;
                  border-top-color: ${0};
                  border-right-color: transparent;
                  border-bottom-color: transparent;
                  border-left-color: transparent;
                }
              }
            `),
                      -6,
                      6,
                      6,
                      be,
                      -8,
                      7,
                      7,
                      Ie
                    ),
                    style: {
                      borderRadius: 4,
                      boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.26)",
                      border: "1px solid white",
                      backgroundColor: be,
                    },
                  },
                  a().createElement(
                    l.Dr,
                    {
                      a11yIdentifier: o,
                      style: {
                        fontSize: 14,
                        fontFamily: t.inputStyles.textStyles.fontFamily,
                        textAlign: "center",
                        color: Ie,
                        padding: 8,
                        height: "30px",
                        boxSizing: "border-box",
                        whiteSpace: "nowrap",
                      },
                      role: "alert",
                    },
                    i
                  )
                )
              )
          );
        };
      function ke() {
        return (
          (ke = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                }
                return e;
              }),
          ke.apply(this, arguments)
        );
      }
      var Te,
        Ze,
        Ve = function (e) {
          return s.createElement(
            "svg",
            ke(
              {
                width: 32,
                height: 33,
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            we ||
              (we = s.createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M3.602 1.1a3 3 0 0 0-3 3v18.4a3 3 0 0 0 3 3H8v-2H3.602a1 1 0 0 1-1-1V4.1a1 1 0 0 1 1-1h15.2a1 1 0 0 1 1 1v1.2h2V4.1a3 3 0 0 0-3-3h-15.2Z",
                fill: "currentColor",
              })),
            Ee ||
              (Ee = s.createElement("rect", {
                x: 11.199,
                y: 8.5,
                width: 19.2,
                height: 22.4,
                rx: 2,
                stroke: "currentColor",
                strokeWidth: 2,
              }))
          );
        };
      function Fe() {
        return (
          (Fe = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                }
                return e;
              }),
          Fe.apply(this, arguments)
        );
      }
      var _e = function (e) {
        return s.createElement(
          "svg",
          Fe(
            {
              width: 32,
              height: 33,
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          Te ||
            (Te = s.createElement(
              "g",
              { clipPath: "url(#check_svg__a)" },
              s.createElement("path", {
                d: "m11.16 18.992-4.493-4.494a1.73 1.73 0 0 0-2.45 2.443l5.512 6.144c.79.844 2.133.834 2.912-.021l13.321-14.13a1.678 1.678 0 0 0-2.446-2.299L11.16 18.992Z",
                fill: "#2CB46F",
                stroke: "#fff",
              })
            )),
          Ze ||
            (Ze = s.createElement(
              "defs",
              null,
              s.createElement(
                "clipPath",
                { id: "check_svg__a" },
                s.createElement("path", {
                  fill: "#fff",
                  transform: "translate(0 .5)",
                  d: "M0 0h32v32H0z",
                })
              )
            ))
        );
      };
      var Oe = ({ copied: e, color: t, a11yIdentifier: n }) =>
        e
          ? a().createElement(
              l.ny,
              {
                style: {
                  height: 32,
                  width: 32,
                  paddingLeft: "16px",
                  cursor: "pointer",
                  flexShrink: 0,
                },
                a11yIdentifier: n,
              },
              a().createElement(_e, null)
            )
          : a().createElement(
              l.ny,
              {
                style: {
                  color: t,
                  height: 32,
                  width: 32,
                  paddingLeft: "16px",
                  cursor: "pointer",
                  flexShrink: 0,
                },
                a11yIdentifier: n,
              },
              a().createElement(Ve, null)
            );
      let Me,
        De = (e) => e;
      const { THEME_KEY: Ae } = he.Z;
      var ze = ({ theme: e, a11yIdentifier: t }) => {
          const n = (0, b.iv)(
            Me ||
              (Me = De`
    &&& .klaviyo-spinner {
      &.overlay {
        &:before {
          background-color: ${0};
        }
      }
      &:after {
        top: auto;
        bottom: 0;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        margin-left: -15px;
        border-top-color: ${0};
        border-left-color: ${0};
      }
    }
  `),
            e[Ae].backgroundColor,
            e[Ae].textStyles.color,
            e[Ae].textStyles.color
          );
          return a().createElement(
            l.ZC,
            {
              a11yIdentifier: t,
              className: n,
              style: {
                height: 32,
                width: "100%",
                paddingTop: "16px",
                position: "relative",
              },
            },
            a().createElement(l.ZC, {
              a11yIdentifier: t,
              className: "klaviyo-spinner",
            })
          );
        },
        je = n(21989),
        We = n(26563),
        Ne = n(97165);
      const { THEME_KEY: Be } = he.Z,
        Re = () => null;
      var He = ({
        formVersionCId: e,
        componentId: t,
        theme: n,
        a11yIdentifierBlock: o,
        a11yIdentifierStyles: i,
      }) => {
        const r = (0, f.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          d = (0, f.Z)((e) => {
            var n, o;
            return null == (n = e.formsState.components[t]) ||
              null == (o = n.data)
              ? void 0
              : o.couponType;
          }),
          c = (0, f.Z)((e) => {
            var n, o, i;
            return null == (n = e.formsState.components[t]) ||
              null == (o = n.data) ||
              null == (i = o.couponData)
              ? void 0
              : i.text;
          }),
          m = (0, f.Z)((e) => {
            var n, o, i;
            return null == (n = e.formsState.components[t]) ||
              null == (o = n.data) ||
              null == (i = o.couponData)
              ? void 0
              : i.name;
          }),
          u = (0, f.Z)((e) => {
            var n, o, i;
            return null == (n = e.formsState.components[t]) ||
              null == (o = n.data) ||
              null == (i = o.couponData)
              ? void 0
              : i.fallback;
          }),
          p = (0, f.Z)((e) => e.onsiteState.couponCodes[t]),
          h = (0, f.Z)((e) => e.onsiteState.datadomeCaptchaUrls[t]),
          y = (0, f.Z)((e) => e.onsiteState.client.showingShopLogin),
          [g, v] = (0, s.useState)(!1),
          [b, I] = (0, s.useState)(!1),
          [S, x] = (0, s.useState)(!1),
          [C, w] = (0, s.useState)(Se),
          E = (0, s.useMemo)(
            () =>
              d === je.$i.STATIC
                ? c || je.I4
                : d === je.$i.UNIQUE && r
                ? m
                  ? (0, je.xB)(m)
                  : void 0
                : p || u,
            [d, p, u, m, r, c]
          ),
          $ = h && !S;
        return (
          (0, s.useEffect)(() => {
            r ||
              d !== je.$i.UNIQUE ||
              p ||
              (I(!0), (0, O.zS)({ formVersionCId: e }));
          }, [S, d, p, e, r]),
          (0, s.useEffect)(() => {
            const t = () => {
                x(!0);
              },
              n = () => {
                (0, O.Cm)({ id: e, changes: { errorViewMessage: We.w5 } });
              };
            return (
              window.addEventListener(Ne.H, t, !1),
              window.addEventListener(Ne.vT, n, !1),
              () => {
                window.removeEventListener(Ne.H, t, !1),
                  window.removeEventListener(Ne.vT, n, !1);
              }
            );
          }, []),
          (0, s.useEffect)(() => {
            ($ || E) && b && I(!1);
          }, [$, E, b]),
          (0, s.useEffect)(() => {
            window.Shopify &&
              !b &&
              E &&
              C !== xe &&
              (w(xe), fetch(`/discount/${E}`));
          }, [C, E, b]),
          a().createElement(
            l.ZC,
            {
              a11yIdentifier: o,
              style: {
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "auto",
              },
            },
            r && !E
              ? a().createElement(Re, null)
              : a().createElement(
                  a().Fragment,
                  null,
                  !!E &&
                    !b &&
                    a().createElement($e, {
                      a11yIdentifier: o,
                      show: g,
                      theme: n,
                      type: C,
                    }),
                  $
                    ? a().createElement("iframe", {
                        title: "Recaptcha",
                        src: h,
                        frameBorder: "0",
                        width: "100%",
                        height: "600px",
                      })
                    : a().createElement(
                        l.ZC,
                        {
                          a11yIdentifier: o,
                          style: {
                            position: "relative",
                            display: "flex",
                            flexDirection: "row",
                            flex: "1 1",
                            alignItems: "center",
                            justifyContent: "center",
                            background: n[Be].backgroundColor,
                            borderRadius: n[Be].borderRadius,
                            borderStyle: n[Be].borderStyle,
                            borderColor: n[Be].borderColor,
                            borderWidth: n[Be].borderWidth,
                            color: n[Be].textStyles.color,
                            lineHeight: 1,
                            whiteSpace: "normal",
                            paddingTop: n[Be].paddingTop,
                            paddingBottom: n[Be].paddingBottom,
                            paddingLeft: n[Be].paddingLeft,
                            paddingRight: n[Be].paddingRight,
                            textAlign: "center",
                            wordBreak: "break-word",
                            alignSelf: "flex-end",
                            cursor: b ? "auto" : "pointer",
                          },
                          onClick: () => {
                            E && pe()(E), v(!0);
                            const e = setTimeout(() => {
                              v(!1);
                            }, 2e3);
                            return () => clearTimeout(e);
                          },
                        },
                        b || y === ye.K.SHOWING
                          ? a().createElement(
                              l.ZC,
                              { a11yIdentifier: o },
                              a().createElement(
                                l.ZC,
                                {
                                  a11yIdentifier: i,
                                  style: {
                                    flex: "1 1",
                                    fontFamily:
                                      n.inputStyles.textStyles.fontFamily,
                                    fontSize: 18,
                                    fontWeight:
                                      n.inputStyles.textStyles.fontWeight,
                                    letterSpacing:
                                      n.inputStyles.textStyles.letterSpacing,
                                  },
                                },
                                "Loading Coupon"
                              ),
                              a().createElement(ze, {
                                a11yIdentifier: o,
                                theme: n,
                              })
                            )
                          : a().createElement(
                              a().Fragment,
                              null,
                              a().createElement(
                                l.ZC,
                                {
                                  a11yIdentifier: o,
                                  style: {
                                    flex: "1 1",
                                    fontFamily: n[Be].textStyles.fontFamily,
                                    fontSize: n[Be].textStyles.fontSize,
                                    fontWeight: n[Be].textStyles.fontWeight,
                                    letterSpacing:
                                      n[Be].textStyles.letterSpacing,
                                  },
                                },
                                E
                              ),
                              a().createElement(Oe, {
                                copied: g,
                                color: n[Be].textStyles.color,
                                a11yIdentifier: o,
                              })
                            )
                      )
                )
          )
        );
      };
      let Pe,
        Le = (e) => e;
      const qe = ["html", "textStyles"];
      var Ke = (e) => {
        let { html: t, textStyles: n } = e,
          i = c()(e, qe);
        return n
          ? a().createElement(
              "div",
              r()(
                {},
                t ? { dangerouslySetInnerHTML: { __html: t } } : {},
                {
                  style: { width: "100%" },
                  className: (0, b.iv)(
                    Pe ||
                      (Pe = Le`
        &&& {
          :not(a) {
            color: ${0};
            font-family: ${0};
            font-size: ${0}px;
          }
          a {
            color: ${0};
            font-family: ${0};
            font-size: ${0}px;
          }
        }
        ${0}
        ${0}
      `),
                    n.text.color,
                    n.text.fontFamily,
                    n.text.fontSize,
                    n.link.color,
                    n.link.fontFamily,
                    n.link.fontSize,
                    o.Tc,
                    S
                  ),
                },
                i
              )
            )
          : null;
      };
      const {
        A11yWrapper: Ue = () => null,
        useRecursivelySetA11yAttribute: Ge = () => "",
      } = {};
      var Ye = ({
          componentId: e,
          formVersionCId: t,
          a11yIdentifierBlock: n,
        }) => {
          const o = (0, f.Z)((t) => {
              var n, o, i;
              return null == (n = t.formsState.components[e]) ||
                null == (o = n.data) ||
                null == (i = o.content)
                ? void 0
                : i.html;
            }),
            i = (0, f.Z)((n) => {
              var o;
              const i =
                null == (o = n.onsiteState.openFormVersions[t])
                  ? void 0
                  : o.currentViewId;
              if (!i) return;
              const { formSMSDisclosure: r } = (0, W.su)(n, e, i);
              return null == r ? void 0 : r.textStyles;
            }, T.X),
            r = Ge({ html: o, a11yIdentifier: n || "" });
          return n
            ? a().createElement(
                Ue,
                { identifier: n },
                a().createElement(Ke, { html: r, textStyles: i })
              )
            : a().createElement(Ke, { html: o, textStyles: i });
        },
        Xe = n(72122);
      const { THEME_KEY: Je } = Xe.Z;
      var Qe = ({ text: e, theme: t, a11yIdentifierBlock: n }) =>
        a().createElement(
          l.ZC,
          {
            a11yIdentifier: n,
            style: {
              color: t[Je].textStyles.color,
              fontFamily: t[Je].textStyles.fontFamily,
              fontSize: t[Je].textStyles.fontSize,
              fontWeight: t[Je].textStyles.fontWeight,
              justifyContent: "center",
              justifySelf: "center",
            },
          },
          e
        );
      let et,
        tt,
        nt,
        ot,
        it,
        rt = (e) => e;
      const { THEME_KEY: st } = Xe.Z,
        at = "0.72em",
        lt = "0.15em";
      var dt = ({
        text: e,
        prevText: t = "00",
        animate: n = !1,
        theme: o,
        a11yIdentifierBlock: i,
      }) => {
        const r = (0, s.useMemo)(
          () => ({
            card: (0, b.iv)(
              et ||
                (et = rt`
        &&& {
          & {
            text-align: center;
            display: inline-block;
            margin: 0 5px;
            display: block;
            position: relative;
            font-size: ${0};
          }

          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }
        }
      `),
              o[st].textStyles.fontSize
            ),
            card_top: (0, b.iv)(
              tt ||
                (tt = rt`
        &&& {
          & {
            display: block;
            height: ${0};
            border-radius: ${0} ${0} 0 0;
            backface-visibility: hidden;
            aspect-ratio: 2/1;
            overflow: hidden;

            background: ${0};
            color: ${0};
            font-family: ${0};
            font-size: ${0};
            font-weight: ${0};
          }

          &::after {
            display: block;
            content: '${0}';
            height: 100%;
            width: 100%;
            text-align: center;
            line-height: 150%;

            color: ${0};
            font-family: ${0};
            font-size: ${0};
            font-weight: ${0};
          }
        }
      `),
              at,
              lt,
              lt,
              o[st].cardColor,
              o[st].textStyles.color,
              o[st].textStyles.fontFamily,
              o[st].textStyles.fontSize,
              o[st].textStyles.fontWeight,
              e,
              o[st].textStyles.color,
              o[st].textStyles.fontFamily,
              o[st].textStyles.fontSize,
              o[st].textStyles.fontWeight
            ),
            card_bottom: (0, b.iv)(
              nt ||
                (nt = rt`
        &&& {
          & {
            border-top: solid 1px #fff;
            border-radius: 0 0 ${0} ${0};

            display: block;
            height: ${0};
            backface-visibility: hidden;
            aspect-ratio: 2/1;
            overflow: hidden;

            background: ${0};
            color: ${0};
            font-family: ${0};
            font-size: ${0};
            font-weight: ${0};
          }

          &::after {
            display: block;
            margin-top: -${0};
            content: '${0}';
            height: 100%;
            width: 100%;
            text-align: center;
            line-height: 150%;

            color: ${0};
            font-family: ${0};
            font-size: ${0};
            font-weight: ${0};
          }
        }
      `),
              lt,
              lt,
              at,
              o[st].cardColor,
              o[st].textStyles.color,
              o[st].textStyles.fontFamily,
              o[st].textStyles.fontSize,
              o[st].textStyles.fontWeight,
              at,
              n ? t : e,
              o[st].textStyles.color,
              o[st].textStyles.fontFamily,
              o[st].textStyles.fontSize,
              o[st].textStyles.fontWeight
            ),
            card_animate: (0, b.iv)(
              ot ||
                (ot = rt`
        &&& {
          & {
            position: absolute;
            top: 0;
            height: 100%;
            left: 0%;
            pointer-events: none;

            z-index: 2;
          }

          &::before {
            content: '${0}';
            z-index: -1;
            height: 100%;
            width: 100%;
            text-align: center;
            line-height: 150%;

            animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35) 1;
            animation-fill-mode: both;
            transform-origin: center bottom;

            display: block;
            height: ${0};
            border-radius: ${0} ${0} 0 0;
            backface-visibility: hidden;
            aspect-ratio: 2/1;
            overflow: hidden;

            background: ${0};
            color: ${0};
            font-family: ${0};
            font-size: ${0};
            font-weight: ${0};
          }
        }
      `),
              t,
              at,
              lt,
              lt,
              o[st].cardColor,
              o[st].textStyles.color,
              o[st].textStyles.fontFamily,
              o[st].textStyles.fontSize,
              o[st].textStyles.fontWeight
            ),
            card_animate_bottom: (0, b.iv)(
              it ||
                (it = rt`
        &&& {
          & {
            border-top: solid 1px #fff;
            border-radius: 0 0 ${0} ${0};

            display: block;
            height: ${0};
            backface-visibility: hidden;
            aspect-ratio: 2/1;
            overflow: hidden;

            background: ${0};
            color: ${0};
            font-family: ${0};
            font-size: ${0};
            font-weight: ${0};
          }

          &::after {
            display: block;
            margin-top: -${0};
            content: '${0}';
            height: 100%;
            width: 100%;
            text-align: center;
            line-height: 150%;

            color: ${0};
            font-family: ${0};
            font-size: ${0};
            font-weight: ${0};
          }
        }
      `),
              lt,
              lt,
              at,
              o[st].cardColor,
              o[st].textStyles.color,
              o[st].textStyles.fontFamily,
              o[st].textStyles.fontSize,
              o[st].textStyles.fontWeight,
              at,
              e,
              o[st].textStyles.color,
              o[st].textStyles.fontFamily,
              o[st].textStyles.fontSize,
              o[st].textStyles.fontWeight
            ),
          }),
          [o, e, t, n]
        );
        return a().createElement(
          l.ZC,
          { a11yIdentifier: i, className: r.card },
          a().createElement(l.ZC, { a11yIdentifier: i, className: r.card_top }),
          a().createElement(l.ZC, {
            a11yIdentifier: i,
            className: r.card_bottom,
          }),
          n &&
            a().createElement(
              l.ZC,
              { a11yIdentifier: i, className: r.card_animate, key: e },
              a().createElement(l.ZC, {
                a11yIdentifier: i,
                className: r.card_animate_bottom,
                style: {
                  transformOrigin: "center top",
                  animationFillMode: "both",
                  animation: "flipBottom 0.6s cubic-bezier(.15,.45,.28,1) 1",
                },
              })
            )
        );
      };
      const { THEME_KEY: ct } = Xe.Z;
      var mt = ({
        text: e,
        clockFace: t = "simple",
        theme: n,
        a11yIdentifierBlock: o,
      }) => {
        const i = (0, s.useMemo)(
          () => ("flip" === t ? n[ct].cardColor : n[ct].textStyles.color),
          [t, n]
        );
        return a().createElement(
          l.ZC,
          {
            a11yIdentifier: o,
            style: {
              color: i,
              fontFamily: n[ct].textStyles.fontFamily,
              fontSize: n[ct].textStyles.labelFontSize,
              fontWeight: n[ct].textStyles.labelFontWeight,
              justifyContent: "center",
              justifySelf: "center",
            },
          },
          e
        );
      };
      const ut = { name: "none", duration: 0 },
        ft = { name: "flash", duration: 1 },
        pt = { name: "heartbeat", duration: 1.3 },
        ht = { name: "pulse", duration: 1 },
        yt = "fixed",
        gt = "variable",
        vt = (e, t) => {
          const n = new Date(e)
              .toLocaleString("en-US", { timeZone: t || "America/New_York" })
              .split(",")[0]
              .split("/"),
            o = Number(n[2]),
            i = Number(n[0]) - 1,
            r = Number(n[1]),
            s = new Date(Date.UTC(o, i, r));
          return new Date(s).toISOString();
        };
      var bt = ({
        componentId: e,
        formVersionCId: t,
        theme: n,
        a11yIdentifierBlock: o,
      }) => {
        const i = (0, f.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          r = (0, f.Z)((t) => {
            var n, o;
            return null == (n = t.formsState.components[e]) ||
              null == (o = n.data)
              ? void 0
              : o.dateType;
          }),
          d = (0, f.Z)((t) => {
            var n, o, i;
            return null == (n = t.formsState.components[e]) ||
              null == (o = n.data) ||
              null == (i = o.date)
              ? void 0
              : i.variable;
          }),
          c = (0, f.Z)((t) => {
            var n, o, i;
            return null == (n = t.formsState.components[e]) ||
              null == (o = n.data) ||
              null == (i = o.date)
              ? void 0
              : i.fixed;
          }),
          m = (0, s.useMemo)(
            () =>
              c.date
                ? Object.assign({}, c, { date: vt(c.date, c.timezone) })
                : c,
            [c]
          ),
          u = (0, f.Z)((t) => {
            var n, o;
            return null == (n = t.formsState.components[e]) ||
              null == (o = n.data)
              ? void 0
              : o.clockFace;
          }),
          p = (0, f.Z)((t) => {
            var n, o;
            return null == (n = t.formsState.components[e]) ||
              null == (o = n.data)
              ? void 0
              : o.timerAnimation;
          }),
          h = (0, f.Z)((e) => {
            var n;
            return null == (n = e.onsiteState.openFormVersions[t])
              ? void 0
              : n.opened;
          }),
          y = (0, s.useMemo)(() => {
            if (r === gt)
              return {
                days:
                  d.days > 0 ? `${d.days.toString().padStart(2, "0")}` : void 0,
                hours:
                  d.days > 0 || d.hours > 0
                    ? `${d.hours.toString().padStart(2, "0")}`
                    : void 0,
                minutes: `${d.minutes.toString().padStart(2, "0")}`,
                seconds: "00",
              };
            if (r === yt) {
              var e;
              if (!m.date || !m.time || !m.timezoneOffset)
                return { minutes: "00", seconds: "00" };
              const t = new Date(
                  `${
                    null == m || null == (e = m.date) ? void 0 : e.split("T")[0]
                  }T${null == m ? void 0 : m.time}:00${
                    null == m ? void 0 : m.timezoneOffset
                  }`
                ),
                n = new Date(),
                o = t.getTime() - n.getTime();
              if (o <= 0) return { minutes: "00", seconds: "00" };
              const r = Math.floor(o / 864e5),
                s = Math.floor((o % 864e5) / 36e5),
                a = Math.floor((o % 36e5) / 6e4),
                l = Math.floor((o % 6e4) / 1e3);
              return i
                ? {
                    days: r > 0 ? "00" : void 0,
                    hours: r > 0 || s > 0 ? "00" : void 0,
                    minutes: "00",
                    seconds: "00",
                  }
                : {
                    days: r > 0 ? `${r.toString().padStart(2, "0")}` : void 0,
                    hours:
                      r > 0 || s > 0
                        ? `${s.toString().padStart(2, "0")}`
                        : void 0,
                    minutes: `${a.toString().padStart(2, "0")}`,
                    seconds: `${l.toString().padStart(2, "0")}`,
                  };
            }
            return { minutes: "00", seconds: "00" };
          }, [r, d, m.date, m.time, m.timezoneOffset, i]),
          [g, v] = (0, s.useState)(y),
          [b, I] = (0, s.useState)(g),
          [S, x] = (0, s.useState)(!1),
          [C, w] = (0, s.useState)(0);
        (0, s.useEffect)(() => {
          if (i) return I(g), v(y), () => {};
          if (r === gt && h && !S) {
            const e = new Date();
            e.setDate(e.getDate() + d.days),
              e.setHours(e.getHours() + d.hours),
              e.setMinutes(e.getMinutes() + d.minutes),
              w(e.getTime()),
              x(!0);
          }
          if (r === yt && !S) {
            var e;
            const t = new Date(
              `${
                null == m || null == (e = m.date) ? void 0 : e.split("T")[0]
              }T${null == m ? void 0 : m.time}:00${
                null == m ? void 0 : m.timezoneOffset
              }`
            );
            w(t.getTime()), x(!0);
          }
          const t = setInterval(() => {
            if (
              S &&
              (Number(g.seconds) > 0 ||
                Number(g.minutes) > 0 ||
                Number(g.hours) > 0 ||
                Number(g.days) > 0)
            ) {
              const e = new Date(),
                t = C - e.getTime();
              if (t < 0) return I(g), void v({ minutes: "00", seconds: "00" });
              const n = Math.floor(t / 864e5),
                o = Math.floor((t % 864e5) / 36e5),
                i = Math.floor((t % 36e5) / 6e4),
                r = Math.floor((t % 6e4) / 1e3);
              I(g),
                v({
                  days: n > 0 ? `${n.toString().padStart(2, "0")}` : void 0,
                  hours:
                    n > 0 || o > 0
                      ? `${o.toString().padStart(2, "0")}`
                      : void 0,
                  minutes: `${i.toString().padStart(2, "0")}`,
                  seconds: `${r.toString().padStart(2, "0")}`,
                });
            }
          }, 1e3);
          return () => {
            clearInterval(t);
          };
        }, [i, r, h, S, y, d, m, C, g]);
        const E = (0, s.useRef)(p),
          [$, k] = (0, s.useState)(!1);
        (0, s.useEffect)(() => {
          k(E.current !== p), (E.current = p);
        }, [p]);
        const T = (0, s.useMemo)(() => {
          if (i && !$) return "";
          if (
            (!i &&
              (Number(g.seconds) > 0 ||
                Number(g.minutes) > 0 ||
                Number(g.hours) > 0 ||
                Number(g.days) > 0)) ||
            p === ut.name
          )
            return "";
          let e = "";
          return (
            p === ft.name
              ? (e = `${ft.name} ${ft.duration}s`)
              : p === pt.name
              ? (e = `${pt.name} ${pt.duration}s`)
              : p === ht.name && (e = `${ht.name} ${ht.duration}s`),
            i ? `${e} 1` : `${e} 1s infinite`
          );
        }, [p, i, g, $]);
        return "simple" === u
          ? a().createElement(
              l.ZC,
              {
                className: "klaviyo-countdown",
                a11yIdentifier: o,
                "data-testid": "klaviyo-countdown",
                style: {
                  width: "100%",
                  justifyContent: "center",
                  justifySelf: "center",
                  display: "flex",
                  animation: `${T}`,
                },
              },
              (null == g ? void 0 : g.days) &&
                a().createElement(
                  a().Fragment,
                  null,
                  a().createElement(
                    l.ZC,
                    {
                      a11yIdentifier: o,
                      style: {
                        justifyContent: "center",
                        justifySelf: "center",
                        display: "grid",
                      },
                    },
                    a().createElement(Qe, {
                      theme: n,
                      a11yIdentifierBlock: o,
                      text: null == g ? void 0 : g.days,
                    }),
                    a().createElement(mt, {
                      theme: n,
                      a11yIdentifierBlock: o,
                      clockFace: u,
                      text: "days",
                    })
                  ),
                  a().createElement(Qe, {
                    theme: n,
                    a11yIdentifierBlock: o,
                    text: " ",
                  })
                ),
              (null == g ? void 0 : g.hours) &&
                a().createElement(
                  a().Fragment,
                  null,
                  a().createElement(
                    l.ZC,
                    {
                      a11yIdentifier: o,
                      style: {
                        justifyContent: "center",
                        justifySelf: "center",
                        display: "grid",
                      },
                    },
                    a().createElement(Qe, {
                      theme: n,
                      a11yIdentifierBlock: o,
                      text: null == g ? void 0 : g.hours,
                    }),
                    a().createElement(mt, {
                      theme: n,
                      a11yIdentifierBlock: o,
                      clockFace: u,
                      text: "hours",
                    })
                  ),
                  a().createElement(Qe, {
                    theme: n,
                    a11yIdentifierBlock: o,
                    text: ":",
                  })
                ),
              a().createElement(
                l.ZC,
                {
                  a11yIdentifier: o,
                  style: {
                    justifyContent: "center",
                    justifySelf: "center",
                    display: "grid",
                  },
                },
                a().createElement(Qe, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  text: null == g ? void 0 : g.minutes,
                }),
                a().createElement(mt, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  clockFace: u,
                  text: "minutes",
                })
              ),
              a().createElement(Qe, {
                theme: n,
                a11yIdentifierBlock: o,
                text: ":",
              }),
              a().createElement(
                l.ZC,
                {
                  a11yIdentifier: o,
                  style: {
                    justifyContent: "center",
                    justifySelf: "center",
                    display: "grid",
                  },
                },
                a().createElement(Qe, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  text: null == g ? void 0 : g.seconds,
                }),
                a().createElement(mt, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  clockFace: u,
                  text: "seconds",
                })
              )
            )
          : "flip" === u
          ? a().createElement(
              l.ZC,
              {
                className: "klaviyo-countdown",
                a11yIdentifier: o,
                "data-testid": "klaviyo-countdown",
                style: {
                  width: "100%",
                  justifyContent: "center",
                  justifySelf: "center",
                  display: "flex",
                  animation: `${T}`,
                },
              },
              (null == g ? void 0 : g.days) &&
                a().createElement(
                  l.ZC,
                  {
                    a11yIdentifier: o,
                    style: {
                      justifyContent: "center",
                      justifySelf: "center",
                      display: "grid",
                    },
                  },
                  a().createElement(dt, {
                    theme: n,
                    a11yIdentifierBlock: o,
                    text: null == g ? void 0 : g.days,
                    prevText: null == b ? void 0 : b.days,
                    animate: !i,
                  }),
                  a().createElement(mt, {
                    theme: n,
                    a11yIdentifierBlock: o,
                    clockFace: u,
                    text: "days",
                  })
                ),
              (null == g ? void 0 : g.hours) &&
                a().createElement(
                  l.ZC,
                  {
                    a11yIdentifier: o,
                    style: {
                      justifyContent: "center",
                      justifySelf: "center",
                      display: "grid",
                    },
                  },
                  a().createElement(dt, {
                    theme: n,
                    a11yIdentifierBlock: o,
                    text: null == g ? void 0 : g.hours,
                    prevText: null == b ? void 0 : b.hours,
                    animate: !i,
                  }),
                  a().createElement(mt, {
                    theme: n,
                    a11yIdentifierBlock: o,
                    clockFace: u,
                    text: "hours",
                  })
                ),
              a().createElement(
                l.ZC,
                {
                  a11yIdentifier: o,
                  style: {
                    justifyContent: "center",
                    justifySelf: "center",
                    display: "grid",
                  },
                },
                a().createElement(dt, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  text: null == g ? void 0 : g.minutes,
                  prevText: null == b ? void 0 : b.minutes,
                  animate: !i,
                }),
                a().createElement(mt, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  clockFace: u,
                  text: "minutes",
                })
              ),
              a().createElement(
                l.ZC,
                {
                  a11yIdentifier: o,
                  style: {
                    justifyContent: "center",
                    justifySelf: "center",
                    display: "grid",
                  },
                },
                a().createElement(dt, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  text: null == g ? void 0 : g.seconds,
                  prevText: null == b ? void 0 : b.seconds,
                  animate: !i,
                }),
                a().createElement(mt, {
                  theme: n,
                  a11yIdentifierBlock: o,
                  clockFace: u,
                  text: "seconds",
                })
              )
            )
          : a().createElement(l.ZC, null);
      };
      var It = (e, t = () => a().createElement(a().Fragment, null)) => {
        function n(n) {
          const [o, i] = a().useState(0),
            r = a().useCallback(() => i((e) => (e < 5 ? e + 1 : e)), []),
            s = a().useMemo(
              () =>
                a().lazy(() =>
                  e().catch(() => ({
                    default: () => (r(), a().createElement(a().Fragment, null)),
                  }))
                ),
              [e, o]
            );
          return a().createElement(
            a().Suspense,
            { fallback: a().createElement(t, null) },
            a().createElement(s, n)
          );
        }
        return (n.displayName = "LazyLoader"), n;
      };
      const St = {
        [o.Ct]: g,
        [o.jR]: $,
        [o.qn]: R,
        [o.xC]: R,
        [o.J8]: It(() =>
          Promise.all([n.e(2462), n.e(9734), n.e(4371), n.e(6908)]).then(
            n.bind(n, 72854)
          )
        ),
        [o.YQ]: K,
        [o.zV]: ue,
        [o.hD]: ue,
        [o.ZW]: R,
        [o.UO]: It(() =>
          Promise.all([n.e(2462), n.e(9734), n.e(4983)]).then(n.bind(n, 59053))
        ),
        [o.B1]: He,
        [o.AL]: Ye,
        [o.Ys]: R,
        [o._2]: bt,
        [o.eC]: R,
      };
    },
    31269: function (e, t, n) {
      var o = n(93885),
        i = n.n(o),
        r = n(2116),
        s = n.n(r),
        a = n(76223),
        l = n.n(a),
        d = n(46138);
      const c = ["children", "theme", "style"];
      t.Z = (e) => {
        let { children: t, theme: n, style: o } = e,
          r = s()(e, c);
        return t
          ? l().createElement(
              d.__,
              i()(
                {
                  style: Object.assign(
                    {
                      color: n.inputStyles.textStyles.color,
                      fontFamily: n.inputStyles.textStyles.fontFamily,
                      fontSize: n.inputStyles.textStyles.fontSize,
                      fontWeight: n.inputStyles.textStyles.labelFontWeight,
                      letterSpacing: n.inputStyles.textStyles.letterSpacing,
                      paddingBottom: 6,
                    },
                    o
                  ),
                },
                r
              ),
              t
            )
          : null;
      };
    },
    49325: function (e, t, n) {
      var o = n(76223),
        i = n.n(o),
        r = n(94926),
        s = n(46138),
        a = n(25577),
        l = n(96135),
        d = n(97743),
        c = n(42606),
        m = n(75428),
        u = n(3321);
      let f,
        p = (e) => e;
      t.Z = ({
        formVersionCId: e,
        validationErrorType: t,
        validationErrorMessage: n,
        metadata: o,
        componentAriaID: h,
        theme: y,
        a11yIdentifier: g,
      }) => {
        const v = (0, u.Z)((t) => {
            var n;
            const o = t.onsiteState.openFormVersions[e];
            return o
              ? null == (n = t.formsState.formVersions[o.formVersionId])
                ? void 0
                : n.formTypeDirection
              : void 0;
          }),
          b = !(null == v || !v.startsWith("BOTTOM")),
          I = y.inputStyles.textStyles.errorColor;
        return i().createElement(
          s.ZC,
          { style: { width: "100%", position: "relative" }, a11yIdentifier: g },
          t &&
            i().createElement(
              s.ZC,
              {
                a11yIdentifier: g,
                style: Object.assign(
                  {
                    backgroundColor: "white",
                    position: "absolute",
                    zIndex: 1,
                    right: 0,
                    borderRadius: 4,
                    animation: "klaviyo-fadein 0.4s",
                  },
                  b ? { bottom: 47 } : { top: 9 }
                ),
              },
              i().createElement(
                s.ZC,
                {
                  a11yIdentifier: g,
                  className: (0, r.iv)(
                    f ||
                      (f = p`
              &&& {
                &::after {
                  content: '';
                  display: block;
                  position: absolute;
                  width: 0;
                  height: 0;
                  border-style: solid;
                  left: 8px;
                  border-width: 8px;
                  ${0}
                }
                &::before {
                  content: '';
                  display: block;
                  position: absolute;
                  width: 0;
                  height: 0;
                  border-style: solid;
                  border-width: 9px;
                  left: 7px;
                  ${0};
                }
              }
            `),
                    b
                      ? "bottom: -15px;\n                  border-color: rgb(255, 244, 240) transparent transparent transparent;"
                      : "top: -15px;\n                  border-color: transparent transparent rgb(255, 244, 240) transparent;",
                    b
                      ? `bottom: -17px;\n                    border-color: ${I} transparent transparent transparent;`
                      : `top: -17px;\n                    border-color: transparent transparent ${I} transparent;`
                  ),
                  style: {
                    borderRadius: 4,
                    boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.26)",
                    border: `1px solid ${y.inputStyles.textStyles.errorColor}`,
                    backgroundColor: "rgb(255, 244, 240)",
                  },
                },
                i().createElement(
                  s.Dr,
                  {
                    style: {
                      fontSize: 14,
                      padding: 8,
                      fontFamily: y.inputStyles.textStyles.fontFamily,
                      color: y.inputStyles.textStyles.errorColor,
                    },
                    role: "alert",
                    id: h,
                    a11yIdentifier: g,
                  },
                  (({
                    validationErrorType: e,
                    validationErrorMessage: t,
                    metadata: n,
                  }) => {
                    if (t) return t;
                    switch (e) {
                      case a.d:
                        return "This field is required";
                      case l.d:
                        return "This email is invalid";
                      case d.d:
                        return "The date format is invalid";
                      case c.d:
                        return n
                          ? `Must be ${n.smsMinimumAge || 21} or older.`
                          : "";
                      case m.d:
                        return "This number is invalid";
                      default:
                        return "";
                    }
                  })({
                    validationErrorType: t,
                    validationErrorMessage: n,
                    metadata: o,
                  })
                )
              )
            )
        );
      };
    },
    58038: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return h;
        },
      });
      var o = n(93885),
        i = n.n(o),
        r = n(76223),
        s = n.n(r),
        a = n(1618),
        l = n(3321),
        d = n(46138),
        c = n(59208),
        m = n(20094),
        u = n(5397);
      const f = () => null,
        p = { right: 0, top: 0 };
      var h = ({
        title: e,
        onClick: t,
        buttonStyling: n,
        positionalStyles: o = p,
        isTeaser: h = !1,
        designerFunctions: y,
        designerInfo: g,
      }) => {
        const v = (0, l.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          [b, I] = (0, r.useState)(!1),
          S = null == g ? void 0 : g.activeSidebar,
          x = (0, r.useMemo)(
            () =>
              (null == S ? void 0 : S.type) === m.cn ||
              (null == S ? void 0 : S.type) === m.iy,
            [S]
          ),
          C = h ? m.iy : m.cn,
          w = h ? u.Z.dismissButtonStyles : c.Z.dismissButtonStyles,
          E = (0, a.Z)({}, w, n),
          $ = E.size,
          k = b || x,
          T = o === p,
          Z = (0, r.useMemo)(() => (v ? "dismiss:dismiss:form" : void 0), [v]);
        return s().createElement(
          s().Fragment,
          null,
          k &&
            s().createElement(f, {
              size: $,
              isSelected: x,
              $margin: T ? E.margin : {},
              positionalStyles: o,
              closeButton: !0,
            }),
          s().createElement(
            d.CI,
            i()(
              {
                a11yIdentifier: Z,
                width: $,
                height: $,
                tabIndex: 0,
                alt: "Close dialog",
                style: Object.assign(
                  {},
                  o,
                  {
                    position: "absolute",
                    zIndex: 6,
                    cursor: "pointer",
                    height: `${$}px`,
                    width: `${$}px`,
                  },
                  T && {
                    marginRight: `${E.margin.right}px`,
                    marginTop: `${E.margin.top}px`,
                  }
                ),
                className: v ? "" : "klaviyo-close-form",
                viewBox: "0 0 20 20",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                onClick: t,
                "aria-label": e,
              },
              v && {
                onClick: () => {
                  y && y.setActiveSidebar({ type: C });
                },
                onMouseOver: () => {
                  I(!0);
                },
                onMouseLeave: () => I(!1),
              }
            ),
            s().createElement("title", { id: `title-${e}` }, e),
            s().createElement("circle", {
              style: { cursor: "pointer" },
              cx: "10",
              cy: "10",
              r: "9.5",
              fill: E.backgroundColor,
              stroke: E.borderColor,
            }),
            s().createElement("path", {
              style: { cursor: "pointer" },
              d: "M6 6L14 14M6 14L14 6L6 14Z",
              stroke: E.xColor,
              strokeWidth: E.xStroke,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            })
          )
        );
      };
    },
    14686: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return ie;
        },
      });
      var o = n(93885),
        i = n.n(o),
        r = n(76223),
        s = n.n(r),
        a = n(94926),
        l = n(18017),
        d = n(75266);
      var c = (e) => {
        const t = e.getBoundingClientRect();
        return (
          t.top >= 0 &&
          t.left >= 0 &&
          t.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          t.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      };
      var m = () =>
          (0, d.Z)() &&
          !window.klaviyoForceMobile &&
          window.screen.availHeight < window.screen.availWidth,
        u = n(79885);
      var f,
        p,
        h,
        y = (e, t) => {
          var n, o, i, r, s, a;
          let l =
            e.formType === u.nq &&
            [u.Gi, u.qK].includes(
              null == (n = e.data) || null == (o = n.flyoutOptions)
                ? void 0
                : o.docking
            );
          m() && (l = !1);
          let d = e.formTypeDirection || null;
          var c, f;
          l &&
            t &&
            (d =
              (null == (c = e.data) || null == (f = c.flyoutOptions)
                ? void 0
                : f.docking) === u.Gi
                ? u.DA
                : u.qS);
          return {
            isDocked: l && t,
            evaluatedFormTypeDirection: d,
            dockedDirection:
              (null == (i = e.data) || null == (r = i.flyoutOptions)
                ? void 0
                : r.docking) === u.kW ||
              null == (s = e.data) ||
              null == (a = s.flyoutOptions)
                ? void 0
                : a.docking,
          };
        },
        g = n(44731),
        v = n(89160),
        b = n(75856),
        I = n(20094),
        S = n(18356),
        x = n(94482),
        C = n(80101),
        w = n(14988),
        E = n(18059),
        $ = n(58038),
        k = n(3321),
        T = n(46138),
        Z = n(30360);
      function V() {
        return (
          (V = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                }
                return e;
              }),
          V.apply(this, arguments)
        );
      }
      var F = function (e) {
          return r.createElement(
            "svg",
            V(
              {
                width: 160,
                height: 24,
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            f ||
              (f = r.createElement("path", {
                d: "M0 0h160v22a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V0Z",
                fill: "#373F47",
              })),
            p ||
              (p = r.createElement("path", {
                d: "M24.728 15.144c1.416 0 2.376-.672 3.048-1.596l-.84-.456a2.723 2.723 0 0 1-2.208 1.164c-1.752 0-3.084-1.356-3.084-3.252 0-1.92 1.332-3.252 3.084-3.252.912 0 1.752.48 2.208 1.164l.828-.468c-.636-.912-1.62-1.584-3.036-1.584-2.304 0-4.116 1.68-4.116 4.14s1.812 4.14 4.116 4.14ZM29.909 15v-4.104c.264-.468 1.02-.924 1.584-.924.132 0 .24.012.348.024v-.924c-.792 0-1.464.456-1.932 1.056v-.924h-.9V15h.9Zm5.69.144c.935 0 1.715-.324 2.303-.9l-.432-.588a2.522 2.522 0 0 1-1.8.744c-1.248 0-2.004-.912-2.076-2.004h4.68v-.228c0-1.74-1.032-3.108-2.784-3.108-1.656 0-2.856 1.356-2.856 3.036 0 1.812 1.236 3.048 2.964 3.048Zm1.787-3.42h-3.804c.048-.876.66-1.92 1.896-1.92 1.32 0 1.896 1.068 1.908 1.92ZM44.256 15v-3.984c0-1.404-1.008-1.956-2.244-1.956-.948 0-1.692.312-2.316.96l.42.624c.516-.564 1.08-.804 1.776-.804.84 0 1.464.444 1.464 1.212v1.044c-.468-.528-1.128-.78-1.92-.78-.984 0-2.016.6-2.016 1.908 0 1.26 1.044 1.92 2.016 1.92.78 0 1.452-.276 1.92-.804V15h.9Zm-2.484-.504c-.852 0-1.44-.528-1.44-1.272 0-.732.588-1.26 1.44-1.26.624 0 1.236.24 1.584.708v1.104c-.348.48-.96.72-1.584.72Zm5.776.648c.516 0 .84-.156 1.068-.372l-.264-.684a.852.852 0 0 1-.612.252c-.384 0-.576-.312-.576-.744v-3.6h1.176v-.792h-1.176V7.62h-.912v1.584h-.96v.792h.96v3.792c0 .864.432 1.356 1.296 1.356Zm4.68 0c.935 0 1.715-.324 2.303-.9l-.432-.588a2.522 2.522 0 0 1-1.8.744c-1.248 0-2.004-.912-2.076-2.004h4.68v-.228c0-1.74-1.032-3.108-2.784-3.108-1.656 0-2.856 1.356-2.856 3.036 0 1.812 1.236 3.048 2.964 3.048Zm1.787-3.42h-3.804c.048-.876.66-1.92 1.896-1.92 1.32 0 1.896 1.068 1.908 1.92ZM61.461 15V6.996h-.9v3.084c-.468-.636-1.176-1.02-1.956-1.02-1.512 0-2.58 1.188-2.58 3.048 0 1.884 1.068 3.036 2.58 3.036a2.44 2.44 0 0 0 1.956-1.008V15h.9Zm-2.628-.66c-1.176 0-1.872-.948-1.872-2.232 0-1.284.696-2.244 1.872-2.244.708 0 1.416.432 1.728.936v2.616c-.312.504-1.02.924-1.728.924Zm13.464.66 1.848-5.796h-.948l-1.416 4.62-1.512-4.62h-.78l-1.524 4.62-1.416-4.62h-.936L67.46 15h.9l1.512-4.656L71.385 15h.912Zm3.34-6.624c.336 0 .6-.264.6-.6a.604.604 0 0 0-.6-.612.615.615 0 0 0-.612.612c0 .336.276.6.612.6ZM76.081 15V9.204h-.9V15h.9Zm3.272.144c.516 0 .84-.156 1.068-.372l-.264-.684a.852.852 0 0 1-.612.252c-.384 0-.576-.312-.576-.744v-3.6h1.176v-.792h-1.176V7.62h-.912v1.584h-.96v.792h.96v3.792c0 .864.432 1.356 1.296 1.356ZM86.228 15v-4.092c0-1.26-.636-1.848-1.848-1.848-.876 0-1.668.492-2.064.984V6.996h-.9V15h.9v-4.236c.336-.468 1.008-.9 1.704-.9.792 0 1.308.288 1.308 1.32V15h.9ZM119.251 7.717a.956.956 0 0 0 .684-.287 1.03 1.03 0 0 0 .296-.703 1.052 1.052 0 0 0-.29-.717.973.973 0 0 0-.69-.301.959.959 0 0 0-.676.307c-.178.19-.277.446-.276.711.002.262.103.513.281.698.178.185.419.29.671.292ZM125.909 8.667h2.363v.195c-.131.024-.257.07-.375.135-.216.105-.648.614-.979 1.468-.562 1.483-1.152 3.235-1.772 5.242l-.23.762c-.102.344-.188.569-.231.704-.043.136-.101.344-.202.599-.057.19-.13.376-.219.554-.116.224-.332.685-.505.824-.274.24-.677.509-1.181.464-.98 0-1.714-.761-1.729-1.662 0-.614.375-1.019.937-1.019.403 0 .763.229.763.704 0 .345-.331.704-.331.884 0 .464.259.685.764.685.402 0 .732-.27.979-.809.331-.614.36-1.288.086-2.037l-2.074-5.706c-.476-1.318-.836-1.751-1.282-1.798v-.195h3.27v.195c-.389.045-.591.285-.591.719 0 .314.115.794.331 1.408l.389 1.108c.447 1.199.806 2.247.995 2.906a81.428 81.428 0 0 1 1.181-3.61c.274-.778.403-1.332.403-1.662 0-.584-.302-.854-.763-.854l.003-.204ZM103.166 15.963c-.418-.076-.778-.465-.778-1.288v-9.93l-2.377.538v.21c.404-.045.806.33.806 1.123v8.059c0 .778-.404 1.227-.806 1.288a1.221 1.221 0 0 1-.715-.096c-.319-.145-.585-.403-.81-.788l-1.1-1.828a2.043 2.043 0 0 0-.981-.846 1.95 1.95 0 0 0-1.274-.067l1.24-1.423c.935-1.078 1.8-1.767 2.62-2.052v-.195h-2.725v.195c.706.285.663.914-.146 1.903l-1.743 2.112V4.744L92 5.284v.21c.403 0 .805.418.805 1.152v8.029c0 .883-.388 1.227-.805 1.288v.195h3.158v-.195c-.519-.076-.778-.494-.778-1.288v-1.483l.677-.779 1.638 2.8c.39.675.75.945 1.326.945h5.485v-.153s-.157-.011-.34-.042ZM109.707 15.014v-3.35c-.032-2.19-.915-3.188-2.938-3.188a2.808 2.808 0 0 0-1.786.63c-.533.419-.792.898-.792 1.453 0 .539.288.943.763.943.505 0 .865-.3.865-.719 0-.314-.202-.749-.202-1.048 0-.54.389-1.004 1.066-1.004.865 0 1.484.674 1.484 2.172v.898l-.72.18a10.01 10.01 0 0 0-.937.228c-.245.076-.561.18-.936.33-.75.3-1.152.584-1.499 1.123a1.62 1.62 0 0 0-.259.884c0 1.242.836 1.812 2.003 1.812.922 0 1.904-.51 2.348-1.468.006.302.076.6.204.871.488 1.028 2.106.42 2.106.42v-.195c-.708.115-.767-.76-.77-.972Zm-1.538-1.037c0 .494-.173.899-.519 1.183-.331.285-.676.435-1.037.435-.706 0-1.167-.48-1.167-1.364 0-.418.22-.808.404-1.033.145-.155.316-.282.504-.374.245-.135.366-.204.533-.285l.659-.254c.331-.135.533-.21.619-.255l.004 1.947ZM140 8.668h-5.603V4.744H140l-1.176 1.962L140 8.668ZM128.61 15.203a4.018 4.018 0 0 1-1.068-2.79 4.01 4.01 0 0 1 .266-1.5c.183-.476.456-.91.802-1.276.707-.78 1.572-1.17 2.583-1.17.995 0 1.861.39 2.568 1.17.351.363.627.796.813 1.273.186.477.278.988.269 1.503a4.04 4.04 0 0 1-.27 1.508 3.9 3.9 0 0 1-.812 1.282c-.707.761-1.573 1.155-2.568 1.155-1.011 0-1.876-.39-2.583-1.155Zm3.881-5.441c-.285-.58-.659-.92-1.098-1.01-.892-.187-1.679.765-1.973 2.28a7.466 7.466 0 0 0-.09 2.062c.064.689.248 1.36.543 1.98.286.58.659.918 1.099 1.01.891.186 1.701-.806 1.997-2.336.246-1.278.121-2.835-.482-3.987h.004Z",
                fill: "#fff",
              })),
            h ||
              (h = r.createElement("path", {
                d: "M120.085 14.675V8.67h-5.071v.18c.678.105 1 .637.692 1.499-1.584 4.478-1.483 4.277-1.584 4.636-.101-.345-.332-1.192-.706-2.255-.374-1.063-.62-1.768-.721-2.082-.389-1.243-.259-1.708.375-1.782V8.67h-3.285v.195c.49.105.922.689 1.282 1.737l.505 1.363c.554 1.472 1.205 3.502 1.423 4.194h1.092c.351-1.066 1.761-5.32 1.95-5.752.204-.492.435-.866.692-1.124.125-.139.276-.248.445-.322a1.24 1.24 0 0 1 .532-.102s.792 0 .792.794v5.022c0 .838-.389 1.228-.792 1.288v.195h3.14v-.195c-.415-.06-.761-.449-.761-1.288Z",
                fill: "#fff",
              }))
          );
        },
        _ = n(64425);
      const O = () => null,
        M = () => null;
      var D = ({
          openFormVersion: e,
          designerFunctions: t,
          designerInfo: n,
        }) => {
          const o = (0, k.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            i = (0, k.Z)((e) => e.onsiteState.client.klaviyoCompanyId),
            [r, a] = s().useState(!1),
            l = null == n ? void 0 : n.activeSidebar,
            d = (null == l ? void 0 : l.type) === I.zQ,
            c = {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginTop: "4px",
            },
            m = r || d;
          return s().createElement(
            T.ZC,
            { style: { display: "flex", justifyContent: "center" } },
            o
              ? s().createElement(
                  T.ZC,
                  {
                    style: c,
                    onMouseLeave: () => a(!1),
                    onMouseEnter: () => a(!0),
                    onClick: () => {
                      O(
                        "Created with Klaviyo Experiment | Clicked logo in builder",
                        { companyId: i }
                      ),
                        t && t.setActiveSidebar({ type: I.zQ });
                    },
                  },
                  s().createElement(
                    M,
                    {
                      isSelected: d,
                      closeButton: !1,
                      $margin: { top: 0, bottom: 0, left: 0, right: 0 },
                      shouldWrap: m,
                    },
                    s().createElement(F, null)
                  )
                )
              : s().createElement(
                  "a",
                  {
                    style: c,
                    href: "https://klaviyo.com/features/forms-web-personalization?utm_medium=referral&utm_source=plgform",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: () => {
                      (0, _.M)({
                        metric: Z.tr,
                        formVersionCId: e.formVersionCId,
                        formId: e.formId,
                        companyId: i,
                      });
                    },
                  },
                  s().createElement(F, null)
                )
          );
        },
        A = n(2116),
        z = n.n(A),
        j = n(84001),
        W = n(68254);
      const N = [
          "animatingOut",
          "touchStartHandler",
          "touchMoveHandler",
          "touchEndHandler",
          "dragOffset",
          "useTransition",
          "transitionSpeed",
          "isSwipeToDismissEnabled",
          "formVersionCId",
          "designerInfo",
          "isA11y",
        ],
        B = {
          LEFT: "slideinleft",
          TOP_CENTER: "slideinup",
          BOTTOM_CENTER: "slideindown",
          RIGHT: "slideinright",
        },
        R = { POPUP: "fadeinup", FULLSCREEN: "fadein" },
        H = ({
          formType: e,
          formTypeDirection: t,
          teaserAnimationExists: n = !1,
          animatingOut: o = !1,
          isDesignWorkflow: i,
          isA11y: r,
        }) => {
          const s = o || (!o && n) ? "both" : "forwards",
            a =
              e === u.DV || e === u.UW
                ? R[e]
                : B[Object.keys(B).find((e) => t && t.endsWith(e))];
          return Object.assign(
            {},
            j.s,
            { animationFillMode: s },
            i ? {} : { animationDelay: !o && n ? "0.25s" : "0s" },
            { animationName: `klaviyo-${a}` },
            o
              ? {
                  animationDirection: "reverse",
                  animationDuration: e === u.DV || e === u.UW ? "0.35s" : ".5s",
                }
              : {
                  animationDirection: "normal",
                  animationDuration: e === u.DV || e === u.UW ? "0.35s" : "1s",
                },
            r ? { animationDelay: "0s", animationDuration: "0s" } : {}
          );
        },
        P = ({ formTypeDirection: e, modalScale: t }) => {
          const n = {
              TOP: { top: 0 },
              CENTER: {
                top: "50%",
                transform: `scale(${t}) translateY(-50%)`,
                marginTop: "auto",
                marginBottom: "auto",
              },
              BOTTOM: { bottom: 0 },
            },
            o = {
              LEFT: { left: 0 },
              CENTER: {
                left: "50%",
                transform: `scale(${t}) translateX(-50%)`,
                marginLeft: "auto",
                marginRight: "auto",
              },
              RIGHT: { right: 0 },
            };
          return Object.assign(
            {},
            n[Object.keys(n).find((t) => e && e.startsWith(t))],
            o[Object.keys(o).find((t) => e && e.endsWith(t))]
          );
        },
        L = (e) => {
          let {
              animatingOut: t = !1,
              touchStartHandler: n,
              touchMoveHandler: o,
              touchEndHandler: a,
              dragOffset: l = 0,
              useTransition: c = !1,
              transitionSpeed: m = 0.5,
              isSwipeToDismissEnabled: f = !1,
              formVersionCId: p,
              designerInfo: h,
              isA11y: g,
            } = e,
            v = z()(e, N);
          const b = (0, k.Z)((e) => {
              var t;
              return null == (t = e.onsiteState.openFormVersions[p])
                ? void 0
                : t.teaserAnimationInProgress;
            }),
            S = (0, k.Z)((e) => {
              var t;
              return null == (t = e.onsiteState.openFormVersions[p])
                ? void 0
                : t.formAnimationInProgress;
            }),
            x = (0, k.Z)((e) => {
              var t;
              return null == (t = e.onsiteState.openFormVersions[p])
                ? void 0
                : t.formVersionId;
            }),
            C = (0, k.Z)((e) => {
              var t;
              return null == (t = e.onsiteState.openFormVersions[p])
                ? void 0
                : t.currentViewId;
            }),
            w = (0, k.Z)((e) => {
              var t;
              return x
                ? null == (t = e.formsState.formVersions[x])
                  ? void 0
                  : t.formType
                : void 0;
            }),
            E = (0, k.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            $ = (0, k.Z)((e) => {
              const t = x ? e.formsState.formVersions[x] : void 0;
              if (t)
                return y(
                  t,
                  E
                    ? (null == h ? void 0 : h.mobileDesktopType) === I.Jq
                    : (0, d.Z)()
                ).evaluatedFormTypeDirection;
            }),
            [Z, V] = (0, r.useState)(!1);
          b && !Z && V(!0);
          const F = (0, r.useMemo)(
            () => (E ? `${I.Sq}:${I.Pg}:${C}` : void 0),
            [E, C]
          );
          return s().createElement(
            T.ZC,
            i()({ a11yIdentifier: F }, v, {
              onAnimationEnd: () => {
                (0, W.fK)({ id: p, changes: { formAnimationInProgress: !1 } }),
                  (0, W.sd)({ formVersionCId: p });
              },
              onTouchStart: (e) => {
                n && n(e);
              },
              onTouchMove: (e) => {
                o && o(e);
              },
              onTouchEnd: (e) => {
                a && a(e);
              },
              onAnimationStart: () => {
                (0, W.fK)({ id: p, changes: { hideFormBeforeAnimation: !1 } });
              },
              style: Object.assign(
                { flex: 1, minHeight: w === u.UW ? "100%" : void 0 },
                f
                  ? Object.assign(
                      { bottom: -1 * l + "px", position: "relative" },
                      c ? { transition: `bottom ${m}s` } : {}
                    )
                  : {},
                ((S || E || t) &&
                  H({
                    formType: w,
                    formTypeDirection: $,
                    teaserAnimationExists: Z,
                    animatingOut: t,
                    isDesignWorkflow: E,
                    isA11y: g,
                  })) ||
                  {}
              ),
            })
          );
        };
      var q = n(52470),
        K = n(72506),
        U = n(39833),
        G = n(75584);
      let Y,
        X,
        J = (e) => e;
      const Q = (e) =>
        !!e.id.includes("downshift") ||
        (!("FORM" === e.tagName || !e.parentElement) && Q(e.parentElement));
      var ee = ({
        closePortal: e,
        formVersionCId: t,
        style: n,
        setOverlayDismissalPercentage: o,
        designerFunctions: c,
        designerInfo: m,
        isA11y: f = !1,
        a11yViewId: p,
        className: h,
      }) => {
        var g, v, S, x, Z, V, F, _, O;
        const M = (0, k.Z)((e) => e.onsiteState.openFormVersions[t], l.X),
          A = (0, k.Z)((e) => {
            var n;
            return null == (n = e.onsiteState.openFormVersions[t])
              ? void 0
              : n.modalIsClosing;
          }),
          z = (0, k.Z)((e) => {
            var n;
            return null == (n = e.onsiteState.openFormVersions[t])
              ? void 0
              : n.closePortal;
          }),
          j = (0, k.Z)(
            (e) => (M ? e.formsState.formVersions[M.formVersionId] : void 0),
            l.X
          ),
          N = (0, k.Z)((e) => {
            var t, n;
            return M
              ? null == (t = e.formsState.formVersions[M.formVersionId]) ||
                null == (n = t.data)
                ? void 0
                : n.ignoreOverlayDismissal
              : void 0;
          }),
          B = (0, k.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          R = (0, k.Z)((e) => e.onsiteState.client.showingShopLogin),
          H = (0, k.Z)((e) => {
            const t = M ? e.formsState.forms[M.formId] : void 0;
            return (
              !!t &&
              t.showKlaviyoBranding &&
              (null == j ? void 0 : j.formType) === u.DV
            );
          }),
          P = (0, k.Z)((e) => (0, U.FK)(e)),
          ee = (0, k.Z)((e) => {
            var n;
            return f && p
              ? p
              : null == (n = e.onsiteState.openFormVersions[t])
              ? void 0
              : n.currentViewId;
          }),
          te = (0, k.Z)((e) =>
            ee
              ? (0, G.nC)(e, ee, (0, q.Z)()).filter(
                  (e) => "TEXT" === (null == e ? void 0 : e.componentType)
                )
              : []
          ),
          ne = (0, r.useMemo)(
            () =>
              te
                .map((e) => `rich-text-${null == e ? void 0 : e.componentId}`)
                .join(" "),
            [te]
          ),
          oe = null == j || null == (g = j.data) ? void 0 : g.styling,
          ie =
            null == j || null == (v = j.data) || null == (S = v.styling)
              ? void 0
              : S.borderRadius,
          re =
            null == j || null == (x = j.data) || null == (Z = x.styling)
              ? void 0
              : Z.dropShadow,
          se = null == m ? void 0 : m.mobileDesktopType,
          {
            isDocked: ae,
            evaluatedFormTypeDirection: le,
            dockedDirection: de,
          } = j
            ? y(j, B ? se === I.Jq : (0, d.Z)())
            : {
                isDocked: void 0,
                evaluatedFormTypeDirection: void 0,
                dockedDirection: void 0,
              },
          [ce, me] = (0, r.useState)(),
          ue = (0, r.useRef)(null);
        (0, r.useEffect)(() => {
          me((0, C.Z)("modal_animation_key"));
        }, [
          null == j ? void 0 : j.formType,
          null == j ? void 0 : j.formTypeDirection,
          se,
        ]);
        const fe = () => {
            (0, W.et)({ formVersionCId: t });
          },
          [pe, he] = (0, r.useState)(0),
          [ye, ge] = (0, r.useState)(0),
          [ve, be] = (0, r.useState)(!1),
          [Ie, Se] = (0, r.useState)(0.5),
          [xe, Ce] = (0, r.useState)(new Date()),
          we = (e, t = !1) => {
            o && o(e, t);
          };
        (0, r.useEffect)(() => {
          (!z &&
            (null == M ||
              !M.modalIsClosing ||
              (null != M && M.formAnimationInProgress) ||
              !M.closeModalWhenAnimationCompletes) &&
            ((null != M && M.modalIsClosing) ||
              (null != M && M.teaserAnimationInProgress) ||
              null == M ||
              !M.closeModalWhenAnimationCompletes ||
              M.currentTeaserId)) ||
            e();
        }, [z, M]),
          (0, r.useEffect)(() => {
            const n = (n) => {
              var o, i, r, s;
              (null != (o = ue.current) && o.contains(n.target)) ||
                B ||
                t !== P ||
                null === e ||
                (null != M && M.currentTeaserId) ||
                ((i = null == j ? void 0 : j.formType),
                (r = N),
                (s = R),
                !i ||
                  s === K.K.SHOWING ||
                  (void 0 !== r &&
                    i === u.DV &&
                    ((0, d.Z)()
                      ? !0 === (null == r ? void 0 : r.mobile)
                      : !0 === (null == r ? void 0 : r.desktop)))) ||
                fe();
            };
            return (
              document.addEventListener("mousedown", n),
              document.addEventListener("touchstart", n),
              () => {
                document.removeEventListener("mousedown", n),
                  document.removeEventListener("touchstart", n);
              }
            );
          }, [B, t, P, e, N, M, R]);
        const Ee =
            null == j || null == (V = j.data) || null == (F = V.styling)
              ? void 0
              : F.margin,
          $e = (0, r.useMemo)(
            () => (B ? `${I.Sq}:${I.Pg}:${ee}` : void 0),
            [B, ee]
          ),
          ke = !B && ae,
          Te = (0, a.iv)(
            X ||
              (X = J`
    &&& {
      &::before {
        content: '';
        height: 100%;
        background-color: ${0};
        top: ${0};
        width: 100%;
        position: absolute;
      }
    }
  `),
            (null == oe ? void 0 : oe.backgroundColor) ||
              b.Z.theme.backgroundColor,
            de === u.qK ? "50%" : "-50%"
          );
        return ce
          ? s().createElement(
              T.ZC,
              {
                "aria-describedby": ne,
                a11yIdentifier: $e,
                ref: ue,
                role: "dialog",
                "aria-label": `${null == j ? void 0 : j.formType} Form`,
                "aria-modal": "true",
                "aria-live": "assertive",
                style: Object.assign(
                  {},
                  n,
                  {
                    borderRadius: `${ie || b.Z.theme.borderRadius}px`,
                    position: "relative",
                    outline: 0,
                    display: "flex",
                    justifyContent: "center",
                    flex: "0 0 auto",
                  },
                  (null == j ? void 0 : j.formType) === u.DV
                    ? { alignSelf: "center" }
                    : {},
                  (null == j ? void 0 : j.formType) === u.UW
                    ? { alignSelf: "stretch", flex: 1 }
                    : {},
                  f ? { position: "absolute", zIndex: 1 } : {}
                ),
                "data-testid": se,
                className: h,
              },
              s().createElement(
                r.Suspense,
                { fallback: s().createElement(T.ZC, null) },
                s().createElement(
                  L,
                  i()(
                    {
                      key: ce,
                      formVersionCId: t,
                      animatingOut: A,
                      "data-testid": null == j ? void 0 : j.formType,
                      isSwipeToDismissEnabled: ke,
                    },
                    ke
                      ? {
                          touchStartHandler: (e) => {
                            Q(e.target) ||
                              (Se(0.5),
                              be(!1),
                              ge(e.touches[0].clientY),
                              Ce(new Date()));
                          },
                          touchMoveHandler: (e) => {
                            if (Q(e.target)) return;
                            e.preventDefault();
                            const t = Math.abs(e.touches[0].clientY - ye);
                            if (de === u.qK)
                              if (ye <= e.touches[0].clientY) {
                                const e = window.innerHeight - ye;
                                we(t / e), he(t);
                              } else {
                                const e = 0.8 * window.innerHeight;
                                if ((Se(0.1), t < e)) {
                                  he((-1 * t) / (10 / 2 ** ((-1 * t) / e)));
                                }
                              }
                            else if (ye >= e.touches[0].clientY) {
                              we(t / ye), he(-1 * t);
                            } else {
                              const e = 0.8 * window.innerHeight;
                              if (t < e) {
                                he(t / (10 / 2 ** ((-1 * t) / e)));
                              }
                            }
                          },
                          touchEndHandler: (e) => {
                            if (Q(e.target)) return;
                            be(!0);
                            const t = new Date().getTime() - xe.getTime(),
                              n = Math.abs(e.changedTouches[0].clientY - ye),
                              o = n / t,
                              i =
                                de === u.qK
                                  ? e.changedTouches[0].clientY > ye
                                  : e.changedTouches[0].clientY < ye,
                              r = de === u.qK ? 0.9 : 0.1;
                            ((de === u.qK
                              ? e.changedTouches[0].clientY /
                                  window.innerHeight >
                                r
                              : e.changedTouches[0].clientY /
                                  window.innerHeight <
                                r) &&
                              n > 0.2 * window.innerHeight) ||
                            (Math.abs(o) > 0.8 &&
                              i &&
                              n >= 0.2 * window.innerHeight)
                              ? (he(
                                  de === u.qK
                                    ? window.innerHeight
                                    : -1 * window.innerHeight
                                ),
                                we(1, !0),
                                setTimeout(() => fe(), 500))
                              : (he(0), we(0, !0)),
                              ge(0);
                          },
                          dragOffset: pe,
                          useTransition: ve,
                          transitionSpeed: Ie,
                        }
                      : {},
                    { designerInfo: m, isA11y: f }
                  ),
                  ((Ze = s().createElement(
                    T.ZC,
                    {
                      a11yIdentifier: $e,
                      className: !B && ae ? Te : "",
                      style:
                        (null == j ? void 0 : j.formType) === u.UW
                          ? { display: "flex", flex: 1, alignSelf: "stretch" }
                          : void 0,
                    },
                    s().createElement(
                      T.ZC,
                      {
                        inert:
                          !(!(0, d.Z)() || null == M || !M.currentTeaserId) ||
                          void 0,
                        a11yIdentifier: $e,
                        style: Object.assign(
                          { position: "relative", display: "flex" },
                          { flex: 1, alignSelf: "stretch" },
                          re && re.enabled
                            ? { boxShadow: `0px 0px ${re.blur}px ${re.color}` }
                            : {},
                          ie ? { borderRadius: `${ie}px` } : {}
                        ),
                      },
                      s().createElement($.Z, {
                        buttonStyling:
                          null == j ||
                          null == (_ = j.data) ||
                          null == (O = _.styling)
                            ? void 0
                            : O.dismissButtonStyles,
                        title: `Close dialog ${t}`,
                        onClick: fe,
                        designerFunctions: c,
                        designerInfo: m,
                      }),
                      (null != M && M.errorViewMessage) ||
                        null == M ||
                        !M.formVersionId ||
                        !ee
                        ? s().createElement(E.Z, {
                            errorViewMessage:
                              null == M ? void 0 : M.errorViewMessage,
                            isFullscreen:
                              (null == j ? void 0 : j.formType) === u.UW,
                          })
                        : s().createElement(w.Z, {
                            formVersionCId: t,
                            formVersionId: null == M ? void 0 : M.formVersionId,
                            viewId: ee,
                            isDocked: ae,
                            formTypeDirection: le,
                            designerFunctions: c,
                            designerInfo: m,
                          })
                    ),
                    H &&
                      !!M &&
                      s().createElement(D, {
                        openFormVersion: M,
                        designerFunctions: c,
                        designerInfo: m,
                      })
                  )),
                  ae
                    ? Ze
                    : s().createElement(
                        T.ZC,
                        {
                          a11yIdentifier: $e,
                          className: (0, a.iv)(
                            Y ||
                              (Y = J`
            &&& {
              &::before {
                content: '';
                display: block;
                min-height: ${0}px;
                width: 100%;
              }
              &::after {
                content: '';
                display: block;
                min-height: ${0}px;
                width: 100%;
              }
            }
          `),
                            (null == Ee ? void 0 : Ee.top) || 0,
                            (null == Ee ? void 0 : Ee.bottom) || 0
                          ),
                          style: {
                            position: "relative",
                            flexDirection: "column",
                            display: "flex",
                            marginLeft: null == Ee ? void 0 : Ee.left,
                            marginRight: null == Ee ? void 0 : Ee.right,
                            flex: 1,
                            alignSelf: "stretch",
                            minHeight:
                              (null == j ? void 0 : j.formType) === u.UW
                                ? "100%"
                                : void 0,
                          },
                        },
                        Ze
                      ))
                )
              )
            )
          : null;
        var Ze;
      };
      let te,
        ne,
        oe = (e) => e;
      var ie = ({
        formVersionCId: e,
        closePortal: t,
        className: n,
        designerFunctions: o,
        designerInfo: m,
        isA11y: f = !1,
        a11yViewId: p,
      }) => {
        var h, C, w, E;
        const $ = (0, k.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          Z = (0, k.Z)((t) => {
            var n;
            return f && p
              ? p
              : null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.currentViewId;
          }),
          V = (0, k.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.currentTeaserId;
          }),
          F = (0, k.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.formVersionId;
          }),
          _ = (0, k.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.teaserAnimationInProgress;
          }),
          O = (0, k.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.formAnimationInProgress;
          }),
          M = (0, k.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.closeModalWhenAnimationCompletes;
          }),
          D = (0, k.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.hideFormBeforeAnimation;
          }),
          A = (0, k.Z)((e) => (F ? e.formsState.formVersions[F] : void 0), l.X);
        let z = (0, k.Z)((e) => {
          var t, n, o;
          return (
            (F
              ? null == (t = e.formsState.formVersions[F]) ||
                null == (n = t.data) ||
                null == (o = n.styling)
                ? void 0
                : o.size
              : void 0) || b.Z.theme.size
          );
        });
        const j = (0, k.Z)((e) => {
            var t, n;
            return F
              ? null == (t = e.formsState.formVersions[F]) ||
                null == (n = t.data)
                ? void 0
                : n.sideImage
              : void 0;
          }, l.X),
          N = (0, k.Z)((e) => {
            var t, n, o;
            return (
              (F
                ? null == (t = e.formsState.formVersions[F]) ||
                  null == (n = t.data) ||
                  null == (o = n.styling)
                  ? void 0
                  : o.overlayColor
                : void 0) || b.Z.theme.overlayColor
            );
          }),
          B = (0, k.Z)((e) => {
            var t, n, o;
            return (
              (F
                ? null == (t = e.formsState.formVersions[F]) ||
                  null == (n = t.data) ||
                  null == (o = n.styling)
                  ? void 0
                  : o.mobileOverlay
                : void 0) || b.Z.theme.mobileOverlay
            );
          }, l.X),
          R = (0, k.Z)((e) => e.onsiteState.client.isFetchingForms),
          H = (0, k.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.modalIsClosing;
          }),
          L = (0, k.Z)(
            (e) =>
              Object.values(e.formsState.columns).find(
                (e) =>
                  (null == e ? void 0 : e.position) ===
                    (null == j ? void 0 : j.position) &&
                  (null == e ? void 0 : e.viewId) === Z
              ),
            l.X
          ),
          q = (0, r.useRef)(null),
          [K, G] = (0, r.useState)(0),
          [Y, X] = (0, r.useState)(!1),
          [J, Q] = (0, r.useState)("none"),
          ie =
            null == j || null == (h = j.data) || null == (C = h.styling)
              ? void 0
              : C.sizeMultiplier,
          re = ie ? (0, g.Z)(ie, z) : 0,
          se = null == m ? void 0 : m.mobileDesktopType,
          ae = $ && se === I.Jq,
          { isDocked: le, evaluatedFormTypeDirection: de } = A
            ? y(A, $ ? se === I.Jq : (0, d.Z)())
            : { isDocked: void 0, evaluatedFormTypeDirection: void 0 };
        ((0, d.Z)() || ae) && j && !(0, v.V)(j, $, se || I.q5, L) && (z -= re);
        const ce =
            null == A || null == (w = A.data) || null == (E = w.styling)
              ? void 0
              : E.margin,
          me = le ? 0 : (null == ce ? void 0 : ce.left) || 0,
          ue = le ? 0 : (null == ce ? void 0 : ce.right) || 0,
          fe =
            Math.max(Math.min(parseInt(z.toString(), 10), S.Ez), S.Gg) +
            ue +
            me,
          [pe, he] = (0, r.useState)(1),
          ye = (0, a.iv)(
            te ||
              (te = oe`
    &&& {
      [data-testid='form-row'] {
        margin-bottom: calc((${0} - 1) * 1%);
      }
    }
  `),
            pe
          ),
          ge = (0, r.useMemo)(() => ($ ? ye : void 0), [ye, $]),
          [ve, be] = (0, r.useState)(!1);
        _ && !ve && be(!0);
        const Ie = Object.assign(
            {
              animationTimingFunction: "ease",
              animationPlayState: "running",
              animationIterationCount: 1,
              animationFillMode: !H && ve ? "both" : "forwards",
            },
            f
              ? { animationDelay: "0s", animationDuration: "0s" }
              : {
                  animationDelay: H || !ve || $ ? "0s" : "0.25s",
                  animationDuration: "0.35s",
                }
          ),
          Se = Object.assign({}, Ie, { animationName: "klaviyo-fadeout" }),
          xe = Object.assign({}, Ie, { animationName: "klaviyo-fadein" });
        (0, r.useEffect)(() => {
          const e = () => {
            if ((null == A ? void 0 : A.formType) !== u.UW) {
              var e, t;
              const n =
                  (null == (e = document) || null == (t = e.documentElement)
                    ? void 0
                    : t.clientWidth) || window.innerWidth,
                o = ae ? I.aH : n,
                i = le ? o / fe : Math.min(o / fe, 1);
              he(i);
            }
          };
          return (
            window.addEventListener("resize", e),
            e(),
            () => {
              window.removeEventListener("resize", e);
            }
          );
        }, [fe, se]);
        const Ce = (0, k.Z)((t) => (0, U.JZ)(t, e));
        ((e, t, n, o, i, s) => {
          (0, r.useEffect)(() => {
            let o;
            if (!t && (s === u.DV || s === u.UW) && n) {
              const t =
                null == e
                  ? void 0
                  : e.querySelectorAll('[tabindex]:not([tabindex="-1"])');
              e &&
                c(e) &&
                t &&
                (t.length > 1 ? t[1].focus() : t.length && t[0].focus()),
                (o =
                  null == e
                    ? void 0
                    : e.addEventListener("keydown", (t) => {
                        if ("Tab" !== t.key && 9 !== t.keyCode) return;
                        const n = e.querySelectorAll(
                            '[tabindex]:not([tabindex="-1"])'
                          ),
                          o = n[0],
                          i = n[n.length - 1];
                        o !== i &&
                          (t.shiftKey
                            ? document.activeElement === o &&
                              (i.focus(), t.preventDefault())
                            : document.activeElement === i &&
                              (o.focus(), t.preventDefault()));
                      }));
            }
            return () =>
              o
                ? null == e
                  ? void 0
                  : e.removeEventListener("keydown", o)
                : void 0;
          }, [e, t, s, n, o, i]);
        })(q.current, $, Ce, !!_, Z, null == A ? void 0 : A.formType);
        let we = Object.assign(
          { display: J, zIndex: $ ? 0 : x.B },
          D ? { opacity: 0 } : {}
        );
        var Ee, $e;
        we =
          se === I.Jq && $
            ? Object.assign({}, we, {
                position: "relative",
                justifyContent: "center",
                alignItems:
                  ((Ee = null == A ? void 0 : A.formType),
                  ($e = de),
                  Ee === u.nq && $e
                    ? $e.startsWith("BOTTOM")
                      ? "flex-end"
                      : $e.startsWith("CENTER")
                      ? "center"
                      : "flex-start"
                    : "center"),
                backgroundColor:
                  (null == A ? void 0 : A.formType) === u.nq
                    ? ((null == B ? void 0 : B.enabled) &&
                        (null == B ? void 0 : B.color)) ||
                      "transparent"
                    : N,
                alignSelf: "center",
                height: "100%",
                width: "100%",
                overflowY: "auto",
              })
            : (null == A ? void 0 : A.formType) === u.nq
            ? Object.assign(
                {},
                we,
                Object.assign(
                  {
                    maxHeight: $ ? "100%" : 100 / pe + "%",
                    position: $ ? "absolute" : "fixed",
                    transform: `scale(${pe})`,
                    transformOrigin: `${
                      de && de.endsWith("RIGHT") ? "right" : "left"
                    } ${de && de.startsWith("BOTTOM") ? "bottom" : "top"}`,
                    overflow: $ ? "initial" : "visible",
                  },
                  P({ formTypeDirection: de, modalScale: pe })
                )
              )
            : Object.assign(
                {},
                we,
                {
                  position: $ ? "initial" : "fixed",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: $ ? "flex-start" : "center",
                  overflow: "auto",
                  backgroundColor: N,
                },
                H ? Se : xe
              );
        let ke = {};
        se === I.Jq && $
          ? (ke = Object.assign(
              {
                position: "absolute",
                transform: `scale(${pe})`,
                transformOrigin:
                  (null == A ? void 0 : A.formType) === u.nq && de
                    ? "" + (de.startsWith("BOTTOM") ? "bottom" : "top")
                    : "center",
                maxHeight: 100 / pe + "%",
              },
              (null == A ? void 0 : A.formType) !== u.nq || le || 1 !== pe
                ? {}
                : P({ formTypeDirection: de, modalScale: pe })
            ))
          : ((null == A ? void 0 : A.formType) !== u.DV &&
              (null == A ? void 0 : A.formType) !== u.UW) ||
            (ke = {
              overflow: $ ? "initial" : "visible",
              transform: `scale(${pe})`,
              transformOrigin: "center",
              maxHeight: $ ? "100%" : 100 / pe + "%",
            });
        const Te = null == B ? void 0 : B.enabled,
          Ze = (0, a.iv)(
            ne ||
              (ne = oe`
    &&& {
      &::before {
        content: '';
        background-color: ${0};
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        z-index: ${0};
        ${0};
        opacity: ${0};
      }
    }
  `),
            (null == B ? void 0 : B.color) || b.Z.theme.mobileOverlay.color,
            x.B,
            Y ? "transition: opacity .5s ease;" : "",
            K ? 1 - K : 1
          ),
          Ve = (0, r.useMemo)(
            () => ($ ? `${I.Pg}:${I.Pg}:${Z}` : void 0),
            [$, Z]
          );
        return (
          (0, r.useEffect)(() => {
            !V || _ || O
              ? Q(!V && _ && M ? "none" : "flex")
              : (!$ &&
                  H &&
                  (0, W.fK)({
                    id: e,
                    changes: { modalIsClosing: !1, modalWasDismissed: !0 },
                  }),
                Q("none"));
          }, [V, _, O, H]),
          (Fe =
            (null == A ? void 0 : A.formType) === u.nq &&
            (0, d.Z)() &&
            (null == B ? void 0 : B.enabled) &&
            "none" !== we.display),
          (_e = s().createElement(
            T.ZC,
            {
              a11yIdentifier: Ve,
              className: n || "",
              style: Object.assign(
                {},
                we,
                f
                  ? {
                      position: "absolute",
                      transform: "scale(0.001)",
                      zIndex: 1,
                    }
                  : {}
              ),
              ref: q,
            },
            R
              ? s().createElement(T.P, null, "Loading...")
              : s().createElement(
                  ee,
                  i()(
                    {
                      closePortal: t,
                      formVersionCId: e,
                      style: ke,
                      designerFunctions: o,
                      designerInfo: m,
                    },
                    Te
                      ? {
                          setOverlayDismissalPercentage: (e, t = !1) => {
                            G(e), X(t);
                          },
                        }
                      : {},
                    { isA11y: f, a11yViewId: p, className: ge }
                  )
                )
          )),
          $
            ? _e
            : s().createElement(
                T.ZC,
                {
                  style: Object.assign(
                    {},
                    f
                      ? {
                          position: "absolute",
                          transform: "scale(0.001)",
                          zIndex: 1,
                        }
                      : {}
                  ),
                  a11yIdentifier: Ve,
                },
                s().createElement(T.ZC, {
                  a11yIdentifier: Ve,
                  className: Ze,
                  style:
                    Te && Fe
                      ? Object.assign({}, H ? Se : xe)
                      : { display: "none" },
                }),
                _e
              )
        );
        var Fe, _e;
      };
    },
    74196: function (e, t, n) {
      n.d(t, {
        n: function () {
          return u;
        },
      });
      var o = n(93885),
        i = n.n(o),
        r = n(2116),
        s = n.n(r),
        a = n(76223),
        l = n.n(a),
        d = n(33511);
      const c = ["a11yIdentifier"],
        m = l().lazy(() => n.e(4077).then(n.t.bind(n, 84420, 23))),
        u = (e) => {
          let { a11yIdentifier: t } = e,
            n = s()(e, c);
          return l().createElement(
            a.Suspense,
            { fallback: l().createElement("div", null) },
            l().createElement(
              m,
              i()({}, n, {
                "data-a11y-identifier": t,
                className: `needsclick ${n.className} ${d.Tc}`,
              })
            )
          );
        };
    },
    46138: function (e, t, n) {
      n.d(t, {
        CI: function () {
          return _;
        },
        Dr: function () {
          return T;
        },
        Ei: function () {
          return k;
        },
        II: function () {
          return V;
        },
        P: function () {
          return $;
        },
        ZC: function () {
          return C;
        },
        __: function () {
          return O;
        },
        aG: function () {
          return F;
        },
        l0: function () {
          return w;
        },
        ny: function () {
          return Z;
        },
        zx: function () {
          return E;
        },
      });
      var o = n(93885),
        i = n.n(o),
        r = n(2116),
        s = n.n(r),
        a = n(76223),
        l = n.n(a),
        d = n(33511);
      n(56544);
      const c = ["a11yIdentifier"],
        m = ["a11yIdentifier"],
        u = ["a11yIdentifier"],
        f = ["a11yIdentifier"],
        p = ["a11yIdentifier"],
        h = ["a11yIdentifier"],
        y = ["a11yIdentifier"],
        g = ["a11yIdentifier"],
        v = ["a11yIdentifier"],
        b = ["tabIndex", "className", "alt", "a11yIdentifier"],
        I = [
          "tabIndex",
          "className",
          "style",
          "alt",
          "onClick",
          "a11yIdentifier",
          "aria-label",
          "children",
        ],
        S = ["a11yIdentifier"],
        x = ({ children: e }) => e,
        C = l().forwardRef((e, t) => {
          let { a11yIdentifier: n } = e,
            o = s()(e, c);
          return l().createElement(
            "div",
            i()({ ref: t }, o, {
              "data-a11y-identifier": n,
              className: `needsclick ${o.className || ""} ${d.Tc}`,
            })
          );
        });
      C.displayName = "Div";
      const w = l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, m);
        return l().createElement(
          "form",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          })
        );
      });
      w.displayName = "Form";
      const E = l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, u);
        return l().createElement(
          "button",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          }),
          o.children
        );
      });
      E.displayName = "Button";
      const $ = l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, f);
        return l().createElement(
          "p",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          })
        );
      });
      $.displayName = "P";
      l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, p);
        return l().createElement(
          "a",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          })
        );
      }).displayName = "A";
      const k = l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, h);
        return l().createElement(
          "img",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          })
        );
      });
      k.displayName = "Img";
      const T = l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, y);
        return l().createElement(
          "span",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          })
        );
      });
      T.displayName = "Span";
      const Z = l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, g);
        return l().createElement(
          "svg",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          })
        );
      });
      Z.displayName = "Svg";
      const V = l().forwardRef((e, t) => {
        let { a11yIdentifier: n } = e,
          o = s()(e, v);
        return l().createElement(
          "input",
          i()({ ref: t }, o, {
            "data-a11y-identifier": n,
            className: `needsclick ${o.className || ""} ${d.Tc}`,
          })
        );
      });
      V.displayName = "Input";
      const F = (e) => {
          let { tabIndex: t, className: n, alt: o, a11yIdentifier: r } = e,
            a = s()(e, b);
          return l().createElement(
            E,
            { type: "button", tabIndex: t, className: n },
            l().createElement(k, i()({ alt: o }, a, { a11yIdentifier: r }))
          );
        },
        _ = (e) => {
          let {
              tabIndex: t,
              className: n,
              style: o,
              onClick: r,
              a11yIdentifier: a,
              "aria-label": d,
              children: c,
            } = e,
            m = s()(e, I);
          return l().createElement(
            E,
            {
              tabIndex: t,
              className: n,
              style: o,
              onClick: r,
              "aria-label": d,
            },
            l().createElement(
              Z,
              i()({ role: "img" }, m, { "data-a11y-identifier": a }),
              a && c
                ? l().createElement(
                    x,
                    { identifier: a },
                    l().createElement(l().Fragment, null, c)
                  )
                : c
            )
          );
        },
        O = l().forwardRef((e, t) => {
          let { a11yIdentifier: n } = e,
            o = s()(e, S);
          return l().createElement(
            "label",
            i()({ ref: t }, o, {
              "data-a11y-identifier": n,
              className: `needsclick ${o.className || ""} ${d.Tc}`,
            })
          );
        });
      O.displayName = "Label";
    },
    53675: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return R;
        },
      });
      var o = n(93885),
        i = n.n(o),
        r = n(76223),
        s = n.n(r),
        a = n(80101),
        l = n(94926),
        d = n(18017),
        c = n(75266),
        m = n(3321),
        u = n(46138),
        f = n(49121),
        p = n(75356),
        h = n(20094);
      var y = ({ formVersionCId: e, designerInfo: t }) => {
          const n = (0, m.Z)((t) => {
              var n, o;
              const i =
                null == (n = t.onsiteState.openFormVersions[e])
                  ? void 0
                  : n.formVersionId;
              return i
                ? null == (o = t.formsState.formVersions[i])
                  ? void 0
                  : o.formType
                : void 0;
            }),
            o = (0, m.Z)((t) => {
              var n, o;
              const i =
                null == (n = t.onsiteState.openFormVersions[e])
                  ? void 0
                  : n.formVersionId;
              return i
                ? null == (o = t.formsState.formVersions[i])
                  ? void 0
                  : o.formTypeDirection
                : void 0;
            }),
            i = (0, m.Z)((t) => {
              var n;
              const o =
                null == (n = t.onsiteState.openFormVersions[e])
                  ? void 0
                  : n.formVersionId;
              return (
                t.formsState.teasers &&
                Object.values(t.formsState.teasers).filter(
                  (e) => (null == e ? void 0 : e.formVersionId) === o
                )[0]
              );
            }, d.X),
            l = (0, m.Z)((e) => e.onsiteState.client.isDesignWorkflow),
            c = null == t ? void 0 : t.mobileDesktopType,
            [y, g] = (0, r.useState)();
          (0, r.useEffect)(() => {
            g((0, a.Z)("modal_animation_key"));
          }, [n, o, c]);
          const v = f.c.TEXT,
            b = (0, r.useMemo)(
              () =>
                l
                  ? `${h.KI}:${h.s4}:${null == i ? void 0 : i.teaserId}`
                  : void 0,
              [l, null == i ? void 0 : i.teaserId]
            );
          return y && i
            ? s().createElement(
                u.ZC,
                { a11yIdentifier: b },
                s().createElement(
                  r.Suspense,
                  { fallback: s().createElement(u.ZC, null) },
                  s().createElement(v, {
                    itemId: i.teaserId,
                    parentType: p.p,
                    formVersionCId: e,
                    a11yIdentifierBlock: b,
                  })
                )
              )
            : null;
        },
        g = n(68254),
        v = n(21185),
        b = n(94482),
        I = n(97214),
        S = n(79885),
        x = n(5397);
      let C;
      const w = 16,
        E = {
          [I.GE]: {
            [S.MG]: {},
            [S.DA]: {},
            [S.pz]: {},
            [S.pq]: {},
            [S.j$]: {},
            [S.kB]: {},
            [S.qS]: {},
            [S.tC]: {},
          },
          [I.uv]: {
            [S.MG]: {},
            [S.DA]: {},
            [S.pz]: {},
            [S.pq]: {},
            [S.j$]: {},
            [S.kB]: {},
            [S.qS]: {},
            [S.tC]: {},
          },
          [I.aR]: {
            [S.MG]: { clipPath: "polygon(100% 0, 0 100%, 0 0)" },
            [S.pz]: { clipPath: "polygon(100% 100%, 0 0, 100% 0)" },
            [S.kB]: { clipPath: "polygon(0 0, 0 100%, 100% 100%)" },
            [S.tC]: { clipPath: "polygon(100% 100%, 0 100%, 100% 0)" },
          },
        },
        $ = ({ type: e, direction: t, dismissButtonMargin: n }) => {
          var o, i;
          const r =
              null != (o = null == n ? void 0 : n.top)
                ? o
                : x.Z.dismissButtonStyles.margin.top,
            s = -1 * r,
            a =
              -1 *
              (null != (i = null == n ? void 0 : n.right)
                ? i
                : x.Z.dismissButtonStyles.margin.right);
          return {
            [I.GE]: {
              [S.MG]: { bottom: s, right: a },
              [S.DA]: { bottom: s, right: a },
              [S.pz]: { bottom: s, left: a },
              [S.pq]: { bottom: s, right: a },
              [S.j$]: { bottom: s, right: a },
              [S.kB]: { top: s, right: a },
              [S.qS]: { top: s, right: a },
              [S.tC]: { top: s, left: a },
            },
            [I.uv]: {
              [S.MG]: { bottom: s, right: a },
              [S.DA]: { bottom: s, right: a },
              [S.pz]: { bottom: s, left: a },
              [S.pq]: { top: s, right: a },
              [S.j$]: { top: s, left: a },
              [S.kB]: { top: s, right: a },
              [S.qS]: { top: s, right: a },
              [S.tC]: { top: s, left: a },
            },
            [I.aR]: {
              [S.MG]: { top: r, right: a },
              [S.pz]: { top: r, left: a },
              [S.kB]: { bottom: r, right: a },
              [S.tC]: { bottom: r, left: a },
            },
          }[e][t];
        },
        k = ({ theme: e, type: t, direction: n }) => {
          const o = Math.sqrt(e.size * e.size * 2) / 2,
            i = Math.sqrt(e.size * e.size - o * o);
          return (
            {
              [I.GE]: { [S.DA]: {}, [S.pq]: {}, [S.j$]: {}, [S.qS]: {} },
              [I.uv]: { [S.pq]: {}, [S.j$]: {} },
              [I.aR]: {
                [S.MG]: {
                  width: Math.sqrt(e.size * e.size * 2),
                  transform: "rotate(-45deg)",
                  transformOrigin: "top left",
                  top: e.size / 2,
                  left: (-1 * e.size) / 2,
                  position: "relative",
                  height: i,
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                },
                [S.pz]: {
                  width: Math.sqrt(e.size * e.size * 2),
                  transform: "rotate(45deg)",
                  transformOrigin: "top left",
                  top: (-1 * e.size) / 2,
                  left: e.size / 2,
                  position: "relative",
                  height: i,
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                },
                [S.kB]: {
                  height: e.size - w,
                  width: Math.sqrt(e.size * e.size * 2),
                  transform: "rotate(45deg)",
                  transformOrigin: "top left",
                },
                [S.tC]: {
                  height: e.size - w,
                  width: Math.sqrt(e.size * e.size * 2),
                  position: "relative",
                  top: e.size,
                  left: 0,
                  transform: "rotate(-45deg)",
                  transformOrigin: "top left",
                },
              },
            }[t][n] || {}
          );
        },
        T = (e, t) => {
          var n;
          return Object.assign(
            { backgroundColor: e.backgroundColor },
            t
              ? {
                  outlineColor: "-webkit-focus-ring-color",
                  outlineStyle: "auto",
                }
              : {},
            e.backgroundImage
              ? {
                  backgroundImage:
                    e.backgroundImage && `url(${e.backgroundImage.url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize:
                    e.backgroundImage &&
                    ("custom" === e.backgroundImage.position
                      ? `${e.backgroundImage.customWidth}px`
                      : e.backgroundImage.position),
                  backgroundPositionX:
                    e.backgroundImage && e.backgroundImage.alignment,
                  backgroundPositionY:
                    (null == (n = e.backgroundImage)
                      ? void 0
                      : n.verticalAlignment) || "center",
                }
              : {}
          );
        },
        Z = (0, l.iv)(
          C ||
            (C = ((e) => e)`
  > div {
    padding-bottom: 8px;
    padding-top: 8px;
  }
`)
        );
      var V = n(2116),
        F = n.n(V),
        _ = n(84001);
      const O = [
          "teaserType",
          "teaserDirection",
          "teaserDisplayOrder",
          "animatingOut",
          "endAnimationCallback",
          "formVersionCId",
          "style",
          "isA11y",
          "a11yTeaserId",
        ],
        M = {
          [I.GE]: {
            CENTER_LEFT: "slideinup",
            TOP: "slideinup",
            BOTTOM: "slideindown",
            CENTER_RIGHT: "slideinup",
          },
          [I.uv]: {
            CENTER_LEFT: "slideinleft",
            TOP: "slideinup",
            BOTTOM: "slideindown",
            CENTER_RIGHT: "slideinright",
          },
          [I.aR]: {
            TOP_LEFT: "slideintopleft",
            BOTTOM_LEFT: "slideinbottomleft",
            TOP_RIGHT: "slideintopright",
            BOTTOM_RIGHT: "slideinbottomright",
          },
        },
        D = ({
          teaserType: e,
          teaserDirection: t,
          animatingOut: n = !1,
          isDesignWorkflow: o,
          isFirstRender: i,
          isA11y: r,
        }) => {
          const s = M[e],
            a = s[Object.keys(s).find((e) => t && t.startsWith(e))];
          let l = "0s",
            d = "forwards";
          return (
            o ? (l = "0.35s") : i && !n && ((l = "2s"), (d = "both")),
            Object.assign(
              {},
              _.s,
              {
                animationDelay: l,
                animationFillMode: d,
                animationDuration: ".4s",
                animationName: `klaviyo-${a}`,
              },
              n
                ? { animationDirection: "reverse" }
                : { animationDirection: "normal" },
              r ? { animationDelay: "0s", animationDuration: "0s" } : {}
            )
          );
        },
        A = (e) => {
          let {
              teaserType: t,
              teaserDirection: n,
              animatingOut: o = !1,
              endAnimationCallback: a = () => {},
              formVersionCId: l,
              style: d = {},
              isA11y: c,
              a11yTeaserId: f,
            } = e,
            p = F()(e, O);
          const [y, v] = (0, r.useState)(!1),
            b = (0, m.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            I = (0, m.Z)((e) => {
              var t;
              return null == (t = e.onsiteState.openFormVersions[l])
                ? void 0
                : t.teaserIsFirstRender;
            });
          (0, r.useEffect)(() => {
            o && v(!1);
          }, [o]);
          const S = (0, r.useMemo)(
            () => (b ? `${h.KI}:${h.s4}:${f}` : void 0),
            [b, f]
          );
          return s().createElement(
            u.ZC,
            i()({ a11yIdentifier: S }, p, {
              onAnimationEnd: () => {
                (0, g.fK)({
                  id: l,
                  changes: { teaserAnimationInProgress: !1 },
                }),
                  v(!0),
                  a();
              },
              onAnimationStart: () => {
                (0, g.ng)({ formVersionCId: l }),
                  o &&
                    (0, g.fK)({
                      id: l,
                      changes: {
                        teaserAnimationInProgress: !0,
                        formAnimationInProgress: !0,
                      },
                    }),
                  (0, g.fK)({
                    id: l,
                    changes: { hideTeaserBeforeAnimation: !1 },
                  });
              },
              style: Object.assign(
                { height: "100%", width: "100%" },
                d,
                ((!y || o) &&
                  D({
                    teaserType: t,
                    teaserDirection: n,
                    animatingOut: o,
                    isDesignWorkflow: b,
                    isFirstRender: !!I,
                    isA11y: c,
                  })) ||
                  {}
              ),
            })
          );
        };
      var z = n(1618),
        j = n(81246);
      var W = n(58038);
      let N,
        B = (e) => e;
      var R = ({
        formVersionCId: e,
        className: t,
        designerFunctions: n,
        designerInfo: o,
        isA11y: f = !1,
        a11yTeaserId: p,
      }) => {
        var x, C, V, F, _, O, M, D, R;
        const H = (0, m.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.closeModalWhenAnimationCompletes;
          }),
          P = (0, m.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          L = (0, m.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.formVersionId;
          }),
          q = (0, m.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.formId;
          }),
          K = (0, m.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.hideTeaserBeforeAnimation;
          }),
          U = (0, m.Z)((t) => {
            var n;
            return f && p
              ? p
              : null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.currentTeaserId;
          }),
          G = (0, m.Z)((t) => {
            var n;
            return null == (n = t.onsiteState.openFormVersions[e])
              ? void 0
              : n.teaserAnimationInProgress;
          }),
          Y = (0, m.Z)(
            (e) =>
              e.formsState.teasers &&
              Object.values(e.formsState.teasers).filter(
                (e) => (null == e ? void 0 : e.formVersionId) === L
              )[0],
            d.X
          ),
          X = (0, m.Z)((e) => {
            const t = Object.values(e.onsiteState.triggerGroups).find(
              (e) => (null == e ? void 0 : e.formVersionId) === L
            );
            return (t && void 0 !== t[v.w1]) || !1;
          }),
          J = (0, c.Z)() || (null == o ? void 0 : o.mobileDesktopType) === h.Jq,
          Q = (0, r.useRef)(null),
          [ee, te] = (0, r.useState)(!1),
          [ne, oe] = (0, r.useState)(!1),
          ie = (0, r.useMemo)(
            () =>
              P ? `${h.KI}:${h.s4}:${null == Y ? void 0 : Y.teaserId}` : void 0,
            [P, null == Y ? void 0 : Y.teaserId]
          ),
          [re, se] = (0, r.useState)(),
          [ae, le] = (0, r.useState)(!1),
          de = (0, r.useCallback)(() => {
            ae && !P && (H || (0, g.$J)({ formVersionCId: e }), le(!1));
          }, [ae]);
        if (
          ((0, r.useEffect)(() => {
            se((0, a.Z)("teaser_animation_key"));
          }, [null == Y ? void 0 : Y.type, null == Y ? void 0 : Y.direction]),
          (0, r.useEffect)(() => {
            Y &&
              U &&
              ee &&
              !ae &&
              !G &&
              Q.current &&
              (Q.current.focus(), te(!1));
          }, [e, U, G, ee, ae, Y]),
          !Y || (!U && !G))
        )
          return null;
        const ce =
            null == (x = Y.data) ||
            null == (C = x.styling) ||
            null == (V = C.dismissButtonStyles)
              ? void 0
              : V.margin,
          me =
            Y.type === I.GE &&
            ((null == (F = Y.direction) ? void 0 : F.includes("TOP")) ||
              (null == (_ = Y.direction) ? void 0 : _.includes("BOTTOM"))) &&
            J,
          ue = (({ teaserStyling: e, teaserType: t }) => {
            const n = I.ds[t];
            return (0, z.Z)({}, Object.assign({}, j.al, { size: n }), e);
          })({
            teaserStyling: null == (O = Y.data) ? void 0 : O.styling,
            teaserType: Y.type,
          }),
          fe = { theme: ue, type: Y.type, direction: Y.direction },
          pe = Object.assign(
            { zIndex: P ? 0 : b.B },
            f ? { transform: "scale(0.001)", zIndex: 1 } : {},
            { position: P ? "absolute" : "fixed" },
            ue.dropShadow.enabled
              ? {
                  filter: `drop-shadow(0px 0px ${ue.dropShadow.blur}px ${ue.dropShadow.color})`,
                }
              : {},
            (({ theme: e, type: t, direction: n }) => {
              const o = e.margin.left,
                i = e.margin.top;
              return {
                [I.GE]: {
                  [S.MG]: { top: 0, left: 0, margin: `${i}px ${o}px` },
                  [S.DA]: {
                    top: 0,
                    left: "50%",
                    transform: `translate(calc(-50% - ${o}px))`,
                    margin: `${i}px ${o}px`,
                  },
                  [S.pz]: { top: 0, right: 0, margin: `${i}px ${o}px` },
                  [S.pq]: {
                    top: "50%",
                    left: 0,
                    transform: "rotate(-90deg) translate(-50%, 0)",
                    transformOrigin: "top left",
                    marginLeft: `${i}px`,
                  },
                  [S.j$]: {
                    top: "50%",
                    right: 0,
                    transform: "rotate(90deg) translate(50%, 0)",
                    transformOrigin: "top right",
                    marginRight: `${i}px`,
                  },
                  [S.kB]: { bottom: 0, left: 0, margin: `${i}px ${o}px` },
                  [S.qS]: {
                    bottom: 0,
                    left: "50%",
                    transform: `translate(calc(-50% - ${o}px))`,
                    margin: `${i}px ${o}px`,
                  },
                  [S.tC]: { bottom: 0, right: 0, margin: `${i}px ${o}px` },
                },
                [I.uv]: {
                  [S.MG]: { top: 0, left: 0, margin: `${i}px ${o}px` },
                  [S.DA]: {
                    top: 0,
                    left: "50%",
                    transform: `translate(calc(-50% - ${o}px))`,
                    margin: `${i}px ${o}px`,
                  },
                  [S.pz]: { top: 0, right: 0, margin: `${i}px ${o}px` },
                  [S.pq]: {
                    left: 0,
                    margin: `${i}px ${o}px`,
                    top: `calc(50% - ${i}px)`,
                    transform: "translateY(-50%)",
                  },
                  [S.j$]: {
                    right: 0,
                    margin: `${i}px ${o}px`,
                    top: `calc(50% - ${i}px)`,
                    transform: "translateY(-50%)",
                  },
                  [S.kB]: { bottom: 0, left: 0, margin: `${i}px ${o}px` },
                  [S.qS]: {
                    bottom: 0,
                    left: "50%",
                    transform: `translate(calc(-50% - ${o}px))`,
                    margin: `${i}px ${o}px`,
                  },
                  [S.tC]: { bottom: 0, right: 0, margin: `${i}px ${o}px` },
                },
                [I.aR]: {
                  [S.MG]: {
                    top: 0,
                    left: 0,
                    height: e.size,
                    width: e.size,
                    margin: `${i}px ${o}px`,
                  },
                  [S.pz]: {
                    top: 0,
                    right: 0,
                    height: e.size,
                    width: e.size,
                    margin: `${i}px ${o}px`,
                  },
                  [S.kB]: {
                    bottom: 0,
                    left: 0,
                    height: e.size,
                    width: e.size,
                    margin: `${i}px ${o}px`,
                  },
                  [S.tC]: {
                    bottom: 0,
                    right: 0,
                    height: e.size,
                    width: e.size,
                    margin: `${i}px ${o}px`,
                  },
                },
              }[t][n];
            })(fe),
            (({ theme: e, type: t, direction: n }) =>
              ({
                [I.GE]: {
                  [S.MG]: { width: e.size - w },
                  [S.DA]: { width: e.size - w },
                  [S.pz]: { width: e.size - w },
                  [S.pq]: { width: e.size - w },
                  [S.j$]: { width: e.size - w },
                  [S.kB]: { width: e.size - w },
                  [S.qS]: { width: e.size - w },
                  [S.tC]: { width: e.size - w },
                },
                [I.uv]: {
                  [S.MG]: { height: e.size - w, width: e.size - w },
                  [S.DA]: { height: e.size - w, width: e.size - w },
                  [S.pz]: { height: e.size - w, width: e.size - w },
                  [S.pq]: { width: e.size - w, height: e.size - w },
                  [S.j$]: { width: e.size - w, height: e.size - w },
                  [S.kB]: { height: e.size - w, width: e.size - w },
                  [S.qS]: { height: e.size - w, width: e.size - w },
                  [S.tC]: { height: e.size - w, width: e.size - w },
                },
                [I.aR]: { [S.MG]: {}, [S.pz]: {}, [S.kB]: {}, [S.tC]: {} },
              }[t][n] || {}))(fe),
            me ? { width: `calc(100% - ${2 * ue.margin.left}px)` } : {},
            K && P ? { opacity: 0 } : {}
          ),
          he = Object.assign(
            { overflow: "hidden", boxSizing: "border-box" },
            E[Y.type][Y.direction] || {},
            ((e, t, n) => {
              const o = {};
              switch (t) {
                case I.GE:
                  o.borderRadius = ((e, t) => {
                    const n = e.margin.top,
                      o = e.margin.left;
                    let [i, r, s, a] = [
                      e.borderRadius,
                      e.borderRadius,
                      e.borderRadius,
                      e.borderRadius,
                    ];
                    return (
                      null != t &&
                        t.includes("BOTTOM") &&
                        0 === n &&
                        ((s = 0), (a = 0)),
                      null != t &&
                        t.includes("TOP") &&
                        0 === n &&
                        ((r = 0), (i = 0)),
                      null != t &&
                        t.includes("LEFT") &&
                        0 === o &&
                        ((i = 0), (a = 0)),
                      null != t &&
                        t.includes("RIGHT") &&
                        0 === o &&
                        ((r = 0), (s = 0)),
                      null != t &&
                        t.includes("CENTER") &&
                        null != t &&
                        t.includes("LEFT") &&
                        0 === n &&
                        ((i = 0), (r = 0)),
                      null != t &&
                        t.includes("CENTER") &&
                        null != t &&
                        t.includes("RIGHT") &&
                        0 === n &&
                        ((i = 0), (r = 0)),
                      `${i}px ${r}px ${s}px ${a}px`
                    );
                  })(e, n);
                  break;
                case I.uv:
                  o.borderRadius = "50%";
              }
              return o;
            })(ue, Y.type, Y.direction),
            Y.type !== I.aR ? T(ue, ne) : {},
            I.GE === Y.type
              ? { minHeight: 50, height: "100%", padding: 8 }
              : {},
            I.uv === Y.type
              ? { height: "100%", padding: 8 }
              : { height: "100%" },
            Y.type === I.aR
              ? { display: "block" }
              : {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }
          ),
          ye = (0, l.iv)(
            N ||
              (N = B`
    cursor: pointer;
    * {
      cursor: pointer;
    }
  `)
          );
        return s().createElement(
          u.zx,
          i()(
            {},
            null != (M = Y.data.content) && M.html
              ? {}
              : { "aria-label": "Open Form" },
            {
              a11yIdentifier: ie,
              ref: Q,
              className: `kl-teaser-${q} ${t}`,
              tabIndex: P ? -1 : 0,
              style: pe,
            },
            P
              ? {}
              : {
                  onClick: () => {
                    le(!0), te(!0);
                  },
                  onFocus: () => {
                    oe(!0);
                  },
                  onBlur: () => {
                    oe(!1);
                  },
                }
          ),
          s().createElement(
            A,
            {
              key: re,
              teaserType: Y.type,
              teaserDirection: Y.direction,
              teaserDisplayOrder: Y.displayOrder,
              animatingOut: (G && !U) || ae,
              endAnimationCallback: de,
              formVersionCId: e,
              "data-testid": "animated-teaser",
              isA11y: f,
              a11yTeaserId: p,
            },
            s().createElement(
              u.Dr,
              { a11yIdentifier: ie, style: he, className: P ? "" : ye },
              s().createElement(
                u.ZC,
                {
                  a11yIdentifier: ie,
                  style: Object.assign(
                    {},
                    k(fe),
                    Y.type === I.aR ? T(ue, ne) : {}
                  ),
                  className: Y.type === I.aR ? Z : "",
                },
                s().createElement(y, { formVersionCId: e, designerInfo: o })
              )
            ),
            X &&
              s().createElement(W.Z, {
                buttonStyling:
                  null == (D = Y.data) || null == (R = D.styling)
                    ? void 0
                    : R.dismissButtonStyles,
                title: "Close teaser",
                onClick: () => {
                  (0, g.YW)({ formVersionCId: e });
                },
                positionalStyles: $(
                  Object.assign({}, fe, { dismissButtonMargin: ce })
                ),
                isTeaser: !0,
                designerFunctions: n,
                designerInfo: o,
              })
          )
        );
      };
    },
    18059: function (e, t, n) {
      var o = n(76223),
        i = n.n(o),
        r = n(26563),
        s = n(46138);
      t.Z = ({ errorViewMessage: e, isEmbed: t = !1, isFullscreen: n = !1 }) =>
        i().createElement(
          s.ZC,
          {
            style: Object.assign(
              {
                height: 165,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ffffff",
              },
              t
                ? { width: "100%" }
                : Object.assign(
                    {},
                    n
                      ? {
                          width: "100%",
                          overflow: "auto",
                          height: "fit-content",
                          minHeight: "100%",
                        }
                      : { width: 450 }
                  )
            ),
          },
          i().createElement(
            s.ZC,
            { style: { textAlign: "center", width: 300 } },
            e || r.xl
          )
        );
    },
    14988: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return D;
        },
      });
      var o = n(93885),
        i = n.n(o),
        r = (n(19986), n(76223)),
        s = n.n(r),
        a = n(18017),
        l = n(75992),
        d = n(32691),
        c = n(20094),
        m = n(18356);
      const u = "top",
        f = "bottom";
      var p = n(1618),
        h = n(90048),
        y = n(3321),
        g = n(49121),
        v = n(46138),
        b = n(52470),
        I = n(89160),
        S = n(75584),
        x = n(58284);
      const C = { right: "0 0 0 auto", left: "0 auto 0 0", center: "0 auto" },
        w = ({ children: e }) => e;
      var E = ({
        componentId: e,
        componentPosition: t,
        formVersionCId: n,
        rowDroppableHover: o,
        setDragState: l,
        dragFinished: d,
        designerFunctions: m,
        designerInfo: u,
        isA11y: f = !1,
      }) => {
        var E, $, k, T, Z, V, F, _, O;
        const [M, D] = (0, r.useState)(!1),
          A = (0, r.useRef)(null),
          z = (0, y.Z)((t) => t.formsState.components[e], a.X),
          j = (0, y.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
          W = (0, y.Z)((e) => {
            var t;
            return null == (t = e.onsiteState.openFormVersions[n])
              ? void 0
              : t.currentViewId;
          }),
          N = (0, y.Z)((t) => (W ? (0, x.su)(t, e, W) : {}), a.X),
          B = (0, y.Z)((e) => (W ? (0, S.l)(e, W) : {}), a.X),
          R = (0, y.Z)((t) => {
            var n, o;
            const i =
              null == (n = t.formsState.components[e]) ? void 0 : n.actionId;
            return t.formsState.actions && i
              ? null == (o = t.formsState.actions[i])
                ? void 0
                : o.actionType
              : void 0;
          }),
          H = (0, r.useMemo)(
            () =>
              j
                ? (null == u ? void 0 : u.mobileDesktopType) || c.q5
                : (0, b.Z)(),
            [j, null == u ? void 0 : u.mobileDesktopType]
          ),
          P =
            (null == u ? void 0 : u.activeComponentId) ||
            (null == u ? void 0 : u.activeA11yComponentId),
          L = (0, r.useMemo)(() => {
            var e;
            return (0, p.Z)({}, B, N, {
              [h.Z.THEME_KEY]:
                null == z || null == (e = z.data) ? void 0 : e.styling,
            });
          }, [B, N, null == z || null == (E = z.data) ? void 0 : E.styling]),
          q = (0, r.useMemo)(
            () => (j ? `${c.f2}:${c.j1}:${e}` : void 0),
            [e, j]
          ),
          K = (0, r.useMemo)(
            () => (j ? `${c.f2}:${c.Pg}:${e}` : void 0),
            [e, j]
          ),
          U = (0, r.useMemo)(() => {
            if (!z) return null;
            const t = g.c[z.componentType];
            return t
              ? s().createElement(t, {
                  theme: L,
                  componentId: e,
                  formVersionCId: n,
                  itemId: e,
                  a11yIdentifierBlock: q,
                  a11yIdentifierStyles: K,
                })
              : null;
          }, [q, K, z, e, n, L]);
        if (
          null != z &&
          null != ($ = z.data) &&
          null != (k = $.styling) &&
          k.hidden
        )
          return null;
        const G = P === e,
          Y = Object.assign(
            { component: z },
            j
              ? {
                  onClick: () => {
                    null == m || m.setActiveSidebar({ type: c.NV, key: e });
                  },
                  onMouseOver: () => {
                    d ? l(!1) : D(!0);
                  },
                  onMouseLeave: () => D(!1),
                  onDragStart: () => D(!1),
                  onDragEnd: () => {
                    l(!0);
                  },
                  ref: A,
                }
              : {}
          ),
          X = (0, I.C)(z, H, R);
        return z && X
          ? s().createElement(
              v.ZC,
              i()(
                {
                  a11yIdentifier: q,
                  style: Object.assign(
                    {
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: `${L[h.Z.THEME_KEY].padding.top || 0}px ${
                        L[h.Z.THEME_KEY].padding.right || 0
                      }px ${L[h.Z.THEME_KEY].padding.bottom || 0}px ${
                        L[h.Z.THEME_KEY].padding.left || 0
                      }px`,
                      position: "relative",
                    },
                    L[h.Z.THEME_KEY].blockBackgroundColor
                      ? {
                          backgroundColor:
                            L[h.Z.THEME_KEY].blockBackgroundColor,
                        }
                      : {},
                    M ? { cursor: "pointer" } : {},
                    {
                      flex:
                        !1 !==
                        (null == z ||
                        null == (T = z.data) ||
                        null == (Z = T.styling)
                          ? void 0
                          : Z.fullWidth)
                          ? "1 0 0"
                          : "0 1 auto",
                    },
                    !1 ===
                      (null == z ||
                      null == (V = z.data) ||
                      null == (F = V.styling)
                        ? void 0
                        : F.fullWidth) &&
                      null != z &&
                      null != (_ = z.data) &&
                      _.styling.alignment
                      ? {
                          margin:
                            C[
                              null == z || null == (O = z.data)
                                ? void 0
                                : O.styling.alignment
                            ],
                        }
                      : {}
                  ),
                },
                Y,
                { "data-testid": "form-component", className: void 0 }
              ),
              j && m && u && !f
                ? s().createElement(
                    w,
                    {
                      theme: L,
                      active: G,
                      componentId: e,
                      componentPosition: t,
                      componentRef: A.current,
                      formVersionCId: n,
                      isHovering: M,
                      rowDroppableHover: o,
                      setIsHovering: D,
                      designerFunctions: m,
                      designerInfo: u,
                    },
                    U
                  )
                : U
            )
          : null;
      };
      var $ = ({
        rowId: e,
        formVersionCId: t,
        designerFunctions: n,
        designerInfo: o,
        isA11y: i,
      }) => {
        const l = (0, y.Z)((t) => {
            var n;
            return (
              (null == (n = t.formsState.rows[e]) ? void 0 : n.components) || []
            );
          }, a.X),
          d = (0, y.Z)((e) => e.onsiteState.client.isDesignWorkflow),
          [m, p] = (0, r.useState)(!1),
          [h, g] = (0, r.useState)(!1),
          [b, I] = (0, r.useState)(!1),
          S = (m ? u : h && f) || !1,
          x = (0, r.useMemo)(
            () => (d ? `${c.Vs}:${c.ij}:${e}` : void 0),
            [d, e]
          );
        return l.length
          ? s().createElement(
              v.ZC,
              {
                a11yIdentifier: x,
                "data-testid": "form-row",
                style: Object.assign(
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                    position: "relative",
                  },
                  S
                    ? Object.assign(
                        {},
                        "bottom" === S
                          ? {
                              borderBottom: "2px",
                              borderBottomStyle: "solid",
                              borderBottomColor: "#2B98D3",
                              marginBottom: "-2px",
                            }
                          : {
                              borderTop: "2px",
                              borderTopStyle: "solid",
                              borderTopColor: "#2B98D3",
                              marginTop: "-2px",
                            }
                      )
                    : {}
                ),
              },
              l.map((e, r) =>
                s().createElement(E, {
                  key: e,
                  componentId: e,
                  componentPosition: r,
                  formVersionCId: t,
                  rowDroppableHover: (e, t) => {
                    e === u ? p(t) : g(t);
                  },
                  setDragState: (e) => I(e),
                  dragFinished: b,
                  designerFunctions: n,
                  designerInfo: o,
                  isA11y: i,
                })
              ),
              null
            )
          : null;
      };
      const k = ({ children: e }) => e,
        T = { 0.5: "35%", 1: "50%", 2: "65%" };
      var Z = ({
          columnId: e,
          formVersionCId: t,
          formVersionId: n,
          viewId: o,
          sideImageExistsAndHidden: l,
          isFullscreen: d,
          designerFunctions: m,
          designerInfo: u,
          isA11y: f,
        }) => {
          var p, h, g, b, x, C, w, E, Z;
          const V = (0, r.useRef)(null),
            [F, _] = (0, r.useState)(!1),
            O = (0, y.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            M = (0, y.Z)((e) => {
              var t, o;
              return null == (t = e.formsState.formVersions[n]) ||
                null == (o = t.data)
                ? void 0
                : o.sideImage;
            }, a.X),
            D = (0, y.Z)((t) => {
              var n;
              return (
                (null == (n = t.formsState.columns[e]) ? void 0 : n.rows) || []
              );
            }, a.X),
            A = (0, y.Z)((t) => t.formsState.columns[e], a.X),
            z = (0, y.Z)((e) => (0, S.l)(e, o), a.X),
            j = (0, r.useMemo)(
              () => (O ? `${c.PF}:${c.k_}:${e}` : void 0),
              [O, e]
            );
          if (!A) return null;
          const W = null == u ? void 0 : u.activeColumnId,
            { padding: N, minimumHeight: B } = z,
            R =
              void 0 !==
                (null == (p = A.data) || null == (h = p.styling)
                  ? void 0
                  : h.sizeMultiplier) && 0 === A.rows.length,
            { columnMargin: H, columnPadding: P } = ((e, t, n, o) => {
              const i = { top: 0, left: 0, right: 0, bottom: 0 },
                r = { top: 0, left: 0, right: 0, bottom: 0 };
              return (
                o ||
                  (void 0 !== n &&
                    (e
                      ? ((i.top = t && t.top ? -1 * t.top : 0),
                        (i.bottom = t && t.bottom ? -1 * t.bottom : 0),
                        0 === n
                          ? (i.left = t && t.left ? -1 * t.left : 0)
                          : 1 === n &&
                            (i.right = t && t.right ? -1 * t.right : 0))
                      : 0 === n
                      ? (r.left = (null == t ? void 0 : t.left) || 0)
                      : 1 === n &&
                        (r.right = (null == t ? void 0 : t.right) || 0))),
                { columnMargin: i, columnPadding: r }
              );
            })(R, N, null == M ? void 0 : M.position, l),
            L =
              null == (g = A.data) || null == (b = g.styling)
                ? void 0
                : b.sizeMultiplier,
            q = null == z ? void 0 : z.size,
            K =
              L && q
                ? ((e, t, n) => {
                    const o = (e / (e + 1)) * t;
                    return n ? o : t - o;
                  })(L, q, R)
                : 0,
            U = W === A.columnId,
            G =
              ((null == z ? void 0 : z.borderStyle) &&
                "none" !== (null == z ? void 0 : z.borderStyle) &&
                (null == z ? void 0 : z.borderWidth)) ||
              0,
            Y =
              null == (x = A.data) || null == (C = x.styling)
                ? void 0
                : C.backgroundImage,
            X =
              null == (w = A.data) || null == (E = w.styling)
                ? void 0
                : E.backgroundColor,
            J = Object.assign(
              {},
              O && R
                ? {
                    onClick: () => {
                      m && m.setActiveSidebar({ type: c.aC, key: e });
                    },
                    onMouseOver: () => {
                      _(!0);
                    },
                    onMouseLeave: () => _(!1),
                    ref: V,
                  }
                : {}
            ),
            Q = null == u ? void 0 : u.mobileDesktopType,
            ee =
              (null == (Z = A.rows) ? void 0 : Z.length) > 0 ||
              (M && (0, I.V)(M, O, Q || c.q5, A)),
            te = R
              ? Object.assign(
                  {
                    borderColor: "transparent",
                    borderStyle: "solid",
                    borderWidth: z.borderWidth,
                  },
                  1 === (null == M ? void 0 : M.position)
                    ? {
                        borderBottomRightRadius: z.borderRadius,
                        borderTopRightRadius: z.borderRadius,
                        marginRight: H.right - z.borderWidth,
                        borderLeft: 0,
                      }
                    : {
                        borderBottomLeftRadius: z.borderRadius,
                        borderTopLeftRadius: z.borderRadius,
                        marginLeft: H.left - z.borderWidth,
                        borderRight: 0,
                      },
                  {
                    marginBottom: H.bottom - z.borderWidth,
                    marginTop: H.top - z.borderWidth,
                    overflow: "hidden",
                  }
                )
              : {};
          return ee
            ? s().createElement(
                s().Fragment,
                null,
                s().createElement(
                  v.ZC,
                  i()(
                    {
                      a11yIdentifier: j,
                      style: Object.assign(
                        {
                          display: "flex",
                          flexDirection: "column",
                          width: K ? `${K}px` : "100%",
                          marginTop: `${H.top}px`,
                          marginBottom: `${H.bottom}px`,
                          marginLeft: `${H.left}px`,
                          marginRight: `${H.right}px`,
                          paddingTop: `${P.top}px`,
                          paddingBottom: `${P.bottom}px`,
                          paddingLeft: `${P.left}px`,
                          paddingRight: `${P.right}px`,
                        },
                        te,
                        { backgroundColor: X },
                        F ? { cursor: "pointer" } : {},
                        K ? { minWidth: `${K}px` } : {},
                        void 0 === B || d ? {} : { minHeight: `${B}px` },
                        R ? {} : { justifyContent: "center" },
                        d && !R
                          ? {
                              margin: "0 auto",
                              minWidth: "100px",
                              maxWidth: `${q}px`,
                              width: `${q}px`,
                            }
                          : {},
                        d && L
                          ? {
                              position: "relative",
                              maxWidth: T[L],
                              width: "100%",
                            }
                          : {}
                      ),
                    },
                    null != Y && Y.altText
                      ? { title: null == Y ? void 0 : Y.altText }
                      : {},
                    J
                  ),
                  R &&
                    s().createElement(v.ZC, {
                      a11yIdentifier: j,
                      style: Object.assign(
                        {},
                        Y
                          ? {
                              backgroundImage: `url(${Y.url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize:
                                "custom" === Y.position
                                  ? `${Y.customWidth}px`
                                  : Y.position,
                              backgroundPositionX: Y.alignment,
                              backgroundPositionY:
                                Y.verticalAlignment || "center",
                              width: "100%",
                              height: "100%",
                              display: "block",
                            }
                          : {}
                      ),
                    }),
                  s().createElement(
                    k,
                    {
                      backgroundColorExists: !!X,
                      backgroundImageExists: !!Y,
                      calculatedWidth: K,
                      column: A,
                      isDesignWorkflow: O,
                      isHovering: F,
                      isSelected: U,
                      isSideImageColumn: R,
                      viewBorderWidth: G,
                      viewSize: q,
                      isFullscreen: d,
                    },
                    null == D
                      ? void 0
                      : D.map((e) =>
                          s().createElement($, {
                            key: e,
                            rowId: e,
                            formVersionCId: t,
                            designerFunctions: m,
                            designerInfo: u,
                            isA11y: f,
                          })
                        )
                  )
                )
              )
            : null;
        },
        V = n(44731),
        F = n(79885);
      const _ = {
          left: { float: "left" },
          center: { margin: "0 auto" },
          right: { float: "right" },
        },
        O = (e, t, n) =>
          t
            ? null != n && n.includes("BOTTOM")
              ? `${e}px ${e}px 0 0`
              : `0 0 ${e}px ${e}px`
            : `${e}px`;
      var M = ({
          viewId: e,
          isEmbed: t,
          formVersionId: n,
          formVersionCId: o,
          isDocked: u,
          formTypeDirection: f,
          designerFunctions: p,
          designerInfo: h,
          isA11y: g,
        }) => {
          var b, x, C;
          const w = (0, y.Z)((e) => {
              var t;
              return null == (t = e.formsState.formVersions[n])
                ? void 0
                : t.formId;
            }),
            E = (0, y.Z)((e) => {
              var t;
              return null == (t = e.formsState.formVersions[n])
                ? void 0
                : t.formType;
            }),
            $ = (0, y.Z)(
              (t) =>
                t.formsState.views[e]
                  ? Object.values(t.formsState.columns)
                      .filter((e) => !!e)
                      .filter((n) => {
                        var o;
                        return null == (o = t.formsState.views[e])
                          ? void 0
                          : o.columns.includes(n.columnId);
                      })
                      .sort((e, t) => e.position - t.position)
                  : [],
              a.X
            ),
            k = (0, y.Z)((e) => {
              const t = $.reduce(
                (e, t) => (
                  t.rows.forEach((t) => {
                    e.push(t);
                  }),
                  e
                ),
                []
              )
                .reduce((t, n) => {
                  var o;
                  return (
                    null == (o = e.formsState.rows[n]) ||
                      o.components.forEach((e) => {
                        t.push(e);
                      }),
                    t
                  );
                }, [])
                .map((t) => e.formsState.components[t]);
              return Object.values(e.formsState.actions || {}).filter(
                (e) =>
                  !!e &&
                  t.find(
                    (t) =>
                      (null == t ? void 0 : t.actionId) === e.actionId &&
                      d.Fz.has(e.actionType)
                  )
              );
            }, a.X),
            T = (0, y.Z)((t) => (0, S.l)(t, e), a.X),
            M = (0, y.Z)((e) => {
              var t, o;
              return null == (t = e.formsState.formVersions[n]) ||
                null == (o = t.data)
                ? void 0
                : o.sideImage;
            }, a.X),
            D = (0, y.Z)((t) =>
              Object.values(t.formsState.columns)
                .filter((t) => (null == t ? void 0 : t.viewId) === e)
                .find(
                  (e) =>
                    (null == e ? void 0 : e.position) ===
                    (null == M ? void 0 : M.position)
                )
            ),
            A = (0, y.Z)((e) => (0, S.Tf)(e, n)) === e,
            z =
              null == M || null == (b = M.data) || null == (x = b.styling)
                ? void 0
                : x.sizeMultiplier,
            j = z ? (0, V.Z)(z, T.size) : 0,
            W = (0, y.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            N = null == h ? void 0 : h.mobileDesktopType,
            B = M && !(0, I.V)(M, W, N || c.q5, D),
            R = B ? T.size - j : void 0,
            H = (0, r.useMemo)(
              () => (W ? `${c.Sq}:${c.Pg}:${e}` : void 0),
              [W, e]
            );
          return s().createElement(
            v.l0,
            i()(
              {
                a11yIdentifier: H,
                style: Object.assign(
                  {
                    display: "flex",
                    flexDirection: "row",
                    boxSizing: "border-box",
                  },
                  t
                    ? Object.assign(
                        { width: "100%", overflow: "visible" },
                        T.isMaxWidth ? { maxWidth: `${T.size}px` } : {},
                        T.embedAlignment ? _[T.embedAlignment] : {}
                      )
                    : Object.assign(
                        {},
                        E !== F.UW
                          ? {
                              width: `${R || T.size}px`,
                              minWidth: `${m.Gg}px`,
                              maxWidth: `${m.Ez}px`,
                            }
                          : {
                              overflow: "auto",
                              height: "fit-content",
                              minHeight: "100%",
                            }
                      ),
                  {
                    borderRadius: `${O(T.borderRadius, u, f)}`,
                    borderStyle: T.borderStyle,
                    borderWidth: `${T.borderWidth || 0}px`,
                    borderColor: T.borderColor,
                    backgroundColor: T.backgroundColor,
                    backgroundImage: T.backgroundImage
                      ? `url(${T.backgroundImage.url})`
                      : void 0,
                    backgroundRepeat: "no-repeat",
                    backgroundSize:
                      (T.backgroundImage &&
                        ("custom" === T.backgroundImage.position
                          ? `${T.backgroundImage.customWidth}px`
                          : T.backgroundImage.position)) ||
                      void 0,
                    backgroundPositionX: T.backgroundImage
                      ? T.backgroundImage.alignment
                      : void 0,
                    backgroundPositionY:
                      (null == (C = T.backgroundImage)
                        ? void 0
                        : C.verticalAlignment) || "center",
                    paddingTop: `${T.padding.top}px`,
                    paddingRight: `${T.padding.right}px`,
                    paddingBottom: `${T.padding.bottom}px`,
                    paddingLeft: `${T.padding.left}px`,
                    flex: 1,
                  }
                ),
                className: `klaviyo-form klaviyo-form-version-cid_${o}`,
                "data-testid": `klaviyo-form-${w}`,
                noValidate: !0,
                tabIndex: -1,
                onSubmit: async (e) => {
                  if ((e.preventDefault(), 1 !== k.length)) return !1;
                  const t = k[0];
                  if (!t) return !1;
                  const { actionId: n } = t,
                    i = (0, l.j)({ actionId: n, formVersionCId: o });
                  return (
                    await new i({ actionId: n, formVersionCId: o }).runAction(),
                    !0
                  );
                },
              },
              A && E === F.LP ? { role: "status", "aria-live": "polite" } : {}
            ),
            $.map((t) =>
              s().createElement(Z, {
                key: t.columnId,
                columnId: t.columnId,
                formVersionCId: o,
                formVersionId: n,
                viewId: e,
                sideImageExistsAndHidden: B,
                isFullscreen: E === F.UW,
                designerFunctions: p,
                designerInfo: h,
                isA11y: g,
              })
            ),
            s().createElement("input", {
              style: { display: "none" },
              type: "submit",
              tabIndex: -1,
              value: "Submit",
            })
          );
        },
        D = M;
    },
    28689: function (e, t, n) {
      n.r(t),
        n.d(t, {
          default: function () {
            return C;
          },
        });
      var o = n(76223),
        i = n.n(o),
        r = n(14324),
        s = n(94926),
        a = n(93885),
        l = n.n(a),
        d = n(18017),
        c = n(56801);
      var m = n(14686).Z,
        u = n(3321),
        f = n(68254);
      var p = n(53675).Z;
      var h = ({
          formVersionCId: e,
          node: t,
          designerFunctions: n,
          designerInfo: o,
        }) => {
          const r = (0, u.Z)((e) => !!e.onsiteState.client.isDesignWorkflow),
            s = (0, u.Z)((t) => {
              var n;
              return null == (n = t.onsiteState.openFormVersions[e])
                ? void 0
                : n.formVersionId;
            }),
            a = (0, u.Z)((t) => {
              var n;
              return null == (n = t.onsiteState.openFormVersions[e])
                ? void 0
                : n.currentTeaserId;
            }),
            l = (0, u.Z)((e) => {
              const t = e.formsState.teasers
                ? Object.values(e.formsState.teasers).filter(
                    (e) => (null == e ? void 0 : e.formVersionId) === s
                  )
                : [];
              return !!(t.length > 0 && t[0]);
            });
          if (r && null === t) return null;
          const d = (t) => {
            const s = i().createElement(p, {
                formVersionCId: e,
                closePortal: r ? () => {} : t,
                designerFunctions: n,
                designerInfo: o,
              }),
              d = i().createElement(m, {
                formVersionCId: e,
                closePortal: r ? () => {} : t,
                designerFunctions: n,
                designerInfo: o,
              });
            return r
              ? a
                ? s
                : d
              : i().createElement(i().Fragment, null, l && s, d);
          };
          return i().createElement(
            c.Z,
            {
              key: e,
              defaultOpen: !0,
              onClose: () => {
                (0, f.zd)({ formVersionCId: e });
              },
              closeOnEsc: !r,
              node: r ? t : void 0,
            },
            ({ closePortal: e, portal: t }) => [t(d(e))]
          );
        },
        y = n(14988),
        g = n(18059),
        v = n(46138),
        b = n(20094);
      var I = ({
          node: e,
          formVersionCId: t,
          designerFunctions: n,
          designerInfo: r,
          isA11y: s = !1,
          a11yViewId: a,
        }) => {
          const l = (0, u.Z)((e) => {
              var n;
              return null == (n = e.onsiteState.openFormVersions[t])
                ? void 0
                : n.closed;
            }),
            d = (0, u.Z)((e) => {
              var n;
              return null == (n = e.onsiteState.openFormVersions[t])
                ? void 0
                : n.formId;
            }),
            c = (0, u.Z)((e) => {
              var n;
              return null == (n = e.onsiteState.openFormVersions[t])
                ? void 0
                : n.currentViewId;
            }),
            m = (0, u.Z)((e) => {
              var n;
              return null == (n = e.onsiteState.openFormVersions[t])
                ? void 0
                : n.errorViewMessage;
            }),
            f = (0, u.Z)((e) => {
              var n;
              return null == (n = e.onsiteState.openFormVersions[t])
                ? void 0
                : n.formVersionId;
            }),
            p =
              e ||
              document.querySelector(
                `div.klaviyo-form-${d}.form-version-cid-${t}`
              ),
            h = (0, o.useMemo)(
              () => (n ? `${b.Sq}:${b.Pg}:${c}` : void 0),
              [n, c]
            );
          return p && !l
            ? (0, o.createPortal)(
                c && f
                  ? i().createElement(
                      i().Fragment,
                      null,
                      m
                        ? i().createElement(g.Z, {
                            isEmbed: !0,
                            errorViewMessage: m,
                          })
                        : i().createElement(
                            v.ZC,
                            {
                              a11yIdentifier: h,
                              style: Object.assign(
                                { transform: "translate(0, 0)" },
                                s
                                  ? {
                                      position: "absolute",
                                      transform: "scale(0.001)",
                                      zIndex: 1,
                                    }
                                  : {}
                              ),
                            },
                            i().createElement(y.Z, {
                              formVersionCId: t,
                              formVersionId: f,
                              viewId: a || c,
                              isEmbed: !0,
                              key: t,
                              designerFunctions: n,
                              designerInfo: r,
                            })
                          )
                    )
                  : null,
                p
              )
            : null;
        },
        S = n(79885);
      var x = () => {
        const e = (0, u.Z)(
            (e) => Object.keys(e.onsiteState.openFormVersions),
            d.X
          ),
          t = (0, u.Z)(
            (e) =>
              Object.values(e.onsiteState.openFormVersions)
                .filter((e) => !!e)
                .filter(({ formVersionId: t }) => {
                  var n;
                  return (
                    (null == (n = e.formsState.formVersions[t])
                      ? void 0
                      : n.formType) === S.LP
                  );
                })
                .map(({ formVersionCId: e }) => e),
            d.X
          );
        return i().createElement(
          o.Suspense,
          { fallback: i().createElement("div", null) },
          e.map((e) => {
            const n = { formVersionCId: e };
            return t.includes(e)
              ? i().createElement(I, l()({ key: e }, n))
              : i().createElement(h, l()({ key: e }, n));
          })
        );
      };
      (0, s.cY)(r.h);
      var C = () => {
        const e = document.createElement("div");
        e.setAttribute("id", "dynamic-react-root"),
          document.body.appendChild(e),
          (0, o.render)(i().createElement(x, null), e);
      };
    },
    75992: function (e, t, n) {
      n.d(t, {
        j: function () {
          return Ie;
        },
      });
      var o = n(3321),
        i = n(2116),
        r = n.n(i),
        s = n(32691),
        a = n(85835);
      class l {
        constructor({ formVersionCId: e, actionId: t }) {
          (this.currentHandlerStep = "INSTANTIATED"),
            (this.formActionType = void 0),
            (this.actionId = void 0),
            (this.formVersionCId = void 0),
            (this.formAction = void 0),
            (this.formId = void 0),
            (this.companyId = void 0);
          const n = o.Z.getState();
          (this.actionId = t),
            (this.formVersionCId = e),
            (this.formAction = (n.formsState.actions || {})[t]);
          const i = n.onsiteState.openFormVersions[e];
          if (!i) throw new Error("Open Form Version does not exist");
          (this.formId = i.formId),
            (this.companyId = n.onsiteState.client.klaviyoCompanyId);
        }
        runAction() {
          return (
            (this.currentHandlerStep = "PREHANDLER"),
            new Promise((e) => e())
              .then((e) => this.__preHandler(e))
              .then((e) => ((this.currentHandlerStep = "HANDLER"), e))
              .then((e) => this.__handler(e))
              .then((e) => ((this.currentHandlerStep = "POSTHANDLER"), e))
              .then((e) => this.__postHandler(e))
              .catch((e) => this.__errorHandler(e))
          );
        }
        __preHandler(e) {}
        __handler(e) {}
        __postHandler(e) {}
        __errorHandler(e) {
          (0, a.qB)(e.toString(), {
            formActionType: this.formActionType,
            currentHandlerStep: this.currentHandlerStep,
          });
        }
      }
      var d = n(68254);
      const c = ["isSubmit"];
      class m extends l {
        constructor(e) {
          let { isSubmit: t } = e;
          super(r()(e, c)),
            (this.isSubmit = void 0),
            (this.isSubmit = t),
            (this.formActionType = s.Pj);
        }
        __handler() {
          return (
            (0, d.fK)({
              id: this.formVersionCId,
              changes: { logCloseMetric: !this.isSubmit },
            }),
            (0, d.et)({
              formVersionCId: this.formVersionCId,
              isSubmit: this.isSubmit,
            })
          );
        }
      }
      m.formActionType = s.Pj;
      var u = m,
        f = n(39833),
        p = n(33511),
        h = n(80497),
        y = n(64425),
        g = n(58284),
        v = n(75584),
        b = n(21989),
        I = n(72506),
        S = n(93811);
      const x = async (e, t, n, o, i, r, s) => {
        var l;
        const c = (0, v.QE)(e, s),
          m = (0, v.Tf)(e, s);
        if (
          ((0, a.Cw)("requestShopPayShow", {
            firstViewId: c,
            successViewId: m,
          }),
          !m)
        )
          return !1;
        const u = (0, v.nC)(e, m).find((e) => e && (0, g.J6)(e)),
          f = (0, g.hB)(e, s) || (0, g.K1)(e, s),
          p =
            (null == u ? void 0 : u.data.couponType) === b.$i.STATIC
              ? null == u || null == (l = u.data.couponData)
                ? void 0
                : l.text
              : await (0, d.zS)({ formVersionCId: r });
        if (
          ((0, a.Cw)("requestShopPayShow", {
            hasCouponComponent: void 0 !== u,
            listId: f,
            discountCode: p,
          }),
          u && f && "string" == typeof p)
        ) {
          let e,
            s = !0;
          const l = new Promise((t) => {
            (e = t),
              setTimeout(() => {
                s && t(!0);
              }, 5e3);
          });
          return (
            (0, S.AN)(
              o,
              i,
              f,
              t,
              p,
              () => {
                (s = !1), (0, h.UY)({ showingShopLogin: I.K.SHOWING });
              },
              () => {
                e(!0),
                  ((e, t) => {
                    (0, d.Cm)({ id: e, changes: { currentViewId: t } });
                  })(r, n);
              },
              (t, n) => {
                e(!n),
                  ((e, t, n, o, i, r) => {
                    (0, a.Cw)("onShopPayComplete"),
                      r && (0, d.Cm)({ id: n, changes: { currentViewId: o } }),
                      (0, h.UY)({ showingShopLogin: I.K.CLOSED }),
                      i &&
                        e &&
                        (0, y.M)({
                          metric: i,
                          formVersionCId: n,
                          formId: t,
                          companyId: e,
                        });
                  })(i, o, r, m, t, n);
              },
              () => {
                e(!1),
                  ((e, t) => {
                    (0, a.Cw)("onShopPayRestart"),
                      t
                        ? ((0, d.Cm)({ id: e, changes: { currentViewId: t } }),
                          (0, h.UY)({ showingShopLogin: I.K.NEVER_SHOWN }))
                        : (0, h.UY)({ showingShopLogin: I.K.CLOSED });
                  })(r, c);
              }
            ),
            l
          );
        }
        return !1;
      };
      var C = n(56623),
        w = n(28650),
        E = n(66629),
        $ = n(33266),
        k = n(52751),
        T = n(36691),
        Z = n(30360),
        V = n(85382),
        F = n(26563),
        _ = n(8321),
        O = n(74882),
        M = n(44050),
        D = n(25928),
        A = n(87100);
      const z = `${M.bl.url}/ajax/sms/subscribe_unique_id`,
        j = (e) => e instanceof $.TT;
      var W = class extends l {
        constructor(e) {
          super(e),
            (this.hiddenFieldsComponentId = void 0),
            (this.composedFields = void 0);
          const t = o.Z.getState();
          (this.hiddenFieldsComponentId = (0, g.cA)(t, e.actionId)),
            (this.composedFields = (0, f.$f)(
              t,
              this.formVersionCId,
              this.hiddenFieldsComponentId
            ));
        }
        async __preHandler() {
          if (
            this.formAction.actionType &&
            s.NB.has(this.formAction.actionType)
          ) {
            const e = await (0, d.eN)({ formVersionCId: this.formVersionCId });
            if (e && e.some(({ valid: e }) => !e))
              throw new $.mN({ type: "form" });
            return !0;
          }
          return !0;
        }
        __requestUniqueID() {
          ((e) => {
            const t = {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify((0, D.Y)(e)),
            };
            return (0, A.Z)(z, t)
              .then((e) => {
                if (e.status >= 500)
                  throw Error(`Error sending request: ${e.url}`);
                return e;
              })
              .then((e) => e.json())
              .then((e) => (0, D._)(e));
          })({
            companyId: this.companyId,
            form_id: this.formId,
            email: this.composedFields[p.HD],
          })
            .then(({ data: { uniqueId: e } }) => {
              void 0 !== e && (0, h.UY)({ smsSubscriptionUniqueId: e });
            })
            .catch(() => {});
        }
        __errorHandler(e) {
          const {
            composedFields: t,
            formId: n,
            companyId: o,
            formAction: i,
          } = this;
          if (
            (l.prototype.__errorHandler.call(this, e),
            ((e) => [$.vS, $.mN].some((t) => e instanceof t))(e))
          )
            throw e;
          (0, d.Cm)({
            id: this.formVersionCId,
            changes: { errorViewMessage: j(e) ? F.gl : F.xl },
          }),
            (0, y.M)({
              metric: j(e) ? Z.yH : Z.DF,
              formVersionCId: this.formVersionCId,
              formId: n,
              companyId: o,
              submittedFields: t,
              listId: null == i ? void 0 : i.listId,
            }),
            (0, $.pS)(e) ||
              j(e) ||
              (0, O.T)(e, {
                tags: { onSubmit: "True" },
                extra: {
                  submitAction: !0,
                  formId: this.formId,
                  companyId: this.companyId,
                },
              });
        }
      };
      const N = () => {
          var e, t, n, o;
          return (
            !(
              null == (e = window.Shopify) ||
              null == (t = e.analytics) ||
              !t.visitor
            ) &&
            "function" ==
              typeof (null == (n = window.Shopify) || null == (o = n.analytics)
                ? void 0
                : o.visitor)
          );
        },
        B = (e, t, n) => {
          const o = !!Object.keys((0, f.fu)(e, t)).length;
          let i = Z.r2;
          return n ? (i = Z.ps) : o && (i = Z.lq), i;
        };
      var R = class extends W {
        submitMetric({
          state: e,
          isSubscribe: t = !1,
          submitMetric: n = Z.dm,
          submitMetricActionType: o = "Submit Form",
        }) {
          var i;
          const r = e.onsiteState.openFormVersions[this.formVersionCId];
          if (!r) throw new Error("Open Form Version does not exist");
          const { currentViewId: s } = r,
            a = B(e, this.formVersionCId, t),
            l = (0, v.E5)(e, s),
            c = null == (i = e.formsState.views[s]) ? void 0 : i.position,
            m = [
              (0, y.M)({
                metric: Z.AH,
                formVersionCId: this.formVersionCId,
                logCustomEvent: !0,
                formId: this.formId,
                companyId: this.companyId,
                submittedFields: Object.assign({}, this.composedFields, {
                  $step_name: l,
                }),
                step_name: l,
                step_number: void 0 !== c ? c + 1 : c,
                action_type: "Submit Step",
              }),
            ];
          return (
            (t || (0, f.Gt)(e, this.formVersionCId, a)) &&
              m.push(
                (0, y.M)({
                  metric: n,
                  logCustomEvent: !0,
                  formVersionCId: this.formVersionCId,
                  formId: this.formId,
                  companyId: this.companyId,
                  submittedFields: this.composedFields,
                  action_type: o,
                })
              ),
            r &&
              Z.us.indexOf(a) < Z.us.indexOf(r.topHierarchySubmitted) &&
              (0, d.fK)({
                id: this.formVersionCId,
                changes: { topHierarchySubmitted: a },
              }),
            Promise.all(m)
          );
        }
        __handler() {
          var e;
          const t = o.Z.getState(),
            n = t.onsiteState.openFormVersions[this.formVersionCId];
          if (!n) throw new Error("Open Form Version does not exist");
          (0, C.ro)(this.composedFields);
          const { formVersionId: i } = n;
          !!Object.values(t.formsState.views)
            .filter((e) => (null == e ? void 0 : e.formVersionId) === i)
            .find(
              (e) =>
                !!e &&
                (0, v.nC)(t, e.viewId).find((e) => {
                  const n = e ? t.formsState.components[e.componentId] : void 0;
                  return !!n && (0, g.FW)(t, n);
                })
            ) &&
            this.composedFields[p.HD] &&
            this.__requestUniqueID();
          const r = (0, g.B0)(t, i);
          if (!(this.composedFields[p.HD] || (this.composedFields[p.lL] && r)))
            return void this.submitMetric({ state: t });
          const s = (0, f.jo)(t, this.formVersionCId);
          return (
            (this.composedFields = Object.assign(
              {},
              this.composedFields,
              s || {}
            )),
            null != (e = t.formsState.formVersions[i]) &&
              e.data.storeUtmParams &&
              (this.composedFields = Object.assign(
                {},
                this.composedFields,
                (0, E.Z)()
              )),
            this.__submitToList()
          );
        }
        async __postHandler(e) {
          var t, n;
          const i = o.Z.getState(),
            r =
              null == i ||
              null == (t = i.onsiteState) ||
              null == (n = t.formSettings)
                ? void 0
                : n.shopifyVisitorApi;
          if (
            null != e &&
            e.status &&
            (null == e ? void 0 : e.status) >= 200 &&
            (null == e ? void 0 : e.status) < 300 &&
            r &&
            N()
          ) {
            const { syncSMSConsent: e, syncEmailConsent: t } = r,
              { [p.HD]: n, [p.lL]: o } = this.composedFields;
            if (!n && !o) return;
            (({ email: e, phone: t }) => {
              if ((e || t) && N()) {
                var n, o;
                let i = {};
                return (
                  e && (i = Object.assign({}, i, { email: e })),
                  t && (i = Object.assign({}, i, { phone: t })),
                  null == (n = window.Shopify) || null == (o = n.analytics)
                    ? void 0
                    : o.visitor(i, { appId: M.cY.shopify.visitorApi.appId })
                );
              }
            })(
              Object.assign(
                {},
                n && t ? { email: n } : {},
                o && e ? { phone: o } : {}
              )
            );
          }
        }
        __submitHandlerCheck(e) {
          const {
            composedFields: t,
            formId: n,
            companyId: o,
            formAction: i,
          } = this;
          if (e !== V.Sz && e !== V.dl)
            throw (
              ((0, d.Cm)({
                id: this.formVersionCId,
                changes: { errorViewMessage: F.xl },
              }),
              (0, y.M)({
                metric: Z.DF,
                formVersionCId: this.formVersionCId,
                formId: n,
                companyId: o,
                submittedFields: t,
                listId: i.listId,
              }),
              new $.vS())
            );
        }
        __submitToList() {
          const { composedFields: e, formId: t, companyId: n } = this,
            i = o.Z.getState(),
            r = (0, f.io)(i, this.formVersionCId),
            s = this.__makePOSTBody({ composedFields: e, requestOTPCode: r });
          return (
            (0, h.x7)(s),
            (0, w.W)(() => (0, _.Y)(n, s), 5, 1e3 + 1e3 * Math.random(), [429])
              .then((e) => {
                if (429 === e.status) throw new $.TT();
                return e;
              })
              .then((e) =>
                e.status === V.Sz && this.formAction.actionType
                  ? ((0, T.$k)({
                      formId: t,
                      successActionType: this.formAction.actionType,
                    }),
                    (0, k.n)(
                      200,
                      this.submitMetric({ state: i, isSubscribe: !0 })
                    )
                      .then(() => e)
                      .catch(() => e))
                  : e
              )
          );
        }
        __makePOSTBody({ composedFields: e, requestOTPCode: t = !1 }) {
          const n = new Date(),
            o = Object.assign(
              {},
              e,
              "object" == typeof window.Shopify && window.Shopify.shop
                ? { services: JSON.stringify({ shopify: { source: "form" } }) }
                : {}
            ),
            { $exchange_id: i } = (0, C.zy)();
          let r = Object.assign({}, o);
          const s = { list_id: this.formAction.listId };
          p.XK.forEach((e) => {
            if (o[e]) {
              const t = o[e];
              Array.isArray(t)
                ? 1 === t.length
                  ? (s.custom_source = t[0])
                  : (s.custom_source = t.join(", "))
                : (s.custom_source = t),
                delete r[e];
            }
          }),
            "email" in o && ((s.email = o.email), delete r.email),
            "$email" in o && ((s.email = o.$email), delete r.$email),
            "sms_consent" in o &&
              (o.sms_consent &&
                ((s.phone_number = o.$phone_number), delete r.$phone_number),
              delete r.sms_consent),
            "sentIdentifiers" in o &&
              ((r = Object.assign({}, r, o.sentIdentifiers)),
              delete r.sentIdentifiers),
            (s.properties = Object.assign(
              {},
              r,
              { $timezone_offset: -n.getTimezoneOffset() / 60 },
              i ? { $exchange_id: i } : {}
            ));
          let a = { data: { type: V.NR, attributes: s } };
          return (
            t && (a = Object.assign({}, a, { meta: { send_otp_code: !0 } })), a
          );
        }
      };
      class H extends R {
        async __postHandler(e) {
          super.__postHandler(e);
          const t = o.Z.getState(),
            n = t.onsiteState.openFormVersions[this.formVersionCId];
          if (!n || !this.formAction.viewId) return null;
          e && this.__submitHandlerCheck(e.status);
          const i = this.formAction.viewId;
          if (
            (0, f.wf)(t, this.formVersionCId) &&
            "string" == typeof this.composedFields[p.HD]
          ) {
            if (
              !(await x(
                t,
                this.composedFields[p.HD],
                i,
                this.formId,
                this.companyId,
                this.formVersionCId,
                n.formVersionId
              ))
            )
              return;
          }
          return (0, d.Cm)({
            id: this.formVersionCId,
            changes: { currentViewId: i },
          });
        }
      }
      H.formActionType = s.p;
      var P = H;
      n(26650), n(51778);
      var L = (e) => {
        window.location.assign(e);
      };
      const q = ["isSubmit"];
      class K extends l {
        constructor(e) {
          var t, n;
          let { isSubmit: o } = e;
          super(r()(e, q)),
            (this.redirectUrl = void 0),
            (this.newWindow = void 0),
            (this.isSubmit = void 0),
            (this.redirectUrl =
              (null == (t = this.formAction.data) ? void 0 : t.redirectUrl) ||
              "about:blank"),
            (this.newWindow =
              !(null == (n = this.formAction.data) || !n.newWindow) &&
              this.formAction.actionType === s.$b),
            (this.isSubmit = !!o),
            (this.formActionType = s.$b);
        }
        __redirectUrl() {
          const e = this.redirectUrl.replace(/^javascript:/, "");
          if (this.newWindow && this.formAction.actionType === s.$b) {
            const t = window.open(e, "_blank");
            null == t || t.focus();
          } else L(e);
        }
        __handler() {
          const { formId: e, newWindow: t, formVersionCId: n } = this;
          this.formAction.actionType === s.$b &&
            (0, T.$k)({ formId: e, successActionType: s.$b });
          const i = o.Z.getState(),
            r = i.onsiteState.openFormVersions[n];
          if (!r) throw new Error("Open Form Version does not exist");
          const a = r.sentSubmitMetric,
            l = i.formsState.views[r.currentViewId],
            d = Promise.allSettled([
              (0, y.M)({
                metric: Z.nR,
                logTelemetric: !this.isSubmit && !a,
                logCustomEvent: !0,
                formVersionCId: this.formVersionCId,
                formId: this.formId,
                companyId: this.companyId,
                action_type: "Go to URL",
                destination_url: this.redirectUrl,
              }),
              (0, y.M)({
                metric: Z._5,
                logTelemetric: !this.isSubmit,
                logCustomEvent: !0,
                formVersionCId: this.formVersionCId,
                formId: this.formId,
                companyId: this.companyId,
                action_type: "Go to URL",
                destination_url: this.redirectUrl,
                step_number: l ? l.position + 1 : void 0,
                step_name: l ? (0, v.E5)(i, l.viewId) : void 0,
              }),
            ]);
          return t
            ? (this.__redirectUrl(), d)
            : (0, k.n)(200, d)
                .then(() => this.__redirectUrl())
                .catch(() => this.__redirectUrl());
        }
      }
      K.formActionType = s.$b;
      var U = K;
      class G extends R {
        __postHandler(e) {
          super.__postHandler(e), e && this.__submitHandlerCheck(e.status);
          const { formVersionCId: t, actionId: n } = this;
          return new U({
            formVersionCId: t,
            actionId: n,
            isSubmit: !0,
          }).runAction();
        }
      }
      G.formActionType = s.uo;
      var Y = G;
      class X extends R {
        __postHandler(e) {
          super.__postHandler(e), e && this.__submitHandlerCheck(e.status);
          const { formVersionCId: t, actionId: n } = this;
          return new u({
            formVersionCId: t,
            actionId: n,
            isSubmit: !0,
          }).runAction();
        }
      }
      X.formActionType = s.Ry;
      var J = X;
      var Q = n(20094);
      const ee = (e, t) => {
          const n = e.onsiteState.openFormVersions[t];
          if (!n) throw new Error("Open Form Version does not exist");
          const { formVersionId: o } = n;
          return (0, g.l1)(e, o, Q.Jq).find((e) => e.componentType === p.Ys);
        },
        te = new Date("1/1/1900");
      function ne(e) {
        return e && 6 === e.length;
      }
      class oe extends l {
        constructor(e) {
          var t, n, i;
          super(e),
            (this.toPhoneNumber = void 0),
            (this.hiddenFieldsComponentId = void 0),
            (this.optInMessage = void 0),
            (this.optInKeyword = void 0);
          const r = o.Z.getState();
          (this.hiddenFieldsComponentId = (0, g.cA)(r, e.actionId)),
            (this.toPhoneNumber =
              null == (t = this.formAction.data) ? void 0 : t.toPhoneNumber),
            (this.optInMessage =
              (null == (n = this.formAction.data) ? void 0 : n.optInMessage) ||
              "Send this text to subscribe to SMS updates!"),
            (this.optInKeyword =
              (null == (i = this.formAction.data) ? void 0 : i.optInKeyword) ||
              "JOIN"),
            (this.formActionType = s.T5);
        }
        async __preHandler() {
          const e = o.Z.getState(),
            t = ee(e, this.formVersionCId);
          if (void 0 !== t) {
            var n;
            const e =
              null ==
              (n = await (0, d.eN)({ formVersionCId: this.formVersionCId }))
                ? void 0
                : n.filter((e) => e.componentId === t.componentId);
            if (e && e.some(({ valid: e }) => !e))
              throw new $.mN({ type: "form" });
          }
          return !0;
        }
        __handler() {
          const e = o.Z.getState(),
            t = ((e, t, n) => {
              const o = ee(e, t);
              if (
                o &&
                void 0 !== (s = o).data.format &&
                void 0 !== s.data.delimiter
              ) {
                var i, r;
                const o = (0, f.$f)(e, t, n),
                  s =
                    (null == (i = e.onsiteState.openFormVersions[t]) ||
                    null == (r = i.sentIdentifiers)
                      ? void 0
                      : r[p.vC]) || o[p.vC];
                if (!s) return;
                const a = new Date(s).getTime() - te.getTime();
                return Math.round(a / 864e5).toString(36);
              }
              var s;
            })(e, this.formVersionCId, this.hiddenFieldsComponentId),
            n = e.onsiteState.client.smsSubscriptionUniqueId,
            i = ((e, t, n) =>
              ne(t) && n
                ? `${e}:${t}:${n}`
                : n
                ? `${e}:$kbday:${n}`
                : ne(t)
                ? `${e}:${t}`
                : `${e}`)(this.optInKeyword, n, t),
            r = `sms:${this.toPhoneNumber}?&body=${encodeURIComponent(
              `${this.optInMessage} (ref:${i})`
            )}`;
          (0, T.$k)({ formId: this.formId, successActionType: s.T5 }),
            (0, d.et)({ formVersionCId: this.formVersionCId, isSubmit: !0 });
          const a = B(e, this.formVersionCId, !0),
            l = e.onsiteState.openFormVersions[this.formVersionCId],
            c = l ? e.formsState.views[l.currentViewId] : void 0,
            m = [];
          (0, f.Gt)(e, this.formVersionCId, a) &&
            m.push(
              (0, y.M)({
                metric: Z.FB,
                logCustomEvent: !0,
                formVersionCId: this.formVersionCId,
                formId: this.formId,
                companyId: this.companyId,
                action_type: "Subscribe Via SMS",
                sms_keyword: this.optInKeyword,
                destination_url: r,
              })
            ),
            c &&
              m.push(
                (0, y.M)({
                  metric: Z.AH,
                  formVersionCId: this.formVersionCId,
                  logCustomEvent: !0,
                  formId: this.formId,
                  companyId: this.companyId,
                  step_number: c.position + 1,
                  step_name: (0, v.E5)(e, c.viewId),
                  action_type: "Subscribe Via SMS",
                })
              );
          const u = Promise.allSettled(m);
          return (0, k.n)(200, u)
            .then(() => L(r))
            .catch(() => L(r));
        }
      }
      oe.formActionType = s.T5;
      var ie = oe;
      class re extends P {}
      re.formActionType = s.hL;
      var se = re,
        ae = n(38211),
        le = n.n(ae);
      let de;
      class ce extends W {
        constructor(e) {
          super(Object.assign({}, (le()(e), e))),
            (this.isSubmit = void 0),
            (this.isSubmit = !1),
            (this.formActionType = s.WP),
            (de = null),
            this.startTimer();
        }
        startTimer() {
          de = setTimeout(() => {
            de = null;
          }, 5e3);
        }
        __handler() {
          if (null !== de)
            return (
              (0, a.qB)(
                "ResendOptInCodeAction - Resend opt in code action is currently debouncing."
              ),
              Promise.resolve()
            );
          this.startTimer();
          const e = o.Z.getState(),
            { previousFormSubmitBody: t } = e.onsiteState.client,
            n =
              (null == t ? void 0 : t.data.attributes[p.lL]) ||
              (null == t ? void 0 : t.data.attributes[p.HO]);
          if (!n || !t.data.attributes.list_id)
            throw new Error(
              "Cannot resend opt in code. No previous form submit with phone number and or list id found."
            );
          const i = { list_id: t.data.attributes.list_id, [p.HO]: n };
          return (
            (0, y.M)({
              metric: Z.Eo,
              formVersionCId: this.formVersionCId,
              formId: this.formId,
              companyId: this.companyId,
              submittedFields: i,
            }),
            (0, _.Y)(this.companyId, {
              data: { type: V.NR, attributes: i },
              meta: { send_otp_code: !0 },
            })
          );
        }
      }
      ce.formActionType = s.WP;
      var me = ce,
        ue = n(85678);
      const fe = `${M.bl.url}/client/otp-verify`;
      var pe = n(81962);
      const he = ["isSubmit"],
        ye = "invalidCode";
      class ge extends R {
        constructor(e) {
          super(r()(e, he)),
            (this.isSubmit = void 0),
            (this.isSubmit = !0),
            (this.formActionType = s.Kc);
        }
        __handler() {
          const e = o.Z.getState();
          if (!e.onsiteState.openFormVersions[this.formVersionCId])
            throw new Error("Open Form Version does not exist");
          const { previousFormSubmitBody: t } = e.onsiteState.client,
            n =
              (null == t ? void 0 : t.data.attributes[p.lL]) ||
              (null == t ? void 0 : t.data.attributes[p.HO]),
            i = this.composedFields[p.My];
          if (!t || !n || !i || "string" != typeof n || "string" != typeof i)
            throw new Error(
              `Cannot submit opt in code. Previously submitted phone number and token must both be present: ${JSON.stringify(
                { phoneNumber: n, token: i }
              )}`
            );
          return (
            this.submitMetric({
              state: e,
              submitMetric: Z.Jv,
              isSubscribe: !0,
            }),
            (0, w.W)(
              () =>
                (async ({ companyId: e, phoneNumber: t, token: n }) => (
                  await (0, ue.l)(),
                  (0, A.Z)(`${fe}?company_id=${e}`, {
                    method: "POST",
                    headers: {
                      "Access-Control-Allow-Headers": "*",
                      "Content-Type": "application/json",
                      "X-Klaviyo-Onsite": "1",
                    },
                    body: JSON.stringify({
                      token: n,
                      channel: "sms",
                      destination: t,
                      company_id: e,
                    }),
                  })
                ))({ companyId: this.companyId, phoneNumber: n, token: i }),
              5,
              1e3 + 1e3 * Math.random(),
              [429]
            )
              .then((e) => {
                if (429 === e.status) throw new $.TT();
                return e;
              })
              .then((t) => {
                var n;
                const { formVersionCId: o } = this,
                  i =
                    null == (n = e.onsiteState.openFormVersions[o])
                      ? void 0
                      : n.formVersionId;
                if (t.status === V.ke && i) {
                  const t = (0, pe.G)(e, i)[0],
                    n = (0, v.nC)(e, t).find(
                      (e) => (null == e ? void 0 : e.componentType) === p.eC
                    );
                  if (n)
                    throw (
                      ((0, d.hX)({
                        componentId: null == n ? void 0 : n.componentId,
                        formVersionCId: o,
                        violation: {
                          componentId: null == n ? void 0 : n.componentId,
                          valid: !1,
                          validationErrorType: ye,
                        },
                      }),
                      new $.mN({ type: ye }))
                    );
                }
                return t;
              })
              .then((t) =>
                t.status === V.dl && this.formAction.actionType
                  ? ((0, T.$k)({
                      formId: this.formId,
                      successActionType: this.formAction.actionType,
                    }),
                    (0, k.n)(
                      200,
                      this.submitMetric({ state: e, isSubscribe: !0 })
                    )
                      .then(() => t)
                      .catch(() => t))
                  : t
              )
          );
        }
        async __postHandler(e) {
          super.__postHandler(e);
          if (
            !o.Z.getState().onsiteState.openFormVersions[this.formVersionCId] ||
            !this.formAction.viewId
          )
            return null;
          if ((null == e ? void 0 : e.status) === V.ke) return null;
          e && this.__submitHandlerCheck(e.status);
          const t = this.formAction.viewId;
          return (0, d.Cm)({
            id: this.formVersionCId,
            changes: { currentViewId: t },
          });
        }
      }
      ge.formActionType = s.Kc;
      var ve = ge;
      const be = {
          [u.formActionType]: u,
          [P.formActionType]: P,
          [se.formActionType]: se,
          [U.formActionType]: U,
          [J.formActionType]: J,
          [Y.formActionType]: Y,
          [ie.formActionType]: ie,
          [me.formActionType]: me,
          [ve.formActionType]: ve,
        },
        Ie = ({ actionId: e }) => {
          var t;
          const n = o.Z.getState(),
            i = n.formsState.actions
              ? null == (t = n.formsState.actions[e])
                ? void 0
                : t.actionType
              : void 0;
          return be[i];
        };
    },
    84001: function (e, t, n) {
      n.d(t, {
        s: function () {
          return o;
        },
      });
      const o = {
        animationTimingFunction: "ease",
        animationPlayState: "running",
        animationDelay: "0s",
        animationIterationCount: 1,
        animationFillMode: "forwards",
      };
    },
    94482: function (e, t, n) {
      n.d(t, {
        B: function () {
          return o;
        },
      });
      const o = 9e4;
    },
    75356: function (e, t, n) {
      n.d(t, {
        A: function () {
          return i;
        },
        p: function () {
          return o;
        },
      });
      const o = "teaser",
        i = "component";
    },
    44731: function (e, t) {
      t.Z = (e, t) => (e / (e + 1)) * t;
    },
  },
]);
