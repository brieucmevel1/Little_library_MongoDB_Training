const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const db_name = 'little_library';
const client = new MongoClient(url);

//the modele store and retreive data from the db in the right format

async function db_create_user(data) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const result = await db.collection('user').insertOne(
            data
        );
        return result.insertedId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function db_get_user_by_id(user_id) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const user = await db.collection('user').findOne(
            { _id: user_id },
            { projection: { Password: 0 } }
        );
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function db_delete_user_by_id(user_id) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const result = await db.collection('user').deleteOne(
            { _id: user_id }
        );
        return result.deletedCount === 1;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function db_update_user_by_id(user_id, updated_data) {
    try {
        await client.connect();
        const db = client.db(db_name);
        
        const result = await db.collection('user').updateOne(
            { _id: user_id },
            { $set: updated_data }
        );
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = {
    db_get_user_by_id,
    db_delete_user_by_id,
    db_create_user,
    db_update_user_by_id,
};
