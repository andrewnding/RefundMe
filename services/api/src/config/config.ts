import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as uuidv4 from 'uuid/v4';
import PostgresStore from '../db/postgres';

const pgStore = new PostgresStore();

const configureApp: (app: Express) => Express = (app: Express) => {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    const pgSession = connectPgSimple(session)
    app.use(configureDataStore)
    app.use(session({
        store: new pgSession({
            pool: pgStore.pool,
        }),
        genid: () => {
            return uuidv4()
        },
        secret: 'haha',
        resave: false,
        saveUninitialized: false,
    }))
    configurePassport(app)

    return app
}

const configureDataStore = (req: Request, res: Response, next: NextFunction) => {
    req.context = {}
    req.context.dataStore = pgStore
    next();
}

const configurePassport: (app: Express) => Express = (app: Express) => {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(
        (email, password, done) => {
            
        }
    ))

    return app
}

export default configureApp;