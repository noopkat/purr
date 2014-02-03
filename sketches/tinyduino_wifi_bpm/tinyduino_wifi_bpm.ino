/* 
*  Tiny WiFi temperature sensor with Arduino, the TMP36 sensor & the CC3000 chip
*  Written by Marco Schwartz for Open Home Automation
*  Further hacked by @noopkat for use with pulse sensor lib
*/

// Include required libraries
#include <Adafruit_CC3000.h>
#include <ccspi.h>
#include <SPI.h>
#include <string.h>
//#include "utility/debug.h"
#include<stdlib.h>

// Define CC3000 chip pins
#define ADAFRUIT_CC3000_IRQ   2
#define ADAFRUIT_CC3000_VBAT  A3
#define ADAFRUIT_CC3000_CS    8

// WiFi network (change with your settings !)
#define WLAN_SSID       ""        // cannot be longer than 32 characters!
#define WLAN_PASS       ""
#define WLAN_SECURITY   WLAN_SEC_WPA // This can be WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA or WLAN_SEC_WPA2

// Create CC3000 instance
Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT, SPI_CLOCK_DIV2);
                                         
// Local server IP, port, and repository (change with your settings !)
uint32_t ip = cc3000.IP2U32(172,0,0,1);
int port = 80;
String repository = "/";
byte mac[6];

//  VARIABLES
int pulsePin = 0;                 // Pulse Sensor purple wire connected to analog pin 0
int blinkPin = 13;                // pin to blink led at each beat

// these variables are volatile because they are used during the interrupt service routine!
volatile int BPM;                   // used to hold the pulse rate
volatile int Signal;                // holds the incoming raw data
volatile int IBI = 600;             // holds the time between beats, the Inter-Beat Interval
volatile boolean Pulse = false;     // true when pulse wave is high, false when it's low
volatile boolean QS = false;        // becomes true when Arduoino finds a beat.

                         
void setup(void)
{
 
  Serial.begin(115200);
    
  // Initialise the CC3000 module
  if (!cc3000.begin())
  {
    while(1);
  }
  
  // Connect to  WiFi network
  cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY);
  Serial.println("Connected to WiFi network!");
    
  // Check DHCP
  Serial.println(F("Request DHCP"));
  while (!cc3000.checkDHCP())
  {
    delay(100);
  }  
  
  pinMode(blinkPin,OUTPUT);         // pin that will blink to your heartbeat!
  Serial.begin(115200);             // we agree to talk fast!
  interruptSetup();                 // sets up to read Pulse Sensor signal every 2mS 
  int count = 0;
  
  String request = "POST "+ repository + " HTTP/1.0";

}

void loop(void)
{
  Serial.println("looping again!");
  
  // Quantified Self flag is true when arduino finds a heartbeat
  if (QS == true){                       
        if (BPM > 90) {
          count += 1;
        }
        if (count == 5000) {
          // send a kitten!
          send_request(request);
          // delay for a long time after sending a kitten, so we don't overwhelm the poor person with omg kittennnzzzzz every second
          delay(500000);
        }
        // reset the Quantified Self flag for next time  
        QS = false;
     }
    
    // Update every 5 seconds
    delay(5000);
}

// Function to send a TCP request and get the result as a string
void send_request (String request) {
     
    // Connect    
    Serial.println("Starting connection to server...");
    Adafruit_CC3000_Client client = cc3000.connectTCP(ip, port);
    
    // Send request
    if (client.connected()) {
      client.println(request);      
      client.println(F(""));
      Serial.println("Connected & Data sent");
    } 
    else {
      Serial.println(F("Connection failed"));    
    }

    while (client.connected()) {
      while (client.available()) {

      // Read answer
      char c = client.read();
      }
    }
    Serial.println("Closing connection");
    Serial.println("");
    client.close();    
    Serial.println("Connection closed.");
}