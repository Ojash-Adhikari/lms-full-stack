import { verifyToken } from '@clerk/clerk-sdk-node';


const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

export const getClerkUserId = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifyToken(token, {
      secretKey: CLERK_SECRET_KEY, // Required!
    });

    return payload.sub; // This is the userId (Clerk's "sub" = user ID)
  } catch (error) {
    console.log('JWT verification failed:', error.message);
    return null;
  }
};