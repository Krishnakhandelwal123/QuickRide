# Endpoint: POST /users/register

Description
- Register a new user and return an auth token.
- Route handler: [`module.exports.registerUser`](backend/controllers/user.controller.js) in [backend/controllers/user.controller.js](backend/controllers/user.controller.js).
- Route definition: [backend/routes/user.routes.js](backend/routes/user.routes.js).
- User creation logic: [`module.exports.createUser`](backend/services/user.service.js) in [backend/services/user.service.js](backend/services/user.service.js).
- Password hashing: [`userSchema.statics.hashPassword`](backend/models/user.model.js) in [backend/models/user.model.js](backend/models/user.model.js).
- Token generation: [`userSchema.methods.generateAuthToken`](backend/models/user.model.js) in [backend/models/user.model.js](backend/models/user.model.js).

URL
- /users/register

Method
- POST

Authentication
- None (returns a token on successful registration)

Headers
- Content-Type: application/json

Request body (JSON)
- Required shape:
```json
{
  "fullname": {
    "firstname": "string (min 3 chars)",
    "lastname": "string (min 3 chars)"
  },
  "email": "valid email (min 5 chars)",
  "password": "string (min 6 chars)"
}