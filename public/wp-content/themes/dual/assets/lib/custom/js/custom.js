// Vimeo Vieo Function
Dual_Vimeo();
function Dual_Vimeo() {
  /*! vimeo-jquery-api 2016-05-05 */
  !(function (a, b) {
    var c = {
        catchMethods: { methodreturn: [], count: 0 },
        init: function (b) {
          var c, d, e;
          b.originalEvent.origin.match(/vimeo/gi) &&
            "data" in b.originalEvent &&
            ((e =
              "string" === a.type(b.originalEvent.data)
                ? a.parseJSON(b.originalEvent.data)
                : b.originalEvent.data),
            e &&
              ((c = this.setPlayerID(e)),
              c.length &&
                ((d = this.setVimeoAPIurl(c)),
                e.hasOwnProperty("event") && this.handleEvent(e, c, d),
                e.hasOwnProperty("method") && this.handleMethod(e, c, d))));
        },
        setPlayerID: function (b) {
          return a("iframe[src*=" + b.player_id + "]");
        },
        setVimeoAPIurl: function (a) {
          return "http" !== a.attr("src").substr(0, 4)
            ? "https:" + a.attr("src").split("?")[0]
            : a.attr("src").split("?")[0];
        },
        handleMethod: function (a) {
          this.catchMethods.methodreturn.push(a.value);
        },
        handleEvent: function (b, c, d) {
          switch (b.event.toLowerCase()) {
            case "ready":
              for (var e in a._data(c[0], "events"))
                e.match(
                  /loadProgress|playProgress|play|pause|finish|seek|cuechange/
                ) &&
                  c[0].contentWindow.postMessage(
                    JSON.stringify({ method: "addEventListener", value: e }),
                    d
                  );
              if (c.data("vimeoAPICall")) {
                for (var f = c.data("vimeoAPICall"), g = 0; g < f.length; g++)
                  c[0].contentWindow.postMessage(
                    JSON.stringify(f[g].message),
                    f[g].api
                  );
                c.removeData("vimeoAPICall");
              }
              c.data("vimeoReady", !0), c.triggerHandler("ready");
              break;
            case "seek":
              c.triggerHandler("seek", [b.data]);
              break;
            case "loadprogress":
              c.triggerHandler("loadProgress", [b.data]);
              break;
            case "playprogress":
              c.triggerHandler("playProgress", [b.data]);
              break;
            case "pause":
              c.triggerHandler("pause");
              break;
            case "finish":
              c.triggerHandler("finish");
              break;
            case "play":
              c.triggerHandler("play");
              break;
            case "cuechange":
              c.triggerHandler("cuechange");
          }
        },
      },
      d = (a.fn.vimeoLoad = function () {
        var b = a(this).attr("src"),
          c = !1;
        if (
          ("https:" !== b.substr(0, 6) &&
            ((b =
              "http" === b.substr(0, 4) ? "https" + b.substr(4) : "https:" + b),
            (c = !0)),
          null === b.match(/player_id/g))
        ) {
          c = !0;
          var d = -1 === b.indexOf("?") ? "?" : "&",
            e = a.param({
              api: 1,
              player_id:
                "vvvvimeoVideo-" +
                Math.floor(1e7 * Math.random() + 1).toString(),
            });
          b = b + d + e;
        }
        return c && a(this).attr("src", b), this;
      });
    jQuery(document).ready(function () {
      a("iframe[src*='vimeo.com']").each(function () {
        d.call(this);
      });
    }),
      a([
        "loadProgress",
        "playProgress",
        "play",
        "pause",
        "finish",
        "seek",
        "cuechange",
      ]).each(function (b, d) {
        jQuery.event.special[d] = {
          setup: function () {
            var b = a(this).attr("src");
            if (a(this).is("iframe") && b.match(/vimeo/gi)) {
              var e = a(this);
              if ("undefined" != typeof e.data("vimeoReady"))
                e[0].contentWindow.postMessage(
                  JSON.stringify({ method: "addEventListener", value: d }),
                  c.setVimeoAPIurl(a(this))
                );
              else {
                var f =
                  "undefined" != typeof e.data("vimeoAPICall")
                    ? e.data("vimeoAPICall")
                    : [];
                f.push({ message: d, api: c.setVimeoAPIurl(e) }),
                  e.data("vimeoAPICall", f);
              }
            }
          },
        };
      }),
      a(b).on("message", function (a) {
        c.init(a);
      }),
      (a.vimeo = function (a, d, e) {
        var f = {},
          g = c.catchMethods.methodreturn.length;
        if (
          ("string" == typeof d && (f.method = d),
          void 0 !== typeof e && "function" != typeof e && (f.value = e),
          a.is("iframe") && f.hasOwnProperty("method"))
        )
          if (a.data("vimeoReady"))
            a[0].contentWindow.postMessage(
              JSON.stringify(f),
              c.setVimeoAPIurl(a)
            );
          else {
            var h = a.data("vimeoAPICall") ? a.data("vimeoAPICall") : [];
            h.push({ message: f, api: c.setVimeoAPIurl(a) }),
              a.data("vimeoAPICall", h);
          }
        return (
          ("get" !== d.toString().substr(0, 3) && "paused" !== d.toString()) ||
            "function" != typeof e ||
            (!(function (a, d, e) {
              var f = b.setInterval(function () {
                c.catchMethods.methodreturn.length != a &&
                  (b.clearInterval(f), d(c.catchMethods.methodreturn[e]));
              }, 10);
            })(g, e, c.catchMethods.count),
            c.catchMethods.count++),
          a
        );
      }),
      (a.fn.vimeo = function (b, c) {
        return a.vimeo(this, b, c);
      });
  })(jQuery, window);
}

// global variable for the action
var action = [];
var iframe = document.getElementsByClassName("video-main-wraper");
var src;
var ratio_class;

Dual_Video();
Dual_Video("video-main-wraper-2");
function Dual_Video(
  VideoWraperClass = "",
  youtubeClass = "twp-iframe-video-youtube"
) {
  if (VideoWraperClass) {
    iframe = document.getElementsByClassName(VideoWraperClass);
  }

  Array.prototype.forEach.call(iframe, function (el) {
    // Do stuff here
    var id = el.getAttribute("data-id");
    var autoplay = el.getAttribute("data-autoplay");
    if (autoplay == "autoplay-enable") {
      autoplay = 1;
    } else {
      autoplay = 0;
    }
    jQuery(document).ready(function ($) {
      "use strict";

      src = $(el).find("iframe").attr("src");

      if (src) {
        if (src.indexOf("youtube.com") != -1) {
          $(el).find("iframe").attr("width", "");
          $(el).find("iframe").attr("height", "");
          $(el).find("iframe").attr("id", id);
          $(el).find("iframe").addClass(youtubeClass);
          if (autoplay) {
            $(el)
              .find("iframe")
              .attr(
                "src",
                src +
                  "&enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=0&autohide=0&showinfo=0&controls=0&loop=1"
              );
          } else {
            $(el)
              .find("iframe")
              .attr("src", src + "&enablejsapi=1");
          }
        }

        if (src.indexOf("vimeo.com") != -1) {
          $(el).find("iframe").attr("id", id);
          $(el).find("iframe").addClass("twp-iframe-video-vimeo");

          if (autoplay) {
            $(el)
              .find("iframe")
              .attr(
                "src",
                src +
                  "&title=0&byline=0&portrait=0&transparent=0&autoplay=1&controls=0&loop=1"
              );
          } else {
            $(el)
              .find("iframe")
              .attr(
                "src",
                src +
                  "&title=0&byline=0&portrait=0&transparent=0&autoplay=0&controls=0&loop=1"
              );
          }

          $(el).find("iframe").attr("allow", "autoplay;");

          var player = document.getElementById(id);
          $(player).vimeo("setVolume", 0);

          $("#" + id)
            .closest(".entry-video")
            .find(".twp-mute-unmute")
            .on("click", function () {
              if ($(this).hasClass("unmute")) {
                $(player).vimeo("setVolume", 1);
                $(this).removeClass("unmute");
                $(this).addClass("mute");

                $(this).find(".twp-video-control-action").empty();
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.unmute);
                $(this)
                  .find(".screen-reader-text")
                  .html(dual_custom.unmute_text);
              } else if ($(this).hasClass("mute")) {
                $(player).vimeo("setVolume", 0);
                $(this).removeClass("mute");
                $(this).addClass("unmute");
                $(this).find(".twp-video-control-action").empty();
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.mute);
              }
            });

          $("#" + id)
            .closest(".entry-video")
            .find(".twp-pause-play")
            .on("click", function () {
              if ($(this).hasClass("play")) {
                $(player).vimeo("play");

                $(this).removeClass("play");
                $(this).addClass("pause");
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.pause);
                $(this)
                  .find(".screen-reader-text")
                  .html(dual_custom.pause_text);
              } else if ($(this).hasClass("pause")) {
                $(player).vimeo("pause");
                $(this).removeClass("pause");
                $(this).addClass("play");
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.play);
                $(this).find(".screen-reader-text").html(dual_custom.play_text);
              }
            });
        }
      } else {
        var currentVideo;

        $(el).find("video").attr("loop", "loop");
        $(el).find("video").attr("autoplay", "autoplay");
        $(el).find("video").removeAttr("controls");
        $(el).find("video").attr("id", id);

        $("#" + id)
          .closest(".entry-video")
          .find(".twp-mute-unmute")
          .on("click", function () {
            if ($(this).hasClass("unmute")) {
              currentVideo = document.getElementById(id);
              $(currentVideo).prop("muted", false);

              $(this).removeClass("unmute");
              $(this).addClass("mute");
              $(this)
                .find(".twp-video-control-action")
                .html(dual_custom.unmute);
              $(this).find(".screen-reader-text").html(dual_custom.unmute_text);
            } else if ($(this).hasClass("mute")) {
              currentVideo = document.getElementById(id);
              $(currentVideo).prop("muted", true);
              $(this).removeClass("mute");
              $(this).addClass("unmute");
              $(this).find(".twp-video-control-action").html(dual_custom.mute);
            }
          });

        if (autoplay) {
          setTimeout(function () {
            if ($("#" + id).length) {
              currentVideo = document.getElementById(id);
              currentVideo.play();
            }
          }, 3000);
        }

        $("#" + id)
          .closest(".entry-video")
          .find(".twp-pause-play")
          .on("click", function () {
            if ($(this).hasClass("play")) {
              currentVideo = document.getElementById(id);
              currentVideo.play();

              $(this).removeClass("play");
              $(this).addClass("pause");
              $(this).find(".twp-video-control-action").html(dual_custom.pause);
              $(this).find(".screen-reader-text").html(dual_custom.pause_text);
            } else if ($(this).hasClass("pause")) {
              currentVideo = document.getElementById(id);
              currentVideo.pause();

              $(this).removeClass("pause");
              $(this).addClass("play");
              $(this).find(".twp-video-control-action").html(dual_custom.play);
              $(this).find(".screen-reader-text").html(dual_custom.play_text);
            }
          });
      }
    });
  });
}

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  jQuery(document).ready(function ($) {
    "use strict";

    DualYoutubeVideo(".twp-iframe-video-youtube");
  });
}

function DualYoutubeVideo(YTVideoClass = "") {
  $(YTVideoClass).each(function () {
    var id = $(this).attr("id");

    // create the global action from the specific iframe (#video)
    action[id] = new YT.Player(id, {
      events: {
        // call this function when action is ready to use
        onReady: function onReady() {
          var autoplay = $(this)
            .closest(".theme-video-panel")
            .attr("data-autoplay");
          if (autoplay == "autoplay-enable") {
            action[id].playVideo();
          }

          $("#" + id)
            .closest(".entry-video")
            .find(".twp-pause-play")
            .on("click", function () {
              var id = $(this).attr("attr-id");

              if ($(this).hasClass("play")) {
                action[id].playVideo();

                $(this).removeClass("play");
                $(this).addClass("pause");
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.pause);
                $(this)
                  .find(".screen-reader-text")
                  .html(dual_custom.pause_text);
              } else if ($(this).hasClass("pause")) {
                action[id].pauseVideo();
                $(this).removeClass("pause");
                $(this).addClass("play");
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.play);
                $(this).find(".screen-reader-text").html(dual_custom.play_text);
              }
            });

          $("#" + id)
            .closest(".entry-video")
            .find(".twp-mute-unmute")
            .on("click", function () {
              var id = $(this).attr("attr-id");
              if ($(this).hasClass("unmute")) {
                action[id].unMute();

                $(this).removeClass("unmute");
                $(this).addClass("mute");
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.unmute);
                $(this)
                  .find(".screen-reader-text")
                  .html(dual_custom.unmute_text);
              } else if ($(this).hasClass("mute")) {
                action[id].mute();
                $(this).removeClass("mute");
                $(this).addClass("unmute");
                $(this)
                  .find(".twp-video-control-action")
                  .html(dual_custom.mute);
                $(this).find(".screen-reader-text").html(dual_custom.mute_text);
              }
            });
        },
      },
    });
  });
}

// Inject YouTube API script
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function Dual_SetCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function Dual_GetCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

window.addEventListener("load", function () {
  jQuery(document).ready(function ($) {
    "use strict";

    $("body").addClass("page-loaded");

    var myCursor = jQuery(".theme-custom-cursor");
    if (myCursor.length) {
      if ($("body")) {
        const e = document.querySelector(".theme-cursor-secondary"),
          t = document.querySelector(".theme-cursor-primary");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on(
            "mouseenter",
            'a, button, input[type="submit"], .cursor-pointer',
            function () {
              e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
            }
          ),
          $("body").on(
            "mouseleave",
            'a, button, input[type="submit"], .cursor-pointer',
            function () {
              ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
                (e.classList.remove("cursor-hover"),
                t.classList.remove("cursor-hover"));
            }
          ),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
  });
});

jQuery(document).ready(function ($) {
  "use strict";

  // Hide Comments
  $(
    ".dual-no-comment .booster-block.booster-ratings-block, .dual-no-comment .comment-form-ratings, .dual-no-comment .twp-star-rating"
  ).hide();

  // Day Night Mode Start

  $(".navbar-day-night").on("click", function () {
    if ($(this).hasClass("navbar-day-on")) {
      $("html").removeClass("day-mode");
      $("html").addClass("night-mode");
      $(".navbar-day-night").addClass("navbar-night-on");
      $(".navbar-day-night").removeClass("navbar-day-on");
      $(".jl_en_day_night").addClass("options_dark_skin");
      $(".mobile_nav_class").addClass("wp-night-mode-on");

      Dual_SetCookie("DualNightDayMode", "true", 365);
    } else if ($(this).hasClass("navbar-night-on")) {
      $("html").addClass("day-mode");
      $("html").removeClass("night-mode");
      $(".navbar-day-night").addClass("navbar-day-on");
      $(".navbar-day-night").removeClass("navbar-night-on");
      $(".jl_en_day_night").removeClass("options_dark_skin");
      $(".mobile_nav_class").removeClass("wp-night-mode-on");

      Dual_SetCookie("DualNightDayMode", "false", 365);
    }
  });

  if (Dual_GetCookie("DualNightDayMode") == "true") {
    $("html").removeClass("day-mode");
    $("html").addClass("night-mode");
    $(".navbar-day-night ").removeClass("navbar-day-on");
    $(".navbar-day-night ").addClass("navbar-night-on");
  } else {
    $("html").removeClass("night-mode");
    $("html").addClass("day-mode");
    $(".navbar-day-night ").removeClass("navbar-night-on");
    $(".navbar-day-night ").addClass("navbar-day-on");
  }

  // Day Night Mode End

  $(".twp-archive-items").each(function () {
    $(this).removeClass("twp-archive-items");
  });

  // Hide pagination
  if ($("html").hasClass("js")) {
    $(".pagination-no-js").remove();
  }

  // Background
  var pageSection = $(".data-bg");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  $(".bg-image").each(function () {
    var src = $(this).children("img").attr("src");
    $(this)
      .css("background-image", "url(" + src + ")")
      .children("img")
      .hide();
  });

  // Scroll To
  $(".scroll-content").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#content").offset().top,
      },
      500
    );
  });

  // Rating disable
  if (dual_custom.single_post == 1 && dual_custom.dual_ed_post_reaction) {
    $(".tpk-single-rating").remove();
    $(".tpk-comment-rating-label").remove();
    $(".comments-rating").remove();
    $(".tpk-star-rating").remove();
  }
  // Add Class on article
  $(".theme-article.post").each(function () {
    $(this).addClass("theme-article-loaded");
  });

  // Aub Menu Toggle
  $(".submenu-toggle").click(function () {
    $(this).toggleClass("button-toggle-active");
    var currentClass = $(this).attr("data-toggle-target");
    $(currentClass).toggleClass("submenu-toggle-active");
    // $("body").addClass("body-scroll-locked");
  });

  // Toggle Search
  $(".navbar-control-search").click(function () {
    // $("body").addClass("body-scroll-locked");
    $(".header-searchbar").toggleClass("header-searchbar-active");

    $("#search-closer").focus();
  });

  // Header Search hide
  $("#search-closer").click(function () {
    $(".header-searchbar").removeClass("header-searchbar-active");
    setTimeout(function () {
      $(".navbar-control-search").focus();
    }, 300);
    // $("body").removeClass("body-scroll-locked");
  });

  // Focus on search input on search icon expand
  $(".navbar-control-search").click(function () {
    // $("body").addClass("body-scroll-locked");
    setTimeout(function () {
      $(".header-searchbar .search-field").focus();
    }, 300);
  });

  $(".skip-link-search-top").focus(function () {
    $(".skip-link-search-bottom-1").focus();
  });

  $(".skip-link-search-bottom-2").focus(function () {
    $("#search-closer").focus();
  });

  $(document).keyup(function (j) {
    if (j.key === "Escape") {
      // escape key maps to keycode `27`
      if ($(".header-searchbar").hasClass("header-searchbar-active")) {
        $(".header-searchbar").removeClass("header-searchbar-active");

        setTimeout(function () {
          $(".navbar-control-search").focus();
        }, 300);
        // $("body").removeClass("body-scroll-locked");
      }
    }
  });

  // Action On Esc Button
  $(document).keyup(function (j) {
    if (j.key === "Escape") {
      // escape key maps to keycode `27`

      if ($("#offcanvas-menu").hasClass("offcanvas-menu-active")) {
        $(".header-searchbar").removeClass("header-searchbar-active");
        $("#offcanvas-menu").removeClass("offcanvas-menu-active");
        $(".navbar-control-offcanvas").removeClass("active");
        $("html").removeAttr("style");

        setTimeout(function () {
          $(".navbar-control-offcanvas").focus();
        }, 300);
        // $("body").removeClass("body-scroll-locked");
      }
    }
  });

  // Toggle Menu
  $(".navbar-control-offcanvas").click(function () {
    $(this).addClass("active");
    // $("body").addClass("body-scroll-locked");
    $("#offcanvas-menu").toggleClass("offcanvas-menu-active");
    $(".button-offcanvas-close").focus();
  });

  // Offcanvas Close
  $(".offcanvas-close .button-offcanvas-close").click(function () {
    $("#offcanvas-menu").removeClass("offcanvas-menu-active");
    $(".navbar-control-offcanvas").removeClass("active");
    // $("body").removeClass("body-scroll-locked");

    setTimeout(function () {
      $(".navbar-control-offcanvas").focus();
    }, 300);
  });

  // Offcanvas re focus on close button
  $("input, a, button").on("focus", function () {
    if ($("#offcanvas-menu").hasClass("offcanvas-menu-active")) {
      if ($(this).hasClass("skip-link-off-canvas")) {
        if (!$("#offcanvas-menu #primary-nav-offcanvas").length == 0) {
          $(
            "#offcanvas-menu #primary-nav-offcanvas ul li:last-child a"
          ).focus();
        }
      }

      if ($(this).hasClass("skip-link-offcanvas")) {
        $(".button-offcanvas-close").focus();
      }
    }
  });

  var rtled = false;
  if ($("body").hasClass("rtl")) {
    rtled = true;
  }

  $(
    "figure.wp-block-gallery.has-nested-images.columns-1, .wp-block-gallery.columns-1 ul.blocks-gallery-grid, .gallery-columns-1"
  ).each(function () {
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: false,
      autoplaySpeed: 8000,
      infinite: true,
      nextArrow:
        '<button type="button" class="slide-btn slide-btn-bg slide-next-icon">' +
        dual_custom.next_svg +
        "</button>",
      prevArrow:
        '<button type="button" class="slide-btn slide-btn-bg slide-prev-icon">' +
        dual_custom.prev_svg +
        "</button>",
      dots: false,
      rtl: rtled,
    });
  });

  // Main banner

  $(".theme-banner-slider").each(function () {
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: true,
      autoplaySpeed: 8000,
      infinite: true,
      dots: false,
      arrows: false,
      asNavFor: ".theme-banner-slider-content",
    });
  });

  $(".theme-banner-slider-content").each(function () {
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".theme-banner-slider",
      dots: false,
      arrows: true,
      prevArrow: $(".slide-prev-1"),
      nextArrow: $(".slide-next-1"),
      focusOnSelect: true,
    });
  });

  $(".main-slider-content").each(function () {
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 8000,
      speed: 1000,
      infinite: true,
      dots: true,
      arrows: true,
      prevArrow: $(".theme-main-slider .prev"),
      nextArrow: $(".theme-main-slider .next"),
    });
  });

  var sliderClass = $(".theme-banner-slider-content");
  var slideCount = null;
  sliderClass.on("init", function (event, slick) {
    slideCount = slick.slideCount;
    dual_setSlideCount();
    setCurrentSlideNumber(slick.currentSlide);
  });

  sliderClass.on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      slideCount = slick.slideCount;
      setCurrentSlideNumber(nextSlide);
    }
  );

  function dual_setSlideCount() {
    var $el = $(".slide-count-wrap").find(".total");
    $el.text(slideCount);
  }

  function setCurrentSlideNumber(currentSlide) {
    var $el = $(".slide-count-wrap").find(".current");
    $el.text(currentSlide + 1);
  }

  var pageSection = $(".data-bg");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  // Masonry Grid
  if ($(".archive-layout-masonry").length > 0) {
    /*Default masonry animation*/
    var grid;
    var hidden = "scale(0.5)";
    var visible = "scale(1)";
    grid = $(".archive-layout-masonry").imagesLoaded(function () {
      grid.masonry({
        itemSelector: ".theme-article",
        hiddenStyle: {
          transform: hidden,
          opacity: 0,
        },
        visibleStyle: {
          transform: visible,
          opacity: 1,
        },
      });
    });
  }

  // Widget Tab
  $(".twp-nav-tabs .tab").on("click", function (event) {
    var tabid = $(this).attr("tab-data");
    $(this).closest(".tabbed-container").find(".tab").removeClass("active");
    $(this).addClass("active");
    $(this)
      .closest(".tabbed-container")
      .find(".tab-pane")
      .removeClass("active");
    $(".content-" + tabid).addClass("active");
  });

  // Scroll to Top on Click
  $(".to-the-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      700
    );
    return false;
  });
});

/*  -----------------------------------------------------------------------------------------------
    Intrinsic Ratio Embeds
--------------------------------------------------------------------------------------------------- */

var dual = dual || {},
  $ = jQuery;

var $dual_doc = $(document),
  $dual_win = $(window),
  viewport = {};
viewport.top = $dual_win.scrollTop();
viewport.bottom = viewport.top + $dual_win.height();

dual.instrinsicRatioVideos = {
  init: function () {
    dual.instrinsicRatioVideos.makeFit();

    $dual_win.on("resize fit-videos", function () {
      dual.instrinsicRatioVideos.makeFit();
    });
  },

  makeFit: function () {
    var vidSelector = "iframe, object, video";

    $(vidSelector).each(function () {
      var $dual_video = $(this),
        $dual_container = $dual_video.parent(),
        dual_iTargetWidth = $dual_container.width();

      // Skip videos we want to ignore
      if (
        $dual_video.hasClass("intrinsic-ignore") ||
        $dual_video.parent().hasClass("intrinsic-ignore")
      ) {
        return true;
      }

      if (!$dual_video.attr("data-origwidth")) {
        // Get the video element proportions
        $dual_video.attr("data-origwidth", $dual_video.attr("width"));
        $dual_video.attr("data-origheight", $dual_video.attr("height"));
      }

      // Get ratio from proportions
      var dual_ratio = dual_iTargetWidth / $dual_video.attr("data-origwidth");

      // Scale based on ratio, thus retaining proportions
      $dual_video.css("width", dual_iTargetWidth + "px");
      $dual_video.css(
        "height",
        $dual_video.attr("data-origheight") * dual_ratio + "px"
      );
    });
  },
};

$dual_doc.ready(function () {
  dual.instrinsicRatioVideos.init(); // Retain aspect ratio of videos on window resize
});

// cart toogle

let cartToogle = document.querySelectorAll(".navbar-control-cart");

if (cartToogle) {
  cartToogle.forEach(function (cartItem) {
    cartItem.addEventListener("click", function () {
      let parentElement = cartItem.parentElement;
      parentElement.classList.toggle("cart-active");
    });
  });
}

// toggle share

let archiveMainBlock = document.querySelector(".archive-main-block");

if (archiveMainBlock) {
  archiveMainBlock.addEventListener("click", (e) => {
    let mainContainer = e.target.closest(".post-content-share");
    if (mainContainer) {
      mainContainer.classList.toggle("active");
    }
  });
}
