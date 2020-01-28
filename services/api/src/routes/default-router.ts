import * as express from 'express';
import { Request, Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import { getPerson, createPerson } from '../db/postgres';
import { PersonType } from '../types/database-types';
import moment = require('moment');

const router: express.Router = express.Router();

router.get('/person/:person_id', async (req: Request, res: Response) => {
    let person: PersonType;
    try {
        person = await getPerson(req.params.person_id);
        console.log(person)
        res.json(person);
    } catch (e) {
        console.log('Error getting person', e);
        res.json({ error: e })
    }
})

router.post('/create_person', async (req: Request, res: Response) => {
    const person: PersonType = {
        id: uuidv4(),
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        created_at: moment(),
    }

    try {
        await createPerson(person)
        res.json(person)
    } catch (e) {
        console.log(`Error creating person: ${e}`)
        res.json({
            error: e,
        })
    }
})

export default router;