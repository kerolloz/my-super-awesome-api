import '@fastify/jwt';
import type { ObjectId } from 'mongodb';

type UserPayload = { _id: ObjectId };
type DecodedUser = UserPayload;

declare module '@fastify/jwt' {
  interface FastifyJWT {
    // payload type is used for signing and verifying
    payload: UserPayload;
    // user type is return type of `request.user` object
    user: DecodedUser;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    authenticate: any;
  }
}
