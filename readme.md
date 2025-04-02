# Banking App - User Authentication Module

This project is a **User Authentication Module** for a banking application. It provides essential features for managing user authentication, authorization, and role-based access control. The module is built using **Node.js**, **Express.js**, and **MongoDB**.

---

## Features

| **Feature**                  | **Description**                                                                 |
|------------------------------|---------------------------------------------------------------------------------|
| **User Registration**        | Allows users to register with username, email, password, and role.             |
| **User Login**               | Authenticates users and generates JWT tokens for session management.           |
| **Role-Based Access Control**| Restricts access to routes based on user roles (e.g., customer, admin).        |
| **Rate Limiting**            | Limits the number of requests a user can make within a specific time window.   |
| **CRUD Operations**          | Create, read, update, and delete user details.                                 |
| **JWT Authentication**       | Verifies and decodes JWT tokens for protected routes.                          |

---

## Project Structure

| **Folder/File**              | **Description**                                                                 |
|------------------------------|---------------------------------------------------------------------------------|
| **`middleware/`**            | Contains middleware for role-based authorization, rate limiting, and JWT verification. |
| **`controller/`**            | Contains business logic for user authentication and management.                |
| **`route/`**                 | Defines API endpoints for user-related operations.                             |
| **`config/`**                | Handles database connection and environment configuration.                     |
| **`model/`**                 | Defines the MongoDB schema for user data.                                      |
| **`index.js`**               | Initializes the Express app and sets up middleware and routes.                 |
| **`server.js`**              | Starts the server and listens on the specified port.                           |

---

## Environment Variables

| **Variable**       | **Description**                                      |
|--------------------|------------------------------------------------------|
| `MONGO_URI`        | MongoDB connection string.                           |
| `NODE_ENV`         | Environment mode (e.g., development, test).          |
| `JWT_SECRET_KEY`   | Secret key for signing JWT tokens.                   |

---

## How to Run

| **Step** | **Instruction**                                                                 |
|----------|---------------------------------------------------------------------------------|
| 1        | Clone the repository.                                                          |
| 2        | Install dependencies using `npm install`.                                      |
| 3        | Create a `.env` file and configure the required environment variables.         |
| 4        | Start the server using `npm start` or `node server.js`.                        |

---

## API Endpoints

| **Route**                     | **Method** | **Description**                                                                 |
|-------------------------------|------------|---------------------------------------------------------------------------------|
| `/register`                   | `POST`     | Register a new user.                                                           |
| `/login`                      | `POST`     | Login and receive a JWT token.                                                 |
| `/all_users`                  | `GET`      | Fetch all registered users (rate-limited).                                     |
| `/registered_customer`        | `GET`      | Fetch users with the "customer" role.                                          |
| `/registered_admin`           | `GET`      | Fetch users with the "admin" role.                                             |
| `/registered_employee`        | `GET`      | Fetch users with the "employee" role.                                          |
| `/users_by_role/:role`        | `GET`      | Fetch users dynamically by role.                                               |
| `/update/user/details/:id`    | `PUT`      | Update user details by ID.                                                     |
| `/userId/:id`                 | `GET`      | Fetch user details by ID.                                                      |
| `/delete_user`                | `DELETE`   | Delete a user (admin only).                                                    |

---

## Dependencies

| **Dependency**         | **Purpose**                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| **express**             | Web framework for Node.js.                                                 |
| **mongoose**            | MongoDB object modeling tool.                                              |
| **jsonwebtoken**        | For generating and verifying JWT tokens.                                   |
| **bcryptjs**            | For hashing passwords.                                                     |
| **express-rate-limit**  | For rate limiting.                                                         |
| **dotenv**              | For managing environment variables.                                        |
| **cookie-parser**       | For parsing cookies.                                                       |
| **cors**                | For enabling Cross-Origin Resource Sharing.                                |

---

## Contributing

We welcome contributions to improve this project! Here's how you can contribute:

1. **Fork the Repository**: Create a copy of this repository in your GitHub account.
2. **Create a Branch**: Use a descriptive name for your branch (e.g., `feature/add-email-verification`).
3. **Make Changes**: Implement your changes or new features.
4. **Test Your Changes**: Ensure your changes work as expected and do not break existing functionality.
5. **Submit a Pull Request**: Open a pull request with a clear description of your changes.

Feel free to report issues or suggest enhancements by opening an issue in the repository.

---

## License

This project is licensed under the MIT License.


## Future Enhancements

| **Enhancement**                     | **Description**                                                                 |
|-------------------------------------|---------------------------------------------------------------------------------|
| **Email Verification**              | Add email verification during registration.                                     |
| **Account Recovery**                | Implement account recovery via email.                                          |
| **Testing**                         | Add unit and integration tests for all modules.                                |
| **Error Handling**                  | Improve error handling and logging.                                            |
