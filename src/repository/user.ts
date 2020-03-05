import path from 'path';
import fs from 'fs';
import util from 'util';
import { Map, UserModel, UserModelToSave } from '../types';
import {v4 as generateGuid} from 'uuid';

// Temporarily using a json file as a kind of database.
// When app is working then switch it out for a sql/nosql db

const jsonPath: Readonly<string> = path.join("./public", "testData.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function save(allUsers: Map<UserModel>): Promise<void> {
    writeFile(jsonPath, JSON.stringify(allUsers, null, 2));
}

export async function getAll(filters: FilterOptions): Promise<Map<UserModel>> {
    const fileBuffer = await readFile(jsonPath, 'utf8');
    const contents: Map<UserModel> = JSON.parse(fileBuffer)
    Object.values(contents).forEach(user => user.dob = new Date(user.dob)) // JSON.parse doesn't parse it into a date
    return contents;
}

export async function get(id: string): Promise<UserModel> {
    const allUsers = await getAll();
    if (!allUsers[id]) throw new Error(`Couldn't find user with ID: ${id}`);
    return allUsers[id];
}

export async function insert(newUser: UserModelToSave): Promise<string> {
    const allUsers = await getAll();
    let newGuid: string = generateGuid();
    while (allUsers[newGuid]) newGuid = generateGuid();
    allUsers[newGuid] = {...newUser, id: newGuid};
    save(allUsers);
    return newGuid;
}