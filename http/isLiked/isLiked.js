import {$authHost} from '..';

export default class PostLike {
  static isLiked(data) {
    return $authHost.post('/posts_api/like', {
      id: data,
    });
  }
}
