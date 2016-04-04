import store from 'reducer';

export default class Utils {
  static fetchStock(name) {
    return fetch('/api/stock/' + name).then(response => response.json());
  }
}
