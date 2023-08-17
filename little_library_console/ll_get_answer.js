const { MongoClient } = require('mongodb');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function get_answer(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
        resolve(answer);
        });
    });
}

module.exports = get_answer