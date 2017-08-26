var mysql = require('mysql'); //npm install mysql
var mqtt = require('mqtt');   //npm install mqtt

//database connection, if required
var connection = mysql.createConnection({
   "host": "localhost",
   "user": "root",
   "password": "",
   "database": "myDatabaseName",
});

var options = {
  port: 1883,
  clientId: 'mqtjs_' + Math.random().toString(16).substr(2, 8)
};

client = mqtt.connect({port:1883});

//
client.on('connect', function () {
    client.subscribe('serverTopic', function(){
        client.on('message', function (topic, message) {
            message1 = message.toString();
            console.log(message1);
            SearchAnswers(message1)
        }); 
    });
});


function SearchAnswers(msg){
	console.log('message from client: '+msg);
  
  //select query
   connection.query('SELECT * FROM answers', function(err, rows, fields)
   {
        console.log('Connection result error '+err);
        console.log(rows)

        if (!err) {
            rows.forEach(function(row) {
                var str = JSON.stringify(rows)
                var parsed = JSON.parse(str);
            });
        }else {
            console.log('Error while performing Query.' + err);
        }       
    });
    
    //insert query
    //connection.query('insert into answers(answers) values (?)',[msg],function(err, rows, fields){
     //   if (err) throw err;
        //else readData();;
    //});
}

