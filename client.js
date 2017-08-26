var mqtt = require('mqtt');  //npm install mqtt
var url = "mqtt://127.0.0.1"; //you can use personal server url or ip address

var options = {
  port: 1883,
  clientId: 'mqtjs_' + Math.random().toString(16).substr(2, 8)
};

//if run in local machine with port number 1883
//client = mqtt.connect({port:1883});

//if run in remote machine or server
client = mqtt.connect(url,options);

//publish or send message
client.publish("serverTopic","Hello MQTT");

