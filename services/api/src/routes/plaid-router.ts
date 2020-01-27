import * as express from 'express';
import { Request, Response } from 'express';
import * as plaid from 'plaid';
import { getPerson, getItemsFromPerson, createItem } from '../db/postgres';
import { PersonType, ItemType } from '../types/database-types';

const {
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

const router: express.Router = express.Router();

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

router.post('/get_access_token', (req: Request, res: Response) => {
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

router.get('/get_transactions', async (req: Request, res: Response) => {
    let getAllTransactionsResponse: plaid.TransactionsAllResponse;
    try {
        getAllTransactionsResponse = await client.getAllTransactions(getAccessToken() || 'access-sandbox-56412edb-cfa3-4963-a2cf-cc6cda1cdda1', '2018-01-01', '2018-02-01')
    } catch (e) {
        console.log('Error getting all transactions', e);
    }

    console.log(getAllTransactionsResponse);
    res.json(getAllTransactionsResponse);
})

router.get('/person/:person_id', async (req: Request, res: Response) => {
    let person: PersonType;
    try {
        person = await getPerson('2cda26f6-4091-11ea-8d0b-122d51db1d75');
    } catch (e) {
        console.log('Error getting person', e);
    }
    res.json(person);
})

router.get('/person/items/:person_id', async (req: Request, res: Response) => {
    let items: ItemType[];
    try {
        items = await getItemsFromPerson('2cda26f6-4091-11ea-8d0b-122d51db1d75');
    } catch (e) {
        console.log('Error getting person', e);
    }
    res.json(items);
})

router.post('/create_link', async (req: Request, res: Response) => {
    const {
        public_token,
        person_id,
    } = req.body;

    let tokenResponse: plaid.TokenResponse;
    try {
        tokenResponse = await client.exchangePublicToken(public_token)
    } catch (e) {
        const msg = 'Could not exchange public token!';
        console.log(`${msg} \n ${JSON.stringify(e)}`);
        return res.json({
            error: msg,
        });
    }

    const {
        item_id,
        access_token,
    } = tokenResponse;

    try {
        await createItem(person_id, item_id, access_token);
    } catch (e) {
        console.log(`Error creating item link`);
        return res.json({
            error: e,
        });
    }

    res.json({
        item_id: item_id,
        access_token: access_token,
        error: false,
    });
})

export default router;