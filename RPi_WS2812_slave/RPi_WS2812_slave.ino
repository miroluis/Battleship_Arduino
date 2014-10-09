#include <Wire.h>
#include <Streaming.h>
#include <Adafruit_NeoPixel.h>

//#define DEBUG

#define HOWMANYLEDS 100

#define PIN 6

Adafruit_NeoPixel panel6 = Adafruit_NeoPixel(HOWMANYLEDS, PIN, NEO_GRB + NEO_KHZ800);

int led = 0;
int r = 0;
int g = 0;
int b = 0;

void setup(){
  #ifdef DEBUG
  Serial.begin(9600);         // start serial for output
  #endif
  
  Wire.begin(3);                // join i2c bus with address #3
  Wire.onReceive(receiveEvent); // register event
  
  panel6.begin();
  for(int i = 0; i < HOWMANYLEDS; i++)  //limpar o que já lá estava
    panel6.setPixelColor(i, 0);
  panel6.show();
}

void loop(){
}

// function that executes whenever data is received from master
// this function is registered as an event, see setup()
void receiveEvent(int howMany){
  led = Wire.read();
  Wire.read();
  r = Wire.read();
  g = Wire.read();
  b = Wire.read();
  
  panel6.setPixelColor(led, r, g, b);
  panel6.show();
  Serial << led << ' ' << r << ' ' << g << ' ' << b << endl;
}
