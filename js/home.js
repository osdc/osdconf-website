$( document ).ready( function(){
    // var firebase = new Firebase( 'https://osdconf.firebaseio.com/notifyusers' );
    // $( '#notify-me' ).click(function() {
    //     $('#notify-box').slideDown();
    //     var email = $('#notify-email').val();

    //     if (email.length) {
    //         firebase.push({email: email});
    //         $('#notify-box').html('<p>Thank you! You will hear from us soon.</p>');
    //     }

    // });

    var isMapLoaded = false,
        isMapReady = false
        isMapLoadQueue = false;


    function initialize() {
        console.log( 'called' );
        var JIIT=new google.maps.LatLng( 28.630298, 77.372050 );
        console.log( JIIT );
        var stylesArray = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];
        var mapOptions = {
            center    : JIIT,
            zoom      : 15,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            styles    : stylesArray
        };
        var map = new google.maps.Map( $( '#map-container' ), mapOptions );
        console.log( map );

        var marker= new google.maps.Marker( {
            position  : JIIT,
            map       : map,
            title     : "Jaypee Institute of Information Technology"
        });
    }

    google.maps.event.addDomListener( window, 'load', function() {
        isMapReady = true;
        if ( isMapLoadQueue ) {
            initialize();
        }
    });

    $( '.js-map-open' ).on( 'click', function() {
        $( '.js-map-container' ).toggle();
        if ( isMapReady ) {
            if ( !isMapLoaded ) {
                initialize();
            }
        } else {
            isMapLoadQueue = true;
        }
        return false;
    });



});