$(function() {

    let body = $('body');
    let header = $("#header");
    let nav = $('#nav');
    let burger = $('#burger');
    let intro = $("#intro");
    
    let introH = intro.innerHeight();
    let headerH = header.innerHeight();

    let scrollTop = $(window).scrollTop();

    
    

    /* HEADER Scroll
    ============================================================== */
    headerScroll();
    
    $(window).on("scroll resize", function() {
        headerScroll();
    });
    
    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();
        
        let scrollTop = $(this).scrollTop();
        
        if( introH <= (scrollTop + headerH) ) {
            header.addClass('header--dark');
        } else {
            header.removeClass('header--dark');
        }
    }
    


    /*Smooth scroll to sections
    ==============================================================  */
    $('[data-scroll]').on('click', function(event) {
        event.preventDefault();

        let scrollElement = $(this).data('scroll');
        let scrollElementPosition = $(scrollElement).offset().top;

        burger.removeClass('active');
        nav.removeClass('active');
        body.removeClass('no-scroll');

        $('html, body').animate({
            scrollTop: scrollElementPosition - headerH,
        }, 1000)
    });



    /* Scroll spy-menu
    ================================================================= */
    let windowHeight = $(window).height();
    scrollSpy(scrollTop);

    $(window).on('scroll', function() {
        scrollTop = $(this).scrollTop();
        scrollSpy(scrollTop);
    });

    function scrollSpy(scrollTop) {   
        $('[data-scroll-spy]').each(function() {
            let $this = $(this);
            let sectionID = $this.data('scroll-spy');
            let sectionPosition = $this.offset().top; 
            
            
            if(scrollTop >= (sectionPosition - 0.3*windowHeight)) {
                $('#nav [data-scroll]').removeClass('active');
                $('#nav [data-scroll = "'+ sectionID +'"]').addClass('active');
            }

            if(scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }
        })
    }



    /* MODALS
    =================================================================== */
    $('[data-modal]').on('click', function(event) {
        event.preventDefault();
        let modalID = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modalID).addClass('show');

        setTimeout(function() { //вносит некоторую задержку
            $(modalID).find('.modals__inner').css({
                transform: 'scale(1)',
                opacity: '1'
            }); // изменение ccs свойства элемента
        }, 100);
    }); //открытие модального окна при клике по кнопке


    $('[data-close]').on('click', function(event) {
        event.preventDefault();
        let close = $(this).parents('.modals');
        modalClose(close);
    }); // закрытие модального при клике по крестику

    $('.modals').on('click', function() {
        let close = $(this);
        modalClose(close);
    }); // закрытие модального по клику .modals

    $('.modals__inner').on('click', function(event) {
        event.stopPropagation(); //отменяет закрытие по клику .modals
    });

    
    function modalClose(close) {
        close.find('.modals__inner').css({
            transform: 'scale(0.5)',
            opacity: '0'
        }); // сначала делаем анимацию уменьшения, а уже потом убираем классы

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            close.removeClass('show');
        }, 200);
    } //функция анимированного закрытия 
    


    /* slickSlider
    =================================================================== */
    
    // Intro block
    let introSlider = $('#introSlider');
    
    introSlider.slick({
        infinity: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 7500,
        speed: 2000,
        draggable: false,
        swipe: false,
      });

      $('#introSlidePrev').on('click', function() {
        introSlider.slick('slickPrev'); // привязка события slick к кнопке
      });

      $('#introSlideNext').on('click', function() {
        introSlider.slick('slickNext');
      });

    // Clients block
    let clientsSlider = $('#clientsSlider');
    
    clientsSlider.slick({
        arrows: false,
        dots: true,
        autoplay: false,
        autoplaySpeed: 5000,
        // fade: true,
        speed: 1500
    });



    /* BURGER
    ================================================================== */        
    // иконка бургера + выпадающее меню
    burger.on('click', function() {
        burger.toggleClass('active');
        
        if(burger.hasClass('active')) {
            body.addClass('no-scroll');
            nav.addClass('active');
            header.addClass('header--dark');
            
        } else {
            body.removeClass('no-scroll');
            nav.removeClass('active');
        }
    });


    /* NAV */
    // nav.on('click', function() {
    //     nav.toggleClass('active');
    //     burger.toggleClass('active');
    //     body.toggleClass('no-scroll');
    // });


    /* AOS https://github.com/michalsnik/aos
    ================================================================= */
    AOS.init({
        // Global settings:
        disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
      
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 80, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 700, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      });





      
});
