const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb+srv://" + process.env.ATLAS_USERNAME + ":" + process.env.ATLAS_PASSWORD + "@" + process.env.DB_CLUSTER + ".mongodb.net/?retryWrites=true&w=majority",
	{dbName: process.env.DB_NAME});


const PostSchema = new mongoose.Schema({
	id: {
		type: String,
		index: true,
		unique: true
	},
	name: {
		type: String,
		required: [true, 'Why no post name?']
	},
	description: String,
	dateTimeCreated: Date,
	createdBy: { type: String, ref: 'User' },
	expirationDate: Date,
});

const Post = mongoose.model('Post', PostSchema);

const UserSchema = new mongoose.Schema({
	ics: String,
	posts: [ { type: String, ref: 'Post' }],
	authToken: String
});

const User = mongoose.model('User', UserSchema);

module.exports = { Post, User }
