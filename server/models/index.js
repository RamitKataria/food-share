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
	title: {
		type: String,
		required: [true, 'Why no post title?']
	},
	description: String,
	dateTimeCreated: Date,
	createdBy: { type: String, ref: 'User' },
	expirationDate: Date,
	location: String,
	quantity: Number
});

const Post = mongoose.model('Post', PostSchema);

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        index: true,
        unique: true
    },
	posts: [ { type: String, ref: 'Post' }],
	username: String,
	address: String,
	zip: String,
	city: String,
	authToken: String
});

const User = mongoose.model('User', UserSchema);

module.exports = { Post, User }
