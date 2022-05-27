import {$authHost} from '..';

export default class CommentAddService {
  static addComment(data) {
    console.log(data, 'llllll');
    return $authHost.post('/posts_api/comment', {
      data: data,
    });
  }
}
