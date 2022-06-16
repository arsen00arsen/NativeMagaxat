import {$authHost} from '..';

export class PostLike {
  static isLiked(data) {
    return $authHost.post('/posts_api/like', {
      id: data,
    });
  }
}

export class UserSubscribe {
  static isSubscribe(data) {
    return $authHost.post('/profile/subscribe', {
      user_id: data,
    });
  }
}
