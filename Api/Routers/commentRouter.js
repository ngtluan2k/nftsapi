const express = require("express");
const commentController = require("../Controllers/commentController");
const router = express.Router();

router.route("/:nftid").get(commentController.getAllComments).post(commentController.createComment);

module.exports = router;