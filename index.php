<!DOCTYPE>
<html>
<head>
  <title>Electron</title>
</head>
  <body>
  <form action="https://api.particle.io/v1/devices/51002d001951353338363036/led?access_token=2ac330670fb43313c298f78725bec0e872546eae" method="POST">
    Tell your device what to do!<br>
    <br>
    <input type="radio" name="args" value="on">Turn the LED on.
    <br>
    <input type="radio" name="args" value="off">Turn the LED off.
    <br>
    <br>
    <input type="submit" value="Do it!">
  </form>
  </body>
</html>