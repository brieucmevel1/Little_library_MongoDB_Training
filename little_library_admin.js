const { MongoClient } = require('mongodb');
const readline = require('readline');
const get_answer = require('./ll_get_answer.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function see_admin(db) {
    const object = await get_answer(`What do you want to see? (user/book/podcast)\n`);
    if (['user', 'book', 'podcast'].includes(object.toLowerCase()) != true) {
        await see_admin(db);
    }
    const response = await get_answer('And do you want to find all of them (1) or specific one (2)?');
    switch (response) {
        case '1':
            const allDocuments = await db.collection(object).find().toArray();
            console.log(allDocuments);
            break;
        case '2':
            const name = await get_answer(`And what name are you looking for?\n`);
            const specificDocuments = await db.collection(object).find({
                $or: [
                    { "Title": new RegExp(name, "i") },
                    { "Username": new RegExp(name, "i") }
                ]
            }).toArray();
            console.log(specificDocuments);
            break;
        default:
            console.log(`Invalid choice\n`);
            await see_admin(db);
    }
    return main_admin;
}

async function create_user(db) {
    const new_user = {};
        new_user.Username = await get_answer(`Enter the user username\n`);
        new_user.Password = await get_answer(`Enter the user password\n`);
        new_user.Possesed = [];
        new_user.ID = parseInt(await get_answer(`Enter the user ID\n`));
    return new_user;
}

async function create_book(db) {
    const new_book = {};
        new_book.Title = await get_answer(`Enter the book title\n`);
        new_book.Author = await get_answer(`Enter the book author\n`);
        new_book.year = parseInt(await get_answer(`Enter the book year\n`));
        new_book.ID = await get_answer(`Enter the book ID\n`);
        new_book.Available = true;
        new_book.UserID = null;
    return new_book;
}

async function create_podcast(db) {
    const new_podcast = {};
        new_podcast.Title = await get_answer(`Enter the podcast title\n`);
        new_podcast.Host = await get_answer(`Enter the podcast host\n`);
        new_podcast.Duration = parseInt(await get_answer(`Enter the podcast duration\n`));
        new_podcast.ID = await get_answer(`Enter the podcast ID\n`);
    return new_podcast;
}

async function create_admin(db) {
    const object = await get_answer(`What do you want to create? (user/book/podcast)\n`);
    switch (object) {
        case 'user':
            new_object = await create_user(db);
            break;
        case 'book':
            new_object = await create_book(db);
            break;
        case 'podcast':
            new_object = await create_podcast(db);
            break;
        default:
            console.log(`Invalid choice\n`);
            await create_admin(db);
    }
    const result = await db.collection(object).insertOne(new_object);
    console.log(`New ${object} created with ID: ${result.insertedId}`);
    return true;
}

async function main_admin(db) {
    console.log(`Connected as admin.`);
    const response = await get_answer(`What do you want to do? \n   1:see\n   2:create\n   3:edit\n   4:delete\n   5:quit\n`);
    switch (response) {
        case '1':
            await see_admin(db);
            break;
        case '2':
            await create_admin(db);
            break;
        case '3':
            break;
        case '4':
            break;
        case '5':
            return true;
            break;
        default:
            console.log(`Invalid choice\n`);
            await main_admin(db);
        
    } 
}

module.exports = main_admin