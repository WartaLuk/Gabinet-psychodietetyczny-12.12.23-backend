const db = require('../config/dbConfig');

const postModel = {
    getAllPosts: (callback) => {
        const query = 'SELECT * FROM posts';
        db.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPostById: (id, callback) => {
        const query = 'SELECT * FROM posts WHERE id = ?';
        db.query(query, [id], (error, results) => {
            callback(error, results[0]);
        });
    },

    addPost: (post, callback) => {
        const { title, content, image_url } = post;
        const query = 'INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)';
        db.query(query, [title, content, image_url], (error, results) => {
            callback(error, results);
        });
    },

    updatePost: (id, post, callback) => {
        const { title, content, image_url } = post;
        const query = 'UPDATE posts SET title = ?, content = ?, image_url = ? WHERE id = ?';
        db.query(query, [title, content, image_url, id], (error, results) => {
            callback(error, results);
        });
    },

    deletePost: (id, callback) => {
        const query = 'DELETE FROM posts WHERE id = ?';
        db.query(query, [id], (error, results) => {
            callback(error, results);
        });
    }
};

module.exports = postModel;