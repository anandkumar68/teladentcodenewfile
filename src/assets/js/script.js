/*
Author       : webexpo
website      : www.webexpo.co.in
Version      : 1.0
*/

(function ($) {
  "use strict";

  // Stick Sidebar

  if ($(window).width() > 767) {
    if ($(".theiaStickySidebar").length > 0) {
      $(".theiaStickySidebar").theiaStickySidebar({
        // Settings
        additionalMarginTop: 30,
      });
    }
  }

  // Sidebar

  if ($(window).width() <= 991) {
    var Sidemenu = function () {
      this.$menuItem = $(".main-nav a");
    };

    function init() {
      var $this = Sidemenu;
      $(".main-nav a").on("click", function (e) {
        if ($(this).parent().hasClass("has-submenu")) {
          e.preventDefault();
        }
        if (!$(this).hasClass("submenu")) {
          $("ul", $(this).parents("ul:first")).slideUp(350);
          $("a", $(this).parents("ul:first")).removeClass("submenu");
          $(this).next("ul").slideDown(350);
          $(this).addClass("submenu");
        } else if ($(this).hasClass("submenu")) {
          $(this).removeClass("submenu");
          $(this).next("ul").slideUp(350);
        }
      });
    }

    // Sidebar Initiate
    init();
  }

  // Textarea Text Count

  var maxLength = 100;
  $("#review_desc").on("keyup change", function () {
    var length = $(this).val().length;
    length = maxLength - length;
    $("#chars").text(length);
  });

  // Select 2

  if ($(".select").length > 0) {
    $(".select").select({
      minimumResultsForSearch: -1,
      width: "100%",
    });
  }

  // Date Time Picker

  if ($(".datetimepicker").length > 0) {
    $(".datetimepicker").datetimepicker({
      format: "DD/MM/YYYY",
      icons: {
        up: "fas fa-chevron-up",
        down: "fas fa-chevron-down",
        next: "fas fa-chevron-right",
        previous: "fas fa-chevron-left",
      },
    });
  }

  // Floating Label
  $(document).ready(function () {
    if ($(".floating").length > 0) {
      $(".floating")
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-focus")
            .toggleClass(
              "focused",
              e.type === "focus" || this.value.length > 0
            );
        })
        .trigger("blur");
    }
  });

  // Mobile menu sidebar overlay

  $("body").append('<div class="sidebar-overlay"></div>');
  $(document).on("click", "#mobile_btn", function () {
    $("main-wrapper").toggleClass("slide-nav");
    $(".sidebar-overlay").toggleClass("opened");
    $("html").addClass("menu-opened");
    return false;
  });

  $(document).on("click", ".sidebar-overlay", function () {
    $("html").removeClass("menu-opened");
    $(this).removeClass("opened");
    $("main-wrapper").removeClass("slide-nav");
  });

  $(document).on("click", "#menu_close", function () {
    $("html").removeClass("menu-opened");
    $(".sidebar-overlay").removeClass("opened");
    $("main-wrapper").removeClass("slide-nav");
  });

  // Tooltip

  if ($('[data-toggle="tooltip"]').length > 0) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  // Add More Hours

  $(".hours-info").on("click", ".trash", function () {
    $(this).closest(".hours-cont").remove();
    return false;
  });

  $(".add-hours").on("click", function () {
    var hourscontent =
      '<div class="row form-row hours-cont">' +
      '<div class="col-12 col-md-10">' +
      '<div class="row form-row">' +
      '<div class="col-12 col-md-6">' +
      '<div class="form-group">' +
      "<label>Start Time</label>" +
      '<select class="form-control">' +
      "<option>-</option>" +
      "<option>12.00 am</option>" +
      "<option>12.30 am</option>" +
      "<option>1.00 am</option>" +
      "<option>1.30 am</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      '<div class="col-12 col-md-6">' +
      '<div class="form-group">' +
      "<label>End Time</label>" +
      '<select class="form-control">' +
      "<option>-</option>" +
      "<option>12.00 am</option>" +
      "<option>12.30 am</option>" +
      "<option>1.00 am</option>" +
      "<option>1.30 am</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="col-12 col-md-2"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
      "</div>";

    $(".hours-info").append(hourscontent);
    return false;
  });

  // Content div min height set

  function resizeInnerDiv() {
    var height = $(window).height();
    var header_height = $(".header").height();
    var footer_height = $(".footer").height();
    var setheight = height - header_height;
    var trueheight = setheight - footer_height;
    $(".content").css("min-height", trueheight);
  }

  if ($(".content").length > 0) {
    resizeInnerDiv();
  }

  $(window).resize(function () {
    if ($(".content").length > 0) {
      resizeInnerDiv();
    }
  });

  // Slick Slider

  if ($(".specialities-slider").length > 0) {
    $(".specialities-slider").slick({
      dots: true,
      autoplay: false,
      infinite: true,
      variableWidth: true,
      prevArrow: false,
      nextArrow: false,
    });
  }

  if ($(".doctor-slider").length > 0) {
    $(".doctor-slider").slick({
      dots: false,
      autoplay: false,
      infinite: true,
      variableWidth: true,
    });
  }
  if ($(".features-slider").length > 0) {
    $(".features-slider").slick({
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 3,
      speed: 500,
      variableWidth: true,
      arrows: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  // Slick Slider
  if ($(".features-slider1").length == 1) {
    $(".features-slider1").slick({
      dots: false,
      infinite: true,
      centerMode: false,
      slidesToShow: 1,
      speed: 500,
      variableWidth: true,
      arrows: true,
      autoplay: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
  if ($(".slider-1").length > 0) {
    $(".slider-1").slick();
  }

  //Home pharmacy slider
  if ($(".pharmacy-home-slider .swiper-container").length > 0) {
    var swiper = new Swiper(".pharmacy-home-slider .swiper-container", {
      loop: true,
      speed: 1000,
      pagination: {
        el: ".pharmacy-home-slider .swiper-pagination",
        dynamicBullets: true,
        clickable: true,
      },
      navigation: {
        nextEl: ".pharmacy-home-slider .swiper-button-next",
        prevEl: ".pharmacy-home-slider .swiper-button-prev",
      },
    });
  }

  // Date Range Picker
  if ($(".bookingrange").length > 0) {
    var start = moment().subtract(6, "days");
    var end = moment();

    function booking_range(start, end) {
      $(".bookingrange span").html(
        start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
      );
    }

    $(".bookingrange").daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days"),
          ],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
        },
      },
      booking_range
    );

    booking_range(start, end);
  }
  // Chat

  var chatAppTarget = $(".chat-window");
  (function () {
    if ($(window).width() > 991) chatAppTarget.removeClass("chat-slide");

    $(document).on(
      "click",
      ".chat-window .chat-users-list a.media",
      function () {
        if ($(window).width() <= 991) {
          chatAppTarget.addClass("chat-slide");
        }
        return false;
      }
    );
    $(document).on("click", "#back_user_list", function () {
      if ($(window).width() <= 991) {
        chatAppTarget.removeClass("chat-slide");
      }
      return false;
    });
  })();

  //Increment Decrement Numberes
  var quantitiy = 0;
  $(".quantity-right-plus").click(function (e) {
    e.preventDefault();
    var quantity = parseInt($("#quantity").val());
    $("#quantity").val(quantity + 1);
  });

  $(".quantity-left-minus").click(function (e) {
    e.preventDefault();
    var quantity = parseInt($("#quantity").val());
    if (quantity > 0) {
      $("#quantity").val(quantity - 1);
    }
  });

  //Cart Click
  $("#cart").on("click", function (o) {
    o.preventDefault();
    $(".shopping-cart").fadeToggle();
    $(".shopping-cart").toggleClass("show-cart");
  });

  // Circle Progress Bar

  function animateElements() {
    $(".circle-bar1").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph1").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph1")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#da3f81",
            },
          });
      }
    });
    $(".circle-bar2").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph2").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph2")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#68dda9",
            },
          });
      }
    });
    $(".circle-bar3").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph3").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph3")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#1b5a90",
            },
          });
      }
    });
  }

  if ($(".circle-bar").length > 0) {
    animateElements();
  }
  $(window).scroll(animateElements);

  // Preloader

  $(window).on("load", function () {
    if ($("#loader").length > 0) {
      $("#loader").delay(350).fadeOut("slow");
      $("body").delay(350).css({ overflow: "visible" });
    }
  });

  // $(document).ready(function(e) {
  //     var revapi = $(".rev_slider").revolution({
  //         sliderType: "standard",
  //         sliderLayout: "auto",
  //         dottedOverlay: "none",
  //         delay: 5000,
  //         navigation: {
  //             keyboardNavigation: "off",
  //             keyboard_direction: "horizontal",
  //             mouseScrollNavigation: "off",
  //             onHoverStop: "off",
  //             touch: {
  //                 touchenabled: "on",
  //                 swipe_threshold: 75,
  //                 swipe_min_touches: 1,
  //                 swipe_direction: "horizontal",
  //                 drag_block_vertical: false
  //             },
  //             arrows: {
  //                 style: "zeus",
  //                 enable: true,
  //                 hide_onmobile: true,
  //                 hide_under: 600,
  //                 hide_onleave: true,
  //                 hide_delay: 200,
  //                 hide_delay_mobile: 1200,
  //                 tmp: '<div class="tp-title-wrap">    <div class="tp-arr-imgholder"></div> </div>',
  //                 left: {
  //                     h_align: "left",
  //                     v_align: "center",
  //                     h_offset: 30,
  //                     v_offset: 0
  //                 },
  //                 right: {
  //                     h_align: "right",
  //                     v_align: "center",
  //                     h_offset: 30,
  //                     v_offset: 0
  //                 }
  //             },
  //             bullets: {
  //                 enable: true,
  //                 hide_onmobile: true,
  //                 hide_under: 1800,
  //                 style: "metis",
  //                 hide_onleave: true,
  //                 hide_delay: 200,
  //                 hide_delay_mobile: 1200,
  //                 direction: "horizontal",
  //                 h_align: "center",
  //                 v_align: "bottom",
  //                 h_offset: 0,
  //                 v_offset: 30,
  //                 space: 5,
  //                 tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title"></span>'
  //             }
  //         },
  //         responsiveLevels: [1240, 1024, 778],
  //         visibilityLevels: [1240, 1024, 778],
  //         gridwidth: [1170, 1024, 778, 480],
  //         gridheight: [450, 450, 400, 400],
  //         lazyType: "none",
  //         parallax: {
  //             origo: "slidercenter",
  //             speed: 1000,
  //             levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 100, 55],
  //             type: "scroll"
  //         },
  //         shadow: 0,
  //         spinner: "off",
  //         stopLoop: "on",
  //         stopAfterLoops: 0,
  //         stopAtSlide: -1,
  //         shuffle: "off",
  //         autoHeight: "off",
  //         fullScreenAutoWidth: "off",
  //         fullScreenAlignForce: "off",
  //         fullScreenOffsetContainer: "",
  //         fullScreenOffset: "0",
  //         hideThumbsOnMobile: "off",
  //         hideSliderAtLimit: 0,
  //         hideCaptionAtLimit: 0,
  //         hideAllCaptionAtLilmit: 0,
  //         debugMode: false,
  //         fallbacks: {
  //             simplifyAll: "off",
  //             nextSlideOnWindowFocus: "off",
  //             disableFocusListener: false,
  //         }
  //     });
  // });
})(jQuery);

jQuery(document).ready(function ($) {
  // For Home Page
  let i = 2;
  var radius = 200;
  var fields = $(".itemDot");
  var container = $(".dotCircle");
  var width = container.width();
  radius = width / 2.5;

  var height = container.height();
  var angle = 0,
    step = (2 * Math.PI) / fields.length;
  fields.each(function () {
    var x = Math.round(
      width / 2 + radius * Math.cos(angle) - $(this).width() / 2
    );
    var y = Math.round(
      height / 2 + radius * Math.sin(angle) - $(this).height() / 2
    );

    $(this).css({
      left: x + "px",
      top: y + "px",
    });
    angle += step;
  });

  $(".itemDot").click(function () {
    var dataTab = $(this).data("tab");
    $(".itemDot").removeClass("active");
    $(this).addClass("active");
    $(".CirItem").removeClass("active");
    $(".CirItem" + dataTab).addClass("active");

    i = dataTab;

    $(".dotCircle").css({
      transform: "rotate(" + (360 - (i - 1) * 36) + "deg)",
      transition: "2s",
    });
    $(".itemDot").css({
      transform: "rotate(" + (i - 1) * 36 + "deg)",
      transition: "1s",
    });
  });

  setInterval(function () {
    var dataTab = $(".itemDot.active").data("tab");
    if (dataTab > 5 || i > 5) {
      dataTab = 1;
      i = 1;
    }
    $(".itemDot").removeClass("active");
    $('[data-tab="' + i + '"]').addClass("active");
    $(".CirItem").removeClass("active");
    $(".CirItem" + i).addClass("active");
    i++;

    $(".dotCircle").css({
      transform: "rotate(" + (360 - (i - 2) * 36) + "deg)",
      transition: "2s",
    });
    $(".itemDot").css({
      transform: "rotate(" + (i - 2) * 36 + "deg)",
      transition: "1s",
    });
  }, 5000);
});

jQuery(document).ready(function ($) {
  var feedbackSlider = $(".feedback-slider");
  feedbackSlider.owlCarousel({
    items: 1,
    nav: false,
    dots: false,
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    navText: [
      "<i class='fa fa-arrow-left'></i>",
      "<i class='fa fa-arrow-right'></i>",
    ],
    responsive: {
      // breakpoint from 767 up
      767: {
        nav: false,
        dots: false,
      },
    },
  });

  feedbackSlider.on("translate.owl.carousel", function () {
    $(".feedback-slider-item h3")
      .removeClass("animated fadeIn")
      .css("opacity", "0");
    $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating")
      .removeClass("animated zoomIn")
      .css("opacity", "0");
  });

  feedbackSlider.on("translated.owl.carousel", function () {
    $(".feedback-slider-item h3")
      .addClass("animated fadeIn")
      .css("opacity", "1");
    $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating")
      .addClass("animated zoomIn")
      .css("opacity", "1");
  });
  feedbackSlider.on("changed.owl.carousel", function (property) {
    var current = property.item.index;
    var prevThumb = $(property.target)
      .find(".owl-item")
      .eq(current)
      .prev()
      .find("img")
      .attr("src");
    var nextThumb = $(property.target)
      .find(".owl-item")
      .eq(current)
      .next()
      .find("img")
      .attr("src");
    var prevRating = $(property.target)
      .find(".owl-item")
      .eq(current)
      .prev()
      .find("span")
      .attr("data-rating");
    var nextRating = $(property.target)
      .find(".owl-item")
      .eq(current)
      .next()
      .find("span")
      .attr("data-rating");
    $(".thumb-prev").find("img").attr("src", prevThumb);
    $(".thumb-next").find("img").attr("src", nextThumb);
    $(".thumb-prev")
      .find("span")
      .next()
      .html(prevRating + '<i class="fa fa-star"></i>');
    $(".thumb-next")
      .find("span")
      .next()
      .html(nextRating + '<i class="fa fa-star"></i>');
  });
  $(".thumb-next").on("click", function () {
    feedbackSlider.trigger("next.owl.carousel", [300]);
    return false;
  });
  $(".thumb-prev").on("click", function () {
    feedbackSlider.trigger("prev.owl.carousel", [300]);
    return false;
  });
}); //end ready

function validate1(val) {
  v1 = document.getElementById("fname");
  v2 = document.getElementById("lname");
  v3 = document.getElementById("email");
  v4 = document.getElementById("mob");

  flag1 = true;
  flag2 = true;
  flag3 = true;
  flag4 = true;

  if (val >= 1 || val == 0) {
    if (v1.value == "") {
      v1.style.borderColor = "red";
      flag1 = false;
    } else {
      v1.style.borderColor = "green";
      flag1 = true;
    }
  }

  if (val >= 2 || val == 0) {
    if (v2.value == "") {
      v2.style.borderColor = "red";
      flag2 = false;
    } else {
      v2.style.borderColor = "green";
      flag2 = true;
    }
  }

  if (val >= 3 || val == 0) {
    if (v3.value == "") {
      v3.style.borderColor = "red";
      flag3 = false;
    } else {
      v3.style.borderColor = "green";
      flag3 = true;
    }
  }

  if (val >= 4 || val == 0) {
    if (v4.value == "") {
      v4.style.borderColor = "red";
      flag4 = false;
    } else {
      v4.style.borderColor = "green";
      flag4 = true;
    }
  }

  flag = flag1 && flag2 && flag3 && flag4;

  return flag;
}

function validate2(val) {
  v3 = document.getElementById("title");
  v4 = document.getElementById("desc");

  flag3 = true;
  flag4 = true;

  // if (val >= 3 || val == 0) {
  //     if (v3.value == "") {
  //         v3.style.borderColor = "red";
  //         flag3 = false;
  //     } else {
  //         v3.style.borderColor = "green";
  //         flag3 = true;
  //     }
  // }

  // if (val >= 4 || val == 0) {
  //     if (v4.value == "") {
  //         v4.style.borderColor = "red";
  //         flag4 = false;
  //     } else {
  //         v4.style.borderColor = "green";
  //         flag4 = true;
  //     }
  // }

  flag = flag3 && flag4;

  return flag;
}

$(document).ready(function () {
  var current_fs, next_fs, previous_fs;

  var steps = $(".card-body").length;
  var current = 1;
  setProgressBar(current);

  $(".next").click(function () {
    str1 = "next1";
    str2 = "next2";
    str3 = "next3";

    if (!str2.localeCompare($(this).attr("id")) && validate1(0) == true) {
      val2 = true;
    } else {
      val2 = false;
    }

    if (!str3.localeCompare($(this).attr("id")) && validate2(0) == true) {
      val3 = true;
    } else {
      val3 = false;
    }

    if (
      !str1.localeCompare($(this).attr("id")) ||
      (!str2.localeCompare($(this).attr("id")) && val2 == true) ||
      (!str3.localeCompare($(this).attr("id")) && val3 == true)
    ) {
      current_fs = $(this).parent().parent();
      next_fs = $(this).parent().parent().next();

      $(current_fs).removeClass("show");
      $(next_fs).addClass("show");

      current_fs.animate(
        {},
        {
          step: function () {
            current_fs.css({
              display: "none",
              position: "relative",
            });

            next_fs.css({
              display: "block",
            });
          },
        }
      );
      setProgressBar(++current);
      var c = document.getElementById("cnt").textContent;
      document.getElementById("cnt").textContent = Number(c) + 25;
    }
  });

  $(".prev").click(function () {
    current_fs = $(this).parent().parent();
    previous_fs = $(this).parent().parent().prev();

    $(current_fs).removeClass("show");
    $(previous_fs).addClass("show");

    current_fs.animate(
      {},
      {
        step: function () {
          current_fs.css({
            display: "none",
            position: "relative",
          });

          previous_fs.css({
            display: "block",
          });
        },
      }
    );
    setProgressBar(--current);
    var c = document.getElementById("cnt").textContent;
    document.getElementById("cnt").textContent = Number(c) - 25;
  });

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $(".radio-group .radio").click(function () {
    $(".selected .fa").removeClass("fa-check");
    $(".selected .fa").addClass("fa-circle");
    $(".radio").removeClass("selected");
    $(this).addClass("selected");
    $(".selected .fa").removeClass("fa-circle");
    $(".selected .fa").addClass("fa-check");
  });
});

// $(function() {
//     $("#tabs").tabs({
//         show: { effect: "blind", direction: "right", duration: 300 }
//     });
//     $("#accordion").accordion();

//     var btn = $('#accordion li a');
//     var wrapper = $('#accordion li');

//     $(btn).on('click', function() {
//         $(btn).removeClass('active');
//         $(btn).parent().find('.addon').removeClass('fadein');

//         $(this).addClass('active');
//         $(this).parent().find('.addon').addClass('fadein');
//     });
// });
