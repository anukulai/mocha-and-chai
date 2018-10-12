var express = require('express');
var app = express();
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "TEST_DB"
});

connection.connect(function (err) {
    if (!!err) {
        console.log('Err');
    }
    else {
        console.log('Connected');
    }
});


app.use(express.static('public'));
app.get('/a.html', function (req, res) {
    res.sendFile(__dirname + "/" + "a.html");
})

app.get('/process_get', function (req, res) {

    connection.query("insert into clothing (name,cost,department,age,day) values('" + req.query.name + "','" + req.query.cost + "','" + req.query.department + "','" + req.query.age + "','" + req.query.day + "')", function (err, result, fields) {

        if (!!err) {
            console.log("Error occured");
        }
        else {
            console.log("Successful query");
            console.log(result);
        }
    });

    console.log(req.query.first_name);
    res.send("Record inserted successfully" + "<br>" + "NAME: " + req.query.name + "<br>" + "COST: " + req.query.cost + "<br>" + "dept: " + req.query.department + "<br>" + "age: " + req.query.age + "<br>" + "day: " + req.query.day + "<br>");
})

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})

