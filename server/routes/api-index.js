const express = require('express');
const postsRouter = require("./posts");
const usersRouter = require("./users");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.send({message: 'Hello, you are at API index'});
});

router.use('/posts', postsRouter);
router.use('/users', usersRouter);

module.exports = router;