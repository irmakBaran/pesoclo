__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ default: () => /* binding */ TranslationObserver,
  /* harmony export */
});
/* harmony import */ var _system_helper_js__WEBPACK_IMPORTED_MODULE_0__ =
  __webpack_require__(
    /*! ../system/helper.js */ "./src/langify/system/helper.js"
  );

/**
 *
 *
 * @class TranslationObserver
 */
class TranslationObserver {
  constructor() {
    _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
      "TranslationObserver instantiation"
    );
  }
  init() {
    if (
      langify.settings.observe &&
      !_system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].isIE()
    ) {
      var langifyObserver = this.langifyObserverCore();
      langifyObserver.init();

      // HOTFIX: translation observer sometimes refuses to trigger on page load_
      langifyObserver.triggerCustomContents();
      langify.api = {
        observer: {
          start: langifyObserver.init,
          stop: langifyObserver.stopObserver,
          trigger: langifyObserver.triggerCustomContents,
          translateLink: langifyObserver.translateLink,
          translateTextNode: langifyObserver.translateTextNode,
          translateNodeAttrs: langifyObserver.translateNodeAttrs,
          translateImage: langifyObserver.translateImage,
          translateCssImage: langifyObserver.translateCssImage,
        },
      };
    }
    return this;
  }
  langifyObserverCore() {
    var observedNodes = [];
    var intersectionObs = null;
    var mutationCount = 0;
    var mutationObs = null;
    var mutationObsConfig = {
      characterData: true,
      characterDataOldValue: true,
      attributes: true,
      attributeOldValue: true,
      childList: true,
      subtree: true,
    };
    var customContents_html = {};
    var customContents_text = {};
    var customContents_attr = {};
    function init() {
      if (langify.settings.observe) {
        spreadCustomContents();
        if (window.MutationObserver) {
          if (langify.settings.lazyload && window.IntersectionObserver) {
            startIntersectionObserver();
          } else {
            startMutationObserver(null);
          }
        } else {
          startMutationEvents();
        }
      }
    }

    // Intersection Observer
    function startIntersectionObserver() {
      intersectionObs = new IntersectionObserver(callbackIntersectionChange);
      var elementNodes = document.getElementsByClassName("shopify-section");
      Array.prototype.slice.call(elementNodes).forEach(function (node) {
        intersectionObs.observe(node);
      });
    }
    function callbackIntersectionChange(intersections) {
      intersections.forEach(function (intersection) {
        var target = intersection.target;
        var targetIsIntersecting = Boolean(
          target.getAttribute("ly-is-intersecting") === "true" ? true : false
        );
        if (
          typeof targetIsIntersecting == "undefined" ||
          targetIsIntersecting == null
        ) {
          target.setAttribute(
            "ly-is-intersecting",
            intersection.isIntersecting
          );
          targetIsIntersecting = intersection.isIntersecting;
        }

        // On Screen
        if (
          targetIsIntersecting == false &&
          intersection.isIntersecting == true
        ) {
          if (!target.getAttribute("ly-is-observing")) {
            startMutationObserver(target);
            intersectionObs.unobserve(target);

            // As the mutation observer didn't see the "add" of the elememts, trigger the initial translation manually
            var elementNodes = getNodesUnder(target, "SHOW_ELEMENT");
            var textNodes = getNodesUnder(target, "SHOW_TEXT");
            var nodes = elementNodes.concat(textNodes);
            nodes.forEach(function (node) {
              translate(node, "mutation -> childList");
            });
          }
        }
        // Off Screen
        //else if(targetIsIntersecting == true && intersection.isIntersecting == false) {
        //  stopMutationObserver(target);
        //}
        target.setAttribute("ly-is-intersecting", intersection.isIntersecting);
      });
    }

    // Mutation Observer
    function startMutationObserver(observerTarget) {
      if (!observerTarget) {
        var target = document.documentElement || document.body; // main window
      } else {
        if (observerTarget.nodeName === "IFRAME") {
          try {
            var target =
              observerTarget.contentDocument ||
              observerTarget.contentWindow.document;
          } catch {
            return false;
          }
        } else {
          var target = observerTarget;
        }
      }
      mutationObs = new MutationObserver(callbackDomChange);
      mutationObs.observe(target, mutationObsConfig);
      observedNodes.push(target);
      try {
        target.setAttribute("ly-is-observing", "true");
      } catch (e) {}
    }
    function stopMutationObserver(target) {
      if (observedNodes.indexOf(target) > -1) {
        observedNodes.splice(observedNodes.indexOf(target), 1);
      }
      var mutations = mutationObs.takeRecords();
      mutationObs.disconnect();
      observedNodes.forEach((node) => {
        mutationObs.observe(node, mutationObsConfig);
      });
      try {
        target.removeAttribute("ly-is-observing");
      } catch (e) {}
    }
    function callbackDomChange(mutations, mutationObs) {
      for (var i = 0, length = mutations.length; i < length; i++) {
        var mutation = mutations[i];
        var target = mutation.target;

        // Links-Hook
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "href" ||
            mutation.attributeName === "action")
        ) {
          var target = mutation.target;
          translateLink(target.getAttribute(mutation.attributeName), target);
        }
        // Images-Hook
        else if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "src" ||
            mutation.attributeName === "data-src" ||
            mutation.attributeName === "srcset" ||
            mutation.attributeName === "data-srcset")
        ) {
          translateImage(target, mutation.attributeName);
        } else if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          translateCssImage(target);
        }
        // Subtree Events
        else if (mutation.type === "childList") {
          // Added Nodes
          if (mutation.addedNodes.length > 0) {
            var elementNodes = getNodesUnder(mutation.target, "SHOW_ELEMENT");
            var textNodes = getNodesUnder(mutation.target, "SHOW_TEXT");
            var nodes = elementNodes.concat(textNodes);
            nodes.forEach(function (node) {
              translate(node, "mutation -> childList");
            });
          }
        }
        // CharacterData Events
        else if (mutation.type === "characterData") {
          var target = mutation.target;
          translate(target, "mutation -> characterData");
        }
      }
    }
    function translate(node, info) {
      if (
        (node.nodeType === 1 && node.hasAttribute("data-ly-locked")) ||
        (node.nodeType === 3 &&
          node.parentNode &&
          node.parentNode.hasAttribute("data-ly-locked"))
      ) {
        return;
      }
      // CC-Hook
      if (node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
        if (node.nodeType === 3) {
          translateTextNode(node, info);
        }
        var attributes = ["placeholder", "title"];
        attributes.forEach((attribute) => translateNodeAttrs(node, attribute));
      }
      // Links-Hook
      if (
        node.nodeName === "A" ||
        node.nodeName === "FORM" ||
        node.nodeName === "IMG"
      ) {
        if (node.hasAttribute("href")) {
          var attrName = "href";
        } else if (node.hasAttribute("data-href")) {
          var attrName = "data-href";
        } else {
          var attrName = "action";
        }
        var url = node.getAttribute(attrName);
        translateLink(url, node);
      }
      // Images-Hook
      if (node.nodeName === "IMG" || node.nodeName === "SOURCE") {
        translateImage(node, ["src", "data-src", "srcset", "data-srcset"]);
      }
      if (node.attributes && node.getAttribute("style")) {
        translateCssImage(node);
      }
      // Iframe Observation
      if (node.nodeName === "IFRAME") {
        // Todo: handle srcdoc iframe content observing
        if (
          node.getAttribute("ly-is-observing") == null &&
          node.getAttribute("src") == null &&
          !node.hasAttribute("srcdoc")
        ) {
          node.setAttribute("ly-is-observing", "true");
          startMutationObserver(node);
        }
      }
    }
    function translateNodeAttrs(node, attribute) {
      if (node.attributes && node.getAttribute(attribute)) {
        var src = node
          .getAttribute(attribute)
          .trim()
          .replace(/(\r\n|\n|\r)/gim, "")
          .replace(/\s+/g, " ")
          .toLowerCase();
        if (
          customContents_text[src] &&
          node.getAttribute(attribute) !== customContents_text[src]
        ) {
          node.setAttribute(attribute, customContents_text[src]);
        }
      }
    }
    function translateTextNode(node, info) {
      if (
        langify.settings.observeCustomContents === false ||
        !node.textContent ||
        node.textContent.trim().length === 0
      ) {
        return;
      }
      var oldSrc = node.textContent
        .trim()
        .replace(/(\r\n|\n|\r)/gim, "")
        .replace(/\s+/g, " ")
        .toLowerCase();
      var src = node.textContent
        .trim()
        .replace(/(\r\n|\n|\r)/gim, " ")
        .replace(/\s+/g, " ")
        .toLowerCase();
      if (customContents_text[oldSrc]) {
        src = oldSrc;
      }
      if (
        customContents_text[src] &&
        node.textContent !== customContents_text[src]
      ) {
        var newContent = node.textContent.replace(
          node.textContent.trim(),
          customContents_text[src]
        );
        if (newContent != node.textContent) {
          if (
            !node.parentNode.hasAttribute("data-ly-mutation-count") ||
            parseInt(node.parentNode.getAttribute("data-ly-mutation-count")) <
              langify.settings.maxMutations
          ) {
            var count = node.parentNode.hasAttribute("data-ly-mutation-count")
              ? parseInt(node.parentNode.getAttribute("data-ly-mutation-count"))
              : 0;
            node.parentNode.setAttribute("data-ly-mutation-count", count + 1);
            node.textContent = newContent;
            mutationCount = mutationCount + 1;
            _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
              "REPLACED (TEXT)",
              {
                oldValue: src,
                newValue: customContents_text[src],
                mutationCount,
              },
              "success"
            );
            var event = new CustomEvent("langify.observer.aftertranslatetext", {
              bubbles: true,
              detail: {
                target: node,
                original: src,
                translation: customContents_text[src],
              },
            });
            node.dispatchEvent(event);
          }
        }
      }
    }
    function translateLink(url, node, force) {
      if (
        langify.settings.observeLinks === false ||
        isLocalizationForm(node) ||
        node.hasAttribute("data-ly-locked") ||
        !url ||
        url.indexOf("mailto:") !== -1 ||
        url.indexOf("javascript:") !== -1 ||
        url.indexOf("tel:") !== -1 ||
        url.indexOf("file:") !== -1 ||
        url.indexOf("ftp:") !== -1 ||
        url.indexOf("sms:") !== -1 ||
        url.indexOf("market:") !== -1 ||
        url.indexOf("fax:") !== -1 ||
        url.indexOf("callto:") !== -1 ||
        url.indexOf("ts3server:") !== -1
      ) {
        return;
      }
      var isLocalized =
        url.indexOf("/" + langify.locale.iso_code + "/") === 0 ||
        url === "/" + langify.locale.iso_code ||
        url.indexOf("/" + langify.locale.iso_code.toLowerCase() + "/") === 0 ||
        url === "/" + langify.locale.iso_code.toLowerCase() ||
        url.indexOf(
          "/" + langify.locale.iso_code.toLowerCase().substring(0, 2) + "/"
        ) === 0 ||
        url === "/" + langify.locale.iso_code.toLowerCase().substring(0, 2) ||
        url.indexOf(langify.locale.root_url + "/") === 0 ||
        url === langify.locale.root_url ||
        url.indexOf(langify.locale.shop_url + langify.locale.root_url) === 0 ||
        url === langify.locale.shop_url + langify.locale.root_url;
      var cleanUrl = url.replace(langify.locale.shop_url, "");
      var re = new RegExp(
        `\/\\b${langify.locale.iso_code.replace("-", "-")}\\b\/`,
        "gi"
      );
      var link = cleanUrl.replace(re, "/");
      var isUrlAbsolute = link.indexOf("://") > 0 || link.indexOf("//") === 0;
      var blacklist = ["#", "/" + langify.locale.iso_code + "#"].concat(
        langify.settings.linksBlacklist
      );
      var isUrlBlacklisted = blacklist.find((x) => url.indexOf(x) === 0);
      if (!isUrlAbsolute && !isUrlBlacklisted && link.indexOf("/") != 0) {
        link = "/" + link;
      }
      if (
        (!isLocalized &&
          !isUrlAbsolute &&
          !isUrlBlacklisted &&
          langify.locale.root_url != "/") ||
        force
      ) {
        if (node.hasAttribute("href")) {
          var attrName = "href";
        } else if (node.hasAttribute("data-href")) {
          var attrName = "data-href";
        } else {
          var attrName = "action";
        }
        if (link === "/" || link == langify.locale.root_url) link = "";
        var newLink = langify.locale.root_url + link;
        var timeStamp = Math.floor(Date.now());
        if (
          !node.hasAttribute("data-ly-processed") ||
          timeStamp >
            parseInt(node.getAttribute("data-ly-processed")) +
              langify.settings.timeout
        ) {
          node.setAttribute("data-ly-processed", timeStamp);
          node.setAttribute(attrName, newLink);
          if (node.hasAttribute("data-" + attrName))
            node.setAttribute("data-" + attrName, newLink);
          mutationCount = mutationCount + 1;
          _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
            "REPLACED (LINK)",
            {
              attrName,
              oldValue: url,
              newValue: newLink,
              mutationCount,
            },
            "success"
          );
          var event = new CustomEvent("langify.observer.aftertranslatelink", {
            bubbles: true,
            detail: {
              target: node,
              attribute: attrName,
              original: url,
              translation: newLink,
            },
          });
          node.dispatchEvent(event);
        }
      }
    }
    function translateImage(node, attr) {
      if (
        langify.settings.observeImages === false ||
        node.hasAttribute("data-ly-locked") ||
        Object.keys(customContents_image).length === 0
      ) {
        return;
      }
      var attrs = [];
      if (typeof attr === "string") attrs.push(attr);
      else if (typeof attr === "object") attrs = attr;
      var timeStamp = Math.floor(Date.now());
      if (
        !node.hasAttribute("data-ly-processed") ||
        timeStamp >
          parseInt(node.getAttribute("data-ly-processed")) +
            langify.settings.timeout
      ) {
        node.setAttribute("data-ly-processed", timeStamp);
        attrs.forEach(function (attr) {
          if (node.hasAttribute(attr)) {
            var imgObject = _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
              "default"
            ].extractImageObject(node.getAttribute(attr));
            var imgKey = imgObject ? imgObject.file.toLowerCase() : "";
            if (customContents_image[imgKey]) {
              // Replace
              var oldValue = node.getAttribute(attr);
              var translation = node.getAttribute(attr);
              translation = translation.replace(
                new RegExp(imgObject.host, "g"),
                customContents_image[imgKey].host
              );
              translation = translation.replace(
                new RegExp(imgObject.name, "g"),
                customContents_image[imgKey].name
              );
              translation = translation.replace(
                new RegExp(imgObject.type, "g"),
                customContents_image[imgKey].type
              );

              // China Hook
              if (node.getAttribute(attr).indexOf("cdn.shopifycdn.net") >= 0) {
                translation = translation.replace(
                  new RegExp("cdn.shopify.com", "g"),
                  "cdn.shopifycdn.net"
                );
              }
              if (node.getAttribute(attr) != translation) {
                node.setAttribute(attr, translation);
                mutationCount = mutationCount + 1;
                _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
                  "REPLACED (IMAGE)",
                  {
                    attrName: attr,
                    oldValue: oldValue,
                    newValue: translation,
                    mutationCount,
                  },
                  "success"
                );
                var event = new CustomEvent(
                  "langify.observer.aftertranslateimage",
                  {
                    bubbles: true,
                    detail: {
                      target: node,
                      attribute: attr,
                      original: oldValue,
                      translation: translation,
                    },
                  }
                );
                node.dispatchEvent(event);
              }
            }
          }
        });
      }
    }
    function translateCssImage(node) {
      if (
        langify.settings.observeImages === false ||
        node.hasAttribute("data-ly-locked") ||
        Object.keys(customContents_image).length === 0 ||
        !node.getAttribute("style")
      ) {
        return;
      }
      var imgMatches = node
        .getAttribute("style")
        .match(/url\(("|')?(.*)("|')?\)/gi);
      if (imgMatches !== null) {
        var imgSource = imgMatches[0].replace(/url\(("|')?|("|')?\)/, "");
        var imgObject =
          _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ].extractImageObject(imgSource);
        var imgKey = imgObject ? imgObject.file.toLowerCase() : "";
        var attr = "style";
        if (customContents_image[imgKey]) {
          // Replace
          var translation = node.getAttribute(attr);
          translation = translation.replace(
            new RegExp(imgObject.host, "g"),
            customContents_image[imgKey].host
          );
          translation = translation.replace(
            new RegExp(imgObject.name, "g"),
            customContents_image[imgKey].name
          );
          translation = translation.replace(
            new RegExp(imgObject.type, "g"),
            customContents_image[imgKey].type
          );

          // China Hook
          if (node.getAttribute(attr).indexOf("cdn.shopifycdn.net") >= 0) {
            translation = translation.replace(
              new RegExp("cdn.shopify.com", "g"),
              "cdn.shopifycdn.net"
            );
          }
          if (node.getAttribute(attr) != translation) {
            var timeStamp = Math.floor(Date.now());
            if (
              !node.hasAttribute("data-ly-processed") ||
              timeStamp >
                parseInt(node.getAttribute("data-ly-processed")) +
                  langify.settings.timeout
            ) {
              node.setAttribute("data-ly-processed", timeStamp);
              node.setAttribute(attr, translation);
              mutationCount = mutationCount + 1;
            }
          }
        }
      }
    }
    function findAndLocalizeLinks(target, parent) {
      if (target.parentNode && parent)
        var allLinks = target.parentElement.querySelectorAll("[href],[action]");
      else var allLinks = target.querySelectorAll("[href],[action]");
      allLinks.forEach((link) => {
        if (link.hasAttribute("href")) var attrName = "href";
        else var attrName = "action";
        var url = link.getAttribute(attrName);
        translateLink(url, link);
      });
    }
    function isLocalizationForm(node) {
      if (node.querySelector('input[name="form_type"][value="localization"]')) {
        return true;
      }
      return false;
    }
    function getNodesUnder(el, show) {
      var n,
        a = [],
        walk = document.createTreeWalker(el, NodeFilter[show], null, false);
      while ((n = walk.nextNode())) a.push(n);
      return a;
    }
    function spreadCustomContents() {
      var getFileName = function (url) {
        if (!url || url == "") return;
        url = url.substring(
          0,
          url.indexOf("#") == -1 ? url.length : url.indexOf("#")
        );
        url = url.substring(
          0,
          url.indexOf("?") == -1 ? url.length : url.indexOf("?")
        );
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        url = url.replace(
          /(_[0-9]+x[0-9]*|_{width}x)?(_crop_(top|center|bottom|left|right))?(@[0-9]*x)?(\.progressive)?\.(jpe?g|png|gif|webp)/gi,
          ""
        );
        return "/" + url;
      };
      Object.entries(customContents).forEach(function (entry) {
        //if(/<\/?[a-z][\s\S]*>/i.test(entry[0])) customContents_html[entry[0]] = entry[1];
        //else if(/(http(s?):)?([/|.|\w|\s|-])*\.(?:jpe?g|gif|png)/.test(entry[0])) customContents_image[getFileName(entry[0])] = getFileName(entry[1]);
        if (
          /(http(s?):)?([/|.|\w|\s|-])*\.(?:jpe?g|gif|png|webp)/.test(entry[0])
        )
          customContents_image[
            _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
              "default"
            ].extractImageObject(entry[0]).file
          ] = _system_helper_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ].extractImageObject(entry[1]);
        else customContents_text[entry[0]] = entry[1];
      });
      _system_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"].log(
        "CUSTOM CONTENTS:",
        {
          customContents,
          customContents_text,
          customContents_image,
        },
        "info"
      );
    }

    // Polyfill for old browsers
    function startMutationEvents() {
      var target = document.querySelector("body");
      target.addEventListener(
        "DOMAttrModified",
        function (event) {
          if (event.attrName === "href" || event.attrName === "action") {
            if (event.prevValue != event.newValue) {
              translateLink(event.newValue, event.target);
            }
          }
        },
        false
      );
      target.addEventListener(
        "DOMSubtreeModified",
        function (event) {
          //findAndLocalizeLinks(event.target, false);
          //matchCustomContent(event.target);
        },
        false
      );
    }
    function triggerCustomContents() {
      var rootnode = document.getElementsByTagName("body")[0];
      var walker = document.createTreeWalker(
        rootnode,
        NodeFilter.SHOW_ALL,
        null,
        false
      );
      while (walker.nextNode()) {
        //LyHelper.log(walker.currentNode.tagName)
        translate(walker.currentNode, null);
      }
    }
    function stopObserver() {
      mutationObs.takeRecords();
      mutationObs.disconnect();
    }

    //init();
    return {
      init: init,
      triggerCustomContents: triggerCustomContents,
      stopObserver: stopObserver,
      translateLink: translateLink,
      translateTextNode: translateTextNode,
      translateNodeAttrs: translateNodeAttrs,
      translateImage: translateImage,
      translateCssImage: translateCssImage,
    };
  }
}

//# sourceURL=webpack://api.langify/./src/langify/modules/translation-observer.js?
