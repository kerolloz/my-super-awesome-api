import env from './env.js';

// Example: MONGODB_URI=mongodb://localhost:27017/db-name
export const mongoURIEnvVar = env('MONGODB_URI');
