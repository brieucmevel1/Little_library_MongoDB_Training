const { MongoClient } = require('mongodb');
const main_admin = require('./little_library_admin.js');
const main_user = require('./little_library_user.js');
const get_answer = require('./ll_get_answer.js');
const readline = require('readline');

const url = 'mongodb://localhost:27017';
const db_name = 'little_library';

const client = new MongoClient(url);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(db_name);
        // choix console ou api(en utilisant express js(https://expressjs.com/fr/starter/hello-world.html))
        const role = await get_answer("Are you an admin or a user? (admin/user): ");
        
        if (role === "admin") {
            await admin_actions(db);
        } else if (role === "user") {
            await user_actions(db);
        } else {
            console.log("Invalid role.");
        }
    } catch (err) {
            console.error('Error:', err);
    } finally {
        await client.close();
        rl.close();
    }
}

async function autent_user(db, collection_name, username, password) {
    
    if (await db.collection(collection_name).findOne({ "Username": username,"Password": password })) {
        console.log(`${collection_name} authentication successful!`);
        return true;
        
    } else {
        console.log(`Invalid ${collection_name} credentials.`);
        return main();
    }
}

async function admin_actions(db) {
    const username = await get_answer(`Enter admin Username: `);
    const password = await get_answer(`Enter admin Password: `);
    if (await autent_user(db, 'admin', username, password)) {
        await main_admin(db);
    }
}

async function user_actions(db) {
    const username = await get_answer(`Enter user Username: `);
    const password = await get_answer(`Enter user Password: `);
    if (await autent_user(db, 'user', username, password)) {
        await main_user(db, username, password);
    }
}

main().catch(console.error);
