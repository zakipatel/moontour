google.load("earth", "1");

$(function(){
  var ge;

  function init() {
    google.earth.createInstance('map3d', initCB, failureCB, { database: 'http://khmdb.google.com/?db=moon' })
   }

   function addNetworkLinks(links) {
      for(var i =0; i < links.length; i++) {
        addNetworkLink(links[i]);
      }
   }

  function addNetworkLink(linkHref) {
    var networkLink = ge.createNetworkLink("");
    var link = ge.createLink("");
    link.setHref(linkHref);
    networkLink.set(link, true, true);
    ge.getFeatures().appendChild(networkLink);
  }

  function buttonClick6() {
    kml_array = [
                "https://moonkam.ucsd.edu/files/kml/kml_generator.php?ccfcommand_id=6858",
                "https://moonkam.ucsd.edu/files/kml/kml_generator.php?ccfcommand_id=2370"]

    for (var i = 0; i < kml_array.length; i++)
    {
      addNetworkLink(kml_array[i]);
    }
  }

  function flyToCordinates(coords) {
    return function(){
      var bits = coords.split(',');
      var lookAt = ge.createLookAt('');
      lookAt.set(parseFloat(bits[0]), parseFloat(bits[1]), 10, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 10, 140000);
      ge.getView().setAbstractView(lookAt);
    };
  }

  $( "#start_time" ).datepicker({
      defaultDate: "+1w",
      yearRange: '2011:2013',
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#start_time" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#end_time" ).datepicker({
      defaultDate: "+1w",
      yearRange: '2011:2013',
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#end_time" ).datepicker( "option", "maxDate", selectedDate );
      }
    });

  $(".date_submit").click(function(){
    start_time = new Date($("#start_time").val()).getTime() / 1000;
    end_time = new Date($("#start_time").val()).getTime() / 1000;

    $.ajax({
      type: 'get',
      url: '/moon_images/query_on_time',
      data: 'from=' + start_time + '&to=' + end_time
    }).success(function(data) {
      addNetworkLinks(data);
    })
    .error(function(data){
      alert("Error");
    });

  });

  $(".coords_submit").click(function(){
    lat = $("#lat").val();
    lon = $("#lon").val();

    $.ajax({
      type: 'get',
      url: '/moon_images/query_on_coords',
      data: 'lat=' + lat + '&lon=' + lon
    }).success(function(data) {
      addNetworkLinks(data);
    })
    .error(function(data){
      alert("Error");
    });

  });

    function initCB(instance) {
      ge = instance;
      ge.getWindow().setVisibility(true);

        addSampleButton('MoonKAM Images - Load!!', buttonClick6);
        addSampleButton("Fly to 1", flyToCordinates("-142.0868,15.16"));
        addSampleButton("Fly to 2", flyToCordinates("-175.89,-23.163"));

      // add a navigation control
      ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

      // add some layers
      ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
      ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

      // just for debugging purposes
      document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();


    }

    function addSampleButton(caption, clickHandler) {
          var btn = document.createElement('input');
          btn.type = 'button';
          btn.value = caption;
          btn.addEventListener('click', clickHandler);

        document.getElementById('sample-ui').appendChild(btn);
    }

    function addSampleUIHtml(html) {
      document.getElementById('sample-ui').innerHTML += html;
    }

    function failureCB(errorCode) {
    }

  google.setOnLoadCallback(init);

});
