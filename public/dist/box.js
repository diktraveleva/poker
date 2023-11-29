// var abrir_caja = new Audio('/p/assets/audio/open_box.mp3');
// var ganador = new Audio('/p/assets/audio/winner.mp3');
var count    = 1;
var intentos = 3;
var puedo    = false;
var boxRoot;

(function () {

    "use strict";

    boxRoot = {
        _init: function () {
            setTimeout(function() {
                jQuery('#p_modal1').modal(modalOptions);
            }, 1000);

            jQuery( '.try' ).on('click', function() {
                if( puedo && count <= intentos){
                    if( jQuery(this).hasClass('abierta') ){
                        /* caja abierta deberíamos avisar */
                    }else{
                        /* abrir_caja.play(); */
                        puedo = false;
                        jQuery('.circle-loader').removeClass("load-complete");
                        jQuery('.checkmark').css("display", "none");
                        jQuery(this).addClass('abierta');
                        if(count == 2){
                            jQuery(this).addClass('premiazo');
                            setTimeout(function() {
                                jQuery(".div_img_gift, .img_gift").fadeIn("slow", function(){
                                    setTimeout(function() {
                                        jQuery('#p_modal3').modal(modalOptions);
                                        jQuery('.circle-loader').addClass("load-complete");
                                        jQuery('.checkmark').css("display", "block");
                                    }, 1500);
                                    /* ganador.play(); */
                                });
                            }, 4000);
                        }
                        else{
                            count++;
                            intentos--;
                            jQuery('#num_intentos').html(intentos);
                            setTimeout(function() {
                                jQuery('#p_modal2').modal(modalOptions);
                                setTimeout(function() {
                                    jQuery('.circle-loader').addClass("load-complete");
                                    jQuery('.checkmark').css("display", "block");
                                    puedo = true;
                                }, 1000);
                            }, 2000);
                        }
                    }
                }
            });

            jQuery("#p_modal_button1").on("click", function (event) {
                event.stopPropagation();
                // jQuery(".sweet-overlay, .modal1").fadeOut("slow");
                jQuery('#p_modal1').modal('hide');
                puedo = true;
            });

            jQuery("#p_modal_button2").on("click", function (event) {
                event.stopPropagation();
                // jQuery(".sweet-overlay, .modal2").fadeOut("slow");
                jQuery('#p_modal2').modal('hide');
            });

            // jQuery("#p_modal_button3").on("click", function (event) {
            //     event.stopPropagation();
            //     // jQuery(".modal3").fadeOut("slow");
            //     jQuery('#p_modal3').modal('hide');
            //     stepfinal();
            //     goToUrlFinish();
            // });

        }
    };

    jQuery( document ).ready(function() {
        if( typeof box_ini == "undefined" ){
            boxRoot._init();
        }
    });

})();