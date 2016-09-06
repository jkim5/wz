$(function(){

var accessToken = "2ac330670fb43313c298f78725bec0e872546eae";
var coreID = "51002d001951353338363036";
var baseURL = "https://api.particle.io/v1/devices/";
// var url = baseURL + coreID + "/" + method;

var temperature; var humidity; var originalTemp; var tempRise; var timeSinceStart;

var wait;

$('#heatON').click(function(){

  waiting('#heatON', 100);

  $.post( baseURL + coreID + "/led" +  "?access_token=" + accessToken, { args: "on" })
  .done(function( data ) {

    $('#heatON').html('turn on heat')
    clearInterval(wait);

    console.log(data );
    popup('heat is now on!')

  }).fail(function() {

    popup('error: could not connect to wz')
    console.error("Could not connect");

    $('#heatON').html('turn on heat')
    clearInterval(wait);

  });
});

$('#heatOFF').click(function(){

  waiting('#heatOFF', 100);

  $.post( baseURL + coreID + "/led" +  "?access_token=" + accessToken, { args: "off" })
  .done(function( data ) {

      $('#heatOFF').html('turn off heat')
      clearInterval(wait);

      console.log(data);
      popup('heat is now off.')

  }).fail(function() {

    popup('error: could not connect to wz')
    console.error("Could not connect");

    $('#heatOFF').html('turn off heat')
    clearInterval(wait);

  })
});

$('#getStatus').click(function(){

  waiting('#getStatus', 100);

  $.get( baseURL + coreID + "/temperature" +  "?access_token=" + accessToken)
  .done(function( data ) {

  var roundedResult = Math.round(data.result * 10) / 10
  temperature = roundedResult;

    // $.get( baseURL + coreID + "/humidity" +  "?access_token=" + accessToken)
    // .done(function( data ) {
    //   humidity = data.result;

      $.get( baseURL + coreID + "/originalTemp" +  "?access_token=" + accessToken)
      .done(function( data ) {
        originalTemp = data.result;

        tempRise = temperature - originalTemp; //calculate the rise in temp since turning on the heat. 

        $.get( baseURL + coreID + "/timeSinceStart" +  "?access_token=" + accessToken)
        .done(function( data ) {

          timeSinceStart = data.result;
          timeSinceStart = timeSinceStart / 3600; // convert seconds to hours

          $('#getStatus').html('temperature')
          clearInterval(wait);

          popup(
            temperature + 'º'
            + '<br>' +
            tempRise + 'º rise in ' + timeSinceStart;
          )

        // })
      })
    })
  }).fail(function() {
    popup('error: could not connect to wz')
    console.error("Could not connect");

    $('#getStatus').html('temperature')
    clearInterval(wait);

  })

});

// $('#tempFETCH').click(function(){
//
//   $.get( baseURL + coreID + "/temperature" +  "?access_token=" + accessToken)
//   .done(function( data ) {
//     console.log(data);
//       var roundedResult = Math.round(data.result * 10) / 10
//       popup(roundedResult + 'º')
//
//   }).fail(function() {
//     popup('ERROR: could not connect to WZ')
//     console.error("Could not connect");
//   })
//
// });
//
// $('#humidFETCH').click(function(){
//
//   $.get( baseURL + coreID + "/humidity" +  "?access_token=" + accessToken)
//   .done(function( data ) {
//     console.log(data);
//       popup(data.result + " %")
//
//   }).fail(function() {
//     popup('ERROR: could not connect to WZ')
//     console.error("Could not connect");
//   })
//
// });

  //a generic popup message in the middle of the screen with a white background.
  function popup(message){

    $('.message').html(message);
    $('.pop').fadeIn().css('display', 'flex');

    setTimeout(function(){
        $('.pop').fadeOut();
    },2000)


  }


  function waiting(selector, speed){
    var pos = 0;
    wait = setInterval(function(){
      if(pos == 0){
        $(selector).html('|---')
      }
      if(pos == 1){
        $(selector).html('-|--')
      }
      if(pos == 2){
        $(selector).html('--|-')
      }
      if(pos == 3){
        $(selector).html('---|')
      }

      if( pos > 3 ){ pos = 0 }else{ pos++ }

    }, speed);

  }

})



