import * as express from 'express';
import { Request, Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import { PersonType } from '../types/types';
import * as moment from 'moment';

const router: express.Router = express.Router();

router.get('/person/:person_id', async (req: Request, res: Response) => {
    let person: PersonType;
    const { person_id } = req.params;

    try {
        person = await req.context.dataStore.getPersonById(person_id)
        res.json(person);
    } catch (e) {
        console.log('Error getting person', e);
        res.json({ error: e })
    }
})

router.post('/person/create', async (req: Request, res: Response) => {
    const person: PersonType = {
        id: uuidv4(),
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        createdAt: moment(),
    }

    try {
        await req.context.dataStore.createPerson(person)
        res.json(person)
    } catch (e) {
        console.log(`Error creating person: ${e}`)
        res.json({
            error: e,
        })
    }
})

export default router;