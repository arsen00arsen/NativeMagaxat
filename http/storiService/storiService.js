import {$authHost} from '..';

export class StoriService {
  static loadStories(currentPage = 1) {
    return $authHost.get(`/stories_api?page=${currentPage}`);
  }
  static loadMyStories() {
    return $authHost.get('profile/me');
  }

  static deletedStories(id) {
    return $authHost.delete(`/stories_api/${id}`);
  }
}
