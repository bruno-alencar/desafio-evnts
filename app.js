var app = require('./config/express')();

var port = process.env.PORT || 3005;

app.listen(port, function(){
	console.log("listening localhost:" + port);
});

