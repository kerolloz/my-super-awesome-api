import fs from 'node:fs/promises';
import type { FastifyZodInstance } from '../lib/index.js';

export const registerAllRoutes = async (app: FastifyZodInstance) => {
  const files = await fs.readdir(import.meta.dirname);
  // Read *.route.ts files in the current directory
  // register them by calling their default export and passing the app instance
  await Promise.all(
    files
      .filter((file) => file.endsWith('.route.js'))
      .map(async (file) => {
        const routeFile = await import(`./${file}`);
        routeFile.default(app);
        console.log(`Route ${file} registered`);
      }),
  );
};
