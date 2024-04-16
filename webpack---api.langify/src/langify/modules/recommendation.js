__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: () => /* binding */ Recommendation,
  /* harmony export */
});
/* harmony import */ var _system_helper_js__WEBPACK_IMPORTED_MODULE_0__ =
  __webpack_require__(
    /*! ../system/helper.js */ "./src/langify/system/helper.js"
  );
/* harmony import */ var _language_detection_js__WEBPACK_IMPORTED_MODULE_1__ =
  __webpack_require__(
    /*! ./language-detection.js */ "./src/langify/modules/language-detection.js"
  );

/**
 *
 *
 * @class Recommendation
 */
class Recommendation extends _language_detection_js__WEBPACK_IMPORTED_MODULE_1__[
  "default"
] {
  constructor() {
    super();
    _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
      "Recommendation instantiation"
    );
  }
  init() {
    this.hreflangList = this.getHreflangList();
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.toLowerCase();
    var recommendation = this.matchHreflangList(userLang);
    var recommendationLanguageCode =
      this._hreflangToLanguageCode(recommendation);
    if (
      recommendationLanguageCode &&
      recommendationLanguageCode !== langify.locale.iso_code &&
      !_system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCookie(
        "ly-lang-selected"
      )
    ) {
      this.recommended_language_code = recommendationLanguageCode;
      this.recommended_country_code = null;
      this.recommended_currency_code = null;
      this._translateStrings(recommendationLanguageCode);
      this._bindings();
    } else {
      return false;
    }
  }
  _translateStrings(languageCode) {
    var recommendationElement =
      document.querySelectorAll(".ly-recommendation")[0];
    var strings =
      langify.settings.switcher.recommendation_strings[languageCode];
    var recommendationStr =
      "Looks like your browser is set to [[language]]. Change the language?";
    var buttonStr = "Change";
    var matchedLanguageCode = this._langToHreflang(languageCode).toLowerCase();
    var languageStr = langify.settings.switcher.languages.find(
      (x) => x.iso_code.toLowerCase() === matchedLanguageCode
    )
      ? langify.settings.switcher.languages.find(
          (x) => x.iso_code.toLowerCase() === matchedLanguageCode
        ).name
      : languageCode.toUpperCase();
    if (strings) {
      recommendationStr = strings.recommendation
        ? strings.recommendation
        : recommendationStr;
      buttonStr = strings.button ? strings.button : buttonStr;
      languageStr = strings.language ? strings.language : languageStr;
    }
    var newCode = recommendationElement.innerHTML;
    newCode = newCode
      .replaceAll("[[recommendation]]", recommendationStr)
      .replaceAll("[[button]]", buttonStr)
      .replaceAll("[[language]]", languageStr);
    recommendationElement.innerHTML = newCode;
  }
  _bindings() {
    var _this = this;
    var lyForceOff = location.search.split("ly-force-off=")[1];
    var recommendationElement =
      document.querySelectorAll(".ly-recommendation")[0];
    var form = recommendationElement.querySelectorAll(
      ".ly-recommendation-form"
    )[0];
    var links = recommendationElement.getElementsByClassName(
      "ly-custom-dropdown-list-element"
    );
    var customDropdown = recommendationElement.querySelectorAll(
      ".ly-custom-dropdown-switcher"
    );
    var nativeSelects =
      recommendationElement.getElementsByClassName("ly-native-select");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (_this.recommended_country_code || _this.recommended_currency_code) {
        // When a country or currency is involved, use old redirection
        var additionalFields = [];
        if (_this.recommended_country_code) {
          additionalFields.push({
            name: "country_code",
            value: _this.recommended_country_code,
          });
        }
        if (_this.recommended_currency_code) {
          additionalFields.push({
            name: "currency_code",
            value: _this.recommended_currency_code,
          });
        }
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].setCookie(
          "ly-lang-selected",
          _this.recommended_language_code,
          365
        );
        _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
          "default"
        ].localizationRedirect(
          "language_code",
          _this.recommended_language_code,
          additionalFields
        );
      } else {
        //...or use new hreflang redirection
        _this.redirectMatched(_this.recommended_language_code);
      }
    });

    // Overwrite switchers
    for (var l = 0; l < links.length; l++) {
      links[l].addEventListener("click", function (event) {
        event.preventDefault();

        // When clicked from within a custom dropdown
        var parentCustomDropdown = event.currentTarget.closest(
          ".ly-custom-dropdown-switcher"
        );
        if (parentCustomDropdown) {
          _this._selectCustomDropdownEntry(parentCustomDropdown, this);
        } else {
          _this.recommended_language_code =
            this.getAttribute("data-language-code");
        }
      });
    }
    for (var i = 0; i < nativeSelects.length; i++) {
      nativeSelects[i].onchange = _this._selectNativeDropdownEntry.bind(this);
      if (nativeSelects[i].classList.contains("ly-languages-switcher")) {
        nativeSelects[i].value = _this.recommended_language_code;
      }
    }
    for (var i = 0; i < customDropdown.length; i++) {
      if (recommendationElement.className.indexOf("bottom") > -1) {
        customDropdown[i].classList.add("ly-is-dropup");
      }
      if (customDropdown[i].classList.contains("ly-languages-switcher")) {
        _this._selectCustomDropdownEntry(
          customDropdown[i],
          customDropdown[i].querySelector(
            '.ly-custom-dropdown-list a[data-language-code="' +
              _this.recommended_language_code +
              '"]'
          )
        );
      }
    }
    if (!lyForceOff) {
      recommendationElement.classList.add("ly-is-open");
    }
    recommendationElement.classList.remove("ly-hide");
  }
  _selectNativeDropdownEntry(event) {
    event.preventDefault();
    var element = event.currentTarget;
    var _this = this;
    if (element[element.selectedIndex].hasAttribute("data-language-code")) {
      _this.recommended_language_code =
        element[element.selectedIndex].getAttribute("data-language-code");
    }
    if (element[element.selectedIndex].hasAttribute("data-country-code")) {
      _this.recommended_country_code =
        element[element.selectedIndex].getAttribute("data-country-code");
    }
    if (element[element.selectedIndex].hasAttribute("data-currency-code")) {
      _this.recommended_currency_code =
        element[element.selectedIndex].getAttribute("data-currency-code");
    }
  }
  _selectCustomDropdownEntry(element, entry) {
    if (!entry) return;
    var _this = this;
    var currentElem = element.querySelector(".ly-custom-dropdown-current");
    var currentIcon = currentElem.querySelector(".ly-icon");
    var currentLabel = currentElem.querySelector("span");
    var valueToSelect = "";
    if (entry.hasAttribute("data-language-code")) {
      _this.recommended_language_code =
        entry.getAttribute("data-language-code");
      valueToSelect = _this.recommended_language_code;
    }
    if (entry.hasAttribute("data-country-code")) {
      _this.recommended_country_code = entry.getAttribute("data-country-code");
      valueToSelect = _this.recommended_country_code;
    }
    if (entry.hasAttribute("data-currency-code")) {
      _this.recommended_currency_code =
        entry.getAttribute("data-currency-code");
      valueToSelect = _this.recommended_currency_code;
    }
    if (
      entry.hasAttribute("data-country-code") &&
      entry.hasAttribute("data-currency-code")
    ) {
      valueToSelect =
        _this.recommended_country_code + "-" + _this.recommended_currency_code;
    }
    if (element.querySelector(".ly-custom-dropdown-list li.current")) {
      element
        .querySelector(".ly-custom-dropdown-list li.current")
        .classList.remove("current");
      element
        .querySelector(
          '.ly-custom-dropdown-list li[key="' + valueToSelect + '"]'
        )
        .classList.add("current");
    }
    if (element.querySelector(".ly-custom-dropdown-list li.current span"))
      currentLabel.innerHTML = element.querySelector(
        ".ly-custom-dropdown-list li.current span"
      ).innerHTML;
    if (element.querySelector(".ly-custom-dropdown-list li.current .ly-icon"))
      currentIcon.classList = element.querySelector(
        ".ly-custom-dropdown-list li.current .ly-icon"
      ).classList;
  }
  toggleOpen(e) {
    e.closest(".ly-recommendation").classList.toggle("ly-is-open");
    if (!e.closest(".ly-recommendation").classList.contains("ly-is-open")) {
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].setCookie(
        "ly-lang-selected",
        this.recommended_language_code,
        365
      );
    }
  }
}

//# sourceURL=webpack://api.langify/./src/langify/modules/recommendation.js?
