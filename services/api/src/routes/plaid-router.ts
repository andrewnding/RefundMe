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

router.get('/get_auth', async (req: Request, res: Response) => {
  let getAuthResponse: plaid.AuthResponse
  try {
    getAuthResponse = await client.getAuth(getAccessToken())
    return res.json(getAuthResponse)
  } catch (e) {
    console.log('error getting auth', e)
  }
})

router.get('/get_transactions', async (req: Request, res: Response) => {
    let getAllTransactionsResponse: plaid.TransactionsAllResponse;
    try {
        getAllTransactionsResponse = await client.getAllTransactions(getAccessToken(), '2018-01-01', '2018-02-01')
    } catch (e) {
        console.log('Error getting all transactions', e);
    }

    console.log(getAllTransactionsResponse);
    res.json(getAllTransactionsResponse);
})

router.get('/person/items', async (req: Request, res: Response) => {
    let items: ItemType[];

    if (!req.user || !req.user.id) {
      console.log('no user in /person/items')
      return
    }

    // First get items associated with person
    try {
      items = await req.context.dataStore.getItemsFromPerson(req.user.id)
    } catch (e) {
        console.log('Error getting person items', e);
    }
    const accessTokens = items.map(item => item.access_token)

    // Then call /item/get plaid endpoint on each item to get detailed information
    const itemPromises = accessTokens.map(token => client.getItem(token))
    const plaidItems = await Promise.all(itemPromises)
    const result = plaidItems.map(item => ({
      item_id: item.item.item_id,
      institution_id: item.item.institution_id,
    }))
    
    res.json(result);
})

export default router;