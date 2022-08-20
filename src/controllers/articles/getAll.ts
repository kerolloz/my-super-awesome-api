import { endpoint } from '../../core';
import { ArticleModel } from '../../models';

export default endpoint(async () => ({
  content: await ArticleModel.find(),
}));
