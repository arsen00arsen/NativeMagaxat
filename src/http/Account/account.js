import {$authHost, $host} from '..';

export default class UserService {
  static registre(data) {
    return $host.post('/register', data);
  }
  static login(data) {
    return $host.post('/login', data);
  }
  static logout() {
    return $authHost.post('/logout');
  }
  static getCategories() {
    return $host.get('/category');
  }
  static getAgeCategories() {
    return $authHost.get('/age');
  }
  static getCountry() {
    return $host.get('/country');
  }
  static getMe() {
    return $authHost.get('/profile');
  }
  static home() {
    return $authHost.get('/home');
  }
  static getFreands({page, categoryId, start, end, countryId}) {
    return $authHost.get(
      `/friends?start=${start}&end=${end}&country_id=${countryId}&category_id=${categoryId}&page=${page}`,
    );
  }
  static getSingleFreand(id) {
    return $authHost.get(`/user/${id}`);
  }
  static filtre({page, categoryId}) {
    return $authHost.get(
      `/post?start=&end=&country_id=&category_id=${categoryId}&page=${page}`,
    );
  }
  static getFollowings(page) {
    return $authHost.get(`/followings?page=${page}`);
  }
  static getFollowers(page) {
    return $authHost.get(`/followers?page=${page}`);
  }
  static follow(id) {
    return $authHost.post(`/follow/${id}`);
  }
  static unFollow(id) {
    return $authHost.post(`/unfollow/${id}`);
  }
  static isLike(data) {
    return $authHost.post('/like', data);
  }
  static delete() {
    return $authHost.post('/destroy');
  }
}
