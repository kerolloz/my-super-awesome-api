import formidable, { File } from 'formidable';
import { BAD_REQUEST, endpoint, HttpException } from '../../core';
import { ArticleModel } from '../../models';
import { ImageUploader } from '../../services';
import { IAuthRequest } from '../../types/auth';

export default endpoint(async (req) => {
  const aacceptedContentType = 'multipart/form-data';
  const isAcceptedContentType =
    req.headers['content-type'] === aacceptedContentType;

  if (isAcceptedContentType) {
    throw new HttpException(BAD_REQUEST, { message: 'Invalid content type' });
  }
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // meagbytes to bytes
  const form = formidable({
    maxFileSize: MAX_FILE_SIZE,
    keepExtensions: true,
    allowEmptyFiles: false,
  });
  const body = await new Promise<{
    title: string;
    content: string;
    file?: File;
  }>((resolve, reject) =>
    form.parse(req, (formError, fields, files) => {
      if (formError) {
        console.error(formError);
        return reject(
          new HttpException(BAD_REQUEST, { message: 'Invalid file' }),
        );
      }
      const { title, content } = fields;
      if (!title || !content) {
        return reject(
          new HttpException(BAD_REQUEST, {
            message: "Add 'title' and 'content' fields",
          }),
        );
      }
      if (typeof title !== 'string' || typeof content !== 'string') {
        return reject(
          new HttpException(BAD_REQUEST, {
            message: "'title' and 'content' fields must be strings",
          }),
        );
      }

      const image = files.image as File;
      if (image && !image?.mimetype?.startsWith('image/')) {
        return reject(
          new HttpException(BAD_REQUEST, {
            message: 'file must be an image',
          }),
        );
      }

      return resolve({
        title,
        content,
        file: image,
      });
    }),
  );

  const { title, content, file } = body;
  let image: string | undefined = undefined;
  if (file) {
    image = await ImageUploader.upload(file.filepath);
  }
  return {
    status: 201,
    content: await ArticleModel.create({
      title,
      content,
      image,
      user: (req as IAuthRequest).currentUser,
    }),
  };
});
