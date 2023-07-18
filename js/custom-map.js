$(document).on( 'click', '.marker_box', function () {
		$('.wrap_marker').removeClass('show_info');
		$(this).closest('.wrap_marker').addClass('show_info');
	})
	//click everywhere on screen should close it
	$(document).click(function (e) {  
		if ($(e.target).closest('.wrap_marker').length == 0) {   
			$('.wrap_marker').removeClass('show_info');  
		} 
	});


	google.maps.event.addDomListener(window, 'load', initialize);
	function CustomMarker(latlng,  map, content, head, link) {
		this.latlng_ = latlng;
		this.text = content;
		this.head = head;
		this.link = link;
		this.setMap(map);
	}

	CustomMarker.prototype = new google.maps.OverlayView();

	CustomMarker.prototype.draw = function() {
		var me = this;

		var div = this.div_;
		var title_marker;
		var title_link;
		var text_marker;
		if (!div) {
			div = this.div_ = document.createElement('DIV');
			div.className = "wrap_marker";

			wrap_marker = document.createElement('DIV');
			wrap_marker.className = "marker_box";

			wrap_marker_text = document.createElement('DIV');
			wrap_marker_text.className = "wrap_marker_text";

			text_marker = document.createElement('P');
			text_marker.className = "text_marker";
			text_marker.textContent = this.text;

			title_marker = document.createElement('H3');
			title_marker.className = "title_marker";
			title_marker.textContent = this.head;

			title_link = document.createElement('A');
			title_link.className = "link_marker linkToProject";
			title_link.textContent = this.link;
			// var href = this.link.getAttribute("href");
			title_link.setAttribute("href", "malls.html");

			var panes = this.getPanes();
			panes.overlayImage.appendChild(div).appendChild(wrap_marker);
			panes.overlayImage.appendChild(div).appendChild(wrap_marker_text).appendChild(text_marker);
			panes.overlayImage.appendChild(div).appendChild(wrap_marker_text).appendChild(title_marker);
			panes.overlayImage.appendChild(div).appendChild(wrap_marker_text).appendChild(text_marker).appendChild(title_link);
		}

		var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
		if (point) {
			div.style.left = point.x + 'px';
			div.style.top = point.y + 'px';
		}
		
	};

	var map;
	var overlay;
	function initialize() {
		var opts = {
			zoom: 17,
			disableDefaultUI: true,
			center: new google.maps.LatLng(34.07692968351017, -118.28441995998237),
    		scrollwheel: false,
			styles: [
				{
					featureType: "all",
					stylers: [
						{ color: "#333333" },
					]
				},
				{ 
					featureType : "road",
					stylers: [
						{ color: "#746b6b" },
					]
				},
				{
					elementType: "labels",
					stylers: [
						{ color: "#009a7a" }
					]
				},
				{
					featureType: "water",
					// elementType: "labels",
					stylers: [
						{ color: "#58c9ee" }
					]
				},
				{
					featureType: "locality",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				},
				{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}
			]
		}

		map = new google.maps.Map(document.getElementById("map"), opts);
		var image = {
			url: 'img/marker_map.png',
		};

		var map_box = $('.full-section-map');
		var marker_box = $('.marker_box');
		var marker_box1 = $('.marker_box1');
		var marker_box2 = $('.marker_box2');
		var marker_box3 = $('.marker_box3');
		var marker_box4 = $('.marker_box4');

		var title1 = $('.titlePlace1');
		var title2 = $('.titlePlace2');
		var title3 = $('.titlePlace3');
		var title4 = $('.titlePlace4');

		var link1 = $('.linkToProject1');
		var link2 = $('.linkToProject2');
		var link3 = $('.linkToProject3');
		var link4 = $('.linkToProject4');

		var place = [
			// ["The Yekev complex is located at the heart of the Rishon LeZion commercial area. Sprawling over an area of 35,000 sq. m., it will become a fascinating and vibrant center that emphasizes the authentic nature of the old wineries. full story >>", 31.959153, 35.001755],
			[marker_box1.text(), 34.07852948351017, -118.27841995998237, title1.text(), link1.text()],
			[marker_box2.text(), 34.07653948571166, -118.28119346755948, title2.text(), link2.text()],
			[marker_box3.text(), 34.075117274511584, -118.29323154296902, title3.text(), link3.text()],
			[marker_box4.text(), 34.07535528844511, -118.29300623926981, title4.text(), link4.text()],
		];
		for (var i = 0; i < place.length; i++) {
			var place_details = place[i];
			var overlay = new CustomMarker(new google.maps.LatLng(place_details[1], place_details[2]), map, place_details[0], place_details[3], place_details[4]);
		}
	}