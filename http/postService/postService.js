import {$authHost} from '..';

export default class PostService {
  static loadPosts(currentPage = 1) {
    return $authHost.get(`/posts_api?page=${currentPage}`);
  }
}
