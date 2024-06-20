import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';
import authenticate from './lib/authenticate.js';
import { connectToDatabase } from './database.js';
import { SWAGGER_ROUTE, registerSwagger } from './lib/swagger.js';
import { registerAllRoutes } from './routes/index.js';
import { env } from './config/index.js';
import FastifyFormidable from 'fastify-formidable';

const app = fastify();

app.register(cors);
app.register(helmet);
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(authenticate);
app.register(FastifyFormidable);

registerSwagger(app);

app.setErrorHandler((error, _, reply) =>
  error instanceof ZodError
    ? reply.status(400).send({ message: 'Bad Request', error: error.issues })
    : reply.send(error),
);

app.after(() => registerAllRoutes(app).then(connectToDatabase));

app.listen({ port: +env('PORT') }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(`Swagger available at ${address}${SWAGGER_ROUTE}`);
});
