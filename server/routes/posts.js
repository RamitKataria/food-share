const { nanoid } = require('nanoid');
const express = require('express');
const router = express.Router();

// const {confirmAuthenticated} = require("../auth");
const {Post, User} = require("../models");
// const { getAuth } = require('firebase-admin/auth');
// const readICS = require('./utility')

router.delete('/:postID', async function (req, res) {
	try {
		await Post.deleteOne({id: req.params.postID});
		return res.status(200).send('Deleted');
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

/**
 * Modify availability slots of a given user in a given post, perserving all other postInfo
 */
router.post("/availability/:postID/:userID", async function(req, res) {
	try {
		const post = await Post.findOne({id: req.params.postID}).lean();
		if (!post) {
			return res.status(404).send("Post Not Found")
		}
		const user = await User.findOne({firebaseUID: req.params.userID});
		if (!user) {
			return res.status(404).send("User Not Found")
		}

		// add avail entry to post document
		const availEntries = post.userAvailability;
		const idx = availEntries.findIndex(entry => entry.user === req.params.userID);
		if (idx === -1) {
			availEntries.push(req.body)
		} else {
			availEntries[idx] = req.body
		}
		const newPost = {
			...post,
			dateTimeUpdated: new Date(),
			userAvailability: availEntries,
			id: req.params.postID
		};
		console.log('post post avail', newPost)
		await Post.findOneAndUpdate(
			{id: req.params.postID}, newPost
		);

		await addPostToUser(user, req.params.postID);

		return res.send(removeForbiddenFields(newPost));
	}
	catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error\n");
	}
});


/**
 * Fill post with available slots using ICS information
 */
router.put('/availability/ics/:postID/:userID', async function (req, res) {
	let post;
	try {
		post = await Post.findOne({ id: req.params.postID }).lean();
		const user = await User.findOne({ firebaseUID: req.params.userID }).lean();

		// given post range & ICS link, return available slots inside post range
		// throw an error if ICS file is empty or invalid.
		// const availSlots = await readICS(post.range, user.ics);

		// remove availability of current user.
		post.userAvailability = post.userAvailability.filter(object => {
			return object.user !== req.params.userID;
		});

		// push new availability from ics.
		post.userAvailability.push({
			user: req.params.userID,
			// availableSlots: availSlots,
		})

		post.dateTimeUpdated = new Date();

		// save post to mongoose
		await Post.findOneAndUpdate(
			{id: req.params.postID}, post
		);

		const populatedPost = await populateUsers(post);

		// return post
		res.status(200).send(removeForbiddenFields(populatedPost));
	}
	catch(e) {
		console.log("Invalid ICS!");
		res.status(200).send({});
	}
})


router.patch('/:postID', async function (req, res) {
	try {
		const post = await Post.findOne({id: req.params.postID});
		if (!post) {
			return res.status(404).send('Not found');
		}
		const patches = removeForbiddenFields(req.body);
		Object.assign(post, patches);
		await post.save();
		return res.send(removeForbiddenFields(post));
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
});

router.get('/:postID', async function (req, res) {
	try {
		const postObj = await Post.findOne({id: req.params.postID}).lean();
		if (!postObj) {
			return res.status(404).send('Not found');
		}
		const populatedPost = await populateUsers(postObj)
		return res.send(removeForbiddenFields(populatedPost));
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
});

/**
 * Create post instance, add to user document
 */
router.post('/', async function (req, res) {
	try {
		const newPost = new Post(removeForbiddenFields(req.body));
		newPost.id = nanoid();
		await newPost.save();
		const user = await User.findOne({firebaseUID: newPost.createdBy});

		if (user) {
			await addPostToUser(user, newPost.id);
		}
		return res.send(removeForbiddenFields(newPost));
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
});


/**
 * add post reference to user document if it does not exist
 * @param {User} user
 * @param {*} postID
 */
async function addPostToUser(user, postID) {
	try {
		const postIDx = user.posts.findIndex(post => post === postID);
		if (postIDx === -1) {
			user.posts.push(postID)
		}
		// console.log('Write Availability - User\n' + user)
		await user.save();
	} catch (e) {
		console.log("Failed to add post to user: " + user.firebaseUID)
		console.log(e);
	}
}

/**
 * Replace all user ids with user objects
 */
async function populateUsers(postObj) {
	let userAvailability = []
	let createdBy = {}

	try {
		userAvailability = await Promise.all(
			postObj.userAvailability.map(async (availEntry) => {
				const user = await getUserOrGuest(availEntry.user);
				return {
					...availEntry,
					userInfo: {
						name: user.displayName,
						email: user.email,
					},
				}
			})
		)

		let createdBy = undefined;
		try {
			createdBy = await getUserOrGuest(postObj.createdBy);
		} catch (e) {
			console.log('Invalid ');
			console.log(e)
		}
		return ({
			...postObj,
			createdByInfo: {
				name: createdBy.displayName,
				email: createdBy.email,
			},
			userAvailability: userAvailability,
		})
	} catch (e) {
		console.log('Failed to populate users in postInfo');
		console.log(e);
		return postObj;
	}
}

async function getUserOrGuest(idOrName) {
	// try {
	// 	user = await User.getUser(idOrName);
	// 	return user;
	// } catch (e) {
	// 	if (e.code == 'auth/invalid-uid') {
	// 		return {
	// 			name: idOrName,
	// 			email: '',
	// 		}
	// 	}
	// 	throw e;
	// }
}

module.exports = router;
