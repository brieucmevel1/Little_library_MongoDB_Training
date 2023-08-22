const express = require('express');
const api_routes = require('./api_routes.js');

async function main_api() {
    const app = express();
    app.use(express.json());
    
    app.use('/api', api_routes);

    const port = 3000;
    app.listen(port, () => {
        console.log(`API server is running on port ${port}`);
    });
}

module.exports = main_api;
