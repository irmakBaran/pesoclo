__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: () => /* binding */ Langify,
  /* harmony export */
});
/* harmony import */ var _modules_translation_observer_js__WEBPACK_IMPORTED_MODULE_0__ =
  __webpack_require__(
    /*! ../modules/translation-observer.js */ "./src/langify/modules/translation-observer.js"
  );
/* harmony import */ var _modules_switcher_js__WEBPACK_IMPORTED_MODULE_1__ =
  __webpack_require__(
    /*! ../modules/switcher.js */ "./src/langify/modules/switcher.js"
  );
/* harmony import */ var _modules_language_detection_js__WEBPACK_IMPORTED_MODULE_2__ =
  __webpack_require__(
    /*! ../modules/language-detection.js */ "./src/langify/modules/language-detection.js"
  );
/* harmony import */ var _modules_recommendation_js__WEBPACK_IMPORTED_MODULE_3__ =
  __webpack_require__(
    /*! ../modules/recommendation.js */ "./src/langify/modules/recommendation.js"
  );
/* harmony import */ var _system_helper_js__WEBPACK_IMPORTED_MODULE_4__ =
  __webpack_require__(
    /*! ../system/helper.js */ "./src/langify/system/helper.js"
  );

/**
 *
 *
 * @class Langify
 */
class Langify {
  constructor(settings, locale) {
    langify.helper = new _system_helper_js__WEBPACK_IMPORTED_MODULE_4__[
      "default"
    ]();
    _system_helper_js__WEBPACK_IMPORTED_MODULE_4__["default"].log(
      "Langify instantiation"
    );
    var translationObserver =
      new _modules_translation_observer_js__WEBPACK_IMPORTED_MODULE_0__[
        "default"
      ]().init();
    _system_helper_js__WEBPACK_IMPORTED_MODULE_4__["default"].log(
      langify.helper
    );
    var lyForceOff = location.search.split("ly-force-off=")[1];
    if (lyForceOff === "true") {
      document.getElementById("preview-bar-iframe").classList.add("ly-hide");
      return false;
    }
    if (
      settings.theme &&
      ((settings.theme.loadJquery && settings.theme.loadJquery === true) ||
        typeof settings.theme.loadJquery === "undefined")
    ) {
      if (typeof jQuery === "undefined") {
        _system_helper_js__WEBPACK_IMPORTED_MODULE_4__["default"].loadScript(
          "//cdn.jsdelivr.net/jquery/1.9.1/jquery.min.js",
          function () {}
        );
      }
    }

    //document.addEventListener("DOMContentLoaded", function() {
    langify.switcher = new _modules_switcher_js__WEBPACK_IMPORTED_MODULE_1__[
      "default"
    ]();
    langify.switcher.init();
    if (settings.switcher) {
      if (
        settings.switcher.recommendation &&
        settings.switcher.recommendation_enabled
      ) {
        langify.recommendation =
          new _modules_recommendation_js__WEBPACK_IMPORTED_MODULE_3__[
            "default"
          ]();
        langify.recommendation.init();
      } else {
        if (settings.switcher.languageDetection) {
          langify.languageDetection =
            new _modules_language_detection_js__WEBPACK_IMPORTED_MODULE_2__[
              "default"
            ]();
          langify.languageDetection.init();
        }
      }
    }
    //});
  }
}

//# sourceURL=webpack://api.langify/./src/langify/system/base.js?
