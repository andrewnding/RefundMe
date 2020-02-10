import * as express from 'express';
import { Request, Response } from 'express';
import configureApp from 'config';
import PlaidRouter from 'routes/plaid-router';
import DefaultRouter from 'routes/default-router';

const {
    PORT = 8000,
} = process.env;

const app = configureApp(express());

app.use('/plaid', PlaidRouter);
app.use('/', DefaultRouter);

app.get('/', (req: Request, res: Response) => {
    console.log('sessionId', req.sessionID)
    console.log('user', req.user)
    res.send({
        message: 'Hello, world!',
    });
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost: ${PORT}`);
});