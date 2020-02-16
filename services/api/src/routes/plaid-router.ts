import * as express from 'express';
import { Request, Response } from 'express';
import * as plaid from 'plaid';
import { ItemType } from 'types';

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

const getAccessToken: () => string = () => {
    if (ACCESS_TOKEN) {
        return ACCESS_TOKEN;
    }
    
    if (PLAID_ENV === 'sandbox') {
        return 'access-sandbox-56412edb-cfa3-4963-a2cf-cc6cda1cdda1';
    }
}

router.post('/get_access_token', async (req: Request, res: Response) => {
    const {
      public_token,
      person_id,
    } = req.body
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
        req.context.dataStore.createAndAddItemToPerson(person_id, item_id, access_token);
    } catch (e) {
        console.log(`Error creating item link`);
        return res.json({
            error: e,
        });
    }

    res.json({
        error: false,
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

router.get('/person/items/:person_id', async (req: Request, res: Response) => {
    let items: ItemType[];
    try {
    } catch (e) {
        console.log('Error getting person', e);
    }
    res.json(items);
})

router.post('/create_item', async (req: Request, res: Response) => {
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
        // await req.context.dataStore.createAndAddItemToPerson(person_id, item_id, access_token);
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