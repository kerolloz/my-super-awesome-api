import fastifyJwt from '@fastify/jwt';
import type { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { ObjectId } from 'mongodb';
import { jwtSecretKeyEnvVar } from '../config/index.js';

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: jwtSecretKeyEnvVar,
    formatUser(payload) {
      return { _id: new ObjectId(payload._id) };
    },
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    },
  );
});
