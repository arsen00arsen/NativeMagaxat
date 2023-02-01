import {$authHost} from '..';

export class PostService {
  static loadPosts(currentpageIs) {
    return $authHost.get(`/posts_api?page=${currentpageIs}`);
  }
  static loadMyPosts(currentPage) {
    return $authHost.get(`profile/me?page=${currentPage}`);
  }
  static loadMySubscriptions(currentPage) {
    return $authHost.get(`profile/subscriptions?page=${currentPage}`);
  }
  static loadMySubscribers(currentPage) {
    console.log(currentPage, 'currentpage2');
    return $authHost.get(`profile/subscribers?page=${currentPage}`);
  }
  static loadPostsUser({id, currentPage = 1}) {
    return $authHost.get(`/posts_api/user/${id}?page=${currentPage}`);
  }
  static deletedPost(id) {
    return $authHost.delete(`/posts_api/${id}`);
  }
  static sharePost(id) {
    return $authHost.post(`/posts/share-post/${id}`);
  }
}
