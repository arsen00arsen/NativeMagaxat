import {$authHost} from '..';

export class PostService {
  static loadPosts(currentPage = 1) {
    return $authHost.get(`/posts_api?page=${currentPage}`);
  }
}

export class MyPostService {
  static loadMyPosts() {
    return $authHost.get('profile/me');
  }
}
