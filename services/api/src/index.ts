import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';
import * as plaid from 'plaid';

const {
    PORT = 8000,
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    PLAID_ENV = 'sandbox',
} = process.env;

const client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV],
    { version: '2019-05-29' }
);

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'hello world!!',
    });
});

app.post('/get_access_token', (req: Request, res: Response, next: NextFunction) => {
    const PUBLIC_TOKEN = req.body.public_token;
    client.exchangePublicToken(PUBLIC_TOKEN, (error: Error, tokenResponse: plaid.TokenResponse) => {
        if (error) {
            const msg = 'Could not exchange public token!';
            console.log(`${msg} \n ${JSON.stringify(error)}`);
            return res.json({
                error: msg,
            });
        }

        const ACCESS_TOKEN = tokenResponse.access_token;
        const ITEM_ID = tokenResponse.item_id;
        console.log(tokenResponse);

        res.json({
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID,
            error: false,
        });
    });
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost: ${PORT}`);
});