$(function(){

  var accessToken = '2ac330670fb43313c298f78725bec0e872546eae'
  var coreID = '51002d001951353338363036'
  var baseURL = 'https://api.particle.io/v1/devices/'
  // var url = baseURL + coreID + '/' + method;

  var temperature; var humidity; var originalTemp; var tempRise; var timeSinceStart; var outsideTemp;
  var wait;

  $('#heatON').click(function(){

  $('#heatON').html('🔥').addClass('spin');
  $('#heatOFF').html('')
  $('#getStatus').html('')

  $.post( baseURL + coreID + '/led' +  '?access_token=' + accessToken, { args: 'on' })
  .done(function( data ) {

    console.log(data );
    popup('heat is on!')
    clearWait();

  }).fail(function() {

    popup('error: could not connect to wz')
    console.error('Could not connect');
    clearWait();

  });
  });

  $('#heatOFF').click(function(){

  $('#heatOFF').html('⛄️').addClass('spin');
  $('#heatON').html('')
  $('#getStatus').html('')

  $.post( baseURL + coreID + '/led' +  '?access_token=' + accessToken, { args: 'off' })
  .done(function( data ) {

      console.log(data);
      popup('heat is now off.')
      clearWait();

  }).fail(function() {

    popup('error: could not connect to wz')
    console.error('Could not connect');
    clearWait();

  })
  });

  $('#getStatus').click(function(){

    $('#getStatus').html('🌡').addClass('spin');
    $('#heatON').html('')
    $('#heatOFF').html('')

    $.get( baseURL + coreID + '/temperature' +  '?access_token=' + accessToken)
    .done(function( data ) {
      console.log(data);
      temperature = Math.round( data.result * 10) / 10; ;

        $.get( baseURL + coreID + '/originalTemp' +  '?access_token=' + accessToken)
        .done(function( data ) {
          console.log(data);
          originalTemp = data.result

          tempRise = Math.round( (temperature - originalTemp) * 10) / 10; //calculate the rise in temp since turning on the heat.

          $.get( baseURL + coreID + '/tSinceStart' +  '?access_token=' + accessToken)
          .done(function( data ) {
            console.log(data);
            timeSinceStart = data.result;

            // $.get( baseURL + coreID + '/humidity' +  '?access_token=' + accessToken)
            // .done(function( data ) {
            //   humidity = data.result;

            $.getJSON( 'forecast.php')
            .done(function( data ) {
              console.log(data)
              outsideTemp = data.currently.apparentTemperature;

            if(timeSinceStart == 0){
              popup(
                '🏞 ' + outsideTemp + 'º'
                + '<br>' +
                '🏠 ' + temperature + 'º'
                + '<br>' +
                'heat is off.'
                // + '<br>' +
                // humidity + '% humidity'
              )
            }else{
              popup(
                '🏞 ' + outsideTemp + 'º'
                + '<br>' +
                '🏠 ' + temperature + 'º'
                + '<br>' +
                'heat is on!'
                + '<br>' +
                tempRise + 'º rise in '
                + hhmmss(timeSinceStart)
                + '<br>' +
                hhmmss(14000 - timeSinceStart ) + ' of heat remaining' //remember to change this value if we cnahge it in ||| cabin_heat.ino
                // + '<br>' +
                // humidity + '% humidity'
              )
            }
            clearWait();

          // }) //humidity close
        }) //outsideTemp close
        }) // originalTemp close
      }) //tSinceStart close
    }).fail( function(){
      popup('error: could not connect to wz')
      console.error('Could not connect ' + data);
      clearWait();
    })
  })



  //a generic popup message in the middle of the screen with a white background.
  function popup (message) {
    $('.pop').show().css('display', 'flex')
    $('.message').html(message)
  }

  function clearWait(){
        $('#heatON').html('turn on heat').removeClass('spin')
        $('#heatOFF').html('turn off heat').removeClass('spin')
        $('#getStatus').html('status report').removeClass('spin')
  }

  function hhmmss (secs) {
    var minutes = Math.floor(secs / 60)
    secs = secs % 60
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60

    // function pad(num) {
    //   return ('0'+num).slice(-2);
    // }
    // return pad(hours)+'h '+pad(minutes)+'m '+pad(secs)+'s';

    if (hours >= 1) {
      return hours + 'h ' + minutes + 'm ' + secs + 's'
    } else if (hours < 1 && minutes >= 1) {
      return minutes + 'm ' + secs + 's'
    } else if (hours < 1 && minutes < 1) {
      return secs + 's'
    }
  }

  $('.pop').click(function () {
    $('.pop').fadeOut()
  })
})
