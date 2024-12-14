# Backend Project Overview

This backend project is built with Node.js and Express, connecting to a MongoDB database using Mongoose. It provides APIs for managing users, fleets, bookings, tracking, payments, and reviews.

## Models

### User Model

Defines user information such as username, email, password, and role.

### Fleet Model

Represents fleet vehicles with details like type, capacity, availability, and location.

### Booking Model

Handles booking information including user ID, fleet ID, booking dates, and status.

### Tracking Model

Tracks fleet movements and statuses.

### Payment Model

Processes payment details for bookings.

### Review Model

Stores user reviews and ratings for fleets.

## Controllers and Routes

### User Routes (`/api/users` and `/api/auth`)

- `POST /register` - Register a new user.
- `POST /login` - Authenticate a user.

### Fleet Routes (`/api/fleet`)

- `GET /` - Retrieve all fleet vehicles.
- `POST /` - Add a new fleet vehicle.
- `GET /:id` - Retrieve a specific fleet vehicle.
- `PUT /:id` - Update fleet information.
- `DELETE /:id` - Remove a fleet vehicle.

### Booking Routes (`/api/bookings`)

- `GET /` - Retrieve all bookings.
- `POST /` - Create a new booking.
- `GET /:id` - Retrieve a specific booking.
- `PUT /:id` - Update booking details.
- `DELETE /:id` - Cancel a booking.

### Tracking Routes (`/api/tracking`)

- `GET /` - Get tracking information for all fleets.
- `GET /:fleetId` - Get tracking information for a specific fleet.

### Payment Routes (`/api/payments`)

- `POST /` - Process a payment for a booking.

### Review Routes (`/api/reviews`)

- `GET /` - Retrieve all reviews.
- `POST /` - Submit a new review.
- `GET /:id` - Retrieve a specific review.
- `PUT /:id` - Update a review.
- `DELETE /:id` - Delete a review.

## API Testing

API endpoints can be tested using tools like Postman:

1. Start the server using `npm start`.
2. Use the endpoint URLs mentioned above.
3. For protected routes, include authentication tokens.
4. Send appropriate HTTP requests (GET, POST, PUT, DELETE).
5. Verify responses and handle any errors returned by the server.
