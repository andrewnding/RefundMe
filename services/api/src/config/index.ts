import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as uuidv4 from 'uuid/v4';
import PostgresStore from 'db/postgres';
import { PersonType } from 'types'

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
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const person = await pgStore.getPersonByEmail(email)
                if (person == null) {
                    console.log('User not found')
                    return done(null, false, { message: 'User not found.' });
                }

                if (person.password != password) {
                    console.log('Incorrect password')
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, person)
            } catch (e) {
                return done(e)
            }
        }
    ))

    passport.serializeUser<PersonType, string>((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser<PersonType, string>(async (id, done) => {
        try {
            const person = await pgStore.getPersonById(id)
            done(null, person)
        } catch (e) {
            done(e)
        }
    });

    return app
}

export default configureApp;