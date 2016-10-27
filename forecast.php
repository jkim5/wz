<?php

  $apikey = '83d76dba53e08c6f14c1cf4e234b2c6c';
  //cabin lat/long
  $lat = '45.1480915';
  $long = '-92.7287668';

  $response = file_get_contents("https://api.darksky.net/forecast/" . $apikey ."/" . $lat . "," . $long );


  echo $response;

?>