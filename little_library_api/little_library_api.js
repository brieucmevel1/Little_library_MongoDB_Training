const express = require('express');
const api_routes = require('./api_routes');

async function main_api() {
    const app = express();
    app.use(express.json());
    
    app.use('/api', api_routes);

    const port = 3000;
    app.listen(port, () => {
        console.log(`API server is running on port ${port}`);
    });
    await search_user_by_username('Jackie Chan');
}

async function search_user_by_username(username) {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(`http://localhost:3000/api/users/${username}`);
        if (response.status === 200) {
            const user = await response.json();
            console.log('User found:', user);
        } else if (response.status === 404) {
            console.log('User not found');
        } else {
            console.log('Error searching for user');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

module.exports = main_api;
