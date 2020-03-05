import path from 'path';
import fs from 'fs';
import util from 'util';
import { UserMap, User } from '../types';
import {v4 as generateGuid} from 'uuid';

const jsonPath: Readonly<string> = path.join("./public", "testData.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function save(allUsers: UserMap): Promise<void> {
    writeFile(jsonPath, JSON.stringify(allUsers));
}

export async function getAll(): Promise<UserMap> {
    const fileBuffer = await readFile(jsonPath, 'utf8');
    const contents: UserMap = JSON.parse(fileBuffer)
    return contents;
}

export async function get(id: string): Promise<User> {
    const allUsers = await getAll();
    if (!allUsers[id]) throw new Error(`Couldn't find user with ID: ${id}`);
    return allUsers[id];
}

export async function insert(newUser: User): Promise<string> {
    const allUsers = await getAll();
    let newGuid: string = generateGuid();
    while (allUsers[newGuid]) newGuid = generateGuid();
    allUsers[newGuid] = {...newUser, id: newGuid};
    save(allUsers);
    return newGuid;
}