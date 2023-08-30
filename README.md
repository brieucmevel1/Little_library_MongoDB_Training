# Welcome to the Little Library API Project!

This project aims to create a simple API for a "Little Library" application. The application allows users to interact with books, podcasts, and user data. The project is organized into several directories and files to help you understand and work with the codebase effectively.

## Project Structure

### K6_test_for_api
This directory contains performance testing scripts using K6 for the API.

- `create_usersK6.js`: Script to simulate creating users.
- `delete_usersK6.js`: Script to simulate deleting users.
- `get_usersK6.js`: Script to simulate getting users.

### little_library_api
This directory contains the core API implementation.

- `models`: Directory containing data models.
  - `book_model.js`: Model for books.
  - `podcast_model.js`: Model for podcasts.
  - `user_model.js`: Model for users.

- `api_controller.js`: Controller handling API logic.
- `api_routes.js`: Define API routes and link them to the controller.
- `little_library_api.js`: Main API file to start the server.

### little_library_console
This directory contains console scripts for interacting with the Little Library.

- `little_library_admin.js`: Console script for admin tasks.
- `little_library_user.js`: Console script for user tasks.
- `ll_delete_user.js`: Console script to delete a user.
- `ll_get_answer.js`: Console script to get an answer from the library.

### Other Files

- `db_tools.txt`: Text file containing database tools information.
- `little_library.js`: Main library file.
- `setup_little_library.js`: Script to set up the Little Library.

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the `little_library_api` directory.
3. Install dependencies using your preferred package manager (e.g., `npm install`).
4. Run the API using the command: `node little_library_api.js`.
5. You can now access the API at `http://localhost:3000`.

Feel free to explore and modify the code to understand how the API and console scripts work together. If you have any questions or need assistance, don't hesitate to reach out for help.

Happy coding!
