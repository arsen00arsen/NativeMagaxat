import {$authHost} from '..';

export class GetBenefactorsService {
  static getBenefactors() {
    return $authHost.get('/benefactors_api');
  }
}

export class AppearsService {
  static getAppers(currentPage = 1) {
    return $authHost.get(`/shops_api?page=${currentPage}`);
  }
}
