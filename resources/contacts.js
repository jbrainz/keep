const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contacts = require('../models/Contacts');
const auth = require('../middleware/auth');
const { SchemaType } = require('mongoose');

const router = express.Router();
//@Route GET api/contacts
//@desc Get all contact avail for current user
//@access Private
router.get('/', auth, async (req, res) => {
	try {
		const contact = await Contacts.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

//@Route    POST api/contacts
//@desc     Add new contacts
//@access   Private
router.post(
	'/',
	[auth, [check('name', 'Name is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, phone, type } = req.body;
		try {
			const newContact = new Contacts({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Err');
		}
	}
);

//@Route    PUT api/contacts:id
//@desc     Update contacts
//@access   Private
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	//Build Contact Object
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contacts.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		//To make sure user has access to contacts
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		contact = await Contacts.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Err');
	}
});

//@Route    DELETE api/contacts:id
//@desc     Delete contacts
//@access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contacts.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		//To make sure user has access to contacts
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		await Contacts.findByIdAndRemove(req.params.id);
		res.json({ msg: 'contact removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Err');
	}
});

module.exports = router;
