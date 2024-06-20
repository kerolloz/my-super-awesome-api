import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';
import FastifyFormidable from 'fastify-formidable';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';
import { env } from './config';
import { connectToDatabase } from './database';
import authenticate from './lib/authenticate';
import { SWAGGER_ROUTE, registerSwagger } from './lib/swagger';
import { registerAllRoutes } from './routes';

const app = fastify({ pluginTimeout: 0 });

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

app.listen({ port: +env('PORT'), host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(`Swagger available at ${address}${SWAGGER_ROUTE}`);
});
