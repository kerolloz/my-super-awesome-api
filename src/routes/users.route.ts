import z from 'zod';
import type { FastifyZodInstance } from '../lib';
import { EmailVerificationModel, UserModel } from '../models';

export default (app: FastifyZodInstance) =>
  app
    .route({
      method: 'POST',
      url: '/login',
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
      handler: async (req, reply) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await user.authenticate(password))) {
          if (!user._isVerified) {
            return reply.status(401).send({
              message: 'Please verify your email address first.',
            });
          }
          const token = app.jwt.sign({ _id: user._id }, { expiresIn: '1d' });
          return { user, token };
        }

        return reply.status(401).send({
          message: 'Invalid email or password.',
        });
      },
    })
    .route({
      method: 'POST',
      url: '/signup',
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(8),
        }),
      },
      handler: async (req, reply) => {
        const existingUser = await UserModel.exists({ email: req.body.email });
        if (existingUser) {
          return reply
            .status(400)
            .send({ message: 'User with this email already exists.' });
        }
        const user = await UserModel.create(req.body);
        await EmailVerificationModel.create({ user });
        return {
          message:
            'Registered successfully. A verification mail has been sent to your email address.',
        };
      },
    })
    .route({
      method: 'POST',
      url: '/verify',
      schema: {
        body: z.object({
          code: z.string(),
        }),
      },
      handler: async (req, reply) => {
        const { code } = req.body as { code: string };
        const verification = await EmailVerificationModel.findOne({ code });

        if (!verification || !verification.user) {
          return reply.status(401).send({
            message: 'Invalid verification code.',
          });
        }

        verification.user.set({ _isVerified: true });
        await Promise.all([verification.user.save(), verification.deleteOne()]);

        return { message: 'Email verified successfully.' };
      },
    });
