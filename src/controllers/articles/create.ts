import { BAD_REQUEST, endpoint, HttpException } from '../../core';
import { FormParser } from '../../lib/FormParser';
import { ArticleModel } from '../../models';
import { ImageUploader } from '../../services';
import type { IAuthRequest } from '../../types/auth';

export default endpoint(async (req) => {
  const acceptedContentType = 'multipart/form-data';
  // check 'content-type' header stars with multipart/form-data
  // because 'content-type' header look like "multipart/form-data; boundary=..."
  const isAcceptedContentType =
    req.headers['content-type']?.startsWith(acceptedContentType);
  if (!isAcceptedContentType) {
    throw new HttpException(BAD_REQUEST, { message: 'Invalid content type' });
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 megabytes to bytes
  const form = new FormParser({
    maxFileSize: MAX_FILE_SIZE,
    keepExtensions: true,
    allowEmptyFiles: false,
  });
  // parse form data
  const { fields, files } = await form.parse(req).catch((err) => {
    console.error(err);
    throw new HttpException(BAD_REQUEST, {
      message: 'Invalid form data',
    });
  });
  // check `title` and `content` fields are strings
  if (
    fields.title === undefined ||
    fields.content === undefined ||
    typeof fields.title[0] !== 'string' ||
    typeof fields.content[0] !== 'string'
  ) {
    throw new HttpException(BAD_REQUEST, {
      message: "'title' and 'content' fields are missing",
    });
  }
  // check `image` field is a file and is an image
  const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
  const isImage = imageFile?.mimetype?.startsWith('image/');
  if (imageFile && !isImage) {
    throw new HttpException(BAD_REQUEST, {
      message: 'file must be an image',
    });
  }

  const user = (req as IAuthRequest).currentUser;
  const title = fields.title[0];
  const content = fields.content[0];
  // upload image to ImgBB
  const image = imageFile
    ? await ImageUploader.upload(imageFile.filepath)
    : undefined;

  return {
    status: 201,
    content: await ArticleModel.create({ title, content, image, user }),
  };
});
