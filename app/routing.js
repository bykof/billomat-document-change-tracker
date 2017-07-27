import {createServer, plugins} from 'restify';

import {BillomatWebhookHandler} from './webhook-handling';
import {ObjectSearcher} from './object-search';
import {DbHandler} from './db-handling';

export const setupRouting = () => {
  const server = createServer();
  const billomatWebhookHandler = new BillomatWebhookHandler();
  const objectSearcher = new ObjectSearcher();
  const db = DbHandler.db;

  server.use(plugins.queryParser({
    mapParams: true
  }));
  server.use(plugins.bodyParser({
    mapParams: true
  }));

  server.post('/webhooks/billomat', (req, res, next) => {
    billomatWebhookHandler.handle(req.body, req.headers['x-billomat-webhook-event']);
    res.send();
    return next();
  });
  server.get('/api/documents/search', (req, res, next) => {
    objectSearcher.search(req.params['type'], req.params['attribute'], req.params['value']).then((result) => {
      res.send(result);
    });
    return next();
  });
  server.get('/api/documents/types', (req, res, next) => {
    db.listCollections().toArray().then((result) => {
      res.send(result.map((item) => item.name));
    });
    return next();
  });
  server.get('/api/documents/types/:type/attributes', (req, res, next) => {
    db.collection(req.params.type).find().sort({_id: -1}).next().then(
      (result) => res.send(Object.keys(result.document))
    );
    return next();
  });

  server.listen(
    8080, () => {
      console.log('%s listening at %s', server.name, server.url);
    }
  );
};
