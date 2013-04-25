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

  function flyToCordinates(coords) {
    return function(){
      var bits = coords.split(',');
      var lookAt = ge.createLookAt('');
      lookAt.set(parseFloat(bits[0]), parseFloat(bits[1]), 10, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 10, 140000);
      ge.getView().setAbstractView(lookAt);
    };
  }

  $(".terrain_submit").click(function(){
    getTerrainElevation(); 
  });
  
  function getTerrainElevation() {

      var networkLink = ge.createNetworkLink("");
      networkLink.setDescription("NetworkLink open to fetched content");
      networkLink.setName("Open NetworkLink");
      networkLink.setFlyToView(true);
  
    //   // create a Link object
     var link = ge.createLink("");
     link.setHref("http://byss.arc.nasa.gov/stereopipeline/dataviz/apollo_metric.kml");
    //   // attach the Link to the NetworkLink
     networkLink.setLink(link);
    // add the NetworkLink feature to Earth
     ge.getFeatures().appendChild(networkLink);
  } 

  $(".craters_submit").click(function(){
    getCraterOverlay(); 
  });

  function getCraterOverlay() {
       var href = 'http://planetarynames.wr.usgs.gov/shapefiles/MOON_nomenclature.kmz';
       //var href = 'http://virtualglobetrotting.com/map/apollo-crater.kml'; 

      google.earth.fetchKml(ge, href, function(kmlObject) {
        if (kmlObject)
            ge.getFeatures().appendChild(kmlObject);
      });
  }
  
 $(".aitken_submit").click(function(){
    flyToAitken();
    //flyToCordinates(-43,348); 
  });
  
  function flyToAitken() {
    var lookAt = ge.createLookAt('');
    //lookAt.set(348, -43, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, -1.811669, 0, 78000);    
    //lookAt.set(51, 350, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 10, 140000);      
    //lookAt.set(0.681400, 23.460550, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, -1.946649, 0, 130);
    //The Aitken basin, the largest crater in the solar system
    lookAt.set(-16.800000, 173.400000, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, -4.378803, 0, 135000);
    ge.getView().setAbstractView(lookAt);          
  }

  $(".lambert_submit").click(function(){
    flyToLambert(); 
  });
  
  function flyToLambert() {
    // The Lambert Lunar crater the largest crater in the solar systevar lookAt = ge.createLookAt('');
    var lookAt = ge.createLookAt('');
    lookAt.set(25.238916, -21.138078, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, -1.811669, 0, 78000);    
    ge.getView().setAbstractView(lookAt);          
  }

 $(".simpleoverlay_submit").click(function(){
    simpleMoonOverlay(); 
  });

  function simpleMoonOverlay() {
    kml_array = [
                "https://moonkam.ucsd.edu/files/kml/kml_generator.php?ccfcommand_id=6858",
                "https://moonkam.ucsd.edu/files/kml/kml_generator.php?ccfcommand_id=2370"]

    for (var i = 0; i < kml_array.length; i++)
    {
      addNetworkLink(kml_array[i]);
    }
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
   
   function addSampleButton(caption, clickHandler) {
          var btn = document.createElement('input');
          btn.type = 'button';
          btn.value = caption;
          btn.addEventListener('click', clickHandler);
          document.getElementById('sample-ui').appendChild(btn);
    }

    function initCB(instance) {
      ge = instance;
      ge.getWindow().setVisibility(true);

       // addSampleButton('MoonKAM Images - Load!!', buttonClick6);
       // addSampleButton("Fly to 1", flyToCordinates("-142.0868,15.16"));
       // addSampleButton("Fly to 2", flyToCordinates("-175.89,-23.163"));

      // add a navigation control
      ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

      // add some layers
      ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
      ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

      // just for debugging purposes
      document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();


    }

 
    function addSampleUIHtml(html) {
      document.getElementById('sample-ui').innerHTML += html;
    }

    function failureCB(errorCode) {
    }

  google.setOnLoadCallback(init);

});
