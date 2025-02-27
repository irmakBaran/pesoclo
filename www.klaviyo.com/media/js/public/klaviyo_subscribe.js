var KlaviyoSubscribe = KlaviyoSubscribe || {};
(function () {
  if (!KlaviyoSubscribe._loaded) {
    KlaviyoSubscribe._loaded = !0;
    var m = {
        "modal.html":
          '<div class="klaviyo_modal" style="display:none;"><div class="klaviyo_inner"><a href="#" class="klaviyo_close_modal klaviyo_header_close">&times;</a><form action="" method="POST" novalidate="novalidate" class="klaviyo_subscription_form"><input type="hidden" name="g" value="" /><p class="klaviyo_header"></p><p class="klaviyo_subheader"></p><div class="klaviyo_fieldset"></div><div class="klaviyo_fine_print"></div><div class="klaviyo_form_actions"><button type="submit" class="klaviyo_submit_button"><span></span></button></div><div class="klaviyo_below_submit"></div><div class="error_message" style="display:none;"></div></form><div class="success_message" style="display:none;"></div></div></div>',
        "flyout.html":
          '<div class="klaviyo_flyout" style="display:none;"><div class="klaviyo_inner"><div class="klaviyo_topbar" /><a href="#" class="klaviyo_close_flyout klaviyo_header_close">&times;</a><p class="klaviyo_header"></p><p class="klaviyo_subheader"></p><div class="klaviyo_flyout_action"><a href="#"><span /> &raquo;</a></div></div></div>',
        "flyout_form.html":
          '<div class="klaviyo_flyout" style="display:none;"><div class="klaviyo_inner"><div class="klaviyo_topbar" /><a href="#" class="klaviyo_close_flyout klaviyo_header_close">&times;</a><form action="" method="POST" novalidate="novalidate" class="klaviyo_subscription_form"><input type="hidden" name="g" value="" /><p class="klaviyo_header"></p><p class="klaviyo_subheader"></p><div class="klaviyo_inline_fieldset"><input type="email" name="email" placeholder="Your email address" /><button type="submit" class="klaviyo_submit_button"><span></span></button></div><div class="error_message" style="display:none;"></div></form><div class="success_message" style="display:none;"></div></div></div>',
      },
      n =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      p = {
        $email: "Email Address",
        $first_name: "First Name",
        $last_name: "Last Name",
      },
      h = "klaClosedPopup";
    KlaviyoSubscribe._debug = -1 < document.location.hash.indexOf("#test");
    KlaviyoSubscribe.has_called_bootstrap = !1;
    KlaviyoSubscribe.is_requirements_loaded = !1;
    KlaviyoSubscribe.bootstrap_queue = [];
    KlaviyoSubscribe.bootstrap_attempts = 0;
    KlaviyoSubscribe.instances = {};
    KlaviyoSubscribe.isDebugMode = function () {
      return KlaviyoSubscribe._debug;
    };
    KlaviyoSubscribe.bootstrap = function (a) {
      KlaviyoSubscribe.has_called_bootstrap ||
        ((KlaviyoSubscribe.has_called_bootstrap = !0),
        KlaviyoSubscribe.loadCss(
          "//a.klaviyo.com/media/css/public/klaviyo_subscribe.css"
        ),
        KlaviyoSubscribe.fetchRequirements(a));
    };
    KlaviyoSubscribe.setHasClosedModalCookieName = function (a) {
      h = a || h;
    };
    KlaviyoSubscribe.loadScript = function (a, b, c) {
      var d = document.getElementsByTagName("head")[0],
        e = document.createElement("script");
      e.type = "text/javascript";
      e.src = a;
      d.appendChild(e);
      KlaviyoSubscribe.log("Loaded JS", a);
      KlaviyoSubscribe.whenTrue(b, c);
    };
    KlaviyoSubscribe.loadCss = function (a) {
      var b = document.getElementsByTagName("head")[0],
        c = document.createElement("link");
      c.rel = "stylesheet";
      c.type = "text/css";
      c.href = a;
      b.appendChild(c);
      KlaviyoSubscribe.log("Loaded CSS", a);
    };
    KlaviyoSubscribe.injectCSS = function (a) {
      var b = document.getElementsByTagName("head")[0],
        c = document.createElement("style");
      c.type = "text/css";
      c.styleSheet
        ? (c.styleSheet.cssText = a)
        : c.appendChild(document.createTextNode(a));
      b.appendChild(c);
    };
    KlaviyoSubscribe.whenTrue = function (a, b) {
      var c = 0,
        d = function () {
          a() ? b() : (c++, 100 > c && setTimeout(d, 200));
        };
      d();
    };
    KlaviyoSubscribe.loadJQuery = function (a) {
      KlaviyoSubscribe.loadScript(
        "//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js",
        function () {
          return !!window.jQuery;
        },
        a
      );
    };
    KlaviyoSubscribe.loadJQueryForm = function (a) {
      KlaviyoSubscribe.loadScript(
        "//cdnjs.cloudflare.com/ajax/libs/jquery.form/3.32/jquery.form.min.js",
        function () {
          return (
            !!window.jQuery && jQuery.fn.ajaxForm && jQuery.fn.formSerialize
          );
        },
        a
      );
    };
    KlaviyoSubscribe.fetchRequirements = function (a) {
      document.getElementsByTagName("head");
      a = a || {};
      if (window.jQuery)
        jQuery.fn.ajaxForm
          ? KlaviyoSubscribe.processQueue()
          : KlaviyoSubscribe.loadJQueryForm(KlaviyoSubscribe.processQueue);
      else {
        var b = function () {
          KlaviyoSubscribe.log("jQuery loaded.");
          KlaviyoSubscribe.loadJQueryForm(KlaviyoSubscribe.processQueue);
        };
        !0 === a.assume_jquery
          ? KlaviyoSubscribe.whenTrue(function () {
              return !!window.jQuery;
            }, b)
          : KlaviyoSubscribe.loadJQuery(b);
      }
    };
    KlaviyoSubscribe.processQueue = function () {
      var a,
        b = function () {
          for (
            KlaviyoSubscribe.log("Processing queue.");
            (a = KlaviyoSubscribe.bootstrap_queue.shift());

          )
            a();
          KlaviyoSubscribe.bootstrap_queue.push = function (a) {
            a();
          };
        };
      KlaviyoSubscribe.log("Waiting for DOM to process queue.");
      jQuery(b);
      setTimeout(b, 5e3);
    };
    KlaviyoSubscribe.executeWhenRequirementsLoaded = function (a) {
      KlaviyoSubscribe.bootstrap_queue.push(a);
    };
    KlaviyoSubscribe.watchField = function (a, b, c) {
      c = c || {};
      c.type = c.type || "text";
      if ("email" === b || "$email" === b) c.type = "email";
      KlaviyoSubscribe.bootstrap();
      KlaviyoSubscribe.executeWhenRequirementsLoaded(function () {
        KlaviyoSubscribe.log("Watching field", a, jQuery(a).length);
        var d = function (a) {
          a = jQuery.trim($(a.target).val());
          KlaviyoSubscribe.log("Watch field value", a);
          if ("email" !== c.type || n.test(a)) {
            if (window._learnq && _learnq.push) {
              var d = {};
              d[b] = a;
              _learnq.push(["identify", d]);
            }
            c.callback && c.callback(b, a);
          }
        };
        if (c.delegate) jQuery(c.delegate).on("change blur", a, d);
        else jQuery(a).on("change blur", d);
      });
    };
    KlaviyoSubscribe.watchFormSubmission = function (a, b) {
      b = b || {};
      b.properties = b.properties || {};
      b.list &&
        (KlaviyoSubscribe.bootstrap(),
        KlaviyoSubscribe.executeWhenRequirementsLoaded(function () {
          if (b.properties) {
            var c = [];
            jQuery.each(b.properties, function (a, b) {
              c.push(a);
            });
            c.length && (b.properties.$fields = c.join(","));
          }
          KlaviyoSubscribe.log("Watching form", a, jQuery(a).length);
          var d = function (a) {
            var c = $(a.target);
            if (window._learnq && _learnq.identify) {
              var d = _learnq.identify();
              if (d && (d = d.$email || d.email)) {
                if (b.if) {
                  var e = jQuery(b.if);
                  if (
                    !e.length ||
                    (e.is(":checkbox") ? !e.is(":checked") : !e.val())
                  ) {
                    KlaviyoSubscribe.log("Subscribe if fails", e);
                    return;
                  }
                }
                d = jQuery.extend({ g: b.list, email: d }, b.properties);
                KlaviyoSubscribe.log("Subscribing", d);
                $.post(
                  "//manage.kmail-lists.com/ajax/subscriptions/subscribe",
                  d
                );
                KlaviyoSubscribe._logMetric("submitModal", b.list);
                b.wait_seconds &&
                  (a.preventDefault(),
                  setTimeout(function () {
                    KlaviyoSubscribe.log("Submitting form", c);
                    c.get(0).submit();
                  }, 1e3 * b.wait_seconds));
              }
            }
          };
          if (b.delegate) jQuery(b.delegate).on("submit", a, d);
          else jQuery(a).on("submit", d);
        }));
    };
    KlaviyoSubscribe.attachToForms = function (a, b) {
      b = b || {};
      var c = b.extra_properties || {};
      c.$source = c.$source || "$embed";
      KlaviyoSubscribe.bootstrap();
      KlaviyoSubscribe.executeWhenRequirementsLoaded(function () {
        KlaviyoSubscribe.log("Attaching to forms", a, jQuery(a).length);
        jQuery(a).each(function () {
          var a = jQuery(this),
            e = a.data("ajax-submit");
          e || (e = "//manage.kmail-lists.com/ajax/subscriptions/subscribe");
          a.ajaxForm({
            url: e,
            type: "POST",
            beforeSubmit: function (b, d, e) {
              try {
                if (!KlaviyoSubscribe.isFormValid(a)) return !1;
              } catch (k) {
                return (
                  KlaviyoSubscribe.log(k),
                  a.find(".error_message").show().html(k),
                  a.trigger("klaviyo.subscribe.error"),
                  !1
                );
              }
              KlaviyoSubscribe.log("$source", c.$source);
              KlaviyoSubscribe.normalizeFormFields(b, a, c, e);
              KlaviyoSubscribe._logMetric(
                "submitModal",
                b.find(function (a) {
                  return "g" === a.name;
                }).value
              );
              a.find(".klaviyo_submit_button").attr("disabled", !0);
            },
            success: function (c, d, e) {
              a.find(".success_message, .error_message").hide();
              a.find(".klaviyo_submit_button").attr("disabled", !1);
              c.success
                ? (KlaviyoSubscribe.setClosedModalCookie(),
                  (d = a.find(".success_message").show()),
                  d.length || (d = a.parent().find(".success_message").show()),
                  window._learnq &&
                    _learnq.push &&
                    (e = a.find('[name="email"]').val()) &&
                    (_learnq.push(["identify", { $email: e }]),
                    _learnq.push(["trackActivity"])),
                  b.success_url
                    ? (window.location = b.success_url)
                    : (!0 !== b.custom_success_message &&
                        d
                          .html(
                            b.success_message ||
                              '<div class="klaviyo_header">Thanks for subscribing!</div><div class="klaviyo_subheader">Check your email for a confirmation message.</div>'
                          )
                          .end(),
                      !0 === b.hide_form_on_success &&
                        (a
                          .find(
                            ".klaviyo_field_group input, .klaviyo_form_actions"
                          )
                          .hide(),
                        a.is(".klaviyo_horizontal_form") &&
                          a.find(".klaviyo_field_group").hide()),
                      b.success && b.success(a, c.data),
                      a.trigger("klaviyo.subscribe.success").resetForm()))
                : (KlaviyoSubscribe.log(c.errors),
                  a.find(".error_message").show().html(c.errors.join(" ")),
                  a.trigger("klaviyo.subscribe.error"));
            },
          });
          KlaviyoSubscribe.log("Attached to form", this);
        });
      });
    };
    KlaviyoSubscribe.attachModalSignUp = function (a) {
      a = a || {};
      a.pages = a.pages || [];
      a.excluded_pages = a.excluded_pages || [];
      a.delay_seconds = a.delay_seconds || 0.1;
      a.delay_num_pages = a.delay_num_pages || 0;
      a.content = a.content || {};
      a.extra_properties = a.extra_properties || {};
      a.extra_properties.$source = a.extra_properties.$source || "$modal";
      a.list &&
        (KlaviyoSubscribe.bootstrap(),
        KlaviyoSubscribe.setHasClosedModalCookieName(
          a.has_closed_modal_cookie_name
        ),
        KlaviyoSubscribe.executeWhenRequirementsLoaded(function () {
          var b = KlaviyoSubscribe._buildModalSignUp(a);
          b.find('[name="g"]').val(a.list);
          b.appendTo(jQuery("body"));
          KlaviyoSubscribe.attachToModalForm(b, {
            list: a.list,
            pages: a.pages,
            excluded_pages: a.excluded_pages,
            delay: a.delay_seconds,
            delay_num_pages: a.delay_num_pages,
            ignore_cookie: a.ignore_cookie,
            extra_properties: a.extra_properties,
            custom_success_message: !!a.content.success,
            success_url: a.success_url,
            success: function (b) {
              b.hide();
              a.success && a.success(b);
            },
          });
        }));
    };
    KlaviyoSubscribe._buildModalSignUp = function (a) {
      var b = a.content;
      b.fields = b.extra_fields || [];
      -1 === jQuery.inArray("$email", b.fields) && b.fields.unshift("$email");
      if (b.element) return jQuery(b.element);
      var c = jQuery(m["modal.html"])
        .attr("id", "k_id_modal")
        .find(".klaviyo_header")
        .html(b.header || "Interested in our Newsletter?")
        .end()
        .find(".klaviyo_subscription_form")
        .attr(
          "action",
          a.subscribe_url || "//manage.kmail-lists.com/subscriptions/subscribe"
        )
        .data(
          "ajax-submit",
          a.ajax_subscribe_url ||
            "//manage.kmail-lists.com/ajax/subscriptions/subscribe"
        )
        .end()
        .find(".klaviyo_submit_button span")
        .html(b.button || "Subscribe")
        .end();
      b.clazz && c.addClass(b.clazz);
      b.styles && KlaviyoSubscribe.injectCSS(b.styles);
      !1 !== b.subheader &&
        c
          .find(".klaviyo_subheader")
          .html(b.subheader || "Stay in the know with news and promotions.");
      b.below_submit
        ? c.find(".klaviyo_below_submit").html(b.below_submit)
        : c.find(".klaviyo_below_submit").hide();
      b.success && c.find(".success_message").html(b.success);
      !0 === a.ack &&
        c.append(
          jQuery(
            '<div class="klaviyo_ack"><a href="http://www.klaviyo.com/?utm_campaign=pbk">Powered by Klaviyo</a></div>'
          )
        );
      var d = c.find(".klaviyo_fieldset");
      jQuery.each(b.fields, function (a, b) {
        "string" === typeof b && (b = { name: b });
        b.type || (b.type = "$email" === b.name ? "email" : "text");
        b.label || (b.label = p[b.name] || b.name);
        a = "k_id_modal_" + b.name;
        d.append(
          jQuery('<div class="klaviyo_field_group" />')
            .append(jQuery("<label />").attr("for", a).html(b.label))
            .append(
              jQuery("<input />").attr({
                type: b.type,
                id: a,
                name: "$" === b.name[0] ? b.name.slice(1) : b.name,
              })
            )
        );
      });
      a = b.fine_print || "";
      b.email_frequency &&
        (a +=
          " Our newsletter is delivered to your inbox " +
          b.email_frequency +
          ".");
      c.find(".klaviyo_fine_print").html(a);
      return c;
    };
    KlaviyoSubscribe.attachToModalForm = function (a, b) {
      b = b || {};
      b.pages = b.pages || [];
      b.excluded_pages = b.excluded_pages || [];
      b.extra_properties = b.extra_properties || {};
      b.extra_properties.$source = b.extra_properties.$source || "$modal";
      void 0 === b.delay_seconds &&
        (b.delay_seconds = void 0 === b.delay ? 2 : b.delay);
      KlaviyoSubscribe.bootstrap();
      KlaviyoSubscribe.setHasClosedModalCookieName(
        b.has_closed_modal_cookie_name
      );
      KlaviyoSubscribe.executeWhenRequirementsLoaded(function () {
        var c = jQuery(a);
        KlaviyoSubscribe.attachToForms(
          jQuery(a).find(".klaviyo_subscription_form"),
          b
        );
        c.delegate(".klaviyo_close_modal", "click", function (a) {
          a.preventDefault();
          c.hide();
          KlaviyoSubscribe.setClosedModalCookie();
          KlaviyoSubscribe._logMetric("closeModal", b.list);
        });
        c.click(function (a) {
          a.currentTarget === a.target &&
            (c.hide(), KlaviyoSubscribe.setClosedModalCookie());
        });
        KlaviyoSubscribe._canShowElem(b) &&
          jQuery(function () {
            setTimeout(function () {
              KlaviyoSubscribe._logMetric("openModal", b.list);
              c.fadeIn(1e3);
              c.trigger("klaviyo.modal.show");
            }, 1e3 * b.delay_seconds);
          });
      });
    };
    KlaviyoSubscribe.attachFlyoutSignUp = function (a) {
      a = a || {};
      a.pages = a.pages || [];
      a.excluded_pages = a.excluded_pages || [];
      a.delay_scroll = void 0 === a.delay_scroll ? 50 : a.delay_scroll;
      a.delay_seconds = a.delay_seconds || 0.1;
      a.delay_num_pages = a.delay_num_pages || 0;
      a.position = a.position || "right";
      a.content = a.content || {};
      a.extra_properties = a.extra_properties || {};
      a.extra_properties.$source = a.extra_properties.$source || "$flyout";
      void 0 === a.modal_content && (a.modal_content = a.content);
      a.list &&
        (KlaviyoSubscribe.bootstrap(),
        KlaviyoSubscribe.setHasClosedModalCookieName(
          a.has_closed_modal_cookie_name
        ),
        KlaviyoSubscribe.executeWhenRequirementsLoaded(function () {
          var b = !1 === a.modal_content,
            c = KlaviyoSubscribe._buildFlyoutSignUp(
              jQuery.extend({ include_form: b }, a)
            );
          c.appendTo(jQuery("body"));
          if (b) {
            var d = a.success;
            a.success = function (a) {
              a.hide();
              KlaviyoSubscribe.setClosedModalCookie();
              d && d(a);
            };
            a.custom_success_message = !!a.content.success;
            c.find('[name="g"]').val(a.list);
            KlaviyoSubscribe.attachToForms(
              c.find(".klaviyo_subscription_form"),
              a
            );
          }
          KlaviyoSubscribe.attachToFlyout(c, {
            list: a.list,
            pages: a.pages,
            excluded_pages: a.excluded_pages,
            delay: a.delay_seconds,
            delay_scroll: a.delay_scroll,
            delay_num_pages: a.delay_num_pages,
            position: a.position,
            ignore_cookie: a.ignore_cookie,
            extra_properties: a.extra_properties,
            click: function (b) {
              b = KlaviyoSubscribe._buildModalSignUp({
                content: a.modal_content,
              });
              b.find('[name="g"]').val(a.list);
              b.appendTo(jQuery("body"));
              KlaviyoSubscribe.attachToModalForm(b, {
                list: a.list,
                delay: 0.01,
                extra_properties: a.extra_properties,
                success_url: a.success_url,
                success: function (b) {
                  b.hide();
                  a.success && a.success(b);
                },
              });
            },
          });
        }));
    };
    KlaviyoSubscribe._buildFlyoutSignUp = function (a) {
      var b = a.content;
      if (b.element) return jQuery(b.element);
      var c = jQuery(m[a.include_form ? "flyout_form.html" : "flyout.html"])
        .attr("id", "k_id_flyout")
        .find(".klaviyo_header")
        .html(b.header || "Interested in our Newsletter?")
        .end()
        .find(".klaviyo_subscription_form")
        .attr(
          "action",
          a.subscribe_url || "//manage.kmail-lists.com/subscriptions/subscribe"
        )
        .data(
          "ajax-submit",
          a.ajax_subscribe_url ||
            "//manage.kmail-lists.com/ajax/subscriptions/subscribe"
        )
        .end()
        .find(".klaviyo_flyout_action a span, .klaviyo_submit_button span")
        .html(b.button || "Subscribe")
        .end();
      c.addClass("klaviyo_" + a.position);
      b.clazz && c.addClass(b.clazz);
      b.styles && KlaviyoSubscribe.injectCSS(b.styles);
      !1 !== b.subheader &&
        c
          .find(".klaviyo_subheader")
          .html(b.subheader || "Stay in the know with news and promotions.");
      b.success && c.find(".success_message").html(b.success);
      !0 === a.ack &&
        c
          .find(".klaviyo_inner")
          .append(
            jQuery(
              '<div class="klaviyo_ack"><a href="http://www.klaviyo.com/?utm_campaign=pbk">Powered by Klaviyo</a></div>'
            )
          );
      return c;
    };
    KlaviyoSubscribe.attachToFlyout = function (a, b) {
      b = b || {};
      b.pages = b.pages || [];
      b.excluded_pages = b.excluded_pages || [];
      b.position = b.position || "right";
      b.extra_properties = b.extra_properties || {};
      b.extra_properties.$source = b.extra_properties.$source || "$flyout";
      KlaviyoSubscribe.bootstrap();
      KlaviyoSubscribe.setHasClosedModalCookieName(
        b.has_closed_modal_cookie_name
      );
      KlaviyoSubscribe.executeWhenRequirementsLoaded(function () {
        var c = jQuery(a);
        c.delegate(".klaviyo_close_flyout", "click", function (a) {
          a.preventDefault();
          c.hide();
          KlaviyoSubscribe.setClosedModalCookie();
          KlaviyoSubscribe._logMetric("closeModal", b.list);
        });
        c.find(".klaviyo_flyout_action a").click(function (a) {
          a.preventDefault();
          c.hide();
          b.click && b.click();
        });
        KlaviyoSubscribe._canShowElem(b) &&
          jQuery(function () {
            var a = b.delay_scroll,
              e = function () {
                if (!c.data("opened")) {
                  var a = b.delay_seconds || b.delay;
                  void 0 === a && (a = 2);
                  setTimeout(function () {
                    if (!c.data("opened")) {
                      c.data("opened", !0);
                      c.trigger("klaviyo.flyout.show");
                      var a = c.find(".klaviyo_inner"),
                        d =
                          -1 <
                          jQuery.inArray(b.position, [
                            "left",
                            "right",
                            "bottom",
                            "top",
                          ])
                            ? b.position
                            : "right",
                        e = {},
                        g;
                      e[d] = 0;
                      c.css("visibility", "hidden").show();
                      KlaviyoSubscribe._logMetric("openModal", b.list);
                      "left" === d
                        ? (g = 1.2 * -a.width())
                        : "right" === d
                        ? (g = 1.2 * -a.width())
                        : "top" === d
                        ? (g = 1.2 * -a.height())
                        : "bottom" === d && (g = 1.2 * -a.height());
                      a.css(d, g);
                      c.css("visibility", "visible");
                      a.animate(e, 1e3 * (b.slide_seconds || 2));
                    }
                  }, 1e3 * a);
                }
              };
            if (!1 === a || 0 === a) e();
            else {
              var f = jQuery(document),
                q = jQuery(window),
                g = "bottom" === a ? 95 : a,
                k = function () {
                  var a = f.height() - q.height();
                  (0 > a ? 100 : (100 * f.scrollTop()) / a) > g &&
                    (e(), f.unbind("scroll", k));
                };
              f.scroll(k);
            }
          });
      });
    };
    KlaviyoSubscribe.isFormValid = function (a) {
      var b = a.find('[name="email"]').val();
      if (!b || !/@/.test(b))
        throw (
          (KlaviyoSubscribe.log("Invalid email address"),
          "Invalid email address")
        );
      a.find('input[required="true"], select[required="true"]').each(function (
        b,
        d
      ) {
        d = jQuery(d);
        if (d.is(":radio") || d.is(":checked")) {
          has_value = !!a.find('[name="' + d.attr("name") + '"]:checked')
            .length;
          if (!has_value)
            throw (
              (KlaviyoSubscribe.log("Required field missing", d.attr("name")),
              "Required field missing: " + d.attr("name"))
            );
          return has_value;
        }
        if (!d.val())
          throw (
            (KlaviyoSubscribe.log("Required field missing", d.attr("name")),
            "Required field missing: " + d.attr("name"))
          );
      });
      a.find(".select-date-widget").each(function (a, b) {
        b = jQuery(b);
        a = KlaviyoSubscribe._int(b.find('[name$="_day"]').val());
        var c = KlaviyoSubscribe._int(b.find('[name$="_month"]').val());
        b = KlaviyoSubscribe._int(b.find('[name$="_year"]').val());
        if (!(isNaN(a) || isNaN(c) || isNaN(b))) {
          switch (c) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
              if (1 <= a && 31 >= a) return;
            case 4:
            case 6:
            case 9:
            case 11:
              if (1 <= a && 30 >= a) return;
            case 2:
              if (1 <= a && a <= (b % 4 ? 28 : 29)) return;
          }
          KlaviyoSubscribe.log("Invalid date", b, c, a);
          throw "Invalid date";
        }
      });
      return !0;
    };
    KlaviyoSubscribe.normalizeFormFields = function (a, b, c, d) {
      a.push({
        name: "$timezone_offset",
        type: "text",
        value: this._getUtcOffset(),
      });
      var e = [],
        f;
      jQuery.each(c, function (b, c) {
        a.push({ name: b, type: "text", value: c });
        e.push(b);
      });
      e.length &&
        (jQuery.each(a, function (a, b) {
          if ("$fields" === b.name) return (f = b), !1;
        }),
        f
          ? (f.value += "," + e.join())
          : a.push({ name: "$fields", type: "text", value: e.join() }));
      b.find(".select-date-widget").each(function (b, c) {
        c = jQuery(c);
        var d = c.find('[name$="_day"]');
        b = c.find('[name$="_month"]');
        var e = c.find('[name$="_year"]');
        c = d.attr("name");
        var f = b.attr("name"),
          g = e.attr("name");
        d = KlaviyoSubscribe._int(d.val());
        var h = KlaviyoSubscribe._int(b.val());
        e = KlaviyoSubscribe._int(e.val());
        if (!(isNaN(d) || isNaN(h) || isNaN(e))) {
          for (b = 0; b < a.length; ) {
            var l = a[b];
            !l || (l.name !== c && l.name !== f && l.name !== g)
              ? b++
              : a.splice(b, 1);
          }
          a.push({
            name: c.replace("_day", ""),
            required: !0,
            type: "text",
            value: KlaviyoSubscribe._formatDate(e, h, d),
          });
        }
      });
    };
    KlaviyoSubscribe.isCurrentLocationInPatterns = function (a) {
      for (var b = location.toString(), c = 0, d = a.length; c < d; c++)
        if (KlaviyoSubscribe.patternMatchesUrl(a[c], b)) return !0;
      return !1;
    };
    KlaviyoSubscribe.patternMatchesUrl = function (a, b) {
      b = b.toLowerCase();
      if (a === b) return !0;
      if (-1 === a.indexOf("?")) {
        var c = b.indexOf("?");
        -1 !== c && (b = b.substring(0, c));
      }
      if (-1 === a.indexOf("*"))
        return (
          (a = a.replace(/\/$/, "")),
          "" === a && (a = "/"),
          (b = b.replace(/\/$/, "")),
          a === b
            ? !0
            : 0 === a.indexOf("/")
            ? ((b = KlaviyoSubscribe.parseDomain(b)),
              "" === a ? "/" === b : b === a)
            : !1
        );
      if (a === b) return !0;
      if (!a.length) return !1;
      c = a.replace(/[.+?|()\[\]{}\\]/g, "\\$&").replace(/\*/g, "(.*?)");
      c = /\/$/.test(c) ? "^" + c + "$" : "^" + c + "/?$";
      c = new RegExp(c, "i");
      return c.test(b)
        ? !0
        : a.indexOf("/")
        ? !1
        : c.test(KlaviyoSubscribe.parseDomain(b));
    };
    KlaviyoSubscribe.parseDomain = function (a) {
      return "/" + a.split("//")[1].split("/").splice(1).join("/");
    };
    KlaviyoSubscribe.incrPageViews = function () {
      var a = parseInt(KlaviyoSubscribe._getCookie("klaPages"), 10);
      isNaN(a) && (a = 0);
      a += 1;
      KlaviyoSubscribe._setCookie("klaPages", a, 31536e6);
      return a;
    };
    KlaviyoSubscribe.setClosedModalCookie = function () {
      KlaviyoSubscribe._setCookie(h, "1", 31536e6);
    };
    KlaviyoSubscribe.resetClosedModalCookie = function () {
      KlaviyoSubscribe._deleteCookie(h);
    };
    KlaviyoSubscribe.hasClosedModal = function () {
      return (
        !!KlaviyoSubscribe._getCookie(h) && !KlaviyoSubscribe.isDebugMode()
      );
    };
    KlaviyoSubscribe._setCookie = function (a, b, c) {
      c = new Date(new Date().getTime() + c);
      document.cookie = a + "=" + b + ";expires=" + c.toGMTString() + ";path=/";
    };
    KlaviyoSubscribe._getCookie = function (a) {
      return (a = new RegExp("(^|;)[ ]*" + a + "=([^;]*)").exec(
        document.cookie
      ))
        ? a[2]
        : "";
    };
    KlaviyoSubscribe._deleteCookie = function (a) {
      KlaviyoSubscribe._getCookie(a) && KlaviyoSubscribe._setCookie(a, "", -1);
    };
    KlaviyoSubscribe._getUtcOffset = function () {
      return new Date().getTimezoneOffset() / -60;
    };
    KlaviyoSubscribe._canShowElem = function (a) {
      return (a.delay_num_pages &&
        a.delay_num_pages > KlaviyoSubscribe.incrPageViews()) ||
        (a.pages.length &&
          !KlaviyoSubscribe.isCurrentLocationInPatterns(a.pages)) ||
        (a.excluded_pages.length &&
          KlaviyoSubscribe.isCurrentLocationInPatterns(a.excluded_pages))
        ? !1
        : a.ignore_cookie || !KlaviyoSubscribe.hasClosedModal();
    };
    KlaviyoSubscribe._int = function (a) {
      return parseInt(a, 10);
    };
    KlaviyoSubscribe._formatDate = function (a, b, c) {
      1 === c.toString().length && (c = "0" + c);
      1 === b.toString().length && (b = "0" + b);
      return a + "-" + b + "-" + c;
    };
    KlaviyoSubscribe.log = function () {
      window.console && console.log && console.log(arguments);
    };
    KlaviyoSubscribe._logMetric = function (a, b) {};
    Array.prototype.find ||
      Object.defineProperty(Array.prototype, "find", {
        value: function (a, b) {
          if (null == this)
            throw new TypeError('"this" is null or not defined');
          var c = Object(this),
            d = c.length >>> 0;
          if ("function" !== typeof a)
            throw new TypeError("predicate must be a function");
          for (var e = 0; e < d; ) {
            var f = c[e];
            if (a.call(b, f, e, c)) return f;
            e++;
          }
        },
      });
  }
})();
