const Comment = require('../models/Comments');

exports.createComment = async (req, res) => {
    const { content, author, postId } = req.body;
    try {
        const newComment = await Comment.create({ content, author, postId });
        res.json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        await Comment.destroy({
            where: { id: commentId }
        });
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
