import {getAll} from './db'

async function run() {
    console.log(await getAll());
}

run()