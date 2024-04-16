(() => {
  "use strict";
  var e = {
      1187: (e, t) => {
        var a, n;
        (t.InteractionModes = void 0),
          (function (e) {
            (e.DEVICE_BEST = "DEVICE_BEST"),
              (e.ON_PAGE = "ON_PAGE"),
              (e.IFRAME = "IFRAME"),
              (e.REDIRECT = "REDIRECT");
          })(a || (t.InteractionModes = a = {})),
          (function (e) {
            (e.MOBILE = "MOBILE"),
              (e.DESKTOP = "DESKTOP"),
              (e.WEBVIEW = "WEBVIEW"),
              (e.UNKNOWN = "UNKNOWN");
          })(n || (n = {}));
      },
    },
    t = {};
  function a(n) {
    var s = t[n];
    if (void 0 !== s) return s.exports;
    var i = (t[n] = { exports: {} });
    return e[n](i, i.exports, a), i.exports;
  }
  (() => {
    const e = /(\.klarna\.com|\.klarna\.net|^x\.klarnacdn\.net)$/u;
    var t, n;
    !(function (e) {
      (e.assertEqual = (e) => e),
        (e.assertIs = function () {}),
        (e.assertNever = function () {
          throw new Error();
        }),
        (e.arrayToEnum = (e) => {
          const t = {};
          for (const a of e) t[a] = a;
          return t;
        }),
        (e.getValidEnumValues = (t) => {
          const a = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
            n = {};
          for (const e of a) n[e] = t[e];
          return e.objectValues(n);
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
                for (const a in e)
                  Object.prototype.hasOwnProperty.call(e, a) && t.push(a);
                return t;
              }),
        (e.find = (e, t) => {
          for (const a of e) if (t(a)) return a;
        }),
        (e.isInteger =
          "function" == typeof Number.isInteger
            ? (e) => Number.isInteger(e)
            : (e) =>
                "number" == typeof e && isFinite(e) && Math.floor(e) === e),
        (e.joinValues = function (e, t = " | ") {
          return e.map((e) => ("string" == typeof e ? `'${e}'` : e)).join(t);
        }),
        (e.jsonStringifyReplacer = (e, t) =>
          "bigint" == typeof t ? t.toString() : t);
    })(t || (t = {})),
      (function (e) {
        e.mergeShapes = (e, t) => ({ ...e, ...t });
      })(n || (n = {}));
    const s = t.arrayToEnum([
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
      i = (e) => {
        switch (typeof e) {
          case "undefined":
            return s.undefined;
          case "string":
            return s.string;
          case "number":
            return isNaN(e) ? s.nan : s.number;
          case "boolean":
            return s.boolean;
          case "function":
            return s.function;
          case "bigint":
            return s.bigint;
          case "symbol":
            return s.symbol;
          case "object":
            return Array.isArray(e)
              ? s.array
              : null === e
              ? s.null
              : e.then &&
                "function" == typeof e.then &&
                e.catch &&
                "function" == typeof e.catch
              ? s.promise
              : "undefined" != typeof Map && e instanceof Map
              ? s.map
              : "undefined" != typeof Set && e instanceof Set
              ? s.set
              : "undefined" != typeof Date && e instanceof Date
              ? s.date
              : s.object;
          default:
            return s.unknown;
        }
      },
      r = t.arrayToEnum([
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
    class o extends Error {
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
          a = { _errors: [] },
          n = (e) => {
            for (const s of e.issues)
              if ("invalid_union" === s.code) s.unionErrors.map(n);
              else if ("invalid_return_type" === s.code) n(s.returnTypeError);
              else if ("invalid_arguments" === s.code) n(s.argumentsError);
              else if (0 === s.path.length) a._errors.push(t(s));
              else {
                let e = a,
                  n = 0;
                for (; n < s.path.length; ) {
                  const a = s.path[n];
                  n === s.path.length - 1
                    ? ((e[a] = e[a] || { _errors: [] }),
                      e[a]._errors.push(t(s)))
                    : (e[a] = e[a] || { _errors: [] }),
                    (e = e[a]),
                    n++;
                }
              }
          };
        return n(this), a;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, t.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return 0 === this.issues.length;
      }
      flatten(e = (e) => e.message) {
        const t = {},
          a = [];
        for (const n of this.issues)
          n.path.length > 0
            ? ((t[n.path[0]] = t[n.path[0]] || []), t[n.path[0]].push(e(n)))
            : a.push(e(n));
        return { formErrors: a, fieldErrors: t };
      }
      get formErrors() {
        return this.flatten();
      }
    }
    o.create = (e) => new o(e);
    const d = (e, a) => {
      let n;
      switch (e.code) {
        case r.invalid_type:
          n =
            e.received === s.undefined
              ? "Required"
              : `Expected ${e.expected}, received ${e.received}`;
          break;
        case r.invalid_literal:
          n = `Invalid literal value, expected ${JSON.stringify(
            e.expected,
            t.jsonStringifyReplacer
          )}`;
          break;
        case r.unrecognized_keys:
          n = `Unrecognized key(s) in object: ${t.joinValues(e.keys, ", ")}`;
          break;
        case r.invalid_union:
          n = "Invalid input";
          break;
        case r.invalid_union_discriminator:
          n = `Invalid discriminator value. Expected ${t.joinValues(
            e.options
          )}`;
          break;
        case r.invalid_enum_value:
          n = `Invalid enum value. Expected ${t.joinValues(
            e.options
          )}, received '${e.received}'`;
          break;
        case r.invalid_arguments:
          n = "Invalid function arguments";
          break;
        case r.invalid_return_type:
          n = "Invalid function return type";
          break;
        case r.invalid_date:
          n = "Invalid date";
          break;
        case r.invalid_string:
          "object" == typeof e.validation
            ? "includes" in e.validation
              ? ((n = `Invalid input: must include "${e.validation.includes}"`),
                "number" == typeof e.validation.position &&
                  (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
              : "startsWith" in e.validation
              ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
              : "endsWith" in e.validation
              ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
              : t.assertNever(e.validation)
            : (n =
                "regex" !== e.validation
                  ? `Invalid ${e.validation}`
                  : "Invalid");
          break;
        case r.too_small:
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
        case r.too_big:
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
        case r.custom:
          n = "Invalid input";
          break;
        case r.invalid_intersection_types:
          n = "Intersection results could not be merged";
          break;
        case r.not_multiple_of:
          n = `Number must be a multiple of ${e.multipleOf}`;
          break;
        case r.not_finite:
          n = "Number must be finite";
          break;
        default:
          (n = a.defaultError), t.assertNever(e);
      }
      return { message: n };
    };
    let u = d;
    function c(e, t) {
      const a = ((e) => {
        const { data: t, path: a, errorMaps: n, issueData: s } = e,
          i = [...a, ...(s.path || [])],
          r = { ...s, path: i };
        let o = "";
        const d = n
          .filter((e) => !!e)
          .slice()
          .reverse();
        for (const e of d) o = e(r, { data: t, defaultError: o }).message;
        return { ...s, path: i, message: s.message || o };
      })({
        issueData: t,
        data: e.data,
        path: e.path,
        errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, u, d].filter(
          (e) => !!e
        ),
      });
      e.common.issues.push(a);
    }
    class l {
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
        const a = [];
        for (const n of t) {
          if ("aborted" === n.status) return p;
          "dirty" === n.status && e.dirty(), a.push(n.value);
        }
        return { status: e.value, value: a };
      }
      static async mergeObjectAsync(e, t) {
        const a = [];
        for (const e of t) a.push({ key: await e.key, value: await e.value });
        return l.mergeObjectSync(e, a);
      }
      static mergeObjectSync(e, t) {
        const a = {};
        for (const n of t) {
          const { key: t, value: s } = n;
          if ("aborted" === t.status) return p;
          if ("aborted" === s.status) return p;
          "dirty" === t.status && e.dirty(),
            "dirty" === s.status && e.dirty(),
            "__proto__" === t.value ||
              (void 0 === s.value && !n.alwaysSet) ||
              (a[t.value] = s.value);
        }
        return { status: e.value, value: a };
      }
    }
    const p = Object.freeze({ status: "aborted" }),
      h = (e) => ({ status: "valid", value: e }),
      m = (e) => "aborted" === e.status,
      f = (e) => "dirty" === e.status,
      y = (e) => "valid" === e.status,
      _ = (e) => "undefined" != typeof Promise && e instanceof Promise;
    var g;
    !(function (e) {
      (e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
        (e.toString = (e) =>
          "string" == typeof e ? e : null == e ? void 0 : e.message);
    })(g || (g = {}));
    class v {
      constructor(e, t, a, n) {
        (this._cachedPath = []),
          (this.parent = e),
          (this.data = t),
          (this._path = a),
          (this._key = n);
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
    const k = (e, t) => {
      if (y(t)) return { success: !0, data: t.value };
      if (!e.common.issues.length)
        throw new Error("Validation failed but no issues detected.");
      return {
        success: !1,
        get error() {
          if (this._error) return this._error;
          const t = new o(e.common.issues);
          return (this._error = t), this._error;
        },
      };
    };
    function x(e) {
      if (!e) return {};
      const {
        errorMap: t,
        invalid_type_error: a,
        required_error: n,
        description: s,
      } = e;
      if (t && (a || n))
        throw new Error(
          'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
        );
      return t
        ? { errorMap: t, description: s }
        : {
            errorMap: (e, t) =>
              "invalid_type" !== e.code
                ? { message: t.defaultError }
                : void 0 === t.data
                ? { message: null != n ? n : t.defaultError }
                : { message: null != a ? a : t.defaultError },
            description: s,
          };
    }
    class b {
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
        return i(e.data);
      }
      _getOrReturnCtx(e, t) {
        return (
          t || {
            common: e.parent.common,
            data: e.data,
            parsedType: i(e.data),
            schemaErrorMap: this._def.errorMap,
            path: e.path,
            parent: e.parent,
          }
        );
      }
      _processInputParams(e) {
        return {
          status: new l(),
          ctx: {
            common: e.parent.common,
            data: e.data,
            parsedType: i(e.data),
            schemaErrorMap: this._def.errorMap,
            path: e.path,
            parent: e.parent,
          },
        };
      }
      _parseSync(e) {
        const t = this._parse(e);
        if (_(t)) throw new Error("Synchronous parse encountered promise.");
        return t;
      }
      _parseAsync(e) {
        const t = this._parse(e);
        return Promise.resolve(t);
      }
      parse(e, t) {
        const a = this.safeParse(e, t);
        if (a.success) return a.data;
        throw a.error;
      }
      safeParse(e, t) {
        var a;
        const n = {
            common: {
              issues: [],
              async:
                null !== (a = null == t ? void 0 : t.async) &&
                void 0 !== a &&
                a,
              contextualErrorMap: null == t ? void 0 : t.errorMap,
            },
            path: (null == t ? void 0 : t.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: i(e),
          },
          s = this._parseSync({ data: e, path: n.path, parent: n });
        return k(n, s);
      }
      async parseAsync(e, t) {
        const a = await this.safeParseAsync(e, t);
        if (a.success) return a.data;
        throw a.error;
      }
      async safeParseAsync(e, t) {
        const a = {
            common: {
              issues: [],
              contextualErrorMap: null == t ? void 0 : t.errorMap,
              async: !0,
            },
            path: (null == t ? void 0 : t.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: i(e),
          },
          n = this._parse({ data: e, path: a.path, parent: a }),
          s = await (_(n) ? n : Promise.resolve(n));
        return k(a, s);
      }
      refine(e, t) {
        const a = (e) =>
          "string" == typeof t || void 0 === t
            ? { message: t }
            : "function" == typeof t
            ? t(e)
            : t;
        return this._refinement((t, n) => {
          const s = e(t),
            i = () => n.addIssue({ code: r.custom, ...a(t) });
          return "undefined" != typeof Promise && s instanceof Promise
            ? s.then((e) => !!e || (i(), !1))
            : !!s || (i(), !1);
        });
      }
      refinement(e, t) {
        return this._refinement(
          (a, n) =>
            !!e(a) || (n.addIssue("function" == typeof t ? t(a, n) : t), !1)
        );
      }
      _refinement(e) {
        return new ie({
          schema: this,
          typeName: me.ZodEffects,
          effect: { type: "refinement", refinement: e },
        });
      }
      superRefine(e) {
        return this._refinement(e);
      }
      optional() {
        return re.create(this, this._def);
      }
      nullable() {
        return oe.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return K.create(this, this._def);
      }
      promise() {
        return se.create(this, this._def);
      }
      or(e) {
        return W.create([this, e], this._def);
      }
      and(e) {
        return H.create(this, e, this._def);
      }
      transform(e) {
        return new ie({
          ...x(this._def),
          schema: this,
          typeName: me.ZodEffects,
          effect: { type: "transform", transform: e },
        });
      }
      default(e) {
        const t = "function" == typeof e ? e : () => e;
        return new de({
          ...x(this._def),
          innerType: this,
          defaultValue: t,
          typeName: me.ZodDefault,
        });
      }
      brand() {
        return new le({ typeName: me.ZodBranded, type: this, ...x(this._def) });
      }
      catch(e) {
        const t = "function" == typeof e ? e : () => e;
        return new ue({
          ...x(this._def),
          innerType: this,
          catchValue: t,
          typeName: me.ZodCatch,
        });
      }
      describe(e) {
        return new (0, this.constructor)({ ...this._def, description: e });
      }
      pipe(e) {
        return pe.create(this, e);
      }
      readonly() {
        return he.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    }
    const w = /^c[^\s-]{8,}$/i,
      T = /^[a-z][a-z0-9]*$/,
      S = /^[0-9A-HJKMNP-TV-Z]{26}$/,
      O =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
      I =
        /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    let A;
    const C =
        /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,
      E =
        /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
    class Z extends b {
      _parse(e) {
        if (
          (this._def.coerce && (e.data = String(e.data)),
          this._getType(e) !== s.string)
        ) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.string,
              received: t.parsedType,
            }),
            p
          );
        }
        const a = new l();
        let n;
        for (const s of this._def.checks)
          if ("min" === s.kind)
            e.data.length < s.value &&
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                code: r.too_small,
                minimum: s.value,
                type: "string",
                inclusive: !0,
                exact: !1,
                message: s.message,
              }),
              a.dirty());
          else if ("max" === s.kind)
            e.data.length > s.value &&
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                code: r.too_big,
                maximum: s.value,
                type: "string",
                inclusive: !0,
                exact: !1,
                message: s.message,
              }),
              a.dirty());
          else if ("length" === s.kind) {
            const t = e.data.length > s.value,
              i = e.data.length < s.value;
            (t || i) &&
              ((n = this._getOrReturnCtx(e, n)),
              t
                ? c(n, {
                    code: r.too_big,
                    maximum: s.value,
                    type: "string",
                    inclusive: !0,
                    exact: !0,
                    message: s.message,
                  })
                : i &&
                  c(n, {
                    code: r.too_small,
                    minimum: s.value,
                    type: "string",
                    inclusive: !0,
                    exact: !0,
                    message: s.message,
                  }),
              a.dirty());
          } else if ("email" === s.kind)
            I.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                validation: "email",
                code: r.invalid_string,
                message: s.message,
              }),
              a.dirty());
          else if ("emoji" === s.kind)
            A ||
              (A = new RegExp(
                "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
                "u"
              )),
              A.test(e.data) ||
                ((n = this._getOrReturnCtx(e, n)),
                c(n, {
                  validation: "emoji",
                  code: r.invalid_string,
                  message: s.message,
                }),
                a.dirty());
          else if ("uuid" === s.kind)
            O.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                validation: "uuid",
                code: r.invalid_string,
                message: s.message,
              }),
              a.dirty());
          else if ("cuid" === s.kind)
            w.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                validation: "cuid",
                code: r.invalid_string,
                message: s.message,
              }),
              a.dirty());
          else if ("cuid2" === s.kind)
            T.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                validation: "cuid2",
                code: r.invalid_string,
                message: s.message,
              }),
              a.dirty());
          else if ("ulid" === s.kind)
            S.test(e.data) ||
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                validation: "ulid",
                code: r.invalid_string,
                message: s.message,
              }),
              a.dirty());
          else if ("url" === s.kind)
            try {
              new URL(e.data);
            } catch (t) {
              (n = this._getOrReturnCtx(e, n)),
                c(n, {
                  validation: "url",
                  code: r.invalid_string,
                  message: s.message,
                }),
                a.dirty();
            }
          else
            "regex" === s.kind
              ? ((s.regex.lastIndex = 0),
                s.regex.test(e.data) ||
                  ((n = this._getOrReturnCtx(e, n)),
                  c(n, {
                    validation: "regex",
                    code: r.invalid_string,
                    message: s.message,
                  }),
                  a.dirty()))
              : "trim" === s.kind
              ? (e.data = e.data.trim())
              : "includes" === s.kind
              ? e.data.includes(s.value, s.position) ||
                ((n = this._getOrReturnCtx(e, n)),
                c(n, {
                  code: r.invalid_string,
                  validation: { includes: s.value, position: s.position },
                  message: s.message,
                }),
                a.dirty())
              : "toLowerCase" === s.kind
              ? (e.data = e.data.toLowerCase())
              : "toUpperCase" === s.kind
              ? (e.data = e.data.toUpperCase())
              : "startsWith" === s.kind
              ? e.data.startsWith(s.value) ||
                ((n = this._getOrReturnCtx(e, n)),
                c(n, {
                  code: r.invalid_string,
                  validation: { startsWith: s.value },
                  message: s.message,
                }),
                a.dirty())
              : "endsWith" === s.kind
              ? e.data.endsWith(s.value) ||
                ((n = this._getOrReturnCtx(e, n)),
                c(n, {
                  code: r.invalid_string,
                  validation: { endsWith: s.value },
                  message: s.message,
                }),
                a.dirty())
              : "datetime" === s.kind
              ? ((d = s).precision
                  ? d.offset
                    ? new RegExp(
                        `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${d.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`
                      )
                    : new RegExp(
                        `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${d.precision}}Z$`
                      )
                  : 0 === d.precision
                  ? d.offset
                    ? new RegExp(
                        "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"
                      )
                    : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")
                  : d.offset
                  ? new RegExp(
                      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"
                    )
                  : new RegExp(
                      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$"
                    )
                ).test(e.data) ||
                ((n = this._getOrReturnCtx(e, n)),
                c(n, {
                  code: r.invalid_string,
                  validation: "datetime",
                  message: s.message,
                }),
                a.dirty())
              : "ip" === s.kind
              ? ((i = e.data),
                (("v4" !== (o = s.version) && o) || !C.test(i)) &&
                  (("v6" !== o && o) || !E.test(i)) &&
                  ((n = this._getOrReturnCtx(e, n)),
                  c(n, {
                    validation: "ip",
                    code: r.invalid_string,
                    message: s.message,
                  }),
                  a.dirty()))
              : t.assertNever(s);
        var i, o, d;
        return { status: a.value, value: e.data };
      }
      _regex(e, t, a) {
        return this.refinement((t) => e.test(t), {
          validation: t,
          code: r.invalid_string,
          ...g.errToObj(a),
        });
      }
      _addCheck(e) {
        return new Z({ ...this._def, checks: [...this._def.checks, e] });
      }
      email(e) {
        return this._addCheck({ kind: "email", ...g.errToObj(e) });
      }
      url(e) {
        return this._addCheck({ kind: "url", ...g.errToObj(e) });
      }
      emoji(e) {
        return this._addCheck({ kind: "emoji", ...g.errToObj(e) });
      }
      uuid(e) {
        return this._addCheck({ kind: "uuid", ...g.errToObj(e) });
      }
      cuid(e) {
        return this._addCheck({ kind: "cuid", ...g.errToObj(e) });
      }
      cuid2(e) {
        return this._addCheck({ kind: "cuid2", ...g.errToObj(e) });
      }
      ulid(e) {
        return this._addCheck({ kind: "ulid", ...g.errToObj(e) });
      }
      ip(e) {
        return this._addCheck({ kind: "ip", ...g.errToObj(e) });
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
                null !== (t = null == e ? void 0 : e.offset) &&
                void 0 !== t &&
                t,
              ...g.errToObj(null == e ? void 0 : e.message),
            });
      }
      regex(e, t) {
        return this._addCheck({ kind: "regex", regex: e, ...g.errToObj(t) });
      }
      includes(e, t) {
        return this._addCheck({
          kind: "includes",
          value: e,
          position: null == t ? void 0 : t.position,
          ...g.errToObj(null == t ? void 0 : t.message),
        });
      }
      startsWith(e, t) {
        return this._addCheck({
          kind: "startsWith",
          value: e,
          ...g.errToObj(t),
        });
      }
      endsWith(e, t) {
        return this._addCheck({ kind: "endsWith", value: e, ...g.errToObj(t) });
      }
      min(e, t) {
        return this._addCheck({ kind: "min", value: e, ...g.errToObj(t) });
      }
      max(e, t) {
        return this._addCheck({ kind: "max", value: e, ...g.errToObj(t) });
      }
      length(e, t) {
        return this._addCheck({ kind: "length", value: e, ...g.errToObj(t) });
      }
      nonempty(e) {
        return this.min(1, g.errToObj(e));
      }
      trim() {
        return new Z({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }],
        });
      }
      toLowerCase() {
        return new Z({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
      }
      toUpperCase() {
        return new Z({
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
    function N(e, t) {
      const a = (e.toString().split(".")[1] || "").length,
        n = (t.toString().split(".")[1] || "").length,
        s = a > n ? a : n;
      return (
        (parseInt(e.toFixed(s).replace(".", "")) %
          parseInt(t.toFixed(s).replace(".", ""))) /
        Math.pow(10, s)
      );
    }
    Z.create = (e) => {
      var t;
      return new Z({
        checks: [],
        typeName: me.ZodString,
        coerce:
          null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
        ...x(e),
      });
    };
    class R extends b {
      constructor() {
        super(...arguments),
          (this.min = this.gte),
          (this.max = this.lte),
          (this.step = this.multipleOf);
      }
      _parse(e) {
        if (
          (this._def.coerce && (e.data = Number(e.data)),
          this._getType(e) !== s.number)
        ) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.number,
              received: t.parsedType,
            }),
            p
          );
        }
        let a;
        const n = new l();
        for (const s of this._def.checks)
          "int" === s.kind
            ? t.isInteger(e.data) ||
              ((a = this._getOrReturnCtx(e, a)),
              c(a, {
                code: r.invalid_type,
                expected: "integer",
                received: "float",
                message: s.message,
              }),
              n.dirty())
            : "min" === s.kind
            ? (s.inclusive ? e.data < s.value : e.data <= s.value) &&
              ((a = this._getOrReturnCtx(e, a)),
              c(a, {
                code: r.too_small,
                minimum: s.value,
                type: "number",
                inclusive: s.inclusive,
                exact: !1,
                message: s.message,
              }),
              n.dirty())
            : "max" === s.kind
            ? (s.inclusive ? e.data > s.value : e.data >= s.value) &&
              ((a = this._getOrReturnCtx(e, a)),
              c(a, {
                code: r.too_big,
                maximum: s.value,
                type: "number",
                inclusive: s.inclusive,
                exact: !1,
                message: s.message,
              }),
              n.dirty())
            : "multipleOf" === s.kind
            ? 0 !== N(e.data, s.value) &&
              ((a = this._getOrReturnCtx(e, a)),
              c(a, {
                code: r.not_multiple_of,
                multipleOf: s.value,
                message: s.message,
              }),
              n.dirty())
            : "finite" === s.kind
            ? Number.isFinite(e.data) ||
              ((a = this._getOrReturnCtx(e, a)),
              c(a, { code: r.not_finite, message: s.message }),
              n.dirty())
            : t.assertNever(s);
        return { status: n.value, value: e.data };
      }
      gte(e, t) {
        return this.setLimit("min", e, !0, g.toString(t));
      }
      gt(e, t) {
        return this.setLimit("min", e, !1, g.toString(t));
      }
      lte(e, t) {
        return this.setLimit("max", e, !0, g.toString(t));
      }
      lt(e, t) {
        return this.setLimit("max", e, !1, g.toString(t));
      }
      setLimit(e, t, a, n) {
        return new R({
          ...this._def,
          checks: [
            ...this._def.checks,
            { kind: e, value: t, inclusive: a, message: g.toString(n) },
          ],
        });
      }
      _addCheck(e) {
        return new R({ ...this._def, checks: [...this._def.checks, e] });
      }
      int(e) {
        return this._addCheck({ kind: "int", message: g.toString(e) });
      }
      positive(e) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: !1,
          message: g.toString(e),
        });
      }
      negative(e) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: !1,
          message: g.toString(e),
        });
      }
      nonpositive(e) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: !0,
          message: g.toString(e),
        });
      }
      nonnegative(e) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: !0,
          message: g.toString(e),
        });
      }
      multipleOf(e, t) {
        return this._addCheck({
          kind: "multipleOf",
          value: e,
          message: g.toString(t),
        });
      }
      finite(e) {
        return this._addCheck({ kind: "finite", message: g.toString(e) });
      }
      safe(e) {
        return this._addCheck({
          kind: "min",
          inclusive: !0,
          value: Number.MIN_SAFE_INTEGER,
          message: g.toString(e),
        })._addCheck({
          kind: "max",
          inclusive: !0,
          value: Number.MAX_SAFE_INTEGER,
          message: g.toString(e),
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
            "int" === e.kind ||
            ("multipleOf" === e.kind && t.isInteger(e.value))
        );
      }
      get isFinite() {
        let e = null,
          t = null;
        for (const a of this._def.checks) {
          if (
            "finite" === a.kind ||
            "int" === a.kind ||
            "multipleOf" === a.kind
          )
            return !0;
          "min" === a.kind
            ? (null === t || a.value > t) && (t = a.value)
            : "max" === a.kind && (null === e || a.value < e) && (e = a.value);
        }
        return Number.isFinite(t) && Number.isFinite(e);
      }
    }
    R.create = (e) =>
      new R({
        checks: [],
        typeName: me.ZodNumber,
        coerce: (null == e ? void 0 : e.coerce) || !1,
        ...x(e),
      });
    class P extends b {
      constructor() {
        super(...arguments), (this.min = this.gte), (this.max = this.lte);
      }
      _parse(e) {
        if (
          (this._def.coerce && (e.data = BigInt(e.data)),
          this._getType(e) !== s.bigint)
        ) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.bigint,
              received: t.parsedType,
            }),
            p
          );
        }
        let a;
        const n = new l();
        for (const s of this._def.checks)
          "min" === s.kind
            ? (s.inclusive ? e.data < s.value : e.data <= s.value) &&
              ((a = this._getOrReturnCtx(e, a)),
              c(a, {
                code: r.too_small,
                type: "bigint",
                minimum: s.value,
                inclusive: s.inclusive,
                message: s.message,
              }),
              n.dirty())
            : "max" === s.kind
            ? (s.inclusive ? e.data > s.value : e.data >= s.value) &&
              ((a = this._getOrReturnCtx(e, a)),
              c(a, {
                code: r.too_big,
                type: "bigint",
                maximum: s.value,
                inclusive: s.inclusive,
                message: s.message,
              }),
              n.dirty())
            : "multipleOf" === s.kind
            ? e.data % s.value !== BigInt(0) &&
              ((a = this._getOrReturnCtx(e, a)),
              c(a, {
                code: r.not_multiple_of,
                multipleOf: s.value,
                message: s.message,
              }),
              n.dirty())
            : t.assertNever(s);
        return { status: n.value, value: e.data };
      }
      gte(e, t) {
        return this.setLimit("min", e, !0, g.toString(t));
      }
      gt(e, t) {
        return this.setLimit("min", e, !1, g.toString(t));
      }
      lte(e, t) {
        return this.setLimit("max", e, !0, g.toString(t));
      }
      lt(e, t) {
        return this.setLimit("max", e, !1, g.toString(t));
      }
      setLimit(e, t, a, n) {
        return new P({
          ...this._def,
          checks: [
            ...this._def.checks,
            { kind: e, value: t, inclusive: a, message: g.toString(n) },
          ],
        });
      }
      _addCheck(e) {
        return new P({ ...this._def, checks: [...this._def.checks, e] });
      }
      positive(e) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: !1,
          message: g.toString(e),
        });
      }
      negative(e) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: !1,
          message: g.toString(e),
        });
      }
      nonpositive(e) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: !0,
          message: g.toString(e),
        });
      }
      nonnegative(e) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: !0,
          message: g.toString(e),
        });
      }
      multipleOf(e, t) {
        return this._addCheck({
          kind: "multipleOf",
          value: e,
          message: g.toString(t),
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
    P.create = (e) => {
      var t;
      return new P({
        checks: [],
        typeName: me.ZodBigInt,
        coerce:
          null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
        ...x(e),
      });
    };
    class j extends b {
      _parse(e) {
        if (
          (this._def.coerce && (e.data = Boolean(e.data)),
          this._getType(e) !== s.boolean)
        ) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.boolean,
              received: t.parsedType,
            }),
            p
          );
        }
        return h(e.data);
      }
    }
    j.create = (e) =>
      new j({
        typeName: me.ZodBoolean,
        coerce: (null == e ? void 0 : e.coerce) || !1,
        ...x(e),
      });
    class $ extends b {
      _parse(e) {
        if (
          (this._def.coerce && (e.data = new Date(e.data)),
          this._getType(e) !== s.date)
        ) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.date,
              received: t.parsedType,
            }),
            p
          );
        }
        if (isNaN(e.data.getTime()))
          return c(this._getOrReturnCtx(e), { code: r.invalid_date }), p;
        const a = new l();
        let n;
        for (const s of this._def.checks)
          "min" === s.kind
            ? e.data.getTime() < s.value &&
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                code: r.too_small,
                message: s.message,
                inclusive: !0,
                exact: !1,
                minimum: s.value,
                type: "date",
              }),
              a.dirty())
            : "max" === s.kind
            ? e.data.getTime() > s.value &&
              ((n = this._getOrReturnCtx(e, n)),
              c(n, {
                code: r.too_big,
                message: s.message,
                inclusive: !0,
                exact: !1,
                maximum: s.value,
                type: "date",
              }),
              a.dirty())
            : t.assertNever(s);
        return { status: a.value, value: new Date(e.data.getTime()) };
      }
      _addCheck(e) {
        return new $({ ...this._def, checks: [...this._def.checks, e] });
      }
      min(e, t) {
        return this._addCheck({
          kind: "min",
          value: e.getTime(),
          message: g.toString(t),
        });
      }
      max(e, t) {
        return this._addCheck({
          kind: "max",
          value: e.getTime(),
          message: g.toString(t),
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
    $.create = (e) =>
      new $({
        checks: [],
        coerce: (null == e ? void 0 : e.coerce) || !1,
        typeName: me.ZodDate,
        ...x(e),
      });
    class L extends b {
      _parse(e) {
        if (this._getType(e) !== s.symbol) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.symbol,
              received: t.parsedType,
            }),
            p
          );
        }
        return h(e.data);
      }
    }
    L.create = (e) => new L({ typeName: me.ZodSymbol, ...x(e) });
    class M extends b {
      _parse(e) {
        if (this._getType(e) !== s.undefined) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.undefined,
              received: t.parsedType,
            }),
            p
          );
        }
        return h(e.data);
      }
    }
    M.create = (e) => new M({ typeName: me.ZodUndefined, ...x(e) });
    class z extends b {
      _parse(e) {
        if (this._getType(e) !== s.null) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.null,
              received: t.parsedType,
            }),
            p
          );
        }
        return h(e.data);
      }
    }
    z.create = (e) => new z({ typeName: me.ZodNull, ...x(e) });
    class D extends b {
      constructor() {
        super(...arguments), (this._any = !0);
      }
      _parse(e) {
        return h(e.data);
      }
    }
    D.create = (e) => new D({ typeName: me.ZodAny, ...x(e) });
    class V extends b {
      constructor() {
        super(...arguments), (this._unknown = !0);
      }
      _parse(e) {
        return h(e.data);
      }
    }
    V.create = (e) => new V({ typeName: me.ZodUnknown, ...x(e) });
    class U extends b {
      _parse(e) {
        const t = this._getOrReturnCtx(e);
        return (
          c(t, {
            code: r.invalid_type,
            expected: s.never,
            received: t.parsedType,
          }),
          p
        );
      }
    }
    U.create = (e) => new U({ typeName: me.ZodNever, ...x(e) });
    class q extends b {
      _parse(e) {
        if (this._getType(e) !== s.undefined) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.void,
              received: t.parsedType,
            }),
            p
          );
        }
        return h(e.data);
      }
    }
    q.create = (e) => new q({ typeName: me.ZodVoid, ...x(e) });
    class K extends b {
      _parse(e) {
        const { ctx: t, status: a } = this._processInputParams(e),
          n = this._def;
        if (t.parsedType !== s.array)
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.array,
              received: t.parsedType,
            }),
            p
          );
        if (null !== n.exactLength) {
          const e = t.data.length > n.exactLength.value,
            s = t.data.length < n.exactLength.value;
          (e || s) &&
            (c(t, {
              code: e ? r.too_big : r.too_small,
              minimum: s ? n.exactLength.value : void 0,
              maximum: e ? n.exactLength.value : void 0,
              type: "array",
              inclusive: !0,
              exact: !0,
              message: n.exactLength.message,
            }),
            a.dirty());
        }
        if (
          (null !== n.minLength &&
            t.data.length < n.minLength.value &&
            (c(t, {
              code: r.too_small,
              minimum: n.minLength.value,
              type: "array",
              inclusive: !0,
              exact: !1,
              message: n.minLength.message,
            }),
            a.dirty()),
          null !== n.maxLength &&
            t.data.length > n.maxLength.value &&
            (c(t, {
              code: r.too_big,
              maximum: n.maxLength.value,
              type: "array",
              inclusive: !0,
              exact: !1,
              message: n.maxLength.message,
            }),
            a.dirty()),
          t.common.async)
        )
          return Promise.all(
            [...t.data].map((e, a) =>
              n.type._parseAsync(new v(t, e, t.path, a))
            )
          ).then((e) => l.mergeArray(a, e));
        const i = [...t.data].map((e, a) =>
          n.type._parseSync(new v(t, e, t.path, a))
        );
        return l.mergeArray(a, i);
      }
      get element() {
        return this._def.type;
      }
      min(e, t) {
        return new K({
          ...this._def,
          minLength: { value: e, message: g.toString(t) },
        });
      }
      max(e, t) {
        return new K({
          ...this._def,
          maxLength: { value: e, message: g.toString(t) },
        });
      }
      length(e, t) {
        return new K({
          ...this._def,
          exactLength: { value: e, message: g.toString(t) },
        });
      }
      nonempty(e) {
        return this.min(1, e);
      }
    }
    function B(e) {
      if (e instanceof F) {
        const t = {};
        for (const a in e.shape) {
          const n = e.shape[a];
          t[a] = re.create(B(n));
        }
        return new F({ ...e._def, shape: () => t });
      }
      return e instanceof K
        ? new K({ ...e._def, type: B(e.element) })
        : e instanceof re
        ? re.create(B(e.unwrap()))
        : e instanceof oe
        ? oe.create(B(e.unwrap()))
        : e instanceof J
        ? J.create(e.items.map((e) => B(e)))
        : e;
    }
    K.create = (e, t) =>
      new K({
        type: e,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: me.ZodArray,
        ...x(t),
      });
    class F extends b {
      constructor() {
        super(...arguments),
          (this._cached = null),
          (this.nonstrict = this.passthrough),
          (this.augment = this.extend);
      }
      _getCached() {
        if (null !== this._cached) return this._cached;
        const e = this._def.shape(),
          a = t.objectKeys(e);
        return (this._cached = { shape: e, keys: a });
      }
      _parse(e) {
        if (this._getType(e) !== s.object) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.object,
              received: t.parsedType,
            }),
            p
          );
        }
        const { status: t, ctx: a } = this._processInputParams(e),
          { shape: n, keys: i } = this._getCached(),
          o = [];
        if (
          !(
            this._def.catchall instanceof U && "strip" === this._def.unknownKeys
          )
        )
          for (const e in a.data) i.includes(e) || o.push(e);
        const d = [];
        for (const e of i) {
          const t = n[e],
            s = a.data[e];
          d.push({
            key: { status: "valid", value: e },
            value: t._parse(new v(a, s, a.path, e)),
            alwaysSet: e in a.data,
          });
        }
        if (this._def.catchall instanceof U) {
          const e = this._def.unknownKeys;
          if ("passthrough" === e)
            for (const e of o)
              d.push({
                key: { status: "valid", value: e },
                value: { status: "valid", value: a.data[e] },
              });
          else if ("strict" === e)
            o.length > 0 &&
              (c(a, { code: r.unrecognized_keys, keys: o }), t.dirty());
          else if ("strip" !== e)
            throw new Error(
              "Internal ZodObject error: invalid unknownKeys value."
            );
        } else {
          const e = this._def.catchall;
          for (const t of o) {
            const n = a.data[t];
            d.push({
              key: { status: "valid", value: t },
              value: e._parse(new v(a, n, a.path, t)),
              alwaysSet: t in a.data,
            });
          }
        }
        return a.common.async
          ? Promise.resolve()
              .then(async () => {
                const e = [];
                for (const t of d) {
                  const a = await t.key;
                  e.push({
                    key: a,
                    value: await t.value,
                    alwaysSet: t.alwaysSet,
                  });
                }
                return e;
              })
              .then((e) => l.mergeObjectSync(t, e))
          : l.mergeObjectSync(t, d);
      }
      get shape() {
        return this._def.shape();
      }
      strict(e) {
        return (
          g.errToObj,
          new F({
            ...this._def,
            unknownKeys: "strict",
            ...(void 0 !== e
              ? {
                  errorMap: (t, a) => {
                    var n, s, i, r;
                    const o =
                      null !==
                        (i =
                          null === (s = (n = this._def).errorMap) ||
                          void 0 === s
                            ? void 0
                            : s.call(n, t, a).message) && void 0 !== i
                        ? i
                        : a.defaultError;
                    return "unrecognized_keys" === t.code
                      ? {
                          message:
                            null !== (r = g.errToObj(e).message) && void 0 !== r
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
        return new F({ ...this._def, unknownKeys: "strip" });
      }
      passthrough() {
        return new F({ ...this._def, unknownKeys: "passthrough" });
      }
      extend(e) {
        return new F({
          ...this._def,
          shape: () => ({ ...this._def.shape(), ...e }),
        });
      }
      merge(e) {
        return new F({
          unknownKeys: e._def.unknownKeys,
          catchall: e._def.catchall,
          shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
          typeName: me.ZodObject,
        });
      }
      setKey(e, t) {
        return this.augment({ [e]: t });
      }
      catchall(e) {
        return new F({ ...this._def, catchall: e });
      }
      pick(e) {
        const a = {};
        return (
          t.objectKeys(e).forEach((t) => {
            e[t] && this.shape[t] && (a[t] = this.shape[t]);
          }),
          new F({ ...this._def, shape: () => a })
        );
      }
      omit(e) {
        const a = {};
        return (
          t.objectKeys(this.shape).forEach((t) => {
            e[t] || (a[t] = this.shape[t]);
          }),
          new F({ ...this._def, shape: () => a })
        );
      }
      deepPartial() {
        return B(this);
      }
      partial(e) {
        const a = {};
        return (
          t.objectKeys(this.shape).forEach((t) => {
            const n = this.shape[t];
            e && !e[t] ? (a[t] = n) : (a[t] = n.optional());
          }),
          new F({ ...this._def, shape: () => a })
        );
      }
      required(e) {
        const a = {};
        return (
          t.objectKeys(this.shape).forEach((t) => {
            if (e && !e[t]) a[t] = this.shape[t];
            else {
              let e = this.shape[t];
              for (; e instanceof re; ) e = e._def.innerType;
              a[t] = e;
            }
          }),
          new F({ ...this._def, shape: () => a })
        );
      }
      keyof() {
        return te(t.objectKeys(this.shape));
      }
    }
    (F.create = (e, t) =>
      new F({
        shape: () => e,
        unknownKeys: "strip",
        catchall: U.create(),
        typeName: me.ZodObject,
        ...x(t),
      })),
      (F.strictCreate = (e, t) =>
        new F({
          shape: () => e,
          unknownKeys: "strict",
          catchall: U.create(),
          typeName: me.ZodObject,
          ...x(t),
        })),
      (F.lazycreate = (e, t) =>
        new F({
          shape: e,
          unknownKeys: "strip",
          catchall: U.create(),
          typeName: me.ZodObject,
          ...x(t),
        }));
    class W extends b {
      _parse(e) {
        const { ctx: t } = this._processInputParams(e),
          a = this._def.options;
        if (t.common.async)
          return Promise.all(
            a.map(async (e) => {
              const a = {
                ...t,
                common: { ...t.common, issues: [] },
                parent: null,
              };
              return {
                result: await e._parseAsync({
                  data: t.data,
                  path: t.path,
                  parent: a,
                }),
                ctx: a,
              };
            })
          ).then(function (e) {
            for (const t of e) if ("valid" === t.result.status) return t.result;
            for (const a of e)
              if ("dirty" === a.result.status)
                return t.common.issues.push(...a.ctx.common.issues), a.result;
            const a = e.map((e) => new o(e.ctx.common.issues));
            return c(t, { code: r.invalid_union, unionErrors: a }), p;
          });
        {
          let e;
          const n = [];
          for (const s of a) {
            const a = {
                ...t,
                common: { ...t.common, issues: [] },
                parent: null,
              },
              i = s._parseSync({ data: t.data, path: t.path, parent: a });
            if ("valid" === i.status) return i;
            "dirty" !== i.status || e || (e = { result: i, ctx: a }),
              a.common.issues.length && n.push(a.common.issues);
          }
          if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
          const s = n.map((e) => new o(e));
          return c(t, { code: r.invalid_union, unionErrors: s }), p;
        }
      }
      get options() {
        return this._def.options;
      }
    }
    function G(e, a) {
      const n = i(e),
        r = i(a);
      if (e === a) return { valid: !0, data: e };
      if (n === s.object && r === s.object) {
        const n = t.objectKeys(a),
          s = t.objectKeys(e).filter((e) => -1 !== n.indexOf(e)),
          i = { ...e, ...a };
        for (const t of s) {
          const n = G(e[t], a[t]);
          if (!n.valid) return { valid: !1 };
          i[t] = n.data;
        }
        return { valid: !0, data: i };
      }
      if (n === s.array && r === s.array) {
        if (e.length !== a.length) return { valid: !1 };
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const s = G(e[n], a[n]);
          if (!s.valid) return { valid: !1 };
          t.push(s.data);
        }
        return { valid: !0, data: t };
      }
      return n === s.date && r === s.date && +e == +a
        ? { valid: !0, data: e }
        : { valid: !1 };
    }
    W.create = (e, t) => new W({ options: e, typeName: me.ZodUnion, ...x(t) });
    class H extends b {
      _parse(e) {
        const { status: t, ctx: a } = this._processInputParams(e),
          n = (e, n) => {
            if (m(e) || m(n)) return p;
            const s = G(e.value, n.value);
            return s.valid
              ? ((f(e) || f(n)) && t.dirty(),
                { status: t.value, value: s.data })
              : (c(a, { code: r.invalid_intersection_types }), p);
          };
        return a.common.async
          ? Promise.all([
              this._def.left._parseAsync({
                data: a.data,
                path: a.path,
                parent: a,
              }),
              this._def.right._parseAsync({
                data: a.data,
                path: a.path,
                parent: a,
              }),
            ]).then(([e, t]) => n(e, t))
          : n(
              this._def.left._parseSync({
                data: a.data,
                path: a.path,
                parent: a,
              }),
              this._def.right._parseSync({
                data: a.data,
                path: a.path,
                parent: a,
              })
            );
      }
    }
    H.create = (e, t, a) =>
      new H({ left: e, right: t, typeName: me.ZodIntersection, ...x(a) });
    class J extends b {
      _parse(e) {
        const { status: t, ctx: a } = this._processInputParams(e);
        if (a.parsedType !== s.array)
          return (
            c(a, {
              code: r.invalid_type,
              expected: s.array,
              received: a.parsedType,
            }),
            p
          );
        if (a.data.length < this._def.items.length)
          return (
            c(a, {
              code: r.too_small,
              minimum: this._def.items.length,
              inclusive: !0,
              exact: !1,
              type: "array",
            }),
            p
          );
        !this._def.rest &&
          a.data.length > this._def.items.length &&
          (c(a, {
            code: r.too_big,
            maximum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array",
          }),
          t.dirty());
        const n = [...a.data]
          .map((e, t) => {
            const n = this._def.items[t] || this._def.rest;
            return n ? n._parse(new v(a, e, a.path, t)) : null;
          })
          .filter((e) => !!e);
        return a.common.async
          ? Promise.all(n).then((e) => l.mergeArray(t, e))
          : l.mergeArray(t, n);
      }
      get items() {
        return this._def.items;
      }
      rest(e) {
        return new J({ ...this._def, rest: e });
      }
    }
    J.create = (e, t) => {
      if (!Array.isArray(e))
        throw new Error(
          "You must pass an array of schemas to z.tuple([ ... ])"
        );
      return new J({ items: e, typeName: me.ZodTuple, rest: null, ...x(t) });
    };
    class X extends b {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(e) {
        const { status: t, ctx: a } = this._processInputParams(e);
        if (a.parsedType !== s.map)
          return (
            c(a, {
              code: r.invalid_type,
              expected: s.map,
              received: a.parsedType,
            }),
            p
          );
        const n = this._def.keyType,
          i = this._def.valueType,
          o = [...a.data.entries()].map(([e, t], s) => ({
            key: n._parse(new v(a, e, a.path, [s, "key"])),
            value: i._parse(new v(a, t, a.path, [s, "value"])),
          }));
        if (a.common.async) {
          const e = new Map();
          return Promise.resolve().then(async () => {
            for (const a of o) {
              const n = await a.key,
                s = await a.value;
              if ("aborted" === n.status || "aborted" === s.status) return p;
              ("dirty" !== n.status && "dirty" !== s.status) || t.dirty(),
                e.set(n.value, s.value);
            }
            return { status: t.value, value: e };
          });
        }
        {
          const e = new Map();
          for (const a of o) {
            const n = a.key,
              s = a.value;
            if ("aborted" === n.status || "aborted" === s.status) return p;
            ("dirty" !== n.status && "dirty" !== s.status) || t.dirty(),
              e.set(n.value, s.value);
          }
          return { status: t.value, value: e };
        }
      }
    }
    X.create = (e, t, a) =>
      new X({ valueType: t, keyType: e, typeName: me.ZodMap, ...x(a) });
    class Y extends b {
      _parse(e) {
        const { status: t, ctx: a } = this._processInputParams(e);
        if (a.parsedType !== s.set)
          return (
            c(a, {
              code: r.invalid_type,
              expected: s.set,
              received: a.parsedType,
            }),
            p
          );
        const n = this._def;
        null !== n.minSize &&
          a.data.size < n.minSize.value &&
          (c(a, {
            code: r.too_small,
            minimum: n.minSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: n.minSize.message,
          }),
          t.dirty()),
          null !== n.maxSize &&
            a.data.size > n.maxSize.value &&
            (c(a, {
              code: r.too_big,
              maximum: n.maxSize.value,
              type: "set",
              inclusive: !0,
              exact: !1,
              message: n.maxSize.message,
            }),
            t.dirty());
        const i = this._def.valueType;
        function o(e) {
          const a = new Set();
          for (const n of e) {
            if ("aborted" === n.status) return p;
            "dirty" === n.status && t.dirty(), a.add(n.value);
          }
          return { status: t.value, value: a };
        }
        const d = [...a.data.values()].map((e, t) =>
          i._parse(new v(a, e, a.path, t))
        );
        return a.common.async ? Promise.all(d).then((e) => o(e)) : o(d);
      }
      min(e, t) {
        return new Y({
          ...this._def,
          minSize: { value: e, message: g.toString(t) },
        });
      }
      max(e, t) {
        return new Y({
          ...this._def,
          maxSize: { value: e, message: g.toString(t) },
        });
      }
      size(e, t) {
        return this.min(e, t).max(e, t);
      }
      nonempty(e) {
        return this.min(1, e);
      }
    }
    Y.create = (e, t) =>
      new Y({
        valueType: e,
        minSize: null,
        maxSize: null,
        typeName: me.ZodSet,
        ...x(t),
      });
    class Q extends b {
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
    Q.create = (e, t) => new Q({ getter: e, typeName: me.ZodLazy, ...x(t) });
    class ee extends b {
      _parse(e) {
        if (e.data !== this._def.value) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              received: t.data,
              code: r.invalid_literal,
              expected: this._def.value,
            }),
            p
          );
        }
        return { status: "valid", value: e.data };
      }
      get value() {
        return this._def.value;
      }
    }
    function te(e, t) {
      return new ae({ values: e, typeName: me.ZodEnum, ...x(t) });
    }
    ee.create = (e, t) =>
      new ee({ value: e, typeName: me.ZodLiteral, ...x(t) });
    class ae extends b {
      _parse(e) {
        if ("string" != typeof e.data) {
          const a = this._getOrReturnCtx(e),
            n = this._def.values;
          return (
            c(a, {
              expected: t.joinValues(n),
              received: a.parsedType,
              code: r.invalid_type,
            }),
            p
          );
        }
        if (-1 === this._def.values.indexOf(e.data)) {
          const t = this._getOrReturnCtx(e),
            a = this._def.values;
          return (
            c(t, { received: t.data, code: r.invalid_enum_value, options: a }),
            p
          );
        }
        return h(e.data);
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
        return ae.create(e);
      }
      exclude(e) {
        return ae.create(this.options.filter((t) => !e.includes(t)));
      }
    }
    ae.create = te;
    class ne extends b {
      _parse(e) {
        const a = t.getValidEnumValues(this._def.values),
          n = this._getOrReturnCtx(e);
        if (n.parsedType !== s.string && n.parsedType !== s.number) {
          const e = t.objectValues(a);
          return (
            c(n, {
              expected: t.joinValues(e),
              received: n.parsedType,
              code: r.invalid_type,
            }),
            p
          );
        }
        if (-1 === a.indexOf(e.data)) {
          const e = t.objectValues(a);
          return (
            c(n, { received: n.data, code: r.invalid_enum_value, options: e }),
            p
          );
        }
        return h(e.data);
      }
      get enum() {
        return this._def.values;
      }
    }
    ne.create = (e, t) =>
      new ne({ values: e, typeName: me.ZodNativeEnum, ...x(t) });
    class se extends b {
      unwrap() {
        return this._def.type;
      }
      _parse(e) {
        const { ctx: t } = this._processInputParams(e);
        if (t.parsedType !== s.promise && !1 === t.common.async)
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.promise,
              received: t.parsedType,
            }),
            p
          );
        const a = t.parsedType === s.promise ? t.data : Promise.resolve(t.data);
        return h(
          a.then((e) =>
            this._def.type.parseAsync(e, {
              path: t.path,
              errorMap: t.common.contextualErrorMap,
            })
          )
        );
      }
    }
    se.create = (e, t) => new se({ type: e, typeName: me.ZodPromise, ...x(t) });
    class ie extends b {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === me.ZodEffects
          ? this._def.schema.sourceType()
          : this._def.schema;
      }
      _parse(e) {
        const { status: a, ctx: n } = this._processInputParams(e),
          s = this._def.effect || null,
          i = {
            addIssue: (e) => {
              c(n, e), e.fatal ? a.abort() : a.dirty();
            },
            get path() {
              return n.path;
            },
          };
        if (((i.addIssue = i.addIssue.bind(i)), "preprocess" === s.type)) {
          const e = s.transform(n.data, i);
          return n.common.issues.length
            ? { status: "dirty", value: n.data }
            : n.common.async
            ? Promise.resolve(e).then((e) =>
                this._def.schema._parseAsync({
                  data: e,
                  path: n.path,
                  parent: n,
                })
              )
            : this._def.schema._parseSync({ data: e, path: n.path, parent: n });
        }
        if ("refinement" === s.type) {
          const e = (e) => {
            const t = s.refinement(e, i);
            if (n.common.async) return Promise.resolve(t);
            if (t instanceof Promise)
              throw new Error(
                "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
              );
            return e;
          };
          if (!1 === n.common.async) {
            const t = this._def.schema._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            });
            return "aborted" === t.status
              ? p
              : ("dirty" === t.status && a.dirty(),
                e(t.value),
                { status: a.value, value: t.value });
          }
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((t) =>
              "aborted" === t.status
                ? p
                : ("dirty" === t.status && a.dirty(),
                  e(t.value).then(() => ({ status: a.value, value: t.value })))
            );
        }
        if ("transform" === s.type) {
          if (!1 === n.common.async) {
            const e = this._def.schema._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            });
            if (!y(e)) return e;
            const t = s.transform(e.value, i);
            if (t instanceof Promise)
              throw new Error(
                "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
              );
            return { status: a.value, value: t };
          }
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((e) =>
              y(e)
                ? Promise.resolve(s.transform(e.value, i)).then((e) => ({
                    status: a.value,
                    value: e,
                  }))
                : e
            );
        }
        t.assertNever(s);
      }
    }
    (ie.create = (e, t, a) =>
      new ie({ schema: e, typeName: me.ZodEffects, effect: t, ...x(a) })),
      (ie.createWithPreprocess = (e, t, a) =>
        new ie({
          schema: t,
          effect: { type: "preprocess", transform: e },
          typeName: me.ZodEffects,
          ...x(a),
        }));
    class re extends b {
      _parse(e) {
        return this._getType(e) === s.undefined
          ? h(void 0)
          : this._def.innerType._parse(e);
      }
      unwrap() {
        return this._def.innerType;
      }
    }
    re.create = (e, t) =>
      new re({ innerType: e, typeName: me.ZodOptional, ...x(t) });
    class oe extends b {
      _parse(e) {
        return this._getType(e) === s.null
          ? h(null)
          : this._def.innerType._parse(e);
      }
      unwrap() {
        return this._def.innerType;
      }
    }
    oe.create = (e, t) =>
      new oe({ innerType: e, typeName: me.ZodNullable, ...x(t) });
    class de extends b {
      _parse(e) {
        const { ctx: t } = this._processInputParams(e);
        let a = t.data;
        return (
          t.parsedType === s.undefined && (a = this._def.defaultValue()),
          this._def.innerType._parse({ data: a, path: t.path, parent: t })
        );
      }
      removeDefault() {
        return this._def.innerType;
      }
    }
    de.create = (e, t) =>
      new de({
        innerType: e,
        typeName: me.ZodDefault,
        defaultValue:
          "function" == typeof t.default ? t.default : () => t.default,
        ...x(t),
      });
    class ue extends b {
      _parse(e) {
        const { ctx: t } = this._processInputParams(e),
          a = { ...t, common: { ...t.common, issues: [] } },
          n = this._def.innerType._parse({
            data: a.data,
            path: a.path,
            parent: { ...a },
          });
        return _(n)
          ? n.then((e) => ({
              status: "valid",
              value:
                "valid" === e.status
                  ? e.value
                  : this._def.catchValue({
                      get error() {
                        return new o(a.common.issues);
                      },
                      input: a.data,
                    }),
            }))
          : {
              status: "valid",
              value:
                "valid" === n.status
                  ? n.value
                  : this._def.catchValue({
                      get error() {
                        return new o(a.common.issues);
                      },
                      input: a.data,
                    }),
            };
      }
      removeCatch() {
        return this._def.innerType;
      }
    }
    ue.create = (e, t) =>
      new ue({
        innerType: e,
        typeName: me.ZodCatch,
        catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
        ...x(t),
      });
    class ce extends b {
      _parse(e) {
        if (this._getType(e) !== s.nan) {
          const t = this._getOrReturnCtx(e);
          return (
            c(t, {
              code: r.invalid_type,
              expected: s.nan,
              received: t.parsedType,
            }),
            p
          );
        }
        return { status: "valid", value: e.data };
      }
    }
    (ce.create = (e) => new ce({ typeName: me.ZodNaN, ...x(e) })),
      Symbol("zod_brand");
    class le extends b {
      _parse(e) {
        const { ctx: t } = this._processInputParams(e),
          a = t.data;
        return this._def.type._parse({ data: a, path: t.path, parent: t });
      }
      unwrap() {
        return this._def.type;
      }
    }
    class pe extends b {
      _parse(e) {
        const { status: t, ctx: a } = this._processInputParams(e);
        if (a.common.async)
          return (async () => {
            const e = await this._def.in._parseAsync({
              data: a.data,
              path: a.path,
              parent: a,
            });
            return "aborted" === e.status
              ? p
              : "dirty" === e.status
              ? (t.dirty(), { status: "dirty", value: e.value })
              : this._def.out._parseAsync({
                  data: e.value,
                  path: a.path,
                  parent: a,
                });
          })();
        {
          const e = this._def.in._parseSync({
            data: a.data,
            path: a.path,
            parent: a,
          });
          return "aborted" === e.status
            ? p
            : "dirty" === e.status
            ? (t.dirty(), { status: "dirty", value: e.value })
            : this._def.out._parseSync({
                data: e.value,
                path: a.path,
                parent: a,
              });
        }
      }
      static create(e, t) {
        return new pe({ in: e, out: t, typeName: me.ZodPipeline });
      }
    }
    class he extends b {
      _parse(e) {
        const t = this._def.innerType._parse(e);
        return y(t) && (t.value = Object.freeze(t.value)), t;
      }
    }
    var me;
    (he.create = (e, t) =>
      new he({ innerType: e, typeName: me.ZodReadonly, ...x(t) })),
      F.lazycreate,
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
      })(me || (me = {}));
    const fe = Z.create,
      ye = R.create,
      _e = (ce.create, P.create, j.create),
      ge = ($.create, L.create, M.create),
      ve = z.create,
      ke = (D.create, V.create),
      xe = (U.create, q.create, K.create),
      be = F.create,
      we = (F.strictCreate, W.create),
      Te = (H.create, J.create, X.create, Y.create, Q.create, ee.create),
      Se = (ae.create, ne.create, se.create, ie.create, re.create, oe.create);
    ie.createWithPreprocess, pe.create;
    const Oe = be({ messageId: fe(), method: fe(), data: ke() });
    be({
      messageId: fe(),
      method: fe(),
      origin: fe(),
      reject: ke().or(ge()),
      resolve: ke().or(ge()),
    });
    class Ie {
      constructor({
        validateOrigin: t = !0,
        removeListenerAfterHandshake: a = !0,
      }) {
        (this.handlers = new Map()), (this.handshakeComplete = !1);
        const n = (s) => {
          "klarna_initialize_messenger_handshake" === s.data.type &&
            s.ports[0]?.postMessage &&
            (!t ||
              ["development", "test"].includes("production") ||
              e.test(new URL(s.origin).hostname)) &&
            ((this.port = s.ports[0]),
            this.port.postMessage(
              "klarna_initialize_messenger_handshake_complete"
            ),
            (this.port.onmessage = this.onMessageFromSource.bind(this)),
            (this.sourceOrigin = s.origin),
            (this.handshakeComplete = !0),
            a && window.removeEventListener("message", n));
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
        const { messageId: t, method: a, data: n } = Oe.parse(e.data),
          s = {
            messageId: t,
            method: a,
            origin: this.sourceOrigin,
            reject: void 0,
            resolve: void 0,
          },
          i = this.handlers.get(a);
        if (!i)
          return (
            (s.reject = `Unhandled method: ${a}, add appropriate handler.`),
            void this.sendMessageToSource(s)
          );
        try {
          s.resolve = await i({
            data: n,
            config: { sourceOrigin: this.sourceOrigin },
          });
        } catch (e) {
          s.reject = e;
        }
        this.sendMessageToSource(s);
      }
      registerHandler(e, t) {
        this.handlers.set(e, t);
      }
    }
    const Ae = "payments/v2",
      Ce = {
        production: "https://js.klarna.com",
        playground: "https://js.playground.klarna.com",
        staging: "https://x.nonprod.us1.js.klarna.net",
        development: "https://x.nonprod.us1.js.klarna.net",
      };
    var Ee = (function (e) {
      return (
        (e.GET = "GET"),
        (e.POST = "POST"),
        (e.PATCH = "PATCH"),
        (e.DELETE = "DELETE"),
        e
      );
    })(Ee || {});
    async function Ze(e) {
      if (!e.ok) {
        let t;
        try {
          t = await e.json();
        } catch (e) {
          t = null;
        }
        throw { response: t, status: e.status, statusText: e.statusText };
      }
      return await e.json();
    }
    var Ne = a(1187);
    const Re = be({
        accountId: fe().optional(),
        baseUrl: fe(),
        clientId: fe(),
        clientOrigin: fe().optional(),
        environment: fe(),
        sessionId: fe(),
        version: fe(),
      }),
      Pe = we([
        Te("CREATED"),
        Te("SUBMITTED"),
        Te("IN_PROGRESS"),
        Te("PREPARED"),
        Te("PENDING_CONFIRMATION"),
        Te("AUTHORIZED"),
      ]),
      je = be({
        city: fe(),
        country: fe().regex(/^[A-Z]{2}$/),
        postalCode: fe().optional(),
        region: fe().optional(),
        streetAddress: fe(),
        streetAddress2: fe().optional(),
      }),
      $e = be({
        address: je.optional(),
        recipient: be({
          attention: fe().optional(),
          email: fe().optional(),
          familyName: fe(),
          givenName: fe(),
          phone: fe().optional(),
        }).optional(),
        shippingReference: fe().optional(),
      }).optional(),
      Le =
        (we([Te("iframe"), Te("window"), Te("redirect"), Te("sdk")]),
        be({
          buyer: be({
            address: je.optional(),
            email: fe().optional(),
            familyName: fe().optional(),
            givenName: fe().optional(),
            phone: fe().optional(),
          }).optional(),
          currency: fe(),
          merchantReference: fe().optional(),
          paymentAmount: ye(),
          lineItems: xe(
            be({
              imageUrl: fe().optional(),
              name: fe(),
              productIdentifier: fe().optional(),
              productUrl: fe().optional(),
              quantity: ye(),
              reference: fe().optional(),
              shippingReference: fe().optional(),
              totalAmount: ye(),
              totalTaxAmount: ye(),
              unitPrice: ye(),
            })
          ).optional(),
          paymentReference: fe().optional(),
          shipping: be({
            address: je.optional(),
            recipient: be({
              attention: fe().optional(),
              email: fe().optional(),
              familyName: fe(),
              givenName: fe(),
              phone: fe()
                .regex(/^\+\d{1,15}$/)
                .optional(),
            }).optional(),
            shippingReference: fe().optional(),
          }).optional(),
          config: be({ redirectUrl: fe().optional() }).optional(),
        })),
      Me =
        (Le.extend({
          currency: fe().optional(),
          paymentAmount: ye().optional(),
        }),
        be({
          interactionMode: we([
            Te(Ne.InteractionModes.ON_PAGE),
            Te(Ne.InteractionModes.DEVICE_BEST),
            Te(Ne.InteractionModes.REDIRECT),
          ]).optional(),
        }),
        be({
          klarnaUserId: fe(),
          givenName: fe(),
          familyName: fe(),
          email: fe(),
          phone: fe(),
          phoneVerified: _e(),
          emailVerified: _e(),
          address: je,
          locale: fe(),
          dateOfBirth: fe(),
          nationalIdentification: be({ number: fe(), country: fe() }),
          shipping: $e,
        }).nullable()),
      ze = be({
        distribution: be({ url: fe() }).partial().nullable(),
        paymentConfirmationToken: fe().nullable(),
        paymentAuthorizationId: fe().nullable(),
        userAccountProfile: Me,
        userAccountLinking: be({
          userAccountLinkingRefreshToken: fe(),
          userAccountLinkingIdToken: fe(),
        }).nullable(),
      })
        .partial()
        .nullable(),
      De =
        (be({
          expiresAt: fe(),
          paymentRequest: Le.extend({
            config: be({ redirectUrl: fe().optional() }).optional(),
          })
            .partial()
            .nullable(),
          paymentRequestId: fe(),
          previousState: Pe.optional(),
          state: Pe,
          stateContext: ze.optional(),
        }),
        be({
          city: fe(),
          country: fe().regex(/^[A-Z]{2}$/),
          postal_code: fe().optional(),
          region: fe().optional(),
          street_address: fe(),
          street_address2: fe().optional(),
        })),
      Ve = be({
        address: De.optional(),
        recipient: be({
          attention: fe().optional(),
          email: fe().optional(),
          family_name: fe(),
          given_name: fe(),
          phone: fe().optional(),
        }).optional(),
        shipping_reference: fe().optional(),
      }).optional(),
      Ue = be({
        klarna_user_id: fe(),
        given_name: fe(),
        family_name: fe(),
        email: fe(),
        phone: fe(),
        phone_verified: _e(),
        email_verified: _e(),
        address: De,
        locale: fe(),
        date_of_birth: fe(),
        national_identification: be({ number: fe(), country: fe() }),
        shipping: Ve,
      }).nullable(),
      qe = be({
        distribution: be({ url: fe() }).partial().nullable(),
        payment_confirmation_token: fe().nullable(),
        payment_authorization_id: fe().nullable(),
        user_account_profile: Ue,
        user_account_linking: be({
          user_account_linking_refresh_token: fe(),
          user_account_linking_id_token: fe(),
        }).nullable(),
      })
        .partial()
        .nullable(),
      Ke = be({
        buyer: be({
          address: De.optional(),
          email: fe().optional(),
          family_name: fe().optional(),
          given_name: fe().optional(),
          phone: fe().optional(),
        }).optional(),
        currency: fe(),
        merchant_reference: fe().optional(),
        payment_amount: ye(),
        line_items: xe(
          be({
            image_url: fe().optional(),
            name: fe(),
            product_identifier: fe().optional(),
            product_url: fe().optional(),
            quantity: ye(),
            reference: fe().optional(),
            shipping_reference: fe().optional(),
            total_amount: ye(),
            total_tax_amount: ye(),
            unit_price: ye(),
          })
        ).optional(),
        payment_reference: fe().optional(),
        shipping: Ve,
        config: be({ redirect_url: fe().optional() }).optional(),
      }),
      Be = be({
        ...Ke.shape,
        internal: be({ effective_ux_mode: fe().optional() }),
      }),
      Fe = Be.extend({
        config: be({ redirect_url: fe().optional() }).optional(),
        internal: be({ effective_ux_mode: fe().optional() }).optional(),
        currency: fe().optional(),
        payment_amount: ye().optional(),
      }),
      We = be({
        expires_at: fe(),
        payment_request: Ke.extend({
          config: be({ redirect_url: fe().optional() }).optional(),
        })
          .partial()
          .nullable(),
        payment_request_id: fe(),
        previous_state: Pe,
        state: Pe,
        state_context: qe,
      }).partial(),
      Ge = {
        paymentApiSetup: {
          data: Re.extend({
            environment: fe().optional(),
            sessionId: fe().optional(),
            version: fe().optional(),
          }),
          response: _e(),
        },
        paymentApiSendAuthorizationRequest: {
          data: be({ body: Be, region: fe() }),
          response: We,
        },
        paymentApiPatchAuthorizationRequest: {
          data: be({ id: fe(), body: Fe, region: fe() }),
          response: We,
        },
        paymentApiGetAuthorizationRequest: {
          data: be({ id: fe(), region: fe() }),
          response: We,
        },
        paymentApiCancelConfirmation: {
          data: be({ paymentConfirmationToken: fe(), region: fe() }),
          response: We,
        },
      },
      He =
        (be({ currency: fe(), country: fe(), paymentAmount: ye().optional() }),
        {
          getStorageItem: { data: be({ key: fe() }), response: Se(fe()) },
          setStorageItem: {
            data: be({ key: fe(), data: fe() }),
            response: ve(),
          },
          removeStorageItem: { data: be({ key: fe() }), response: ve() },
          ...Ge,
        });
    new (class {
      constructor() {
        this.messengerTarget = new Ie({
          validateOrigin: !1,
          removeListenerAfterHandshake: !0,
        });
      }
      async setStorageItem(e) {
        const t = He.setStorageItem.data.parse(e.data),
          { key: a, data: n } = t;
        return window.localStorage.setItem(a, n), !0;
      }
      async getStorageItem(e) {
        const t = He.getStorageItem.data.parse(e.data),
          { key: a } = t;
        return window.localStorage.getItem(a);
      }
      async removeStorageItem(e) {
        const t = He.removeStorageItem.data.parse(e.data),
          { key: a } = t;
        return window.localStorage.removeItem(a), !0;
      }
      async paymentApiSetup(e) {
        const { config: t } = e,
          a = He.paymentApiSetup.data.parse(e.data);
        return (
          (this.paymentApi = (function (e) {
            const t = {
                Authorization: `Basic ${e.clientId}`,
                "Content-Type": "application/json",
                "Klarna-Client-Version": JSON.stringify({
                  "klarna-web-sdk": e.version,
                }),
                "Klarna-Integrator-Origin": e.clientOrigin,
                ...(e.accountId && { "Klarna-Account": e.accountId }),
              },
              a = `${Ce[e.environment] || Ce.production}`;
            return {
              get: async ({ data: e, url: n }) =>
                Ze(
                  await window.fetch(
                    `${a}${n}?${new URLSearchParams(e).toString()}`,
                    { headers: t, method: Ee.GET }
                  )
                ),
              patch: async ({ data: e, url: n }) =>
                Ze(
                  await window.fetch(`${a}${n}`, {
                    body: JSON.stringify(e),
                    headers: t,
                    method: Ee.PATCH,
                  })
                ),
              post: async ({ data: e, url: n }) =>
                Ze(
                  await window.fetch(`${a}${n}`, {
                    body: JSON.stringify(e),
                    headers: t,
                    method: Ee.POST,
                  })
                ),
              delete: async ({ url: e }) =>
                Ze(
                  await window.fetch(`${a}${e}`, {
                    headers: t,
                    method: Ee.DELETE,
                  })
                ),
            };
          })({ ...a, clientOrigin: t.sourceOrigin })),
          !0
        );
      }
      async paymentApiSendAuthorizationRequest(e) {
        if (!this.paymentApi)
          throw new Error("Payment API is not configured yet.");
        return this.paymentApi.post({
          data: e.data.body,
          url: `/${e.data.region}/${Ae}/requests`,
        });
      }
      async paymentApiPatchAuthorizationRequest(e) {
        if (!this.paymentApi)
          throw new Error("Payment API is not configured yet.");
        return this.paymentApi.patch({
          data: e.data.body,
          url: `/${e.data.region}/${Ae}/requests/${e.data.id}`,
        });
      }
      async paymentApiGetAuthorizationRequest(e) {
        if (!this.paymentApi)
          throw new Error("Payment API is not configured yet.");
        return this.paymentApi.get({
          url: `/${e.data.region}/${Ae}/requests/${e.data.id}`,
        });
      }
      async paymentApiCancelConfirmation(e) {
        if (!this.paymentApi)
          throw new Error("Payment API is not configured yet.");
        return this.paymentApi.delete({
          url: `/${e.data.region}/${Ae}/confirmation-tokens/${e.data.paymentConfirmationToken}`,
        });
      }
      registerAllHandlers() {
        const e = {
          setStorageItem: this.setStorageItem.bind(this),
          getStorageItem: this.getStorageItem.bind(this),
          removeStorageItem: this.removeStorageItem.bind(this),
          paymentApiSetup: this.paymentApiSetup.bind(this),
          paymentApiSendAuthorizationRequest:
            this.paymentApiSendAuthorizationRequest.bind(this),
          paymentApiPatchAuthorizationRequest:
            this.paymentApiPatchAuthorizationRequest.bind(this),
          paymentApiGetAuthorizationRequest:
            this.paymentApiGetAuthorizationRequest.bind(this),
          paymentApiCancelConfirmation:
            this.paymentApiCancelConfirmation.bind(this),
        };
        for (const [t, a] of Object.entries(e))
          this.messengerTarget.registerHandler(t, a);
      }
    })().registerAllHandlers();
  })();
})();
