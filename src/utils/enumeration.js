export default class Enum {
  constructor(obj) {
    // eslint-disable-next-line
    for (const key in obj) {
      if (key !== undefined) {
        this[key] = obj[key];
      }
    }
    return Object.freeze(this);
  }

  has(key) {
    // eslint-disable-next-line
    return this.hasOwnProperty(key);
  }
}
