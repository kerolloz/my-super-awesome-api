import type { FastifyZodInstance } from '../lib/index.js';
import { ArticleModel } from '../models/index.js';
import { ImageUploader } from '../services/index.js';

export default (app: FastifyZodInstance) =>
  app
    .route({
      method: 'GET',
      url: '/articles',
      handler: () =>
        ArticleModel.find().sort({ createdAt: -1 }).populate('user', 'name'),
    })
    .route({
      method: 'POST',
      url: '/articles',
      schema: {
        security: [{ BearerAuth: [] }],
      },
      preHandler: app.authenticate,
      handler: async (req, reply) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 megabytes to bytes
        await req.parseMultipart({
          maxFileSize: MAX_FILE_SIZE,
          keepExtensions: true,
          allowEmptyFiles: false,
        });
        const { body, files, user } = req;
        const fields = body as Record<string, string[]>;
        // check `title` and `content` fields are strings
        if (
          typeof fields.title !== 'string' ||
          typeof fields.content !== 'string'
        ) {
          return reply
            .status(400)
            .send({ message: "'title' or 'content' fields are missing" });
        }
        // check `image` field is a file and is an image
        const imageFile = Array.isArray(files?.image)
          ? files.image[0]
          : files?.image;
        const isImage = imageFile?.mimetype?.startsWith('image/');
        if (imageFile && !isImage) {
          return reply.status(400).send({ message: 'file must be an image' });
        }
        const { title, content } = fields;
        // upload image to ImgBB
        const image = imageFile
          ? await ImageUploader.upload(imageFile.filepath)
          : undefined;

        return reply
          .status(201)
          .send(await ArticleModel.create({ title, content, image, user }));
      },
    });
