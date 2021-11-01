require('./models/Zip');
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
// const logger = require("morgan");
const Zip = mongoose.model('Zip');
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(zipRoutes);

const mongoUri =
	'mongodb+srv://admin:passwordpassword@cluster0.s7m7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
	useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
	console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
	console.error('Error connecting to mongo', err);
});

// router.get('/locations', (req, res) => {
// 	Data.find((err, data) => {
// 		if (err) return res.json({ success: false, error: err });
// 		return res.json({ success: true, data: data });
// 	});
// });

app.get('/locations', (req, res) => {
	Zip.find({}, (err, zip) => {
		if (!err) {
			res.send(zip);
		} else {
			console.log(err);
			res.send('Some error occured!');
		}
	});
});

app.delete('/location/:id', (req, res) => {
	const { id } = req.body;
	Data.findOneAndDelete(id, (err) => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

app.post('/location', (req, res) => {
	let data = new Zip();

	const { zip, city } = req.body;

	if (!zip) {
		return res.send('INVALID INPUTS');
	}
	data.zip = zip;
	data.city = city;
	data.save((err) => {
		if (err) return res.send('an error ocuured');
		return res.send('Saved!');
	});
});

app.get('/search', async (req, res) => {
	const info = await axios.get(
		`api.openweathermap.org/data/2.5/weather?zip=84062&units=imperial&appid=f6006e1c9b4c59b99d7cf6909d8a0ff1`
	);
	return res.send(info);
});

app.listen(3001, () => {
	console.log('Listening on port 3001');
});
