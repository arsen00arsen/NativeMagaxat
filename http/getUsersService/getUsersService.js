import {$authHost} from '..';

export class GetBenefactorsService {
  static getBenefactors() {
    return $authHost.get('/benefactors_api');
  }
}

export class AppearsService {
  static getAppers(currentPage) {
    return $authHost.get(`/appeals_api?page=${currentPage}`);
  }
}
