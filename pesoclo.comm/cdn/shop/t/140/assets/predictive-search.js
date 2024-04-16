if (!customElements.get("predictive-search")) {
  class PredictiveSearch extends HTMLElement {
    constructor() {
      super(),
        (this.input = this.querySelector('input[type="search"]')),
        (this.predictiveSearchEnabled = this.getAttribute(
          "predictive-search-enabled"
        )),
        (this.predictiveSearchResults =
          this.querySelector("#predictive-search")),
        (this.mobileSearchOverlay = document.querySelector(
          "#mobile-search-overlay"
        )),
        (this.heroSection = document.querySelector(
          "#shopify-section-hero-banner"
        )),
        (this.closeSearchPanelBtn = this.querySelector(
          "#close-search-results-panel-btn"
        )),
        (this.mainContentWrapper = document.querySelector(
          "#main .main__content"
        )),
        (this.isMobile = window.matchMedia(
          "only screen and (max-width: 1200px)"
        ).matches),
        this.predictiveSearchEnabled == "true" &&
          this.input.addEventListener(
            "input",
            this.debounce((event) => {
              this.onChange(event);
            }, 300).bind(this)
          ),
        this.closeSearchPanelBtn &&
          this.closeSearchPanelBtn.addEventListener("click", (e) => {
            (this.input.value = ""),
              this.input.focus(),
              this.closeSearchOverlay(),
              this.isMobile &&
                (document.querySelector("#header .header_bottom") &&
                  (document.querySelector(
                    "#header .header_bottom"
                  ).style.display = "flex"),
                document.body.classList.remove("sidebar--open"));
          });
    }
    onChange() {
      const searchTerm = this.input.value.trim();
      if (!searchTerm.length) {
        this.close();
        return;
      }
      this.getSearchResults(searchTerm);
    }
    getSearchResults(searchTerm) {
      fetch(
        `/search/suggest?q=${searchTerm}&resources[type]=product&resources[limit]=10&section_id=predictive-search`
      )
        .then((response) => {
          if (!response.ok) {
            var error = new Error(response.status);
            throw (this.close(), error);
          }
          return response.text();
        })
        .then((text) => {
          const resultsMarkup = new DOMParser()
            .parseFromString(text, "text/html")
            .querySelector("#shopify-section-predictive-search").innerHTML;
          (this.predictiveSearchResults.innerHTML = resultsMarkup), this.open();
        })
        .catch((error) => {
          throw (this.close(), error);
        });
    }
    open() {
      this.predictiveSearchResults.style.display = "block";
    }
    close() {
      this.predictiveSearchResults.style.display = "none";
    }
    debounce(fn, wait) {
      let t;
      return (...args) => {
        clearTimeout(t), (t = setTimeout(() => fn.apply(this, args), wait));
      };
    }
    closeSearchOverlay() {
      this.heroSection && (this.heroSection.style.display = "block"),
        (this.mainContentWrapper.style.display = "block"),
        this.mobileSearchOverlay.classList.remove("opened"),
        document
          .querySelector("body")
          .classList.remove("search-overlay-opened");
    }
  }
  customElements.define("predictive-search", PredictiveSearch);
}
//# sourceMappingURL=/cdn/shop/t/140/assets/predictive-search.js.map?v=106162162671370216011712244225
