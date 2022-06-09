import {$authHost} from '..';

export class CommentAddService {
  static addComment(data) {
    console.log(data, ';;;;;');
    return $authHost.post('/posts_api/comment', data);
  }
}
