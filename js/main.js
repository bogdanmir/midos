// map
var map, infoWindow;
function initMap() {
    Latlng = {lat: 37.758391, lng: -122.406329};
    var myOptions = {
        zoom: 15,
        center: Latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    map.setCenter(Latlng);
    var marker = new google.maps.Marker({});

    window.geocoder = new google.maps.Geocoder;
    infoWindow = new google.maps.InfoWindow;
    geocodeLatLng(geocoder, map, infoWindow);

    function geocodeLatLng(geocoder, map, infoWindow) {
        window.geocoder.geocode({'location': Latlng}, function(results, status) {
            marker = new google.maps.Marker({
                position: Latlng,
                map: map,
                draggable: false,
                icon: 'assets/images/location-pin.svg',
                title: 'HEARTCORE-1',
                label: '<h6 class="label-title">HEARTCORE</h6>385 Noah Place Suite 878 877-255-7945 <a href="mailto:info@heartcore.com">info@heartcore.com</a>'
            });
        });
    }
    // add text on marker
    var point = {
        lat: 22.5667,
        lng: 88.3667
    };
    var markerSize = {
        x: 22,
        y: 40
    };
    google.maps.Marker.prototype.setLabel = function(label) {
        this.label = new MarkerLabel({
            map: this.map,
            marker: this,
            text: label
        });
        this.label.bindTo('position', this, 'position');
    };
    var MarkerLabel = function(options) {
        this.setValues(options);
        this.span = document.createElement('span');
        this.span.className = 'map-marker-label';
    };
    MarkerLabel.prototype = $.extend(new google.maps.OverlayView(), {
        onAdd: function() {
          this.getPanes().overlayImage.appendChild(this.span);
          var self = this;
          this.listeners = [
            google.maps.event.addListener(this, 'position_changed', function() {
              self.draw();
            })
          ];
        },
        draw: function() {
          var text = String(this.get('text'));
          var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
          this.span.innerHTML = text;
          this.span.style.left = (position.x - (markerSize.x / 2)) - (text.length) + 5 + 'px';
          this.span.style.top = (position.y - markerSize.y - 185) + 'px';
        }
    });
}