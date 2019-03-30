$.noConflict();

jQuery(document).ready(function($) {

  "use strict";


    // Main Layout Animating Js
    var animating = false;

    function actionOnScroll() {

        $('.angles-content').on('scroll', function(){
          if ($(this).scrollTop() > 150) {
            $('.angles-wrapper').addClass('is-sticky');
             $('footer').fadeOut('8000');
          } else{
            $('.angles-wrapper').removeClass('is-sticky');
             $('footer').fadeIn('8000');
          }
        });
        
      }

      function noScroll() {
        $('.angles-wrapper').removeClass('is-sticky');
      }

      function isScroll() {
        var height = $('.angles-page-content .angles-content').height() - $('.angles-wrapper_page.active').find('.content-bottom').height();
        return height < 2 ? true : false;
      }

      function menuToggle() {
        $(".angles-wrapper_page, .main-content, .angles-wrapper_menu, .openenu").toggleClass("menu-active");
        $(".js-menuBtn").toggleClass("m--btn");
        $(document).off("click", ".angles-wrapper_content", closeNotFocusedMenu);
      }

      function closeNotFocusedMenu(e) {
        if (!$(e.target).closest(".angles-wrapper_menu").length) {
          menuToggle();
        }
      }

      $(document).on("click", ".js-menuBtn", function() {
        if (animating) return;
        menuToggle();
        $(document).on("click", ".angles-wrapper_content", closeNotFocusedMenu);
      });

      $(document).on("click", ".angles-menu-item:not(.js-menuBtn)", function() {
        animating = true;
        var $this = $(this);
        var page = +$this.data("page");
        $(".js-menuBtn").removeClass("js-menuBtn");
        $(".angles-wrapper_page.active").removeClass("active");
        $this.addClass("js-menuBtn m--btn");
        $(".angles-wrapper_page-" + page).addClass("active");
        $(".angles-wrapper_page, .main-content, .angles-wrapper_menu").removeClass("menu-active");
        $(document).off("click", ".angles-wrapper_content", closeNotFocusedMenu);
        setTimeout(function() {
          $(".angles-wrapper_menu")[0].className = $(".angles-wrapper_menu")[0].className.replace(/\bpage-active-.*\b/gi, "");
          $(".angles-wrapper_menu").addClass("page-active-" + page);
          animating = false;

          if (isScroll()) {
            actionOnScroll();
          } else {
            noScroll();
          }

        }, 1000);
      });


      $('[data-toggle="tooltip"]').tooltip();


      jQuery(window).load(function() {
              // will first fade out the loading animation
          jQuery(".status").fadeOut();
              // will fade out the whole DIV that covers the website.
          jQuery(".preloader").delay(1000).fadeOut("slow");
      });



    // Animsition
    $(".animsition").animsition({       
      inClass               :   'fade-in',
      outClass              :   'fade-out',
      inDuration            :    800,
      outDuration           :    800,
      linkElement           :   '.animsition-link', 

      loading               :    true,
      loadingParentElement  :   'body', //animsition wrapper element
      loadingClass          :   'animsition-loading',
      loadingInner          :   '<img src="images/pre-loader.gif" />', // e.g '<img src="loading.svg" />'
      unSupportCss          : [ 'animation-duration',
      '-webkit-animation-duration',
      '-o-animation-duration'
      ],
      overlay               :   false,        
      overlayClass          :   'animsition-overlay-slide',
      overlayParentElement  :   'body'
    });


    // // Window Height With Js
    // $('.angles-container').css({height: $(window).height()});
    // $('.main-content').css({height: $(window).height()});
    // $('.angles-content').css({height: $(window).height() - 1000});

    // /* Slider Window Height */

    // $('#angles-slider').css({height: $(window).height()});
    // $('.sp-slides-container').css({height: $(window).height()});
    // $('.sp-slides, .sp-slide').css({height: $(window).height()});
    // $('.sp-mask.sp-grab').css({height: $(window).height()});
    // $('.sp-slide').css({height: $(window).height()});
    // $('.sp-image-container').css({height: $(window).height()});
    // $('.sp-image').css({height: $(window).height()});



    /*-------- Magnific popUp ---------*/

    $('.image-popup-vertical-fit').magnificPopup({
      type: 'image',
      gallery:{
        enabled:true
      }
    });


    var logoSlider = $("#logo-slider");

    logoSlider.owlCarousel({
      autoPlay : 3000,
      stopOnHover : true,
      navigation:true,
      paginationNumbers: false,
      navigationText: [
      "<i class='fa fa-angle-left post-prev'></i>",
      "<i class='fa fa-angle-right post-next'></i>"
      ],

      itemsCustom : [
      [0, 1],
      [450, 2],
      [600, 2],
      [700, 2],
      [800, 3],
      [1000, 3],
      [1200, 3],
      ],
    // Responsive 
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window
  });


    // Works Isotope Gallery

    var $workItems = $('#work-items'),
    colWidth = function () {
      var w = $workItems.width(), 
      columnNum = 1,
      columnWidth = 0;
      if (w > 1170) {
        columnNum  = 4;
      } 
      else if (w > 960) {
        columnNum  = 3;
      } 
      else if (w > 640) {
        columnNum  = 3;
      } 
      else if (w > 480) {
        columnNum  = 2;
      }  
      else if (w > 360) {
        columnNum  = 1;
      } 
      columnWidth = Math.floor(w/columnNum);
      $workItems.find('.item').each(function() {
        var $item = $(this),
        multiplier_w = $item.attr('class').match(/item-w(\d)/),
        multiplier_h = $item.attr('class').match(/item-h(\d)/),
        width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
        height = multiplier_h ? columnWidth*multiplier_h[1]*0.75-10 : columnWidth*0.82-10;
        $item.css({
          width: width,
          height: height
        });
      });
      return columnWidth;
    },
    isotope = function () {
      $workItems.isotope({
        resizable: true,
        itemSelector: '.item',
        masonry: {
          columnWidth: colWidth(),
          gutterWidth: 10
        }
      });
    };
    isotope();
    $(window).smartresize(isotope);

    $('.itemFilter a').on("click", function(){
      $('.itemFilter .current').removeClass('current');
      $(this).addClass('current');

      var selector = $(this).attr('data-filter');
      $workItems.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    }); 


  });



