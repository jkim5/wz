// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_DHT/Adafruit_DHT.h"



// Sensor type
#define DHTTYPE DHT11    	// DHT 11

#define DHT_5V_PIN D2
#define DHT_SENSOR_PIN D3
#define DHT_GROUND_PIN D1

DHT dht(DHT_SENSOR_PIN, DHTTYPE);

int led = D0; // This is where your LED is plugged in.
double temperature;
double humidity;
double originalTemp;
int timeSinceStart;
int timeStarted;


void setup() {

    pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)

    // Give power to the sensor
    pinMode(DHT_5V_PIN, OUTPUT);
    pinMode(DHT_GROUND_PIN, OUTPUT);
    digitalWrite(DHT_5V_PIN, HIGH);
    digitalWrite(DHT_GROUND_PIN, LOW);

    // Wait for the sensor to stabilize
    delay(1000);

    // Initialize sensor
    dht.begin();

    // We are going to declare a Spark.variable() here so that we can access the value of the DHT from the cloud.
    Spark.variable("temperature", &temperature, DOUBLE);
    Spark.variable("humidity", &humidity, DOUBLE);
    Spark.variable("originalTemp", &originalTemp, DOUBLE);
    Spark.variable("timeSinceStart", &timeSinceStart, INT);

    // This is saying that when we ask the cloud for the function "led", it will employ the function ledToggle() from this app.
    Spark.function("led",ledToggle);

}


void loop() {

temperature = dht.getTempFarenheit();
humidity = dht.getHumidity();

    if (digitalRead(led)==HIGH) {                    // only calculate timeSinceStart if the heaters are on. Should HIGH be '1' instead?
        timeSinceStart = Time.now() - timeStarted;   // time that the last 'on' command was given in seconds
    }
    else {
        timeSinceStart = 0;
    }

delay(5000);

}


// Finally, we will write out our ledToggle function, which is referenced by the Spark.function() called "led"
int ledToggle(String command) {

    if (command=="on") {
        digitalWrite(led,HIGH);
        timeStarted = Time.now();             // set the start time in seconds 
        originalTemp = dht.getTempFarenheit();         // set original temperature
        return 1;
    }
    else if (command=="off") {
        digitalWrite(led,LOW);
        return 0;
    }
    else {
        return -1;
    }

}

