# Welcome to the Little Library API Project!

This project aims to create a simple API for a "Little Library" application. The application allows users to interact with books, podcasts, and user data. The project is organized into several directories and files to help you understand and work with the codebase effectively.

## Project Structure

### 1: Utils Files

- `db_tools.txt`: Text file to read before, containing project information and utils tools.

- `setup_little_library.js`: Script to set up the Little Library.
- `little_library.js`: Main file to start the api.

### 2: little_library_console
This directory contains console scripts for interacting with the Little Library, this could be usefull to continue this part according to the `db_tools.txt` file to get used to nodeJS.

- `little_library_admin.js`: Console script for admin tasks.
- `little_library_user.js`: Console script for user tasks.
- `ll_delete_user.js`: Console script to delete a user.
- `ll_get_answer.js`: Console script to get the answers from the shell.

### 3: little_library_api 
This directory contains the core API implementation using the same db but is very limited, this could be also util to continue this before doing tests.

- `little_library_api.js`: Main API file to start the server.
- `api_routes.js`: Define API routes and link them to the controller.
- `api_controller.js`: Controller handling API logic.
- `models`: Directory containing data models.
  - `book_model.js`: Model for books.
  - `podcast_model.js`: Model for podcasts.
  - `user_model.js`: Model for users.

### K6_test_for_api
This directory contains performance testing scripts using K6 for the API see to use Grafana to look to better results.

- `create_usersK6.js`: Script to simulate creating users.
- `delete_usersK6.js`: Script to simulate deleting users.
- `get_usersK6.js`: Script to simulate getting users.

Good luck
