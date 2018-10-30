const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const engines = require('consolidate');
const { Pool, Client } = require('pg');
const cors = require('cors');
const connectionString = 'postgresql://postgres:pgpassword@localhost:5432/mdnotes';

const client = new Client({
	connectionString: connectionString,
});
client.connect();

const pool = new Pool({
	connectionString: connectionString,
	max: 20,
});

const Users = [];
client.query('SELECT * FROM  userauthdata WHERE deleted IS NULL', (err, res) => {
	Users = res.rows;
	client.end();
});

let sessionStore = {};

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', '/src');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({ secret: 'SOME_KEY' }));
app.use(cors());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/login', function(req, res) {
	if (sessionStore.loggedinuser) {
		sessionStore.loggedinuser = '';
	}

	const matchFound = false;
	let userProf = {};

	Users.filter(function(user) {
		if (user.userid == req.body.u && user.password == req.body.p) {
			matchFound = true;
			userProf = user;
		}
	});

	if (matchFound) {
		sessionStore.loggedinuser = req.body.u;
		sessionStore.usertype = userProf.role;

		res.status(200).json({
			loginStatus: 'successful',
		});
	} else {
		res.send('Invalid Credentials');
	}
});

app.post('/savenote', function(req, res) {
	if (sessionStore.loggedinuser) {
		pool.connect((err, client, release) => {
			if (err) {
				return console.error('Error acquiring client', err.stack);
			}
			client.query(
				`UPDATE notesdata SET note='${req.body.noteText}' WHERE noteid=${req.body.id}`,
				(err, result) => {
					release();
					if (err) {
						return console.error('Error executing query', err.stack);
					}
					res
						.status(200)
						.json({
							noteSaved: true,
							noteId: req.body.id,
							noteText: req.body.noteText,
						});
				},
			);
		});
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.post('/updaterole', function(req, res) {
	if (sessionStore.loggedinuser && sessionStore.usertype === 'superadmin') {
		pool.connect((err, client, release) => {
			if (err) {
				return console.error('Error acquiring client', err.stack);
			}
			client.query(
				`UPDATE userauthdata SET role='${req.body.roleType}' WHERE userid='${
					req.body.uid
				}'`,
				(err, result) => {
					release();
					if (err) {
						return console.error('Error executing query', err.stack);
					}
					res.status(200).json({ roleUpdated: true });
				},
			);
		});
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.post('/logout', function(req, res) {
	if (sessionStore.loggedinuser) {
		sessionStore = {};
		res.status(200).json({ logout: 'successful' });
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.post('/createnewnote', function(req, res) {
	if (sessionStore.loggedinuser) {
		pool.connect((err, client, release) => {
			if (err) {
				return console.error('Error acquiring client', err.stack);
			}
			client.query(
				`INSERT INTO notesdata (userid,note,category) VALUES ('${
					sessionStore.loggedinuser
				}','New Note','office')`,
				(err, result) => {
					release();
					if (err) {
						return console.error('Error executing query', err.stack);
					}
					res.status(200).json({ newNoteCreated: true });
				},
			);
		});
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.post('/deletenote', function(req, res) {
	if (sessionStore.loggedinuser) {
		pool.connect((err, client, release) => {
			if (err) {
				return console.error('Error acquiring client', err.stack);
			}
			client.query(
				`UPDATE notesdata SET deleted=now()::timestamp WHERE noteid=${req.body.noteid}`,
				(err, result) => {
					release();
					if (err) {
						return console.error('Error executing query', err.stack);
					}
					res.status(200).json({ deletionSuccess: true });
				},
			);
		});
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.get('/getusers', function(req, res) {
	if (sessionStore.loggedinuser) {
		pool.connect((err, client, release) => {
			if (err) {
				return console.error('Error acquiring client', err.stack);
			}
			client.query(`SELECT * FROM userauthdata WHERE deleted IS NULL`, (err, result) => {
				release();
				if (err) {
					return console.error('Error executing query', err.stack);
				}
				res.status(200).json({ users: result.rows });
			});
		});
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.get('/usernotes', function(req, res) {
	if (sessionStore.loggedinuser) {
		pool.connect((err, client, release) => {
			if (err) {
				return console.error('Error acquiring client', err.stack);
			}
			client.query(
				`SELECT * FROM notesdata WHERE userid='${
					sessionStore.loggedinuser
				}' AND deleted IS NULL`,
				(err, result) => {
					release();
					if (err) {
						return console.error('Error executing query', err.stack);
					}
					res.status(200).json({ notes: result.rows });
				},
			);
		});
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.get('/getusertype', function(req, res) {
	if (sessionStore.loggedinuser) {
		res.status(200).json({ userType: sessionStore.usertype });
	} else {
		res.json({ notLoggedIn: true });
	}
});

app.get('/checklogin', function(req, res) {
	if (sessionStore.loggedinuser) {
		res.status(200).json({ loggedin: true });
	} else {
		res.json({ notLoggedIn: true });
	}
});

console.log('serving on port:3030');
app.listen(3030);
