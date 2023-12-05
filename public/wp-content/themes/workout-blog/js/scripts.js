jQuery( function($) {

    //Tab to top
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 1){  
            jQuery('.scroll-to-top').addClass("show");
        }
        else{
            jQuery('.scroll-to-top').removeClass("show");
        }
    });

    jQuery(".scroll-to-top").on("click", function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 300);
        return false;
    });
    //Tab to top 
    

} );