var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
	maxConnections : 10,

	callback : function (error, res, done) {
		if(error){
			console.log(error);
		}else{

			var $ = res.$;
			getItens($);
		}
		done();
	}
});

c.queue("https://www.buzzfeed.com/marizatz/21-produtos-japoneses-bizarros-1whk7?utm_term=.kmP6Lmvgr#.tyLwO8BN6");

function getItens($){

	var images = $('.sub_buzz_content').find('img').map(function(){
		return $(this).attr('rel:bf_image_src');
	}).get();

	var names = $('.solid').find('h2').map(function(){
		return $(this).text();
	}).get();

	var descriptions = $(".sub_buzz_desc_w_attr").map(function(){
		return $(this).text();
	}).get();

	names = getName(names);

	save(images, names, descriptions);
}

function getName(nomes){

	for(var i =0; i < nomes.length; i++){
		var teste = nomes[i].substring(6,nomes[i].length);

		if(teste.indexOf(".") == 0){
			teste = nomes[i].substring(8,nomes[i].length);
		}

		nomes[i] = teste;
	}
	nomes = nomes.splice(0,nomes.length-2);
	return nomes;
}

function save(images, names, descriptions){
	var price = 15.49;
	var products = [];

	for(var i = 0; i < images.length; i++){
		price = price+i;

		if(i < 14){
			var product = {
				name: names[i],
				description: descriptions[i],
				url_img: images[i],
				category: 'buzzfeed',
				price: price
			}
		}else if(i < 18){
			var product = {
				name: names[i],
				description: descriptions[i+1],
				url_img: images[i],
				category: 'buzzfeed',
				price: price
			}
		}else{
			var product = {
				name: names[i],
				description: descriptions[i+1],
				url_img: images[i+1],
				category: 'buzzfeed',
				price: price
			}
		}

		if(i <images.length-1){
		products.push(product);	
		}
	}

	console.log(products);
	// for(product in products){
		client.end(JSON.stringify(products));
	// }
	
}

var http = require('http');

var configuracoes = {
	hostname: 'localhost',
	port:3003,
	path:'/produtos/all',
	method:'post',
	headers:{
		'Accept':'application/json',
		'Content-type':'application/json'
	}
}

var client = http.request(configuracoes, function(res){
	console.log(res.statusCode);

	res.on('data', function(body){
		console.log('Corpo:'+body);
	});
});
