import express from 'express';
import { router } from './router';
import { errorHandler, createBucketIfNotExists } from './utils';
import config from './config';

// TODO: dockerise, create tests, separate server and app

export const app = express();

createBucketIfNotExists().then(() => {
    app.use('/', router);
    app.use(errorHandler);

    app.listen(config.get('port'), () => {
        console.log(`Server listening at http://localhost:${config.get('port')}`);
    });
});
