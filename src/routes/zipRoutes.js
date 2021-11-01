const express = require('express');
const mongoose = require('mongoose');
const Zip = mongoose.model('Zip');

const router = express.Router();

// router.get(`/search/:zip`, async (req, res) => {
// 	const info = await `api.openweathermap.org/data/2.5/weather?zip=84634&units=imperial&appid=f6006e1c9b4c59b99d7cf6909d8a0ff1`;
// 	console.log(info);
// });

router.post('/location', async (req, res) => {
	const { zip, city } = req.body;

	try {
		const location = new Zip({ zip, city });
		await location.save();

		res.send('You made a post request');
	} catch (err) {
		return res.status(422).send(err.message);
	}
});

// router.get('/locations', (req, res) => {

// });

// router.delete(`/location/${id}`, (req, res) => {

// });

module.exports = router;
