# Swagger Documentation Setup

Swagger has been successfully integrated into your LMS API. This document explains how to access and use the API documentation.

## Accessing Swagger UI

Once your server is running, you can access the interactive API documentation at:

```
http://localhost:5000/api-docs
```

## Features

- **Interactive API Testing**: Test all endpoints directly from the Swagger UI
- **JWT Authentication**: Use the authorization button to add bearer tokens
- **Request/Response Examples**: See the structure of request and response bodies
- **API Schema Documentation**: Complete schema definitions for all models

## How to Use

1. **Start the Server**
   ```bash
   npm run server
   ```

2. **Open Swagger UI**
   - Navigate to `http://localhost:5000/api-docs` in your browser

3. **Authenticate (if needed)**
   - Click the "Authorize" button
   - Enter your JWT token in the format: `Bearer YOUR_TOKEN_HERE`
   - Click "Authorize"

4. **Try Out Endpoints**
   - Click on any endpoint to expand it
   - Click "Try it out"
   - Fill in required parameters
   - Click "Execute" to test the endpoint
   - View the response

## API Endpoints

### User Endpoints (`/api/user`)
- `GET /data` - Get user profile data
- `POST /purchase` - Purchase a course
- `GET /enrolled-courses` - Get enrolled courses
- `POST /update-course-progress` - Update course progress
- `POST /get-course-progress` - Get course progress
- `POST /add-rating` - Add or update course rating

### Educator Endpoints (`/api/educator`)
- `GET /update-role` - Convert user to educator
- `POST /add-course` - Create a new course
- `GET /courses` - Get educator's courses
- `GET /dashboard` - Get dashboard statistics
- `GET /enrolled-students` - Get enrolled students data

### Course Endpoints (`/api/course`)
- `GET /all` - Get all courses (with filters)
- `GET /{id}` - Get course details by ID

## Documentation Structure

All endpoints are documented with:
- **Summary**: Quick description
- **Description**: Detailed explanation
- **Tags**: API category
- **Parameters**: Required and optional parameters
- **Request Body**: Schema for POST requests
- **Responses**: Expected status codes and response formats
- **Security**: Authentication requirements

## Adding New Endpoints

When adding new endpoints, follow this JSDoc format:

```javascript
/**
 * @swagger
 * /api/route/path:
 *   post:
 *     summary: Brief description
 *     description: Detailed description
 *     tags:
 *       - TagName
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paramName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 *       400:
 *         description: Bad request
 */
router.post('/path', controllerFunction)
```

## Packages Used

- `swagger-ui-express`: Provides the UI interface
- `swagger-jsdoc`: Generates OpenAPI specification from JSDoc comments

## Troubleshooting

- **Swagger page not loading**: Ensure server is running on port 5000
- **Endpoints not showing**: Clear browser cache or try incognito mode
- **Authorization not working**: Make sure your JWT token is valid and in the correct format
