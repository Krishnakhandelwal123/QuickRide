# QuickRide Backend - Auth Endpoints

This document describes the authentication endpoints implemented in the backend.

---

## POST /users/register

Description
- Register a new user and return an auth token.
- Controller: backend/controllers/user.controller.js -> registerUser
- Service: backend/services/user.service.js -> createUser
- Model helpers: backend/models/user.model.js (hashPassword, generateAuthToken)

URL
- /users/register

Method
- POST

Headers
- Content-Type: application/json

Request body (JSON)
```json
{
  "fullname": {
    "firstname": "string (min 3 chars)",
    "lastname": "string (min 3 chars)"
  },
  "email": "valid email (min 5 chars)",
  "password": "string (min 6 chars)"
}
```

Validation (from backend/routes/user.routes.js)
- email: must be a valid email
- fullname.firstname: min length 3
- fullname.lastname: min length 3
- password: min length 6

Responses
- 201 Created
  - Body:
  ```json
  {
    "user": {
      "_id": "string",
      "fullname": { "firstname": "string", "lastname": "string" },
      "email": "string"
    },
    "token": "jwt-token-string"
  }
  ```
- 400 Bad Request
  - Body: { "errors": [ /* validation errors */ ] }
- 500 Internal Server Error
  - Body: { "message": "Error registering user", "error": "error message" }

Example curl
```sh
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

---

## POST /users/login

Description
- Authenticate an existing user and return an auth token.
- Controller: backend/controllers/user.controller.js -> loginUser
- Model helpers: backend/models/user.model.js (comparePassword, generateAuthToken)

URL
- /users/login

Method
- POST

Headers
- Content-Type: application/json

Request body (JSON)
```json
{
  "email": "valid email",
  "password": "string (min 6 chars)"
}
```

Validation (from backend/routes/user.routes.js)
- email: must be a valid email
- password: min length 6

Notes on processing
- Controller loads the user with `.select('+password')` to compare password.
- Password comparison uses user.comparePassword (bcrypt).
- On success, controller returns a JWT from user.generateAuthToken.
- The response omits the password (returns user object with _id, fullname, email).

Responses / Status codes
- 200 OK
  - Body:
  ```json
  {
    "user": {
      "_id": "string",
      "fullname": { "firstname": "string", "lastname": "string" },
      "email": "string"
    },
    "token": "jwt-token-string"
  }
  ```
  - Triggered when email and password are valid.
- 400 Bad Request
  - Body: { "errors": [ /* validation errors */ ] }
  - Triggered when request validation fails.
- 401 Unauthorized
  - Body: { "message": "Invalid email or password" }
  - Triggered when credentials are incorrect or user not found.
- 500 Internal Server Error
  - Body: { "message": "Error logging in", "error": "error message" }

Example curl
```sh
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

References
- backend/routes/user.routes.js
- backend/controllers/user.controller.js
- backend/services/user.service.js
- backend/models/user.model.js

---

## GET /users/logout

Description
- Log out the authenticated user by clearing the auth cookie and blacklisting the token so it cannot be reused.
- Controller: backend/controllers/user.controller.js -> logoutUser
- Middleware: backend/middlewares/auth.middleware.js -> authUser
- Blacklist model: backend/models/blacklistToken.model.js (tokens expire from the blacklist after 86400 seconds / 24 hours)

URL
- /users/logout

Method
- GET

Authentication
- Required. Send token via Authorization header: "Authorization: Bearer <token>" or via cookie named "token".

Headers
- Authorization: Bearer <token>
- (optional) Cookie: token=<token>

Notes on processing
- The auth middleware verifies the token and attaches req.user.
- logoutUser clears the cookie and saves the token to the blacklist collection so subsequent requests with the same token are rejected.
- Blacklist entries expire automatically after 86400 seconds as configured in the model.

Responses / Status codes
- 200 OK
  - Body:
    ```json
    { "message": "Logged out" }
    ```
  - Triggered on successful logout.
- 401 Unauthorized
  - Body:
    ```json
    { "message": "Unauthorized" }
    ```
  - Triggered when no token is provided, token is invalid/expired, or blacklisted.
- 500 Internal Server Error
  - Body:
    ```json
    { "message": "Error logging out", "error": "error message" }
    ```
  - Triggered on unexpected server errors (e.g., DB write failure).

Example curl (Authorization header)
```sh
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <TOKEN>"
```

Example curl (cookie)
```sh
curl -X GET http://localhost:4000/users/logout \
  --cookie "token=<TOKEN>"
```

---

## POST /captains/register

Description
- Register a new captain and return an auth token.
- Controller: backend/controllers/captain.controller.js -> registerCaptain
- Service: backend/services/captain.service.js -> createCaptain
- Model helpers: backend/models/captain.model.js (hashPassword, generateAuthToken)

URL
- /captains/register

Method
- POST

Headers
- Content-Type: application/json

Request body (JSON)
```json
{
  "fullname": {
    "firstname": "string (min 3 chars)",
    "lastname": "string (min 3 chars)"
  },
  "email": "valid email (min 5 chars)",
  "password": "string (min 6 chars)"
}
```

Validation (recommended)
- email: must be a valid email
- fullname.firstname: min length 3
- fullname.lastname: min length 3
- password: min length 6

Notes on processing
- Password should be hashed before storage.
- After creation, return a JWT token generated by the model method.
- Response must omit the stored password.

Responses / Status codes
- 201 Created
  - Body:
    ```json
    {
      "captain": {
        "_id": "string",
        "fullname": { "firstname": "string", "lastname": "string" },
        "email": "string"
      },
      "token": "jwt-token-string"
    }
    ```
- 400 Bad Request
  - Body:
    ```json
    { "errors": [ /* validation errors */ ] }
    ```
- 500 Internal Server Error
  - Body:
    ```json
    { "message": "Error registering captain", "error": "error message" }
    ```

Example curl
```sh
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "strongpassword"
  }'
```

---

## POST /captains/login

Description
- Authenticate an existing captain and return an auth token.
- Controller: backend/controllers/captain.controller.js -> loginCaptain
- Model helpers: backend/models/captain.model.js (comparePassword, generateAuthToken)

URL
- /captains/login

Method
- POST

Headers
- Content-Type: application/json

Request body (JSON)
```json
{
  "email": "valid email",
  "password": "string (min 6 chars)"
}
```

Validation (from backend/routes/captain.routes.js)
- email: must be a valid email
- password: min length 6

Notes on processing
- Controller loads the captain with `.select('+password')` to compare password.
- Password comparison uses captain.comparePassword (bcrypt).
- On success, controller returns a JWT from captain.generateAuthToken.
- The response omits the password (returns captain object with _id, fullname, email).

Responses / Status codes
- 200 OK
  - Body:
  ```json
  {
    "captain": {
      "_id": "string",
      "fullname": { "firstname": "string", "lastname": "string" },
      "email": "string"
    },
    "token": "jwt-token-string"
  }
  ```
  - Triggered when email and password are valid.
- 400 Bad Request
  - Body: { "errors": [ /* validation errors */ ] }
  - Triggered when request validation fails.
- 401 Unauthorized
  - Body: { "message": "Invalid email or password" }
  - Triggered when credentials are incorrect or captain not found.
- 500 Internal Server Error
  - Body: { "message": "Error logging in", "error": "error message" }

Example curl
```sh
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "strongpassword"
  }'
```

References
- backend/routes/captain.routes.js
- backend/controllers/captain.controller.js
- backend/services/captain.service.js
- backend/models/captain.model.js