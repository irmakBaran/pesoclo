__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: () => /* binding */ LyHelper,
  /* harmony export */
});
var langify = langify || {};

/**
 *
 *
 * @class LyHelper
 */
class LyHelper {
  constructor() {
    return {
      ajax: function (params) {
        return LyHelper.ajax(params);
      },
      isIE: function () {
        return LyHelper.isIE();
      },
      extractImageObject: function (val) {
        return LyHelper.extractImageObject(val);
      },
      getCurrentLanguage: function () {
        return LyHelper.getCurrentLanguage();
      },
      getCookie: function (name) {
        return LyHelper.getCookie(name);
      },
      setCookie: function (name, value, days) {
        return LyHelper.setCookie(name, value, days);
      },
      deleteCookie: function (name) {
        return LyHelper.deleteCookie(name);
      },
      getVersion: function () {
        return LyHelper.getVersion();
      },
      isOutOfViewport: function (elem) {
        return LyHelper.isOutOfViewport(elem);
      },
      isDomainFeatureEnabled: function () {
        return LyHelper.isDomainFeatureEnabled();
      },
      getVal: function (str) {
        return LyHelper.getVal(str);
      },
      inIframe: function () {
        return LyHelper.inIframe();
      },
      shopifyAPI: function () {
        return LyHelper.shopifyAPI();
      },
      loadScript: function (url, callback) {
        return LyHelper.loadScript(url, callback);
      },
      localizationRedirect: function (
        type,
        code,
        additionalFields,
        additionalParams,
        domain
      ) {
        return LyHelper.localizationRedirect(
          type,
          code,
          additionalFields,
          additionalParams,
          domain
        );
      },
      changeCurrency: function (code) {
        return LyHelper.changeCurrency(code);
      },
      log: function (title, data, type) {
        return LyHelper.log(title, data, type);
      },
    };
  }
  static ajax(params) {
    var data = params.data;
    fetch(params.url, {
      method: params.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data && params.method === "POST" ? JSON.stringify(data) : null,
    })
      .then((response) => response.json())
      .then((data) => {
        params.success(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  static isIE() {
    var ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
  }
  static extractImageObject(val) {
    if (!val || val == "") return false;
    var val = val;

    // Handle src-sets
    if (val.search(/([0-9]+w?h?x?,)/gi) > -1) {
      val = val.split(/([0-9]+w?h?x?,)/gi)[0];
    }
    var hostBegin = val.indexOf("//") ? val.indexOf("//") : 0;
    var hostEnd = val.lastIndexOf("/") + 1;
    var host = val.substring(hostBegin, hostEnd);
    var afterHost = val.substring(hostEnd, val.length);
    var url = val;
    var file = "";
    var name = "";
    var type = "";
    afterHost = afterHost.substring(
      0,
      afterHost.indexOf("#") == -1 ? afterHost.length : afterHost.indexOf("#")
    );
    afterHost = afterHost.substring(
      0,
      afterHost.indexOf("?") == -1 ? afterHost.length : afterHost.indexOf("?")
    );
    name = afterHost.replace(
      /(_[0-9]+x[0-9]*|_{width}x|_{size})?(_crop_(top|center|bottom|left|right))?(@[0-9]*x)?(\.progressive)?\.(png\.jpg|jpe?g|png|gif|webp)/gi,
      ""
    );
    if (afterHost.search(/(\.png\.jpg|\.jpg\.jpg)/gi) > -1) {
      type = afterHost.substring(
        afterHost.search(/(\.png\.jpg|\.jpg\.jpg)/gi) + 1,
        afterHost.length
      );
    } else {
      type = afterHost.substring(
        afterHost.lastIndexOf(".") + 1,
        afterHost.length
      );
    }
    file = afterHost.replace(
      /(_[0-9]+x[0-9]*|_{width}x|_{size})?(_crop_(top|center|bottom|left|right))?(@[0-9]*x)?(\.progressive)?\.(png\.jpg|jpe?g|png|gif|webp)/gi,
      "." + type
    );
    return {
      host: host,
      name: name,
      type: type,
      file: file,
    };
  }
  static getCurrentLanguage() {
    return window.langify.locale.iso_code;
  }
  static setLanguage(code) {}
  static getCookie(name) {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    if (v) return v[2];
    else return null;
  }
  static setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }
  static deleteCookie(name) {
    // Setzt das Ablaufdatum auf einen Zeitpunkt in der Vergangenheit
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
  static deleteCookies() {
    // Dynamischen Pfad abrufen
    const currentPath = window.location.pathname.split("/")[1];

    // Cookie auf dem Root-Pfad löschen
    document.cookie =
      "localization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Cookie auf dem dynamischen Pfad löschen
    document.cookie = `localization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${currentPath}`;
  }
  static getVersion() {
    return 2;
  }
  static isOutOfViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    var out = {};
    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom =
      Math.ceil(bounding.bottom) >=
      (window.innerHeight || document.documentElement.clientHeight);
    out.right =
      bounding.right >
      (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.inViewport = bounding.x > 0 && bounding.y > 0;
    return out;
  }
  static isDomainFeatureEnabled() {
    return window.langify.locale.domain_feature_enabled;
  }
  static getVal(str) {
    var v = window.location.search.match(
      new RegExp("(?:[?&]" + str + "=)([^&]+)")
    );
    return v ? v[1] : null;
  }
  static inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  static shopifyAPI() {
    var root_url =
      window.langify.locale.root_url != "/"
        ? window.langify.locale.root_url
        : "";
    return {
      attributeToString: function (attribute) {
        if (typeof attribute !== "string") {
          attribute += "";
          if (attribute === "undefined") {
            attribute = "";
          }
        }
        return attribute.trim();
      },
      getCart: function (callback) {
        LyHelper.ajax({
          method: "GET",
          url: root_url + "/cart.js",
          success: function (cart, textStatus) {
            if (typeof callback === "function") {
              callback(cart);
            }
          },
        });
      },
      updateCartNote: function (note, callback) {
        var params = {
          method: "POST",
          url: root_url + "/cart/update.js",
          data: "note=" + this.attributeToString(note),
          dataType: "json",
          success: function (cart) {
            if (typeof callback === "function") {
              callback(cart);
            }
          },
          error: this.onError,
        };
        LyHelper.ajax(params);
      },
      updateCartAttributes: function (attributes, callback) {
        var params = {
          method: "POST",
          url: root_url + "/cart/update.js",
          data: {
            attributes: attributes,
          },
          dataType: "json",
          success: function (cart) {
            if (typeof callback === "function") {
              callback(cart);
            }
          },
          error: this.onError,
        };
        LyHelper.ajax(params);
      },
      onError: function (XMLHttpRequest, textStatus) {},
    };
  }
  static loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  static localizationRedirect(
    type,
    code,
    additionalFields,
    additionalParams,
    domain
  ) {
    this.deleteCookies();
    if (domain) {
      var newDomain = domain;
      if (
        domain.indexOf("redirected=true") === -1 &&
        type === "language_code"
      ) {
        if (domain.indexOf("?") >= 0) {
          newDomain += "&redirected=true";
        } else {
          newDomain += "?redirected=true";
        }
      }
      window.location.href = newDomain;
      return true;
    }
    if (type !== "country_code" && type !== "language_code") {
      return false;
    }
    if (!additionalParams) {
      var additionalParams = "";
    }
    var params = [
      {
        name: type,
        value: code,
      },
      {
        name: "return_to",
        value:
          window.location.pathname +
          window.location.search +
          additionalParams +
          window.location.hash,
      },
      {
        name: "form_type",
        value: "localization",
      },
      {
        name: "_method",
        value: "put",
      },
    ];
    if (additionalFields) {
      for (var i = 0; i < additionalFields.length; i++) {
        params.push(additionalFields[i]);
      }
    }
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/localization";
    params.forEach(function (param) {
      const field = document.createElement("input");
      field.type = "hidden";
      field.name = param["name"];
      field.value = param["value"];
      form.appendChild(field);
    });
    document.body.appendChild(form);
    form.submit();
  }
  static changeCurrency(code) {
    this.deleteCookies();
    let returnToUrl = window.location.pathname + window.location.search;
    if (window.location.search.indexOf("?") >= 0) {
      returnToUrl += "&currency_code=";
    } else {
      returnToUrl += "?currency_code=";
    }
    returnToUrl += code;
    returnToUrl += window.location.hash;
    const params = [
      {
        name: "currency_code",
        value: code,
      },
      {
        name: "return_to",
        value: returnToUrl,
      },
      {
        name: "form_type",
        value: "localization",
      },
      {
        name: "_method",
        value: "put",
      },
    ];
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/localization";
    params.forEach(function (param) {
      const field = document.createElement("input");
      field.type = "hidden";
      field.name = param["name"];
      field.value = param["value"];
      form.appendChild(field);
    });
    document.body.appendChild(form);
    form.submit();
  }
  static log(title, data, type) {
    if (langify.settings && langify.settings.debug) {
      if (!data) {
        var data = "";
      }
      var css = "color: green; font-weight: bold;";
      if (type === "error") {
        css = "color: red; font-weight: bold;";
      }
      console.log(`%c ${title}: \n`, css, data);
    }
  }
}

//# sourceURL=webpack://api.langify/./src/langify/system/helper.js?
