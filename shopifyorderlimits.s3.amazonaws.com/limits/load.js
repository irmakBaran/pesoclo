!(function (e, i) {
  if (!e.minMaxify) {
    console.error(
      "minmaxify-head.liquid is not rendered as expected. Please re-publish the limits to make them loaded faster and more reliably."
    );
    var a = i.createElement("script");
    (a.src =
      "https://shopifyorderlimits.s3.amazonaws.com/limits/" + e.Shopify.shop),
      i.head.appendChild(a);
  }
})(window, document);
