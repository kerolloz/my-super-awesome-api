import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const SWAGGER_ROUTE = '/swagger' as const;

export const registerSwagger = (app: FastifyInstance) => {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'My Super Awesome Api',
        description: 'Some super awesome API description',
        contact: {
          name: 'Kerollos Magdy',
          url: 'https://kerolloz.dev',
          email: 'kerolloz@yahoo.com',
        },
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            description: 'RSA256 JWT signed by private key',
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUI, {
    routePrefix: SWAGGER_ROUTE,
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: (_request, _reply, next) => next(),
      preHandler: (_request, _reply, next) => next(),
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
};
