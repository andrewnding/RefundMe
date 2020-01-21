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

let ACCESS_TOKEN: string;
let ITEM_ID: string;

const getAccessToken: () => string = () => {
    if (ACCESS_TOKEN) {
        return ACCESS_TOKEN;
    }
    
    if (PLAID_ENV === 'sandbox') {
        return 'access-sandbox-56412edb-cfa3-4963-a2cf-cc6cda1cdda1';
    }
}

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

        ACCESS_TOKEN = tokenResponse.access_token;
        ITEM_ID = tokenResponse.item_id;
        console.log(tokenResponse);

        res.json({
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID,
            error: false,
        });
    });
});

app.get('/get_transactions', async (req: Request, res: Response) => {
    let getAllTransactionsResponse: plaid.TransactionsAllResponse;
    try {
        getAllTransactionsResponse = await client.getAllTransactions(getAccessToken() || 'access-sandbox-56412edb-cfa3-4963-a2cf-cc6cda1cdda1', '2018-01-01', '2018-02-01')
    } catch (e) {
        console.log('Error getting all transactions', e);
    }

    console.log(getAllTransactionsResponse);
    res.json(getAllTransactionsResponse);
})

app.listen(PORT, () => {
    console.log(`server started at http://localhost: ${PORT}`);
});