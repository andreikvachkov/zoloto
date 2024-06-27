jQuery(document).ready(function ($) {
    function YouTubeGetID(url) {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

    $('.about__video').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var link = $(this).attr('href')
        var id = YouTubeGetID(link)
        var thisw = $(this).outerWidth()
        var thish = $(this).outerHeight()
        $(this).append('<iframe width="' + thisw + '" height="' + thish + '" src="https://www.youtube.com/embed/' + id + '?autoplay=1&enablejsapi=1&" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    })

    $(".advantages__slider").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    $('#advantagesPrevButton').on('click', function () {
        $('.advantages__slider').slick('slickPrev');
    });
    $('#advantagesNextButton').on('click', function () {
        $('.advantages__slider').slick('slickNext');
    });


    var baseFontSize = parseFloat($('html').css('font-size'));
    function handleHoverIn() {
        if ($(window).width() > 768) {
            var currentWidth = $(this).outerWidth();
            var textWidth = $(this).find('.infrastructure__point__name').outerWidth();
            var newWidth = (currentWidth + textWidth) / baseFontSize;

            $(this).css({
                'width': newWidth + 1.363 + 'rem',
                'z-index': 10
            });
        }
    }
    function handleHoverOut() {
        if ($(window).width() > 768) {
            $(this).css({
                'width': '3.75rem',
                'z-index': 3
            });
        }
    }
    function bindHoverEvents() {
        $('.infrastructure__point').off('mouseenter mouseleave', handleHoverIn, handleHoverOut);
        if ($(window).width() > 768) {
            $('.infrastructure__point').hover(handleHoverIn, handleHoverOut);
        }
    }
    bindHoverEvents();
    $(window).resize(bindHoverEvents);


    $('.dropbtn').click(function () {
        var $dropdown = $(this).parent('.dropdown');
        $dropdown.toggleClass('show');
    });

    $('.dropdown-content a').click(function (e) {
        e.preventDefault();
        var selectedText = $(this).data('value');
        var $dropdown = $(this).closest('.dropdown');
        $dropdown.find('.dropbtn').text(selectedText);
        $dropdown.removeClass('show');
    });

    $(window).click(function (e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown').removeClass('show');
        }
    });


    function handleMouseEnter() {
        var $info = $(this).find('.plan__point__information');
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var pointOffset = $(this).offset();
        var infoWidth = $info.outerWidth();
        var infoHeight = $info.outerHeight();

        $info.css({
            right: '1.875rem',
            left: 'auto',
            top: '1.875rem',
            bottom: 'auto'
        }).show();

        var infoOffset = $info.offset();

        if (infoOffset.left + infoWidth > windowWidth) {
            $info.css({
                right: 'auto',
                left: '1.875rem'
            });
        }

        if (infoOffset.left < 0) {
            $info.css({
                left: '1.875rem',
                right: 'auto'
            });
        }

        if (infoOffset.top + infoHeight > windowHeight) {
            $info.css({
                top: 'auto',
                bottom: '1.875rem'
            });
        }

        if (infoOffset.top < 0) {
            $info.css({
                bottom: 'auto',
                top: '1.875rem'
            });
        }
    }

    function handleMouseLeave() {
        $(this).find('.plan__point__information').hide();
    }

    function handleClick() {
        var isActive = $(this).hasClass('active');
        $('.plan__point').removeClass('active');

        if (!isActive) {
            $(this).addClass('active');
        }
    }

    function checkWindowSize() {
        if ($(window).width() > 768) {
            $('.plan__point').off('click', handleClick);
            $('.plan__point').on('mouseenter', handleMouseEnter);
            $('.plan__point').on('mouseleave', handleMouseLeave);
        } else {
            $('.plan__point').off('mouseenter mouseleave');
            $('.plan__point').on('click', handleClick);
        }
    }

    checkWindowSize();
    $(window).resize(checkWindowSize);


    var $slider = $('.news__slider');
    var $currentSlide = $('#currentSlide');
    var $totalSlides = $('#totalSlides');

    $slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $currentSlide.text(i);
        $totalSlides.text(slick.slideCount);
    });

    $('.news__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });

    $('#prevButton').on('click', function () {
        $('.news__slider').slick('slickPrev');
    });

    $('#nextButton').on('click', function () {
        $('.news__slider').slick('slickNext');
    });

    $('#prevButto2').on('click', function () {
        $('.news__slider').slick('slickPrev');
    });

    $('#nextButton2').on('click', function () {
        $('.news__slider').slick('slickNext');
    });


    function handleAccordionClick() {
        if ($(window).width() < 769) {
            var $footerItem = $(this).closest('.footer__item');
            var $footerList = $footerItem.find('ul');

            if ($footerItem.hasClass('active')) {
                $footerList.stop(true, true).slideUp();
                $footerItem.removeClass('active');
            } else {
                $('.footer__item.active').removeClass('active').find('ul').stop(true, true).slideUp();

                $footerList.stop(true, true).slideDown();
                $footerItem.addClass('active');
            }
        }
    }

    function bindAccordion() {
        $('.footer__item__name').off('click', handleAccordionClick);
        if ($(window).width() < 769) {
            $('.footer__item__name').on('click', handleAccordionClick);
        }
    }

    bindAccordion();
    $(window).resize(bindAccordion);


    $('#menuOpenButton').click(function () {
        $('.menu').addClass('open');
    });

    $('#menuCloseButton').click(function () {
        $('.menu').removeClass('open');
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.menu__wrap, #menuOpenButton').length) {
            $('.menu').removeClass('open');
        }
    });



    $('input[type="range"]').each(function () {
        updateValue(this, $(this).next().attr('id'));
    });


    $('.document__item__btn').click(function () {
        var item = $(this).closest('.document__item');
        var descr = item.find('.document__item__descr');
        var text = descr.text();

        var tempInput = $('<textarea>');
        tempInput.val(text);
        $('body').append(tempInput);

        tempInput.select();
        document.execCommand("copy");

        tempInput.remove();
    });

});
function updateValue(slider, valueId) {
    const value = parseFloat(slider.value).toFixed(1);
    const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    $(slider).css('--value', `${percentage}%`);
    $('#' + valueId).text(value);
}