# Comments system - Interview Task

Extend the provided starter template by implementing a simple comments system.

## Requirements

Project should use:
- Docker
- Express
- Sequelize
- RTK Query
- ShadCN UI

## Tasks

### Frontend

- Create a view that displays a table of comments fetched from the backend.
- The table should include the following columns: ID, Author, Message, Created at, Modified at, Actions.
- The table should be paginated, requesting only the comments for the currently displayed page.
- Add create and edit forms, both displayed inside a modal.
- Add the ability to delete comments after showing a confirmation warning.
- Validate all forms before sending requests.
- Use the ShadCN component library for building the UI.
- All communication with the backend should be handled using RTK Query.

### Backend

- Create a database model for comments with the following fields: id, author, message, createdAt, updatedAt, deletedAt.
- Create a database migration to synchronize the new model with the database.
- Create a seeder that inserts a few example comments.
- Create a REST API with standard CRUD operations for the comments resource.
- Validate all user input.
- Ensure the endpoint returning a list of comments supports pagination.
- Implement global error handling.
- Use Sequelize for all database communication.
- Docker containers should automatically run database migrations on startup.

## Installation

1. Clone repository.
2. Open a CLI in the project's root directory and run:

```bash
docker compose up
```
