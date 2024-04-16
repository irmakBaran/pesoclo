__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: () => /* binding */ Switcher,
  /* harmony export */
});
/* harmony import */ var _system_helper_js__WEBPACK_IMPORTED_MODULE_0__ =
  __webpack_require__(
    /*! ../system/helper.js */ "./src/langify/system/helper.js"
  );

/*
 *
 * @class Switcher
 */
class Switcher {
  constructor(switcherSettings) {
    _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
      "Switcher instantiation"
    );
    this.lyForceOff = location.search.split("ly-force-off=")[1];
    this.switcherElements = Array.prototype.slice.call(
      document.getElementsByClassName("ly-switcher-wrapper")
    );
  }
  init() {
    // Initial cart.attributes update
    const isInThemeEditor = window.Shopify && window.Shopify.designMode;
    if (!isInThemeEditor && langify.settings.languageInCartAttribute == true) {
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"]
        .shopifyAPI()
        .getCart(function (cart) {
          var currentLanguage = langify.locale.iso_code;
          if (
            !cart.attributes.language ||
            cart.attributes.language != currentLanguage
          ) {
            _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"]
              .shopifyAPI()
              .updateCartAttributes(
                {
                  language: currentLanguage,
                },
                function (data) {}
              );
          }
        });
    }
    if (langify.locale.languages.length === 1) {
      console.info(
        `%c LANGIFY INFO:\n`,
        "font-weight: bold;",
        'The language switcher is hidden! This can have one of the following reasons: \n * All additional languages are disabled in the "Langify -> Dashboard -> Languages" section. \n * If you are using different domains for your additional languages, ensure that "Cross Domain Links" are enabled inside the "Langify -> Dashboard -> Switcher Configurator -> Domains" section.'
      );
      return false;
    }
    this.setCustomIcons();
    this.setCustomPosition();
    this.initCustomDropdown();
    this.bindCountrySwitchers();
    this.bindCurrencySwitchers();
    this.bindLanguageSwitchers();
    var event = new CustomEvent("langify.switcher.initialized", {
      bubbles: true,
      detail: {},
    });
  }
  setCustomIcons() {
    var root = this;
    var icons = document.querySelectorAll(".ly-languages-switcher i");
    for (var a = 0; a < icons.length; a++) {
      const icon = icons[a];
      let languageCode = null;
      let countryCode = null;
      let currentElem = null;
      let dataParent = icon.closest(".ly-languages-switcher-link");
      if (!dataParent) {
        dataParent = icon.closest(".ly-languages-switcher");
        currentElem = dataParent.querySelector(".current_lang");
      }
      if (dataParent) {
        if (dataParent.hasAttribute("data-language-code")) {
          languageCode = dataParent.hasAttribute("data-language-code")
            ? dataParent.getAttribute("data-language-code")
            : "";
          countryCode = dataParent.hasAttribute("data-country-code")
            ? dataParent.getAttribute("data-country-code")
            : "";
        }
        if (currentElem) {
          languageCode = currentElem.hasAttribute("data-language-code")
            ? currentElem.getAttribute("data-language-code")
            : "";
          countryCode = currentElem.hasAttribute("data-country-code")
            ? currentElem.getAttribute("data-country-code")
            : "";
        }
        let key = languageCode;
        if (countryCode) {
          key = countryCode + "-" + languageCode;
        }
        if (
          langify.settings.switcher &&
          langify.settings.switcher.customIcons &&
          langify.settings.switcher.customIcons[key]
        ) {
          icon.outerHTML = `<img src="${
            langify.settings.switcher.customIcons[key]
          }" class="${icon.getAttribute("class")}" />`;
        }
      }
    }
  }
  initCustomDropdown() {
    // Custom Dropdown
    var root = this;
    var switcher = document.getElementsByClassName(
      "ly-custom-dropdown-switcher"
    );
    for (var a = 0; a < switcher.length; a++) {
      switcher[a].classList.toggle("ly-is-open");
      var isOut = _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
        "default"
      ].isOutOfViewport(switcher[a]);
      if (isOut.bottom && isOut.inViewport) {
        switcher[a].classList.add("ly-is-dropup");
        var arrows = switcher[a].querySelectorAll(".ly-arrow");
        for (var b = 0; b < arrows.length; b++) {
          arrows[b].classList.add("ly-arrow-up");
        }
      }
      switcher[a].classList.toggle("ly-is-open");
      switcher[a].onclick = function (event) {
        root.toggleSwitcherOpen(this);
      };
    }
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".ly-custom-dropdown-switcher")) {
        var openSwitchers = document.querySelectorAll(
          ".ly-custom-dropdown-switcher.ly-is-open"
        );
        for (var i = 0; i < openSwitchers.length; i++) {
          openSwitchers[i].classList.remove("ly-is-open");
        }
      }
    });
  }
  bindLanguageSwitchers() {
    var root = this;
    var links = document.getElementsByClassName("ly-languages-switcher-link");
    for (var l = 0; l < links.length; l++) {
      links[l].addEventListener("click", function (event) {
        event.preventDefault();
        if (
          _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ].isDomainFeatureEnabled() &&
          this.getAttribute("href") !== "#" &&
          !this.getAttribute("data-country-code")
        ) {
          var domain = this.getAttribute("href");
        }
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].setCookie(
          "ly-lang-selected",
          this.getAttribute("data-language-code"),
          365
        );
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ].localizationRedirect(
          "language_code",
          this.getAttribute("data-language-code"),
          root._dataAttrToAdditionalFields(this),
          null,
          domain
        );
      });
    }

    // Native select event handling
    var nativeLangifySelects = document.querySelectorAll(
      "select.ly-languages-switcher"
    );
    for (var i = 0; i < nativeLangifySelects.length; i++) {
      nativeLangifySelects[i].onchange = function () {
        event.preventDefault();
        if (
          _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ].isDomainFeatureEnabled() &&
          this[this.selectedIndex].getAttribute("data-domain") !== "#" &&
          !this[this.selectedIndex].getAttribute("data-country-code")
        ) {
          var domain = this[this.selectedIndex].getAttribute("data-domain");
        }
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].setCookie(
          "ly-lang-selected",
          this[this.selectedIndex].getAttribute("data-language-code"),
          365
        );
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ].localizationRedirect(
          "language_code",
          this[this.selectedIndex].getAttribute("data-language-code"),
          root._dataAttrToAdditionalFields(this),
          null,
          domain
        );
      };
    }
  }
  bindCountrySwitchers() {
    var countrySelectSwitcher = document.querySelectorAll(
      "select.ly-country-switcher"
    );
    var countryCustomSwitcher = document.querySelectorAll(
      "div.ly-country-switcher a"
    );
    for (var i = 0; i < countryCustomSwitcher.length; i++) {
      countryCustomSwitcher[i].addEventListener("click", function (e) {
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ].localizationRedirect(
          "country_code",
          this.getAttribute("data-country-code")
        );
      });
    }
    for (var a = 0; a < countrySelectSwitcher.length; a++) {
      countrySelectSwitcher[a].addEventListener("change", function () {
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ].localizationRedirect(
          "country_code",
          this[this.selectedIndex].getAttribute("data-country-code")
        );
      });
    }
  }
  bindCurrencySwitchers() {
    var currencySelectSwitcher = document.querySelectorAll(
      "select.ly-currency-switcher"
    );
    var currencyCustomSwitcher = document.querySelectorAll(
      "div.ly-currency-switcher a"
    );
    for (var i = 0; i < currencyCustomSwitcher.length; i++) {
      currencyCustomSwitcher[i].addEventListener("click", function (e) {
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ].changeCurrency(this.getAttribute("data-currency-code"));
      });
    }
    for (var a = 0; a < currencySelectSwitcher.length; a++) {
      currencySelectSwitcher[a].addEventListener("change", function () {
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ].changeCurrency(
          this[this.selectedIndex].getAttribute("data-currency-code")
        );
      });
    }
  }
  setCustomPosition() {
    for (var i = 0; i < this.switcherElements.length; i++) {
      if (this.lyForceOff !== "true") {
        if (langify.locale.languages.length <= 1) {
          this.switcherElements[i]
            .querySelector(".ly-languages-switcher")
            .classList.add("ly-hide");
        }
        this.switcherElements[i].classList.remove("ly-hide");
      }
      if (
        this.switcherElements[i].classList.contains("ly-custom") &&
        (document.getElementById(
          "ly-custom-" +
            this.switcherElements[i].getAttribute("data-breakpoint")
        ) ||
          document.getElementsByClassName(
            "ly-custom-" +
              this.switcherElements[i].getAttribute("data-breakpoint")
          ).length)
      ) {
        var targets = Array.from(
          document.getElementsByClassName(
            "ly-custom-" +
              this.switcherElements[i].getAttribute("data-breakpoint")
          )
        );
        var target = document.getElementById(
          "ly-custom-" +
            this.switcherElements[i].getAttribute("data-breakpoint")
        );
        if (target) targets.push(target);
        for (var c = 0; c < targets.length; c++) {
          var clone = this.switcherElements[i].cloneNode(true);
          if (this.switcherElements[i].parentNode) {
            this.switcherElements[i].remove();
          }
          targets[c].innerHTML = clone.outerHTML;
        }
        this.switcherElements[i].classList.add("ly-hide");
      }
    }
  }
  toggleSwitcherOpen(e) {
    var target = e;
    if (!target.classList.contains("ly-is-open")) {
      var openSwitchers = document.querySelectorAll(
        ".ly-custom-dropdown-switcher.ly-is-open"
      );
      for (var i = 0; i < openSwitchers.length; i++) {
        openSwitchers[i].classList.remove("ly-is-open");
      }
      target
        .getElementsByClassName("ly-custom-dropdown-current")[0]
        .setAttribute("aria-expanded", "true");
    } else {
      target
        .getElementsByClassName("ly-custom-dropdown-current")[0]
        .setAttribute("aria-expanded", "false");
    }
    target.classList.toggle("ly-is-open");
    var isOut =
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].isOutOfViewport(
        target
      );
    if (isOut.bottom) {
      target.classList.add("ly-is-dropup");
    }
  }
  togglePopupOpen(e) {
    e.closest(".ly-popup-switcher").classList.toggle("ly-is-open");
  }
  _getCountryCodeFromHreflang(language_code) {
    var hreflangTags = document.querySelectorAll("link[hreflang]");
    var languageDomains = {};
    var countryCode = false;
    for (var i = 0; i < hreflangTags.length; i++) {
      if (
        hreflangTags[i].getAttribute("hreflang").indexOf(language_code) === 0
      ) {
        if (!languageDomains[hreflangTags[i].getAttribute("href")]) {
          languageDomains[hreflangTags[i].getAttribute("href")] =
            hreflangTags[i];
        }
      }
    }
    if (Object.keys(languageDomains).length > 0) {
      countryCode = Object.values(languageDomains)[0].getAttribute("hreflang");
      countryCode = countryCode.split("-");
      if (countryCode[1]) {
        countryCode = countryCode[1];
      } else {
      }
    }
    return countryCode;
  }
  _dataAttrToAdditionalFields(elem) {
    var additionalFields = [];
    if (elem.hasAttribute("data-country-code")) {
      additionalFields.push({
        name: "country_code",
        value: elem.getAttribute("data-country-code"),
      });
    }
    if (elem.hasAttribute("data-currency-code")) {
      additionalFields.push({
        name: "currency_code",
        value: elem.getAttribute("data-currency-code"),
      });
    }
    return additionalFields;
  }
  filterCountries(e) {
    //debugger;
    e.preventDefault();
    e.stopPropagation();
    var input, filter, ul, li, a, i, txtValue;
    input = e.target;
    filter = e.target.value.toUpperCase();
    ul = input.parentNode.parentNode;
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a) {
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
  }
}

//# sourceURL=webpack://api.langify/./src/langify/modules/switcher.js?
