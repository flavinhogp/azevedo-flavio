const path = require("path");
const DBPATH = 'dbUser.db';

// Importa as configurações do app
require("dotenv").config({ encoding: "utf8", path: path.join(__dirname, ".env") });

const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const sqlite3 = require('sqlite3').verbose();
const app = express();


app.use(express.static("./frontend/"));
app.use(express.json());


/* Definição dos endpoints */

app.get('/', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  	var sql = 'SELECT * FROM tbUser ORDER BY title COLLATE NOCASE ';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		//res.json(rows);
		for (var i = 0; i < rows.length; i++){
			var linha = rows[i];
			res.write('<div style="padding: 10px"><span style="font-size: 120%;">' + rows[i].userId + '</span><span style="color: blue; width: 300px">'+ rows[i].title +'</span></div>');
		  }
	});
	db.close(); // Fecha o banco
});
	 
	  
app.get('/users', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	var db = new sqlite3.Database(DBPATH);
  var sql = 'SELECT * FROM tbUser ORDER BY title COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close();
});


app.post('/userinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "INSERT INTO tbUser (title, id, completed) VALUES ('" + req.body.title + "', 33, false)";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close();
	res.end();
});

/* Inicia o servidor */
const server = app.listen(parseInt(process.env.PORT), process.env.IP, () => {
	console.log("Servidor executando na porta " + server.address().port);
});