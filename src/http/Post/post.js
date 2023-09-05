import {$authHost} from '..';

export default class PostService {
  static createPost(data) {
    return $authHost.post('/post', data);
  }
  static blockPost(id) {
    return $authHost.post(`/block/${id}`);
  }
  static getComments({id, page}) {
    return $authHost.get(`/comments/${id}?page=${page}`);
  }
  static postSearch({name, page}) {
    return $authHost.get(`/posts/search?name=${name}`);
  }
  static freandsSearch({name, page}) {
    return $authHost.get(`/users/search?name=${name}`);
  }
  static getSinglePost(id) {
    return $authHost.get(`/post/${id}`);
  }
  static readNotifications(id) {
    return $authHost.put(`/notifications/${id}`);
  }
  static getNotification({page}) {
    console.log(page, 'pppp')
    return $authHost.get(`/notifications?page=${page}`);
  }
  static sendComment(data) {
    return $authHost.post('/comment', data);
  }
}
