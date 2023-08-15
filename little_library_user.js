const { MongoClient } = require('mongodb');
const readline = require('readline');
const get_answer = require('./ll_get_answer.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function see_user(db, username) {
    const object = await get_answer(`What do you want to see? (book/podcast)\n`);
    if (['book', 'podcast'].includes(object.toLowerCase()) != true) {
        await see_user(db);
    }
    const response = await get_answer('And do you want to find all of them (1) or specific one (2)?');
    switch (response) {
        case '1':
            const allDocuments = await db.collection(object).find({"Username": username}).toArray();
            console.log(allDocuments);
            break;
        case '2':
            const name = await get_answer(`And what name are you looking for?\n`);
            const specificDocuments = await db.collection(object).find({
                $or: [
                    { "Title": new RegExp(name, "i") },
                ]
            }).toArray();
            console.log(specificDocuments);
            break;
        default:
            console.log(`Invalid choice\n`);
            await see_user(db);
    }
    return main_user;
}

async function change_password_user(db, username, password) {
    const user = db.user.find({"Username" : username});
    if (await get_answer(`Enter your old password:\n`) === password){
        const new_password = await get_answer(`Enter your new password?\n`);
        user.password = new_password;
        console.log(`Password set to ${user.password} \n`);
        return main_user(db, username, password);
    } else {
        console.log(`Wrong password`);
        await main_user(db, username, password);
    }
}


async function main_user(db, username, password) {
    console.log(`Connected as user.`);
    const response = await get_answer(`What do you want to do? \n   1: see ownings\n   2: search news\n   3: change password\n   4: delete account\n   5:quit\n`);
    switch (response) {
        case '1':
            await see_user(db, username);
            break;
        case '2':
            break;
        case '3':
            change_password_user(db, username, password);
            break;
        case '4':
            //delete_user(db, username, password);
            break;
        case '5':
            return true;
            break;
        default:
            console.log(`Invalid choice\n`);
            await main_user(db);
        
    } 
}

module.exports = main_user