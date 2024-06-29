// controllers/blogController.js

const BlogPost = require('../models/Blog'); // Assuming you have a BlogPost model

// Get all blog posts
exports.getAllBlog = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll({
            include: [{
                model: Comment, // Assuming you have set up a Comment model and association
                as: 'comments'
            }]
        });
        res.json(blogPosts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new blog post
exports.createBlog = async (req, res) => {
    const { title, author, content } = req.body;
    try {
        const newBlogPost = await BlogPost.create({ title, author, content });
        res.json(newBlogPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
    const blogPostId = req.params.id;
    try {
        await BlogPost.destroy({
            where: { id: blogPostId }
        });
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
