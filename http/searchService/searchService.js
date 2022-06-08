import {$authHost} from '..';
export class SearchSevices {
  static searchBenefactors(data) {
    return $authHost.get('/appears_api?name=' + data);
  }
  //   static searchMedia(data) {
  //     console.log(data);
  //     return $authHost.get('/videos_api?title=' + data).then;
  //   }
}
