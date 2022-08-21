import { IAuthRequest } from '../../auth';
import { endpoint } from '../../core';
import { articleValidations, ArticleModel } from '../../models';

export default endpoint({ body: articleValidations }, async (req) => ({
  status: 201,
  content: await ArticleModel.create({
    ...req.body,
    user: (req as IAuthRequest).currentUser,
  }),
}));
