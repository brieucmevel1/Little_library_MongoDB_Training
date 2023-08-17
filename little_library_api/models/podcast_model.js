const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const db_name = 'little_library';
const client = new MongoClient(url);

async function get_podcast_by_title(title) {
}

async function create_podcast(podcast) {
}

module.exports = {
    get_podcast_by_title,
    create_podcast,
};
