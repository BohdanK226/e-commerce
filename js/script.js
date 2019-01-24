
$(document).ready(function () {
    //rejecting old browsers
    if(
        (($.browser.name == "msie") && (($.browser.versionX)<11)) ||
        (($.browser.name == "chrome") && ($.os.name != "linux") && (($.browser.versionX)<30)) ||
        (($.browser.name == "opera") && (($.browser.versionX<12))) ||
        (($.browser.name == "firefox") && (($.browser.versionX<32)))
    ) {
        $('body>*').css('display','none');
        $('body').css('background-color','#f5f5f5');
        $('.old-browser').css('display','block');
        if ($.os.name == "win") {
            $('.browser-safari').css('display','none');
        }
        if ($.os.name == "linux") {
            $('.browser-msie').css('display','none');
            $('.browser-safari').css('display','none');
        }
        if ($.os.name == "mac") {
            $('.browser-msie').css('display','none');
        }
    }

    fix_size();

    //************* owl carousel ***************
    var owl = $('.owl-carousel');
    // Listen to owl events:
    owl.on('changed.owl.carousel', function(event) {
        fix_size();
    });

    owl.owlCarousel({
        items: 3,
        loop:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            750:{
                items:3
            }
        }
    });

    // Go to the next item
    $('.scroll-right').click(function() {
        owl.trigger('next.owl.carousel');
        event.preventDefault();
    });
// Go to the previous item
    document.getElementById("scroll_right").addEventListener("click", function(e){e.preventDefault()}, false);
    document.getElementById("scroll_left").addEventListener("click", function(e){e.preventDefault()}, false);
    $('.scroll-left').click(function() {
        owl.trigger('prev.owl.carousel');
    });
    //************* pagination  **************
    var pagination_active = $('.pagination a');

    pagination_active.click(function()
    {
        pagination_active.removeClass('active-pagination');
        $(this).addClass('active-pagination');
        });
    });

    //********* resizing images ****************
    function fix_size() {
        var images = $('.img-container img');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('.img-container');
            if (img_dom.complete) {
                resize();
            } else img.one('load', resize);

            function resize() {
                if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                    return;
                }
                img.height('100%');
                img.width('auto');
            }
        }

        //***************** mobile menu *****************

        var menu_icon = $('.menu-mobile-icon');
        var menu_block = $('.mobile-menu');
        var menu_close = $('.mobile-icon-close');
        var main_container = $('.container-fluid');

        menu_icon.click(function () {
            menu_block.addClass('mobile-menu-active');
            main_container.addClass('blur');
            return false;
        });
        menu_close.click(function () {
            menu_block.removeClass('mobile-menu-active');
            main_container.removeClass('blur');
            event.preventDefault();
            return false;
        });

//*********** close mobile menu if window resize **********

        $(window).resize(function(){
            fix_size();
            if ((menu_block.hasClass('mobile-menu-active'))) {
                menu_block.removeClass('mobile-menu-active');
                main_container.removeClass('blur');
            }
            event.preventDefault();
        });

//********* close mobile menu if click to page exclude mobile menu ********

        $(document).click( function(event){
            if( $(event.target).closest(menu_block).length ){
                return;
            }
            if ((menu_block.hasClass('mobile-menu-active'))) {
                menu_block.removeClass('mobile-menu-active');
                main_container.removeClass('blur');
            }
        });
    }