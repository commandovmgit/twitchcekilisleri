function require(e) {
    var t = require.modules[e];
    if (!t) throw new Error('failed to require "' + e + '"');
    return "exports" in t || "function" != typeof t.definition || (t.client = t.component = !0, t.definition.call(this, t.exports = {}, t), delete t.definition), t.exports
}

require.loader = "component", require.helper = {}, require.helper.semVerSort = function (e, t) {
    for (var n = e.version.split("."), i = t.version.split("."), r = 0; r < n.length; ++r) {
        var s = parseInt(n[r], 10), o = parseInt(i[r], 10);
        if (s !== o) return s > o ? 1 : -1;
        var a = n[r].substr(("" + s).length), l = i[r].substr(("" + o).length);
        if ("" === a && "" !== l) return 1;
        if ("" !== a && "" === l) return -1;
        if ("" !== a && "" !== l) return a > l ? 1 : -1
    }
    return 0
}, require.latest = function (e, t) {
    function n(e) {
        throw new Error('failed to find latest module of "' + e + '"')
    }

    var i = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/, r = /(.*)~(.*)/;
    r.test(e) || n(e);
    for (var s = Object.keys(require.modules), o = [], a = [], l = 0; l < s.length; l++) {
        var c = s[l];
        if (new RegExp(e + "@").test(c)) {
            var u = c.substr(e.length + 1), h = i.exec(c);
            null != h ? o.push({version: u, name: c}) : a.push({version: u, name: c})
        }
    }
    if (0 === o.concat(a).length && n(e), o.length > 0) {
        var d = o.sort(require.helper.semVerSort).pop().name;
        return t === !0 ? d : require(d)
    }
    var d = a.sort(function (e, t) {
        return e.name > t.name
    })[0].name;
    return t === !0 ? d : require(d)
}, require.modules = {}, require.register = function (e, t) {
    require.modules[e] = {definition: t}
}, require.define = function (e, t) {
    require.modules[e] = {exports: t}
}, require.register("yields~isarray@1.0.0", function (e, t) {
    var n = Array.isArray, i = Object.prototype.toString;
    t.exports = n || function (e) {
        return !!e && "[object Array]" == i.call(e)
    }
}), require.register("darsain~e@0.0.1", function (e, t) {
    function n(e) {
        return function (t, n, r) {
            return i(e, t, n, r)
        }
    }

    function i(e, t, n, i) {
        (n && n.nodeType > 0 || s(n) || "object" != typeof n) && (i = n, n = null);
        var a, l;
        if (s(t) ? (a = o.createDocumentFragment(), i = t) : (l = t.match(/^[\w\-]+/), a = o.createElementNS(e, l ? l[0] : "div"), (l = t.match(/#([\w\-]+)/)) && (a.id = l[1]), (l = t.match(/\.[\w\-]+/g)) && (a.className = l.join(" ").replace(/\./g, "")), n && r(a, n)), i || "string" == typeof i) {
            s(i) || (i = [i]);
            for (var c, u, h = 0; c = i[h], u = typeof c, h < i.length; h++) "string" === u ? a.appendChild(o.createTextNode(c)) : c && c.nodeType > 0 && a.appendChild(c)
        }
        return a
    }

    function r(e, t) {
        for (var n in t) n.indexOf("on") ? e.setAttributeNS(n.indexOf("xlink") ? null : c, n, t[n]) : e[n] = t[n]
    }

    var s = require("yields~isarray@1.0.0"), o = document, a = "http://www.w3.org/1999/xhtml",
        l = "http://www.w3.org/2000/svg", c = "http://www.w3.org/1999/xlink";
    t.exports = e = n(a), e.svg = n(l), e.ns = n
}), require.register("darsain~definer@0.0.1", function (e, t) {
    function n(e) {
        return this instanceof n ? void(this.obj = e) : new n(e)
    }

    t.exports = n;
    var i = !0;
    try {
        Object.defineProperty({}, "x", {})
    } catch (e) {
        i = !1
    }
    var r = {}, s = i ? Object.defineProperty : function (e, t, n) {
        e[t] = n ? n.value : void 0
    };
    n.prototype.type = function (e, t) {
        return this[e] = function (e, n) {
            return this.define(e, n, t), this
        }, this
    }, n.prototype.define = function (e, t, n) {
        return n = n || r, delete this.obj[e], delete n.value, delete n.get, delete n.set, t && "function" == typeof t.get && "function" == typeof t.set ? (n.get = t.get, n.set = t.set) : n.value = t, s(this.obj, e, n), this
    }
}), require.register("darsain~event@0.1.0", function (e, t) {
    "use strict";
    e.bind = window.addEventListener ? function (e, t, n, i) {
        return e.addEventListener(t, n, i || !1), n
    } : function (e, t, n) {
        var i = t + n;
        return e[i] = e[i] || function () {
            var t = window.event;
            t.target = t.srcElement, t.preventDefault = function () {
                t.returnValue = !1
            }, t.stopPropagation = function () {
                t.cancelBubble = !0
            }, n.call(e, t)
        }, e.attachEvent("on" + t, e[i]), n
    }, e.unbind = window.removeEventListener ? function (e, t, n, i) {
        return e.removeEventListener(t, n, i || !1), n
    } : function (e, t, n) {
        var i = t + n;
        e.detachEvent("on" + t, e[i]);
        try {
            delete e[i]
        } catch (t) {
            e[i] = void 0
        }
        return n
    }
}), require.register("darsain~position@0.1.0", function (e, t) {
    "use strict";

    function n(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function i(e) {
        return e && null != e.setInterval
    }

    function r(e) {
        var t = s.pageYOffset || a.scrollTop, r = s.pageXOffset || a.scrollLeft,
            o = {left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0};
        if (i(e)) o.width = s.innerWidth || a.clientWidth, o.height = s.innerHeight || a.clientHeight; else {
            if (!a.contains(e) || null == e.getBoundingClientRect) return o;
            n(o, e.getBoundingClientRect()), o.width = o.right - o.left, o.height = o.bottom - o.top
        }
        return o.top = o.top + t - a.clientTop, o.left = o.left + r - a.clientLeft, o.right = o.left + o.width, o.bottom = o.top + o.height, o
    }

    t.exports = r;
    var s = window, o = s.document, a = o.documentElement
}), require.register("component~indexof@0.0.3", function (e, t) {
    t.exports = function (e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
        return -1
    }
}), require.register("component~classes@1.2.1", function (e, t) {
    function n(e) {
        if (!e) throw new Error("A DOM element reference is required");
        this.el = e, this.list = e.classList
    }

    var i = require("component~indexof@0.0.3"), r = /\s+/, s = Object.prototype.toString;
    t.exports = function (e) {
        return new n(e)
    }, n.prototype.add = function (e) {
        if (this.list) return this.list.add(e), this;
        var t = this.array(), n = i(t, e);
        return ~n || t.push(e), this.el.className = t.join(" "), this
    }, n.prototype.remove = function (e) {
        if ("[object RegExp]" == s.call(e)) return this.removeMatching(e);
        if (this.list) return this.list.remove(e), this;
        var t = this.array(), n = i(t, e);
        return ~n && t.splice(n, 1), this.el.className = t.join(" "), this
    }, n.prototype.removeMatching = function (e) {
        for (var t = this.array(), n = 0; n < t.length; n++) e.test(t[n]) && this.remove(t[n]);
        return this
    }, n.prototype.toggle = function (e, t) {
        return this.list ? ("undefined" != typeof t ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this) : ("undefined" != typeof t ? t ? this.add(e) : this.remove(e) : this.has(e) ? this.remove(e) : this.add(e), this)
    }, n.prototype.array = function () {
        var e = this.el.className.replace(/^\s+|\s+$/g, ""), t = e.split(r);
        return "" === t[0] && t.shift(), t
    }, n.prototype.has = n.prototype.contains = function (e) {
        return this.list ? this.list.contains(e) : !!~i(this.array(), e)
    }
}), require.register("darsain~tooltip@0.1.0", function (e, t) {
    "use strict";

    function n(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function i(e) {
        return 0 | Math.round(String(e).replace(/[^\-0-9.]/g, ""))
    }

    function r(e) {
        var t = String(g(e, r.propName)), n = t.match(/([0-9.]+)([ms]{1,2})/);
        return n && (t = Number(n[1]), "s" === n[2] && (t *= 1e3)), 0 | t
    }

    function s(e, t) {
        return this instanceof s ? (this.hidden = 1, this.options = n(f(s.defaults), t), this._createElement(), void this.content(e)) : new s(e, t)
    }

    var o = require("darsain~event@0.1.0"), a = require("component~classes@1.2.1"),
        l = require("component~indexof@0.0.3"), c = require("darsain~position@0.1.0"), u = window, h = u.document,
        d = h.body, p = ["top", "bottom"];
    t.exports = s;
    var f = Object.create || function () {
        function e() {
        }

        return function (t) {
            return e.prototype = t, new e
        }
    }(), g = u.getComputedStyle ? function (e, t) {
        return u.getComputedStyle(e, null)[t]
    } : function (e, t) {
        return e.currentStyle[t]
    };
    r.propName = function () {
        for (var e = h.createElement("div"), t = ["transitionDuration", "webkitTransitionDuration"], n = "1s", i = 0; i < t.length; i++) if (e.style[t[i]] = n, e.style[t[i]] === n) return t[i]
    }(), s.prototype._createElement = function () {
        this.element = h.createElement("div"), this.classes = a(this.element), this.classes.add(this.options.baseClass);
        for (var e, t = 0; t < s.classTypes.length; t++) e = s.classTypes[t] + "Class", this.options[e] && this.classes.add(this.options[e])
    }, s.prototype.type = function (e) {
        return this.changeClassType("type", e)
    }, s.prototype.effect = function (e) {
        return this.changeClassType("effect", e)
    }, s.prototype.changeClassType = function (e, t) {
        return e += "Class", this.options[e] && this.classes.remove(this.options[e]), this.options[e] = t, t && this.classes.add(t), this
    }, s.prototype.updateSize = function () {
        return this.hidden && (this.element.style.visibility = "hidden", d.appendChild(this.element)), this.width = this.element.offsetWidth, this.height = this.element.offsetHeight, null == this.spacing && (this.spacing = null != this.options.spacing ? this.options.spacing : i(g(this.element, "top"))), this.hidden ? (d.removeChild(this.element), this.element.style.visibility = "") : this.position(), this
    }, s.prototype.content = function (e) {
        return "object" == typeof e ? (this.element.innerHTML = "", this.element.appendChild(e)) : this.element.innerHTML = e, this.updateSize(), this
    }, s.prototype.place = function (e) {
        return this.options.place = e, this.hidden || this.position(), this
    }, s.prototype.attach = function (e) {
        return this.attachedTo = e, this.hidden || this.position(), this
    }, s.prototype.detach = function () {
        return this.hide(), this.attachedTo = null, this
    }, s.prototype._pickPlace = function (e) {
        if (!this.options.auto) return this.options.place;
        var t = c(u), n = this.options.place.split("-"), i = this.spacing;
        if (~l(p, n[0])) switch (e.top - this.height - i <= t.top ? n[0] = "bottom" : e.bottom + this.height + i >= t.bottom && (n[0] = "top"), n[1]) {
            case"left":
                e.right - this.width <= t.left && (n[1] = "right");
                break;
            case"right":
                e.left + this.width >= t.right && (n[1] = "left");
                break;
            default:
                e.left + e.width / 2 + this.width / 2 >= t.right ? n[1] = "left" : e.right - e.width / 2 - this.width / 2 <= t.left && (n[1] = "right")
        } else switch (e.left - this.width - i <= t.left ? n[0] = "right" : e.right + this.width + i >= t.right && (n[0] = "left"), n[1]) {
            case"top":
                e.bottom - this.height <= t.top && (n[1] = "bottom");
                break;
            case"bottom":
                e.top + this.height >= t.bottom && (n[1] = "top");
                break;
            default:
                e.top + e.height / 2 + this.height / 2 >= t.bottom ? n[1] = "top" : e.bottom - e.height / 2 - this.height / 2 <= t.top && (n[1] = "bottom")
        }
        return n.join("-")
    }, s.prototype.position = function (e, t) {
        this.attachedTo && (e = this.attachedTo), null == e && this._p ? (e = this._p[0], t = this._p[1]) : this._p = arguments;
        var n = "number" == typeof e ? {
            left: 0 | e,
            right: 0 | e,
            top: 0 | t,
            bottom: 0 | t,
            width: 0,
            height: 0
        } : c(e), i = this.spacing, r = this._pickPlace(n);
        r !== this.curPlace && (this.curPlace && this.classes.remove(this.curPlace), this.classes.add(r), this.curPlace = r);
        var s, o;
        switch (this.curPlace) {
            case"top":
                s = n.top - this.height - i, o = n.left + n.width / 2 - this.width / 2;
                break;
            case"top-left":
                s = n.top - this.height - i, o = n.right - this.width;
                break;
            case"top-right":
                s = n.top - this.height - i, o = n.left;
                break;
            case"bottom":
                s = n.bottom + i, o = n.left + n.width / 2 - this.width / 2;
                break;
            case"bottom-left":
                s = n.bottom + i, o = n.right - this.width;
                break;
            case"bottom-right":
                s = n.bottom + i, o = n.left;
                break;
            case"left":
                s = n.top + n.height / 2 - this.height / 2, o = n.left - this.width - i;
                break;
            case"left-top":
                s = n.bottom - this.height, o = n.left - this.width - i;
                break;
            case"left-bottom":
                s = n.top, o = n.left - this.width - i;
                break;
            case"right":
                s = n.top + n.height / 2 - this.height / 2, o = n.right + i;
                break;
            case"right-top":
                s = n.bottom - this.height, o = n.right + i;
                break;
            case"right-bottom":
                s = n.top, o = n.right + i
        }
        return this.element.style.top = Math.round(s) + "px", this.element.style.left = Math.round(o) + "px", this
    }, s.prototype.show = function (e, t) {
        return e = this.attachedTo ? this.attachedTo : e, clearTimeout(this.aIndex), null != e && this.position(e, t), this.hidden && (this.hidden = 0, d.appendChild(this.element)), this.attachedTo && this._aware(), this.options.inClass && (this.options.effectClass && void this.element.clientHeight, this.classes.add(this.options.inClass)), this
    }, s.prototype.hide = function () {
        if (!this.hidden) {
            var e = this, t = 0;
            return this.options.inClass && (this.classes.remove(this.options.inClass), this.options.effectClass && (t = r(this.element))), this.attachedTo && this._unaware(), clearTimeout(this.aIndex), this.aIndex = setTimeout(function () {
                e.aIndex = 0, d.removeChild(e.element), e.hidden = 1
            }, t), this
        }
    }, s.prototype.toggle = function (e, t) {
        return this[this.hidden ? "show" : "hide"](e, t)
    }, s.prototype.destroy = function () {
        clearTimeout(this.aIndex), this._unaware(), this.hidden || d.removeChild(this.element), this.element = this.options = null
    }, s.prototype._aware = function () {
        var e = l(s.winAware, this);
        ~e || s.winAware.push(this)
    }, s.prototype._unaware = function () {
        var e = l(s.winAware, this);
        ~e && s.winAware.splice(e, 1)
    }, s.reposition = function () {
        function e() {
            !n && s.winAware.length && (n = i(t, 17))
        }

        function t() {
            n = 0;
            for (var e, t = 0, i = s.winAware.length; t < i; t++) e = s.winAware[t], e.position()
        }

        var n, i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
            return setTimeout(e, 17)
        };
        return e
    }(), s.winAware = [], o.bind(window, "resize", s.reposition), o.bind(window, "scroll", s.reposition), s.classTypes = ["type", "effect"], s.defaults = {
        baseClass: "tooltip",
        typeClass: null,
        effectClass: null,
        inClass: "in",
        place: "top",
        spacing: null,
        auto: 0
    }
}), require.register("component~type@1.0.0", function (e, t) {
    var n = Object.prototype.toString;
    t.exports = function (e) {
        switch (n.call(e)) {
            case"[object Function]":
                return "function";
            case"[object Date]":
                return "date";
            case"[object RegExp]":
                return "regexp";
            case"[object Arguments]":
                return "arguments";
            case"[object Array]":
                return "array";
            case"[object String]":
                return "string"
        }
        return null === e ? "null" : void 0 === e ? "undefined" : e && 1 === e.nodeType ? "element" : e === Object(e) ? "object" : typeof e
    }
}), require.register("darsain~extend@0.1.0", function (e, t) {
    function n(e) {
        var t = s.call(arguments, 1), o = !1;
        "boolean" == typeof e && (o = e, e = t.shift());
        for (var a, l = 0, c = t.length; a = t[l], l < c; l++) if (a) for (var u in a) if (o) switch (r(a[u])) {
            case"object":
                n(e[u] = e[u] || {}, a[u]);
                break;
            case"array":
                e[u] = i(a[u]);
                break;
            default:
                e[u] = a[u]
        } else e[u] = a[u];
        return e
    }

    function i(e) {
        for (var t, i = [], s = 0, o = e.length; t = e[s], s < o; s++) i.push("object" === r(t) ? n(!0, {}, t) : t);
        return i
    }

    var r = require("component~type@1.0.0"), s = [].slice;
    t.exports = e = n
}), require.register("code42day~dataset@0.3.0", function (e, t) {
    function n(e) {
        return e.replace(/([A-Z])/g, function (e) {
            return "-" + e.toLowerCase()
        })
    }

    function i(e, t, n) {
        function i(t, n) {
            return r.set(e, t, n), a
        }

        function s(t) {
            return r.del(e, t), a
        }

        function o(t) {
            return r.get(e, t)
        }

        var a = {set: i, get: o, del: s};
        return 3 === arguments.length ? i(t, n) : 2 == arguments.length ? o(t) : a
    }

    t.exports = i;
    var r;
    r = document.head && document.head.dataset ? {
        set: function (e, t, n) {
            e.dataset && (e.dataset[t] = n)
        }, get: function (e, t) {
            return e.dataset ? e.dataset[t] : void 0
        }, del: function (e, t) {
            e.dataset && delete e.dataset[t]
        }
    } : {
        set: function (e, t, i) {
            e.setAttribute("data-" + n(t), i)
        }, get: function (e, t) {
            return e.getAttribute("data-" + n(t))
        }, del: function (e, t) {
            e.removeAttribute("data-" + n(t))
        }
    }
}), require.register("darsain~tooltips@0.1.0", function (e, t) {
    "use strict";

    function n(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function i(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    function r(e, t) {
        function h(e, t) {
            var n = k.get(e);
            return n && n[t](), k
        }

        function d(e) {
            var n = l(e), r = n.get(t.key);
            if (!r) return !1;
            var s, o = u(t.tooltip);
            for (var c in a.defaults) s = n.get(t.key + i(c.replace(/Class$/, ""))), s && (o[c] = s);
            return new a(r, o).attach(e)
        }

        function p(e) {
            for (var t = 0, n = e.length; t < n; t++) f(e[t])
        }

        function f(e) {
            e[y] || ~o(k.elements, e) || (s.bind(e, t.showOn, v), s.bind(e, t.hideOn, v), k.elements.push(e))
        }

        function g(e) {
            k.elements === e && (e = e.slice());
            for (var t = 0, n = e.length; t < n; t++) m(e[t])
        }

        function m(e) {
            var n = o(k.elements, e);
            ~n && (e[y] && (e[y].destroy(), delete e[y]), s.unbind(e, t.showOn, v), s.unbind(e, t.hideOn, v), k.elements.splice(n, 1))
        }

        function v(e) {
            t.showOn === t.hideOn ? k.toggle(this) : k[e.type === t.showOn ? "show" : "hide"](this)
        }

        function w(e) {
            for (var t, n, i, r, s = 0, o = e.length; s < o; s++) {
                for (t = e[s].addedNodes, n = e[s].removedNodes, i = 0, r = t.length; i < r; i++) k.add(t[i]);
                for (i = 0, r = n.length; i < r; i++) k.remove(n[i])
            }
        }

        if (!(this instanceof r)) return new r(e, t);
        var b, y, k = this;
        k.show = function (e) {
            return h(e, "show")
        }, k.hide = function (e) {
            return h(e, "hide")
        }, k.toggle = function (e) {
            return h(e, "toggle")
        }, k.get = function (e) {
            var t = !!e && (e[y] || d(e));
            return t && !e[y] && (e[y] = t), t
        }, k.add = function (e) {
            return e && 1 === e.nodeType ? (l(e).get(t.key) ? f(e) : e.children && p(e.querySelectorAll(k.selector)), k) : k
        }, k.remove = function (e) {
            return e && 1 === e.nodeType ? (l(e).get(t.key) ? m(e) : e.children && g(e.querySelectorAll(k.selector)), k) : k
        }, k.reload = function () {
            return g(k.elements), p(k.container.querySelectorAll(k.selector)), k
        }, k.destroy = function () {
            g(this.elements), b && b.disconnect(), this.container = this.elements = this.options = b = null
        }, function () {
            k.container = e, k.options = t = n(u(r.defaults), t), k.ID = y = t.key + Math.random().toString(36).slice(2), k.elements = [], k.selector = "[data-" + t.key + "]", k.reload(), t.observe && c && (b = new c(w), b.observe(k.container, {
                childList: !0,
                subtree: !0
            }))
        }()
    }

    var s = require("darsain~event@0.1.0"), o = require("component~indexof@0.0.3"),
        a = require("darsain~tooltip@0.1.0"), l = require("code42day~dataset@0.3.0");
    t.exports = r;
    var c = window.MutationObserver || window.WebkitMutationObserver, u = Object.create || function () {
        function e() {
        }

        return function (t) {
            return e.prototype = t, new e
        }
    }();
    r.Tooltip = a, r.defaults = {tooltip: {}, key: "tooltip", showOn: "mouseenter", hideOn: "mouseleave", observe: 0}
}), require.register("component~inherit@0.0.3", function (e, t) {
    t.exports = function (e, t) {
        var n = function () {
        };
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
    }
}), require.register("darsain~isarraylike@0.1.0", function (e, t) {
    t.exports = function (e, t) {
        return e && "object" == typeof e && "number" == typeof e.length && (!t || "function" == typeof e.splice)
    }
}), require.register("darsain~list@0.1.0", function (e, t) {
    function n(e) {
        return this instanceof n ? (a(this).define("length", 0, h), void(c(e) && this.add(e))) : new n(e)
    }

    function i() {
        return u.concat.apply(this.toArray(), arguments)
    }

    function r() {
        var e, t, n = arguments;
        for (e = 0; e < n.length; e++) if (c(n[e])) for (t = 0; t < n[e].length; t++) this.push(n[e][t]); else this.push(n[e]);
        return this.length
    }

    function s() {
        for (; this.length;) delete this[--this.length]
    }

    function o() {
        for (var e = [], t = 0; t < this.length; t++) e[t] = this[t];
        return e
    }

    var a = require("darsain~definer@0.0.1"), l = require("component~inherit@0.0.3"),
        c = require("darsain~isarraylike@0.1.0"), u = Array.prototype, h = {writable: !0};
    t.exports = n, l(n, Array), a(n.prototype).type("m").m("constructor", n).m("concat", i).m("add", r).m("each", u.forEach).m("reset", s).m("toArray", o)
}), require.register("component~bind@1.0.0", function (e, t) {
    var n = [].slice;
    t.exports = function (e, t) {
        if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
        var i = n.call(arguments, 2);
        return function () {
            return t.apply(e, i.concat(n.call(arguments)))
        }
    }
}), require.register("darsain~sortedlist@0.0.2", function (e, t) {
    function n(e, t) {
        return this instanceof n ? ("function" == typeof e && (t = e, e = null), d(this).type("p", g).p("reversed", !1).p("_order", t || i), void u.call(this, e)) : new n(e, t)
    }

    function i(e, t) {
        return typeof e != typeof t && (e += "", t += ""), e < t ? -1 : e > t ? 1 : 0
    }

    function r(e, t) {
        var n = this._order(e, t);
        return this.reversed ? n * -1 : n
    }

    function s(e) {
        for (var t, n = 0, i = this.length; i > n;) switch (t = (i + n) / 2 >>> 0, this.order(this[t], e)) {
            case-1:
                n = t + 1;
                break;
            case 1:
                i = t;
                break;
            default:
                return t
        }
        return -1
    }

    function o(e) {
        var t = this.length;
        for (this[t] = e, this.length++; t && this.order(e, this[t - 1]) < 1;) this[t] = this[--t], this[t] = e;
        return t
    }

    function a() {
        for (var e = 0; e < arguments.length; e++) this.insert(arguments[e]);
        return this.length
    }

    function l(e) {
        return "function" == typeof e && (this._order = e), f.sort.call(this, p(this, "order"))
    }

    function c() {
        this.reversed = !this.reversed, f.reverse.call(this)
    }

    var u = require("darsain~list@0.1.0"), h = require("component~inherit@0.0.3"), d = require("darsain~definer@0.0.1"),
        p = require("component~bind@1.0.0"), f = u.prototype, g = {writable: !0};
    t.exports = n, h(n, u), d(n.prototype).type("m").m("constructor", n).m("order", r).m("indexOf", s).m("insert", o).m("push", a).m("reverse", c).m("sort", l).m("unshift", a)
}), require.register("darsain~constructor-apply@0.1.0", function (e, t) {
    function n(e, t) {
        return e.apply(this, t)
    }

    function i(e, t) {
        return n.prototype = e.prototype, new n(e, t)
    }

    t.exports = i
}), require.register("component~emitter@1.1.3", function (e, t) {
    function n(e) {
        if (e) return i(e)
    }

    function i(e) {
        for (var t in n.prototype) e[t] = n.prototype[t];
        return e
    }

    t.exports = n, n.prototype.on = n.prototype.addEventListener = function (e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
    }, n.prototype.once = function (e, t) {
        function n() {
            i.off(e, n), t.apply(this, arguments)
        }

        var i = this;
        return this._callbacks = this._callbacks || {}, n.fn = t, this.on(e, n), this
    }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var n = this._callbacks[e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks[e], this;
        for (var i, r = 0; r < n.length; r++) if (i = n[r], i === t || i.fn === t) {
            n.splice(r, 1);
            break
        }
        return this
    }, n.prototype.emit = function (e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1), n = this._callbacks[e];
        if (n) {
            n = n.slice(0);
            for (var i = 0, r = n.length; i < r; ++i) n[i].apply(this, t)
        }
        return this
    }, n.prototype.listeners = function (e) {
        return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
    }, n.prototype.hasListeners = function (e) {
        return !!this.listeners(e).length
    }
}), require.register("component~query@0.0.3", function (e, t) {
    function n(e, t) {
        return t.querySelector(e)
    }

    e = t.exports = function (e, t) {
        return t = t || document, n(e, t)
    }, e.all = function (e, t) {
        return t = t || document, t.querySelectorAll(e)
    }, e.engine = function (t) {
        if (!t.one) throw new Error(".one callback required");
        if (!t.all) throw new Error(".all callback required");
        return n = t.one, e.all = t.all, e
    }
}), require.register("component~matches-selector@0.1.4", function (e, t) {
    function n(e, t) {
        if (s) return s.call(e, t);
        for (var n = i.all(t, e.parentNode), r = 0; r < n.length; ++r) if (n[r] == e) return !0;
        return !1
    }

    var i = require("component~query@0.0.3"), r = Element.prototype,
        s = r.matches || r.webkitMatchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector;
    t.exports = n
}), require.register("component~closest@0.1.3", function (e, t) {
    var n = require("component~matches-selector@0.1.4");
    t.exports = function (e, t, i, r) {
        for (e = i ? {parentNode: e} : e, r = r || document; (e = e.parentNode) && e !== document;) {
            if (n(e, t)) return e;
            if (e === r) return
        }
    }
}), require.register("component~event@0.1.3", function (e, t) {
    var n = window.addEventListener ? "addEventListener" : "attachEvent",
        i = window.removeEventListener ? "removeEventListener" : "detachEvent",
        r = "addEventListener" !== n ? "on" : "";
    e.bind = function (e, t, i, s) {
        return e[n](r + t, i, s || !1), i
    }, e.unbind = function (e, t, n, s) {
        return e[i](r + t, n, s || !1), n
    }
}), require.register("discore~closest@0.1.3", function (e, t) {
    var n = require("component~matches-selector@0.1.4");
    t.exports = function (e, t, i, r) {
        for (e = i ? {parentNode: e} : e, r = r || document; (e = e.parentNode) && e !== document;) {
            if (n(e, t)) return e;
            if (e === r) return
        }
    }
}), require.register("component~delegate@0.2.2", function (e, t) {
    var n = require("discore~closest@0.1.3"), i = require("component~event@0.1.3");
    e.bind = function (e, t, r, s, o) {
        return i.bind(e, r, function (i) {
            var r = i.target || i.srcElement;
            i.delegateTarget = n(r, t, !0, e), i.delegateTarget && s.call(e, i)
        }, o)
    }, e.unbind = function (e, t, n, r) {
        i.unbind(e, t, n, r)
    }
}), require.register("component~events@1.0.7", function (e, t) {
    function n(e, t) {
        if (!(this instanceof n)) return new n(e, t);
        if (!e) throw new Error("element required");
        if (!t) throw new Error("object required");
        this.el = e, this.obj = t, this._events = {}
    }

    function i(e) {
        var t = e.split(/ +/);
        return {name: t.shift(), selector: t.join(" ")}
    }

    var r = require("component~event@0.1.3"), s = require("component~delegate@0.2.2");
    t.exports = n, n.prototype.sub = function (e, t, n) {
        this._events[e] = this._events[e] || {}, this._events[e][t] = n
    }, n.prototype.bind = function (e, t) {
        function n() {
            var e = [].slice.call(arguments).concat(u);
            l[t].apply(l, e)
        }

        var o = i(e), a = this.el, l = this.obj, c = o.name, t = t || "on" + c, u = [].slice.call(arguments, 2);
        return o.selector ? n = s.bind(a, o.selector, c, n) : r.bind(a, c, n), this.sub(c, t, n), n
    }, n.prototype.unbind = function (e, t) {
        if (0 == arguments.length) return this.unbindAll();
        if (1 == arguments.length) return this.unbindAllOf(e);
        var n = this._events[e];
        if (n) {
            var i = n[t];
            i && r.unbind(this.el, e, i)
        }
    }, n.prototype.unbindAll = function () {
        for (var e in this._events) this.unbindAllOf(e)
    }, n.prototype.unbindAllOf = function (e) {
        var t = this._events[e];
        if (t) for (var n in t) this.unbind(e, n)
    }
}), require.register("component~throttle@v0.0.2", function (e, t) {
    function n(e, t) {
        function n() {
            o = 0, a = +new Date, s = e.apply(i, r), i = null, r = null
        }

        var i, r, s, o, a = 0;
        return function () {
            i = this, r = arguments;
            var e = new Date - a;
            return o || (e >= t ? n() : o = setTimeout(n, t - e)), s
        }
    }

    t.exports = n
}), require.register("ianstormtaylor~to-no-case@0.1.1", function (e, t) {
    function n(e) {
        return s.test(e) ? e.toLowerCase() : (a.test(e) && (e = i(e)), o.test(e) && (e = r(e)), e.toLowerCase())
    }

    function i(e) {
        return e.replace(l, function (e, t) {
            return t ? " " + t : ""
        })
    }

    function r(e) {
        return e.replace(c, function (e, t, n) {
            return t + " " + n.toLowerCase().split("").join(" ")
        })
    }

    t.exports = n;
    var s = /\s/, o = /[a-z][A-Z]/, a = /[\W_]/, l = /[\W_]+(.|$)/g, c = /(.)([A-Z]+)/g
}), require.register("ianstormtaylor~to-sentence-case@0.1.1", function (e, t) {
    function n(e) {
        return i(e).replace(/[a-z]/i, function (e) {
            return e.toUpperCase()
        })
    }

    var i = require("ianstormtaylor~to-no-case@0.1.1");
    t.exports = n
}), require.register("aheckmann~sliced@0.0.5/lib/sliced.js", function (e, t) {
    t.exports = function (e, t, n) {
        var i = [], r = e.length;
        if (0 === r) return i;
        var s = t < 0 ? Math.max(0, t + r) : t || 0;
        for (void 0 !== n && (r = n < 0 ? n + r : n); r-- > s;) i[r - s] = e[r];
        return i
    }
}), require.register("aheckmann~sliced@0.0.5", function (e, t) {
    t.exports = e = require("aheckmann~sliced@0.0.5/lib/sliced.js")
}), require.register("jkroso~computed-style@0.1.0", function (e, t) {
    t.exports = window.getComputedStyle, t.exports || (t.exports = function (e) {
        return e.currentStyle
    })
}), require.register("eivindfjeldstad~dot@0.1.0", function (e, t) {
    e.set = function (e, t, n) {
        for (var i = t.split("."), r = i.pop(), s = e, o = 0; o < i.length; o++) {
            var a = i[o];
            e[a] = e[a] || {}, e = e[a]
        }
        return e[r] = n, s
    }, e.get = function (e, t) {
        for (var n = t.split("."), i = n.pop(), r = 0; r < n.length; r++) {
            var s = n[r];
            if (!e[s]) return;
            e = e[s]
        }
        return e[i]
    }
}), require.register("lhorie~mithril@v0.1.34", function (e, t) {
    var n = function e(t, n) {
        function i(e) {
            A = e.document, D = e.location, E = e.cancelAnimationFrame || e.clearTimeout, _ = e.requestAnimationFrame || e.setTimeout
        }

        function r() {
            var e, t = [].slice.call(arguments),
                n = !(null == t[1] || R.call(t[1]) !== M || "tag" in t[1] || "subtree" in t[1]), i = n ? t[1] : {},
                r = "class" in i ? "class" : "className", s = {tag: "div", attrs: {}}, o = [];
            if (R.call(t[0]) != L) throw new Error("selector in m(selector, attrs, children) should be a string");
            for (; e = I.exec(t[0]);) if ("" === e[1] && e[2]) s.tag = e[2]; else if ("#" === e[1]) s.attrs.id = e[2]; else if ("." === e[1]) o.push(e[2]); else if ("[" === e[3][0]) {
                var a = W.exec(e[3]);
                s.attrs[a[1]] = a[3] || !a[2] || ""
            }
            o.length > 0 && (s.attrs[r] = o.join(" "));
            var l = n ? t.slice(2) : t.slice(1);
            1 === l.length && R.call(l[0]) === N ? s.children = l[0] : s.children = l;
            for (var c in i) if (c === r) {
                var u = s.attrs[c];
                s.attrs[c] = (u && i[c] ? u + " " : u || "") + i[c]
            } else s.attrs[c] = i[c];
            return s
        }

        function s(e, t, i, c, h, d, p, f, g, m, v) {
            try {
                null != h && null != h.toString() || (h = "")
            } catch (e) {
                h = ""
            }
            if ("retain" === h.subtree) return d;
            var w = R.call(d), b = R.call(h);
            if (null == d || w !== b) {
                if (null != d) if (i && i.nodes) {
                    var y = f - c, k = y + (b === N ? h : d.nodes).length;
                    l(i.nodes.slice(y, k), i.slice(y, k))
                } else d.nodes && l(d.nodes, d);
                d = new h.constructor, d.tag && (d = {}), d.nodes = []
            }
            if (b === N) {
                for (var j = 0, x = h.length; j < x; j++) R.call(h[j]) === N && (h = h.concat.apply([], h), j--, x = h.length);
                for (var q = [], T = d.length === h.length, S = 0, C = 1, D = 2, _ = 3, E = {}, I = !1, j = 0; j < d.length; j++) d[j] && d[j].attrs && null != d[j].attrs.key && (I = !0, E[d[j].attrs.key] = {
                    action: C,
                    index: j
                });
                for (var W = 0, j = 0, x = h.length; j < x; j++) if (h[j] && h[j].attrs && null != h[j].attrs.key) {
                    for (var F = 0, x = h.length; F < x; F++) h[F] && h[F].attrs && null == h[F].attrs.key && (h[F].attrs.key = "__mithril__" + W++);
                    break
                }
                if (I) {
                    var B = !1;
                    if (h.length != d.length) B = !0; else for (var Y, P, j = 0; Y = d[j], P = h[j]; j++) if (Y.attrs && P.attrs && Y.attrs.key != P.attrs.key) {
                        B = !0;
                        break
                    }
                    if (B) {
                        for (var j = 0, x = h.length; j < x; j++) if (h[j] && h[j].attrs && null != h[j].attrs.key) {
                            var H = h[j].attrs.key;
                            E[H] ? E[H] = {
                                action: _,
                                index: j,
                                from: E[H].index,
                                element: d.nodes[E[H].index] || A.createElement("div")
                            } : E[H] = {action: D, index: j}
                        }
                        var z = [];
                        for (var G in E) z.push(E[G]);
                        var J = z.sort(o), K = new Array(d.length);
                        K.nodes = d.nodes.slice();
                        for (var Q, j = 0; Q = J[j]; j++) {
                            if (Q.action === C && (l(d[Q.index].nodes, d[Q.index]), K.splice(Q.index, 1)), Q.action === D) {
                                var V = A.createElement("div");
                                V.key = h[Q.index].attrs.key, e.insertBefore(V, e.childNodes[Q.index] || null), K.splice(Q.index, 0, {
                                    attrs: {key: h[Q.index].attrs.key},
                                    nodes: [V]
                                }), K.nodes[Q.index] = V
                            }
                            Q.action === _ && (e.childNodes[Q.index] !== Q.element && null !== Q.element && e.insertBefore(Q.element, e.childNodes[Q.index] || null), K[Q.index] = d[Q.from], K.nodes[Q.index] = Q.element)
                        }
                        d = K
                    }
                }
                for (var j = 0, $ = 0, x = h.length; j < x; j++) {
                    var X = s(e, t, d, f, h[j], d[$], p, f + S || S, g, m, v);
                    X !== n && (X.nodes.intact || (T = !1), S += X.$trusted ? (X.match(/<[^\/]|\>\s*[^<]/g) || [0]).length : R.call(X) === N ? X.length : 1, d[$++] = X)
                }
                if (!T) {
                    for (var j = 0, x = h.length; j < x; j++) null != d[j] && q.push.apply(q, d[j].nodes);
                    for (var Z, j = 0; Z = d.nodes[j]; j++) null != Z.parentNode && q.indexOf(Z) < 0 && l([Z], [d[j]]);
                    h.length < d.length && (d.length = h.length), d.nodes = q
                }
            } else if (null != h && b === M) {
                h.attrs || (h.attrs = {}), d.attrs || (d.attrs = {});
                var ee = Object.keys(h.attrs), te = ee.length > ("key" in h.attrs ? 1 : 0);
                if ((h.tag != d.tag || ee.join() != Object.keys(d.attrs).join() || h.attrs.id != d.attrs.id || "all" == r.redraw.strategy() && d.configContext && d.configContext.retain !== !0 || "diff" == r.redraw.strategy() && d.configContext && d.configContext.retain === !1) && (d.nodes.length && l(d.nodes), d.configContext && typeof d.configContext.onunload === O && d.configContext.onunload()), R.call(h.tag) != L) return;
                var Z, ne = 0 === d.nodes.length;
                if (h.attrs.xmlns ? m = h.attrs.xmlns : "svg" === h.tag ? m = "http://www.w3.org/2000/svg" : "math" === h.tag && (m = "http://www.w3.org/1998/Math/MathML"), ne ? (Z = h.attrs.is ? m === n ? A.createElement(h.tag, h.attrs.is) : A.createElementNS(m, h.tag, h.attrs.is) : m === n ? A.createElement(h.tag) : A.createElementNS(m, h.tag), d = {
                        tag: h.tag,
                        attrs: te ? a(Z, h.tag, h.attrs, {}, m) : h.attrs,
                        children: null != h.children && h.children.length > 0 ? s(Z, h.tag, n, n, h.children, d.children, !0, 0, h.attrs.contenteditable ? Z : g, m, v) : h.children,
                        nodes: [Z]
                    }, d.children && !d.children.nodes && (d.children.nodes = []), "select" === h.tag && h.attrs.value && a(Z, h.tag, {value: h.attrs.value}, {}, m), e.insertBefore(Z, e.childNodes[f] || null)) : (Z = d.nodes[0], te && a(Z, h.tag, h.attrs, d.attrs, m), d.children = s(Z, h.tag, n, n, h.children, d.children, !1, 0, h.attrs.contenteditable ? Z : g, m, v), d.nodes.intact = !0, p === !0 && null != Z && e.insertBefore(Z, e.childNodes[f] || null)), typeof h.attrs.config === O) {
                    var ie = d.configContext = d.configContext || {retain: "diff" == r.redraw.strategy() || n},
                        re = function (e, t) {
                            return function () {
                                return e.attrs.config.apply(e, t)
                            }
                        };
                    v.push(re(h, [Z, !ne, ie, d]))
                }
            } else if (typeof h != O) {
                var q;
                0 === d.nodes.length ? (h.$trusted ? q = u(e, f, h) : (q = [A.createTextNode(h)], e.nodeName.match(U) || e.insertBefore(q[0], e.childNodes[f] || null)), d = "string number boolean".indexOf(typeof h) > -1 ? new h.constructor(h) : h, d.nodes = q) : d.valueOf() !== h.valueOf() || p === !0 ? (q = d.nodes, g && g === A.activeElement || (h.$trusted ? (l(q, d), q = u(e, f, h)) : "textarea" === t ? e.value = h : g ? g.innerHTML = h : ((1 === q[0].nodeType || q.length > 1) && (l(d.nodes, d), q = [A.createTextNode(h)]), e.insertBefore(q[0], e.childNodes[f] || null), q[0].nodeValue = h)), d = new h.constructor(h), d.nodes = q) : d.nodes.intact = !0
            }
            return d
        }

        function o(e, t) {
            return e.action - t.action || e.index - t.index
        }

        function a(e, t, n, i, r) {
            for (var s in n) {
                var o = n[s], a = i[s];
                if (s in i && a === o) "value" === s && "input" === t && e.value != o && (e.value = o); else {
                    i[s] = o;
                    try {
                        if ("config" === s || "key" == s) continue;
                        if (typeof o === O && 0 === s.indexOf("on")) e[s] = h(o, e); else if ("style" === s && null != o && R.call(o) === M) {
                            for (var l in o) null != a && a[l] === o[l] || (e.style[l] = o[l]);
                            for (var l in a) l in o || (e.style[l] = "")
                        } else null != r ? "href" === s ? e.setAttributeNS("http://www.w3.org/1999/xlink", "href", o) : "className" === s ? e.setAttribute("class", o) : e.setAttribute(s, o) : s in e && "list" !== s && "style" !== s && "form" !== s && "type" !== s && "width" !== s && "height" !== s ? "input" === t && e[s] === o || (e[s] = o) : e.setAttribute(s, o)
                    } catch (e) {
                        if (e.message.indexOf("Invalid argument") < 0) throw e
                    }
                }
            }
            return i
        }

        function l(e, t) {
            for (var n = e.length - 1; n > -1; n--) if (e[n] && e[n].parentNode) {
                try {
                    e[n].parentNode.removeChild(e[n])
                } catch (e) {
                }
                t = [].concat(t), t[n] && c(t[n])
            }
            0 != e.length && (e.length = 0)
        }

        function c(e) {
            if (e.configContext && typeof e.configContext.onunload === O && (e.configContext.onunload(), e.configContext.onunload = null), e.children) if (R.call(e.children) === N) for (var t, n = 0; t = e.children[n]; n++) c(t); else e.children.tag && c(e.children)
        }

        function u(e, t, n) {
            var i = e.childNodes[t];
            if (i) {
                var r = 1 != i.nodeType, s = A.createElement("span");
                r ? (e.insertBefore(s, i || null), s.insertAdjacentHTML("beforebegin", n), e.removeChild(s)) : i.insertAdjacentHTML("beforebegin", n)
            } else e.insertAdjacentHTML("beforeend", n);
            for (var o = []; e.childNodes[t] !== i;) o.push(e.childNodes[t]), t++;
            return o
        }

        function h(e, t) {
            return function (n) {
                n = n || event, r.redraw.strategy("diff"), r.startComputation();
                try {
                    return e.call(t, n)
                } finally {
                    ee()
                }
            }
        }

        function d(e) {
            var t = Y.indexOf(e);
            return t < 0 ? Y.push(e) - 1 : t
        }

        function p(e) {
            var t = function () {
                return arguments.length && (e = arguments[0]), e
            };
            return t.toJSON = function () {
                return e
            }, t
        }

        function f() {
            for (var e, t = 0; e = z[t]; t++) J[t] && r.render(e, G[t].view ? G[t].view(J[t]) : X());
            V && (V(), V = null), K = null, Q = new Date, r.redraw.strategy("diff")
        }

        function g(e) {
            return e.slice(ie[r.route.mode].length)
        }

        function m(e, t, n) {
            te = {};
            var i = n.indexOf("?");
            i !== -1 && (te = y(n.substr(i + 1, n.length)), n = n.substr(0, i));
            var s = Object.keys(t), o = s.indexOf(n);
            if (o !== -1) return r.module(e, t[s[o]]), !0;
            for (var a in t) {
                if (a === n) return r.module(e, t[a]), !0;
                var l = new RegExp("^" + a.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "/?$");
                if (l.test(n)) return n.replace(l, function () {
                    for (var n = a.match(/:[^\/]+/g) || [], i = [].slice.call(arguments, 1, -2), s = 0, o = n.length; s < o; s++) te[n[s].replace(/:|\./g, "")] = decodeURIComponent(i[s]);
                    r.module(e, t[a])
                }), !0
            }
        }

        function v(e) {
            if (e = e || event, !e.ctrlKey && !e.metaKey && 2 !== e.which) {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                for (var t = e.currentTarget || e.srcElement, n = "pathname" === r.route.mode && t.search ? y(t.search.slice(1)) : {}; t && "A" != t.nodeName.toUpperCase();) t = t.parentNode;
                r.route(t[r.route.mode].slice(ie[r.route.mode].length), n)
            }
        }

        function w() {
            "hash" != r.route.mode && D.hash ? D.hash = D.hash : t.scrollTo(0, 0)
        }

        function b(e, t) {
            var i = {}, r = [];
            for (var s in e) {
                var o = t ? t + "[" + s + "]" : s, a = e[s], l = R.call(a),
                    c = null === a ? encodeURIComponent(o) : l === M ? b(a, o) : l === N ? a.reduce(function (e, t) {
                        return i[o] || (i[o] = {}), i[o][t] ? e : (i[o][t] = !0, e.concat(encodeURIComponent(o) + "=" + encodeURIComponent(t)))
                    }, []).join("&") : encodeURIComponent(o) + "=" + encodeURIComponent(a);
                a !== n && r.push(c)
            }
            return r.join("&")
        }

        function y(e) {
            for (var t = e.split("&"), n = {}, i = 0, r = t.length; i < r; i++) {
                var s = t[i].split("="), o = decodeURIComponent(s[0]),
                    a = 2 == s.length ? decodeURIComponent(s[1]) : null;
                null != n[o] ? (R.call(n[o]) !== N && (n[o] = [n[o]]), n[o].push(a)) : n[o] = a
            }
            return n
        }

        function k(e) {
            var t = d(e);
            l(e.childNodes, P[t]), P[t] = n
        }

        function j(e, t) {
            var n = r.prop(t);
            return e.then(n), n.then = function (n, i) {
                return j(e.then(n, i), t)
            }, n
        }

        function x(e, t) {
            function n(e) {
                h = e || c, p.map(function (e) {
                    h === l && e.resolve(d) || e.reject(d)
                })
            }

            function i(e, t, n, i) {
                if ((null != d && R.call(d) === M || typeof d === O) && typeof e === O) try {
                    var s = 0;
                    e.call(d, function (e) {
                        s++ || (d = e, t())
                    }, function (e) {
                        s++ || (d = e, n())
                    })
                } catch (e) {
                    r.deferred.onerror(e), d = e, n()
                } else i()
            }

            function s() {
                var c;
                try {
                    c = d && d.then
                } catch (e) {
                    return r.deferred.onerror(e), d = e, h = a, s()
                }
                i(c, function () {
                    h = o, s()
                }, function () {
                    h = a, s()
                }, function () {
                    try {
                        h === o && typeof e === O ? d = e(d) : h === a && "function" == typeof t && (d = t(d), h = o)
                    } catch (e) {
                        return r.deferred.onerror(e), d = e, n()
                    }
                    d === u ? (d = TypeError(), n()) : i(c, function () {
                        n(l)
                    }, n, function () {
                        n(h === o && l)
                    })
                })
            }

            var o = 1, a = 2, l = 3, c = 4, u = this, h = 0, d = 0, p = [];
            u.promise = {}, u.resolve = function (e) {
                return h || (d = e, h = o, s()), this
            }, u.reject = function (e) {
                return h || (d = e, h = a, s()), this
            }, u.promise.then = function (e, t) {
                var n = new x(e, t);
                return h === l ? n.resolve(d) : h === c ? n.reject(d) : p.push(n), n.promise
            }
        }

        function q(e) {
            return e
        }

        function T(e) {
            if (!e.dataType || "jsonp" !== e.dataType.toLowerCase()) {
                var i = new t.XMLHttpRequest;
                if (i.open(e.method, e.url, !0, e.user, e.password), i.onreadystatechange = function () {
                        4 === i.readyState && (i.status >= 200 && i.status < 300 ? e.onload({
                            type: "load",
                            target: i
                        }) : e.onerror({type: "error", target: i}))
                    }, e.serialize === JSON.stringify && e.data && "GET" !== e.method && i.setRequestHeader("Content-Type", "application/json; charset=utf-8"), e.deserialize === JSON.parse && i.setRequestHeader("Accept", "application/json, text/*"), typeof e.config === O) {
                    var r = e.config(i, e);
                    null != r && (i = r)
                }
                var s = "GET" !== e.method && e.data ? e.data : "";
                if (s && R.call(s) != L && s.constructor != t.FormData) throw"Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";
                return i.send(s), i
            }
            var o = "mithril_callback_" + (new Date).getTime() + "_" + Math.round(1e16 * Math.random()).toString(36),
                a = A.createElement("script");
            t[o] = function (i) {
                a.parentNode.removeChild(a), e.onload({type: "load", target: {responseText: i}}), t[o] = n
            }, a.onerror = function (i) {
                return a.parentNode.removeChild(a), e.onerror({
                    type: "error",
                    target: {status: 500, responseText: JSON.stringify({error: "Error making jsonp request"})}
                }), t[o] = n, !1
            }, a.onload = function (e) {
                return !1
            }, a.src = e.url + (e.url.indexOf("?") > 0 ? "&" : "?") + (e.callbackKey ? e.callbackKey : "callback") + "=" + o + "&" + b(e.data || {}), A.body.appendChild(a)
        }

        function S(e, t, n) {
            if ("GET" === e.method && "jsonp" != e.dataType) {
                var i = e.url.indexOf("?") < 0 ? "?" : "&", r = b(t);
                e.url = e.url + (r ? i + r : "")
            } else e.data = n(t);
            return e
        }

        function C(e, t) {
            var n = e.match(/:[a-z]\w+/gi);
            if (n && t) for (var i = 0; i < n.length; i++) {
                var r = n[i].slice(1);
                e = e.replace(n[i], t[r]), delete t[r]
            }
            return e
        }

        var A, D, _, E, M = "[object Object]", N = "[object Array]", L = "[object String]", O = "function",
            R = {}.toString, I = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, W = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/,
            U = /^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/;
        i(t);
        var F, B = {
            appendChild: function (e) {
                F === n && (F = A.createElement("html")), A.documentElement && A.documentElement !== e ? A.replaceChild(e, A.documentElement) : A.appendChild(e), this.childNodes = A.childNodes
            }, insertBefore: function (e) {
                this.appendChild(e)
            }, childNodes: []
        }, Y = [], P = {};
        r.render = function (e, t, i) {
            var r = [];
            if (!e) throw new Error("Please ensure the DOM element exists before rendering a template into it.");
            var o = d(e), a = e === A, c = a || e === A.documentElement ? B : e;
            a && "html" != t.tag && (t = {
                tag: "html",
                attrs: {},
                children: t
            }), P[o] === n && l(c.childNodes), i === !0 && k(e), P[o] = s(c, null, n, n, t, P[o], !1, 0, null, n, r);
            for (var u = 0, h = r.length; u < h; u++) r[u]()
        }, r.trust = function (e) {
            return e = new String(e), e.$trusted = !0, e
        }, r.prop = function (e) {
            return (null != e && R.call(e) === M || typeof e === O) && typeof e.then === O ? j(e) : p(e)
        };
        var H, z = [], G = [], J = [], K = null, Q = 0, V = null, $ = 16;
        r.module = function (e, t) {
            if (!e) throw new Error("Please ensure the DOM element exists before rendering a template into it.");
            var n = z.indexOf(e);
            n < 0 && (n = z.length);
            var i = !1;
            if (J[n] && typeof J[n].onunload === O) {
                var s = {
                    preventDefault: function () {
                        i = !0
                    }
                };
                J[n].onunload(s)
            }
            if (!i) {
                r.redraw.strategy("all"), r.startComputation(), z[n] = e;
                var o = H = t = t || {}, a = new (t.controller || function () {
                });
                return o === H && (J[n] = a, G[n] = t), ee(), J[n]
            }
        }, r.redraw = function (e) {
            K && e !== !0 ? (new Date - Q > $ || _ === t.requestAnimationFrame) && (K > 0 && E(K), K = _(f, $)) : (f(), K = _(function () {
                K = null
            }, $))
        }, r.redraw.strategy = r.prop();
        var X = function () {
            return ""
        }, Z = 0;
        r.startComputation = function () {
            Z++
        }, r.endComputation = function () {
            Z = Math.max(Z - 1, 0), 0 === Z && r.redraw()
        };
        var ee = function () {
            "none" == r.redraw.strategy() ? (Z--, r.redraw.strategy("diff")) : r.endComputation()
        };
        r.withAttr = function (e, t) {
            return function (n) {
                n = n || event;
                var i = n.currentTarget || this;
                t(e in i ? i[e] : i.getAttribute(e))
            }
        };
        var te, ne, ie = {pathname: "", hash: "#", search: "?"}, re = function () {
        };
        return r.route = function () {
            if (0 === arguments.length) return ne;
            if (3 === arguments.length && R.call(arguments[1]) === L) {
                var e = arguments[0], n = arguments[1], i = arguments[2];
                re = function (t) {
                    var s = ne = g(t);
                    m(e, i, s) || r.route(n, !0)
                };
                var s = "hash" === r.route.mode ? "onhashchange" : "onpopstate";
                t[s] = function () {
                    var e = D[r.route.mode];
                    "pathname" === r.route.mode && (e += D.search), ne != g(e) && re(e)
                }, V = w, t[s]()
            } else if (arguments[0].addEventListener || arguments[0].attachEvent) {
                var o = arguments[0];
                arguments[1], arguments[2];
                o.href = ("pathname" !== r.route.mode ? D.pathname : "") + ie[r.route.mode] + this.attrs.href, o.addEventListener ? (o.removeEventListener("click", v), o.addEventListener("click", v)) : (o.detachEvent("onclick", v), o.attachEvent("onclick", v))
            } else if (R.call(arguments[0]) === L) {
                var a = ne;
                ne = arguments[0];
                var l = arguments[1] || {}, c = ne.indexOf("?"), u = c > -1 ? y(ne.slice(c + 1)) : {};
                for (var h in l) u[h] = l[h];
                var d = b(u), p = c > -1 ? ne.slice(0, c) : ne;
                d && (ne = p + (p.indexOf("?") === -1 ? "?" : "&") + d);
                var f = (3 === arguments.length ? arguments[2] : arguments[1]) === !0 || a === arguments[0];
                t.history.pushState ? (V = function () {
                    t.history[f ? "replaceState" : "pushState"](null, A.title, ie[r.route.mode] + ne), w()
                }, re(ie[r.route.mode] + ne)) : (D[r.route.mode] = ne, re(ie[r.route.mode] + ne))
            }
        }, r.route.param = function (e) {
            if (!te) throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");
            return te[e]
        }, r.route.mode = "search", r.route.buildQueryString = b, r.route.parseQueryString = y, r.deferred = function () {
            var e = new x;
            return e.promise = j(e.promise), e
        }, r.deferred.onerror = function (e) {
            if ("[object Error]" === R.call(e) && !e.constructor.toString().match(/ Error/)) throw e
        }, r.sync = function (e) {
            function t(e, t) {
                return function (r) {
                    return o[e] = r, t || (n = "reject"), 0 === --s && (i.promise(o), i[n](o)), r
                }
            }

            var n = "resolve", i = r.deferred(), s = e.length, o = new Array(s);
            if (e.length > 0) for (var a = 0; a < e.length; a++) e[a].then(t(a, !0), t(a, !1)); else i.resolve([]);
            return i.promise
        }, r.request = function (e) {
            e.background !== !0 && r.startComputation();
            var t = new x, n = e.dataType && "jsonp" === e.dataType.toLowerCase(),
                i = e.serialize = n ? q : e.serialize || JSON.stringify,
                s = e.deserialize = n ? q : e.deserialize || JSON.parse, o = e.extract || function (e) {
                    return 0 === e.responseText.length && s === JSON.parse ? null : e.responseText
                };
            return e.url = C(e.url, e.data), e = S(e, e.data, i), e.onload = e.onerror = function (n) {
                try {
                    n = n || event;
                    var i = ("load" === n.type ? e.unwrapSuccess : e.unwrapError) || q,
                        a = i(s(o(n.target, e)), n.target);
                    if ("load" === n.type) if (R.call(a) === N && e.type) for (var l = 0; l < a.length; l++) a[l] = new e.type(a[l]); else e.type && (a = new e.type(a));
                    t["load" === n.type ? "resolve" : "reject"](a)
                } catch (e) {
                    r.deferred.onerror(e), t.reject(e)
                }
                e.background !== !0 && r.endComputation()
            }, T(e), t.promise = j(t.promise, e.initialValue), t.promise
        }, r.deps = function (e) {
            return i(t = e || t), t
        }, r.deps.factory = e, r
    }("undefined" != typeof window ? window : {});
    "undefined" != typeof t && null !== t && t.exports ? t.exports = n : "function" == typeof define && define.amd && define(function () {
        return n
    })
}), require.register("component~escape-regexp@1.0.2", function (e, t) {
    t.exports = function (e) {
        return String(e).replace(/([.*+?=^!:${}()|[\]\/\\])/g, "\\$1")
    }
}), require.register("tgr", function (e, t) {
    require("tgr/src/js/boot/chat.js"), require("tgr/src/js/boot/icons.js"), require("tgr/src/js/boot/tgr.js")
}), require.register("tgr/src/js/boot/chat.js", function (e, t) {
    var n = window.location.search.match(/channel=([^&]+)(&|$)/),
        i = n ? n[1].toLowerCase() : null,
        r = document.querySelector("#chat");
    if(i === null){
        return; 
    }
    r.src = "https://www.twitch.tv/embed/" + i + "/chat?parent=localhost&darkpopout=true", 
    document.querySelector("title").textContent = chrome.i18n.getMessage("TAB_GIVEAWAY_TITLE") + " " + i, 
    setTimeout(function () {
        var e = r.style.position;
        r.style.position = "static", setTimeout(function () {
            r.style.position = e
        }, 100)
    }, 600)
}), require.register("tgr/src/js/boot/icons.js", function (e, t) {
    function n(e, t) {
        if (e) throw e;
        t.style.display = "none", document.body.appendChild(t)
    }

    var i = require("tgr/src/js/lib/loadsvg.js");
    i(chrome.extension.getURL("icons.svg"), n)
}), require.register("tgr/src/js/boot/tgr.js", function (e, t) {
    var n = require("tgr/src/js/component/tgr.js");
    n.init(document.querySelector("#tgr"))
}), require.register("tgr/src/js/component/icon.js", function (e, t) {
    function n(e, t, r) {
        return "string" != typeof t && (r = t, t = !1), r = r || {}, t && (r.class ? r.class = t + " " + r.class : r.className ? r.className = t + " " + r.className : r.class = t), r.role = "img", i("svg.Icon.-" + e, r, [i("use", {href: "#" + n.svgPrefix + "-" + e})])
    }

    var i = require("lhorie~mithril@v0.1.34");
    t.exports = n, n.svgPrefix = "icon"
}), require.register("tgr/src/js/component/messages.js", function (e, t) {
    function n() {
        if (!(this instanceof n)) return new n;
        var e = this;
        this.store = [], this.add = function (e, t) {
            1 === arguments.lenght && (t = e, e = "info"), this.store.push({type: e, text: t})
        }, this.success = this.add.bind(this, "success"), this.info = this.add.bind(this, "info"), this.warning = this.add.bind(this, "warning"), this.danger = this.add.bind(this, "danger"), this.close = function (e) {
            this.store.splice(e, 1)
        }, this.clear = function () {
            e.store.length = 0
        }, this.render = function () {
            return e.store.length ? i(".msgs", {key: "messages"}, e.store.map(function (t, n) {
                return i(".msg." + t.type, {
                    key: t.text + t.type,
                    config: s("slideinleft", 50 * n)
                }, [i("span.text", t.text), i("span.close", {onclick: e.close.bind(e, n)}, r("close"))])
            })) : null
        }
    }

    var i = require("lhorie~mithril@v0.1.34"), r = require("tgr/src/js/component/icon.js"),
        s = require("tgr/src/js/lib/animate.js");
    t.exports = n
}), require.register("tgr/src/js/component/tgr.js", function (e, t) {
    function n(e, t) {
        function n() {
            x.activeCutoffTime = new Date(Date.now() - x.rolling.activeTimeout)
        }

        function i(e) {
            var t = x.rolling;
            if (!t.groups[e.group]) return !1;
            if (t.subscriberLuck > x.config.maxSubscriberLuck && !e.subscriber) return !1;
            if (t.minBits && t.minBits > e.bits) return !1;
            if (t.subscribedTime && (!e.subscriber || t.subscribedTime > e.subscribedTime)) return !1;
            if (x.searchFilter) if ("truthy" === x.searchFilter.value) {
                if (!e[x.searchFilter.prop]) return !1
            } else if ("falsy" === x.searchFilter.value) {
                if (e[x.searchFilter.prop]) return !1
            } else if (x.searchFilter.value !== e[x.searchFilter.prop]) return !1;
            return !(x.searchQuery && !~e.name.indexOf(x.searchQuery) && !~e.displayName.indexOf(x.searchQuery)) && ("all" === t.type || !("aktif" === t.type && x.activeCutoffTime > e.lastMessage) && ("kelime" !== t.type || !t.keyword || t.keyword === e.keyword))
        }

        function s() {
            var e = String(x.options.forbiddenWords).split(",").map(function (e) {
                return e.trim().toLowerCase()
            }).filter(function (e) {
                return e
            });
            x.setter("rolling.forbiddenWords")(e)
        }

        function j(t) {
            t && !x.tooltips ? x.tooltips = new o(e, x.config.tooltips) : !t && x.tooltips && (x.tooltips.destroy(), x.tooltips = !1)
        }

        var x = this;
        window.app = this, this.twitch = p, this.channel = g, this.chat = f, this.container = e, this.setter = d(this), this.config = m(!0, v.config, t);
        var q = localStorage[this.config.storageName] ? JSON.parse(localStorage[this.config.storageName]) : {};
        this.options = m(!0, {}, v.options, q), this.version = require("tgr/data/changelog.json")[0].version, this.isNewVersion = this.options.lastReadChangelog !== this.version, this.users = new b, this.selectedUsers = new b, this.winners = new k(g.name, {onsync: r.redraw}), this.rolling = {
            type: "all",
            types: ["all", "aktif", "kelime"],
            activeTimeout: 12e5,
            keyword: null,
            caseSensitive: !1,
            subscriberLuck: 1,
            minBits: 0,
            subscribedTime: 0,
            forbiddenWords: [],
            groups: {broadcaster: !0, staff: !0, mod: !0, vip: !0, subscriber: !0, user: !0}
        }, this.winner = null, this.messages = new u, this.winners.connect(), this.setter.on("options", function (e) {
            localStorage[x.config.storageName] = JSON.stringify(e)
        }), this.updateSelectedUsers = function () {
            x.selectedUsers.reset();
            for (var e, t = 0; e = x.users[t], t < x.users.length; t++) i(e) && x.selectedUsers.insert(e)
        }, this.requestUpdateSelectedUsers = a(function () {
            x.updateSelectedUsers(), setTimeout(r.redraw)
        }, 150), this.activeCutoffTime, n(), setInterval(n, 1e3), setInterval(function () {
            "active" === x.rolling.type && x.requestUpdateSelectedUsers()
        }, 1e4), f.on("message", function (e) {
            var t, n = p.toID(e.user.name);
            if (x.users.exists(n)) {
                t = x.users.get(n);
                var i = t.group;
                t.extend(e.user), i !== t.group && (x.users.sort(), x.updateSelectedUsers())
            } else {
                if (t = new w(e.user), ~b.ignoredGroups.indexOf(t.group)) return;
                if (~x.options.ignoreList.indexOf(t.id)) return;
                x.users.insert(t)
            }
            if (t.lastMessage = new Date, x.winner === t && t.messages.push(new y(e)), x.rolling.forbiddenWords.length > 0) {
                var s = String(e.text).replace(" ", "").toLowerCase(),
                    o = x.rolling.forbiddenWords.reduce(function (e, t) {
                        return s.indexOf(t) > -1 ? e + 1 : e
                    }, 0);
                o > 0 && (t.eligible = !1, x.requestUpdateSelectedUsers())
            }
            if (x.rolling.keyword) {
                var a = x.rolling.caseSensitive ? e.text.indexOf(x.rolling.keyword) : e.text.toLowerCase().indexOf(x.rolling.keyword.toLowerCase());
                0 === a && (x.options.keywordAntispam && t.keyword === x.rolling.keyword ? (t.keywordEntries++, t.keywordEntries > x.options.keywordAntispamLimit && (t.eligible = !1)) : (t.keyword = x.rolling.keyword, t.keywordEntries = 1), x.requestUpdateSelectedUsers())
            }
            x.winner && x.winner === t && !x.winner.respondedAt && (x.winner.respondedAt = new Date), r.redraw()
        }), this.users.on("insert", function (e) {
            i(e) && x.selectedUsers.insert(e)
        }), this.users.on("remove", x.selectedUsers.remove.bind(x.selectedUsers)), this.setter.on("rolling.groups", this.updateSelectedUsers), this.setter.on("rolling.type", this.updateSelectedUsers), this.setter.on("rolling.activeTimeout", function () {
            n(), x.requestUpdateSelectedUsers()
        }), this.setter.on("rolling.keyword", x.requestUpdateSelectedUsers), this.setter.on("rolling.minBits", x.requestUpdateSelectedUsers), this.setter.on("rolling.subscribedTime", x.requestUpdateSelectedUsers), this.search = "", this.searchFilter = null, this.searchQuery = "", this.setter.on("search", function () {
            x.search = String(x.search).trim().toLowerCase(), x.searchFilter = x.config.searchFilters[x.search[0]], x.searchQuery = x.searchFilter ? x.search.substr(1).trim() : x.search
        }), this.setter.on("search", x.requestUpdateSelectedUsers), this.setter.on("options.forbiddenWords", s), s(), this.roll = function () {
            document.activeElement && document.activeElement.blur && document.activeElement.blur(), x.messages.clear();
            for (var e, t, n = [], i = x.rolling.subscriberLuck, r = 0; t = x.selectedUsers[r], r < x.selectedUsers.length; r++) if (t.eligible) if (t.subscriber && i > 1) for (e = 0; e < i; e++) n.push(t); else n.push(t);
            if (!n.length) return void x.messages.danger(chrome.i18n.getMessage("NONE_TO_ROLL_FROM"));
            x.winner && (delete x.winner.rolledAt, delete x.winner.respondedAt, delete x.winner.messages);
            var s = n[Math.random() * n.length | 0];
            s.messages = [], s.rolledAt = new Date, x.options.uncheckWinners && (s.eligible = !1), x.options.announceWinner && f.post(String(x.options.announceTemplate).replace("{name}", s.name)), x.setter("winner")(s), x.section.activate("profile", s), g.channel().then(null, function (e) {
                return console.error(e), !1
            }).then(function (e) {
                x.winners.add({
                    name: s.name,
                    displayName: s.displayName || s.name,
                    title: e ? e.data[0].title : "couldn't retrieve stream title"
                })
            })
        }, this.components = new c(this).use(require("tgr/src/js/component/userlist.js"), this.selectedUsers), this.section = new h(this).use(require("tgr/src/js/section/index.js")).use(require("tgr/src/js/section/winners.js")).use(require("tgr/src/js/section/config.js")).use(require("tgr/src/js/section/changelog.js")).use(require("tgr/src/js/section/about.js")).use(require("tgr/src/js/section/profile.js")).use(require("tgr/src/js/section/bitcoin.js")), this.section.on("active", this.messages.clear.bind(this.messages)), this.toSection = function (e, t) {
            return l(1, x.section.activator(e, t))
        }, this.classWhenActive = function (e, t, n) {
            return n || (n = t, t = ""), t + " " + (x.section.isActive(e) ? n || "active" : "")
        }, this.tooltips = !1, this.setter.on("options.displayTooltips", j), j(this.options.displayTooltips), this.setter.on("options.ignoreList", a(this.cleanUsers, 1e3))
    }

    function i(e) {
        return [r(".viewers", [r(".bar", [r(".search", [r("input[type=text]", {
            oninput: r.withAttr("value", e.setter("search")),
            onkeydown: l(27, e.setter("search").to("")),
            placeholder: chrome.i18n.getMessage("SEARCH_TITLE"),
            required: !0,
            value: e.search
        }), e.search ? r(".cancel", {
            onclick: e.setter("search").to(""),
            "data-tip": chrome.i18n.getMessage("CANCEL_SEARCH")
        }, s("close", "-small")) : null]), r("h3.count", e.selectedUsers.length)]), e.components.render("userlist")]), r(".primary", [r(".bar", {key: "bar"}, [r("div", {
            class: e.classWhenActive("index", "button index", "active"),
            onmousedown: e.toSection("index"),
            "data-tip": chrome.i18n.getMessage("GIVEAWAY_TITLE")
        }, [s("gift")]), e.winner ? r("div", {
            class: e.classWhenActive("profile", "button profile", "active"),
            onmousedown: e.toSection("profile", e.winner),
            "data-tip": chrome.i18n.getMessage("WINNER_TITLE")
        }, [s("trophy"), r("span.label", e.winner.name)]) : null, r(".spacer"), r("div", {
            class: e.classWhenActive("winners", "button winners", "active"),
            onmousedown: e.toSection("winners"),
            "data-tip": chrome.i18n.getMessage("RECENT_WINNERS_TITLE")
        }, [s("trophy-list")]), r("div", {
            class: e.classWhenActive("config", "button config", "active"),
            onmousedown: e.toSection("config"),
            "data-tip": chrome.i18n.getMessage("SETTINGS_TITLE")
        }, [s("cogwheel")])]), e.messages.render(), r("section.section." + e.section.active, {key: e.section.key}, e.section.render())])]
    }
/* 
        r("div", {
            class: e.classWhenActive("changelog", "button index", "active"),
            onmousedown: e.toSection("changelog"),
            "data-tip": "Changelog"
        }, [s("list"), e.isNewVersion && !e.section.isActive("changelog") ? r(".new") : null]), r("div", {
            class: e.classWhenActive("about", "button index", "active"),
            onmousedown: e.toSection("about"),
            "data-tip": "About + FAQ"
        }, [s("help")


*/


    var r = require("lhorie~mithril@v0.1.34"), s = require("tgr/src/js/component/icon.js"),
        o = require("darsain~tooltips@0.1.0"), a = require("component~throttle@v0.0.2"),
        l = require("tgr/src/js/lib/withkey.js"), c = require("tgr/src/js/lib/components.js"),
        u = require("tgr/src/js/component/messages.js"), h = require("tgr/src/js/lib/section.js"),
        d = require("tgr/src/js/lib/setters.js"), p = require("tgr/src/js/lib/twitch.js"),
        f = require("tgr/src/js/lib/chat.js"), g = require("tgr/src/js/lib/channel.js"),
        m = (require("darsain~event@0.1.0"), require("darsain~extend@0.1.0")), v = t.exports = {};
    v.controller = n, v.view = i, v.config = require("tgr/data/config.json"), v.options = require("tgr/data/options.json"), v.init = function (e) {
        var t = new n(e);
        return r.module(e, {
            controller: function () {
                return t
            }, view: i
        }), t
    };
    var w = require("tgr/src/js/model/user.js"), b = require("tgr/src/js/model/users.js"),
        y = require("tgr/src/js/model/message.js"), k = require("tgr/src/js/model/winners.js")
}), require.register("tgr/src/js/component/userlist.js", function (e, t) {
    function n(e, t) {
        var n = this;
        c(this, m.defaults, t), this.users = a.prop(e), this.scrollTop = 0, this.limit = Math.ceil(window.innerHeight / this.itemSize), this.virtualList = g(), this.scroll = function () {
            n.scrollTop = this.scrollTop
        }, this.toggleUser = function (e) {
            var t = u(e.target, "[data-id]", !0, this), i = t && t.dataset.id;
            if (i) {
                var r = n.users().get(i);
                r && (r.eligible = !r.eligible)
            }
        }
    }

    function i(e) {
        function t(e) {
            var t = n[e];
            return a(".user", {
                key: t.id,
                class: t.eligible ? "checked" : "",
                "data-id": t.id,
                title: t.displayName
            }, [a("span.eligible"), a("span.name", i ? a.trust(t.displayName.replace(i, '<span class="query">$1</span>')) : t.displayName), r(t), s(t), o(t)])
        }

        var n = e.users(), i = e.searchQuery ? new RegExp("(" + p(e.searchQuery) + ")", "i") : null;
        return e.virtualList({
            listName: "userlist",
            props: {class: "userlist", onclick: h(1, e.toggleUser)},
            itemSize: 30,
            itemsCount: n.length,
            renderItem: t
        })
    }

    function r(e) {
        if (!Number.isInteger(e.bits) || e.bits < 1) return null;
        for (var t = f.cheerSteps.length - 1; t >= 0; t--) if (!(e.bits < f.cheerSteps[t])) return l("cheer-" + f.cheerSteps[t], "badge")
    }

    function s(e) {
        if (!e.subscriber) return null;
        var t = e.subscribedTime / 1 === 1 ? 0 : e.subscribedTime,
            n = !!(e.subscriber && d.badges && d.badges.subscriber && d.badges.subscriber.versions) && d.badges.subscriber.versions[t].image_url_2x;
        return n ? a("img.badge.subscriber.-custom", {src: n}) : a(".badge.subscriber.-placeholder", [l("star"), a(".time", e.subscribedTime)])
    }

    function o(e) {
        var t = v[e.group].icon;
        return t ? l(t, "badge -" + e.group) : null
    }

    var a = require("lhorie~mithril@v0.1.34"), l = require("tgr/src/js/component/icon.js"),
        c = require("darsain~extend@0.1.0"),
        u = (require("ianstormtaylor~to-sentence-case@0.1.1"), require("component~closest@0.1.3")),
        h = (require("component~throttle@v0.0.2"), require("tgr/src/js/lib/withkey.js")),
        d = require("tgr/src/js/lib/channel.js"), p = require("component~escape-regexp@1.0.2"),
        f = require("tgr/data/config.json"), g = require("tgr/src/js/component/virtual-list.js"),
        m = t.exports = {name: "userlist", controller: n, view: i};
    m.defaults = {itemSize: 30};
    var v = require("tgr/src/js/model/user.js").groups
}), require.register("tgr/src/js/component/virtual-list.js", function (e, t) {
    function n() {
        function e(e, i, r) {
            i || (n = e, window.addEventListener("resize", t), n.addEventListener("scroll", t), r.onunload = function () {
                window.removeEventListener("resize", t), n.removeEventListener("scroll", t)
            }, setTimeout(t, 12))
        }

        function t() {
            r = n.scrollTop, s = n.scrollLeft, o = n.clientWidth, a = n.clientHeight, l && (l = !1, c = !0), i.redraw()
        }

        var n, r = 0, s = 0, o = 0, a = 0, l = !0, c = !1;
        return function (t) {
            var n = !t.horizontal, l = n ? r : s, u = n ? a : o, h = Math.min(Math.ceil(u / t.itemSize), t.itemsCount),
                d = Math.min(Math.floor(l / t.itemSize), t.itemsCount - h), p = d * t.itemSize + "px",
                f = (t.itemsCount - d - h) * t.itemSize + "px",
                g = {overflowX: n ? "hidden" : "auto", overflowY: n ? "auto" : "hidden"},
                m = {width: n ? 0 : p, height: n ? p : 0}, v = {width: n ? 0 : f, height: n ? f : 0}, w = [];
            if (0 === t.itemsCount) t.renderEmpty && w.push(t.renderEmpty()); else {
                w.push(i(".start-spacer", {key: "start-spacer", style: m}));
                for (var b = d; b < d + h; b++) w.push(t.renderItem(b, c));
                w.push(i(".end-spacer", {key: "end-spacer", style: v}))
            }
            return c && (c = !1), i("div", Object.assign({}, t.props, {style: g, config: e}), w)
        }
    }

    var i = require("lhorie~mithril@v0.1.34");
    t.exports = n
}), require.register("tgr/src/js/lib/actioner.js", function (e, t) {
    "use strict";

    function n(e, t, s) {
        if (!(this instanceof n)) return new n(e, t, s);
        this.scope = e, this.container = t, this.events = r(t, this), this.options = i({}, n.defaults, s), this.actions = {};
        for (var o = 0; o < this.options.events.length; o++) this.events.bind(this.options.events[o] + " [data-" + this.options.key + "]", "handle")
    }

    var i = require("darsain~extend@0.1.0"), r = require("component~events@1.0.7"), s = require("component~type@1.0.0");
    t.exports = n, n.prototype.add = function (e, t) {
        this.actions[e] = t || e
    }, n.prototype.remove = function (e) {
        delete this.actions[e]
    }, n.prototype.has = function (e) {
        return !!this.actions[e]
    }, n.prototype.handle = function (e) {
        var t = e.delegateTarget, n = t.dataset, i = n.action;
        this.has(i) && ("A" === t.tagName && e.preventDefault(), this.trigger(i, n, t))
    }, n.prototype.trigger = function (e, t, n) {
        var i = this.actions[e];
        switch (s(i)) {
            case"function":
                break;
            case"string":
                i = this.scope[i];
                break;
            default:
                i = !1
        }
        i && i.call(this.scope, t, n)
    }, n.defaults = {key: "action", events: ["click"]}
}), require.register("tgr/src/js/lib/animate.js", function (e, t) {
    function n(e, t, n) {
        return function (i, r) {
            r || (t && (i.style.webkitAnimationDelay = t + "ms", i.style.animationDelay = t + "ms"), n && (i.style.webkitAnimationDuration = n + "ms", i.style.animationDuration = n + "ms"), i.classList.add(e), setTimeout(i.classList.remove.bind(i.classList, e), (0 | t) + (n || 500)))
        }
    }

    t.exports = n
}), require.register("tgr/src/js/lib/callbacks.js", function (e, t) {
    t.exports = function (e) {
        var t = 0, n = !1;
        return function () {
            return t++, function (i) {
                --t && !i || n || (n = !0, setTimeout(e.bind(null, i)))
            }
        }
    }
}), require.register("tgr/src/js/lib/channel.js", function (e, t) {
    function n(e) {
        Object.assign(d, {displayName: e.data[0].broadcaster_name, id: e.data[0].broadcaster_id}), d.emit("load"), d.loadBadges()
    }

    function i(e) {
        d.badges = e.badge_sets, d.emit("load:badges")
    }

    function r() {
        h > 0 && setTimeout(d.load, o()), h--
    }

    function s() {
        h > 0 && setTimeout(d.loadBadges, o()), h--
    }

    function o() {
        return Math.max(1e3 * (u - h), 100)
    }

    var a = require("tgr/src/js/lib/twitch.js"), l = require("component~emitter@1.1.3"),
        c = window.location.search.match(/channel=([^&]+)(&|$)/), u = 4, h = u, d = t.exports = !!c && {
            name: c[1], load: function () {
                return a.channel(d.name).then(n, r)
            }, loadBadges: function () {
                if (!d.id) throw new Error("loadBadges: channel.id required");
                return a.requestBadges("/channels/" + d.id).then(i, s)
            }, channel: function () {
                return a.channel(d.name)
            }, stream: function () {
                return a.stream(d.name)
            }, hasFollower: function (e, t) {
                a.following(e, c[1], t)
            }
        };
    d && d.load(), l(d)
}), require.register("tgr/src/js/lib/chat.js", function (e, t) {
    var n = require("component~emitter@1.1.3"), i = require("tgr/src/js/lib/channel.js"), r = t.exports = {user: {}};
    n(r), document.getElementById('tgr').addEventListener('chat-data', function (e) {
        var d = e.detail;
        if (!d || !d.meta || d.meta.channel === i.name) switch (d.type) {
            case"chat-message":
                r.emit("message", d.payload);
                break;
            case"chat-user":
                r.user = d.payload
        }
    }), r.post = function (e) {
        return postman ? postman.setAttribute("data-in", JSON.stringify({
            type: "send-message",
            payload: e,
            meta: {channel: i.name}
        })) : void console.log("Twitch Giveaways: Can't send the message, don't know where to :(");

        // return r.tab ? void chrome.tabs.sendMessage(r.tab.id, {
        //     type: "send-message",
        //     payload: e,
        //     meta: {channel: i.name}
        // }) : void console.log("Twitch Giveaways: Can't send the message, don't know where to :(")
    }
}), require.register("tgr/src/js/lib/components.js", function (e, t) {
    function n(e) {
        return this instanceof n ? (this.ctx = e, void(this.store = {})) : new n(e)
    }

    var i = require("darsain~extend@0.1.0"), r = require("aheckmann~sliced@0.0.5"),
        s = require("darsain~constructor-apply@0.1.0");
    t.exports = n;
    var o = n.prototype;
    o.use = function (e, t) {
        var n;
        if ("string" != typeof e ? (n = r(arguments, 1), t = e, e = t.name) : n = r(arguments, 2), !e || "string" != typeof e) throw new Error("Invalid component name.");
        if (this.has(e)) throw new Error('Component "' + e + '" already exists.');
        return t = i({name: e, args: n}, t), t.controller && (t.controller.prototype = this.ctx), this.add(e, t), this
    }, o.add = function (e, t) {
        return this.store[e] = t, this
    }, o.get = function (e) {
        return this.store[e]
    }, o.has = function (e) {
        return e in this.store
    }, o.load = function (e) {
        var t = this.get(e);
        if (!t.instance && t.controller) {
            var n = t.args.slice();
            n.push(t.data), t.instance = s(t.controller, n)
        }
    }, o.unload = function (e, t) {
        function n() {
            i.instance = null, t && t()
        }

        var i = this.get(e), r = i && i.instance;
        r && "function" == typeof r.onunload ? r.onunload.length ? (r.unloading = !0, r.onunload(n)) : (r.onunload(), n()) : n()
    }, o.remove = function (e) {
        return this.unload(e), delete this.store[e]
    }, o.destroy = function () {
        for (var e in this.store) this.remove(e);
        delete this.store
    }, o.render = function (e) {
        var t = this.get(e);
        if (!t) throw new Error('Component "' + e + "\" doesn't exist.");
        return this.load(e), t.view(t.instance || this.ctx)
    }
}), require.register("tgr/src/js/lib/datepicker.js", function (e, t) {
    var n = require("tgr/src/js/vendor/pikaday.js"),
        i = (require("tgr/src/js/lib/withkey.js"), {minDate: new Date("01-01-2017"), maxDate: new Date});
    t.exports = function (e) {
        return e = Object.assign({}, i, e), function (t, i, r) {
            function s(e) {
                27 === (e.which || e.keyCode) && (t.value = "", a())
            }

            function o() {
                var e = new Date(t.value);
                isNaN(e.getTime()) && (e = null), l.setDate(e, !0), t.value || setTimeout(function () {
                    t.blur()
                }, 1)
            }

            function a() {
                t.dispatchEvent(new Event("input", {bubbles: !0, cancelable: !0}))
            }

            if (!i) {
                var l = new n({
                    field: t,
                    minDate: e.minDate,
                    maxDate: e.maxDate,
                    position: "bottom right",
                    onSelect: a
                });
                t.addEventListener("keydown", s), t.addEventListener("input", o), r.onunload = function () {
                    l.destroy(), t.removeEventListener("keydown", s), t.removeEventListener("input", o)
                }
            }
        }
    }
}), require.register("tgr/src/js/lib/loadsvg.js", function (e, t) {
    function n(e, t) {
        function n(e) {
            t(new Error(e || s.statusText))
        }

        function r() {
            var r = document.createElement("div");
            r.innerHTML = i(s.responseText);
            var o = r.children[0];
            return o && "svg" === o.nodeName.toLowerCase() ? void t(null, o) : n('URL "' + e + "\" returned something that didn't result in an SVG element.")
        }

        var s = new XMLHttpRequest;
        s.onload = r, s.ontimeout = n, s.onerror = n, s.open("get", e, !0), s.send()
    }

    function i(e) {
        return String(e).replace(/<\?xml[^<]+\?>/i, "").replace(/<!doctype[^<]+\>/i, "")
    }

    t.exports = n
}), require.register("tgr/src/js/lib/many-times.js", function (e, t) {
    t.exports = function (e) {
        switch (e = 0 | e) {
            case 1:
                return "once";
            case 2:
                return "twice";
            default:
                return e + " times"
        }
    }
}), require.register("tgr/src/js/lib/morpher.js", function (e, t) {
    var n = require("lhorie~mithril@v0.1.34");
    t.exports = function (e, t) {
        return function (i) {
            return n(e, t ? n.trust(i) : i)
        }
    }
}), require.register("tgr/src/js/lib/odb.js", function (e, t) {
    function n(e) {
        var t = Object.keys(e), n = t.length;
        return function (i) {
            for (var r = 0; r < n; r++) if (i[t[r]] !== e[t[r]]) return !1;
            return !0
        }
    }

    function i(e, t) {
        p(this, this.defaults, t), this._model = e, this.keystore = {}, v(this), m.call(this, this.orderFn, this.compareFn)
    }

    function r(e) {
        var t = e instanceof this._model ? e : new this._model(e);
        return this.exists(t.id) ? (t = this.get(t.id).extend(e), this.emit("change", t)) : (t = this.keystore[this.key(t.id)] = t, w.insert.call(this, t), this.emit("insert", t)), t
    }

    function s(e) {
        return this.keystore[this.key(e)]
    }

    function o(e, t, n) {
        var i = this.get(e);
        if (i) return "string" == typeof t ? i[t] = n : i.extend(t), this.emit("change", i), i
    }

    function a(e) {
        var t, i = typeof e;
        if ("string" === i) {
            if (t = this.get(e), !t) return;
            return this.splice(this.indexOf(t), 1), delete this.keystore[this.key(e)], void this.emit("remove", t)
        }
        if (e instanceof this._model) return this.remove(e.id);
        if ("object" === i) e = n(e); else if ("function" !== i) return;
        for (var r = 0; r < this.length; r++) t = this[r], e(t) && (this.remove(t.id), r--)
    }

    function l(e) {
        return this.prefix + e
    }

    function c(e) {
        return this.key(e) in this.keystore
    }

    function u(e) {
        return this.findAll(e, 1)[0]
    }

    function h(e, t) {
        var i = typeof e;
        if ("string" === i) return [this.get(e)];
        for (var r = "function" === i ? e : n(e), s = [], o = 0; o < this.length; o++) if (r(this[o]) && (s.push(this[o]), s.length === t)) return s;
        return s
    }

    function d() {
        delete this.keystore, this.keystore = {}, w.reset.call(this)
    }

    var p = require("darsain~extend@0.1.0"), f = require("darsain~definer@0.0.1"),
        g = require("component~inherit@0.0.3"), m = require("darsain~sortedlist@0.0.2"),
        v = require("component~emitter@1.1.3");
    t.exports = i, g(i, m);
    var w = m.prototype;
    f(i.prototype).type("m").type("p", {writable: !0}).m("insert", r).m("get", s).m("set", o).m("remove", a).m("key", l).m("exists", c).m("find", u).m("findAll", h).m("reset", d).p("defaults", {
        prefix: "k",
        orderFn: null,
        compareFn: null
    })
}), require.register("tgr/src/js/lib/section.js", function (e, t) {
    function n(e) {
        return this instanceof n ? (s.call(this, e), this.active = "index", void(this.key = "index-0")) : new n(e)
    }

    var i = require("lhorie~mithril@v0.1.34"), r = require("component~inherit@0.0.3"),
        s = require("tgr/src/js/lib/components.js"), o = require("component~emitter@1.1.3");
    t.exports = n, r(n, s), o(n.prototype);
    var a = n.prototype;
    a.activate = function (e, t) {
        function n() {
            r.unloading = !1, l && i.redraw()
        }

        var r = this;
        if (!this.has(e)) throw new Error('Section "' + e + "\" doesn't exist.");
        var s = this.active, o = this.active, a = this.get(e);
        if (e === s && a.data === t) return this;
        if (this.active = e, this.key = e + "-" + Math.round(1e16 * Math.random()), this.emit("active", e, o), arguments.length > 1 && (a.data = t), this.unloading) return this;
        var l = !1;
        return this.unloading = !0, this.unload(s, n), l = !0, this
    }, a.isActive = function (e) {
        return this.active === e
    }, a.activator = function (e, t) {
        var n = this;
        return function (i) {
            i && i.preventDefault && i.preventDefault(), n.activate(e, t)
        }
    }, a.render = function () {
        return s.prototype.render.call(this, this.active)
    }
}), require.register("tgr/src/js/lib/setters.js", function (e, t) {
    function n(e, t) {
        switch (e) {
            case"string":
                return t + "";
            case"number":
            case"integer":
                return parseInt(t, 10) || 0;
            case"float":
                return parseFloat(t) || 0;
            case"boolean":
                return !!t
        }
        return t
    }

    var i = require("eivindfjeldstad~dot@0.1.0"), r = require("component~emitter@1.1.3");
    t.exports = function (e) {
        function t(t) {
            var r = o[t] = o[t] || function (n) {
                if (!arguments.length) return i.get(e, t);
                var r = i.get(e, t);
                n !== r && (i.set(e, t, n), s(t, n, r))
            };
            return r.to = r.to || function (e) {
                return r.bind(null, e)
            }, r.type = r.type || function (e) {
                return function (t) {
                    return arguments.length ? void r(n(e, t)) : n(e, r())
                }
            }, r
        }

        function s(n, r, s) {
            t.emit(n, r, s);
            for (var o, a = n.split("."); a.pop() && a.length;) o = a.join("."), t.emit(o, i.get(e, o));
            t.emit("*", n, r, s)
        }

        var o = {};
        return t.changed = s, r(t)
    }
}), require.register("tgr/src/js/lib/textify.js", function (e, t) {
    function n(e) {
        i.innerHTML = e && 1 === e.nodeType ? e.outerHTML : e + "";
        for (var t = i.querySelectorAll("img"), n = 0, r = t.length; n < r; n++) t[n].outerHTML = t[n].getAttribute("alt");
        return i.textContent || i.innerText
    }

    var i = document.createElement("div");
    t.exports = n
}), require.register("tgr/src/js/lib/timespan.js", function (e, t) {
    var n = [{key: "seconds", dur: 1e3}, {key: "minutes", dur: 6e4}, {key: "hours", dur: 36e5}, {
        key: "days",
        dur: 864e5
    }];
    t.exports = function (e, t) {
        for (var i = {}, r = t || 4; r--;) i[n[r].key] = e / n[r].dur | 0, e -= i[n[r].key] * n[r].dur;
        return i
    }
}), require.register("tgr/src/js/lib/twitch.js", function (e, t) {
    var n = require("lhorie~mithril@v0.1.34"),
        i = (require("ianstormtaylor~to-sentence-case@0.1.1"), require("tgr/src/js/lib/twitch.js")),
        r = require("component~query@0.0.3"), s = require("component~emitter@1.1.3"), o = {};
    s(o);
    var i = t.exports = {
        api: "https://api.twitch.tv/kraken",
        helixapi: "https://api.twitch.tv/helix",
        clientID: "fgvqq7j6nhahgbxa10sagf5at2exal",
        bearerTOKEN: "Bearer qb0my0aujfwxcfidn80rz8ugxzje96", // no scope token
        timeout: 1e4,
        request: function (e) {
            return n.request({
                method: "GET", url: i.api + e, background: !0, config: function (e) {
                    e.setRequestHeader("Client-ID", i.clientID), e.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json"), setTimeout(e.abort.bind(e), i.timeout)
                }
            })
        },
        requestHelix: function (e) {
            return n.request({
                method: "GET", url: i.helixapi + e, background: !0, config: function (e) {
                    e.setRequestHeader("Client-ID", i.clientID), e.setRequestHeader("Authorization", i.bearerTOKEN), setTimeout(e.abort.bind(e), i.timeout)
                }
            })
        },
        requestBadges: function (e) {
            return n.request({
                method: "GET",
                url: "https://badges.twitch.tv/v1/badges" + e + "/display",
                background: !0,
                config: function (e) {
                    e.setRequestHeader("Client-ID", i.clientID), e.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json"), e.setRequestHeader("Authorization", i.bearerTOKEN),setTimeout(e.abort.bind(e), i.timeout)
                }
            })
        },
        toID: function (e) {
            return String(e).trim().replace(" ", "").toLowerCase()
        },
        userToID: function(e) {
            e = i.toID(e);
            return i.requestHelix("/users?login=" + e).then(function (e) {
                return e.data[0].id
            })
        },
        following: function (e, t) {
            var data = {userName: e, channelName: t};
            return i.userToID(data.userName).then(function (result) {
                return data.userID = result, i.userToID(data.channelName).then(function (result) {
                    return data.channelID = result, i.requestHelix("/users/follows?from_id=" + data.userID + "&to_id=" + data.channelID)
                })
            })
        },
        profile: function (e) {
            return i.userToID(e).then(function (e) {
                return i.requestHelix("/users?id=" + e)
            })
        },
        channel: function (e) {
            return i.userToID(e).then(function (e) {
                return i.requestHelix("/channels?broadcaster_id=" + e)
            })
        },
        stream: function (e) {
            return i.requestHelix("/streams/" + e).then(function (e) {
                return e.data[0]
            })
        },
        pageType: function () {
            var e = window.location.pathname;
            return e.match(/^\/([^\/]+)\/chat\/?$/i) ? "chat" : r(".chat-room") && e.match(/^\/[^\/]+\/?$/i) ? "channel" : void 0
        }
    }
}), require.register("tgr/src/js/lib/withkey.js", function (e, t) {
    t.exports = function (e, t) {
        return Array.isArray(e) || (e = [e]), function (n) {
            var i = n.which || n.keyCode;
            for (var r in e) i === e[r] && t(n)
        }
    }
}), require.register("tgr/src/js/model/message.js", function (e, t) {
    function n(e) {
        i.call(this), this.time = new Date, this.html = e.html, this.text = e.text
    }

    var i = require("tgr/src/js/model/model.js"), r = require("component~inherit@0.0.3");
    t.exports = n, r(n, i)
}), require.register("tgr/src/js/model/model.js", function (e, t) {
    function n() {
    }

    var i = require("darsain~extend@0.1.0");
    t.exports = n;
    var r = n.prototype;
    r.extend = function (e) {
        return "object" == typeof e ? i(!0, this, e) : this
    }
}), require.register("tgr/src/js/model/user.js", function (e, t) {
    function n(e) {
        i.call(this), this.group = "user", this.eligible = !0, this.badges = [], this.broadcaster = !1, this.staff = !1, this.admin = !1, this.sub = this.subscriber, this.subscriber = !1, this.mod = !1, this.vip = !1, this.turbo = !1, this.bits = 0, this.subscribedTime = 0, this.extend(e), this.id = this.name, this.channelURL = s + "/" + this.id, this.profileURL = this.channelURL, this.messageURL = "https://www.twitch.tv/popout/" + d.name + "/viewercard/" + this.id, this.lastMessage = new Date
    }

    var i = require("tgr/src/js/model/model.js"), r = require("component~inherit@0.0.3"),
        d = require("tgr/src/js/lib/channel.js"),
        s = (require("tgr/src/js/lib/twitch.js"), "https://twitch.tv");
    t.exports = n, r(n, i);
    var o = n.prototype;
    i.prototype;
    o.extend = function (e) {
        if (this.name = e.name ? String(e.name).trim().toLowerCase() : this.name, delete e.name, !this.name) throw new Errror("User object requires name property.");
        /[^a-z0-9_\-]/i.test(e.displayName) ? this.displayName = e.displayName + " (" + this.name + ")" : this.displayName = e.displayName || this.displayName || this.name, delete e.displayName, this.badges = Array.isArray(e.badges) ? e.badges : this.badges, delete e.badges, this.bits = "bits" in e ? 0 | e.bits : this.bits, delete e.bits, this.subscribedTime = "subscribedTime" in e ? 0 | e.subscribedTime : this.subscribedTime, delete e.subscribedTime;
        for (var t = Object.keys(e), i = 0; i < t.length; i++) this[t[i]] = !!e[t[i]];
        for (var r in n.groups) if (this[r]) {
            this.group = r;
            break
        }
        return this.group || (this.group = "user"), this
    }, n.isGroup = function (e) {
        return e in n.groups
    }, n.groups = {
        broadcaster: {order: 1, icon: "broadcaster"},
        staff: {order: 2, icon: "twitch"},
        admin: {order: 3, icon: "shield-full"},
        mod: {order: 4, icon: "sword"},
        vip: {order: 5, icon: "vip"},
        subscriber: {order: 6, icon: null},
        user: {order: 6, icon: null}
    }, n.badges = Object.keys(n.groups).concat("subscriber")
}), require.register("tgr/src/js/model/users.js", function (e, t) {
    function n() {
        return new r(s, {orderFn: i})
    }

    function i(e, t) {
        return s.groups[e.group].order !== s.groups[t.group].order ? s.groups[e.group].order < s.groups[t.group].order ? -1 : 1 : e.id < t.id ? -1 : e.id > t.id ? 1 : 0
    }

    var r = require("tgr/src/js/lib/odb.js"), s = require("tgr/src/js/model/user.js");
    t.exports = n, n.ignoredGroups = [""]
}), require.register("tgr/src/js/model/winners.js", function (e, t) {
    function n(e) {
        return e = Number(e) || 10, Array(e).fill(0).map(function () {
            return Math.floor(36 * Math.random()).toString(36)
        }).join("")
    }

    function i(e, t) {
        var n = this;
        n.options = t || {}, n.connecting = !1, n.connected = !1, n.saving = !1, n.channel = e, n.selectedChannel = e, n.storageKey = "past-winners", n.searchTerm = "", n.fromTime = null, n.toTime = null, n.selected = [], n.channels = {}, n.sig, n.used = 0, n.sync = n.sync.bind(n), n.save = n.save.bind(n), n.updateUsed = n.updateUsed.bind(n), n.switchChannel = n.switchChannel.bind(n), n.search = n.search.bind(n), n.from = n.from.bind(n), n.to = n.to.bind(n), n.delete = n.delete.bind(n), n.clearSelected = n.clearSelected.bind(n), n.mockAdd = n.mockAdd.bind(n), n.isSelected = n.isSelected.bind(n)
    }

    i.prototype.connect = function () {
        var e = this;
        return e.connected ? Promise.resolve() : e.connecting ? e.connecting : (chrome.storage.onChanged.addListener(e.sync), e.connecting = new Promise(function (t, n) {
            chrome.storage.local.get(e.storageKey, function (n) {
                e.reload(n[e.storageKey]), t()
            })
        }).then(function () {
            e.connected = !0, e.connecting = !1, e.updateUsed()
        }), e.connecting)
    }, i.prototype.reload = function (e) {
        var t, n = this;
        if (e) try {
            t = JSON.parse(e)
        } catch (e) {
        }
        if (t && t.channels) {
            if (n.sig && n.sig === t.sig) return;
            n.channels = t.channels
        } else n.channels = {};
        return n.storeChanged(), n.reselect(), n
    }, i.prototype.sync = function (e, t) {
        "local" === t && e[this.storageKey] && this.reload(e[this.storageKey].newValue)
    }, i.prototype.requestSave = function () {
        var e = this;
        if (!e.connected) throw new Error("Can't save, store not connected.");
        return e.requestSaving ? e.requestSaving : (e.requestSaving = new Promise(function (e) {
            setTimeout(e, 60)
        }).then(function () {
            return e.requestSaving = !1, e.save()
        }), e.requestSaving)
    }, i.prototype.save = function () {
        var e = this;
        if (!e.connected) throw new Error("Can't save, store not connected.");
        return e.saving ? e.saving.then(function () {
            return e.save()
        }) : (e.saving = new Promise(function (t) {
            var n = {};
            n[e.storageKey] = JSON.stringify({
                sig: e.sig,
                channels: e.channels
            }), chrome.storage.local.set(n, function () {
                e.saving = !1, e.updateUsed(), t()
            })
        }), e.saving)
    }, i.prototype.storeChanged = function () {
        this.sig = n()
    }, i.prototype.updateUsed = function () {
        var e = this;
        return new Promise(function (t) {
            chrome.storage.local.getBytesInUse(null, function (n) {
                e.used = n, t(), e.options.onsync && e.options.onsync()
            })
        })
    }, i.prototype.add = function (e) {
        if (!this.connected) throw new Error("Can't add a winner, store not connected.");
        var t = this.channels[this.channel] = this.channels[this.channel] || [];
        return t.push({
            id: n(),
            name: e.name,
            displayName: e.displayName || e.name,
            time: Date.now(),
            title: e.title
        }), this.storeChanged(), this.reselect(), this.requestSave()
    }, i.prototype.mockAdd = function (e, t) {
        if (e = Number(e) || 10, t = Number(t) || 36e5, !this.connected) throw new Error("Can't add a winner, store not connected.");
        for (var i, r = this.channels[this.selectedChannel] = this.channels[this.selectedChannel] || [], s = Date.now() - e * t, o = 0; o < e; o++) i = n(Math.round(26 * Math.random() + 4)).toLowerCase(), r.push({
            id: n(),
            name: i,
            displayName: i[0].toUpperCase() + i.slice(1),
            time: s,
            title: Array(Math.round(20 * Math.random() + 2)).fill(0).map(function () {
                return n(Math.round(8 * Math.random() + 2))
            }).join(" ")
        }), s += t;
        return this.storeChanged(), this.reselect(), this.requestSave()
    }, i.prototype.switchChannel = function (e) {
        this.selectedChannel = e, this.reselect()
    }, i.prototype.currentChannel = function () {
        return this.channels[this.selectedChannel] || []
    }, i.prototype.search = function (e) {
        this.searchTerm = String(e).toLowerCase(), this.reselect()
    }, i.prototype.from = function (e) {
        this.fromTime = e ? new Date(e) : null, this.reselect()
    }, i.prototype.to = function (e) {
        this.toTime = e ? new Date(new Date(e).getTime() + 86364e3) : null, this.reselect()
    }, i.prototype.delete = function (e) {
        return this.channels[this.selectedChannel] ? (this.channels[this.selectedChannel] = this.channels[this.selectedChannel].filter(function (t) {
            return t.id !== e
        }), 0 === this.channels[this.selectedChannel].length && (delete this.channels[this.selectedChannel], this.selectedChannel = this.channel), this.storeChanged(), this.reselect(), this.requestSave()) : Promise.resolve()
    }, i.prototype.clearSelected = function () {
        var e = this, t = this.channels[this.selectedChannel] || [];
        return this.channels[this.selectedChannel] = t.filter(function (t) {
            return !e.isSelected(t)
        }), 0 === this.channels[this.selectedChannel].length && (delete this.channels[this.selectedChannel], this.selectedChannel = this.channel), this.storeChanged(), this.reselect(), this.requestSave()
    }, i.prototype.reselect = function () {
        var e = this.currentChannel();
        this.selected = e.filter(this.isSelected)
    }, i.prototype.isSelected = function (e) {
        return (!this.searchTerm || e.name.indexOf(this.searchTerm) !== -1 || !e.title || e.title.toLowerCase().indexOf(this.searchTerm) !== -1) && (!(this.fromTime && this.fromTime > e.time) && !(this.toTime && this.toTime < e.time))
    }, t.exports = i
}), require.register("tgr/src/js/section/about.js", function (e, t) {
    function n() {
        this.version = require("tgr/data/changelog.json")[0], this.faqs = require("tgr/data/faq.json")
    }

    function i(e) {
        return [r(".card", [r(".title", {config: o("slideintop", 100)}, [r("h1", [r("a", {
            href: "#",
            target: "_blank"
        }, "Twitch Çekilişleri")])]), r(".lead", [r(".emblem", {config: o("slideintop")}, [s("tgr")]), r("aside.middle", [r(".meta", {config: o("slideinright", 50)}, [r("h3", e.version.version)]), r(".meta", {config: o("slideinleft", 50)}, [r("em", e.version.date)])]), r("aside.lower", [null, null])])]), null, null, r("fieldset.faq", [r("legend", {config: o("fadein", 100)}, "Frequently Asked Questions")].concat(e.faqs.map(function (e, t) {
            return r("article.qa", {config: o("slideinleft", 50 * t + 100)}, [r("h1.question", r.trust(e.question))].concat(e.answer.map(l)))
        })))]
    }

    var r = require("lhorie~mithril@v0.1.34"), s = require("tgr/src/js/component/icon.js"),
        o = require("tgr/src/js/lib/animate.js"), a = require("tgr/src/js/lib/morpher.js");
    t.exports = {name: "about", controller: n, view: i};
    var l = a("p", !0)
}), require.register("tgr/src/js/section/bitcoin.js", function (e, t) {
    function n() {
      var e = 0;
      return [
        i("figure.bitcoin", [
          i(".qr", { config: r("slideinleft", 50 * e++) }),
          i("figcaption.text", { config: r("slideinleft", 50 * e++) }, chrome.i18n.getMessage("MAKE_A_DONATION")),
          i(
            "figcaption.address",
            { config: r("slideinleft", 50 * e++) },
            "1CCsNx2fnGXr1jrGMW71rtSZbd81XXQUno"
          ),
        ]),
      ];
    }

    var i = require("lhorie~mithril@v0.1.34"), r = require("tgr/src/js/lib/animate.js");
    t.exports = {name: "bitcoin", view: n}
}), require.register("tgr/src/js/component/support.js", function(e, t) {
    function n(e, t) {
        return i(".support", {
            "data-tip": t ? t : ""
        }, [i("a.paypal", {
            href: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2F5GNJ3UC39CL",
            target: "_blank",
            config: s("slideinleft", 50)
        }, [r("paypal"), "PayPal"]), i("a.bitcoin", {
            href: "#",
            onmousedown: e.toSection("bitcoin"),
            config: s("slideinleft", 100)
        }, [r("bitcoin"), "Bitcoin"])])
    }
    var i = require("lhorie~mithril@v0.1.34"),
        r = require("tgr/src/js/component/icon.js"),
        s = require("tgr/src/js/lib/animate.js");
    t.exports = {
        name: "support",
        view: n
    }
}), require.register("tgr/src/js/section/changelog.js", function (e, t) {
    function n() {
        this.releases = require("tgr/data/changelog.json").map(i), this.isNewVersion && (this.setter("isNewVersion")(!1), this.setter("options.lastReadChangelog")(this.version))
    }

    function i(e, t) {
        return e = h(!0, {}, e), e.collapsed = o.prop(t > 0), e
    }

    function r(e) {
        return e.releases.map(function (e, t) {
            var n = [];
            return e.collapsed() || (e.description && (n = n.concat(e.description.map(g))), Object.keys(e).filter(s).forEach(function (t) {
                n.push(o("h2.changestype." + t, l(t))), n.push(o("ul." + t, e[t].map(f)))
            })), o("article.release", {
                key: "release-" + e.version,
                config: c("slideinleft", 25 * t)
            }, [o("h1.version", {onmousedown: d(1, e.collapsed.bind(null, !e.collapsed()))}, [e.version, o("small", e.date), o(".spacer"), a(e.collapsed() ? "chevron-down" : "chevron-up", "chevron")]), n.length ? o(".description.fadein", n) : null])
        })
    }

    function s(e) {
        return p.indexOf(e) !== -1
    }

    var o = require("lhorie~mithril@v0.1.34"), a = require("tgr/src/js/component/icon.js"),
        l = require("ianstormtaylor~to-sentence-case@0.1.1"), c = require("tgr/src/js/lib/animate.js"),
        u = require("tgr/src/js/lib/morpher.js"), h = require("darsain~extend@0.1.0"),
        d = require("tgr/src/js/lib/withkey.js"), p = ["new", "added", "removed", "changed", "fixed"];
    t.exports = {name: "changelog", controller: n, view: r};
    var f = u("li", !0), g = u("p", !0)
}), require.register("tgr/src/js/section/config.js", function (e, t) {
    function n(e) {
        return String(e).trim().replace(" ", "").toLowerCase()
    }

    function i() {
        var e = this;
        this.updateIgnoreList = function (t) {
            e.setter("options.ignoreList")(t.split("\n").map(n))
        },
        this.updateForbiddenWords = function (t) {
            e.setter("options.forbiddenWords")(t.split("\n").map(n))
        }
    }

    function r(e) {
        var t = 0;
        return [s("fieldset.begging", [s("legend", {
            config: a("fadein", 100)
        }, chrome.i18n.getMessage("MAKE_A_TIP")), require("tgr/src/js/component/support.js").view(e)
        ]), s("article.option.uncheck-winners", {
            key: "option-uncheck-winners",
            config: a("slideinleft", 50 * t++)
        }, [s("label", {onmousedown: l(1, e.setter("options.uncheckWinners").to(!e.options.uncheckWinners))}, chrome.i18n.getMessage("UNCHECK_WINNER")), o(e.options.uncheckWinners ? "check" : "close", {
            class: "checkbox" + (e.options.uncheckWinners ? " checked" : ""),
            onmousedown: l(1, e.setter("options.uncheckWinners").to(!e.options.uncheckWinners))
        }), s("p.description", chrome.i18n.getMessage("CONFIG_UNCHECK_WINNERS"))]), s("article.option.announce-winner", {
            key: "option-announce-winner",
            config: a("slideinleft", 50 * t++)
        }, [s("label", {onmousedown: l(1, e.setter("options.announceWinner").to(!e.options.announceWinner))}, chrome.i18n.getMessage("ANNOUNCE_WINNER")), o(e.options.announceWinner ? "check" : "close", {
            class: "checkbox" + (e.options.announceWinner ? " checked" : ""),
            onmousedown: l(1, e.setter("options.announceWinner").to(!e.options.announceWinner))
        }), s("p.description", [chrome.i18n.getMessage("CONFIG_ANNOUNCE_WINNER_DESC")])]), s("article.option.announce-template", {
            key: "option-announce-template",
            config: a("slideinleft", 50 * t++)
        }, [s("label[for=option-announce-template]", [chrome.i18n.getMessage("CONFIG_ANNOUNCE_TEMPLATE"), s("p.description", [s("code", "{name}"), " -", chrome.i18n.getMessage("CONFIG_ANNOUNCE_TEMPLATE_CODE")])]), s("textarea#option-announce-template", {
            oninput: s.withAttr("value", e.setter("options.announceTemplate")),
            value: e.options.announceTemplate
        })]), s("article.option.keyword-antispam", {
            key: "option-keyword-antispam",
            config: a("slideinleft", 50 * t++)
        }, [s("label", {onmousedown: l(1, e.setter("options.keywordAntispam").to(!e.options.keywordAntispam))}, chrome.i18n.getMessage("KEYWORD_ANTISPAM_TITLE")), o(e.options.keywordAntispam ? "check" : "close", {
            class: "checkbox" + (e.options.keywordAntispam ? " checked" : ""),
            onmousedown: l(1, e.setter("options.keywordAntispam").to(!e.options.keywordAntispam))
        }), e.options.keywordAntispam ? s("input[type=range]", {
            min: 1,
            max: 5,
            oninput: s.withAttr("value", e.setter("options.keywordAntispamLimit").type("number")),
            value: e.options.keywordAntispamLimit
        }) : null, e.options.keywordAntispam ? s("span.meta", e.options.keywordAntispamLimit) : null, s("p.description", chrome.i18n.getMessage("KEYWORD_ANTISPAM_DESC"))]), 
            s("article.option.ignore-list", {
            key: "option-ignore-list",
            config: a("slideinleft", 50 * t++)
        }, [s("label[for=option-ignore-list]", [chrome.i18n.getMessage("BANNED_USERS"), s("p.description", chrome.i18n.getMessage("BANNED_USERS_DESC"))]), s("textarea#option-ignore-list", {
            placeholder: chrome.i18n.getMessage("BANNED_USERS_PLACEHOLDER"),
            oninput: s.withAttr("value", e.updateIgnoreList),
            value: e.options.ignoreList.join("\n")
        })]), s("article.option.forbiddenWords", {
            key: "forbiddenWords",
            config: a("slideinleft", 50 * t++)
        }, [s("label[for=forbiddenWords]", [chrome.i18n.getMessage("FORBIDDEN_WORDS"), s("p.description", chrome.i18n.getMessage("FORBIDDEN_WORDS_DESC"))]), s("textarea#forbiddenWords", {
            value: e.options.forbiddenWords,
            placeholder: chrome.i18n.getMessage("FORBIDDEN_WORDS_PLACEHOLDER"),
            oninput: s.withAttr("value", e.updateForbiddenWords),
            onkeydown: l(27, e.setter("options.forbiddenWords").to(""))
        })]), 
            s("article.option.display-tooltips", {
            key: "option-display-tooltips",
            config: a("slideinleft", 50 * t++)
        }, [s("label", {onmousedown: l(1, e.setter("options.displayTooltips").to(!e.options.displayTooltips))}, chrome.i18n.getMessage("DISPLAY_TOOLTIPS")), o(e.options.displayTooltips ? "check" : "close", {
            class: "checkbox" + (e.options.displayTooltips ? " checked" : ""),
            onmousedown: l(1, e.setter("options.displayTooltips").to(!e.options.displayTooltips))
        }), s("p.description", chrome.i18n.getMessage("DISPLAY_TOOLTIPS_DESC"))])]
    }

    var s = require("lhorie~mithril@v0.1.34"), o = require("tgr/src/js/component/icon.js"),
        a = require("tgr/src/js/lib/animate.js"), l = require("tgr/src/js/lib/withkey.js"),
        c = require("tgr/src/js/lib/many-times.js");
    t.exports = {name: "config", controller: i, view: r}
}), require.register("tgr/src/js/section/index.js", function (e, t) {
    function n() {
        var e = this;
        this.cleanEntries = function () {
            for (var t, n = 0; t = e.users[n], n < e.users.length; n++) delete t.keyword, delete t.keywordEntries;
            e.updateSelectedUsers()
        };
        var t = this.setter("rolling.minBits");
        this.setMinBits = function (e) {
            t(r(f.cheerSteps, e))
        };
        var n = this.setter("rolling.subscribedTime");
        this.setSubscribedTime = function (e) {
            n(r(f.subscribedTimeSteps, e))
        }, this.cancelKeyword = function () {
            e.setter("rolling.keyword")(""), e.cleanEntries()
        }, this.resetEligible = function () {
            for (var t, n = 0; t = e.users[n++];) t.eligible = !0
        }
    }

    function i(e) {
        var t = 0;
            return [l(".controls", [l(".block.groups", Object.keys(e.rolling.groups).map(o, e)), l("ul.block.rolltypes", {config: d("slideinleft", 50 * t++)}, e.rolling.types.map(a, e)), l(".block.options", [m[e.rolling.type].view(e), l(".option", {
            key: "min-bits",
            config: d("slideinleft", 50 * t++)
        }, [l("label[for=min-bits]", chrome.i18n.getMessage("MIN_BITS_TITLE")), l("input[type=range]#min-bits", {
            min: 0,
            max: f.cheerSteps.length - 1,
            step: 1,
            oninput: l.withAttr("value", e.setMinBits),
            value: f.cheerSteps.indexOf(e.rolling.minBits)
        }), l("span.meta", e.rolling.minBits.toLocaleString())]), l(".option", {
            key: "subscribed-time",
            config: d("slideinleft", 50 * t++)
        }, [l("label[for=subscribed-time]", chrome.i18n.getMessage("SUBS_TIME_TITLE")), l("input[type=range]#subscribed-time", {
            min: 0,
            max: e.config.subscribedTimeSteps.length - 1,
            oninput: l.withAttr("value", e.setSubscribedTime),
            value: e.config.subscribedTimeSteps.indexOf(e.rolling.subscribedTime)
        }), l("span.meta", [e.rolling.subscribedTime, " ", c("moon")]), l("p.description", [chrome.i18n.getMessage("SUBSCRIBED_TIME_DESC")])]), l(".option", {
            key: "subscriber-luck",
            config: d("slideinleft", 50 * t++),
            className: e.rolling.subscribedTime > 0 ? "disabled" : ""
        }, [l("label[for=subscriber-luck]", chrome.i18n.getMessage("SUBS_LUCK_TITLE")), l("input[type=range]#subscriber-luck", {
            min: 1,
            max: e.config.maxSubscriberLuck,
            oninput: l.withAttr("value", e.setter("rolling.subscriberLuck").type("number")),
            value: e.rolling.subscriberLuck,
            disabled: e.rolling.subscribedTime > 0
        }), l("span.meta", [e.rolling.subscriberLuck, l("em", "×")]), l("p.description", [chrome.i18n.getMessage("SUBSCRIBER_LUCK_DESC_1"), e.rolling.subscriberLuck > 1 ? [" ", l("strong", e.rolling.subscriberLuck), " ", chrome.i18n.getMessage("SUBSCRIBER_LUCK_DESC_2")] : [chrome.i18n.getMessage("SUBSCRIBER_LUCK_DESC_3")], "."])]), l(".option", {
            key: "uncheck-winners",
            config: d("slideinleft", 50 * t++)
        }, [l("label", {onmousedown: h(1, e.setter("options.uncheckWinners").to(!e.options.uncheckWinners))}, chrome.i18n.getMessage("UNCHECK_WINNER")), c(e.options.uncheckWinners ? "check" : "close", {
            class: "checkbox" + (e.options.uncheckWinners ? " checked" : ""),
            onmousedown: h(1, e.setter("options.uncheckWinners").to(!e.options.uncheckWinners))
        }), l("p.description.sameline", chrome.i18n.getMessage("UNCHECK_WINNER_DESC"))]), l(".option", {
            key: "announce-winner",
            config: d("slideinleft", 50 * t++)
        }, [l("label", {onmousedown: h(1, e.setter("options.announceWinner").to(!e.options.announceWinner))}, chrome.i18n.getMessage("ANNOUNCE_WINNER")), c(e.options.announceWinner ? "check" : "close", {
            class: "checkbox" + (e.options.announceWinner ? " checked" : ""),
            onmousedown: h(1, e.setter("options.announceWinner").to(!e.options.announceWinner))
        }), l("p.description.sameline", chrome.i18n.getMessage("ANNOUNCE_WINNER_DESC"), [l('a[href="#"', {onmousedown: e.toSection("config")}, " ", chrome.i18n.getMessage("SETTINGS"))])]), ]), l(".block.actions", [l(".btn.btn-info.reset", {
            config: d("slideinleft", 50 * t++),
            onmousedown: h(1, e.resetEligible),
            "data-tip": chrome.i18n.getMessage("RESET_TIP")
        }, [l("i.eligible-icon")]), l(".btn.btn-success.roll", {
            config: d("slideinleft", 50 * t++),
            onmousedown: h(1, e.roll)
        }, chrome.i18n.getMessage("ROLL_TITLE"))])])]
    }

    function r(e, t) {
        return e[Math.min(Math.max(0, 0 | t), e.length - 1)]
    }

    function s(e) {
        var t = Math.floor(e / 1e3), n = Math.floor(t / 3600), i = Math.floor((t - 3600 * n) / 60);
        return n > 0 ? [n, l("small", chrome.i18n.getMessage("HOURS_SHORT")), " ", i, l("small", chrome.i18n.getMessage("MINUTES_SHORT"))] : [i, l("small", chrome.i18n.getMessage("MINUTES_SHORT"))]
    }

    function o(e, t) {
        return l(".btn", {
            class: this.rolling.groups[e] ? "checked" : "",
            onmousedown: h(1, this.setter("rolling.groups." + e).to(!this.rolling.groups[e])),
            config: d("slideinleft", 50 * t)
        }, [c(this.rolling.groups[e] ? "check" : "close"), u(e)])
    }

    function a(e) {
        return l("li", {
            class: this.rolling.type === e ? "active" : "",
            onclick: this.setter("rolling.type").to(e),
            "data-tip": m[e].tip(this)
        }, m[e].name)
    }

    var l = require("lhorie~mithril@v0.1.34"), c = require("tgr/src/js/component/icon.js"),
        u = require("ianstormtaylor~to-sentence-case@0.1.1"), h = require("tgr/src/js/lib/withkey.js"),
        d = require("tgr/src/js/lib/animate.js"), p = require("tgr/src/js/lib/many-times.js"),
        f = require("tgr/data/config.json");
    t.exports = {name: "index", controller: n, view: i};
    var m = {};
    m.all = {
        name: chrome.i18n.getMessage("ALL_TITLE"), tip: function () {
            return chrome.i18n.getMessage("ALL_TIP")
        }, view: function () {
            return null
        }
    }, m.aktif = {
        name: chrome.i18n.getMessage("ACTIVE_TITLE"), tip: function (e) {
            return chrome.i18n.getMessage("ACTIVE_TIP")
        }, view: function (e) {
            return l(".option", {
                key: "active-timeout",
                config: d("slideinleft", 0)
            }, [l("label[for=active-timeout]", {"data-tip": [chrome.i18n.getMessage("ACTIVE_TIMEOUT_TIP")]}, chrome.i18n.getMessage("ACTIVE_TIMEOUT")), l("input[type=range]#active-timeout", {
                min: 6e4,
                max: e.config.maxActiveTimeout,
                step: 6e4,
                oninput: l.withAttr("value", e.setter("rolling.activeTimeout").type("number")),
                value: e.rolling.activeTimeout,
            }), l("span.meta", s(e.rolling.activeTimeout))])
        }
    }, m.kelime = {
        name: chrome.i18n.getMessage("KEYWORD_TITLE"), tip: function () {
            return chrome.i18n.getMessage("KEYWORD_TIP")
        }, view: function (e) {
            return [l(".keyword" + (e.rolling.keyword ? ".active" : ""), {
                key: "keyword",
                config: d("slideinleft", 0)
            }, [l("input[type=text].word", {
                value: e.rolling.keyword,
                placeholder: chrome.i18n.getMessage("KEYWORD_PLACEHOLDER"),
                oninput: l.withAttr("value", e.setter("rolling.keyword")),
                onkeydown: h(27, e.cancelKeyword)
            }), l(".btn.clean", {
                onmousedown: h(1, e.cleanEntries),
                "data-tip": chrome.i18n.getMessage("CLEAN_TIP")
            }, [c("trash")]), l(".btn.cancel", {
                onmousedown: h(1, e.cancelKeyword),
                "data-tip": chrome.i18n.getMessage("CANCEL_TIP")
            }, [c("close")])]), l(".option.case-sensitive", {
                key: "case-sensitive",
                config: d("slideinleft", 100)
            }, [l("label", {onmousedown: h(1, e.setter("rolling.caseSensitive").to(!e.rolling.caseSensitive))}, chrome.i18n.getMessage("KEYWORD_CASE_SENSITIVE_TITLE")), c(e.rolling.caseSensitive ? "check" : "close", {
                class: "checkbox" + (e.rolling.caseSensitive ? " checked" : ""),
                onmousedown: h(1, e.setter("rolling.caseSensitive").to(!e.rolling.caseSensitive))
            }), l("p.description.sameline", [chrome.i18n.getMessage("KEYWORD_CASE_SENSITIVE_DESC_1"), " ", e.rolling.caseSensitive ? l("strong", chrome.i18n.getMessage("KEYWORD_CASE_SENSITIVE_DESC_2")) : l("strong", chrome.i18n.getMessage("KEYWORD_CASE_SENSITIVE_DESC_3"))])]), l(".option.keyword-antispam", {
                key: "option-keyword-antispam",
                config: d("slideinleft", 150)
            }, [l("label", {onmousedown: h(1, e.setter("options.keywordAntispam").to(!e.options.keywordAntispam))}, chrome.i18n.getMessage("KEYWORD_ANTISPAM_TITLE")), c(e.options.keywordAntispam ? "check" : "close", {
                class: "checkbox" + (e.options.keywordAntispam ? " checked" : ""),
                onmousedown: h(1, e.setter("options.keywordAntispam").to(!e.options.keywordAntispam))
            }), e.options.keywordAntispam ? l("input[type=range]", {
                min: 1,
                max: 5,
                oninput: l.withAttr("value", e.setter("options.keywordAntispamLimit").type("number")),
                value: e.options.keywordAntispamLimit
            }) : null, e.options.keywordAntispam ? l("span.meta", e.options.keywordAntispamLimit) : null, l("p.description", chrome.i18n.getMessage("KEYWORD_ANTISPAM_DESC"))])]
        }
    }
}), require.register("tgr/src/js/section/profile.js", function (e, t) {
    function n(e) {
        function t(t) {
            if (t)
            if (t.total === 1)  {
                e.following = true;
            }
            else {
                e.following = false; 
            }
            c();
        }

        function n(t) {
            if (t && t.login === e.login) {
                if (e.profile = t, !t.data[0].profile_image_url) return e.avatar = null, u();
                var n = function () {
                    e.avatar = t.data[0].profile_image_url, u()
                }, i = function () {
                    e.avatar = null, u()
                };
                o("img", {onload: n, onerror: i, src: t.data[0].profile_image_url})
            } else u()
        }   

        function i() {
            a.loading = !1, s.redraw()
        }

        function r() {
            a.user.respondedAt && clearInterval(m), s.redraw()
        }

        var a = this;
        this.user = e, this.loading = !0;
        var l = g(i), c = l(), u = l();
        e.hasOwnProperty("following") ? c() : d.following(e.name, h.name).then(t, t), e.hasOwnProperty("profile") ? u() : d.profile(e.name).then(n, n), this.messagesScrolling = function (e, t, n) {
            return t ? n.change() : (n.sync = function () {
                n.top = e.scrollTop, n.scrollHeight = e.scrollHeight, n.clientHeigh = e.clientHeight, n.atEnd = e.scrollTop > e.scrollHeight - e.clientHeight - 30
            }, n.toEnd = function () {
                e.scrollTop = e.scrollHeight - e.clientHeight
            }, n.change = f(function () {
                n.atEnd && n.toEnd(), n.sync()
            }, 100), n.message = function (e) {
                e.user.name === a.user.name && n.change()
            }, window.addEventListener("resize", n.change), e.addEventListener("scroll", n.sync), p.on("message", n.message), n.onunload = function () {
                window.removeEventListener("resize", a.messagesSync), e.removeEventListener("scroll", n.sync), p.off("message", n.message)
            }, void n.toEnd())
        };
        var m;
        a.user.respondedAt || (m = setInterval(r, 1e3)), this.onunload = function () {
            clearInterval(m)
        }
    }
    function openUserLog(e) {
        var n = e.user;
        return function () {
            window.open(n.messageURL, 'Chatlog', 'resizable=1,width=400,height=600')
        }
    }

    function i(e) {
        if (e.loading) return [s(".section-spinner")];
        var t = 0, n = e.user, i = n.following, o = n.subscriber,
            h = l(n.respondedAt ? n.respondedAt - n.rolledAt : new Date - n.rolledAt, 2);
        return [s(".card", [s(".title", {config: c("slideintop", 50 * t++ + 200)}, [s("h1", n.displayName)]), s(".lead", [s(".emblem", {config: c("rotatein", 0, 600)}, [s("a", {
            href: n.profileURL,
            target: "_blank"
        }, [n.avatar ? s("img", {src: n.avatar}) : a("user")])]), s("aside.middle", [s(".meta", {
            class: "color-" + (i ? "success" : i === !1 ? "light" : "warning"),
            config: c("slideinright", 200),
            "data-tip": null == i ? chrome.i18n.getMessage("API_WARNING_DESC") : ""
        }, [chrome.i18n.getMessage("API_FOLLOWING"), a(i ? "check" : i === !1 ? "close" : "help", "status")]), s(".meta", {
            class: "color-" + (o ? "success" : "light"),
            config: c("slideinleft", 200)
        }, [a(o ? "check" : "close", "status"), chrome.i18n.getMessage("API_SUBSCRIBED")])]), s("aside.lower", [s(".action.sliding", {
            onmousedown: u(1, e.roll),
            config: c("slideinright", 300)
        }, [s("span.name", chrome.i18n.getMessage("GIVEAWAY_REROLL")), a("reload")]), s("a.action.sliding", {
            onclick: openUserLog(e),
            config: c("slideinleft", 300)
        }, [a("envelope"), s("span.name", "Mesaj geçmişi")])])])]), s(".messages", [s("h2.title", {config: c("slideinleft", 50 * t++ + 200)}, [s("span.name", {"data-tip": chrome.i18n.getMessage("WINNER_MESSAGES_TIP")}, [a("speech-bubble"), " ", chrome.i18n.getMessage("WINNER_MESSAGES_TITLE"), " ", s("span.count", n.messages.length)]), s("span.clock" + (n.respondedAt ? ".paused" : ""), {"data-tip": chrome.i18n.getMessage("WINNER_ANSWER_TIME_TIP")}, [s("span.minutes", h.minutes), s("span.colon", ":"), s("span.seconds", String("00" + h.seconds).substr(-2))])]), s("ul.list.fadein", {config: e.messagesScrolling}, n.messages.slice(-100).map(r, e))])]
    }

    function r(e) {
        var t = this.user, n = l(e.time - t.respondedAt, 2);
        return s("li", [s("span.time", n.minutes + ":" + String("00" + n.seconds).substr(-2)), s("span.content", s.trust(e.html))])
    }

    var s = require("lhorie~mithril@v0.1.34"), o = require("darsain~e@0.0.1"),
        a = require("tgr/src/js/component/icon.js"), l = require("tgr/src/js/lib/timespan.js"),
        c = require("tgr/src/js/lib/animate.js"), u = require("tgr/src/js/lib/withkey.js"),
        h = require("tgr/src/js/lib/channel.js"), d = require("tgr/src/js/lib/twitch.js"),
        p = require("tgr/src/js/lib/chat.js"), f = require("component~throttle@v0.0.2"),
        g = require("tgr/src/js/lib/callbacks.js");
    t.exports = {name: "profile", controller: n, view: i}
}), require.register("tgr/src/js/section/winners.js", function (e, t) {
    function n() {
        this.virtualList = f()
    }

    function i(e) {
        function t() {
            if (0 === e.winners.searchTerm.indexOf("mock")) {
                var t = Number(e.winners.searchTerm.slice(4)) || 10;
                e.winners.search(""), e.winners.mockAdd(t)
            }
        }

        function n(t) {
            return function () {
                e.winners.delete(t).then(l.redraw)
            }
        }

        function i() {
            var t = window.confirm(chrome.i18n.getMessage("DELETE_SELECTED_RECORDS", e.winners.selected.length));
            t && e.winners.clearSelected()
        }

        function a(t, i) {
            var r = e.winners.selected[e.winners.selected.length - t - 1],
                s = w ? l.trust(r.displayName.replace(w, '<span class="query">$1</span>')) : r.displayName;
            return l(".record", {
                key: r.id,
                config: i ? d("slideinleft", 25 * b++) : null
            }, [l("header", [l(".name", {href: "https://www.twitch.tv/" + r.name}, s), l("a.profile", {
                href: "https://www.twitch.tv/" + r.name,
                target: "_blank",
                title: chrome.i18n.getMessage("PROFILE")
            }, c("user")), l(".time", {title: new Date(r.time).toLocaleString()}, g(r.time))]), l(".title", w ? l.trust(r.title.replace(w, '<span class="query">$1</span>')) : r.title), l("button.delete", {onclick: n(r.id)}, [c("trash")])])
        }

        function f() {
            return l(".empty", {key: "empty-list-placeholder"}, [l("h2", chrome.i18n.getMessage("EMPTY_LIST_PLACEHOLDER_H1")), l("p", chrome.i18n.getMessage("EMPTY_LIST_PLACEHOLDER_H2")), l("p", chrome.i18n.getMessage("EMPTY_LIST_PLACEHOLDER_H3"))])
        }

        var g = o(), m = h(), v = Object.keys(e.winners.channels);
        v.indexOf(e.winners.channel) === -1 && v.push(e.winners.channel), v = v.sort();
        var w = !!e.winners.searchTerm && new RegExp("(" + p(e.winners.searchTerm) + ")", "i"), b = 0;
        return [l(".controls", {config: d("fadein")}, [l("input[type=search].term", {
            placeholder: chrome.i18n.getMessage("SEARCH_TITLE"),
            value: e.winners.searchTerm,
            oninput: l.withAttr("value", e.winners.search),
            onkeydown: u(27, e.winners.search.bind(null, "")),
            onkeyup: u(13, t)
        }), l("select.channel", {onchange: l.withAttr("value", e.winners.switchChannel)}, v.map(function (t) {
            var n = e.winners.channels[t] ? e.winners.channels[t].length : 0, i = t + " (" + n + ")";
            return l("option", {value: t, selected: t === e.winners.selectedChannel}, i)
        })), l(".time", [l(".from", [l("span", chrome.i18n.getMessage("FROM_TITLE")), l("input[type=search].date", {
            oninput: l.withAttr("value", e.winners.from),
            config: m,
            placeholder: chrome.i18n.getMessage("DATE_TITLE"),
            value: e.winners.fromTime ? new Date(e.winners.fromTime).toLocaleDateString() : null
        })]), l(".to", [l("span", chrome.i18n.getMessage("TO_TITLE")), l("input[type=search].date", {
            oninput: l.withAttr("value", e.winners.to),
            config: m,
            placeholder: chrome.i18n.getMessage("DATE_TITLE"),
            value: e.winners.toTime ? new Date(e.winners.toTime).toLocaleDateString() : null
        })])])]), e.virtualList({
            props: {class: "winners"},
            itemSize: 50,
            itemsCount: e.winners.selected.length,
            renderItem: a,
            renderEmpty: f
        }), l(".stats", {config: d("fadein")}, [l(".stat", {"data-tip": chrome.i18n.getMessage("SELECTED_TIP")}, [l("span.title", chrome.i18n.getMessage("SELECTED_TITLE")), l("span.value", e.winners.selected.length)]), l(".stat", {"data-tip": chrome.i18n.getMessage("CHANNEL_TIP")}, [l("span.title", chrome.i18n.getMessage("CHANNEL_TITLE")), l("span.value", e.winners.currentChannel().length)]), l(".stat", {"data-tip": chrome.i18n.getMessage("TOTAL_TIP")}, [l("span.title", chrome.i18n.getMessage("TOTAL_TITLE")), l("span.value", r(e.winners))]), l(".stat", {"data-tip": chrome.i18n.getMessage("USED_MEMORY_TIP")}, [l("span.title", "" + s(chrome.storage.local.QUOTA_BYTES)), l("span.value", s(e.winners.used))]), l(".spacer"), l("button.action", {
            onclick: i,
            "data-tip": chrome.i18n.getMessage("DELETE_SELECTED_TIP")
        }, [c("trash"), chrome.i18n.getMessage("DELETE_SELECTED_TITLE")])])]
    }

    function r(e) {
        return Object.keys(e.channels).reduce(function (t, n) {
            return t += e.channels[n].length
        }, 0)
    }

    function s(e) {
        for (var t = 0; e >= 1e3;) e /= 1024, t++;
        return (e % 1 ? e.toFixed(1) : e) + " " + g[t]
    }

    function o() {
        var e = 1e3, t = 60 * e, n = 60 * t, i = 24 * n, r = 7 * i, s = Date.now(), o = s - t, l = s - n, c = s - i,
            u = s - r, h = (new Date).getFullYear();
        return function (r) {
            if (r > o) return a(m((s - r) / e), chrome.i18n.getMessage("TIME_SECOND"));
            if (r > l) return a(m((s - r) / t), chrome.i18n.getMessage("TIME_MINUTE"));
            if (r > c) return a(m((s - r) / n), chrome.i18n.getMessage("TIME_HOUR"));
            if (r > u) return a(m((s - r) / i), chrome.i18n.getMessage("TIME_DAY"));
            var d = new Date(r);
            return d.getFullYear() === h ? d.toLocaleString(navigator.language, {month: "short"}) + " " + d.toLocaleString(navigator.language, {day: "2-digit"}) : d.toLocaleDateString()
        }
    }

    function a(e, t) {
        return e + " " + t + (1 === e ? "" : chrome.i18n.getMessage("TIME_PLURAL_SUFFIX")) + " " + chrome.i18n.getMessage("TIME_AGO")
    }

    var l = require("lhorie~mithril@v0.1.34"), c = require("tgr/src/js/component/icon.js"),
        u = require("tgr/src/js/lib/withkey.js"), h = require("tgr/src/js/lib/datepicker.js"),
        d = require("tgr/src/js/lib/animate.js"), p = require("component~escape-regexp@1.0.2"),
        f = require("tgr/src/js/component/virtual-list.js");
    t.exports = {name: "winners", controller: n, view: i};
    var g = ["B", "KB", "MB", "GB", "TB"], m = Math.floor
}), require.register("tgr/src/js/vendor/pikaday.js", function (e, t) {
    !function (n, i) {
        var r;
        if ("object" == typeof e) {
            try {
                r = require("moment")
            } catch (e) {
            }
            t.exports = i(r)
        } else "function" == typeof define && define.amd ? define(function (e) {
            try {
                r = e("moment")
            } catch (e) {
            }
            return i(r)
        }) : n.Pikaday = i(n.moment)
    }(this, function (e) {
        var t = "function" == typeof e, n = !!window.addEventListener, i = window.document, r = window.setTimeout,
            s = function (e, t, i, r) {
                n ? e.addEventListener(t, i, !!r) : e.attachEvent("on" + t, i)
            }, o = function (e, t, i, r) {
                n ? e.removeEventListener(t, i, !!r) : e.detachEvent("on" + t, i)
            }, a = function (e, t, n) {
                var r;
                i.createEvent ? (r = i.createEvent("HTMLEvents"), r.initEvent(t, !0, !1), r = f(r, n), e.dispatchEvent(r)) : i.createEventObject && (r = i.createEventObject(), r = f(r, n), e.fireEvent("on" + t, r))
            }, l = function (e, t) {
                return -1 !== (" " + e.className + " ").indexOf(" " + t + " ")
            }, c = function (e) {
                return /Array/.test(Object.prototype.toString.call(e))
            }, u = function (e) {
                return /Date/.test(Object.prototype.toString.call(e)) && !isNaN(e.getTime())
            }, h = function (e, t) {
                return [31, 0 === e % 4 && 0 !== e % 100 || 0 === e % 400 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
            }, d = function (e) {
                u(e) && e.setHours(0, 0, 0, 0)
            }, p = function (e, t) {
                return e.getTime() === t.getTime()
            }, f = function (e, t, n) {
                var i, r;
                for (i in t) (r = void 0 !== e[i]) && "object" == typeof t[i] && null !== t[i] && void 0 === t[i].nodeName ? u(t[i]) ? n && (e[i] = new Date(t[i].getTime())) : c(t[i]) ? n && (e[i] = t[i].slice(0)) : e[i] = f({}, t[i], n) : !n && r || (e[i] = t[i]);
                return e
            }, g = function (e) {
                return 0 > e.month && (e.year -= Math.ceil(Math.abs(e.month) / 12), e.month += 12), 11 < e.month && (e.year += Math.floor(Math.abs(e.month) / 12), e.month -= 12), e
            }, m = {
                field: null,
                bound: void 0,
                position: "bottom left",
                reposition: !0,
                format: "YYYY-MM-DD",
                defaultDate: null,
                setDefaultDate: !1,
                firstDay: 0,
                formatStrict: !1,
                minDate: null,
                maxDate: null,
                yearRange: 10,
                showWeekNumber: !1,
                minYear: 0,
                maxYear: 9999,
                minMonth: void 0,
                maxMonth: void 0,
                startRange: null,
                endRange: null,
                isRTL: !1,
                yearSuffix: "",
                showMonthAfterYear: !1,
                showDaysInNextAndPreviousMonths: !1,
                numberOfMonths: 1,
                mainCalendar: "left",
                container: void 0,
                i18n: {
                    previousMonth: chrome.i18n.getMessage("TIME_PREVIOUS_MONTH"),
                    nextMonth: chrome.i18n.getMessage("TIME_NEXT_MONTH"),
                    months: chrome.i18n.getMessage("TIME_MONTHS").split(" "),
                    weekdays: chrome.i18n.getMessage("TIME_WEEKDAYS").split(" "),
                    weekdaysShort: chrome.i18n.getMessage("TIME_WEEKDAYS_SHORT").split(" ")
                },
                theme: null,
                onSelect: null,
                onOpen: null,
                onClose: null,
                onDraw: null
            }, v = function (e, t, n) {
                for (t += e.firstDay; 7 <= t;) t -= 7;
                return n ? e.i18n.weekdaysShort[t] : e.i18n.weekdays[t]
            }, w = function (e) {
                var t = [], n = "false";
                if (e.isEmpty) {
                    if (!e.showDaysInNextAndPreviousMonths) return '<td class="is-empty"></td>';
                    t.push("is-outside-current-month")
                }
                return e.isDisabled && t.push("is-disabled"), e.isToday && t.push("is-today"), e.isSelected && (t.push("is-selected"), n = "true"), e.isInRange && t.push("is-inrange"), e.isStartRange && t.push("is-startrange"), e.isEndRange && t.push("is-endrange"), '<td data-day="' + e.day + '" class="' + t.join(" ") + '" aria-selected="' + n + '"><button class="pika-button pika-day" type="button" data-pika-year="' + e.year + '" data-pika-month="' + e.month + '" data-pika-day="' + e.day + '">' + e.day + "</button></td>"
            }, b = function (e, t, n) {
                var i = new Date(n, 0, 1);
                return '<td class="pika-week">' + Math.ceil(((new Date(n, t, e) - i) / 864e5 + i.getDay() + 1) / 7) + "</td>"
            }, y = function (e, t) {
                return "<tr>" + (t ? e.reverse() : e).join("") + "</tr>"
            }, k = function (e, t, n, i, r, s) {
                var o, a, l, u = e._o, h = n === u.minYear, d = n === u.maxYear;
                s = '<div id="' + s + '" class="pika-title" role="heading" aria-live="assertive">';
                var p = !0, f = !0;
                for (l = [], o = 0; 12 > o; o++) l.push('<option value="' + (n === r ? o - t : 12 + o - t) + '"' + (o === i ? ' selected="selected"' : "") + (h && o < u.minMonth || d && o > u.maxMonth ? 'disabled="disabled"' : "") + ">" + u.i18n.months[o] + "</option>");
                for (r = '<div class="pika-label">' + u.i18n.months[i] + '<select class="pika-select pika-select-month" tabindex="-1">' + l.join("") + "</select></div>", c(u.yearRange) ? (o = u.yearRange[0], a = u.yearRange[1] + 1) : (o = n - u.yearRange, a = 1 + n + u.yearRange), l = []; o < a && o <= u.maxYear; o++) o >= u.minYear && l.push('<option value="' + o + '"' + (o === n ? ' selected="selected"' : "") + ">" + o + "</option>");
                return n = '<div class="pika-label">' + n + u.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + l.join("") + "</select></div>", s = u.showMonthAfterYear ? s + (n + r) : s + (r + n), h && (0 === i || u.minMonth >= i) && (p = !1), d && (11 === i || u.maxMonth <= i) && (f = !1), 0 === t && (s += '<button class="pika-prev' + (p ? "" : " is-disabled") + '" type="button">' + u.i18n.previousMonth + "</button>"), t === e._o.numberOfMonths - 1 && (s += '<button class="pika-next' + (f ? "" : " is-disabled") + '" type="button">' + u.i18n.nextMonth + "</button>"), s + "</div>"
            }, j = function (o) {
                var a = this, c = a.config(o);
                a._onMouseDown = function (e) {
                    if (a._v) {
                        e = e || window.event;
                        var t = e.target || e.srcElement;
                        if (t) if (l(t, "is-disabled") || (!l(t, "pika-button") || l(t, "is-empty") || l(t.parentNode, "is-disabled") ? l(t, "pika-prev") ? a.prevMonth() : l(t, "pika-next") && a.nextMonth() : (a.setDate(new Date(t.getAttribute("data-pika-year"), t.getAttribute("data-pika-month"), t.getAttribute("data-pika-day"))), c.bound && r(function () {
                                a.hide(), c.field && c.field.blur()
                            }, 100))), l(t, "pika-select")) a._c = !0; else {
                            if (!e.preventDefault) return e.returnValue = !1;
                            e.preventDefault()
                        }
                    }
                }, a._onChange = function (e) {
                    e = e || window.event, (e = e.target || e.srcElement) && (l(e, "pika-select-month") ? a.gotoMonth(e.value) : l(e, "pika-select-year") && a.gotoYear(e.value))
                }, a._onKeyChange = function (e) {
                    if (e = e || window.event, a.isVisible()) switch (e.keyCode) {
                        case 13:
                        case 27:
                            c.field.blur();
                            break;
                        case 37:
                            e.preventDefault(), a.adjustDate("subtract", 1);
                            break;
                        case 38:
                            a.adjustDate("subtract", 7);
                            break;
                        case 39:
                            a.adjustDate("add", 1);
                            break;
                        case 40:
                            a.adjustDate("add", 7)
                    }
                }, a._onInputChange = function (n) {
                    n.firedBy !== a && (n = t ? (n = e(c.field.value, c.format, c.formatStrict)) && n.isValid() ? n.toDate() : null : new Date(Date.parse(c.field.value)), u(n) && a.setDate(n), a._v || a.show())
                }, a._onInputFocus = function () {
                    a.show()
                }, a._onInputClick = function () {
                    a.show()
                }, a._onInputBlur = function () {
                    var e = i.activeElement;
                    do if (l(e, "pika-single")) return; while (e = e.parentNode);
                    a._c || (a._b = r(function () {
                        a.hide()
                    }, 50)), a._c = !1
                }, a._onClick = function (e) {
                    e = e || window.event;
                    var t = e = e.target || e.srcElement;
                    if (e) {
                        n || !l(e, "pika-select") || e.onchange || (e.setAttribute("onchange", "return;"), s(e, "change", a._onChange));
                        do if (l(t, "pika-single") || t === c.trigger) return; while (t = t.parentNode);
                        a._v && e !== c.trigger && t !== c.trigger && a.hide()
                    }
                }, a.el = i.createElement("div"), a.el.className = "pika-single" + (c.isRTL ? " is-rtl" : "") + (c.theme ? " " + c.theme : ""), s(a.el, "mousedown", a._onMouseDown, !0), s(a.el, "touchend", a._onMouseDown, !0), s(a.el, "change", a._onChange), s(i, "keydown", a._onKeyChange), c.field && (c.container ? c.container.appendChild(a.el) : c.bound ? i.body.appendChild(a.el) : c.field.parentNode.insertBefore(a.el, c.field.nextSibling), s(c.field, "change", a._onInputChange), c.defaultDate || (c.defaultDate = t && c.field.value ? e(c.field.value, c.format).toDate() : new Date(Date.parse(c.field.value)), c.setDefaultDate = !0)), o = c.defaultDate, u(o) ? c.setDefaultDate ? a.setDate(o, !0) : a.gotoDate(o) : a.gotoDate(new Date), c.bound ? (this.hide(), a.el.className += " is-bound", s(c.trigger, "click", a._onInputClick), s(c.trigger, "focus", a._onInputFocus), s(c.trigger, "blur", a._onInputBlur)) : this.show()
            };
        return j.prototype = {
            config: function (e) {
                this._o || (this._o = f({}, m, !0)), e = f(this._o, e, !0), e.isRTL = !!e.isRTL, e.field = e.field && e.field.nodeName ? e.field : null, e.theme = "string" == typeof e.theme && e.theme ? e.theme : null, e.bound = !!(void 0 !== e.bound ? e.field && e.bound : e.field), e.trigger = e.trigger && e.trigger.nodeName ? e.trigger : e.field, e.disableWeekends = !!e.disableWeekends, e.disableDayFn = "function" == typeof e.disableDayFn ? e.disableDayFn : null;
                var t = parseInt(e.numberOfMonths, 10) || 1;
                return e.numberOfMonths = 4 < t ? 4 : t, u(e.minDate) || (e.minDate = !1), u(e.maxDate) || (e.maxDate = !1), e.minDate && e.maxDate && e.maxDate < e.minDate && (e.maxDate = e.minDate = !1), e.minDate && this.setMinDate(e.minDate), e.maxDate && this.setMaxDate(e.maxDate), c(e.yearRange) ? (t = (new Date).getFullYear() - 10, e.yearRange[0] = parseInt(e.yearRange[0], 10) || t, e.yearRange[1] = parseInt(e.yearRange[1], 10) || t) : (e.yearRange = Math.abs(parseInt(e.yearRange, 10)) || m.yearRange, 100 < e.yearRange && (e.yearRange = 100)), e
            }, toString: function (n) {
                return u(this._d) ? t ? e(this._d).format(n || this._o.format) : this._d.toDateString() : ""
            }, getMoment: function () {
                return t ? e(this._d) : null
            }, setMoment: function (n, i) {
                t && e.isMoment(n) && this.setDate(n.toDate(), i)
            }, getDate: function () {
                return u(this._d) ? new Date(this._d.getTime()) : new Date
            }, setDate: function (e, t) {
                if (!e) return this._d = null, this._o.field && (this._o.field.value = "", a(this._o.field, "change", {firedBy: this})), this.draw();
                if ("string" == typeof e && (e = new Date(Date.parse(e))), u(e)) {
                    var n = this._o.minDate, i = this._o.maxDate;
                    u(n) && e < n ? e = n : u(i) && e > i && (e = i), this._d = new Date(e.getTime()), d(this._d), this.gotoDate(this._d), this._o.field && (this._o.field.value = this.toString(), a(this._o.field, "change", {firedBy: this})), t || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate())
                }
            }, gotoDate: function (e) {
                var t = !0;
                if (u(e)) {
                    if (this.calendars) {
                        var t = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                            n = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                            i = e.getTime();
                        n.setMonth(n.getMonth() + 1), n.setDate(n.getDate() - 1), t = i < t.getTime() || n.getTime() < i
                    }
                    t && (this.calendars = [{
                        month: e.getMonth(),
                        year: e.getFullYear()
                    }], "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)), this.adjustCalendars()
                }
            }, adjustDate: function (n, i) {
                var r, s = this.getDate(), o = 864e5 * parseInt(i);
                "add" === n ? r = new Date(s.valueOf() + o) : "subtract" === n && (r = new Date(s.valueOf() - o)), t && ("add" === n ? r = e(s).add(i, "days").toDate() : "subtract" === n && (r = e(s).subtract(i, "days").toDate())), this.setDate(r)
            }, adjustCalendars: function () {
                this.calendars[0] = g(this.calendars[0]);
                for (var e = 1; e < this._o.numberOfMonths; e++) this.calendars[e] = g({
                    month: this.calendars[0].month + e,
                    year: this.calendars[0].year
                });
                this.draw()
            }, gotoToday: function () {
                this.gotoDate(new Date)
            }, gotoMonth: function (e) {
                isNaN(e) || (this.calendars[0].month = parseInt(e, 10), this.adjustCalendars())
            }, nextMonth: function () {
                this.calendars[0].month++, this.adjustCalendars()
            }, prevMonth: function () {
                this.calendars[0].month--, this.adjustCalendars()
            }, gotoYear: function (e) {
                isNaN(e) || (this.calendars[0].year = parseInt(e, 10), this.adjustCalendars())
            }, setMinDate: function (e) {
                e instanceof Date ? (d(e), this._o.minDate = e, this._o.minYear = e.getFullYear(), this._o.minMonth = e.getMonth()) : (this._o.minDate = m.minDate, this._o.minYear = m.minYear, this._o.minMonth = m.minMonth, this._o.startRange = m.startRange), this.draw()
            }, setMaxDate: function (e) {
                e instanceof Date ? (d(e), this._o.maxDate = e, this._o.maxYear = e.getFullYear(), this._o.maxMonth = e.getMonth()) : (this._o.maxDate = m.maxDate, this._o.maxYear = m.maxYear, this._o.maxMonth = m.maxMonth, this._o.endRange = m.endRange), this.draw()
            }, setStartRange: function (e) {
                this._o.startRange = e
            }, setEndRange: function (e) {
                this._o.endRange = e
            }, draw: function (e) {
                if (this._v || e) {
                    var t = this._o, n = t.minYear, i = t.maxYear, s = t.minMonth, o = t.maxMonth;
                    for (e = "", this._y <= n && (this._y = n, !isNaN(s) && this._m < s && (this._m = s)), this._y >= i && (this._y = i, !isNaN(o) && this._m > o && (this._m = o)), n = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2), i = 0; i < t.numberOfMonths; i++) e += '<div class="pika-lendar">' + k(this, i, this.calendars[i].year, this.calendars[i].month, this.calendars[0].year, n) + this.render(this.calendars[i].year, this.calendars[i].month, n) + "</div>";
                    this.el.innerHTML = e, t.bound && "hidden" !== t.field.type && r(function () {
                        t.trigger.focus()
                    }, 1), "function" == typeof this._o.onDraw && this._o.onDraw(this), t.bound && t.field.setAttribute("aria-label", "Use the arrow keys to pick a date")
                }
            }, adjustPosition: function () {
                var e, t, n, r, s, o, a, l, c;
                if (!this._o.container) {
                    if (this.el.style.position = "absolute", t = e = this._o.trigger, n = this.el.offsetWidth, r = this.el.offsetHeight, s = window.innerWidth || i.documentElement.clientWidth, o = window.innerHeight || i.documentElement.clientHeight, a = window.pageYOffset || i.body.scrollTop || i.documentElement.scrollTop, "function" == typeof e.getBoundingClientRect) t = e.getBoundingClientRect(), l = t.left + window.pageXOffset, c = t.bottom + window.pageYOffset; else for (l = t.offsetLeft, c = t.offsetTop + t.offsetHeight; t = t.offsetParent;) l += t.offsetLeft, c += t.offsetTop;
                    (this._o.reposition && l + n > s || -1 < this._o.position.indexOf("right") && 0 < l - n + e.offsetWidth) && (l = l - n + e.offsetWidth), (this._o.reposition && c + r > o + a || -1 < this._o.position.indexOf("top") && 0 < c - r - e.offsetHeight) && (c = c - r - e.offsetHeight), this.el.style.left = l + "px", this.el.style.top = c + "px"
                }
            }, render: function (e, t, n) {
                var i = this._o, r = new Date, s = h(e, t), o = new Date(e, t, 1).getDay(), a = [], l = [];
                d(r), 0 < i.firstDay && (o -= i.firstDay, 0 > o && (o += 7));
                for (var c = 0 === t ? 11 : t - 1, f = 11 === t ? 0 : t + 1, g = 0 === t ? e - 1 : e, m = 11 === t ? e + 1 : e, k = h(g, c), j = s + o, x = j; 7 < x;) x -= 7;
                for (var j = j + (7 - x), q = x = 0; x < j; x++) {
                    var T, S = new Date(e, t, 1 + (x - o)), C = !!u(this._d) && p(S, this._d), A = p(S, r),
                        D = x < o || x >= s + o, _ = 1 + (x - o), E = t, M = e, N = i.startRange && p(i.startRange, S),
                        L = i.endRange && p(i.endRange, S),
                        O = i.startRange && i.endRange && i.startRange < S && S < i.endRange;
                    !(T = i.minDate && S < i.minDate || i.maxDate && S > i.maxDate) && (T = i.disableWeekends) && (T = S.getDay(), T = 0 === T || 6 === T), S = T || i.disableDayFn && i.disableDayFn(S), D && (x < o ? (_ = k + _, E = c, M = g) : (_ -= s, E = f, M = m)), l.push(w({
                        day: _,
                        month: E,
                        year: M,
                        isSelected: C,
                        isToday: A,
                        isDisabled: S,
                        isEmpty: D,
                        isStartRange: N,
                        isEndRange: L,
                        isInRange: O,
                        showDaysInNextAndPreviousMonths: i.showDaysInNextAndPreviousMonths
                    })), 7 === ++q && (i.showWeekNumber && l.unshift(b(x - o, t, e)), a.push(y(l, i.isRTL)), l = [], q = 0)
                }
                for (t = [], i.showWeekNumber && t.push("<th></th>"), e = 0; 7 > e; e++) t.push('<th scope="col"><abbr title="' + v(i, e) + '">' + v(i, e, !0) + "</abbr></th>");
                return i = "<thead><tr>" + (i.isRTL ? t.reverse() : t).join("") + "</tr></thead>", '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + n + '">' + i + ("<tbody>" + a.join("") + "</tbody>") + "</table>"
            }, isVisible: function () {
                return this._v
            }, show: function () {
                if (!this.isVisible()) {
                    var e, t = this.el;
                    e = (" " + t.className + " ").replace(" is-hidden ", " "), e = e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, ""), t.className = e, this._v = !0, this.draw(), this._o.bound && (s(i, "click", this._onClick), this.adjustPosition()), "function" == typeof this._o.onOpen && this._o.onOpen.call(this)
                }
            }, hide: function () {
                var e = this._v;
                if (!1 !== e) {
                    this._o.bound && o(i, "click", this._onClick), this.el.style.position = "static", this.el.style.left = "auto", this.el.style.top = "auto";
                    var t = this.el;
                    l(t, "is-hidden") || (t.className = "" === t.className ? "is-hidden" : t.className + " is-hidden"), this._v = !1, void 0 !== e && "function" == typeof this._o.onClose && this._o.onClose.call(this)
                }
            }, destroy: function () {
                this.hide(), o(this.el, "mousedown", this._onMouseDown, !0), o(this.el, "touchend", this._onMouseDown, !0), o(this.el, "change", this._onChange), this._o.field && (o(this._o.field, "change", this._onInputChange), this._o.bound && (o(this._o.trigger, "click", this._onInputClick), o(this._o.trigger, "focus", this._onInputFocus), o(this._o.trigger, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el)
            }
        }, j
    })
}), require.define("tgr/data/changelog.json", [{
        version: "1.7",
        date: "14 Temmuz 2020",
        changed: ["Twitch API v5'e güncellendi."]
    }
    ]), require.define("tgr/data/config.json", {
    storageName: "twitchCekilisleri",
    sponsorshipEmail: "twitchkutusucontact@gmail.com",
    sponsorsRotationTime: 7e3,
    minWindowWidth: 800,
    maxSubscriberLuck: 10,
    maxActiveTimeout: 144e5,
    subscribedTimeSteps: [0, 2, 3, 6, 9, 12, 18, 24, 30, 36, 42, 48, 54, 60],
    cheerSteps: [0, 1, 100, 1e3, 5e3, 1e4, 1e5],
    tooltips: {tooltip: {baseClass: "tgrtip", auto: 1, effectClass: "slide"}, key: "tip", observe: !0},
    searchFilters: {
        "!": {prop: "eligible", value: !1},
        "*": {prop: "subscriber", value: !0},
        "^": {prop: "bits", value: "truthy"},
        "-": {prop: "mod", value: "truthy"}
    }
}), require.define("tgr/data/faq.json", [
//     {
//     question: "Where to report issues?",
//     answer: ['<ol><li><a href="#" target="_blank"><svg class="Icon"><use xlink:href="#icon-chrome"/></svg> Chrome Webstore issues tracker</a></li></ol>']
// },
    {
    question: "Who exactly am I rolling from?",
    answer: ["You are always rolling from the list of people on the left, with the exception of those that are unchecked (i.e. ineligible to win).", "If you have a search active, you are rolling only from the search results.", "<em>Search is always real time and doesn't need to be updated by re-searching.</em>"]
}, {
    question: "Subscribed time",
    answer: ["Rolling filter to select only people that have been subscribed for more than 1, 3, 6, 12, or 24 months.", "This filter depends on <strong>Subscriber loyality badges</strong>, so don't forget to set them up!", "Without loyality badges, you can select <code>1 month</code> as a subscribers only filter."]
}, {
    question: "Subscriber luck",
    answer: ["Subscriber luck specifies how many times are subscribers likely to win as opposed to regular users.", "For example, Subscriber luck 3 is the same as if every subscriber was in the list 3 times."]
}, {
    question: "Forbidden words",
    answer: ["A comma separated list of forbidden words. Any user that writes any of the specified words in chat will be unchecked - made not eligible to win.", "You can see who has been unchecked by searching for <strong><code>!</code></strong> (see <em>Search filters</em> below).", 'You can reset all unchecked people by clicking the blue circle "Reset eligible status" button next to the big green "Roll" button.']
}, {
    question: "Search filters",
    answer: ["Special characters that, when entered as a first letter of a search query, apply a special filter to results.", "Available search filters are:", "<strong><code>!</code></strong> - Only ineligible users.", "<strong><code>*</code></strong> - Only subscribers.", "<strong><code>^</code></strong> - Only people who cheered.", "For example, searching for <code><strong>*</strong></code> will find all subscribers, and searching for <code><strong>*</strong>foo</code> will find subscribers with name containing <em>foo<em>.", "<em>Search is always real time and doesn't need to be updated by re-searching.</em>"]
}, {
    question: "When are people unchecked?",
    answer: ["People are unchecked (made not eligible to win) when:", "<ul><li>You manually click on them in the list.</li><li>They spam keyword and <strong>Keyword antispam</strong> is enabled.</li><li>They write one of the <strong>Forbidden words</strong>.</li><li>They've already won once and <strong>Uncheck winners</strong> is enabled.</li></ul>"]
}, {
    question: "Past winners",
    answer: ["List of all the people you've rolled in the past. The list is persistent (stays between page reloads), but attached to the current browser, so it won't migrate to other machines.", "You have 5 MB of storage available, so be sure to keep an eye on the used data statistic (bottom of the list), and clear the oldest records when it start approaching the limit.", "5 MB gives you space for 20.000+ records.", 'You can clear the oldest records by selecting the date cutoff as a "To" time filter, and clicking on the "Clear selected" button at the bottom.']
}, {
    question: "Followers only filter?",
    answer: ["Unfortunately, there is no way how to get the following status of each user without getting you banned from api.twitch.tv for making too many requests :(", "If there was, it would already be in. Until that changes somehow (unlikely) you have to roll someone to see whether they are following you."]
}, {
    question: "Why won't you load all people in chat without them having to talk?",
    answer: ["Since the last chat update, there is no reasonable way how to retrieve the list of people in chat along with their group and subscriber status.", "Besides, not many people were using this anyway, as rolling AFK lurkers is not fun :)"]
}, {
    question: 'Who is "jtv" and why is he in the Ignore list?',
    answer: ['Jtv is a username of a Twitch bot that says "<em>Welcome to the chat room!</em>" among other things.']
}, {
    question: "Why won't I appear in the list when I write something?",
    answer: ["Everyone with broadcaster badge (owner of the current channel) is ignored by default."]
}, {
    question: "It isn't random! Always rolls the same people!",
    answer: ["No, the rolling <strong>is</strong> random. The only time rolling prefers some people more than others is when you increase Subscriber luck, which is explained above.", 'If you <em>"feel"</em> that it isn\'t random, I urge you to test it! Get 10 people in the list, and roll a couple hundred times while writing down the win distribution.']
}]), require.define("tgr/data/options.json", {
    lastReadChangelog: "0.0.0",
    uncheckWinners: !0,
    announceWinner: !0,
    announceTemplate: chrome.i18n.getMessage("ANNOUNCE_TEMPLATE"),
    keywordAntispam: !1,
    keywordAntispamLimit: 1,
    displayTooltips: !0,
    forbiddenWords: "",
    ignoreList: ["jtv", "nightbot", "moobot", "vivbot", "wizebot", "coebot", "mikuia", "rifflebot", "revlobot", "streamelements"]
}), require("tgr");