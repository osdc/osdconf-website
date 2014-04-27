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
        var JIIT=new google.maps.LatLng( 28.630298, 77.372050 );
        var stylesArray = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];
        var mapOptions = {
            center    : JIIT,
            zoom      : 15,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            styles    : stylesArray
        };
        var map = new google.maps.Map( document.getElementById( 'map-container' ), mapOptions );

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

    var textData = [];
    var imageData = [];

    $.ajax({
        type: 'GET',
        url : 'https://graph.facebook.com/222284631283564/feed',
        data : {
            access_token : 'CAAUtuZBwpGdgBAInJmyK7We4euOfLaZBd5Ex3mKUx00AzQ7PuAbXZBogYhAfMCUkUrYbjd1FPhXsb5pvBrcZCU05V7w7E8Pdaa4ysccM2Wk6jYcoEUC0thxtjfJDn1K7n0TMyXQ9Io29sVdxmYW27JyZBjFarfeWgMIOzHGtJEjxt4wMV9uZBKO88E4rMPUEQZD'
        },
        success: function( response ) {
            console.log( response );
            for ( item in response.data ) {
                var feedItem = response.data[ item ];
                feedItem.created_time = moment(feedItem.created_time).fromNow();
                if ( feedItem.picture ) {
                    feedItem.picture = feedItem.picture.replace( "_s.jpg","_o.jpg" );
                    imageData.push( feedItem );
                    textData.push( feedItem );
                } else {
                    textData.push( feedItem );
                }
            }
            var html = osdc['templates/feed.hbs']( textData );
            var htmlImage = osdc['templates/image.hbs']( imageData );

            // $( '.js-image-container' ).html( htmlImage );
            $( '.js-feed-container' ).html( html );

            console.log( html );
        }
    })
    $.ajax({
        type: 'GET',
        url : 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        datatype: 'jsonp',
        data : {
            access_token : 'CAAUtuZBwpGdgBAInJmyK7We4euOfLaZBd5Ex3mKUx00AzQ7PuAbXZBogYhAfMCUkUrYbjd1FPhXsb5pvBrcZCU05V7w7E8Pdaa4ysccM2Wk6jYcoEUC0thxtjfJDn1K7n0TMyXQ9Io29sVdxmYW27JyZBjFarfeWgMIOzHGtJEjxt4wMV9uZBKO88E4rMPUEQZD',
            user_id      : 'https://api.twitter.com/1.1/statuses/user_timeline.json?',
            count        : 20,
            exclude_replies : true,
            oauth_consumer_key : 'wWQanLiTA2057PMrrMA',
        },
        success: function( response ) {
            console.log( response );
        }
    });




});