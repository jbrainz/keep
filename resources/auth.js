const express = require('express');

const router = express.Router();
//@Route GET api/auth
//@desc Get Logged in user
//@access Private
router.get('/', (req, res) => {
	res.send('Get logged in users!');
});

//@Route POST api/auth
//@desc POST Logged in user
//@access Private
router.post('/', (req, res) => {
	res.send(' Login User');
});

module.exports = router;
