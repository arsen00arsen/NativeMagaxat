import {$authHost} from '..';

export class CommentAddService {
  static addComment(data) {
    return $authHost.post('/posts_api/comment', data);
  }
}
