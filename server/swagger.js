// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LMS API',
      version: '1.0.0',
      description: 'Learning Management System API Documentation',
      contact: {
        name: 'LMS Support',
        email: 'support@lms.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.lms.com',
        description: 'Production server',
      },
    ],

    // Define all tags centrally here
    tags: [
      {
        name: 'User',
        description: 'User authentication and profile management',
      },
      {
        name: 'Educator',
        description: 'Educator-specific operations',
      },
      {
        name: 'Course',
        description: 'Course creation, management, and enrollment',
      },
      {
        name: 'Tag',
        description: 'Tag management for categorizing courses',
      },
      {
        name: 'Recommendation',
        description: 'Course recommendations based on tags and user preferences',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            clerkId: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            profileImage: { type: 'string' },
            role: { type: 'string', enum: ['student', 'educator'] },
            credits: { type: 'number' },
            enrolledCourses: { type: 'array', items: { type: 'string' } },
          },
        },
        Course: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
            price: { type: 'number' },
            image: { type: 'string' },
            educator: { type: 'string' },
            lessons: { type: 'array', items: { type: 'string' } },
            rating: { type: 'number' },
            students: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }], // Apply JWT globally 
  },

  // Make sure all route files are scanned
  apis: [
    './routes/userRoutes.js',
    './routes/educatorRoutes.js',
    './routes/courseRoute.js',
    './routes/tagRoute.js',
    './routes/recommendationRoute.js',     
  ],
};

export const swaggerSpec = swaggerJsdoc(options);