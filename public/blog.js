document.getElementById('blogForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    try {
        const response = await fetch('/api/blogposts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const newBlogPost = await response.json();
        console.log('New blog post added:', newBlogPost);

        this.reset();
        renderBlogPost(newBlogPost);
    } catch (error) {
        console.error('Error adding blog post:', error);
    }
});

function renderBlogPost(blogPost) {
    const blogPostsContainer = document.getElementById('blogPosts');

    const postElement = document.createElement('article');
    postElement.classList.add('blogPost');

    const titleElement = document.createElement('h2');
    titleElement.textContent = blogPost.title;

    const authorElement = document.createElement('span');
    authorElement.classList.add('author');
    authorElement.textContent = blogPost.author;

    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.textContent = blogPost.content;

    const toggleContentButton = document.createElement('span');
    toggleContentButton.textContent = '+';
    toggleContentButton.classList.add('toggleContent');
    toggleContentButton.addEventListener('click', function() {
        contentElement.classList.toggle('showContent');
        toggleContentButton.textContent = contentElement.classList.contains('showContent') ? '-' : '+';
    });

    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');
    commentsSection.innerHTML = `
        <h3>Comments</h3>
        <div id="comments_${blogPost.id}"></div>
        <form id="commentForm_${blogPost.id}" class="commentForm">
            <label for="comment_${blogPost.id}">Add a comment:</label>
            <textarea id="comment_${blogPost.id}" name="content" rows="1" required></textarea>
            <button type="submit">Comment</button>
        </form>
    `;

    postElement.appendChild(titleElement);
    postElement.appendChild(authorElement);
    postElement.appendChild(toggleContentButton);
    postElement.appendChild(contentElement);
    postElement.appendChild(commentsSection);
    blogPostsContainer.appendChild(postElement);

    const commentForm = document.getElementById(`commentForm_${blogPost.id}`);
    commentForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        formDataObject.postId = blogPost.id;

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newComment = await response.json();
            console.log('New comment added:', newComment);

            this.reset();
            renderComment(newComment, `comments_${blogPost.id}`);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    });
}

function renderComment(comment, containerId) {
    const commentsContainer = document.getElementById(containerId);

    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    const commentContent = document.createElement('p');
    commentContent.textContent = comment.content;

    const authorContent = document.createElement('p');
    authorContent.textContent = `by ${comment.author}`;

    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', async function() {
        try {
            const response = await fetch(`/api/comments/${comment.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            commentElement.remove();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    });

    commentElement.appendChild(commentContent);
    commentElement.appendChild(authorContent);
    commentElement.appendChild(deleteButton);
    commentsContainer.appendChild(commentElement);
}

async function fetchBlogPosts() {
    try {
        const response = await fetch('/api/blogposts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blogPosts = await response.json();
        blogPosts.forEach(renderBlogPost);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

fetchBlogPosts();
