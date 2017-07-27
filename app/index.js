import {setupRouting} from './routing';
import {DbHandler} from './db-handling';

DbHandler.initDbCursor().then(() => setupRouting());
