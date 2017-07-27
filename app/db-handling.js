import {MongoClient} from 'mongodb';

import {config} from './config';

let db = null;

export class DbHandler {
  static get db() {
    return db;
  }

  static initDbCursor() {
    return new Promise(
      (resolve, reject) => {
        const mongoDbUrl = config.mongoDb.url + '/' + config.mongoDb.db;

        MongoClient.connect(
          mongoDbUrl,
          (err, mongoDb) => {
            if (err) {
              console.error('could not connect to mongo db: %s', mongoDbUrl);
              reject(err);
            } else {
              console.log('connected to mongo db: %s', mongoDbUrl);
              db = mongoDb;
              resolve(db);
            }
          }
        );
      }
    );
  }
}