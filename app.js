$(function(){

var accessToken = "2ac330670fb43313c298f78725bec0e872546eae";
var coreID = "51002d001951353338363036";
var baseURL = "https://api.particle.io/v1/devices/"
// var url = baseURL + coreID + "/" + method;

$('#heatON').click(function(){

  $.post( baseURL + coreID + "/led" +  "?access_token=" + accessToken, { args: "on" })
  .done(function( data ) {

    console.log(data );
    popup('heat is now on!')

  }).fail(function() {

    popup('ERROR: could not connect to WZ')
    console.error("Could not connect");

  });
});

$('#heatOFF').click(function(){
  $.post( baseURL + coreID + "/led" +  "?access_token=" + accessToken, { args: "off" })
  .done(function( data ) {

      console.log(data);
      popup('heat is now off.')

  }).fail(function() {

    popup('ERROR: could not connect to WZ')
    console.error("Could not connect");

  })
});

$('#tempFETCH').click(function(){

  $.get( baseURL + coreID + "/analogvalue" +  "?access_token=" + accessToken)
  .done(function( data ) {
    console.log(data);
      popup(data.result + 'º')

  }).fail(function() {
    popup('ERROR: could not connect to WZ')
    console.error("Could not connect");
  })

});

//a generic popup message in the middle of the screen with a white background.
function popup(message){

  $('.message').text(message);
  $('.pop').fadeIn().css('display', 'flex');

  setTimeout(function(){
      $('.pop').fadeOut();
  },2000)


}

})
