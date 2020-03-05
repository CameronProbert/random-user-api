import express from 'express';
import { UserApi } from '../types';
import { getById, getRandomUser, getNewRandomUser, getFiltered, deleteById, addNewUser, updateUser } from '../service/user';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.get('/users', async (req, res) => {
    const numToReturn: number = parseInt(req.query.results) || 20;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const users = await getFiltered({numToReturn, firstName, lastName});
    res.send(users);
});

app.get('/users/new', async (req, res) => {
    const users = await getNewRandomUser();
    res.send(users);
});

app.get('/users/random', async (req, res) => {
    const users = await getRandomUser();
    res.send(users);
});

app.get('/users/:userId', async (req, res) => {
    const userId: string = req.params.userId;
    try {
        const user: UserApi = await getById(userId);
        res.send(user);
    } catch (err) {
        res.status(400).send(err); // TODO send user friendly error
    }
});

app.delete('/users/:userId', async (req, res) => {
    const userId: string = req.params.userId;
    try {
        await deleteById(userId);
        res.send(`Deleted user ${userId}`);
    } catch (err) {
        res.status(400).send(err); // TODO send user friendly error
    }
});

app.post('/users/new', async (req, res) => {
    const user: UserApi = req.body;
    try {
        const id = await addNewUser(user);
        res.send(`Created successfully with id: ${id}`);
    } catch (err) {
        res.status(400).send(err); // TODO send user friendly error
    }
});

app.post('/users/:id', async (req, res) => {
    const userId: string = req.params.id;
    console.log(req.params)
    const user: Partial<UserApi> = req.body;
    try {
        if (!userId) res.status(400).send('Invalid id');
        if (!getById(userId)) res.status(400).send(`No user with ID ${userId}`);
        await updateUser(userId, user);
        res.send(`User ${userId} updated`);
    } catch (err) {
        res.status(400).send(err); // TODO send user friendly error
    }
});

export default app;