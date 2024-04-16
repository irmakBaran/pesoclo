__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: () => /* binding */ LanguageDetection,
  /* harmony export */
});
/* harmony import */ var _system_helper_js__WEBPACK_IMPORTED_MODULE_0__ =
  __webpack_require__(
    /*! ../system/helper.js */ "./src/langify/system/helper.js"
  );

/**
 *
 *
 * @class LanguageDetection
 */
class LanguageDetection {
  constructor() {
    this.hreflangList = null;
    _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
      "LanguageDetection instantiation"
    );
  }
  init() {
    if (
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].inIframe() ||
      window.location.pathname.indexOf("preview_key=") > 0
    ) {
      return null;
    }
    var currentLang = langify.locale.iso_code.toLowerCase();
    //var localizationData = this.getLocalizationData();
    this.hreflangList = this.getHreflangList();
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.toLowerCase();
    var bot =
      /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|Chrome-Lighthouse/i.test(
        navigator.userAgent
      );
    var blockedRoutes = window.lyBlockedRoutesList || [];
    var blockedRoute = blockedRoutes.find(
      (x) => window.location.pathname.indexOf(x) === 0
    );
    var is404 = document.getElementsByClassName("template-404").length;
    if (
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getVal(
        "redirected"
      ) === "true"
    ) {
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].setCookie(
        "ly-lang-selected",
        currentLang,
        365
      );
      var _href = window.location.href;
      history.replaceState(
        null,
        "",
        _href.replace(/(\?|&)(redirected=true)/i, "")
      );
      return null;
    }
    if (
      !is404 &&
      !bot &&
      !blockedRoute &&
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getVal(
        "ly-lang-detect"
      ) !== "off"
    ) {
      if (
        userLang &&
        !_system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCookie(
          "ly-lang-selected"
        )
      ) {
        var hasMatch = this.matchHreflangList(userLang);
        if (currentLang !== this._hreflangToLanguageCode(hasMatch)) {
          if (hasMatch) {
            this.redirectMatched(userLang);
          } else if (
            !hasMatch &&
            langify.settings.switcher.languageDetectionDefault
          ) {
            // Redirect to default language
            this.redirectMatched(
              langify.settings.switcher.languageDetectionDefault
            );
          }
        }
      } else {
        if (
          _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCookie(
            "ly-lang-selected"
          ) &&
          _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCookie(
            "ly-lang-selected"
          ) !== currentLang
        ) {
          // Only save cookie when the domain feature is active
          if (
            _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
              "default"
            ].isDomainFeatureEnabled()
          ) {
            _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].setCookie(
              "ly-lang-selected",
              currentLang,
              365
            );
          }
          this.redirectMatched(
            _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCookie(
              "ly-lang-selected"
            )
          );
        }
      }
    }
    this._geolocationAppSupport();
  }
  redirectMatched(userLang) {
    var match = this.matchHreflangList(userLang);
    if (match) {
      this.redirectHref(match.href, match.lang);
    }
    return match;
  }
  matchHreflangList(userLang) {
    var matchedHreflang = false;
    var browserLang = userLang;

    // Find candidates
    var candidates = this.hreflangList.filter(
      (item) => item.lang === browserLang
    );
    if (candidates.length === 0) {
      browserLang = userLang.toLowerCase();
      candidates = this.hreflangList.filter(
        (item) => item.lang.toLowerCase().indexOf(browserLang) === 0
      );
    }
    if (candidates.length === 0) {
      browserLang = userLang.toLowerCase().substring(0, 2);
      candidates = this.hreflangList.filter(
        (item) => item.lang.toLowerCase().indexOf(browserLang) === 0
      );
    }

    // Handle candidates
    if (candidates.length === 1) {
      return {
        href: candidates[0].href,
        lang: browserLang,
      };
    } else if (candidates.length > 1) {
      var preferedCandidate = candidates.find(
        (item) => item.href.indexOf(window.location.host) >= 0
      );
      if (preferedCandidate) {
        return {
          href: preferedCandidate.href,
          lang: browserLang,
        };
      } else {
        return {
          href: candidates[0].href,
          lang: browserLang,
        };
      }
    }
    return false;
  }
  redirectHref(href, userLang) {
    var queryString = window.location.search;
    var url = href.split("?")[0];
    if (queryString === "") {
      queryString = "?redirected=true";
    } else {
      queryString += "&redirected=true";
    }
    window.location.replace(url + queryString);
  }
  getHreflangList() {
    var hreflangTags = document.querySelectorAll("link[hreflang]");
    var hreflangList = [];
    var countryCode = false;
    // Cross Domain Links option
    if (
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
        "default"
      ].isDomainFeatureEnabled()
    ) {
      for (var i = 0; i < langify.locale.languages.length; i++) {
        let newHref =
          "https://" +
          langify.locale.languages[i].domain +
          window.location.pathname +
          window.location.search +
          window.location.hash;
        // When cross-domain link is pointing to the same domain with subfolders, window.location.pathname would have to be unlocalized before it can be merged into the url
        if (
          new String(langify.locale.languages[i].domain).indexOf(
            window.location.hostname
          ) === 0
        ) {
          let unlocalizedPathname =
            langify.locale.root_url !== "/"
              ? window.location.pathname.replace(langify.locale.root_url, "")
              : window.location.pathname;
          newHref =
            "https://" +
            langify.locale.languages[i].domain +
            unlocalizedPathname +
            window.location.search +
            window.location.hash;
        }
        hreflangList.push({
          href: newHref,
          lang: langify.locale.languages[i].iso_code,
        });
      }
    }
    for (var i = 0; i < hreflangTags.length; i++) {
      var hreflang = hreflangTags[i].getAttribute("hreflang").toLowerCase();
      hreflang = hreflang
        .replace("zh-hans", "zh-cn")
        .replace("zh-hant", "zh-tw"); // Chinese special cases
      hreflangList.push({
        href: hreflangTags[i].getAttribute("href"),
        lang: hreflang,
      });
    }
    return hreflangList;
  }
  _langToHreflang(userLang) {
    var hreflang = "";
    this.hreflangList.map(function (item) {
      if (item.lang === userLang) {
        hreflang = userLang;
      }
    });
    if (hreflang === "") {
      this.hreflangList.map(function (item) {
        var browserLang = userLang.toLowerCase();
        if (item.lang.toLowerCase().indexOf(browserLang) === 0) {
          hreflang = browserLang;
        } else if (
          item.lang.toLowerCase().indexOf(browserLang.substring(0, 2)) === 0
        ) {
          hreflang = browserLang.substring(0, 2);
        }
      });
    }
    return hreflang || userLang;
  }
  _hreflangToLanguageCode(hreflangTag) {
    if (!hreflangTag || !hreflangTag.lang) return false;
    var languageCode = false;
    langify.locale.languages.forEach(function (item) {
      if (item.iso_code.toLowerCase() === hreflangTag.lang.toLowerCase()) {
        languageCode = item.iso_code;
      }
    });
    if (!languageCode) {
      langify.locale.languages.forEach(function (item) {
        if (
          item.iso_code.toLowerCase() ===
          hreflangTag.lang.substring(0, 2).toLowerCase()
        ) {
          languageCode = item.iso_code;
        }
      });
    }
    return languageCode;
  }
  _geolocationAppSupport() {
    var target = document.querySelector("body");
    var config = {
      childList: true,
      subtree: true,
    };
    var geolocationObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          var target =
            mutation.target.getElementsByClassName("locale-bar__form");
          if (target[0]) {
            target[0].onsubmit = function () {
              var locale_code = target[0].elements["locale_code"].value;
              var selector = target[0].getElementsByClassName(
                "locale-bar__selector"
              );
              if (selector.length >= 1) {
                locale_code =
                  selector[0].options[selector[0].selectedIndex].value;
              }
              _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
                "default"
              ].setCookie("ly-lang-selected", locale_code, 365);
            };
          }
          var selectors = mutation.target.getElementsByClassName(
            "locale-selectors__selector"
          );
          if (selectors.length > 0) {
            for (var selector of selectors) {
              if (selector.getAttribute("name") === "locale_code") {
                selector.onchange = function () {
                  var locale_code =
                    selector.options[selector.selectedIndex].value;
                  _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
                    "default"
                  ].setCookie("ly-lang-selected", locale_code, 365);
                };
              }
            }
          }
        }
      });
    });
    geolocationObserver.observe(target, config);
    setTimeout(function () {
      geolocationObserver.disconnect();
    }, 10000);
  }
}

//# sourceURL=webpack://api.langify/./src/langify/modules/language-detection.js?
