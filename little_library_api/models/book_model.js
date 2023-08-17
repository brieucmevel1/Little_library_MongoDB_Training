const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const db_name = 'little_library';
const client = new MongoClient(url);

async function get_book_by_title(title) {
}

async function create_book(book) {
}

module.exports = {

};
