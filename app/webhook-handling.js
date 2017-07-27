import moment from 'moment';

import {DbHandler} from './db-handling';
import {ObjectUpdater} from './object-updating';

export class BillomatWebhookHandler {
  constructor() {
    this.db = DbHandler.db;
  }

  handle(webhookData, eventType) {
    const eventTypeName = eventType.split('.')[1];

    Object.keys(webhookData).forEach((collectionName) => {
      const collection = this.db.collection(collectionName);

      collection.find({'document.id': webhookData[collectionName]['id']}).next().then((result) => {
        if (result) {
          const changes = result.changes;
          changes.push({
            diff: new ObjectUpdater(result.document).update(webhookData[collectionName]),
            date: moment().unix(),
            eventType: eventTypeName
          });

          collection.updateOne({_id: result._id}, {
            document: result.document,
            changes: changes,
          });
        } else {
          collection.insertOne({
            document: webhookData[collectionName],
            changes: [
              {
                diff: {},
                date: moment().unix(),
                eventType: eventTypeName
              }
            ]
          });
        }
      });
    });
  }
}