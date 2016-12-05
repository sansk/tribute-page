$(document).ready(function(){
    /*********************
            Carousel
            Reference: https://www.sitepoint.com/full-screen-bootstrap-carousel-random-initial-image/
    *********************/
    // Initialise the Carousel. Set to keep the image cycling active by setting 'pause' to 'false'
    var $tabCarousel = $('.carousel');
    
    $tabCarousel.carousel({
      interval: 4000,
      pause: "false"
    });
    
    // To implement full-screen carousel slide show.
    var $item = $('.carousel .item');
    var $wHeight = $(window).height();

    $item.height($wHeight); 
    $item.addClass('full-screen');

    $('.carousel img').each(function() {
        var $src = $(this).attr('src');
        var $color = $(this).attr('data-color');
        $(this).parent().css({
            'background-image' : 'url(' + $src + ')',
            'background-color' : $color
        });
        $(this).remove();
    });

    $(window).on('resize', function (){
        $wHeight = $(window).height();
        $item.height($wHeight);
    });
    
    // Add a random 'active' slide
    var $numberofSlides = $('.item').length;
    var $currentSlide = Math.floor((Math.random() * $numberofSlides));

    $('.carousel-indicators li').each(function(){
        var $slideValue = $(this).attr('data-slide-to');
        if($currentSlide == $slideValue) {
            $(this).addClass('active');
            $item.eq($slideValue).addClass('active');
        } else {
            $(this).removeClass('active');
            $item.eq($slideValue).removeClass('active');
        }
    });
    
    // Animate the Carousel
    function carouselAnimations(elems) {
        var animEndEv = 'webkitAnimationEnd animationend';
        
        elems.each(function () {
            var $this = $(this), 
                $animationType = $this.data('animation');
            
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    
    var $firstAnimatingElems = $tabCarousel.find('.item:first').find('[data-animation ^= "animated"]');

    carouselAnimations($firstAnimatingElems);
    //$tabCarousel.carousel('pause');
    
    $tabCarousel.on('slide.bs.carousel', function (e) { 
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        carouselAnimations($animatingElems);
    });
    
    /*********************
            Collapsable Menu
    *********************/
    $('.navbar-toggle').click(function(){
        $(this).toggleClass('active-toggle');
    });
});
