// Requires
require('.././config/config');
const { APIKEY } = require('.././config/config');
const express = require('express');

const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(APIKEY);
require('./../helpers/helpers');

// Directory Paths
const directorioPartials = path.join(__dirname, './../../templates/partials');
const directorioViews = path.join(__dirname, './../../templates/views');

// HBS
hbs.registerPartials(directorioPartials);
app.set('views', directorioViews);
app.set('view engine', 'hbs');// Le configuramos el motor de templates o de vistas

// Models mongodb
const User = require('./../models/user');
const Product = require('../models/product');
const Store = require('./../models/store');

// Session
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
}));

// Paths
app.get('/', (req, res) => {
	res.render('indexdashboard', {});
});

app.get('/indexdashboard', (req, res) => {
	res.render('indexdashboard', {});
});

app.get('/login', (req, res) => {
	res.render('login', {});
});

app.post('/login', (req, res) => {
	User.findOne({ user: req.body.inputUser }, (err, result) => {
		if (err) {
			console.log(err);
		} else if (!result) {
			console.log(result);
			res.render('login', {
				login: req.body.login,
				show: 'Usuario o contraseña incorrectas',
				path: '/login',
				button: 'danger',
			});
		} else if (!bcrypt.compareSync(req.body.inputPassword, result.password)) {
			res.render('login', {
				login: req.body.login,
				show: 'Usuario o contraseña incorrectas',
				path: '/login',
				button: 'danger',
			});
		} else if (result.roll === 'administrador') {
			// session variables
			req.session.id = result._id;
			req.session.user = result.user;
			req.session.sede = result.sede;
			req.session.roll = result.roll;
			req.session.firstname = result.firstname;
			req.session.lastname = result.lastname;
			req.session.email = result.email;
			req.session.cc = result.cc;
			req.session.phone = result.phone;
			req.session.administrador = true;
			if (result.avatar) {
				req.session.avatar = result.avatar.toString('base64');
			}
			res.render('login', {
				login: req.body.login,
				show: 'Bienvenido Administrador',
				path: '/dashboardadmin',
				button: 'success',
			});
		} else if (result.roll === 'gerente') {
			// session variables
			req.session.id = result._id;
			req.session.user = result.user;
			req.session.sede = result.sede;
			req.session.roll = result.roll;
			req.session.firstname = result.firstname;
			req.session.lastname = result.lastname;
			req.session.email = result.email;
			req.session.cc = result.cc;
			req.session.phone = result.phone;
			req.session.gerente = true;
			if (result.avatar) {
				req.session.avatar = result.avatar.toString('base64');
			}
			res.render('login', {
				login: req.body.login,
				show: 'Bienvenido Gerente',
				path: '/dashboardgerente',
				button: 'success',
			});
		} else if (result.roll === 'bodeguero') {
			// session variables
			req.session.id = result._id;
			req.session.user = result.user;
			req.session.sede = result.sede;
			req.session.roll = result.roll;
			req.session.firstname = result.firstname;
			req.session.lastname = result.lastname;
			req.session.email = result.email;
			req.session.cc = result.cc;
			req.session.phone = result.phone;
			if (result.avatar) {
				req.session.avatar = result.avatar.toString('base64');
			}
			res.render('login', {
				login: req.body.login,
				show: 'Bienvenido Bodeguero',
				path: '/dashboardbodeguero',
				button: 'success',
			});
		} else if (result.roll === 'cajero') {
			// session variables
			req.session.id = result._id;
			req.session.user = result.user;
			req.session.sede = result.sede;
			req.session.roll = result.roll;
			req.session.firstname = result.firstname;
			req.session.lastname = result.lastname;
			req.session.email = result.email;
			req.session.cc = result.cc;
			req.session.phone = result.phone;
			if (result.avatar) {
				req.session.avatar = result.avatar.toString('base64');
			}
			res.render('login', {
				login: req.body.login,
				show: 'Bienvenido Cajero',
				path: '/dashboardcajero',
				button: 'success',
			});
		} else {
			res.render('login', {
				registro: req.body.registro,
				show: 'Error',
			});
		}
	});
});

app.get('/dashboarduser', (req, res) => {
	res.render('dashboarduser', {});
});

app.post('/dashboardproduct', (req, res) => {
	console.log(req.body.id);
	Product.findOne({ _id: req.body.id }, (err, product) => {
		if (err) {
			console.log(err);
		} else if (product) {
			console.log(product);
			res.render('dashboardupdateproduct', product);
		} else {
			console.log(product);
		}
	});
});

// Multer destin folder
const upload = multer({
	limits: {
		fileSize: 10000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|jpeg|JPG|PNG|JPEG)$/)) {
			cb(new Error('No es un archivo valido'));
		}
		cb(null, true);
	},
});

app.get('/dashboarduser', (req, res) =>{
	Product.find({}, (err,result)=>{
		if(err){
			console.log(err)
		}	
		res.render ('dashboarduser',{
			listarproductos: req.query.listarproductos,
			articulos: result
		})
	})
});

app.post('/dashboardupdateproduct', upload.single('imagenProducto'), (req, res) => {
	const conditions = {};
	const {
		id, name, type, description, count, price, location,
	} = req.body;
	Object.assign(conditions, {
		name, type, description, count, price, location,
	});
	if (req.file) {
		Object.assign(conditions, { photo: req.file.buffer });
	}

	Product.findOneAndUpdate(
		{ _id: id }, { $set: conditions }, { new: true },
		(err, resultado) => {
			if (err) {
				console.log(err);
				res.render('dashboardupdateproduct', {
					registro: true,
					show: 'No se pudo actualizar este producto',
				});
			} else if (resultado) {
				res.render('dashboardupdateproduct', {
					_id: resultado._id,
					name: resultado.name,
					type: resultado.type,
					photo: resultado.photo,
					description: resultado.description,
					count: resultado.count,
					price: resultado.price,
					location: resultado.location,
					resultshow: 'Datos actualizados correctamente',
				});
			} else {
				console.log(resultado);
				res.render('dashboardupdateproduct', {
					registro: true,
					show: 'No se pudo actualizar este producto',
				});
			}
		},
	);
});

app.get('/register', (req, res) => {
	res.render('register', {});
});

app.post('/register', (req, res) => {
	const user = new User({
		firstname: req.body.firstName,
		lastname: req.body.lastName,
		email: req.body.inputEmail,
		user: req.body.user,
		password: bcrypt.hashSync(req.body.inputPassword, 10),
		phone: req.body.phone,
		cc: req.body.cedula,
		roll: req.body.roll,
		sede: req.body.sede,
	});
	user.save((err) => {
		if (err) {
			console.log(err);
			res.render('register', {
				registro: req.body.registro,
				show: 'Upss! el usuario con ese email o cedula ya existe',
			});
		}
		const mailmsg = {
			to: req.body.inputEmail,
			from: 'edwardca12@gmail.com',
			subject: 'Bienvenido a mi app!',
			text: 'Hola, bienvenido a mi aplicacion web, estamos en construccion.',
			html: `<h1> Hola ${req.body.firstName}!, bienvenido a mi aplicación web, estamos en construcción.<h1> <br> <strong>pronto mucho más! esperanos.</strong>`,
		};
		// send mail
		sgMail.send(mailmsg);

		res.render('register', {
			registro: req.body.registro,
			show: "<a href='/login' >Registro exitoso!</a>",
		});
	});
});

app.get('/createproduct', (req, res) => {
	res.render('createproduct', {});
});

app.post('/createproduct', upload.single('imagenProducto'), (req, res) => {
	const {
		name, type, description, count, price, location,
	} = req.body;
	const product = new Product({
		name, type, photo: req.file.buffer, description, count, price, location,
	});
	console.log(req.body);
	product.save((err, producto) => {
		if (err) {
			console.log(err);
			res.render('dashboardupdateproduct', {
				registro: req.body.registro,
				show: 'Upss! el producto no se pudo registrar',
			});
		} else if (producto) {
			res.render('dashboardupdateproduct', producto);
		} else {
			res.render('dashboardupdateproduct', {
				registro: req.body.registro,
				show: 'Upss! el producto no se pudo registrar',
			});
		}
	});
});

app.post('/deleteproduct', (req, res) => {
	const { id } = req.body;
	Product.deleteOne({ _id: id }, (err) => {
		if (err) {
			console.log(err);
			res.render('dashboardupdateproduct', {
				registro: req.body.registro,
				show: 'Upss! el producto no se pudo borrar',
			});
		} else {
			res.render('dashboardupdateproduct', {
				registro: req.body.registro,
				show: "<a href='/dashboardproducts' >Borrado exitoso!</a>",
			});
		}
	});
});

app.get('/dashboardadmin', (req, res) => {
	User.find({}, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.render('dashboardadmin', {
			usuarios: result,
		});
	});
});

app.get('/dashboardgerente', (req, res) => {
	User.find({ sede: req.session.sede }, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.render('dashboardgerente', {
			usuarios: result,
		});
	});
});

app.get('/dashboardadmintable', (req, res) => {
	User.find({}, (err, result) => {
		console.log(result);
		if (err) {
			console.log(err);
		}
		res.json(result);
	});
});

app.post('/dashboardadmin', (req, res) => {
	User.findOne({ cc: req.body.busqueda }, (err, result) => {
		if (err) {
			console.log(err);
		} else if (result) {
			req.session.usuario = result;
			res.render('dashboardupdateuser', {
				firstnameUser: result.firstname,
				lastnameUser: result.lastname,
				emailUser: result.email,
				user: result.user,
				phoneUser: result.phone,
				ccUser: result.cc,
				rollUser: result.roll,
				sedeUser: result.sede,
			});
		} else {
			res.render('dashboardadmin');
		}
	});
});

app.get('/dashboardupdateuser', (req, res) => {
	// const usuario = req.session.usuario;
	res.render('dashboardupdateuser');
});

app.post('/dashboardupdateuser', (req, res) => {
	const conditions = {};

	if (req.body.firstnameUser) {
		Object.assign(conditions, { firstname: req.body.firstnameUser });
	}
	if (req.body.lastnameUser) {
		Object.assign(conditions, { lastname: req.body.lastnameUser });
	}
	if (req.body.emailUser) {
		Object.assign(conditions, { email: req.body.emailUser });
	}
	if (req.body.phoneUser) {
		Object.assign(conditions, { phone: req.body.phoneUser });
	}
	if (req.body.rollUser) {
		Object.assign(conditions, { roll: req.body.rollUser });
	}

	console.log(`las condiciones ${conditions}`);

	User.findOneAndUpdate(
		{ email: req.body.emailUser }, { $set: conditions }, { new: true },
		(err, resultado) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`hola${resultado}`);
				res.render('dashboardupdateuser', {
					firstnameUser: resultado.firstname,
					lastnameUser: resultado.lastname,
					emailUser: resultado.email,
					phoneUser: resultado.phone,
					ccUser: resultado.cc,
					rollUser: resultado.roll,
					resultshow: 'Datos actualizados correctamente',
				});
			}
		},
	);
});

app.get('/dashboardprofile', (req, res) => {
	res.render('dashboardprofile', {
	});
});

app.post('/dashboardprofile', upload.single('userPhoto'), (req, res) => {
	if (req.body.avatar) {
		User.findOneAndUpdate(
			{ _id: req.session.id }, { $set: { avatar: req.file.buffer } }, { new: true },
			(err, resultado) => {
				if (err) {
					console.log(err);
				} else {
					res.render('dashboardprofile', {
						avatar: resultado.avatar.toString('base64'),
						resultshow: 'avatar cargado correctamente.',
					});
				}
			},
		);
	}
	if (req.body.infoprofile) {
		const conditions = {};

		if (req.body.firstname) {
			Object.assign(conditions, { firstname: req.body.firstname });
		}
		if (req.body.lastname) {
			Object.assign(conditions, { lastname: req.body.lastname });
		}
		if (req.body.phone) {
			Object.assign(conditions, { phone: req.body.phone });
		}
		if (req.body.password) {
			Object.assign(conditions, { password: req.body.password });
		}

		User.findOneAndUpdate(
			{ _id: req.session.id }, { $set: conditions }, { new: true },
			(err, resultado) => {
				if (err) {
					console.log(err);
				} else {
					res.render('dashboardprofile', {
						firstname: resultado.firstname,
						lastname: resultado.lastname,
						email: resultado.email,
						phone: resultado.phone,
						cc: resultado.cc,
						roll: resultado.roll,
						resultshow: 'Datos actualizados correctamente.',
					});
				}
			},
		);
	}
});

app.get('/addstore', (req, res) => {
	const { id } = req.query;
	Product.findOne({ _id: id }, (err, product) => {
		if (err) {
			console.log(err);
		} else if (product) {
			res.render('addstore', product);
		} else {
			console.log(product);
		}
	});
});

app.post('/addstore', (req, res) => {
	const { id, cantidad, name } = req.body;
	const { sede } = req.session;
	const store = new Store({
		cantidad, name, product: id, sede,
	});
	console.log(req.body);
	store.save((err, element) => {
		if (err) {
			console.log(err);
		} else if (element) {
			res.render('addstore', {
				registro: true,
				show: "<a href='/dashboardproducts'>Agreagado a la tienda exitosamente!</a>",
			});
		} else {
			console.log(element);
		}
	});
});

app.get('/dashboardstore', (req, res) => {
	const { sede } = req.session;
	Store.find({ sede }, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.render('dashboardstore', {
			productos: result,
		});
	});
});

app.get('/exit', (req, res) => {
	// localStorage.setItem('token', ' ')
	res.locals.session = false;
	req.session.destroy();
	res.render('indexdashboard', {});
});

app.get('/dashboardteacher', (req, res) => {
	res.render('dashboardteacher', {});
});

app.get('*', (req, res) => {
	res.render('error', {});
});

module.exports = app;
