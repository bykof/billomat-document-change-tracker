import {DbHandler} from './db-handling';

export class ObjectSearcher {
  constructor() {
    this.db = DbHandler.db;
  }

  search(type, attribute, value) {
    const lookupDict = {};
    const lookupKey = 'document.' + attribute;
    lookupDict[lookupKey] = value;
    return this.db.collection(type).find(lookupDict).toArray();
  }
}