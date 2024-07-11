const Comment = require("../Model/commentModel");

exports.getAllComments = async (req, res, next) => {
    const nftid = req.params.nftid;

    const comments = await Comment.find({ nftID: nftid });

    // Send response
    res.status(200).json({
        status: "success",
        results: comments.length,
        data: {
            comments,
        },
    });
};

exports.createComment = async (req, res, next) => {
    const nftid = req.params.nftid;
    const newComment = await Comment.create(req.body);

    // Send response
    res.status(201).json({
        status: "success",
        data: {
            comment: newComment,
        },
    });
};
