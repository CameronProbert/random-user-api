import {getAll} from './db/user'
import app from './server';

const port = process.env.PORT || 8080;

async function run() {
    console.log(await getAll());
}

run()
app.listen(port, () => console.log(`Listening on port: ${port}`))