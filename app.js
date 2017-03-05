var app = require('./config/express')();
var port = 3003

app.listen(port, function(){
	console.log("listening localhost:" + port);
});

