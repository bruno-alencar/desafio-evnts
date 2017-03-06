var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProductController', function(){

	it('#listagem json', function(done){
		request.get('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	})

	it('#listagem html', function(done){
		request.get('/produtos')
		.set('Accept', 'text/html')
		.expect('Content-Type', /text\/html/)
		.expect(200,done);

	})

	it('#cadastro de novo produto com dados inválidos', function(done){
		request.post('/produtos')
		.send({name:"", description:"testes"})
		.expect(400,done);
	})

	it('#cadastro de novo produto com dados válidos', function(done){
		request.post('/produtos')
		.send(
			{
				name:"Produto de teste",
				category: "Teste",
				price: 20.50,
				description: "Testando os produtos",
				url_img: "https://img.elo7.com.br/product/original/E88526/caneca-angry-birds-porco-angry-birds.jpg"
		})
		.expect(302,done);
	})
});