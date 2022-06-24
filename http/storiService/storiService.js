import {$authHost} from '..';

export class StoriService {
  static loadStories() {
    return $authHost.get('/stories_api');
  }
  static loadMyStories() {
    return $authHost.get('profile/me');
  }

  static deletedStories(id) {
    return $authHost.delete(`/stories_api/${id}`);
  }
}
