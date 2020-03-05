import express from 'express';
import { UserApi } from '../types';
import { getById, getNumber, getRandomUser, getNewRandomUser } from '../service/user';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.get('/users', async (req, res) => {
    const numToReturn: number = parseInt(req.query.results) || 20;
    const users = await getNumber(numToReturn)
    res.send(users)
})

app.get('/users/new', async (req, res) => {
    const users = await getNewRandomUser();
    res.send(users)
})

app.get('/users/random', async (req, res) => {
    const users = await getRandomUser();
    res.send(users)
})

app.get('/users/:userId', async (req, res) => {
    const userId: string = req.params.userId;
    try {
        const user: UserApi = await getById(userId)
        res.send(user)
    } catch (err) {
        res.status(404).send(err) // TODO send user friendly error
    }
})

export default app;