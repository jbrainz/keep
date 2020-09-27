const express = require('express');

const router = express.Router();
//@Route GET api/contacts
//@desc Get all contact avail for current user
//@access Private
router.get('/', (req, res) => {
	res.send('Get all your contacts!');
});

//@Route    POST api/contacts
//@desc     Add new contacts
//@access   Private
router.post('/', (req, res) => {
	res.send('Add new contact');
});

//@Route    PUT api/contacts:id
//@desc     Update contacts
//@access   Private
router.put('/:id', (req, res) => {
	res.send('Delete contact!');
});

//@Route    DELETE api/contacts:id
//@desc     Delete contacts
//@access   Private
router.delete('/:id', (req, res) => {
	res.send('Update contact!');
});

module.exports = router;
