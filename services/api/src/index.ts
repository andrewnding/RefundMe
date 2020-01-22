import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import PlaidRouter from './routes/plaid-router';

const {
    PORT = 8000,
} = process.env;

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/plaid', PlaidRouter);

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Hello, world!',
    });
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost: ${PORT}`);
});