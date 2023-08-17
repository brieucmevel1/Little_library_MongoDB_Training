const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const db_name = 'little_library';
const client = new MongoClient(url);

const get_users = async (req, res) => {
    try {
        const users = await user_model.get_users();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

async function create_user(user) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const result = await db.collection('user').insertOne(user);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function get_user_by_username(username) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const user = await db.collection('user').findOne({ Username: username });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = {
    get_users,
    get_user_by_username,
    create_user,
};
