const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const BlogPost = require('./models/Blog');
const Comment = require('./models/Comments');

const blogRoutes = require('./routes/blogroute');
const commentRoutes = require('./routes/commentroute');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));


BlogPost.hasMany(Comment, {
    foreignKey: 'postId',
    as: 'comments'
});
Comment.belongsTo(BlogPost, {
    foreignKey: 'postId',
    as: 'post'
});


app.use('/api/blogposts', blogRoutes);
app.use('/api/comments', commentRoutes);

sequelize.sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error syncing the database:', err);
    });
