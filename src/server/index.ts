import express from 'express';
import { getAll, get } from '../db/user';
import { User } from '../types';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.get('/users', async (req, res) => {
    res.send(await getAll())
})

app.get('/users/:userId', async (req, res) => {
    const userId: string = req.params.userId;
    try {
        const user: User = await get(userId)
        res.send(user)
    } catch (err) {
        res.status(404).send(err) // TODO send user friendly error
    }
})

export default app;