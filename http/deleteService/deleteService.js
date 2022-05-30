import {$authHost} from '..';

export class PostDeleteService {
  static deleted(id) {
    return $authHost.delete('');
  }
}
