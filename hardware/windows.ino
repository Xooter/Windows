#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <Stepper.h>

const char* ssid     = "*******";
const char* password = "*******";

ESP8266WebServer server(80);


const int relayOpenPin  = D1;    // GPIO04
const int relayClosePin = D2;    // GPIO05

const int stepsPerRevolution = 200;
Stepper myStepper(stepsPerRevolution, 14, 16, 12, 13);

unsigned long relayOpenTimer = 0;
unsigned long relayCloseTimer = 0;

const unsigned long RELAY_DURATION = 60000;

bool isRelayOpenActive = false;
bool isRelayCloseActive = false;


void handleRoot() {
    server.send(200, "text/plain", "ESP8266 está activo");
}

void handleCortina() {
    if (!server.hasArg("plain")) {
        server.send(400, "application/json", "{\"status\":\"Solicitud sin cuerpo\"}");
        return;
    }

    String body = server.arg("plain");

    int speed = 50;
    
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, body);

    if (error) {
        Serial.println("Error al parsear JSON en /open-cortina");
        server.send(400, "application/json", "{\"status\":\"JSON inválido\"}");
        return;
    }

    if (!doc.containsKey("steps")) {
        server.send(400, "application/json", "{\"status\":\"Falta el campo 'steps'\"}");
        return;
    }

    int pasos = doc["steps"];
    Serial.println("Moviendo cortina con " + String(pasos) + " pasos");

    int totalSteps = abs(pasos);
    int stepBlock = 200; 
    int iterations = totalSteps / stepBlock;
    int remainingSteps = totalSteps % stepBlock;

    for (int i = 0; i < iterations; i++) {
        yield();
        myStepper.step((pasos > 0) ? stepBlock : -stepBlock); 
    }

    if (remainingSteps > 0) {
        yield();
        myStepper.step((pasos > 0) ? remainingSteps : -remainingSteps); 
    }

    stopMotor();

    server.send(200, "application/json", "{\"status\":\"Moviendo cortina\"}");
}


void handleOpen() {
    if (isRelayCloseActive) {
        digitalWrite(relayClosePin, LOW);
        isRelayCloseActive = false;
        relayCloseTimer = 0;
        Serial.println("Rele de cierre desactivado para activar el rele de apertura");
        delay(200);
    }


    digitalWrite(relayOpenPin, HIGH);
    isRelayOpenActive = true;
    relayOpenTimer = millis();
    Serial.println("Abriendo persiana...");

    server.send(200, "text/plain", "Abriendo persiana...");
}


void handleClose() {
    if (isRelayOpenActive) {
        digitalWrite(relayOpenPin, LOW);
        isRelayOpenActive = false;
        relayOpenTimer = 0;
        Serial.println("Rele de apertura desactivado para activar el rele de cierre");
        delay(200);
    }

    digitalWrite(relayClosePin, HIGH);
    isRelayCloseActive = true;
    relayCloseTimer = millis();
    Serial.println("Cerrando persiana...");

    server.send(200, "text/plain", "Cerrando persiana...");
}

void stopAll(){
  digitalWrite(relayClosePin, LOW);
  digitalWrite(relayOpenPin, LOW);

  Serial.println("Parada forzosa");

  server.send(200, "text/plain", "Parada forzosa");
}

void setup() {
    Serial.begin(115200);

    myStepper.setSpeed(50);

    // pines del motor
    pinMode(13, OUTPUT);
    pinMode(12, OUTPUT);
    pinMode(14, OUTPUT);
    pinMode(16, OUTPUT);
    stopMotor();
    //

    pinMode(relayOpenPin, OUTPUT);
    digitalWrite(relayOpenPin, LOW);

    pinMode(relayClosePin, OUTPUT);
    digitalWrite(relayClosePin, LOW);

    WiFi.begin(ssid, password);
    Serial.print("Conectando a WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.print("Conectado a WiFi. IP: ");
    Serial.println(WiFi.localIP());

    server.on("/", handleRoot);
    server.on("/open", HTTP_GET, handleOpen);  
    server.on("/close", HTTP_GET, handleClose); 
    server.on("/stop-all", HTTP_GET, stopAll); 

    
    server.on("/cortina", HTTP_POST, handleCortina);

    server.begin();
    Serial.println("Servidor HTTP iniciado");
}

void stopMotor(){
    digitalWrite(13, LOW);
    digitalWrite(12, LOW);
    digitalWrite(14, LOW);
    digitalWrite(16, LOW);
}

void loop() {
    server.handleClient();

    unsigned long currentMillis = millis();

    if (isRelayOpenActive && (currentMillis - relayOpenTimer >= RELAY_DURATION)) {
        digitalWrite(relayOpenPin, LOW);
        isRelayOpenActive = false;
        relayOpenTimer = 0;
        Serial.println("Rele de apertura desactivado luego de 1 minuto");
    }

    if (isRelayCloseActive && (currentMillis - relayCloseTimer >= RELAY_DURATION)) {
        digitalWrite(relayClosePin, LOW);
        isRelayCloseActive = false;
        relayCloseTimer = 0;
        Serial.println("Rele de cierre desactivado luego de 1 minuto");
    }
}
