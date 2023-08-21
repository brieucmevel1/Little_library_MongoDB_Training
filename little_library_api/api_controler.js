const user_model = require('./models/user_model.js');
const book_model = require('./models/book_model.js');
const podcast_model = require('./models/podcast_model.js');

const get_users = async (req, res) => {
    try {
        const users = await user_model.get_users();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const create_user = async (req, res) => {
    const new_user = req.body;
    try {
        const userId = await user_model.create_user(new_user);
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const get_user_by_username = async (req, res) => {
    console.log(req.params); // Log the params object
    const { username } = req.params;
    console.log('Username:', username);
    try {
        const user = await user_model.db_get_user_by_username(username); // Corrected access to user_model function
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    get_users,
    get_user_by_username,
    create_user,
};
