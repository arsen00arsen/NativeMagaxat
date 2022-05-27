import {$authHost} from '..';

export default class GetBenefactorsService {
  static getBenefactors() {
    return $authHost.get('/benefactors_api');
  }
}
