/*! For license information please see 300.index.js.LICENSE.txt */
(self.webpackChunkclient = self.webpackChunkclient || []).push([
  [300],
  {
    300: function (e, t) {
      !(function (e) {
        "use strict";
        var t,
          r = (function () {
            function e() {
              (this._nodes = []), (this._values = []);
            }
            return (
              (e._isIndex = function (e) {
                return +e == e >>> 0;
              }),
              (e._nodeId = function (t) {
                var r = t[e._ID_PROP];
                return r || (r = t[e._ID_PROP] = e._NEXT_ID++), r;
              }),
              (e.prototype.set = function (t, r) {
                var i = e._nodeId(t);
                (this._nodes[i] = t), (this._values[i] = r);
              }),
              (e.prototype.get = function (t) {
                var r = e._nodeId(t);
                return void 0 !== r ? this._values[r] : void 0;
              }),
              (e.prototype.has = function (t) {
                return e._nodeId(t) in this._nodes;
              }),
              (e.prototype.delete = function (t) {
                var r = e._nodeId(t);
                delete this._nodes[r], (this._values[r] = void 0);
              }),
              (e.prototype.keys = function () {
                var t = [];
                for (var r in this._nodes)
                  e._isIndex(r) && t.push(this._nodes[r]);
                return t;
              }),
              (e._ID_PROP = "__mutation_summary_node_map_id__"),
              (e._NEXT_ID = 1),
              e
            );
          })(),
          i = function () {
            (this.added = new r()),
              (this.removed = new r()),
              (this.maybeMoved = new r()),
              (this.oldPrevious = new r()),
              (this.moved = void 0);
          };
        (e.Movement = void 0),
          ((t = e.Movement || (e.Movement = {}))[(t.STAYED_OUT = 0)] =
            "STAYED_OUT"),
          (t[(t.ENTERED = 1)] = "ENTERED"),
          (t[(t.STAYED_IN = 2)] = "STAYED_IN"),
          (t[(t.REPARENTED = 3)] = "REPARENTED"),
          (t[(t.REORDERED = 4)] = "REORDERED"),
          (t[(t.EXITED = 5)] = "EXITED");
        var a = function (e, t) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var r in t)
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              }),
            a(e, t)
          );
        };
        var n = (function () {
            function e(e, t, r, i, a, n, o, s) {
              void 0 === t && (t = !1),
                void 0 === r && (r = !1),
                void 0 === i && (i = !1),
                void 0 === a && (a = null),
                void 0 === n && (n = !1),
                void 0 === o && (o = null),
                void 0 === s && (s = null),
                (this.node = e),
                (this.childList = t),
                (this.attributes = r),
                (this.characterData = i),
                (this.oldParentNode = a),
                (this.added = n),
                (this.attributeOldValues = o),
                (this.characterDataOldValue = s),
                (this.isCaseInsensitive =
                  this.node.nodeType === Node.ELEMENT_NODE &&
                  this.node instanceof HTMLElement &&
                  this.node.ownerDocument instanceof HTMLDocument);
            }
            return (
              (e.prototype.getAttributeOldValue = function (e) {
                if (this.attributeOldValues)
                  return (
                    this.isCaseInsensitive && (e = e.toLowerCase()),
                    this.attributeOldValues[e]
                  );
              }),
              (e.prototype.getAttributeNamesMutated = function () {
                var e = [];
                if (!this.attributeOldValues) return e;
                for (var t in this.attributeOldValues)
                  this.attributeOldValues.hasOwnProperty(t) && e.push(t);
                return e;
              }),
              (e.prototype.attributeMutated = function (e, t) {
                (this.attributes = !0),
                  (this.attributeOldValues = this.attributeOldValues || {}),
                  e in this.attributeOldValues ||
                    (this.attributeOldValues[e] = t);
              }),
              (e.prototype.characterDataMutated = function (e) {
                this.characterData ||
                  ((this.characterData = !0), (this.characterDataOldValue = e));
              }),
              (e.prototype.removedFromParent = function (e) {
                (this.childList = !0),
                  this.added || this.oldParentNode
                    ? (this.added = !1)
                    : (this.oldParentNode = e);
              }),
              (e.prototype.insertedIntoParent = function () {
                (this.childList = !0), (this.added = !0);
              }),
              (e.prototype.getOldParent = function () {
                if (this.childList) {
                  if (this.oldParentNode) return this.oldParentNode;
                  if (this.added) return null;
                }
                return this.node.parentNode;
              }),
              e
            );
          })(),
          o = (function (t) {
            function i(e, r) {
              var i = t.call(this) || this;
              (i.rootNode = e),
                (i.reachableCache = void 0),
                (i.wasReachableCache = void 0),
                (i.anyParentsChanged = !1),
                (i.anyAttributesChanged = !1),
                (i.anyCharacterDataChanged = !1);
              for (var a = 0; a < r.length; a++) {
                var n = r[a];
                switch (n.type) {
                  case "childList":
                    i.anyParentsChanged = !0;
                    for (var o = 0; o < n.removedNodes.length; o++) {
                      var s = n.removedNodes[o];
                      i.getChange(s).removedFromParent(n.target);
                    }
                    for (o = 0; o < n.addedNodes.length; o++)
                      (s = n.addedNodes[o]),
                        i.getChange(s).insertedIntoParent();
                    break;
                  case "attributes":
                    (i.anyAttributesChanged = !0),
                      i
                        .getChange(n.target)
                        .attributeMutated(n.attributeName, n.oldValue);
                    break;
                  case "characterData":
                    (i.anyCharacterDataChanged = !0),
                      i.getChange(n.target).characterDataMutated(n.oldValue);
                }
              }
              return i;
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Class extends value " +
                      String(t) +
                      " is not a constructor or null"
                  );
                function r() {
                  this.constructor = e;
                }
                a(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((r.prototype = t.prototype), new r()));
              })(i, t),
              (i.prototype.getChange = function (e) {
                var t = this.get(e);
                return t || ((t = new n(e)), this.set(e, t)), t;
              }),
              (i.prototype.getOldParent = function (e) {
                var t = this.get(e);
                return t ? t.getOldParent() : e.parentNode;
              }),
              (i.prototype.getIsReachable = function (e) {
                if (e === this.rootNode) return !0;
                if (!e) return !1;
                this.reachableCache = this.reachableCache || new r();
                var t = this.reachableCache.get(e);
                return (
                  void 0 === t &&
                    ((t = this.getIsReachable(e.parentNode)),
                    this.reachableCache.set(e, t)),
                  t
                );
              }),
              (i.prototype.getWasReachable = function (e) {
                if (e === this.rootNode) return !0;
                if (!e) return !1;
                this.wasReachableCache = this.wasReachableCache || new r();
                var t = this.wasReachableCache.get(e);
                return (
                  void 0 === t &&
                    ((t = this.getWasReachable(this.getOldParent(e))),
                    this.wasReachableCache.set(e, t)),
                  t
                );
              }),
              (i.prototype.reachabilityChange = function (t) {
                return this.getIsReachable(t)
                  ? this.getWasReachable(t)
                    ? e.Movement.STAYED_IN
                    : e.Movement.ENTERED
                  : this.getWasReachable(t)
                  ? e.Movement.EXITED
                  : e.Movement.STAYED_OUT;
              }),
              i
            );
          })(r),
          s = (function () {
            function t(e, t, i, a, n) {
              (this.rootNode = e),
                (this.mutations = t),
                (this.selectors = i),
                (this.calcReordered = a),
                (this.calcOldPreviousSibling = n),
                (this.treeChanges = new o(e, t)),
                (this.entered = []),
                (this.exited = []),
                (this.stayedIn = new r()),
                (this.visited = new r()),
                (this.childListChangeMap = void 0),
                (this.characterDataOnly = void 0),
                (this.matchCache = void 0),
                this.processMutations();
            }
            return (
              (t.prototype.processMutations = function () {
                if (
                  this.treeChanges.anyParentsChanged ||
                  this.treeChanges.anyAttributesChanged
                )
                  for (
                    var e = this.treeChanges.keys(), t = 0;
                    t < e.length;
                    t++
                  )
                    this.visitNode(e[t], void 0);
              }),
              (t.prototype.visitNode = function (t, r) {
                if (!this.visited.has(t)) {
                  this.visited.set(t, !0);
                  var i = this.treeChanges.get(t),
                    a = r;
                  if (
                    (((i && i.childList) || null == a) &&
                      (a = this.treeChanges.reachabilityChange(t)),
                    a !== e.Movement.STAYED_OUT)
                  ) {
                    if ((this.matchabilityChange(t), a === e.Movement.ENTERED))
                      this.entered.push(t);
                    else if (a === e.Movement.EXITED)
                      this.exited.push(t),
                        this.ensureHasOldPreviousSiblingIfNeeded(t);
                    else if (a === e.Movement.STAYED_IN) {
                      var n = e.Movement.STAYED_IN;
                      i &&
                        i.childList &&
                        (i.oldParentNode !== t.parentNode
                          ? ((n = e.Movement.REPARENTED),
                            this.ensureHasOldPreviousSiblingIfNeeded(t))
                          : this.calcReordered &&
                            this.wasReordered(t) &&
                            (n = e.Movement.REORDERED)),
                        this.stayedIn.set(t, n);
                    }
                    if (a !== e.Movement.STAYED_IN)
                      for (var o = t.firstChild; o; o = o.nextSibling)
                        this.visitNode(o, a);
                  }
                }
              }),
              (t.prototype.ensureHasOldPreviousSiblingIfNeeded = function (e) {
                if (this.calcOldPreviousSibling) {
                  this.processChildlistChanges();
                  var t = e.parentNode,
                    r = this.treeChanges.get(e);
                  r && r.oldParentNode && (t = r.oldParentNode);
                  var a = this.childListChangeMap.get(t);
                  a || ((a = new i()), this.childListChangeMap.set(t, a)),
                    a.oldPrevious.has(e) ||
                      a.oldPrevious.set(e, e.previousSibling);
                }
              }),
              (t.prototype.getChanged = function (t, r, i) {
                (this.selectors = r), (this.characterDataOnly = i);
                for (var a = 0; a < this.entered.length; a++) {
                  var n = this.entered[a];
                  ((h = this.matchabilityChange(n)) !== e.Movement.ENTERED &&
                    h !== e.Movement.STAYED_IN) ||
                    t.added.push(n);
                }
                var o = this.stayedIn.keys();
                for (a = 0; a < o.length; a++)
                  if (
                    ((n = o[a]),
                    (h = this.matchabilityChange(n)) === e.Movement.ENTERED)
                  )
                    t.added.push(n);
                  else if (h === e.Movement.EXITED) t.removed.push(n);
                  else if (
                    h === e.Movement.STAYED_IN &&
                    (t.reparented || t.reordered)
                  ) {
                    var s = this.stayedIn.get(n);
                    t.reparented && s === e.Movement.REPARENTED
                      ? t.reparented.push(n)
                      : t.reordered &&
                        s === e.Movement.REORDERED &&
                        t.reordered.push(n);
                  }
                for (a = 0; a < this.exited.length; a++) {
                  var h;
                  (n = this.exited[a]),
                    ((h = this.matchabilityChange(n)) !== e.Movement.EXITED &&
                      h !== e.Movement.STAYED_IN) ||
                      t.removed.push(n);
                }
              }),
              (t.prototype.getOldParentNode = function (t) {
                var r = this.treeChanges.get(t);
                if (r && r.childList)
                  return r.oldParentNode ? r.oldParentNode : null;
                var i = this.treeChanges.reachabilityChange(t);
                if (i === e.Movement.STAYED_OUT || i === e.Movement.ENTERED)
                  throw Error("getOldParentNode requested on invalid node.");
                return t.parentNode;
              }),
              (t.prototype.getOldPreviousSibling = function (e) {
                var t = e.parentNode,
                  r = this.treeChanges.get(e);
                r && r.oldParentNode && (t = r.oldParentNode);
                var i = this.childListChangeMap.get(t);
                if (!i)
                  throw Error(
                    "getOldPreviousSibling requested on invalid node."
                  );
                return i.oldPrevious.get(e);
              }),
              (t.prototype.getOldAttribute = function (e, t) {
                var r = this.treeChanges.get(e);
                if (!r || !r.attributes)
                  throw Error("getOldAttribute requested on invalid node.");
                var i = r.getAttributeOldValue(t);
                if (void 0 === i)
                  throw Error(
                    "getOldAttribute requested for unchanged attribute name."
                  );
                return i;
              }),
              (t.prototype.attributeChangedNodes = function (t) {
                if (!this.treeChanges.anyAttributesChanged) return {};
                var r, i;
                if (t) {
                  (r = {}), (i = {});
                  for (var a = 0; a < t.length; a++)
                    (r[(l = t[a])] = !0), (i[l.toLowerCase()] = l);
                }
                var n = {},
                  o = this.treeChanges.keys();
                for (a = 0; a < o.length; a++) {
                  var s = o[a],
                    h = this.treeChanges.get(s);
                  if (
                    h.attributes &&
                    e.Movement.STAYED_IN ===
                      this.treeChanges.reachabilityChange(s) &&
                    e.Movement.STAYED_IN === this.matchabilityChange(s)
                  )
                    for (
                      var d = s, u = h.getAttributeNamesMutated(), c = 0;
                      c < u.length;
                      c++
                    ) {
                      var l = u[c];
                      (!r || r[l] || (h.isCaseInsensitive && i[l])) &&
                        h.getAttributeOldValue(l) !== d.getAttribute(l) &&
                        (i && h.isCaseInsensitive && (l = i[l]),
                        (n[l] = n[l] || []),
                        n[l].push(d));
                    }
                }
                return n;
              }),
              (t.prototype.getOldCharacterData = function (e) {
                var t = this.treeChanges.get(e);
                if (!t || !t.characterData)
                  throw Error("getOldCharacterData requested on invalid node.");
                return t.characterDataOldValue;
              }),
              (t.prototype.getCharacterDataChanged = function () {
                if (!this.treeChanges.anyCharacterDataChanged) return [];
                for (
                  var t = this.treeChanges.keys(), r = [], i = 0;
                  i < t.length;
                  i++
                ) {
                  var a = t[i];
                  if (
                    e.Movement.STAYED_IN ===
                    this.treeChanges.reachabilityChange(a)
                  ) {
                    var n = this.treeChanges.get(a);
                    n.characterData &&
                      a.textContent != n.characterDataOldValue &&
                      r.push(a);
                  }
                }
                return r;
              }),
              (t.prototype.computeMatchabilityChange = function (e, t) {
                this.matchCache || (this.matchCache = []),
                  this.matchCache[e.uid] || (this.matchCache[e.uid] = new r());
                var i = this.matchCache[e.uid],
                  a = i.get(t);
                return (
                  void 0 === a &&
                    ((a = e.matchabilityChange(t, this.treeChanges.get(t))),
                    i.set(t, a)),
                  a
                );
              }),
              (t.prototype.matchabilityChange = function (t) {
                var r = this;
                if (this.characterDataOnly)
                  switch (t.nodeType) {
                    case Node.COMMENT_NODE:
                    case Node.TEXT_NODE:
                      return e.Movement.STAYED_IN;
                    default:
                      return e.Movement.STAYED_OUT;
                  }
                if (!this.selectors) return e.Movement.STAYED_IN;
                if (t.nodeType !== Node.ELEMENT_NODE)
                  return e.Movement.STAYED_OUT;
                for (
                  var i = t,
                    a = this.selectors.map(function (e) {
                      return r.computeMatchabilityChange(e, i);
                    }),
                    n = e.Movement.STAYED_OUT,
                    o = 0;
                  n !== e.Movement.STAYED_IN && o < a.length;

                ) {
                  switch (a[o]) {
                    case e.Movement.STAYED_IN:
                      n = e.Movement.STAYED_IN;
                      break;
                    case e.Movement.ENTERED:
                      n =
                        n === e.Movement.EXITED
                          ? e.Movement.STAYED_IN
                          : e.Movement.ENTERED;
                      break;
                    case e.Movement.EXITED:
                      n =
                        n === e.Movement.ENTERED
                          ? e.Movement.STAYED_IN
                          : e.Movement.EXITED;
                  }
                  o++;
                }
                return n;
              }),
              (t.prototype.getChildlistChange = function (e) {
                var t = this.childListChangeMap.get(e);
                return (
                  t || ((t = new i()), this.childListChangeMap.set(e, t)), t
                );
              }),
              (t.prototype.processChildlistChanges = function () {
                if (!this.childListChangeMap) {
                  this.childListChangeMap = new r();
                  for (
                    var t = function (t) {
                        var r = i.mutations[t];
                        if ("childList" != r.type) return "continue";
                        if (
                          i.treeChanges.reachabilityChange(r.target) !==
                            e.Movement.STAYED_IN &&
                          !i.calcOldPreviousSibling
                        )
                          return "continue";
                        for (
                          var a = i.getChildlistChange(r.target),
                            n = r.previousSibling,
                            o = function (e, t) {
                              !e ||
                                a.oldPrevious.has(e) ||
                                a.added.has(e) ||
                                a.maybeMoved.has(e) ||
                                (t &&
                                  (a.added.has(t) || a.maybeMoved.has(t))) ||
                                a.oldPrevious.set(e, t);
                            },
                            s = 0;
                          s < r.removedNodes.length;
                          s++
                        )
                          o((h = r.removedNodes[s]), n),
                            a.added.has(h)
                              ? a.added.delete(h)
                              : (a.removed.set(h, !0), a.maybeMoved.delete(h)),
                            (n = h);
                        for (
                          o(r.nextSibling, n), s = 0;
                          s < r.addedNodes.length;
                          s++
                        ) {
                          var h = r.addedNodes[s];
                          a.removed.has(h)
                            ? (a.removed.delete(h), a.maybeMoved.set(h, !0))
                            : a.added.set(h, !0);
                        }
                      },
                      i = this,
                      a = 0;
                    a < this.mutations.length;
                    a++
                  )
                    t(a);
                }
              }),
              (t.prototype.wasReordered = function (e) {
                if (!this.treeChanges.anyParentsChanged) return !1;
                this.processChildlistChanges();
                var t = e.parentNode,
                  i = this.treeChanges.get(e);
                i && i.oldParentNode && (t = i.oldParentNode);
                var a = this.childListChangeMap.get(t);
                if (!a) return !1;
                if (a.moved) return a.moved.get(e);
                a.moved = new r();
                var n = new r();
                function o(e) {
                  if (!e) return !1;
                  if (!a.maybeMoved.has(e)) return !1;
                  var t = a.moved.get(e);
                  return (
                    void 0 !== t ||
                      (n.has(e)
                        ? (t = !0)
                        : (n.set(e, !0),
                          (t =
                            (function (e) {
                              if (d.has(e)) return d.get(e);
                              for (
                                var t = e.previousSibling;
                                t && (a.added.has(t) || o(t));

                              )
                                t = t.previousSibling;
                              return d.set(e, t), t;
                            })(e) !== h(e))),
                      n.has(e)
                        ? (n.delete(e), a.moved.set(e, t))
                        : (t = a.moved.get(e))),
                    t
                  );
                }
                var s = new r();
                function h(e) {
                  var t = s.get(e);
                  if (void 0 !== t) return t;
                  for (
                    t = a.oldPrevious.get(e);
                    t && (a.removed.has(t) || o(t));

                  )
                    t = h(t);
                  return (
                    void 0 === t && (t = e.previousSibling), s.set(e, t), t
                  );
                }
                var d = new r();
                return a.maybeMoved.keys().forEach(o), a.moved.get(e);
              }),
              t
            );
          })(),
          h = (function () {
            function e(e, t) {
              var r = this;
              if (
                ((this.projection = e),
                (this.added = []),
                (this.removed = []),
                (this.reparented =
                  t.all || t.element || t.characterData ? [] : void 0),
                (this.reordered = t.all ? [] : void 0),
                e.getChanged(this, t.elementFilter, t.characterData),
                t.all || t.attribute || t.attributeList)
              ) {
                var i = t.attribute ? [t.attribute] : t.attributeList,
                  a = e.attributeChangedNodes(i);
                t.attribute
                  ? (this.valueChanged = a[t.attribute] || [])
                  : ((this.attributeChanged = a),
                    t.attributeList &&
                      t.attributeList.forEach(function (e) {
                        r.attributeChanged.hasOwnProperty(e) ||
                          (r.attributeChanged[e] = []);
                      }));
              }
              if (t.all || t.characterData) {
                var n = e.getCharacterDataChanged();
                t.characterData
                  ? (this.valueChanged = n)
                  : (this.characterDataChanged = n);
              }
              this.reordered &&
                (this.getOldPreviousSibling = e.getOldPreviousSibling.bind(e));
            }
            return (
              (e.prototype.getOldParentNode = function (e) {
                return this.projection.getOldParentNode(e);
              }),
              (e.prototype.getOldAttribute = function (e, t) {
                return this.projection.getOldAttribute(e, t);
              }),
              (e.prototype.getOldCharacterData = function (e) {
                return this.projection.getOldCharacterData(e);
              }),
              (e.prototype.getOldPreviousSibling = function (e) {
                return this.projection.getOldPreviousSibling(e);
              }),
              e
            );
          })(),
          d = (function () {
            function e() {}
            return (
              (e.prototype.matches = function (e) {
                if (null === e) return !1;
                if (void 0 === this.attrValue) return !0;
                if (!this.contains) return this.attrValue == e;
                for (var t = e.split(" "), r = 0; r < t.length; r++)
                  if (this.attrValue === t[r]) return !0;
                return !1;
              }),
              (e.prototype.toString = function () {
                return "class" === this.attrName && this.contains
                  ? "." + this.attrValue
                  : "id" !== this.attrName || this.contains
                  ? this.contains
                    ? "[" + this.attrName + "~=" + u(this.attrValue) + "]"
                    : "attrValue" in this
                    ? "[" + this.attrName + "=" + u(this.attrValue) + "]"
                    : "[" + this.attrName + "]"
                  : "#" + this.attrValue;
              }),
              e
            );
          })();
        function u(e) {
          return '"' + e.replace(/"/, '\\"') + '"';
        }
        var c = /[a-zA-Z_]+/,
          l = /[a-zA-Z0-9_\-]+/,
          f = (function () {
            function t() {
              (this.uid = t.nextUid++), (this.qualifiers = []);
            }
            return (
              Object.defineProperty(t.prototype, "caseInsensitiveTagName", {
                get: function () {
                  return this.tagName.toUpperCase();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "selectorString", {
                get: function () {
                  return this.tagName + this.qualifiers.join("");
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.isMatching = function (e) {
                return e[t.matchesSelector](this.selectorString);
              }),
              (t.prototype.wasMatching = function (e, t, r) {
                if (!t || !t.attributes) return r;
                var i = t.isCaseInsensitive
                  ? this.caseInsensitiveTagName
                  : this.tagName;
                if ("*" !== i && i !== e.tagName) return !1;
                for (
                  var a = [], n = !1, o = 0;
                  o < this.qualifiers.length;
                  o++
                ) {
                  var s = this.qualifiers[o],
                    h = t.getAttributeOldValue(s.attrName);
                  a.push(h), (n = n || void 0 !== h);
                }
                if (!n) return r;
                for (o = 0; o < this.qualifiers.length; o++)
                  if (
                    ((s = this.qualifiers[o]),
                    void 0 === (h = a[o]) && (h = e.getAttribute(s.attrName)),
                    !s.matches(h))
                  )
                    return !1;
                return !0;
              }),
              (t.prototype.matchabilityChange = function (t, r) {
                var i = this.isMatching(t);
                return i
                  ? this.wasMatching(t, r, i)
                    ? e.Movement.STAYED_IN
                    : e.Movement.ENTERED
                  : this.wasMatching(t, r, i)
                  ? e.Movement.EXITED
                  : e.Movement.STAYED_OUT;
              }),
              (t.parseSelectors = function (e) {
                var r,
                  i,
                  a = [];
                function n() {
                  r && (i && (r.qualifiers.push(i), (i = void 0)), a.push(r)),
                    (r = new t());
                }
                function o() {
                  i && r.qualifiers.push(i), (i = new d());
                }
                for (
                  var s = /\s/,
                    h = void 0,
                    u = "Invalid or unsupported selector syntax.",
                    f = 1,
                    v = 0;
                  v < e.length;

                ) {
                  var p = e[v++];
                  switch (f) {
                    case 1:
                      if (p.match(c)) {
                        n(), (r.tagName = p), (f = 2);
                        break;
                      }
                      if ("*" == p) {
                        n(), (r.tagName = "*"), (f = 3);
                        break;
                      }
                      if ("." == p) {
                        n(),
                          o(),
                          (r.tagName = "*"),
                          (i.attrName = "class"),
                          (i.contains = !0),
                          (f = 4);
                        break;
                      }
                      if ("#" == p) {
                        n(),
                          o(),
                          (r.tagName = "*"),
                          (i.attrName = "id"),
                          (f = 4);
                        break;
                      }
                      if ("[" == p) {
                        n(), o(), (r.tagName = "*"), (i.attrName = ""), (f = 6);
                        break;
                      }
                      if (p.match(s)) break;
                      throw Error(u);
                    case 2:
                      if (p.match(l)) {
                        r.tagName += p;
                        break;
                      }
                      if ("." == p) {
                        o(), (i.attrName = "class"), (i.contains = !0), (f = 4);
                        break;
                      }
                      if ("#" == p) {
                        o(), (i.attrName = "id"), (f = 4);
                        break;
                      }
                      if ("[" == p) {
                        o(), (i.attrName = ""), (f = 6);
                        break;
                      }
                      if (p.match(s)) {
                        f = 14;
                        break;
                      }
                      if ("," == p) {
                        f = 1;
                        break;
                      }
                      throw Error(u);
                    case 3:
                      if ("." == p) {
                        o(), (i.attrName = "class"), (i.contains = !0), (f = 4);
                        break;
                      }
                      if ("#" == p) {
                        o(), (i.attrName = "id"), (f = 4);
                        break;
                      }
                      if ("[" == p) {
                        o(), (i.attrName = ""), (f = 6);
                        break;
                      }
                      if (p.match(s)) {
                        f = 14;
                        break;
                      }
                      if ("," == p) {
                        f = 1;
                        break;
                      }
                      throw Error(u);
                    case 4:
                      if (p.match(c)) {
                        (i.attrValue = p), (f = 5);
                        break;
                      }
                      throw Error(u);
                    case 5:
                      if (p.match(l)) {
                        i.attrValue += p;
                        break;
                      }
                      if ("." == p) {
                        o(), (i.attrName = "class"), (i.contains = !0), (f = 4);
                        break;
                      }
                      if ("#" == p) {
                        o(), (i.attrName = "id"), (f = 4);
                        break;
                      }
                      if ("[" == p) {
                        o(), (f = 6);
                        break;
                      }
                      if (p.match(s)) {
                        f = 14;
                        break;
                      }
                      if ("," == p) {
                        f = 1;
                        break;
                      }
                      throw Error(u);
                    case 6:
                      if (p.match(c)) {
                        (i.attrName = p), (f = 7);
                        break;
                      }
                      if (p.match(s)) break;
                      throw Error(u);
                    case 7:
                      if (p.match(l)) {
                        i.attrName += p;
                        break;
                      }
                      if (p.match(s)) {
                        f = 8;
                        break;
                      }
                      if ("~" == p) {
                        (i.contains = !0), (f = 9);
                        break;
                      }
                      if ("=" == p) {
                        (i.attrValue = ""), (f = 11);
                        break;
                      }
                      if ("]" == p) {
                        f = 3;
                        break;
                      }
                      throw Error(u);
                    case 8:
                      if ("~" == p) {
                        (i.contains = !0), (f = 9);
                        break;
                      }
                      if ("=" == p) {
                        (i.attrValue = ""), (f = 11);
                        break;
                      }
                      if ("]" == p) {
                        f = 3;
                        break;
                      }
                      if (p.match(s)) break;
                      throw Error(u);
                    case 9:
                      if ("=" == p) {
                        (i.attrValue = ""), (f = 11);
                        break;
                      }
                      throw Error(u);
                    case 10:
                      if ("]" == p) {
                        f = 3;
                        break;
                      }
                      if (p.match(s)) break;
                      throw Error(u);
                    case 11:
                      if (p.match(s)) break;
                      if ('"' == p || "'" == p) {
                        (h = p), (f = 13);
                        break;
                      }
                      (i.attrValue += p), (f = 12);
                      break;
                    case 12:
                      if (p.match(s)) {
                        f = 10;
                        break;
                      }
                      if ("]" == p) {
                        f = 3;
                        break;
                      }
                      if ("'" == p || '"' == p) throw Error(u);
                      i.attrValue += p;
                      break;
                    case 13:
                      if (p == h) {
                        f = 10;
                        break;
                      }
                      i.attrValue += p;
                      break;
                    case 14:
                      if (p.match(s)) break;
                      if ("," == p) {
                        f = 1;
                        break;
                      }
                      throw Error(u);
                  }
                }
                switch (f) {
                  case 1:
                  case 2:
                  case 3:
                  case 5:
                  case 14:
                    n();
                    break;
                  default:
                    throw Error(u);
                }
                if (!a.length) throw Error(u);
                return a;
              }),
              (t.nextUid = 1),
              (t.matchesSelector = "matches"),
              t
            );
          })(),
          v = (function () {
            function e() {}
            return (
              (e.createObserverOptions = function (t) {
                var r,
                  i = { childList: !0, subtree: !0 };
                function a(e) {
                  (i.attributes && !r) ||
                    ((i.attributes = !0),
                    (i.attributeOldValue = !0),
                    e
                      ? ((r = r || {}),
                        e.forEach(function (e) {
                          (r[e] = !0), (r[e.toLowerCase()] = !0);
                        }))
                      : (r = void 0));
                }
                return (
                  t.forEach(function (t) {
                    if (t.characterData)
                      return (
                        (i.characterData = !0),
                        void (i.characterDataOldValue = !0)
                      );
                    if (t.all)
                      return (
                        a(),
                        (i.characterData = !0),
                        void (i.characterDataOldValue = !0)
                      );
                    if (t.attribute) a([t.attribute.trim()]);
                    else {
                      var r = e
                        ._elementFilterAttributes(t.elementFilter)
                        .concat(t.attributeList || []);
                      r.length && a(r);
                    }
                  }),
                  r && (i.attributeFilter = Object.keys(r)),
                  i
                );
              }),
              (e.validateOptions = function (t) {
                for (var r in t)
                  if (!(r in e._optionKeys))
                    throw Error("Invalid option: " + r);
                if ("function" != typeof t.callback)
                  throw Error(
                    "Invalid options: callback is required and must be a function"
                  );
                if (!t.queries || !t.queries.length)
                  throw Error(
                    "Invalid options: queries must contain at least one query request object."
                  );
                for (
                  var i = {
                      callback: t.callback,
                      rootNode: t.rootNode || document,
                      observeOwnChanges: !!t.observeOwnChanges,
                      oldPreviousSibling: !!t.oldPreviousSibling,
                      queries: [],
                    },
                    a = 0;
                  a < t.queries.length;
                  a++
                ) {
                  var n = t.queries[a];
                  if (n.all) {
                    if (Object.keys(n).length > 1)
                      throw Error(
                        "Invalid request option. all has no options."
                      );
                    i.queries.push({ all: !0 });
                  } else if ("attribute" in n) {
                    if (
                      (((s = {
                        attribute: e._validateAttribute(n.attribute),
                      }).elementFilter = f.parseSelectors(
                        "*[" + s.attribute + "]"
                      )),
                      Object.keys(n).length > 1)
                    )
                      throw Error(
                        "Invalid request option. attribute has no options."
                      );
                    i.queries.push(s);
                  } else if ("element" in n) {
                    var o = Object.keys(n).length,
                      s = {
                        element: n.element,
                        elementFilter: f.parseSelectors(n.element),
                      };
                    if (
                      (n.hasOwnProperty("elementAttributes") &&
                        ((s.attributeList = e._validateElementAttributes(
                          n.elementAttributes
                        )),
                        o--),
                      o > 1)
                    )
                      throw Error(
                        "Invalid request option. element only allows elementAttributes option."
                      );
                    i.queries.push(s);
                  } else {
                    if (!n.characterData)
                      throw Error(
                        "Invalid request option. Unknown query request."
                      );
                    if (Object.keys(n).length > 1)
                      throw Error(
                        "Invalid request option. characterData has no options."
                      );
                    i.queries.push({ characterData: !0 });
                  }
                }
                return i;
              }),
              (e._validateElementAttributes = function (t) {
                if (!t.trim().length)
                  throw Error(
                    "Invalid request option: elementAttributes must contain at least one attribute."
                  );
                for (
                  var r = {}, i = {}, a = t.split(/\s+/), n = 0;
                  n < a.length;
                  n++
                ) {
                  var o = a[n];
                  if (o) {
                    var s = (o = e._validateAttribute(o)).toLowerCase();
                    if (r[s])
                      throw Error(
                        "Invalid request option: observing multiple case variations of the same attribute is not supported."
                      );
                    (i[o] = !0), (r[s] = !0);
                  }
                }
                return Object.keys(i);
              }),
              (e._elementFilterAttributes = function (e) {
                var t = {};
                return (
                  e.forEach(function (e) {
                    e.qualifiers.forEach(function (e) {
                      t[e.attrName] = !0;
                    });
                  }),
                  Object.keys(t)
                );
              }),
              (e._validateAttribute = function (t) {
                if ("string" != typeof t)
                  throw Error(
                    "Invalid request option. attribute must be a non-zero length string."
                  );
                if (!(t = t.trim()))
                  throw Error(
                    "Invalid request option. attribute must be a non-zero length string."
                  );
                if (!t.match(e._attributeFilterPattern))
                  throw Error(
                    "Invalid request option. invalid attribute name: " + t
                  );
                return t;
              }),
              (e._attributeFilterPattern = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:.]*)$/),
              (e._optionKeys = {
                callback: !0,
                queries: !0,
                rootNode: !0,
                oldPreviousSibling: !0,
                observeOwnChanges: !0,
              }),
              e
            );
          })(),
          p = (function () {
            function e(t) {
              var r = this;
              (this._connected = !1),
                (this._options = v.validateOptions(t)),
                (this._observerOptions = v.createObserverOptions(
                  this._options.queries
                )),
                (this._root = this._options.rootNode),
                (this._callback = this._options.callback),
                (this._elementFilter = Array.prototype.concat.apply(
                  [],
                  this._options.queries.map(function (e) {
                    return e.elementFilter ? e.elementFilter : [];
                  })
                )),
                this._elementFilter.length || (this._elementFilter = void 0),
                (this._calcReordered = this._options.queries.some(function (e) {
                  return e.all;
                })),
                (this._queryValidators = []),
                e.createQueryValidator &&
                  (this._queryValidators = this._options.queries.map(function (
                    t
                  ) {
                    return e.createQueryValidator(r._root, t);
                  })),
                (this._observer = new MutationObserver(function (e) {
                  r._observerCallback(e);
                })),
                this.reconnect();
            }
            return (
              (e.prototype.reconnect = function () {
                if (this._connected) throw Error("Already connected");
                this._observer.observe(this._root, this._observerOptions),
                  (this._connected = !0),
                  this._checkpointQueryValidators();
              }),
              (e.prototype.takeSummaries = function () {
                if (!this._connected) throw Error("Not connected");
                var e = this._createSummaries(this._observer.takeRecords());
                return this._changesToReport(e) ? e : void 0;
              }),
              (e.prototype.disconnect = function () {
                var e = this.takeSummaries();
                return this._observer.disconnect(), (this._connected = !1), e;
              }),
              (e.prototype._observerCallback = function (e) {
                this._options.observeOwnChanges || this._observer.disconnect();
                var t = this._createSummaries(e);
                this._runQueryValidators(t),
                  this._options.observeOwnChanges &&
                    this._checkpointQueryValidators(),
                  this._changesToReport(t) && this._callback(t),
                  !this._options.observeOwnChanges &&
                    this._connected &&
                    (this._checkpointQueryValidators(),
                    this._observer.observe(this._root, this._observerOptions));
              }),
              (e.prototype._createSummaries = function (e) {
                if (!e || !e.length) return [];
                for (
                  var t = new s(
                      this._root,
                      e,
                      this._elementFilter,
                      this._calcReordered,
                      this._options.oldPreviousSibling
                    ),
                    r = [],
                    i = 0;
                  i < this._options.queries.length;
                  i++
                )
                  r.push(new h(t, this._options.queries[i]));
                return r;
              }),
              (e.prototype._checkpointQueryValidators = function () {
                this._queryValidators.forEach(function (e) {
                  e && e.recordPreviousState();
                });
              }),
              (e.prototype._runQueryValidators = function (e) {
                this._queryValidators.forEach(function (t, r) {
                  t && t.validate(e[r]);
                });
              }),
              (e.prototype._changesToReport = function (e) {
                return e.some(function (e) {
                  return (
                    !![
                      "added",
                      "removed",
                      "reordered",
                      "reparented",
                      "valueChanged",
                      "characterDataChanged",
                    ].some(function (t) {
                      return e[t] && e[t].length;
                    }) ||
                    !(
                      !e.attributeChanged ||
                      !Object.keys(e.attributeChanged).some(function (t) {
                        return !!e.attributeChanged[t].length;
                      })
                    )
                  );
                });
              }),
              e
            );
          })(),
          g = (function () {
            function e(e, t) {
              (this.root = e), (this.delegate = t), (this.idMap = {});
            }
            return (
              (e.prototype.initialize = function (e, t) {
                this.idMap[e] = this.root;
                for (var r = 0; r < t.length; r++)
                  this.deserializeNode(t[r], this.root);
              }),
              (e.prototype.applyChanged = function (e, t, r, i) {
                var a = this;
                t.forEach(function (e) {
                  var t = a.deserializeNode(e);
                  a.deserializeNode(e.parentNode),
                    a.deserializeNode(e.previousSibling),
                    t.parentNode && t.parentNode.removeChild(t);
                }),
                  e.forEach(function (e) {
                    var t = a.deserializeNode(e);
                    t.parentNode && t.parentNode.removeChild(t);
                  }),
                  t.forEach(function (e) {
                    var t = a.deserializeNode(e),
                      r = a.deserializeNode(e.parentNode),
                      i = a.deserializeNode(e.previousSibling);
                    r.insertBefore(t, i ? i.nextSibling : r.firstChild);
                  }),
                  r.forEach(function (e) {
                    var t = a.deserializeNode(e);
                    Object.keys(e.attributes).forEach(function (r) {
                      var i = e.attributes[r];
                      null === i
                        ? t.removeAttribute(r)
                        : (a.delegate &&
                            a.delegate.setAttribute &&
                            a.delegate.setAttribute(t, r, i)) ||
                          t.setAttribute(r, i);
                    });
                  }),
                  i.forEach(function (e) {
                    a.deserializeNode(e).textContent = e.textContent;
                  }),
                  e.forEach(function (e) {
                    delete a.idMap[e.id];
                  });
              }),
              (e.prototype.deserializeNode = function (e, t) {
                var r = this;
                if (null === e) return null;
                var i = this.idMap[e.id];
                if (i) return i;
                var a = this.root.ownerDocument;
                switch ((null === a && (a = this.root), e.nodeType)) {
                  case Node.COMMENT_NODE:
                    i = a.createComment(e.textContent);
                    break;
                  case Node.TEXT_NODE:
                    i = a.createTextNode(e.textContent);
                    break;
                  case Node.DOCUMENT_TYPE_NODE:
                    i = a.implementation.createDocumentType(
                      e.name,
                      e.publicId,
                      e.systemId
                    );
                    break;
                  case Node.ELEMENT_NODE:
                    this.delegate &&
                      this.delegate.createElement &&
                      (i = this.delegate.createElement(e.tagName)),
                      i || (i = a.createElement(e.tagName)),
                      Object.keys(e.attributes).forEach(function (t) {
                        (r.delegate &&
                          r.delegate.setAttribute &&
                          r.delegate.setAttribute(i, t, e.attributes[t])) ||
                          i.setAttribute(t, e.attributes[t]);
                      });
                    break;
                  default:
                    throw "Unsupported node type: " + e.nodeType;
                }
                if (
                  ((this.idMap[e.id] = i), t && t.appendChild(i), e.childNodes)
                )
                  for (var n = 0; n < e.childNodes.length; n++)
                    this.deserializeNode(e.childNodes[n], i);
                return i;
              }),
              e
            );
          })(),
          b = (function () {
            function e(e, t, i) {
              var a = this;
              (this.target = e),
                (this.mirror = t),
                (this.nextId = 1),
                (this.knownNodes = new r());
              for (
                var n = this.serializeNode(e).id, o = [], s = e.firstChild;
                s;
                s = s.nextSibling
              )
                o.push(this.serializeNode(s, !0));
              this.mirror.initialize(n, o);
              var h = [{ all: !0 }];
              i && (h = h.concat(i)),
                (this.mutationSummary = new p({
                  rootNode: e,
                  callback: function (e) {
                    a.applyChanged(e);
                  },
                  queries: h,
                }));
            }
            return (
              (e.prototype.disconnect = function () {
                this.mutationSummary &&
                  (this.mutationSummary.disconnect(),
                  (this.mutationSummary = void 0));
              }),
              (e.prototype.rememberNode = function (e) {
                var t = this.nextId++;
                return this.knownNodes.set(e, t), t;
              }),
              (e.prototype.forgetNode = function (e) {
                this.knownNodes.delete(e);
              }),
              (e.prototype.serializeNode = function (e, t) {
                if (null === e) return null;
                var r = this.knownNodes.get(e);
                if (void 0 !== r) return { id: r };
                var i = { nodeType: e.nodeType, id: this.rememberNode(e) };
                switch (i.nodeType) {
                  case Node.DOCUMENT_TYPE_NODE:
                    var a = e;
                    (i.name = a.name),
                      (i.publicId = a.publicId),
                      (i.systemId = a.systemId);
                    break;
                  case Node.COMMENT_NODE:
                  case Node.TEXT_NODE:
                    i.textContent = e.textContent;
                    break;
                  case Node.ELEMENT_NODE:
                    var n = e;
                    (i.tagName = n.tagName), (i.attributes = {});
                    for (var o = 0; o < n.attributes.length; o++) {
                      var s = n.attributes[o];
                      i.attributes[s.name] = s.value;
                    }
                    if (t && n.childNodes.length) {
                      i.childNodes = [];
                      for (var h = n.firstChild; h; h = h.nextSibling)
                        i.childNodes.push(this.serializeNode(h, !0));
                    }
                }
                return i;
              }),
              (e.prototype.serializeAddedAndMoved = function (e, t, i) {
                var a = this,
                  n = e.concat(t).concat(i),
                  o = new r();
                n.forEach(function (e) {
                  var t = e.parentNode,
                    i = o.get(t);
                  i || ((i = new r()), o.set(t, i)), i.set(e, !0);
                });
                var s = [];
                return (
                  o.keys().forEach(function (e) {
                    for (var t = o.get(e), r = t.keys(); r.length; ) {
                      for (
                        var i = r[0];
                        i.previousSibling && t.has(i.previousSibling);

                      )
                        i = i.previousSibling;
                      for (; i && t.has(i); ) {
                        var n = a.serializeNode(i);
                        (n.previousSibling = a.serializeNode(
                          i.previousSibling
                        )),
                          (n.parentNode = a.serializeNode(i.parentNode)),
                          s.push(n),
                          t.delete(i),
                          (i = i.nextSibling);
                      }
                      r = t.keys();
                    }
                  }),
                  s
                );
              }),
              (e.prototype.serializeAttributeChanges = function (e) {
                var t = this,
                  i = new r();
                return (
                  Object.keys(e).forEach(function (r) {
                    e[r].forEach(function (e) {
                      var a = i.get(e);
                      a ||
                        (((a = t.serializeNode(e)).attributes = {}),
                        i.set(e, a)),
                        (a.attributes[r] = e.getAttribute(r));
                    });
                  }),
                  i.keys().map(function (e) {
                    return i.get(e);
                  })
                );
              }),
              (e.prototype.applyChanged = function (e) {
                var t = this,
                  r = e[0],
                  i = r.removed.map(function (e) {
                    return t.serializeNode(e);
                  }),
                  a = this.serializeAddedAndMoved(
                    r.added,
                    r.reparented,
                    r.reordered
                  ),
                  n = this.serializeAttributeChanges(r.attributeChanged),
                  o = r.characterDataChanged.map(function (e) {
                    var r = t.serializeNode(e);
                    return (r.textContent = e.textContent), r;
                  });
                this.mirror.applyChanged(i, a, n, o),
                  r.removed.forEach(function (e) {
                    t.forgetNode(e);
                  });
              }),
              e
            );
          })();
        if (void 0 === MutationObserver)
          throw (
            (console.error("DOM Mutation Observers are required."),
            console.error(
              "https://developer.mozilla.org/en-US/docs/DOM/MutationObserver"
            ),
            Error("DOM Mutation Observers are required"))
          );
        (e.ChildListChange = i),
          (e.MutationProjection = s),
          (e.MutationSummary = p),
          (e.NodeChange = n),
          (e.NodeMap = r),
          (e.Qualifier = d),
          (e.Selector = f),
          (e.Summary = h),
          (e.TreeChanges = o),
          (e.TreeMirror = g),
          (e.TreeMirrorClient = b),
          Object.defineProperty(e, "__esModule", { value: !0 });
      })(t);
    },
  },
]);
