import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import * as uuidv4 from 'uuid/v4';
import { pool } from '../db/postgres';

const configureApp = (app: express.Express) => {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    const pgSession = connectPgSimple(session)
    app.use(session({
        store: new pgSession({
            pool,
        }),
        genid: () => {
            return uuidv4()
        },
        secret: 'haha',
        resave: false,
        saveUninitialized: false,
    }))

    return app;
}

export default configureApp;