const user_model = require('./models/user_model.js');
const book_model = require('./models/book_model.js');
const podcast_model = require('./models/podcast_model.js');
const { ObjectId } = require('mongodb');

// const get_users = async (req, res) => {
//     try {
//         const users = await user_model.get_users();
//         res.json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const create_user = async (req, res) => {
    const data = req.body;
    try {
        const userId = await user_model.db_create_user(data)
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const get_user_by_id = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await user_model.db_get_user_by_id(new ObjectId(_id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const delete_user_by_id = async (req, res) => {
    const { _id } = req.params;
    try {
        const userDeleted = await user_model.db_delete_user_by_id(new ObjectId(_id));
        if (userDeleted) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const update_user_by_id = async (req, res) => {
    const { _id } = req.params;
    const updated_data = req.body;
    try {
        const success = await user_model.db_update_user_by_id(new ObjectId(_id), updated_data);
        if (success) {
            res.json({ message: 'User updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    //get_users,
    get_user_by_id,
    delete_user_by_id,
    create_user,
    update_user_by_id,
};
