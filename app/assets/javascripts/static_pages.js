google.load("earth", "1");

$(function(){
  var ge;

  function init() {

    google.earth.createInstance('map3d', initCB, failureCB, { database: 'http://khmdb.google.com/?db=moon' })
    // var allTextLines = url;
    // var lines = $.csv.toArray(allTextLines);
    // addSampleButton(lines[1][25], buttonClick)
   }

  // function buttonClick4() {

  //   var networkLink = ge.createNetworkLink("");
  //   networkLink.setDescription("NetworkLink open to fetched content");
  //   networkLink.setName("Open NetworkLink");
  //   networkLink.setFlyToView(true);

  //   // create a Link object
  //   var link = ge.createLink("");
  //   link.setHref("http://byss.arc.nasa.gov/stereopipeline/dataviz/apollo_metric.kml");
  //   // attach the Link to the NetworkLink
  //   networkLink.setLink(link);
  //   // add the NetworkLink feature to Earth
  //   ge.getFeatures().appendChild(networkLink);
  // }

  // function buttonClick5() {
  //   var href = 'http://planetarynames.wr.usgs.gov/shapefiles/MOON_nomenclature.kmz';
  //   google.earth.fetchKml(ge, href, function(kmlObject) {
  //     if (kmlObject)
  //       ge.getFeatures().appendChild(kmlObject);
  //   });

  // }

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
    var bits = coords.split(',');
    var lookAt = ge.createLookAt('');
    lookAt.set(parseFloat(bits[0]), parseFloat(bits[1]), 10, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 10, 140000);
    ge.getView().setAbstractView(lookAt);
  }

  // function buttonClick3() {
  //     var lookAt = ge.createLookAt('');
  //   lookAt.set(25.238916, -21.138078, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, -1.811669, 0, 78000);
  //      ge.getView().setAbstractView(lookAt);
  //   }

    // function buttonClick2() {
    //   var lookAt = ge.createLookAt('');
    //   // The Aitken basin, the largest crater in the solar system
    //   lookAt.set(-16.800000, 173.400000, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, -4.378803, 0, 135000);
    //   ge.getView().setAbstractView(lookAt);
    // }

    // function buttonClick() {
    //     var lookAt = ge.createLookAt('');
    //     lookAt.set(0.681400, 23.460550, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, -1.946649, 0, 130);
    //   ge.getView().setAbstractView(lookAt);
    // }


    function initCB(instance) {
      ge = instance;
      ge.getWindow().setVisibility(true);

      // addSampleUIHtml('<input id="location" type="text" value="Apollo 11"/>');
        // addSampleButton('Fly Apollo!', buttonClick)
        // addSampleButton('Fly Aitken Basin!!', buttonClick2)
        // addSampleButton('Fly Lambert Lunar Crater!!', buttonClick3)
        // addSampleButton('Apollo Zone - Terrain Elevation!!', buttonClick4)
        // addSampleButton('Moon Nonmenclature - Craters!!', buttonClick5)
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
