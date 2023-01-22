const express = require('express');
const router = express.Router();

// const { deleteUserInFirebase} = require('../auth')
const { Post, User } = require("../models");


router.get('/:userID/posts', async function (req, res) {
	try {
		const user = await User.findOne({firebaseUID: req.user.uid}).lean();
		if (!user) {
			return res.status(404).send('Not found');
		}
		return res.send(user.posts);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.get('/:userID', async function (req, res) {
	try {
		const user = await User.findOne({firebaseUID: req.user.uid}).lean();
		if (!user) {
			return res.status(404).send('Not found');
		}
		return res.send(user);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.patch('/:userID', async function (req, res) {
	try {
		const user = await User.findOne({firebaseUID: req.user.uid});
		if (!user) {
			return res.status(404).send('Not found');
		}
		const patches = req.body;
		Object.assign(user, patches);
		console.log('patching user\n' + JSON.stringify(patches))
		await user.save();
		return res.send(user);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.post('/:userID/posts', async function (req, res) {
	try {
		const newPostID = req.body;
		if (typeof newPostID !== "string") {
			return res.status(400).send('Body is not a string');
		}
		if (!(await Post.exists({id: newPostID}))) {
			return res.status(404).send('Post does not exist');
		}
		const user = await User.findOne({firebaseUID: req.user.uid});
		if (!user) {
			return res.status(404).send('User Not found');
		}
		user.posts.push(newPostID);
		return res.status(200).send(newPostID);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.put('/:userID/calendar-link', async function (req, res) {
	try {
		const newLink = req.body;
		if (typeof newLink !== "string") {
			return res.status(400).send('Body is not a string');
		}
		// TODO: validate file
		// if (!isValid(newLink)) {
		// 	return res.status(400).send('Could not read file');
		// }
		const user = await User.findOne({firebaseUID: req.user.uid});
		if (!user) {
			return res.status(404).send('User Not found');
		}
		user.ics = newLink;
		return res.status(200).send('Calendar link set');
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.delete('/:userID', async function (req, res) {
	try {
		// await deleteUserInFirebase(req.params.firebaseUID);
		await User.deleteOne({firebaseUID: req.params.firebaseUID});
		return res.status(200).send('Deleted');
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

router.post('/', async function (req, res) {
	try {
		if (await User.exists({firebaseUID: req.user.uid})) {
			return res.status(400).send('User already exists');
		}
		const newUser = new User({firebaseUID: req.user.uid});
		await newUser.save();
		return res.status(200).send(newUser);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

module.exports = router;
