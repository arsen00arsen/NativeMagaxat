import {$authHost} from '..';

export class GetBenefactorsService {
  static getBenefactors(currentPage) {
    console.log(currentPage);
    return $authHost.get(`/benefactors_api?page=${currentPage}`);
  }
}

export class AppearsService {
  static getAppers(currentPage) {
    return $authHost.get(`/appeals_api?page=${currentPage}`);
  }
}
