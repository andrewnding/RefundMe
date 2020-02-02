import * as express from 'express';
import { Request, Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import Person from '../models/person';
import { PersonType } from '../types/types';
import * as moment from 'moment';

const router: express.Router = express.Router();

router.get('/person/:person_id', async (req: Request, res: Response) => {
    let person: Person;
    try {
        person = await Person.getById(req.params.person_id);
        console.log(person)
        res.json(person);
    } catch (e) {
        console.log('Error getting person', e);
        res.json({ error: e })
    }
})

router.post('/create_person', async (req: Request, res: Response) => {
    const person = new Person({
        id: uuidv4(),
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        createdAt: moment(),
    })

    try {
        await person.create()
        res.json(person)
    } catch (e) {
        console.log(`Error creating person: ${e}`)
        res.json({
            error: e,
        })
    }
})

export default router;