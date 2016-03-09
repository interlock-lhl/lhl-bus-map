(function() {

  L.mapbox.accessToken = 'pk.eyJ1IjoiaW50ZXJsb2NrIiwiYSI6ImNpbGs5dDJrejVqd3N2ZW0wd3FtMHpvYXMifQ.SdA2CbCu6aRDdERxsh6BdQ';
  var map = L.mapbox.map('mapid', 'mapbox.streets')
    .setView([49.2817, -123.1225], 12);

  L.marker([49.2817, -123.1225], {
    icon: L.mapbox.marker.icon({
        'marker-size': 'large',
        'marker-symbol': 'bus',
        'marker-color': '#fa0'
    })
  }).addTo(map);

  var translink_api = "4p0ZVE64kyN6dEtSegme";
  function api_url_generator(action) {
    action = action || 'buses';
    return "http://api.translink.ca/rttiapi/v1/" + action;
  }

  $('#update').on('click', function() {
    query_buses();
  });

  var buses = {};

  // window.setInterval(query_buses, 3000);

  function query_buses() {
    $.ajax(
      {
        url: api_url_generator(),
        method: 'GET',
        data: {
          apiKey: translink_api
        },
        // crossDomain : true,
        headers: {
          'accept': 'application/JSON'
        },
        success: function(data) {
          update_map(data);
        }
      }
    );
  }

  function update_map(data) {
    $.each(data, function(i, elm) {
      if (buses[elm.VehicleNo] === undefined) {
        buses[elm.VehicleNo] = L.marker([elm.Latitude, elm.Longitude], {
          icon: L.mapbox.marker.icon({
              'marker-size': 'large',
              'marker-symbol': 'bus',
              'marker-color': '#fa0'
          })
        });
        buses[elm.VehicleNo].addTo(map);
      } else {
        buses[elm.VehicleNo].setLatLng([elm.Latitude, elm.Longitude]).update();
      }
    });

  };


})();
