import {$authHost} from '..';

export class PostService {
  static loadPosts(currentPage = 1) {
    return $authHost.get(`/posts_api?page=${currentPage}`);
  }
  static loadMyPosts() {
    return $authHost.get('profile/me');
  }
  static loadPostsUser({id, currentPage = 1}) {
    return $authHost.get(`/posts_api/user/${id}?page=${currentPage}`);
  }
  static deletedPost(id) {
    return $authHost.delete(`/posts_api/${id}`);
  }
}
